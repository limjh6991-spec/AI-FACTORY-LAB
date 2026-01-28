"""
Simulation Router - 생산 시뮬레이션 관련 API
"""
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import psycopg2
import os

try:
    from ortools.sat.python import cp_model
except ImportError:
    cp_model = None
    print("Warning: ortools not available for OR_TOOLS algorithm")

router = APIRouter(prefix="/simulation", tags=["simulation"])

# Database connection - Docker 환경 지원
@contextmanager
def get_db_connection():
    # Docker 환경에서는 DATABASE_URL 사용
    db_host = os.environ.get('DATABASE_HOST', 'db' if os.environ.get('DATABASE_URL') else 'localhost')
    db_name = os.environ.get('DATABASE_NAME', 'spacepro')
    db_port = os.environ.get('DATABASE_PORT', '5432')
    conn = psycopg2.connect(
        host=db_host,
        port=db_port,
        database=db_name,
        user="postgres",
        password="postgres"
    )
    try:
        yield conn
    finally:
        conn.close()


# ====================================
# 계약 기반 생산 시뮬레이션 API (O궁)
# ====================================

@router.get("/contracts")
async def get_contracts_for_simulation():
    """
    계약정보 조회 - 시뮬레이션 입력용
    sp_contract_info + sp_macode_info + sp_pr_detail JOIN
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT DISTINCT c.contno, c.macode, m.maname
                    FROM spacepro.sp_contract_info c
                    LEFT JOIN spacepro.sp_macode_info m 
                        ON c.contno = m.contno AND c.macode = m.macode
                    ORDER BY c.contno, c.macode
                """)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contracts/{contno}/processes")
async def get_contract_processes(contno: str):
    """
    계약별 공정 목록 조회 (세부공정 포함)
    정렬: prname 알파벳 오름차순 → prname_detail 숫자 오름차순
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT 
                        c.contno, c.macode, c.prcode, c.prname, c.price, c.prcd_ratio,
                        c.contracted_man_hours, c.site,
                        p.id as detail_id, p.prname_detail, p.working_day, 
                        p.worker, p.working_time, p.eqp_id
                    FROM spacepro.sp_contract_info c
                    LEFT JOIN spacepro.sp_pr_detail p ON LOWER(c.prname) = p.prname
                    WHERE c.contno = %s
                    ORDER BY c.prcode, p.prname, p.prname_detail
                """, (contno,))
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contracts/{contno}/full-detail")
async def get_contract_full_detail(contno: str):
    """
    계약 상세 시뮬레이션 데이터 조회 (제품/자식제품/공정/세부공정)
    
    Returns:
        List of process items with hierarchy:
        - contno (Contract)
        - maname (Main Product Name / Group)
        - macode (Child Product Code)
        - prname (Process)
        - prname_detail (Detailed Process)
        - working_day (Duration in days)
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 1. 계약에 포함된 모든 macode(자식제품) 및 공정 조회
                # sp_prcode_detail_info 테이블이 상세 공정 정보를 모두 가지고 있음
                query = """
                    SELECT 
                        d.contno, 
                        d.macode, 
                        m.maname,
                        d.prcode, 
                        d.prname, 
                        d.prname_detail,
                        d.wbs_vid,
                        coalesce(d.working_day, 0) as working_day,
                        coalesce(d.pr_detail_seq, 0) as detail_seq
                    FROM spacepro.sp_prcode_detail_info d
                    LEFT JOIN spacepro.sp_macode_info m 
                        ON d.contno = m.contno AND d.macode = m.macode
                    WHERE d.contno = %s
                    ORDER BY 
                        d.wbs_vid NULLS LAST, -- WBS ID 순 정렬 (Sheet5 형식)
                        d.macode,             -- fallback
                        d.prcode,     
                        d.pr_detail_seq
                """
                cur.execute(query, (contno,))
                cur.execute(query, (contno,))
                # Explicitly convert to dict to ensure we can modify and serialize easily
                rows = [dict(row) for row in cur.fetchall()]
                print(f"DEBUG: Fetched {len(rows)} rows for contract {contno}")
                
                # 데이터 가공 (필요시)
                # 시각화 테스트를 위한 가상 진척률 데이터 주입
                import random
                for row in rows:
                    # Deterministic random based on prcode to keep reload consistent-ish
                    seed = sum(ord(c) for c in (row['prcode'] or ''))
                    random.seed(seed)
                    
                    # 0~100 사이 랜덤 진척률
                    row['progress'] = random.randint(0, 10) * 10 
                    
                    # 상태 결정 로직 (간단화)
                    if row['progress'] == 100:
                        row['status'] = 'COMPLETED'
                    elif row['progress'] > 0:
                        row['status'] = 'IN_PROGRESS'
                        # 30% 확률로 지연 상태
                        if random.random() < 0.3:
                            row['status'] = 'DELAYED'
                    else:
                        row['status'] = 'PLANNED'

                return rows
                
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/contract-schedule")
async def schedule_contract_based(request: dict):
    """
    계약 기반 생산 스케줄링 (O궁 사이트용)
    
    Request:
    {
        "contno": "IAHANWCQ",
        "plan_month": "2026-01",
        "quantity": 1  // 제품 수량
    }
    
    로직:
    1. 계약 기준 우선순위
    2. 세부공정 순서: prname(알파벳) → prname_detail(숫자) 오름차순
    3. 설비별 병렬 처리 (동일 설비 내 세부공정은 순차)
    """
    try:
        contno = request.get('contno')
        quantity = request.get('quantity', 1)
        
        if not contno:
            raise HTTPException(status_code=400, detail="contno is required")
        
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 공정 + 세부공정 조회
                cur.execute("""
                    SELECT 
                        c.prcode, c.prname as process_name, c.price, c.prcd_ratio,
                        c.contracted_man_hours,
                        p.prname_detail, p.working_day, p.worker, p.working_time, p.eqp_id
                    FROM spacepro.sp_contract_info c
                    LEFT JOIN spacepro.sp_pr_detail p ON LOWER(c.prname) = p.prname
                    WHERE c.contno = %s
                    ORDER BY c.prcode, p.prname, p.prname_detail
                """, (contno,))
                rows = cur.fetchall()
        
        if not rows:
            return {"schedule": [], "message": "No processes found for contract"}
        
        # 스케줄 생성 (순차 처리)
        schedule = []
        equipment_end_time = {}  # 설비별 종료 시간
        current_time = 0
        
        for row in rows:
            prcode = row['prcode']
            prname_detail = row['prname_detail'] or row['process_name']
            working_day = float(row['working_day'] or 0)
            working_time = float(row['working_time'] or 0) if row['working_time'] else working_day * 8  # 일 → 시간 변환
            worker_count = int(row['worker'] or 1)
            eqp_id = row['eqp_id'] or 'GENERAL'
            
            # 작업 시간 계산 (시간 단위)
            duration = working_time * quantity
            
            # 시작 시간: 이전 공정 종료 또는 설비 가용 시점
            eqp_available = equipment_end_time.get(eqp_id, 0)
            start_time = max(current_time, eqp_available)
            end_time = start_time + duration
            
            schedule.append({
                'prcode': prcode,
                'operation': prname_detail,
                'equipment': eqp_id,
                'workers': worker_count,
                'start_time': round(start_time, 2),
                'end_time': round(end_time, 2),
                'duration': round(duration, 2),
                'prcd_ratio': row['prcd_ratio']
            })
            
            # 설비 종료 시간 업데이트
            equipment_end_time[eqp_id] = end_time
            current_time = end_time
        
        # 총 작업 시간 및 설비 가동률 계산
        total_time = max(equipment_end_time.values()) if equipment_end_time else 0
        
        equipment_util = []
        for eqp_id, end_t in equipment_end_time.items():
            work_time = sum(s['duration'] for s in schedule if s['equipment'] == eqp_id)
            util = (work_time / total_time * 100) if total_time > 0 else 0
            equipment_util.append({
                'equipment': eqp_id,
                'work_time': round(work_time, 2),
                'utilization': round(util, 1)
            })
        
        return {
            'contno': contno,
            'quantity': quantity,
            'total_time_hours': round(total_time, 2),
            'total_time_days': round(total_time / 8, 2),
            'schedule': schedule,
            'equipment_utilization': sorted(equipment_util, key=lambda x: -x['utilization'])
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/schedule")
async def schedule_multi_product(request: dict):
    """
    다중 제품(또는 계약) 생산 스케줄링
    Multi-Product/Contract Scheduling
    
    Request:
    {
        "orders": [
            {"item_code": "23D220097", "quantity": 1}, // item_code can be Contract No
            {"item_code": "PROD-001", "quantity": 100}
        ],
        "algorithm": "OR_TOOLS" | "SPT" | "FIFO"
    }
    """
    try:
        orders = request.get('orders', [])
        algorithm = request.get('algorithm', 'OR_TOOLS')
        
        if not orders:
            raise HTTPException(status_code=400, detail="orders is required")
        
        # 라우팅 데이터 로드
        jobs = []
        # 우선순위 값 매핑 (낮을수록 우선)
        priority_order = {'URGENT': 0, 'HIGH': 1, 'NORMAL': 2}
        
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                for order in orders:
                    code = order['item_code']
                    qty = order.get('quantity', 1)
                    
                    # 1. Try to fetch from Contract/Process Detail (sp_prcode_detail_info)
                    cur.execute("""
                        SELECT 
                            d.prname_detail as op_name,
                            d.eqp_id as machine_code,
                            d.working_day * 8 as cycle_time, -- day to hours (approx)
                            0 as setup_time,
                            100 as process_yield,
                            d.pr_detail_seq as op_seq
                        FROM spacepro.sp_prcode_detail_info d
                        WHERE d.contno = %s
                        ORDER BY d.prcode, d.pr_detail_seq
                    """, (code,))
                    routing = cur.fetchall()
                    
                    # 2. If no contract data, fallback to Item Routing Master (tb_routing_mst)
                    if not routing:
                        cur.execute("""
                            SELECT op_seq, op_name, machine_code, setup_time, cycle_time, process_yield
                            FROM spacepro.tb_routing_mst
                            WHERE item_code = %s AND status = 'ACTIVE'
                            ORDER BY op_seq
                        """, (code,))
                        routing = cur.fetchall()
                    
                    if routing:
                        jobs.append({
                            'item_code': code,
                            'quantity': qty,
                            'priority': order.get('priority', 'NORMAL'),
                            'priority_order': priority_order.get(order.get('priority', 'NORMAL'), 2),
                            'routing': routing
                        })
        
        # 우선순위 순으로 정렬 (URGENT → HIGH → NORMAL)
        jobs.sort(key=lambda x: x['priority_order'])
        
        schedule = []
        total_time = 0
        solve_time = 0
        
        if algorithm == 'OR_TOOLS' and cp_model:
            # OR-Tools CP-SAT 기반 스케줄링
            try:
                model = cp_model.CpModel()
                all_tasks = {}
                machine_to_intervals = {}
                horizon = 0
                
                # 시간 범위 계산
                for job in jobs:
                    for op in job['routing']:
                        # cycle_time is per unit, but for contract(1 unit) it just works
                        duration = int(op['setup_time'] + op['cycle_time'] * job['quantity'])
                        # Ensure minimal duration for visibility
                        duration = max(duration, 1) 
                        horizon += duration
                
                # 변수 생성
                for j_idx, job in enumerate(jobs):
                    for op in job['routing']:
                        machine = op['machine_code'] or 'GENERAL'
                        duration = int(op['setup_time'] + op['cycle_time'] * job['quantity'])
                        duration = max(duration, 1)
                        
                        suffix = f"_{j_idx}_{op['op_seq']}"
                        start_var = model.NewIntVar(0, horizon, f'start{suffix}')
                        end_var = model.NewIntVar(0, horizon, f'end{suffix}')
                        interval_var = model.NewIntervalVar(start_var, duration, end_var, f'interval{suffix}')
                        
                        all_tasks[(j_idx, op['op_seq'])] = (start_var, end_var, duration, machine)
                        
                        if machine not in machine_to_intervals:
                            machine_to_intervals[machine] = []
                        machine_to_intervals[machine].append(interval_var)
                
                # 설비 중복 방지 (NoOverlap)
                for machine, intervals in machine_to_intervals.items():
                    model.AddNoOverlap(intervals)
                
                # 공정 순서 제약
                for j_idx, job in enumerate(jobs):
                    # Sort by op_seq explicitly
                    ops = sorted(job['routing'], key=lambda x: x['op_seq'])
                    for i in range(len(ops) - 1):
                        prev_op = ops[i]['op_seq']
                        next_op = ops[i + 1]['op_seq']
                        # key might be different if multiple ops have same op_seq (not expected in this schema)
                        if (j_idx, prev_op) in all_tasks and (j_idx, next_op) in all_tasks:
                            model.Add(all_tasks[(j_idx, next_op)][0] >= all_tasks[(j_idx, prev_op)][1])
                
                # 목표: Makespan 최소화
                makespan = model.NewIntVar(0, horizon, 'makespan')
                model.AddMaxEquality(makespan, [all_tasks[key][1] for key in all_tasks])
                model.Minimize(makespan)
                
                # 풀기
                import time
                start_solve = time.time()
                solver = cp_model.CpSolver()
                solver.parameters.max_time_in_seconds = 10
                status = solver.Solve(model)
                solve_time = time.time() - start_solve
                
                if status in [cp_model.OPTIMAL, cp_model.FEASIBLE]:
                    for j_idx, job in enumerate(jobs):
                        for op in job['routing']:
                            key = (j_idx, op['op_seq'])
                            if key in all_tasks:
                                start_var, end_var, duration, machine = all_tasks[key]
                                schedule.append({
                                    'item_code': job['item_code'],
                                    'op_name': op['op_name'],
                                    'machine_code': machine,
                                    'start_time': solver.Value(start_var),
                                    'end_time': solver.Value(end_var),
                                    'quantity': int(job['quantity'] * op['process_yield'] / 100)
                                })
                    total_time = solver.Value(makespan)
                else:
                    algorithm = 'FIFO'  # fallback
            except Exception as e:
                print(f"OR-Tools error: {e}")
                algorithm = 'FIFO'  # fallback
        
        if algorithm in ['SPT', 'FIFO'] or not schedule:
            # SPT: 짧은 작업 우선 / FIFO: 순차
            schedule = []
            machine_end_time = {}
            
            if algorithm == 'SPT':
                # 전체 작업 시간 기준 정렬
                jobs.sort(key=lambda j: sum(op['setup_time'] + op['cycle_time'] * j['quantity'] for op in j['routing']))
            
            for job in jobs:
                product_end = 0
                for op in job['routing']:
                    machine = op['machine_code'] or 'GENERAL'
                    duration = op['setup_time'] + op['cycle_time'] * job['quantity']
                    duration = max(duration, 1)
                    
                    machine_available = machine_end_time.get(machine, 0)
                    start = max(product_end, machine_available)
                    end = start + duration
                    
                    schedule.append({
                        'item_code': job['item_code'],
                        'op_name': op['op_name'],
                        'machine_code': machine,
                        'start_time': start,
                        'end_time': end,
                        'quantity': int(job['quantity'] * op['process_yield'] / 100)
                    })
                    
                    machine_end_time[machine] = end
                    product_end = end
            
            total_time = max(machine_end_time.values()) if machine_end_time else 0
        
        # 설비 가동률 계산
        machine_util = {}
        for task in schedule:
            m = task['machine_code']
            machine_util[m] = machine_util.get(m, 0) + (task['end_time'] - task['start_time'])
        
        utilization = [
            {'machine': m, 'utilization': (work / total_time * 100) if total_time > 0 else 0}
            for m, work in machine_util.items()
        ]
        
        return {
            'algorithm': algorithm,
            'solve_time': round(solve_time, 3),
            'total_time': total_time,
            'schedule': schedule,
            'machine_utilization': sorted(utilization, key=lambda x: -x['utilization'])
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ====================================
# Scenario CRUD APIs
# ====================================

@router.get("/scenarios")
async def list_scenarios(plan_month: str = None):
    """저장된 시나리오 목록 조회 (orders 개수, result 유무, plan_month 필터 포함)"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if plan_month:
                    cur.execute("""
                        SELECT scenario_id, scenario_name, description, algorithm, plan_month,
                               orders, result IS NOT NULL as has_result, status,
                               created_at, updated_at
                        FROM spacepro.tb_simulation_scenario
                        WHERE plan_month = %s
                        ORDER BY updated_at DESC
                    """, (plan_month,))
                else:
                    cur.execute("""
                        SELECT scenario_id, scenario_name, description, algorithm, plan_month,
                               orders, result IS NOT NULL as has_result, status,
                               created_at, updated_at
                        FROM spacepro.tb_simulation_scenario
                        ORDER BY updated_at DESC
                    """)
                rows = cur.fetchall()
                # orders를 개수로 변환
                result = []
                for row in rows:
                    item = dict(row)
                    if item.get('orders'):
                        import json
                        orders_data = item['orders'] if isinstance(item['orders'], list) else json.loads(item['orders'])
                        item['order_count'] = len(orders_data)
                    else:
                        item['order_count'] = 0
                    del item['orders']  # 목록에서는 orders 상세 제외
                    result.append(item)
                return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/scenarios/{scenario_id}")
async def get_scenario(scenario_id: int):
    """시나리오 상세 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT * FROM spacepro.tb_simulation_scenario
                    WHERE scenario_id = %s
                """, (scenario_id,))
                row = cur.fetchone()
                if not row:
                    raise HTTPException(status_code=404, detail="Scenario not found")
                return dict(row)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/scenarios")
async def create_scenario(request: dict):
    """시나리오 저장"""
    try:
        import json
        name = request.get('scenario_name', '새 시나리오')
        description = request.get('description', '')
        orders = request.get('orders', [])
        algorithm = request.get('algorithm', 'OR_TOOLS')
        result = request.get('result')
        plan_month = request.get('plan_month')  # YYYY-MM 형식
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO spacepro.tb_simulation_scenario 
                    (scenario_name, description, orders, algorithm, result, plan_month)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING scenario_id
                """, (name, description, json.dumps(orders), algorithm, 
                      json.dumps(result) if result else None, plan_month))
                scenario_id = cur.fetchone()[0]
                conn.commit()
        
        return {"success": True, "scenario_id": scenario_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/scenarios/{scenario_id}")
async def update_scenario(scenario_id: int, request: dict):
    """시나리오 수정"""
    try:
        import json
        name = request.get('scenario_name')
        description = request.get('description')
        orders = request.get('orders')
        algorithm = request.get('algorithm')
        result = request.get('result')
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE spacepro.tb_simulation_scenario SET
                        scenario_name = COALESCE(%s, scenario_name),
                        description = COALESCE(%s, description),
                        orders = COALESCE(%s, orders),
                        algorithm = COALESCE(%s, algorithm),
                        result = COALESCE(%s, result),
                        updated_at = NOW()
                    WHERE scenario_id = %s
                """, (name, description, 
                      json.dumps(orders) if orders else None,
                      algorithm,
                      json.dumps(result) if result else None,
                      scenario_id))
                conn.commit()
        
        return {"success": True, "scenario_id": scenario_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/scenarios/{scenario_id}")
async def delete_scenario(scenario_id: int):
    """시나리오 삭제"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    DELETE FROM spacepro.tb_simulation_scenario
                    WHERE scenario_id = %s
                """, (scenario_id,))
                deleted = cur.rowcount
                conn.commit()
        
        return {"success": True, "deleted": deleted}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ====================================
# Progress & Carry-over APIs
# ====================================

@router.post("/scenarios/{scenario_id}/confirm")
async def confirm_scenario(scenario_id: int):
    """시나리오 확정 - 오더 진행 상태 테이블에 등록"""
    try:
        import json
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 시나리오 조회
                cur.execute("SELECT orders FROM spacepro.tb_simulation_scenario WHERE scenario_id = %s", (scenario_id,))
                row = cur.fetchone()
                if not row:
                    raise HTTPException(status_code=404, detail="Scenario not found")
                
                orders = row['orders'] if isinstance(row['orders'], list) else json.loads(row['orders'] or '[]')
                
                # 기존 progress 삭제 후 새로 등록
                cur.execute("DELETE FROM spacepro.tb_order_progress WHERE scenario_id = %s", (scenario_id,))
                
                for order in orders:
                    cur.execute("""
                        INSERT INTO spacepro.tb_order_progress 
                        (scenario_id, item_code, planned_qty, priority, status, source_progress_id)
                        VALUES (%s, %s, %s, %s, 'PLANNED', %s)
                    """, (scenario_id, order['item_code'], order['quantity'], 
                          order.get('priority', 'NORMAL'), order.get('source_progress_id')))
                
                # 시나리오 상태를 CONFIRMED로 변경
                cur.execute("UPDATE spacepro.tb_simulation_scenario SET status = 'CONFIRMED' WHERE scenario_id = %s", (scenario_id,))
                conn.commit()
                
        return {"success": True, "confirmed_orders": len(orders)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/scenarios/{scenario_id}/progress")
async def get_scenario_progress(scenario_id: int):
    """시나리오별 진행 현황 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT progress_id, item_code, planned_qty, produced_qty, status, priority,
                           ROUND(produced_qty::numeric / NULLIF(planned_qty, 0) * 100, 1) as progress_pct
                    FROM spacepro.tb_order_progress
                    WHERE scenario_id = %s
                    ORDER BY 
                        CASE priority WHEN 'URGENT' THEN 0 WHEN 'HIGH' THEN 1 ELSE 2 END,
                        item_code
                """, (scenario_id,))
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/progress/{progress_id}")
async def update_progress(progress_id: int, request: dict):
    """오더 진행률 업데이트"""
    try:
        produced_qty = request.get('produced_qty')
        status = request.get('status')  # IN_PROGRESS, COMPLETED, CARRIED_OVER
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE spacepro.tb_order_progress SET
                        produced_qty = COALESCE(%s, produced_qty),
                        status = COALESCE(%s, status),
                        updated_at = NOW()
                    WHERE progress_id = %s
                """, (produced_qty, status, progress_id))
                conn.commit()
        
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/carry-over/{plan_month}")
async def get_carry_over_suggestions(plan_month: str):
    """이월 대상 오더 조회 (전월 미완료분)"""
    try:
        # 전월 계산
        year, month = map(int, plan_month.split('-'))
        if month == 1:
            prev_month = f"{year-1}-12"
        else:
            prev_month = f"{year}-{str(month-1).zfill(2)}"
        
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT p.progress_id, p.item_code, p.planned_qty, p.produced_qty, p.priority,
                           (p.planned_qty - p.produced_qty) as remaining_qty,
                           s.scenario_name, s.plan_month
                    FROM spacepro.tb_order_progress p
                    JOIN spacepro.tb_simulation_scenario s ON p.scenario_id = s.scenario_id
                    WHERE s.plan_month = %s
                      AND p.status IN ('PLANNED', 'IN_PROGRESS')
                      AND p.produced_qty < p.planned_qty
                    ORDER BY 
                        CASE p.priority WHEN 'URGENT' THEN 0 WHEN 'HIGH' THEN 1 ELSE 2 END,
                        remaining_qty DESC
                """, (prev_month,))
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/progress/{progress_id}/processes")
async def get_process_progress(progress_id: int):
    """공정별 진행 현황 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, op_seq, op_name, machine_code, planned_qty, produced_qty, status,
                           ROUND(produced_qty::numeric / NULLIF(planned_qty, 0) * 100, 1) as progress_pct
                    FROM spacepro.tb_process_progress
                    WHERE progress_id = %s
                    ORDER BY op_seq
                """, (progress_id,))
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/progress/{progress_id}/delay")
async def update_delay_reason(progress_id: int, request: dict):
    """지연 사유 저장"""
    try:
        delay_reason = request.get('delay_reason')
        delay_note = request.get('delay_note')
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE spacepro.tb_order_progress SET
                        delay_reason = %s,
                        delay_note = %s,
                        updated_at = NOW()
                    WHERE progress_id = %s
                """, (delay_reason, delay_note, progress_id))
                conn.commit()
        
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/resources/schedule")
async def get_resource_schedule(plan_month: str = None):
    """
    설비 중심 스케줄 데이터 조회 (Resource-Centric View)
    Y축: 설비 (eqp_id / eqp_name)
    Data: 해당 설비에 할당된 모든 공정
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 1. 설비별 할당된 작업 조회
                query = """
                    SELECT 
                        d.eqp_id,
                        d.eqp_name,
                        d.contno,
                        d.macode,
                        m.maname,
                        d.prcode,
                        d.prname,
                        d.prname_detail,
                        d.wbs_vid,
                        coalesce(d.working_day, 0) as working_day,
                        coalesce(d.pr_detail_seq, 0) as detail_seq
                    FROM spacepro.sp_prcode_detail_info d
                    LEFT JOIN spacepro.sp_macode_info m 
                        ON d.contno = m.contno AND d.macode = m.macode
                    WHERE d.eqp_id IS NOT NULL
                """
                
                # if plan_month: query += " AND ..." 
                
                query += """
                    ORDER BY 
                        d.eqp_id,      -- 설비별 그룹핑
                        d.contno,      -- 같은 설비 내에서는 계약순
                        d.prcode
                """
                
                cur.execute(query)
                rows = [dict(row) for row in cur.fetchall()]
                
                # Mock Status Generation
                import random
                for row in rows:
                    seed = sum(ord(c) for c in (row['prcode'] or '')) + sum(ord(c) for c in (row['macode'] or ''))
                    random.seed(seed)
                    row['progress'] = random.randint(0, 10) * 10 
                    if row['progress'] == 100:
                        row['status'] = 'COMPLETED'
                    elif row['progress'] > 0:
                        row['status'] = 'IN_PROGRESS'
                        if random.random() < 0.3: row['status'] = 'DELAYED'
                    else:
                        row['status'] = 'PLANNED'

                return rows

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ====================================
# Simulation Version Management APIs
# ====================================

@router.get("/versions/{contno}")
async def list_simulation_versions(contno: str):
    """계약별 시뮬레이션 버전 목록 조회"""
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT version_id, contno, version_name, status, 
                           confirmed_at, confirmed_by, created_at
                    FROM spacepro.sp_simulation_version
                    WHERE contno = %s
                    ORDER BY created_at DESC
                """, (contno,))
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/versions/{contno}/create")
async def create_simulation_version(contno: str, request: dict = None):
    """
    시뮬레이션 실행 → 버전 생성 (DRAFT)
    
    제약조건:
    1. 자식제품 완료 후 부모제품 시작 (wbs_vid 기반 계층 구조)
    2. 제품은 기본 1개 생산
    3. 각 제품 내 공정은 순차 진행
    """
    try:
        from datetime import datetime, timedelta
        from collections import defaultdict
        
        version_name = request.get('version_name', f"v{datetime.now().strftime('%Y%m%d_%H%M')}") if request else f"v{datetime.now().strftime('%Y%m%d_%H%M')}"
        start_date_str = request.get('start_date') if request else None
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date() if start_date_str else datetime.now().date()
        
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 1. 버전 생성
                cur.execute("""
                    INSERT INTO spacepro.sp_simulation_version (contno, version_name, status)
                    VALUES (%s, %s, 'DRAFT')
                    RETURNING version_id
                """, (contno, version_name))
                version_id = cur.fetchone()['version_id']
                
                # 2. 라우팅 정보 조회 (wbs_vid 포함)
                cur.execute("""
                    SELECT contno, macode, prcode, prname_detail, wbs_vid,
                           COALESCE(working_day, 1) as working_day,
                           COALESCE(pr_detail_seq, 0) as pr_detail_seq
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno = %s
                    ORDER BY wbs_vid NULLS LAST, macode, prcode, pr_detail_seq
                """, (contno,))
                routes = cur.fetchall()
                
                # 3. 제품별 그룹화 및 wbs_vid 기반 계층 분석
                products = defaultdict(list)
                wbs_map = {}  # macode -> wbs_vid
                
                for route in routes:
                    products[route['macode']].append(route)
                    if route['wbs_vid']:
                        wbs_map[route['macode']] = route['wbs_vid']
                
                # 4. wbs_vid 기반 계층 순서 결정
                #    - 자식이 먼저 (더 긴 wbs_vid = 더 깊은 계층)
                #    - 예: 1.2.1 < 1.2 < 1 (자식부터 처리)
                def get_wbs_depth(macode):
                    wbs = wbs_map.get(macode, '')
                    if not wbs:
                        return (999, '')  # wbs 없으면 마지막
                    return (-len(wbs.split('.')), wbs)  # 깊은 게 먼저 (음수)
                
                sorted_products = sorted(products.keys(), key=get_wbs_depth)
                
                # 5. 계층별 완료일 추적 (부모는 자식 완료 후 시작)
                product_completion = {}  # macode -> end_date
                plan_records = []
                
                for macode in sorted_products:
                    product_routes = products[macode]
                    wbs_vid = wbs_map.get(macode, '')
                    
                    # 이 제품의 시작일 결정
                    # - 자식 제품들이 완료된 후 시작해야 함
                    product_start = start_date
                    
                    if wbs_vid:
                        # 같은 부모를 가진 자식들 찾기 (이 제품의 자식)
                        # 예: wbs_vid = "1.2" 이면, "1.2.1", "1.2.2" 등은 자식
                        for other_macode, other_wbs in wbs_map.items():
                            if other_wbs.startswith(wbs_vid + '.') and other_macode in product_completion:
                                child_end = product_completion[other_macode]
                                if child_end >= product_start:
                                    product_start = child_end + timedelta(days=1)
                    
                    # 6. 제품 내 공정 순차 스케줄링
                    current_date = product_start
                    for route in product_routes:
                        days = int(route['working_day']) or 1
                        plan_start = current_date
                        plan_end = current_date + timedelta(days=days - 1)
                        
                        plan_records.append({
                            'version_id': version_id,
                            'contno': contno,
                            'macode': route['macode'],
                            'prcode': route['prcode'],
                            'prname_detail': route['prname_detail'],
                            'plan_start_date': plan_start,
                            'plan_end_date': plan_end,
                            'plan_days': days
                        })
                        
                        current_date = plan_end + timedelta(days=1)
                    
                    # 제품 완료일 기록
                    product_completion[macode] = current_date - timedelta(days=1)
                
                # 7. 계획 레코드 저장
                for rec in plan_records:
                    cur.execute("""
                        INSERT INTO spacepro.sp_simulation_plan 
                        (version_id, contno, macode, prcode, prname_detail, 
                         plan_start_date, plan_end_date, plan_days)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """, (rec['version_id'], rec['contno'], rec['macode'], 
                          rec['prcode'], rec['prname_detail'],
                          rec['plan_start_date'], rec['plan_end_date'], rec['plan_days']))
                
                # 8. 라우팅 동기화 상태 업데이트
                cur.execute("""
                    UPDATE spacepro.sp_prcode_detail_info 
                    SET sim_sync_status = 'SYNCED', updated_at = NOW()
                    WHERE contno = %s
                """, (contno,))
                
                conn.commit()
                
        return {
            "success": True, 
            "version_id": version_id, 
            "version_name": version_name,
            "plan_count": len(plan_records),
            "product_count": len(sorted_products)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.put("/versions/{version_id}/confirm")
async def confirm_simulation_version(version_id: int, request: dict = None):
    """버전 확정 (DRAFT → CONFIRMED)"""
    try:
        confirmed_by = request.get('confirmed_by', 'system') if request else 'system'
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE spacepro.sp_simulation_version
                    SET status = 'CONFIRMED', 
                        confirmed_at = NOW(),
                        confirmed_by = %s
                    WHERE version_id = %s AND status = 'DRAFT'
                """, (confirmed_by, version_id))
                
                if cur.rowcount == 0:
                    raise HTTPException(status_code=400, detail="Version not found or already confirmed")
                
                conn.commit()
                
        return {"success": True, "version_id": version_id, "status": "CONFIRMED"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/versions/{version_id}/plan")
async def get_simulation_plan(version_id: int):
    """
    확정된 계획 조회 (오늘 기준 실적/계획 구분)
    """
    try:
        from datetime import date
        today = date.today()
        
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT p.*, v.status as version_status, v.version_name,
                           CASE 
                               WHEN p.plan_end_date < %s THEN 'ACTUAL'
                               WHEN p.plan_start_date > %s THEN 'PLAN'
                               ELSE 'IN_PROGRESS'
                           END as data_type
                    FROM spacepro.sp_simulation_plan p
                    JOIN spacepro.sp_simulation_version v ON p.version_id = v.version_id
                    WHERE p.version_id = %s
                    ORDER BY p.plan_start_date, p.macode, p.prcode
                """, (today, today, version_id))
                
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contracts/{contno}/confirmed-plan")
async def get_confirmed_plan(contno: str):
    """
    계약의 최신 확정된 계획 조회 (간트차트용)
    오늘 기준 이전 = 실적(읽기전용), 이후 = 계획(편집가능)
    """
    try:
        from datetime import date
        today = date.today()
        
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # 최신 CONFIRMED 버전 조회
                cur.execute("""
                    SELECT v.version_id, v.version_name, v.confirmed_at
                    FROM spacepro.sp_simulation_version v
                    WHERE v.contno = %s AND v.status = 'CONFIRMED'
                    ORDER BY v.confirmed_at DESC
                    LIMIT 1
                """, (contno,))
                version = cur.fetchone()
                
                if not version:
                    return {"message": "No confirmed plan found", "plans": [], "version": None}
                
                # 해당 버전의 계획 조회
                cur.execute("""
                    SELECT p.*,
                           CASE 
                               WHEN p.plan_end_date < %s THEN 'ACTUAL'
                               WHEN p.plan_start_date > %s THEN 'PLAN'
                               ELSE 'IN_PROGRESS'
                           END as data_type,
                           CASE 
                               WHEN p.plan_end_date < %s THEN false
                               ELSE true
                           END as is_editable
                    FROM spacepro.sp_simulation_plan p
                    WHERE p.version_id = %s
                    ORDER BY p.plan_start_date, p.macode, p.prcode
                """, (today, today, today, version['version_id']))
                
                plans = cur.fetchall()
                
                return {
                    "version": version,
                    "today": str(today),
                    "plans": plans
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contracts/{contno}/sync-status")
async def check_sync_status(contno: str):
    """
    라우팅 변경 여부 확인 (시뮬레이션 재실행 필요 여부)
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT 
                        COUNT(*) FILTER (WHERE sim_sync_status = 'MODIFIED') as modified_count,
                        COUNT(*) FILTER (WHERE sim_sync_status = 'PENDING') as pending_count,
                        COUNT(*) as total_count
                    FROM spacepro.sp_prcode_detail_info
                    WHERE contno = %s
                """, (contno,))
                result = cur.fetchone()
                
                needs_resim = (result['modified_count'] or 0) > 0 or (result['pending_count'] or 0) > 0
                
                return {
                    "contno": contno,
                    "needs_simulation": needs_resim,
                    "modified_count": result['modified_count'] or 0,
                    "pending_count": result['pending_count'] or 0,
                    "total_count": result['total_count'] or 0
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



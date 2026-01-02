"""
Simulation Router - 생산 시뮬레이션 관련 API
"""
from fastapi import APIRouter, HTTPException
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import psycopg2

try:
    from ortools.sat.python import cp_model
except ImportError:
    cp_model = None
    print("Warning: ortools not available for OR_TOOLS algorithm")

router = APIRouter(prefix="/simulation", tags=["simulation"])

# Database connection
@contextmanager
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="ai_factory_db",
        user="postgres",
        password="postgres"
    )
    try:
        yield conn
    finally:
        conn.close()


@router.post("/schedule")
async def schedule_multi_product(request: dict):
    """
    다중 제품 생산 스케줄링
    
    Request:
    {
        "orders": [
            {"item_code": "PROD-001", "quantity": 100},
            {"item_code": "PROD-002", "quantity": 200}
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
                    cur.execute("""
                        SELECT op_seq, op_name, machine_code, setup_time, cycle_time, process_yield
                        FROM spacepro.tb_routing_mst
                        WHERE item_code = %s AND status = 'ACTIVE'
                        ORDER BY op_seq
                    """, (order['item_code'],))
                    routing = cur.fetchall()
                    
                    jobs.append({
                        'item_code': order['item_code'],
                        'quantity': order.get('quantity', 100),
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
                        duration = int(op['setup_time'] + op['cycle_time'] * job['quantity'])
                        horizon += duration
                
                # 변수 생성
                for j_idx, job in enumerate(jobs):
                    for op in job['routing']:
                        machine = op['machine_code']
                        duration = int(op['setup_time'] + op['cycle_time'] * job['quantity'])
                        
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
                    ops = sorted(job['routing'], key=lambda x: x['op_seq'])
                    for i in range(len(ops) - 1):
                        prev_op = ops[i]['op_seq']
                        next_op = ops[i + 1]['op_seq']
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
                algorithm = 'FIFO'  # fallback
                print(f"OR-Tools error: {e}")
        
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
                    machine = op['machine_code']
                    duration = op['setup_time'] + op['cycle_time'] * job['quantity']
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
                               orders, result IS NOT NULL as has_result,
                               created_at, updated_at
                        FROM spacepro.tb_simulation_scenario
                        WHERE plan_month = %s
                        ORDER BY updated_at DESC
                    """, (plan_month,))
                else:
                    cur.execute("""
                        SELECT scenario_id, scenario_name, description, algorithm, plan_month,
                               orders, result IS NOT NULL as has_result,
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
                        INSERT INTO spacepro.tb_order_progress (scenario_id, item_code, planned_qty, priority, status)
                        VALUES (%s, %s, %s, %s, 'PLANNED')
                    """, (scenario_id, order['item_code'], order['quantity'], order.get('priority', 'NORMAL')))
                
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


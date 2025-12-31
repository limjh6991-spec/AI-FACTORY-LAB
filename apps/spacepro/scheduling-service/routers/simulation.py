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
                        'routing': routing
                    })
        
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

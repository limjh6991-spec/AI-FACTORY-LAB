# CP-SAT 솔버 가이드

> CP-SAT은 OR-Tools의 핵심 솔버로, 제약 조건 프로그래밍과 SAT 기법을 결합한 강력한 최적화 엔진입니다.

---

## 📌 CP-SAT 개요

**CP-SAT (Constraint Programming - Satisfiability)**
- Google OR-Tools의 기본 제약 조건 솔버
- 정수 변수 기반 문제 해결에 특화
- 스케줄링, 할당, 퍼즐 문제 등에 적합

---

## 🔧 핵심 개념

### 1. 변수 (Variables)
```python
from ortools.sat.python import cp_model

model = cp_model.CpModel()

# 정수 변수 선언
x = model.new_int_var(0, 10, 'x')       # 0~10 범위
y = model.new_int_var(0, 10, 'y')

# 불리언 변수
b = model.new_bool_var('b')

# 구간 변수 (스케줄링)
interval = model.new_interval_var(
    start=start_var, 
    size=duration, 
    end=end_var, 
    name='task1'
)
```

### 2. 제약 조건 (Constraints)
```python
# 선형 제약
model.add(x + y <= 15)

# 다름 조건
model.add(x != y)

# 스케줄링 제약 (겹침 금지)
model.add_no_overlap([interval1, interval2, interval3])

# 선후 관계
model.add(task1_end <= task2_start)
```

### 3. 목표 함수 (Objective)
```python
# 최소화
model.minimize(total_cost)

# 최대화
model.maximize(profit)
```

### 4. 솔버 실행
```python
solver = cp_model.CpSolver()
status = solver.solve(model)

if status == cp_model.OPTIMAL:
    print(f'최적해: x={solver.value(x)}, y={solver.value(y)}')
elif status == cp_model.FEASIBLE:
    print('가능해 발견')
else:
    print('해 없음')
```

---

## 📊 스케줄링 특화 기능

### Interval Variables (구간 변수)
```python
# 작업 구간 정의
start = model.new_int_var(0, horizon, 'start')
end = model.new_int_var(0, horizon, 'end')
duration = 10  # 작업 소요 시간

interval = model.new_interval_var(start, duration, end, 'task')
```

### No Overlap (겹침 방지)
```python
# 같은 기계에서 작업 겹침 방지
machine_intervals = [task1_interval, task2_interval, task3_interval]
model.add_no_overlap(machine_intervals)
```

### Optional Intervals (선택적 작업)
```python
# 대체 기계 선택
is_on_machine1 = model.new_bool_var('machine1')
optional_interval = model.new_optional_interval_var(
    start, duration, end, is_on_machine1, 'alt_task'
)
```

---

## 🏭 Job Shop 스케줄링 예제

```python
from ortools.sat.python import cp_model

def job_shop_scheduling():
    # 3개 작업, 3개 기계
    # jobs_data[job_id] = [(machine_id, duration), ...]
    jobs_data = [
        [(0, 3), (1, 2), (2, 2)],  # Job 0
        [(0, 2), (2, 1), (1, 4)],  # Job 1
        [(1, 4), (2, 3)]           # Job 2
    ]
    
    num_machines = 3
    all_machines = range(num_machines)
    horizon = sum(task[1] for job in jobs_data for task in job)
    
    model = cp_model.CpModel()
    
    # 변수 생성
    all_tasks = {}
    machine_to_intervals = {m: [] for m in all_machines}
    
    for job_id, job in enumerate(jobs_data):
        for task_id, (machine, duration) in enumerate(job):
            suffix = f'_j{job_id}_t{task_id}'
            start = model.new_int_var(0, horizon, 'start' + suffix)
            end = model.new_int_var(0, horizon, 'end' + suffix)
            interval = model.new_interval_var(start, duration, end, 'interval' + suffix)
            
            all_tasks[job_id, task_id] = {
                'start': start, 'end': end, 'interval': interval
            }
            machine_to_intervals[machine].append(interval)
    
    # 기계별 겹침 방지
    for machine in all_machines:
        model.add_no_overlap(machine_to_intervals[machine])
    
    # 작업 내 순서 제약
    for job_id, job in enumerate(jobs_data):
        for task_id in range(len(job) - 1):
            model.add(all_tasks[job_id, task_id]['end'] <= 
                     all_tasks[job_id, task_id + 1]['start'])
    
    # Makespan 최소화
    makespan = model.new_int_var(0, horizon, 'makespan')
    model.add_max_equality(makespan, [
        all_tasks[job_id, len(job) - 1]['end']
        for job_id, job in enumerate(jobs_data)
    ])
    model.minimize(makespan)
    
    # 솔버 실행
    solver = cp_model.CpSolver()
    status = solver.solve(model)
    
    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        print(f'최적 Makespan: {solver.value(makespan)}')
        for job_id, job in enumerate(jobs_data):
            for task_id, (machine, duration) in enumerate(job):
                start = solver.value(all_tasks[job_id, task_id]['start'])
                print(f'Job {job_id} Task {task_id}: Machine {machine}, '
                      f'Start {start}, End {start + duration}')

if __name__ == '__main__':
    job_shop_scheduling()
```

---

## ⚙️ 솔버 파라미터

```python
solver = cp_model.CpSolver()

# 타임아웃 설정 (초)
solver.parameters.max_time_in_seconds = 60.0

# 병렬 처리
solver.parameters.num_workers = 8

# 로그 출력
solver.parameters.log_search_progress = True

# 첫 번째 해만 찾기
solver.parameters.enumerate_all_solutions = False
```

---

## 📈 성능 팁

1. **변수 도메인 제한**: 가능한 범위를 좁게 설정
2. **대칭성 제거**: 동일한 해가 여러 개 있으면 제거
3. **힌트 제공**: 초기 해 제공으로 탐색 시간 단축
4. **제약 전파**: 강한 제약 조건 우선 추가

---

**작성일**: 2024-12-18

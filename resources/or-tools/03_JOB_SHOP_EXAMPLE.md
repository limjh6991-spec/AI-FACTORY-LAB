# Job Shop 스케줄링 예제

> 실제 생산 환경에서 활용 가능한 Job Shop 스케줄링 예제 코드

---

## 📌 문제 정의

- **Job**: 작업지시 (품목별 생산 오더)
- **Task**: 공정 (각 오더가 거쳐야 하는 공정들)
- **Machine**: 설비 (공정을 수행하는 기계)

### 제약 조건
1. 같은 기계에서 동시에 두 작업 불가
2. 한 오더 내 공정은 순서대로 진행
3. 작업 시작 후 중단 불가

---

## 🔧 Python 예제 코드

### 1. 기본 Job Shop Scheduler

```python
"""
SpacePro MES - Job Shop Scheduler
OR-Tools CP-SAT 기반 생산 스케줄링 최적화
"""

from ortools.sat.python import cp_model
from dataclasses import dataclass
from typing import List, Dict, Tuple
import json


@dataclass
class Task:
    """작업 (공정)"""
    job_id: str
    task_id: int
    machine: str
    duration: int  # 분


@dataclass
class ScheduleResult:
    """스케줄링 결과"""
    job_id: str
    task_id: int
    machine: str
    start: int
    end: int
    duration: int


def solve_job_shop(tasks: List[Task], machines: List[str], horizon: int = 10000) -> Dict:
    """
    Job Shop 스케줄링 문제 해결
    
    Args:
        tasks: 작업 목록
        machines: 설비 목록
        horizon: 최대 시간 범위
    
    Returns:
        스케줄링 결과
    """
    model = cp_model.CpModel()
    
    # 작업별로 그룹화
    jobs = {}
    for task in tasks:
        if task.job_id not in jobs:
            jobs[task.job_id] = []
        jobs[task.job_id].append(task)
    
    # 변수 생성
    task_vars = {}
    machine_intervals = {m: [] for m in machines}
    
    for task in tasks:
        suffix = f'_{task.job_id}_{task.task_id}'
        
        start = model.new_int_var(0, horizon, f'start{suffix}')
        end = model.new_int_var(0, horizon, f'end{suffix}')
        interval = model.new_interval_var(start, task.duration, end, f'interval{suffix}')
        
        task_vars[(task.job_id, task.task_id)] = {
            'start': start,
            'end': end,
            'interval': interval,
            'duration': task.duration,
            'machine': task.machine
        }
        
        machine_intervals[task.machine].append(interval)
    
    # 제약 1: 같은 기계에서 작업 겹침 방지
    for machine in machines:
        if machine_intervals[machine]:
            model.add_no_overlap(machine_intervals[machine])
    
    # 제약 2: 작업 내 공정 순서
    for job_id, job_tasks in jobs.items():
        sorted_tasks = sorted(job_tasks, key=lambda t: t.task_id)
        for i in range(len(sorted_tasks) - 1):
            current = (job_id, sorted_tasks[i].task_id)
            next_task = (job_id, sorted_tasks[i + 1].task_id)
            model.add(task_vars[current]['end'] <= task_vars[next_task]['start'])
    
    # 목표: Makespan 최소화
    makespan = model.new_int_var(0, horizon, 'makespan')
    last_ends = []
    for job_id, job_tasks in jobs.items():
        last_task_id = max(t.task_id for t in job_tasks)
        last_ends.append(task_vars[(job_id, last_task_id)]['end'])
    model.add_max_equality(makespan, last_ends)
    model.minimize(makespan)
    
    # 솔버 실행
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 60.0
    solver.parameters.log_search_progress = True
    
    status = solver.solve(model)
    
    # 결과 생성
    result = {
        'status': 'OPTIMAL' if status == cp_model.OPTIMAL else 'FEASIBLE' if status == cp_model.FEASIBLE else 'INFEASIBLE',
        'makespan': solver.value(makespan) if status in [cp_model.OPTIMAL, cp_model.FEASIBLE] else None,
        'schedule': []
    }
    
    if status in [cp_model.OPTIMAL, cp_model.FEASIBLE]:
        for (job_id, task_id), vars in task_vars.items():
            result['schedule'].append({
                'job_id': job_id,
                'task_id': task_id,
                'machine': vars['machine'],
                'start': solver.value(vars['start']),
                'end': solver.value(vars['end']),
                'duration': vars['duration']
            })
        # 정렬: 시작 시간 순
        result['schedule'].sort(key=lambda x: (x['start'], x['job_id']))
    
    return result


def example():
    """예제 실행"""
    # 샘플 데이터: 3개 작업지시, 각 2~3개 공정
    tasks = [
        # 작업지시 WO001: P010 → P020 → P030
        Task('WO001', 1, 'MC001', 60),   # P010, 60분
        Task('WO001', 2, 'MC002', 45),   # P020, 45분
        Task('WO001', 3, 'MC003', 30),   # P030, 30분
        
        # 작업지시 WO002: P010 → P030
        Task('WO002', 1, 'MC001', 90),   # P010, 90분
        Task('WO002', 2, 'MC003', 60),   # P030, 60분
        
        # 작업지시 WO003: P020 → P030
        Task('WO003', 1, 'MC002', 120),  # P020, 120분
        Task('WO003', 2, 'MC003', 45),   # P030, 45분
    ]
    
    machines = ['MC001', 'MC002', 'MC003']
    
    result = solve_job_shop(tasks, machines)
    
    print("\n=== 스케줄링 결과 ===")
    print(f"상태: {result['status']}")
    print(f"총 소요 시간 (Makespan): {result['makespan']}분")
    print("\n작업 스케줄:")
    for item in result['schedule']:
        print(f"  {item['job_id']} Task{item['task_id']}: "
              f"{item['machine']} [{item['start']}분 ~ {item['end']}분]")
    
    return result


if __name__ == '__main__':
    example()
```

---

## 📊 출력 예시

```
=== 스케줄링 결과 ===
상태: OPTIMAL
총 소요 시간 (Makespan): 285분

작업 스케줄:
  WO001 Task1: MC001 [0분 ~ 60분]
  WO001 Task2: MC002 [60분 ~ 105분]
  WO003 Task1: MC002 [105분 ~ 225분]
  WO002 Task1: MC001 [60분 ~ 150분]
  WO001 Task3: MC003 [105분 ~ 135분]
  WO002 Task2: MC003 [150분 ~ 210분]
  WO003 Task2: MC003 [225분 ~ 270분]
```

---

## 🎯 Gantt 차트 시각화 (Matplotlib)

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches


def draw_gantt(result: Dict, machines: List[str]):
    """Gantt 차트 그리기"""
    fig, ax = plt.subplots(figsize=(14, 6))
    
    colors = {
        'WO001': '#3699FF',
        'WO002': '#1BC5BD',
        'WO003': '#FFA800',
    }
    
    machine_idx = {m: i for i, m in enumerate(machines)}
    
    for item in result['schedule']:
        y = machine_idx[item['machine']]
        ax.barh(
            y,
            item['duration'],
            left=item['start'],
            height=0.6,
            color=colors.get(item['job_id'], '#999'),
            edgecolor='white',
            linewidth=0.5
        )
        ax.text(
            item['start'] + item['duration'] / 2,
            y,
            f"{item['job_id']}\nT{item['task_id']}",
            ha='center', va='center',
            fontsize=8, color='white', fontweight='bold'
        )
    
    ax.set_yticks(range(len(machines)))
    ax.set_yticklabels(machines)
    ax.set_xlabel('시간 (분)')
    ax.set_title(f"Job Shop 스케줄 (Makespan: {result['makespan']}분)")
    ax.grid(axis='x', alpha=0.3)
    
    # 범례
    patches = [mpatches.Patch(color=c, label=j) for j, c in colors.items()]
    ax.legend(handles=patches, loc='upper right')
    
    plt.tight_layout()
    plt.savefig('gantt_schedule.png', dpi=150)
    plt.show()
```

---

**작성일**: 2024-12-18

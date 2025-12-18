# OR-Tools - SpacePro MES 적용 방안

> SpacePro MES/MRP 시스템에 Google OR-Tools를 활용한 생산 스케줄링 최적화 적용 방안

---

## 📌 적용 배경

### 현재 SpacePro 시스템
- 생산계획 모듈: 월별/주별/일별 계획 수립
- 생산관리 모듈: Track In/Out, 공정 진척 관리
- 설비관리: 설비별 가동률, 효율 관리

### 개선 필요 영역
| 문제 | 현재 | 목표 |
|------|------|------|
| **계획 수립** | 수동 Excel 기반 | 자동 최적 스케줄링 |
| **설비 배분** | 경험 기반 | 알고리즘 기반 최적 배분 |
| **납기 관리** | 사후 추적 | 사전 예측 및 최적화 |
| **리스케줄링** | 수동 조정 | 실시간 자동 조정 |

---

## 🎯 적용 시나리오

### 1. 일별 생산 스케줄링 최적화

```
[입력]
├─ 작업지시 목록 (품목, 수량, 납기)
├─ 설비 현황 (가용 시간, 효율)
├─ 공정 정보 (작업 시간, 순서)
└─ 작업자 배치

     ↓ OR-Tools CP-SAT

[출력]
├─ 최적 작업 순서
├─ 설비별 작업 배정
├─ 예상 완료 시간
└─ 납기 준수 여부 예측
```

### 2. 설비 할당 최적화

```python
# 예시: 공정별 최적 설비 배분
jobs = [
    {'order_id': 'WO001', 'item': 'PART-A', 'qty': 100, 'due': '2024-12-20'},
    {'order_id': 'WO002', 'item': 'PART-B', 'qty': 200, 'due': '2024-12-21'},
]
machines = [
    {'code': 'MC001', 'process': 'P010', 'uph': 50, 'efficiency': 0.95},
    {'code': 'MC002', 'process': 'P010', 'uph': 60, 'efficiency': 0.90},
]

# CP-SAT으로 최적 배분 계산
# → MC001: WO001 (효율 우선)
# → MC002: WO002 (속도 우선)
```

### 3. 납기 준수 최적화

- **목표 함수**: 납기 지연 최소화
- **제약 조건**: 
  - 설비 가용 시간
  - 공정 순서 (선후 관계)
  - 작업자 스킬 레벨
  - 자재 가용성

---

## 🔧 기술 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                     SpacePro Frontend                        │
│                  (Next.js + TypeScript)                      │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js API Routes                         │
│              (스케줄링 요청 처리)                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP / gRPC
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Scheduling Microservice                         │
│                  (Python + OR-Tools)                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Job Shop     │  │ Resource     │  │ Capacity     │       │
│  │ Scheduler    │  │ Allocator    │  │ Planner      │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL                                │
│              (spacepro 스키마)                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 구현 구조

```
/Project/spacepro/
├── src/
│   └── app/
│       └── api/
│           └── scheduling/
│               └── route.ts          # 스케줄링 API 엔드포인트
│
├── scheduling-service/               # Python 마이크로서비스
│   ├── main.py                      # FastAPI 서버
│   ├── requirements.txt             # ortools, fastapi, uvicorn
│   ├── solvers/
│   │   ├── job_shop.py              # Job Shop 스케줄러
│   │   ├── resource_alloc.py        # 설비 할당 최적화
│   │   └── capacity_plan.py         # 능력 계획
│   └── models/
│       ├── job.py                   # 작업 모델
│       └── machine.py               # 설비 모델
│
└── docs/
    └── OR_TOOLS_INTEGRATION.md      # 통합 문서
```

---

## 🚀 구현 단계

### Phase 1: 기본 환경 구축 (M+3)
- [ ] Python FastAPI 마이크로서비스 설정
- [ ] OR-Tools 설치 및 테스트
- [ ] Next.js ↔ Python 서비스 통신 구현
- [ ] 기본 Job Shop Scheduler 구현

### Phase 2: 통합 및 UI (M+4)
- [ ] 스케줄링 결과 DB 저장
- [ ] 일별 계획 화면에 최적화 버튼 추가
- [ ] Gantt 차트로 결과 시각화
- [ ] 수동 조정 기능

### Phase 3: 고급 기능 (M+5~M+6)
- [ ] 실시간 리스케줄링
- [ ] 납기 예측 알람
- [ ] What-if 시뮬레이션
- [ ] 성능 최적화

---

## 📝 API 설계

### 스케줄링 요청
```http
POST /api/scheduling/optimize
Content-Type: application/json

{
  "planDate": "2024-12-20",
  "orders": [
    {
      "orderId": "WO001",
      "itemCode": "PART-A",
      "quantity": 100,
      "dueDate": "2024-12-25",
      "priority": 1,
      "processes": [
        {"processCode": "P010", "stdTime": 5},
        {"processCode": "P020", "stdTime": 10}
      ]
    }
  ],
  "machines": [
    {
      "machineCode": "MC001",
      "processCode": "P010",
      "uph": 50,
      "availableHours": 8
    }
  ],
  "objective": "MINIMIZE_MAKESPAN"  // or "MINIMIZE_DELAY"
}
```

### 스케줄링 결과
```json
{
  "success": true,
  "makespan": 480,
  "schedule": [
    {
      "orderId": "WO001",
      "machineCode": "MC001",
      "processCode": "P010",
      "startTime": 0,
      "endTime": 120,
      "delay": 0
    }
  ],
  "summary": {
    "totalOrders": 5,
    "onTimeOrders": 5,
    "delayedOrders": 0,
    "utilization": 0.85
  }
}
```

---

## 💡 예상 효과

| 지표 | 현재 | 목표 |
|------|------|------|
| **계획 수립 시간** | 2시간 | 10분 |
| **설비 가동률** | 75% | 85% |
| **납기 준수율** | 85% | 95% |
| **리스케줄링 시간** | 1시간 | 5분 |

---

## ⚠️ 고려 사항

### 기술적
- Python 서비스 운영 인프라 필요
- 대규모 문제 시 솔빙 시간 증가 (타임아웃 설정)
- 모델 복잡도 관리

### 운영적
- 현장 작업자 교육
- 초기 데이터 정확도 중요 (공정 시간, 설비 효율)
- 예외 상황 수동 처리 프로세스

---

## 🔗 참고 자료

- [OR-Tools 공식 문서](https://developers.google.com/optimization)
- [Job Shop 스케줄링 예제](https://developers.google.com/optimization/scheduling/job_shop)
- [Python FastAPI](https://fastapi.tiangolo.com/)

---

**작성일**: 2024-12-18  
**버전**: v1.0

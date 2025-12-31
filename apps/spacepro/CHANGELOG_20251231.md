# SpacePro 변경내역 (2025-12-31)

## 리팩토링 작업 요약

### 1. scheduling-service 라우터 분리
대형 `main.py` (962라인) → 라우터 모듈 분리

| 파일 | 내용 | 라인수 |
|------|------|--------|
| `routers/routing.py` | 라우팅 CRUD API (GET/POST/PUT/DELETE) | ~170 |
| `routers/simulation.py` | 생산 시뮬레이션 (OR-Tools/SPT/FIFO) | ~200 |
| `routers/__init__.py` | 패키지 초기화 | 8 |

### 2. 신규 기능 추가
- **공정 라우팅 마스터** (`/master/routing`) - CRUD 기능
- **라우팅 Carbon 버전** (`/master/routing-carbon`) - 4그룹 그라데이션
- **생산 시뮬레이션** (`/plan/simulation`) - 다중제품 스케줄링
- **OR-Tools 스케줄링 API** (`POST /simulation/schedule`)

### 3. API 엔드포인트
```
기존 유지:
  /health, /optimize, /capacity/*

라우터 분리:
  /routing/items         → routers/routing.py
  /routing/{item_code}   → routers/routing.py
  /simulation/schedule   → routers/simulation.py
```

### 4. 프론트엔드 화면
| 경로 | 설명 |
|------|------|
| `/master/routing` | 공정 라우팅 마스터 (CRUD) |
| `/master/routing-carbon` | Carbon 스타일 버전 |
| `/plan/simulation` | 다중제품 생산 시뮬레이션 |

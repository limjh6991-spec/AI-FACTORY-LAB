# SpacePro 프로젝트 컨텍스트 (2026-01-02)

## 🎯 프로젝트 개요

**SpacePro**는 MES/MRP 기반 생산계획 관리 시스템입니다.
- **기술 스택**: Next.js 15 + TypeScript + FastAPI (Python) + PostgreSQL
- **위치**: `/home/roarm_m3/ai-factory-lab/apps/spacepro`

---

## 📁 주요 디렉토리 구조

```
apps/spacepro/
├── src/app/                    # Next.js 프론트엔드
│   ├── master/routing/         # 공정 라우팅 마스터 (CRUD)
│   ├── master/routing-carbon/  # Carbon 스타일 버전
│   ├── plan/simulation/        # 생산 시뮬레이션 (OR-Tools)
│   ├── plan/capacity/          # Capacity 시뮬레이션
│   ├── plan/mrp/               # MRP 계산
│   └── plan/monthly/           # 월간 생산계획
│
├── scheduling-service/         # Python FastAPI 백엔드
│   ├── main.py                 # 메인 앱 (라우터 등록)
│   ├── routers/                # 모듈화된 라우터
│   │   ├── routing.py          # 라우팅 CRUD API
│   │   └── simulation.py       # 스케줄링 + 시나리오 API
│   └── solvers/                # OR-Tools 알고리즘
│
├── prisma/                     # Prisma ORM
│   └── seed.ts                 # 메뉴 시딩
└── scripts/sql/                # SQL 스크립트
```

---

## ✅ 최근 완료 작업 (2025-12-31)

### 1. 공정 라우팅 마스터 (/master/routing)
- 100개 제품 × 10개 공정 × 50개 설비 데이터
- CRUD 기능 (생성/편집/삭제)
- Carbon Design 버전도 별도 구현

### 2. 생산 시뮬레이션 (/plan/simulation)
- 다중 제품 스케줄링 (OR-Tools CP-SAT / SPT / FIFO)
- 간트 차트 시각화
- **시나리오 저장/불러오기/삭제** 기능

### 3. 리팩토링
- `main.py` (962L) → `routers/` 모듈 분리

---

## 🗄️ 주요 DB 테이블

```sql
-- 공정 라우팅
spacepro.tb_routing_mst (item_code, op_seq, op_name, machine_code, ...)

-- 시뮬레이션 시나리오
spacepro.tb_simulation_scenario (scenario_id, scenario_name, orders JSONB, result JSONB, ...)
```

---

## 🔌 API 엔드포인트

### Routing (routers/routing.py)
```
GET    /routing/items
GET    /routing/{item_code}
POST   /routing
PUT    /routing/{item_code}
DELETE /routing/{item_code}
```

### Simulation (routers/simulation.py)
```
POST   /simulation/schedule          # 스케줄링 실행
GET    /simulation/scenarios         # 시나리오 목록
GET    /simulation/scenarios/{id}    # 시나리오 상세
POST   /simulation/scenarios         # 시나리오 저장
PUT    /simulation/scenarios/{id}    # 시나리오 수정
DELETE /simulation/scenarios/{id}    # 시나리오 삭제
```

---

## 🚀 서버 실행 방법

```bash
# 1. Next.js 프론트엔드
cd apps/spacepro && npm run dev   # http://localhost:3000

# 2. Python 백엔드
cd apps/spacepro/scheduling-service
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 📋 향후 작업 가능 항목

1. **capacity/page.tsx 컴포넌트 분리** (894L - 너무 큼)
2. **품목/BOM 마스터 관리** 화면
3. **생산 오더 관리** 화면
4. **시뮬레이션 결과 비교** 기능

---

## 📝 관련 문서

| 파일 | 설명 |
|------|------|
| `CHANGELOG_20251231.md` | 12/31 변경내역 |
| `README.md` | 프로젝트 개요 |
| `docs/OR_TOOLS_INTEGRATION.md` | OR-Tools 연동 가이드 |

---

**최종 업데이트**: 2026-01-02

# SpacePro 변경내역 (2025-12-31)

## 🎯 오늘 완료된 작업

### 1. 공정 라우팅 마스터 화면 (/master/routing)
- **CRUD 기능**: 제품별 라우팅 생성, 편집, 삭제
- **SQL 데이터**: 100개 제품, 50개 설비, 10개 공정(area_1~10)
- **개당시간 계산**: setup_time + cycle_time

### 2. Carbon Design 버전 (/master/routing-carbon)
- 공정 태그 4그룹 그라데이션 색상 적용
- area_1(빨강), area_2~4(초록계열), area_5~9(파랑계열), area_10(보라)

### 3. 생산 시뮬레이션 화면 (/plan/simulation)
- **다중 제품 스케줄링**: 여러 제품 동시 스케줄링
- **알고리즘 선택**: OR-Tools CP-SAT / SPT / FIFO
- **간트 차트**: 공정별 스케줄 시각화
- **설비 가동률**: 상위 10개 설비 차트
- **시나리오 저장/불러오기/삭제**: DB 연동 CRUD

### 4. 소스 리팩토링
main.py (962L) → 라우터 모듈 분리

| 파일 | 내용 |
|------|------|
| `routers/routing.py` | 라우팅 CRUD (~170L) |
| `routers/simulation.py` | 시뮬레이션 + 시나리오 CRUD (~330L) |
| `routers/__init__.py` | 패키지 초기화 |

### 5. 신규 DB 테이블
```sql
spacepro.tb_simulation_scenario (
    scenario_id, scenario_name, description,
    orders JSONB, algorithm, result JSONB,
    created_at, updated_at
)
```

---

## 📁 변경된 파일

### Backend (scheduling-service)
- `main.py` - 라우터 등록 추가
- `routers/__init__.py` - 신규
- `routers/routing.py` - 신규 (CRUD)
- `routers/simulation.py` - 신규 (스케줄링 + 시나리오)

### Frontend (src/app)
- `master/routing/page.tsx` - 신규 (라우팅 마스터)
- `master/routing-carbon/page.tsx` - 신규 (Carbon 버전)
- `plan/simulation/page.tsx` - 신규 (생산 시뮬레이션)

### SQL
- `scripts/sql/create_routing_master_data.sql` - 라우팅 데이터 생성

### Config
- `prisma/seed.ts` - 메뉴 추가 (생산 시뮬레이션)

### Documentation
- `README.md` - 개발 현황 업데이트
- `CHANGELOG_20251231.md` - 변경내역 기록

---

## 🔗 신규 API 엔드포인트

### Routing
```
GET    /routing/items
GET    /routing/{item_code}
POST   /routing
PUT    /routing/{item_code}
DELETE /routing/{item_code}
```

### Simulation
```
POST   /simulation/schedule
GET    /simulation/scenarios
GET    /simulation/scenarios/{id}
POST   /simulation/scenarios
PUT    /simulation/scenarios/{id}
DELETE /simulation/scenarios/{id}
```

---

**작업일**: 2025-12-31  
**작업자**: SpacePro Team

# Capacity Simulation Changelog

## 2025-12-30: 케파 시뮬레이션 Phase 1~5 완료

### Phase 1: 마스터 테이블 생성
- `sp_workcenter_mst` - 작업장 마스터
- `sp_shift_mst` - 교대조 마스터
- `sp_calendar_mst` - 작업 달력
- `sp_capacity_mst` - 생산능력 정의

### Phase 2: 백엔드 API 구현
- `POST /capacity/simulate` - 시뮬레이션 실행
- `GET /capacity/summary` - 케파 요약
- `GET /capacity/workcenters` - 작업장 목록
- `GET /capacity/shifts` - 교대조 목록

### Phase 3: 프론트엔드 UI
- `/plan/capacity` 화면 생성
- 수요 입력 테이블
- 시뮬레이션 결과 차트 (가동률 바 차트, 상태 파이 차트)
- 상세 분석 테이블

### Phase 4: 고급 시뮬레이션 변수
- DB 확장: yield_rate, rework_rate, downtime_hours, manpower
- `sp_setup_matrix` - 기종변경 시간 행렬
- `sp_simulation_scenario` - 시나리오 테이블
- UI 고급 모드 패널 (6개 파라미터 슬라이더)

### Phase 5: 버전 관리
- `sp_simulation_result` - 버전 저장 테이블
- `POST /capacity/versions` - 저장 API
- `GET /capacity/versions` - 목록 API
- `GET /capacity/versions/{id}` - 불러오기 API
- UI: 저장/불러오기 모달

---

### 수정/생성된 파일

#### SQL Scripts
- `scripts/sql/create_capacity_tables.sql`
- `scripts/sql/add_advanced_variables.sql`
- `scripts/sql/create_simulation_result_table.sql`

#### Backend (scheduling-service)
- `solvers/capacity_simulation.py` - 케파 시뮬레이터
- `models/schemas.py` - Pydantic 스키마
- `main.py` - API 엔드포인트

#### Frontend
- `src/app/plan/capacity/page.tsx` - 케파 시뮬레이션 화면

---

### 접속 정보
- Frontend: http://localhost:3000/plan/capacity
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

# SpacePro Changelog

## [2026-01-28] 시뮬레이션 통합 및 변경 이력 관리

### 🚀 시뮬레이션 버전 관리 시스템

**DB 스키마 추가:**
- `sp_prcode_detail_info`: sim_sync_status, change_type, updated_at 컬럼 추가
- `sp_simulation_version`: 시뮬레이션 버전 관리 테이블
- `sp_simulation_plan`: 시뮬레이션 계획 결과 저장
- `sp_change_log`: 변경 이력 추적 테이블

**시뮬레이션 API:**
- `POST /simulation/versions/{contno}/create` - 시뮬레이션 실행 및 버전 생성
- `PUT /simulation/version-actions/{versionId}` - 버전 확정
- `GET /simulation/contracts/{contno}/confirmed-plan` - 확정 계획 조회
- `GET /simulation/contracts/{contno}/sync-status` - 변경 감지 상태

---

### 🔗 BOM 계층 제약조건

**스케줄링 제약조건 구현:**
1. 자식제품 완료 후 부모제품 시작 (wbs_vid 기반)
2. 제품은 기본 1개 생산
3. 각 제품 내 공정은 순차 진행

**검증 결과:**
- 1.2.1~1.2.6 (자식): 01/28~02/07 완료
- 1.2 (부모): 02/08 시작 ✅

---

### 📝 변경 이력 관리

**자동 로깅:**
- 라우팅 생성/수정/삭제 시 자동 기록
- 필드별 old_value → new_value 추적
- sim_sync_status = 'MODIFIED' 자동 설정

**API:**
- `GET /pr-detail/change-log` - 변경 이력 조회
- `GET /pr-detail/change-log/summary` - 일별 통계

---

### 🎨 UI 개선

**계약별 진행 현황 화면:**
- 동기화 상태 배지 (변경됨 🟡 / 동기화됨 🟢)
- 시뮬레이션 버튼 (변경점 있을 때만 활성화)

---

### 🧹 프로젝트 정리

**삭제된 파일 (30+개):**
- 일회성 Python 스크립트 (migrate_*, inspect_*, generate_* 등)
- 오래된 개발 로그 및 핸드오프 문서
- Office/PDF 임시 파일
- venv, __pycache__, 로그 파일

---


## [2024-12-18] Clean Architecture & Production Planning

### 🏗️ Clean Architecture 리팩토링

**Domain Layer:**
- `Menu`, `Item`, `Machine` 엔티티 생성 (비즈니스 로직 포함)
- `IMenuRepository`, `IItemRepository`, `IMachineRepository` 인터페이스 정의

**Application Layer:**
- `GetMenuHierarchyUseCase` - 메뉴 계층 구조 조회
- `GetItemListUseCase` - 품목 목록 조회
- `CreateItemUseCase` - 품목 생성

**Infrastructure Layer:**
- `PrismaMenuRepository` - Prisma 기반 메뉴 레포지토리
- `MenuMapper` - DB ↔ 도메인 변환

**폴더 구조:**
```
src/
├── domain/
│   ├── entities/
│   └── repositories/
├── application/
│   └── use-cases/
└── infrastructure/
    └── persistence/
```

---

### 📊 생산 계획 화면 구현

**1. 월간 생산 계획서 (`/plan/monthly`)**
- PSI (Production, Sales, Inventory) 통합 계획
- Recharts 기반 시각화 (부하율 그래프)
- OR-Tools AI 스케줄 최적화 모달
- Capa 분석 (필요 공수, 부하율)
- 생산 계획 자동 계산: `생산량 = 판매 - 재고 + 안전재고`

**2. PSI 계획표 (`/plan/psi`)**
- AG Grid 기반 엑셀 스타일 편집
- 셀 더블클릭 편집 + 자동 계산
- 조건부 서식 (1,000개 초과 시 빨간색 경고)
- 틀고정 (Pinned Columns)
- CSV 내보내기

---

### 📚 OR-Tools 문서

**/resources/or-tools/**
- `01_OR-TOOLS_OVERVIEW.md` - OR-Tools 소개
- `02_CP-SAT_GUIDE.md` - CP-SAT 솔버 가이드
- `03_JOB_SHOP_EXAMPLE.md` - Job Shop 스케줄링 예제
- `04_CLEAN_ARCHITECTURE.md` - Clean Architecture 가이드

**/Project/spacepro/docs/**
- `OR_TOOLS_INTEGRATION.md` - SpacePro OR-Tools 적용 방안

---

### 🔧 환경 설정

- `.env.example` - 환경 변수 템플릿 생성
- `docs/ENV_GUIDE.md` - 환경 변수 가이드
- `.gitignore` 수정 (`.env.example` 커밋 허용)

---

### 📦 새로 설치된 패키지

- `ag-grid-react` - AG Grid React 컴포넌트
- `ag-grid-community` - AG Grid Community (v35+)

---

### ✅ 완료된 작업

- [x] Clean Architecture 폴더 구조 생성
- [x] Domain/Application/Infrastructure 레이어 구현
- [x] 월간 생산 계획서 화면 (Recharts + OR-Tools)
- [x] PSI 계획표 화면 (AG Grid)
- [x] OR-Tools 리소스 문서화
- [x] 환경 변수 템플릿 및 가이드

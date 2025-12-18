# SpacePro Changelog

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

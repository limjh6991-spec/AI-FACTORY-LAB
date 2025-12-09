# 📦 AI Factory Lab - 프로젝트 구조

> **최종 업데이트**: 2025년 12월 9일

## 📁 폴더 구조

```
ai-factory-lab/
│
├── 📄 설정 파일
│   ├── package.json              # npm 패키지 설정
│   ├── tsconfig.json             # TypeScript 설정
│   ├── next.config.js            # Next.js 설정
│   ├── postcss.config.js         # PostCSS 설정
│   ├── components.json           # shadcn/ui 설정
│   ├── docker-compose.yml        # Docker 개발환경
│   └── docker-compose.vector.yml # Chroma Vector DB
│
├── 📄 루트 문서
│   ├── README.md                 # 프로젝트 소개
│   ├── ENVIRONMENT.md            # 환경 설정 가이드
│   ├── PROJECT_ROADMAP.md        # 프로젝트 로드맵
│   ├── PROJECT_STRUCTURE.md      # 이 파일
│   ├── JARVIS_RECONNECT_PROMPT.md # 재연결 프롬프트
│   └── SECURITY_NOTICE.md        # 보안 공지
│
├── 📁 prisma/                    # Prisma ORM
│   ├── schema.prisma             # DB 스키마 정의
│   └── seed.ts                   # 초기 데이터
│
├── 📁 src/                       # 소스 코드
│   │
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── page.tsx              # 메인 페이지
│   │   ├── layout.tsx            # 레이아웃
│   │   ├── master/               # 기준정보 관리
│   │   │   └── dept/             # ⭐ 부서관리 (표준 CRUD 화면)
│   │   ├── screens/              # 생성된 화면들
│   │   │   ├── [screenId]/       # 동적 화면 라우트
│   │   │   ├── temp/             # 임시화면 관리 페이지
│   │   │   ├── ag-grid-examples/ # AG Grid 스타일 예시
│   │   │   └── sc000001~021/     # 발행된 화면들
│   │   ├── settings/             # 설정 페이지
│   │   │   ├── menu/             # 메뉴 관리
│   │   │   └── screen-generator/ # ⭐ 화면 생성기 UI
│   │   │       └── _components/
│   │   │           ├── SimpleMode.tsx   # 간편 모드 (CRUD)
│   │   │           ├── ExcelMode.tsx    # Excel 모드
│   │   │           ├── LogPanel.tsx     # 로그 패널
│   │   │           └── types.ts         # 타입 정의
│   │   └── api/                  # API 라우트
│   │
│   ├── 📁 components/            # 공통 컴포넌트
│   │   ├── Header.tsx            # 헤더
│   │   ├── Sidebar.tsx           # 사이드바
│   │   ├── master/               # ⭐ 기준정보 공통 컴포넌트
│   │   │   └── index.tsx         # BiSiteSelect, BiYearMonthPicker 등
│   │   ├── options/              # 옵션 컴포넌트 (Select, DatePicker 등)
│   │   ├── preview/              # Sandpack 미리보기
│   │   │   └── SandpackPreview.tsx
│   │   └── ui/                   # shadcn/ui 컴포넌트
│   │
│   ├── 📁 lib/                   # 유틸리티 및 모듈
│   │   ├── 📁 screen-generator/  # ⭐ 화면 생성 모듈
│   │   │   ├── index.ts          # 메인 exports
│   │   │   ├── types.ts          # 타입 정의
│   │   │   ├── db-metadata.ts    # DB 메타데이터 로딩
│   │   │   ├── id-generator.ts   # 화면 ID 생성
│   │   │   ├── api-key.ts        # Anthropic API 키 관리
│   │   │   ├── query-generator.ts # SQL 쿼리 생성 (LLM 교체 가능)
│   │   │   ├── converters/       # 변환 유틸
│   │   │   │   └── to-next-page.ts
│   │   │   ├── templates/        # 코드 템플릿
│   │   │   │   ├── ag-grid-styles.ts
│   │   │   │   ├── react-template.ts
│   │   │   │   └── html-template.ts
│   │   │   ├── prompts/          # AI 프롬프트
│   │   │   │   ├── column-structure.ts
│   │   │   │   ├── json-data-prompt.ts
│   │   │   │   └── react-component-prompt.ts
│   │   │   └── utils/            # 헬퍼 함수
│   │   ├── excel-template-parser.ts  # Excel 템플릿 파서
│   │   ├── vector-search.ts      # Vector DB 검색
│   │   └── utils.ts              # 공통 유틸
│   │
│   ├── 📁 server/                # 서버 사이드
│   │   ├── api/
│   │   │   ├── root.ts           # tRPC 라우터 루트
│   │   │   ├── trpc.ts           # tRPC 설정
│   │   │   └── routers/          # API 라우터들
│   │   │       ├── screenGenerator/  # ⭐ 화면 생성기 (모듈화)
│   │   │       │   ├── index.ts      # 라우터 정의
│   │   │       │   ├── _shared/      # 공통 타입/유틸
│   │   │       │   │   └── types.ts
│   │   │       │   ├── procedures/   # tRPC 프로시저
│   │   │       │   │   ├── preview.ts
│   │   │       │   │   ├── publish.ts
│   │   │       │   │   ├── query.ts
│   │   │       │   │   ├── tempScreen.ts
│   │   │       │   │   └── validate.ts
│   │   │       │   └── templates/    # 화면 유형별 템플릿
│   │   │       │       ├── base/
│   │   │       │       │   ├── BaseTemplate.ts
│   │   │       │       │   └── index.ts
│   │   │       │       └── simpleGridCrud/
│   │   │       │           ├── SimpleGridCrudTemplate.ts  # ⭐ 표준 템플릿
│   │   │       │           └── index.ts
│   │   │       ├── menu.ts       # 메뉴 API
│   │   │       ├── options.ts    # 옵션 API
│   │   │       ├── biMaster.ts   # 기준정보 API
│   │   │       └── excel.ts      # Excel API
│   │   └── db.ts                 # Prisma 클라이언트
│   │
│   ├── 📁 styles/                # 스타일시트
│   │   └── globals.css           # 전역 스타일
│   │
│   └── 📁 trpc/                  # tRPC 클라이언트
│
├── 📁 scripts/                   # 자동화 스크립트
│   ├── generate-screen.ts        # 통합 화면 생성
│   ├── phase1_extract_screen_definition.ts
│   ├── phase3_generate_ui_component_aggrid.ts
│   ├── collect_db_metadata.ts    # DB 메타데이터 수집
│   ├── embed_db_metadata.ts      # 벡터 임베딩
│   ├── setup_vector_db.ts        # Vector DB 초기화
│   └── generator/                # 생성기 스크립트
│
├── 📁 data/                      # 데이터 파일
│   ├── db_metadata_enhanced.json # DB 메타데이터
│   ├── screen_definitions/       # 화면 정의 JSON
│   ├── generated_queries/        # 생성된 SQL
│   └── report_designs/           # 리포트 디자인
│
├── 📁 generated/                 # 생성된 화면 파일
│   ├── prisma/                   # Prisma Client
│   └── screens/                  # 화면별 폴더
│       ├── temp/                 # 임시화면 (TEMP_xxx)
│       └── SC000001~/            # 발행된 화면
│
├── 📁 resources/                 # 정적 리소스
│   ├── design-system/            # 디자인 시스템
│   │   ├── IBM_CARBON_DESIGN_SYSTEM.md
│   │   └── CARBON_COLOR_TOKENS.md
│   ├── excel/                    # 엑셀 템플릿
│   └── realgrid/                 # RealGrid 리소스
│
├── 📁 docs/                      # 문서
│   ├── QUICK_START.md            # 빠른 시작
│   ├── SCREEN_GENERATOR_GUIDE.md # 화면 생성 가이드
│   ├── AG_GRID_DECISION.md       # AG Grid 결정 문서
│   ├── VECTOR_DB_GUIDE.md        # Vector DB 가이드
│   ├── RAG_IMPLEMENTATION_GUIDE.md # RAG 구현 가이드
│   ├── SESSION_CONTEXT_*.md      # 세션 컨텍스트 (날짜별)
│   └── archive/                  # 아카이브
│
└── 📁 public/                    # 정적 파일
```

---

## 🛠️ 핵심 모듈

### 1. 화면 생성기 API (`src/server/api/routers/screenGenerator/`)

| 폴더/파일 | 역할 |
|-----------|------|
| `index.ts` | tRPC 라우터 정의 |
| `_shared/types.ts` | 공통 타입 (ScreenType, ParsedData 등) |
| `procedures/preview.ts` | 미리보기 생성 (Claude API) |
| `procedures/publish.ts` | 화면 발행 |
| `procedures/tempScreen.ts` | 임시화면 CRUD |
| `templates/base/` | 추상 템플릿 클래스 |
| `templates/simpleGridCrud/` | ⭐ CRUD 화면 템플릿 |

### 2. 화면 생성 라이브러리 (`src/lib/screen-generator/`)

| 파일 | 역할 |
|------|------|
| `index.ts` | 모든 모듈 export |
| `types.ts` | 공통 타입 정의 (ColumnMeta, TableMeta 등) |
| `db-metadata.ts` | DB 메타데이터 로딩 및 검색 |
| `id-generator.ts` | 화면 ID 자동 생성 |
| `api-key.ts` | Anthropic API 키 관리 |
| `query-generator.ts` | SQL 쿼리 생성 (⭐ LLM 교체 가능) |
| `templates/ag-grid-styles.ts` | AG Grid 스타일 상수 |
| `templates/react-template.ts` | React 컴포넌트 템플릿 |

### 3. 기준정보 공통 컴포넌트 (`src/components/master/`)

| 컴포넌트 | 용도 | DB 테이블 |
|----------|------|-----------|
| `BiSiteSelect` | 사업장 | plant_site_code |
| `BiScenarioSelect` | 시나리오 | scenario_code (ACTUAL, PLAN) |
| `BiYearMonthPicker` | 년월 | yyyymm |
| `BiYearPicker` | 년도 | yyyy |
| `BiDeptSelect` | 부서 | bi_dept_mst |
| `BiCostCenterSelect` | 코스트센터 | bi_cost_center |
| `BiUserSelect` | 사원 | bi_user_mst |
| `BiAccountSelect` | 계정 | bi_acct_mst |
| `BiCustomerSelect` | 거래처 | bi_cust_mst |
| `BiProductSelect` | 제품 | bi_prod_mst |

---

## 📐 표준 화면 참조

### CRUD 화면 표준: `/master/dept/page.tsx`

```typescript
// 주요 특징
- AG Grid Community + IBM Carbon Design
- <style jsx global> 사용 (AG Grid 스타일)
- 공통 컴포넌트: BiSiteSelect, BiYearMonthPicker, BiScenarioSelect
- 타입 명시: ColDef, CellValueChangedEvent, IRowNode
- 변경사항 추적: _isNew, _isModified, _isDeleted
- 일괄 저장: inserts, updates, deletes
```

---

## 🚀 사용법

### 개발 서버
```bash
npm run dev
# http://localhost:3000
```

### 빌드
```bash
npm run build
```

### Vector DB 실행
```bash
npm run vector:start    # Chroma + Redis 시작
npm run vector:setup    # 리소스 벡터화
npm run vector:stop     # 중지
```

### 화면 생성
```bash
# 웹 UI로 생성
http://localhost:3000/settings/screen-generator

# CLI로 생성
npx tsx scripts/generate-screen.ts resources/excel/sample.xlsx SC001
```

---

## 📊 통계

| 항목 | 수치 |
|------|------|
| 총 화면 수 | 21개+ (sc000001~021) |
| 옵션 컴포넌트 | 10종 |
| DB 테이블 | 68개 |
| 모듈화된 코드 | 20개+ 파일 |
| 디자인 시스템 | IBM Carbon |

---

**작성일**: 2025년 12월 9일

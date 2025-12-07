# 📦 AI Factory Lab - 프로젝트 구조# 📦 AI Factory Lab - 프로젝트 구조



> **최종 업데이트**: 2025년 12월 7일> 정리 완료일: 2025년 12월 5일



## 📁 폴더 구조## 📁 폴더 구조



``````

ai-factory-lab/ai-factory-lab/

││

├── 📄 설정 파일├── 📄 설정 파일

│   ├── package.json              # npm 패키지 설정│   ├── package.json          # npm 패키지 설정

│   ├── tsconfig.json             # TypeScript 설정│   ├── tsconfig.json         # TypeScript 설정

│   ├── next.config.js            # Next.js 설정│   ├── next.config.js        # Next.js 설정

│   ├── postcss.config.js         # PostCSS 설정│   ├── postcss.config.js     # PostCSS 설정

│   ├── components.json           # shadcn/ui 설정│   ├── components.json       # shadcn/ui 설정

│   └── docker-compose.yml        # Docker 개발환경│   ├── docker-compose.yml    # Docker 개발환경

││   └── docker-compose.vector.yml  # Chroma Vector DB

├── 📄 루트 문서│

│   ├── README.md                 # 프로젝트 소개├── 📄 환경 파일

│   ├── ENVIRONMENT.md            # 환경 설정 가이드│   ├── .env                  # 환경 변수 (gitignore)

│   ├── PROJECT_ROADMAP.md        # 프로젝트 로드맵│   └── .env.example          # 환경 변수 템플릿

│   ├── PROJECT_STRUCTURE.md      # 이 파일│

│   ├── JARVIS_RECONNECT_PROMPT.md # 재연결 프롬프트├── 📄 루트 문서

│   └── SECURITY_NOTICE.md        # 보안 공지│   ├── README.md             # 프로젝트 소개

││   ├── ENVIRONMENT.md        # 환경 설정 가이드

├── 📁 prisma/                    # Prisma ORM│   ├── PROJECT_ROADMAP.md    # 프로젝트 로드맵

│   ├── schema.prisma             # DB 스키마 정의│   └── SECURITY_NOTICE.md    # 보안 공지

│   └── seed.ts                   # 초기 데이터│

│├── 📁 prisma/                # Prisma ORM

├── 📁 src/                       # 소스 코드│   ├── schema.prisma         # DB 스키마 정의

│   ││   └── seed.ts               # 초기 데이터

│   ├── 📁 app/                   # Next.js App Router│

│   │   ├── page.tsx              # 메인 페이지├── 📁 src/                   # 소스 코드

│   │   ├── layout.tsx            # 레이아웃│   ├── app/                  # Next.js App Router

│   │   ├── screens/              # 생성된 화면들│   │   ├── page.tsx          # 메인 페이지

│   │   │   ├── [screenId]/       # 동적 화면 라우트│   │   ├── layout.tsx        # 레이아웃

│   │   │   ├── temp/             # 임시화면 관리 페이지│   │   ├── screens/          # 생성된 화면들

│   │   │   ├── grid-examples/    # 그리드 스타일 예시│   │   │   ├── [screenId]/   # 🆕 동적 화면 라우트

│   │   │   └── sc000001~017/     # 발행된 화면들│   │   │   ├── temp/         # 🆕 임시화면 관리 페이지

│   │   ├── settings/             # 설정 페이지│   │   │   ├── ag-grid-examples/  # AG Grid 샘플

│   │   │   ├── menu/             # 메뉴 관리│   │   │   └── sc982157/     # 생성된 화면 예시

│   │   │   └── screen-generator/ # 화면 생성기 UI│   │   ├── settings/         # 🆕 설정 페이지

│   │   └── api/                  # API 라우트│   │   │   └── screen-generator/  # 🆕 화면 생성기 UI

│   ││   │   └── api/              # API 라우트

│   ├── 📁 components/            # 공통 컴포넌트│   │       └── screens/      # 🆕 화면 API

│   │   ├── Header.tsx            # 헤더│   ├── components/           # 공통 컴포넌트

│   │   ├── Sidebar.tsx           # 사이드바│   │   ├── Header.tsx

│   │   ├── options/              # 옵션 컴포넌트 (Select, DatePicker 등)│   │   ├── Sidebar.tsx

│   │   └── ui/                   # shadcn/ui 컴포넌트│   │   └── ui/               # shadcn/ui 컴포넌트

│   ││   ├── server/               # 서버 사이드

│   ├── 📁 lib/                   # 유틸리티 및 모듈│   │   ├── api/

│   │   ├── 📁 screen-generator/  # ⭐ 화면 생성 모듈 (NEW)│   │   │   ├── root.ts       # tRPC 라우터 루트

│   │   │   ├── index.ts          # 메인 exports│   │   │   ├── trpc.ts       # tRPC 설정

│   │   │   ├── types.ts          # 타입 정의│   │   │   └── routers/      # API 라우터들

│   │   │   ├── db-metadata.ts    # DB 메타데이터 로딩│   │   │       └── screenGenerator.ts  # 🆕 화면 생성기 API

│   │   │   ├── id-generator.ts   # 화면 ID 생성│   │   └── db.ts             # Prisma 클라이언트

│   │   │   ├── api-key.ts        # API 키 관리│   ├── lib/                  # 유틸리티

│   │   │   ├── query-generator.ts # SQL 쿼리 생성│   │   └── excel-template-parser.ts  # 🆕 Excel 템플릿 파서

│   │   │   ├── converters/       # 변환 유틸│   ├── styles/               # 스타일시트

│   │   │   ├── templates/        # 코드 템플릿│   └── trpc/                 # tRPC 클라이언트

│   │   │   ├── prompts/          # AI 프롬프트│

│   │   │   └── utils/            # 헬퍼 함수├── 📁 scripts/               # 자동화 스크립트

│   │   ├── excel-template-parser.ts  # Excel 템플릿 파서│   ├── setup.sh              # 🆕 설치 스크립트

│   │   ├── vector-search.ts      # Vector DB 검색│   ├── init-db.sh            # 🆕 DB 초기화

│   │   └── utils.ts              # 공통 유틸│   ├── generate-screen.ts    # 🆕 통합 화면 생성

│   ││   │

│   ├── 📁 server/                # 서버 사이드│   │  [Phase 1: 화면 정의]

│   │   ├── api/│   ├── phase1_extract_screen_definition.ts

│   │   │   ├── root.ts           # tRPC 라우터 루트│   │

│   │   │   ├── trpc.ts           # tRPC 설정│   │  [Phase 2: SQL 생성]

│   │   │   └── routers/          # API 라우터들│   ├── generate_report_with_rag.ts

│   │   │       ├── screenGenerator.ts  # 화면 생성기 API│   │

│   │   │       ├── menu.ts       # 메뉴 API│   │  [Phase 3: UI 생성]

│   │   │       ├── options.ts    # 옵션 API│   ├── phase3_generate_ui_component.ts

│   │   │       └── excel.ts      # Excel API│   ├── phase3_generate_ui_component_aggrid.ts

│   │   └── db.ts                 # Prisma 클라이언트│   │

│   ││   │  [Phase 4: API 연결]

│   ├── 📁 styles/                # 스타일시트│   ├── connect_screen_query.ts

│   │   └── globals.css           # 전역 스타일│   ├── validate_generated_code.ts

│   ││   │

│   └── 📁 trpc/                  # tRPC 클라이언트│   │  [유틸리티]

││   ├── collect_db_metadata.ts     # DB 메타데이터 수집

├── 📁 scripts/                   # 자동화 스크립트│   ├── improve_db_metadata.ts     # 메타데이터 개선

│   ├── generate-screen.ts        # 통합 화면 생성│   ├── embed_db_metadata.ts       # 벡터 임베딩

│   ├── phase1_extract_screen_definition.ts│   └── setup_vector_db.ts         # Vector DB 초기화

│   ├── phase3_generate_ui_component_aggrid.ts│

│   ├── collect_db_metadata.ts    # DB 메타데이터 수집├── 📁 data/                  # 데이터 파일

│   └── generator/                # 생성기 스크립트│   ├── db_metadata_enhanced.json  # DB 메타데이터

││   ├── screen_definitions/   # 화면 정의

├── 📁 data/                      # 데이터 파일│   ├── generated_queries/    # 생성된 SQL

│   ├── db_metadata_enhanced.json # DB 메타데이터│   ├── report_designs/       # 리포트 디자인

│   ├── screen_definitions/       # 화면 정의 JSON│   └── sample_excel/         # 샘플 엑셀

│   ├── generated_queries/        # 생성된 SQL│

│   └── report_designs/           # 리포트 디자인├── 📁 generated/             # 🆕 생성된 화면 파일

││   └── screens/              # 화면별 폴더

├── 📁 generated/                 # 생성된 화면 파일│       ├── temp/             # 임시화면 (TEMP_xxx)

│   ├── prisma/                   # Prisma Client│       └── SC000001/         # 발행된 화면

│   └── screens/                  # 화면별 폴더│           ├── metadata.json

│       ├── temp/                 # 임시화면 (TEMP_xxx)│           ├── preview.html

│       └── SC000001~/            # 발행된 화면│           ├── query.sql

││           └── component.tsx

├── 📁 resources/                 # 정적 리소스│

│   ├── design-system/            # 디자인 시스템├── 📁 resources/             # 정적 리소스

│   ├── excel/                    # 엑셀 템플릿│   ├── design-system/        # 디자인 시스템

│   └── realgrid/                 # RealGrid 리소스│   ├── excel/                # 엑셀 템플릿

││   └── realgrid/             # RealGrid 리소스

├── 📁 docs/                      # 문서│

│   ├── QUICK_START.md            # 빠른 시작├── 📁 docs/                  # 문서

│   ├── SCREEN_GENERATOR_GUIDE.md # 화면 생성 가이드│   ├── QUICK_START.md        # 빠른 시작

│   ├── AG_GRID_DECISION.md       # AG Grid 결정 문서│   ├── SCREEN_GENERATOR_GUIDE.md  # 화면 생성 가이드

│   └── archive/                  # 아카이브│   ├── SCREEN_GENERATOR_IMPLEMENTATION.md  # 🆕 화면 생성기 구현 문서

││   ├── TEMP_SCREEN_MANAGEMENT.md  # 🆕 임시화면 관리 시스템

└── 📁 public/                    # 정적 파일│   ├── REACT_COMPONENT_GENERATION.md  # 🆕 React 컴포넌트 생성

```│   ├── EXCEL_TEMPLATE_GUIDE.md  # 🆕 Excel 템플릿 가이드

│   ├── LAYOUT_FIX_LOG.md     # 🆕 레이아웃 수정 이력

---│   ├── RAG_IMPLEMENTATION_GUIDE.md # RAG 구현 가이드

│   ├── VECTOR_DB_GUIDE.md    # Vector DB 가이드

## 🛠️ 핵심 모듈│   ├── AG_GRID_DECISION.md   # AG Grid 결정 문서

│   └── archive/              # 아카이브 (세션 기록)

### src/lib/screen-generator/ (NEW - 2025.12.07)│

└── 📁 public/                # 정적 파일

| 파일 | 역할 |```

|------|------|

| `index.ts` | 모든 모듈 export |## 🛠️ 핵심 스크립트

| `types.ts` | 공통 타입 정의 (ColumnMeta, TableMeta 등) |

| `db-metadata.ts` | DB 메타데이터 로딩 및 검색 || 스크립트 | 역할 | API |

| `id-generator.ts` | 화면 ID 자동 생성 ||---------|------|-----|

| `api-key.ts` | Anthropic API 키 관리 || `generate-screen.ts` | **통합 화면 생성** (Phase 1-4) | All |

| `query-generator.ts` | SQL 쿼리 생성 (⭐ LLM 교체 가능) || `phase1_extract_screen_definition.ts` | 엑셀 → 화면 정의 | Claude |

| `templates/ag-grid-styles.ts` | AG Grid 스타일 상수 || `generate_report_with_rag.ts` | SQL 쿼리 생성 | Claude + RAG |

| `templates/react-template.ts` | React 컴포넌트 템플릿 || `phase3_generate_ui_component_aggrid.ts` | AG Grid 컴포넌트 | Claude |

| `prompts/react-component-prompt.ts` | AI 프롬프트 빌더 || `connect_screen_query.ts` | tRPC 라우터 생성 | Claude |

| `validate_generated_code.ts` | 코드 자동 검증 | Local |

### src/server/api/routers/

## 🚀 사용법

| 파일 | 역할 |

|------|------|### 설치

| `screenGenerator.ts` | 화면 생성기 tRPC API (1,217줄) |```bash

| `menu.ts` | 메뉴 CRUD API |./scripts/setup.sh

| `options.ts` | 옵션 데이터 API |```

| `excel.ts` | Excel 처리 API |

### DB 초기화

---```bash

./scripts/init-db.sh

## 🚀 사용법```



### 개발 서버### 화면 생성

```bash```bash

npm run devnpx tsx scripts/generate-screen.ts resources/excel/sample.xlsx SC001

``````



### 빌드### 개발 서버

```bash```bash

npm run buildnpm run dev

``````



### 화면 생성## 📊 삭제된 파일 요약

```bash

# 웹 UI로 생성| 분류 | 삭제 파일 수 |

http://localhost:3000/settings/screen-generator|-----|-------------|

| 테스트 스크립트 (test_*.ts) | 16개 |

# CLI로 생성| Python 스크립트 (*.py) | 4개 |

npx tsx scripts/generate-screen.ts resources/excel/sample.xlsx SC001| MSSQL/DWIS 메타데이터 | 2개 폴더 |

```| 백업 파일 (*.backup) | 3개 |

| 임시 데이터 (test_*.xlsx) | 1개 |

---| 세션 문서 (SESSION_*.md) | 4개 → archive 이동 |



## 📊 통계## ✅ 필수 파일 체크리스트



| 항목 | 수치 |- [x] `package.json` - npm 설정

|------|------|- [x] `tsconfig.json` - TypeScript 설정

| 총 화면 수 | 17개+ (sc000001~017) |- [x] `next.config.js` - Next.js 설정

| 옵션 컴포넌트 | 10종 |- [x] `prisma/schema.prisma` - DB 스키마

| DB 테이블 | 68개 |- [x] `.env.example` - 환경 변수 템플릿

| 모듈화된 코드 | 15개 파일 |- [x] `src/server/api/root.ts` - tRPC 루트

- [x] `data/db_metadata_enhanced.json` - DB 메타데이터

---- [x] `scripts/generate-screen.ts` - 통합 생성 스크립트

- [x] `README.md` - 프로젝트 소개

**작성일**: 2025년 12월 7일

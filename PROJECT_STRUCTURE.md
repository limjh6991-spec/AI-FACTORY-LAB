# 📦 AI Factory Lab - 프로젝트 구조

> 정리 완료일: 2025년 12월 5일

## 📁 폴더 구조

```
ai-factory-lab/
│
├── 📄 설정 파일
│   ├── package.json          # npm 패키지 설정
│   ├── tsconfig.json         # TypeScript 설정
│   ├── next.config.js        # Next.js 설정
│   ├── postcss.config.js     # PostCSS 설정
│   ├── components.json       # shadcn/ui 설정
│   ├── docker-compose.yml    # Docker 개발환경
│   └── docker-compose.vector.yml  # Chroma Vector DB
│
├── 📄 환경 파일
│   ├── .env                  # 환경 변수 (gitignore)
│   └── .env.example          # 환경 변수 템플릿
│
├── 📄 루트 문서
│   ├── README.md             # 프로젝트 소개
│   ├── ENVIRONMENT.md        # 환경 설정 가이드
│   ├── PROJECT_ROADMAP.md    # 프로젝트 로드맵
│   └── SECURITY_NOTICE.md    # 보안 공지
│
├── 📁 prisma/                # Prisma ORM
│   ├── schema.prisma         # DB 스키마 정의
│   └── seed.ts               # 초기 데이터
│
├── 📁 src/                   # 소스 코드
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # 메인 페이지
│   │   ├── layout.tsx        # 레이아웃
│   │   ├── screens/          # 생성된 화면들
│   │   │   ├── ag-grid-examples/  # AG Grid 샘플
│   │   │   └── sc982157/     # 생성된 화면 예시
│   │   └── api/              # API 라우트
│   ├── components/           # 공통 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── ui/               # shadcn/ui 컴포넌트
│   ├── server/               # 서버 사이드
│   │   ├── api/
│   │   │   ├── root.ts       # tRPC 라우터 루트
│   │   │   ├── trpc.ts       # tRPC 설정
│   │   │   └── routers/      # API 라우터들
│   │   └── db.ts             # Prisma 클라이언트
│   ├── lib/                  # 유틸리티
│   ├── styles/               # 스타일시트
│   └── trpc/                 # tRPC 클라이언트
│
├── 📁 scripts/               # 자동화 스크립트
│   ├── setup.sh              # 🆕 설치 스크립트
│   ├── init-db.sh            # 🆕 DB 초기화
│   ├── generate-screen.ts    # 🆕 통합 화면 생성
│   │
│   │  [Phase 1: 화면 정의]
│   ├── phase1_extract_screen_definition.ts
│   │
│   │  [Phase 2: SQL 생성]
│   ├── generate_report_with_rag.ts
│   │
│   │  [Phase 3: UI 생성]
│   ├── phase3_generate_ui_component.ts
│   ├── phase3_generate_ui_component_aggrid.ts
│   │
│   │  [Phase 4: API 연결]
│   ├── connect_screen_query.ts
│   ├── validate_generated_code.ts
│   │
│   │  [유틸리티]
│   ├── collect_db_metadata.ts     # DB 메타데이터 수집
│   ├── improve_db_metadata.ts     # 메타데이터 개선
│   ├── embed_db_metadata.ts       # 벡터 임베딩
│   └── setup_vector_db.ts         # Vector DB 초기화
│
├── 📁 data/                  # 데이터 파일
│   ├── db_metadata_enhanced.json  # DB 메타데이터
│   ├── screen_definitions/   # 화면 정의
│   ├── generated_queries/    # 생성된 SQL
│   ├── report_designs/       # 리포트 디자인
│   └── sample_excel/         # 샘플 엑셀
│
├── 📁 resources/             # 정적 리소스
│   ├── design-system/        # 디자인 시스템
│   ├── excel/                # 엑셀 템플릿
│   └── realgrid/             # RealGrid 리소스
│
├── 📁 docs/                  # 문서
│   ├── QUICK_START.md        # 빠른 시작
│   ├── SCREEN_GENERATOR_GUIDE.md  # 화면 생성 가이드
│   ├── RAG_IMPLEMENTATION_GUIDE.md # RAG 구현 가이드
│   ├── VECTOR_DB_GUIDE.md    # Vector DB 가이드
│   ├── AG_GRID_DECISION.md   # AG Grid 결정 문서
│   └── archive/              # 아카이브 (세션 기록)
│
└── 📁 public/                # 정적 파일
```

## 🛠️ 핵심 스크립트

| 스크립트 | 역할 | API |
|---------|------|-----|
| `generate-screen.ts` | **통합 화면 생성** (Phase 1-4) | All |
| `phase1_extract_screen_definition.ts` | 엑셀 → 화면 정의 | Claude |
| `generate_report_with_rag.ts` | SQL 쿼리 생성 | Claude + RAG |
| `phase3_generate_ui_component_aggrid.ts` | AG Grid 컴포넌트 | Claude |
| `connect_screen_query.ts` | tRPC 라우터 생성 | Claude |
| `validate_generated_code.ts` | 코드 자동 검증 | Local |

## 🚀 사용법

### 설치
```bash
./scripts/setup.sh
```

### DB 초기화
```bash
./scripts/init-db.sh
```

### 화면 생성
```bash
npx tsx scripts/generate-screen.ts resources/excel/sample.xlsx SC001
```

### 개발 서버
```bash
npm run dev
```

## 📊 삭제된 파일 요약

| 분류 | 삭제 파일 수 |
|-----|-------------|
| 테스트 스크립트 (test_*.ts) | 16개 |
| Python 스크립트 (*.py) | 4개 |
| MSSQL/DWIS 메타데이터 | 2개 폴더 |
| 백업 파일 (*.backup) | 3개 |
| 임시 데이터 (test_*.xlsx) | 1개 |
| 세션 문서 (SESSION_*.md) | 4개 → archive 이동 |

## ✅ 필수 파일 체크리스트

- [x] `package.json` - npm 설정
- [x] `tsconfig.json` - TypeScript 설정
- [x] `next.config.js` - Next.js 설정
- [x] `prisma/schema.prisma` - DB 스키마
- [x] `.env.example` - 환경 변수 템플릿
- [x] `src/server/api/root.ts` - tRPC 루트
- [x] `data/db_metadata_enhanced.json` - DB 메타데이터
- [x] `scripts/generate-screen.ts` - 통합 생성 스크립트
- [x] `README.md` - 프로젝트 소개

# 🤖 JARVIS 재연결 프롬프트# 🤖 JARVIS 재연결 프롬프트



> **최종 업데이트**: 2025년 12월 7일  > **최종 업데이트**: 2025년 12월 6일  

> **목적**: 새로운 세션에서 프로젝트 현황을 빠르게 파악> **버전**: 5.0  

> **목적**: 새로운 세션에서 프로젝트 현황을 빠르게 파악

---

---

## 📚 필수 읽기 파일

## 📚 필수 읽기 파일

| 순서 | 파일 | 내용 |

|------|------|------|재접속 시 아래 파일들을 순서대로 읽어주세요:

| 1 | `README.md` | 프로젝트 개요 |

| 2 | `ENVIRONMENT.md` | 환경 설정, API 키 || 순서 | 파일 | 내용 | 소요시간 |

| 3 | `PROJECT_ROADMAP.md` | 진행 현황 ||------|------|------|----------|

| 4 | `PROJECT_STRUCTURE.md` | 폴더 구조 || 1 | `README.md` | 프로젝트 개요, 기술 스택, 진행률 | 3분 |

| 2 | `ENVIRONMENT.md` | 개발 환경, 포트, API 키, 디자인 체크리스트 | 3분 |

---| 3 | `PROJECT_ROADMAP.md` | 9주 로드맵, 현재 Phase, 상세 계획 | 5분 |



## 📋 재연결 프롬프트 (복사용)### 상황별 추가 파일



```| 작업 | 파일 |

안녕하세요, 자비스! 👋|------|------|

| Vector DB | `docs/VECTOR_DB_GUIDE.md` |

AI Factory Lab 프로젝트를 계속 진행합니다.| RAG 시스템 | `docs/RAG_IMPLEMENTATION_GUIDE.md` |

아래 파일들을 읽고 현황을 파악해주세요:| 화면 생성 | `docs/SCREEN_GENERATOR_GUIDE.md` |

| AG Grid | `docs/AG_GRID_DECISION.md` |

1. README.md| 디자인 | `resources/design-system/IBM_CARBON_DESIGN_SYSTEM.md` |

2. ENVIRONMENT.md  | 히스토리 | `docs/archive/SESSION_SUMMARY_*.md` |

3. PROJECT_ROADMAP.md

4. PROJECT_STRUCTURE.md---

```

## 📋 재연결 프롬프트 (복사용)

---

```

## 🎯 프로젝트 핵심 정보안녕하세요, 자비스! 👋



### 목표AI Factory Lab 프로젝트를 계속 진행합니다.

**Excel 파일 업로드 → AI 분석 → Grid 자동 생성**아래 파일들을 읽고 현황을 파악해주세요:



### 기술 스택1. README.md

| 분류 | 기술 |2. ENVIRONMENT.md  

|------|------|3. PROJECT_ROADMAP.md

| Frontend | Next.js 15.5.6 + TypeScript 5.8 |

| Styling | Tailwind CSS v4 + shadcn/ui |요약에 포함할 내용:

| Design | IBM Carbon Design System |- 프로젝트 목표 및 현재 단계

| Grid | AG Grid Community |- 완료된 주요 작업 (최대 5개)

| Backend | tRPC v11 + Prisma 6.19.0 |- 다음 할 작업 (우선순위 순)

| Database | PostgreSQL 16 |- 환경 상태 (DB, API 등)

| AI | Claude Sonnet 4 |```



### 환경---

```

PostgreSQL:  localhost:5432 (ai_factory_db)## 🎯 프로젝트 핵심 정보

Next.js:     localhost:3000 (또는 3001)

```### 목표

**Excel 파일 업로드 → AI 분석 → Grid/Chart 자동 생성**

---

### 기술 스택

## 🗂️ 핵심 모듈 구조| 분류 | 기술 |

|------|------|

### src/lib/screen-generator/ (2025.12.07 모듈화 완료)| Frontend | Next.js 15.5.6 + TypeScript 5.8 |

```| Styling | Tailwind CSS v4 + shadcn/ui |

screen-generator/| Design | IBM Carbon Design System |

├── index.ts              # 메인 exports| Backend | tRPC v11 + Prisma 6.19.0 |

├── types.ts              # 타입 정의| Database | PostgreSQL 16 (68 테이블) |

├── db-metadata.ts        # DB 메타데이터| Vector DB | Chroma (localhost:8000) |

├── id-generator.ts       # 화면 ID 생성| AI | Gemini 2.5 Flash + Claude Sonnet-4 |

├── api-key.ts            # API 키 관리

├── query-generator.ts    # SQL 생성 (LLM 교체 가능)### 환경

├── converters/           # 변환 유틸```

├── templates/            # 코드 템플릿PostgreSQL:  localhost:5432 (ai_factory_db)

├── prompts/              # AI 프롬프트Next.js:     localhost:3001

└── utils/                # 헬퍼 함수Chroma:      localhost:8000

```Redis:       localhost:6379

```

### src/server/api/routers/screenGenerator.ts

- tRPC 라우터 (1,217줄)---

- 화면 생성, 미리보기, 발행 API

## ⚠️ 주의사항

---

### 🔴 API 키 401 오류 (반복 발생!)

## ⚠️ 주의사항- **증상**: Claude API 호출 시 401 인증 오류, "API 키가 잘려있습니다 (16자)"

- **원인**: 셸 환경 변수에 잘린 API 키가 남아있어 .env 파일을 덮어씀

### 🔴 API 키 관리- **진단**: `echo $ANTHROPIC_API_KEY | wc -c` (17 이하면 문제)

- `.env` 파일 커밋 금지- **해결**: `getAnthropicApiKey()` 함수로 파일에서 직접 읽기 (이미 적용됨)

- `getAnthropicApiKey()` 함수로 파일에서 직접 읽기- **상세**: `ENVIRONMENT.md` → "문제 7: 셸 환경 변수가 .env 파일을 덮어씀" 참조



### 디자인 스타일### 보안

- 모든 새 화면은 **IBM Carbon Design** 스타일 적용- `.env` 파일 절대 커밋 금지

- 헤더 배경: `bg-blue-100` (#dbeafe)- `GEMINI_API_KEY`, `ANTHROPIC_API_KEY` 로컬만 보관

- 자세한 내용: `SECURITY_NOTICE.md`

---

### 디자인

## 🚀 빠른 시작- 모든 새 화면은 **IBM Carbon Design** 스타일 적용

- 색상 팔레트: `resources/design-system/CARBON_COLOR_TOKENS.md`

```bash- 컴포넌트: `resources/design-system/IBM_CARBON_DESIGN_SYSTEM.md`

# 개발 서버

npm run dev### 문서 위치

```

# 빌드docs/              → 활성 가이드 문서

npm run builddocs/archive/      → 세션 요약, 히스토리, 이전 문서

resources/         → 디자인 시스템, Excel 템플릿

# 화면 생성기```

http://localhost:3000/settings/screen-generator

```---



---## 🚀 빠른 시작



## 📂 주요 화면```bash

# 개발 서버

| 경로 | 설명 |npm run dev

|------|------|

| `/settings/screen-generator` | 화면 생성기 UI |# Vector DB

| `/screens/temp` | 임시화면 관리 |npm run vector:start

| `/screens/sc000001~017` | 발행된 화면들 |

| `/settings/menu` | 메뉴 관리 |# 브라우저

http://localhost:3001

---

# Git 상태

**작성일**: 2025년 12월 7일git status

```

---

## 📂 프로젝트 구조

```
ai-factory-lab/
├── README.md                    # 프로젝트 개요
├── ENVIRONMENT.md               # 환경 설정
├── PROJECT_ROADMAP.md           # 로드맵
├── JARVIS_RECONNECT_PROMPT.md   # 이 파일
├── SECURITY_NOTICE.md           # 보안 가이드
│
├── docs/
│   ├── VECTOR_DB_GUIDE.md       # Vector DB 완전 가이드
│   ├── RAG_IMPLEMENTATION_GUIDE.md
│   ├── AG_GRID_DECISION.md
│   ├── SCREEN_GENERATOR_GUIDE.md
│   └── archive/                 # 히스토리
│
├── resources/
│   └── design-system/
│       ├── IBM_CARBON_DESIGN_SYSTEM.md
│       ├── CARBON_COLOR_TOKENS.md
│       └── LAYOUT_GOLDEN_RATIO.md
│
├── src/
│   ├── app/                     # Next.js App Router
│   └── components/
│       ├── Sidebar.tsx          # Carbon 사이드바
│       ├── Header.tsx           # Carbon 헤더
│       └── ui/                  # shadcn 컴포넌트
│
├── scripts/                     # 자동화 스크립트
├── data/                        # 메타데이터, JSON
└── prisma/                      # DB 스키마
```

---

**작성일**: 2025년 12월 6일  
**현재 상태**: Week 3 진행 중 (40%)

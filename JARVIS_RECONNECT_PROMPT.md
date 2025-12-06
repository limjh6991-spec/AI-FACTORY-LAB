# 🤖 JARVIS 재연결 프롬프트

> **최종 업데이트**: 2025년 12월 6일  
> **버전**: 5.0  
> **목적**: 새로운 세션에서 프로젝트 현황을 빠르게 파악

---

## 📚 필수 읽기 파일

재접속 시 아래 파일들을 순서대로 읽어주세요:

| 순서 | 파일 | 내용 | 소요시간 |
|------|------|------|----------|
| 1 | `README.md` | 프로젝트 개요, 기술 스택, 진행률 | 3분 |
| 2 | `ENVIRONMENT.md` | 개발 환경, 포트, API 키, 디자인 체크리스트 | 3분 |
| 3 | `PROJECT_ROADMAP.md` | 9주 로드맵, 현재 Phase, 상세 계획 | 5분 |

### 상황별 추가 파일

| 작업 | 파일 |
|------|------|
| Vector DB | `docs/VECTOR_DB_GUIDE.md` |
| RAG 시스템 | `docs/RAG_IMPLEMENTATION_GUIDE.md` |
| 화면 생성 | `docs/SCREEN_GENERATOR_GUIDE.md` |
| AG Grid | `docs/AG_GRID_DECISION.md` |
| 디자인 | `resources/design-system/IBM_CARBON_DESIGN_SYSTEM.md` |
| 히스토리 | `docs/archive/SESSION_SUMMARY_*.md` |

---

## 📋 재연결 프롬프트 (복사용)

```
안녕하세요, 자비스! 👋

AI Factory Lab 프로젝트를 계속 진행합니다.
아래 파일들을 읽고 현황을 파악해주세요:

1. README.md
2. ENVIRONMENT.md  
3. PROJECT_ROADMAP.md

요약에 포함할 내용:
- 프로젝트 목표 및 현재 단계
- 완료된 주요 작업 (최대 5개)
- 다음 할 작업 (우선순위 순)
- 환경 상태 (DB, API 등)
```

---

## 🎯 프로젝트 핵심 정보

### 목표
**Excel 파일 업로드 → AI 분석 → Grid/Chart 자동 생성**

### 기술 스택
| 분류 | 기술 |
|------|------|
| Frontend | Next.js 15.5.6 + TypeScript 5.8 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Design | IBM Carbon Design System |
| Backend | tRPC v11 + Prisma 6.19.0 |
| Database | PostgreSQL 16 (68 테이블) |
| Vector DB | Chroma (localhost:8000) |
| AI | Gemini 2.5 Flash + Claude Sonnet-4 |

### 환경
```
PostgreSQL:  localhost:5432 (ai_factory_db)
Next.js:     localhost:3001
Chroma:      localhost:8000
Redis:       localhost:6379
```

---

## ⚠️ 주의사항

### 보안
- `.env` 파일 절대 커밋 금지
- `GEMINI_API_KEY`, `ANTHROPIC_API_KEY` 로컬만 보관
- 자세한 내용: `SECURITY_NOTICE.md`

### 디자인
- 모든 새 화면은 **IBM Carbon Design** 스타일 적용
- 색상 팔레트: `resources/design-system/CARBON_COLOR_TOKENS.md`
- 컴포넌트: `resources/design-system/IBM_CARBON_DESIGN_SYSTEM.md`

### 문서 위치
```
docs/              → 활성 가이드 문서
docs/archive/      → 세션 요약, 히스토리, 이전 문서
resources/         → 디자인 시스템, Excel 템플릿
```

---

## 🚀 빠른 시작

```bash
# 개발 서버
npm run dev

# Vector DB
npm run vector:start

# 브라우저
http://localhost:3001

# Git 상태
git status
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

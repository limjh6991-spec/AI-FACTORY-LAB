# Screen Generator

> **RealGrid 기반 자동 화면 생성 시스템**  
> RAG-Enhanced Pattern Learning + Hybrid LLM (Gemini → Ollama)

---

## 🎯 프로젝트 개요

**목표**: DB 테이블 선택 → AI 분석 → RealGrid CRUD 화면 자동 생성

---

## 🏗️ Clean Architecture 구조

```
src/
├── app/                        # Presentation Layer (UI, API Routes)
│   └── ...
│
├── domain/                     # Domain Layer (핵심 비즈니스 로직)
│   ├── entities/               # 엔티티 및 타입 정의
│   │   ├── block-schema.ts     # 블록 스키마 정의
│   │   └── search-components.ts # 검색 컴포넌트 타입
│   └── repositories/           # 리포지토리 인터페이스
│
├── application/                # Application Layer (Use Cases)
│   ├── use-cases/              # 유스케이스
│   ├── services/               # 애플리케이션 서비스
│   │   ├── agent-mapper.ts     # AI 컬럼 매핑 에이전트
│   │   ├── agent-excel-generator.ts
│   │   └── excel-template-parser.ts
│   └── templates/              # 코드 템플릿
│
├── infrastructure/             # Infrastructure Layer (외부 시스템 연동)
│   ├── ai/                     # AI 서비스 (Gemini, Claude)
│   │   └── gemini.ts
│   ├── vector/                 # Vector DB (Chroma)
│   │   └── vector-search.ts
│   └── persistence/            # 데이터베이스
│       └── db-metadata.ts
│
├── server/                     # tRPC Server
│   └── api/routers/            # API 라우터
│
├── components/                 # UI 컴포넌트
├── features/                   # Feature 모듈 (레거시)
└── trpc/                       # tRPC Client
```

### Clean Architecture 계층

```
┌─────────────────────────────────────────────┐
│          Presentation (app/)                 │  UI, API Routes
├─────────────────────────────────────────────┤
│        Application (application/)            │  Use Cases, Services
├─────────────────────────────────────────────┤
│            Domain (domain/)                  │  Entities, Types
├─────────────────────────────────────────────┤
│      Infrastructure (infrastructure/)        │  DB, AI, Vector
└─────────────────────────────────────────────┘
```

---

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# Vector DB 실행
npm run vector:start

# 개발 서버 실행
npm run dev
# http://localhost:3000
```

---

## 📊 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15.5.6 (App Router) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS v4, shadcn/ui |
| Design | IBM Carbon Design System |
| Grid | RealGrid 2.0 |
| API | tRPC |
| ORM | Prisma 6.19.0 |
| Database | PostgreSQL 16 |
| AI | Google Gemini |
| Vector DB | Chroma |

---

## 📋 주요 명령어

```bash
npm run dev           # 개발 서버
npm run build         # 프로덕션 빌드
npm run vector:start  # Vector DB 시작
npm run db:push       # DB 스키마 동기화
```

---

**진행률**: 70%

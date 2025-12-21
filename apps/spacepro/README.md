# SpacePro - MES/MRP 생산계획 관리 시스템

> **Next.js 16 + TypeScript + Clean Architecture 기반 생산 모니터링 대시보드**

## 🚀 프로젝트 개요

SpacePro는 MES/MRP 기반의 **생산 진척현황 모니터링 대시보드** 시스템입니다.
생산 플로우를 시각화하고, KPI를 모니터링하며, 실시간 알람 시스템을 제공합니다.

## 📋 주요 기능

| 기능 | 경로 | 설명 |
|------|------|------|
| 메인 대시보드 | `/` | 생산 현황 종합 |
| 프로젝트 대시보드 | `/projects` | Metronic 스타일 |
| 킥오프 미팅 | `/kickoff` | 프로젝트 착수 준비 가이드 |
| 월간 생산계획 | `/plan/monthly` | PSI 계획 및 OR-Tools 최적화 |
| AI Demo | `/ai-demo` | LUI + MCP + Agent Orchestration |

## 🏗️ Clean Architecture 구조

```
src/
├── app/                        # Next.js App Router (Presentation Layer)
│   ├── page.tsx                # 메인 대시보드
│   ├── projects/               # 프로젝트 대시보드
│   ├── kickoff/                # 킥오프 미팅 키트
│   ├── plan/                   # 생산계획 관리
│   │   ├── monthly/            # 월간 생산계획
│   │   └── psi/                # PSI 계획
│   ├── ai-demo/                # AI 데모 페이지
│   └── api/                    # API Routes
│
├── domain/                     # Domain Layer (핵심 비즈니스 로직)
│   ├── entities/               # 엔티티
│   │   ├── Menu.ts
│   │   ├── ScheduleResult.ts
│   │   └── ...
│   ├── repositories/           # 리포지토리 인터페이스
│   │   ├── MenuRepository.ts
│   │   └── ...
│   └── value-objects/          # 값 객체
│
├── application/                # Application Layer (Use Cases)
│   ├── use-cases/              # 유스케이스
│   │   ├── menu/
│   │   ├── schedule/
│   │   └── ...
│   ├── dto/                    # Data Transfer Objects
│   └── services/               # 애플리케이션 서비스
│
├── infrastructure/             # Infrastructure Layer (외부 시스템 연동)
│   ├── persistence/            # DB 연동
│   │   └── prisma/             # Prisma Repository 구현
│   ├── config/                 # 설정
│   └── external/               # 외부 서비스
│
├── components/                 # UI 컴포넌트
│   ├── dashboard/              # 대시보드 컴포넌트
│   └── layout/                 # 레이아웃 컴포넌트
│
└── lib/                        # 공통 라이브러리
```

### Clean Architecture 계층

```
┌─────────────────────────────────────────────┐
│             Presentation (app/)              │  UI, API Routes
├─────────────────────────────────────────────┤
│         Application (application/)           │  Use Cases, Services
├─────────────────────────────────────────────┤
│             Domain (domain/)                 │  Entities, Repositories
├─────────────────────────────────────────────┤
│       Infrastructure (infrastructure/)       │  DB, External APIs
└─────────────────────────────────────────────┘
```

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Database | PostgreSQL + Prisma 7 |
| OR-Tools | Python 마이크로서비스 (스케줄링 최적화) |

## 🎨 디자인 테마 (Metronic 스타일)

| 색상 | 코드 | 용도 |
|------|------|------|
| Primary | `#3699FF` | 메인 액션 |
| Success | `#1BC5BD` | 완료/성공 |
| Warning | `#FFA800` | 주의/경고 |
| Danger | `#F64E60` | 오류/위험 |
| Dark | `#181C32` | 사이드바 배경 |
| Background | `#F5F8FA` | 페이지 배경 |

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저 접속
http://localhost:3000
```

## 📅 개발 현황

### ✅ 완료
- [x] Prisma 7 + PostgreSQL 연동
- [x] Clean Architecture 구조 적용
- [x] 동적 사이드바 메뉴 시스템
- [x] 월간 생산계획 (`/plan/monthly`)
- [x] AI Demo 페이지 (`/ai-demo`)
- [x] Scheduling Service (Python OR-Tools)

### 🔄 진행 중
- [ ] 마스터 데이터 관리 화면 (품목, BOM, 공정)
- [ ] 생산 오더 관리

## 📁 관련 문서

| 문서 | 설명 |
|------|------|
| `docs/DEVELOPMENT_ROADMAP.md` | 개발 로드맵 |
| `docs/ENV_GUIDE.md` | 환경 변수 설정 가이드 |
| `docs/PRISMA7_SETUP_GUIDE.md` | Prisma 7 설정 가이드 |
| `docs/OR_TOOLS_INTEGRATION.md` | OR-Tools 연동 가이드 |

---

**Created**: 2024년 12월 17일  
**Updated**: 2024년 12월 21일  
**Author**: SpacePro Team

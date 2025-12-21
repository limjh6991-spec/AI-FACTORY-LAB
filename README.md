# 🏭 AI Factory Lab

> **AI 기반 자동화 개발 플랫폼**

---

## 📁 프로젝트 구조

```
ai-factory-lab/
├── README.md                    # 전체 개요 (이 파일)
├── docs/                        # 공통 문서
├── resources/                   # 공통 리소스 (디자인 시스템)
│
└── apps/                        # 애플리케이션
    ├── screen-generator/        # RealGrid 화면 자동 생성기
    ├── binary/                  # Binary Soft (프로젝트 관리)
    ├── spacepro/                # SpacePro (MES/MRP 대시보드)
    └── vertical-ai-factory/     # 다중 에이전트 SQL 생성기
```

---

## 🚀 애플리케이션

### [screen-generator](apps/screen-generator/)
**RealGrid 기반 자동 화면 생성 시스템**
- DB 테이블 선택 → AI 분석 → RealGrid CRUD 화면 생성
- 기술: Next.js 15, TypeScript, Prisma, Gemini API

```bash
cd apps/screen-generator
npm run dev
# http://localhost:3000
```

---

### [binary](apps/binary/)
**Binary Soft - 프로젝트 관리 시스템**
- 프로젝트 현황 파악 및 진행 관리
- 기술: Next.js 16, TypeScript, Tailwind CSS

```bash
cd apps/binary
npm run dev
# http://localhost:3000
```

---

### [spacepro](apps/spacepro/)
**SpacePro - MES/MRP 생산계획 관리**
- 생산 모니터링 대시보드, Clean Architecture
- 기술: Next.js 16, Prisma, OR-Tools

```bash
cd apps/spacepro
npm run dev
# http://localhost:3001
```

---

### [vertical-ai-factory](apps/vertical-ai-factory/)
**다중 에이전트 SQL 생성기**
- Analyst → Writer → Critic 에이전트 협업
- 기술: Python, LangGraph, Gemini

```bash
cd apps/vertical-ai-factory
source venv/bin/activate
python src/main.py
```

---

## 📂 공유 리소스

| 폴더 | 설명 |
|------|------|
| `docs/` | 공통 가이드 문서 |
| `resources/design-system/` | IBM Carbon Design System |

---

## 🔧 전역 설정

| 파일 | 설명 |
|------|------|
| `ENVIRONMENT.md` | 환경 설정 가이드 |
| `PROJECT_ROADMAP.md` | 전체 로드맵 |
| `SECURITY_NOTICE.md` | 보안 가이드 (API 키 관리) |
| `JARVIS_RECONNECT_PROMPT.md` | AI 재연결 프롬프트 |

---

## 📋 자비스 재연결

새 세션에서 AI Assistant를 만날 때:

```
아래 파일들을 읽고 현황을 파악해주세요:
1. README.md
2. apps/ 폴더의 각 프로젝트 README.md
```

---

**Last Updated**: 2024-12-21  
**Structure**: Monorepo (apps/)

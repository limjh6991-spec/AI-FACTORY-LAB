# 🏭 AI Factory Lab

> **Excel 기반 자동 화면 생성 시스템**  
> RAG-Enhanced Pattern Learning + Hybrid LLM (Gemini → Ollama)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org)
[![tRPC](https://img.shields.io/badge/tRPC-11.0-blue)](https://trpc.io)
[![Progress](https://img.shields.io/badge/Progress-25%25-yellow)](PROJECT_STATUS.md)

---

## 🎯 프로젝트 개요

**목표**: Excel 파일 업로드 → AI 분석 → Grid/Chart 자동 생성

**워크플로우**:
```
Excel 업로드 → AI 분석 (RAG) → Grid/Chart 자동 생성 
→ 임시 메뉴 생성 → 사용자 확인 → 프로덕션 배포
```

**현재 단계**: Week 2 - RAG 파이프라인 구축

**전체 진행률**: 25% (Phase 0-1 진행 중)

---

## 🚀 빠른 시작

### 1. 환경 설정
```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에서 GEMINI_API_KEY 입력 필요

# PostgreSQL 데이터베이스 생성
sudo -u postgres psql -c "CREATE DATABASE ai_factory_db;"

# Prisma 설정
npm run db:push
npx prisma generate
```

### 2. Vector DB 실행
```bash
# Chroma Vector DB + Redis 실행
npm run vector:start

# 리소스 벡터화 (첫 실행 시)
npm run vector:setup

# 검색 테스트
npm run vector:test
```

### 3. 개발 서버 실행
```bash
npm run dev
# http://localhost:3000
```

---

## 📊 기술 스택

### Frontend
- **Framework**: Next.js 15.5.6 (App Router + Turbopack)
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui (Radix UI)
- **Grid**: TanStack Table v8
- **Charts**: Recharts

### Backend
- **API**: tRPC (Type-safe API)
- **ORM**: Prisma 6.19.0
- **Database**: PostgreSQL 16

### AI & RAG
- **LLM**: Google Gemini 2.0 Flash
- **Vector DB**: Chroma (localhost:8000)
- **Cache**: Redis (localhost:6379)
- **Embeddings**: Gemini text-embedding-004

---

## 📁 프로젝트 구조

```
ai-factory-lab/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # shadcn/ui 컴포넌트
│   ├── server/           # tRPC 서버
│   ├── lib/              # 유틸리티
│   │   └── vector-search.ts  # Vector 검색 시스템
│   └── trpc/             # tRPC 클라이언트
├── scripts/
│   ├── setup_vector_db.ts    # 리소스 벡터화
│   ├── test_vector_search.ts # Vector 검색 테스트
│   └── collect_db_metadata.ts # DB 메타데이터 수집
├── docs/
│   ├── VECTOR_DB_GUIDE.md         # Vector DB 가이드
│   ├── SESSION_SUMMARY_20251202.md # 작업 세션 요약
│   └── ...
├── prisma/
│   └── schema.prisma     # DB 스키마 (68 테이블)
├── docker-compose.vector.yml # Chroma + Redis
├── PROJECT_STATUS.md     # 진행 현황 체크리스트
└── PROJECT_ROADMAP.md    # 전체 로드맵
```

---

## 📋 주요 명령어

### 개발
```bash
npm run dev           # 개발 서버 (localhost:3000)
npm run build         # 프로덕션 빌드
npm start             # 프로덕션 실행
```

### Vector DB
```bash
npm run vector:start  # Vector DB 시작
npm run vector:setup  # 리소스 벡터화
npm run vector:test   # 검색 테스트
npm run vector:stop   # Vector DB 중지
npm run vector:logs   # 로그 확인
```

### Database
```bash
npm run db:push       # DB 스키마 동기화
npx prisma studio     # DB GUI
npx prisma generate   # Prisma Client 생성
```

---

## 🎯 현재 진행 현황

### ✅ 완료 (25%)
- [x] Phase 0: Next.js 15 마이그레이션 (100%)
- [x] Week 1: Gemini API + Vector DB 설정 (100%)
  - Chroma Vector DB 시스템 구축
  - 자비스 재연결 시스템
  - API 키 보안 조치

### ⏳ 진행 중 (Week 2)
- [ ] Vector DB 리소스 벡터화 실행
- [ ] Excel 업로드 UI 구현
- [ ] 기본 RAG 파이프라인 구축

### 📅 예정
- Week 3-4: 고급 RAG + 검증 (12/16-12/23)
- Week 5-6: 로컬 모델 조사 (12/30-01/06)
- Week 7-9: Hybrid 전환 (01/13-01/27)

**상세 체크리스트**: [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## 📚 문서

### 시작하기
- [빠른 진행 현황](STATUS_QUICK.md) - 한눈에 보는 현황
- [프로젝트 상태](PROJECT_STATUS.md) - 상세 체크리스트
- [환경 설정](ENVIRONMENT.md) - 개발 환경 가이드

### Vector DB
- [Vector DB 가이드](docs/VECTOR_DB_GUIDE.md) - 완전한 가이드
- [빠른 시작](VECTOR_DB_QUICKSTART.md) - 5분 시작
- [완료 보고서](docs/VECTOR_DB_COMPLETION_REPORT.md)

### 자비스 시스템
- [재연결 프롬프트](JARVIS_RECONNECT_PROMPT.md) - 세션 재개
- [빠른 참조](.jarvis-prompt.txt) - 즉시 복사

### 프로젝트
- [전체 로드맵](PROJECT_ROADMAP.md) - 9주 계획
- [세션 요약](docs/SESSION_SUMMARY_20251202.md) - 작업 기록
- [보안 가이드](SECURITY_NOTICE.md) - API 키 관리

---

## 🤖 자비스 재연결

새 세션에서 자비스(GitHub Copilot)를 만날 때:

```bash
# 프롬프트 확인
cat .jarvis-prompt.txt

# 또는
cat JARVIS_RECONNECT_PROMPT.md
```

프롬프트를 복사해서 자비스에게 전송하면 자동으로 프로젝트 현황을 파악합니다.

---

## 🔐 보안 주의사항

### ⚠️ 절대 커밋 금지
- `.env` 파일 (API 키 포함)
- `GEMINI_API_KEY`, `OPENAI_API_KEY`

### ✅ 안전한 사용
- `.gitignore`에 `.env` 등록 (완료)
- `.env.example` 템플릿 사용
- 실제 키는 로컬에만 보관

자세한 내용: [SECURITY_NOTICE.md](SECURITY_NOTICE.md)

---

## 💰 비용 예측

### 현재 (Week 1-4)
- Gemini API: $15/월
- Vector DB: 무료 (로컬)
- Redis: 무료 (로컬)

### 최종 (Week 9)
- Gemini API: $1.2/월 (8% 사용)
- Ollama: 무료 (92% 사용)
- **총 비용**: $1.2/월 (98.5% 절감)

---

## 🎓 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [tRPC 문서](https://trpc.io/docs)
- [Prisma 문서](https://www.prisma.io/docs)
- [Chroma 문서](https://docs.trychroma.com/)
- [Gemini API](https://ai.google.dev/gemini-api/docs)

---

## 🤝 기여

프로젝트에 기여하고 싶으신가요?

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

---

## 📞 문의

- **Repository**: [AI-FACTORY-LAB](https://github.com/limjh6991-spec/AI-FACTORY-LAB)
- **Issues**: [GitHub Issues](https://github.com/limjh6991-spec/AI-FACTORY-LAB/issues)

---

**Last Updated**: 2025년 12월 2일  
**Version**: 1.0  
**Status**: 🚀 Week 2 진행 중


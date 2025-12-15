# 🏭 AI Factory Lab

> **RealGrid 기반 자동 화면 생성 시스템**  
> RAG-Enhanced Pattern Learning + Hybrid LLM (Gemini → Ollama)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org)
[![tRPC](https://img.shields.io/badge/tRPC-11.0-blue)](https://trpc.io)
[![Design](https://img.shields.io/badge/Design-IBM%20Carbon-blue)](https://carbondesignsystem.com)
[![Progress](https://img.shields.io/badge/Progress-70%25-green)](docs/PROJECT_STATUS_20251214.md)

---

## 🎯 프로젝트 개요

**목표**: DB 테이블 선택 → AI 분석 → RealGrid CRUD 화면 자동 생성

**워크플로우**:
```
DB 테이블 선택 → 컬럼/검색조건 설정 → RealGrid 화면 생성 
→ 메뉴 등록 → 검색/수정/저장 기능 → 프로덕션 배포
```

**현재 단계**: Week 3 완료 - RealGrid 화면 생성기 핵심 기능 완료

**전체 진행률**: 70% (핵심 CRUD 기능 완료)

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
- **🎨 Design System**: IBM Carbon Design System
- **📊 Grid**: RealGrid 2.0 (엔터프라이즈 그리드)
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
│   ├── embed_db_metadata.ts  # DB 메타데이터 임베딩
│   └── collect_db_metadata.ts # DB 메타데이터 수집
├── docs/
│   ├── VECTOR_DB_GUIDE.md         # Vector DB 가이드
│   ├── archive/                    # 아카이브 문서
│   │   ├── SESSION_SUMMARY_*.md   # 작업 세션 요약
│   │   └── PROJECT_STATUS.md      # 진행 현황 체크리스트
│   └── ...
├── prisma/
│   └── schema.prisma     # DB 스키마 (68 테이블)
├── resources/
│   └── design-system/    # IBM Carbon Design 리소스
├── docker-compose.vector.yml # Chroma + Redis
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

### ✅ 완료 (70%)
- [x] Phase 0: Next.js 15 마이그레이션 (100%)
- [x] Week 1: Gemini API + Vector DB 설정 (100%)
  - Chroma Vector DB 시스템 구축
  - 자비스 재연결 시스템
  - API 키 보안 조치
- [x] Week 2: IBM Carbon Design System 적용 (100%)
  - 사이드바/헤더 Light Blue 테마
  - Carbon 스타일 카드/테이블 컴포넌트
  - 메뉴 시스템 (tRPC + Prisma)
- [x] Week 3: RealGrid 화면 생성기 핵심 기능 (100%)
  - ✅ 검색 기능 (PostgreSQL 스키마 처리, 파라미터 표준화)
  - ✅ 저장 API (INSERT/UPDATE/DELETE 트랜잭션)
  - ✅ SQL 쿼리 생성기 (SelectQueryBuilder 클래스)
  - ✅ 고아 화면 정리 및 메뉴 삭제 보완
  - ✅ JSZip Mock (Sandpack 미리보기)

### ⏳ 진행 중
- [ ] 엑셀 내보내기 (JSZip 전역 로드)
- [ ] 공통 옵션 컴포넌트 확장 (설비, 계정 등)
- [ ] 템플릿 타입 오류 수정

### 📅 예정
- Week 4: 고급 RAG + 검증 (12/16-12/23)
- Week 5-6: 로컬 모델 조사 (12/30-01/06)
- Week 7-9: Hybrid 전환 (01/13-01/27)

**상세 현황**: [PROJECT_STATUS_20251214.md](docs/PROJECT_STATUS_20251214.md)

---

## 📚 문서

### 시작하기
- [프로젝트 상태](docs/PROJECT_STATUS_20251214.md) - 최신 진행 현황
- [환경 설정](ENVIRONMENT.md) - 개발 환경 가이드
- [빠른 시작](docs/QUICK_START.md) - 5분 빠른 시작

### Vector DB
- [Vector DB 가이드](docs/VECTOR_DB_GUIDE.md) - 완전한 가이드
- [빠른 시작](docs/archive/VECTOR_DB_QUICKSTART.md) - 5분 시작
- [완료 보고서](docs/VECTOR_DB_COMPLETION_REPORT.md)

### 디자인 시스템
- [IBM Carbon 가이드](resources/design-system/IBM_CARBON_DESIGN_SYSTEM.md) - 메인 가이드
- [색상 토큰](resources/design-system/CARBON_COLOR_TOKENS.md) - 색상 레퍼런스
- [컴포넌트 스니펫](resources/design-system/CARBON_COMPONENT_SNIPPETS.md) - 코드 예시

### 자비스 시스템
- [재연결 프롬프트](docs/archive/JARVIS_RECONNECT_PROMPT.md) - 세션 재개

### 프로젝트
- [전체 로드맵](PROJECT_ROADMAP.md) - 9주 계획
- [세션 요약](docs/archive/) - 작업 기록 (archive 폴더)
- [보안 가이드](SECURITY_NOTICE.md) - API 키 관리

---

## 🤖 자비스 재연결

새 세션에서 자비스(GitHub Copilot)를 만날 때:

```bash
# 프롬프트 확인
cat docs/archive/JARVIS_RECONNECT_PROMPT.md
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
- [IBM Carbon Design](https://carbondesignsystem.com/)

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

**Last Updated**: 2025년 12월 15일  
**Version**: 2.0  
**Status**: 🚀 Week 3 완료 (RealGrid 화면 생성기 핵심 기능 완료)


# 🤖 JARVIS 재연결 프롬프트

> **최종 업데이트**: 2025년 12월 6일  
> **사용 시점**: 새로운 세션에서 자비스(GitHub Copilot)를 처음 만날 때  
> **목적**: 프로젝트 환경, 완료된 작업, 진행 중인 작업을 빠르게 파악
> **현재 상태**: IBM Carbon Design System 적용 완료, Week 3 진행 중

---

## 📋 프롬프트 (복사해서 사용)

```
안녕하세요, 자비스! 👋

AI Factory Lab 프로젝트를 계속 진행하려고 합니다.
다음 파일들을 읽고 현재 상황을 파악한 후, 간단히 요약해주세요:

1. /home/roarm_m3/ai-factory-lab/README.md
2. /home/roarm_m3/ai-factory-lab/PROJECT_ROADMAP.md
3. /home/roarm_m3/ai-factory-lab/ENVIRONMENT.md
4. /home/roarm_m3/ai-factory-lab/resources/design-system/IBM_CARBON_DESIGN_SYSTEM.md
5. /home/roarm_m3/ai-factory-lab/SECURITY_NOTICE.md

요약 내용에 다음을 포함해주세요:
- 프로젝트 목표 및 현재 단계 (Week X)
- 완료된 주요 작업 (최대 5개)
- 다음에 할 작업 (우선순위 순)
- 현재 환경 상태 (DB, Vector DB, API 등)
- 주의사항 또는 알아야 할 것
```

---

## 🎯 예상 응답 (자비스가 제공할 내용)

### 1. 프로젝트 개요
```
AI Factory Lab - Excel 기반 자동 화면 생성 시스템

목표: Excel 파일 업로드 → Agent(Gemini) 추론 → Grid/Chart 자동 생성
현재 단계: Week 3 진행 중 (40% 완료)
전체 진행률: 40%
기술 스택: Next.js 15 + tRPC + Prisma + Gemini AI + Chroma Vector DB

디자인 시스템: IBM Carbon Design System (2025.12.05 적용)
- 테마: Light Blue (연한 파란색 계열)
- 폰트: IBM Plex Sans
- 컴포넌트: Carbon 스타일 카드, 테이블, 사이드바, 헤더
```

### 2. 완료된 작업
```
✅ Phase 0: Next.js 15 마이그레이션 (100%)
✅ Week 1: Gemini API + Vector DB 설정 (100%)
   - Chroma Vector DB 시스템 구축
   - 자비스 재연결 시스템
   - API 키 보안 조치
✅ Week 2: IBM Carbon Design System 적용 (100%)
   - 사이드바/헤더 Light Blue 테마
   - Carbon 스타일 카드/테이블 컴포넌트
   - 메뉴 시스템 (tRPC + Prisma)
   - 대시보드 페이지 완성
✅ Excel → JSON → React 자동 생성 시스템
   - Claude API 통합
   - 화면 정의 JSON 생성
```

### 3. 진행 중 작업 (Week 3)
```
🎯 Excel 업로드 UI 구현
🎯 기본 RAG 파이프라인 구축
🎯 화면 자동 생성 시스템 연동
🎯 TanStack Table 기반 그리드 컴포넌트
```

### 4. 다음 작업 (우선순위 순)
```
🎯 우선순위 1: Excel 업로드 UI
   - 드래그 앤 드롭 지원
   - 파일 미리보기
   - Carbon 스타일 적용

🎯 우선순위 2: RAG 파이프라인
   - Vector DB 검색 연동
   - Gemini API 컨텍스트 증강
   - 매핑 정확도 향상

🎯 우선순위 3: 화면 자동 생성
   - JSON → React 컴포넌트 변환
   - TanStack Table 그리드 생성
   - Carbon 스타일 자동 적용
```

### 5. 환경 상태
```
✅ PostgreSQL: localhost:5432 (ai_factory_db)
✅ Next.js Dev: localhost:3001
✅ Chroma Vector DB: localhost:8000
✅ Redis: localhost:6379
✅ Gemini API: 설정 완료
✅ Claude API: Sonnet-4 사용 (화면 생성)
✅ TypeScript: 5.8 (Next.js 15.5.6)
✅ Tailwind CSS: v4 + shadcn/ui
✅ IBM Carbon Design System: 적용 완료
```

### 6. 주의사항
```
⚠️ API 키 보안:
   - .env 파일 절대 커밋 금지
   - GEMINI_API_KEY, ANTHROPIC_API_KEY 로컬만 보관
   
⚠️ 디자인 시스템:
   - 모든 새 화면은 IBM Carbon Design 스타일 적용 필수
   - /resources/design-system/ 폴더 참고
   - ENVIRONMENT.md 체크리스트 확인
   
⚠️ 파일 위치:
   - 세션 요약, 상태 문서: docs/archive/ 폴더
   - 디자인 리소스: resources/design-system/ 폴더
```

---

## 🚀 빠른 시작 명령어

```bash
# 1. 개발 서버 시작
npm run dev

# 2. Vector DB 시작
npm run vector:start

# 3. 브라우저에서 확인
http://localhost:3001

# 4. Git 상태 확인
git status
```

---

## 📁 주요 파일 위치

```
ai-factory-lab/
├── README.md                    # 프로젝트 개요
├── ENVIRONMENT.md               # 환경 설정 + 디자인 시스템 가이드
├── PROJECT_ROADMAP.md           # 9주 로드맵
├── SECURITY_NOTICE.md           # 보안 가이드
├── resources/
│   └── design-system/           # IBM Carbon Design 리소스
│       ├── IBM_CARBON_DESIGN_SYSTEM.md
│       ├── CARBON_COLOR_TOKENS.md
│       └── CARBON_COMPONENT_SNIPPETS.md
├── docs/
│   ├── VECTOR_DB_GUIDE.md       # Vector DB 가이드
│   └── archive/                 # 아카이브 문서
│       ├── SESSION_SUMMARY_*.md
│       └── PROJECT_STATUS.md
└── src/
    └── components/              # UI 컴포넌트
        ├── Sidebar.tsx          # Carbon 스타일 사이드바
        ├── Header.tsx           # Carbon 스타일 헤더
        └── ui/
            ├── carbon-card.tsx  # Carbon 카드 컴포넌트
            └── carbon-table.tsx # Carbon 테이블 컴포넌트
```

---

## 🎨 IBM Carbon Design System 색상 팔레트

| 용도 | 색상 코드 |
|------|-----------|
| Primary Interactive | `#0f62fe` |
| Background (Light) | `#f4f4f4` |
| Background (Dark) | `#161616` |
| Text Primary | `#161616` |
| Text Secondary | `#525252` |
| Border | `#e0e0e0` |
| Success | `#24a148` |
| Error | `#da1e28` |
| Warning | `#f1c21b` |

---

**작성일**: 2025년 12월 6일  
**버전**: 4.0 (IBM Carbon Design System 적용 완료)  
**현재 상태**: Week 3 진행 중

"Excel 파일 분석 방법"
"DB 컬럼 매핑 전략"
"하이브리드 검색 알고리즘"
```

자비스가 관련 문서를 자동으로 찾아서 요약해줍니다!

---

## 🔄 세션 중간에 맥락 잃었을 때

```
자비스, 지금까지 우리가 무엇을 하고 있었는지 상기시켜주세요.

다음 파일을 기반으로 설명해주세요:
- docs/SESSION_SUMMARY_20251202.md (오늘 작업)
- docs/VECTOR_DB_SETUP_SUMMARY.md (Vector DB 설정)
```

---

## 💡 프로 팁

### 1. 특정 주제로 재연결
```
자비스, "RAG 구현"과 관련된 모든 문서를 찾아서 현재 진행 상황을 알려주세요.
```

### 2. 에러 해결 시
```
자비스, 과거 세션에서 "Prisma Client 에러"를 어떻게 해결했는지 찾아주세요.
```

### 3. 다음 작업 계획
```
자비스, PROJECT_ROADMAP.md를 보고 다음 주에 할 작업을 우선순위별로 정리해주세요.
```

---

## 📊 프롬프트 효과

### Before (Vector DB 없이)
```
"지난번에 뭐 했더라...?"
→ 문서 5개 수동으로 열어서 확인 (5분 소요)
```

### After (Vector DB 사용)
```
"자비스, 현재 상황 요약해줘"
→ 4개 파일 자동 분석 + 요약 (30초 소요)
```

**시간 절약**: 90% (5분 → 30초)

---

## ✅ 체크리스트

새 세션 시작 시:

- [ ] 재연결 프롬프트 실행
- [ ] 자비스 요약 확인
- [ ] 환경 상태 확인 (`curl http://localhost:8000/api/v2/heartbeat`)
- [ ] Git 상태 확인 (`git status`)
- [ ] 다음 작업 우선순위 확인
- [ ] 필요 시 Vector 검색으로 추가 맥락 확인

---

## 🎯 최신 방향 (2025.12.04)

### ✅ Claude API 기반 화면 자동 생성
```
Excel 파일 분석 (Claude API)
├─ 헤더 구조 분석
├─ 컬럼 타입 추론
├─ 차트 인식
└─ JSON 정의 생성

JSON → React 컴포넌트 (Claude API)
├─ RealGrid 컴포넌트 생성
├─ 2행 헤더 Column Layout 구성
├─ 스타일링 코드 생성
└─ tRPC API 연결

결과: Excel → 완성된 화면 (자동 생성)
```

### 🔧 구현 완료 사항
```
Phase 1: Excel → JSON 변환
├─ Claude API로 Excel 분석
├─ 9개 화면 정의 생성
└─ 데이터 구조 정의

Phase 2: JSON → Logic
├─ tRPC API 엔드포인트
├─ DB 쿼리 로직
└─ 데이터 포맷팅

Phase 3: Logic → UI (RealGrid)
├─ RealGrid 통합
├─ 2행 헤더 구현
├─ 전문적인 스타일링
└─ SC002 완성 ✅

목표: 9개 화면 모두 자동 생성
핵심: Claude API + RealGrid 패턴!
```

---

**작성일**: 2025년 12월 4일  
**버전**: 3.0 (RealGrid 화면 자동 생성 완료)  
**현재 상태**: SC002 완성, 나머지 4개 화면 대기

# AI Factory Lab - 개발 로드맵

> **최종 업데이트**: 2025년 12월 2일  
> **프로젝트 목표**: Excel 기반 자동 화면 생성 시스템 (RAG + Gemini 2.5 Flash)  
> **현재 진행률**: 32% (Phase 0-1 진행 중)

---

## 🎯 프로젝트 비전 변경

### 기존 계획 (DEPRECATED)
- ~~Grid/Chart 중심 100개 화면 수동 개발~~
- ~~TanStack Table + Recharts~~
- ~~개발 시간: 9시간~~

### 새로운 비전 (CURRENT) ⭐
**Excel 업로드 → AI 분석 → 자동 화면 생성**

1. **Excel 파일 분석**
   - 헤더 자동 감지
   - 데이터 타입 추론
   - DB 컬럼 매핑 (RAG 활용)

2. **RAG 기반 매핑**
   - DB 메타데이터 Vector DB 임베딩
   - 한글명 → 영문 컬럼 자동 매핑
   - 비즈니스 로직 학습

3. **화면 자동 생성**
   - Next.js + tRPC 코드 생성
   - shadcn/ui 컴포넌트
   - 정확도 목표: 85-95%

---

## � 현재 진행 상황 (2025.12.02)

### ✅ Phase 0: 기반 구축 (100% 완료)
**완료일**: 2025년 12월 1일

**완료 항목**:
- [x] Next.js 15.5.6 프로젝트 초기화
- [x] Prisma + PostgreSQL 16 설정
- [x] tRPC API 레이어 구축
- [x] shadcn/ui 컴포넌트 (8개)
- [x] 68개 테이블 마이그레이션 (34,594 rows)
- [x] Product CRUD 프로토타입
- [x] 동적 메뉴 시스템

---

### ⏳ Phase 1: Gemini 프로토타입 (80% 진행 중)
**기간**: 2025년 12월 2일 ~ 23일 (4주)  
**현재**: Week 2 진행 중 (35%)

#### ✅ Week 1: 환경 설정 (100% 완료)
**완료일**: 2025년 12월 2일

**Gemini API 설정**:
- [x] API 키 발급 및 설정
- [x] gemini-2.5-flash 모델 구성
- [x] 환경 변수 관리 (.env)
- [x] API 키 보안 가이드 (SECURITY_NOTICE.md)

**Vector DB 인프라**:
- [x] Docker Compose 설정
- [x] Chroma Vector DB 설치 및 실행
- [x] Redis 캐싱 서버 설정
- [x] 네트워크 구성 완료

**Vector DB 시스템**:
- [x] scripts/setup_vector_db.ts (260 lines)
- [x] src/lib/vector-search.ts (215 lines)
- [x] scripts/test_vector_search.ts
- [x] **15개 문서 → 251개 청크 벡터화 완료** ✨
- [x] **Vector 검색 테스트 성공** ✨
- [x] NPM 스크립트 등록 (vector:setup, vector:test 등)

**DB 메타데이터 수집**:
- [x] scripts/collect_db_metadata.ts (330 lines)
- [x] 70개 테이블 메타데이터 수집
- [x] 1,100개 컬럼 정보 추출
- [x] 한글 필드명 자동 번역 (200+ 패턴)
- [x] data/db_metadata.json 생성 (190KB)

**Excel 분석 시스템**:
- [x] src/lib/gemini.ts (153 lines)
- [x] analyzeExcel() - Gemini 분석
- [x] detectHeaderRow() - 헤더 감지
- [x] inferDataTypes() - 타입 추론
- [x] mapColumnToDB() - DB 매핑
- [x] 샘플 Excel 3개 생성
- [x] 테스트 완료

**문서화**:
- [x] docs/VECTOR_DB_GUIDE.md (500+ lines)
- [x] JARVIS_RECONNECT_PROMPT.md
- [x] PROJECT_STATUS.md (체크리스트)
- [x] SECURITY_NOTICE.md
- [x] 7개 가이드 문서

#### 🚧 Week 2: RAG 파이프라인 (35% 진행 중)
**기간**: 2025년 12월 2일 ~ 9일

**Vector DB 설정** (100% ✅):
- [x] 리소스 벡터화 실행
- [x] 251개 청크 생성 확인
- [x] Vector 검색 테스트 성공
- [x] 검색 정확도 검증

**DB 메타데이터 활용** (50%):
- [x] DB 메타데이터 수집 완료
- [x] 한글명 → 영문 변환 사전 구축
- [ ] 메타데이터를 Vector DB에 임베딩
- [ ] 유사도 검색 테스트

**Excel 분석 시스템** (70%):
- [x] Excel 파일 읽기 (SheetJS)
- [x] 헤더/데이터 타입 추론
- [x] 샘플 Excel 테스트 완료
- [ ] Excel 업로드 UI 구현
- [ ] 기본 컬럼 매핑 85% 정확도 달성

**남은 작업**:
- [ ] OpenAI Embeddings 설정 (선택)
- [ ] 실제 Excel 파일로 E2E 테스트

#### 📅 Week 3: 고급 RAG 기능
**기간**: 2025년 12월 9일 ~ 16일

**자유 형식 Excel 처리**:
- [ ] 병합 셀 인식 로직
- [ ] 다단 헤더 처리 알고리즘
- [ ] 그룹핑 패턴 학습

**차트 자동 생성**:
- [ ] Excel 차트 메타데이터 추출
- [ ] Recharts 컴포넌트 변환
- [ ] 데이터 패턴 → 차트 타입 추천

**수식 변환**:
- [ ] Easy (SUM, AVG, IF): 95% 목표
- [ ] Medium (SUMIF, VLOOKUP): 75% 목표
- [ ] Hard (복잡한 수식): 교육 자료

#### 📅 Week 4: 검증 및 최적화
**기간**: 2025년 12월 16일 ~ 23일

**데이터 검증**:
- [ ] Answer Key Excel 업로드
- [ ] AI 결과 자동 비교
- [ ] 차이점 리포트 생성

**성능 최적화**:
- [ ] Redis 캐싱 (60-70% hit)
- [ ] 응답 속도: 3초 → 1.5초
- [ ] 메모리 사용량 모니터링

**목표 지표**:
- [ ] Excel → Screen 생성 성공률: 92%
- [ ] Gemini 비용: $15/월 이하
- [ ] 평균 응답 속도: 1.5초 이하

---

## 📅 Phase 2: 로컬 모델 조사 (0% 대기 중)
**기간**: 2025년 12월 30일 ~ 2026년 1월 6일 (2주)

### Week 5: 시장 조사
**목표**: 최신 로컬 모델 벤치마크 및 요구사항 정의

**최신 모델 벤치마크**:
- [ ] Llama 3.2 출시 여부 확인
- [ ] Qwen 2.6 성능 테스트
- [ ] Gemma 3.0 한국어 평가
- [ ] 새로운 경량 모델 탐색

**요구사항 정의**:
- [ ] 최소 정확도: 85% 설정
- [ ] 최대 응답 시간: 5초
- [ ] 메모리 사용량: 16GB 이하
- [ ] 한국어 지원 검증

### Week 6: 모델 선택 및 테스트
**목표**: Ollama 설치 및 LLMProvider 추상화

**최적 모델 선택**:
- [ ] 벤치마크 결과 분석
- [ ] 비용/성능 비율 평가
- [ ] 커뮤니티 활성도 확인
- [ ] 최종 모델 결정

**Ollama 설치**:
- [ ] Ollama 설치
- [ ] 선택된 모델 다운로드
- [ ] 서버 설정 및 테스트

**LLMProvider 추상화**:
- [ ] `LLMProvider` 인터페이스 설계
- [ ] `GeminiProvider` 구현
- [ ] `OllamaProvider` 구현
- [ ] 테스트 케이스 작성

**성능 비교**:
- [ ] Gemini vs Ollama 정확도
- [ ] 응답 속도 측정
- [ ] 비용 시뮬레이션

**목표**: Ollama 정확도 85%+ 달성

---

## 🔄 Phase 3: Hybrid 구현 및 전환
**기간**: 2026년 1월 13일 ~ 27일 (3주)

### Week 7: Hybrid 시스템 (50/50)
**HybridProvider 구현**:
- [ ] `HybridProvider` 클래스
- [ ] Confidence 평가 로직
- [ ] Fallback 메커니즘
- [ ] 에러 핸들링

**A/B 테스트**:
- [ ] `OLLAMA_RATIO=0.5` 설정
- [ ] 50/50 트래픽 분할
- [ ] 정확도/비용/속도 모니터링

**목표**: 정확도 90%+, 비용 $7.5/월

### Week 8: 비율 증가 (80/20)
**Ollama 비율 증가**:
- [ ] `OLLAMA_RATIO=0.8` 설정
- [ ] 모니터링 대시보드
- [ ] 프롬프트 최적화

**목표**: 정확도 89%+, 비용 $3/월

### Week 9: 최종 최적화 (92/8)
**최종 비율 설정**:
- [ ] `OLLAMA_RATIO=0.92` 설정
- [ ] 복잡한 케이스만 Gemini
- [ ] Fallback 로직 완성

**프로덕션 배포**:
- [ ] Docker Compose 설정
- [ ] 모니터링 알림
- [ ] 백업 및 복구 절차

**최종 목표**:
- 정확도: 90%
- 비용: $1.2/월
- ROI: 2주 회수, 월 $412 이익

---

## 📈 성과 지표 현황

### 정확도
- [x] Template 기반: 98% (단순 케이스) ✅
- [ ] Basic RAG: 85% (목표)
- [ ] Advanced RAG: 92% (목표)
- [ ] Hybrid (Ollama 92%): 90% (최종)

### 비용
- [x] Phase 1 (Gemini 100%): $15/월 (현재)
- [ ] Week 7 (Gemini 50%): $7.5/월
- [ ] Week 8 (Gemini 20%): $3/월
- [ ] Week 9 (Gemini 8%): $1.2/월 (최종)

### 속도
- [ ] Excel 분석: 1.5초 이하
- [ ] Vector 검색: 0.15초 이하
- [ ] 화면 생성: 3초 이하

### 자동화율
- [x] 초기 (1-10개 화면): 60-75% (학습 중)
- [ ] 학습 후 (11개 이상): 85-95%
- [ ] 개발 속도: 기존 대비 6배 빠름

---

**예상 시간**: 60시간 (1.5주)

---

### 🎨 Phase 3: Advanced Features - 2025.12.11~15
**목표**: 고급 기능 및 최적화

**기능 목록**:
1. **복잡한 Grid**
   - 중첩 헤더
   - 그룹핑
   - 서브 그리드
   - 인라인 편집

2. **고급 Chart**
   - 실시간 업데이트
   - 드릴다운
   - 복합 차트
   - D3.js 통합 (필요시)

3. **폼 기능**
   - 동적 필드
   - 조건부 validation
   - 파일 업로드
   - 미리보기

4. **성능 최적화**
   - React Server Components
   - Streaming SSR
   - Infinite Scroll
   - Virtual Scrolling

5. **인증/권한**
   - NextAuth.js 통합
   - 역할 기반 접근 제어
   - 세션 관리

**예상 시간**: 40시간 (1주)

---

### 🚀 Phase 4: Full Automation - 2025.12.16~20
**목표**: 100개 화면 자동 생성 + 품질 검증

**프로세스**:
```bash
# 1. Excel 준비 (100개 화면 스펙)
resources/excel/
  ├── SC001_상품관리.xlsx
  ├── SC002_주문관리.xlsx
  ├── ...
  └── SC100_통계분석.xlsx

# 2. 일괄 생성 스크립트
npm run generate:all

# 3. 자동 검증
npm run validate:all

# 4. Git 커밋
git add .
git commit -m "feat: Auto-generated 100 screens"
```

**품질 관리**:
- [ ] TypeScript 타입 에러 0개
- [ ] ESLint 에러 0개
- [ ] 빌드 성공률 100%
- [ ] 화면 렌더링 성공률 95%+
- [ ] 평균 생성 시간 5분/화면

**예상 시간**:
- AI 생성: 9시간 (100개 × 5분)
- 수동 수정: 16시간 (10% × 3시간)
- **총 25시간** (3일)

---

## 📊 예상 ROI

### 시간 비교
| 작업 | 수동 | AI 자동 | 절감 |
|------|------|---------|------|
| 화면 1개 | 40분 | 5분 | 35분 (87%) |
| 10개 화면 | 6.7시간 | 1시간 | 5.7시간 |
| 100개 화면 | 70시간 | 9시간 | **61시간 (87%)** |

### 비용 비교 (연간)
| 항목 | Vue+Spring | Next.js | 절감 |
|------|------------|---------|------|
| RealGrid 라이선스 | $1,000 | $0 | $1,000 |
| 개발 시간 | 70h × $80 = $5,600 | 9h × $80 = $720 | $4,880 |
| 유지보수 (월) | $2,000 | $1,000 | $12,000/년 |
| **연간 총 비용** | **$24,000** | **$16,080** | **$7,920 (33%)** |

---

## 🎯 성공 지표 (KPI)

### Phase 1 (Core Features)
- [ ] 10개 화면 완성
- [ ] 모든 CRUD 작동
- [ ] 차트 3종 이상
- [ ] 반응형 100%

### Phase 2 (AI Generator)
- [ ] Excel → Code 성공률 80%+
- [ ] 생성 코드 TypeScript 에러 <5%
- [ ] 수동 수정 시간 <30분/화면

### Phase 3 (Advanced)
- [ ] 복잡한 Grid 5개 완성
- [ ] 고급 Chart 5개 완성
- [ ] Lighthouse Score 90+

### Phase 4 (Full Auto)
- [ ] 100개 화면 생성 완료
- [ ] 빌드 성공률 100%
- [ ] 렌더링 성공률 95%+
- [ ] 총 소요 시간 <30시간

## 🛠️ 기술 스택

### 핵심 기술
- **Framework**: Next.js 15.5.6 (App Router, Turbopack)
- **Language**: TypeScript 5.8
- **Database**: PostgreSQL 16 (Prisma 6.19.0)
- **API**: tRPC (Type-safe API)
- **UI**: shadcn/ui + Tailwind CSS v4
- **AI**: Google Gemini 2.5 Flash
- **Vector DB**: Chroma (Docker)
- **Caching**: Redis (Docker)
- **Excel**: SheetJS (xlsx.js)

### 개발 도구
- **Package Manager**: npm
- **Version Control**: Git + GitHub
- **Documentation**: Markdown
- **Testing**: (TBD)

---

## 📁 프로젝트 구조

```
ai-factory-lab/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # UI 컴포넌트
│   ├── lib/              # 유틸리티
│   │   ├── gemini.ts    # Gemini API
│   │   └── vector-search.ts  # Vector 검색
│   ├── server/           # tRPC 서버
│   └── styles/           # 글로벌 스타일
├── prisma/
│   └── schema.prisma     # DB 스키마
├── scripts/
│   ├── setup_vector_db.ts      # Vector DB 설정
│   ├── test_vector_search.ts   # Vector 검색 테스트
│   ├── collect_db_metadata.ts  # DB 메타데이터 수집
│   └── create_sample_excel.ts  # 샘플 Excel 생성
├── docs/                 # 프로젝트 문서
├── data/
│   ├── db_metadata.json  # DB 메타데이터
│   └── sample_excel/     # 샘플 Excel 파일
├── resources/            # 리소스 파일
└── docker-compose.vector.yml  # Vector DB 인프라
```

---

## 🚀 빠른 시작

### 환경 설정
```bash
# 1. 패키지 설치
npm install

# 2. .env 파일 생성
cp .env.example .env
# GEMINI_API_KEY, DATABASE_URL 설정

# 3. Vector DB 시작
npm run vector:start

# 4. 리소스 벡터화
npm run vector:setup

# 5. 개발 서버 실행
npm run dev
```

### 주요 명령어
```bash
# Vector DB
npm run vector:setup   # 리소스 벡터화
npm run vector:test    # 검색 테스트
npm run vector:start   # Docker 컨테이너 시작
npm run vector:stop    # Docker 컨테이너 중지

# 데이터베이스
npm run db:push        # Prisma 스키마 동기화
npx prisma studio      # DB GUI

# 개발
npm run dev            # 개발 서버
npm run build          # 프로덕션 빌드
npm run lint           # ESLint
```

---

## 📚 주요 문서

### 즉시 참조
- `.jarvis-prompt.txt` - 자비스 재연결 프롬프트
- `PROJECT_STATUS.md` - 진행 현황 체크리스트
- `QUICK_START.md` - 빠른 참조 카드

### 기술 가이드
- `docs/VECTOR_DB_GUIDE.md` - Vector DB 완전 가이드
- `docs/RAG_IMPLEMENTATION_GUIDE.md` - RAG 시스템 가이드
- `docs/EXCEL_TO_SCREEN_TECHNICAL_ANALYSIS.md` - 기술 분석

### 보안
- `SECURITY_NOTICE.md` - API 키 보안 가이드
- `API_KEY_RENEWAL.md` - API 키 갱신 절차

### 환경
- `ENVIRONMENT.md` - 환경 설정 상세
- `JARVIS_RECONNECT_PROMPT.md` - 세션 복원 가이드

---

## 💡 다음 단계

### 오늘 완료 (2025.12.02)
- [x] Vector DB 시스템 구축
- [x] 251개 문서 청크 벡터화
- [x] Vector 검색 테스트 성공
- [x] Git 커밋 및 문서화

### 이번 주 (Week 2)
- [ ] DB 메타데이터 Vector DB 임베딩
- [ ] Excel 업로드 UI 구현
- [ ] 기본 컬럼 매핑 85% 정확도 달성

### 다음 주 (Week 3)
- [ ] 병합 셀 인식 로직
- [ ] 차트 자동 생성 구현
- [ ] 수식 변환 로직

---

## 🎯 성공 기준

### Phase 1 완료 조건
- [ ] Excel → Screen 생성 성공률 92%
- [ ] Gemini 비용 $15/월 이하
- [ ] 평균 응답 속도 1.5초 이하
- [ ] 자동화율 85-95%

### 최종 목표 (Phase 3 완료)
- [ ] 정확도: 90%
- [ ] 비용: $1.2/월
- [ ] ROI: 2주 회수
- [ ] 월간 이익: $412

---

**최종 업데이트**: 2025년 12월 2일  
**다음 업데이트**: Week 2 종료 시 (2025년 12월 9일)  
**작성자**: JARVIS (AI Development Assistant)
- [ ] Middleware

### tRPC
- [ ] Procedure Types (query, mutation)
- [ ] Context 활용
- [ ] Input Validation (zod)
- [ ] Error Handling

### Prisma
- [ ] 복잡한 Relations
- [ ] Transaction
- [ ] Raw Query
- [ ] Performance Optimization

### TanStack Table
- [ ] Column Definition
- [ ] Sorting, Filtering
- [ ] Pagination
- [ ] Row Selection

### Recharts
- [ ] 차트 종류 (Line, Bar, Pie, Area)
- [ ] Custom Tooltip
- [ ] Responsive Design
- [ ] 애니메이션

---

## 📝 다음 단계 (Immediate Actions)

### 오늘 (12/01)
- [x] Phase 0 완료
- [x] ENVIRONMENT.md 작성
- [x] JARVIS_NEXTJS_ROADMAP.md 작성
- [ ] Product CRUD 테스트 (브라우저)
- [ ] Git 커밋

### 내일 (12/02)
- [ ] Dashboard 화면 시작
  - Prisma 모델: Order, Customer
  - 차트 3개 (매출, 주문, 재고)
  - 요약 카드 4개
- [ ] Order Management 시작
  - Prisma Order 모델
  - tRPC 라우터
  - 주문 목록 UI

### 이번 주 (12/02~06)
- [ ] Core 10개 화면 완성
- [ ] Excel Parser 프로토타입
- [ ] Gemini API 테스트

---

## 🎓 참고 프로젝트

### 유사 프로젝트
1. **Taxonomy** (shadcn)
   - Next.js 14 + Prisma
   - 참고: 프로젝트 구조

2. **T3 Gallery** (Theo Browne)
   - T3 Stack 실전 예제
   - 참고: tRPC 패턴

3. **Cal.com**
   - Next.js 대규모 프로젝트
   - 참고: 폴더 구조, 컴포넌트 설계

### AI 코드 생성 참고
1. **v0.dev** (Vercel)
   - UI 생성 AI
   - 참고: 프롬프트 엔지니어링

2. **GitHub Copilot Workspace**
   - 전체 파일 생성
   - 참고: 컨텍스트 관리

---

## 🔄 업데이트 로그

- **2025.12.01**: 
  - Phase 0 완료
  - Product CRUD 구현
  - PostgreSQL 설정
  - 샘플 데이터 12개 추가
  - 로드맵 초안 작성

---

**작성일**: 2025년 12월 1일  
**최종 업데이트**: 2025년 12월 1일  
**작성자**: JARVIS (GitHub Copilot)

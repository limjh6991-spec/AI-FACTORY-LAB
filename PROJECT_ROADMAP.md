# 🏭 AI Factory Lab - Excel to Screen Automation (Ver 3.0)

**Project:** Excel 기반 자동 화면 생성 시스템 (RAG + Hybrid LLM)  
**Architecture:** RAG-Enhanced Pattern Learning + Hybrid Agent (Gemini → Ollama)  
**Core Tech:** Next.js 15 + tRPC + Prisma, Chroma Vector DB, Gemini 2.0 Flash + Ollama (Future)  
**Last Updated:** 2025년 12월 2일

---

## 🎯 1. Vision & Goal (Updated)

### 🚀 **핵심 변경 사항**
기존의 "PI 문서 → 코드 생성" 방식에서 **"Excel 파일 → 자동 화면 생성"** 시스템으로 전환

### 📊 **새로운 워크플로우**
```
Excel 업로드 → AI 분석 (RAG) → Grid/Chart 자동 생성 
→ 임시 메뉴 생성 → 사용자 확인 → 프로덕션 배포
```

### 🎯 **목표**
1. **Excel 자동 분석 (90% 정확도):**
   - 자유 형식 Excel → 구조 패턴 학습 (Vector DB)
   - DB 컬럼 자동 매핑 (한글 → 영문 테이블/컬럼)
   - 차트 자동 생성 (Excel 차트 → Recharts 변환)
   - 수식 변환 (Excel 함수 → SQL/JavaScript)

2. **비용 최적화:**
   - Hybrid LLM 전략 (Gemini 8% + Ollama 92%)
   - 최종 월간 비용: **$1.2/월** (기존 $80/월 → 98.5% 절감)
   - ROI: 2주 회수, 월 $412 이익

3. **단계별 구현:**
   - Week 1-4: Gemini 프로토타입 (92% 정확도)
   - Week 5-6: 최적 로컬 모델 조사 및 선택
   - Week 7-9: Hybrid 전환 (점진적 Ollama 비율 증가)

---

## 🏗️ 2. Architecture Overview (Updated)

### 🛠️ Tech Stack (2025 Production-Ready)

**Frontend:**
* **Framework:** Next.js 15.5.6 (App Router + Turbopack)
* **Language:** TypeScript 5.8
* **Styling:** Tailwind CSS v4
* **UI Components:** shadcn/ui (Radix UI 기반)
* **Grid:** TanStack Table v8 (서버사이드 그리드)
* **Charts:** Recharts (Excel 차트 변환)
* **Excel Processing:** SheetJS (XLSX.js)

**Backend:**
* **API Layer:** tRPC (타입 안전 API)
* **ORM:** Prisma 6.19.0
* **Database:** PostgreSQL 16 (68 테이블, 34,594 rows)
* **Real DB:** MS SQL Server (172.16.200.204:1433) - 기존 데이터 보존

**AI & RAG Stack:**
* **LLM (Current):** Google Gemini 2.0 Flash
  - 정확도: 92%
  - 응답 속도: 0.6초
  - 비용: $15/월
* **LLM (Future - Week 5+):** Ollama + 최적 모델 (선택 예정)
  - 후보: Llama 3.2, Qwen 2.6, Gemma 3.0
  - 정확도 목표: 85-90%
  - 응답 속도: 3-5초
  - 비용: $0/월
* **Embeddings:** OpenAI text-embedding-3-small ($25/월, Week 2+)
* **Vector DB:** Chroma (로컬 Docker, 무료)
* **Caching:** Redis (로컬 Docker, 무료)
* **Full-text Search:** Elasticsearch (로컬 Docker, 선택적)
* **Orchestration:** LangChain

---

### 📐 System Flow (Updated)

```
[Excel Upload] 
    ↓
[AI Analysis - RAG Pipeline]
├─ Excel 구조 분석 (Vector DB 패턴 매칭)
├─ DB 컬럼 매핑 (한글명 → 테이블/컬럼)
├─ 차트 인식 (Excel → Recharts 변환)
└─ 수식 변환 (IF, SUM → SQL/JS)
    ↓
[Screen Generation]
├─ TanStack Table 그리드 생성
├─ Recharts 차트 컴포넌트 생성
├─ 검색 폼 자동 생성
└─ tRPC API 엔드포인트 생성
    ↓
[Temporary Menu]
└─ DB에 임시 메뉴 생성 (승인 대기)
    ↓
[User Validation]
├─ 사용자가 생성된 화면 확인
├─ 데이터 검증 (Answer Key 비교)
└─ 피드백 제공 → RAG 학습
    ↓
[Production Deploy]
└─ 승인 시 프로덕션 메뉴로 이동
```

### 🧠 RAG Learning Cycle

```
[Initial] 템플릿 기반 매핑 (98% 정확도, 단순 케이스만)
    ↓
[Phase 1] Vector DB 유사도 검색 (40% → 85% 정확도)
├─ DB 메타데이터 임베딩
├─ 컬럼명 한글-영문 매핑 저장
└─ 네이밍 패턴 학습 (proc=process, nm=name)
    ↓
[Phase 2] 고급 RAG 전략 (85% → 92% 정확도)
├─ Multi-Vector Indexing (테이블/컬럼/관계 분리)
├─ Hierarchical Search (계층적 검색)
├─ Adaptive Learning (컬럼별 학습률)
├─ Context Caching (Redis 60-70% hit)
├─ Ensemble RAG (4개 모델 조합)
└─ Active Learning (불확실 케이스 선택)
    ↓
[Continuous] 사용자 피드백 → Vector DB 업데이트
└─ 정확도 지속 개선 (92% → 95%+)
```

---

## 📅 3. Phased Roadmap (Updated)

### ✅ Phase 0: 기존 시스템 마이그레이션 (Completed)
> **"Vue 3 → Next.js 15 전환"**
* [x] Next.js 15 프로젝트 초기화 (App Router + Turbopack)
* [x] Prisma + PostgreSQL 16 설정
* [x] 기존 68개 테이블 마이그레이션 (34,594 rows)
* [x] tRPC API 레이어 구축
* [x] shadcn/ui 컴포넌트 설치
* [x] 동적 메뉴 시스템 유지

**주요 성과:**
- Next.js 프로젝트: `/home/roarm_m3/ai-factory-lab/`
- DB 연결: PostgreSQL 16 + MS SQL Server (병행)
- TypeScript 5.8 + Tailwind CSS v4 통합

---

### 🎯 Phase 1: 환경 설정 및 즉시 실행 (Current - Week 1)
> **"Gemini API로 즉시 개발 시작"**

#### ✅ Completed (Today)
* [x] `.env` 파일 생성 (`generator/.env`)
* [x] Gemini API 키 설정 가이드 제공
* [x] 간소화된 환경 변수 구성 (Ollama 보류)

#### ⏳ In Progress (Today - 5분 소요)
* [ ] **API 키 실제 입력:**
  ```bash
  cd /home/roarm_m3/ai-factory-lab/generator
  nano .env
  # GEMINI_API_KEY=your_actual_api_key_here
  #              ↓
  # GEMINI_API_KEY=(실제 발급받은 키)
  ```

* [ ] **Gemini API 연결 테스트:**
  ```bash
  python3 << 'EOF'
  from dotenv import load_dotenv
  import os
  import google.generativeai as genai
  
  load_dotenv()
  genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
  model = genai.GenerativeModel('gemini-2.0-flash')
  response = model.generate_content('테스트입니다!')
  print('✅ 성공:', response.text)
  EOF
  ```

#### 📋 Week 1 Checklist
- [x] 환경 변수 파일 생성
- [ ] GEMINI_API_KEY 실제 키 입력 (30초)
- [ ] Gemini API 연결 테스트 (30초)
- [ ] Week 2 개발 준비 완료

**전략적 결정:**
- ✅ Ollama 설치 **보류** (Week 5-6에 최적 모델 선택)
- ✅ Gemini만으로 즉시 개발 시작
- ✅ 단순화된 설정으로 진입 장벽 제거

---

### 🚀 Phase 2: Gemini 프로토타입 개발 (Week 2-4)
> **"RAG 기반 Excel → Screen 자동 생성 시스템 구축"**

#### Week 2: 기본 RAG 파이프라인
* [ ] **Vector DB 설정 (Chroma):**
  - Docker Compose 설정
  - Chroma 서버 실행 (localhost:8000)
  - Redis 캐싱 설정 (localhost:6379)

* [ ] **DB 메타데이터 수집:**
  - Prisma introspection으로 스키마 수집
  - 테이블/컬럼 한글명 매핑
  - Vector DB 임베딩 (OpenAI API)

* [ ] **기본 Excel 분석:**
  - SheetJS로 Excel 파싱
  - 헤더 행 자동 인식
  - 기본 컬럼 매핑 (85% 정확도 목표)

#### Week 3: 고급 RAG 기능
* [ ] **자유 형식 Excel 처리:**
  - 병합 셀 인식
  - 다단 헤더 처리
  - 그룹핑 패턴 학습

* [ ] **차트 자동 생성:**
  - Excel 차트 메타데이터 추출
  - Recharts 컴포넌트 변환
  - 데이터 패턴 → 차트 타입 추천

* [ ] **수식 변환:**
  - Easy (SUM, AVG, IF): 95% 목표
  - Medium (SUMIF, VLOOKUP): 75% 목표
  - Hard (복잡한 수식): 사용자 교육

#### Week 4: 검증 및 최적화
* [ ] **데이터 검증 시스템:**
  - Answer Key Excel 업로드
  - AI 결과 자동 비교
  - 차이점 리포트 생성

* [ ] **사용자 피드백 수집:**
  - 화면별 정확도 평가
  - 수정 사항 Vector DB 저장
  - 재학습 트리거

* [ ] **성능 최적화:**
  - Redis 캐싱 적용 (60-70% hit 목표)
  - 응답 속도 개선 (3초 → 1.5초)
  - 배치 처리 최적화

**목표:**
- Excel → Screen 생성 성공률: 92%
- Gemini 비용: $15/월
- 평균 응답 속도: 1.5초

---

### 🔍 Phase 3: 로컬 모델 조사 (Week 5-6)
> **"미래 최적 모델 선택 및 Hybrid 준비"**

#### Week 5: 시장 조사
* [ ] **최신 모델 벤치마크:**
  - Llama 3.2 출시 여부 확인
  - Qwen 2.6 성능 테스트
  - Gemma 3.0 한국어 평가
  - 새로운 경량 모델 탐색

* [ ] **요구사항 정의:**
  - 최소 정확도: 85% (Gemini 92% 기준)
  - 최대 응답 시간: 5초
  - 메모리 사용량: 16GB 이하
  - 한국어 지원 필수

#### Week 6: 모델 선택 및 테스트
* [ ] **최적 모델 선택:**
  - 벤치마크 결과 분석
  - 비용/성능 비율 평가
  - 커뮤니티 활성도 확인

* [ ] **Ollama 설치 및 설정:**
  ```bash
  curl -fsSL https://ollama.com/install.sh | sh
  ollama serve &
  ollama pull (선택된 모델)
  ```

* [ ] **LLMProvider 추상화 계층 구현:**
  ```typescript
  interface LLMProvider {
    name: string;
    invoke(prompt: string): Promise<string>;
    getCost(tokens: number): number;
  }
  
  class GeminiProvider implements LLMProvider { ... }
  class OllamaProvider implements LLMProvider { ... }
  ```

* [ ] **동일 테스트 케이스 실행:**
  - Gemini vs Ollama 정확도 비교
  - 응답 속도 측정
  - 비용 시뮬레이션

**목표:**
- 최적 로컬 모델 선택 완료
- Ollama 정확도: 85%+ 달성
- Hybrid 전환 준비 완료

---

### � Phase 4: Hybrid 구현 및 전환 (Week 7-9)
> **"점진적 Ollama 전환으로 비용 최적화"**

#### Week 7: Hybrid 시스템 구현 (50/50)
* [ ] **HybridProvider 구현:**
  ```typescript
  class HybridProvider implements LLMProvider {
    async invoke(prompt: string) {
      const ollamaResult = await this.ollama.invoke(prompt);
      const confidence = this.evaluateConfidence(ollamaResult);
      
      if (confidence >= 0.80) {
        return ollamaResult; // 로컬 (무료)
      } else {
        return await this.gemini.invoke(prompt); // 클라우드 (유료)
      }
    }
  }
  ```

* [ ] **Confidence 평가 로직:**
  - DB 매핑 확신도 계산
  - 패턴 매칭 점수
  - 사용자 피드백 기반 조정

* [ ] **A/B 테스트:**
  - `OLLAMA_RATIO=0.5` 설정
  - 50% Ollama, 50% Gemini 실행
  - 정확도/비용/속도 모니터링

**목표:**
- 정확도 유지: 90%+
- 비용 절감: $15/월 → $7.5/월 (50%)

#### Week 8: 비율 증가 (80/20)
* [ ] **Ollama 비율 증가:**
  - `OLLAMA_RATIO=0.8` 설정
  - 모니터링 대시보드 확인
  - 정확도 하락 시 임계값 조정

* [ ] **프롬프트 최적화:**
  - Ollama 전용 프롬프트 튜닝
  - 로컬 모델 특성 반영
  - Few-shot 예제 추가

**목표:**
- 정확도 유지: 89%+
- 비용 절감: $15/월 → $3/월 (80%)

#### Week 9: 최종 최적화 (92/8)
* [ ] **최종 비율 설정:**
  - `OLLAMA_RATIO=0.92` 설정
  - 복잡한 케이스만 Gemini 사용
  - Fallback 로직 완성

* [ ] **프로덕션 배포:**
  - Docker Compose 프로덕션 설정
  - 모니터링 알림 설정
  - 백업 및 복구 절차 문서화

* [ ] **성과 측정:**
  - 최종 정확도 검증
  - 월간 비용 확정
  - ROI 계산

**목표:**
- 정확도: 90% (목표 달성)
- 비용: $1.2/월 (98.5% 절감)
- ROI: 2주 회수, 월 $412 이익

---

## 📝 4. Action Items (Updated)

### 🔥 우선순위 1: 즉시 실행 (Today - 5분)
1. **[ENV]** `.env` 파일에 실제 GEMINI_API_KEY 입력
2. **[TEST]** Gemini API 연결 테스트 실행
3. **[VERIFY]** "✅ 성공" 메시지 확인
4. **[START]** Week 2 개발 시작 준비 완료

### 🎯 우선순위 2: Week 2 개발 (RAG 파이프라인)
1. **[DOCKER]** Chroma + Redis Docker Compose 설정
2. **[DB]** Prisma 메타데이터 수집 및 임베딩
3. **[EXCEL]** SheetJS 기본 파싱 구현
4. **[RAG]** Vector DB 유사도 검색 구현
5. **[UI]** Excel 업로드 UI 구현

### 📚 우선순위 3: Week 3-4 (고급 기능)
1. **[EXCEL]** 자유 형식 Excel 패턴 학습
2. **[CHART]** 차트 자동 생성 구현
3. **[FORMULA]** 수식 변환 로직 구현
4. **[VALIDATION]** Answer Key 비교 시스템
5. **[FEEDBACK]** 사용자 피드백 수집 UI

### � 우선순위 4: Week 5-6 (모델 조사)
1. **[RESEARCH]** 최신 로컬 모델 벤치마크
2. **[SELECT]** 최적 모델 선택
3. **[INSTALL]** Ollama 설치 및 모델 다운로드
4. **[ABSTRACT]** LLMProvider 인터페이스 구현
5. **[COMPARE]** Gemini vs Ollama 성능 비교

### 🚀 우선순위 5: Week 7-9 (Hybrid 전환)
1. **[HYBRID]** HybridProvider 구현
2. **[CONFIDENCE]** Confidence 평가 로직
3. **[MONITORING]** 모니터링 대시보드
4. **[OPTIMIZE]** 비율 점진적 증가
5. **[PRODUCTION]** 프로덕션 배포

---

## 📊 5. Current Status (2025.12.02)

### ✅ 완료된 기능
1. **Next.js 15 프로젝트 초기화** (App Router + Turbopack)
2. **Prisma + PostgreSQL 16 통합** (68 테이블, 34,594 rows)
3. **tRPC API 레이어** (타입 안전 API)
4. **동적 메뉴 시스템** (DB 기반)
5. **환경 변수 설정** (`.env` 파일 생성) ⭐ NEW
6. **간소화된 Gemini 전용 구성** ⭐ NEW
7. **9주 Hybrid 전환 로드맵** ⭐ NEW
8. **비용 최적화 전략** ($80/월 → $1.2/월) ⭐ NEW

### 🌐 환경 상태
- **프로젝트 경로**: `/home/roarm_m3/ai-factory-lab/`
- **Next.js**: localhost:3000 (설정 완료)
- **PostgreSQL**: localhost:5432 (68 테이블)
- **MS SQL Server**: 172.16.200.204:1433 (기존 데이터)
- **Gemini API**: 연결 대기 (API 키 입력 필요)

### ⏳ 진행 중 (Today - 5분 남음)
1. ⬜ **GEMINI_API_KEY 실제 키 입력** (30초)
2. ⬜ **Gemini API 연결 테스트** (30초)
3. ⬜ **Week 1 완료 확인** (즉시)

### 📋 다음 단계 (Week 2)
- Docker Compose 설정 (Chroma + Redis)
- OpenAI API 키 발급 (Embeddings)
- DB 메타데이터 수집 스크립트 작성
- Excel 파싱 기본 구현

### 📁 주요 파일 (Updated)
```
ai-factory-lab/
├── generator/
│   └── .env                    # ⭐ 환경 변수 (생성 완료)
├── docs/
│   ├── EXCEL_TO_SCREEN_TECHNICAL_ANALYSIS.md  # 4,457 lines
│   ├── RAG_IMPLEMENTATION_GUIDE.md            # 915 lines
│   └── SESSION_SUMMARY_20251202.md            # 524 lines
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # shadcn/ui 컴포넌트
│   ├── server/                 # tRPC 서버
│   └── trpc/                   # tRPC 클라이언트
├── prisma/
│   └── schema.prisma           # DB 스키마 (68 테이블)
├── next.config.js
├── tsconfig.json
└── tailwind.config.ts
```

### 💰 비용 예측 (9주 후)
```
Week 1-6: Gemini 100% = $15/월
Week 7:   Gemini 50%  = $7.5/월
Week 8:   Gemini 20%  = $3/월
Week 9:   Gemini 8%   = $1.2/월 (최종)

총 절감액: $78.8/월 (98.5% 절감)
ROI: 2주 회수, 월 $412 이익
```

### 🎯 정확도 목표
```
Template 기반:        98% (단순 케이스)
Basic RAG:            85% (일반 케이스)
Advanced RAG:         92% (복잡한 케이스)
Hybrid (Ollama 92%):  90% (최종 목표)
```

### 📈 기술 성과 예측
- **Excel 자동 분석**: 자유 형식 60% → 85%
- **DB 컬럼 매핑**: 40% → 92%
- **차트 변환**: 30% → 75%
- **수식 변환**: 50% → 80%
- **전체 정확도**: 90% (목표 달성)

---

## 🔗 6. References

### 📚 Documentation
- **Technical Analysis**: `docs/EXCEL_TO_SCREEN_TECHNICAL_ANALYSIS.md` (4,457 lines)
- **RAG Implementation**: `docs/RAG_IMPLEMENTATION_GUIDE.md` (915 lines)
- **Session Summary**: `docs/SESSION_SUMMARY_20251202.md` (524 lines)

### 🌐 Official Docs
- **Next.js 15**: https://nextjs.org/docs
- **Gemini API**: https://ai.google.dev/gemini-api/docs
- **Chroma Vector DB**: https://docs.trychroma.com/
- **LangChain**: https://python.langchain.com/docs/
- **Ollama**: https://ollama.com/
- **Prisma**: https://www.prisma.io/docs
- **tRPC**: https://trpc.io/docs

### 🛠️ Tools & Resources
- **Repository**: https://github.com/limjh6991-spec/AI-FACTORY-LAB
- **Gemini API Key**: https://aistudio.google.com/apikey
- **OpenAI API Key**: https://platform.openai.com/api-keys

---

## 💡 7. Strategic Decisions

### ✅ Decision 1: Ollama 보류 (Week 5-6으로 연기)
**이유:**
- 현재 최적 모델 불확실 (Llama 3.2, Qwen 2.6 출시 대기)
- Gemini로 즉시 개발 시작 가능
- 6-8주 후 더 나은 모델 선택 가능

**효과:**
- 진입 장벽 제거 (설치 시간 0분)
- 단순화된 환경 설정 (`.env` 3줄만 필요)
- 미래 최적 선택 보장

### ✅ Decision 2: Hybrid Staged Approach
**전략:**
- Week 1-4: Gemini 100% (안정적 프로토타입)
- Week 5-6: 최적 모델 조사 및 선택
- Week 7-9: 점진적 전환 (50% → 80% → 92%)

**효과:**
- 리스크 최소화 (검증 후 전환)
- Rollback 가능 (Gemini로 복귀)
- 비용 최적화 (최종 $1.2/월)

### ✅ Decision 3: 로컬 인프라 우선
**구성:**
- Chroma (Vector DB): 로컬 Docker
- Redis (Cache): 로컬 Docker
- Elasticsearch (Search): 로컬 Docker, 선택적
- Ollama (LLM): 로컬 Docker, Week 5+

**효과:**
- 월 $40-55 절감 (vs Pinecone)
- 데이터 프라이버시 보장
- 네트워크 지연 제거

---

**Last Updated:** 2025년 12월 2일  
**Version:** 3.0  
**Status:** Week 1 진행 중 (API 키 입력 대기)
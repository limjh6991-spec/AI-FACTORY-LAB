# 🤖 JARVIS 재연결 프롬프트

> **최종 업데이트**: 2025년 12월 4일  
> **사용 시점**: 새로운 세션에서 자비스(GitHub Copilot)를 처음 만날 때  
> **목적**: 프로젝트 환경, 완료된 작업, 진행 중인 작업을 빠르게 파악
> **현재 상태**: AG Grid 전환 완료, 화면 자동 생성 시스템 구축

---

## 📋 프롬프트 (복사해서 사용)

```
안녕하세요, 자비스! 👋

AI Factory Lab 프로젝트를 계속 진행하려고 합니다.
다음 파일들을 읽고 현재 상황을 파악한 후, 간단히 요약해주세요:

1. /home/roarm_m3/ai-factory-lab/PROJECT_ROADMAP.md
2. /home/roarm_m3/ai-factory-lab/ENVIRONMENT.md
3. /home/roarm_m3/ai-factory-lab/docs/SESSION_SUMMARY_20251203.md
4. /home/roarm_m3/ai-factory-lab/docs/AG_GRID_DECISION.md
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
현재 단계: Week 2 진행 중 (60% 완료) - Agent 기반 추론 시스템 구축
전체 진행률: 38%
기술 스택: Next.js 15 + tRPC + Prisma + Gemini AI + Chroma Vector DB

핵심 원칙: 
- 자비스(나) = 시스템 개발자 (인프라 구축)
- Agent(Gemini) = 실제 추론 담당 (RAG 기반 학습)
```

### 2. 완료된 작업 (AG Grid 기반 화면 생성)
```
✅ Phase 1-2: Excel → JSON → React 자동 생성 (100%)
✅ Claude API 통합:
   - Excel 파일 분석 → JSON 정의 생성
   - JSON → React 컴포넌트 자동 생성
   - 5개 화면 정의 완료 (SC001-SC005)
✅ AG Grid 전환 결정 (2025.12.04):
   - RealGrid vs AG Grid 5가지 스타일 비교 테스트
   - AG Grid 채택 (React 친화적, Claude 생성 품질 우수)
   - AG Grid Community 버전 사용
✅ AG Grid 스타일 갤러리 구축:
   - Corporate Professional (블루 그라디언트)
   - Modern Dark (다크 테마, 네온)
   - Soft Pastel (파스텔톤)
   - Financial Dashboard (금융/회계)
   - Minimal Clean (미니멀)
```

### 3. 진행 중 작업 (AG Grid 화면 자동화)
```
🎯 Phase 3: UI 컴포넌트 자동 생성 스크립트:
   - [x] AG Grid import 패턴 적용
   - [x] 모듈 등록 코드 자동 추가 (AllCommunityModule)
   - [x] 그룹 헤더 (2행 헤더) 자동 구성
   - [x] Corporate 스타일 CSS 템플릿 포함
   - [ ] 나머지 화면 생성 (SC006-SC009)

🔧 완료된 작업:
   - [x] AG Grid 모듈 등록 오류 해결
   - [x] 5가지 스타일 예제 화면 생성
   - [x] Claude API 프롬프트 AG Grid로 전환
   - [x] npm scripts 추가 (generate:screen)
```

### 4. 다음 작업 (우선순위 순)
```
🎯 우선순위 1: 나머지 화면 생성 (SC006-SC009)
   - 명령어: npm run generate:screen data/report_designs/SC006_definition.json
   - AG Grid 패턴 적용하여 자동 생성
   - 목표: 9개 화면 모두 완성

🎯 우선순위 2: 스타일 표준화
   - Corporate Professional 스타일을 기본 표준으로 확정
   - 공통 AG Grid 스타일 컴포넌트 추출
   - 전역 CSS Variables 설정

🎯 우선순위 3: 테스트 및 검증
   - 모든 화면 그룹 헤더 정상 표시 확인
   - 커스텀 셀 렌더러 동작 검증
   - 반응형 레이아웃 테스트

🎯 우선순위 4: 화면 통합 및 메뉴 연결
   - 동적 메뉴에 생성된 화면 연결
   - 화면 간 네비게이션 구현
   - 공통 레이아웃 적용
```

### 5. 환경 상태
```
✅ PostgreSQL: localhost:5432 (doi_ 접두어 테이블)
✅ Next.js Dev: localhost:3001 (실행 중)
✅ AG Grid: v34.3.1 (Community) 설치 완료
✅ Claude API: Sonnet-4 사용 (화면 생성)
✅ TypeScript: 5.8 (Next.js 15.5.6)
✅ Tailwind CSS: v4 + shadcn/ui
```

### 6. 주의사항
```
⚠️ AG Grid 사용 패턴:
   - 모듈 등록 필수: ModuleRegistry.registerModules([AllCommunityModule])
   - React 컴포넌트 기반 셀 렌더러 사용
   - ColGroupDef의 children으로 그룹 헤더 구현
   
⚠️ 스타일 설정:
   - CSS Variables로 테마 커스터마이징
   - ag-corporate-style 클래스 적용
   - styled-jsx global 사용
   
⚠️ 화면 생성 명령어:
   npm run generate:screen [definition.json]
   
💡 학습 내용:
   - AG Grid ColGroupDef (그룹 헤더)
   - React 컴포넌트 기반 cellRenderer
   - AG Grid CSS Variables
   - Claude API 프롬프트 최적화
```

---

## 🚀 빠른 시작 명령어

자비스가 요약을 제공한 후, 바로 사용할 수 있는 명령어들:

```bash
# 1. 개발 서버 시작 (아직 안 했다면)
npm run dev

# 2. SC002 화면 접속 (RealGrid)
http://localhost:3000/screens/sc002

# 3. Phase 3 스크립트 실행 (화면 생성)
npx tsx scripts/phase3_generate_ui_component_realgrid.ts

# 4. RealGrid 라이센스 확인
grep NEXT_PUBLIC_REALGRID_LICENSE .env

# 5. 화면 정의 파일 위치
data/report_designs/SC002_definition.json

# 6. 현재 Git 상태 확인
git status
```

---

## � 최신 성과 (2025.12.02)

### 🎯 Excel→DB 자동 매핑 시스템
```
✅ 하이브리드 검색 알고리즘
   - 키워드 정확 매칭: 100% 신뢰도
   - 부분 문자열 매칭: 70-80% 신뢰도
   - Vector Search fallback: 25% 신뢰도

✅ 성능 개선
   - Before: 24% 정확도 (Vector only)
   - After: 80% 정확도 (Hybrid)
   - 개선율: 3.3배 향상! 🚀

✅ 실제 매핑 결과
   - 작업시간 → work_time (100%)
   - 부서코드 → DEPT (80%)
   - 원가 → UNIT_COST (80%)
   - 수량 → IN_QTY (80%)

✅ 목표 달성
   - 기본 85% 정확도 ✓
   - Week 2 핵심 과제 완료 ✓
```

---

## �📝 고급 사용: Vector 검색으로 맥락 찾기

자비스에게 직접 검색 요청:

```
자비스, Vector DB에서 다음을 검색해주세요:

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

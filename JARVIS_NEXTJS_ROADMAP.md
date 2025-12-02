# AI Factory Lab - 개발 로드맵

> **프로젝트 목표**: AI(Gemini 2.5 Flash) 기반 자동 화면 생성 시스템 구축  
> **타겟**: Grid/Chart 중심 100개 화면 자동 생성 (9시간 목표)

---

## 🎯 핵심 전략

### Why Next.js + tRPC?
1. **AI 정확도 95%** (vs Vue+Spring 60%)
   - 단일 언어(TypeScript)
   - 명확한 파일 구조
   - tRPC의 명시적 타입

2. **개발 속도 3배**
   - 화면당 5분 (vs 40분)
   - 100개 화면: 9시간 (vs 70시간)

3. **비용 절감 33%**
   - RealGrid → TanStack Table (무료)
   - 연간 $7,920 절감

---

## 📅 Phase 별 계획

### ✅ Phase 0: Foundation (완료) - 2025.12.01
**목표**: Next.js 환경 구축 및 첫 CRUD 완성

**완료 항목**:
- [x] T3 Stack 프로젝트 초기화
- [x] PostgreSQL 설정 (ai_factory_db)
- [x] Prisma 스키마 설정 (Product 모델)
- [x] 필수 라이브러리 설치
  - TanStack Table, Recharts, lucide-react
  - shadcn/ui (8개 컴포넌트)
  - react-hook-form, zod
- [x] Product tRPC 라우터 (CRUD)
- [x] Product 관리 페이지 (검색, 테이블, 페이지네이션)
- [x] 샘플 데이터 (12개 상품)
- [x] 홈페이지 네비게이션
- [x] ENVIRONMENT.md 작성

**결과물**:
- 완전히 작동하는 Product CRUD 화면
- End-to-End Type Safety 검증
- 개발 환경 완성

---

### 🚧 Phase 1: Core Features (진행 중) - 2025.12.02~04
**목표**: 기본 기능 10개 화면 완성

**화면 목록** (우선순위 순):
1. **Dashboard** (대시보드)
   - 매출/재고 차트 (Recharts)
   - 요약 카드 (매출, 주문, 재고)
   - 최근 활동 타임라인

2. **Order Management** (주문 관리)
   - 주문 목록 (TanStack Table)
   - 주문 상세/수정
   - 주문 상태 변경

3. **Customer Management** (고객 관리)
   - 고객 목록
   - 고객 상세/이력
   - 고객 분석 차트

4. **Inventory** (재고 관리)
   - 재고 현황 테이블
   - 입출고 이력
   - 재고 알림 설정

5. **Sales Report** (매출 리포트)
   - 기간별 매출 차트
   - 상품별 매출 순위
   - 카테고리별 분석

6. **Settings** (설정)
   - 사용자 프로필
   - 시스템 설정
   - 권한 관리

7. **Category Management** (카테고리 관리)
   - 트리 구조 카테고리
   - 드래그 앤 드롭 정렬

8. **Supplier Management** (공급업체 관리)
   - 업체 목록/등록
   - 거래 이력

9. **Promotion Management** (프로모션 관리)
   - 할인/쿠폰 관리
   - 기간별 프로모션

10. **Analytics** (분석)
    - 실시간 통계
    - 사용자 행동 분석

**작업 상세**:
```typescript
// 각 화면마다:
1. Prisma 모델 설계
2. tRPC 라우터 작성 (CRUD + 커스텀 쿼리)
3. UI 컴포넌트 작성 (shadcn/ui 활용)
4. 폼 validation (zod)
5. 테이블/차트 구현
6. 반응형 디자인
7. 에러 핸들링
```

**예상 시간**: 
- 화면당 평균 4시간 (수동)
- 총 40시간 (1주일)

---

### 🤖 Phase 2: AI Generator MVP - 2025.12.05~10
**목표**: Excel 기반 화면 자동 생성 시스템 구축

**구성 요소**:

1. **Excel Parser** (엑셀 파서)
   ```typescript
   // Input: resources/excel/SCREEN_SPEC.xlsx
   // Output: JSON Schema
   {
     screenId: "SC001",
     screenName: "상품 관리",
     fields: [
       { name: "productCode", type: "string", label: "상품코드" },
       { name: "price", type: "number", label: "가격" }
     ],
     layout: {
       type: "grid",
       features: ["search", "pagination", "export"]
     }
   }
   ```

2. **Prompt Generator** (프롬프트 생성기)
   ```typescript
   // generator/prompts/nextjs-screen.txt
   const prompt = `
   Create a Next.js page with:
   - tRPC router for ${modelName}
   - Prisma schema with fields: ${fields}
   - UI with TanStack Table
   - Search, filter, pagination
   - shadcn/ui components
   `;
   ```

3. **Gemini Integration** (AI 연동)
   ```typescript
   import { GoogleGenerativeAI } from "@google/generative-ai";
   
   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
   
   const result = await model.generateContent(prompt);
   const code = result.response.text();
   ```

4. **Code Generator** (코드 생성기)
   ```typescript
   // 생성 파일:
   - prisma/schema.prisma (모델 추가)
   - src/server/api/routers/[model].ts
   - src/app/[route]/page.tsx
   - src/app/[route]/components/[Model]Form.tsx
   ```

5. **Validator** (검증기)
   - TypeScript 타입 체크
   - ESLint 검사
   - 빌드 테스트
   - 자동 수정

**작업 흐름**:
```
Excel Upload → Parse → Generate Prompt → AI → Code Files → Validate → Commit
```

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

---

## 🛠️ 기술 스택별 학습 자료

### Next.js
- [ ] App Router 심화
- [ ] Server Components vs Client Components
- [ ] Streaming SSR
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

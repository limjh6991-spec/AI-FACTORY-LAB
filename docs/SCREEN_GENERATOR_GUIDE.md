# 화면 자동 생성 시스템 - 3단계 분리 구조

> **최종 업데이트**: 2025년 12월 5일  
> **목적**: Excel 시트 → 완성된 화면 자동 생성 (템플릿, 쿼리, 통합 분리)

---

## 📁 폴더 구조

```
scripts/generator/
├── phase1-template/           # 1단계: 템플릿 빈 화면 생성
│   └── generate_template.ts
├── phase2-query/              # 2단계: SQL 쿼리 생성
│   └── generate_query.ts
└── phase3-integration/        # 3단계: 화면 + 쿼리 통합
    └── integrate_screen.ts

data/
├── screen_definitions/        # 화면 정의 JSON
│   └── SC######_definition.json
└── generated_queries/         # 생성된 쿼리
    ├── SC######_query.json
    └── SC######_query.sql

src/app/screens/
└── sc######/                  # 생성된 화면
    └── page.tsx

src/server/api/routers/
└── sc######.ts               # 생성된 API 라우터
```

---

## 🚀 사용법

### 전체 플로우

```bash
# 1단계: Excel 시트 → 템플릿 빈 화면
npm run gen:phase1 -- "8-1. 판매관리비 집계표(부서별)"
# → data/screen_definitions/SC######_definition.json
# → src/app/screens/sc######/page.tsx (빈 화면)

# 2단계: 화면 정의 → SQL 쿼리
npm run gen:phase2 -- SC######
# → data/generated_queries/SC######_query.json
# → data/generated_queries/SC######_query.sql

# 3단계: 템플릿 + 쿼리 → 완성된 화면
npm run gen:phase3 -- SC######
# → src/app/screens/sc######/page.tsx (완성)
# → src/server/api/routers/sc######.ts (API)
```

### 개별 명령어

```bash
# Phase 1만 실행
npx tsx scripts/generator/phase1-template/generate_template.ts "시트명"

# Phase 2만 실행
npx tsx scripts/generator/phase2-query/generate_query.ts SC######

# Phase 3만 실행
npx tsx scripts/generator/phase3-integration/integrate_screen.ts SC######
```

---

## 📊 Phase 별 상세

### Phase 1: 템플릿 빈 화면 생성

**입력**:
- Excel 시트명

**처리**:
1. Excel 시트 분석 (XLSX)
   - 1행: 소스 테이블명
   - 2행: 설명 (고정 컬럼 수 등)
   - 3행: 헤더 컬럼
2. 화면 정의 JSON 생성
3. Claude API로 AG Grid 템플릿 생성

**출력**:
- `data/screen_definitions/SC######_definition.json`
- `src/app/screens/sc######/page.tsx` (데이터 없음)

---

### Phase 2: SQL 쿼리 생성

**입력**:
- 화면 정의 JSON (Phase 1 결과)
- DB 메타데이터 (`data/db_metadata.json`)

**처리**:
1. 소스 테이블 메타데이터 로드
2. Claude API로 SQL 쿼리 생성
   - 쿼리 유형 판단 (pivot/simple/aggregate)
   - 파라미터 정의
   - 결과 컬럼 매핑

**출력**:
- `data/generated_queries/SC######_query.json`
- `data/generated_queries/SC######_query.sql`

---

### Phase 3: 화면 통합

**입력**:
- 화면 정의 JSON (Phase 1)
- 쿼리 정의 JSON (Phase 2)
- 템플릿 코드 (Phase 1)

**처리**:
1. tRPC API 라우터 생성
2. Claude API로 화면에 API 호출 통합
3. 데이터 바인딩 구현

**출력**:
- `src/app/screens/sc######/page.tsx` (완성)
- `src/server/api/routers/sc######.ts` (API)

---

## 📝 생성 예시

### 입력: Excel 시트

```
| 1행: DOI_DEPT, DOI_ACCT_EXPEN                                |
| 2행: 판매관리비 집계_부서별, 구분/계획/합계 3열 고정...      |
| 3행: 구분_부서별 | 계획 | 합계 | 전사 | 경영지원실 | ...     |
| 4행: 합계       | 0    | 0    | 0    | 0         | ...       |
| 5행: (1) 임원급여 |     | 0    | 0    | 0         | ...       |
```

### Phase 1 출력: 화면 정의

```json
{
  "screenId": "SC982157",
  "screenName": "판매관리비 집계표(부서별)",
  "sourceTables": ["DOI_DEPT", "DOI_ACCT_EXPEN"],
  "columns": [
    { "field": "col_0", "headerName": "구분_부서별", "pinned": "left" },
    { "field": "col_1", "headerName": "계획", "type": "number" },
    ...
  ]
}
```

### Phase 2 출력: SQL 쿼리

```sql
WITH dept_sales_data AS (
    SELECT category, dept_name, SUM(acct_amt) as amount
    FROM doi_acct_expen ae
    LEFT JOIN doi_dept d ON ae.dept = d.dept
    WHERE ae.acct_ym = :yearMonth
    GROUP BY category, dept_name
)
SELECT 
    category as "구분_부서별",
    SUM(plan_amt) as "계획",
    SUM(amount) as "합계",
    COALESCE(SUM(CASE WHEN dept_name = '경영지원실' THEN amount END), 0) as "경영지원실",
    ...
FROM dept_sales_data
GROUP BY category
```

### Phase 3 출력: 완성된 화면

- AG Grid 컴포넌트
- tRPC API 호출
- 검색 조건 폼
- 데이터 바인딩

---

## ⚠️ 주의사항

### 1. 환경 변수
```bash
# 셸에 잘못된 API 키가 있으면 unset 필요
unset ANTHROPIC_API_KEY && npm run gen:phase1 -- "시트명"
```

### 2. API 라우터 등록
Phase 3 완료 후 `src/server/api/root.ts`에 라우터 추가:
```typescript
import { sc982157Router } from './routers/sc982157';

export const appRouter = createTRPCRouter({
  // ...기존 라우터...
  sc982157: sc982157Router,
});
```

### 3. 쿼리 검증
생성된 쿼리는 실제 실행 전 검토 필요:
```bash
cat data/generated_queries/SC######_query.sql
```

---

## 📌 npm 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run gen:phase1 -- "시트명"` | Phase 1: 템플릿 생성 |
| `npm run gen:phase2 -- SC######` | Phase 2: 쿼리 생성 |
| `npm run gen:phase3 -- SC######` | Phase 3: 화면 통합 |

---

## 🎯 다음 개선 사항

1. **프롬프트 최적화**: Claude API 응답 품질 향상
2. **쿼리 검증**: 생성된 SQL 자동 검증
3. **테스트 데이터**: 샘플 데이터로 화면 테스트
4. **배치 생성**: 여러 시트 일괄 처리

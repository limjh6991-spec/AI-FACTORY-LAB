# AI Factory Lab - 개발 작업 기록

## 작업일: 2025-12-22

---

## 📋 작업 1: 옵션 컴포넌트 라벨 회사별 동적 표시

### 목표
`bi_common_code` 테이블을 활용하여 옵션 컴포넌트의 라벨을 회사별(BINARY, DOU, DOU_MES)로 동적으로 표시

### 생성된 파일

| 파일 | 설명 |
|------|------|
| `prisma/migrations/add_ui_label.sql` | DB 마이그레이션: ui_label 컬럼 추가 + 초기 데이터 |
| `src/infrastructure/services/label-service.ts` | 서버사이드 라벨 조회 서비스 |
| `src/components/options/LabelContext.tsx` | React Context + useLabels 훅 |

### 수정된 파일

| 파일 | 변경 내용 |
|------|----------|
| `src/server/api/routers/options.ts` | `getLabels` API 추가 |
| `src/components/options/index.tsx` | 12개 컴포넌트에 `useLabels()` 훅 적용 |

### 적용된 컴포넌트 (12개)
- CustomerSelect, MaterialSelect, ModelSelect, AccountSelect
- ExpenSelSelect, DepartmentSelect, SiteSelect, SelCodeSelect
- CostCenterSelect, UserSelect, EquipmentSelect, ProductSelect

### 회사별 라벨 예시

| 카테고리 | BINARY | DOU | DOU_MES |
|---------|--------|-----|---------|
| PRODUCT | 제품 | 자재 | 품목 |
| ACCOUNT | 계정 | 계정과목 | 계정 |
| USER | 사용자 | 사원 | 사용자 |
| SITE | 사업장 | 공장 | 라인 |

### 사용 방법
```bash
# DB 마이그레이션 실행 (필수)
psql -d ai_factory_db -f prisma/migrations/add_ui_label.sql
```

---

## 📋 작업 2: 화면 생성기 스타일 통일

### 목표
RealGrid 화면 생성기에서 생성되는 화면의 스타일을 `/test/options` 페이지의 공통 컴포넌트와 일치시키기

### 문제점 (수정 전)
- `DATE_PICKER`가 일반 `<input>`으로 생성됨
- 버튼이 인라인 스타일(Carbon 기반, 각진 모서리)로 생성됨
- 검색/초기화 버튼에 아이콘 없음

### 수정된 파일

| 파일 | 변경 내용 |
|------|----------|
| `src/server/api/routers/screen-generator/templates/realgrid-crud/RealGridCrudTemplate.ts` | 템플릿 코드 수정 |

### 변경 사항

| 항목 | 수정 전 | 수정 후 |
|------|---------|---------|
| DATE_PICKER | 일반 input | `YearMonthPicker` 컴포넌트 |
| 버튼 스타일 | 인라인 style (각진) | Tailwind (`rounded-lg`) |
| 검색 버튼 | 아이콘 없음, "검색" | Search 아이콘 + "조회" |
| 초기화 버튼 | 회색 배경 | RotateCcw 아이콘 + `bg-slate-500` |
| 버튼 높이 | 48px (height 속성) | py-2 (padding) |

### 새 버튼 스타일 (Tailwind)
```typescript
const btnClass = {
  primary: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all",
  success: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-all",
  danger: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all",
  secondary: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-500 text-white hover:bg-slate-600 transition-all",
};
```

---

## 📌 알려진 이슈

1. **빌드 오류**: `block-schema` 모듈 경로 문제 (기존 프로젝트 이슈, 이번 수정과 무관)
2. **TypeScript Lint 오류**: `RealGridCrudTemplate.ts`의 타입 정의 불일치 (기존 이슈)

---

## 🔧 다음 작업 (권장)

1. DB 마이그레이션 실행: `add_ui_label.sql`
2. 기존 생성된 화면(sc000048, sc000050 등) 재생성 또는 수동 스타일 업데이트
3. `block-schema` 모듈 경로 오류 해결

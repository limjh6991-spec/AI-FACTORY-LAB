# 세션 컨텍스트 - 2025년 12월 8일

## 📋 작업 개요

Binary 스키마 기준정보 관리 시스템 구축

### 완료된 작업

#### 1. Binary 스키마 샘플 데이터 생성
- **파일**: `/scripts/sql/bi_sample_data.sql`
- **내용**: 10개 마스터 테이블에 총 1,050개 샘플 데이터 INSERT
- **테이블별 데이터**:
  - `bi_dept_mst` (부서): 35개 부서 × 3개월 = 105건
  - `bi_cost_center` (코스트센터): 35개 × 3개월 = 105건
  - `bi_user_mst` (사원): 35명 × 3개월 = 105건
  - `bi_acct_mst` (계정): 35개 계정 × 3개월 = 105건
  - `bi_expen_sel_mst` (비용선택): 35개 × 3개월 = 105건
  - `bi_cust_mst` (고객): 35개 고객 × 3개월 = 105건
  - `bi_eqp_mst` (설비): 35개 설비 × 3개월 = 105건
  - `bi_prod_mst` (제품): 35개 제품 × 3개월 = 105건
  - `bi_bom_mst` (BOM): 35개 BOM × 3개월 = 105건
  - `bi_alloc_std` (배부기준): 35개 × 3개월 = 105건

#### 2. 공통 컴포넌트 개발
- **파일**: `/src/components/master/index.tsx`
- **컴포넌트**:
  - `BiSiteSelect` - 사업장 선택
  - `BiScenarioSelect` - 시나리오 선택 (ACTUAL/BUDGET/FORECAST)
  - `BiYearMonthPicker` - 년월 선택
  - `BiDepartmentSelect` - 부서 선택 (tRPC 연동)
  - `BiCostCenterSelect` - 코스트센터 선택 (tRPC 연동)
  - `BiUserSelect` - 사원 선택 (tRPC 연동)
  - `BiAccountSelect` - 계정 선택 (tRPC 연동)
  - `BiExpenseItemSelect` - 비용항목 선택 (tRPC 연동)
  - `BiCustomerSelect` - 고객 선택 (tRPC 연동)
  - `BiEquipmentSelect` - 설비 선택 (tRPC 연동)
  - `BiProductSelect` - 제품 선택 (tRPC 연동)

#### 3. tRPC 라우터 개발
- **파일**: `/src/server/api/routers/biMaster.ts`
- **프로시저**:
  - `getDepartments` - 부서 목록 조회
  - `getCostCenters` - 코스트센터 목록 조회
  - `getUsers` - 사원 목록 조회
  - `getAccounts` - 계정 목록 조회
  - `getExpenseItems` - 비용항목 목록 조회
  - `getCustomers` - 고객 목록 조회
  - `getEquipments` - 설비 목록 조회
  - `getProducts` - 제품 목록 조회
  - `listDepartments` - 부서 상세 목록 (CRUD용)
  - `saveDepartment` - 부서 저장 (INSERT/UPDATE)
  - `deleteDepartment` - 부서 삭제
  - `listCostCenters` - 코스트센터 상세 목록
  - `listProducts` - 제품 상세 목록
  - `listCustomers` - 고객 상세 목록

- **파일 수정**: `/src/server/api/root.ts`
  - `biMaster` 라우터 등록

#### 4. 부서관리 CRUD 화면 개발
- **파일**: `/src/app/master/dept/page.tsx`
- **기능**:
  - AG Grid 기반 데이터 조회/편집
  - 행 추가/수정/삭제
  - 저장 (신규 INSERT, 기존 UPDATE, 삭제 DELETE)
  - 엑셀 다운로드 (CSV)
  - 검색 버튼 클릭 시에만 조회 (자동 조회 아님)
- **디자인**:
  - SC000020과 동일한 파란색 그라디언트 헤더
  - IBM Carbon Design System 기반 버튼 스타일

---

## 🔧 기술 스택

- **프레임워크**: Next.js 15.5.6
- **API**: tRPC v11
- **ORM**: Prisma 6.19.0
- **데이터베이스**: PostgreSQL (binary 스키마)
- **그리드**: AG Grid (Community + Enterprise)
- **디자인 시스템**: IBM Carbon Design System (Light Blue)

---

## 📊 데이터베이스 정보

### 연결 정보
```
Host: localhost:5432
Database: ai_factory_db
User: postgres
Password: postgres
Schema: binary
```

### 공통 PK 패턴
모든 bi_* 테이블은 다음 컬럼을 복합 PK로 사용:
- `plant_site_code` (사업장코드)
- `yyyymm` (년월)
- `scenario_code` (시나리오코드)
- Entity별 고유코드 (예: department_code, cost_center_code 등)

### 샘플 데이터 기준
- 사업장: SITE_01
- 년월: 202510, 202511, 202512
- 시나리오: ACTUAL

---

## 📁 파일 구조

```
src/
├── app/
│   └── master/
│       └── dept/
│           └── page.tsx          # 부서관리 CRUD 화면
├── components/
│   └── master/
│       └── index.tsx             # Binary 스키마 공통 컴포넌트
└── server/
    └── api/
        ├── root.ts               # tRPC 라우터 등록 (수정)
        └── routers/
            └── biMaster.ts       # Binary 스키마 API 라우터

scripts/
└── sql/
    └── bi_sample_data.sql        # 샘플 데이터 INSERT SQL
```

---

## 🚀 다음 작업 예정

1. **나머지 기준정보 CRUD 화면 개발** (9개)
   - `/master/cost-center` - 코스트센터 관리
   - `/master/user` - 사원 관리
   - `/master/account` - 계정 관리
   - `/master/expense` - 비용항목 관리
   - `/master/customer` - 고객 관리
   - `/master/equipment` - 설비 관리
   - `/master/product` - 제품 관리
   - `/master/bom` - BOM 관리
   - `/master/allocation` - 배부기준 관리

2. **기능 개선**
   - 데이터 유효성 검증 추가
   - 중복 체크 로직
   - 대량 데이터 처리 (가상 스크롤)

---

## 💡 참고 사항

### Prisma에서 binary 스키마 접근
PostgreSQL의 binary 스키마에 접근할 때 `"binary".table_name` 형식으로 큰따옴표 사용 필요:
```sql
SELECT * FROM "binary".bi_dept_mst WHERE ...
```

### AG Grid 헤더 스타일 (SC000020 기준)
```css
.ag-theme-alpine {
  --ag-header-background-color: #dbeafe;
  --ag-header-foreground-color: #1e3a5f;
}
.ag-theme-alpine .ag-header-cell {
  background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
  color: #1e3a5f;
  font-weight: 500;
}
```

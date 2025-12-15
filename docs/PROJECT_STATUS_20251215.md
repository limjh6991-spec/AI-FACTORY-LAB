# AI Factory Lab - 프로젝트 상태 보고서
## 작성일: 2025-12-15

---

## 🎯 금일 작업 요약

오늘은 공통 옵션 컴포넌트 정비, 화면 생성기 개선, 메뉴 구조 정리에 집중했습니다.

---

## ✅ 완료된 작업

### 1. 공통 옵션 컴포넌트 리팩토링

**목적**: binary 스키마의 마스터 테이블 기반으로 공통 옵션 컴포넌트 통합

**수정 파일**:
- `src/server/api/routers/options.ts` - tRPC API 전체 재작성
- `src/components/options/index.tsx` - 14개 옵션 컴포넌트 통합

**완료된 옵션 컴포넌트 (14개)**:
| 카테고리 | 컴포넌트 | 데이터 소스 |
|---------|---------|------------|
| 마스터 | CustomerSelect | bi_cust_mst |
| 마스터 | MaterialSelect | bi_prod_mst |
| 마스터 | ProductSelect | bi_prod_mst |
| 마스터 | ModelSelect | bi_model_mst |
| 마스터 | EquipmentSelect | bi_equip_mst |
| 마스터 | AccountSelect | bi_acct_mst |
| 마스터 | ExpenSelSelect | bi_expen_sel_mst |
| 마스터 | DepartmentSelect | bi_dept_mst |
| 마스터 | CostCenterSelect | bi_dept_mst |
| 마스터 | UserSelect | bi_user_mst |
| 공통 | SiteSelect | bi_dept_mst (DISTINCT) |
| 공통 | SelCodeSelect | bi_dept_mst (DISTINCT) |
| 날짜 | YearMonthPicker | 클라이언트 |
| 날짜 | YearPicker | 클라이언트 |

---

### 2. SimpleModeRealGrid.tsx 파일 분리

**목적**: 948줄 파일을 모듈화하여 유지보수성 향상

**결과**:
| 파일 | Before | After | 변화 |
|------|--------|-------|------|
| SimpleModeRealGrid.tsx | 924줄 (36KB) | 626줄 (20KB) | -32% |
| sandpackMocks.ts (신규) | - | 360줄 | 신규 |

**분리된 내용**:
```
_components/
├── SimpleModeRealGrid.tsx (626줄)
└── mocks/
    └── sandpackMocks.ts (360줄)
        ├── REALGRID_MOCK_CODE
        ├── OPTIONS_MOCK_CODE
        ├── JSZIP_MOCK_CODE
        └── getSandpackAdditionalFiles()
```

---

### 3. 사이드바 메뉴 구조 정리

**목적**: 시스템 메뉴를 사이드바 하단(접기 버튼 위)에 고정

**수정 파일**:
- `src/components/Sidebar.tsx` - 시스템 메뉴(sortOrder >= 900) 분리 렌더링
- DB 메뉴 데이터 UPDATE (scripts/update_menu.sql)

**최종 메뉴 구조**:
```
시스템 (MNU900) - sortOrder: 900
├── 사용자 관리 (MNU910)
├── 권한 관리 (MNU920)
├── 메뉴 관리 (MNU930)
├── 화면 생성 (MNU940)
│   ├── 화면 생성기 (MNU941)
│   ├── 공통옵션 테스트 (MNU942)
│   └── RealGrid 화면생성기 (MNU943)
└── RealGrid 메뉴관리 (MNU944)
```

---

### 4. 옵션-컬럼 매핑 수정

**문제**: 화면 생성기가 잘못된 DB 컬럼명으로 쿼리 생성

**수정 파일**: `src/server/api/routers/screen-generator/procedures/preview.ts`

**수정 내용** (OPTION_TYPE_TO_COLUMN 매핑):
| 옵션 타입 | Before (잘못됨) | After (올바름) |
|----------|-----------------|----------------|
| BI_ACCOUNT | `acct_code` | `account_code` |
| BI_CUSTOMER | `cust_code` | `partner_code` |
| BI_DEPT | `dept_code` | `department_code` |
| BI_PRODUCT | `product_code` | `product_item_code` |

**추가된 매핑**:
- BI_COST_CENTER → `cost_center_mapping_code`
- BI_USER → `user_code`
- BI_EXPENSE → `expense_item_code`

---

## 📁 변경된 주요 파일

```
src/
├── components/
│   ├── Sidebar.tsx
│   └── options/index.tsx
├── server/api/routers/
│   ├── options.ts
│   └── screen-generator/procedures/preview.ts
└── app/settings/screen-generator-realgrid/_components/
    ├── SimpleModeRealGrid.tsx
    └── mocks/sandpackMocks.ts (신규)

scripts/
└── update_menu.sql (신규)
```

---

## 🔜 다음 작업 예정

1. **화면 생성기 템플릿 개선**
   - 검색 조건 ↔ 테이블 컬럼 자동 매핑 강화
   - 생성되는 query.sql 컬럼명 정확도 향상

2. **RealGrid 실제 데이터 연동 테스트**
   - 생성된 화면들 (sc000047, sc000048, sc000049) 실제 동작 검증

3. **공통 옵션 컴포넌트 추가**
   - bi_bom_mst 테이블 관련 컴포넌트 (복잡한 관계로 별도 설계 필요)

---

## 🐛 알려진 이슈

- 없음 (금일 발견된 이슈 모두 해결됨)

---

## 📊 프로젝트 상태

| 영역 | 상태 | 비고 |
|------|------|------|
| 화면 생성기 | ✅ 정상 | RealGrid + Simple Grid 지원 |
| 공통 옵션 | ✅ 정상 | 14개 컴포넌트 완료 |
| 메뉴 구조 | ✅ 정상 | 시스템 메뉴 하단 고정 |
| 옵션-컬럼 매핑 | ✅ 정상 | binary 스키마 실제 컬럼명 반영 |

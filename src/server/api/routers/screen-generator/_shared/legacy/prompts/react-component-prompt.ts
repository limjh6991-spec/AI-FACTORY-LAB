/**
 * React 컴포넌트 생성 프롬프트
 * Claude API에 전송하여 완전한 React + AG Grid 컴포넌트를 생성받음
 */

import { buildColumnStructureDescription } from './column-structure';

/**
 * 공통 옵션 컴포넌트 사용 가이드
 */
const OPTION_COMPONENT_GUIDE = `
## 🚨 중요: 공통 옵션 컴포넌트 사용 필수!

검색조건은 반드시 아래 공통 옵션 컴포넌트를 import해서 사용하세요:

\`\`\`tsx
import {
  CustomerSelect,    // 거래처 선택 (label: 거래처, 업체, 고객)
  MaterialSelect,    // 부품/자재 선택 (label: 부품, 자재, 품목)
  ModelSelect,       // 모델 선택 (label: 모델, 제품)
  AccountSelect,     // 계정 선택 (label: 계정, 계정과목)
  ExpenSelSelect,    // 비용구분 선택 (label: 비용구분, 비용, 경비)
  DepartmentSelect,  // 부서 선택 (label: 부서, 팀)
  SiteSelect,        // Site 선택 (label: Site, 사업장, 법인)
  SelCodeSelect,     // SEL_CODE 선택 (label: SEL_CODE, 구분)
  YearMonthPicker,   // 년월 선택 (label: 년월, 기준월, 월)
  YearPicker,        // 년도 선택 (label: 년도, 연도, 기준년)
} from "~/components/options";
\`\`\`

### 옵션 컴포넌트 사용 규칙:
1. **Site** → SiteSelect 사용
2. **년월, 기준월** → YearMonthPicker 사용  
3. **년도, 기준년** → YearPicker 사용
4. **거래처, 업체, 고객** → CustomerSelect 사용
5. **부품, 자재, 품목** → MaterialSelect 사용
6. **모델, 제품** → ModelSelect 사용
7. **계정, 계정과목** → AccountSelect 사용
8. **비용구분, 비용** → ExpenSelSelect 사용
9. **부서** → DepartmentSelect 사용
10. **SEL_CODE** → SelCodeSelect 사용

### 사용 예시:
\`\`\`tsx
// state 정의
const [site, setSite] = useState("HQ");
const [yearMonth, setYearMonth] = useState("");
const [customer, setCustomer] = useState("");

// 컴포넌트 사용
<SiteSelect value={site} onChange={setSite} label="Site" />
<YearMonthPicker value={yearMonth} onChange={setYearMonth} label="기준월" />
<CustomerSelect value={customer} onChange={setCustomer} site={site} label="거래처" />
\`\`\`

주의사항:
- 모든 옵션 컴포넌트는 inline 스타일(라벨 왼쪽) 기본 적용됨
- site prop이 있는 컴포넌트는 Site 연동 필터링 지원
- 직접 input/select 만들지 말고 공통 컴포넌트 사용!
`;

/**
 * React 컴포넌트 생성 프롬프트 작성
 * @param parsedData 엑셀에서 파싱된 데이터
 * @param sqlQuery 생성된 SQL 쿼리 (optional)
 * @returns 프롬프트 문자열
 */
export function buildReactComponentPrompt(parsedData: any, sqlQuery: string | null): string {
  const { screenName, screenNameEn, tableName, searchConditions, gridColumns } = parsedData;
  
  // 컬럼 정보 추출
  const columnStructure = buildColumnStructureDescription(gridColumns);
  
  return `다음 ERP 화면 정보를 기반으로 AG Grid를 사용하는 React 컴포넌트를 생성해주세요.

## 화면 정보
- 화면명: ${screenName}
- 화면명(영문): ${screenNameEn || screenName.replace(/\s/g, '')}
- 테이블명: ${tableName || "N/A"}

## 조회조건 (검색 필터)
${searchConditions?.map((sc: any) => `- ${sc.label} (${sc.type})${sc.required ? " [필수]" : ""}`).join("\n") || "없음"}

## 그리드 컬럼 구조
${columnStructure}

## 합계 행
${gridColumns.summaryRows?.join(", ") || "없음"}

${sqlQuery ? `## SQL 쿼리 참고
\`\`\`sql
${sqlQuery}
\`\`\`` : ""}

${OPTION_COMPONENT_GUIDE}

## 필수 요구사항

### 1. 기술 스택
- TypeScript + React 함수형 컴포넌트
- AG Grid Community (ag-grid-react, ag-grid-community)
- Tailwind CSS
- lucide-react 아이콘
- **공통 옵션 컴포넌트 (~/components/options)**

### 2. 필수 import 구문
\`\`\`tsx
'use client';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download } from 'lucide-react';
// 🚨 공통 옵션 컴포넌트 import 필수!
import {
  SiteSelect,
  YearMonthPicker,
  YearPicker,
  CustomerSelect,
  MaterialSelect,
  ModelSelect,
  AccountSelect,
  ExpenSelSelect,
  DepartmentSelect,
  SelCodeSelect,
} from "~/components/options";

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);
\`\`\`

### 3. 컬럼 정의 (ColGroupDef 사용)
- 그룹 헤더가 있으면 children으로 중첩
- 숫자 컬럼: type: 'numericColumn', cellStyle: { textAlign: 'right' }
- valueFormatter로 천단위 콤마 적용
- 합계 행 구분: getRowClass로 스타일 적용

### 4. 검색 필터 영역 (공통 옵션 컴포넌트 사용!)
- **직접 input/select 만들지 말고 공통 옵션 컴포넌트 사용!**
- 조회조건 라벨에 맞는 컴포넌트 선택
- 예시:
\`\`\`tsx
<div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
  <SiteSelect value={site} onChange={setSite} label="Site" />
  <YearMonthPicker value={yearMonth} onChange={setYearMonth} label="기준월" />
  <CustomerSelect value={customer} onChange={setCustomer} site={site} label="거래처" />
  
  {/* 버튼 영역 */}
  <div className="flex gap-2 ml-auto">
    <button className="inline-flex items-center h-9 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
      <Search className="w-4 h-4 mr-2" />
      조회
    </button>
    <button onClick={handleReset} className="inline-flex items-center h-9 px-4 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600">
      <RotateCcw className="w-4 h-4 mr-2" />
      초기화
    </button>
  </div>
</div>
\`\`\`

### 5. AG Grid 설정
\`\`\`tsx
<div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
  <AgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    defaultColDef={defaultColDef}
    animateRows={true}
    rowHeight={40}
    headerHeight={40}
    groupHeaderHeight={40}
    getRowClass={getRowClass}
  />
</div>
\`\`\`

### 6. 샘플 데이터
- 합계 행 1개 + 일반 데이터 3-5행 포함
- 실제 데이터 형식과 유사하게

### 7. 커스텀 AG Grid 스타일 (style jsx global)
\`\`\`css
.ag-theme-alpine {
  --ag-header-background-color: #e0e0e0;
  --ag-header-foreground-color: #161616;
  --ag-row-hover-color: #e8e8e8;
  --ag-border-color: #e0e0e0;
  --ag-font-size: 13px;
}
.ag-theme-alpine .ag-header-group-cell {
  background-color: #d0d0d0;
  font-weight: 600;
}
.ag-row-total {
  background-color: #f4f4f4 !important;
  font-weight: 600;
}
\`\`\`

## 출력 형식
- 완전한 React 컴포넌트 코드만 출력
- 설명 없이 코드만
- export default 포함
- **검색조건은 반드시 공통 옵션 컴포넌트 사용!**

React 컴포넌트 코드:`;
}

# React 컴포넌트 자동 생성

> 작성일: 2025-12-06

## 개요

화면 생성기에서 Excel 정의를 기반으로 AG Grid를 활용한 React 컴포넌트를 자동 생성하는 기능입니다.

## AG Grid 선택 이유

기존 RealGrid에서 AG Grid로 전환한 이유:
- 오픈소스 커뮤니티 버전 무료 사용 가능
- React 생태계와의 높은 호환성
- 풍부한 문서와 예제
- TypeScript 지원
- IBM Carbon Design System과의 스타일 통합 용이

참고: `/docs/AG_GRID_DECISION.md`

## 프롬프트 구조

### buildReactComponentPrompt 함수

`/src/server/api/routers/screenGenerator.ts`에 정의된 프롬프트 빌더 함수입니다.

```typescript
function buildReactComponentPrompt(
  screenName: string,
  tableName: string,
  columns: ParsedColumn[],
  existingHtml: string | null,
  existingSql: string | null
): string
```

### 프롬프트 내용

1. **역할 정의**: 엔터프라이즈급 React/TypeScript 전문가
2. **기술 스택 명시**:
   - React 18 + TypeScript
   - AG Grid Community
   - IBM Carbon Design System (색상, 폰트)
3. **화면 정보 전달**: 화면명, 테이블명, 컬럼 정의
4. **출력 요구사항**:
   - 단일 파일 컴포넌트
   - 타입 정의 포함
   - 검색 패널, 그리드, 상세 모달
   - Carbon 스타일 적용
   - 한글 주석

## 생성되는 컴포넌트 구조

```tsx
"use client";

import { useState, useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// 타입 정의
interface MaterialRecord {
  PLANT_CODE: string;
  MATERIAL_CODE: string;
  MATERIAL_NAME: string;
  // ...
}

// 검색 조건 타입
interface SearchParams {
  plantCode: string;
  materialCode: string;
  dateFrom: string;
  dateTo: string;
}

// 컴포넌트
export default function MaterialReportScreen() {
  // 상태 관리
  const [rowData, setRowData] = useState<MaterialRecord[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({...});
  const [loading, setLoading] = useState(false);
  
  // 그리드 ref
  const gridRef = useRef<AgGridReact>(null);
  
  // 컬럼 정의
  const columnDefs = useMemo<ColDef[]>(() => [
    { field: 'PLANT_CODE', headerName: '사업장코드', width: 100 },
    { field: 'MATERIAL_CODE', headerName: '자재코드', width: 120 },
    // ...
  ], []);
  
  // 검색 핸들러
  const handleSearch = useCallback(async () => {
    setLoading(true);
    // API 호출
    setLoading(false);
  }, [searchParams]);
  
  return (
    <div className="screen-container">
      {/* 검색 패널 */}
      <div className="search-panel">...</div>
      
      {/* AG Grid */}
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{...}}
        />
      </div>
      
      {/* 상세 모달 */}
      <DetailModal />
    </div>
  );
}
```

## 스타일 가이드

### IBM Carbon 색상
```css
/* Primary Colors */
--cds-interactive: #0f62fe;
--cds-background: #ffffff;
--cds-border-strong: #8d8d8d;

/* Gray Scale */
--cds-text-primary: #161616;
--cds-text-secondary: #525252;
--cds-layer: #f4f4f4;
```

### AG Grid 테마 커스터마이징
```css
.ag-theme-alpine {
  --ag-header-background-color: #f4f4f4;
  --ag-odd-row-background-color: #fafafa;
  --ag-row-hover-color: #e8e8e8;
  --ag-selected-row-background-color: #d0e2ff;
}
```

## API

### generateReactComponent

**경로**: `screenGenerator.generateReactComponent`

**입력**:
```typescript
{
  screenId: string;  // 임시화면 ID 또는 발행된 화면 ID
}
```

**처리 과정**:
1. `parsedData.json`에서 컬럼 정의 로드
2. `preview.html`, `query.sql` 참조용 로드
3. Claude API로 프롬프트 전송
4. 생성된 React 코드 반환 + 파일 저장

**응답**:
```typescript
{
  success: boolean;
  code: string;        // 생성된 React 컴포넌트 코드
  screenId: string;
  message: string;
}
```

## 사용 방법

1. **화면 생성기**에서 Excel 업로드 및 검증
2. **미리보기** 탭에서 HTML 확인
3. **React 탭** 선택 후 **"React 생성"** 버튼 클릭
4. Claude가 컴포넌트 코드 생성 (10-20초 소요)
5. 생성된 코드 복사 또는 확인
6. **임시저장** 시 `component.tsx` 파일로 저장됨

## 향후 개선 사항

- [ ] Sandpack을 활용한 실시간 React 렌더링
- [ ] 생성 코드 직접 편집 기능
- [ ] 컴포넌트 템플릿 커스터마이징
- [ ] API 연동 코드 자동 생성
- [ ] 복수 그리드 화면 지원

/**
 * React 컴포넌트 템플릿 생성
 * JSON 데이터를 기반으로 Sandpack 미리보기용 React 컴포넌트 생성
 */

/**
 * Sandpack용 인라인 옵션 컴포넌트 생성
 */
function generateInlineComponent(sf: any): string {
  const label = sf.label || '검색';
  const type = sf.type?.toLowerCase() || 'text';
  
  // 년월 선택
  if (type === 'yearmonth' || label.includes('년월') || label.includes('기간')) {
    return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <input 
              type="month"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 140 }}
              defaultValue="${new Date().toISOString().slice(0, 7)}"
            />
          </div>`;
  }
  
  // 년도 선택
  if (type === 'year' || (label.includes('년') && !label.includes('월'))) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 100 }}>
              ${years.map(y => `<option value="${y}">${y}년</option>`).join('\n              ')}
            </select>
          </div>`;
  }
  
  // 자재/품목 선택
  if (type === 'material' || label.includes('자재') || label.includes('품목') || label.includes('품번')) {
    return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 150 }}>
              <option value="">전체</option>
              <option value="MAT001">원자재A</option>
              <option value="MAT002">원자재B</option>
              <option value="MAT003">부품C</option>
            </select>
          </div>`;
  }
  
  // 거래처 선택
  if (type === 'customer' || label.includes('거래처') || label.includes('고객')) {
    return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 150 }}>
              <option value="">전체</option>
              <option value="CUST001">거래처A</option>
              <option value="CUST002">거래처B</option>
            </select>
          </div>`;
  }
  
  // 부서 선택
  if (type === 'department' || label.includes('부서') || label.includes('팀')) {
    return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}>
              <option value="">전체</option>
              <option value="DEPT001">영업부</option>
              <option value="DEPT002">생산부</option>
              <option value="DEPT003">관리부</option>
            </select>
          </div>`;
  }
  
  // 기본 텍스트 입력
  return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${label}</label>
            <input 
              type="text"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}
              placeholder="${label}"
            />
          </div>`;
}

/**
 * JSON 데이터를 기반으로 React 컴포넌트 생성 (Sandpack 미리보기용)
 * Note: Sandpack에서는 로컬 import가 안되므로 인라인 컴포넌트 사용
 */
export function generateReactFromTemplate(parsedData: any, gridData: any): string {
  const screenName = gridData.screenName || parsedData.screenName || "GeneratedScreen";
  const componentName = screenName.replace(/[^a-zA-Z가-힣0-9]/g, '') || "GeneratedScreen";
  
  // columnDefs를 문자열로 변환
  const columnDefsStr = JSON.stringify(gridData.columnDefs || [], null, 2)
    .replace(/"type":\s*"numericColumn"/g, '"type": "numericColumn", "cellStyle": { "textAlign": "right" }');
  
  // sampleData를 문자열로 변환
  const sampleDataStr = JSON.stringify(gridData.sampleData || [], null, 2);
  
  // summaryData를 문자열로 변환
  const summaryDataStr = gridData.summaryData ? JSON.stringify([gridData.summaryData], null, 2) : "[]";
  
  // searchFields 처리
  const searchFields = gridData.searchFields || [];
  const searchFieldsJsx = searchFields.length > 0 
    ? searchFields.map((sf: any) => generateInlineComponent(sf)).join('')
    : `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>기간</label>
            <input 
              type="month"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 140 }}
              defaultValue="${new Date().toISOString().slice(0, 7)}"
            />
          </div>`;
  
  return `import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export default function ${componentName}() {
  const columnDefs = ${columnDefsStr};

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };

  const sampleData = ${sampleDataStr};
  const summaryData = ${summaryDataStr};

  const [rowData, setRowData] = useState(sampleData);

  const handleSearch = () => {
    console.log('검색 실행');
  };

  const handleReset = () => {
    setRowData(sampleData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      {/* 제목 */}
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#161616', flexShrink: 0 }}>
        ${screenName}
      </h1>

      {/* 조회조건 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: 16, 
        marginBottom: 12, 
        padding: 12, 
        backgroundColor: '#f4f4f4', 
        flexShrink: 0, 
        border: '1px solid #e0e0e0' 
      }}>
        ${searchFieldsJsx}
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button 
            onClick={handleSearch}
            style={{ 
              height: 32, 
              padding: '0 16px', 
              backgroundColor: '#0f62fe', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            검색
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              height: 32, 
              padding: '0 16px', 
              backgroundColor: '#e0e0e0', 
              color: '#161616', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            초기화
          </button>
        </div>
      </div>

      {/* AG Grid - 고정 높이 500px */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: 500, minHeight: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pinnedBottomRowData={summaryData.length > 0 ? summaryData : undefined}
        />
      </div>
    </div>
  );
}
`;
}

/**
 * JSON 파싱 실패 시 기본 그리드 데이터 생성
 */
export function createDefaultGridData(parsedData: any): any {
  const { screenName, gridColumns, searchConditions } = parsedData;
  
  // row3에서 컬럼 헤더 추출
  const headers = gridColumns?.row3 || [];
  const columnDefs = headers
    .filter((h: string) => h && typeof h === 'string' && h.trim())
    .map((header: string, index: number) => {
      const name = header.trim();
      const field = `col${index}`;
      const isNumeric = name.includes('금액') || name.includes('수량') || name.includes('단가') || name.includes('합계');
      
      return {
        headerName: name,
        field: field,
        width: isNumeric ? 120 : 100,
        ...(isNumeric ? { type: 'numericColumn' } : {})
      };
    });
  
  // 샘플 데이터 생성
  const sampleRow: any = {};
  columnDefs.forEach((col: any, i: number) => {
    const isNumeric = col.type === 'numericColumn';
    sampleRow[col.field] = isNumeric ? (i + 1) * 1000 : `샘플${i + 1}`;
  });
  
  // 검색 필드 생성
  const searchFields = (searchConditions || []).map((sc: any) => ({
    label: sc.label || '검색',
    field: sc.id || 'search',
    type: sc.type === 'select' ? 'select' : 'text'
  }));
  
  return {
    screenName: screenName || '화면',
    columnDefs: columnDefs.length > 0 ? columnDefs : [
      { headerName: '항목1', field: 'item1', width: 100 },
      { headerName: '항목2', field: 'item2', width: 100 },
      { headerName: '금액', field: 'amount', width: 120, type: 'numericColumn' }
    ],
    sampleData: columnDefs.length > 0 ? [sampleRow, sampleRow, sampleRow] : [
      { item1: '데이터1', item2: 'A', amount: 1000 },
      { item1: '데이터2', item2: 'B', amount: 2000 },
      { item1: '데이터3', item2: 'C', amount: 3000 }
    ],
    summaryData: null,
    searchFields: searchFields.length > 0 ? searchFields : [
      { label: '검색어', field: 'search', type: 'text' }
    ]
  };
}

/**
 * HTML 템플릿 생성
 * JSON 데이터를 기반으로 순수 HTML + AG Grid 미리보기 생성
 */

import { AG_GRID_CSS } from './ag-grid-styles';

/**
 * JSON 데이터를 기반으로 HTML 미리보기 생성
 */
export function generateHtmlFromTemplate(parsedData: any, gridData: any): string {
  const screenName = gridData.screenName || parsedData.screenName || "화면";
  
  // columnDefs를 문자열로 변환
  const columnDefsStr = JSON.stringify(gridData.columnDefs || [], null, 2);
  
  // sampleData를 문자열로 변환
  const sampleDataStr = JSON.stringify(gridData.sampleData || [], null, 2);
  
  // summaryData
  const summaryDataStr = gridData.summaryData ? JSON.stringify([gridData.summaryData], null, 2) : "[]";

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${screenName}</title>
  <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-alpine.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif; background: #fff; }
    .container { padding: 16px; height: 100vh; display: flex; flex-direction: column; }
    h1 { font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #161616; }
    .search-area { display: flex; align-items: flex-end; gap: 16px; margin-bottom: 16px; padding: 16px; background: #f4f4f4; border: 1px solid #e0e0e0; }
    .search-field { display: flex; flex-direction: column; gap: 4px; }
    .search-field label { font-size: 12px; color: #525252; }
    .search-field input, .search-field select { height: 32px; padding: 0 8px; border: 1px solid #e0e0e0; min-width: 120px; }
    .btn-group { display: flex; gap: 8px; margin-left: auto; }
    .btn { height: 32px; padding: 0 16px; border: none; cursor: pointer; font-size: 14px; }
    .btn-primary { background: #0f62fe; color: white; }
    .btn-primary:hover { background: #0043ce; }
    .btn-secondary { background: #e0e0e0; color: #161616; }
    .btn-secondary:hover { background: #c6c6c6; }
    .grid-container { flex: 1; min-height: 400px; }
    
    /* AG Grid 커스텀 스타일 */
    ${AG_GRID_CSS}
  </style>
</head>
<body>
  <div class="container">
    <h1>${screenName}</h1>
    <div class="search-area">
      <div class="search-field">
        <label>기간</label>
        <input type="month" value="${new Date().toISOString().slice(0, 7)}">
      </div>
      <div class="search-field">
        <label>검색어</label>
        <input type="text" placeholder="검색어 입력">
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="handleSearch()">검색</button>
        <button class="btn btn-secondary" onclick="handleReset()">초기화</button>
      </div>
    </div>
    <div id="myGrid" class="ag-theme-alpine grid-container"></div>
  </div>
  <script>
    const columnDefs = ${columnDefsStr};
    const rowData = ${sampleDataStr};
    const pinnedBottomRowData = ${summaryDataStr};
    
    let gridApi;

    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      pinnedBottomRowData: pinnedBottomRowData.length > 0 ? pinnedBottomRowData : undefined,
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true
      },
      onGridReady: (params) => {
        gridApi = params.api;
      }
    };
    
    function handleSearch() {
      console.log('검색 실행');
      // 실제 검색 로직 구현
    }
    
    function handleReset() {
      console.log('초기화');
      if (gridApi) {
        gridApi.setRowData(rowData);
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      const gridDiv = document.querySelector('#myGrid');
      agGrid.createGrid(gridDiv, gridOptions);
    });
  </script>
</body>
</html>`;
}

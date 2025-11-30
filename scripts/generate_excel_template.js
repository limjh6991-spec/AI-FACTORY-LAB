/**
 * 화면 생성기 Excel 템플릿 파일 생성 스크립트
 * 
 * 실행 방법:
 *   cd /home/roarm_m3/ai-factory-lab
 *   node scripts/generate_excel_template.js
 * 
 * 출력:
 *   frontend/public/templates/screen-generator-template.xlsx
 */

const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

// 출력 경로
const OUTPUT_DIR = path.join(__dirname, '../frontend/public/templates');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'screen-generator-template.xlsx');

// 디렉토리 생성
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Created directory: ${OUTPUT_DIR}`);
}

// Excel 워크북 생성
const workbook = new ExcelJS.Workbook();
workbook.creator = 'AI Factory Lab';
workbook.created = new Date();
workbook.modified = new Date();

// ===== 공통 스타일 정의 =====
const headerStyle = {
  font: { bold: true, size: 11, color: { argb: 'FFFFFFFF' } },
  fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0078D4' } },
  alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
  border: {
    top: { style: 'thin', color: { argb: 'FF000000' } },
    left: { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    right: { style: 'thin', color: { argb: 'FF000000' } }
  }
};

const cellStyle = {
  alignment: { vertical: 'middle', horizontal: 'left', wrapText: true },
  border: {
    top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    right: { style: 'thin', color: { argb: 'FFD0D0D0' } }
  }
};

const requiredCellStyle = {
  ...cellStyle,
  fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF4E6' } }
};

const exampleCellStyle = {
  ...cellStyle,
  font: { italic: true, color: { argb: 'FF666666' } }
};

// ===== Sheet 1: 기본정보 (BasicInfo) =====
console.log('Creating Sheet 1: BasicInfo...');
const basicInfoSheet = workbook.addWorksheet('01_BasicInfo', {
  properties: { tabColor: { argb: 'FF0078D4' } },
  views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }]
});

// 헤더
basicInfoSheet.columns = [
  { key: 'key', width: 25 },
  { key: 'value', width: 50 },
  { key: 'description', width: 40 }
];

basicInfoSheet.addRow({
  key: 'Key',
  value: 'Value',
  description: 'Description'
});
basicInfoSheet.getRow(1).eachCell((cell) => {
  cell.style = headerStyle;
});

// 데이터 행
const basicInfoData = [
  { key: 'screenId', value: '', description: '화면 ID (영문/숫자, 필수)', required: true },
  { key: 'screenName', value: '', description: '화면명 (한글, 필수)', required: true },
  { key: 'category', value: '', description: '카테고리 (예: COST, SYSTEM, 필수)', required: true },
  { key: 'apiPath', value: '', description: 'API 경로 (예: /api/v1/cost/search, 필수)', required: true },
  { key: 'tableName', value: '', description: 'DB 테이블명 (Backend 생성용, 선택)', required: false },
  { key: 'hasSearch', value: 'true', description: '검색 기능 포함 여부 (true/false)', required: false },
  { key: 'hasExcelUpload', value: 'false', description: 'Excel 업로드 기능 포함 여부 (true/false)', required: false },
  { key: 'hasExcelDownload', value: 'true', description: 'Excel 다운로드 기능 포함 여부 (true/false)', required: false },
  { key: 'gridHeight', value: '600', description: 'Grid 높이 (px, 기본값: 600)', required: false },
  { key: 'useVirtualScroll', value: 'true', description: 'Virtual Scroll 사용 여부 (true/false)', required: false }
];

basicInfoData.forEach(row => {
  const addedRow = basicInfoSheet.addRow({
    key: row.key,
    value: row.value,
    description: row.description
  });
  
  addedRow.getCell('key').style = cellStyle;
  addedRow.getCell('value').style = row.required ? requiredCellStyle : cellStyle;
  addedRow.getCell('description').style = exampleCellStyle;
  
  // 필수 필드 데이터 검증 (드롭다운)
  if (row.key === 'hasSearch' || row.key === 'hasExcelUpload' || row.key === 'hasExcelDownload' || row.key === 'useVirtualScroll') {
    addedRow.getCell('value').dataValidation = {
      type: 'list',
      allowBlank: false,
      formulae: ['"true,false"'],
      showErrorMessage: true,
      errorTitle: '입력 오류',
      error: 'true 또는 false를 선택하세요.'
    };
  }
});

// ===== Sheet 2: 그리드 컬럼 (GridColumns) =====
console.log('Creating Sheet 2: GridColumns...');
const gridColumnsSheet = workbook.addWorksheet('02_GridColumns', {
  properties: { tabColor: { argb: 'FF10893E' } },
  views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }]
});

gridColumnsSheet.columns = [
  { key: 'fieldName', width: 20 },
  { key: 'header', width: 20 },
  { key: 'type', width: 15 },
  { key: 'width', width: 10 },
  { key: 'align', width: 12 },
  { key: 'editable', width: 12 },
  { key: 'format', width: 15 },
  { key: 'required', width: 12 },
  { key: 'excelMapping', width: 20 },
  { key: 'description', width: 30 }
];

gridColumnsSheet.addRow({
  fieldName: 'Field Name',
  header: 'Header',
  type: 'Type',
  width: 'Width',
  align: 'Align',
  editable: 'Editable',
  format: 'Format',
  required: 'Required',
  excelMapping: 'Excel Mapping Header',
  description: 'Description'
});
gridColumnsSheet.getRow(1).eachCell((cell) => {
  cell.style = headerStyle;
});

// 예제 데이터
const gridColumnExamples = [
  {
    fieldName: 'costId',
    header: '원가 ID',
    type: 'text',
    width: '100',
    align: 'center',
    editable: 'false',
    format: '',
    required: 'true',
    excelMapping: '원가코드',
    description: '고유 ID (필수)'
  },
  {
    fieldName: 'costName',
    header: '원가명',
    type: 'text',
    width: '200',
    align: 'left',
    editable: 'true',
    format: '',
    required: 'true',
    excelMapping: '원가명',
    description: '원가 이름'
  },
  {
    fieldName: 'amount',
    header: '금액',
    type: 'number',
    width: '120',
    align: 'right',
    editable: 'true',
    format: '#,##0',
    required: 'false',
    excelMapping: '금액',
    description: '천 단위 구분'
  },
  {
    fieldName: 'rate',
    header: '비율',
    type: 'number',
    width: '100',
    align: 'right',
    editable: 'true',
    format: '0.00%',
    required: 'false',
    excelMapping: '',
    description: '백분율'
  },
  {
    fieldName: 'date',
    header: '날짜',
    type: 'date',
    width: '120',
    align: 'center',
    editable: 'true',
    format: 'yyyy-MM-dd',
    required: 'false',
    excelMapping: '등록일',
    description: '날짜 형식'
  }
];

gridColumnExamples.forEach(row => {
  const addedRow = gridColumnsSheet.addRow(row);
  
  addedRow.eachCell((cell, colNumber) => {
    if (colNumber <= 9) {
      cell.style = [1, 2, 8].includes(colNumber) ? requiredCellStyle : cellStyle;
    } else {
      cell.style = exampleCellStyle;
    }
  });
  
  // Type 드롭다운
  addedRow.getCell('type').dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"text,number,date,boolean,dropdown"'],
    showErrorMessage: true,
    errorTitle: '입력 오류',
    error: 'text, number, date, boolean, dropdown 중 선택하세요.'
  };
  
  // Align 드롭다운
  addedRow.getCell('align').dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"left,center,right"'],
    showErrorMessage: true,
    errorTitle: '입력 오류',
    error: 'left, center, right 중 선택하세요.'
  };
  
  // Editable 드롭다운
  addedRow.getCell('editable').dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"true,false"'],
    showErrorMessage: true,
    errorTitle: '입력 오류',
    error: 'true 또는 false를 선택하세요.'
  };
  
  // Required 드롭다운
  addedRow.getCell('required').dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"true,false"'],
    showErrorMessage: true,
    errorTitle: '입력 오류',
    error: 'true 또는 false를 선택하세요.'
  };
});

// ===== Sheet 3: 검색조건 (SearchConditions) =====
console.log('Creating Sheet 3: SearchConditions...');
const searchConditionsSheet = workbook.addWorksheet('03_SearchConditions', {
  properties: { tabColor: { argb: 'FFFFC000' } },
  views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }]
});

searchConditionsSheet.columns = [
  { key: 'fieldId', width: 20 },
  { key: 'label', width: 20 },
  { key: 'type', width: 15 },
  { key: 'options', width: 30 },
  { key: 'defaultValue', width: 20 },
  { key: 'placeholder', width: 25 },
  { key: 'description', width: 30 }
];

searchConditionsSheet.addRow({
  fieldId: 'Field ID',
  label: 'Label',
  type: 'Type',
  options: 'Options',
  defaultValue: 'Default Value',
  placeholder: 'Placeholder',
  description: 'Description'
});
searchConditionsSheet.getRow(1).eachCell((cell) => {
  cell.style = headerStyle;
});

// 예제 데이터
const searchConditionExamples = [
  {
    fieldId: 'searchKeyword',
    label: '검색어',
    type: 'text',
    options: '',
    defaultValue: '',
    placeholder: '원가명 또는 ID 입력',
    description: '텍스트 입력 필드'
  },
  {
    fieldId: 'category',
    label: '카테고리',
    type: 'select',
    options: '전체,재료비,인건비,경비',
    defaultValue: '전체',
    placeholder: '',
    description: '옵션: 쉼표로 구분'
  },
  {
    fieldId: 'dateFrom',
    label: '시작일',
    type: 'date',
    options: '',
    defaultValue: '',
    placeholder: 'yyyy-MM-dd',
    description: '날짜 선택'
  },
  {
    fieldId: 'dateTo',
    label: '종료일',
    type: 'date',
    options: '',
    defaultValue: '',
    placeholder: 'yyyy-MM-dd',
    description: '날짜 선택'
  },
  {
    fieldId: 'amount',
    label: '금액',
    type: 'number',
    options: '',
    defaultValue: '0',
    placeholder: '금액 입력',
    description: '숫자 입력'
  }
];

searchConditionExamples.forEach(row => {
  const addedRow = searchConditionsSheet.addRow(row);
  
  addedRow.eachCell((cell, colNumber) => {
    if (colNumber <= 6) {
      cell.style = [1, 2, 3].includes(colNumber) ? requiredCellStyle : cellStyle;
    } else {
      cell.style = exampleCellStyle;
    }
  });
  
  // Type 드롭다운
  addedRow.getCell('type').dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"text,select,date,number,daterange"'],
    showErrorMessage: true,
    errorTitle: '입력 오류',
    error: 'text, select, date, number, daterange 중 선택하세요.'
  };
});

// ===== Sheet 4: 버튼정의 (ButtonDefinitions) =====
console.log('Creating Sheet 4: ButtonDefinitions...');
const buttonDefinitionsSheet = workbook.addWorksheet('04_ButtonDefinitions', {
  properties: { tabColor: { argb: 'FFC00000' } },
  views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }]
});

buttonDefinitionsSheet.columns = [
  { key: 'buttonId', width: 20 },
  { key: 'label', width: 20 },
  { key: 'type', width: 15 },
  { key: 'icon', width: 20 },
  { key: 'position', width: 15 },
  { key: 'apiEndpoint', width: 30 },
  { key: 'description', width: 30 }
];

buttonDefinitionsSheet.addRow({
  buttonId: 'Button ID',
  label: 'Label',
  type: 'Type',
  icon: 'Icon',
  position: 'Position',
  apiEndpoint: 'API Endpoint',
  description: 'Description'
});
buttonDefinitionsSheet.getRow(1).eachCell((cell) => {
  cell.style = headerStyle;
});

// 예제 데이터
const buttonExamples = [
  {
    buttonId: 'search',
    label: '조회',
    type: 'primary',
    icon: 'bi-search',
    position: 'top',
    apiEndpoint: '/api/v1/cost/search',
    description: '검색 실행'
  },
  {
    buttonId: 'add',
    label: '추가',
    type: 'success',
    icon: 'bi-plus-circle',
    position: 'top',
    apiEndpoint: '',
    description: '새 행 추가'
  },
  {
    buttonId: 'delete',
    label: '삭제',
    type: 'danger',
    icon: 'bi-trash',
    position: 'top',
    apiEndpoint: '/api/v1/cost/delete',
    description: '선택 행 삭제'
  },
  {
    buttonId: 'save',
    label: '저장',
    type: 'primary',
    icon: 'bi-save',
    position: 'top',
    apiEndpoint: '/api/v1/cost/save',
    description: '변경 사항 저장'
  },
  {
    buttonId: 'export',
    label: 'Excel 다운로드',
    type: 'secondary',
    icon: 'bi-download',
    position: 'top',
    apiEndpoint: '/api/v1/cost/export',
    description: 'Excel 파일 다운로드'
  }
];

buttonExamples.forEach(row => {
  const addedRow = buttonDefinitionsSheet.addRow(row);
  
  addedRow.eachCell((cell, colNumber) => {
    if (colNumber <= 6) {
      cell.style = [1, 2, 3, 5].includes(colNumber) ? requiredCellStyle : cellStyle;
    } else {
      cell.style = exampleCellStyle;
    }
  });
  
  // Type 드롭다운
  addedRow.getCell('type').dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"primary,secondary,success,danger,warning,info"'],
    showErrorMessage: true,
    errorTitle: '입력 오류',
    error: 'primary, secondary, success, danger, warning, info 중 선택하세요.'
  };
  
  // Position 드롭다운
  addedRow.getCell('position').dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"top,bottom,left,right"'],
    showErrorMessage: true,
    errorTitle: '입력 오류',
    error: 'top, bottom, left, right 중 선택하세요.'
  };
});

// ===== Sheet 5: API정의 (APIDefinitions) =====
console.log('Creating Sheet 5: APIDefinitions...');
const apiDefinitionsSheet = workbook.addWorksheet('05_APIDefinitions', {
  properties: { tabColor: { argb: 'FF7030A0' } },
  views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }]
});

apiDefinitionsSheet.columns = [
  { key: 'apiId', width: 20 },
  { key: 'method', width: 12 },
  { key: 'path', width: 30 },
  { key: 'requestParams', width: 30 },
  { key: 'responseField', width: 25 },
  { key: 'description', width: 35 }
];

apiDefinitionsSheet.addRow({
  apiId: 'API ID',
  method: 'Method',
  path: 'Path',
  requestParams: 'Request Params',
  responseField: 'Response Field',
  description: 'Description'
});
apiDefinitionsSheet.getRow(1).eachCell((cell) => {
  cell.style = headerStyle;
});

// 예제 데이터
const apiExamples = [
  {
    apiId: 'search',
    method: 'POST',
    path: '/api/v1/cost/search',
    requestParams: 'searchKeyword,category,dateFrom,dateTo',
    responseField: 'data.list',
    description: '검색 조건으로 데이터 조회'
  },
  {
    apiId: 'save',
    method: 'POST',
    path: '/api/v1/cost/save',
    requestParams: 'costId,costName,amount,date',
    responseField: 'data',
    description: '데이터 저장/수정'
  },
  {
    apiId: 'delete',
    method: 'DELETE',
    path: '/api/v1/cost/delete',
    requestParams: 'costIds',
    responseField: 'data.deletedCount',
    description: '선택된 데이터 삭제 (배열)'
  },
  {
    apiId: 'export',
    method: 'POST',
    path: '/api/v1/cost/export',
    requestParams: 'searchKeyword,category',
    responseField: 'blob',
    description: 'Excel 파일 다운로드'
  }
];

apiExamples.forEach(row => {
  const addedRow = apiDefinitionsSheet.addRow(row);
  
  addedRow.eachCell((cell, colNumber) => {
    if (colNumber <= 5) {
      cell.style = [1, 2, 3].includes(colNumber) ? requiredCellStyle : cellStyle;
    } else {
      cell.style = exampleCellStyle;
    }
  });
  
  // Method 드롭다운
  addedRow.getCell('method').dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"GET,POST,PUT,DELETE,PATCH"'],
    showErrorMessage: true,
    errorTitle: '입력 오류',
    error: 'GET, POST, PUT, DELETE, PATCH 중 선택하세요.'
  };
});

// ===== 파일 저장 =====
workbook.xlsx.writeFile(OUTPUT_FILE)
  .then(() => {
    console.log('\n✅ Excel 템플릿 파일 생성 완료!');
    console.log(`📁 파일 위치: ${OUTPUT_FILE}`);
    console.log('\n📋 생성된 시트:');
    console.log('   1. 01_BasicInfo (기본정보)');
    console.log('   2. 02_GridColumns (그리드 컬럼)');
    console.log('   3. 03_SearchConditions (검색 조건)');
    console.log('   4. 04_ButtonDefinitions (버튼 정의)');
    console.log('   5. 05_APIDefinitions (API 정의)');
    console.log('\n💡 사용 방법:');
    console.log('   1. 템플릿 파일을 다운로드하여 작성');
    console.log('   2. 화면생성기에서 업로드');
    console.log('   3. 자동으로 JSON Schema 변환 및 화면 생성');
  })
  .catch(err => {
    console.error('❌ 파일 생성 실패:', err);
    process.exit(1);
  });

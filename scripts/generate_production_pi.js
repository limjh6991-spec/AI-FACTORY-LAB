/**
 * 생산 실적 관리 화면 PI 생성
 * 복잡한 그리드를 사용하는 실전 화면 테스트용
 */

const ExcelJS = require('exceljs');
const path = require('path');

async function generateProductionResultPI() {
  const workbook = new ExcelJS.Workbook();
  
  // ====================================================================
  // Sheet 1: 01_BasicInfo (기본정보)
  // ====================================================================
  const basicSheet = workbook.addWorksheet('01_BasicInfo', {
    properties: { tabColor: { argb: '0078D4' } }
  });
  
  // 컬럼 설정
  basicSheet.columns = [
    { header: '항목명', key: 'field', width: 25 },
    { header: '값', key: 'value', width: 40 },
    { header: '설명', key: 'description', width: 50 }
  ];
  
  // 헤더 스타일
  basicSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
  basicSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0078D4' } };
  basicSheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  basicSheet.getRow(1).height = 25;
  
  // 데이터 입력
  const basicInfo = [
    ['화면ID', 'ProductionResult', '영문대문자 + 숫자 조합 (필수)'],
    ['화면명(한글)', '생산 실적 관리', '화면 타이틀 (필수)'],
    ['화면명(영문)', 'Production Result Management', '영문 화면명'],
    ['카테고리', 'production', '라우터 경로의 카테고리 (필수)'],
    ['테이블명', 'new_doi_prd_result', 'DB 테이블명 (필수)'],
    ['설명', '생산 라인별 생산 실적을 조회하고 관리하는 화면입니다. Excel 업로드/다운로드 기능 포함', '화면 상세 설명'],
    ['작성자', 'AI Factory Lab', '담당자 이름'],
    ['작성일', '2025-11-30', '작성 날짜'],
    ['페이징 사용', 'Y', 'Y/N (기본값: Y)'],
    ['페이지 크기', '20', '한 페이지당 표시 건수'],
    ['Excel 업로드', 'Y', 'Y/N - Excel 일괄 업로드 기능'],
    ['Excel 다운로드', 'Y', 'Y/N - Excel 다운로드 버튼 표시'],
    ['행 추가 가능', 'Y', 'Y/N - 그리드에서 행 추가 가능'],
    ['행 삭제 가능', 'Y', 'Y/N - 그리드에서 행 삭제 가능'],
    ['집계 기능', 'Y', 'Y/N - 수량 합계 등 집계 표시']
  ];
  
  basicInfo.forEach(row => {
    const addedRow = basicSheet.addRow(row);
    // 필수 항목 강조
    if (row[2] && row[2].includes('(필수)')) {
      addedRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF4E6' } };
    }
  });
  
  // ====================================================================
  // Sheet 2: 02_GridColumns (그리드 컬럼)
  // ====================================================================
  const gridSheet = workbook.addWorksheet('02_GridColumns', {
    properties: { tabColor: { argb: '28A745' } }
  });
  
  gridSheet.columns = [
    { header: 'Field Name', key: 'fieldName', width: 18 },
    { header: 'Header Text', key: 'headerText', width: 18 },
    { header: 'Type', key: 'type', width: 12 },
    { header: 'Width', key: 'width', width: 10 },
    { header: 'Align', key: 'align', width: 10 },
    { header: 'Required', key: 'required', width: 10 },
    { header: 'Editable', key: 'editable', width: 10 },
    { header: 'Format', key: 'format', width: 15 },
    { header: 'Validation', key: 'validation', width: 15 },
    { header: 'Default Value', key: 'defaultValue', width: 15 },
    { header: 'Excel Mapping Header', key: 'excelMapping', width: 20 },
    { header: 'Description', key: 'description', width: 25 }
  ];
  
  // 헤더 스타일
  gridSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
  gridSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '28A745' } };
  gridSheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  gridSheet.getRow(1).height = 25;
  
  // 그리드 컬럼 데이터 (31개 컬럼 - 복잡한 그리드)
  const gridColumns = [
    // 기본 정보
    ['resultId', '실적ID', 'string', 120, 'center', 'Y', 'N', '', '', '', '실적ID', 'PK, 자동생성'],
    ['prdDate', '생산일자', 'date', 110, 'center', 'Y', 'Y', 'YYYY-MM-DD', '', '', '생산일자', '생산 작업 일자'],
    ['factoryCd', '공장코드', 'string', 90, 'center', 'Y', 'Y', '', '', '', '공장코드', 'F001, F002 등'],
    ['lineCd', '라인코드', 'string', 90, 'center', 'Y', 'Y', '', '', '', '라인코드', 'L01, L02, L03 등'],
    ['shiftCd', '근무조', 'string', 70, 'center', 'N', 'Y', '', '', '', '근무조', 'A/B/C 조'],
    
    // 제품 정보
    ['itemCd', '품목코드', 'string', 110, 'center', 'Y', 'Y', '', '', '', '품목코드', '품목 코드'],
    ['itemNm', '품목명', 'string', 180, 'left', 'Y', 'Y', '', '', '', '품목명', '품목 이름'],
    ['spec', '규격', 'string', 150, 'left', 'N', 'Y', '', '', '', '규격', '제품 규격'],
    ['unit', '단위', 'string', 60, 'center', 'N', 'Y', '', '', '', '단위', 'EA, M, KG 등'],
    
    // 실적 수량 (집계 대상)
    ['planQty', '계획수량', 'number', 100, 'right', 'Y', 'Y', '#,##0', 'min:0', '0', '계획수량', '생산 계획 수량'],
    ['prodQty', '생산수량', 'number', 100, 'right', 'Y', 'Y', '#,##0', 'min:0', '0', '생산수량', '실제 생산 수량'],
    ['goodQty', '양품수량', 'number', 100, 'right', 'Y', 'Y', '#,##0', 'min:0', '0', '양품수량', '정상 제품 수량'],
    ['defectQty', '불량수량', 'number', 100, 'right', 'N', 'Y', '#,##0', 'min:0', '0', '불량수량', '불량 수량'],
    
    // 불량 상세
    ['defectType', '불량유형', 'string', 100, 'center', 'N', 'Y', '', '', '', '불량유형', '치수/외관/기능불량'],
    ['defectReason', '불량사유', 'string', 150, 'left', 'N', 'Y', '', '', '', '불량사유', '불량 발생 원인'],
    
    // 작업 시간
    ['startTime', '시작시간', 'datetime', 150, 'center', 'N', 'Y', 'YYYY-MM-DD HH:mm', '', '', '시작시간', '작업 시작 시간'],
    ['endTime', '종료시간', 'datetime', 150, 'center', 'N', 'Y', 'YYYY-MM-DD HH:mm', '', '', '종료시간', '작업 종료 시간'],
    ['workTime', '작업시간(분)', 'number', 110, 'right', 'N', 'Y', '#,##0', 'min:0', '0', '작업시간(분)', '작업 소요 시간'],
    ['stopTime', '정지시간(분)', 'number', 110, 'right', 'N', 'Y', '#,##0', 'min:0', '0', '정지시간(분)', '설비 정지 시간'],
    
    // 작업자 정보
    ['workerId', '작업자ID', 'string', 90, 'center', 'N', 'Y', '', '', '', '작업자ID', '작업자 코드'],
    ['workerNm', '작업자명', 'string', 100, 'left', 'N', 'Y', '', '', '', '작업자명', '작업자 이름'],
    ['teamCd', '팀코드', 'string', 80, 'center', 'N', 'Y', '', '', '', '팀코드', '소속 팀'],
    
    // 품질 정보
    ['inspectYn', '검사여부', 'string', 80, 'center', 'N', 'Y', '', '', 'N', '검사여부', 'Y/N'],
    ['inspectResult', '검사결과', 'string', 90, 'center', 'N', 'Y', '', '', '', '검사결과', 'PASS/FAIL'],
    ['inspectorId', '검사자ID', 'string', 90, 'center', 'N', 'Y', '', '', '', '검사자ID', '검사자 코드'],
    
    // 상태 및 비고
    ['remark', '비고', 'string', 200, 'left', 'N', 'Y', '', '', '', '비고', '추가 설명'],
    ['status', '상태', 'string', 80, 'center', 'Y', 'Y', '', '', 'TEMP', '상태', 'TEMP/CONFIRM'],
    ['confirmYn', '확정여부', 'string', 80, 'center', 'Y', 'N', '', '', 'N', '확정여부', 'Y/N'],
    
    // 시스템 정보
    ['regId', '등록자', 'string', 90, 'center', 'N', 'N', '', '', '', '', '등록자 ID'],
    ['regDt', '등록일시', 'datetime', 150, 'center', 'N', 'N', 'YYYY-MM-DD HH:mm', '', '', '', '등록 일시'],
    ['updId', '수정자', 'string', 90, 'center', 'N', 'N', '', '', '', '', '수정자 ID'],
    ['updDt', '수정일시', 'datetime', 150, 'center', 'N', 'N', 'YYYY-MM-DD HH:mm', '', '', '', '수정 일시']
  ];
  
  gridColumns.forEach(row => {
    const addedRow = gridSheet.addRow(row);
    // 필수 항목 강조
    if (row[5] === 'Y') {
      addedRow.getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF4E6' } };
    }
  });
  
  // Dropdown 설정
  const typeOptions = '"string,number,date,datetime,boolean"';
  const alignOptions = '"left,center,right"';
  const ynOptions = '"Y,N"';
  
  for (let i = 2; i <= gridColumns.length + 1; i++) {
    gridSheet.getCell(`C${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [typeOptions]
    };
    gridSheet.getCell(`E${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [alignOptions]
    };
    gridSheet.getCell(`F${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [ynOptions]
    };
    gridSheet.getCell(`G${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [ynOptions]
    };
  }
  
  // ====================================================================
  // Sheet 3: 03_SearchConditions (검색조건)
  // ====================================================================
  const searchSheet = workbook.addWorksheet('03_SearchConditions', {
    properties: { tabColor: { argb: 'FFC107' } }
  });
  
  searchSheet.columns = [
    { header: 'Field Name', key: 'fieldName', width: 18 },
    { header: 'Label', key: 'label', width: 18 },
    { header: 'Type', key: 'type', width: 15 },
    { header: 'Required', key: 'required', width: 10 },
    { header: 'Default Value', key: 'defaultValue', width: 18 },
    { header: 'Options', key: 'options', width: 30 },
    { header: 'Description', key: 'description', width: 25 }
  ];
  
  // 헤더 스타일
  searchSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
  searchSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC107' } };
  searchSheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  searchSheet.getRow(1).height = 25;
  
  // 검색 조건 데이터
  const searchConditions = [
    ['prdDateFrom', '생산일자(시작)', 'date', 'N', '', '', '생산 시작 일자'],
    ['prdDateTo', '생산일자(종료)', 'date', 'N', '', '', '생산 종료 일자'],
    ['factoryCd', '공장', 'select', 'N', '', 'F001:본사공장,F002:2공장', '공장 선택'],
    ['lineCd', '라인', 'select', 'N', '', 'L01:1호기,L02:2호기,L03:3호기', '라인 선택'],
    ['shiftCd', '근무조', 'select', 'N', '', 'A:A조,B:B조,C:C조', '근무조 선택'],
    ['itemCd', '품목코드', 'text', 'N', '', '', '품목 코드 검색'],
    ['itemNm', '품목명', 'text', 'N', '', '', '품목명으로 검색'],
    ['workerId', '작업자ID', 'text', 'N', '', '', '작업자 ID'],
    ['status', '상태', 'select', 'N', '', 'TEMP:임시저장,CONFIRM:확정', '실적 상태'],
    ['confirmYn', '확정여부', 'select', 'N', '', 'Y:확정,N:미확정', '확정 여부']
  ];
  
  searchConditions.forEach(row => {
    searchSheet.addRow(row);
  });
  
  // Type Dropdown
  const searchTypeOptions = '"text,number,date,select,checkbox"';
  for (let i = 2; i <= searchConditions.length + 1; i++) {
    searchSheet.getCell(`C${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [searchTypeOptions]
    };
    searchSheet.getCell(`D${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [ynOptions]
    };
  }
  
  // ====================================================================
  // Sheet 4: 04_ButtonDefinitions (버튼정의)
  // ====================================================================
  const buttonSheet = workbook.addWorksheet('04_ButtonDefinitions', {
    properties: { tabColor: { argb: 'DC3545' } }
  });
  
  buttonSheet.columns = [
    { header: 'Button ID', key: 'buttonId', width: 18 },
    { header: 'Label', key: 'label', width: 18 },
    { header: 'Icon', key: 'icon', width: 20 },
    { header: 'Position', key: 'position', width: 12 },
    { header: 'Style', key: 'style', width: 12 },
    { header: 'Action', key: 'action', width: 15 },
    { header: 'Confirm Message', key: 'confirm', width: 30 },
    { header: 'Description', key: 'description', width: 25 }
  ];
  
  // 헤더 스타일
  buttonSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
  buttonSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DC3545' } };
  buttonSheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  buttonSheet.getRow(1).height = 25;
  
  // 버튼 데이터
  const buttons = [
    ['btnSearch', '조회', 'bi-search', 'search', 'primary', 'search', '', '검색 조건으로 데이터 조회'],
    ['btnReset', '초기화', 'bi-arrow-clockwise', 'search', 'secondary', 'reset', '', '검색 조건 초기화'],
    ['btnAdd', '행 추가', 'bi-plus-circle', 'grid', 'success', 'addRow', '', '그리드에 새 행 추가'],
    ['btnDelete', '행 삭제', 'bi-trash', 'grid', 'danger', 'deleteRow', '선택한 행을 삭제하시겠습니까?', '선택한 행 삭제'],
    ['btnSave', '저장', 'bi-save', 'grid', 'primary', 'save', '변경사항을 저장하시겠습니까?', '데이터 저장'],
    ['btnConfirm', '확정', 'bi-check-circle', 'grid', 'info', 'confirm', '선택한 실적을 확정하시겠습니까?', '실적 확정 처리'],
    ['btnExcelUpload', 'Excel 업로드', 'bi-upload', 'grid', 'warning', 'excelUpload', '', 'Excel 파일로 일괄 등록'],
    ['btnExcelDownload', 'Excel 다운로드', 'bi-download', 'grid', 'success', 'excelDownload', '', '조회된 데이터 Excel 다운로드']
  ];
  
  buttons.forEach(row => {
    buttonSheet.addRow(row);
  });
  
  // Position, Style Dropdown
  const positionOptions = '"search,grid,both"';
  const styleOptions = '"primary,secondary,success,danger,warning,info,light,dark"';
  
  for (let i = 2; i <= buttons.length + 1; i++) {
    buttonSheet.getCell(`D${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [positionOptions]
    };
    buttonSheet.getCell(`E${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [styleOptions]
    };
  }
  
  // ====================================================================
  // Sheet 5: 05_APIDefinitions (API정의)
  // ====================================================================
  const apiSheet = workbook.addWorksheet('05_APIDefinitions', {
    properties: { tabColor: { argb: '6F42C1' } }
  });
  
  apiSheet.columns = [
    { header: 'API Name', key: 'name', width: 18 },
    { header: 'HTTP Method', key: 'method', width: 12 },
    { header: 'Endpoint', key: 'endpoint', width: 35 },
    { header: 'Description', key: 'description', width: 30 }
  ];
  
  // 헤더 스타일
  apiSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
  apiSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '6F42C1' } };
  apiSheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  apiSheet.getRow(1).height = 25;
  
  // API 데이터
  const apis = [
    ['list', 'POST', '/api/production/result/list', '생산 실적 목록 조회 (페이징, 검색 조건 포함)'],
    ['detail', 'GET', '/api/production/result/{resultId}', '생산 실적 상세 조회'],
    ['create', 'POST', '/api/production/result', '생산 실적 신규 등록'],
    ['update', 'PUT', '/api/production/result', '생산 실적 수정'],
    ['delete', 'DELETE', '/api/production/result', '생산 실적 삭제 (복수 건 가능)'],
    ['confirm', 'POST', '/api/production/result/confirm', '생산 실적 확정 처리'],
    ['excelUpload', 'POST', '/api/production/result/excel/upload', 'Excel 파일 업로드하여 일괄 등록'],
    ['excelDownload', 'POST', '/api/production/result/excel/download', '조회 결과 Excel 다운로드'],
    ['summary', 'POST', '/api/production/result/summary', '기간별/공장별 집계 데이터 조회']
  ];
  
  apis.forEach(row => {
    apiSheet.addRow(row);
  });
  
  // Method Dropdown
  const methodOptions = '"GET,POST,PUT,DELETE,PATCH"';
  for (let i = 2; i <= apis.length + 1; i++) {
    apiSheet.getCell(`B${i}`).dataValidation = {
      type: 'list', allowBlank: false, formulae: [methodOptions]
    };
  }
  
  // ====================================================================
  // 파일 저장
  // ====================================================================
  const outputPath = path.join(__dirname, '../frontend/public/templates/ProductionResult_ScreenDefinition.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  
  console.log('✅ Excel PI 파일 생성 완료!');
  console.log(`📁 파일 위치: ${outputPath}`);
  console.log('\n📋 생성된 시트:');
  console.log('   1. 01_BasicInfo (기본정보) - 15개 항목');
  console.log('   2. 02_GridColumns (그리드 컬럼) - 33개 컬럼');
  console.log('   3. 03_SearchConditions (검색 조건) - 10개 조건');
  console.log('   4. 04_ButtonDefinitions (버튼 정의) - 8개 버튼');
  console.log('   5. 05_APIDefinitions (API 정의) - 9개 API');
  console.log('\n🎯 특징:');
  console.log('   - 복잡한 그리드 (33개 컬럼)');
  console.log('   - Excel 업로드/다운로드');
  console.log('   - 다양한 데이터 타입 (string, number, date, datetime)');
  console.log('   - 집계 기능 (수량 합계)');
  console.log('   - 상태 관리 (임시저장/확정)');
}

generateProductionResultPI().catch(console.error);

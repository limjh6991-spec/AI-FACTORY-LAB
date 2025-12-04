import XLSX from 'xlsx';

const excelPath = '/home/roarm_m3/dwisCOST/docs/원가시스템 폼.ver7.xlsx';

// 엑셀 파일 읽기
const workbook = XLSX.readFile(excelPath);

console.log('📊 엑셀 파일 정보\n');
console.log('시트 목록:');
workbook.SheetNames.forEach((name, idx) => {
  console.log(`  ${idx + 1}. ${name}`);
});

console.log('\n\n=== "3. 판매 실적 집계" 시트 미리보기 ===\n');

const targetSheet = workbook.Sheets['3. 판매 실적 집계'];
if (targetSheet) {
  // 시트를 JSON으로 변환 (헤더 포함)
  const jsonData = XLSX.utils.sheet_to_json(targetSheet, { 
    header: 1,  // 배열 형태로 반환
    defval: '',  // 빈 셀은 빈 문자열
    blankrows: false  // 빈 행 제외
  }) as any[];

  console.log(`총 ${jsonData.length}행\n`);
  
  // 처음 15행만 출력
  const preview = jsonData.slice(0, 15);
  preview.forEach((row: any, idx: number) => {
    const rowData = row.slice(0, 20);  // 처음 20개 컬럼만
    console.log(`행 ${idx + 1}:`, JSON.stringify(rowData));
  });

  console.log('\n\n=== 헤더 행 찾기 (구분, 코드 등 포함) ===\n');
  
  // "구분"이나 "코드"가 포함된 행 찾기
  const headerRowIndex = jsonData.findIndex((row: any) => {
    const rowStr = row.join('').toLowerCase();
    return rowStr.includes('구분') || rowStr.includes('코드');
  });

  if (headerRowIndex !== -1) {
    console.log(`헤더 행 번호: ${headerRowIndex + 1}`);
    console.log('헤더 내용:', jsonData[headerRowIndex]);
    
    console.log('\n\n=== 데이터 행 샘플 (3개) ===\n');
    const dataRows = jsonData.slice(headerRowIndex + 1, headerRowIndex + 4);
    dataRows.forEach((row: any, idx: number) => {
      console.log(`데이터 ${idx + 1}:`, row.slice(0, 10));
    });
  }
}


import * as XLSX from 'xlsx';
import * as path from 'path';

/**
 * 실전 테스트용 Excel 파일 3개 생성
 */
function createSampleExcelFiles() {
  const outputDir = path.join(process.cwd(), 'data', 'sample_excel');
  
  console.log('📝 샘플 Excel 파일 생성 중...\n');
  
  // ========================================
  // 1. 단순 케이스: 부서별 월별 원가
  // ========================================
  const simpleData = [
    ['', '', '2024년 부서별 월별 원가 현황', '', ''],
    [],
    ['부서명', '월', '금액', '비율', '비고'],
    ['개발팀', '1월', 1000000, '15%', '정상'],
    ['영업팀', '1월', 800000, '12%', '정상'],
    ['관리팀', '1월', 500000, '8%', ''],
    ['개발팀', '2월', 1200000, '18%', '인건비 증가'],
    ['영업팀', '2월', 850000, '13%', '정상'],
    ['관리팀', '2월', 520000, '8%', ''],
    ['개발팀', '3월', 1100000, '16%', '정상'],
    ['영업팀', '3월', 900000, '14%', '마케팅 비용'],
    ['관리팀', '3월', 500000, '8%', ''],
  ];
  
  const ws1 = XLSX.utils.aoa_to_sheet(simpleData);
  const wb1 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb1, ws1, '부서별원가');
  
  const file1 = path.join(outputDir, '부서별원가.xlsx');
  XLSX.writeFile(wb1, file1);
  console.log('✅ 생성 완료: 부서별원가.xlsx (단순 케이스)');
  
  // ========================================
  // 2. 병합 셀 케이스: 공정별 생산 실적
  // ========================================
  const mergedData = [
    ['2024년 1분기 공정별 생산 실적'],
    [''],
    ['공정명', '제품명', '1월', '2월', '3월', '합계'],
    ['조립', 'A제품', 100, 120, 110, 330],
    ['조립', 'B제품', 80, 90, 85, 255],
    ['도장', 'A제품', 95, 115, 105, 315],
    ['도장', 'B제품', 75, 85, 80, 240],
    ['검사', 'A제품', 98, 118, 108, 324],
    ['검사', 'B제품', 78, 88, 83, 249],
  ];
  
  const ws2 = XLSX.utils.aoa_to_sheet(mergedData);
  
  // 병합 셀 설정 (제목)
  ws2['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } } // A1:F1 병합
  ];
  
  const wb2 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb2, ws2, '공정별생산실적');
  
  const file2 = path.join(outputDir, '공정별생산실적.xlsx');
  XLSX.writeFile(wb2, file2);
  console.log('✅ 생성 완료: 공정별생산실적.xlsx (병합 셀 케이스)');
  
  // ========================================
  // 3. 복잡 케이스: 제품별 원가 분석
  // ========================================
  const complexData = [
    ['제품별 원가 분석 보고서'],
    ['작성일: 2024-03-31', '', '', '단위: 천원'],
    [],
    ['제품코드', '제품명', '자재비', '노무비', '경비', '합계', '비율'],
    ['P001', 'A제품', 500, 300, 200, 1000, '25%'],
    ['P002', 'B제품', 600, 350, 250, 1200, '30%'],
    ['P003', 'C제품', 400, 250, 150, 800, '20%'],
    ['P004', 'D제품', 450, 280, 180, 910, '22.5%'],
    ['', '합계', 1950, 1180, 780, 3910, '100%'],
    [],
    ['※ 비고'],
    ['- 자재비: 원자재 + 부자재'],
    ['- 노무비: 직접노무비 + 간접노무비'],
    ['- 경비: 제조경비 + 관리비'],
  ];
  
  const ws3 = XLSX.utils.aoa_to_sheet(complexData);
  
  // 병합 셀 설정
  ws3['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }, // 제목
    { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }, // 작성일
    { s: { r: 1, c: 3 }, e: { r: 1, c: 6 } }, // 단위
  ];
  
  const wb3 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb3, ws3, '제품별원가분석');
  
  const file3 = path.join(outputDir, '제품별원가분석.xlsx');
  XLSX.writeFile(wb3, file3);
  console.log('✅ 생성 완료: 제품별원가분석.xlsx (복잡 케이스)');
  
  console.log('\n' + '='.repeat(70));
  console.log('🎉 총 3개 샘플 Excel 파일 생성 완료!');
  console.log('📂 저장 위치:', outputDir);
  console.log('='.repeat(70));
}

createSampleExcelFiles();

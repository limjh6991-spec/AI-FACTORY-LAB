import 'dotenv/config';  // 환경 변수 로드
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { analyzeExcel, detectHeaderRow, inferDataTypes } from '../src/lib/gemini';

async function main() {
  console.log('🚀 Excel 분석 테스트 시작...\n');
  
  // API 키 확인
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY가 설정되지 않았습니다!');
    console.error('   .env 파일을 확인하세요.');
    process.exit(1);
  }
  console.log('✅ API 키 로드 성공:', process.env.GEMINI_API_KEY.substring(0, 20) + '...\n');
  
  console.log('=' .repeat(70));
  
  // 테스트 데이터 생성
  const testData = [
    ['', '', '2024년 부서별 월별 원가 현황', '', ''], // 제목 행
    [], // 빈 행
    ['부서명', '월', '금액', '비율', '비고'], // 실제 헤더
    ['개발팀', '1월', 1000000, '15%', '정상'],
    ['영업팀', '1월', 800000, '12%', '정상'],
    ['관리팀', '1월', 500000, '8%', ''],
    ['개발팀', '2월', 1200000, '18%', '인건비 증가'],
    ['영업팀', '2월', 850000, '13%', '정상'],
  ];
  
  console.log('📄 테스트 Excel 데이터:');
  testData.forEach((row, idx) => {
    console.log(`  Row ${idx + 1}: ${JSON.stringify(row)}`);
  });
  console.log('');
  
  // Step 1: 헤더 행 자동 인식
  console.log('🔍 Step 1: 헤더 행 자동 인식...');
  const headerRowIndex = await detectHeaderRow(testData.map(row => row.map(String)));
  console.log(`✅ 헤더 행 인식 완료: ${headerRowIndex}번째 행`);
  console.log(`   헤더: ${JSON.stringify(testData[headerRowIndex - 1])}\n`);
  
  // Step 2: 데이터 타입 추론
  console.log('🔍 Step 2: 데이터 타입 추론...');
  const headers = testData[headerRowIndex - 1] as string[];
  const sampleRows = testData.slice(headerRowIndex, headerRowIndex + 5).map(row => row.map(String));
  const dataTypes = await inferDataTypes(headers.map(String), sampleRows);
  console.log('✅ 데이터 타입 추론 완료:');
  dataTypes.forEach(dt => {
    console.log(`   - ${dt.column}: ${dt.type}${dt.format ? ` (${dt.format})` : ''}`);
  });
  console.log('');
  
  // Step 3: 전체 구조 분석
  console.log('🔍 Step 3: 전체 구조 종합 분석...');
  const structurePrompt = `
다음 Excel 데이터를 종합적으로 분석해주세요:

전체 데이터:
${testData.map((row, idx) => `Row ${idx + 1}: ${JSON.stringify(row)}`).join('\n')}

분석 요청:
1. 이 Excel의 주제/목적은?
2. 병합된 셀이 있는가? (1번째 행 분석)
3. 데이터 품질은? (빈 값, 오류 등)
4. 어떤 종류의 그리드/차트가 적합한가?

반드시 다음 JSON 형식으로만 답변하세요:
{
  "subject": "부서별 월별 원가 현황",
  "hasMergedCells": true,
  "totalRows": 8,
  "dataQuality": {
    "emptyRows": 1,
    "missingValues": 2,
    "quality": "good"
  },
  "recommendedVisualization": {
    "grid": true,
    "chartType": "bar",
    "reason": "부서별, 월별 비교에 적합"
  }
}
`;

  const structureAnalysis = await analyzeExcel(structurePrompt);
  console.log('✅ 구조 분석 완료:');
  
  // JSON 추출
  const jsonMatch = structureAnalysis.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const analysis = JSON.parse(jsonMatch[0]);
    console.log(`   주제: ${analysis.subject}`);
    console.log(`   병합 셀: ${analysis.hasMergedCells ? '있음' : '없음'}`);
    console.log(`   총 행 수: ${analysis.totalRows}`);
    console.log(`   데이터 품질: ${analysis.dataQuality.quality}`);
    console.log(`   권장 차트: ${analysis.recommendedVisualization.chartType}`);
    console.log(`   이유: ${analysis.recommendedVisualization.reason}`);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('🎉 모든 테스트 완료!\n');
  
  // 결과 요약
  console.log('📊 분석 요약:');
  console.log(`   ✅ 헤더 행: ${headerRowIndex}번째`);
  console.log(`   ✅ 컬럼 수: ${headers.length}`);
  console.log(`   ✅ 데이터 타입: ${dataTypes.length}개 추론 완료`);
  console.log(`   ✅ 구조 분석: 완료`);
  console.log('');
  
  console.log('💡 다음 단계:');
  console.log('   1. DB 메타데이터 수집 (scripts/collect_db_metadata.ts)');
  console.log('   2. Excel 컬럼 → DB 컬럼 매핑');
  console.log('   3. TanStack Table 그리드 코드 생성');
  console.log('   4. Next.js 페이지 자동 생성');
}

main().catch(console.error);

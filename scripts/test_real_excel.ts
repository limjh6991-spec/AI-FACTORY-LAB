import XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { analyzeExcel, detectHeaderRow, inferDataTypes } from '../src/lib/gemini';

async function testRealExcelFile(filename: string) {
  console.log('\n' + '='.repeat(70));
  console.log(`📂 테스트 파일: ${filename}`);
  console.log('='.repeat(70));
  
  const filePath = path.join(process.cwd(), 'data', 'sample_excel', filename);
  
  // Excel 파일 읽기
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error('시트를 찾을 수 없습니다');
  }
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error('워크시트를 찾을 수 없습니다');
  }
  
  // JSON으로 변환 (모든 행 포함)
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
    header: 1,
    defval: '',
    raw: false 
  }) as string[][];
  
  console.log(`\n📊 Excel 데이터 (처음 10행):`);
  jsonData.slice(0, 10).forEach((row, idx) => {
    console.log(`  Row ${idx + 1}: ${JSON.stringify(row)}`);
  });
  
  // Gemini 분석
  console.log('\n🔍 Gemini 분석 시작...');
  
  // 1. 헤더 행 인식
  const headerRowIndex = await detectHeaderRow(jsonData.slice(0, 10).map(row => row.map(String)));
  console.log(`✅ 헤더 행: ${headerRowIndex}번째`);
  console.log(`   헤더: ${JSON.stringify(jsonData[headerRowIndex - 1])}`);
  
  // 2. 데이터 타입 추론
  const headers = jsonData[headerRowIndex - 1] || [];
  const sampleRows = jsonData.slice(headerRowIndex, headerRowIndex + 5);
  const dataTypes = await inferDataTypes(
    headers.map(String), 
    sampleRows.map(row => row.map(String))
  );
  
  console.log(`\n✅ 데이터 타입 추론:`);
  dataTypes.forEach(dt => {
    console.log(`   - ${dt.column}: ${dt.type}${dt.format ? ` (${dt.format})` : ''}`);
  });
  
  // 3. 전체 분석 (DB 매핑 힌트 포함)
  const analysisPrompt = `
다음 Excel 파일을 분석하고 DB 매핑을 제안해주세요:

파일명: ${filename}
헤더 (${headerRowIndex}번째 행): ${JSON.stringify(headers)}
샘플 데이터 (5행):
${sampleRows.map((row, idx) => `Row ${idx + 1}: ${JSON.stringify(row)}`).join('\n')}

분석 요청:
1. 이 Excel의 주제는?
2. 각 컬럼이 DB에서 어떤 테이블/컬럼과 매칭될 가능성이 높은가?
   - 예: "부서명" → new_doi_sys_dept.dept_nm
   - 예: "금액" → new_doi_cost_*.cost_amt
3. 필요한 SQL 조인이 있는가?
4. 집계 함수가 필요한가? (SUM, AVG, COUNT 등)

반드시 다음 JSON 형식으로만 답변하세요:
{
  "subject": "Excel 주제",
  "mappings": [
    {
      "excelColumn": "부서명",
      "dbTable": "new_doi_sys_dept",
      "dbColumn": "dept_nm",
      "confidence": 0.95,
      "reason": "부서 정보 저장 테이블"
    }
  ],
  "joins": [
    {
      "table1": "new_doi_cost_monthly",
      "table2": "new_doi_sys_dept",
      "condition": "table1.dept_id = table2.dept_id"
    }
  ],
  "aggregations": [
    {
      "column": "금액",
      "function": "SUM",
      "groupBy": ["부서명", "월"]
    }
  ]
}
`;

  const detailedAnalysis = await analyzeExcel(analysisPrompt);
  console.log(`\n✅ 상세 분석 결과:`);
  
  // JSON 추출
  const jsonMatch = detailedAnalysis.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const analysis = JSON.parse(jsonMatch[0]);
    console.log(`   주제: ${analysis.subject}`);
    console.log(`\n   DB 매핑 제안:`);
    analysis.mappings?.forEach((m: any, idx: number) => {
      console.log(`     ${idx + 1}. ${m.excelColumn} → ${m.dbTable}.${m.dbColumn}`);
      console.log(`        확신도: ${m.confidence}, 이유: ${m.reason}`);
    });
    
    if (analysis.joins && analysis.joins.length > 0) {
      console.log(`\n   필요한 조인:`);
      analysis.joins.forEach((j: any, idx: number) => {
        console.log(`     ${idx + 1}. ${j.table1} ⟷ ${j.table2}`);
        console.log(`        조건: ${j.condition}`);
      });
    }
    
    if (analysis.aggregations && analysis.aggregations.length > 0) {
      console.log(`\n   집계 함수:`);
      analysis.aggregations.forEach((a: any, idx: number) => {
        console.log(`     ${idx + 1}. ${a.function}(${a.column}) GROUP BY ${a.groupBy.join(', ')}`);
      });
    }
  } else {
    console.log(detailedAnalysis);
  }
  
  return {
    filename,
    headerRowIndex,
    headers,
    dataTypes,
    rowCount: jsonData.length,
  };
}

async function main() {
  console.log('🚀 실제 Excel 파일 분석 테스트 시작!\n');
  
  const files = [
    '부서별원가.xlsx',
    '공정별생산실적.xlsx',
    '제품별원가분석.xlsx',
  ];
  
  const results = [];
  
  for (const file of files) {
    const result = await testRealExcelFile(file);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 2000)); // API 제한 방지
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('🎉 모든 Excel 파일 분석 완료!');
  console.log('='.repeat(70));
  
  console.log('\n📊 분석 요약:');
  results.forEach((r, idx) => {
    console.log(`\n${idx + 1}. ${r.filename}`);
    console.log(`   - 헤더 행: ${r.headerRowIndex}번째`);
    console.log(`   - 컬럼 수: ${r.headers.length}`);
    console.log(`   - 총 행 수: ${r.rowCount}`);
    console.log(`   - 데이터 타입: ${r.dataTypes.length}개 추론 완료`);
  });
  
  console.log('\n💡 다음 단계:');
  console.log('   ✅ A. 실제 Excel 파일 테스트 완료!');
  console.log('   ⏭️  B. DB 메타데이터 수집 및 매핑 테스트');
}

main().catch(console.error);

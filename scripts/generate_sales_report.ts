#!/usr/bin/env tsx
/**
 * 🎯 판매 실적 레포트 생성
 * 
 * 원가시스템 폼.ver7.xlsx 파일의 '3. 판매 실적 집계' 시트를 읽어서
 * Claude API로 레포트 디자인을 생성합니다.
 */

import Anthropic from '@anthropic-ai/sdk';
import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// ============================================================================
// 설정
// ============================================================================

const EXCEL_PATH = '/home/roarm_m3/dwisCOST/docs/원가시스템 폼.ver7.xlsx';
const SHEET_NAME = '3. 판매 실적 집계';
const OUTPUT_DIR = '/home/roarm_m3/ai-factory-lab/data';

// Claude API 설정
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY?.trim()
});

// ============================================================================
// Excel 시트 읽기
// ============================================================================

function readExcelSheet(filePath: string, sheetName: string): {
  headers: string[];
  data: Record<string, unknown>[];
  rawData: (string | number | null)[][];
} {
  console.log(`\n📂 Excel 파일 읽는 중: ${filePath}`);
  console.log(`📋 시트: ${sheetName}`);
  
  const workbook = XLSX.readFile(filePath);
  
  // 시트 목록 출력
  console.log(`\n📑 전체 시트 목록:`);
  workbook.SheetNames.forEach((name, i) => {
    console.log(`  ${i + 1}. ${name}`);
  });
  
  // 시트 찾기
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    // 유사한 시트명 찾기
    const similar = workbook.SheetNames.find(n => n.includes('판매') || n.includes('3.'));
    throw new Error(`시트 '${sheetName}'를 찾을 수 없습니다. 유사: ${similar || '없음'}`);
  }
  
  // 데이터 추출
  const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as (string | number | null)[][];
  const jsonData = XLSX.utils.sheet_to_json(sheet) as Record<string, unknown>[];
  
  // 헤더 추출 (첫 번째 비어있지 않은 행)
  let headers: string[] = [];
  for (const row of rawData) {
    const nonEmptyCells = row.filter(cell => cell !== null && cell !== undefined && cell !== '');
    if (nonEmptyCells.length >= 3) {
      headers = row.map(cell => String(cell || '').trim());
      break;
    }
  }
  
  console.log(`\n📊 데이터 정보:`);
  console.log(`  - 총 행 수: ${rawData.length}`);
  console.log(`  - 헤더: ${headers.filter(h => h).slice(0, 10).join(', ')}${headers.length > 10 ? '...' : ''}`);
  
  return { headers, data: jsonData, rawData };
}

// ============================================================================
// Claude API로 레포트 디자인 생성
// ============================================================================

async function generateReportDesign(
  sheetData: {
    headers: string[];
    data: Record<string, unknown>[];
    rawData: (string | number | null)[][];
  }
): Promise<string> {
  console.log('\n🤖 Claude API에 레포트 디자인 요청 중...');
  
  // 샘플 데이터 추출 (처음 20행)
  const sampleRows = sheetData.rawData.slice(0, 20);
  const sampleDataStr = sampleRows.map(row => row.join('\t')).join('\n');
  
  const prompt = `당신은 제조업 원가 시스템 전문가입니다. 
아래 Excel 시트 데이터를 분석하여 '판매 실적' 레포트 화면을 설계해주세요.

## Excel 시트 데이터 (판매 실적 집계)

### 헤더 정보
${sheetData.headers.filter(h => h).join(', ')}

### 샘플 데이터 (처음 20행)
\`\`\`
${sampleDataStr}
\`\`\`

## 요청 사항

1. **레포트 화면 설계**
   - 제목: 판매 실적 집계 레포트
   - 조회 조건 (검색 필터)
   - 그리드 컬럼 정의
   - 합계/소계 처리

2. **DB 테이블 매핑**
   - 사용할 테이블: doi_sale_*, doi_prod_*, doi_model_mast 등
   - 컬럼 매핑 제안

3. **JSON 형식 출력**
   아래 형식으로 레포트 디자인을 JSON으로 출력해주세요:

\`\`\`json
{
  "reportId": "SALE_RESULT_001",
  "reportName": "판매 실적 집계",
  "description": "월별/모델별 판매 실적 현황",
  "searchConditions": [
    { "field": "년월", "type": "month-picker", "required": true },
    { "field": "사이트", "type": "select", "options": ["HQ", "VN"] }
  ],
  "gridColumns": [
    { 
      "header": "컬럼명", 
      "field": "db_column", 
      "width": 100, 
      "align": "center",
      "dbMapping": { "table": "테이블명", "column": "컬럼명" }
    }
  ],
  "summary": {
    "type": "sum",
    "columns": ["금액컬럼1", "금액컬럼2"]
  },
  "sql": "SELECT ... FROM ... WHERE ..."
}
\`\`\`

Excel 데이터를 분석하여 적절한 레포트 디자인을 생성해주세요.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      { role: 'user', content: prompt }
    ]
  });

  const content = response.content[0];
  if (content && content.type === 'text') {
    return content.text;
  }
  
  throw new Error('Unexpected response type');
}

// ============================================================================
// 메인 함수
// ============================================================================

async function main(): Promise<void> {
  console.log('='.repeat(70));
  console.log('🎯 판매 실적 레포트 생성');
  console.log('='.repeat(70));
  
  try {
    // 1. Excel 시트 읽기
    const sheetData = readExcelSheet(EXCEL_PATH, SHEET_NAME);
    
    // 2. Claude API로 레포트 디자인 생성
    const reportDesign = await generateReportDesign(sheetData);
    
    // 3. 결과 출력
    console.log('\n' + '='.repeat(70));
    console.log('📋 Claude API 응답');
    console.log('='.repeat(70));
    console.log(reportDesign);
    
    // 4. JSON 추출 및 저장
    const jsonMatch = reportDesign.match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) {
      const jsonStr = jsonMatch[1].trim();
      try {
        const reportJson = JSON.parse(jsonStr);
        
        const outputPath = path.join(OUTPUT_DIR, 'report_design_판매실적집계.json');
        fs.writeFileSync(outputPath, JSON.stringify(reportJson, null, 2), 'utf-8');
        
        console.log('\n' + '='.repeat(70));
        console.log('✅ 레포트 디자인 저장 완료');
        console.log('='.repeat(70));
        console.log(`📁 파일: ${outputPath}`);
      } catch (e) {
        console.log('\n⚠️ JSON 파싱 실패, 원본 텍스트로 저장');
        const outputPath = path.join(OUTPUT_DIR, 'report_design_판매실적집계.txt');
        fs.writeFileSync(outputPath, reportDesign, 'utf-8');
        console.log(`📁 파일: ${outputPath}`);
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ 완료!');
    console.log('='.repeat(70));
    
  } catch (error) {
    console.error('❌ 오류:', error);
    throw error;
  }
}

main().catch(console.error);

#!/usr/bin/env tsx
/**
 * Phase 1: 화면 정의 추출 (Screen Definition Extraction)
 * 
 * 목적: Excel 파일에서 순수 화면 정의만 추출 (DB 정보 제외)
 * 입력: Excel 파일 (.xlsx)
 * 출력: screen_definition.json
 * 
 * 특징:
 * - DB 테이블/컬럼 정보 없음
 * - Excel 헤더 기준 컬럼 정의
 * - 데이터 타입 자동 추론
 * - 필터 및 차트 정의
 * 
 * Created: 2025-12-04
 */

import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

// ============================================================================
// 설정
// ============================================================================

const CLAUDE_API_KEY = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

if (!CLAUDE_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY 또는 CLAUDE_API_KEY가 설정되지 않았습니다.');
  console.error('   .env 파일에 API 키를 설정해주세요.');
  process.exit(1);
}

// ============================================================================
// 타입 정의
// ============================================================================

interface ColumnDefinition {
  id: string;
  excelHeader: string;
  displayName: string;
  dataType: 'string' | 'number' | 'currency' | 'percentage' | 'date' | 'boolean';
  width: number;
  align: 'left' | 'center' | 'right';
  editable?: boolean;
  required?: boolean;
  format?: string;
}

interface FilterDefinition {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'month-picker' | 'year-picker' | 'select' | 'multi-select';
  required: boolean;
  defaultValue?: any;
  options?: string[];
}

interface ChartDefinition {
  type: 'bar' | 'line' | 'pie' | 'area' | 'scatter';
  title: string;
  xAxis: string;  // columnId
  yAxis: string;  // columnId
  series?: string[];  // columnIds for multi-series
}

interface ScreenDefinition {
  screenId: string;
  screenName: string;
  description?: string;
  columns: ColumnDefinition[];
  filters: FilterDefinition[];
  charts: ChartDefinition[];
  layout: {
    hasFilter: boolean;
    hasGrid: boolean;
    hasChart: boolean;
    filterPosition: 'top' | 'left' | 'right';
    chartPosition: 'bottom' | 'right' | 'separate';
  };
}

// ============================================================================
// Excel 읽기
// ============================================================================

function readExcelFile(filePath: string, sheetName?: string): { headers: string[], data: any[][] } {
  console.log(`\n📖 Excel 파일 읽기: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`파일을 찾을 수 없습니다: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath);
  const targetSheet = sheetName || workbook.SheetNames[0];
  
  if (!targetSheet) {
    throw new Error('시트 이름을 찾을 수 없습니다.');
  }
  
  console.log(`   시트: ${targetSheet}`);
  
  const worksheet = workbook.Sheets[targetSheet];
  if (!worksheet) {
    throw new Error(`시트를 찾을 수 없습니다: ${targetSheet}`);
  }

  // 전체 데이터를 배열로 변환
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][];
  
  if (jsonData.length === 0) {
    throw new Error('시트에 데이터가 없습니다.');
  }

  // 헤더 행 찾기 (첫 번째 비어있지 않은 행)
  let headerRowIndex = 0;
  for (let i = 0; i < jsonData.length; i++) {
    const row = jsonData[i];
    if (row && row.some((cell: any) => cell !== '' && cell !== null && cell !== undefined)) {
      headerRowIndex = i;
      break;
    }
  }

  const headers = jsonData[headerRowIndex] as string[];
  const data = jsonData.slice(headerRowIndex + 1).filter(row => 
    row && row.some((cell: any) => cell !== '' && cell !== null && cell !== undefined)
  );

  console.log(`   ✅ 헤더: ${headers.length}개`);
  console.log(`   ✅ 데이터: ${data.length}행`);
  console.log(`   헤더 목록: ${headers.join(', ')}\n`);

  return { headers, data };
}

// ============================================================================
// Claude API를 사용한 화면 정의 생성
// ============================================================================

async function generateScreenDefinition(
  headers: string[],
  sampleData: any[][],
  screenName: string,
  screenId?: string
): Promise<ScreenDefinition> {
  console.log(`\n🤖 Claude API를 사용하여 화면 정의 생성 중...`);

  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });

  // 샘플 데이터 (최대 10행)
  const samples = sampleData.slice(0, 10);

  const systemPrompt = `당신은 Excel 데이터를 분석하여 화면 정의를 생성하는 전문가입니다.

**중요 규칙**:
1. DB 테이블이나 컬럼 정보는 고려하지 마세요
2. 순수하게 Excel 헤더와 데이터만 분석하세요
3. 데이터 타입은 샘플 데이터를 보고 추론하세요
4. 필터는 데이터 패턴을 보고 추론하세요 (년월, 구분, 부서 등)
5. 차트는 숫자 데이터가 있으면 자동으로 제안하세요`;

  const userPrompt = `Excel 시트를 분석하여 화면 정의를 생성해주세요.

**화면명**: ${screenName}
**화면ID**: ${screenId || 'AUTO'}

**Excel 헤더** (${headers.length}개):
${JSON.stringify(headers, null, 2)}

**샘플 데이터** (${samples.length}행):
${JSON.stringify(samples, null, 2)}

**생성할 JSON 구조** (예시):
\`\`\`json
{
  "screenId": "SC001",
  "screenName": "판매 실적 집계",
  "description": "월별 판매 실적을 조회하는 화면",
  "columns": [
    {
      "id": "col1",
      "excelHeader": "구분",
      "displayName": "구분",
      "dataType": "string",
      "width": 80,
      "align": "center",
      "editable": false,
      "required": false
    },
    {
      "id": "col2",
      "excelHeader": "금액",
      "displayName": "금액",
      "dataType": "currency",
      "width": 120,
      "align": "right",
      "format": "#,##0"
    }
  ],
  "filters": [
    {
      "id": "filter1",
      "label": "년월",
      "type": "month-picker",
      "required": true
    }
  ],
  "charts": [
    {
      "type": "bar",
      "title": "월별 실적 추이",
      "xAxis": "col1",
      "yAxis": "col5"
    }
  ],
  "layout": {
    "hasFilter": true,
    "hasGrid": true,
    "hasChart": true,
    "filterPosition": "top",
    "chartPosition": "bottom"
  }
}
\`\`\`

**데이터 타입 규칙**:
- 숫자만 있으면: "number"
- 금액 ($, \\, 원): "currency"
- 퍼센트 (%): "percentage"
- 날짜 (YYYY-MM-DD, YYYYMM): "date"
- 나머지: "string"

**필터 타입 규칙**:
- YYYYMM, 년월 → "month-picker"
- YYYY, 년도 → "year-picker"
- 날짜 → "date"
- 구분, 타입, 카테고리 → "select"
- 나머지 텍스트 → "text"

**응답은 반드시 JSON만 출력하세요 (설명 없이).**`;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 4096,
    temperature: 0,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt
      }
    ]
  });

  const content = response.content[0];
  if (!content || content.type !== 'text') {
    throw new Error('Claude API 응답이 텍스트가 아닙니다.');
  }

  // JSON 추출 (```json ``` 제거)
  let jsonText = (content as any).text.trim();
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  }

  const definition: ScreenDefinition = JSON.parse(jsonText);

  console.log(`   ✅ 화면 정의 생성 완료`);
  console.log(`   - 컬럼: ${definition.columns.length}개`);
  console.log(`   - 필터: ${definition.filters.length}개`);
  console.log(`   - 차트: ${definition.charts.length}개\n`);

  return definition;
}

// ============================================================================
// JSON 저장
// ============================================================================

function saveScreenDefinition(definition: ScreenDefinition, outputPath: string): void {
  console.log(`\n💾 화면 정의 저장: ${outputPath}`);

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(definition, null, 2), 'utf-8');

  console.log(`   ✅ 저장 완료\n`);
}

// ============================================================================
// 메인 함수
// ============================================================================

async function main() {
  console.log('========================================');
  console.log('📋 Phase 1: 화면 정의 추출');
  console.log('========================================\n');

  // 예시: 판매 실적 집계
  const excelPath = '/home/roarm_m3/dwisCOST/docs/원가시스템 폼.ver7.xlsx';
  const sheetName = '3. 판매 실적 집계';
  const screenName = '판매 실적 집계';
  const screenId = 'SC001';
  const outputPath = 'data/report_designs/SC001_definition.json';

  try {
    // 1. Excel 읽기
    const { headers, data } = readExcelFile(excelPath, sheetName);

    // 2. Claude API로 화면 정의 생성
    const definition = await generateScreenDefinition(headers, data, screenName, screenId);

    // 3. JSON 저장
    saveScreenDefinition(definition, outputPath);

    console.log('========================================');
    console.log('✅ Phase 1 완료!');
    console.log('========================================\n');

    console.log('📊 생성된 화면 정의:');
    console.log(`   ID: ${definition.screenId}`);
    console.log(`   이름: ${definition.screenName}`);
    console.log(`   설명: ${definition.description || '없음'}`);
    console.log(`   컬럼: ${definition.columns.length}개`);
    console.log(`   필터: ${definition.filters.length}개`);
    console.log(`   차트: ${definition.charts.length}개\n`);

    console.log('📁 저장 위치:');
    console.log(`   ${outputPath}\n`);

    console.log('🎯 다음 단계:');
    console.log('   1. 생성된 JSON 파일 확인 및 수정');
    console.log('   2. Phase 2 실행: npx tsx scripts/phase2_generate_data_logic.ts');
    console.log('');

  } catch (error) {
    console.error('\n❌ 오류 발생:', error);
    process.exit(1);
  }
}

// 실행
main();

export { generateScreenDefinition, readExcelFile, saveScreenDefinition };

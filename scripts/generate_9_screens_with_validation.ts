#!/usr/bin/env tsx
/**
 * 9개 시트 화면 정의 생성 (검증 포함)
 * 
 * 목적: 엑셀 파일의 9개 시트를 읽어 각각 화면 정의 생성
 * 검증 1: Excel → JSON 변환 검증
 * 검증 2: Claude API 응답 검증
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

const EXCEL_PATH = '/home/roarm_m3/dwisCOST/docs/원가시스템 폼.ver7.xlsx';
const OUTPUT_DIR = path.join(process.cwd(), 'data', 'report_designs');

// 처리할 시트 목록 (순서대로)
const TARGET_SHEETS = [
  '1. 생산실적(1안)',
  '2. 제품 수불부',
  '3. 판매 실적 집계',
  '4. 자재수불부',
  '4. 제조경비 집계표',
  '5-1. 제조경비 집계표(부서별)',
  '5-2. 제조경비 집계표(제품별)',
  '6. 원부자재 배부표(제품별)',
  '9. 제품별 손익계산서'
];

// ============================================================================
// 타입 정의
// ============================================================================

interface ColumnDefinition {
  id: string;
  excelHeader: string;
  displayName: string;
  dataType: 'string' | 'number' | 'currency' | 'percentage' | 'date';
  width: number;
  align: 'left' | 'center' | 'right';
  format?: string;
}

interface FilterDefinition {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'month-picker' | 'date-range';
  required: boolean;
  options?: string[];
}

interface ChartDefinition {
  type: 'bar' | 'line' | 'pie' | 'area';
  title: string;
  xAxis: string;
  yAxis: string;
}

interface ScreenDefinition {
  screenId: string;
  screenName: string;
  description: string;
  excelSheet: string;
  columns: ColumnDefinition[];
  filters: FilterDefinition[];
  charts: ChartDefinition[];
  layout: {
    filterPosition: 'top' | 'left';
    gridHeight: number;
    chartPosition: 'bottom' | 'right' | 'none';
  };
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// Excel 읽기 및 변환 검증
// ============================================================================

/**
 * 검증 1: Excel 시트를 JSON으로 변환하고 유효성 검증
 */
function readAndValidateExcelSheet(sheetName: string): {
  data: any[];
  validation: ValidationResult;
  headers: string[];
  dataRows: any[];
} {
  console.log(`\n📊 [검증 1] "${sheetName}" 시트 읽기 시작...`);
  
  const validation: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  try {
    const workbook = XLSX.readFile(EXCEL_PATH);
    
    // 시트 존재 확인
    if (!workbook.SheetNames.includes(sheetName)) {
      validation.isValid = false;
      validation.errors.push(`시트 "${sheetName}"를 찾을 수 없습니다.`);
      return { data: [], validation, headers: [], dataRows: [] };
    }

    const worksheet = workbook.Sheets[sheetName];
    
    if (!worksheet) {
      validation.isValid = false;
      validation.errors.push(`시트 "${sheetName}"를 읽을 수 없습니다.`);
      return { data: [], validation, headers: [], dataRows: [] };
    }
    
    // 시트를 배열로 변환
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: '',
      blankrows: false
    }) as any[][];

    console.log(`   ✓ 총 ${jsonData.length}행 읽음`);

    // 헤더 행 찾기
    const headerRowIndex = findHeaderRow(jsonData);
    
    if (headerRowIndex === -1) {
      validation.isValid = false;
      validation.errors.push('헤더 행을 찾을 수 없습니다.');
      return { data: jsonData, validation, headers: [], dataRows: [] };
    }

    console.log(`   ✓ 헤더 행: ${headerRowIndex + 1}번째`);

    const headers = jsonData[headerRowIndex] || [];
    const dataRows = jsonData.slice(headerRowIndex + 1);

    console.log(`   ✓ 헤더: ${headers.length}개`);
    console.log(`   ✓ 데이터: ${dataRows.length}행`);

    // 헤더 검증
    const nonEmptyHeaders = headers.filter((h: any) => h && h.toString().trim());
    if (nonEmptyHeaders.length === 0) {
      validation.isValid = false;
      validation.errors.push('유효한 헤더가 없습니다.');
    } else {
      console.log(`   ✓ 유효한 헤더: ${nonEmptyHeaders.length}개`);
    }

    // 데이터 검증
    if (dataRows.length === 0) {
      validation.warnings.push('데이터 행이 없습니다. (빈 템플릿일 수 있음)');
    }

    // 첫 5개 헤더 미리보기
    console.log(`   📋 헤더 미리보기: [${headers.slice(0, 5).join(', ')}...]`);

    return { data: jsonData, validation, headers, dataRows };

  } catch (error: any) {
    validation.isValid = false;
    validation.errors.push(`Excel 읽기 오류: ${error.message}`);
    return { data: [], validation, headers: [], dataRows: [] };
  }
}

/**
 * 헤더 행 자동 탐지 (개선된 로직)
 */
function findHeaderRow(data: any[][]): number {
  const keywords = ['구분', '코드', '품번', '품명', '수량', '금액', '단가', '일자', '월'];
  
  for (let i = 0; i < Math.min(10, data.length); i++) {
    const row = data[i];
    if (!row) continue;
    
    const rowStr = row.join('').toLowerCase();
    
    // 키워드 매칭
    const matchCount = keywords.filter(kw => rowStr.includes(kw)).length;
    if (matchCount >= 2) {
      return i;
    }
    
    // 빈 셀이 적고 텍스트가 많은 행
    const nonEmptyCells = row.filter((cell: any) => cell && cell.toString().trim()).length;
    if (nonEmptyCells >= 3 && nonEmptyCells === row.length) {
      return i;
    }
  }
  
  return -1;
}

// ============================================================================
// Claude API 호출 및 응답 검증
// ============================================================================

/**
 * 검증 2: Claude API로 화면 정의 생성 및 응답 검증
 */
async function generateAndValidateScreenDefinition(
  sheetName: string,
  headers: string[],
  dataRows: any[][],
  screenIndex: number
): Promise<{ definition: ScreenDefinition | null; validation: ValidationResult }> {
  console.log(`\n🤖 [검증 2] Claude API 호출 중...`);
  
  const validation: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  if (!CLAUDE_API_KEY) {
    validation.isValid = false;
    validation.errors.push('ANTHROPIC_API_KEY가 설정되지 않았습니다.');
    return { definition: null, validation };
  }

  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });

  // 데이터 샘플 준비 (처음 3행만)
  const dataSample = dataRows.slice(0, 3);

  const prompt = `
당신은 Excel 화면 정의 생성 전문가입니다.

다음 Excel 시트 정보를 바탕으로 화면 정의(Screen Definition)를 생성하세요.

**중요**: DB 정보는 고려하지 마세요. 순수하게 Excel 구조만 기준으로 작성하세요.

## 입력 정보

**시트명**: ${sheetName}
**헤더**: ${JSON.stringify(headers)}
**데이터 샘플** (처음 3행):
${JSON.stringify(dataSample, null, 2)}

## 출력 형식

다음 JSON 형식으로 화면 정의를 생성하세요:

\`\`\`json
{
  "screenId": "SC${String(screenIndex).padStart(3, '0')}",
  "screenName": "시트명 기반 화면명",
  "description": "이 화면의 목적과 주요 기능 설명",
  "excelSheet": "${sheetName}",
  "columns": [
    {
      "id": "col1",
      "excelHeader": "Excel 헤더명",
      "displayName": "화면 표시명",
      "dataType": "string|number|currency|percentage|date",
      "width": 100,
      "align": "left|center|right",
      "format": "#,##0.00 (옵션)"
    }
  ],
  "filters": [
    {
      "id": "filter1",
      "label": "필터명",
      "type": "text|select|date|month-picker|date-range",
      "required": true,
      "options": ["옵션1", "옵션2"] // select 타입인 경우만
    }
  ],
  "charts": [
    {
      "type": "bar|line|pie|area",
      "title": "차트 제목",
      "xAxis": "col1",
      "yAxis": "col2"
    }
  ],
  "layout": {
    "filterPosition": "top",
    "gridHeight": 400,
    "chartPosition": "bottom|right|none"
  }
}
\`\`\`

## 규칙

1. **컬럼 정의**:
   - 빈 헤더는 제외
   - dataType은 데이터 샘플을 보고 추론
   - 금액/수량은 currency, 비율은 percentage
   - width는 헤더 길이 * 10 ~ 15 정도

2. **필터 정의**:
   - 데이터에서 추론 가능한 필터만 생성
   - 날짜/기간 필터는 우선 고려
   - 구분/카테고리는 select 타입

3. **차트 정의**:
   - 수량/금액 컬럼이 있으면 차트 제안
   - 시계열 데이터는 line, 비교는 bar, 비율은 pie

4. **응답**:
   - JSON만 출력 (설명 불필요)
   - 유효한 JSON 형식 준수
`;

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4000,
      temperature: 0,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const content = response.content[0];
    if (!content || content.type !== 'text') {
      validation.isValid = false;
      validation.errors.push('Claude 응답이 텍스트가 아닙니다.');
      return { definition: null, validation };
    }

    console.log(`   ✓ Claude 응답 수신 (${content.text.length}자)`);

    // JSON 추출 (```json ... ``` 제거)
    let jsonStr = content.text.trim();
    const jsonMatch = jsonStr.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      jsonStr = jsonMatch[1];
    }

    // JSON 파싱
    let definition: ScreenDefinition;
    try {
      definition = JSON.parse(jsonStr);
      console.log(`   ✓ JSON 파싱 성공`);
    } catch (parseError: any) {
      validation.isValid = false;
      validation.errors.push(`JSON 파싱 실패: ${parseError.message}`);
      return { definition: null, validation };
    }

    // 스키마 검증
    const schemaValidation = validateScreenDefinitionSchema(definition);
    if (!schemaValidation.isValid) {
      validation.isValid = false;
      validation.errors.push(...schemaValidation.errors);
      validation.warnings.push(...schemaValidation.warnings);
      return { definition: null, validation };
    }

    console.log(`   ✓ 스키마 검증 통과`);
    console.log(`   ✓ 컬럼: ${definition.columns.length}개`);
    console.log(`   ✓ 필터: ${definition.filters.length}개`);
    console.log(`   ✓ 차트: ${definition.charts.length}개`);

    return { definition, validation };

  } catch (error: any) {
    validation.isValid = false;
    validation.errors.push(`API 호출 오류: ${error.message}`);
    return { definition: null, validation };
  }
}

/**
 * 화면 정의 스키마 검증
 */
function validateScreenDefinitionSchema(definition: any): ValidationResult {
  const validation: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // 필수 필드 검증
  const requiredFields = ['screenId', 'screenName', 'description', 'excelSheet', 'columns', 'filters', 'charts', 'layout'];
  for (const field of requiredFields) {
    if (!(field in definition)) {
      validation.errors.push(`필수 필드 누락: ${field}`);
      validation.isValid = false;
    }
  }

  // 컬럼 검증
  if (Array.isArray(definition.columns)) {
    if (definition.columns.length === 0) {
      validation.warnings.push('컬럼이 하나도 없습니다.');
    }
    
    definition.columns.forEach((col: any, idx: number) => {
      if (!col.id || !col.excelHeader || !col.displayName || !col.dataType) {
        validation.errors.push(`컬럼 ${idx}: 필수 필드 누락`);
        validation.isValid = false;
      }
      
      const validDataTypes = ['string', 'number', 'currency', 'percentage', 'date'];
      if (!validDataTypes.includes(col.dataType)) {
        validation.errors.push(`컬럼 ${idx}: 잘못된 dataType "${col.dataType}"`);
        validation.isValid = false;
      }
    });
  } else {
    validation.errors.push('columns는 배열이어야 합니다.');
    validation.isValid = false;
  }

  // 필터 검증
  if (Array.isArray(definition.filters)) {
    definition.filters.forEach((filter: any, idx: number) => {
      if (!filter.id || !filter.label || !filter.type) {
        validation.errors.push(`필터 ${idx}: 필수 필드 누락`);
        validation.isValid = false;
      }
    });
  } else {
    validation.errors.push('filters는 배열이어야 합니다.');
    validation.isValid = false;
  }

  return validation;
}

// ============================================================================
// 메인 실행
// ============================================================================

async function main() {
  console.log('🚀 9개 시트 화면 정의 생성 시작\n');
  console.log(`📁 Excel 파일: ${EXCEL_PATH}`);
  console.log(`📂 출력 폴더: ${OUTPUT_DIR}\n`);
  console.log('=' .repeat(80));

  // 출력 디렉토리 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results: Array<{
    sheetName: string;
    success: boolean;
    screenId: string;
    errors: string[];
    warnings: string[];
  }> = [];

  // 각 시트 처리
  for (let i = 0; i < TARGET_SHEETS.length; i++) {
    const sheetName = TARGET_SHEETS[i];
    const screenId = `SC${String(i + 1).padStart(3, '0')}`;
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📄 [${i + 1}/${TARGET_SHEETS.length}] ${sheetName}`);
    console.log(`🆔 Screen ID: ${screenId}`);
    console.log('='.repeat(80));

    // 검증 1: Excel 읽기
    const { data, validation: excelValidation, headers, dataRows } = readAndValidateExcelSheet(sheetName);

    if (!excelValidation.isValid) {
      console.log(`\n❌ [검증 1] Excel 읽기 실패`);
      excelValidation.errors.forEach(err => console.log(`   - ${err}`));
      results.push({
        sheetName,
        success: false,
        screenId,
        errors: excelValidation.errors,
        warnings: excelValidation.warnings
      });
      continue;
    }

    console.log(`\n✅ [검증 1] Excel 읽기 성공`);
    if (excelValidation.warnings.length > 0) {
      excelValidation.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
    }

    // 검증 2: Claude API
    const { definition, validation: apiValidation } = await generateAndValidateScreenDefinition(
      sheetName,
      headers,
      dataRows,
      i + 1
    );

    if (!apiValidation.isValid || !definition) {
      console.log(`\n❌ [검증 2] Claude API 실패`);
      apiValidation.errors.forEach(err => console.log(`   - ${err}`));
      results.push({
        sheetName,
        success: false,
        screenId,
        errors: [...excelValidation.errors, ...apiValidation.errors],
        warnings: [...excelValidation.warnings, ...apiValidation.warnings]
      });
      continue;
    }

    console.log(`\n✅ [검증 2] Claude API 성공`);
    if (apiValidation.warnings.length > 0) {
      apiValidation.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
    }

    // 파일 저장
    const outputPath = path.join(OUTPUT_DIR, `${screenId}_definition.json`);
    fs.writeFileSync(outputPath, JSON.stringify(definition, null, 2), 'utf-8');
    console.log(`\n💾 저장 완료: ${outputPath}`);

    results.push({
      sheetName,
      success: true,
      screenId,
      errors: [],
      warnings: [...excelValidation.warnings, ...apiValidation.warnings]
    });

    // API 속도 제한 방지 (1초 대기)
    if (i < TARGET_SHEETS.length - 1) {
      console.log('\n⏳ API 속도 제한 방지 (1초 대기)...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // 최종 결과 요약
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 최종 결과 요약');
  console.log('='.repeat(80));

  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;

  console.log(`\n✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${failCount}개`);

  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    console.log(`\n${icon} ${result.screenId} - ${result.sheetName}`);
    if (result.errors.length > 0) {
      result.errors.forEach(err => console.log(`   ❌ ${err}`));
    }
    if (result.warnings.length > 0) {
      result.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('🎉 작업 완료!');
  console.log('='.repeat(80));
}

// 실행
main().catch(console.error);

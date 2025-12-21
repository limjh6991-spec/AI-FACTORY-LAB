import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Gemini를 사용하여 Excel 구조 분석
 */
export async function analyzeExcel(prompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',  // 최신 안정 버전 (2025-06-17 릴리스)
    generationConfig: {
      temperature: 0.1, // 정확도 우선
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
  });
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * Excel 컬럼명을 DB 테이블/컬럼에 매핑
 */
export async function mapColumnToDB(
  columnName: string, 
  dbMetadata: any
): Promise<{ table: string; column: string; confidence: number }> {
  const prompt = `
다음 Excel 컬럼명을 가장 적합한 DB 테이블/컬럼에 매핑해주세요.

Excel 컬럼명: "${columnName}"

사용 가능한 DB 메타데이터:
${JSON.stringify(dbMetadata.slice(0, 20), null, 2)}
...총 ${dbMetadata.length}개 테이블

요구사항:
1. 가장 유사한 테이블과 컬럼을 찾으세요
2. 한글명, 영문명, 약어 패턴을 모두 고려하세요
   - 예: "부서명" → dept_nm, department_name
   - 예: "금액" → amt, amount, cost_amt
3. Confidence는 0.0~1.0 사이 값

반드시 다음 JSON 형식으로만 답변하세요:
{
  "table": "테이블명",
  "column": "컬럼명",
  "confidence": 0.95
}
`;
  
  const result = await analyzeExcel(prompt);
  
  // JSON 추출 (마크다운 코드블록 제거)
  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Gemini가 유효한 JSON을 반환하지 않았습니다');
  }
  
  return JSON.parse(jsonMatch[0]);
}

/**
 * Excel 헤더 행 자동 인식
 */
export async function detectHeaderRow(rows: string[][]): Promise<number> {
  const prompt = `
다음 Excel 시트의 처음 10행을 분석하여 실제 헤더가 있는 행 번호를 찾아주세요.

데이터:
${rows.slice(0, 10).map((row, idx) => `Row ${idx + 1}: ${JSON.stringify(row)}`).join('\n')}

판단 기준:
1. 빈 행이나 제목 행이 아닌 실제 컬럼명 행
2. 데이터가 시작되기 직전 행
3. 일반적으로 컬럼명은 한글/영문으로 구성됨

반드시 다음 JSON 형식으로만 답변하세요:
{
  "headerRow": 2,
  "reason": "2번째 행에 '부서명', '월', '금액' 등 실제 컬럼명이 있음"
}
`;

  const result = await analyzeExcel(prompt);
  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Gemini가 유효한 JSON을 반환하지 않았습니다');
  }
  
  return JSON.parse(jsonMatch[0]).headerRow;
}

/**
 * Excel 데이터 타입 추론
 */
export async function inferDataTypes(
  headers: string[], 
  sampleRows: string[][]
): Promise<{ column: string; type: string; format?: string }[]> {
  const prompt = `
다음 Excel 데이터의 각 컬럼 데이터 타입을 추론해주세요.

헤더: ${JSON.stringify(headers)}

샘플 데이터 (처음 5행):
${sampleRows.map((row, idx) => `Row ${idx + 1}: ${JSON.stringify(row)}`).join('\n')}

데이터 타입:
- string: 문자열
- number: 숫자
- date: 날짜
- boolean: 참/거짓
- percentage: 퍼센트 (15% 형식)
- currency: 통화 (1,000,000원 형식)

반드시 다음 JSON 배열 형식으로만 답변하세요:
[
  {
    "column": "부서명",
    "type": "string"
  },
  {
    "column": "금액",
    "type": "currency",
    "format": "KRW"
  }
]
`;

  const result = await analyzeExcel(prompt);
  const jsonMatch = result.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('Gemini가 유효한 JSON을 반환하지 않았습니다');
  }
  
  return JSON.parse(jsonMatch[0]);
}

/**
 * 비용 계산 (대략적인 추정)
 */
export function estimateCost(inputTokens: number, outputTokens: number): number {
  // Gemini 2.5 Flash 가격 (2025년 기준 예상)
  // Input: $0.00015 per 1K tokens
  // Output: $0.0006 per 1K tokens
  const inputCost = (inputTokens / 1000) * 0.00015;
  const outputCost = (outputTokens / 1000) * 0.0006;
  return inputCost + outputCost;
}

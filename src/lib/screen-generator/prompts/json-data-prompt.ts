/**
 * JSON 데이터 생성 프롬프트
 * Claude API에 전송하여 AG Grid용 columnDefs와 샘플 데이터를 생성받음
 */

import { buildColumnStructureDescription } from './column-structure';

/**
 * JSON 데이터 생성 프롬프트 작성
 * @param parsedData 엑셀에서 파싱된 데이터
 * @returns 프롬프트 문자열
 */
export function buildJsonDataPrompt(parsedData: any): string {
  const { screenName, screenNameEn, tableName, searchConditions, gridColumns } = parsedData;
  
  // 그리드 컬럼 구조 설명
  const columnStructure = buildColumnStructureDescription(gridColumns);
  
  // 옵션 정보 생성
  const optionInfo = searchConditions?.length > 0
    ? searchConditions.map((sc: any) => `- ${sc.label} (${sc.type})`).join("\n")
    : "기본: 년월";
  
  return `다음 Excel 템플릿 정보를 기반으로 AG Grid용 columnDefs와 샘플 데이터를 JSON 형식으로 생성해주세요.

## 화면 정보
- 화면명: ${screenName}
- 화면명(영문): ${screenNameEn || "N/A"}
- 테이블명: ${tableName || "N/A"}

## 사용할 옵션 (공통 컴포넌트)
${optionInfo}

## 그리드 컬럼 구조
${columnStructure}

## 합계 행
${gridColumns.summaryRows?.join(", ") || "없음"}

## 출력 형식 (JSON만 출력!)
\`\`\`json
{
  "screenName": "화면명",
  "columnDefs": [
    { "headerName": "컬럼1", "field": "col1", "width": 100 },
    { "headerName": "컬럼2", "field": "col2", "width": 120, "type": "numericColumn" },
    {
      "headerName": "그룹명",
      "children": [
        { "headerName": "서브1", "field": "sub1", "width": 100 },
        { "headerName": "서브2", "field": "sub2", "width": 100, "type": "numericColumn" }
      ]
    }
  ],
  "sampleData": [
    { "col1": "값1", "col2": 1000, "sub1": "A", "sub2": 500 },
    { "col1": "값2", "col2": 2000, "sub1": "B", "sub2": 600 }
  ],
  "summaryData": { "col1": "합계", "col2": 3000, "sub1": "", "sub2": 1100 },
  "searchFields": [
    { "label": "년월", "field": "yearmonth", "type": "yearmonth" },
    { "label": "자재", "field": "material", "type": "material" }
  ]
}
\`\`\`

## 규칙
1. columnDefs: 그리드 컬럼 구조에 맞게 생성
   - 숫자 컬럼은 "type": "numericColumn" 추가
   - 그룹 헤더가 있으면 children으로 중첩
2. sampleData: 3-5개의 샘플 행
   - 숫자는 Number 타입
3. summaryData: 합계 행 (있는 경우)
4. searchFields: 위 "사용할 옵션" 정보를 기반으로 생성
   - 옵션 타입: yearmonth, year, material, customer, department, account, model, site, expense

JSON만 출력하세요 (설명 없이):`;
}

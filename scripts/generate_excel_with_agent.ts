#!/usr/bin/env tsx
/**
 * Agent 기반 Excel 생성 스크립트
 * 
 * 목적: Gemini Agent가 Vector DB의 DB 메타데이터를 학습하고
 *       실제 DB 스키마에 맞는 Excel 샘플 파일을 생성
 * 
 * 핵심: 자비스는 틀만 제공, Agent가 실제 추론
 */

import { VectorSearch } from '~/lib/vector-search';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface VectorResult {
  document: string;
  metadata: any;
  score: number;
}

interface ExcelColumn {
  name: string;
  type: string;
  description: string;
}

interface ExcelSpec {
  tableName: string;
  description: string;
  columns: ExcelColumn[];
  sampleData: Record<string, any>[];
}

async function generateExcelWithAgent(excelTheme: string) {
  console.log('\n🤖 Agent 기반 Excel 생성 시작...\n');
  console.log(`📊 주제: ${excelTheme}\n`);

  // 1. Vector DB에서 관련 DB 메타데이터 검색
  console.log('🔍 Step 1: Vector DB에서 관련 테이블/컬럼 검색...');
  
  const vectorSearch = new VectorSearch();
  await vectorSearch.initialize();
  
  const vectorResults = await vectorSearch.searchDBMetadata(excelTheme, 10);

  console.log(`✅ 검색 완료: ${vectorResults.length}개 결과\n`);

  // 2. Agent에게 Excel 생성 요청
  console.log('🤖 Step 2: Gemini Agent에게 Excel 구조 추론 요청...\n');

  const prompt = `
당신은 DB 스키마 전문가입니다. 주어진 DB 메타데이터를 바탕으로 "${excelTheme}" 주제의 Excel 파일을 설계해주세요.

## Vector DB 검색 결과 (실제 DB 스키마):
${vectorResults.map((r: VectorResult, i: number) => `
### 관련 정보 ${i + 1} (유사도: ${r.score.toFixed(3)}):
${r.document}
`).join('\n')}

## 요청사항:
1. 위의 실제 DB 테이블/컬럼 정보를 바탕으로 Excel 파일 구조를 설계하세요
2. Excel 헤더는 **DB 컬럼명과 정확히 일치**해야 합니다 (대소문자 포함)
3. 샘플 데이터 5-10행을 생성하세요
4. 각 컬럼의 데이터 타입에 맞는 값을 생성하세요

## 출력 형식 (JSON):
\`\`\`json
{
  "tableName": "실제_테이블명",
  "description": "Excel 파일 설명",
  "columns": [
    {
      "name": "실제_DB_컬럼명",
      "type": "데이터_타입",
      "description": "컬럼 설명"
    }
  ],
  "sampleData": [
    {
      "실제_DB_컬럼명": "샘플_값",
      ...
    }
  ]
}
\`\`\`

**중요**: 반드시 위의 Vector DB 검색 결과에 있는 실제 테이블명과 컬럼명을 사용하세요!
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  console.log('📄 Agent 응답:\n');
  console.log(response);
  console.log('\n');

  // 3. JSON 파싱
  console.log('📊 Step 3: Agent 응답 파싱...');
  
  const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
  if (!jsonMatch || !jsonMatch[1]) {
    throw new Error('Agent 응답에서 JSON을 찾을 수 없습니다');
  }

  const excelSpec = JSON.parse(jsonMatch[1]) as ExcelSpec;
  console.log('✅ 파싱 완료\n');
  console.log(`   테이블: ${excelSpec.tableName}`);
  console.log(`   컬럼 수: ${excelSpec.columns.length}`);
  console.log(`   샘플 데이터: ${excelSpec.sampleData.length}행\n`);

  // 4. Excel 파일 생성
  console.log('📝 Step 4: Excel 파일 생성...');

  const worksheet = XLSX.utils.json_to_sheet(excelSpec.sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, excelSpec.tableName);

  const outputDir = path.join(process.cwd(), 'data', 'sample_excel');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileName = `${excelTheme.replace(/\s+/g, '_')}.xlsx`;
  const filePath = path.join(outputDir, fileName);

  XLSX.writeFile(workbook, filePath);

  console.log(`✅ Excel 파일 생성 완료: ${filePath}\n`);

  // 5. 결과 요약
  console.log('📋 생성 결과 요약:');
  console.log('─────────────────────────────────────');
  console.log(`테이블명: ${excelSpec.tableName}`);
  console.log(`설명: ${excelSpec.description}`);
  console.log(`\n컬럼 정보:`);
  excelSpec.columns.forEach((col) => {
    console.log(`  - ${col.name} (${col.type}): ${col.description}`);
  });
  console.log(`\n샘플 데이터: ${excelSpec.sampleData.length}행`);
  console.log('─────────────────────────────────────\n');

  return {
    filePath,
    spec: excelSpec
  };
}

// 실행
const theme = process.argv[2] || '공정별생산실적';

generateExcelWithAgent(theme)
  .then((result) => {
    console.log('✅ 완료!');
    console.log(`\n다음 단계: 이 파일로 매핑 테스트`);
    console.log(`1. http://localhost:3000/excel-mapping 접속`);
    console.log(`2. ${result.filePath} 업로드`);
    console.log(`3. Agent가 100% 정확하게 매핑하는지 확인\n`);
  })
  .catch((error) => {
    console.error('❌ 에러:', error);
    process.exit(1);
  });

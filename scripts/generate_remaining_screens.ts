#!/usr/bin/env tsx
/**
 * 나머지 시트 화면 정의 생성 (SC006~SC009)
 * API rate limit 대응: 10초 대기
 */

import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

const CLAUDE_API_KEY = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const EXCEL_PATH = '/home/roarm_m3/dwisCOST/docs/원가시스템 폼.ver7.xlsx';
const OUTPUT_DIR = path.join(process.cwd(), 'data', 'report_designs');

// 나머지 시트만 처리
const TARGET_SHEETS = [
  { id: 'SC006', name: '5-1. 제조경비 집계표(부서별)' },
  { id: 'SC007', name: '5-2. 제조경비 집계표(제품별)' },
  { id: 'SC008', name: '6. 원부자재 배부표(제품별)' },
  { id: 'SC009', name: '9. 제품별 손익계산서' }
];

async function main() {
  console.log('🚀 나머지 4개 시트 처리 시작\n');
  
  const workbook = XLSX.readFile(EXCEL_PATH);
  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });

  for (const sheet of TARGET_SHEETS) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📄 ${sheet.id} - ${sheet.name}`);
    console.log('='.repeat(80));

    if (!workbook.SheetNames.includes(sheet.name)) {
      console.log(`❌ 시트를 찾을 수 없습니다.`);
      continue;
    }

    const worksheet = workbook.Sheets[sheet.name];
    if (!worksheet) continue;

    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: '',
      blankrows: false
    }) as any[][];

    console.log(`   ✓ ${jsonData.length}행 읽음`);

    // 간단한 프롬프트 (토큰 절약)
    const prompt = `
다음 Excel 시트의 화면 정의를 JSON으로 생성하세요.

시트명: ${sheet.name}
시트 미리보기 (처음 10행):
${JSON.stringify(jsonData.slice(0, 10), null, 2)}

다음 형식으로 응답하세요 (JSON만):
{
  "screenId": "${sheet.id}",
  "screenName": "화면명",
  "description": "설명",
  "excelSheet": "${sheet.name}",
  "columns": [ /* 컬럼 정의 */ ],
  "filters": [ /* 필터 정의 */ ],
  "charts": [ /* 차트 정의 */ ],
  "layout": { "filterPosition": "top", "gridHeight": 400, "chartPosition": "bottom" }
}
`;

    try {
      const response = await client.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4000,
        temperature: 0,
        messages: [{ role: 'user', content: prompt }]
      });

      const content = response.content[0];
      if (!content || content.type !== 'text') {
        console.log(`❌ 응답 형식 오류`);
        continue;
      }

      let jsonStr = content.text.trim();
      const jsonMatch = jsonStr.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        jsonStr = jsonMatch[1];
      }

      const definition = JSON.parse(jsonStr);
      const outputPath = path.join(OUTPUT_DIR, `${sheet.id}_definition.json`);
      fs.writeFileSync(outputPath, JSON.stringify(definition, null, 2), 'utf-8');
      
      console.log(`   ✅ 저장 완료: ${outputPath}`);
      console.log(`   ✓ 컬럼: ${definition.columns?.length || 0}개`);

    } catch (error: any) {
      console.log(`   ❌ 오류: ${error.message}`);
    }

    // API rate limit 대응: 10초 대기
    console.log(`\n⏳ API 속도 제한 방지 (10초 대기)...`);
    await new Promise(resolve => setTimeout(resolve, 10000));
  }

  console.log('\n\n✅ 작업 완료!');
}

main().catch(console.error);

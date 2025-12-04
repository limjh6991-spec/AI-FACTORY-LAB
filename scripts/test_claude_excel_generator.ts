/**
 * 🧪 Claude Opus 4.5 Excel Generator 테스트
 * 
 * Purpose: Claude Opus 4.5의 보고서 설계 능력 테스트
 * Usage: npx tsx scripts/test_claude_excel_generator.ts
 */

import { AgentExcelGeneratorClaude } from '../src/lib/agent-excel-generator-claude';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function testClaudeExcelGenerator() {
  console.log('🤖 Claude Opus 4.5 Excel 생성기 테스트\n');
  console.log('=' .repeat(80));

  const reportRequests = [
    {
      reportName: '부서별 원가 분석',
      description: '부서별 단위원가와 총원가를 분석한 보고서'
    },
    {
      reportName: '모델별 생산 수불 레포트',
      description: '모델별 생산 입고/출고 현황'
    }
  ];

  for (const request of reportRequests) {
    console.log(`\n📊 테스트: ${request.reportName}`);
    console.log('-'.repeat(80));

    try {
      const generator = new AgentExcelGeneratorClaude();
      await generator.initialize();

      const design = await generator.generateReportDesign(request);
      
      console.log('\n✅ Claude 설계 완료!');
      console.log(`컬럼 수: ${design.columns.length}`);
      console.log(`테이블: ${design.tables.join(', ')}`);
      console.log('\nSQL 쿼리:');
      console.log('```sql');
      console.log(design.sqlQuery);
      console.log('```');

      // SQL 검증 - 큰따옴표 확인
      const hasQuotes = design.sqlQuery.includes('"');
      console.log(`\n✓ SQL 큰따옴표 사용: ${hasQuotes ? '✅' : '❌'}`);

      // 환각 검증 - RAG Context에 없는 컬럼 사용 여부
      const suspiciousColumns = ['MODEL명칭', 'model명칭', 'MODEL코드'];
      const hasSuspicious = suspiciousColumns.some(col => design.sqlQuery.includes(col));
      console.log(`✓ 환각 없음 (RAG Context 준수): ${!hasSuspicious ? '✅' : '❌'}`);

      // 설계 근거
      console.log('\n💭 설계 근거:');
      console.log(design.reasoning);

      // JSON 파일로 저장
      const fileName = `claude_design_${request.reportName.replace(/\s+/g, '_')}.json`;
      const filePath = join(process.cwd(), fileName);
      writeFileSync(filePath, JSON.stringify(design, null, 2), 'utf-8');
      console.log(`\n💾 설계 저장: ${fileName}`);

    } catch (error) {
      console.error('\n❌ 테스트 실패:', error instanceof Error ? error.message : error);
      
      if (error instanceof Error && error.message.includes('API key')) {
        console.log('\n⚠️  .env 파일에 ANTHROPIC_API_KEY를 설정하세요!');
        console.log('   https://console.anthropic.com/settings/keys');
      }
    }
  }

  console.log('\n\n✅ 모든 테스트 완료!');
}

testClaudeExcelGenerator().catch(console.error);

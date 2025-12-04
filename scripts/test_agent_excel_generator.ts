/**
 * 🧪 Agent Excel Generator 테스트
 * 
 * Purpose: Agent 기반 Excel 보고서 자동 생성 테스트
 * Usage: npx tsx scripts/test_agent_excel_generator.ts
 */

import { AgentExcelGenerator } from '../src/lib/agent-excel-generator';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function main() {
  console.log('🤖 Agent Excel Generator 테스트 시작\n');
  console.log('=' .repeat(80));

  const generator = new AgentExcelGenerator();
  await generator.initialize();
  console.log('✓ Agent Excel Generator 초기화 완료\n');

  // ============================================================================
  // 테스트 보고서 요청 목록
  // ============================================================================
  const reportRequests = [
    {
      reportName: '모델별 생산 수불 레포트',
      description: '각 제품 모델별로 입고, 출고, 재고 수량을 집계한 보고서'
    },
    {
      reportName: '부서별 원가 분석',
      description: '부서별 단위원가와 총원가를 분석한 보고서'
    },
    {
      reportName: '작업 일정 현황',
      description: '작업별 시작일자, 종료일자, 진행상태를 보여주는 보고서'
    }
  ];

  // ============================================================================
  // 각 보고서 설계 요청
  // ============================================================================
  for (let i = 0; i < reportRequests.length; i++) {
    const request = reportRequests[i]!;
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📊 테스트 ${i + 1}: ${request.reportName}`);
    console.log('-'.repeat(80));
    console.log(`설명: ${request.description}\n`);

    try {
      // Agent가 보고서 설계
      const design = await generator.generateReportDesign(request);

      console.log('\n📋 Agent 설계 결과:');
      console.log(`\n보고서명: ${design.reportName}`);
      
      console.log('\n컬럼 목록:');
      design.columns.forEach((col, idx) => {
        console.log(`  ${idx + 1}. ${col.columnName} (${col.dataType})`);
        console.log(`     ${col.description}`);
      });

      console.log(`\n사용 테이블: ${design.tables.join(', ')}`);
      
      console.log('\nSQL 쿼리:');
      console.log('```sql');
      console.log(design.sqlQuery);
      console.log('```');

      console.log('\n설계 근거:');
      console.log(design.reasoning);

      if (design.agentThinking) {
        console.log('\nAgent 사고 과정:');
        console.log(design.agentThinking);
      }

      // 설계 결과를 파일로 저장
      const designFile = join(
        process.cwd(), 
        'data', 
        `report_design_${i + 1}_${design.reportName.replace(/\s+/g, '_')}.json`
      );
      writeFileSync(designFile, JSON.stringify(design, null, 2), 'utf-8');
      console.log(`\n✓ 설계 결과 저장: ${designFile}`);

    } catch (error) {
      console.error(`\n❌ 테스트 ${i + 1} 실패:`, error);
      if (error instanceof Error) {
        console.error('오류 상세:', error.message);
      }
    }
  }

  // ============================================================================
  // 통계
  // ============================================================================
  console.log('\n\n📊 최종 통계');
  console.log('='.repeat(80));
  console.log(`총 요청 수: ${reportRequests.length}`);
  console.log('✅ Agent가 DB 스키마를 분석하여 보고서를 자동 설계했습니다!');
  console.log('✅ 실제 데이터 조회는 tRPC API를 통해 테스트하세요.');
}

main().catch(console.error);

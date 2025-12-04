/**
 * 🧪 Agent Mapper 테스트
 * 
 * Purpose: Agent 기반 매핑 시스템 테스트
 * Usage: npx tsx scripts/test_agent_mapper.ts
 */

import { AgentMapper, type FewShotExample } from '../src/lib/agent-mapper';

async function main() {
  console.log('🤖 Agent Mapper 테스트 시작\n');
  console.log('=' .repeat(80));

  const mapper = new AgentMapper();
  await mapper.initialize();
  console.log('✓ Agent Mapper 초기화 완료\n');

  // ============================================================================
  // 테스트 1: Few-Shot Learning 없이 매핑
  // ============================================================================
  console.log('📝 테스트 1: Few-Shot Learning 없이 매핑');
  console.log('-'.repeat(80));

  const testColumns1 = [
    '부서코드',
    '제품명',
    '수량'
  ];

  const results1 = await mapper.mapColumns(testColumns1);
  
  console.log('\n📊 결과 1:');
  results1.forEach(result => {
    console.log(`\n  Excel: "${result.excelColumn}"`);
    console.log(`  → DB: ${result.suggestedTable}.${result.suggestedColumn}`);
    console.log(`  → 신뢰도: ${result.confidence}%`);
    console.log(`  → 근거: ${result.reasoning}`);
    if (result.agentThinking) {
      console.log(`  → Agent 사고: ${result.agentThinking}`);
    }
  });

  // ============================================================================
  // 테스트 2: Few-Shot Learning 적용
  // ============================================================================
  console.log('\n\n📚 테스트 2: Few-Shot Learning 적용');
  console.log('-'.repeat(80));

  const fewShotExamples: FewShotExample[] = [
    {
      excelColumn: '부서코드',
      dbTable: 'tb_dept',
      dbColumn: 'DEPT',
      reason: '부서 정보 테이블의 부서 코드 컬럼'
    },
    {
      excelColumn: '사원번호',
      dbTable: 'tb_emp',
      dbColumn: 'EMP_NO',
      reason: '사원 정보 테이블의 사원 번호 컬럼'
    },
    {
      excelColumn: '작업시간',
      dbTable: 'tb_work',
      dbColumn: 'WORK_TIME',
      reason: '작업 정보 테이블의 작업 시간 컬럼'
    }
  ];

  const testColumns2 = [
    '작업일자',
    '원가',
    '부서명'
  ];

  const results2 = await mapper.mapColumns(testColumns2, fewShotExamples);
  
  console.log('\n📊 결과 2 (Few-Shot 적용):');
  results2.forEach(result => {
    console.log(`\n  Excel: "${result.excelColumn}"`);
    console.log(`  → DB: ${result.suggestedTable}.${result.suggestedColumn}`);
    console.log(`  → 신뢰도: ${result.confidence}%`);
    console.log(`  → 근거: ${result.reasoning}`);
    if (result.agentThinking) {
      console.log(`  → Agent 사고: ${result.agentThinking}`);
    }
  });

  // ============================================================================
  // 테스트 3: 사용자 피드백 저장
  // ============================================================================
  console.log('\n\n💾 테스트 3: 사용자 피드백 저장 (강화학습)');
  console.log('-'.repeat(80));

  await mapper.saveFeedback(
    '작업일자',
    'tb_work',
    'WORK_DATE',
    '사용자가 직접 수정한 정답 매핑'
  );

  console.log('✓ 피드백 저장 완료 - 다음 추론 시 RAG로 활용됨');

  // ============================================================================
  // 통계
  // ============================================================================
  console.log('\n\n📊 통계');
  console.log('='.repeat(80));

  const allResults = [...results1, ...results2];
  const avgConfidence = allResults.reduce((sum, r) => sum + r.confidence, 0) / allResults.length;
  const highConfidence = allResults.filter(r => r.confidence >= 70).length;
  const mediumConfidence = allResults.filter(r => r.confidence >= 50 && r.confidence < 70).length;
  const lowConfidence = allResults.filter(r => r.confidence < 50).length;

  console.log(`전체 매핑 수: ${allResults.length}`);
  console.log(`평균 신뢰도: ${avgConfidence.toFixed(1)}%`);
  console.log(`높은 신뢰도 (70% 이상): ${highConfidence}개`);
  console.log(`중간 신뢰도 (50-69%): ${mediumConfidence}개`);
  console.log(`낮은 신뢰도 (50% 미만): ${lowConfidence}개`);

  console.log('\n✅ 모든 테스트 완료!');
}

main().catch(console.error);

#!/usr/bin/env tsx
/**
 * 🧪 Claude Agent 컬럼 매핑 테스트
 * 
 * 테스트 시나리오:
 * 1. 기본 매핑 (부서별 원가 분석)
 * 2. 복잡한 매핑 (제품별 원가 분석)  
 * 3. 하드코딩 없이 Agent 추론 검증
 */

import { AgentColumnMapperClaude, mapColumnsWithClaude } from '../src/lib/agent-column-mapper-claude.js';

async function main() {
  console.log('='.repeat(70));
  console.log('🧪 Claude Agent 컬럼 매핑 테스트');
  console.log('='.repeat(70));

  // ================================================================
  // 테스트 1: 부서별 원가 분석
  // ================================================================
  console.log('\n📋 테스트 1: 부서별 원가 분석\n');
  
  const test1Columns = ['부서코드', '부서명', '제품코드', '제품명', '원가', '수량'];
  
  try {
    const results1 = await mapColumnsWithClaude(
      test1Columns,
      '부서별 원가 분석 보고서'
    );

    console.log('\n📊 매핑 결과:');
    for (const result of results1) {
      const confidenceEmoji = result.confidence >= 80 ? '✅' : result.confidence >= 50 ? '⚠️' : '❌';
      console.log(`  ${confidenceEmoji} "${result.excelColumn}"`);
      console.log(`     → ${result.suggestedTable}.${result.suggestedColumn}`);
      console.log(`     신뢰도: ${result.confidence}%`);
      console.log(`     이유: ${result.reasoning}`);
      if (result.alternatives && result.alternatives.length > 0) {
        console.log(`     대안: ${result.alternatives.map(a => `${a.table}.${a.column}(${a.confidence}%)`).join(', ')}`);
      }
      console.log('');
    }

    // 정확도 계산
    const avgConfidence1 = results1.reduce((sum, r) => sum + r.confidence, 0) / results1.length;
    console.log(`📈 평균 신뢰도: ${avgConfidence1.toFixed(1)}%`);

  } catch (error) {
    console.error('❌ 테스트 1 실패:', error);
  }

  // ================================================================
  // 테스트 2: 공정별 생산 실적
  // ================================================================
  console.log('\n' + '='.repeat(70));
  console.log('📋 테스트 2: 공정별 생산 실적\n');
  
  const test2Columns = ['공정코드', '공정명', '생산량', '불량률', '작업시간'];
  
  try {
    const results2 = await mapColumnsWithClaude(
      test2Columns,
      '공정별 생산 실적 보고서'
    );

    console.log('\n📊 매핑 결과:');
    for (const result of results2) {
      const confidenceEmoji = result.confidence >= 80 ? '✅' : result.confidence >= 50 ? '⚠️' : '❌';
      console.log(`  ${confidenceEmoji} "${result.excelColumn}"`);
      console.log(`     → ${result.suggestedTable}.${result.suggestedColumn}`);
      console.log(`     신뢰도: ${result.confidence}%`);
      console.log(`     이유: ${result.reasoning}`);
      console.log('');
    }

    const avgConfidence2 = results2.reduce((sum, r) => sum + r.confidence, 0) / results2.length;
    console.log(`📈 평균 신뢰도: ${avgConfidence2.toFixed(1)}%`);

  } catch (error) {
    console.error('❌ 테스트 2 실패:', error);
  }

  // ================================================================
  // 테스트 3: 제품별 원가 분석 (샘플 데이터 포함)
  // ================================================================
  console.log('\n' + '='.repeat(70));
  console.log('📋 테스트 3: 제품별 원가 분석 (샘플 데이터 포함)\n');
  
  const mapper = new AgentColumnMapperClaude();
  await mapper.initialize();

  try {
    const results3 = await mapper.mapColumns({
      excelColumns: ['제품코드', '제품명', '자재비', '인건비', '경비', '총원가'],
      excelFileName: '제품별_원가_분석.xlsx',
      contextDescription: '제품별 원가 상세 분석 보고서',
      sampleData: [
        { '제품코드': 'MDL-001', '제품명': '디스플레이 패널', '자재비': 15000, '인건비': 5000, '경비': 3000, '총원가': 23000 },
        { '제품코드': 'MDL-002', '제품명': 'LED 모듈', '자재비': 8000, '인건비': 3000, '경비': 2000, '총원가': 13000 },
        { '제품코드': 'MDL-003', '제품명': '컨트롤러', '자재비': 12000, '인건비': 4000, '경비': 2500, '총원가': 18500 }
      ]
    });

    console.log('\n📊 매핑 결과:');
    for (const result of results3) {
      const confidenceEmoji = result.confidence >= 80 ? '✅' : result.confidence >= 50 ? '⚠️' : '❌';
      console.log(`  ${confidenceEmoji} "${result.excelColumn}"`);
      console.log(`     → ${result.suggestedTable}.${result.suggestedColumn}`);
      console.log(`     신뢰도: ${result.confidence}%`);
      console.log(`     이유: ${result.reasoning}`);
      console.log('');
    }

    const avgConfidence3 = results3.reduce((sum, r) => sum + r.confidence, 0) / results3.length;
    console.log(`📈 평균 신뢰도: ${avgConfidence3.toFixed(1)}%`);

  } catch (error) {
    console.error('❌ 테스트 3 실패:', error);
  }

  // ================================================================
  // 결과 요약
  // ================================================================
  console.log('\n' + '='.repeat(70));
  console.log('📊 테스트 완료!');
  console.log('='.repeat(70));
  console.log(`
✅ Claude Agent 기반 컬럼 매핑 시스템

특징:
- 하드코딩 없음 (키워드 매칭 X, if-else X)
- RAG 기반 컨텍스트 검색
- Few-Shot Learning 적용
- 사용자 피드백 강화학습 지원

다음 단계:
1. 매핑 결과 검토
2. 잘못된 매핑 피드백 저장
3. 반복 테스트로 정확도 향상
`);
}

main().catch(console.error);

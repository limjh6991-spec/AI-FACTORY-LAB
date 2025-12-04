/**
 * 🧪 Agent Mapper V2 테스트
 * 
 * 개선된 매핑 정확도 테스트
 */

import AgentMapperV2 from '../src/lib/agent-mapper-v2';
import type { FewShotExample } from '../src/lib/agent-mapper-v2';

// ============================================================================
// 테스트 케이스
// ============================================================================

// 테스트용 Excel 컬럼
const testColumns = [
  '제품명',
  '부서코드', 
  '원가',
  '작업일자',
  '수량',
  '담당자',
  '모델명',
  '거래처',
];

// Few-Shot 예제 (성공/실패 사례)
const fewShotExamples: FewShotExample[] = [
  // 성공 사례
  {
    excelColumn: '상품명',
    dbTable: 'product',
    dbColumn: 'name',
    reason: '상품명과 product.name은 둘 다 제품의 이름을 나타내므로 의미가 정확히 일치',
    isCorrect: true,
  },
  {
    excelColumn: '제조일자',
    dbTable: 'production_order',
    dbColumn: 'productionDate',
    reason: '제조일자와 productionDate는 둘 다 생산된 날짜를 나타내므로 의미 일치',
    isCorrect: true,
  },
  {
    excelColumn: '단가',
    dbTable: 'product',
    dbColumn: 'unitPrice',
    reason: '단가와 unitPrice는 둘 다 개당 가격을 나타내므로 의미 일치',
    isCorrect: true,
  },
  // 실패 사례 (이렇게 매핑하면 안됨)
  {
    excelColumn: '제품명',
    dbTable: 'product',
    dbColumn: 'createdBy',
    reason: 'createdBy는 생성자(사람)를 나타내고, 제품명은 제품의 이름. 완전히 다른 의미!',
    isCorrect: false,
  },
  {
    excelColumn: '원가',
    dbTable: 'cost',
    dbColumn: '계정과목',
    reason: '계정과목은 회계 분류이고, 원가는 실제 비용 금액. 의미가 다름!',
    isCorrect: false,
  },
  {
    excelColumn: '작업일자',
    dbTable: 'production_order',
    dbColumn: 'updatedAt',
    reason: 'updatedAt은 시스템 수정 시간이고, 작업일자는 실제 작업 날짜. 시스템 컬럼 사용 금지!',
    isCorrect: false,
  },
];

// ============================================================================
// 메인 테스트
// ============================================================================

async function runTest() {
  console.log('=' .repeat(60));
  console.log('🧪 AGENT MAPPER V2 테스트');
  console.log('=' .repeat(60));

  // 환경변수 체크
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('⚠️ ANTHROPIC_API_KEY가 없습니다. Gemini로 폴백합니다.');
  } else {
    console.log(`✅ ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY?.substring(0, 20)}...`);
  }
  
  // 매퍼 초기화
  const mapper = new AgentMapperV2(true); // Claude 사용
  await mapper.initialize();
  
  console.log('\n📊 Few-Shot 예제:');
  console.log(`   ✅ 성공 사례: ${fewShotExamples.filter(e => e.isCorrect).length}개`);
  console.log(`   ❌ 실패 사례: ${fewShotExamples.filter(e => !e.isCorrect).length}개`);
  
  console.log('\n' + '-'.repeat(60));
  console.log('🔄 매핑 시작...\n');
  
  // 매핑 실행
  const results = await mapper.mapColumns(testColumns, fewShotExamples);
  
  // 결과 출력
  console.log('\n' + '='.repeat(60));
  console.log('📊 매핑 결과 요약');
  console.log('='.repeat(60) + '\n');
  
  let highConfidenceCount = 0;
  let systemColumnErrors = 0;
  
  results.forEach((r, idx) => {
    console.log(`${idx + 1}. "${r.excelColumn}"`);
    console.log(`   → ${r.suggestedTable}.${r.suggestedColumn}`);
    console.log(`   → 원래 신뢰도: ${r.confidence}%`);
    console.log(`   → 보정 신뢰도: ${r.adjustedConfidence}%`);
    console.log(`   → 이유: ${r.reasoning}`);
    
    if (r.validation.warnings.length > 0) {
      console.log(`   → 경고: ${r.validation.warnings.join(', ')}`);
    }
    
    if (r.validation.isSystemColumn) {
      systemColumnErrors++;
      console.log(`   ❌ 시스템 컬럼 매핑 오류!`);
    }
    
    if (r.adjustedConfidence >= 70) {
      highConfidenceCount++;
    }
    
    console.log('');
  });
  
  // 통계
  console.log('='.repeat(60));
  console.log('📈 통계');
  console.log('='.repeat(60));
  console.log(`전체 컬럼: ${testColumns.length}개`);
  console.log(`높은 신뢰도 (70%+): ${highConfidenceCount}개 (${Math.round(highConfidenceCount / testColumns.length * 100)}%)`);
  console.log(`시스템 컬럼 오류: ${systemColumnErrors}개`);
  
  const avgConfidence = results.reduce((sum, r) => sum + r.adjustedConfidence, 0) / results.length;
  console.log(`평균 신뢰도: ${Math.round(avgConfidence)}%`);
  
  console.log('\n✅ 테스트 완료!');
}

// 실행
runTest().catch(console.error);

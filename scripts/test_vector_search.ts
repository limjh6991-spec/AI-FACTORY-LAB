#!/usr/bin/env tsx
/**
 * 🤖 JARVIS - Vector Search 테스트
 * 
 * Purpose: Vector DB 검색 기능 검증
 * 
 * Created: 2025-12-02
 */

import 'dotenv/config';
import { VectorSearch } from '../src/lib/vector-search.js';

async function main() {
  console.log('🔍 Vector Search 테스트 시작...\n');

  const vectorSearch = new VectorSearch();
  await vectorSearch.initialize();

  // 테스트 쿼리들
  const testQueries = [
    'Excel 파일을 어떻게 분석하나요?',
    'RAG 시스템 구현 방법',
    'DB 컬럼 매핑 전략',
    'Gemini API 사용법',
    '차트 자동 생성 방법',
  ];

  console.log('📋 테스트 쿼리:');
  testQueries.forEach((q, idx) => {
    console.log(`  ${idx + 1}. ${q}`);
  });
  console.log('\n' + '='.repeat(60) + '\n');

  // 각 쿼리 실행
  for (const query of testQueries) {
    console.log(`🔍 질문: "${query}"\n`);

    const results = await vectorSearch.search(query, 3);

    console.log('📄 관련 문서:');
    results.forEach((result, idx) => {
      console.log(`\n  ${idx + 1}. [${result.metadata.fileName}]`);
      console.log(`     섹션: ${result.metadata.section || 'N/A'}`);
      console.log(`     점수: ${result.score.toFixed(4)}`);
      console.log(`     내용: ${result.document.substring(0, 150)}...`);
    });

    console.log('\n' + '-'.repeat(60) + '\n');
  }

  // 맥락 증강 프롬프트 테스트
  console.log('🤖 맥락 증강 프롬프트 테스트\n');
  const augmentedPrompt = await vectorSearch.augmentPrompt(
    'Excel 파일을 분석하는 가장 좋은 방법은?'
  );
  console.log(augmentedPrompt);
  console.log('\n' + '='.repeat(60) + '\n');

  // 통계
  const stats = await vectorSearch.getStats();
  console.log('📊 Vector DB 통계:');
  console.log(`  - 총 문서 수: ${stats.totalDocuments}`);
  console.log(`  - 컬렉션: ${stats.collections.join(', ')}`);

  console.log('\n✅ 테스트 완료! 🚀');
}

main().catch(console.error);

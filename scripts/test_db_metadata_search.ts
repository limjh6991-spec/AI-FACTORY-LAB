#!/usr/bin/env tsx
/**
 * 🤖 JARVIS - DB 메타데이터 검색 테스트
 * 
 * Purpose: DB 메타데이터 검색 기능 검증
 * 
 * Created: 2025-12-02
 */

import 'dotenv/config';
import { DBMetadataSearch } from '../src/lib/db-metadata-search.js';

async function main() {
  console.log('🔍 DB 메타데이터 검색 테스트 시작...\n');

  const searcher = new DBMetadataSearch();
  await searcher.initialize();
  console.log('✅ DB 메타데이터 검색기 초기화 완료\n');

  // ============================================================================
  // 테스트 1: 테이블 검색
  // ============================================================================
  console.log('============================================================');
  console.log('📋 테스트 1: 테이블 검색\n');

  const tableQueries = [
    '제품 관리',
    '원가 계산',
    '생산 실적',
    '부서 정보',
    '자재 관리'
  ];

  for (const query of tableQueries) {
    console.log(`🔍 검색: "${query}"`);
    const tables = await searcher.searchTables(query, 3);
    
    tables.forEach((table, idx) => {
      console.log(`  ${idx + 1}. ${table.koreanTableName} (${table.tableName})`);
      console.log(`     유사도: ${Math.round(table.score * 100)}%, 컬럼: ${table.columnCount}개, 레코드: ${table.rowCount}개`);
    });
    console.log('');
  }

  // ============================================================================
  // 테스트 2: Excel 컬럼 매핑
  // ============================================================================
  console.log('============================================================');
  console.log('📋 테스트 2: Excel 컬럼 매핑\n');

  const excelScenarios = [
    {
      description: '부서별 원가 분석',
      columns: ['부서코드', '부서명', '제품코드', '제품명', '원가', '수량']
    },
    {
      description: '공정별 생산 실적',
      columns: ['공정코드', '공정명', '생산량', '불량률', '작업시간']
    },
    {
      description: '제품별 원가 분석',
      columns: ['제품코드', '제품명', '자재비', '인건비', '경비']
    }
  ];

  for (const scenario of excelScenarios) {
    console.log(`📊 시나리오: "${scenario.description}"`);
    console.log(`Excel 컬럼: ${scenario.columns.join(', ')}\n`);

    const mappings = await searcher.suggestColumnMappings(
      scenario.columns,
      scenario.description
    );

    mappings.forEach(mapping => {
      console.log(`  ✓ "${mapping.excelColumn}"`);
      console.log(`    → ${mapping.suggestedTable}.${mapping.suggestedColumn}`);
      console.log(`    신뢰도: ${mapping.confidence}%`);
      console.log(`    이유: ${mapping.reasoning}`);
      console.log('');
    });
  }

  // ============================================================================
  // 테스트 3: 유사 테이블 찾기
  // ============================================================================
  console.log('============================================================');
  console.log('📋 테스트 3: 유사 테이블 찾기\n');

  const excelData = {
    headers: ['제품코드', '제품명', '카테고리', '단가', '재고수량'],
    sampleRows: [
      { 제품코드: 'P001', 제품명: '노트북', 카테고리: '전자제품', 단가: 1200000, 재고수량: 50 },
      { 제품코드: 'P002', 제품명: '마우스', 카테고리: '주변기기', 단가: 25000, 재고수량: 200 }
    ]
  };

  console.log('Excel 데이터 구조:');
  console.log(`헤더: ${excelData.headers.join(', ')}\n`);

  const similarTables = await searcher.findSimilarTables(excelData);
  
  console.log('유사한 테이블:');
  similarTables.forEach((table, idx) => {
    console.log(`  ${idx + 1}. ${table.koreanTableName} (${table.tableName})`);
    console.log(`     유사도: ${Math.round(table.score * 100)}%, 컬럼: ${table.columnCount}개`);
  });

  console.log('\n============================================================');
  console.log('✅ 모든 테스트 완료! 🚀');
}

main().catch(console.error);

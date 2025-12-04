#!/usr/bin/env tsx
/**
 * 🧪 Claude Agent E2E 테스트 - 실제 Excel 파일 매핑
 * 
 * 테스트 시나리오:
 * 1. 샘플 Excel 파일 생성
 * 2. Excel 파일 파싱
 * 3. Claude Agent로 컬럼 매핑
 * 4. 결과 검증
 */

import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { AgentColumnMapperClaude } from '../src/lib/agent-column-mapper-claude.js';

// ============================================================================
// 샘플 Excel 파일 생성
// ============================================================================

function createSampleExcel() {
  const sampleDir = path.join(process.cwd(), 'data', 'sample_excel');
  fs.mkdirSync(sampleDir, { recursive: true });

  // 샘플 1: 부서별 원가 분석
  const data1 = [
    { '년월': '202411', '부서코드': 'D001', '부서명': '생산1팀', '제품코드': 'MDL-001', '제품명': '디스플레이 패널', '원가': 15000, '수량': 100 },
    { '년월': '202411', '부서코드': 'D002', '부서명': '생산2팀', '제품코드': 'MDL-002', '제품명': 'LED 모듈', '원가': 8000, '수량': 200 },
    { '년월': '202411', '부서코드': 'D003', '부서명': '품질관리팀', '제품코드': 'MDL-003', '제품명': '컨트롤러', '원가': 12000, '수량': 150 },
  ];
  
  const ws1 = XLSX.utils.json_to_sheet(data1);
  const wb1 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb1, ws1, '부서별원가');
  XLSX.writeFile(wb1, path.join(sampleDir, '부서별_원가_분석.xlsx'));
  console.log('✅ 샘플 1: 부서별_원가_분석.xlsx 생성');

  // 샘플 2: 제품별 생산 실적
  const data2 = [
    { '년월': '202411', '모델': 'MDL-001', '모델명': '디스플레이 패널', '생산수량': 1000, '불량수량': 10, '양품수량': 990 },
    { '년월': '202411', '모델': 'MDL-002', '모델명': 'LED 모듈', '생산수량': 2000, '불량수량': 25, '양품수량': 1975 },
    { '년월': '202411', '모델': 'MDL-003', '모델명': '컨트롤러', '생산수량': 1500, '불량수량': 15, '양품수량': 1485 },
  ];
  
  const ws2 = XLSX.utils.json_to_sheet(data2);
  const wb2 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb2, ws2, '생산실적');
  XLSX.writeFile(wb2, path.join(sampleDir, '제품별_생산_실적.xlsx'));
  console.log('✅ 샘플 2: 제품별_생산_실적.xlsx 생성');

  // 샘플 3: 자재 수불 현황
  const data3 = [
    { '년월': '202411', '사이트': 'HQ', '자재코드': 'MAT-001', '자재명': 'PCB 기판', '입고수량': 500, '출고수량': 450, '재고수량': 50 },
    { '년월': '202411', '사이트': 'HQ', '자재코드': 'MAT-002', '자재명': 'LED 칩', '입고수량': 1000, '출고수량': 900, '재고수량': 100 },
    { '년월': '202411', '사이트': 'HQ', '자재코드': 'MAT-003', '자재명': '케이블', '입고수량': 800, '출고수량': 700, '재고수량': 100 },
  ];
  
  const ws3 = XLSX.utils.json_to_sheet(data3);
  const wb3 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb3, ws3, '자재수불');
  XLSX.writeFile(wb3, path.join(sampleDir, '자재_수불_현황.xlsx'));
  console.log('✅ 샘플 3: 자재_수불_현황.xlsx 생성');

  return [
    { file: '부서별_원가_분석.xlsx', data: data1 },
    { file: '제품별_생산_실적.xlsx', data: data2 },
    { file: '자재_수불_현황.xlsx', data: data3 },
  ];
}

// ============================================================================
// Excel 파일 파싱
// ============================================================================

function parseExcel(filePath: string): { headers: string[], data: any[] } {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]!;
  const sheet = workbook.Sheets[sheetName]!;
  const data = XLSX.utils.sheet_to_json(sheet);
  const headers = Object.keys(data[0] || {});
  return { headers, data };
}

// ============================================================================
// 메인 테스트
// ============================================================================

async function main() {
  console.log('='.repeat(70));
  console.log('🧪 Claude Agent E2E 테스트 - 실제 Excel 파일 매핑');
  console.log('='.repeat(70));

  // 1. 샘플 Excel 파일 생성
  console.log('\n📁 샘플 Excel 파일 생성 중...\n');
  const samples = createSampleExcel();

  // 2. Agent 초기화
  console.log('\n🤖 Claude Agent 초기화...');
  const mapper = new AgentColumnMapperClaude();
  await mapper.initialize();

  const allResults: any[] = [];

  // 3. 각 Excel 파일 테스트
  for (const sample of samples) {
    console.log('\n' + '='.repeat(70));
    console.log(`📊 테스트: ${sample.file}`);
    console.log('='.repeat(70));

    const filePath = path.join(process.cwd(), 'data', 'sample_excel', sample.file);
    const { headers, data } = parseExcel(filePath);

    console.log(`\n📋 Excel 컬럼: ${headers.join(', ')}`);
    console.log(`📋 데이터 행 수: ${data.length}`);

    try {
      const results = await mapper.mapColumns({
        excelColumns: headers,
        excelFileName: sample.file,
        contextDescription: sample.file.replace('.xlsx', '').replace(/_/g, ' '),
        sampleData: data.slice(0, 3)
      });

      console.log('\n📊 매핑 결과:');
      let totalConfidence = 0;
      
      for (const result of results) {
        const emoji = result.confidence >= 80 ? '✅' : result.confidence >= 50 ? '⚠️' : '❌';
        console.log(`  ${emoji} "${result.excelColumn}"`);
        console.log(`     → ${result.suggestedTable}.${result.suggestedColumn} (${result.confidence}%)`);
        totalConfidence += result.confidence;
      }

      const avgConfidence = totalConfidence / results.length;
      console.log(`\n📈 평균 신뢰도: ${avgConfidence.toFixed(1)}%`);

      allResults.push({
        file: sample.file,
        results,
        avgConfidence
      });

    } catch (error) {
      console.error(`❌ 테스트 실패: ${error}`);
    }
  }

  // 4. 최종 결과 요약
  console.log('\n' + '='.repeat(70));
  console.log('📊 E2E 테스트 최종 결과');
  console.log('='.repeat(70));

  let totalAvg = 0;
  for (const result of allResults) {
    const emoji = result.avgConfidence >= 80 ? '✅' : result.avgConfidence >= 60 ? '⚠️' : '❌';
    console.log(`  ${emoji} ${result.file}: 평균 ${result.avgConfidence.toFixed(1)}%`);
    totalAvg += result.avgConfidence;
  }

  const overallAvg = totalAvg / allResults.length;
  console.log(`\n🎯 전체 평균 신뢰도: ${overallAvg.toFixed(1)}%`);

  if (overallAvg >= 80) {
    console.log('✅ 목표 달성! (80% 이상)');
  } else if (overallAvg >= 60) {
    console.log('⚠️ 개선 필요 (60~80%)');
  } else {
    console.log('❌ 추가 학습 필요 (60% 미만)');
  }

  console.log('\n' + '='.repeat(70));
  console.log('✅ E2E 테스트 완료!');
  console.log('='.repeat(70));
}

main().catch(console.error);

#!/usr/bin/env tsx
/**
 * 🔄 피드백 기반 매핑 학습 및 개선 도구
 * 
 * 사용자의 매핑 수정 피드백을 수집하고 Few-Shot Learning에 반영
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const FEEDBACK_FILE = '/home/roarm_m3/ai-factory-lab/data/mapping_feedback.json';

interface MappingFeedback {
  excelColumn: string;
  reportType: string;
  originalMapping: { table: string; column: string };
  correctedMapping: { table: string; column: string };
  timestamp: string;
  confidence?: number;
}

// ============================================================================
// 피드백 관리
// ============================================================================

function loadFeedback(): MappingFeedback[] {
  if (fs.existsSync(FEEDBACK_FILE)) {
    return JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf-8'));
  }
  return [];
}

function saveFeedback(feedbacks: MappingFeedback[]): void {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2), 'utf-8');
}

function addFeedback(feedback: MappingFeedback): void {
  const feedbacks = loadFeedback();
  feedbacks.push(feedback);
  saveFeedback(feedbacks);
  console.log('✅ 피드백이 저장되었습니다.');
}

// ============================================================================
// 대화형 피드백 수집
// ============================================================================

async function collectFeedbackInteractive(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (q: string): Promise<string> => {
    return new Promise(resolve => rl.question(q, resolve));
  };

  console.log('='.repeat(70));
  console.log('📝 매핑 피드백 수집');
  console.log('='.repeat(70));
  console.log('잘못된 매핑을 수정하면 AI가 학습합니다.\n');

  try {
    const excelColumn = await question('Excel 컬럼명: ');
    const reportType = await question('보고서 유형 (예: 원가분석, 생산실적): ');
    
    console.log('\n--- 원래 매핑 (잘못된 매핑) ---');
    const origTable = await question('원래 테이블: ');
    const origColumn = await question('원래 컬럼: ');
    
    console.log('\n--- 올바른 매핑 ---');
    const corrTable = await question('올바른 테이블: ');
    const corrColumn = await question('올바른 컬럼: ');
    
    const confidence = await question('\n신뢰도 (0-100, Enter=100): ');

    const feedback: MappingFeedback = {
      excelColumn,
      reportType,
      originalMapping: { table: origTable, column: origColumn },
      correctedMapping: { table: corrTable, column: corrColumn },
      timestamp: new Date().toISOString(),
      confidence: confidence ? parseInt(confidence) : 100
    };

    console.log('\n📋 입력된 피드백:');
    console.log(JSON.stringify(feedback, null, 2));
    
    const confirm = await question('\n저장하시겠습니까? (y/n): ');
    
    if (confirm.toLowerCase() === 'y') {
      addFeedback(feedback);
    } else {
      console.log('❌ 취소되었습니다.');
    }
  } finally {
    rl.close();
  }
}

// ============================================================================
// 피드백 통계
// ============================================================================

function showFeedbackStats(): void {
  const feedbacks = loadFeedback();
  
  console.log('='.repeat(70));
  console.log('📊 피드백 통계');
  console.log('='.repeat(70));
  console.log(`총 피드백 수: ${feedbacks.length}개\n`);
  
  // 컬럼별 통계
  const columnStats: Record<string, number> = {};
  const tableStats: Record<string, number> = {};
  
  feedbacks.forEach(f => {
    columnStats[f.excelColumn] = (columnStats[f.excelColumn] || 0) + 1;
    tableStats[f.correctedMapping.table] = (tableStats[f.correctedMapping.table] || 0) + 1;
  });
  
  console.log('📋 자주 수정되는 Excel 컬럼:');
  Object.entries(columnStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([col, count]) => console.log(`  - ${col}: ${count}회`));
  
  console.log('\n📊 자주 사용되는 DB 테이블:');
  Object.entries(tableStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([table, count]) => console.log(`  - ${table}: ${count}회`));
  
  console.log('\n📝 최근 피드백 5건:');
  feedbacks.slice(-5).forEach(f => {
    console.log(`  - "${f.excelColumn}" → ${f.correctedMapping.table}.${f.correctedMapping.column}`);
  });
}

// ============================================================================
// 배치 피드백 추가
// ============================================================================

function addBatchFeedback(feedbackList: Omit<MappingFeedback, 'timestamp'>[]): void {
  const feedbacks = loadFeedback();
  
  feedbackList.forEach(f => {
    feedbacks.push({
      ...f,
      timestamp: new Date().toISOString()
    });
  });
  
  saveFeedback(feedbacks);
  console.log(`✅ ${feedbackList.length}개 피드백이 저장되었습니다.`);
}

// ============================================================================
// 메인
// ============================================================================

const args = process.argv.slice(2);

if (args[0] === 'add') {
  collectFeedbackInteractive().catch(console.error);
} else if (args[0] === 'stats') {
  showFeedbackStats();
} else if (args[0] === 'batch') {
  // 예시: 일괄 피드백 추가
  const sampleFeedback: Omit<MappingFeedback, 'timestamp'>[] = [
    {
      excelColumn: '공정코드',
      reportType: '생산실적',
      originalMapping: { table: '부서원가', column: '코스트센터' },
      correctedMapping: { table: 'dw_공정별_모니터링항목', column: 'process_cd' },
      confidence: 90
    },
    {
      excelColumn: '생산량',
      reportType: '생산실적',
      originalMapping: { table: 'doi_mat_amt_bak1118', column: '소요량' },
      correctedMapping: { table: 'dw_생산일보집계', column: 'prod_qty' },
      confidence: 85
    },
    {
      excelColumn: '불량률',
      reportType: '품질',
      originalMapping: { table: 'null', column: 'null' },
      correctedMapping: { table: 'dw_일별_공정별_불량현황', column: 'defect_rate' },
      confidence: 80
    },
    {
      excelColumn: '작업시간',
      reportType: '생산실적',
      originalMapping: { table: 'null', column: 'null' },
      correctedMapping: { table: 'dw_생산일보집계', column: 'work_time' },
      confidence: 80
    }
  ];
  
  addBatchFeedback(sampleFeedback);
  showFeedbackStats();
} else {
  console.log('='.repeat(70));
  console.log('📝 피드백 관리 도구');
  console.log('='.repeat(70));
  console.log('\n사용법:');
  console.log('  npx tsx scripts/feedback_manager.ts add    - 대화형 피드백 추가');
  console.log('  npx tsx scripts/feedback_manager.ts stats  - 피드백 통계 보기');
  console.log('  npx tsx scripts/feedback_manager.ts batch  - 샘플 배치 피드백 추가');
}

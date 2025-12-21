#!/usr/bin/env npx tsx
/**
 * 🚀 AI Factory Lab - 통합 화면 생성 스크립트
 * 
 * 엑셀 파일 → 화면 정의 → SQL 생성 → tRPC 라우터 → 페이지 생성
 * 
 * 사용법:
 *   npx tsx scripts/generate-screen.ts <엑셀파일경로> [화면코드]
 * 
 * 예시:
 *   npx tsx scripts/generate-screen.ts resources/excel/판매관리비집계.xlsx SC001
 */

import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config({ override: true });

// 색상 유틸리티
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step: number, total: number, message: string) {
  console.log(`\n${colors.cyan}[${'='.repeat(step)}${'-'.repeat(total - step)}] Step ${step}/${total}: ${message}${colors.reset}`);
}

function logSuccess(message: string) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message: string) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logWarning(message: string) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

interface GenerationConfig {
  excelPath: string;
  screenCode: string;
  outputDir: string;
}

async function checkEnvironment(): Promise<boolean> {
  const requiredKeys = ['ANTHROPIC_API_KEY', 'GOOGLE_GENERATIVE_AI_API_KEY'];
  const missing: string[] = [];

  for (const key of requiredKeys) {
    const value = process.env[key]?.trim();
    if (!value || value.length < 20) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    logError('필수 환경 변수가 설정되지 않았습니다:');
    missing.forEach(key => console.log(`   - ${key}`));
    console.log('\n.env 파일을 확인하거나 환경 변수를 설정하세요.');
    return false;
  }

  return true;
}

async function runPhase1(config: GenerationConfig): Promise<boolean> {
  logStep(1, 4, '화면 정의 추출 (Gemini API)');
  
  try {
    // 직접 실행
    const { spawn } = await import('child_process');
    return new Promise((resolve) => {
      const proc = spawn('npx', ['tsx', 'scripts/phase1_extract_screen_definition.ts', config.excelPath], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: { ...process.env }
      });
      proc.on('close', (code) => {
        const defPath = path.join(config.outputDir, 'screen_definitions', `${config.screenCode}_definition.json`);
        if (code === 0 || fs.existsSync(defPath)) {
          logSuccess(`화면 정의 생성 완료`);
          resolve(true);
        } else {
          logWarning('화면 정의 파일이 생성되지 않았습니다.');
          resolve(false);
        }
      });
    });
  } catch (error) {
    logError(`Phase 1 실패: ${error}`);
    return false;
  }
}

async function runPhase2(config: GenerationConfig): Promise<boolean> {
  logStep(2, 4, 'SQL 쿼리 생성 (Claude API + RAG)');
  
  try {
    const { spawn } = await import('child_process');
    return new Promise((resolve) => {
      const proc = spawn('npx', ['tsx', 'scripts/generate_report_with_rag.ts'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: { ...process.env, SCREEN_CODE: config.screenCode }
      });
      proc.on('close', (code) => resolve(code === 0));
    });
  } catch (error) {
    logError(`Phase 2 실패: ${error}`);
    return false;
  }
}

async function runPhase3(config: GenerationConfig): Promise<boolean> {
  logStep(3, 4, 'UI 컴포넌트 생성 (AG Grid)');
  
  try {
    const { spawn } = await import('child_process');
    return new Promise((resolve) => {
      const proc = spawn('npx', ['tsx', 'scripts/phase3_generate_ui_component_aggrid.ts'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: { ...process.env, SCREEN_CODE: config.screenCode }
      });
      proc.on('close', (code) => resolve(code === 0));
    });
  } catch (error) {
    logError(`Phase 3 실패: ${error}`);
    return false;
  }
}

async function runPhase4(config: GenerationConfig): Promise<boolean> {
  logStep(4, 4, 'API 연결 및 검증 (tRPC Router)');
  
  try {
    const { spawn } = await import('child_process');
    return new Promise((resolve) => {
      const proc = spawn('npx', ['tsx', 'scripts/connect_screen_query.ts'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: { ...process.env, SCREEN_CODE: config.screenCode }
      });
      proc.on('close', (code) => resolve(code === 0));
    });
  } catch (error) {
    logError(`Phase 4 실패: ${error}`);
    return false;
  }
}

async function main() {
  console.log('\n' + '═'.repeat(70));
  log('🏭 AI Factory Lab - 통합 화면 생성 시스템', 'cyan');
  console.log('═'.repeat(70));

  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
${colors.yellow}사용법:${colors.reset}
  npx tsx scripts/generate-screen.ts <엑셀파일경로> [화면코드]

${colors.yellow}예시:${colors.reset}
  npx tsx scripts/generate-screen.ts resources/excel/판매관리비집계.xlsx SC001
  npx tsx scripts/generate-screen.ts resources/excel/sample.xlsx

${colors.yellow}옵션:${colors.reset}
  --skip-phase1    화면 정의 추출 건너뛰기
  --skip-phase2    SQL 생성 건너뛰기
  --skip-phase3    UI 컴포넌트 생성 건너뛰기
  --skip-phase4    API 연결 건너뛰기

${colors.yellow}환경 변수:${colors.reset}
  ANTHROPIC_API_KEY           Claude API 키
  GOOGLE_GENERATIVE_AI_API_KEY  Gemini API 키
`);
    process.exit(1);
  }

  const excelPath = args[0]!;
  const screenCode = args[1] || `SC${Date.now().toString().slice(-6)}`;
  
  // 환경 변수 확인
  if (!(await checkEnvironment())) {
    process.exit(1);
  }

  // 엑셀 파일 존재 확인
  const fullExcelPath = path.resolve(process.cwd(), excelPath);
  if (!fs.existsSync(fullExcelPath)) {
    logError(`엑셀 파일을 찾을 수 없습니다: ${fullExcelPath}`);
    process.exit(1);
  }

  const config: GenerationConfig = {
    excelPath: fullExcelPath,
    screenCode: screenCode.toUpperCase(),
    outputDir: path.join(process.cwd(), 'data'),
  };

  log(`\n📋 생성 설정:`, 'bright');
  console.log(`   엑셀 파일: ${config.excelPath}`);
  console.log(`   화면 코드: ${config.screenCode}`);
  console.log(`   출력 디렉토리: ${config.outputDir}`);

  const skipPhases = {
    phase1: args.includes('--skip-phase1'),
    phase2: args.includes('--skip-phase2'),
    phase3: args.includes('--skip-phase3'),
    phase4: args.includes('--skip-phase4'),
  };

  const results: boolean[] = [];

  // Phase 1: 화면 정의 추출
  if (!skipPhases.phase1) {
    results.push(await runPhase1(config));
  } else {
    logWarning('Phase 1 건너뛰기');
  }

  // Phase 2: SQL 생성
  if (!skipPhases.phase2) {
    results.push(await runPhase2(config));
  } else {
    logWarning('Phase 2 건너뛰기');
  }

  // Phase 3: UI 컴포넌트 생성
  if (!skipPhases.phase3) {
    results.push(await runPhase3(config));
  } else {
    logWarning('Phase 3 건너뛰기');
  }

  // Phase 4: API 연결
  if (!skipPhases.phase4) {
    results.push(await runPhase4(config));
  } else {
    logWarning('Phase 4 건너뛰기');
  }

  // 결과 요약
  console.log('\n' + '═'.repeat(70));
  log('📊 생성 결과 요약', 'cyan');
  console.log('═'.repeat(70));

  const successCount = results.filter(Boolean).length;
  const totalCount = results.length;

  console.log(`
생성된 파일:
├── data/screen_definitions/${config.screenCode}_definition.json
├── data/generated_queries/${config.screenCode}_query.sql
├── src/app/screens/${config.screenCode.toLowerCase()}/page.tsx
└── src/server/api/routers/screen${config.screenCode.toLowerCase().replace('sc', '')}.ts

결과: ${successCount}/${totalCount} 단계 성공
`);

  if (successCount === totalCount) {
    logSuccess('✨ 화면 생성 완료!');
    console.log(`\n접속 URL: http://localhost:3000/screens/${config.screenCode.toLowerCase()}`);
  } else {
    logWarning('일부 단계에서 문제가 발생했습니다. 로그를 확인하세요.');
  }

  console.log('═'.repeat(70) + '\n');
}

main().catch(console.error);

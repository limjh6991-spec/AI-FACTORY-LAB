/**
 * CRUD 화면 생성 테스트 스크립트
 * 
 * JSON 정의 파일을 기반으로 CRUD 화면(컴포넌트 + API)을 생성합니다.
 * 
 * 사용법:
 *   npx tsx scripts/test_crud_generation.ts
 * 
 * @module scripts/test_crud_generation
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { SimpleGridCrudTemplate } from '../src/server/api/routers/screenGenerator/templates/simpleGridCrud';
import { ScreenType, type CrudParsedData } from '../src/server/api/routers/screenGenerator/_shared/types';

// ESM에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 색상 출력용
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function main() {
  log('\n========================================', 'cyan');
  log('  CRUD 화면 생성 테스트', 'cyan');
  log('========================================\n', 'cyan');

  // 정의 파일 읽기
  const definitionPath = path.join(__dirname, '../data/screen_definitions/SC001_customer_definition.json');
  
  if (!fs.existsSync(definitionPath)) {
    log(`❌ 정의 파일이 없습니다: ${definitionPath}`, 'red');
    process.exit(1);
  }

  const definition = JSON.parse(fs.readFileSync(definitionPath, 'utf-8'));
  log(`📄 정의 파일 로드: ${definition.screenName} (${definition.screenId})`, 'green');

  // CrudParsedData로 변환
  const parsedData: CrudParsedData = {
    screenId: definition.screenId,
    screenName: definition.screenName,
    screenNameEn: definition.screenNameEn,
    tableName: definition.tableName,
    screenType: ScreenType.SIMPLE_GRID_CRUD,
    searchConditions: definition.searchConditions || [],
    gridColumns: definition.gridColumns,
    crudConfig: definition.crudConfig,
    crudColumns: definition.crudColumns,
  };

  // 템플릿 인스턴스
  const template = new SimpleGridCrudTemplate();

  log('\n📦 템플릿 정보:', 'cyan');
  log(`   - 유형: ${template.getScreenType()}`);
  log(`   - 설명: ${template.getDescription()}`);

  // 컴포넌트 생성
  log('\n🔨 컴포넌트 생성 중...', 'yellow');
  const componentResult = await template.generateComponent(parsedData);

  if (componentResult.success) {
    log(`✅ 컴포넌트 생성 성공!`, 'green');
    log(`   - 파일: ${componentResult.fileName}`);
    log(`   - 경로: ${componentResult.filePath}`);
    log(`   - 코드 길이: ${componentResult.code.length} bytes`);

    // 컴포넌트 저장
    const componentDir = path.join(__dirname, '../generated/screens/temp', definition.screenId);
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }
    fs.writeFileSync(path.join(componentDir, componentResult.fileName), componentResult.code);
    log(`   ✅ 저장됨: ${path.join(componentDir, componentResult.fileName)}`, 'green');
  } else {
    log(`❌ 컴포넌트 생성 실패: ${componentResult.error}`, 'red');
  }

  // API 생성
  log('\n🔨 API 라우터 생성 중...', 'yellow');
  const apiResult = await template.generateApi(parsedData);

  if (apiResult.success) {
    log(`✅ API 생성 성공!`, 'green');
    log(`   - 경로: ${apiResult.routerPath}`);
    log(`   - 프로시저: ${apiResult.procedures.join(', ')}`);
    log(`   - 코드 길이: ${apiResult.routerCode.length} bytes`);

    // API 저장
    const apiDir = path.dirname(path.join(__dirname, '..', apiResult.routerPath));
    if (!fs.existsSync(apiDir)) {
      fs.mkdirSync(apiDir, { recursive: true });
    }
    fs.writeFileSync(path.join(__dirname, '..', apiResult.routerPath), apiResult.routerCode);
    log(`   ✅ 저장됨: ${apiResult.routerPath}`, 'green');
  } else {
    log(`❌ API 생성 실패: ${apiResult.error}`, 'red');
  }

  // 전체 화면 생성 (통합)
  log('\n🔨 전체 화면 생성 (통합) 중...', 'yellow');
  const screenResult = await template.generateScreen(parsedData);

  if (screenResult.success) {
    log(`✅ 전체 화면 생성 성공!`, 'green');
    log(`   - 화면 ID: ${screenResult.screenId}`);
    log(`   - 화면명: ${screenResult.screenName}`);
    log(`   - 생성 시간: ${screenResult.generationTime}ms`);
    if (screenResult.warnings.length > 0) {
      log(`   ⚠️ 경고: ${screenResult.warnings.join(', ')}`, 'yellow');
    }
  } else {
    log(`❌ 전체 화면 생성 실패`, 'red');
  }

  // 생성된 코드 미리보기
  if (componentResult.success) {
    log('\n📝 생성된 컴포넌트 코드 (처음 100줄):', 'cyan');
    log('─'.repeat(60), 'dim');
    const lines = componentResult.code.split('\n').slice(0, 100);
    lines.forEach((line, i) => {
      log(`${String(i + 1).padStart(3, ' ')} │ ${line}`, 'dim');
    });
    if (componentResult.code.split('\n').length > 100) {
      log('... (생략됨)', 'dim');
    }
    log('─'.repeat(60), 'dim');
  }

  log('\n========================================', 'cyan');
  log('  테스트 완료!', 'cyan');
  log('========================================\n', 'cyan');
}

main().catch((error) => {
  console.error('오류 발생:', error);
  process.exit(1);
});

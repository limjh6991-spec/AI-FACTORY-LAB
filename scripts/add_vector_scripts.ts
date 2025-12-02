#!/usr/bin/env tsx
/**
 * 🤖 JARVIS - NPM 스크립트 추가 헬퍼
 * 
 * Vector DB 관련 스크립트를 package.json에 추가
 */

import * as fs from 'fs';
import * as path from 'path';

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Vector DB 스크립트 추가
packageJson.scripts = {
  ...packageJson.scripts,
  'vector:setup': 'tsx scripts/setup_vector_db.ts',
  'vector:test': 'tsx scripts/test_vector_search.ts',
  'vector:start': 'docker compose -f docker-compose.vector.yml up -d',
  'vector:stop': 'docker compose -f docker-compose.vector.yml down',
  'vector:logs': 'docker compose -f docker-compose.vector.yml logs -f',
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('✅ package.json에 Vector DB 스크립트 추가 완료!');
console.log('\n사용 가능한 명령어:');
console.log('  npm run vector:start  - Vector DB 시작');
console.log('  npm run vector:setup  - 리소스 벡터화');
console.log('  npm run vector:test   - 검색 테스트');
console.log('  npm run vector:stop   - Vector DB 중지');
console.log('  npm run vector:logs   - 로그 확인');

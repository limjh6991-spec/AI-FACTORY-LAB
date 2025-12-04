#!/usr/bin/env tsx
/**
 * 🔍 도우 원가시스템 화면/쿼리 추출 스크립트
 * 
 * 목적: dwisCOST 프로젝트에서 화면 정보와 SQL 쿼리를 추출하여 RAG 강화
 * 
 * 추출 대상:
 * 1. Vue 화면 파일 (메뉴명, 컴포넌트 구조)
 * 2. MyBatis XML 매퍼 (SQL 쿼리, 테이블/컬럼 정보)
 */

import * as fs from 'fs';
import * as path from 'path';

const DWIS_ROOT = '/home/roarm_m3/dwisCOST';
const OUTPUT_DIR = '/home/roarm_m3/ai-factory-lab/data/dwis_metadata';

// ============================================================================
// 타입 정의
// ============================================================================

interface ScreenInfo {
  screenId: string;        // C0001004
  screenName: string;      // 원가기준정보
  menuPath: string;        // 기준정보 > 원가기준정보
  vueFile: string;         // 경로
  tabs?: string[];         // 탭 목록
  description?: string;    // 설명
}

interface QueryInfo {
  mapperId: string;        // C0001004
  queryId: string;         // selectTab1GridData
  queryType: string;       // select/insert/update/delete
  tables: string[];        // 사용 테이블
  columns: string[];       // 사용 컬럼
  sql: string;             // 원본 SQL
  description?: string;    // 설명
}

interface ScreenQueryMapping {
  screen: ScreenInfo;
  queries: QueryInfo[];
}

// ============================================================================
// Vue 화면 파싱
// ============================================================================

function parseVueFile(filePath: string): ScreenInfo | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.vue');
    
    // 첫 번째 주석에서 메뉴 경로 추출
    const menuPathMatch = content.match(/<!--\s*(.+?)\s*-->/);
    const menuPath = menuPathMatch && menuPathMatch[1] ? menuPathMatch[1].trim() : '';
    
    // name 속성에서 화면 ID 추출
    const nameMatch = content.match(/name:\s*["']?DW_(\w+)["']?/);
    const screenId: string = nameMatch && nameMatch[1] ? nameMatch[1] : fileName;
    
    // 탭 추출
    const tabMatches = content.matchAll(/#tab-content-(\w+)/g);
    const tabs: string[] = Array.from(tabMatches).map(m => m[1]).filter((t): t is string => t !== undefined);
    
    // 컴포넌트에서 설명 추출
    const descMatch = content.match(/<!--\s*Tab\s*\d+\s*(.+?)\s*-->/g);
    const tabDescriptions = descMatch ? descMatch.map(d => d.replace(/<!--\s*Tab\s*\d+\s*/, '').replace('-->', '').trim()) : [];
    
    const screenName = menuPath.split('>').pop()?.trim() || screenId;
    
    return {
      screenId,
      screenName,
      menuPath,
      vueFile: filePath,
      tabs: tabs.length > 0 ? tabs : undefined,
      description: tabDescriptions.length > 0 ? tabDescriptions.join(', ') : undefined
    };
  } catch (error) {
    console.error(`❌ Vue 파일 파싱 실패: ${filePath}`, error);
    return null;
  }
}

// ============================================================================
// MyBatis XML 파싱
// ============================================================================

function parseMapperXml(filePath: string): QueryInfo[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.xml');
    const queries: QueryInfo[] = [];
    
    // select/insert/update/delete 쿼리 추출
    const queryTypes = ['select', 'insert', 'update', 'delete'];
    
    for (const queryType of queryTypes) {
      const regex = new RegExp(`<${queryType}\\s+id="([^"]+)"[^>]*>([\\s\\S]*?)</${queryType}>`, 'gi');
      let match;
      
      while ((match = regex.exec(content)) !== null) {
        const queryId: string = match[1] || 'unknown';
        const sqlContent: string = match[2] || '';
        
        if (!sqlContent) continue;
        
        // SQL 정제 (MyBatis 태그 제거)
        const cleanSql = sqlContent
          .replace(/<if[^>]*>[\s\S]*?<\/if>/gi, '')
          .replace(/<choose>[\s\S]*?<\/choose>/gi, '')
          .replace(/<where>/gi, 'WHERE')
          .replace(/<\/where>/gi, '')
          .replace(/<set>/gi, 'SET')
          .replace(/<\/set>/gi, '')
          .replace(/<trim[^>]*>[\s\S]*?<\/trim>/gi, '')
          .replace(/#{[\w.]+}/g, '?')
          .replace(/\$\{[\w.]+}/g, '?')
          .replace(/\s+/g, ' ')
          .trim();
        
        // 테이블 추출 (FROM, JOIN, INTO, UPDATE 뒤의 테이블명)
        const tableMatches = sqlContent.matchAll(/(?:FROM|JOIN|INTO|UPDATE)\s+([a-zA-Z_][\w]*)/gi);
        const tables = [...new Set(
          Array.from(tableMatches)
            .map(m => m[1])
            .filter((t): t is string => t !== undefined)
            .map(t => t.toLowerCase())
        )];
        
        // 컬럼 추출 (SELECT 절의 컬럼, SET 절의 컬럼)
        const columns: string[] = [];
        
        // SELECT 절 컬럼
        const selectMatch = sqlContent.match(/SELECT\s+([\s\S]*?)FROM/i);
        if (selectMatch && selectMatch[1]) {
          const selectColumns = selectMatch[1]
            .split(',')
            .map(c => c.trim())
            .map(c => c.split(/\s+(?:as\s+)?/i)[0])
            .filter((c): c is string => !!c && !c.includes('(') && !c.includes('*'));
          columns.push(...selectColumns);
        }
        
        queries.push({
          mapperId: fileName,
          queryId,
          queryType,
          tables,
          columns: [...new Set(columns)].slice(0, 20), // 상위 20개만
          sql: cleanSql.slice(0, 500), // 500자까지만
          description: `${queryType.toUpperCase()} 쿼리 (${tables.join(', ')})`
        });
      }
    }
    
    return queries;
  } catch (error) {
    console.error(`❌ XML 파일 파싱 실패: ${filePath}`, error);
    return [];
  }
}

// ============================================================================
// 메인 추출 함수
// ============================================================================

async function extractScreenAndQueries(): Promise<void> {
  console.log('='.repeat(70));
  console.log('🔍 도우 원가시스템 화면/쿼리 추출 시작');
  console.log('='.repeat(70));
  
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  const screenQueryMappings: ScreenQueryMapping[] = [];
  const allScreens: ScreenInfo[] = [];
  const allQueries: QueryInfo[] = [];
  
  // 1. Vue 화면 파일 검색
  console.log('\n📱 Vue 화면 파일 추출 중...');
  const vueDir = path.join(DWIS_ROOT, 'src/main/vue/src/views/web');
  const vueFolders = fs.readdirSync(vueDir).filter(f => fs.statSync(path.join(vueDir, f)).isDirectory());
  
  for (const folder of vueFolders) {
    const folderPath = path.join(vueDir, folder);
    const vueFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.vue') && f.match(/^[CM]\d+\.vue$/i));
    
    for (const vueFile of vueFiles) {
      const screen = parseVueFile(path.join(folderPath, vueFile));
      if (screen) {
        allScreens.push(screen);
        console.log(`  ✅ ${screen.screenId}: ${screen.menuPath}`);
      }
    }
  }
  
  // 2. MyBatis XML 매퍼 파일 검색
  console.log('\n📄 MyBatis 매퍼 파일 추출 중...');
  const mapperDir = path.join(DWIS_ROOT, 'src/main/resources/mapper/web');
  
  function findXmlFiles(dir: string): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        files.push(...findXmlFiles(fullPath));
      } else if (item.endsWith('.xml')) {
        files.push(fullPath);
      }
    }
    return files;
  }
  
  const xmlFiles = findXmlFiles(mapperDir);
  
  for (const xmlFile of xmlFiles) {
    const queries = parseMapperXml(xmlFile);
    if (queries.length > 0) {
      allQueries.push(...queries);
      console.log(`  ✅ ${path.basename(xmlFile)}: ${queries.length}개 쿼리`);
    }
  }
  
  // 3. 화면-쿼리 매핑
  console.log('\n🔗 화면-쿼리 매핑 중...');
  for (const screen of allScreens) {
    const relatedQueries = allQueries.filter(q => 
      q.mapperId.toUpperCase() === screen.screenId.toUpperCase()
    );
    
    if (relatedQueries.length > 0) {
      screenQueryMappings.push({
        screen,
        queries: relatedQueries
      });
    }
  }
  
  // 4. 결과 저장
  console.log('\n💾 결과 저장 중...');
  
  // 화면 정보 저장
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'screens.json'),
    JSON.stringify(allScreens, null, 2),
    'utf-8'
  );
  
  // 쿼리 정보 저장
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'queries.json'),
    JSON.stringify(allQueries, null, 2),
    'utf-8'
  );
  
  // 매핑 정보 저장
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'screen_query_mappings.json'),
    JSON.stringify(screenQueryMappings, null, 2),
    'utf-8'
  );
  
  // RAG용 통합 문서 생성
  const ragDocuments: string[] = [];
  
  for (const mapping of screenQueryMappings) {
    const doc = `
## 화면: ${mapping.screen.screenId} - ${mapping.screen.screenName}
메뉴경로: ${mapping.screen.menuPath}
${mapping.screen.tabs ? `탭: ${mapping.screen.tabs.join(', ')}` : ''}
${mapping.screen.description ? `설명: ${mapping.screen.description}` : ''}

### 관련 쿼리
${mapping.queries.map(q => `
#### ${q.queryId} (${q.queryType})
- 테이블: ${q.tables.join(', ')}
- 컬럼: ${q.columns.slice(0, 10).join(', ')}${q.columns.length > 10 ? '...' : ''}
- SQL: ${q.sql.slice(0, 200)}...
`).join('\n')}
`;
    ragDocuments.push(doc);
  }
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'rag_documents.md'),
    ragDocuments.join('\n---\n'),
    'utf-8'
  );
  
  // 5. 통계 출력
  console.log('\n' + '='.repeat(70));
  console.log('📊 추출 결과 통계');
  console.log('='.repeat(70));
  console.log(`  📱 화면: ${allScreens.length}개`);
  console.log(`  📄 쿼리: ${allQueries.length}개`);
  console.log(`  🔗 화면-쿼리 매핑: ${screenQueryMappings.length}개`);
  console.log(`\n📂 저장 위치: ${OUTPUT_DIR}`);
  console.log('  - screens.json');
  console.log('  - queries.json');
  console.log('  - screen_query_mappings.json');
  console.log('  - rag_documents.md');
  
  // 테이블별 사용 현황
  const tableUsage: Record<string, number> = {};
  for (const query of allQueries) {
    for (const table of query.tables) {
      tableUsage[table] = (tableUsage[table] || 0) + 1;
    }
  }
  
  const sortedTables = Object.entries(tableUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
  
  console.log('\n📊 가장 많이 사용되는 테이블 (Top 15):');
  for (const [table, count] of sortedTables) {
    console.log(`  - ${table}: ${count}회`);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ 추출 완료!');
  console.log('='.repeat(70));
}

extractScreenAndQueries().catch(console.error);

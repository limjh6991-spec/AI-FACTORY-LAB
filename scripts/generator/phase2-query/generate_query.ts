/**
 * Phase 2: SQL 쿼리 생성
 * 
 * 화면 정의 + 테이블 메타데이터 → SQL 쿼리 생성
 * 
 * 사용법:
 *   npx tsx scripts/generator/phase2-query/generate_query.ts SC123456
 */

import dotenv from 'dotenv';
dotenv.config({ override: true });

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// 설정
// ============================================================================

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY?.trim();
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const DEFINITION_DIR = path.join(process.cwd(), 'data/screen_definitions');
const QUERY_DIR = path.join(process.cwd(), 'data/generated_queries');
const DB_METADATA_FILE = path.join(process.cwd(), 'data/db_metadata.json');

// ============================================================================
// 타입 정의
// ============================================================================

interface ScreenDefinition {
  screenId: string;
  screenName: string;
  sheetName: string;
  sourceTables: string[];
  description: string;
  columns: ColumnDef[];
  searchFields: SearchField[];
  generatedAt: string;
}

interface ColumnDef {
  field: string;
  headerName: string;
  width: number;
  pinned?: 'left' | 'right';
  type?: 'string' | 'number';
}

interface SearchField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
}

interface TableMetadata {
  name: string;
  description?: string;
  columns: {
    name: string;
    type: string;
    description?: string;
  }[];
}

interface GeneratedQuery {
  screenId: string;
  screenName: string;
  sourceTables: string[];
  query: string;
  queryType: 'pivot' | 'simple' | 'aggregate';
  parameters: QueryParameter[];
  resultColumns: ResultColumn[];
  generatedAt: string;
}

interface QueryParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ResultColumn {
  field: string;
  alias: string;
  type: string;
}

// ============================================================================
// 테이블 메타데이터 로드
// ============================================================================

function loadTableMetadata(tableNames: string[]): TableMetadata[] {
  console.log('\n📋 테이블 메타데이터 로드...');
  
  const metaContent = fs.readFileSync(DB_METADATA_FILE, 'utf8');
  const allTables = JSON.parse(metaContent);
  
  // 배열 형태로 변환 (인덱스 기반 객체인 경우)
  const tablesArray = Array.isArray(allTables) ? allTables : Object.values(allTables);
  
  const result: TableMetadata[] = [];
  
  for (const tableName of tableNames) {
    const table = tablesArray.find((t: any) => 
      t.name?.toLowerCase() === tableName.toLowerCase()
    );
    
    if (table) {
      result.push({
        name: table.name,
        description: table.description,
        columns: table.columns || []
      });
      console.log(`  ✅ ${table.name}: ${table.columns?.length || 0}개 컬럼`);
    } else {
      console.log(`  ⚠️ ${tableName}: 메타데이터 없음`);
    }
  }
  
  return result;
}

// ============================================================================
// Claude API로 SQL 쿼리 생성
// ============================================================================

async function generateSQLQuery(
  definition: ScreenDefinition,
  tableMetadata: TableMetadata[]
): Promise<GeneratedQuery> {
  console.log('\n🤖 Claude API로 SQL 쿼리 생성 중...');
  
  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });
  
  const prompt = `당신은 PostgreSQL 쿼리 전문가입니다.

**작업**: 화면 정의와 테이블 메타데이터를 기반으로 SQL 쿼리를 생성하세요.

**화면 정보**:
- 화면ID: ${definition.screenId}
- 화면명: ${definition.screenName}
- 설명: ${definition.description}

**출력 컬럼** (화면에 표시할 데이터):
${definition.columns.map(c => `- ${c.headerName} (${c.type || 'string'})`).join('\n')}

**소스 테이블 메타데이터**:
${tableMetadata.map(t => `
테이블: ${t.name}
컬럼:
${t.columns.map(c => `  - ${c.name} (${c.type})`).join('\n')}
`).join('\n---\n')}

**화면 설명 분석**:
"${definition.description}"

이 설명에 따르면:
- 앞쪽 고정 컬럼: 구분, 계획, 합계
- 가로 방향 동적 컬럼: 부서별 데이터 (피벗)

**요구사항**:

1. **쿼리 유형 판단**:
   - 부서별/월별 등 가로 확장 필요 시: PIVOT 쿼리 (crosstab 또는 CASE WHEN)
   - 단순 조회: SELECT 쿼리
   - 집계: GROUP BY + SUM/COUNT

2. **파라미터**:
   - :yearMonth (기준년월, 필수)
   - :site (사업장, 선택)

3. **PostgreSQL 문법 사용**:
   - crosstab 함수 또는 CASE WHEN 피벗
   - 한글 컬럼명은 따옴표로 감싸기

4. **출력 형식** (JSON):
\`\`\`json
{
  "queryType": "pivot | simple | aggregate",
  "query": "SELECT ...",
  "parameters": [
    {"name": "yearMonth", "type": "string", "required": true, "description": "기준년월 (YYYYMM)"},
    {"name": "site", "type": "string", "required": false, "description": "사업장 코드"}
  ],
  "resultColumns": [
    {"field": "category", "alias": "구분", "type": "string"},
    {"field": "plan_amt", "alias": "계획", "type": "number"}
  ]
}
\`\`\`

**중요**: 
- 테이블 조인 관계를 파악해서 적절한 JOIN 사용
- doi_dept: 부서 마스터 (DEPT, DEPT_NAME)
- doi_acct_expen: 비용 데이터 (DEPT, ACCT, ACCT_AMT)
- 부서별 피벗은 CASE WHEN SUM() 또는 crosstab 사용

JSON 형식으로만 응답하세요.`;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }]
  });
  
  const content = response.content[0];
  if (!content || content.type !== 'text') {
    throw new Error('텍스트 응답이 아닙니다');
  }
  
  // JSON 추출
  let jsonText = content.text;
  const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1].trim();
  }
  
  const queryResult = JSON.parse(jsonText);
  
  console.log(`  ✅ 쿼리 생성 완료 (${queryResult.queryType})`);
  console.log(`  ✅ 파라미터: ${queryResult.parameters?.length || 0}개`);
  console.log(`  ✅ 결과 컬럼: ${queryResult.resultColumns?.length || 0}개`);
  
  return {
    screenId: definition.screenId,
    screenName: definition.screenName,
    sourceTables: definition.sourceTables,
    query: queryResult.query,
    queryType: queryResult.queryType,
    parameters: queryResult.parameters || [],
    resultColumns: queryResult.resultColumns || [],
    generatedAt: new Date().toISOString()
  };
}

// ============================================================================
// 메인 실행
// ============================================================================

async function main() {
  const screenId = process.argv[2];
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  Phase 2: SQL 쿼리 생성');
  console.log('═══════════════════════════════════════════════════════════');
  
  if (!screenId) {
    console.error('❌ 사용법: npx tsx scripts/generator/phase2-query/generate_query.ts <screenId>');
    console.error('   예시: npx tsx scripts/generator/phase2-query/generate_query.ts SC123456');
    process.exit(1);
  }
  
  if (!CLAUDE_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY가 설정되지 않았습니다.');
    process.exit(1);
  }
  
  try {
    // 1. 화면 정의 로드
    const defPath = path.join(DEFINITION_DIR, `${screenId}_definition.json`);
    if (!fs.existsSync(defPath)) {
      console.error(`❌ 화면 정의 파일을 찾을 수 없습니다: ${defPath}`);
      process.exit(1);
    }
    
    const definition: ScreenDefinition = JSON.parse(fs.readFileSync(defPath, 'utf8'));
    console.log(`\n📖 화면 정의 로드: ${definition.screenName}`);
    console.log(`  소스 테이블: ${definition.sourceTables.join(', ')}`);
    
    // 2. 테이블 메타데이터 로드
    const tableMetadata = loadTableMetadata(definition.sourceTables);
    
    // 3. SQL 쿼리 생성
    const generatedQuery = await generateSQLQuery(definition, tableMetadata);
    
    // 4. 쿼리 파일 저장
    if (!fs.existsSync(QUERY_DIR)) {
      fs.mkdirSync(QUERY_DIR, { recursive: true });
    }
    const queryPath = path.join(QUERY_DIR, `${screenId}_query.json`);
    fs.writeFileSync(queryPath, JSON.stringify(generatedQuery, null, 2));
    
    // 5. SQL 파일도 별도 저장 (가독성)
    const sqlPath = path.join(QUERY_DIR, `${screenId}_query.sql`);
    fs.writeFileSync(sqlPath, `-- ${definition.screenName}\n-- Generated: ${generatedQuery.generatedAt}\n\n${generatedQuery.query}`);
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('  ✅ Phase 2 완료!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  📁 쿼리 JSON: ${queryPath}`);
    console.log(`  📁 쿼리 SQL: ${sqlPath}`);
    console.log(`  📊 쿼리 유형: ${generatedQuery.queryType}`);
    console.log(`\n  📌 생성된 쿼리 미리보기:`);
    console.log('  ' + '-'.repeat(50));
    console.log(generatedQuery.query.split('\n').map(l => '  ' + l).join('\n').slice(0, 500) + '...');
    console.log(`\n  📌 다음 단계: Phase 3 - 화면 통합`);
    console.log(`     npx tsx scripts/generator/phase3-integration/integrate_screen.ts ${screenId}`);
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  }
}

main();

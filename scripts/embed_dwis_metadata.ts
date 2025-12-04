#!/usr/bin/env tsx
/**
 * 🔄 화면/쿼리 메타데이터 Vector DB 임베딩
 * 
 * 도우 원가시스템에서 추출한 화면 정보와 SQL 쿼리를
 * Chroma Vector DB에 임베딩하여 RAG 강화
 */

import { ChromaClient } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';  // 환경변수 로드

// ============================================================================
// 설정
// ============================================================================

const CHROMA_URL = 'http://localhost:8000';
const COLLECTION_NAME = 'db_metadata';
const DATA_DIR = '/home/roarm_m3/ai-factory-lab/data/dwis_metadata';

// Gemini 임베딩 설정
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
console.log(`🔑 Gemini API Key: ${GEMINI_API_KEY ? '설정됨 (' + GEMINI_API_KEY.slice(0, 10) + '...)' : '❌ 없음'}`);

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });

// ============================================================================
// 타입 정의
// ============================================================================

interface ScreenInfo {
  screenId: string;
  screenName: string;
  menuPath: string;
  vueFile: string;
  tabs?: string[];
  description?: string;
}

interface QueryInfo {
  mapperId: string;
  queryId: string;
  queryType: string;
  tables: string[];
  columns: string[];
  sql: string;
  description?: string;
}

interface ScreenQueryMapping {
  screen: ScreenInfo;
  queries: QueryInfo[];
}

// ============================================================================
// 임베딩 함수
// ============================================================================

async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('❌ 임베딩 생성 실패:', error);
    throw error;
  }
}

// 배치 임베딩 (Rate Limit 방지)
async function generateEmbeddingsBatch(texts: string[], batchSize: number = 10): Promise<number[][]> {
  const embeddings: number[][] = [];
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchEmbeddings = await Promise.all(batch.map(t => generateEmbedding(t)));
    embeddings.push(...batchEmbeddings);
    
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
    }
    
    console.log(`  📊 임베딩 진행: ${Math.min(i + batchSize, texts.length)}/${texts.length}`);
  }
  
  return embeddings;
}

// ============================================================================
// 문서 생성 함수
// ============================================================================

/**
 * doi_ 테이블을 사용하는 쿼리만 필터링하여 RAG 문서 생성
 */
function createDoiQueryDocuments(queries: QueryInfo[]): { id: string; document: string; metadata: Record<string, string> }[] {
  const documents: { id: string; document: string; metadata: Record<string, string> }[] = [];
  
  // doi_ 테이블을 사용하는 쿼리만 필터링
  const doiQueries = queries.filter(q => 
    q.tables.some(t => t.toLowerCase().startsWith('doi_'))
  );
  
  console.log(`  📊 doi_ 테이블 사용 쿼리: ${doiQueries.length}/${queries.length}개`);
  
  for (const query of doiQueries) {
    const doiTables = query.tables.filter(t => t.toLowerCase().startsWith('doi_'));
    
    const document = `
## SQL 쿼리 예시: ${query.queryId}
- 화면ID: ${query.mapperId}
- 쿼리유형: ${query.queryType.toUpperCase()}
- 테이블: ${doiTables.join(', ')}
- 컬럼: ${query.columns.slice(0, 15).join(', ')}
- 용도: ${query.description || ''}

### SQL
\`\`\`sql
${query.sql.slice(0, 400)}
\`\`\`

### 이 쿼리는 "${doiTables.join(', ')}" 테이블을 조회/조작합니다.
컬럼 매핑 시 ${doiTables.map(t => `"${t}" 테이블의 컬럼`).join(', ')}을 참고하세요.
`.trim();

    documents.push({
      id: `dwis_query_${query.mapperId}_${query.queryId}`,
      document,
      metadata: {
        type: 'query_example',
        screen_id: query.mapperId,
        query_id: query.queryId,
        query_type: query.queryType,
        tables: doiTables.join(','),
        source: 'dwisCOST'
      }
    });
  }
  
  return documents;
}

/**
 * 화면-테이블 매핑 정보 문서 생성
 */
function createScreenMappingDocuments(mappings: ScreenQueryMapping[]): { id: string; document: string; metadata: Record<string, string> }[] {
  const documents: { id: string; document: string; metadata: Record<string, string> }[] = [];
  
  for (const mapping of mappings) {
    // doi_ 테이블만 필터링
    const doiQueries = mapping.queries.filter(q => 
      q.tables.some(t => t.toLowerCase().startsWith('doi_'))
    );
    
    if (doiQueries.length === 0) continue;
    
    const allDoiTables = [...new Set(
      doiQueries.flatMap(q => q.tables.filter(t => t.toLowerCase().startsWith('doi_')))
    )];
    
    const allColumns = [...new Set(
      doiQueries.flatMap(q => q.columns)
    )].slice(0, 30);
    
    const document = `
## 화면: ${mapping.screen.screenId} - ${mapping.screen.screenName}
- 메뉴경로: ${mapping.screen.menuPath || '미지정'}
${mapping.screen.tabs ? `- 탭: ${mapping.screen.tabs.join(', ')}` : ''}
${mapping.screen.description ? `- 설명: ${mapping.screen.description}` : ''}

### 사용 테이블 (doi_)
${allDoiTables.map(t => `- ${t}`).join('\n')}

### 사용 컬럼
${allColumns.join(', ')}

### 이 화면은 원가시스템의 "${mapping.screen.screenName || mapping.screen.screenId}" 기능을 담당합니다.
- 관련 테이블: ${allDoiTables.join(', ')}
- 주요 컬럼: ${allColumns.slice(0, 10).join(', ')}
- Excel 매핑 시 이 화면과 유사한 데이터는 위 테이블/컬럼을 참조하세요.
`.trim();

    documents.push({
      id: `dwis_screen_${mapping.screen.screenId}`,
      document,
      metadata: {
        type: 'screen_mapping',
        screen_id: mapping.screen.screenId,
        screen_name: mapping.screen.screenName || '',
        menu_path: mapping.screen.menuPath || '',
        tables: allDoiTables.join(','),
        source: 'dwisCOST'
      }
    });
  }
  
  return documents;
}

/**
 * 테이블 사용 패턴 문서 생성
 */
function createTableUsageDocuments(queries: QueryInfo[]): { id: string; document: string; metadata: Record<string, string> }[] {
  const documents: { id: string; document: string; metadata: Record<string, string> }[] = [];
  
  // doi_ 테이블별 사용 현황 집계
  const tableUsage: Record<string, {
    columns: Set<string>;
    screens: Set<string>;
    queryTypes: Set<string>;
  }> = {};
  
  for (const query of queries) {
    for (const table of query.tables) {
      if (!table.toLowerCase().startsWith('doi_')) continue;
      
      if (!tableUsage[table]) {
        tableUsage[table] = {
          columns: new Set(),
          screens: new Set(),
          queryTypes: new Set()
        };
      }
      
      const tableData = tableUsage[table];
      if (tableData) {
        query.columns.forEach(c => tableData.columns.add(c));
        tableData.screens.add(query.mapperId);
        tableData.queryTypes.add(query.queryType);
      }
    }
  }
  
  for (const [table, usage] of Object.entries(tableUsage)) {
    const columns = [...usage.columns].slice(0, 30);
    const screens = [...usage.screens];
    
    const document = `
## 테이블 사용 패턴: ${table}
- 사용 화면: ${screens.join(', ')}
- 쿼리 유형: ${[...usage.queryTypes].join(', ')}

### 자주 사용되는 컬럼
${columns.join(', ')}

### 이 테이블은 원가시스템에서 ${screens.length}개 화면에서 사용됩니다.
- 컬럼 매핑 시 "${table}" 테이블의 컬럼을 참조하세요.
- 주요 컬럼: ${columns.slice(0, 10).join(', ')}
`.trim();

    documents.push({
      id: `dwis_table_usage_${table}`,
      document,
      metadata: {
        type: 'table_usage',
        table_name: table,
        screens: screens.join(','),
        column_count: columns.length.toString(),
        source: 'dwisCOST'
      }
    });
  }
  
  return documents;
}

// ============================================================================
// 메인 함수
// ============================================================================

async function embedDwisMetadata(): Promise<void> {
  console.log('='.repeat(70));
  console.log('🔄 도우 원가시스템 메타데이터 Vector DB 임베딩');
  console.log('='.repeat(70));
  
  // 1. 데이터 로드
  console.log('\n📂 데이터 로드 중...');
  
  const queries: QueryInfo[] = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'queries.json'), 'utf-8')
  );
  
  const mappings: ScreenQueryMapping[] = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'screen_query_mappings.json'), 'utf-8')
  );
  
  console.log(`  📄 쿼리: ${queries.length}개`);
  console.log(`  🔗 화면-쿼리 매핑: ${mappings.length}개`);
  
  // 2. RAG 문서 생성
  console.log('\n📝 RAG 문서 생성 중...');
  
  const queryDocs = createDoiQueryDocuments(queries);
  console.log(`  📄 쿼리 문서: ${queryDocs.length}개`);
  
  const screenDocs = createScreenMappingDocuments(mappings);
  console.log(`  📱 화면 매핑 문서: ${screenDocs.length}개`);
  
  const tableDocs = createTableUsageDocuments(queries);
  console.log(`  📊 테이블 사용 패턴 문서: ${tableDocs.length}개`);
  
  const allDocs = [...queryDocs, ...screenDocs, ...tableDocs];
  console.log(`\n  📚 총 문서: ${allDocs.length}개`);
  
  if (allDocs.length === 0) {
    console.log('⚠️ doi_ 테이블 관련 문서가 없습니다.');
    return;
  }
  
  // 3. Chroma 연결
  console.log('\n🔗 Chroma Vector DB 연결 중...');
  const client = new ChromaClient({ path: CHROMA_URL });
  
  // 기존 컬렉션 가져오기 또는 생성
  let collection;
  try {
    collection = await client.getOrCreateCollection({
      name: COLLECTION_NAME,
      metadata: { 'hnsw:space': 'cosine' }
    });
    console.log(`  ✅ 컬렉션 "${COLLECTION_NAME}" 연결됨`);
    
    // 기존 dwis 문서 삭제 (업데이트를 위해)
    const existingDocs = await collection.get({
      where: { source: 'dwisCOST' }
    });
    
    if (existingDocs.ids.length > 0) {
      console.log(`  🗑️ 기존 dwisCOST 문서 ${existingDocs.ids.length}개 삭제 중...`);
      await collection.delete({ ids: existingDocs.ids });
    }
    
  } catch (error) {
    console.error('❌ Chroma 연결 실패:', error);
    throw error;
  }
  
  // 4. 임베딩 생성 및 저장
  console.log('\n📊 임베딩 생성 중...');
  
  const texts = allDocs.map(d => d.document);
  const embeddings = await generateEmbeddingsBatch(texts, 10);
  
  console.log('\n💾 Vector DB에 저장 중...');
  
  await collection.add({
    ids: allDocs.map(d => d.id),
    documents: texts,
    metadatas: allDocs.map(d => d.metadata),
    embeddings
  });
  
  // 5. 검증
  console.log('\n✅ 검증 중...');
  const count = await collection.count();
  console.log(`  📊 총 문서 수: ${count}개`);
  
  // 6. 샘플 검색 테스트
  console.log('\n🔍 샘플 검색 테스트...');
  const testQuery = '계정과목 원가 부서별';
  const testEmbedding = await generateEmbedding(testQuery);
  
  const results = await collection.query({
    queryEmbeddings: [testEmbedding],
    nResults: 3,
    where: { source: 'dwisCOST' }
  });
  
  console.log(`\n  검색어: "${testQuery}"`);
  if (results.documents && results.documents[0]) {
    results.documents[0].forEach((doc, i) => {
      const metadata = results.metadatas?.[0]?.[i] as Record<string, string> | undefined;
      const resultId = results.ids[0]?.[i] || 'unknown';
      console.log(`\n  [${i + 1}] ${metadata?.type || 'unknown'}`);
      console.log(`      ID: ${resultId}`);
      console.log(`      테이블: ${metadata?.tables || '-'}`);
      console.log(`      내용: ${doc?.slice(0, 100)}...`);
    });
  }
  
  // 7. 통계 출력
  console.log('\n' + '='.repeat(70));
  console.log('📊 임베딩 완료 통계');
  console.log('='.repeat(70));
  console.log(`  📄 쿼리 문서: ${queryDocs.length}개`);
  console.log(`  📱 화면 매핑 문서: ${screenDocs.length}개`);
  console.log(`  📊 테이블 사용 패턴 문서: ${tableDocs.length}개`);
  console.log(`  📚 총 추가 문서: ${allDocs.length}개`);
  console.log(`  🗄️ Vector DB 총 문서: ${count}개`);
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ RAG 강화 완료!');
  console.log('='.repeat(70));
}

embedDwisMetadata().catch(console.error);

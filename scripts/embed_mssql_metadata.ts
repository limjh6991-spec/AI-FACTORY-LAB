#!/usr/bin/env tsx
/**
 * 🔄 MSSQL doi_ 테이블 메타데이터 Vector DB 임베딩
 * 
 * MSSQL에서 수집한 doi_ 테이블 정보를 Vector DB에 추가하여 RAG 강화
 */

import { ChromaClient } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// ============================================================================
// 설정
// ============================================================================

const CHROMA_URL = 'http://localhost:8000';
const COLLECTION_NAME = 'db_metadata';
const DATA_DIR = '/home/roarm_m3/ai-factory-lab/data/mssql_metadata';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
console.log(`🔑 Gemini API Key: ${GEMINI_API_KEY ? '설정됨' : '❌ 없음'}`);

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });

// ============================================================================
// 타입 정의
// ============================================================================

interface ColumnInfo {
  name: string;
  type: string;
  maxLength: number | null;
  nullable: boolean;
  isPrimaryKey: boolean;
}

interface TableInfo {
  name: string;
  schema: string;
  columns: ColumnInfo[];
}

// ============================================================================
// 임베딩 함수
// ============================================================================

async function generateEmbedding(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

async function generateEmbeddingsBatch(texts: string[], batchSize: number = 10): Promise<number[][]> {
  const embeddings: number[][] = [];
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchEmbeddings = await Promise.all(batch.map(t => generateEmbedding(t)));
    embeddings.push(...batchEmbeddings);
    
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`  📊 임베딩 진행: ${Math.min(i + batchSize, texts.length)}/${texts.length}`);
  }
  
  return embeddings;
}

// ============================================================================
// RAG 문서 생성
// ============================================================================

function createTableDocuments(tables: TableInfo[]): { id: string; document: string; metadata: Record<string, string> }[] {
  const documents: { id: string; document: string; metadata: Record<string, string> }[] = [];
  
  for (const table of tables) {
    const tableName = table.name.toLowerCase();
    
    // 테이블 유형 판단
    let tableType = '일반';
    if (tableName.includes('_mast')) tableType = '마스터';
    else if (tableName.includes('_cost')) tableType = '원가';
    else if (tableName.includes('_dept')) tableType = '부서';
    else if (tableName.includes('_acct')) tableType = '계정';
    else if (tableName.includes('_bom')) tableType = 'BOM';
    else if (tableName.includes('_prod')) tableType = '생산';
    else if (tableName.includes('_sale')) tableType = '판매';
    else if (tableName.includes('_stock')) tableType = '재고';
    else if (tableName.includes('_subul')) tableType = '수불';
    else if (tableName.includes('_model')) tableType = '제품/모델';
    else if (tableName.includes('_mat')) tableType = '자재';
    else if (tableName.includes('_expen')) tableType = '비용/경비';
    
    const pkColumns = table.columns.filter(c => c.isPrimaryKey);
    const columns = table.columns;
    
    const document = `
## 테이블: ${table.name}
- 스키마: ${table.schema}
- 유형: ${tableType}
- 컬럼 수: ${columns.length}개
${pkColumns.length > 0 ? `- PK: ${pkColumns.map(c => c.name).join(', ')}` : ''}

### 컬럼 목록
${columns.map(c => `- ${c.isPrimaryKey ? '🔑 ' : ''}${c.name}: ${c.type}${c.maxLength ? `(${c.maxLength})` : ''} ${c.nullable ? 'NULL' : 'NOT NULL'}`).join('\n')}

### 이 테이블은 "${tableType}" 유형의 데이터를 저장합니다.
- 테이블명: ${table.name}
- Excel 컬럼 매핑 시 ${tableType} 관련 데이터는 이 테이블을 참조하세요.
`.trim();

    documents.push({
      id: `mssql_table_${tableName}`,
      document,
      metadata: {
        type: 'mssql_table',
        table_name: table.name,
        table_type: tableType,
        column_count: columns.length.toString(),
        source: 'MSSQL'
      }
    });
  }
  
  return documents;
}

// ============================================================================
// 메인 함수
// ============================================================================

async function embedMssqlMetadata(): Promise<void> {
  console.log('='.repeat(70));
  console.log('🔄 MSSQL doi_ 테이블 Vector DB 임베딩');
  console.log('='.repeat(70));
  
  // 1. 데이터 로드
  console.log('\n📂 데이터 로드 중...');
  
  const doiTablesPath = path.join(DATA_DIR, 'doi_tables.json');
  if (!fs.existsSync(doiTablesPath)) {
    console.error('❌ doi_tables.json 파일이 없습니다. collect_mssql_metadata.ts를 먼저 실행하세요.');
    return;
  }
  
  const doiTables: TableInfo[] = JSON.parse(fs.readFileSync(doiTablesPath, 'utf-8'));
  console.log(`  📋 doi_ 테이블: ${doiTables.length}개`);
  
  // 2. RAG 문서 생성
  console.log('\n📝 RAG 문서 생성 중...');
  const documents = createTableDocuments(doiTables);
  console.log(`  📚 생성된 문서: ${documents.length}개`);
  
  // 3. Chroma 연결
  console.log('\n🔗 Chroma Vector DB 연결 중...');
  const client = new ChromaClient({ path: CHROMA_URL });
  
  const collection = await client.getOrCreateCollection({
    name: COLLECTION_NAME,
    metadata: { 'hnsw:space': 'cosine' }
  });
  console.log(`  ✅ 컬렉션 "${COLLECTION_NAME}" 연결됨`);
  
  // 기존 MSSQL 문서 삭제
  try {
    const existingDocs = await collection.get({
      where: { source: 'MSSQL' }
    });
    
    if (existingDocs.ids.length > 0) {
      console.log(`  🗑️ 기존 MSSQL 문서 ${existingDocs.ids.length}개 삭제 중...`);
      await collection.delete({ ids: existingDocs.ids });
    }
  } catch {
    console.log('  ℹ️ 기존 MSSQL 문서 없음');
  }
  
  // 4. 임베딩 생성 및 저장
  console.log('\n📊 임베딩 생성 중...');
  
  const texts = documents.map(d => d.document);
  const embeddings = await generateEmbeddingsBatch(texts, 10);
  
  console.log('\n💾 Vector DB에 저장 중...');
  
  await collection.add({
    ids: documents.map(d => d.id),
    documents: texts,
    metadatas: documents.map(d => d.metadata),
    embeddings
  });
  
  // 5. 검증
  console.log('\n✅ 검증 중...');
  const count = await collection.count();
  console.log(`  📊 총 문서 수: ${count}개`);
  
  // 6. 샘플 검색 테스트
  console.log('\n🔍 샘플 검색 테스트...');
  const testQuery = '제품 모델 원가';
  const testEmbedding = await generateEmbedding(testQuery);
  
  const results = await collection.query({
    queryEmbeddings: [testEmbedding],
    nResults: 5,
    where: { source: 'MSSQL' }
  });
  
  console.log(`\n  검색어: "${testQuery}"`);
  if (results.documents && results.documents[0]) {
    results.documents[0].forEach((doc, i) => {
      const metadata = results.metadatas?.[0]?.[i] as Record<string, string> | undefined;
      console.log(`\n  [${i + 1}] ${metadata?.table_name || 'unknown'}`);
      console.log(`      유형: ${metadata?.table_type || '-'}`);
      console.log(`      내용: ${doc?.slice(0, 150)}...`);
    });
  }
  
  // 7. 통계 출력
  console.log('\n' + '='.repeat(70));
  console.log('📊 임베딩 완료 통계');
  console.log('='.repeat(70));
  console.log(`  📋 MSSQL doi_ 테이블: ${doiTables.length}개`);
  console.log(`  📚 추가된 문서: ${documents.length}개`);
  console.log(`  🗄️ Vector DB 총 문서: ${count}개`);
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ MSSQL RAG 강화 완료!');
  console.log('='.repeat(70));
}

embedMssqlMetadata().catch(console.error);

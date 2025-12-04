#!/usr/bin/env tsx
/**
 * 🔄 MSSQL dw_ 테이블 메타데이터 Vector DB 임베딩
 * 
 * MSSQL에서 수집한 dw_ 테이블(MES 시스템) 정보를 Vector DB에 추가하여 RAG 강화
 * - 공정, 생산, 불량, 설비 등 MES 관련 데이터 지원
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
// 테이블 유형 판단
// ============================================================================

function classifyDwTable(tableName: string): { type: string; keywords: string[] } {
  const name = tableName.toLowerCase();
  
  // MES 관련 키워드 매핑
  if (name.includes('공정')) return { type: '공정', keywords: ['공정', 'process', '라인', 'line'] };
  if (name.includes('생산')) return { type: '생산', keywords: ['생산', 'production', '실적', '일보'] };
  if (name.includes('불량')) return { type: '불량/품질', keywords: ['불량', 'defect', '품질', 'quality'] };
  if (name.includes('설비')) return { type: '설비', keywords: ['설비', 'equipment', 'PM', '호기'] };
  if (name.includes('모델')) return { type: '제품/모델', keywords: ['모델', 'model', '제품', 'product'] };
  if (name.includes('모니터링')) return { type: '모니터링', keywords: ['모니터링', 'monitoring', '현황'] };
  if (name.includes('수율')) return { type: '수율', keywords: ['수율', 'yield', '효율'] };
  if (name.includes('작업')) return { type: '작업', keywords: ['작업', 'work', 'task', '이력'] };
  if (name.includes('재고')) return { type: '재고', keywords: ['재고', 'stock', 'inventory'] };
  if (name.includes('출하')) return { type: '출하', keywords: ['출하', 'shipment', '완료'] };
  if (name.includes('검사')) return { type: '검사', keywords: ['검사', 'inspection', '검증'] };
  if (name.includes('lot') || name.includes('로트')) return { type: 'LOT관리', keywords: ['lot', '로트', 'batch'] };
  if (name.includes('자재') || name.includes('mat')) return { type: '자재', keywords: ['자재', 'material', 'mat'] };
  if (name.includes('카세트') || name.includes('cassette')) return { type: '카세트', keywords: ['카세트', 'cassette', 'tray'] };
  
  return { type: 'MES일반', keywords: ['MES', '제조', 'manufacturing'] };
}

// ============================================================================
// RAG 문서 생성
// ============================================================================

function createDwTableDocuments(tables: TableInfo[]): { id: string; document: string; metadata: Record<string, string> }[] {
  const documents: { id: string; document: string; metadata: Record<string, string> }[] = [];
  
  for (const table of tables) {
    const tableName = table.name.toLowerCase();
    
    // new_ 제외
    if (tableName.startsWith('new_')) continue;
    
    const { type, keywords } = classifyDwTable(table.name);
    const pkColumns = table.columns.filter(c => c.isPrimaryKey);
    const columns = table.columns;
    
    // 주요 컬럼 추출 (PK + 상위 15개)
    const keyColumns = [
      ...pkColumns,
      ...columns.filter(c => !c.isPrimaryKey).slice(0, 15)
    ];
    
    const document = `
## MES 테이블: ${table.name}
- 스키마: ${table.schema}
- 유형: ${type}
- 컬럼 수: ${columns.length}개
- 관련 키워드: ${keywords.join(', ')}
${pkColumns.length > 0 ? `- PK: ${pkColumns.map(c => c.name).join(', ')}` : ''}

### 주요 컬럼
${keyColumns.map(c => `- ${c.isPrimaryKey ? '🔑 ' : ''}${c.name}: ${c.type}${c.maxLength ? `(${c.maxLength})` : ''}`).join('\n')}

### 이 테이블은 MES(제조실행시스템)의 "${type}" 데이터를 저장합니다.
- 테이블명: ${table.name}
- ${type} 관련 Excel 데이터 매핑 시 이 테이블을 참조하세요.
- 키워드: ${keywords.join(', ')}
`.trim();

    documents.push({
      id: `mssql_dw_${Buffer.from(table.name).toString('base64').replace(/[^a-zA-Z0-9]/g, '')}`,
      document,
      metadata: {
        type: 'mssql_dw_table',
        table_name: table.name,
        table_type: type,
        keywords: keywords.join(','),
        column_count: columns.length.toString(),
        source: 'MSSQL_DW'
      }
    });
  }
  
  return documents;
}

// ============================================================================
// 메인 함수
// ============================================================================

async function embedDwMetadata(): Promise<void> {
  console.log('='.repeat(70));
  console.log('🔄 MSSQL dw_ 테이블 (MES) Vector DB 임베딩');
  console.log('='.repeat(70));
  
  // 1. 데이터 로드
  console.log('\n📂 데이터 로드 중...');
  
  const allTablesPath = path.join(DATA_DIR, 'all_tables.json');
  if (!fs.existsSync(allTablesPath)) {
    console.error('❌ all_tables.json 파일이 없습니다. collect_mssql_metadata.ts를 먼저 실행하세요.');
    return;
  }
  
  const allTables: TableInfo[] = JSON.parse(fs.readFileSync(allTablesPath, 'utf-8'));
  
  // dw_ 테이블만 필터링 (new_ 제외)
  const dwTables = allTables.filter(t => 
    t.name.toLowerCase().startsWith('dw_') && 
    !t.name.toLowerCase().startsWith('new_')
  );
  
  console.log(`  📋 dw_ 테이블: ${dwTables.length}개`);
  
  // 테이블 유형별 통계
  const typeStats: Record<string, number> = {};
  dwTables.forEach(t => {
    const { type } = classifyDwTable(t.name);
    typeStats[type] = (typeStats[type] || 0) + 1;
  });
  
  console.log('\n📊 테이블 유형별 분포:');
  Object.entries(typeStats).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}개`);
  });
  
  // 2. RAG 문서 생성
  console.log('\n📝 RAG 문서 생성 중...');
  const documents = createDwTableDocuments(dwTables);
  console.log(`  📚 생성된 문서: ${documents.length}개`);
  
  // 3. Chroma 연결
  console.log('\n🔗 Chroma Vector DB 연결 중...');
  const client = new ChromaClient({ path: CHROMA_URL });
  
  const collection = await client.getOrCreateCollection({
    name: COLLECTION_NAME,
    metadata: { 'hnsw:space': 'cosine' }
  });
  console.log(`  ✅ 컬렉션 "${COLLECTION_NAME}" 연결됨`);
  
  // 기존 MSSQL_DW 문서 삭제
  try {
    const existingDocs = await collection.get({
      where: { source: 'MSSQL_DW' }
    });
    
    if (existingDocs.ids.length > 0) {
      console.log(`  🗑️ 기존 MSSQL_DW 문서 ${existingDocs.ids.length}개 삭제 중...`);
      await collection.delete({ ids: existingDocs.ids });
    }
  } catch {
    console.log('  ℹ️ 기존 MSSQL_DW 문서 없음');
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
  
  const testQueries = [
    '공정 생산 실적',
    '불량률 품질',
    '설비 가동'
  ];
  
  for (const testQuery of testQueries) {
    const testEmbedding = await generateEmbedding(testQuery);
    
    const results = await collection.query({
      queryEmbeddings: [testEmbedding],
      nResults: 3,
      where: { source: 'MSSQL_DW' }
    });
    
    console.log(`\n  검색어: "${testQuery}"`);
    if (results.documents && results.documents[0]) {
      results.documents[0].slice(0, 2).forEach((doc, i) => {
        const metadata = results.metadatas?.[0]?.[i] as Record<string, string> | undefined;
        console.log(`    [${i + 1}] ${metadata?.table_name || 'unknown'} (${metadata?.table_type || '-'})`);
      });
    }
  }
  
  // 7. 통계 출력
  console.log('\n' + '='.repeat(70));
  console.log('📊 임베딩 완료 통계');
  console.log('='.repeat(70));
  console.log(`  📋 MSSQL dw_ 테이블: ${dwTables.length}개`);
  console.log(`  📚 추가된 문서: ${documents.length}개`);
  console.log(`  🗄️ Vector DB 총 문서: ${count}개`);
  
  console.log('\n📊 테이블 유형별 분포:');
  Object.entries(typeStats).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}개`);
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ MES 테이블 RAG 강화 완료!');
  console.log('='.repeat(70));
}

embedDwMetadata().catch(console.error);

/**
 * 개선된 DB 메타데이터를 Vector DB에 재임베딩
 * 
 * 개선 사항:
 * 1. 시스템 컬럼 제외
 * 2. 동의어 포함
 * 3. 의미적 설명 포함
 * 4. 데이터 타입 분류 포함
 */

import 'dotenv/config';
import { ChromaClient } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const COLLECTION_NAME = 'db_metadata_v2';

async function reembedMetadata() {
  console.log('🔄 개선된 메타데이터 Vector DB 재임베딩 시작...\n');
  
  // 1. 개선된 청크 로드
  const chunksPath = path.join(process.cwd(), 'data', 'db_metadata_chunks.json');
  const chunks: { id: string; text: string; metadata: Record<string, any> }[] = 
    JSON.parse(fs.readFileSync(chunksPath, 'utf-8'));
  
  console.log(`📁 로드된 청크: ${chunks.length}개`);
  
  // 2. Chroma 클라이언트 연결
  const client = new ChromaClient({
    host: 'localhost',
    port: 8000,
  });
  
  // 3. 기존 컬렉션 삭제 (있으면)
  try {
    await client.deleteCollection({ name: COLLECTION_NAME });
    console.log(`🗑️  기존 컬렉션 '${COLLECTION_NAME}' 삭제`);
  } catch (e) {
    // 컬렉션이 없으면 무시
  }
  
  // 4. 새 컬렉션 생성
  const collection = await client.createCollection({
    name: COLLECTION_NAME,
    metadata: {
      description: '개선된 DB 메타데이터 (시스템 컬럼 제외, 동의어 포함)',
      version: '2.0',
      createdAt: new Date().toISOString(),
    },
  });
  console.log(`✅ 새 컬렉션 '${COLLECTION_NAME}' 생성`);
  
  // 5. Gemini 임베딩 생성
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  
  // 6. 배치 임베딩 (100개씩)
  const BATCH_SIZE = 100;
  let totalEmbedded = 0;
  
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    
    // 임베딩 생성
    const embeddings = await Promise.all(
      batch.map(async (chunk) => {
        const result = await embeddingModel.embedContent(chunk.text);
        return result.embedding.values;
      })
    );
    
    // Vector DB에 추가 (배열을 문자열로 변환, undefined 제거)
    const cleanMetadatas = batch.map(c => {
      const meta: Record<string, string | number | boolean | null> = {};
      for (const [key, value] of Object.entries(c.metadata)) {
        if (value === undefined || value === null) {
          continue;
        }
        if (Array.isArray(value)) {
          meta[key] = value.join(', ');
        } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          meta[key] = value;
        }
      }
      return meta;
    });
    
    await collection.add({
      ids: batch.map(c => c.id),
      documents: batch.map(c => c.text),
      embeddings: embeddings,
      metadatas: cleanMetadatas,
    });
    
    totalEmbedded += batch.length;
    console.log(`   임베딩 진행: ${totalEmbedded}/${chunks.length} (${Math.round(totalEmbedded/chunks.length*100)}%)`);
    
    // Rate limit 방지
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n✅ 총 ${totalEmbedded}개 청크 임베딩 완료!`);
  
  // 7. 검증 테스트
  console.log('\n📊 검증 테스트:');
  
  const testQueries = [
    '제품명',
    '부서코드',
    '원가',
    '작업일자',
    '수량',
  ];
  
  for (const query of testQueries) {
    const queryEmbedding = await embeddingModel.embedContent(query);
    
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding.embedding.values],
      nResults: 3,
      where: { type: 'column' }, // 컬럼만 검색
    });
    
    console.log(`\n🔍 "${query}" 검색 결과:`);
    results.documents?.[0]?.slice(0, 3).forEach((doc, idx) => {
      const meta = results.metadatas?.[0]?.[idx];
      console.log(`   ${idx + 1}. ${meta?.tableName}.${meta?.columnName} (${meta?.columnKoreanName})`);
      console.log(`      의미: ${meta?.meaning}`);
    });
  }
  
  return { totalEmbedded };
}

// 실행
reembedMetadata()
  .then(() => console.log('\n🎉 Vector DB 재임베딩 완료!'))
  .catch(console.error);

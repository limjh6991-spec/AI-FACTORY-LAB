#!/usr/bin/env tsx
import { ChromaClient } from 'chromadb';

async function main() {
  const client = new ChromaClient({ path: 'http://localhost:8000' });
  const collection = await client.getCollection({ name: 'db_metadata' });

  // 샘플 데이터 가져오기
  const sample = await collection.get({ limit: 10 });

  console.log('=== Vector DB 샘플 메타데이터 ===\n');
  sample.metadatas?.forEach((meta, i) => {
    console.log(`[${i+1}]`, JSON.stringify(meta, null, 2));
  });
  
  console.log('\n=== 총 문서 수 ===');
  console.log(`Total: ${sample.ids?.length || 0}개`);
}

main();

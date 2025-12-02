#!/usr/bin/env tsx
/**
 * 🔍 검색 결과 디버그 스크립트
 */

import 'dotenv/config';
import { ChromaClient } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function embedText(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

async function main() {
  const client = new ChromaClient({
    path: process.env.CHROMA_HOST || 'http://localhost:8000'
  });

  const collection = await client.getOrCreateCollection({
    name: 'db_metadata'
  });

  console.log('🔍 검색 쿼리: "부서코드"\n');
  
  const embedding = await embedText('부서코드 컬럼');
  const results = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 3
  });

  console.log('📊 검색 결과:\n');
  results.documents[0]?.forEach((doc, idx) => {
    console.log(`=== 결과 ${idx + 1} ===`);
    console.log(`거리: ${results.distances?.[0]?.[idx]}`);
    console.log(`유사도: ${Math.round((1 - (results.distances?.[0]?.[idx] || 1)) * 100)}%`);
    console.log(`메타데이터: ${JSON.stringify(results.metadatas[0]?.[idx], null, 2)}`);
    console.log(`문서 내용:\n${doc}\n`);
  });
}

main().catch(console.error);

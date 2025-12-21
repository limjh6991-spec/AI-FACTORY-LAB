#!/usr/bin/env tsx
/**
 * 🤖 JARVIS - DB 메타데이터 Vector DB 임베딩
 * 
 * Purpose: DB 테이블/컬럼 정보를 Vector DB에 저장하여 Excel 컬럼 매핑 지원
 * Strategy: 테이블별로 메타데이터를 청크로 분할하여 임베딩
 * 
 * Created: 2025-12-02
 */

import * as fs from 'fs';
import * as path from 'path';
import { ChromaClient } from 'chromadb';
import type { Collection } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

// ============================================================================
// 설정
// ============================================================================

const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const COLLECTION_NAME = 'db_metadata';
const METADATA_FILE = path.join(process.cwd(), 'data/db_metadata.json');

// ============================================================================
// 타입 정의
// ============================================================================

interface Column {
  name: string;
  korean_name: string;
  type: string;
  max_length: number | null;
  nullable: boolean;
}

interface Table {
  name: string;
  korean_name: string;
  columns: Column[];
  row_count?: number;
}

interface DBMetadataChunk {
  text: string;
  metadata: {
    type: 'table' | 'column_group';
    tableName: string;
    koreanTableName: string;
    columnCount?: number;
    rowCount?: number;
  };
}

// ============================================================================
// Gemini API 클라이언트
// ============================================================================

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * 텍스트 임베딩 생성
 */
async function embedText(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// ============================================================================
// DB 메타데이터 청크 생성
// ============================================================================

/**
 * DB 메타데이터를 검색 가능한 청크로 변환
 */
function createDBMetadataChunks(tables: Table[]): DBMetadataChunk[] {
  const chunks: DBMetadataChunk[] = [];

  for (const table of tables) {
    // 1. 테이블 전체 요약 청크
    const tableDescription = [
      `테이블: ${table.korean_name} (${table.name})`,
      `레코드 수: ${table.row_count || 0}개`,
      `컬럼 수: ${table.columns.length}개`,
      '',
      '컬럼 목록:',
      ...table.columns.map(col => 
        `- ${col.korean_name} (${col.name}): ${col.type}${col.max_length ? `(${col.max_length})` : ''}`
      )
    ].join('\n');

    chunks.push({
      text: tableDescription,
      metadata: {
        type: 'table',
        tableName: table.name,
        koreanTableName: table.korean_name,
        columnCount: table.columns.length,
        rowCount: table.row_count || 0
      }
    });

    // 2. 컬럼 그룹별 상세 청크 (5개씩 묶어서)
    const CHUNK_SIZE = 5;
    for (let i = 0; i < table.columns.length; i += CHUNK_SIZE) {
      const columnGroup = table.columns.slice(i, i + CHUNK_SIZE);
      
      const columnDetails = [
        `테이블: ${table.korean_name} (${table.name})`,
        '',
        '컬럼 상세:',
        ...columnGroup.map(col => {
          const parts = [
            `\n컬럼명: ${col.korean_name} (${col.name})`,
            `타입: ${col.type}`,
            col.max_length ? `길이: ${col.max_length}` : null,
            `필수: ${col.nullable ? '아니오' : '예'}`
          ].filter(Boolean);
          return parts.join('\n');
        })
      ].join('\n');

      chunks.push({
        text: columnDetails,
        metadata: {
          type: 'column_group',
          tableName: table.name,
          koreanTableName: table.korean_name,
          columnCount: columnGroup.length
        }
      });
    }

    // 3. 한글 컬럼명 검색용 청크
    const koreanSearchText = [
      `테이블: ${table.korean_name}`,
      '',
      '한글 컬럼명으로 검색:',
      ...table.columns.map(col => 
        `${col.korean_name} → ${col.name} (${col.type})`
      )
    ].join('\n');

    chunks.push({
      text: koreanSearchText,
      metadata: {
        type: 'column_group',
        tableName: table.name,
        koreanTableName: table.korean_name,
        columnCount: table.columns.length
      }
    });
  }

  return chunks;
}

// ============================================================================
// 메인 함수
// ============================================================================

async function main() {
  console.log('🤖 JARVIS DB 메타데이터 Vector DB 임베딩 시작...\n');

  // 1. DB 메타데이터 로드
  console.log('📄 DB 메타데이터 파일 로드 중...');
  
  if (!fs.existsSync(METADATA_FILE)) {
    throw new Error(`메타데이터 파일을 찾을 수 없습니다: ${METADATA_FILE}`);
  }

  const tables: Table[] = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  console.log(`✅ ${tables.length}개 테이블 메타데이터 로드 완료\n`);

  // 2. Chroma DB 연결
  console.log('📡 Chroma DB 연결 중...');
  const client = new ChromaClient({ path: CHROMA_URL });
  
  try {
    await client.heartbeat();
    console.log('✅ Chroma DB 연결 성공!\n');
  } catch (error) {
    throw new Error('Chroma DB에 연결할 수 없습니다. Docker 컨테이너를 확인하세요.');
  }

  // 3. 컬렉션 생성 또는 가져오기
  console.log('🗂️  컬렉션 설정 중...');
  
  let collection: Collection;
  try {
    // 기존 컬렉션 삭제
    try {
      await client.deleteCollection({ name: COLLECTION_NAME });
      console.log(`🗑️  기존 컬렉션 "${COLLECTION_NAME}" 삭제됨`);
    } catch {
      // 컬렉션이 없으면 무시
    }

    // 새 컬렉션 생성
    collection = await client.createCollection({
      name: COLLECTION_NAME,
      metadata: { description: 'Database table and column metadata for Excel column mapping' }
    });
    console.log(`✅ 컬렉션 "${COLLECTION_NAME}" 생성 완료!\n`);
  } catch (error) {
    throw new Error(`컬렉션 생성 실패: ${error}`);
  }

  // 4. 청크 생성
  console.log('📝 메타데이터 청크 생성 중...');
  const chunks = createDBMetadataChunks(tables);
  console.log(`✅ ${chunks.length}개 청크 생성 완료\n`);

  // 5. 임베딩 및 저장
  console.log('🔄 Vector DB에 임베딩 중...\n');
  
  let processed = 0;
  const batchSize = 10; // 배치 크기

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    
    // 병렬로 임베딩 생성
    const embeddings = await Promise.all(
      batch.map(chunk => embedText(chunk.text))
    );

    // 배치 저장
    await collection.add({
      ids: batch.map((_, idx) => `db_meta_${i + idx}`),
      embeddings: embeddings,
      documents: batch.map(chunk => chunk.text),
      metadatas: batch.map(chunk => chunk.metadata as any)
    });

    processed += batch.length;
    const progress = Math.round((processed / chunks.length) * 100);
    console.log(`  📊 진행률: ${processed}/${chunks.length} (${progress}%)`);
  }

  console.log('\n✅ 모든 청크 임베딩 완료!\n');

  // 6. 검증 테스트
  console.log('🔍 검색 테스트 중...\n');
  
  const testQueries = [
    '제품 관련 테이블',
    '원가 계산',
    '생산 실적',
    '부서 정보'
  ];

  for (const query of testQueries) {
    console.log(`질문: "${query}"`);
    
    const embedding = await embedText(query);
    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 3
    });

    if (results.documents && results.documents[0]) {
      results.documents[0].forEach((doc, idx) => {
        const metadata = results.metadatas?.[0]?.[idx];
        console.log(`  ${idx + 1}. [${metadata?.koreanTableName}] ${metadata?.tableName}`);
      });
    }
    console.log('');
  }

  // 7. 통계
  const count = await collection.count();
  console.log('\n============================================================');
  console.log('✨ DB 메타데이터 Vector DB 임베딩 완료!\n');
  console.log('📊 통계:');
  console.log(`  - 처리된 테이블: ${tables.length}`);
  console.log(`  - 생성된 청크: ${chunks.length}`);
  console.log(`  - Vector DB 문서 수: ${count}`);
  console.log(`  - 컬렉션: ${COLLECTION_NAME}`);
  console.log(`  - Chroma URL: ${CHROMA_URL}`);
  console.log('\n✅ DB 메타데이터를 활용한 Excel 컬럼 매핑 준비 완료! 🚀');
}

// 실행
main().catch(console.error);

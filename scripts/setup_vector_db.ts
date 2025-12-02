#!/usr/bin/env tsx
/**
 * 🤖 JARVIS - Project Resource Vectorization System
 * 
 * Purpose: 프로젝트 리소스를 Vector DB에 임베딩하여 맥락 유지 및 빠른 검색
 * Strategy: 문서별 청크 분할 → 임베딩 → Chroma 저장
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

const COLLECTION_NAME = 'ai_factory_resources';

// 벡터화할 리소스 경로
const RESOURCE_PATHS = [
  // 문서
  'docs/EXCEL_TO_SCREEN_TECHNICAL_ANALYSIS.md',
  'docs/RAG_IMPLEMENTATION_GUIDE.md',
  'docs/SESSION_SUMMARY_20251202.md',
  'docs/SESSION_SUMMARY_20251201.md',
  'PROJECT_ROADMAP.md',
  'ENVIRONMENT.md',
  'NEXT_ACTIONS.md',
  
  // 리소스
  'resources/excel/EXCEL_LIBRARIES_COMPARISON.md',
  'resources/excel/EXCEL_UPLOAD_DOWNLOAD_PATTERNS.md',
  'resources/excel/SCREEN_GENERATOR_TEMPLATE_SPEC.md',
  'resources/design-system/ENTERPRISE_DESIGN_PRINCIPLES.md',
  'resources/design-system/LAYOUT_GOLDEN_RATIO.md',
  
  // RealGrid 문서
  'resources/realgrid/docs/01_COLUMN_LAYOUT.md',
  'resources/realgrid/docs/02_CELL_MERGING.md',
  'resources/realgrid/docs/03_CHART_RENDERERS.md',
];

// 청크 설정
const CHUNK_SIZE = 1000; // 토큰 수 (대략 750 단어)
const CHUNK_OVERLAP = 200; // 오버랩 토큰 수

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * 마크다운 파일을 의미 단위로 청크 분할
 */
function splitMarkdownIntoChunks(
  content: string,
  metadata: { filePath: string }
): Array<{ text: string; metadata: any }> {
  const chunks: Array<{ text: string; metadata: any }> = [];
  
  // 1단계: 섹션 분할 (## 기준)
  const sections = content.split(/^##\s+/m).filter(s => s.trim());
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const lines = section.split('\n');
    const title = lines[0].trim();
    const body = lines.slice(1).join('\n').trim();
    
    // 섹션이 너무 크면 추가 분할
    if (body.length > CHUNK_SIZE * 4) {
      // 서브섹션 분할 (### 기준)
      const subsections = body.split(/^###\s+/m).filter(s => s.trim());
      
      for (let j = 0; j < subsections.length; j++) {
        const subsection = subsections[j];
        const subLines = subsection.split('\n');
        const subTitle = subLines[0].trim();
        const subBody = subLines.slice(1).join('\n').trim();
        
        chunks.push({
          text: `## ${title}\n### ${subTitle}\n\n${subBody}`,
          metadata: {
            ...metadata,
            section: title,
            subsection: subTitle,
            chunkIndex: chunks.length,
          },
        });
      }
    } else {
      chunks.push({
        text: `## ${title}\n\n${body}`,
        metadata: {
          ...metadata,
          section: title,
          chunkIndex: chunks.length,
        },
      });
    }
  }
  
  return chunks;
}

/**
 * Gemini를 사용한 텍스트 임베딩
 * (OpenAI API 없이 Gemini 임베딩 모델 사용)
 */
async function embedText(text: string): Promise<number[]> {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  
  const result = await model.embedContent(text);
  return result.embedding.values;
}

/**
 * 파일 읽기 및 메타데이터 추출
 */
function readFileWithMetadata(filePath: string): {
  content: string;
  metadata: any;
} {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  const stats = fs.statSync(fullPath);
  const metadata = {
    filePath,
    fileName: path.basename(filePath),
    directory: path.dirname(filePath),
    fileSize: stats.size,
    lastModified: stats.mtime.toISOString(),
    lineCount: content.split('\n').length,
  };
  
  return { content, metadata };
}

// ============================================================================
// 메인 함수
// ============================================================================

async function main() {
  console.log('🤖 JARVIS Vector DB Setup 시작...\n');
  
  // 1. Chroma 클라이언트 연결
  console.log('📡 Chroma DB 연결 중...');
  const client = new ChromaClient({ path: CHROMA_URL });
  
  try {
    await client.heartbeat();
    console.log('✅ Chroma DB 연결 성공!\n');
  } catch (error) {
    console.error('❌ Chroma DB 연결 실패!');
    console.error('다음 명령어로 Chroma를 실행하세요:');
    console.error('  docker run -p 8000:8000 chromadb/chroma\n');
    process.exit(1);
  }
  
  // 2. 컬렉션 생성 (기존 것이 있으면 삭제)
  console.log('🗂️  컬렉션 설정 중...');
  try {
    await client.deleteCollection({ name: COLLECTION_NAME });
    console.log('  - 기존 컬렉션 삭제됨');
  } catch (error) {
    // 컬렉션이 없으면 무시
  }
  
  const collection = await client.createCollection({
    name: COLLECTION_NAME,
    metadata: { description: 'AI Factory Lab 프로젝트 리소스' },
  });
  console.log(`✅ 컬렉션 "${COLLECTION_NAME}" 생성 완료!\n`);
  
  // 3. 각 리소스 파일 처리
  let totalChunks = 0;
  let processedFiles = 0;
  
  for (const filePath of RESOURCE_PATHS) {
    try {
      console.log(`📄 처리 중: ${filePath}`);
      
      // 파일 읽기
      const { content, metadata } = readFileWithMetadata(filePath);
      
      // 청크 분할
      const chunks = splitMarkdownIntoChunks(content, metadata);
      console.log(`  - ${chunks.length}개 청크 생성됨`);
      
      // 임베딩 생성 및 저장
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        
        // Gemini 임베딩
        const embedding = await embedText(chunk.text);
        
        // Chroma에 저장
        await collection.add({
          ids: [`${metadata.filePath}_chunk_${i}`],
          embeddings: [embedding],
          documents: [chunk.text],
          metadatas: [chunk.metadata],
        });
        
        // 진행 상황 표시
        if ((i + 1) % 5 === 0 || i === chunks.length - 1) {
          process.stdout.write(`  - 임베딩 진행: ${i + 1}/${chunks.length}\r`);
        }
      }
      
      console.log(`  ✅ 완료: ${chunks.length}개 청크 저장됨\n`);
      totalChunks += chunks.length;
      processedFiles++;
      
    } catch (error: any) {
      console.error(`  ❌ 오류: ${error.message}\n`);
    }
  }
  
  // 4. 요약
  console.log('\n' + '='.repeat(60));
  console.log('✨ Vector DB 설정 완료!\n');
  console.log(`📊 통계:`);
  console.log(`  - 처리된 파일: ${processedFiles}/${RESOURCE_PATHS.length}`);
  console.log(`  - 총 청크 수: ${totalChunks}`);
  console.log(`  - 컬렉션: ${COLLECTION_NAME}`);
  console.log(`  - Chroma URL: ${CHROMA_URL}\n`);
  
  // 5. 테스트 쿼리
  console.log('🔍 테스트 쿼리 실행 중...');
  const testQuery = 'Excel 파일을 분석하는 방법';
  const testEmbedding = await embedText(testQuery);
  
  const results = await collection.query({
    queryEmbeddings: [testEmbedding],
    nResults: 3,
  });
  
  console.log(`\n질문: "${testQuery}"`);
  console.log('\n관련 문서:');
  results.documents[0].forEach((doc, idx) => {
    const metadata = results.metadatas[0][idx];
    console.log(`\n${idx + 1}. [${metadata.fileName}] ${metadata.section || ''}`);
    console.log(`   ${doc.substring(0, 150)}...`);
  });
  
  console.log('\n✅ Vector DB 설정 및 테스트 완료! 🚀');
}

// ============================================================================
// 실행
// ============================================================================

main().catch((error) => {
  console.error('❌ 치명적 오류:', error);
  process.exit(1);
});

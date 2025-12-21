/**
 * 🤖 JARVIS - Vector Search Utility
 * 
 * Purpose: Vector DB를 활용한 프로젝트 리소스 검색
 * Usage: 작업 맥락 유지, 관련 문서 자동 검색
 * 
 * Created: 2025-12-02
 */

import 'dotenv/config';
import { ChromaClient } from 'chromadb';
import type { Collection } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================================================
// 설정
// ============================================================================

const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const COLLECTION_NAME = 'ai_factory_resources';

// ============================================================================
// Vector Search 클래스
// ============================================================================

export class VectorSearch {
  private client: ChromaClient;
  private collection: Collection | null = null;
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.client = new ChromaClient({ path: CHROMA_URL });
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }

  /**
   * 컬렉션 초기화
   */
  async initialize(): Promise<void> {
    try {
      this.collection = await this.client.getCollection({
        name: COLLECTION_NAME,
      });
      console.log('✅ Vector DB 연결 성공');
    } catch (error) {
      throw new Error(
        'Vector DB에 연결할 수 없습니다. setup_vector_db.ts를 먼저 실행하세요.'
      );
    }
  }

  /**
   * 텍스트 임베딩
   */
  private async embedText(text: string): Promise<number[]> {
    const model = this.genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  }

  /**
   * 의미론적 검색
   * 
   * @param query 검색 쿼리
   * @param topK 반환할 결과 수
   * @returns 관련 문서 및 메타데이터
   */
  async search(
    query: string,
    topK: number = 5
  ): Promise<Array<{
    document: string;
    metadata: any;
    score: number;
  }>> {
    if (!this.collection) {
      await this.initialize();
    }

    // 쿼리 임베딩
    const queryEmbedding = await this.embedText(query);

    // Vector 검색
    const results = await this.collection!.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
    });

    // 결과 포맷팅
    const docs = results.documents?.[0] ?? [];
    const formattedResults = docs.map((doc, idx) => ({
      document: doc ?? '',
      metadata: results.metadatas?.[0]?.[idx] ?? {},
      score: results.distances?.[0]?.[idx] ?? 0,
    }));

    return formattedResults;
  }

  /**
   * 필터링된 검색
   * 
   * @param query 검색 쿼리
   * @param filters 메타데이터 필터 (예: { directory: 'docs' })
   * @param topK 반환할 결과 수
   */
  async searchWithFilter(
    query: string,
    filters: Record<string, any>,
    topK: number = 5
  ) {
    if (!this.collection) {
      await this.initialize();
    }

    const queryEmbedding = await this.embedText(query);

    const results = await this.collection!.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
      where: filters,
    });

    const docs = results.documents?.[0] ?? [];
    return docs.map((doc, idx) => ({
      document: doc ?? '',
      metadata: results.metadatas?.[0]?.[idx] ?? {},
      score: results.distances?.[0]?.[idx] ?? 0,
    }));
  }

  /**
   * 맥락 기반 프롬프트 증강
   * 
   * @param userQuery 사용자 질문
   * @param topK 참고할 문서 수
   * @returns 증강된 프롬프트
   */
  async augmentPrompt(userQuery: string, topK: number = 3): Promise<string> {
    const relevantDocs = await this.search(userQuery, topK);

    let augmentedPrompt = `다음은 프로젝트 리소스에서 관련된 정보입니다:\n\n`;

    relevantDocs.forEach((result, idx) => {
      augmentedPrompt += `[참고 ${idx + 1}] ${result.metadata.fileName} - ${result.metadata.section || ''}\n`;
      augmentedPrompt += `${result.document.substring(0, 500)}...\n\n`;
    });

    augmentedPrompt += `\n사용자 질문: ${userQuery}\n\n`;
    augmentedPrompt += `위 참고 자료를 바탕으로 답변해주세요.`;

    return augmentedPrompt;
  }

  /**
   * 프로젝트 컨텍스트 요약
   * 
   * @param topic 주제 (예: "Excel 분석", "RAG 구현")
   * @returns 관련 맥락 요약
   */
  async getProjectContext(topic: string): Promise<string> {
    const docs = await this.search(topic, 5);

    let context = `📚 프로젝트 맥락 (주제: ${topic})\n\n`;

    docs.forEach((doc, idx) => {
      context += `${idx + 1}. [${doc.metadata.fileName}]\n`;
      context += `   섹션: ${doc.metadata.section || 'N/A'}\n`;
      context += `   ${doc.document.substring(0, 200)}...\n\n`;
    });

    return context;
  }

  /**
   * 통계 정보 조회
   */
  async getStats(): Promise<{
    totalDocuments: number;
    collections: string[];
  }> {
    if (!this.collection) {
      await this.initialize();
    }

    const count = await this.collection!.count();
    const collections = await this.client.listCollections();

    return {
      totalDocuments: count,
      collections: collections.map((c) => c.name),
    };
  }

  /**
   * DB 메타데이터 검색 (db_metadata 컬렉션 전용)
   * 
   * @param query 검색 쿼리
   * @param topK 반환할 결과 수
   * @returns DB 테이블/컬럼 관련 정보
   */
  async searchDBMetadata(
    query: string,
    topK: number = 10
  ): Promise<Array<{
    document: string;
    metadata: any;
    score: number;
  }>> {
    try {
      // db_metadata 컬렉션 가져오기
      const dbCollection = await this.client.getCollection({
        name: 'db_metadata',
      });

      // 쿼리 임베딩
      const queryEmbedding = await this.embedText(query);

      // Vector 검색
      const results = await dbCollection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: topK,
      });

      // 결과 포맷팅
      const formattedResults = (results.documents[0] || [])
        .map((doc, idx) => ({
          document: doc || '',
          metadata: (results.metadatas?.[0]?.[idx]) || {},
          score: (results.distances?.[0]?.[idx]) || 0,
        }))
        .filter(r => r.document !== '');

      return formattedResults;
    } catch (error) {
      console.error('DB 메타데이터 검색 실패:', error);
      throw new Error('db_metadata 컬렉션을 찾을 수 없습니다. embed_db_metadata.ts를 먼저 실행하세요.');
    }
  }
}

// ============================================================================
// 헬퍼 함수 (빠른 사용)
// ============================================================================

/**
 * 빠른 검색
 */
export async function quickSearch(query: string, topK: number = 3) {
  const vectorSearch = new VectorSearch();
  await vectorSearch.initialize();
  return await vectorSearch.search(query, topK);
}

/**
 * 맥락 증강 프롬프트 생성
 */
export async function createContextPrompt(userQuery: string) {
  const vectorSearch = new VectorSearch();
  await vectorSearch.initialize();
  return await vectorSearch.augmentPrompt(userQuery);
}

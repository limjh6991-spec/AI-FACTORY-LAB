/**
 * 🤖 JARVIS - DB 메타데이터 검색 유틸리티
 * 
 * Purpose: Excel 컬럼 → DB 컬럼 자동 매핑을 위한 검색
 * Usage: 한글 컬럼명을 입력하면 유사한 DB 컬럼 추천
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
const COLLECTION_NAME = 'db_metadata';

// ============================================================================
// 타입 정의
// ============================================================================

export interface TableSuggestion {
  tableName: string;
  koreanTableName: string;
  score: number;
  columnCount?: number;
  rowCount?: number;
}

export interface ColumnMapping {
  excelColumn: string;
  suggestedTable: string;
  suggestedColumn: string;
  confidence: number;
  reasoning: string;
}

// ============================================================================
// DB 메타데이터 검색 클래스
// ============================================================================

export class DBMetadataSearch {
  private client: ChromaClient;
  private collection: Collection | null = null;
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.client = new ChromaClient({ path: CHROMA_URL });
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }

  /**
   * 초기화
   */
  async initialize(): Promise<void> {
    try {
      this.collection = await this.client.getCollection({
        name: COLLECTION_NAME,
      });
    } catch (error) {
      throw new Error(
        'DB 메타데이터 컬렉션을 찾을 수 없습니다. embed_db_metadata.ts를 먼저 실행하세요.'
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
   * 테이블 검색
   * 
   * @param query 검색 쿼리 (예: "제품 정보", "원가 계산")
   * @param topK 반환할 결과 수
   */
  async searchTables(
    query: string,
    topK: number = 5
  ): Promise<TableSuggestion[]> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }

    const embedding = await this.embedText(query);
    
    const results = await this.collection.query({
      queryEmbeddings: [embedding],
      nResults: topK,
      where: { type: 'table' } // 테이블 요약만 검색
    });

    if (!results.documents?.[0] || !results.metadatas?.[0] || !results.distances?.[0]) {
      return [];
    }

    return results.metadatas[0].map((meta, idx) => ({
      tableName: (meta?.tableName as string) || '',
      koreanTableName: (meta?.koreanTableName as string) || '',
      score: 1 - (results.distances![0]![idx] || 0), // 거리 → 유사도 점수
      columnCount: meta?.columnCount as number,
      rowCount: meta?.rowCount as number
    }));
  }

  /**
   * Excel 컬럼과 정확히 일치하는 DB 컬럼 찾기 (키워드 기반)
   */
  private async findExactColumnMatch(excelColumn: string): Promise<ColumnMapping | null> {
    if (!this.collection) return null;

    // 모든 column_group 청크 가져오기
    const allChunks = await this.collection.get({
      where: { type: 'column_group' }
    });

    if (!allChunks.documents) return null;

    const normalizedExcel = excelColumn.toLowerCase().trim();

    // 각 청크에서 컬럼명 검색
    for (let i = 0; i < allChunks.documents.length; i++) {
      const doc = allChunks.documents[i];
      if (!doc) continue;

      // 패턴: "한글명 → 영문명 (타입)"
      const pattern = /([^→\n]+)\s*→\s*(\w+)\s*\(([^)]+)\)/g;
      let match;

      while ((match = pattern.exec(doc)) !== null) {
        if (!match[1] || !match[2]) continue;
        
        const koreanName = match[1].trim().toLowerCase();
        const englishName = match[2].trim();

        // 정확히 일치하면 즉시 반환
        if (koreanName === normalizedExcel) {
          const metadata = allChunks.metadatas?.[i] as { tableName: string; koreanTableName: string };
          return {
            excelColumn,
            suggestedTable: metadata.tableName,
            suggestedColumn: englishName,
            confidence: 100,
            reasoning: `"${excelColumn}"과(와) 정확히 일치하는 "${englishName}" 컬럼을 ${metadata.koreanTableName} 테이블에서 찾았습니다. (정확도: 100%)`
          };
        }

        // 부분 일치 (70% 이상)
        const similarity = this.calculateSimilarity(normalizedExcel, koreanName);
        if (similarity >= 0.7) {
          const metadata = allChunks.metadatas?.[i] as { tableName: string; koreanTableName: string };
          return {
            excelColumn,
            suggestedTable: metadata.tableName,
            suggestedColumn: englishName,
            confidence: Math.round(similarity * 100),
            reasoning: `"${excelColumn}"과(와) ${Math.round(similarity * 100)}% 유사한 "${englishName}" 컬럼을 ${metadata.koreanTableName} 테이블에서 찾았습니다.`
          };
        }
      }
    }

    return null;
  }

  /**
   * 컬럼 매핑 추천
   * 
   * @param excelColumns Excel 컬럼명 목록
   * @param contextDescription Excel 파일 설명 (선택)
   */
  async suggestColumnMappings(
    excelColumns: string[],
    contextDescription?: string
  ): Promise<ColumnMapping[]> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }

    const mappings: ColumnMapping[] = [];

    for (const excelColumn of excelColumns) {
      // 먼저 키워드 기반 검색 시도 (정확한 매칭)
      const exactMatch = await this.findExactColumnMatch(excelColumn);
      
      if (exactMatch) {
        mappings.push(exactMatch);
        continue;
      }

      // 정확한 매칭 실패 시 Vector Search 사용
      const searchQuery = contextDescription
        ? `${contextDescription} ${excelColumn} 컬럼`
        : `${excelColumn} 컬럼`;

      const embedding = await this.embedText(searchQuery);
      
      const results = await this.collection.query({
        queryEmbeddings: [embedding],
        nResults: 5,
        where: { type: 'column_group' } // 컬럼 정보가 있는 청크만
      });

      if (results.documents?.[0]?.[0] && results.metadatas?.[0]?.[0]) {
        const topResult = results.metadatas[0][0];
        const distance = results.distances?.[0]?.[0] || 1;
        const confidence = Math.round((1 - distance) * 100);

        // 문서 내용에서 가장 유사한 컬럼명 추출
        const doc = results.documents[0][0] || '';
        const suggestedColumn = this.extractBestColumn(doc, excelColumn);

        mappings.push({
          excelColumn,
          suggestedTable: (topResult.tableName as string) || '',
          suggestedColumn,
          confidence,
          reasoning: `"${excelColumn}"과(와) 유사한 "${suggestedColumn}" 컬럼을 ${topResult.koreanTableName} 테이블에서 찾았습니다. (신뢰도: ${confidence}%)`
        });
      }
    }

    return mappings;
  }

  /**
   * 청크에서 Excel 컬럼과 가장 유사한 DB 컬럼명 추출
   */
  private extractBestColumn(chunkText: string, excelColumn: string): string {
    // 패턴 1: "컬럼명: 한글명 (영문명)"
    const pattern1 = /컬럼명:\s*([^(]+)\s*\(([^)]+)\)/g;
    // 패턴 2: "한글명 → 영문명 (타입)"
    const pattern2 = /([^→\n]+)\s*→\s*(\w+)\s*\(([^)]+)\)/g;
    
    let bestMatch = 'unknown';
    let bestScore = 0;

    // 패턴 1 매칭
    let match: RegExpExecArray | null;
    while ((match = pattern1.exec(chunkText)) !== null) {
      if (!match[1] || !match[2]) continue;
      const koreanName = match[1].trim();
      const englishName = match[2].trim();
      const score = this.calculateSimilarity(excelColumn, koreanName);
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = englishName;
      }
    }

    // 패턴 2 매칭
    while ((match = pattern2.exec(chunkText)) !== null) {
      if (!match[1] || !match[2]) continue;
      const koreanName = match[1].trim();
      const englishName = match[2].trim();
      const score = this.calculateSimilarity(excelColumn, koreanName);
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = englishName;
      }
    }

    return bestMatch;
  }

  /**
   * 간단한 문자열 유사도 계산
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const norm1 = str1.toLowerCase().trim();
    const norm2 = str2.toLowerCase().trim();
    
    // 완전 일치
    if (norm1 === norm2) return 1.0;
    
    // 포함 관계
    if (norm1.includes(norm2) || norm2.includes(norm1)) return 0.8;
    
    // Jaccard similarity (문자 집합 기반)
    const set1 = new Set(norm1.split(''));
    const set2 = new Set(norm2.split(''));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  /**
   * 유사 테이블 찾기
   */
  async findSimilarTables(
    excelData: {
      headers: string[];
      sampleRows: any[];
    }
  ): Promise<TableSuggestion[]> {
    // Excel 헤더를 기반으로 테이블 추천
    const headerDescription = excelData.headers.join(', ');
    const query = `테이블 컬럼: ${headerDescription}`;
    
    return this.searchTables(query, 5);
  }
}

// ============================================================================
// 편의 함수
// ============================================================================

/**
 * 빠른 테이블 검색
 */
export async function quickSearchTable(query: string): Promise<TableSuggestion[]> {
  const searcher = new DBMetadataSearch();
  await searcher.initialize();
  return searcher.searchTables(query);
}

/**
 * 빠른 컬럼 매핑
 */
export async function quickMapColumns(
  excelColumns: string[],
  context?: string
): Promise<ColumnMapping[]> {
  const searcher = new DBMetadataSearch();
  await searcher.initialize();
  return searcher.suggestColumnMappings(excelColumns, context);
}

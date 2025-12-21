/**
 * 🤖 AGENT MAPPER - Gemini 기반 Excel→DB 자동 매핑
 * 
 * Purpose: Agent(Gemini)가 RAG 기반으로 Excel 컬럼을 DB 컬럼에 매핑
 * Architecture: Vector Search → Few-Shot Learning → Agent 추론
 * 
 * Created: 2025-12-03
 * Role: JARVIS = 인프라 제공, AGENT = 실제 추론
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

export interface AgentMappingResult {
  excelColumn: string;
  suggestedTable: string;
  suggestedColumn: string;
  confidence: number;
  reasoning: string;
  agentThinking?: string; // Agent의 사고 과정
}

export interface FewShotExample {
  excelColumn: string;
  dbTable: string;
  dbColumn: string;
  reason: string;
}

// ============================================================================
// Agent 매핑 클래스
// ============================================================================

export class AgentMapper {
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
   * Vector DB에서 유사 사례 검색 (RAG)
   */
  private async findSimilarCases(
    excelColumn: string,
    topK: number = 3
  ): Promise<Array<{ tableName: string; document: string; distance: number }>> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다.');
    }

    const embedding = await this.embedText(excelColumn);
    
    const results = await this.collection.query({
      queryEmbeddings: [embedding],
      nResults: topK,
      where: { type: 'column_group' }
    });

    if (!results.documents?.[0] || !results.metadatas?.[0] || !results.distances?.[0]) {
      return [];
    }

    return results.documents[0].map((doc, idx) => ({
      tableName: (results.metadatas![0]![idx]?.tableName as string) || '',
      document: doc || '',
      distance: results.distances![0]![idx] || 1
    }));
  }

  /**
   * Few-Shot Learning Prompt 생성
   */
  private buildFewShotPrompt(examples: FewShotExample[]): string {
    if (examples.length === 0) return '';

    let prompt = '\n## 📚 학습 사례 (Few-Shot Examples)\n\n';
    prompt += '다음은 과거에 성공적으로 매핑된 사례들입니다:\n\n';

    examples.forEach((ex, idx) => {
      prompt += `### 사례 ${idx + 1}\n`;
      prompt += `- Excel 컬럼: "${ex.excelColumn}"\n`;
      prompt += `- 매핑 결과: ${ex.dbTable}.${ex.dbColumn}\n`;
      prompt += `- 이유: ${ex.reason}\n\n`;
    });

    return prompt;
  }

  /**
   * Agent에게 매핑 추론 요청
   */
  private async askAgent(
    excelColumn: string,
    similarCases: Array<{ tableName: string; document: string; distance: number }>,
    fewShotExamples: FewShotExample[] = []
  ): Promise<AgentMappingResult> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // RAG 컨텍스트 구성
    let ragContext = '## 🔍 검색된 유사 DB 정보 (RAG Context)\n\n';
    similarCases.forEach((case_, idx) => {
      const similarity = Math.round((1 - case_.distance) * 100);
      ragContext += `### 후보 ${idx + 1}: ${case_.tableName} (유사도: ${similarity}%)\n`;
      ragContext += `\`\`\`\n${case_.document}\n\`\`\`\n\n`;
    });

    // Few-Shot Prompt
    const fewShotPrompt = this.buildFewShotPrompt(fewShotExamples);

    // 최종 Prompt
    const prompt = `
당신은 Excel 데이터를 PostgreSQL DB 스키마에 자동으로 매핑하는 전문가입니다.

## 🎯 목표
Excel 컬럼명 "${excelColumn}"을(를) 가장 적합한 DB 테이블과 컬럼에 매핑하세요.

${ragContext}

${fewShotPrompt}

## 📋 작업 지침
1. 위의 RAG Context를 참고하여 가장 적합한 테이블과 컬럼을 선택하세요
2. Few-Shot 사례가 있다면 비슷한 패턴을 학습하세요
3. 신뢰도 점수를 0-100 사이로 제시하세요 (정확한 매칭: 90-100, 유사 매칭: 70-89, 추측: 50-69, 불확실: 0-49)
4. 매핑 근거를 명확히 설명하세요

## 📤 응답 형식 (JSON)
\`\`\`json
{
  "tableName": "테이블명",
  "columnName": "컬럼명",
  "confidence": 85,
  "reasoning": "왜 이 컬럼을 선택했는지 설명",
  "thinking": "사고 과정 (선택사항)"
}
\`\`\`

**중요**: 반드시 위 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.
`;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // JSON 추출
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                       responseText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('Agent가 JSON 형식으로 응답하지 않았습니다.');
      }

      const jsonText = jsonMatch[1] || jsonMatch[0];
      const agentResponse = JSON.parse(jsonText);

      return {
        excelColumn,
        suggestedTable: agentResponse.tableName || 'unknown',
        suggestedColumn: agentResponse.columnName || 'unknown',
        confidence: agentResponse.confidence || 0,
        reasoning: agentResponse.reasoning || 'Agent가 근거를 제공하지 않았습니다.',
        agentThinking: agentResponse.thinking
      };
    } catch (error) {
      console.error('Agent 추론 실패:', error);
      
      // Fallback: 가장 유사한 케이스 사용
      if (similarCases.length > 0) {
        const topCase = similarCases[0];
        const confidence = Math.round((1 - topCase!.distance) * 100);
        
        return {
          excelColumn,
          suggestedTable: topCase!.tableName,
          suggestedColumn: 'unknown',
          confidence,
          reasoning: `Agent 추론 실패. Vector 검색 결과 사용 (신뢰도: ${confidence}%)`,
          agentThinking: error instanceof Error ? error.message : '알 수 없는 오류'
        };
      }

      return {
        excelColumn,
        suggestedTable: 'unknown',
        suggestedColumn: 'unknown',
        confidence: 0,
        reasoning: 'Agent 추론 실패 및 유사 사례 없음',
        agentThinking: error instanceof Error ? error.message : '알 수 없는 오류'
      };
    }
  }

  /**
   * Excel 컬럼 목록을 DB에 매핑 (Agent 기반)
   */
  async mapColumns(
    excelColumns: string[],
    fewShotExamples: FewShotExample[] = []
  ): Promise<AgentMappingResult[]> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }

    const results: AgentMappingResult[] = [];

    for (const column of excelColumns) {
      console.log(`\n🤖 Agent 추론 중: "${column}"`);
      
      // 1. RAG: Vector DB에서 유사 사례 검색
      const similarCases = await this.findSimilarCases(column, 3);
      console.log(`   ✓ 유사 사례 ${similarCases.length}개 검색 완료`);
      
      // 2. Agent 추론
      const mapping = await this.askAgent(column, similarCases, fewShotExamples);
      console.log(`   ✓ Agent 추론 완료: ${mapping.suggestedTable}.${mapping.suggestedColumn} (신뢰도: ${mapping.confidence}%)`);
      
      results.push(mapping);
    }

    return results;
  }

  /**
   * 사용자 피드백 저장 (강화학습용)
   */
  async saveFeedback(
    excelColumn: string,
    correctTable: string,
    correctColumn: string,
    reasoning: string
  ): Promise<void> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다.');
    }

    const feedbackDoc = `
사용자 피드백 (강화학습)

Excel 컬럼: ${excelColumn}
정답 테이블: ${correctTable}
정답 컬럼: ${correctColumn}
이유: ${reasoning}
날짜: ${new Date().toISOString()}
`;

    const embedding = await this.embedText(feedbackDoc);
    const feedbackId = `feedback_${Date.now()}_${excelColumn.replace(/\s+/g, '_')}`;

    await this.collection.add({
      ids: [feedbackId],
      documents: [feedbackDoc],
      embeddings: [embedding],
      metadatas: [{
        type: 'user_feedback',
        excelColumn,
        correctTable,
        correctColumn,
        timestamp: Date.now()
      }]
    });

    console.log(`✓ 사용자 피드백 저장 완료: ${feedbackId}`);
  }
}

// ============================================================================
// 편의 함수
// ============================================================================

/**
 * 빠른 Agent 매핑
 */
export async function mapWithAgent(
  excelColumns: string[],
  fewShotExamples: FewShotExample[] = []
): Promise<AgentMappingResult[]> {
  const mapper = new AgentMapper();
  await mapper.initialize();
  return mapper.mapColumns(excelColumns, fewShotExamples);
}

/**
 * 피드백 저장
 */
export async function saveMappingFeedback(
  excelColumn: string,
  correctTable: string,
  correctColumn: string,
  reasoning: string
): Promise<void> {
  const mapper = new AgentMapper();
  await mapper.initialize();
  await mapper.saveFeedback(excelColumn, correctTable, correctColumn, reasoning);
}

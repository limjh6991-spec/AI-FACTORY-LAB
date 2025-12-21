/**
 * 🤖 AGENT MAPPER V2 - Claude 기반 Excel→DB 자동 매핑 (개선판)
 * 
 * 개선 사항:
 * 1. 시스템 컬럼 필터링
 * 2. 강화된 프롬프트 엔지니어링
 * 3. 검증 레이어 추가
 * 4. 신뢰도 보정
 * 
 * Created: 2025-12-03
 */

import 'dotenv/config';
import { ChromaClient } from 'chromadb';
import type { Collection } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

// ============================================================================
// 설정
// ============================================================================

const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;
const COLLECTION_NAME = 'db_metadata_v2'; // 개선된 컬렉션 사용

// ============================================================================
// 시스템 컬럼 블랙리스트
// ============================================================================

const SYSTEM_COLUMNS = [
  'id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy',
  'created_at', 'updated_at', 'created_by', 'updated_by',
  'insert_dt', 'update_dt', 'insert_id', 'update_id',
];

// ============================================================================
// 타입 정의
// ============================================================================

export interface AgentMappingResult {
  excelColumn: string;
  suggestedTable: string;
  suggestedColumn: string;
  confidence: number;
  adjustedConfidence: number; // 검증 후 보정된 신뢰도
  reasoning: string;
  agentThinking?: string;
  validation: ValidationResult;
}

export interface ValidationResult {
  isSystemColumn: boolean;
  dataTypeMatch: boolean;
  semanticMatch: boolean;
  warnings: string[];
}

export interface FewShotExample {
  excelColumn: string;
  dbTable: string;
  dbColumn: string;
  reason: string;
  isCorrect: boolean; // 성공/실패 사례 구분
}

// ============================================================================
// Agent 매핑 클래스 V2
// ============================================================================

export class AgentMapperV2 {
  private client: ChromaClient;
  private collection: Collection | null = null;
  private genAI: GoogleGenerativeAI;
  private anthropic: Anthropic;
  private useClaude: boolean = true; // Claude 우선 사용

  constructor(useClaude: boolean = true) {
    this.client = new ChromaClient({ path: CHROMA_URL });
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
    this.useClaude = useClaude;
  }

  /**
   * 초기화
   */
  async initialize(): Promise<void> {
    try {
      this.collection = await this.client.getCollection({
        name: COLLECTION_NAME,
      });
      console.log(`✅ 컬렉션 '${COLLECTION_NAME}' 연결 완료`);
    } catch (error) {
      // Fallback to old collection
      console.log(`⚠️ '${COLLECTION_NAME}' 없음, 기존 컬렉션 사용`);
      this.collection = await this.client.getCollection({
        name: 'db_metadata',
      });
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
   * Vector DB에서 유사 컬럼 검색 (개선된 버전)
   */
  private async findSimilarColumns(
    excelColumn: string,
    topK: number = 10
  ): Promise<Array<{ 
    tableName: string; 
    columnName: string;
    koreanName: string;
    dataType: string;
    meaning: string;
    document: string; 
    distance: number 
  }>> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다.');
    }

    // 확장된 검색어 생성
    const expandedQuery = `${excelColumn} 컬럼 매핑 데이터`;
    const embedding = await this.embedText(expandedQuery);
    
    const results = await this.collection.query({
      queryEmbeddings: [embedding],
      nResults: topK,
      where: { type: 'column' }, // 컬럼만 검색
    });

    if (!results.documents?.[0] || !results.metadatas?.[0] || !results.distances?.[0]) {
      return [];
    }

    // 시스템 컬럼 필터링
    const filtered = results.documents[0]
      .map((doc, idx) => {
        const meta = results.metadatas![0]![idx]!;
        const columnName = (meta.columnName as string) || '';
        
        // 시스템 컬럼 제외
        if (SYSTEM_COLUMNS.some(sys => columnName.toLowerCase().includes(sys.toLowerCase()))) {
          return null;
        }
        
        return {
          tableName: (meta.tableName as string) || '',
          columnName,
          koreanName: (meta.columnKoreanName as string) || '',
          dataType: (meta.dataTypeCategory as string) || 'unknown',
          meaning: (meta.meaning as string) || '',
          document: doc || '',
          distance: results.distances![0]![idx] || 1,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return filtered.slice(0, 5); // 상위 5개만 반환
  }

  /**
   * 강화된 프롬프트 생성
   */
  private buildEnhancedPrompt(
    excelColumn: string,
    candidates: Array<{ 
      tableName: string; 
      columnName: string;
      koreanName: string;
      dataType: string;
      meaning: string;
      document: string; 
      distance: number 
    }>,
    fewShotExamples: FewShotExample[] = []
  ): string {
    // RAG 컨텍스트
    let ragContext = '## 📊 검색된 DB 컬럼 후보\n\n';
    candidates.forEach((c, idx) => {
      const similarity = Math.round((1 - c.distance) * 100);
      ragContext += `### 후보 ${idx + 1}: ${c.tableName}.${c.columnName}\n`;
      ragContext += `- 한글명: ${c.koreanName}\n`;
      ragContext += `- 데이터 타입: ${c.dataType}\n`;
      ragContext += `- 의미: ${c.meaning}\n`;
      ragContext += `- 유사도: ${similarity}%\n\n`;
    });

    // Few-Shot (성공 사례)
    let fewShotPrompt = '';
    const successExamples = fewShotExamples.filter(e => e.isCorrect);
    const failExamples = fewShotExamples.filter(e => !e.isCorrect);
    
    if (successExamples.length > 0) {
      fewShotPrompt += '\n## ✅ 성공 사례 (이것처럼 매핑하세요)\n\n';
      successExamples.forEach((ex, idx) => {
        fewShotPrompt += `${idx + 1}. "${ex.excelColumn}" → ${ex.dbTable}.${ex.dbColumn}\n`;
        fewShotPrompt += `   이유: ${ex.reason}\n\n`;
      });
    }
    
    if (failExamples.length > 0) {
      fewShotPrompt += '\n## ❌ 실패 사례 (이렇게 매핑하지 마세요)\n\n';
      failExamples.forEach((ex, idx) => {
        fewShotPrompt += `${idx + 1}. "${ex.excelColumn}" → ${ex.dbTable}.${ex.dbColumn} ❌\n`;
        fewShotPrompt += `   왜 틀렸나: ${ex.reason}\n\n`;
      });
    }

    // 최종 프롬프트 (강화된 버전)
    const prompt = `당신은 제조업 ERP 시스템의 DB 스키마 전문가입니다.
Excel 컬럼을 PostgreSQL DB 컬럼에 정확하게 매핑하는 것이 목표입니다.

## 🎯 매핑할 Excel 컬럼
"${excelColumn}"

${ragContext}
${fewShotPrompt}

## ⚠️ 중요한 매핑 규칙 (반드시 준수!)

### 1. 의미 일치 원칙
- 컬럼명이 비슷해도 **의미가 다르면 매핑하지 마세요**
- 예: "제품명" → "productName" ✅ (둘 다 제품 이름)
- 예: "제품명" → "createdBy" ❌ (createdBy는 생성자!)

### 2. 데이터 타입 일치 원칙
- 금액/수량 → 숫자 타입 컬럼 (number)
- 이름/명칭 → 문자 타입 컬럼 (text)
- 날짜/일자 → 날짜 타입 컬럼 (date)

### 3. 시스템 컬럼 제외 원칙
- 절대 매핑하면 안 되는 컬럼:
  - createdAt, updatedAt (생성/수정 시간)
  - createdBy, updatedBy (생성/수정자)
  - id (자동 생성 키)

### 4. 신뢰도 점수 기준
- 90-100%: 컬럼명과 의미가 **완벽히 일치**
- 70-89%: 의미는 같으나 **이름이 다름**
- 50-69%: **추측** 기반 (확신 부족)
- 0-49%: 매핑 불가능 또는 **관련 컬럼 없음**

### 5. 솔직함 원칙
- 확신이 없으면 낮은 신뢰도를 제시하세요
- 관련 컬럼이 없으면 솔직히 "없음"으로 응답하세요
- 틀린 매핑보다 "모르겠음"이 낫습니다

## 📤 응답 형식 (JSON만!)
\`\`\`json
{
  "tableName": "테이블명 (없으면 'unknown')",
  "columnName": "컬럼명 (없으면 'unknown')",
  "confidence": 75,
  "reasoning": "왜 이 컬럼을 선택했는지 구체적으로 설명",
  "thinking": "다른 후보들을 왜 제외했는지 설명"
}
\`\`\`

**반드시 JSON 형식으로만 응답하세요. 다른 텍스트 금지!**`;

    return prompt;
  }

  /**
   * Claude API로 매핑 추론
   */
  private async askClaude(prompt: string): Promise<{
    tableName: string;
    columnName: string;
    confidence: number;
    reasoning: string;
    thinking?: string;
  }> {
    const message = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      temperature: 0, // 결정적 응답
      messages: [{ role: 'user', content: prompt }],
    });

    // Extract text from response
    let responseText = '';
    for (const block of message.content) {
      if (block.type === 'text') {
        responseText = block.text;
        break;
      }
    }
    
    // JSON 추출
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                     responseText.match(/\{[\s\S]*?\}/);
    
    if (!jsonMatch) {
      throw new Error('Claude가 JSON 형식으로 응답하지 않았습니다.');
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  }

  /**
   * Gemini API로 매핑 추론 (Fallback)
   */
  private async askGemini(prompt: string): Promise<{
    tableName: string;
    columnName: string;
    confidence: number;
    reasoning: string;
    thinking?: string;
  }> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // JSON 추출
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                     responseText.match(/\{[\s\S]*?\}/);
    
    if (!jsonMatch) {
      throw new Error('Gemini가 JSON 형식으로 응답하지 않았습니다.');
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  }

  /**
   * 검증 레이어
   */
  private validateMapping(
    excelColumn: string,
    tableName: string,
    columnName: string,
    candidates: Array<{ dataType: string; meaning: string }>
  ): ValidationResult {
    const warnings: string[] = [];
    
    // 1. 시스템 컬럼 체크
    const isSystemColumn = SYSTEM_COLUMNS.some(
      sys => columnName.toLowerCase().includes(sys.toLowerCase())
    );
    if (isSystemColumn) {
      warnings.push(`⚠️ '${columnName}'은 시스템 컬럼입니다. 매핑을 재검토하세요.`);
    }
    
    // 2. 데이터 타입 매칭 (휴리스틱)
    const excelLower = excelColumn.toLowerCase();
    let expectedType = 'unknown';
    
    if (excelLower.includes('금액') || excelLower.includes('원가') || 
        excelLower.includes('단가') || excelLower.includes('수량')) {
      expectedType = 'number';
    } else if (excelLower.includes('일자') || excelLower.includes('날짜') ||
               excelLower.includes('년월')) {
      expectedType = 'date';
    } else if (excelLower.includes('명') || excelLower.includes('이름') ||
               excelLower.includes('코드')) {
      expectedType = 'text';
    }
    
    const candidateTypes = candidates.map(c => c.dataType);
    const dataTypeMatch = expectedType === 'unknown' || candidateTypes.includes(expectedType);
    
    if (!dataTypeMatch) {
      warnings.push(`⚠️ 예상 타입(${expectedType})과 후보 타입(${candidateTypes.join(', ')})이 불일치합니다.`);
    }
    
    // 3. 의미적 매칭 (간단한 휴리스틱)
    const semanticMatch = !isSystemColumn; // 시스템 컬럼이 아니면 일단 OK
    
    return {
      isSystemColumn,
      dataTypeMatch,
      semanticMatch,
      warnings,
    };
  }

  /**
   * 신뢰도 보정
   */
  private adjustConfidence(
    originalConfidence: number,
    validation: ValidationResult
  ): number {
    let adjusted = originalConfidence;
    
    // 시스템 컬럼이면 0점
    if (validation.isSystemColumn) {
      return 0;
    }
    
    // 데이터 타입 불일치: -20점
    if (!validation.dataTypeMatch) {
      adjusted -= 20;
    }
    
    // 의미적 불일치: -15점
    if (!validation.semanticMatch) {
      adjusted -= 15;
    }
    
    return Math.max(0, Math.min(100, adjusted));
  }

  /**
   * Excel 컬럼 매핑 (메인 함수)
   */
  async mapColumn(
    excelColumn: string,
    fewShotExamples: FewShotExample[] = []
  ): Promise<AgentMappingResult> {
    console.log(`\n🤖 매핑 중: "${excelColumn}"`);
    
    // 1. Vector DB에서 후보 검색
    const candidates = await this.findSimilarColumns(excelColumn);
    console.log(`   ✓ 후보 ${candidates.length}개 검색 완료`);
    
    // 2. 프롬프트 생성
    const prompt = this.buildEnhancedPrompt(excelColumn, candidates, fewShotExamples);
    
    // 3. LLM 추론
    let agentResponse;
    try {
      if (this.useClaude && ANTHROPIC_API_KEY) {
        console.log(`   ✓ Claude 추론 중...`);
        agentResponse = await this.askClaude(prompt);
      } else {
        console.log(`   ✓ Gemini 추론 중...`);
        agentResponse = await this.askGemini(prompt);
      }
    } catch (error) {
      console.error(`   ❌ LLM 추론 실패:`, error);
      
      // Fallback: 가장 유사한 후보 사용
      if (candidates.length > 0) {
        const top = candidates[0]!;
        return {
          excelColumn,
          suggestedTable: top.tableName,
          suggestedColumn: top.columnName,
          confidence: Math.round((1 - top.distance) * 50), // 최대 50%
          adjustedConfidence: Math.round((1 - top.distance) * 50),
          reasoning: 'LLM 추론 실패, Vector 검색 결과 사용',
          validation: {
            isSystemColumn: false,
            dataTypeMatch: true,
            semanticMatch: false,
            warnings: ['LLM 추론 실패로 검증 불가'],
          },
        };
      }
      
      return {
        excelColumn,
        suggestedTable: 'unknown',
        suggestedColumn: 'unknown',
        confidence: 0,
        adjustedConfidence: 0,
        reasoning: 'LLM 추론 실패 및 후보 없음',
        validation: {
          isSystemColumn: false,
          dataTypeMatch: false,
          semanticMatch: false,
          warnings: ['매핑 불가'],
        },
      };
    }
    
    // 4. 검증
    const validation = this.validateMapping(
      excelColumn,
      agentResponse.tableName,
      agentResponse.columnName,
      candidates
    );
    
    // 5. 신뢰도 보정
    const adjustedConfidence = this.adjustConfidence(agentResponse.confidence, validation);
    
    console.log(`   ✓ 결과: ${agentResponse.tableName}.${agentResponse.columnName}`);
    console.log(`   ✓ 신뢰도: ${agentResponse.confidence}% → ${adjustedConfidence}% (보정)`);
    if (validation.warnings.length > 0) {
      validation.warnings.forEach(w => console.log(`   ${w}`));
    }
    
    return {
      excelColumn,
      suggestedTable: agentResponse.tableName,
      suggestedColumn: agentResponse.columnName,
      confidence: agentResponse.confidence,
      adjustedConfidence,
      reasoning: agentResponse.reasoning,
      agentThinking: agentResponse.thinking,
      validation,
    };
  }

  /**
   * 여러 컬럼 매핑
   */
  async mapColumns(
    excelColumns: string[],
    fewShotExamples: FewShotExample[] = []
  ): Promise<AgentMappingResult[]> {
    if (!this.collection) {
      await this.initialize();
    }

    const results: AgentMappingResult[] = [];
    
    for (const column of excelColumns) {
      const result = await this.mapColumn(column, fewShotExamples);
      results.push(result);
    }
    
    return results;
  }
}

// ============================================================================
// Export
// ============================================================================

export default AgentMapperV2;

/**
 * 🤖 AGENT COLUMN MAPPER - Claude 기반 Excel→DB 컬럼 매핑
 * 
 * Purpose: Agent(Claude)가 RAG 기반으로 Excel 컬럼을 DB 컬럼에 매핑
 * Architecture: Vector Search → Context 수집 → Claude 추론 → 매핑 결과
 * 
 * Created: 2025-12-03
 * Model: Claude (claude-sonnet-4-20250514)
 * Role: JARVIS = 인프라 제공, AGENT(Claude) = 매핑 추론
 * 
 * 핵심 원칙:
 * - 하드코딩 금지 (키워드 매칭, if-else 로직 X)
 * - Agent가 RAG 기반으로 추론
 * - Few-Shot Learning으로 정확도 향상
 * - 사용자 피드백으로 강화학습
 */

import 'dotenv/config';
import { ChromaClient } from 'chromadb';
import type { Collection } from 'chromadb';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// 설정
// ============================================================================

const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
const ANTHROPIC_API_KEY = (process.env.ANTHROPIC_API_KEY || '').trim();
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim(); // 임베딩용
const COLLECTION_NAME = 'db_metadata';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// ============================================================================
// 타입 정의
// ============================================================================

export interface ColumnMappingRequest {
  excelColumns: string[];
  excelFileName?: string;
  contextDescription?: string;
  sampleData?: Record<string, any>[];
}

export interface ColumnMappingResult {
  excelColumn: string;
  suggestedTable: string;
  suggestedColumn: string;
  confidence: number;
  reasoning: string;
  alternatives?: Array<{
    table: string;
    column: string;
    confidence: number;
  }>;
}

export interface MappingFeedback {
  excelColumn: string;
  originalMapping: {
    table: string;
    column: string;
  };
  correctedMapping: {
    table: string;
    column: string;
  };
  timestamp: Date;
}

// ============================================================================
// Agent Column Mapper 클래스 (Claude)
// ============================================================================

export class AgentColumnMapperClaude {
  private client: ChromaClient;
  private collection: Collection | null = null;
  private anthropic: Anthropic;
  private genAI: GoogleGenerativeAI; // 임베딩용
  private feedbackHistory: MappingFeedback[] = [];

  constructor() {
    this.client = new ChromaClient({ path: CHROMA_URL });
    this.anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.loadFeedbackHistory();
  }

  /**
   * 초기화
   */
  async initialize(): Promise<void> {
    try {
      this.collection = await this.client.getCollection({
        name: COLLECTION_NAME,
      });
      console.log('✅ AgentColumnMapperClaude 초기화 완료');
    } catch (error) {
      throw new Error(
        'DB 메타데이터 컬렉션을 찾을 수 없습니다. embed_db_metadata.ts를 먼저 실행하세요.'
      );
    }
  }

  /**
   * 텍스트 임베딩 (Gemini 사용)
   */
  private async embedText(text: string): Promise<number[]> {
    const model = this.genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  }

  /**
   * Vector DB에서 관련 컨텍스트 검색
   */
  private async searchRelevantContext(
    excelColumns: string[],
    contextDescription?: string
  ): Promise<string> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다.');
    }

    const contexts: string[] = [];

    // 1. 각 컬럼에 대해 관련 테이블/컬럼 검색
    for (const column of excelColumns) {
      const query = contextDescription
        ? `${contextDescription} ${column}`
        : `${column} 컬럼 데이터`;

      const embedding = await this.embedText(query);

      const results = await this.collection.query({
        queryEmbeddings: [embedding],
        nResults: 3,
      });

      if (results.documents?.[0]) {
        results.documents[0].forEach((doc, idx) => {
          if (doc && !contexts.includes(doc)) {
            contexts.push(`[관련 테이블 ${idx + 1}]\n${doc}`);
          }
        });
      }
    }

    // 2. 전체 컨텍스트에서 추가 검색
    if (contextDescription) {
      const embedding = await this.embedText(contextDescription);
      const results = await this.collection.query({
        queryEmbeddings: [embedding],
        nResults: 5,
        where: { type: 'table' }
      });

      if (results.documents?.[0]) {
        results.documents[0].forEach((doc, idx) => {
          if (doc && !contexts.includes(doc)) {
            contexts.push(`[테이블 요약 ${idx + 1}]\n${doc}`);
          }
        });
      }
    }

    return contexts.slice(0, 10).join('\n\n---\n\n');
  }

  /**
   * Few-Shot Learning 예시 생성
   */
  private getFewShotExamples(): string {
    // 기본 학습 예시 - 실제 doi_ 테이블 구조 기반
    const defaultExamples = `
## 성공 매핑 사례 (실제 doi_ 테이블 기반)

### 예시 1: 제품/모델 관련 ⭐ 중요
- Excel: "제품코드" → DB: doi_model_mast.MODEL (신뢰도: 95%)
- Excel: "제품명" → DB: doi_bom_mast.MODEL_NM (신뢰도: 95%)
- Excel: "모델" → DB: doi_cost.MODEL (신뢰도: 95%)
- Excel: "모델코드" → DB: doi_model_mast.MODEL (신뢰도: 95%)
- 핵심: 이 시스템에서는 '제품 = MODEL'입니다. 제품코드/제품명 모두 MODEL 관련 컬럼을 사용합니다.

### 예시 2: 부서 관련
- Excel: "부서코드" → DB: doi_dept.DEPT (신뢰도: 95%)
- Excel: "부서명" → DB: doi_dept.DEPT_NM (신뢰도: 95%)
- Excel: "코스트센터" → DB: doi_dept_cost.COST_CENTER (신뢰도: 90%)
- 핵심: 부서 기준정보는 doi_dept, 부서별 원가는 doi_dept_cost 테이블

### 예시 3: 원가/금액 관련
- Excel: "원가" → DB: doi_cost.UNIT_COST (신뢰도: 90%)
- Excel: "단가" → DB: doi_cost.UNIT_COST (신뢰도: 85%)
- Excel: "자재비" → DB: doi_smce_cost.MAT_COST (신뢰도: 85%)
- Excel: "인건비" → DB: doi_smce_cost.LABOR_COST (신뢰도: 85%)
- Excel: "제조원가" → DB: doi_smce_cost (테이블 전체)
- Excel: "표준원가" → DB: doi_stco (테이블 전체)
- 핵심: doi_cost(원가), doi_stco(표준원가), doi_smce_cost(제조원가), doi_slco(판매원가)

### 예시 4: 수량 관련
- Excel: "수량" → DB: doi_prod_subul.IN_QTY 또는 OUT_QTY (신뢰도: 85%)
- Excel: "입고수량" → DB: doi_prod_subul.IN_QTY (신뢰도: 95%)
- Excel: "출고수량" → DB: doi_prod_subul.OUT_QTY (신뢰도: 95%)
- Excel: "재고수량" → DB: doi_stock.STOCK_QTY (신뢰도: 90%)
- Excel: "소요량" → DB: doi_bom_mast.NEED_QTY (신뢰도: 90%)
- 핵심: 수불=doi_prod_subul, 재고=doi_stock, BOM소요량=doi_bom_mast

### 예시 5: 날짜/기간 관련
- Excel: "년월" → DB: *.YYYYMM (신뢰도: 95%)
- Excel: "년도" → DB: *.YYYY (신뢰도: 95%)
- Excel: "일자" → DB: *.WORK_DATE (신뢰도: 85%)
- 핵심: 거의 모든 테이블에 YYYYMM 컬럼 존재

### 예시 6: 마스터(기준정보) 테이블 ⭐ _mast 접미어
- doi_model_mast: 제품 마스터 (MODEL, SPEC, INCH 등)
- doi_bom_mast: BOM 마스터 (MODEL, PART_NO, NEED_QTY 등)
- doi_cust_mast: 고객 마스터 (CUST_CD, CUST_NM 등)
- doi_material_mast: 자재 마스터 (MAT_CD, MAT_NM 등)
- 핵심: _mast 테이블 = 기준정보, 다른 테이블에서 JOIN해서 사용

### 예시 7: 공통 컬럼
- SEL_CODE: 선택코드 (대부분의 테이블에 존재)
- SITE: 사업장/공장 코드
- YYYYMM: 년월 (기준 기간)
`;

    // 사용자 피드백 기반 학습 예시 추가
    if (this.feedbackHistory.length > 0) {
      const feedbackExamples = this.feedbackHistory
        .slice(-10) // 최근 10개
        .map(fb => 
          `- Excel: "${fb.excelColumn}" → 정답: ${fb.correctedMapping.table}.${fb.correctedMapping.column} (오답: ${fb.originalMapping.table}.${fb.originalMapping.column})`
        )
        .join('\n');

      return defaultExamples + `\n\n### 사용자 피드백 학습 (최근 수정 이력)\n${feedbackExamples}`;
    }

    return defaultExamples;
  }

  /**
   * Claude Agent에게 매핑 요청
   */
  async mapColumns(request: ColumnMappingRequest): Promise<ColumnMappingResult[]> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }

    console.log('\n🤖 Claude Agent 컬럼 매핑 시작...');
    console.log(`📊 매핑할 컬럼: ${request.excelColumns.join(', ')}`);

    // 1. Vector DB에서 관련 컨텍스트 검색
    console.log('🔍 Vector DB에서 관련 컨텍스트 검색 중...');
    const context = await this.searchRelevantContext(
      request.excelColumns,
      request.contextDescription
    );

    // 2. Few-Shot 예시 생성
    const fewShotExamples = this.getFewShotExamples();

    // 3. 샘플 데이터 포맷팅
    let sampleDataStr = '';
    if (request.sampleData && request.sampleData.length > 0) {
      sampleDataStr = `\n\n## 샘플 데이터 (처음 3행)\n\`\`\`json\n${JSON.stringify(request.sampleData.slice(0, 3), null, 2)}\n\`\`\``;
    }

    // 4. Claude에게 매핑 요청
    const prompt = `당신은 Excel 컬럼을 PostgreSQL DB 컬럼에 매핑하는 전문가입니다.

## 작업
다음 Excel 컬럼들을 가장 적합한 DB 테이블.컬럼에 매핑해주세요.

## Excel 파일 정보
- 파일명: ${request.excelFileName || '알 수 없음'}
- 설명: ${request.contextDescription || '없음'}
- 컬럼: ${request.excelColumns.join(', ')}
${sampleDataStr}

## DB 스키마 컨텍스트 (Vector DB 검색 결과)
${context}

## 학습된 매핑 패턴
${fewShotExamples}

## 중요 규칙
1. **doi_ 접두어 테이블만 사용** (예: doi_cost, doi_model_mast)
2. **제품 = MODEL**: 이 시스템에서 제품코드/제품명은 MODEL 컬럼을 사용
3. **_mast 테이블 = 기준정보**: doi_model_mast(제품), doi_bom_mast(BOM), doi_cust_mast(고객)
4. 확실하지 않으면 신뢰도를 낮게 설정 (50% 이하)
5. 대안이 있으면 alternatives에 포함

## 응답 형식 (JSON)
\`\`\`json
{
  "mappings": [
    {
      "excelColumn": "컬럼명",
      "suggestedTable": "doi_xxx",
      "suggestedColumn": "COLUMN_NAME",
      "confidence": 85,
      "reasoning": "매핑 이유 설명",
      "alternatives": [
        { "table": "doi_yyy", "column": "OTHER_COL", "confidence": 60 }
      ]
    }
  ]
}
\`\`\`

JSON만 응답해주세요.`;

    console.log('🧠 Claude Agent 추론 중...');
    
    try {
      const response = await this.anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        messages: [
          { role: 'user', content: prompt }
        ]
      });

      // 응답 파싱
      const content = response.content[0];
      if (!content || content.type !== 'text') {
        throw new Error('Claude 응답 형식 오류');
      }

      // JSON 추출
      const textContent = content.text;
      const jsonMatch = textContent.match(/```json\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : textContent;
      
      const result = JSON.parse(jsonStr!.trim());
      
      console.log('✅ Claude Agent 매핑 완료!');
      
      return result.mappings as ColumnMappingResult[];

    } catch (error) {
      console.error('❌ Claude Agent 오류:', error);
      throw error;
    }
  }

  /**
   * 사용자 피드백 저장 (강화학습)
   */
  saveFeedback(feedback: MappingFeedback): void {
    this.feedbackHistory.push({
      ...feedback,
      timestamp: new Date()
    });
    this.persistFeedbackHistory();
    console.log(`📝 피드백 저장됨: ${feedback.excelColumn} → ${feedback.correctedMapping.table}.${feedback.correctedMapping.column}`);
  }

  /**
   * 피드백 이력 로드
   */
  private loadFeedbackHistory(): void {
    const feedbackPath = path.join(process.cwd(), 'data', 'mapping_feedback.json');
    try {
      if (fs.existsSync(feedbackPath)) {
        const data = fs.readFileSync(feedbackPath, 'utf-8');
        this.feedbackHistory = JSON.parse(data);
        console.log(`📂 피드백 이력 로드: ${this.feedbackHistory.length}건`);
      }
    } catch (error) {
      console.log('⚠️ 피드백 이력 로드 실패, 새로 시작합니다.');
      this.feedbackHistory = [];
    }
  }

  /**
   * 피드백 이력 저장
   */
  private persistFeedbackHistory(): void {
    const feedbackPath = path.join(process.cwd(), 'data', 'mapping_feedback.json');
    try {
      fs.mkdirSync(path.dirname(feedbackPath), { recursive: true });
      fs.writeFileSync(feedbackPath, JSON.stringify(this.feedbackHistory, null, 2), 'utf-8');
    } catch (error) {
      console.error('❌ 피드백 저장 실패:', error);
    }
  }
}

// ============================================================================
// 편의 함수
// ============================================================================

/**
 * Claude Agent로 빠른 컬럼 매핑
 */
export async function mapColumnsWithClaude(
  excelColumns: string[],
  context?: string
): Promise<ColumnMappingResult[]> {
  const mapper = new AgentColumnMapperClaude();
  await mapper.initialize();
  return mapper.mapColumns({
    excelColumns,
    contextDescription: context
  });
}

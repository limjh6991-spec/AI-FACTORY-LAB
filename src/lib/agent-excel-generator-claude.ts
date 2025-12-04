/**
 * 🤖 AGENT EXCEL GENERATOR - Claude Opus 4.5 기반 Excel 보고서 자동 생성
 * 
 * Purpose: Agent(Claude)가 RAG 기반으로 DB 스키마를 분석하여 Excel 보고서 생성
 * Architecture: Vector Search → Agent 추론 → SQL 생성 → 데이터 조회 → Excel 생성
 * 
 * Created: 2025-12-03
 * Model: Claude Opus 4.5 (claude-opus-4-5)
 * Role: JARVIS = 인프라 제공, AGENT = 보고서 설계 및 SQL 생성
 */

import 'dotenv/config';
import { ChromaClient } from 'chromadb';
import type { Collection } from 'chromadb';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as XLSX from 'xlsx';

// ============================================================================
// 설정
// ============================================================================

const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''; // 임베딩용
const COLLECTION_NAME = 'db_metadata';
const CLAUDE_MODEL = 'claude-opus-4-5';

// API 키 확인
if (!ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
}
if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
}

// ============================================================================
// 타입 정의
// ============================================================================

export interface ReportRequest {
  reportName: string;
  description?: string;
}

export interface ReportDesign {
  reportName: string;
  columns: Array<{
    columnName: string;
    description: string;
    dataType: string;
  }>;
  tables: string[];
  sqlQuery: string;
  reasoning: string;
  agentThinking?: string;
}

export interface ExcelGenerationResult {
  success: boolean;
  reportDesign: ReportDesign;
  buffer?: Buffer;
  rowCount?: number;
  error?: string;
}

// ============================================================================
// Agent Excel Generator 클래스 (Claude)
// ============================================================================

export class AgentExcelGeneratorClaude {
  private client: ChromaClient;
  private collection: Collection | null = null;
  private anthropic: Anthropic;
  private genAI: GoogleGenerativeAI; // 임베딩용

  constructor() {
    this.client = new ChromaClient({ path: CHROMA_URL });
    this.anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
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
   * 텍스트 임베딩 (Gemini 사용)
   */
  private async embedText(text: string): Promise<number[]> {
    const model = this.genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  }

  /**
   * Vector DB에서 관련 테이블 검색
   */
  private async searchRelevantTables(
    reportDescription: string,
    topK: number = 5
  ): Promise<Array<{ tableName: string; document: string; distance: number }>> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다.');
    }

    const embedding = await this.embedText(reportDescription);
    
    const results = await this.collection.query({
      queryEmbeddings: [embedding],
      nResults: topK,
      where: { type: 'table' }
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
   * Vector DB에서 관련 컬럼 검색
   */
  private async searchRelevantColumns(
    reportDescription: string,
    topK: number = 10
  ): Promise<Array<{ tableName: string; document: string; distance: number }>> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다.');
    }

    const embedding = await this.embedText(reportDescription);
    
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
   * Claude에게 보고서 설계 요청
   */
  private async askClaudeToDesignReport(
    request: ReportRequest,
    tableContext: string,
    columnContext: string
  ): Promise<ReportDesign> {
    const prompt = `
당신은 데이터베이스 전문가이자 보고서 설계 전문가입니다.

## 🎯 목표
사용자가 요청한 "${request.reportName}" 보고서를 설계하고 PostgreSQL 쿼리를 생성하세요.

${request.description ? `## 📝 보고서 설명\n${request.description}\n` : ''}

${tableContext}

${columnContext}

## 📋 작업 지침
1. **⚠️ 필수**: 위의 RAG Context에 명시된 테이블과 컬럼**만** 사용하세요
   - RAG Context에 없는 컬럼명은 절대 사용 금지!
   - 추측하거나 만들어내지 마세요!
   - 제공된 문서에서 정확한 컬럼명(대소문자 포함)을 찾아 사용하세요
2. 보고서에 포함될 컬럼들을 설계하세요 (한글명, 영문 컬럼명, 설명)
3. PostgreSQL SELECT 쿼리를 작성하세요
4. JOIN이 필요하면 적절한 JOIN 조건을 추가하세요
5. 가독성을 위해 컬럼에 별칭(alias)을 사용하세요 (AS "한글명")
6. LIMIT은 100으로 제한하세요 (샘플 데이터)
7. 설계 근거를 명확히 설명하세요

## ⚠️ PostgreSQL 중요 규칙
- **모든 테이블명과 컬럼명을 큰따옴표("")로 감싸야 합니다**
- **RAG Context에 제공된 정확한 컬럼명(대소문자 포함)을 사용하세요**
  - 영문 컬럼은 대부분 소문자입니다 (예: yyyymm, sel_code, site)
  - 한글 컬럼은 그대로 사용합니다 (예: 코스트센터, 차변금액)
- PostgreSQL은 대소문자를 엄격하게 구분합니다
- 예시: SELECT "yyyymm", "sel_code" FROM "doi_dept_cost" ✅
- 잘못된 예: SELECT "YYYYMM", "SEL_CODE" FROM "doi_dept_cost" ❌ (에러 발생!)
- 올바른 예: SELECT "yyyymm" AS "년월", "sel_code" AS "SEL코드" FROM "doi_dept_cost" ✅

## 📤 응답 형식 (JSON)
반드시 다음 JSON 형식으로만 응답하세요:

{
  "reportName": "보고서명",
  "columns": [
    {
      "columnName": "한글 컬럼명",
      "description": "컬럼 설명",
      "dataType": "데이터 타입 (string, number, date 등)"
    }
  ],
  "tables": ["사용된 테이블명1", "테이블명2"],
  "sqlQuery": "SELECT ... FROM ... WHERE ... LIMIT 100",
  "reasoning": "왜 이 테이블과 컬럼을 선택했는지 설명"
}

**중요**: 
- 반드시 위 JSON 형식으로만 응답하세요
- sqlQuery는 실행 가능한 완전한 PostgreSQL 쿼리여야 합니다
- RAG Context에 명시된 컬럼명을 정확히 사용하세요 (대소문자 포함)
`;

    const message = await this.anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Claude 응답 추출
    let responseText = '';
    for (const block of message.content) {
      if (block.type === 'text') {
        responseText += block.text;
      }
    }

    // JSON 추출
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Claude가 유효한 JSON을 반환하지 않았습니다.');
    }

    const design = JSON.parse(jsonMatch[0]) as ReportDesign;
    design.agentThinking = responseText;

    return design;
  }

  /**
   * 보고서 설계 생성 (Public API)
   */
  async generateReportDesign(request: ReportRequest): Promise<ReportDesign> {
    console.log(`🤖 Claude가 "${request.reportName}" 보고서 설계 중...`);

    // 1. Vector DB에서 관련 테이블 검색
    const tables = await this.searchRelevantTables(
      `${request.reportName} ${request.description || ''}`,
      5
    );
    console.log(`   ✓ 관련 테이블 ${tables.length}개 검색 완료`);

    // 2. Vector DB에서 관련 컬럼 검색
    const columns = await this.searchRelevantColumns(
      `${request.reportName} ${request.description || ''}`,
      10
    );
    console.log(`   ✓ 관련 컬럼 그룹 ${columns.length}개 검색 완료`);

    // 3. RAG Context 구성
    const tableContext = tables.length > 0
      ? `## 🗂️ 관련 테이블 정보 (RAG Context)\n\n${tables.map(t => t.document).join('\n\n')}`
      : '## 🗂️ 관련 테이블 정보\n\n검색된 관련 테이블이 없습니다.';

    const columnContext = columns.length > 0
      ? `## 📊 관련 컬럼 정보 (RAG Context)\n\n${columns.map(c => c.document).join('\n\n')}`
      : '## 📊 관련 컬럼 정보\n\n검색된 관련 컬럼이 없습니다.';

    // 4. Claude에게 보고서 설계 요청
    const design = await this.askClaudeToDesignReport(request, tableContext, columnContext);
    
    console.log(`   ✓ 보고서 설계 완료: ${design.columns.length}개 컬럼, ${design.tables.length}개 테이블 사용`);

    return design;
  }

  /**
   * Excel 파일 생성
   */
  createExcelBuffer(design: ReportDesign, data: Record<string, any>[]): Buffer {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, design.reportName.substring(0, 31));

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }
}

// ============================================================================
// 헬퍼 함수들
// ============================================================================

export async function generateExcelReport(
  request: ReportRequest
): Promise<ExcelGenerationResult> {
  try {
    const generator = new AgentExcelGeneratorClaude();
    await generator.initialize();

    const design = await generator.generateReportDesign(request);

    return {
      success: true,
      reportDesign: design
    };
  } catch (error) {
    return {
      success: false,
      reportDesign: {
        reportName: request.reportName,
        columns: [],
        tables: [],
        sqlQuery: '',
        reasoning: ''
      },
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

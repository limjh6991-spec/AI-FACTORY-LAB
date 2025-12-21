/**
 * 🤖 AGENT EXCEL GENERATOR - Gemini 기반 Excel 보고서 자동 생성
 * 
 * Purpose: Agent(Gemini)가 RAG 기반으로 DB 스키마를 분석하여 Excel 보고서 생성
 * Architecture: Vector Search → Agent 추론 → SQL 생성 → 데이터 조회 → Excel 생성
 * 
 * Created: 2025-12-03
 * Role: JARVIS = 인프라 제공, AGENT = 보고서 설계 및 SQL 생성
 */

import 'dotenv/config';
import { ChromaClient } from 'chromadb';
import type { Collection } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as XLSX from 'xlsx';

// ============================================================================
// 설정
// ============================================================================

const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const COLLECTION_NAME = 'db_metadata';

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
// Agent Excel Generator 클래스
// ============================================================================

export class AgentExcelGenerator {
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
      where: { type: 'table' } // 테이블 정보만 검색
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
      where: { type: 'column_group' } // 컬럼 그룹만 검색
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
   * Agent에게 보고서 설계 요청
   */
  private async askAgentToDesignReport(
    request: ReportRequest,
    relevantTables: Array<{ tableName: string; document: string; distance: number }>,
    relevantColumns: Array<{ tableName: string; document: string; distance: number }>
  ): Promise<ReportDesign> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // RAG 컨텍스트 구성
    let tableContext = '## 🗂️ 관련 테이블 정보\n\n';
    relevantTables.forEach((table, idx) => {
      const similarity = Math.round((1 - table.distance) * 100);
      tableContext += `### ${idx + 1}. ${table.tableName} (관련도: ${similarity}%)\n`;
      tableContext += `\`\`\`\n${table.document}\n\`\`\`\n\n`;
    });

    let columnContext = '## 📊 관련 컬럼 정보\n\n';
    relevantColumns.forEach((col, idx) => {
      const similarity = Math.round((1 - col.distance) * 100);
      columnContext += `### ${idx + 1}. ${col.tableName} 테이블 (관련도: ${similarity}%)\n`;
      columnContext += `\`\`\`\n${col.document}\n\`\`\`\n\n`;
    });

    // Prompt 구성
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
\`\`\`json
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
  "reasoning": "왜 이 테이블과 컬럼을 선택했는지 설명",
  "thinking": "사고 과정 (선택사항)"
}
\`\`\`

**중요**: 
- 반드시 위 JSON 형식으로만 응답하세요
- sqlQuery는 실행 가능한 완전한 PostgreSQL 쿼리여야 합니다
- **모든 테이블명과 컬럼명을 반드시 큰따옴표("")로 감싸세요**
- 컬럼 별칭은 AS "한글명" 형식을 사용하세요
- 예시: SELECT "YYYYMM" AS "년월", "SEL_CODE" AS "코드" FROM "doi_dept_cost" LIMIT 100
- 테이블명과 컬럼명은 실제 DB 스키마와 정확히 일치해야 합니다
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
      const agentResponse = JSON.parse(jsonText!);

      return {
        reportName: agentResponse.reportName || request.reportName,
        columns: agentResponse.columns || [],
        tables: agentResponse.tables || [],
        sqlQuery: agentResponse.sqlQuery || '',
        reasoning: agentResponse.reasoning || 'Agent가 근거를 제공하지 않았습니다.',
        agentThinking: agentResponse.thinking
      };
    } catch (error) {
      console.error('Agent 보고서 설계 실패:', error);
      throw new Error(`보고서 설계 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  }

  /**
   * SQL 쿼리 실행 및 데이터 조회
   * 
   * Note: 실제 DB 연결이 필요하므로 이 부분은 tRPC 라우터에서 처리
   */
  async generateReportDesign(request: ReportRequest): Promise<ReportDesign> {
    if (!this.collection) {
      throw new Error('초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }

    console.log(`\n🤖 Agent가 "${request.reportName}" 보고서 설계 중...`);
    
    // 1. RAG: 관련 테이블 검색
    const searchQuery = request.description 
      ? `${request.reportName} ${request.description}`
      : request.reportName;
    
    const relevantTables = await this.searchRelevantTables(searchQuery, 5);
    console.log(`   ✓ 관련 테이블 ${relevantTables.length}개 검색 완료`);
    
    // 2. RAG: 관련 컬럼 검색
    const relevantColumns = await this.searchRelevantColumns(searchQuery, 10);
    console.log(`   ✓ 관련 컬럼 그룹 ${relevantColumns.length}개 검색 완료`);
    
    // 3. Agent 추론: 보고서 설계
    const design = await this.askAgentToDesignReport(request, relevantTables, relevantColumns);
    console.log(`   ✓ 보고서 설계 완료: ${design.columns.length}개 컬럼, ${design.tables.length}개 테이블 사용`);
    
    return design;
  }

  /**
   * 데이터를 Excel 파일로 변환
   */
  createExcelBuffer(
    reportDesign: ReportDesign,
    data: Record<string, any>[]
  ): Buffer {
    // 워크북 생성
    const workbook = XLSX.utils.book_new();
    
    // 워크시트 생성
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // 워크시트를 워크북에 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, reportDesign.reportName);
    
    // 메타데이터 시트 추가
    const metadata = [
      { 항목: '보고서명', 값: reportDesign.reportName },
      { 항목: '생성일시', 값: new Date().toISOString() },
      { 항목: '데이터 수', 값: data.length },
      { 항목: '사용 테이블', 값: reportDesign.tables.join(', ') },
      { 항목: '설계 근거', 값: reportDesign.reasoning },
    ];
    const metaSheet = XLSX.utils.json_to_sheet(metadata);
    XLSX.utils.book_append_sheet(workbook, metaSheet, '보고서 정보');
    
    // Buffer로 변환
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return buffer;
  }
}

// ============================================================================
// 편의 함수
// ============================================================================

/**
 * 보고서 설계 생성
 */
export async function designReport(request: ReportRequest): Promise<ReportDesign> {
  const generator = new AgentExcelGenerator();
  await generator.initialize();
  return generator.generateReportDesign(request);
}

/**
 * Excel 버퍼 생성
 */
export function createExcelFromData(
  reportDesign: ReportDesign,
  data: Record<string, any>[]
): Buffer {
  const generator = new AgentExcelGenerator();
  return generator.createExcelBuffer(reportDesign, data);
}

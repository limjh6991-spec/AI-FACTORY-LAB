/**
 * RAG 기반 레포트 생성 스크립트
 * - Excel 시트 분석
 * - Vector DB에서 관련 테이블/컬럼 검색
 * - 실제 DB 메타데이터를 Claude에게 제공
 * - 정확한 테이블/컬럼 매핑으로 레포트 디자인 생성
 */

import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { ChromaClient } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 환경변수 로드
import dotenv from 'dotenv';
dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY?.trim();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();

if (!ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY가 설정되지 않았습니다.');
}
if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY가 설정되지 않았습니다.');
}

// Gemini 임베딩 함수
class GeminiEmbeddingFunction {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
    this.model = this.genAI.getGenerativeModel({ model: 'text-embedding-004' });
  }

  async generate(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];
    for (const text of texts) {
      const result = await this.model.embedContent(text);
      embeddings.push(result.embedding.values);
    }
    return embeddings;
  }
}

// Excel 시트 읽기
function readExcelSheet(filePath: string, sheetName: string): { headers: string[]; data: any[]; rawText: string } {
  const workbook = XLSX.readFile(filePath);
  
  console.log('\n📑 전체 시트 목록:');
  workbook.SheetNames.forEach((name, i) => {
    console.log(`  ${i + 1}. ${name}`);
  });
  
  if (!workbook.SheetNames.includes(sheetName)) {
    throw new Error(`시트 "${sheetName}"을 찾을 수 없습니다.`);
  }
  
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`시트 "${sheetName}"의 워크시트를 읽을 수 없습니다.`);
  }
  
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
  
  // 헤더 찾기 (첫 번째 비어있지 않은 행)
  let headerRowIndex = 0;
  for (let i = 0; i < jsonData.length; i++) {
    const row = jsonData[i];
    if (row && Array.isArray(row) && row.filter(cell => cell !== undefined && cell !== '').length > 3) {
      headerRowIndex = i;
      break;
    }
  }
  
  const headers = jsonData[headerRowIndex]?.map(h => String(h || '').trim()) || [];
  const data = jsonData.slice(headerRowIndex + 1, headerRowIndex + 20); // 샘플 데이터 20행
  
  // 텍스트로 변환
  const rawText = jsonData.slice(0, 30).map(row => 
    (row || []).map(cell => String(cell || '')).join('\t')
  ).join('\n');
  
  return { headers, data, rawText };
}

// Vector DB에서 관련 테이블 검색
async function searchRelatedTables(keywords: string[]): Promise<string[]> {
  console.log('\n🔍 Vector DB에서 관련 테이블 검색 중...');
  console.log(`   검색 키워드: ${keywords.join(', ')}`);
  
  const client = new ChromaClient({ path: 'http://localhost:8000' });
  const embedder = new GeminiEmbeddingFunction();
  
  const collection = await client.getCollection({ name: 'db_metadata' });
  
  const allResults: Set<string> = new Set();
  const tableDetails: Map<string, any> = new Map();
  
  // 각 키워드로 검색
  for (const keyword of keywords) {
    const queryEmbedding = await embedder.generate([keyword]);
    
    const results = await collection.query({
      queryEmbeddings: queryEmbedding,
      nResults: 10
      // where 조건 제거: source 필드가 메타데이터에 존재하지 않음
    });
    
    results.documents[0]?.forEach((doc, i) => {
      const meta = results.metadatas[0]?.[i] as any;
      const tableName = meta?.table_name || meta?.tableName;
      if (tableName && tableName.startsWith('doi_')) {
        allResults.add(tableName);
        if (!tableDetails.has(tableName)) {
          tableDetails.set(tableName, {
            document: doc,
            distance: results.distances?.[0]?.[i] || 0
          });
        }
      }
    });
  }
  
  console.log(`   발견된 테이블: ${allResults.size}개`);
  
  return Array.from(allResults);
}

// DB 메타데이터에서 테이블 정보 로드
function loadTableMetadata(tableNames: string[]): any[] {
  const metadataPath = path.join(process.cwd(), 'data', 'db_metadata_enhanced.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
  
  const tables: any[] = [];
  
  for (const table of metadata) {
    if (tableNames.includes(table.name)) {
      tables.push({
        name: table.name,
        korean_name: table.korean_name,
        columns: table.columns.map((col: any) => ({
          name: col.name,
          korean_name: col.korean_name,
          type: col.type,
          meaning: col.meaning
        }))
      });
    }
  }
  
  return tables;
}

// Claude API로 레포트 디자인 생성
async function generateReportDesign(
  excelData: { headers: string[]; data: any[]; rawText: string },
  tableMetadata: any[],
  reportName: string
): Promise<any> {
  console.log('\n🤖 Claude API에 레포트 디자인 요청 중...');
  
  const client = new Anthropic({
    apiKey: ANTHROPIC_API_KEY
  });
  
  // 테이블 메타데이터를 문자열로 변환
  const tableMetadataStr = tableMetadata.map(table => {
    const columns = table.columns.map((col: any) => 
      `    - ${col.name} (${col.korean_name}): ${col.type}`
    ).join('\n');
    return `\n## 테이블: ${table.name} (${table.korean_name})\n${columns}`;
  }).join('\n');
  
  const systemPrompt = `당신은 ERP/MES 시스템 전문가입니다.
Excel 데이터를 분석하고, 제공된 실제 DB 테이블 메타데이터를 기반으로 레포트 화면을 설계합니다.

**중요**: 
- 반드시 아래 제공된 "실제 DB 테이블 목록"에 있는 테이블과 컬럼만 사용하세요.
- 존재하지 않는 테이블이나 컬럼을 만들어내지 마세요.
- 컬럼명은 대소문자를 정확히 일치시키세요.`;

  const userPrompt = `# Excel 데이터 분석 및 레포트 디자인 요청

## 레포트명: ${reportName}

## Excel 헤더:
${excelData.headers.join(', ')}

## Excel 데이터 샘플 (처음 5행):
${excelData.data.slice(0, 5).map(row => 
  Array.isArray(row) ? row.join(' | ') : JSON.stringify(row)
).join('\n')}

## Excel 원본 텍스트 (참고용):
\`\`\`
${excelData.rawText.substring(0, 1500)}
\`\`\`

---

## ⚠️ 실제 DB 테이블 목록 (반드시 이 테이블/컬럼만 사용하세요):
${tableMetadataStr}

---

## 요청사항:
위 Excel 데이터를 기반으로 "${reportName}" 레포트 화면을 JSON 형식으로 설계해주세요.

**반드시 지켜야 할 규칙**:
1. dbMapping에는 위에 제공된 테이블과 컬럼만 사용
2. 테이블명과 컬럼명은 정확히 일치해야 함 (대소문자 포함)
3. 존재하지 않는 테이블/컬럼 사용 금지
4. 매핑할 수 없는 Excel 컬럼은 dbMapping을 null로 설정

JSON 형식:
\`\`\`json
{
  "reportId": "고유ID",
  "reportName": "레포트명",
  "description": "설명",
  "searchConditions": [...],
  "gridColumns": [
    {
      "header": "Excel 헤더명",
      "field": "필드명",
      "width": 100,
      "align": "center|left|right",
      "dbMapping": {
        "table": "실제_테이블명",
        "column": "실제_컬럼명"
      } // 또는 매핑 불가시 null
    }
  ],
  "sql": "실제 테이블/컬럼을 사용한 SQL",
  "dbTables": {
    "main": "메인테이블",
    "related": [...]
  },
  "unmappedColumns": ["매핑되지 않은 Excel 컬럼들"]
}
\`\`\``;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      { role: 'user', content: userPrompt }
    ],
    system: systemPrompt
  });
  
  // 응답에서 JSON 추출
  const content = response.content[0];
  if (!content || content.type !== 'text') {
    throw new Error('Claude 응답이 비어있습니다.');
  }
  
  const text = content.text;
  console.log('\n' + '='.repeat(70));
  console.log('📋 Claude API 응답');
  console.log('='.repeat(70));
  console.log(text);
  
  // JSON 블록 추출
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (!jsonMatch || !jsonMatch[1]) {
    console.warn('⚠️ JSON 블록을 찾을 수 없습니다. 전체 응답 반환.');
    return { rawResponse: text };
  }
  
  try {
    return JSON.parse(jsonMatch[1]);
  } catch (e) {
    console.warn('⚠️ JSON 파싱 실패:', e);
    return { rawResponse: text };
  }
}

// 메인 함수
async function main() {
  const excelPath = '/home/roarm_m3/dwisCOST/docs/원가시스템 폼.ver7.xlsx';
  const sheetName = '3. 판매 실적 집계';
  const reportName = '판매 실적 집계';
  
  console.log('='.repeat(70));
  console.log('🎯 RAG 기반 레포트 생성');
  console.log('='.repeat(70));
  
  // 1. Excel 읽기
  console.log(`\n📂 Excel 파일 읽는 중: ${excelPath}`);
  console.log(`📋 시트: ${sheetName}`);
  
  const excelData = readExcelSheet(excelPath, sheetName);
  
  console.log(`\n📊 Excel 헤더 (${excelData.headers.length}개):`);
  console.log(`   ${excelData.headers.slice(0, 15).join(', ')}...`);
  
  // 2. Excel 헤더에서 키워드 추출
  const keywords = [
    '판매', '매출', '실적', '고객', '거래처', '제품', '모델',
    ...excelData.headers.filter(h => h && h.length > 1).slice(0, 10)
  ];
  
  // 3. Vector DB에서 관련 테이블 검색
  const relatedTableNames = await searchRelatedTables(keywords);
  
  // 기본 테이블 추가
  const defaultTables = ['doi_sale_resc', 'doi_cust_mast', 'doi_model_mast', 'doi_slco', 'doi_prod_subul'];
  const allTableNames = [...new Set([...relatedTableNames, ...defaultTables])];
  
  console.log(`\n📋 사용할 테이블: ${allTableNames.join(', ')}`);
  
  // 4. DB 메타데이터 로드
  const tableMetadata = loadTableMetadata(allTableNames);
  console.log(`\n📊 로드된 테이블 메타데이터: ${tableMetadata.length}개`);
  tableMetadata.forEach(t => {
    console.log(`   - ${t.name}: ${t.columns.length}개 컬럼`);
  });
  
  // 5. Claude API로 레포트 디자인 생성
  const reportDesign = await generateReportDesign(excelData, tableMetadata, reportName);
  
  // 6. 결과 저장
  const outputPath = path.join(process.cwd(), 'data', `report_design_${reportName.replace(/\s+/g, '_')}_rag.json`);
  fs.writeFileSync(outputPath, JSON.stringify(reportDesign, null, 2), 'utf-8');
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ RAG 기반 레포트 디자인 저장 완료');
  console.log('='.repeat(70));
  console.log(`📁 파일: ${outputPath}`);
  
  // 7. 매핑 결과 요약
  if (reportDesign.gridColumns) {
    const mapped = reportDesign.gridColumns.filter((c: any) => c.dbMapping !== null);
    const unmapped = reportDesign.gridColumns.filter((c: any) => c.dbMapping === null);
    
    console.log(`\n📈 매핑 결과:`);
    console.log(`   ✅ 매핑된 컬럼: ${mapped.length}개`);
    console.log(`   ❌ 미매핑 컬럼: ${unmapped.length}개`);
    
    if (unmapped.length > 0) {
      console.log(`   미매핑 목록: ${unmapped.map((c: any) => c.header).join(', ')}`);
    }
  }
  
  if (reportDesign.unmappedColumns && reportDesign.unmappedColumns.length > 0) {
    console.log(`\n⚠️ 매핑되지 않은 Excel 컬럼:`);
    reportDesign.unmappedColumns.forEach((col: string) => {
      console.log(`   - ${col}`);
    });
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ 완료!');
  console.log('='.repeat(70));
}

main().catch(console.error);

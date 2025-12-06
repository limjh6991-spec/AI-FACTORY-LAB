/**
 * 화면 생성기 API 라우터
 * - Excel 템플릿 검증
 * - Claude API를 통한 미리보기 생성
 * - SQL 쿼리 자동 생성
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as XLSX from "xlsx";
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

// DB 메타데이터 타입
interface ColumnMeta {
  name: string;
  korean_name: string;
  type: string;
  max_length: number | null;
  nullable: boolean;
  meaning: string;
}

interface TableMeta {
  name: string;
  korean_name: string;
  columns: ColumnMeta[];
}

// DB 메타데이터 캐시
let dbMetadataCache: TableMeta[] | null = null;

function loadDbMetadata(): TableMeta[] {
  if (dbMetadataCache) return dbMetadataCache;
  
  const metadataPath = path.join(process.cwd(), 'data', 'db_metadata_enhanced.json');
  if (!fs.existsSync(metadataPath)) {
    console.log('[DEBUG] DB 메타데이터 파일 없음:', metadataPath);
    return [];
  }
  
  try {
    const content = fs.readFileSync(metadataPath, 'utf-8');
    dbMetadataCache = JSON.parse(content) as TableMeta[];
    console.log(`[DEBUG] DB 메타데이터 로드: ${dbMetadataCache.length}개 테이블`);
    return dbMetadataCache;
  } catch (error) {
    console.error('[DEBUG] DB 메타데이터 파싱 오류:', error);
    return [];
  }
}

function findTableMeta(tableName: string): TableMeta | undefined {
  const metadata = loadDbMetadata();
  return metadata.find(t => t.name.toLowerCase() === tableName.toLowerCase());
}

// 화면 ID 생성 (SC + 6자리 숫자)
async function generateScreenId(ctx: any): Promise<string> {
  try {
    // 기존 화면 ID 조회해서 최대값 찾기
    const screensDir = path.join(process.cwd(), 'generated', 'screens');
    let maxNum = 0;
    
    if (fs.existsSync(screensDir)) {
      const dirs = fs.readdirSync(screensDir);
      for (const dir of dirs) {
        if (dir.startsWith('SC') && dir.length === 8) {
          const num = parseInt(dir.slice(2), 10);
          if (!isNaN(num) && num > maxNum) {
            maxNum = num;
          }
        }
      }
    }
    
    // 다음 번호로 ID 생성
    const nextNum = maxNum + 1;
    return `SC${nextNum.toString().padStart(6, '0')}`;
  } catch (error) {
    // 실패시 타임스탬프 기반 ID
    return `SC${Date.now().toString().slice(-6)}`;
  }
}

/**
 * 생성된 컴포넌트 코드를 실제 Next.js 페이지로 변환
 * - TypeScript 타입 추가
 * - AG Grid 모듈 등록 추가
 * - 실제 동작하는 UI 컴포넌트 import 추가
 */
function convertToNextPage(componentCode: string, screenId: string, screenName: string): string {
  // 기본 import 구문 (API 호출을 위해 useEffect, useCallback 추가)
  const imports = `'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download, Loader2 } from 'lucide-react';

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

`;

  // 기존 코드에서 import 부분 제거
  let cleanedCode = componentCode
    // 기존 import 제거
    .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '')
    // "use client" 제거
    .replace(/['"]use client['"];?\s*/g, '')
    // export default function 찾아서 컴포넌트명 추출
    .trim();
  
  // 컴포넌트명을 영문으로 변환 (한글 함수명 방지)
  const safeComponentName = `Screen${screenId.replace('SC', '')}`;
  cleanedCode = cleanedCode.replace(
    /export\s+default\s+function\s+[\w가-힣]+\s*\(/,
    `export default function ${safeComponentName}(`
  );

  // 샘플 데이터 기반 코드를 API 호출 코드로 변환
  // 1. sampleData 선언 제거하고 빈 배열로 초기화
  cleanedCode = cleanedCode.replace(
    /const\s+sampleData\s*=\s*\[[\s\S]*?\];/,
    '// 샘플 데이터는 제거됨 - API에서 조회'
  );
  
  // 2. useState(sampleData) → useState([])
  cleanedCode = cleanedCode.replace(
    /const\s*\[\s*rowData\s*,\s*setRowData\s*\]\s*=\s*useState\s*\(\s*sampleData\s*\)/,
    `const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 실제 DB 데이터 조회
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/screens/${screenId.toLowerCase()}/data');
      if (!response.ok) throw new Error('데이터 조회 실패');
      const result = await response.json();
      setRowData(result.data || []);
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    fetchData();
  }, [fetchData])`
  );
  
  // 3. handleSearch 수정 - 실제 API 호출
  cleanedCode = cleanedCode.replace(
    /const\s+handleSearch\s*=\s*\(\)\s*=>\s*\{[\s\S]*?console\.log\(['"]검색 실행['"]\);?\s*\};?/,
    `const handleSearch = () => {
    fetchData();
  };`
  );
  
  // 4. handleReset 수정
  cleanedCode = cleanedCode.replace(
    /const\s+handleReset\s*=\s*\(\)\s*=>\s*\{[\s\S]*?setRowData\s*\(\s*sampleData\s*\);?\s*\};?/,
    `const handleReset = () => {
    fetchData();
  };`
  );

  // AG Grid 스타일 추가
  const agGridStyles = `
{/* AG Grid 커스텀 스타일 */}
<style jsx global>{\`
  .ag-theme-alpine {
    --ag-header-background-color: #4f7cba;
    --ag-header-foreground-color: white;
    --ag-row-hover-color: #f0f7ff;
    --ag-selected-row-background-color: #e1efff;
    --ag-border-color: #e5e7eb;
    --ag-font-family: 'IBM Plex Sans', sans-serif;
    --ag-font-size: 13px;
  }
  .ag-theme-alpine .ag-header-group-cell {
    background: linear-gradient(180deg, #5a8ac7 0%, #4f7cba 100%);
    font-weight: 600;
  }
  .ag-theme-alpine .ag-header-cell {
    background: linear-gradient(180deg, #6b9bd1 0%, #5a8ac7 100%);
  }
  .ag-row-total {
    background-color: #f8fafc !important;
    font-weight: 600;
    border-top: 2px solid #4f7cba;
    border-bottom: 2px solid #4f7cba;
  }
\`}</style>
`;

  // return 문 앞에 스타일 삽입
  if (cleanedCode.includes('return (')) {
    cleanedCode = cleanedCode.replace(
      'return (',
      `return (
    <>${agGridStyles}`
    );
    // 마지막 닫는 괄호 수정
    const lastReturnEnd = cleanedCode.lastIndexOf(');');
    if (lastReturnEnd > 0) {
      cleanedCode = cleanedCode.slice(0, lastReturnEnd) + '</>);' + cleanedCode.slice(lastReturnEnd + 2);
    }
  }

  return imports + cleanedCode;
}

// .env.local에서 직접 API 키 읽기 (환경 변수 오염 방지)
function getAnthropicApiKey(): string | null {
  // 1. .env.local 파일에서 직접 읽기 시도
  const envLocalPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf-8');
    const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match && match[1]) {
      const key = match[1].trim();
      if (key.length >= 100) {
        console.log(`[DEBUG] .env.local에서 API 키 로드 (${key.length}자)`);
        return key;
      }
    }
  }
  
  // 2. .env 파일에서 직접 읽기 시도
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match && match[1]) {
      const key = match[1].trim();
      if (key.length >= 100) {
        console.log(`[DEBUG] .env에서 API 키 로드 (${key.length}자)`);
        return key;
      }
    }
  }
  
  // 3. 환경 변수에서 가져오기 (폴백)
  const envKey = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
  if (envKey && envKey.length >= 100) {
    console.log(`[DEBUG] 환경 변수에서 API 키 로드 (${envKey.length}자)`);
    return envKey;
  }
  
  console.log(`[DEBUG] API 키를 찾을 수 없거나 잘려있음`);
  return null;
}

// 검증 결과 타입
const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  screenName: z.string().optional(),
  screenNameEn: z.string().optional(),
  tableName: z.string().optional(),
  columns: z.number().optional(),
  searchConditions: z.number().optional(),
  summaryRows: z.array(z.string()).optional(),
  errors: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
  parsedData: z.any().optional(),
});

// 미리보기 결과 타입
const PreviewResultSchema = z.object({
  success: z.boolean(),
  html: z.string().optional(),
  componentCode: z.string().optional(),
  error: z.string().optional(),
});

export const screenGeneratorRouter = createTRPCRouter({
  /**
   * Excel 템플릿 검증
   */
  validateTemplate: publicProcedure
    .input(z.object({
      fileBase64: z.string(),
      fileName: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        // Base64 → Buffer → Workbook
        const buffer = Buffer.from(input.fileBase64, "base64");
        const workbook = XLSX.read(buffer, { type: "buffer" });
        
        const errors: string[] = [];
        const warnings: string[] = [];
        
        // 1. 필수 시트 확인
        const requiredSheets = ["메타정보", "조회조건", "그리드컬럼"];
        for (const sheetName of requiredSheets) {
          if (!workbook.SheetNames.includes(sheetName)) {
            errors.push(`필수 시트 '${sheetName}'이(가) 없습니다.`);
          }
        }
        
        if (errors.length > 0) {
          return {
            isValid: false,
            errors,
            warnings,
          };
        }
        
        // 2. 메타정보 시트 파싱
        const metaSheet = workbook.Sheets["메타정보"];
        const metaData = XLSX.utils.sheet_to_json<string[]>(metaSheet!, { header: 1, defval: "" });
        
        let screenName = "";
        let screenNameEn = "";
        let tableName = "";
        
        // 디버그: 메타정보 시트 내용 출력
        console.log("[DEBUG] 메타정보 시트 파싱:");
        for (const row of metaData) {
          const key = row[0]?.toString().trim() || "";
          const value = row[1]?.toString().trim() || "";
          console.log(`  [${key}] = [${value}]`);
          if (key === "화면명") screenName = value;
          if (key === "화면명(영문)") screenNameEn = value;
          if (key === "테이블명" || key === "사용테이블") tableName = value;
        }
        console.log(`[DEBUG] 파싱 결과: screenName=${screenName}, tableName=${tableName}`);
        
        if (!screenName) {
          errors.push("메타정보 시트에 '화면명'이 없습니다.");
        }
        
        if (!tableName) {
          warnings.push("메타정보 시트에 '테이블명'이 없습니다. 쿼리 생성 시 수동 입력이 필요합니다.");
        }
        
        // 3. 조회조건 시트 파싱
        const searchSheet = workbook.Sheets["조회조건"];
        const searchData = XLSX.utils.sheet_to_json<string[]>(searchSheet!, { header: 1, defval: "" });
        const searchConditions = searchData.filter((row, i) => i >= 2 && row[0]).length;
        
        // 4. 그리드컬럼 시트 파싱 (핵심!)
        const gridSheet = workbook.Sheets["그리드컬럼"];
        const gridData = XLSX.utils.sheet_to_json<string[]>(gridSheet!, { header: 1, defval: "" });
        const merges = gridSheet!["!merges"] || [];
        
        // Row 2 (1차 헤더), Row 3 (2차 헤더) 확인
        const row2 = gridData[1] || [];
        const row3 = gridData[2] || [];
        
        // 컬럼 수 계산
        let columnCount = 0;
        for (let col = 0; col < row3.length; col++) {
          const header = row3[col]?.toString().trim() || row2[col]?.toString().trim();
          if (header && !header.includes("합계")) {
            columnCount++;
          }
        }
        
        // 병합 셀 검증
        const groupHeaderMap = new Map<number, string>();
        for (const merge of merges) {
          // 가로 병합 (그룹 헤더)
          if (merge.s.r === 1 && merge.e.r === 1 && merge.s.c !== merge.e.c) {
            const headerValue = row2[merge.s.c]?.toString().trim() || "";
            if (headerValue) {
              for (let c = merge.s.c; c <= merge.e.c; c++) {
                groupHeaderMap.set(c, headerValue);
              }
            }
          }
        }
        
        // 그룹명과 상세 컬럼명 동일 여부 체크
        for (let col = 0; col < row3.length; col++) {
          const groupHeader = groupHeaderMap.get(col);
          const detailHeader = row3[col]?.toString().trim();
          
          if (groupHeader && detailHeader && groupHeader === detailHeader) {
            warnings.push(`Col ${col + 1}: 그룹명 '${groupHeader}'과 상세 컬럼명이 동일합니다. 구분을 권장합니다.`);
          }
        }
        
        // 합계 행 추출
        const summaryRows: string[] = [];
        for (let row = 3; row < gridData.length; row++) {
          const firstCell = gridData[row]?.[0]?.toString() || "";
          if (firstCell.includes("합계")) {
            summaryRows.push(firstCell);
          }
        }
        
        // 컬럼명 중복 체크
        const headerCounts = new Map<string, number>();
        for (const header of row3) {
          const h = header?.toString().trim();
          if (h) {
            headerCounts.set(h, (headerCounts.get(h) || 0) + 1);
          }
        }
        for (const [header, count] of headerCounts) {
          if (count > 1) {
            warnings.push(`상세 컬럼명 '${header}'이(가) ${count}번 중복됩니다.`);
          }
        }
        
        // 최종 결과
        const isValid = errors.length === 0;
        
        // 파싱 데이터 (Claude API 전송용)
        const parsedData = {
          screenName,
          screenNameEn,
          tableName,
          searchConditions: searchData.filter((row, i) => i >= 2 && row[0]).map(row => ({
            id: row[0],
            label: row[1],
            type: row[2],
            required: row[3] === "Y",
            defaultValue: row[4],
            description: row[5],
          })),
          gridColumns: {
            row1: gridData[0],
            row2: row2,
            row3: row3,
            merges: merges.map(m => ({
              startCol: m.s.c,
              endCol: m.e.c,
              startRow: m.s.r,
              endRow: m.e.r,
            })),
            summaryRows,
            sampleData: gridData.slice(3).filter(row => {
              const firstCell = row[0]?.toString() || "";
              return firstCell && !firstCell.includes("합계");
            }).slice(0, 5), // 샘플 5행만
          },
        };
        
        return {
          isValid,
          screenName,
          screenNameEn,
          tableName,
          columns: columnCount,
          searchConditions,
          summaryRows,
          errors,
          warnings,
          parsedData,
        };
      } catch (error) {
        return {
          isValid: false,
          errors: [`파일 파싱 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`],
          warnings: [],
        };
      }
    }),

  /**
   * Claude API로 미리보기 생성 (새로운 접근법: JSON 데이터만 생성)
   */
  generatePreview: publicProcedure
    .input(z.object({
      parsedData: z.any(),
      previewType: z.enum(["html", "react"]).default("html"),
    }))
    .mutation(async ({ input }) => {
      try {
        // API 키 가져오기 (파일에서 직접 읽기)
        const apiKey = getAnthropicApiKey();
        
        if (!apiKey) {
          return {
            success: false,
            error: "ANTHROPIC_API_KEY가 설정되지 않았거나 잘려있습니다. .env.local 파일을 확인하세요.",
          };
        }
        
        const anthropic = new Anthropic({ apiKey });
        
        // 새로운 접근법: JSON 데이터만 요청
        const jsonPrompt = buildJsonDataPrompt(input.parsedData);
        
        const message = await anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: jsonPrompt,
            },
          ],
        });
        
        // 응답에서 JSON 추출
        const content = message.content[0];
        if (!content || content.type !== "text") {
          return {
            success: false,
            error: "Claude API 응답 형식 오류",
          };
        }
        
        console.log("[DEBUG] Claude JSON 응답:", content.text.substring(0, 500));
        
        // JSON 파싱
        let gridData;
        try {
          // JSON 블록 추출
          const jsonMatch = content.text.match(/```json\s*([\s\S]*?)\s*```/) || 
                           content.text.match(/\{[\s\S]*\}/);
          const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content.text;
          gridData = JSON.parse(jsonStr);
          console.log("[DEBUG] JSON 파싱 성공:", Object.keys(gridData));
        } catch (parseError) {
          console.error("[ERROR] JSON 파싱 실패:", parseError);
          console.log("[DEBUG] 파싱 실패로 기본 데이터 사용");
          
          // 파싱 실패 시 parsedData에서 기본 데이터 생성
          gridData = createDefaultGridData(input.parsedData);
        }
        
        // 템플릿에 데이터 주입하여 React 코드 생성
        const reactCode = generateReactFromTemplate(input.parsedData, gridData);
        
        console.log("[DEBUG] 생성된 React 코드 길이:", reactCode.length);
        
        if (input.previewType === "html") {
          const htmlCode = generateHtmlFromTemplate(input.parsedData, gridData);
          return {
            success: true,
            html: htmlCode,
            preview: htmlCode,
          };
        }
        
        return {
          success: true,
          componentCode: reactCode,
          preview: reactCode,
        };
      } catch (error) {
        return {
          success: false,
          error: `Claude API 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
        };
      }
    }),

  /**
   * SQL 쿼리 자동 생성
   */
  generateQuery: publicProcedure
    .input(z.object({
      parsedData: z.any(),
      tableName: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        const { parsedData, tableName } = input;
        
        // 한글 헤더 → DB 컬럼 매핑 사전
        const headerToColumnMap: Record<string, string[]> = {
          // 기본 정보
          '자재구분': ['mat_gubun', 'mat_class'],
          '품번': ['mat_code', 'item_code'],
          '품명': ['mat_desc', 'mat_name', 'item_name'],
          '대분류': ['mat_class', 'category1'],
          '중분류': ['mat_class2', 'category2'],
          '규격': ['size', 'spec'],
          '모델': ['model'],
          '년월': ['yyyymm'],
          '사업장': ['site'],
          
          // 기초
          '기초': ['begin_qty', 'begin_amt', 'begin_cost'],
          '기초수량': ['begin_qty', 'opening_qty'],
          '기초금액': ['begin_amt', 'opening_amt'],
          '기초단가': ['begin_cost', 'begin_unit_cost'],
          
          // 입고
          '입고': ['in_qty', 'in_amt'],
          '입고수량': ['in_qty', 'receipt_qty'],
          '입고금액': ['in_amt', 'receipt_amt'],
          '입고단가': ['unit_cost', 'in_unit_cost'],
          '기타입고수량': ['etc_in_qty', 'other_in_qty'],
          '기타입고금액': ['etc_in_amt', 'other_in_amt'],
          '기타입고단가': ['etc_in_cost', 'other_in_cost'],
          
          // 출고
          '출고': ['out_qty', 'out_amt'],
          '출고수량': ['out_qty', 'issue_qty'],
          '출고금액': ['out_amt', 'issue_amt'],
          '출고단가': ['out_unit_cost'],
          '기타출고수량': ['etc_out_qty', 'other_out_qty'],
          '기타출고금액': ['etc_out_amt', 'other_out_amt'],
          '기타출고단가': ['etc_out_cost'],
          
          // 재고
          '재고': ['stock_qty', 'stock_amt'],
          '재고수량': ['stock_qty', 'balance_qty', 'end_qty'],
          '재고금액': ['stock_amt', 'balance_amt', 'end_amt'],
          '재고단가': ['stock_cost', 'balance_cost'],
          
          // 수량/금액
          '수량': ['qty'],
          '금액': ['amt', 'amount'],
          '단가': ['cost', 'unit_cost', 'price'],
        };
        
        // 1. DB 메타데이터에서 테이블 정보 조회
        const tableMeta = findTableMeta(tableName);
        
        if (!tableMeta) {
          return {
            success: false,
            error: `테이블 '${tableName}'을(를) 찾을 수 없습니다. DB 메타데이터를 확인하세요.`,
            availableTables: loadDbMetadata().slice(0, 20).map(t => t.name), // 힌트용
          };
        }
        
        // 2. 조회조건에서 WHERE 절 컬럼 추출
        const searchConditions = parsedData.searchConditions || [];
        const whereColumns: string[] = [];
        const columnMappings: Array<{label: string; dbColumn: string; type: string}> = [];
        
        for (const sc of searchConditions) {
          const label = sc.label?.toString() || '';
          const scId = sc.id?.toString().toLowerCase() || '';
          
          // 1차: 매핑 사전에서 찾기
          let matchedColName: string | null = null;
          const mappedCols = headerToColumnMap[label];
          if (mappedCols) {
            for (const candidate of mappedCols) {
              const found = tableMeta.columns.find(c => c.name.toLowerCase() === candidate.toLowerCase());
              if (found) {
                matchedColName = found.name;
                break;
              }
            }
          }
          
          // 2차: 메타데이터에서 직접 찾기
          if (!matchedColName) {
            const matchedCol = tableMeta.columns.find(col => {
              const colName = col.name.toLowerCase();
              const korName = col.korean_name.toLowerCase();
              return colName.includes(scId) || 
                     korName.includes(label.toLowerCase()) ||
                     scId.includes(colName);
            });
            if (matchedCol) matchedColName = matchedCol.name;
          }
          
          if (matchedColName) {
            whereColumns.push(matchedColName);
            const col = tableMeta.columns.find(c => c.name === matchedColName);
            columnMappings.push({
              label: sc.label,
              dbColumn: matchedColName,
              type: col?.type || 'unknown',
            });
          } else {
            columnMappings.push({
              label: sc.label,
              dbColumn: sc.id || 'UNKNOWN',
              type: 'unknown',
            });
          }
        }
        
        // 3. 그리드 컬럼에서 SELECT 절 컬럼 추출
        const gridColumns = parsedData.gridColumns || {};
        const row2 = gridColumns.row2 || []; // 그룹 헤더
        const row3 = gridColumns.row3 || []; // 상세 헤더
        const selectColumns: string[] = [];
        const selectMappings: Array<{gridHeader: string; dbColumn: string; type: string; alias: string}> = [];
        
        // 기본 컬럼 추가 (그룹화/정렬용)
        const baseColumns = ['yyyymm', 'site', 'mat_gubun', 'mat_code', 'mat_desc', 'size'];
        for (const col of baseColumns) {
          const found = tableMeta.columns.find(c => c.name.toLowerCase() === col);
          if (found && !selectColumns.includes(found.name)) {
            selectColumns.push(found.name);
          }
        }
        
        // row2 (그룹) + row3 (상세) 조합해서 매핑
        // 모든 헤더에 대해 매핑 시도 (미매핑은 빈값으로 처리)
        const allColumnMappings: Array<{
          gridHeader: string;
          dbColumn: string | null;
          type: string;
          alias: string;
          isMapped: boolean;
        }> = [];
        
        for (let i = 0; i < row3.length; i++) {
          const groupHeader = row2[i]?.toString().trim() || '';
          const detailHeader = row3[i]?.toString().trim() || '';
          
          // 상세 헤더가 없으면 그룹 헤더 사용
          const h = detailHeader || groupHeader;
          if (!h || h.includes('합계')) continue;
          
          // 1차: 매핑 사전에서 찾기
          let matchedColName: string | null = null;
          const mappedCols = headerToColumnMap[h];
          if (mappedCols) {
            for (const candidate of mappedCols) {
              const found = tableMeta.columns.find(c => c.name.toLowerCase() === candidate.toLowerCase());
              if (found && !selectColumns.includes(found.name)) {
                matchedColName = found.name;
                break;
              }
            }
          }
          
          // 2차: 메타데이터에서 직접 찾기
          if (!matchedColName) {
            const matchedCol = tableMeta.columns.find(col => {
              const colName = col.name.toLowerCase();
              const korName = col.korean_name.toLowerCase();
              const hLower = h.toLowerCase();
              return (colName === hLower || korName === hLower ||
                      hLower.includes(colName) || hLower.includes(korName)) &&
                     !selectColumns.includes(col.name);
            });
            if (matchedCol) matchedColName = matchedCol.name;
          }
          
          if (matchedColName) {
            selectColumns.push(matchedColName);
            const col = tableMeta.columns.find(c => c.name === matchedColName);
            selectMappings.push({
              gridHeader: h,
              dbColumn: matchedColName,
              type: col?.type || 'unknown',
              alias: h, // 한글 별칭
            });
            allColumnMappings.push({
              gridHeader: h,
              dbColumn: matchedColName,
              type: col?.type || 'unknown',
              alias: h,
              isMapped: true,
            });
          } else {
            // 미매핑 헤더도 빈값으로 추가
            allColumnMappings.push({
              gridHeader: h,
              dbColumn: null,
              type: 'unknown',
              alias: h,
              isMapped: false,
            });
          }
        }
        
        // 4. SELECT 컬럼이 없으면 전체 컬럼 사용 (비즈니스 컬럼만)
        if (allColumnMappings.length === 0) {
          const businessColumns = tableMeta.columns.filter(col => 
            !col.name.toLowerCase().includes('create') &&
            !col.name.toLowerCase().includes('update') &&
            !col.name.toLowerCase().includes('delete')
          );
          for (const col of businessColumns.slice(0, 20)) { // 최대 20개
            selectColumns.push(col.name);
            selectMappings.push({
              gridHeader: col.korean_name || col.name,
              dbColumn: col.name,
              type: col.type,
              alias: col.korean_name || col.name,
            });
            allColumnMappings.push({
              gridHeader: col.korean_name || col.name,
              dbColumn: col.name,
              type: col.type,
              alias: col.korean_name || col.name,
              isMapped: true,
            });
          }
        }
        
        // 5. SQL 쿼리 생성 (전체 컬럼 포함, 미매핑은 빈값)
        const selectItems = allColumnMappings.length > 0
          ? allColumnMappings.map((m, index) => {
              const isLast = index === allColumnMappings.length - 1;
              const comma = isLast ? '' : ',';
              if (m.isMapped && m.dbColumn) {
                return `  ${m.dbColumn} AS "${m.alias}"${comma}`;
              } else {
                // 미매핑 컬럼: 빈값으로 표시 (주석은 쉼표 앞에)
                return `  '' AS "${m.alias}"${comma}  -- TODO: 미매핑`;
              }
            })
          : selectColumns.map((c, index) => {
              const isLast = index === selectColumns.length - 1;
              return `  ${c}${isLast ? '' : ','}`;
            });
        const selectClause = selectItems.join('\n');
        
        // WHERE 절 생성 (파라미터 바인딩 스타일)
        let whereClause = '';
        if (whereColumns.length > 0) {
          const conditions = columnMappings
            .filter(m => m.dbColumn !== 'UNKNOWN')
            .map(m => {
              if (m.type.includes('varchar') || m.type.includes('text')) {
                return `  AND ${m.dbColumn} = :${m.dbColumn}`;
              } else if (m.type.includes('date') || m.type.includes('timestamp')) {
                return `  AND ${m.dbColumn} BETWEEN :${m.dbColumn}_start AND :${m.dbColumn}_end`;
              } else {
                return `  AND ${m.dbColumn} = :${m.dbColumn}`;
              }
            });
          whereClause = conditions.join('\n');
        }
        
        // 미매핑 헤더 추출
        const unmatchedHeaders = allColumnMappings
          .filter(m => !m.isMapped)
          .map(m => m.gridHeader);
        
        // 미매핑 컬럼에 대한 주석 생성
        let unmatchedComment = '';
        if (unmatchedHeaders.length > 0) {
          unmatchedComment = `
-- ⚠️ 미매핑 컬럼 ${unmatchedHeaders.length}개 (빈값으로 처리됨 - JOIN 또는 계산 필요):
-- ${unmatchedHeaders.join(', ')}
-- 
-- 💡 힌트: 자재수불부는 보통 다음과 같은 구조가 필요합니다:
--   - 기초 = 전월 재고
--   - 입고 = 당월 입고 합계
--   - 출고 = 당월 출고 합계  
--   - 재고 = 기초 + 입고 - 출고
-- 별도 테이블 JOIN 또는 서브쿼리/CTE로 계산 필요
`;
        }
        
        // 기본 WHERE 1=1 추가 (조건 추가 용이하게)
        const sql = `-- ${parsedData.screenName || '화면'} 조회 쿼리
-- 생성일시: ${new Date().toISOString()}
-- 테이블: ${tableName}
-- 사용 가능 컬럼: ${tableMeta.columns.length}개
${unmatchedComment}
SELECT
${selectClause}
FROM ${tableName}
WHERE 1=1
${whereClause}
ORDER BY ${selectColumns[0] || 'yyyymm'} DESC
;`;
        
        // 6. 메타데이터 정보도 함께 반환
        const mappedCount = allColumnMappings.filter(m => m.isMapped).length;
        const unmappedCount = allColumnMappings.filter(m => !m.isMapped).length;
        
        return {
          success: true,
          sql,
          tableMeta: {
            name: tableMeta.name,
            korean_name: tableMeta.korean_name,
            columnCount: tableMeta.columns.length,
            availableColumns: tableMeta.columns.map(c => c.name),
          },
          columnMappings,
          selectMappings,
          allColumnMappings,
          unmatchedHeaders,
          stats: {
            totalColumns: allColumnMappings.length,
            mappedCount,
            unmappedCount,
          },
          suggestion: unmatchedHeaders.length > 0 
            ? `전체 ${allColumnMappings.length}개 컬럼 중 ${mappedCount}개 매핑, ${unmappedCount}개 미매핑(빈값). 미매핑 컬럼은 JOIN 또는 계산 로직 필요.`
            : `전체 ${allColumnMappings.length}개 컬럼 모두 매핑 완료.`,
        };
      } catch (error) {
        return {
          success: false,
          error: `쿼리 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
        };
      }
    }),

  /**
   * DB 테이블 목록 조회
   */
  getTableList: publicProcedure
    .query(() => {
      const metadata = loadDbMetadata();
      return metadata.map(t => ({
        name: t.name,
        korean_name: t.korean_name,
        columnCount: t.columns.length,
      }));
    }),

  /**
   * 특정 테이블의 컬럼 정보 조회
   */
  getTableColumns: publicProcedure
    .input(z.object({
      tableName: z.string(),
    }))
    .query(({ input }) => {
      const tableMeta = findTableMeta(input.tableName);
      if (!tableMeta) {
        return { success: false, error: `테이블 '${input.tableName}'을(를) 찾을 수 없습니다.` };
      }
      return {
        success: true,
        tableName: tableMeta.name,
        korean_name: tableMeta.korean_name,
        columns: tableMeta.columns.map(c => ({
          name: c.name,
          korean_name: c.korean_name,
          type: c.type,
          nullable: c.nullable,
          meaning: c.meaning,
        })),
      };
    }),

  // ============================================================
  // 임시화면 관리 API
  // ============================================================

  /**
   * 임시화면 저장
   */
  saveTempScreen: publicProcedure
    .input(z.object({
      screenName: z.string(),
      screenNameEn: z.string().optional(),
      tableName: z.string().optional(),
      htmlContent: z.string().optional(),
      reactContent: z.string().optional(),
      sqlQuery: z.string().optional(),
      parsedData: z.any().optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        const tempDir = path.join(process.cwd(), 'generated', 'screens', 'temp');
        
        // 폴더 생성 (없으면)
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // 고유 ID 생성 (타임스탬프 기반)
        const timestamp = Date.now();
        const screenId = `TEMP_${timestamp}`;
        const screenDir = path.join(tempDir, screenId);
        fs.mkdirSync(screenDir, { recursive: true });
        
        // 메타데이터 저장
        const metadata = {
          screenId,
          screenName: input.screenName,
          screenNameEn: input.screenNameEn || '',
          tableName: input.tableName || '',
          createdAt: new Date().toISOString(),
          status: 'temp',
        };
        fs.writeFileSync(
          path.join(screenDir, 'metadata.json'),
          JSON.stringify(metadata, null, 2)
        );
        
        // HTML 미리보기 저장
        if (input.htmlContent) {
          fs.writeFileSync(
            path.join(screenDir, 'preview.html'),
            input.htmlContent
          );
        }
        
        // React 컴포넌트 저장
        if (input.reactContent) {
          fs.writeFileSync(
            path.join(screenDir, 'component.tsx'),
            input.reactContent
          );
        }
        
        // SQL 쿼리 저장
        if (input.sqlQuery) {
          fs.writeFileSync(
            path.join(screenDir, 'query.sql'),
            input.sqlQuery
          );
        }
        
        // parsedData 저장
        if (input.parsedData) {
          fs.writeFileSync(
            path.join(screenDir, 'parsedData.json'),
            JSON.stringify(input.parsedData, null, 2)
          );
        }
        
        console.log(`[DEBUG] 임시화면 저장: ${screenId}`);
        
        return {
          success: true,
          screenId,
          path: screenDir,
          message: `임시화면 '${input.screenName}'이(가) 저장되었습니다.`,
        };
      } catch (error) {
        return {
          success: false,
          error: `임시화면 저장 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        };
      }
    }),

  /**
   * 임시화면 목록 조회
   */
  getTempScreenList: publicProcedure
    .query(() => {
      try {
        const tempDir = path.join(process.cwd(), 'generated', 'screens', 'temp');
        
        if (!fs.existsSync(tempDir)) {
          return { success: true, screens: [] };
        }
        
        const screens: Array<{
          screenId: string;
          screenName: string;
          screenNameEn: string;
          tableName: string;
          createdAt: string;
          status: string;
          hasHtml: boolean;
          hasReact: boolean;
          hasSql: boolean;
        }> = [];
        
        const dirs = fs.readdirSync(tempDir);
        for (const dir of dirs) {
          const screenDir = path.join(tempDir, dir);
          const metadataPath = path.join(screenDir, 'metadata.json');
          
          if (fs.existsSync(metadataPath)) {
            const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
            screens.push({
              ...metadata,
              hasHtml: fs.existsSync(path.join(screenDir, 'preview.html')),
              hasReact: fs.existsSync(path.join(screenDir, 'component.tsx')),
              hasSql: fs.existsSync(path.join(screenDir, 'query.sql')),
            });
          }
        }
        
        // 최신순 정렬
        screens.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        return { success: true, screens };
      } catch (error) {
        return {
          success: false,
          screens: [],
          error: `목록 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        };
      }
    }),

  /**
   * 임시화면 상세 조회
   */
  getTempScreen: publicProcedure
    .input(z.object({
      screenId: z.string(),
    }))
    .query(({ input }) => {
      try {
        const screenDir = path.join(process.cwd(), 'generated', 'screens', 'temp', input.screenId);
        
        if (!fs.existsSync(screenDir)) {
          return { success: false, error: `화면 '${input.screenId}'을(를) 찾을 수 없습니다.` };
        }
        
        const metadataPath = path.join(screenDir, 'metadata.json');
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        
        // 각 파일 내용 읽기
        const htmlPath = path.join(screenDir, 'preview.html');
        const reactPath = path.join(screenDir, 'component.tsx');
        const sqlPath = path.join(screenDir, 'query.sql');
        const parsedDataPath = path.join(screenDir, 'parsedData.json');
        
        return {
          success: true,
          metadata,
          htmlContent: fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf-8') : null,
          reactContent: fs.existsSync(reactPath) ? fs.readFileSync(reactPath, 'utf-8') : null,
          sqlQuery: fs.existsSync(sqlPath) ? fs.readFileSync(sqlPath, 'utf-8') : null,
          parsedData: fs.existsSync(parsedDataPath) ? JSON.parse(fs.readFileSync(parsedDataPath, 'utf-8')) : null,
        };
      } catch (error) {
        return {
          success: false,
          error: `화면 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        };
      }
    }),

  /**
   * 임시화면 삭제
   */
  deleteTempScreen: publicProcedure
    .input(z.object({
      screenId: z.string(),
    }))
    .mutation(({ input }) => {
      try {
        const screenDir = path.join(process.cwd(), 'generated', 'screens', 'temp', input.screenId);
        
        if (!fs.existsSync(screenDir)) {
          return { success: false, error: `화면 '${input.screenId}'을(를) 찾을 수 없습니다.` };
        }
        
        // 폴더 삭제 (재귀)
        fs.rmSync(screenDir, { recursive: true, force: true });
        
        return {
          success: true,
          message: `화면 '${input.screenId}'이(가) 삭제되었습니다.`,
        };
      } catch (error) {
        return {
          success: false,
          error: `화면 삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        };
      }
    }),

  /**
   * 임시화면을 정식 화면으로 등록 (메뉴 연결)
   */
  publishScreen: publicProcedure
    .input(z.object({
      screenId: z.string(),
      parentMenuId: z.string(),
      menuName: z.string(),
      menuNameEn: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const tempScreenDir = path.join(process.cwd(), 'generated', 'screens', 'temp', input.screenId);
        
        if (!fs.existsSync(tempScreenDir)) {
          return { success: false, error: `임시화면 '${input.screenId}'을(를) 찾을 수 없습니다.` };
        }
        
        // 1. 새 화면 ID 생성 (SC + 6자리)
        const newScreenId = await generateScreenId(ctx);
        
        // 2. 정식 화면 폴더로 이동
        const finalDir = path.join(process.cwd(), 'generated', 'screens', newScreenId);
        fs.mkdirSync(finalDir, { recursive: true });
        
        // 파일 복사
        const files = fs.readdirSync(tempScreenDir);
        for (const file of files) {
          fs.copyFileSync(
            path.join(tempScreenDir, file),
            path.join(finalDir, file)
          );
        }
        
        // 메타데이터 업데이트
        const metadataPath = path.join(finalDir, 'metadata.json');
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        metadata.screenId = newScreenId;
        metadata.status = 'published';
        metadata.publishedAt = new Date().toISOString();
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        
        // 3. 부모 메뉴 정보 조회 (menu_level, sort_order 계산)
        const parentMenu = await ctx.db.$queryRaw<Array<{
          menu_level: number;
          menu_id: string;
        }>>`
          SELECT menu_level, menu_id 
          FROM sys_menu 
          WHERE menu_id = ${input.parentMenuId}
        `;
        
        const parentLevel = parentMenu && parentMenu.length > 0 && parentMenu[0] ? parentMenu[0].menu_level : 0;
        const newMenuLevel = parentLevel + 1;
        
        // 현재 부모 아래 최대 sort_order 조회
        const maxSortOrder = await ctx.db.$queryRaw<Array<{ max_order: number | null }>>`
          SELECT MAX(sort_order) as max_order 
          FROM sys_menu 
          WHERE parent_id = ${input.parentMenuId}
        `;
        const maxOrderValue = maxSortOrder && maxSortOrder.length > 0 && maxSortOrder[0] ? maxSortOrder[0].max_order : 0;
        const newSortOrder = input.sortOrder ?? ((maxOrderValue ?? 0) + 10);
        
        // 새 메뉴 ID 생성
        const newMenuId = `MENU_${newScreenId}`;
        
        // 4. 메뉴 DB에 INSERT
        await ctx.db.$executeRaw`
          INSERT INTO sys_menu (
            menu_id, parent_id, menu_level, sort_order,
            menu_name, menu_name_en, menu_path, menu_icon,
            screen_id, screen_type, is_active, is_visible,
            created_at, updated_at
          ) VALUES (
            ${newMenuId},
            ${input.parentMenuId},
            ${newMenuLevel},
            ${newSortOrder},
            ${input.menuName},
            ${input.menuNameEn || ''},
            ${`/screens/${newScreenId}`},
            ${'FileText'},
            ${newScreenId},
            ${'grid'},
            ${true},
            ${true},
            NOW(),
            NOW()
          )
        `;
        
        console.log(`[DEBUG] 메뉴 DB 등록 완료: ${newMenuId} → ${input.parentMenuId}`);
        
        // 5. 파일에도 백업 저장
        const menuEntry = {
          menuId: newMenuId,
          parentId: input.parentMenuId,
          menuName: input.menuName,
          menuNameEn: input.menuNameEn || '',
          menuPath: `/screens/${newScreenId}`,
          screenId: newScreenId,
          menuLevel: newMenuLevel,
          sortOrder: newSortOrder,
          isActive: true,
          isVisible: true,
          createdAt: new Date().toISOString(),
        };
        fs.writeFileSync(
          path.join(finalDir, 'menu.json'),
          JSON.stringify(menuEntry, null, 2)
        );
        
        // 6. src/app/screens/[screenId]/page.tsx 생성 (실제 동작하는 페이지)
        const componentPath = path.join(finalDir, 'component.tsx');
        if (fs.existsSync(componentPath)) {
          const componentCode = fs.readFileSync(componentPath, 'utf-8');
          
          // 실제 Next.js 페이지로 변환
          const pageCode = convertToNextPage(componentCode, newScreenId, input.menuName);
          
          // src/app/screens/[screenId]/ 폴더 생성
          const appScreenDir = path.join(process.cwd(), 'src', 'app', 'screens', newScreenId.toLowerCase());
          fs.mkdirSync(appScreenDir, { recursive: true });
          
          // page.tsx 저장
          fs.writeFileSync(
            path.join(appScreenDir, 'page.tsx'),
            pageCode
          );
          
          console.log(`[DEBUG] 실제 페이지 생성: src/app/screens/${newScreenId.toLowerCase()}/page.tsx`);
        }
        
        // 7. 임시 폴더 삭제
        fs.rmSync(tempScreenDir, { recursive: true, force: true });
        
        console.log(`[DEBUG] 화면 발행: ${input.screenId} → ${newScreenId}`);
        
        return {
          success: true,
          screenId: newScreenId,
          menuId: newMenuId,
          menuPath: `/screens/${newScreenId}`,
          message: `화면 '${input.menuName}'이(가) 메뉴에 등록되었습니다.`,
        };
      } catch (error) {
        console.error('[ERROR] 화면 발행 실패:', error);
        return {
          success: false,
          error: `화면 발행 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        };
      }
    }),

  /**
   * React 컴포넌트 생성 (AG Grid 기반)
   */
  generateReactComponent: publicProcedure
    .input(z.object({
      screenId: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        // 임시 화면 데이터 로드
        const tempDir = path.join(process.cwd(), 'generated', 'screens', 'temp', input.screenId);
        const parsedDataPath = path.join(tempDir, 'parsedData.json');
        
        if (!fs.existsSync(parsedDataPath)) {
          return { success: false, error: '화면 데이터를 찾을 수 없습니다.' };
        }
        
        const parsedData = JSON.parse(fs.readFileSync(parsedDataPath, 'utf-8'));
        
        // SQL 쿼리 로드
        const sqlPath = path.join(tempDir, 'query.sql');
        const sqlQuery = fs.existsSync(sqlPath) ? fs.readFileSync(sqlPath, 'utf-8') : null;
        
        // React 컴포넌트 프롬프트 생성
        const prompt = buildReactComponentPrompt(parsedData, sqlQuery);
        
        // Claude API 호출
        const apiKey = getAnthropicApiKey();
        if (!apiKey) {
          return { success: false, error: 'API 키가 없습니다.' };
        }
        
        const client = new Anthropic({ apiKey });
        const message = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8000,
          messages: [{ role: "user", content: prompt }],
        });
        
        let reactCode = "";
        for (const block of message.content) {
          if (block.type === "text") {
            reactCode += block.text;
          }
        }
        
        // 코드 블록 마커 제거
        reactCode = reactCode.replace(/```(?:tsx|typescript|jsx)?\n?/g, '').replace(/```$/g, '').trim();
        
        // 파일 저장
        const componentPath = path.join(tempDir, 'component.tsx');
        fs.writeFileSync(componentPath, reactCode);
        
        // 메타데이터 업데이트
        const metadataPath = path.join(tempDir, 'metadata.json');
        if (fs.existsSync(metadataPath)) {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
          metadata.hasReact = true;
          metadata.reactGeneratedAt = new Date().toISOString();
          fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        }
        
        console.log(`[DEBUG] React 컴포넌트 생성 완료: ${input.screenId}`);
        
        return {
          success: true,
          reactCode,
          message: 'React 컴포넌트가 생성되었습니다.',
        };
      } catch (error) {
        console.error('[ERROR] React 컴포넌트 생성 실패:', error);
        return {
          success: false,
          error: `React 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        };
      }
    }),
});

/**
 * Claude에게 JSON 데이터만 요청하는 프롬프트
 */
function buildJsonDataPrompt(parsedData: any): string {
  const { screenName, screenNameEn, tableName, searchConditions, gridColumns } = parsedData;
  
  // 그리드 컬럼 구조 설명
  const columnStructure = buildColumnStructureDescription(gridColumns);
  
  return `다음 Excel 템플릿 정보를 기반으로 AG Grid용 columnDefs와 샘플 데이터를 JSON 형식으로 생성해주세요.

## 화면 정보
- 화면명: ${screenName}
- 화면명(영문): ${screenNameEn || "N/A"}
- 테이블명: ${tableName || "N/A"}

## 조회조건
${searchConditions?.map((sc: any) => `- ${sc.label} (${sc.type})${sc.required ? " [필수]" : ""}`).join("\n") || "없음"}

## 그리드 컬럼 구조
${columnStructure}

## 합계 행
${gridColumns.summaryRows?.join(", ") || "없음"}

## 출력 형식 (JSON만 출력!)
\`\`\`json
{
  "screenName": "화면명",
  "columnDefs": [
    { "headerName": "컬럼1", "field": "col1", "width": 100 },
    { "headerName": "컬럼2", "field": "col2", "width": 120, "type": "numericColumn" },
    {
      "headerName": "그룹명",
      "children": [
        { "headerName": "서브1", "field": "sub1", "width": 100 },
        { "headerName": "서브2", "field": "sub2", "width": 100, "type": "numericColumn" }
      ]
    }
  ],
  "sampleData": [
    { "col1": "값1", "col2": 1000, "sub1": "A", "sub2": 500 },
    { "col1": "값2", "col2": 2000, "sub1": "B", "sub2": 600 }
  ],
  "summaryData": { "col1": "합계", "col2": 3000, "sub1": "", "sub2": 1100 },
  "searchFields": [
    { "label": "검색필드1", "field": "search1", "type": "text" },
    { "label": "검색필드2", "field": "search2", "type": "select", "options": ["옵션1", "옵션2"] }
  ]
}
\`\`\`

## 규칙
1. columnDefs: 그리드 컬럼 구조에 맞게 생성
   - 숫자 컬럼은 "type": "numericColumn" 추가
   - 그룹 헤더가 있으면 children으로 중첩
2. sampleData: 3-5개의 샘플 행
   - 숫자는 Number 타입
3. summaryData: 합계 행 (있는 경우)
4. searchFields: 조회조건 필드

JSON만 출력하세요 (설명 없이):`;
}

/**
 * JSON 파싱 실패 시 기본 그리드 데이터 생성
 */
function createDefaultGridData(parsedData: any): any {
  const { screenName, gridColumns, searchConditions } = parsedData;
  
  // row3에서 컬럼 헤더 추출
  const headers = gridColumns?.row3 || [];
  const columnDefs = headers
    .filter((h: string) => h && typeof h === 'string' && h.trim())
    .map((header: string, index: number) => {
      const name = header.trim();
      const field = `col${index}`;
      const isNumeric = name.includes('금액') || name.includes('수량') || name.includes('단가') || name.includes('합계');
      
      return {
        headerName: name,
        field: field,
        width: isNumeric ? 120 : 100,
        ...(isNumeric ? { type: 'numericColumn' } : {})
      };
    });
  
  // 샘플 데이터 생성
  const sampleRow: any = {};
  columnDefs.forEach((col: any, i: number) => {
    const isNumeric = col.type === 'numericColumn';
    sampleRow[col.field] = isNumeric ? (i + 1) * 1000 : `샘플${i + 1}`;
  });
  
  // 검색 필드 생성
  const searchFields = (searchConditions || []).map((sc: any) => ({
    label: sc.label || '검색',
    field: sc.id || 'search',
    type: sc.type === 'select' ? 'select' : 'text'
  }));
  
  return {
    screenName: screenName || '화면',
    columnDefs: columnDefs.length > 0 ? columnDefs : [
      { headerName: '항목1', field: 'item1', width: 100 },
      { headerName: '항목2', field: 'item2', width: 100 },
      { headerName: '금액', field: 'amount', width: 120, type: 'numericColumn' }
    ],
    sampleData: columnDefs.length > 0 ? [sampleRow, sampleRow, sampleRow] : [
      { item1: '데이터1', item2: 'A', amount: 1000 },
      { item1: '데이터2', item2: 'B', amount: 2000 },
      { item1: '데이터3', item2: 'C', amount: 3000 }
    ],
    summaryData: null,
    searchFields: searchFields.length > 0 ? searchFields : [
      { label: '검색어', field: 'search', type: 'text' }
    ]
  };
}

/**
 * JSON 데이터를 기반으로 React 컴포넌트 생성
 */
function generateReactFromTemplate(parsedData: any, gridData: any): string {
  const screenName = gridData.screenName || parsedData.screenName || "GeneratedScreen";
  const componentName = screenName.replace(/[^a-zA-Z가-힣0-9]/g, '') || "GeneratedScreen";
  
  // columnDefs를 문자열로 변환
  const columnDefsStr = JSON.stringify(gridData.columnDefs || [], null, 2)
    .replace(/"type":\s*"numericColumn"/g, '"type": "numericColumn", "cellStyle": { "textAlign": "right" }');
  
  // sampleData를 문자열로 변환
  const sampleDataStr = JSON.stringify(gridData.sampleData || [], null, 2);
  
  // summaryData를 문자열로 변환
  const summaryDataStr = gridData.summaryData ? JSON.stringify([gridData.summaryData], null, 2) : "[]";
  
  // searchFields 처리
  const searchFields = gridData.searchFields || [];
  const searchFieldsJsx = searchFields.length > 0 
    ? searchFields.map((sf: any, i: number) => {
        if (sf.type === 'select' && sf.options) {
          return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${sf.label}</label>
            <select 
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}
            >
              <option value="">전체</option>
              ${sf.options.map((opt: string) => `<option value="${opt}">${opt}</option>`).join('\n              ')}
            </select>
          </div>`;
        }
        return `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>${sf.label}</label>
            <input 
              type="${sf.type === 'date' ? 'date' : 'text'}"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}
              placeholder="${sf.label}"
            />
          </div>`;
      }).join('')
    : `
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>검색어</label>
            <input 
              type="text"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 200 }}
              placeholder="검색어를 입력하세요"
            />
          </div>`;
  
  return `import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export default function ${componentName}() {
  const columnDefs = ${columnDefsStr};

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };

  const sampleData = ${sampleDataStr};
  const summaryData = ${summaryDataStr};

  const [rowData, setRowData] = useState(sampleData);

  const handleSearch = () => {
    console.log('검색 실행');
  };

  const handleReset = () => {
    setRowData(sampleData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      {/* 제목 */}
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#161616', flexShrink: 0 }}>
        ${screenName}
      </h1>

      {/* 조회조건 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: 16, 
        marginBottom: 12, 
        padding: 12, 
        backgroundColor: '#f4f4f4', 
        flexShrink: 0, 
        border: '1px solid #e0e0e0' 
      }}>
        ${searchFieldsJsx}
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button 
            onClick={handleSearch}
            style={{ 
              height: 32, 
              padding: '0 16px', 
              backgroundColor: '#0f62fe', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            검색
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              height: 32, 
              padding: '0 16px', 
              backgroundColor: '#e0e0e0', 
              color: '#161616', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            초기화
          </button>
        </div>
      </div>

      {/* AG Grid - 고정 높이 400px */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: 500, minHeight: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pinnedBottomRowData={summaryData.length > 0 ? summaryData : undefined}
        />
      </div>
    </div>
  );
}
`;
}

/**
 * JSON 데이터를 기반으로 HTML 미리보기 생성
 */
function generateHtmlFromTemplate(parsedData: any, gridData: any): string {
  const screenName = gridData.screenName || parsedData.screenName || "화면";
  
  // columnDefs를 문자열로 변환
  const columnDefsStr = JSON.stringify(gridData.columnDefs || [], null, 2);
  
  // sampleData를 문자열로 변환
  const sampleDataStr = JSON.stringify(gridData.sampleData || [], null, 2);
  
  // summaryData
  const summaryDataStr = gridData.summaryData ? JSON.stringify([gridData.summaryData], null, 2) : "[]";

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${screenName}</title>
  <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-alpine.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'IBM Plex Sans', sans-serif; background: #fff; }
    .container { padding: 16px; height: 100vh; display: flex; flex-direction: column; }
    h1 { font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #161616; }
    .search-area { display: flex; align-items: flex-end; gap: 16px; margin-bottom: 16px; padding: 16px; background: #f4f4f4; border: 1px solid #e0e0e0; }
    .search-field { display: flex; flex-direction: column; gap: 4px; }
    .search-field label { font-size: 12px; color: #525252; }
    .search-field input { height: 32px; padding: 0 8px; border: 1px solid #e0e0e0; min-width: 120px; }
    .btn-group { display: flex; gap: 8px; margin-left: auto; }
    .btn { height: 32px; padding: 0 16px; border: none; cursor: pointer; font-size: 14px; }
    .btn-primary { background: #0f62fe; color: white; }
    .btn-secondary { background: #e0e0e0; color: #161616; }
    .grid-container { flex: 1; min-height: 400px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${screenName}</h1>
    <div class="search-area">
      <div class="search-field">
        <label>검색어</label>
        <input type="text" placeholder="검색어 입력">
      </div>
      <div class="btn-group">
        <button class="btn btn-primary">검색</button>
        <button class="btn btn-secondary">초기화</button>
      </div>
    </div>
    <div id="myGrid" class="ag-theme-alpine grid-container"></div>
  </div>
  <script>
    const columnDefs = ${columnDefsStr};
    const rowData = ${sampleDataStr};
    const pinnedBottomRowData = ${summaryDataStr};

    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      pinnedBottomRowData: pinnedBottomRowData.length > 0 ? pinnedBottomRowData : undefined,
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true
      }
    };

    document.addEventListener('DOMContentLoaded', function() {
      const gridDiv = document.querySelector('#myGrid');
      agGrid.createGrid(gridDiv, gridOptions);
    });
  </script>
</body>
</html>`;
}

/**
 * 미리보기 생성 프롬프트 작성 (기존 - 사용 안함)
 */
function buildPreviewPrompt(parsedData: any, previewType: "html" | "react"): string {
  const { screenName, screenNameEn, tableName, searchConditions, gridColumns } = parsedData;
  
  // 그리드 컬럼 구조 설명
  const columnStructure = buildColumnStructureDescription(gridColumns);
  
  // IBM Carbon Design System 스타일 가이드
  const carbonStyleGuide = `
## IBM Carbon Design System 스타일 가이드 (Light Theme)

### 색상
- 배경(Background): #ffffff
- 레이어1(Layer 01): #f4f4f4
- 레이어2(Layer 02): #e0e0e0
- 테두리(Border): #e0e0e0
- 강조 테두리: #8d8d8d
- 텍스트 Primary: #161616
- 텍스트 Secondary: #525252
- 텍스트 Placeholder: #a8a8a8
- Interactive Primary (버튼, 링크): #0f62fe
- Interactive Hover: #0043ce
- Danger: #da1e28
- Success: #24a148
- Warning: #f1c21b

### 폰트
- font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif
- 본문: 14px, line-height: 20px
- 라벨/캡션: 12px, line-height: 16px
- 제목: 16px, font-weight: 600

### 컴포넌트 스타일
- 버튼 높이: 40px (medium), 32px (small)
- 입력 필드 높이: 40px
- 테이블 헤더 배경: #e0e0e0
- 테이블 헤더 높이: 40px
- 테이블 행 높이: 40px
- 테이블 행 호버: #e8e8e8
- 테두리 radius: 0 (Carbon은 sharp corner 사용)

### 간격
- 기본 패딩: 16px
- 작은 패딩: 12px
- 요소 간격: 8px
- 섹션 간격: 24px
`;

  if (previewType === "html") {
    return `다음 Excel 템플릿 정보를 기반으로 AG Grid를 사용한 HTML 미리보기를 생성해주세요.

## 화면 정보
- 화면명: ${screenName}
- 화면명(영문): ${screenNameEn || "N/A"}
- 테이블명: ${tableName || "N/A"}

## 조회조건
${searchConditions?.map((sc: any) => `- ${sc.label} (${sc.type})${sc.required ? " [필수]" : ""}`).join("\n") || "없음"}

## 그리드 컬럼 구조
${columnStructure}

## 합계 행
${gridColumns.summaryRows?.join(", ") || "없음"}

${carbonStyleGuide}

## 요구사항
1. AG Grid Community Edition CDN 사용:
   - <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"></script>
   - <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css">
   - <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-alpine.css">
2. IBM Carbon Design System 스타일 적용
3. 전체 레이아웃:
   - 상단: 화면 제목 (배경 #f4f4f4, 패딩 16px)
   - 중단: 조회조건 영역 (배경 #f4f4f4, 테두리 #e0e0e0)
   - 하단: AG Grid 영역 (배경 #ffffff)
4. 조회조건 (🚨 중요: 가로 배치!):
   - 입력 필드는 밑줄 스타일 (border-bottom만)
   - **🚨 절대 필수: 라벨과 입력 필드는 가로로 나란히 배치 (flex row)**
   - 라벨 바로 오른쪽에 입력 필드가 위치해야 함
   - 예시: <div style="display:flex; align-items:center; gap:8px"><span>년월</span><input/></div>
   - 검색/초기화 버튼은 오른쪽 정렬
5. AG Grid 설정:
   - ag-theme-alpine 테마 사용
   - 그룹 헤더가 있는 경우 columnDefs에 children으로 구성
   - 숫자 컬럼은 오른쪽 정렬 (cellStyle)
   - 합계 행은 pinnedBottomRowData 사용
   - 기본 옵션: defaultColDef, rowData, 등
6. 샘플 데이터 3-5행 포함
7. 순수 HTML + inline CSS + JavaScript 사용

HTML 코드만 출력해주세요 (설명 없이 코드만):`;
  } else {
    return `다음 Excel 템플릿 정보를 기반으로 AG Grid를 사용한 React 컴포넌트를 생성해주세요.

## 화면 정보
- 화면명: ${screenName}
- 화면명(영문): ${screenNameEn || "N/A"}
- 테이블명: ${tableName || "N/A"}

## 조회조건
${searchConditions?.map((sc: any) => `- ${sc.label} (${sc.type})${sc.required ? " [필수]" : ""}`).join("\n") || "없음"}

## 그리드 컬럼 구조
${columnStructure}

## 합계 행
${gridColumns.summaryRows?.join(", ") || "없음"}

${carbonStyleGuide}

## 🚨 절대 금지 사항 (위반 시 코드가 동작하지 않음!)
1. TypeScript 문법 사용 금지: useState<Type>(), : Type, interface, type, as Type 등
2. valueFormatter/valueGetter 사용 금지 (버그 유발)
3. font-family에 따옴표 없이 쓰기 금지: fontFamily: 'IBM Plex Sans, sans-serif' (O), fontFamily: IBM Plex Sans (X)
4. style 객체에서 CSS 속성명 그대로 쓰기 금지: -apple-system (X), 문자열로 감싸서 font-family에 포함 (O)

## 🎯 필수 요구사항
1. **순수 JavaScript** React 함수형 컴포넌트 + AG Grid Community
2. 필수 import (정확히 이렇게만):
   import { useState } from 'react';
   import { AgGridReact } from 'ag-grid-react';
3. **style 객체 작성 규칙 (매우 중요!):**
   - 모든 속성은 camelCase: backgroundColor (O), background-color (X)
   - 문자열 값은 반드시 따옴표로 감싸기: fontFamily: 'sans-serif' (O)
   - 숫자는 따옴표 없이: fontSize: 20 (O), fontSize: '20px' (O 둘 다 가능)
   - **예시 (복사해서 사용):**
     style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16, fontFamily: 'sans-serif', backgroundColor: '#f4f4f4' }}
4. AG Grid columnDefs 작성:
   - 단순 컬럼: { headerName: '이름', field: 'name', width: 100 }
   - 숫자 컬럼: { headerName: '금액', field: 'amount', width: 120, cellStyle: { textAlign: 'right' } }
   - valueFormatter 절대 사용 금지!
5. AG Grid 설정:
   - defaultColDef: { sortable: true, resizable: true, filter: true }
   - rowData: 샘플 데이터 3-5행
   - pinnedBottomRowData: 합계 행 (있는 경우)
6. 컴포넌트 구조:
   - export default function 컴포넌트명() { ... }
   - const [rowData, setRowData] = useState(sampleData);
7. 코드 품질:
   - 모든 괄호 {}[]() 는 반드시 짝이 맞아야 함
   - 코드 마지막은 반드시 } 로 끝나야 함

## ✅ 정확한 코드 템플릿 (이 구조를 정확히 따라서 작성):

import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export default function 화면명() {
  const [yearMonth, setYearMonth] = useState('2024-01');
  
  const columnDefs = [
    { headerName: '컬럼1', field: 'col1', width: 100 },
    { headerName: '컬럼2', field: 'col2', width: 120, cellStyle: { textAlign: 'right' } }
  ];

  const defaultColDef = { sortable: true, resizable: true, filter: true };

  const sampleData = [
    { col1: '값1', col2: 1000 },
    { col1: '값2', col2: 2000 }
  ];

  const [rowData, setRowData] = useState(sampleData);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>화면명</h1>
      
      {/* 🚨 조회조건 영역: 라벨과 입력은 반드시 가로 배치! */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, padding: 12, backgroundColor: '#f4f4f4', borderRadius: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>년월</span>
          <input type="month" value={yearMonth} onChange={(e) => setYearMonth(e.target.value)} style={{ padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 4 }} />
        </div>
        <button style={{ padding: '8px 16px', backgroundColor: '#0f62fe', color: 'white', border: 'none', borderRadius: 4 }}>조회</button>
      </div>
      
      <div className="ag-theme-alpine" style={{ flex: 1, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}

**위 템플릿을 기반으로, 제공된 컬럼 구조에 맞게 완전한 코드를 작성해주세요:**`;
  }
}

/**
 * 컬럼 구조 설명 생성
 */
function buildColumnStructureDescription(gridColumns: any): string {
  const { row2, row3, merges } = gridColumns;
  
  // 병합 정보로 그룹 헤더 맵 생성
  const groupMap = new Map<number, string>();
  for (const merge of merges || []) {
    if (merge.startRow === 1 && merge.endRow === 1 && merge.startCol !== merge.endCol) {
      const header = row2[merge.startCol]?.toString().trim();
      if (header) {
        for (let c = merge.startCol; c <= merge.endCol; c++) {
          groupMap.set(c, header);
        }
      }
    }
  }
  
  // 컬럼 목록 생성
  const columns: string[] = [];
  let currentGroup = "";
  
  for (let col = 0; col < row3.length; col++) {
    const group = groupMap.get(col) || "";
    const detail = row3[col]?.toString().trim() || row2[col]?.toString().trim();
    
    if (!detail) continue;
    
    if (group && group !== currentGroup) {
      currentGroup = group;
      columns.push(`\n[그룹: ${group}]`);
    }
    
    if (group) {
      columns.push(`  - ${detail}`);
    } else {
      columns.push(`- ${detail} (단일 컬럼)`);
    }
  }
  
  return columns.join("\n");
}

/**
 * AG Grid React 컴포넌트 생성 프롬프트
 */
function buildReactComponentPrompt(parsedData: any, sqlQuery: string | null): string {
  const { screenName, screenNameEn, tableName, searchConditions, gridColumns } = parsedData;
  
  // 컬럼 정보 추출
  const columnStructure = buildColumnStructureDescription(gridColumns);
  
  // 검색 조건 목록
  const searchConditionsList = searchConditions?.map((sc: any) => 
    `{ field: "${sc.label}", type: "${sc.type}", required: ${sc.required} }`
  ).join(",\n    ") || "";
  
  return `다음 ERP 화면 정보를 기반으로 AG Grid를 사용하는 React 컴포넌트를 생성해주세요.

## 화면 정보
- 화면명: ${screenName}
- 화면명(영문): ${screenNameEn || screenName.replace(/\s/g, '')}
- 테이블명: ${tableName || "N/A"}

## 조회조건 (검색 필터)
${searchConditions?.map((sc: any) => `- ${sc.label} (${sc.type})${sc.required ? " [필수]" : ""}`).join("\n") || "없음"}

## 그리드 컬럼 구조
${columnStructure}

## 합계 행
${gridColumns.summaryRows?.join(", ") || "없음"}

${sqlQuery ? `## SQL 쿼리 참고
\`\`\`sql
${sqlQuery}
\`\`\`` : ""}

## 필수 요구사항

### 1. 기술 스택
- TypeScript + React 함수형 컴포넌트
- AG Grid Community (ag-grid-react, ag-grid-community)
- Tailwind CSS
- lucide-react 아이콘

### 2. 필수 import 구문
\`\`\`tsx
'use client';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download } from 'lucide-react';

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);
\`\`\`

### 3. 컬럼 정의 (ColGroupDef 사용)
- 그룹 헤더가 있으면 children으로 중첩
- 숫자 컬럼: type: 'numericColumn', cellStyle: { textAlign: 'right' }
- valueFormatter로 천단위 콤마 적용
- 합계 행 구분: getRowClass로 스타일 적용

### 4. 검색 필터 영역 (🚨 중요: 가로 배치!)
- 조회조건별 입력 필드 (Input, Select)
- **🚨 절대 필수: 라벨과 입력필드는 반드시 가로로 나란히 배치!**
  - label에 "block" 클래스 절대 사용 금지!
  - label에 "mb-1" 사용 금지!
  - 올바른 예시:
    \`\`\`tsx
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">년월</label>
      <input type="month" className="px-3 py-2 border rounded-md" />
    </div>
    \`\`\`
  - 잘못된 예시 (사용 금지!):
    \`\`\`tsx
    <div>
      <label className="block mb-1">년월</label>  <!-- 이렇게 하면 안됨! -->
      <input />
    </div>
    \`\`\`
- 전체 필터 영역도 flex로 가로 배치
- 검색/초기화/엑셀다운로드 버튼
- Tailwind CSS로 IBM Carbon 스타일 적용:
  - 배경: bg-[#f4f4f4]
  - 테두리: border-[#e0e0e0]
  - 버튼: bg-[#0f62fe] hover:bg-[#0043ce]

### 5. AG Grid 설정
\`\`\`tsx
<div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
  <AgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    defaultColDef={defaultColDef}
    animateRows={true}
    rowHeight={40}
    headerHeight={40}
    groupHeaderHeight={40}
    getRowClass={getRowClass}
  />
</div>
\`\`\`

### 6. 샘플 데이터
- 합계 행 1개 + 일반 데이터 3-5행 포함
- 실제 데이터 형식과 유사하게

### 7. 커스텀 AG Grid 스타일 (style jsx global)
\`\`\`css
.ag-theme-alpine {
  --ag-header-background-color: #e0e0e0;
  --ag-header-foreground-color: #161616;
  --ag-row-hover-color: #e8e8e8;
  --ag-border-color: #e0e0e0;
  --ag-font-size: 13px;
}
.ag-theme-alpine .ag-header-group-cell {
  background-color: #d0d0d0;
  font-weight: 600;
}
.ag-row-total {
  background-color: #f4f4f4 !important;
  font-weight: 600;
}
\`\`\`

## 출력 형식
- 완전한 React 컴포넌트 코드만 출력
- 설명 없이 코드만
- export default 포함

React 컴포넌트 코드:`;
}

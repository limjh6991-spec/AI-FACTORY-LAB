/**
 * 화면 생성기 API 라우터
 * - Excel 템플릿 검증
 * - Claude API를 통한 미리보기 생성
 * - SQL 쿼리 자동 생성
 * 
 * 모듈화: 유틸리티 함수들은 ~/lib/screen-generator에서 import
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as XLSX from "xlsx";
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

// 분리된 모듈에서 import
import {
  // 타입
  type TableMeta,
  HEADER_TO_COLUMN_MAP,
  OPTION_MAPPING,
  // DB 메타데이터
  loadDbMetadata,
  findTableMeta,
  // ID 생성
  generateScreenId as generateScreenIdFromModule,
  // API 키
  getAnthropicApiKey,
  // 쿼리 생성
  generateSqlQuery,
  // 컨버터
  convertToNextPage,
  // 템플릿
  generateReactFromTemplate,
  createDefaultGridData,
  generateHtmlFromTemplate,
  // 프롬프트
  buildJsonDataPrompt,
  buildReactComponentPrompt,
  buildColumnStructureDescription,
  // 유틸리티
  capitalize,
} from "~/lib/screen-generator";

// 화면 ID 생성 wrapper (ctx 호환성 유지)
async function generateScreenId(_ctx: any): Promise<string> {
  return generateScreenIdFromModule();
}

// 로컬 convertToNextPage 제거됨 - ~/lib/screen-generator에서 import

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
        
        // 1. 필수 시트 확인 (조회조건 시트 제거 - 메타정보의 옵션 필드로 대체)
        const requiredSheets = ["메타정보", "그리드컬럼"];
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
        let options = "";  // 옵션 필드 추가
        
        // 디버그: 메타정보 시트 내용 출력
        console.log("[DEBUG] 메타정보 시트 파싱:");
        for (const row of metaData) {
          const key = row[0]?.toString().trim() || "";
          const value = row[1]?.toString().trim() || "";
          console.log(`  [${key}] = [${value}]`);
          if (key === "화면명" || key === "화면명(한글)") screenName = value;
          if (key === "화면명(영문)") screenNameEn = value;
          if (key === "테이블명" || key === "사용테이블") tableName = value;
          if (key === "옵션") options = value;  // 옵션 파싱
        }
        console.log(`[DEBUG] 파싱 결과: screenName=${screenName}, tableName=${tableName}, options=${options}`);
        
        if (!screenName) {
          errors.push("메타정보 시트에 '화면명'이 없습니다.");
        }
        
        if (!tableName) {
          warnings.push("메타정보 시트에 '테이블명'이 없습니다. 쿼리 생성 시 수동 입력이 필요합니다.");
        }
        
        // 3. 옵션 파싱 (쉼표로 구분된 옵션명 → searchConditions로 변환)
        const optionMapping: Record<string, { label: string; type: string }> = {
          '년월': { label: '년월', type: 'yearmonth' },
          '년': { label: '년', type: 'year' },
          '자재': { label: '자재', type: 'material' },
          '거래처': { label: '거래처', type: 'customer' },
          '부서': { label: '부서', type: 'department' },
          '계정': { label: '계정', type: 'account' },
          '모델': { label: '모델', type: 'model' },
          '사업장': { label: '사업장', type: 'site' },
          '비용': { label: '비용', type: 'expense' },
        };
        
        const searchConditions: any[] = [];
        if (options) {
          const optionList = options.split(',').map(o => o.trim()).filter(o => o);
          for (const opt of optionList) {
            const mapping = optionMapping[opt];
            if (mapping) {
              searchConditions.push({
                label: mapping.label,
                type: mapping.type,
                field: mapping.type,
                required: false
              });
            }
          }
        }
        console.log(`[DEBUG] 파싱된 옵션: ${searchConditions.length}개`, searchConditions);
        
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
        
        // 5. 샘플데이터 시트 파싱 (있는 경우)
        let sampleDataRows: any[] = [];
        if (workbook.SheetNames.includes("샘플데이터")) {
          const sampleSheet = workbook.Sheets["샘플데이터"];
          const sampleSheetData = XLSX.utils.sheet_to_json<string[]>(sampleSheet!, { header: 1, defval: "" });
          // Row 1: 제목, Row 2: 헤더, Row 3+: 데이터
          sampleDataRows = sampleSheetData.slice(2).filter(row => {
            const firstCell = row[0]?.toString() || "";
            return firstCell && !firstCell.includes("합계");
          }).slice(0, 5);
        } else {
          // 샘플데이터 시트가 없으면 그리드컬럼에서 추출
          sampleDataRows = gridData.slice(3).filter(row => {
            const firstCell = row[0]?.toString() || "";
            return firstCell && !firstCell.includes("합계");
          }).slice(0, 5);
        }
        
        // 파싱 데이터 (Claude API 전송용)
        const parsedData = {
          screenName,
          screenNameEn,
          tableName,
          searchConditions,  // 메타정보의 옵션에서 파싱한 조회조건 사용
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
            sampleData: sampleDataRows,
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

/**
 * Excel 템플릿 검증 프로시저
 * @module screenGenerator/procedures/validate
 */

import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import * as XLSX from "xlsx";
import {
  parseMetaSheet,
  parseGridSheet,
  parseSampleDataSheet,
  parseSearchConditions,
  generateWarnings,
  detectScreenType,
} from "../_shared/validation";

/**
 * Excel 템플릿 검증 프로시저
 */
export const validateTemplate = publicProcedure
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
      const metaInfo = parseMetaSheet(workbook);
      const { screenName, screenNameEn, tableName, options } = metaInfo;
      
      console.log(`[DEBUG] 파싱 결과: screenName=${screenName}, tableName=${tableName}, options=${options}`);
      
      if (!screenName) {
        errors.push("메타정보 시트에 '화면명'이 없습니다.");
      }
      
      if (!tableName) {
        warnings.push("메타정보 시트에 '테이블명'이 없습니다. 쿼리 생성 시 수동 입력이 필요합니다.");
      }
      
      // 3. 옵션 → 검색조건 변환
      const searchConditions = parseSearchConditions(options);
      console.log(`[DEBUG] 파싱된 옵션: ${searchConditions.length}개`, searchConditions);
      
      // 4. 그리드컬럼 시트 파싱
      const gridInfo = parseGridSheet(workbook);
      const { row1, row2, row3, merges, summaryRows, columnCount } = gridInfo;
      
      // 5. 샘플데이터 시트 파싱 (있는 경우)
      let sampleDataRows = parseSampleDataSheet(workbook);
      if (sampleDataRows.length === 0) {
        // 샘플데이터 시트가 없으면 그리드컬럼에서 추출
        sampleDataRows = gridInfo.sampleData;
      }
      
      // 6. 경고 생성
      const additionalWarnings = generateWarnings(row2, row3, merges);
      warnings.push(...additionalWarnings);
      
      // 7. 파싱 데이터 구성
      const parsedData = {
        screenName,
        screenNameEn,
        tableName,
        searchConditions,
        gridColumns: {
          row1,
          row2,
          row3,
          merges,
          summaryRows,
          sampleData: sampleDataRows,
        },
      };
      
      // 8. 화면 유형 자동 감지
      const screenType = detectScreenType(parsedData);
      
      const isValid = errors.length === 0;
      
      return {
        isValid,
        screenName,
        screenNameEn,
        tableName,
        screenType,
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
  });

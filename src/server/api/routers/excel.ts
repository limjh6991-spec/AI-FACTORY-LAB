import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import * as XLSX from 'xlsx';
import { quickMapColumns } from '~/lib/db-metadata-search';

export const excelRouter = createTRPCRouter({
  /**
   * Excel 파일의 컬럼 분석
   */
  analyzeColumns: publicProcedure
    .input(
      z.object({
        fileData: z.string(), // base64 encoded file
        fileName: z.string()
      })
    )
    .mutation(async ({ input }) => {
      try {
        // base64 디코딩
        const buffer = Buffer.from(input.fileData, 'base64');
        
        // Excel 파일 읽기
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0] || ''];
        
        if (!firstSheet) {
          throw new Error('시트를 찾을 수 없습니다.');
        }

        // 첫 번째 행(헤더)만 추출
        const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, { 
          header: 1,
          defval: ''
        });
        
        const firstRow = data[0];
        const columns = Array.isArray(firstRow) 
          ? (firstRow as unknown[]).map(String).filter(Boolean)
          : [];
        
        return {
          columns,
          fileName: input.fileName,
          rowCount: data.length - 1
        };
      } catch (error) {
        console.error('Excel 분석 실패:', error);
        throw new Error('Excel 파일을 분석할 수 없습니다.');
      }
    }),

  /**
   * DB 컬럼 매핑 추천
   */
  suggestMappings: publicProcedure
    .input(
      z.object({
        columns: z.array(z.string()),
        context: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      try {
        // db-metadata-search 유틸리티 사용
        const mappings = await quickMapColumns(
          input.columns,
          input.context
        );

        return {
          mappings,
          totalColumns: input.columns.length,
          highConfidence: mappings.filter(m => m.confidence >= 80).length,
          mediumConfidence: mappings.filter(m => m.confidence >= 50 && m.confidence < 80).length,
          lowConfidence: mappings.filter(m => m.confidence < 50).length
        };
      } catch (error) {
        console.error('매핑 추천 실패:', error);
        throw new Error('컬럼 매핑을 생성할 수 없습니다.');
      }
    })
});

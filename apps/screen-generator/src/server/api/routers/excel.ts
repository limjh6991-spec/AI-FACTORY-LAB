import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import * as XLSX from 'xlsx';
import { mapWithAgent, saveMappingFeedback, type FewShotExample } from '~/application/services/agent-mapper';
import { designReport, createExcelFromData } from '~/application/services/agent-excel-generator';

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
   * DB 컬럼 매핑 추천 (Agent 기반)
   */
  suggestMappings: publicProcedure
    .input(
      z.object({
        columns: z.array(z.string()),
        context: z.string().optional(),
        fewShotExamples: z.array(
          z.object({
            excelColumn: z.string(),
            dbTable: z.string(),
            dbColumn: z.string(),
            reason: z.string()
          })
        ).optional()
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Agent 기반 매핑 (RAG + Few-Shot Learning)
        const mappings = await mapWithAgent(
          input.columns,
          input.fewShotExamples as FewShotExample[] | undefined
        );

        return {
          mappings,
          totalColumns: input.columns.length,
          highConfidence: mappings.filter(m => m.confidence >= 80).length,
          mediumConfidence: mappings.filter(m => m.confidence >= 50 && m.confidence < 80).length,
          lowConfidence: mappings.filter(m => m.confidence < 50).length,
          systemType: 'agent-based' as const, // Agent 기반임을 명시
          ragEnabled: true,
          fewShotEnabled: (input.fewShotExamples?.length ?? 0) > 0
        };
      } catch (error) {
        console.error('Agent 매핑 실패:', error);
        throw new Error('컬럼 매핑을 생성할 수 없습니다.');
      }
    }),

  /**
   * 모든 DB 테이블과 컬럼 정보 가져오기
   */
  getAllTablesAndColumns: publicProcedure
    .query(async ({ ctx }) => {
      try {
        // information_schema에서 테이블과 컬럼 정보 조회
        const result = await ctx.db.$queryRaw<
          Array<{
            table_name: string;
            column_name: string;
            data_type: string;
            column_comment: string | null;
          }>
        >`
          SELECT 
            c.table_name,
            c.column_name,
            c.data_type,
            pgd.description as column_comment
          FROM information_schema.columns c
          LEFT JOIN pg_catalog.pg_statio_all_tables st 
            ON c.table_schema = st.schemaname 
            AND c.table_name = st.relname
          LEFT JOIN pg_catalog.pg_description pgd 
            ON pgd.objoid = st.relid 
            AND pgd.objsubid = c.ordinal_position
          WHERE c.table_schema = 'public'
          ORDER BY c.table_name, c.ordinal_position
        `;

        // 테이블별로 그룹화
        const tableMap = new Map<string, Array<{
          columnName: string;
          dataType: string;
          comment: string | null;
        }>>();

        result.forEach(row => {
          const columns = tableMap.get(row.table_name) || [];
          columns.push({
            columnName: row.column_name,
            dataType: row.data_type,
            comment: row.column_comment
          });
          tableMap.set(row.table_name, columns);
        });

        // 배열로 변환
        const tables = Array.from(tableMap.entries()).map(([tableName, columns]) => ({
          tableName,
          columns
        }));

        return {
          tables,
          totalTables: tables.length,
          totalColumns: result.length
        };
      } catch (error) {
        console.error('DB 메타데이터 조회 실패:', error);
        throw new Error('데이터베이스 정보를 가져올 수 없습니다.');
      }
    }),

  /**
   * 사용자 피드백 저장 (강화학습)
   */
  saveFeedback: publicProcedure
    .input(
      z.object({
        excelColumn: z.string(),
        correctTable: z.string(),
        correctColumn: z.string(),
        reasoning: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      try {
        await saveMappingFeedback(
          input.excelColumn,
          input.correctTable,
          input.correctColumn,
          input.reasoning || '사용자가 직접 수정한 매핑'
        );

        return {
          success: true,
          message: '피드백이 저장되어 다음 추론에 활용됩니다.'
        };
      } catch (error) {
        console.error('피드백 저장 실패:', error);
        throw new Error('피드백을 저장할 수 없습니다.');
      }
    }),

  /**
   * Agent 기반 Excel 보고서 생성
   */
  generateReport: publicProcedure
    .input(
      z.object({
        reportName: z.string(),
        description: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        console.log(`🤖 "${input.reportName}" 보고서 생성 시작...`);

        // 1. Agent가 보고서 설계
        const reportDesign = await designReport({
          reportName: input.reportName,
          description: input.description
        });

        console.log('✓ Agent 보고서 설계 완료');
        console.log(`  - 컬럼 수: ${reportDesign.columns.length}`);
        console.log(`  - 사용 테이블: ${reportDesign.tables.join(', ')}`);
        console.log(`  - SQL: ${reportDesign.sqlQuery.substring(0, 100)}...`);

        // 2. SQL 실행 및 데이터 조회
        let data: Record<string, any>[] = [];
        try {
          data = await ctx.db.$queryRawUnsafe<Record<string, any>[]>(
            reportDesign.sqlQuery
          );
          console.log(`✓ 데이터 조회 완료: ${data.length}행`);
        } catch (sqlError) {
          console.error('SQL 실행 실패:', sqlError);
          throw new Error(`SQL 실행 실패: ${sqlError instanceof Error ? sqlError.message : '알 수 없는 오류'}`);
        }

        // 3. Excel 파일 생성
        const excelBuffer = createExcelFromData(reportDesign, data);
        console.log('✓ Excel 파일 생성 완료');

        // 4. Base64로 인코딩하여 반환
        const base64Data = excelBuffer.toString('base64');

        return {
          success: true,
          reportDesign: {
            reportName: reportDesign.reportName,
            columns: reportDesign.columns,
            tables: reportDesign.tables,
            reasoning: reportDesign.reasoning,
            agentThinking: reportDesign.agentThinking
          },
          data: base64Data, // base64 encoded Excel file
          rowCount: data.length,
          fileName: `${reportDesign.reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`
        };
      } catch (error) {
        console.error('보고서 생성 실패:', error);
        throw new Error(`보고서 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
      }
    })
});

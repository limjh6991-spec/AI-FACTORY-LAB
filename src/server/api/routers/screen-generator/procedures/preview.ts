/**
 * 미리보기 생성 프로시저
 * @module screenGenerator/procedures/preview
 */

import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import Anthropic from "@anthropic-ai/sdk";
import {
  getAnthropicApiKey,
  generateReactFromTemplate,
  createDefaultGridData,
  generateHtmlFromTemplate,
  buildJsonDataPrompt,
} from "../_shared/legacy";
import {
  ScreenType,
  type CrudParsedData,
} from "../_shared/types";
import { SimpleGridCrudTemplate } from "../templates/simple-grid-crud";
import { RealGridCrudTemplate } from "../templates/realgrid-crud";

/**
 * Claude API로 미리보기 생성
 * - JSON 데이터만 생성 요청
 * - 실패 시 템플릿 기반 기본 데이터 사용
 */
export const generatePreview = publicProcedure
  .input(z.object({
    parsedData: z.any(),
    previewType: z.enum(["html", "react"]).default("html"),
  }))
  .mutation(async ({ input }) => {
    try {
      // API 키 가져오기
      const apiKey = getAnthropicApiKey();

      let gridData;

      if (apiKey) {
        try {
          const anthropic = new Anthropic({ apiKey });
          const jsonPrompt = buildJsonDataPrompt(input.parsedData);

          const message = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4096,
            messages: [{ role: "user", content: jsonPrompt }],
          });

          const content = message.content[0];
          if (content && content.type === "text") {
            console.log("[DEBUG] Claude JSON 응답:", content.text.substring(0, 500));

            // JSON 파싱 시도
            const jsonMatch = content.text.match(/```json\s*([\s\S]*?)\s*```/) ||
              content.text.match(/\{[\s\S]*\}/);
            const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content.text;
            gridData = JSON.parse(jsonStr);
            console.log("[DEBUG] JSON 파싱 성공:", Object.keys(gridData));
          }
        } catch (parseError) {
          console.error("[ERROR] Claude API/JSON 파싱 실패:", parseError);
          console.log("[DEBUG] 파싱 실패로 기본 데이터 사용");
        }
      }

      // API 실패 또는 API 키 없음 → 템플릿 기반 기본 데이터
      if (!gridData) {
        gridData = createDefaultGridData(input.parsedData);
      }

      // 템플릿에 데이터 주입하여 코드 생성
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
        error: `미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      };
    }
  });

/**
 * 템플릿 기반 미리보기 생성 (Claude API 없이)
 */
export const generatePreviewTemplate = publicProcedure
  .input(z.object({
    parsedData: z.any(),
    previewType: z.enum(["html", "react"]).default("html"),
  }))
  .mutation(async ({ input }) => {
    try {
      // 템플릿 기반 기본 데이터 생성
      const gridData = createDefaultGridData(input.parsedData);

      const reactCode = generateReactFromTemplate(input.parsedData, gridData);

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
        error: `미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      };
    }
  });

/**
 * CRUD 화면 미리보기 생성
 * - SimpleGridCrudTemplate 사용 (실제 컬럼 데이터 사용)
 * - parsedData 또는 screenId/screenName/tableName으로 생성 가능
 */
export const generateCrudPreview = publicProcedure
  .input(z.object({
    parsedData: z.any().optional(), // CrudParsedData (선택)
    screenId: z.string().optional(),
    screenName: z.string().optional(),
    tableName: z.string().optional(),
    searchConditions: z.array(z.any()).optional(), // 검색 조건
    crudColumns: z.array(z.any()).optional(), // CRUD 컬럼
  }))
  .mutation(async ({ input }) => {
    try {
      let parsedData: CrudParsedData;

      // parsedData가 없으면 기본값으로 생성
      if (input.parsedData) {
        parsedData = input.parsedData as CrudParsedData;
        if (input.screenId) {
          parsedData.screenId = input.screenId;
        }
      } else if (input.screenId && input.screenName && input.tableName) {
        // 간편 모드: screenId, screenName, tableName으로 생성
        parsedData = {
          screenId: input.screenId,
          screenName: input.screenName,
          tableName: input.tableName,
          screenType: ScreenType.SIMPLE_GRID_CRUD,
          searchConditions: input.searchConditions || [],
          gridColumns: {
            row1: [],
            row2: [],
            row3: [],
            merges: [],
            summaryRows: [],
          },
          crudConfig: {
            primaryKey: 'id',
            autoGeneratePk: false,
            softDelete: false,
            auditColumns: true,
            rowSelection: 'multiple',
            pagination: false,
          },
          crudColumns: input.crudColumns || [],
        };
      } else {
        return {
          success: false,
          error: 'parsedData 또는 (screenId, screenName, tableName)을 입력해주세요.',
        };
      }

      // SimpleGridCrudTemplate 사용 (실제 데이터 기반)
      const template = new SimpleGridCrudTemplate();
      const result = await template.generateComponent(parsedData);

      if (!result.success) {
        return {
          success: false,
          error: result.error || '컴포넌트 생성 실패',
        };
      }

      return {
        success: true,
        component: result.code,
        api: '', // 간편모드에서는 API 코드 생략 (미리보기 전용)
        warnings: [],
        generationTime: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: `CRUD 미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      };
    }
  });

/**
 * RealGrid CRUD 화면 미리보기 생성
 * - RealGridCrudTemplate 사용 (실제 컬럼 데이터 사용)
 * - parsedData 또는 screenId/screenName/tableName으로 생성 가능
 */
export const generateRealGridPreview = publicProcedure
  .input(z.object({
    parsedData: z.any().optional(), // CrudParsedData (선택)
    screenId: z.string().optional(),
    screenName: z.string().optional(),
    tableName: z.string().optional(),
    searchConditions: z.array(z.any()).optional(), // 검색 조건
    crudColumns: z.array(z.any()).optional(), // CRUD 컬럼
  }))
  .mutation(async ({ input }) => {
    try {
      let parsedData: CrudParsedData;

      // parsedData가 없으면 기본값으로 생성
      if (input.parsedData) {
        parsedData = input.parsedData as CrudParsedData;
        if (input.screenId) {
          parsedData.screenId = input.screenId;
        }
      } else if (input.screenId && input.screenName && input.tableName) {
        // 간편 모드: screenId, screenName, tableName으로 생성
        parsedData = {
          screenId: input.screenId,
          screenName: input.screenName,
          tableName: input.tableName,
          screenType: ScreenType.REALGRID_CRUD,
          searchConditions: input.searchConditions || [],
          gridColumns: {
            row1: [],
            row2: [],
            row3: [],
            merges: [],
            summaryRows: [],
          },
          crudConfig: {
            primaryKey: 'id',
            autoGeneratePk: false,
            softDelete: false,
            auditColumns: true,
            rowSelection: 'multiple',
            pagination: false,
          },
          crudColumns: input.crudColumns || [],
        };
      } else {
        return {
          success: false,
          error: 'parsedData 또는 (screenId, screenName, tableName)을 입력해주세요.',
        };
      }

      // RealGridCrudTemplate 사용 (실제 데이터 기반)
      const template = new RealGridCrudTemplate();
      const result = await template.generateComponent(parsedData);

      if (!result.success) {
        return {
          success: false,
          error: result.error || '컴포넌트 생성 실패',
        };
      }

      // SQL 쿼리 생성
      const { SelectQueryBuilder } = await import('../templates/query-generator');

      // 공통 옵션 타입 → DB 컬럼명 매핑
      const OPTION_TYPE_TO_COLUMN: Record<string, string> = {
        'YEAR_MONTH': 'yyyymm',
        'BI_YEAR_MONTH': 'yyyymm',
        'BI_SITE': 'plant_site_code',
        'BI_DEPT': 'dept_code',
        'BI_ACCOUNT': 'acct_code',
        'BI_CUSTOMER': 'cust_code',
        'BI_EQUIPMENT': 'equipment_code',
        'BI_PRODUCT': 'product_code',
        'BI_SCENARIO': 'scenario_code',
      };

      const queryBuilder = new SelectQueryBuilder();
      const sqlQuery = queryBuilder.build({
        tableName: parsedData.tableName || 'unknown_table',
        searchConditions: parsedData.searchConditions?.map((sc: any) => {
          const optionType = sc.type?.toUpperCase() || '';
          const dbColumn = OPTION_TYPE_TO_COLUMN[optionType] || sc.columnName || sc.field || sc.name;
          return {
            field: dbColumn,
            operator: 'eq' as const,
            paramName: sc.name || sc.field,
          };
        }) || [],
        limit: 500,
      });

      return {
        success: true,
        component: result.code,
        query: sqlQuery,  // SQL 쿼리 추가
        api: '', // 간편모드에서는 API 코드 생략 (미리보기 전용)
        warnings: [],
        generationTime: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: `RealGrid 미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      };
    }
  });


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
} from "~/lib/screen-generator";
import { 
  ScreenType,
  type CrudParsedData,
} from "../_shared/types";
import { SimpleGridCrudTemplate } from "../templates/simpleGridCrud";

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
 * - 템플릿 기반 컴포넌트 + API 코드 생성
 */
export const generateCrudPreview = publicProcedure
  .input(z.object({
    parsedData: z.any(), // CrudParsedData
    screenId: z.string().optional(),
  }))
  .mutation(async ({ input }) => {
    try {
      const parsedData = input.parsedData as CrudParsedData;
      
      // screenId 설정
      if (input.screenId) {
        parsedData.screenId = input.screenId;
      }
      
      // 화면 유형 확인
      const screenType = parsedData.screenType;
      if (screenType !== ScreenType.SIMPLE_GRID_CRUD && 
          screenType !== ScreenType.COMPLEX_GRID_CRUD) {
        return {
          success: false,
          error: 'CRUD 화면 유형이 아닙니다.',
        };
      }
      
      // 템플릿 인스턴스 생성
      const template = new SimpleGridCrudTemplate();
      
      // 전체 화면 생성 (컴포넌트 + API)
      const result = await template.generateScreen(parsedData);
      
      return {
        success: result.success,
        component: result.component,
        api: result.api,
        warnings: result.warnings,
        generationTime: result.generationTime,
        error: result.success ? undefined : '화면 생성에 실패했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: `CRUD 미리보기 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      };
    }
  });

/**
 * 임시화면 관리 프로시저
 * @module screenGenerator/procedures/tempScreen
 */

import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import * as fs from "fs";
import * as path from "path";
import {
  ensureDir,
  readJsonFile,
  writeJsonFile,
  writeTextFile,
  readTextFile,
  getTempScreenPath,
  generateTempScreenId,
  getISOTimestamp,
} from "../_shared/utils";

/**
 * 임시화면 저장
 */
export const saveTempScreen = publicProcedure
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
      const tempDir = getTempScreenPath();
      ensureDir(tempDir);
      
      // 고유 ID 생성
      const screenId = generateTempScreenId();
      const screenDir = path.join(tempDir, screenId);
      ensureDir(screenDir);
      
      // 메타데이터 저장
      const metadata = {
        screenId,
        screenName: input.screenName,
        screenNameEn: input.screenNameEn || '',
        tableName: input.tableName || '',
        createdAt: getISOTimestamp(),
        status: 'temp',
      };
      writeJsonFile(path.join(screenDir, 'metadata.json'), metadata);
      
      // HTML 미리보기 저장
      if (input.htmlContent) {
        writeTextFile(path.join(screenDir, 'preview.html'), input.htmlContent);
      }
      
      // React 컴포넌트 저장
      if (input.reactContent) {
        writeTextFile(path.join(screenDir, 'component.tsx'), input.reactContent);
      }
      
      // SQL 쿼리 저장
      if (input.sqlQuery) {
        writeTextFile(path.join(screenDir, 'query.sql'), input.sqlQuery);
      }
      
      // parsedData 저장
      if (input.parsedData) {
        writeJsonFile(path.join(screenDir, 'parsedData.json'), input.parsedData);
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
  });

/**
 * 임시화면 목록 조회
 */
export const getTempScreenList = publicProcedure
  .query(() => {
    try {
      const tempDir = getTempScreenPath();
      
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
        const metadata = readJsonFile<any>(path.join(screenDir, 'metadata.json'));
        
        if (metadata) {
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
  });

/**
 * 임시화면 상세 조회
 */
export const getTempScreen = publicProcedure
  .input(z.object({
    screenId: z.string(),
  }))
  .query(({ input }) => {
    try {
      const screenDir = getTempScreenPath(input.screenId);
      
      if (!fs.existsSync(screenDir)) {
        return { success: false, error: `화면 '${input.screenId}'을(를) 찾을 수 없습니다.` };
      }
      
      const metadata = readJsonFile(path.join(screenDir, 'metadata.json'));
      
      return {
        success: true,
        metadata,
        htmlContent: readTextFile(path.join(screenDir, 'preview.html')),
        reactContent: readTextFile(path.join(screenDir, 'component.tsx')),
        sqlQuery: readTextFile(path.join(screenDir, 'query.sql')),
        parsedData: readJsonFile(path.join(screenDir, 'parsedData.json')),
      };
    } catch (error) {
      return {
        success: false,
        error: `화면 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      };
    }
  });

/**
 * 임시화면 삭제
 */
export const deleteTempScreen = publicProcedure
  .input(z.object({
    screenId: z.string(),
  }))
  .mutation(({ input }) => {
    try {
      const screenDir = getTempScreenPath(input.screenId);
      
      if (!fs.existsSync(screenDir)) {
        return { success: false, error: `화면 '${input.screenId}'을(를) 찾을 수 없습니다.` };
      }
      
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
  });

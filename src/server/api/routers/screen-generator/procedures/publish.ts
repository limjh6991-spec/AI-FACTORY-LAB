/**
 * 화면 발행 프로시저
 * @module screenGenerator/procedures/publish
 */

import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import * as fs from "fs";
import * as path from "path";
import Anthropic from "@anthropic-ai/sdk";
import {
  generateScreenId as generateScreenIdFromModule,
  getAnthropicApiKey,
  convertToNextPage,
  buildReactComponentPrompt,
} from "../_shared/legacy";
import {
  ensureDir,
  readJsonFile,
  writeJsonFile,
  writeTextFile,
  readTextFile,
  getTempScreenPath,
  getPublishedScreenPath,
  getAppScreenPath,
  getISOTimestamp,
} from "../_shared/utils";

/**
 * 화면 ID 생성 wrapper
 */
async function generateScreenId(): Promise<string> {
  return generateScreenIdFromModule();
}

/**
 * 임시화면을 정식 화면으로 발행 (메뉴 연결)
 */
export const publishScreen = publicProcedure
  .input(z.object({
    screenId: z.string(),
    parentMenuId: z.string(),
    menuName: z.string(),
    menuNameEn: z.string().optional(),
    sortOrder: z.number().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const tempScreenDir = getTempScreenPath(input.screenId);

      if (!fs.existsSync(tempScreenDir)) {
        return { success: false, error: `임시화면 '${input.screenId}'을(를) 찾을 수 없습니다.` };
      }

      // 1. 새 화면 ID 생성 (SC + 6자리)
      const newScreenId = await generateScreenId();

      // 2. 정식 화면 폴더로 복사
      const finalDir = getPublishedScreenPath(newScreenId);
      ensureDir(finalDir);

      const files = fs.readdirSync(tempScreenDir);
      for (const file of files) {
        fs.copyFileSync(
          path.join(tempScreenDir, file),
          path.join(finalDir, file)
        );
      }

      // 메타데이터 업데이트
      const metadata = readJsonFile<any>(path.join(finalDir, 'metadata.json')) || {};
      metadata.screenId = newScreenId;
      metadata.status = 'published';
      metadata.publishedAt = getISOTimestamp();
      writeJsonFile(path.join(finalDir, 'metadata.json'), metadata);

      // 3. 부모 메뉴 정보 조회
      const parentMenu = await ctx.db.$queryRaw<Array<{
        menu_level: number;
        menu_id: string;
      }>>`
        SELECT menu_level, menu_id 
        FROM sys_menu 
        WHERE menu_id = ${input.parentMenuId}
      `;

      const parentLevel = parentMenu?.[0]?.menu_level ?? 0;
      const newMenuLevel = parentLevel + 1;

      // 현재 부모 아래 최대 sort_order 조회
      const maxSortOrder = await ctx.db.$queryRaw<Array<{ max_order: number | null }>>`
        SELECT MAX(sort_order) as max_order 
        FROM sys_menu 
        WHERE parent_id = ${input.parentMenuId}
      `;
      const maxOrderValue = maxSortOrder?.[0]?.max_order ?? 0;
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
        createdAt: getISOTimestamp(),
      };
      writeJsonFile(path.join(finalDir, 'menu.json'), menuEntry);

      // 6. src/app/screens/[screenId]/page.tsx 생성
      const componentCode = readTextFile(path.join(finalDir, 'component.tsx'));
      if (componentCode) {
        // RealGrid 화면 여부 감지 (RealGrid import 포함 시)
        const isRealGridScreen = componentCode.includes("from 'realgrid'") ||
          componentCode.includes('from "realgrid"') ||
          componentCode.includes('GridView') ||
          componentCode.includes('LocalDataProvider');

        let pageCode: string;
        if (isRealGridScreen) {
          // RealGrid 화면: 직접 사용 (convertToNextPage가 AG Grid 코드를 추가하므로 건너뜀)
          pageCode = componentCode;
          console.log(`[DEBUG] RealGrid 화면 감지 - 변환 없이 사용: ${newScreenId}`);
        } else {
          // AG Grid 화면: 기존 변환 로직 사용
          pageCode = convertToNextPage(componentCode, newScreenId, input.menuName);
        }

        const appScreenDir = getAppScreenPath(newScreenId);
        ensureDir(appScreenDir);
        writeTextFile(path.join(appScreenDir, 'page.tsx'), pageCode);

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
  });

/**
 * React 컴포넌트 생성 (AG Grid 기반)
 */
export const generateReactComponent = publicProcedure
  .input(z.object({
    screenId: z.string(),
  }))
  .mutation(async ({ input }) => {
    try {
      const tempDir = getTempScreenPath(input.screenId);
      const parsedData = readJsonFile<any>(path.join(tempDir, 'parsedData.json'));

      if (!parsedData) {
        return { success: false, error: '화면 데이터를 찾을 수 없습니다.' };
      }

      // SQL 쿼리 로드
      const sqlQuery = readTextFile(path.join(tempDir, 'query.sql'));

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
      writeTextFile(path.join(tempDir, 'component.tsx'), reactCode);

      // 메타데이터 업데이트
      const metadata = readJsonFile<any>(path.join(tempDir, 'metadata.json'));
      if (metadata) {
        metadata.hasReact = true;
        metadata.reactGeneratedAt = getISOTimestamp();
        writeJsonFile(path.join(tempDir, 'metadata.json'), metadata);
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
  });

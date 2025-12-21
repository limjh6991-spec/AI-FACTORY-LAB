/**
 * 메뉴 API 라우터
 * DB에서 메뉴 데이터를 조회하여 트리 구조로 반환
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import fs from "fs";
import path from "path";

/**
 * 화면 ID에 해당하는 생성된 파일들 삭제
 */
function deleteScreenFiles(screenId: string): { deleted: string[], errors: string[] } {
  const result = { deleted: [] as string[], errors: [] as string[] };

  if (!screenId || !screenId.match(/^SC\d+$/i)) {
    return result;
  }

  const screenIdUpper = screenId.toUpperCase();
  const screenIdLower = screenId.toLowerCase();

  // generated/screens/{SCREENID} 삭제
  const generatedPath = path.join(process.cwd(), 'generated', 'screens', screenIdUpper);
  if (fs.existsSync(generatedPath)) {
    try {
      fs.rmSync(generatedPath, { recursive: true, force: true });
      result.deleted.push(generatedPath);
      console.log(`[메뉴 삭제] generated 삭제: ${generatedPath}`);
    } catch (e) {
      result.errors.push(`generated 삭제 실패: ${e}`);
    }
  }

  // src/app/screens/{screenid} 삭제
  const appPath = path.join(process.cwd(), 'src', 'app', 'screens', screenIdLower);
  if (fs.existsSync(appPath)) {
    try {
      fs.rmSync(appPath, { recursive: true, force: true });
      result.deleted.push(appPath);
      console.log(`[메뉴 삭제] app/screens 삭제: ${appPath}`);
    } catch (e) {
      result.errors.push(`app/screens 삭제 실패: ${e}`);
    }
  }

  return result;
}

// 메뉴 타입 정의
interface MenuNode {
  menuId: string;
  parentId: string | null;
  menuLevel: number;
  sortOrder: number;
  menuName: string;
  menuNameEn: string | null;
  menuPath: string | null;
  menuIcon: string | null;
  screenId: string | null;
  screenType: string;
  isActive: boolean;
  isVisible: boolean;
  badgeText: string | null;
  badgeType: string | null;
  children: MenuNode[];
}

export const menuRouter = createTRPCRouter({
  /**
   * 전체 메뉴를 트리 구조로 조회
   */
  getMenuTree: publicProcedure.query(async ({ ctx }) => {
    // 모든 메뉴 조회 (활성화된 것만, 정렬 순서대로)
    const menus = await ctx.db.$queryRaw<Array<{
      menu_id: string;
      parent_id: string | null;
      menu_level: number;
      sort_order: number;
      menu_name: string;
      menu_name_en: string | null;
      menu_path: string | null;
      menu_icon: string | null;
      screen_id: string | null;
      screen_type: string;
      is_active: boolean;
      is_visible: boolean;
      badge_text: string | null;
      badge_type: string | null;
    }>>`
      SELECT 
        menu_id, parent_id, menu_level, sort_order,
        menu_name, menu_name_en, menu_path, menu_icon,
        screen_id, screen_type, is_active, is_visible,
        badge_text, badge_type
      FROM "binary".sys_menu
      WHERE is_active = true AND is_visible = true
      ORDER BY sort_order ASC
    `;

    // 트리 구조로 변환
    const menuMap = new Map<string, MenuNode>();
    const rootMenus: MenuNode[] = [];

    // 먼저 모든 메뉴를 맵에 저장
    menus.forEach(menu => {
      menuMap.set(menu.menu_id, {
        menuId: menu.menu_id,
        parentId: menu.parent_id,
        menuLevel: menu.menu_level,
        sortOrder: menu.sort_order,
        menuName: menu.menu_name,
        menuNameEn: menu.menu_name_en,
        menuPath: menu.menu_path,
        menuIcon: menu.menu_icon,
        screenId: menu.screen_id,
        screenType: menu.screen_type,
        isActive: menu.is_active,
        isVisible: menu.is_visible,
        badgeText: menu.badge_text,
        badgeType: menu.badge_type,
        children: [],
      });
    });

    // 부모-자식 관계 설정
    menuMap.forEach(menu => {
      if (menu.parentId) {
        const parent = menuMap.get(menu.parentId);
        if (parent) {
          parent.children.push(menu);
        }
      } else {
        rootMenus.push(menu);
      }
    });

    return rootMenus;
  }),

  /**
   * 새 메뉴 생성
   */
  createMenu: publicProcedure
    .input(z.object({
      menuId: z.string(),
      parentId: z.string().optional(),
      menuName: z.string(),
      menuNameEn: z.string().optional(),
      menuPath: z.string().optional(),
      menuIcon: z.string().optional(),
      screenId: z.string().optional(),
      sortOrder: z.number().default(99),
      menuLevel: z.number().default(2),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // 이미 존재하는지 확인
        const existing = await ctx.db.$queryRaw<Array<{ menu_id: string }>>`
          SELECT menu_id FROM "binary".sys_menu WHERE menu_id = ${input.menuId}
        `;

        if (existing.length > 0) {
          return {
            success: false,
            error: '이미 존재하는 메뉴 ID입니다.',
          };
        }

        // 메뉴 추가
        await ctx.db.$executeRaw`
          INSERT INTO "binary".sys_menu (
            menu_id, parent_id, menu_name, menu_name_en, menu_path, 
            menu_icon, screen_id, sort_order, menu_level, 
            screen_type, is_active, is_visible
          ) VALUES (
            ${input.menuId},
            ${input.parentId || null},
            ${input.menuName},
            ${input.menuNameEn || null},
            ${input.menuPath || null},
            ${input.menuIcon || 'FileText'},
            ${input.screenId || null},
            ${input.sortOrder},
            ${input.menuLevel},
            'PAGE',
            true,
            true
          )
        `;

        return {
          success: true,
          menuId: input.menuId,
        };
      } catch (error) {
        console.error('메뉴 생성 오류:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : '메뉴 생성 중 오류가 발생했습니다.',
        };
      }
    }),

  /**
   * 특정 역할의 메뉴 권한 조회
   */
  getMenuByRole: publicProcedure
    .input(z.object({ roleId: z.string() }))
    .query(async ({ ctx, input }) => {
      const permissions = await ctx.db.$queryRaw<Array<{
        menu_id: string;
        menu_name: string;
        menu_path: string | null;
        menu_icon: string | null;
        can_read: boolean;
        can_create: boolean;
        can_update: boolean;
        can_delete: boolean;
        can_export: boolean;
        can_print: boolean;
      }>>`
        SELECT 
          m.menu_id, m.menu_name, m.menu_path, m.menu_icon,
          mr.can_read, mr.can_create, mr.can_update, 
          mr.can_delete, mr.can_export, mr.can_print
        FROM "binary".sys_menu m
        JOIN "binary".sys_menu_role mr ON m.menu_id = mr.menu_id
        WHERE mr.role_id = ${input.roleId}
          AND m.is_active = true
        ORDER BY m.sort_order
      `;

      return permissions;
    }),

  /**
   * 역할 목록 조회
   */
  getRoles: publicProcedure.query(async ({ ctx }) => {
    const roles = await ctx.db.$queryRaw<Array<{
      role_id: string;
      role_name: string;
      role_desc: string | null;
      is_active: boolean;
    }>>`
      SELECT role_id, role_name, role_desc, is_active
      FROM "binary".sys_role
      WHERE is_active = true
      ORDER BY role_id
    `;

    return roles;
  }),

  /**
   * 메뉴 삭제 (하위 메뉴 포함)
   */
  deleteMenu: publicProcedure
    .input(z.object({
      menuId: z.string(),
      deleteChildren: z.boolean().default(true), // 하위 메뉴도 삭제할지 여부
    }))
    .mutation(async ({ ctx, input }) => {
      const { menuId, deleteChildren } = input;

      // 하위 메뉴가 있는지 확인
      const children = await ctx.db.$queryRaw<Array<{ menu_id: string }>>`
        SELECT menu_id FROM "binary".sys_menu WHERE parent_id = ${menuId}
      `;

      if (children.length > 0 && !deleteChildren) {
        return {
          success: false,
          error: "하위 메뉴가 있습니다. 하위 메뉴를 먼저 삭제하거나 함께 삭제하세요.",
          childCount: children.length,
        };
      }

      try {
        // 하위 메뉴가 있으면 재귀적으로 삭제
        if (deleteChildren && children.length > 0) {
          // 모든 하위 메뉴 ID 수집 (재귀적)
          const getAllChildIds = async (parentId: string): Promise<string[]> => {
            const directChildren = await ctx.db.$queryRaw<Array<{ menu_id: string }>>`
              SELECT menu_id FROM "binary".sys_menu WHERE parent_id = ${parentId}
            `;

            let allIds: string[] = [];
            for (const child of directChildren) {
              allIds.push(child.menu_id);
              const grandChildren = await getAllChildIds(child.menu_id);
              allIds = allIds.concat(grandChildren);
            }
            return allIds;
          };

          const childIds = await getAllChildIds(menuId);

          // 하위 메뉴의 화면 파일 삭제
          const deletedFiles: string[] = [];
          for (const childId of childIds) {
            // 하위 메뉴의 screen_id 조회
            const childMenu = await ctx.db.$queryRaw<Array<{ screen_id: string | null }>>`
              SELECT screen_id FROM "binary".sys_menu WHERE menu_id = ${childId}
            `;
            if (childMenu[0]?.screen_id) {
              const fileResult = deleteScreenFiles(childMenu[0].screen_id);
              deletedFiles.push(...fileResult.deleted);
            }
          }

          // 하위 메뉴들 먼저 삭제 (깊은 것부터)
          for (const childId of childIds.reverse()) {
            await ctx.db.$executeRaw`DELETE FROM "binary".sys_menu WHERE menu_id = ${childId}`;
          }
        }

        // 삭제할 메뉴의 screen_id 조회
        const menuToDelete = await ctx.db.$queryRaw<Array<{ screen_id: string | null }>>`
          SELECT screen_id FROM "binary".sys_menu WHERE menu_id = ${menuId}
        `;

        // 해당 메뉴의 화면 파일 삭제
        let deletedScreens: string[] = [];
        if (menuToDelete[0]?.screen_id) {
          const fileResult = deleteScreenFiles(menuToDelete[0].screen_id);
          deletedScreens = fileResult.deleted;
        }

        // 해당 메뉴 삭제
        await ctx.db.$executeRaw`DELETE FROM "binary".sys_menu WHERE menu_id = ${menuId}`;

        return {
          success: true,
          deletedMenuId: menuId,
          deletedChildCount: children.length,
          deletedScreenFiles: deletedScreens,
        };
      } catch (error) {
        console.error("메뉴 삭제 오류:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "메뉴 삭제 중 오류가 발생했습니다.",
        };
      }
    }),
});

/**
 * 메뉴 API 라우터
 * DB에서 메뉴 데이터를 조회하여 트리 구조로 반환
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
      FROM sys_menu
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
        FROM sys_menu m
        JOIN sys_menu_role mr ON m.menu_id = mr.menu_id
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
      FROM sys_role
      WHERE is_active = true
      ORDER BY role_id
    `;

    return roles;
  }),
});

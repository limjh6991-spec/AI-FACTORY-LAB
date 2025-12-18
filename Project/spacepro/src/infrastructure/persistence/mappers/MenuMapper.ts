/**
 * MenuMapper - Prisma 모델 ↔ 도메인 엔티티 변환
 * Clean Architecture: Infrastructure Layer
 */

import { Menu as PrismaMenu } from '../../../generated/prisma';
import { Menu, MenuProps, MenuType } from '../../../domain/entities/Menu';

export class MenuMapper {
    /**
     * Prisma 모델 → 도메인 엔티티
     */
    static toDomain(raw: PrismaMenu & { children?: PrismaMenu[] }): Menu {
        const props: MenuProps = {
            id: raw.id,
            menuCode: raw.menuCode,
            menuName: raw.menuName,
            menuNameEn: raw.menuNameEn,
            menuPath: raw.menuPath,
            menuIcon: raw.menuIcon,
            parentId: raw.parentId,
            menuLevel: raw.menuLevel,
            sortOrder: raw.sortOrder,
            menuType: raw.menuType as MenuType,
            isActive: raw.isActive,
            description: raw.description,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            children: raw.children?.map(child => MenuMapper.toDomain(child)) || [],
        };

        return new Menu(props);
    }

    /**
     * 도메인 엔티티 → Prisma 생성 입력
     */
    static toCreateInput(menu: Menu) {
        return {
            menuCode: menu.menuCode,
            menuName: menu.menuName,
            menuNameEn: menu.menuNameEn,
            menuPath: menu.menuPath,
            menuIcon: menu.menuIcon,
            parentId: menu.parentId,
            menuLevel: menu.menuLevel,
            sortOrder: menu.sortOrder,
            menuType: menu.menuType,
            isActive: menu.isActive,
            description: menu.description,
        };
    }

    /**
     * 도메인 엔티티 → Prisma 수정 입력
     */
    static toUpdateInput(menu: Menu) {
        return {
            menuName: menu.menuName,
            menuNameEn: menu.menuNameEn,
            menuPath: menu.menuPath,
            menuIcon: menu.menuIcon,
            parentId: menu.parentId,
            menuLevel: menu.menuLevel,
            sortOrder: menu.sortOrder,
            menuType: menu.menuType,
            isActive: menu.isActive,
            description: menu.description,
        };
    }
}

/**
 * PrismaMenuRepository - Prisma 기반 메뉴 Repository 구현
 * Clean Architecture: Infrastructure Layer (Adapter)
 */

import { PrismaClient } from '../../../generated/prisma';
import { Menu } from '../../../domain/entities/Menu';
import { IMenuRepository } from '../../../domain/repositories/IMenuRepository';
import { MenuMapper } from '../mappers/MenuMapper';

export class PrismaMenuRepository implements IMenuRepository {
    constructor(private prisma: PrismaClient) { }

    async findAll(): Promise<Menu[]> {
        const menus = await this.prisma.menu.findMany({
            where: { isActive: true },
            orderBy: [{ menuLevel: 'asc' }, { sortOrder: 'asc' }],
        });

        return menus.map(MenuMapper.toDomain);
    }

    async findById(id: number): Promise<Menu | null> {
        const menu = await this.prisma.menu.findUnique({
            where: { id },
        });

        return menu ? MenuMapper.toDomain(menu) : null;
    }

    async findByCode(menuCode: string): Promise<Menu | null> {
        const menu = await this.prisma.menu.findUnique({
            where: { menuCode },
        });

        return menu ? MenuMapper.toDomain(menu) : null;
    }

    async findHierarchy(): Promise<Menu[]> {
        // 모든 메뉴 조회
        const allMenus = await this.prisma.menu.findMany({
            where: { isActive: true },
            orderBy: [{ menuLevel: 'asc' }, { sortOrder: 'asc' }],
        });

        // 계층 구조 구성
        const menuMap = new Map<number, Menu & { children: Menu[] }>();
        const rootMenus: Menu[] = [];

        // 1단계: 모든 메뉴를 Map에 저장
        allMenus.forEach((raw) => {
            const menu = MenuMapper.toDomain(raw);
            menuMap.set(raw.id, menu as Menu & { children: Menu[] });
        });

        // 2단계: 부모-자식 관계 구성
        allMenus.forEach((raw) => {
            const menu = menuMap.get(raw.id)!;
            if (raw.parentId) {
                const parent = menuMap.get(raw.parentId);
                if (parent) {
                    (parent as any).props.children = (parent as any).props.children || [];
                    (parent as any).props.children.push(menu);
                }
            } else {
                rootMenus.push(menu);
            }
        });

        return rootMenus;
    }

    async findByParentId(parentId: number | null): Promise<Menu[]> {
        const menus = await this.prisma.menu.findMany({
            where: { parentId, isActive: true },
            orderBy: { sortOrder: 'asc' },
        });

        return menus.map(MenuMapper.toDomain);
    }

    async save(menu: Menu): Promise<Menu> {
        if (menu.id) {
            // Update
            const updated = await this.prisma.menu.update({
                where: { id: menu.id },
                data: MenuMapper.toUpdateInput(menu),
            });
            return MenuMapper.toDomain(updated);
        } else {
            // Create
            const created = await this.prisma.menu.create({
                data: MenuMapper.toCreateInput(menu),
            });
            return MenuMapper.toDomain(created);
        }
    }

    async delete(id: number): Promise<void> {
        await this.prisma.menu.update({
            where: { id },
            data: { isActive: false },
        });
    }
}

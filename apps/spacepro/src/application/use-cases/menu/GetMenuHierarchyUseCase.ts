/**
 * GetMenuHierarchyUseCase - 메뉴 계층 구조 조회 유스케이스
 * Clean Architecture: Application Layer
 */

import { Menu, MenuDTO } from '../../../domain/entities/Menu';
import { IMenuRepository } from '../../../domain/repositories/IMenuRepository';

export interface GetMenuHierarchyOutput {
    menus: MenuDTO[];
}

export class GetMenuHierarchyUseCase {
    constructor(private menuRepository: IMenuRepository) { }

    async execute(): Promise<GetMenuHierarchyOutput> {
        const menus = await this.menuRepository.findHierarchy();

        return {
            menus: menus.map(menu => menu.toDTO()),
        };
    }
}

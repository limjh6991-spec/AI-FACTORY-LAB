/**
 * IMenuRepository - 메뉴 Repository 인터페이스
 * Clean Architecture: Domain Layer (Port)
 */

import { Menu } from '../entities/Menu';

export interface IMenuRepository {
    /**
     * 모든 활성 메뉴 조회
     */
    findAll(): Promise<Menu[]>;

    /**
     * ID로 메뉴 조회
     */
    findById(id: number): Promise<Menu | null>;

    /**
     * 메뉴 코드로 조회
     */
    findByCode(menuCode: string): Promise<Menu | null>;

    /**
     * 계층 구조로 메뉴 조회 (트리 형태)
     */
    findHierarchy(): Promise<Menu[]>;

    /**
     * 상위 메뉴 ID로 하위 메뉴 조회
     */
    findByParentId(parentId: number | null): Promise<Menu[]>;

    /**
     * 메뉴 저장 (생성/수정)
     */
    save(menu: Menu): Promise<Menu>;

    /**
     * 메뉴 삭제
     */
    delete(id: number): Promise<void>;
}

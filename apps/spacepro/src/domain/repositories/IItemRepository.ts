/**
 * IItemRepository - 품목 Repository 인터페이스
 * Clean Architecture: Domain Layer (Port)
 */

import { Item } from '../entities/Item';

export interface ItemFilter {
    itemType?: string;
    isActive?: boolean;
    keyword?: string;
}

export interface IItemRepository {
    /**
     * 모든 품목 조회
     */
    findAll(filter?: ItemFilter): Promise<Item[]>;

    /**
     * ID로 품목 조회
     */
    findById(id: number): Promise<Item | null>;

    /**
     * 품목 코드로 조회
     */
    findByCode(itemCode: string): Promise<Item | null>;

    /**
     * 품목 타입별 조회
     */
    findByType(itemType: string): Promise<Item[]>;

    /**
     * 품목 저장 (생성/수정)
     */
    save(item: Item): Promise<Item>;

    /**
     * 품목 삭제
     */
    delete(id: number): Promise<void>;
}

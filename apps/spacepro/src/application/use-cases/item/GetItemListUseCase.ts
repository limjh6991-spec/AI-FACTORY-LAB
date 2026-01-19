/**
 * GetItemListUseCase - 품목 목록 조회 유스케이스
 * Clean Architecture: Application Layer
 */

import { ItemDTO } from '../../../domain/entities/Item';
import { IItemRepository, ItemFilter } from '../../../domain/repositories/IItemRepository';

export interface GetItemListInput {
    itemType?: string;
    isActive?: boolean;
    keyword?: string;
}

export interface GetItemListOutput {
    items: ItemDTO[];
    total: number;
}

export class GetItemListUseCase {
    constructor(private itemRepository: IItemRepository) { }

    async execute(input?: GetItemListInput): Promise<GetItemListOutput> {
        const filter: ItemFilter = {
            itemType: input?.itemType,
            isActive: input?.isActive,
            keyword: input?.keyword,
        };

        const items = await this.itemRepository.findAll(filter);

        return {
            items: items.map(item => item.toDTO()),
            total: items.length,
        };
    }
}

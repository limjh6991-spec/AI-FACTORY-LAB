/**
 * CreateItemUseCase - 품목 생성 유스케이스
 * Clean Architecture: Application Layer
 */

import { Item, ItemDTO, ItemType } from '../../domain/entities/Item';
import { IItemRepository } from '../../domain/repositories/IItemRepository';

export interface CreateItemInput {
    itemCode: string;
    itemName: string;
    itemType: ItemType;
    unit: string;
    leadTime?: number;
    safetyStock?: number;
}

export class CreateItemUseCase {
    constructor(private itemRepository: IItemRepository) { }

    async execute(input: CreateItemInput): Promise<ItemDTO> {
        // 중복 체크
        const existing = await this.itemRepository.findByCode(input.itemCode);
        if (existing) {
            throw new Error(`품목 코드 '${input.itemCode}'가 이미 존재합니다.`);
        }

        // 엔티티 생성
        const item = Item.create({
            itemCode: input.itemCode,
            itemName: input.itemName,
            itemType: input.itemType,
            unit: input.unit,
            leadTime: input.leadTime,
            safetyStock: input.safetyStock,
            isActive: true,
        });

        // 저장
        const savedItem = await this.itemRepository.save(item);

        return savedItem.toDTO();
    }
}

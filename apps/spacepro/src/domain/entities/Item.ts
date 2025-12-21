/**
 * Item Entity - 품목 도메인 엔티티
 * Clean Architecture: Domain Layer
 */

export type ItemType = 'RAW' | 'SEMI' | 'PRODUCT';

export interface ItemProps {
    id?: number;
    itemCode: string;
    itemName: string;
    itemType: ItemType;
    unit: string;
    leadTime?: number;
    safetyStock?: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Item {
    private props: ItemProps;

    constructor(props: ItemProps) {
        this.props = props;
    }

    // Getters
    get id(): number | undefined { return this.props.id; }
    get itemCode(): string { return this.props.itemCode; }
    get itemName(): string { return this.props.itemName; }
    get itemType(): ItemType { return this.props.itemType; }
    get unit(): string { return this.props.unit; }
    get leadTime(): number { return this.props.leadTime || 0; }
    get safetyStock(): number { return this.props.safetyStock || 0; }
    get isActive(): boolean { return this.props.isActive; }

    // Business Logic
    isRawMaterial(): boolean {
        return this.props.itemType === 'RAW';
    }

    isSemiProduct(): boolean {
        return this.props.itemType === 'SEMI';
    }

    isFinishedProduct(): boolean {
        return this.props.itemType === 'PRODUCT';
    }

    needsReorder(currentStock: number): boolean {
        return currentStock <= this.safetyStock;
    }

    // Factory Method
    static create(props: Omit<ItemProps, 'id' | 'createdAt' | 'updatedAt'>): Item {
        return new Item({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    toDTO(): ItemDTO {
        return {
            id: this.props.id,
            itemCode: this.props.itemCode,
            itemName: this.props.itemName,
            itemType: this.props.itemType,
            unit: this.props.unit,
            leadTime: this.props.leadTime,
            safetyStock: this.props.safetyStock,
            isActive: this.props.isActive,
        };
    }
}

export interface ItemDTO {
    id?: number;
    itemCode: string;
    itemName: string;
    itemType: ItemType;
    unit: string;
    leadTime?: number;
    safetyStock?: number;
    isActive: boolean;
}

/**
 * Menu Entity - 메뉴 도메인 엔티티
 * Clean Architecture: Domain Layer
 */

export type MenuType = 'MENU' | 'GROUP' | 'LINK';

export interface MenuProps {
    id?: number;
    menuCode: string;
    menuName: string;
    menuNameEn?: string | null;
    menuPath?: string | null;
    menuIcon?: string | null;
    parentId?: number | null;
    menuLevel: number;
    sortOrder: number;
    menuType: MenuType;
    isActive: boolean;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    children?: Menu[];
}

export class Menu {
    private props: MenuProps;

    constructor(props: MenuProps) {
        this.props = props;
    }

    // Getters
    get id(): number | undefined { return this.props.id; }
    get menuCode(): string { return this.props.menuCode; }
    get menuName(): string { return this.props.menuName; }
    get menuNameEn(): string | null | undefined { return this.props.menuNameEn; }
    get menuPath(): string | null | undefined { return this.props.menuPath; }
    get menuIcon(): string | null | undefined { return this.props.menuIcon; }
    get parentId(): number | null | undefined { return this.props.parentId; }
    get menuLevel(): number { return this.props.menuLevel; }
    get sortOrder(): number { return this.props.sortOrder; }
    get menuType(): MenuType { return this.props.menuType; }
    get isActive(): boolean { return this.props.isActive; }
    get description(): string | null | undefined { return this.props.description; }
    get children(): Menu[] { return this.props.children || []; }

    // Business Logic Methods
    isGroup(): boolean {
        return this.props.menuType === 'GROUP';
    }

    hasChildren(): boolean {
        return this.children.length > 0;
    }

    isTopLevel(): boolean {
        return this.props.parentId === null || this.props.parentId === undefined;
    }

    // Factory Method
    static create(props: Omit<MenuProps, 'id' | 'createdAt' | 'updatedAt'>): Menu {
        return new Menu({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    // DTO 변환
    toDTO(): MenuDTO {
        return {
            id: this.props.id,
            menuCode: this.props.menuCode,
            menuName: this.props.menuName,
            menuNameEn: this.props.menuNameEn,
            menuPath: this.props.menuPath,
            menuIcon: this.props.menuIcon,
            parentId: this.props.parentId,
            menuLevel: this.props.menuLevel,
            sortOrder: this.props.sortOrder,
            menuType: this.props.menuType,
            isActive: this.props.isActive,
            children: this.children.map(c => c.toDTO()),
        };
    }
}

export interface MenuDTO {
    id?: number;
    menuCode: string;
    menuName: string;
    menuNameEn?: string | null;
    menuPath?: string | null;
    menuIcon?: string | null;
    parentId?: number | null;
    menuLevel: number;
    sortOrder: number;
    menuType: MenuType;
    isActive: boolean;
    children?: MenuDTO[];
}

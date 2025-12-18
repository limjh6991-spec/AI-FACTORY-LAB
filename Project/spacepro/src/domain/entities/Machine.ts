/**
 * Machine Entity - 설비 도메인 엔티티
 * Clean Architecture: Domain Layer
 */

export interface MachineProps {
    id?: number;
    machineCode: string;
    machineName: string;
    machineType?: string | null;
    manufacturer?: string | null;
    uph?: number;  // Unit Per Hour
    efficiency?: number;  // 가동률 (0~100)
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Machine {
    private props: MachineProps;

    constructor(props: MachineProps) {
        this.props = props;
    }

    // Getters
    get id(): number | undefined { return this.props.id; }
    get machineCode(): string { return this.props.machineCode; }
    get machineName(): string { return this.props.machineName; }
    get machineType(): string | null | undefined { return this.props.machineType; }
    get manufacturer(): string | null | undefined { return this.props.manufacturer; }
    get uph(): number { return this.props.uph || 0; }
    get efficiency(): number { return this.props.efficiency || 100; }
    get isActive(): boolean { return this.props.isActive; }

    // Business Logic
    /**
     * 실제 시간당 생산량 계산 (UPH * 효율)
     */
    getActualUPH(): number {
        return Math.floor(this.uph * (this.efficiency / 100));
    }

    /**
     * 주어진 수량을 생산하는데 필요한 시간 (분)
     */
    calculateProductionTime(quantity: number): number {
        const actualUPH = this.getActualUPH();
        if (actualUPH === 0) return 0;
        return Math.ceil((quantity / actualUPH) * 60);
    }

    /**
     * 주어진 시간(분) 동안 생산 가능한 수량
     */
    calculateCapacity(minutes: number): number {
        return Math.floor((minutes / 60) * this.getActualUPH());
    }

    // Factory Method
    static create(props: Omit<MachineProps, 'id' | 'createdAt' | 'updatedAt'>): Machine {
        return new Machine({
            ...props,
            efficiency: props.efficiency ?? 100,
            uph: props.uph ?? 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    toDTO(): MachineDTO {
        return {
            id: this.props.id,
            machineCode: this.props.machineCode,
            machineName: this.props.machineName,
            machineType: this.props.machineType,
            manufacturer: this.props.manufacturer,
            uph: this.props.uph,
            efficiency: this.props.efficiency,
            isActive: this.props.isActive,
        };
    }
}

export interface MachineDTO {
    id?: number;
    machineCode: string;
    machineName: string;
    machineType?: string | null;
    manufacturer?: string | null;
    uph?: number;
    efficiency?: number;
    isActive: boolean;
}

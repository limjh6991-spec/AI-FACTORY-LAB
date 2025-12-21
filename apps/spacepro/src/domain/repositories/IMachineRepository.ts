/**
 * IMachineRepository - 설비 Repository 인터페이스
 * Clean Architecture: Domain Layer (Port)
 */

import { Machine } from '../entities/Machine';

export interface MachineFilter {
    machineType?: string;
    isActive?: boolean;
    keyword?: string;
}

export interface IMachineRepository {
    /**
     * 모든 설비 조회
     */
    findAll(filter?: MachineFilter): Promise<Machine[]>;

    /**
     * ID로 설비 조회
     */
    findById(id: number): Promise<Machine | null>;

    /**
     * 설비 코드로 조회
     */
    findByCode(machineCode: string): Promise<Machine | null>;

    /**
     * 설비 저장 (생성/수정)
     */
    save(machine: Machine): Promise<Machine>;

    /**
     * 설비 삭제
     */
    delete(id: number): Promise<void>;
}

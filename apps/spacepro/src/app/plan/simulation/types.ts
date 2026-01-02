/**
 * Simulation Types
 * 생산 시뮬레이션 관련 타입 정의
 */

export const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    gray100: '#F5F8FA',
    gray200: '#EFF2F5',
    gray300: '#E4E6EF',
    gray400: '#B5B5C3',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
    gray700: '#5E6278',
    gray800: '#3F4254',
    gray900: '#181C32',
};

export const productColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8B500', '#58D68D'
];

export interface RoutingStep {
    op_seq: number;
    op_name: string;
    machine_code: string;
    setup_time: number;
    cycle_time: number;
    process_yield: number;
}

export interface ProductOrder {
    item_code: string;
    quantity: number;
    routing: RoutingStep[];
    color: string;
    priority: 'NORMAL' | 'HIGH' | 'URGENT';
}

export interface ScheduledTask {
    item_code: string;
    op_name: string;
    machine_code: string;
    start_time: number;
    end_time: number;
    quantity: number;
    color: string;
    hasConflict: boolean;
}

export interface SimulationResult {
    schedule: ScheduledTask[];
    totalTime: number;
    conflicts: { machine: string; tasks: string[] }[];
    machineUtilization: { machine: string; utilization: number }[];
}

export interface ScenarioSummary {
    scenario_id: number;
    scenario_name: string;
    algorithm: string;
    created_at: string;
    order_count: number;
    has_result: boolean;
    plan_month: string;
    status?: string;
}

export interface OrderProgress {
    progress_id: number;
    item_code: string;
    planned_qty: number;
    produced_qty: number;
    status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CARRIED_OVER';
    priority: 'NORMAL' | 'HIGH' | 'URGENT';
    progress_pct: number;
}

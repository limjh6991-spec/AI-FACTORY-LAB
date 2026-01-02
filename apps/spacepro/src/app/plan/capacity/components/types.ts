/**
 * 생산 케파 시뮬레이션 타입 정의
 */

export interface Workcenter {
    workcenter_code: string;
    workcenter_name: string;
    workcenter_type: string;
    department: string;
    capacity_uom: string;
    std_capacity: number;
    max_capacity: number;
}

export interface DemandInput {
    workcenter_code: string;
    quantity: number;
}

export interface SimulationResult {
    success: boolean;
    plan_month: string;
    period: {
        start_date: string;
        end_date: string;
        workdays: number;
        half_days: number;
        total_hours: number;
    };
    summary: {
        total_workcenters: number;
        total_demand: number;
        total_capacity: number;
        avg_utilization: number;
        bottleneck_count: number;
        status: string;
    };
    workcenters: WorkcenterResult[];
    bottlenecks: BottleneckInfo[];
}

export interface WorkcenterResult {
    workcenter_code: string;
    workcenter_name: string;
    workcenter_type: string;
    total_demand: number;
    adjusted_demand?: number;
    available_capacity: number;
    adjusted_capacity?: number;
    uph: number;
    efficiency: number;
    yield_rate?: number;
    rework_rate?: number;
    downtime_hours?: number;
    manpower?: number;
    work_hours: number;
    utilization: number;
    gap: number;
    is_bottleneck: boolean;
    status: string;
}

export interface BottleneckInfo {
    workcenter_code: string;
    workcenter_name: string;
    utilization: number;
    shortage: number;
}

export interface AdvancedParams {
    yield_rate_override: number | null;
    rework_rate_override: number | null;
    downtime_override: number | null;
    efficiency_factor: number;
    outsourcing_delay: boolean;
    night_shift_efficiency: number;
}

export interface Version {
    id: number;
    version_name: string;
    plan_month: string;
    created_at: string;
    avg_utilization: number;
    bottleneck_count: number;
}

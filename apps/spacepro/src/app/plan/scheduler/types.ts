export interface Contract {
    contno: string; // 계약 번호 (Order ID)
    macode: string; // 제품 코드 (Product ID)
    due_date?: string; // 납기일 (YYYY-MM-DD)
    quantity: number; // 수량
}

export interface RoutingStep {
    prcode: string; // 공정 코드 (Process ID)
    rn: number; // 공정 순서 (1 -> 2 -> 3)
    Contracted_Man_hours: number; // 소요 시간 (시간 단위)
    target_site: string; // 대상 자원 ID (bench_id) 또는 그룹 ID
}

export interface Resource {
    bench_id: string; // 자원 ID
    bench_name: string; // 자원 명
    site_id: string; // 그룹 ID (예: 공장/현장)
}

export interface ScheduleEvent {
    id: string;
    resourceId: string; // bench_id와 매핑
    title: string;
    startDate: Date;
    endDate: Date;
    duration: number; // 시간
    status: 'scheduled' | 'delayed' | 'completed';
    processCode: string;
    contractNo: string;
}

export interface SchedulerData {
    resources: Resource[];
    events: ScheduleEvent[];
}

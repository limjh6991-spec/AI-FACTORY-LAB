// 스케줄러 타입 정의 (고도화 버전)

export interface Contract {
    contno: string;           // 계약 번호 (Order ID)
    macode: string;           // 제품 코드 (Product ID)
    due_date?: string;        // 납기일 (YYYY-MM-DD)
    quantity: number;         // 수량
    priority?: 'HIGH' | 'NORMAL' | 'LOW';
}

export interface RoutingStep {
    prcode: string;           // 공정 코드 (Process ID)
    rn: number;               // 공정 순서 (1 -> 2 -> 3)
    Contracted_Man_hours: number; // 소요 시간 (시간 단위)
    target_site: string;      // 대상 자원 ID (bench_id)
    prname?: string;          // 공정명
}

export interface Resource {
    bench_id: string;         // 자원 ID
    bench_name: string;       // 자원 명
    site_id: string;          // 그룹 ID (예: 공장/현장)
    site_name?: string;       // 그룹명
    daily_capacity?: number;  // 일일 처리 용량 (시간)
}

export interface ResourceAllocation {
    resourceId: string;
    totalAllocatedHours: number;
    capacityHours: number;
    utilizationPercent: number;
    taskCount: number;
}

export interface ScheduleEvent {
    id: string;
    resourceId: string;       // bench_id와 매핑
    title: string;
    startDate: Date;
    endDate: Date;
    duration: number;         // 시간
    status: 'scheduled' | 'delayed' | 'completed' | 'in-progress';
    processCode: string;
    processName?: string;
    contractNo: string;
    sequenceNo: number;       // rn (공정 순서)
    progress?: number;        // 진행률 (0-100)
}

export interface Dependency {
    fromEventId: string;      // 선행 작업 ID
    toEventId: string;        // 후행 작업 ID
    type: 'finish-to-start' | 'start-to-start';
}

export interface TimelineConfig {
    startDate: Date;
    endDate: Date;
    pixelsPerHour: number;    // 줌 레벨
    showDays: boolean;        // 일 단위 표시
    showHours: boolean;       // 시간 단위 표시
    workingHoursPerDay: number;
}

export interface SchedulerData {
    resources: Resource[];
    events: ScheduleEvent[];
    dependencies: Dependency[];
    allocations: ResourceAllocation[];
    config: TimelineConfig;
}

// 휴무일/비가동 시간
export interface NonWorkingTime {
    date: string;             // YYYY-MM-DD
    shiftId?: string;
    reason?: string;          // 휴일명
}

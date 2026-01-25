// 스케줄러 엔진 (고도화 버전) - Forward Scheduling with Dependencies

import {
    Contract,
    RoutingStep,
    Resource,
    ScheduleEvent,
    Dependency,
    ResourceAllocation,
    SchedulerData,
    TimelineConfig
} from './types';

interface SchedulingRequest {
    contracts: Contract[];
    routings: Record<string, RoutingStep[]>;  // Key: macode
    resources: Resource[];
    startDate: Date;
    workingHoursPerDay?: number;
}

export function scheduleProduction(request: SchedulingRequest): SchedulerData {
    const { contracts, routings, resources, startDate, workingHoursPerDay = 8 } = request;
    const events: ScheduleEvent[] = [];
    const dependencies: Dependency[] = [];

    // 1. 계약 정렬: 납기일 기준 오름차순 (납기 임박 순)
    const sortedContracts = [...contracts].sort((a, b) => {
        const dateA = a.due_date ? new Date(a.due_date).getTime() : Number.MAX_SAFE_INTEGER;
        const dateB = b.due_date ? new Date(b.due_date).getTime() : Number.MAX_SAFE_INTEGER;
        return dateA - dateB;
    });

    // 자원 가용 시간 추적기
    const resourceAvailability = new Map<string, Date>();
    resources.forEach(res => {
        resourceAvailability.set(res.bench_id, new Date(startDate));
    });

    // 2. 각 계약(Order)에 대해 반복
    for (const contract of sortedContracts) {
        const steps = routings[contract.macode];
        if (!steps) {
            console.warn(`라우팅 정보를 찾을 수 없음: ${contract.macode}`);
            continue;
        }

        // 공정 순서(rn)대로 정렬
        const sortedSteps = [...steps].sort((a, b) => a.rn - b.rn);

        let previousStepEndTime = new Date(startDate);
        let previousEventId: string | null = null;

        // 3. 각 라우팅 단계(공정)에 대해 반복
        for (const step of sortedSteps) {
            const resourceId = step.target_site;

            let resourceFreeTime = resourceAvailability.get(resourceId);
            if (!resourceFreeTime) {
                resourceFreeTime = new Date(startDate);
                resourceAvailability.set(resourceId, resourceFreeTime);
            }

            // 4. Forward Scheduling
            const startTime = new Date(Math.max(
                resourceFreeTime.getTime(),
                previousStepEndTime.getTime()
            ));

            const durationHours = step.Contracted_Man_hours;
            const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

            // 납기일 대비 상태 판정
            const dueDate = contract.due_date ? new Date(contract.due_date) : null;
            let status: ScheduleEvent['status'] = 'scheduled';
            if (dueDate && endTime > dueDate) {
                status = 'delayed';
            }

            const eventId = `${contract.contno}-${step.rn}`;
            const event: ScheduleEvent = {
                id: eventId,
                resourceId: resourceId,
                title: step.prname || step.prcode,
                startDate: startTime,
                endDate: endTime,
                duration: durationHours,
                status: status,
                processCode: step.prcode,
                processName: step.prname,
                contractNo: contract.contno,
                sequenceNo: step.rn,
                progress: 0
            };

            events.push(event);

            // 5. 의존성 생성 (이전 공정 → 현재 공정)
            if (previousEventId) {
                dependencies.push({
                    fromEventId: previousEventId,
                    toEventId: eventId,
                    type: 'finish-to-start'
                });
            }

            resourceAvailability.set(resourceId, endTime);
            previousStepEndTime = endTime;
            previousEventId = eventId;
        }
    }

    // 6. 리소스 부하 계산
    const allocations = calculateResourceAllocations(events, resources, startDate, workingHoursPerDay);

    // 7. 타임라인 설정
    const allDates = events.flatMap(e => [e.startDate, e.endDate]);
    const minDate = allDates.length > 0 ? new Date(Math.min(...allDates.map(d => d.getTime()))) : startDate;
    const maxDate = allDates.length > 0 ? new Date(Math.max(...allDates.map(d => d.getTime()))) : new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const config: TimelineConfig = {
        startDate: minDate,
        endDate: maxDate,
        pixelsPerHour: 40,
        showDays: true,
        showHours: true,
        workingHoursPerDay
    };

    return {
        resources,
        events,
        dependencies,
        allocations,
        config
    };
}

function calculateResourceAllocations(
    events: ScheduleEvent[],
    resources: Resource[],
    startDate: Date,
    workingHoursPerDay: number
): ResourceAllocation[] {
    const allocations: ResourceAllocation[] = [];

    // 전체 기간 계산 (일)
    const allEndDates = events.map(e => e.endDate.getTime());
    const endDate = allEndDates.length > 0
        ? new Date(Math.max(...allEndDates))
        : new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalCapacityHours = totalDays * workingHoursPerDay;

    for (const resource of resources) {
        const resourceEvents = events.filter(e => e.resourceId === resource.bench_id);
        const totalAllocatedHours = resourceEvents.reduce((sum, e) => sum + e.duration, 0);
        const capacityHours = resource.daily_capacity
            ? totalDays * resource.daily_capacity
            : totalCapacityHours;

        allocations.push({
            resourceId: resource.bench_id,
            totalAllocatedHours,
            capacityHours,
            utilizationPercent: capacityHours > 0 ? Math.min(100, (totalAllocatedHours / capacityHours) * 100) : 0,
            taskCount: resourceEvents.length
        });
    }

    return allocations;
}

// 유틸리티 함수: 날짜 포맷
export function formatDateForTimeline(date: Date, showTime: boolean = false): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (showTime) {
        const hours = date.getHours().toString().padStart(2, '0');
        return `${month}/${day} ${hours}:00`;
    }
    return `${month}월 ${day}일`;
}

// 유틸리티 함수: 시간 간격 계산
export function getTimeSlots(startDate: Date, endDate: Date, intervalHours: number = 24): Date[] {
    const slots: Date[] = [];
    let current = new Date(startDate);
    while (current <= endDate) {
        slots.push(new Date(current));
        current = new Date(current.getTime() + intervalHours * 60 * 60 * 1000);
    }
    return slots;
}

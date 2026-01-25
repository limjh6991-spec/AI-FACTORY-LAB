import { Contract, RoutingStep, Resource, ScheduleEvent } from './types';

interface SchedulingRequest {
    contracts: Contract[];
    routings: Record<string, RoutingStep[]>; // Key: macode (제품 코드)
    resources: Resource[];
    startDate: Date;
}

export function scheduleProduction(request: SchedulingRequest): ScheduleEvent[] {
    const { contracts, routings, resources, startDate } = request;
    const events: ScheduleEvent[] = [];

    // 1. 계약 정렬: 납기일 기준 오름차순 (납기 임박 순)
    // 납기일이 없으면 먼 미래로 간주하여 후순위 배정
    const sortedContracts = [...contracts].sort((a, b) => {
        const dateA = a.due_date ? new Date(a.due_date).getTime() : Number.MAX_SAFE_INTEGER;
        const dateB = b.due_date ? new Date(b.due_date).getTime() : Number.MAX_SAFE_INTEGER;
        return dateA - dateB;
    });

    // 자원 가용 시간 추적기
    // Map<bench_id, 해당 자원이 작업 가능한 시작 시간>
    const resourceAvailability = new Map<string, Date>();

    // 모든 자원의 시작 시간을 시뮬레이션 시작 시간으로 초기화
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

        // 3. 각 라우팅 단계(공정)에 대해 반복
        for (const step of sortedSteps) {
            const resourceId = step.target_site;

            // 대상 자원의 현재 가용 시간 확인
            let resourceFreeTime = resourceAvailability.get(resourceId);
            if (!resourceFreeTime) {
                // 자원 정보가 맵에 없다면 시작 시간으로 초기화
                resourceFreeTime = new Date(startDate);
                resourceAvailability.set(resourceId, resourceFreeTime);
            }

            // 4. 시작 시간 결정 (Forward Scheduling)
            // 제약 조건: N번째 공정은 N-1번째 공정이 끝나야 시작 가능
            // 시작 시간 = MAX(자원 가용 시간, 이전 공정 종료 시간)
            const startTime = new Date(Math.max(resourceFreeTime.getTime(), previousStepEndTime.getTime()));

            // 종료 시간 계산
            // Contracted_Man_hours를 해당 공정의 소요 시간으로 가정
            const durationHours = step.Contracted_Man_hours;
            const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

            // 이벤트 생성
            const event: ScheduleEvent = {
                id: `${contract.contno}-${step.rn}`,
                resourceId: resourceId,
                title: `${contract.macode} (공정: ${step.prcode})`,
                startDate: startTime,
                endDate: endTime,
                duration: durationHours,
                status: 'scheduled',
                processCode: step.prcode,
                contractNo: contract.contno
            };

            events.push(event);

            // 상태 업데이트: 자원 가용 시간을 이 작업의 종료 시간으로 갱신
            resourceAvailability.set(resourceId, endTime);
            previousStepEndTime = endTime;
        }
    }

    return events;
}

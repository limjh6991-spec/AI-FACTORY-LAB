'use client';

import React, { useMemo } from 'react';
import { Resource, ScheduleEvent } from './types';

interface SchedulerViewProps {
    resources: Resource[];
    events: ScheduleEvent[];
    startDate: Date;
    endDate: Date;
}

// 자원을 사이트별로 그룹화하는 헬퍼 함수
const groupResourcesBySite = (resources: Resource[]) => {
    const groups: Record<string, Resource[]> = {};
    resources.forEach(res => {
        if (!groups[res.site_id]) {
            groups[res.site_id] = [];
        }
        groups[res.site_id].push(res);
    });
    return groups;
};

export function SchedulerView({ resources, events, startDate, endDate }: SchedulerViewProps) {
    const groupedResources = useMemo(() => groupResourcesBySite(resources), [resources]);

    // X축 총 시간 계산
    const totalHours = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    const pixelsPerHour = 40; // 줌 레벨

    const getEventStyle = (event: ScheduleEvent) => {
        const startOffsetHours = (event.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
        const left = startOffsetHours * pixelsPerHour;
        const width = event.duration * pixelsPerHour;

        // contractNo 기반 색상 생성
        const hue = (event.contractNo.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360);

        return {
            left: `${left}px`,
            width: `${width}px`,
            backgroundColor: `hsl(${hue}, 60%, 40%)`,
        };
    };

    return (
        <div className="flex flex-col h-full bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-lg overflow-hidden">
            {/* 헤더 (시간 축) */}
            <div className="flex bg-zinc-950 border-b border-zinc-800">
                <div className="w-48 flex-shrink-0 p-3 border-r border-zinc-800 font-semibold sticky left-0 z-10 bg-zinc-950">
                    자원 / 그룹 (Resources)
                </div>
                <div className="flex-1 overflow-x-auto relative" style={{ height: '50px' }}>
                    {/* 시간 마커 */}
                    <div className="absolute top-0 left-0 h-full flex" style={{ width: `${totalHours * pixelsPerHour}px` }}>
                        {Array.from({ length: totalHours }).map((_, i) => (
                            <div
                                key={i}
                                className="border-r border-zinc-800 text-xs text-zinc-500 pl-1 pt-1"
                                style={{ width: `${pixelsPerHour}px`, flexShrink: 0 }}
                            >
                                {i}시간
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 바디 (Gantt Rows) */}
            <div className="flex-1 overflow-auto bg-zinc-900">
                <div className="min-w-fit">
                    {Object.entries(groupedResources).map(([siteId, siteResources]) => (
                        <div key={siteId}>
                            {/* 사이트 헤더 행 */}
                            <div className="bg-zinc-800/50 px-3 py-1 text-sm font-bold text-zinc-100 sticky left-0 z-10 border-b border-zinc-800">
                                사이트: {siteId}
                            </div>

                            {/* 자원 행 */}
                            {siteResources.map(resource => (
                                <div key={resource.bench_id} className="flex border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors h-16 group">
                                    {/* Y축 레이블 (자원명) */}
                                    <div className="w-48 flex-shrink-0 p-3 flex flex-col justify-center border-r border-zinc-800 sticky left-0 bg-zinc-900 group-hover:bg-zinc-800/30 z-10 text-sm font-medium">
                                        {resource.bench_name}
                                        <span className="text-xs text-zinc-500">{resource.bench_id}</span>
                                    </div>

                                    {/* 타임라인 레인 */}
                                    <div className="relative flex-1" style={{ width: `${totalHours * pixelsPerHour}px` }}>
                                        {/* 그리드 라인 */}
                                        <div className="absolute inset-0 flex pointer-events-none">
                                            {Array.from({ length: totalHours }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="border-r border-zinc-800/50 h-full"
                                                    style={{ width: `${pixelsPerHour}px`, flexShrink: 0 }}
                                                />
                                            ))}
                                        </div>

                                        {/* 이벤트 (작업 바) */}
                                        {events.filter(e => e.resourceId === resource.bench_id).map(event => (
                                            <div
                                                key={event.id}
                                                className="absolute top-2 h-12 rounded-md shadow-md border border-white/10 px-2 py-1 flex flex-col justify-center text-xs overflow-hidden cursor-pointer hover:brightness-110 transition-all z-0"
                                                style={getEventStyle(event)}
                                                title={`${event.title} (${event.duration}시간)`}
                                            >
                                                <span className="font-bold truncate text-white drop-shadow-md">{event.title}</span>
                                                <span className="truncate opacity-80">{event.contractNo}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

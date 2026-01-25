/**
 * 고도화된 스케줄러 뷰 - Bryntum 스타일
 * - 밝은 배경, 파스텔 색상 태스크 바
 * - Manhattan 라우팅 화살표
 * - 2-tier 시간축 (일/시간)
 * - 설비 부하 게이지
 */
'use client';

import React, { useMemo, useState, useRef } from 'react';
import {
    Resource,
    ScheduleEvent,
    Dependency,
    ResourceAllocation,
    TimelineConfig
} from './types';
import { formatDateForTimeline, getTimeSlots } from './schedulerEngine';

interface SchedulerViewProps {
    resources: Resource[];
    events: ScheduleEvent[];
    dependencies: Dependency[];
    allocations: ResourceAllocation[];
    config: TimelineConfig;
}

// 자원을 사이트별로 그룹화
const groupResourcesBySite = (resources: Resource[]) => {
    const groups: Record<string, Resource[]> = {};
    resources.forEach(res => {
        const key = res.site_id || 'default';
        if (!groups[key]) groups[key] = [];
        groups[key].push(res);
    });
    return groups;
};

// Bryntum 스타일 파스텔 색상 팔레트
const pastelColors = [
    { bg: '#D1EAF5', border: '#A3D1E5', text: '#2B6B85' },  // Light Blue
    { bg: '#F5E8D1', border: '#E5D1A3', text: '#856B2B' },  // Light Beige
    { bg: '#D1F5E8', border: '#A3E5D1', text: '#2B856B' },  // Light Green
    { bg: '#F5D1EA', border: '#E5A3D1', text: '#852B6B' },  // Light Pink
    { bg: '#EAD1F5', border: '#D1A3E5', text: '#6B2B85' },  // Light Purple
    { bg: '#F5F5D1', border: '#E5E5A3', text: '#6B6B2B' },  // Light Yellow
    { bg: '#D1E5F5', border: '#A3C5E5', text: '#2B5585' },  // Sky Blue
    { bg: '#F5DDD1', border: '#E5BDA3', text: '#854B2B' },  // Peach
];

// 상태별 색상 (Bryntum 스타일)
const statusStyles: Record<string, { bg: string; border: string; text: string }> = {
    'scheduled': { bg: '#D1EAF5', border: '#A3D1E5', text: '#2B6B85' },
    'in-progress': { bg: '#D1F5E8', border: '#A3E5D1', text: '#2B856B' },
    'completed': { bg: '#E8E8E8', border: '#C8C8C8', text: '#555555' },
    'delayed': { bg: '#F5D1D1', border: '#E5A3A3', text: '#852B2B' },
};

export function SchedulerView({
    resources,
    events,
    dependencies,
    allocations,
    config
}: SchedulerViewProps) {
    const [zoom, setZoom] = useState(config.pixelsPerHour || 40);
    const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    const groupedResources = useMemo(() => groupResourcesBySite(resources), [resources]);

    // 시간 계산
    const totalHours = Math.ceil(
        (config.endDate.getTime() - config.startDate.getTime()) / (1000 * 60 * 60)
    );
    const daySlots = getTimeSlots(config.startDate, config.endDate, 24);

    // 리소스 인덱스 맵 (Y 위치 계산용)
    const resourceIndexMap = useMemo(() => {
        const map = new Map<string, number>();
        let index = 0;
        Object.entries(groupedResources).forEach(([_, siteResources]) => {
            index++; // 사이트 헤더
            siteResources.forEach(res => {
                map.set(res.bench_id, index);
                index++;
            });
        });
        return map;
    }, [groupedResources]);

    const ROW_HEIGHT = 48;
    const HEADER_HEIGHT = 64;

    // 이벤트 위치 계산
    const getEventPosition = (event: ScheduleEvent) => {
        const startOffset = (event.startDate.getTime() - config.startDate.getTime()) / (1000 * 60 * 60);
        const left = startOffset * zoom;
        const width = event.duration * zoom;
        const resourceIndex = resourceIndexMap.get(event.resourceId) || 0;
        const top = HEADER_HEIGHT + resourceIndex * ROW_HEIGHT + 6;
        return { left, width, top };
    };

    // 프로세스별 색상 할당
    const getEventColor = (event: ScheduleEvent) => {
        // 상태가 있으면 상태 색상 우선
        if (event.status === 'delayed') return statusStyles.delayed;
        if (event.status === 'completed') return statusStyles.completed;

        // 공정 코드 기반 색상 할당 (일관성 유지)
        const hash = event.processCode?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
        return pastelColors[hash % pastelColors.length];
    };

    // 할당률 색상
    const getAllocationColor = (percent: number) => {
        if (percent >= 90) return '#E57373';  // Red
        if (percent >= 70) return '#FFB74D';  // Orange
        if (percent >= 50) return '#64B5F6';  // Blue
        return '#81C784';  // Green
    };

    // Manhattan 라우팅 의존성 화살표 (직각 연결)
    const getManhattanPath = (dep: Dependency): string | null => {
        const fromEvent = events.find(e => e.id === dep.fromEventId);
        const toEvent = events.find(e => e.id === dep.toEventId);
        if (!fromEvent || !toEvent) return null;

        const fromPos = getEventPosition(fromEvent);
        const toPos = getEventPosition(toEvent);

        const x1 = fromPos.left + fromPos.width;
        const y1 = fromPos.top + 18;
        const x2 = toPos.left;
        const y2 = toPos.top + 18;

        // Manhattan 라우팅: 수평 → 수직 → 수평
        const midX = x1 + 10;  // 출발점에서 약간 오프셋

        if (Math.abs(y1 - y2) < 5) {
            // 같은 행이면 직선
            return `M ${x1} ${y1} L ${x2} ${y2}`;
        }

        // 직각 경로
        return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
    };

    return (
        <div className="flex flex-col h-full bg-white text-gray-800 rounded-xl overflow-hidden border border-gray-200 shadow-lg">
            {/* 툴바 - Bryntum 스타일 블루 헤더 */}
            <div className="flex items-center justify-between px-4 py-3" style={{ background: '#007AD9' }}>
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-white">생산 스케줄러</h2>
                    <span className="text-xs px-2 py-1 bg-white/20 text-white rounded-full">
                        {events.length} 작업
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-white/80">줌:</span>
                    <button
                        onClick={() => setZoom(z => Math.max(20, z - 10))}
                        className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
                    >
                        −
                    </button>
                    <span className="text-sm w-12 text-center text-white">{zoom}px</span>
                    <button
                        onClick={() => setZoom(z => Math.min(100, z + 10))}
                        className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* 좌측: 리소스 패널 */}
                <div className="w-56 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-y-auto">
                    {/* 리소스 헤더 */}
                    <div
                        className="flex items-end px-3 pb-2 border-b border-gray-200 bg-gray-100 sticky top-0 z-20"
                        style={{ height: `${HEADER_HEIGHT}px` }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-700">리소스</span>
                            <span className="text-xs text-gray-500">부하</span>
                        </div>
                    </div>

                    {/* 리소스 목록 */}
                    {Object.entries(groupedResources).map(([siteId, siteResources]) => (
                        <div key={siteId}>
                            {/* 사이트 헤더 (그룹) */}
                            <div
                                className="flex items-center px-3 bg-gray-200/70 border-b border-gray-200"
                                style={{ height: `${ROW_HEIGHT}px` }}
                            >
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                                    <span>▼</span> {siteId}
                                </span>
                            </div>

                            {/* 리소스 행 */}
                            {siteResources.map((resource, idx) => {
                                const allocation = allocations.find(a => a.resourceId === resource.bench_id);
                                const utilization = allocation?.utilizationPercent || 0;

                                return (
                                    <div
                                        key={resource.bench_id}
                                        className={`flex items-center px-3 border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                            }`}
                                        style={{ height: `${ROW_HEIGHT}px` }}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-gray-800 truncate">
                                                {resource.bench_name}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                {/* 부하 게이지 */}
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full transition-all rounded-full"
                                                        style={{
                                                            width: `${Math.min(100, utilization)}%`,
                                                            backgroundColor: getAllocationColor(utilization)
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-500 w-10">
                                                    {utilization.toFixed(0)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* 우측: 타임라인 */}
                <div className="flex-1 overflow-auto relative bg-white" ref={timelineRef}>
                    {/* 시간축 헤더 */}
                    <div className="sticky top-0 z-10 bg-gray-100 border-b border-gray-300">
                        {/* 일 단위 - Bryntum 스타일 베이지 */}
                        <div className="flex" style={{ width: `${totalHours * zoom}px` }}>
                            {daySlots.map((day, i) => (
                                <div
                                    key={i}
                                    className="border-r border-gray-300 text-sm font-medium text-gray-700 px-2 py-2 text-center"
                                    style={{
                                        width: `${24 * zoom}px`,
                                        minWidth: `${24 * zoom}px`,
                                        backgroundColor: '#F5EAD8'
                                    }}
                                >
                                    {formatDateForTimeline(day)}
                                </div>
                            ))}
                        </div>
                        {/* 시간 단위 */}
                        <div className="flex border-t border-gray-200" style={{ width: `${totalHours * zoom}px` }}>
                            {Array.from({ length: totalHours }).map((_, i) => (
                                <div
                                    key={i}
                                    className="border-r border-gray-100 text-xs text-gray-400 px-1 py-1 text-center"
                                    style={{
                                        width: `${zoom}px`,
                                        minWidth: `${zoom}px`,
                                        backgroundColor: i % 24 === 0 ? '#F5F5F5' : 'white'
                                    }}
                                >
                                    {zoom >= 30 ? (i % 24 < 10 ? `0${i % 24}` : `${i % 24}`) : (i % 24 === 0 ? '00' : '')}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 간트 영역 */}
                    <div
                        className="relative"
                        style={{
                            width: `${totalHours * zoom}px`,
                            minHeight: `${(resources.length + Object.keys(groupedResources).length) * ROW_HEIGHT}px`
                        }}
                    >
                        {/* 그리드 라인 */}
                        <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: totalHours }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute top-0 bottom-0 border-r"
                                    style={{
                                        left: `${i * zoom}px`,
                                        borderColor: i % 24 === 0 ? '#D0D0D0' : '#ECECEC'
                                    }}
                                />
                            ))}
                        </div>

                        {/* 행 배경 (교차 색상) */}
                        {Object.entries(groupedResources).map(([siteId, siteResources]) => {
                            const siteStartIndex = resourceIndexMap.get(siteResources[0]?.bench_id) || 0;
                            return (
                                <React.Fragment key={siteId}>
                                    {/* 사이트 헤더 행 */}
                                    <div
                                        className="absolute left-0 right-0 border-b border-gray-200"
                                        style={{
                                            top: `${(siteStartIndex - 1) * ROW_HEIGHT}px`,
                                            height: `${ROW_HEIGHT}px`,
                                            backgroundColor: '#F0F0F0'
                                        }}
                                    />
                                    {/* 리소스 행 */}
                                    {siteResources.map((resource, i) => (
                                        <div
                                            key={resource.bench_id}
                                            className="absolute left-0 right-0 border-b border-gray-100"
                                            style={{
                                                top: `${(siteStartIndex + i) * ROW_HEIGHT}px`,
                                                height: `${ROW_HEIGHT}px`,
                                                backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'
                                            }}
                                        />
                                    ))}
                                </React.Fragment>
                            );
                        })}

                        {/* 의존성 화살표 (Manhattan 라우팅) */}
                        <svg
                            className="absolute inset-0 pointer-events-none"
                            style={{ width: `${totalHours * zoom}px`, height: '100%' }}
                        >
                            <defs>
                                <marker
                                    id="arrowhead-bryntum"
                                    markerWidth="8"
                                    markerHeight="6"
                                    refX="7"
                                    refY="3"
                                    orient="auto"
                                >
                                    <polygon
                                        points="0 0, 8 3, 0 6"
                                        fill="#666666"
                                    />
                                </marker>
                            </defs>
                            {dependencies.map((dep, i) => {
                                const path = getManhattanPath(dep);
                                if (!path) return null;
                                const isHighlighted = hoveredEvent === dep.fromEventId || hoveredEvent === dep.toEventId;
                                return (
                                    <path
                                        key={i}
                                        d={path}
                                        fill="none"
                                        stroke={isHighlighted ? "#333333" : "#888888"}
                                        strokeWidth={isHighlighted ? 2 : 1}
                                        markerEnd="url(#arrowhead-bryntum)"
                                        className="transition-all"
                                    />
                                );
                            })}
                        </svg>

                        {/* 이벤트 바 - Bryntum 파스텔 스타일 */}
                        {events.map(event => {
                            const pos = getEventPosition(event);
                            const colors = getEventColor(event);
                            const isHovered = hoveredEvent === event.id;

                            return (
                                <div
                                    key={event.id}
                                    className={`absolute flex flex-col justify-center px-2 cursor-pointer transition-all overflow-hidden
                                        ${isHovered ? 'shadow-lg z-20' : 'shadow z-10'}`}
                                    style={{
                                        left: `${pos.left}px`,
                                        top: `${pos.top}px`,
                                        width: `${Math.max(pos.width, 50)}px`,
                                        height: '36px',
                                        backgroundColor: colors.bg,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: '6px',
                                        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                                    }}
                                    onMouseEnter={() => setHoveredEvent(event.id)}
                                    onMouseLeave={() => setHoveredEvent(null)}
                                    title={`${event.title}\n계약: ${event.contractNo}\n소요: ${event.duration}시간\n상태: ${event.status}`}
                                >
                                    <div
                                        className="text-xs font-bold truncate"
                                        style={{ color: colors.text }}
                                    >
                                        {event.processName || event.title}
                                    </div>
                                    <div
                                        className="text-xs truncate opacity-70"
                                        style={{ color: colors.text }}
                                    >
                                        {event.contractNo}, {event.duration}h
                                    </div>
                                    {/* 진행률 바 */}
                                    {event.progress !== undefined && event.progress > 0 && (
                                        <div
                                            className="absolute bottom-0 left-0 h-1 rounded-b"
                                            style={{
                                                width: `${event.progress}%`,
                                                backgroundColor: colors.border
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 범례 - Bryntum 스타일 */}
            <div className="flex items-center gap-6 px-4 py-2 bg-gray-100 border-t border-gray-200 text-xs">
                <span className="text-gray-600 font-medium">상태:</span>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: statusStyles.scheduled.bg, border: `1px solid ${statusStyles.scheduled.border}` }} />
                    <span className="text-gray-600">예정</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: statusStyles['in-progress'].bg, border: `1px solid ${statusStyles['in-progress'].border}` }} />
                    <span className="text-gray-600">진행중</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: statusStyles.completed.bg, border: `1px solid ${statusStyles.completed.border}` }} />
                    <span className="text-gray-600">완료</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: statusStyles.delayed.bg, border: `1px solid ${statusStyles.delayed.border}` }} />
                    <span className="text-gray-600">지연</span>
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    LayoutGrid,
    Calendar,
    Factory,
    Clock,
    ChevronDown,
    ChevronRight,
    Search
} from 'lucide-react';
import { addDays, format, isWeekend, startOfToday } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DetailProcessItem {
    contno: string;
    macode: string;
    maname: string;
    prcode: string;
    prname: string;
    prname_detail: string;
    working_day: number;
    detail_seq: number;
    progress?: number;
    status?: 'PLANNED' | 'IN_PROGRESS' | 'DELAYED' | 'COMPLETED';
}

interface ProcessGroup {
    prcode: string;
    prname: string;
    items: ScheduledItem[];
}

interface ProductGroup {
    macode: string;
    maname: string;
    processes: ProcessGroup[];
    totalDays: number;
    expanded: boolean;
}

interface ScheduledItem extends DetailProcessItem {
    startIdx: number;
    endIdx: number;
    duration: number;
}

export default function ContractDetailPage() {
    const params = useParams();
    const router = useRouter();
    const contno = params.contno as string;

    const [data, setData] = useState<DetailProcessItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<Date>(startOfToday());
    const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (contno) {
            fetch(`/api/simulation/contracts/${contno}/full-detail`)
                .then(res => res.json())
                .then(items => {
                    setData(items);
                    // Default expand all
                    const allMacodes = new Set(items.map((i: any) => i.macode));
                    setExpandedProducts(allMacodes as Set<string>);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [contno]);

    const toggleProduct = (macode: string) => {
        const newSet = new Set(expandedProducts);
        if (newSet.has(macode)) {
            newSet.delete(macode);
        } else {
            newSet.add(macode);
        }
        setExpandedProducts(newSet);
    };

    // --- Helper: Date Calculation (Including Weekends now) ---
    const dateRange = useMemo(() => {
        const dates: Date[] = [];
        let current = startDate;
        // Generate for approx 60 days
        for (let i = 0; i < 60; i++) {
            dates.push(current);
            current = addDays(current, 1);
        }
        return dates;
    }, [startDate]);

    // Group and Schedule Data
    const scheduledGroups = useMemo(() => {
        // 1. Group by Macode
        const byMacode: Record<string, DetailProcessItem[]> = {};
        data.forEach(item => {
            if (!byMacode[item.macode]) byMacode[item.macode] = [];
            byMacode[item.macode].push(item);
        });

        return Object.entries(byMacode).map(([macode, items]) => {
            // 2. Schedule sequentially for simplicity (or use API dates if available)
            // Currently using simple sequential stacking
            let currentDayIndex = 0; // 0-based index from startDate

            // Map items to scheduled items
            const scheduledItems = items.map(item => {
                // Determine duration
                const duration = item.working_day > 0 ? item.working_day : 1;

                // Calculate start/end based on NON-WEEKEND logic for actual work?
                // The prompt says "Show Weekends...". 
                // Usually schedules skip weekends for work but timeline shows them.
                // Let's increment currentDayIndex by duration, skipping weekends logically if needed?
                // For "Plan", simple days is easier. Let's assume duration includes rest if we just add dates.
                // BUT, typically 'working_day' means actual work days.
                // Let's implement a "find end date skipping weekends" helper if we wanted perfection.
                // For now, to match Visual Request -> Just show weekends.
                // We will map "1 working day" to "1 calendar day" but visually highlight weekends.
                // If the user wants strict logic, we'd jump over weekends. 
                // Let's assume strict logic: 5 working days might take 7 calendar days.

                let workDaysRemaining = duration;
                let sIdx = currentDayIndex;
                let eIdx = sIdx;

                // Simple run: just consume timeline slots. 
                // If we land on a weekend, do we work? Usually no.
                // Let's assume we skip weekends for WORK placement.

                // Find Start (skip if starting on weekend?) -> assume can start anytime or Mon?
                // Let's just stack continuously for now to keep it simple and visual.

                const start = currentDayIndex;
                const end = start + duration;
                currentDayIndex = end;

                return {
                    ...item,
                    startIdx: start,
                    endIdx: end,
                    duration: duration
                } as ScheduledItem;
            });

            // 3. Group by Process (prcode) for Hierarchy
            const processGroups: Record<string, ScheduledItem[]> = {};
            const processOrder: string[] = []; // to keep order

            scheduledItems.forEach(item => {
                if (!processGroups[item.prcode]) {
                    processGroups[item.prcode] = [];
                    processOrder.push(item.prcode);
                }
                processGroups[item.prcode].push(item);
            });

            const processes = processOrder.map(prcode => ({
                prcode,
                prname: processGroups[prcode][0].prname,
                items: processGroups[prcode]
            }));

            return {
                macode,
                maname: items[0]?.maname || macode,
                processes,
                totalDays: currentDayIndex,
                expanded: false // managed by state
            };
        });
    }, [data]);

    const CELL_WIDTH = 40; // px
    const LEFT_PANEL_WIDTH = 450; // px

    return (
        <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
            {/* 1. Fixed Header */}
            <div className="flex-none bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-30">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <Factory className="text-blue-600" size={20} />
                            {contno}
                            <span className="text-slate-400 font-normal text-sm">| 상세 생산계획 (Visual 2.0)</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                        <Calendar size={16} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">시작일:</span>
                        <input
                            type="date"
                            value={format(startDate, 'yyyy-MM-dd')}
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                            className="bg-transparent border-none text-sm focus:ring-0 cursor-pointer text-slate-800"
                        />
                    </div>
                </div>
            </div>

            {/* 2. Scrollable Content Area */}
            {/* Using flex-1 and overflow-hidden on parent, and overflow-auto here to create a scroll container */}
            <div className="flex-1 overflow-auto relative">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="min-w-max"> {/* Ensure container grows to fit content width */}
                        {/* A. Gantt Header (Sticky Top) */}
                        <div className="sticky top-0 z-20 flex bg-white border-b border-slate-200 shadow-sm">
                            {/* Sticky Left Corner */}
                            <div
                                className="sticky left-0 z-30 flex-shrink-0 bg-white border-r border-slate-200"
                                style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                            >
                                <div className="flex h-full text-xs font-bold text-slate-500 bg-slate-50">
                                    <div className="flex-1 p-3 flex items-center border-r border-slate-200">
                                        제품 / 공정 (Hierarchy)
                                    </div>
                                    <div className="w-[100px] p-3 flex items-center justify-center">
                                        정보
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Headers */}
                            <div className="flex">
                                {dateRange.map((date, idx) => {
                                    const isWknd = isWeekend(date);
                                    return (
                                        <div
                                            key={idx}
                                            className={`flex-shrink-0 border-r border-slate-100 flex flex-col items-center justify-center py-2 ${isWknd ? 'bg-amber-50/70 text-amber-700' : 'bg-white'
                                                }`}
                                            style={{ width: `${CELL_WIDTH}px` }}
                                        >
                                            <span className="text-[10px] opacity-70">{format(date, 'M/d')}</span>
                                            <span className="text-xs font-bold">{format(date, 'EEE', { locale: ko })}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* B. Gantt Body */}
                        <div className="relative">
                            {/* Grid Background Layer */}
                            <div className="absolute inset-0 flex pointer-events-none z-0 pl-[450px]">
                                {dateRange.map((date, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex-shrink-0 border-r border-slate-100 h-full ${isWeekend(date) ? 'bg-amber-50/30' : ''
                                            }`}
                                        style={{ width: `${CELL_WIDTH}px` }}
                                    />
                                ))}
                            </div>

                            {/* Data Rows */}
                            {scheduledGroups.map((group) => {
                                const isExpanded = expandedProducts.has(group.macode);

                                return (
                                    <div key={group.macode} className="group/product bg-white border-b border-slate-100 last:border-0 relative z-10">
                                        {/* 1. Main Product Row */}
                                        <div className="flex hover:bg-slate-50 transition-colors">
                                            {/* Left Panel (Sticky) */}
                                            <div
                                                className="sticky left-0 z-10 flex-shrink-0 flex border-r border-slate-200 bg-white" // Keep white background to cover scroll
                                                style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                                                onClick={() => toggleProduct(group.macode)}
                                            >
                                                <div className="flex-1 p-3 flex items-center gap-2 cursor-pointer select-none">
                                                    {isExpanded ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-1.5 rounded">{group.maname}</span>
                                                            <span className="text-sm font-bold text-slate-800">{group.macode}</span>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 mt-0.5">
                                                            Tracks {group.processes.length} processes
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="w-[100px] border-l border-slate-100 p-3 flex flex-col justify-center items-end text-xs text-slate-500 bg-slate-50/30">
                                                    <span>Total {group.totalDays}d</span>
                                                </div>
                                            </div>

                                            {/* Chart Area */}
                                            <div className="flex-1 relative h-[60px]">
                                                {/* Summary Bar */}
                                                {!isExpanded && (
                                                    <div
                                                        className="absolute top-4 h-6 bg-blue-500 rounded-md shadow-sm opacity-80 flex items-center px-2"
                                                        style={{
                                                            left: `${group.processes[0]?.items[0]?.startIdx * CELL_WIDTH}px`,
                                                            width: `${group.totalDays * CELL_WIDTH}px`
                                                        }}
                                                    >
                                                        <span className="text-[10px] text-white font-medium truncate w-full">
                                                            Summary ({group.totalDays} days)
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 2. Expanded Detail Rows */}
                                        {isExpanded && group.processes.map((proc, pIdx) => (
                                            <div key={proc.prcode} className="flex border-t border-slate-100/50 hover:bg-slate-50/50">
                                                {/* Left Panel (Sticky) - Hierarchy Level 2 */}
                                                <div
                                                    className="sticky left-0 z-10 flex-shrink-0 flex border-r border-slate-200 bg-slate-50/10 backdrop-blur-[1px]" // Slightly distinct bg
                                                    style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                                                >
                                                    <div className="w-[40px]"></div> {/* Indent */}
                                                    <div className="flex-1 p-2 pl-4 flex items-center border-l-2 border-slate-200">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-semibold text-slate-700">{proc.prname}</span>
                                                            <span className="text-[10px] text-slate-400 font-mono">{proc.prcode}</span>
                                                        </div>
                                                    </div>
                                                    {/* Optional Stats for Process */}
                                                    <div className="w-[100px] border-l border-slate-100 p-2 flex items-center justify-end text-[10px] text-slate-400">
                                                        {proc.items.length} steps
                                                    </div>
                                                </div>

                                                {/* Chart Area - Detail Bars */}
                                                <div className="flex-1 relative h-[44px]">
                                                    {proc.items.map((item, idx) => {
                                                        // Inline Style for Status
                                                        let bgColor = '#94a3b8'; // slate-400 (Planned)
                                                        let borderColor = 'transparent';
                                                        let borderWidth = '0px';

                                                        if (item.status === 'COMPLETED') {
                                                            bgColor = '#10b981'; // emerald-500
                                                        } else if (item.status === 'DELAYED') {
                                                            bgColor = '#f43f5e'; // rose-500
                                                            borderColor = '#e11d48'; // rose-600
                                                            borderWidth = '1px';
                                                        } else if (item.status === 'IN_PROGRESS') {
                                                            bgColor = '#3b82f6'; // blue-500
                                                        }

                                                        const progress = item.progress || 0;

                                                        return (
                                                            <div
                                                                key={`${item.prcode}_${item.detail_seq}_${idx}`}
                                                                className="absolute top-2 bottom-2 rounded-[3px] shadow-sm flex flex-col justify-center text-white text-[9px] overflow-hidden group/bar cursor-help"
                                                                style={{
                                                                    left: `${item.startIdx * CELL_WIDTH}px`,
                                                                    width: `${Math.max(item.duration, 0.5) * CELL_WIDTH - 2}px`, // -2 for slight gap
                                                                    backgroundColor: bgColor,
                                                                    border: `${borderWidth} solid ${borderColor}`,
                                                                    opacity: 0.9
                                                                }}
                                                            >
                                                                {/* Tooltip (Hover) */}
                                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/bar:block w-48 bg-slate-800 text-white text-xs rounded p-2 z-50 pointer-events-none shadow-xl">
                                                                    <div className="font-bold border-b border-slate-600 pb-1 mb-1">{item.prname} &gt; {item.prname_detail}</div>
                                                                    <div className="flex justify-between"><span>Status:</span> <span className="font-medium">{item.status}</span></div>
                                                                    <div className="flex justify-between"><span>Progress:</span> <span className="font-medium">{progress}%</span></div>
                                                                    <div className="flex justify-between"><span>Duration:</span> <span>{item.duration} days</span></div>
                                                                </div>

                                                                {/* Progress Fill */}
                                                                <div
                                                                    className="absolute top-0 left-0 bottom-0 bg-black/10 transition-all duration-500"
                                                                    style={{ width: `${progress}%` }}
                                                                />

                                                                {/* Label */}
                                                                <div className="relative z-10 px-1.5 flex items-center justify-between w-full mix-blend-plus-lighter">
                                                                    <span className="truncate font-medium">{item.prname_detail}</span>
                                                                    {progress > 0 && <span className="text-[8px] opacity-90 hidden sm:inline-block">{progress}%</span>}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

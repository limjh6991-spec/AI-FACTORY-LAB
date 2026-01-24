
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
    LayoutGrid,
    Calendar,
    Settings,
    Filter,
    ChevronDown,
    ChevronRight,
    Search
} from 'lucide-react';
import { addDays, format, isWeekend, startOfToday, startOfMonth, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ResourceItem {
    eqp_id: string;
    eqp_name: string;
    contno: string;
    macode: string;
    maname: string;
    prcode: string;
    prname: string;
    prname_detail: string;
    working_day: number;
    status?: 'PLANNED' | 'IN_PROGRESS' | 'DELAYED' | 'COMPLETED';
    progress?: number;
}

interface ResourceRow {
    id: string;
    name: string;
    items: ResourceItem[];
    // Utilization metrics
    totalDays: number;
    capacityDays: number;
    utilizationPct: number;
}

interface ResourceGroup {
    id: string;
    name: string;
    rows: ResourceRow[];
    // Aggregated metrics
    avgUtilizationPct: number;
}

export default function ResourceSchedulerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ResourceItem[]>([]);
    const [startDate, setStartDate] = useState<Date>(startOfToday());

    // Collapsed state logic
    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (groupId: string) => {
        setCollapsedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
    };

    // Fetch Data
    useEffect(() => {
        setLoading(true);
        fetch('/api/simulation/resources/schedule')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // 1. Group by Equipment Category (Tree Structure)
    const groupedData = useMemo(() => {
        // Step 1: Group tasks by unique Equipment ID
        const equipmentMap: Record<string, ResourceRow> = {};
        const VIEW_DAYS = 30; // Current view capacity

        data.forEach(item => {
            if (!item.eqp_id) return;
            const eid = item.eqp_id.trim();
            if (!equipmentMap[eid]) {
                equipmentMap[eid] = {
                    id: eid,
                    name: item.eqp_name?.trim() || eid,
                    items: [],
                    totalDays: 0,
                    capacityDays: VIEW_DAYS,
                    utilizationPct: 0
                };
            }
            equipmentMap[eid].items.push(item);
            equipmentMap[eid].totalDays += (item.working_day || 0);
        });

        // Calculate Utilization for each machine
        Object.values(equipmentMap).forEach(eqp => {
            eqp.utilizationPct = Math.round((eqp.totalDays / eqp.capacityDays) * 100);
        });

        // Step 2: Group Equipments into Categories
        const groups: Record<string, ResourceGroup> = {};

        Object.values(equipmentMap).forEach(eqp => {
            // Heuristic: Extract group name from equipment name
            // e.g., "F/W(룸5) 10호기" -> "F/W(룸5)"
            // e.g., "벤치3 A/C 3호기" -> "벤치3 A/C"
            let groupName = eqp.name.replace(/\s*\d+호기.*$/, '').trim();
            if (!groupName) groupName = "기타 (Others)";

            if (!groups[groupName]) {
                groups[groupName] = {
                    id: groupName,
                    name: groupName,
                    rows: [],
                    avgUtilizationPct: 0
                };
            }
            groups[groupName].rows.push(eqp);
        });

        // Step 3: Sort Groups and Calculate Group Average
        return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name)).map(g => {
            const totalUtil = g.rows.reduce((sum, r) => sum + r.utilizationPct, 0);
            return {
                ...g,
                rows: g.rows.sort((a, b) => a.name.localeCompare(b.name)),
                avgUtilizationPct: g.rows.length > 0 ? Math.round(totalUtil / g.rows.length) : 0
            };
        });
    }, [data]);

    // 2. Timeline Generator
    const dates = useMemo(() => {
        const d = [];
        let curr = startDate;
        for (let i = 0; i < 30; i++) { // 30 days view
            d.push(curr);
            curr = addDays(curr, 1);
        }
        return d;
    }, [startDate]);

    const CELL_WIDTH = 40;
    const LEFT_PANEL_WIDTH = 280; // Increased for utilization bar

    // Helper: Render Utilization Bar
    const renderUtilization = (pct: number) => {
        let color = 'bg-emerald-500';
        if (pct > 80) color = 'bg-amber-500';
        if (pct > 100) color = 'bg-rose-500';

        return (
            <div className="flex items-center gap-2 mt-1 w-full max-w-[120px]">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                </div>
                <span className={`text-[10px] w-8 text-right font-medium ${pct > 100 ? 'text-rose-600' : 'text-slate-500'}`}>
                    {pct}%
                </span>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Header */}
            <div className="flex-none bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-30">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <LayoutGrid className="text-purple-600" size={24} />
                        설비 중심 스케줄러 (Resource Scheduler)
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                        <Calendar size={16} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">Start:</span>
                        <input
                            type="date"
                            value={format(startDate, 'yyyy-MM-dd')}
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                            className="bg-transparent border-none text-sm focus:ring-0 cursor-pointer text-slate-800"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto relative">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="min-w-max">
                        {/* Sticky Header */}
                        <div className="sticky top-0 z-20 flex bg-white border-b border-slate-200 shadow-sm">
                            <div
                                className="sticky left-0 z-30 flex-shrink-0 bg-slate-50 border-r border-slate-200 p-3 font-bold text-slate-500 flex items-center justify-center"
                                style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                            >
                                Equipment & Load (부하)
                            </div>
                            <div className="flex">
                                {dates.map((date, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex-shrink-0 border-r border-slate-100 flex flex-col items-center justify-center py-2 ${isWeekend(date) ? 'bg-amber-50 text-amber-600' : 'bg-white'
                                            }`}
                                        style={{ width: `${CELL_WIDTH}px` }}
                                    >
                                        <span className="text-[10px] opacity-70">{format(date, 'M/d')}</span>
                                        <span className="text-xs font-bold">{format(date, 'EEE', { locale: ko })}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="relative">
                            {/* Grid BG */}
                            <div className="absolute inset-0 flex pointer-events-none z-0 pl-[250px]">
                                {dates.map((date, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex-shrink-0 border-r border-slate-100 h-full ${isWeekend(date) ? 'bg-amber-50/30' : ''
                                            }`}
                                        style={{ width: `${CELL_WIDTH}px` }}
                                    />
                                ))}
                            </div>

                            {groupedData.map((group) => (
                                <React.Fragment key={group.id}>
                                    {/* Group Header Row */}
                                    <div
                                        className="sticky left-0 right-0 z-10 flex border-b border-slate-200 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                        onClick={() => toggleGroup(group.id)}
                                    >
                                        <div
                                            className="sticky left-0 z-20 flex-shrink-0 border-r border-slate-200 bg-slate-100 px-4 py-2 font-bold text-slate-700 flex flex-col justify-center"
                                            style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                                        >
                                            <div className="flex items-center gap-2">
                                                {collapsedGroups[group.id] ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                                                <span className="truncate">{group.name}</span>
                                                <span className="text-xs font-normal text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded-full">{group.rows.length}</span>
                                            </div>
                                            {renderUtilization(group.avgUtilizationPct)}
                                        </div>
                                        {/* Optional: Summary Bar Area */}
                                        <div className="flex-1 bg-slate-50/50"></div>
                                    </div>

                                    {/* Equipment Rows */}
                                    {!collapsedGroups[group.id] && group.rows.map((row) => (
                                        <div key={row.id} className="flex border-b border-slate-200 bg-white relative z-10 hover:bg-slate-50 transition-colors h-[64px]">
                                            {/* Left Panel */}
                                            <div
                                                className="sticky left-0 z-20 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col justify-center px-4 pl-8 text-sm text-slate-600"
                                                style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                                            >
                                                <div className="flex flex-col truncate">
                                                    <span className="font-medium truncate" title={row.name}>{row.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-mono font-normal">{row.id}</span>
                                                </div>
                                                {renderUtilization(row.utilizationPct)}
                                            </div>

                                            {/* Lane */}
                                            <div className="flex-1 relative">
                                                {row.items.map((item, idx) => {
                                                    // This simplistic positioning works for mockup but in real app use absolute date diff
                                                    // assuming items are working days offset from startDate roughly
                                                    // In real app: daysDiff(item.start_date, startDate)

                                                    // Fallback visualization logic as per previous implementation
                                                    // We really need real dates here. 
                                                    // Assuming detailed data has some sort of time info or we just stack them for now

                                                    const startIdx = idx * 2; // Temporary mock spread
                                                    const duration = Math.max(item.working_day || 1, 1);

                                                    let bgColor = 'bg-slate-400';
                                                    if (item.status === 'COMPLETED') bgColor = 'bg-emerald-500';
                                                    if (item.status === 'DELAYED') bgColor = 'bg-rose-500';
                                                    if (item.status === 'IN_PROGRESS') bgColor = 'bg-blue-500';

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`absolute top-2 bottom-2 rounded px-2 flex flex-col justify-center text-white text-[10px] shadow-sm select-none hover:brightness-110 cursor-pointer overflow-hidden ${bgColor}`}
                                                            style={{
                                                                left: `${startIdx * CELL_WIDTH}px`,
                                                                width: `${duration * CELL_WIDTH}px`
                                                            }}
                                                            title={`${item.prname} - ${item.maname}`}
                                                        >
                                                            <div className="font-bold truncate">{item.contno}</div>
                                                            <div className="truncate opacity-90">{item.prname_detail}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

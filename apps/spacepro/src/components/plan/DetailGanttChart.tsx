'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
    Calendar,
    ChevronDown,
    ChevronRight,
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
    wbs_vid?: string;
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

interface ProductNode {
    macode: string;
    maname: string;
    wbs_vid?: string;
    level: number;
    parentMacode?: string;
    processes: ProcessGroup[];
    totalDays: number;
    children: ProductNode[];
}

interface ScheduledItem extends DetailProcessItem {
    startIdx: number;
    endIdx: number;
    duration: number;
}

interface DetailGanttChartProps {
    contno: string;
    className?: string;
}

export function DetailGanttChart({ contno, className = '' }: DetailGanttChartProps) {
    const [data, setData] = useState<DetailProcessItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<Date>(startOfToday());
    const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (contno) {
            setLoading(true);
            fetch(`/api/simulation/contracts/${contno}/full-detail`)
                .then(res => res.json())
                .then(items => {
                    setData(items);
                    // Default: all collapsed (empty Set)
                    setExpandedProducts(new Set());
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

    const dateRange = useMemo(() => {
        const dates: Date[] = [];
        let current = startDate;
        for (let i = 0; i < 60; i++) {
            dates.push(current);
            current = addDays(current, 1);
        }
        return dates;
    }, [startDate]);

    // Build hierarchical product structure based on wbs_vid
    const productTree = useMemo(() => {
        const byMacode: Record<string, DetailProcessItem[]> = {};
        data.forEach(item => {
            if (!byMacode[item.macode]) byMacode[item.macode] = [];
            byMacode[item.macode].push(item);
        });

        // Build flat nodes first
        const nodeMap: Record<string, ProductNode> = {};
        const rootNodes: ProductNode[] = [];

        Object.entries(byMacode).forEach(([macode, items]) => {
            let currentDayIndex = 0;
            const scheduledItems = items.map(item => {
                const duration = item.working_day > 0 ? item.working_day : 1;
                const start = currentDayIndex;
                const end = start + duration;
                currentDayIndex = end;
                return { ...item, startIdx: start, endIdx: end, duration } as ScheduledItem;
            });

            const processGroups: Record<string, ScheduledItem[]> = {};
            const processOrder: string[] = [];
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

            // Parse wbs_vid for hierarchy (e.g., "1", "1.1", "1.1.1")
            const wbs_vid = items[0]?.wbs_vid || '';
            const parts = wbs_vid.split('.');
            const level = parts.length - 1;

            nodeMap[macode] = {
                macode,
                maname: items[0]?.maname || macode,
                wbs_vid,
                level,
                processes,
                totalDays: currentDayIndex,
                children: []
            };
        });

        // Build tree structure
        Object.values(nodeMap).forEach(node => {
            if (node.wbs_vid) {
                const parts = node.wbs_vid.split('.');
                if (parts.length > 1) {
                    // Find parent by removing last part
                    const parentWbs = parts.slice(0, -1).join('.');
                    const parent = Object.values(nodeMap).find(n => n.wbs_vid === parentWbs);
                    if (parent) {
                        node.parentMacode = parent.macode;
                        parent.children.push(node);
                        return;
                    }
                }
            }
            rootNodes.push(node);
        });

        // Sort by wbs_vid
        const sortByWbs = (a: ProductNode, b: ProductNode) => {
            return (a.wbs_vid || '').localeCompare(b.wbs_vid || '', undefined, { numeric: true });
        };
        rootNodes.sort(sortByWbs);
        Object.values(nodeMap).forEach(node => node.children.sort(sortByWbs));

        return rootNodes;
    }, [data]);

    const CELL_WIDTH = 36;
    const LEFT_PANEL_WIDTH = 400;

    const renderProductNode = (node: ProductNode, depth: number = 0): React.ReactNode => {
        const isExpanded = expandedProducts.has(node.macode);
        const hasChildren = node.children.length > 0;
        const indent = depth * 24;

        return (
            <React.Fragment key={node.macode}>
                {/* Product Row */}
                <div className="flex hover:bg-slate-50 transition-colors border-b border-slate-100">
                    <div
                        className="sticky left-0 z-10 flex-shrink-0 flex border-r border-slate-200 bg-white cursor-pointer"
                        style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                        onClick={() => toggleProduct(node.macode)}
                    >
                        <div className="flex-1 p-2 flex items-center gap-1" style={{ paddingLeft: `${12 + indent}px` }}>
                            {/* Tree connector */}
                            {depth > 0 && (
                                <span className="text-slate-300 text-xs mr-1">└</span>
                            )}
                            {/* Expand/Collapse icon */}
                            {isExpanded ? (
                                <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
                            ) : (
                                <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
                            )}
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-slate-700 truncate">{node.maname}</span>
                                <span className="text-[10px] text-slate-400 font-mono truncate">{node.macode}</span>
                            </div>
                        </div>
                        <div className="w-[70px] border-l border-slate-100 p-2 flex items-center justify-center text-[10px] text-slate-500 bg-slate-50/30">
                            {node.totalDays}일
                        </div>
                    </div>

                    {/* Timeline Bar */}
                    <div className="flex-1 relative h-[46px]">
                        {!isExpanded && (
                            <div
                                className="absolute top-3 h-5 bg-blue-500 rounded shadow-sm opacity-80 flex items-center px-2"
                                style={{
                                    left: `${(node.processes[0]?.items[0]?.startIdx || 0) * CELL_WIDTH}px`,
                                    width: `${Math.max(node.totalDays * CELL_WIDTH, 30)}px`
                                }}
                            >
                                <span className="text-[9px] text-white font-medium truncate">
                                    {node.totalDays}일
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Expanded: Process Detail Rows */}
                {isExpanded && node.processes.map((proc) => (
                    <div key={proc.prcode} className="flex border-b border-slate-100/50 hover:bg-slate-50/50">
                        <div
                            className="sticky left-0 z-10 flex-shrink-0 flex border-r border-slate-200 bg-slate-50/20"
                            style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                        >
                            <div className="flex-1 p-2 flex items-center" style={{ paddingLeft: `${36 + indent}px` }}>
                                <div className="border-l-2 border-slate-300 pl-3 flex flex-col">
                                    <span className="text-[11px] font-semibold text-slate-600">{proc.prname}</span>
                                    <span className="text-[9px] text-slate-400 font-mono">{proc.prcode}</span>
                                </div>
                            </div>
                            <div className="w-[70px] border-l border-slate-100 p-2 flex items-center justify-center text-[9px] text-slate-400">
                                {proc.items.length}개
                            </div>
                        </div>

                        <div className="flex-1 relative h-[36px]">
                            {proc.items.map((item, idx) => {
                                let bgColor = '#94a3b8';
                                if (item.status === 'COMPLETED') bgColor = '#10b981';
                                else if (item.status === 'DELAYED') bgColor = '#f43f5e';
                                else if (item.status === 'IN_PROGRESS') bgColor = '#3b82f6';

                                return (
                                    <div
                                        key={`${item.prcode}_${item.detail_seq}_${idx}`}
                                        className="absolute top-1.5 bottom-1.5 rounded shadow-sm flex items-center text-white text-[8px] overflow-hidden cursor-help"
                                        style={{
                                            left: `${item.startIdx * CELL_WIDTH}px`,
                                            width: `${Math.max(item.duration, 0.5) * CELL_WIDTH - 2}px`,
                                            backgroundColor: bgColor,
                                            opacity: 0.9
                                        }}
                                        title={`${item.prname} > ${item.prname_detail} (${item.duration}일)`}
                                    >
                                        <span className="truncate px-1 font-medium">{item.prname_detail}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Render children recursively */}
                {isExpanded && node.children.map(child => renderProductNode(child, depth + 1))}
            </React.Fragment>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-sm text-slate-500">상세 계획 로딩 중...</span>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-8 text-slate-500 text-sm">
                상세 공정 데이터가 없습니다.
            </div>
        );
    }

    return (
        <div className={`bg-white border border-slate-200 rounded-lg overflow-hidden ${className}`}>
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <span className="font-semibold text-slate-700 text-sm">상세 생산계획</span>
                    <span className="text-xs text-slate-400">({data.length}개 세부공정)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">시작일:</span>
                    <input
                        type="date"
                        value={format(startDate, 'yyyy-MM-dd')}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                        className="bg-white border border-slate-200 rounded px-2 py-1 text-xs"
                    />
                </div>
            </div>

            {/* Gantt Chart - Horizontal scroll only */}
            <div className="overflow-x-auto">
                <div className="min-w-max">
                    {/* Timeline Header */}
                    <div className="sticky top-0 z-20 flex bg-white border-b border-slate-200">
                        <div
                            className="sticky left-0 z-30 flex-shrink-0 bg-slate-50 border-r border-slate-200"
                            style={{ width: `${LEFT_PANEL_WIDTH}px` }}
                        >
                            <div className="flex h-full text-[10px] font-bold text-slate-500">
                                <div className="flex-1 p-2 flex items-center border-r border-slate-200">
                                    제품 / 공정
                                </div>
                                <div className="w-[70px] p-2 flex items-center justify-center">
                                    일수
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            {dateRange.map((date, idx) => {
                                const isWknd = isWeekend(date);
                                return (
                                    <div
                                        key={idx}
                                        className={`flex-shrink-0 border-r border-slate-100 flex flex-col items-center justify-center py-1 ${isWknd ? 'bg-amber-50/70 text-amber-700' : 'bg-white'}`}
                                        style={{ width: `${CELL_WIDTH}px` }}
                                    >
                                        <span className="text-[9px] opacity-70">{format(date, 'M/d')}</span>
                                        <span className="text-[10px] font-bold">{format(date, 'EEE', { locale: ko })}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Data Rows */}
                    <div className="relative">
                        {/* Grid Background */}
                        <div className="absolute inset-0 flex pointer-events-none z-0" style={{ paddingLeft: `${LEFT_PANEL_WIDTH}px` }}>
                            {dateRange.map((date, idx) => (
                                <div
                                    key={idx}
                                    className={`flex-shrink-0 border-r border-slate-100 h-full ${isWeekend(date) ? 'bg-amber-50/30' : ''}`}
                                    style={{ width: `${CELL_WIDTH}px` }}
                                />
                            ))}
                        </div>

                        {/* Product Tree */}
                        <div className="relative z-10">
                            {productTree.map(node => renderProductNode(node, 0))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailGanttChart;

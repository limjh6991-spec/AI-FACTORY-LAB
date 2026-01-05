/**
 * GanttChart Component
 * 공정별/제품별 스케줄 시각화 (탭 전환)
 */

'use client';

import React, { useState } from 'react';
import { colors, ProductOrder, ScheduledTask } from '../types';

interface GanttChartProps {
    groupedByProcess: [string, ScheduledTask[]][];
    groupedByProduct: [string, ScheduledTask[]][];
    orders: ProductOrder[];
    chartMaxTime: number;
    formatTime: (minutes: number) => string;
    getBarStyle: (task: ScheduledTask) => { left: string; width: string; minWidth: string };
}

type ViewMode = 'process' | 'product';

export function GanttChart({
    groupedByProcess,
    groupedByProduct,
    orders,
    chartMaxTime,
    formatTime,
    getBarStyle
}: GanttChartProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('process');

    const data = viewMode === 'process' ? groupedByProcess : groupedByProduct;

    return (
        <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
            {/* 헤더 + 탭 */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold" style={{ color: colors.gray800 }}>
                    스케줄 (간트 차트)
                </h3>
                <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: colors.gray300 }}>
                    <button
                        onClick={() => setViewMode('process')}
                        className="px-4 py-1.5 text-xs font-medium transition-all"
                        style={{
                            background: viewMode === 'process' ? colors.primary : 'white',
                            color: viewMode === 'process' ? 'white' : colors.gray600
                        }}
                    >
                        공정별
                    </button>
                    <button
                        onClick={() => setViewMode('product')}
                        className="px-4 py-1.5 text-xs font-medium transition-all"
                        style={{
                            background: viewMode === 'product' ? colors.primary : 'white',
                            color: viewMode === 'product' ? 'white' : colors.gray600
                        }}
                    >
                        제품별
                    </button>
                </div>
            </div>

            {/* 시간 축 */}
            <div className="flex mb-2 pl-24" style={{ color: colors.gray500 }}>
                {[0, 25, 50, 75, 100].map(pct => (
                    <div key={pct} className="text-xs" style={{ width: '25%' }}>
                        {formatTime((chartMaxTime * pct) / 100)}
                    </div>
                ))}
            </div>

            {/* 간트 바 */}
            <div className="space-y-2">
                {data.map(([groupName, tasks]) => {
                    const order = orders.find(o => o.item_code === groupName);
                    const barColor = viewMode === 'product' && order ? order.color : undefined;

                    return (
                        <div key={groupName} className="flex items-center">
                            <div
                                className="w-24 text-xs font-medium truncate pr-2 flex items-center gap-1"
                                style={{ color: colors.gray700 }}
                            >
                                {viewMode === 'product' && order && (
                                    <div className="w-2 h-2 rounded" style={{ background: order.color }} />
                                )}
                                {viewMode === 'product' ? groupName.replace('PROD-', 'P') : groupName}
                            </div>
                            <div className="flex-1 h-8 relative rounded" style={{ background: colors.gray200 }}>
                                {tasks.map((task, idx) => (
                                    <div
                                        key={idx}
                                        className="absolute h-full rounded flex items-center justify-center text-xs text-white font-medium overflow-hidden"
                                        style={{
                                            ...getBarStyle(task),
                                            background: task.hasConflict
                                                ? colors.warning
                                                : (viewMode === 'product' ? barColor || task.color : task.color),
                                            border: task.hasConflict ? `2px solid ${colors.danger}` : 'none'
                                        }}
                                        title={`${task.item_code} - ${task.op_name} (${formatTime(task.end_time - task.start_time)})`}
                                    >
                                        {viewMode === 'process'
                                            ? task.item_code.replace('PROD-', '')
                                            : task.op_name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 범례 */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t" style={{ borderColor: colors.gray200 }}>
                {viewMode === 'process' ? (
                    // 공정별 뷰: 제품 범례
                    orders.map(order => (
                        <div key={order.item_code} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{ background: order.color }} />
                            <span className="text-xs" style={{ color: colors.gray600 }}>{order.item_code}</span>
                        </div>
                    ))
                ) : (
                    // 제품별 뷰: 공정 설명
                    <span className="text-xs" style={{ color: colors.gray500 }}>
                        각 막대는 공정명을 표시합니다
                    </span>
                )}
            </div>
        </div>
    );
}

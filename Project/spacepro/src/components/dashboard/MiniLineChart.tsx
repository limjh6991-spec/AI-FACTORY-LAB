/**
 * Mini Line Chart Component
 * 작은 라인 차트 (대시보드 패널용)
 */

'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

interface MiniLineChartProps {
    data: Array<{ name: string; value: number }>;
    color?: string;
    height?: number;
    showXAxis?: boolean;
}

export function MiniLineChart({
    data,
    color = '#8BC4A9',
    height = 120,
    showXAxis = true,
}: MiniLineChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                    <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                {showXAxis && (
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: '#A0A0A0' }}
                        axisLine={false}
                        tickLine={false}
                    />
                )}
                <YAxis hide />
                <Tooltip
                    contentStyle={{
                        background: 'white',
                        border: '1px solid #E8E8E4',
                        borderRadius: '8px',
                        fontSize: '12px',
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#gradient-${color.replace('#', '')})`}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default MiniLineChart;

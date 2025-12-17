/**
 * Donut Chart Component
 * 도넛 차트 (OEE 등)
 */

'use client';

import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';

interface DonutChartProps {
    value: number;
    label?: string;
    size?: number;
    color?: string;
}

export function DonutChart({
    value,
    label,
    size = 120,
    color = '#8BC4A9',
}: DonutChartProps) {
    const data = [
        { name: 'value', value: value },
        { name: 'remaining', value: 100 - value },
    ];

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="90%"
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                    >
                        <Cell fill={color} />
                        <Cell fill="#E8E8E4" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#2D3436]">{value}%</span>
                {label && (
                    <span className="text-xs text-[#A0A0A0]">{label}</span>
                )}
            </div>
        </div>
    );
}

export default DonutChart;

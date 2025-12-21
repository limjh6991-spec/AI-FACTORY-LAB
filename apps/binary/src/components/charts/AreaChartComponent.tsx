/**
 * AreaChartComponent
 * 
 * Recharts 기반 영역 차트 컴포넌트
 * 그라데이션 채우기 지원
 * 
 * @module features/screen-generator/components/charts/AreaChartComponent
 */

'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    CHART_COLORS,
    GRADIENT_COLORS,
    tooltipStyle,
    defaultChartOptions,
    formatNumber,
    type BaseChartProps,
} from './chartUtils';

interface AreaChartComponentProps extends BaseChartProps {
    /** 스택 영역 차트 여부 */
    stacked?: boolean;
    /** 그라데이션 사용 */
    gradient?: boolean;
    /** 투명도 */
    fillOpacity?: number;
}

export function AreaChartComponent({
    data = [],
    xField,
    yField,
    height = 300,
    showLegend = true,
    showTooltip = true,
    showGridLines = true,
    colors = CHART_COLORS,
    stacked = false,
    gradient = true,
    fillOpacity = 0.3,
}: AreaChartComponentProps) {
    // yField가 문자열인 경우 배열로 변환
    const yFields = Array.isArray(yField) ? yField : [yField];

    if (!data || data.length === 0) {
        return (
            <div
                className="flex items-center justify-center bg-gray-50 rounded-lg"
                style={{ height }}
            >
                <p className="text-sm text-gray-500">데이터가 없습니다</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart
                data={data}
                margin={defaultChartOptions.margin}
            >
                {/* 그라데이션 정의 */}
                <defs>
                    {yFields.map((field, index) => {
                        const color = colors[index % colors.length];
                        return (
                            <linearGradient key={`gradient-${field}`} id={`gradient-${field}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                            </linearGradient>
                        );
                    })}
                </defs>

                {showGridLines && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e0e0e0"
                        vertical={false}
                    />
                )}

                <XAxis
                    dataKey={xField}
                    tick={{ fontSize: 12, fill: '#525252' }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickLine={{ stroke: '#e0e0e0' }}
                />

                <YAxis
                    tick={{ fontSize: 12, fill: '#525252' }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickLine={{ stroke: '#e0e0e0' }}
                    tickFormatter={(value) => formatNumber(value)}
                />

                {showTooltip && (
                    <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value: number) => formatNumber(value)}
                    />
                )}

                {showLegend && (
                    <Legend
                        wrapperStyle={{ paddingTop: 10 }}
                        iconType="rect"
                    />
                )}

                {yFields.map((field, index) => {
                    const color = colors[index % colors.length];
                    return (
                        <Area
                            key={field}
                            type="monotone"
                            dataKey={field}
                            stroke={color}
                            strokeWidth={2}
                            fill={gradient ? `url(#gradient-${field})` : color}
                            fillOpacity={gradient ? 1 : fillOpacity}
                            stackId={stacked ? 'stack' : undefined}
                            animationDuration={defaultChartOptions.animationDuration}
                        />
                    );
                })}
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default AreaChartComponent;

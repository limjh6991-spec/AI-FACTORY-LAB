/**
 * BarChartComponent
 * 
 * Recharts 기반 막대 차트 컴포넌트
 * 그룹/스택 바 지원
 * 
 * @module features/screen-generator/components/charts/BarChartComponent
 */

'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    CHART_COLORS,
    tooltipStyle,
    defaultChartOptions,
    formatNumber,
    type BaseChartProps,
} from './chartUtils';

interface BarChartComponentProps extends BaseChartProps {
    /** 스택 바 차트 여부 */
    stacked?: boolean;
    /** 가로 방향 */
    horizontal?: boolean;
    /** 바 너비 */
    barSize?: number;
    /** 바 라운드 */
    radius?: number;
}

export function BarChartComponent({
    data = [],
    xField,
    yField,
    height = 300,
    showLegend = true,
    showTooltip = true,
    showGridLines = true,
    colors = CHART_COLORS,
    stacked = false,
    horizontal = false,
    barSize = 20,
    radius = 4,
}: BarChartComponentProps) {
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

    // 가로 방향일 때 layout 변경
    const chartLayout = horizontal ? 'vertical' : 'horizontal';

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                data={data}
                layout={chartLayout}
                margin={defaultChartOptions.margin}
            >
                {showGridLines && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e0e0e0"
                        horizontal={!horizontal}
                        vertical={horizontal}
                    />
                )}

                {horizontal ? (
                    <>
                        <XAxis
                            type="number"
                            tick={{ fontSize: 12, fill: '#525252' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                            tickFormatter={(value) => formatNumber(value)}
                        />
                        <YAxis
                            type="category"
                            dataKey={xField}
                            tick={{ fontSize: 12, fill: '#525252' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                            width={100}
                        />
                    </>
                ) : (
                    <>
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
                    </>
                )}

                {showTooltip && (
                    <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value: number) => formatNumber(value)}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    />
                )}

                {showLegend && (
                    <Legend
                        wrapperStyle={{ paddingTop: 10 }}
                        iconType="rect"
                    />
                )}

                {yFields.map((field, index) => (
                    <Bar
                        key={field}
                        dataKey={field}
                        fill={colors[index % colors.length]}
                        stackId={stacked ? 'stack' : undefined}
                        barSize={barSize}
                        radius={[radius, radius, 0, 0]}
                        animationDuration={defaultChartOptions.animationDuration}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartComponent;

/**
 * LineChartComponent
 * 
 * Recharts 기반 선형 차트 컴포넌트
 * 다중 시리즈 지원
 * 
 * @module features/screen-generator/components/charts/LineChartComponent
 */

'use client';

import React from 'react';
import {
    LineChart,
    Line,
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
    type ChartDataPoint,
} from './chartUtils';

interface LineChartComponentProps extends BaseChartProps {
    /** 부드러운 곡선 사용 */
    smooth?: boolean;
    /** 점 표시 */
    showDots?: boolean;
    /** 스트로크 너비 */
    strokeWidth?: number;
}

export function LineChartComponent({
    data = [],
    xField,
    yField,
    height = 300,
    showLegend = true,
    showTooltip = true,
    showGridLines = true,
    colors = CHART_COLORS,
    smooth = true,
    showDots = true,
    strokeWidth = 2,
}: LineChartComponentProps) {
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
            <LineChart
                data={data}
                margin={defaultChartOptions.margin}
            >
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
                        formatter={(value) => formatNumber(value as number)}
                    />
                )}

                {showLegend && (
                    <Legend
                        wrapperStyle={{ paddingTop: 10 }}
                        iconType="line"
                    />
                )}

                {yFields.map((field, index) => (
                    <Line
                        key={field}
                        type={smooth ? 'monotone' : 'linear'}
                        dataKey={field}
                        stroke={colors[index % colors.length]}
                        strokeWidth={strokeWidth}
                        dot={showDots ? { r: 4, fill: colors[index % colors.length] } : false}
                        activeDot={{ r: 6 }}
                        animationDuration={defaultChartOptions.animationDuration}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineChartComponent;

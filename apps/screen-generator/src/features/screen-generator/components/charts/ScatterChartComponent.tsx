/**
 * ScatterChartComponent
 * 
 * Recharts 기반 산점도 차트 컴포넌트
 * 
 * @module features/screen-generator/components/charts/ScatterChartComponent
 */

'use client';

import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ZAxis,
} from 'recharts';
import {
    CHART_COLORS,
    tooltipStyle,
    defaultChartOptions,
    formatNumber,
    type ChartDataPoint,
} from './chartUtils';

interface ScatterChartComponentProps {
    data: ChartDataPoint[];
    /** X축 필드 */
    xField: string;
    /** Y축 필드 */
    yField: string;
    /** 크기 필드 (버블 차트) */
    sizeField?: string;
    /** 시리즈 필드 (그룹핑) */
    seriesField?: string;
    height?: number;
    showLegend?: boolean;
    showTooltip?: boolean;
    showGridLines?: boolean;
    colors?: string[];
    /** 점 크기 범위 [min, max] */
    sizeRange?: [number, number];
}

export function ScatterChartComponent({
    data = [],
    xField,
    yField,
    sizeField,
    seriesField,
    height = 300,
    showLegend = true,
    showTooltip = true,
    showGridLines = true,
    colors = CHART_COLORS,
    sizeRange = [60, 400],
}: ScatterChartComponentProps) {
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

    // 시리즈별로 데이터 그룹핑
    const groupedData: Record<string, ChartDataPoint[]> = {};

    if (seriesField) {
        data.forEach((item) => {
            const key = String(item[seriesField] || 'default');
            if (!groupedData[key]) {
                groupedData[key] = [];
            }
            groupedData[key].push(item);
        });
    } else {
        groupedData['데이터'] = data;
    }

    const seriesNames = Object.keys(groupedData);

    return (
        <ResponsiveContainer width="100%" height={height}>
            <ScatterChart margin={defaultChartOptions.margin}>
                {showGridLines && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e0e0e0"
                    />
                )}

                <XAxis
                    type="number"
                    dataKey={xField}
                    name={xField}
                    tick={{ fontSize: 12, fill: '#525252' }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickFormatter={(value) => formatNumber(value)}
                />

                <YAxis
                    type="number"
                    dataKey={yField}
                    name={yField}
                    tick={{ fontSize: 12, fill: '#525252' }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickFormatter={(value) => formatNumber(value)}
                />

                {sizeField && (
                    <ZAxis
                        type="number"
                        dataKey={sizeField}
                        range={sizeRange}
                        name={sizeField}
                    />
                )}

                {showTooltip && (
                    <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value: number) => formatNumber(value)}
                        cursor={{ strokeDasharray: '3 3' }}
                    />
                )}

                {showLegend && seriesNames.length > 1 && (
                    <Legend
                        wrapperStyle={{ paddingTop: 10 }}
                        iconType="circle"
                    />
                )}

                {seriesNames.map((name, index) => (
                    <Scatter
                        key={name}
                        name={name}
                        data={groupedData[name]}
                        fill={colors[index % colors.length]}
                        animationDuration={defaultChartOptions.animationDuration}
                    />
                ))}
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default ScatterChartComponent;

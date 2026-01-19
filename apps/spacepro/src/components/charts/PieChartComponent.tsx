/**
 * PieChartComponent
 * 
 * Recharts 기반 파이/도넛 차트 컴포넌트
 * 
 * @module features/screen-generator/components/charts/PieChartComponent
 */

'use client';

import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    CHART_COLORS,
    tooltipStyle,
    defaultChartOptions,
    formatNumber,
    formatPercent,
    type ChartDataPoint,
} from './chartUtils';

interface PieChartComponentProps {
    data: ChartDataPoint[];
    /** 이름 필드 */
    nameField: string;
    /** 값 필드 */
    valueField: string;
    height?: number;
    showLegend?: boolean;
    showTooltip?: boolean;
    colors?: string[];
    /** 도넛 차트 여부 */
    donut?: boolean;
    /** 라벨 표시 */
    showLabel?: boolean;
    /** 퍼센트 표시 */
    showPercent?: boolean;
}

export function PieChartComponent({
    data = [],
    nameField,
    valueField,
    height = 300,
    showLegend = true,
    showTooltip = true,
    colors = CHART_COLORS,
    donut = false,
    showLabel = true,
    showPercent = true,
}: PieChartComponentProps) {
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

    // 전체 합계 계산 (퍼센트용)
    const total = data.reduce((sum, item) => sum + (Number(item[valueField]) || 0), 0);

    // 커스텀 라벨 렌더러
    const renderCustomLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        name,
    }: any) => {
        if (!showLabel) return null;

        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {showPercent ? formatPercent(percent * 100, 0) : ''}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <Pie
                    data={data}
                    dataKey={valueField}
                    nameKey={nameField}
                    cx="50%"
                    cy="50%"
                    innerRadius={donut ? '50%' : 0}
                    outerRadius="80%"
                    paddingAngle={donut ? 2 : 0}
                    label={showLabel && !donut ? renderCustomLabel : undefined}
                    labelLine={false}
                    animationDuration={defaultChartOptions.animationDuration}
                >
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>

                {showTooltip && (
                    <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value, name) => [
                            `${formatNumber(value as number)} (${formatPercent(((value as number) / total) * 100)})`,
                            name as string,
                        ]}
                    />
                )}

                {showLegend && (
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        iconType="circle"
                        wrapperStyle={{ fontSize: 12 }}
                    />
                )}
            </PieChart>
        </ResponsiveContainer>
    );
}

export default PieChartComponent;

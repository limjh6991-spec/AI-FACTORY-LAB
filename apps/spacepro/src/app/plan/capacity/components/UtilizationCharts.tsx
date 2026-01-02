'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell,
    PieChart, Pie
} from 'recharts';
import { colors } from './constants';

interface ChartDataItem {
    name: string;
    utilization: number;
    fill: string;
    [key: string]: string | number;
}

interface PieDataItem {
    name: string;
    value: number;
    fill: string;
    [key: string]: string | number;
}

interface Props {
    utilizationChartData: ChartDataItem[];
    pieChartData: PieDataItem[];
}

export default function UtilizationCharts({ utilizationChartData, pieChartData }: Props) {
    return (
        <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Utilization Bar Chart */}
            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>작업장별 가동률</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={utilizationChartData} layout="vertical">
                        <XAxis type="number" domain={[0, 'auto']} tick={{ fontSize: 12, fill: colors.gray500 }} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: colors.gray500 }} width={60} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar dataKey="utilization" radius={[0, 4, 4, 0]}>
                            {utilizationChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ background: colors.success }} />
                        <span className="text-xs" style={{ color: colors.gray600 }}>정상 (&lt;85%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ background: colors.warning }} />
                        <span className="text-xs" style={{ color: colors.gray600 }}>주의 (85-100%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ background: colors.danger }} />
                        <span className="text-xs" style={{ color: colors.gray600 }}>과부하 (&gt;100%)</span>
                    </div>
                </div>
            </div>

            {/* Status Pie Chart */}
            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>작업장 상태 분포</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

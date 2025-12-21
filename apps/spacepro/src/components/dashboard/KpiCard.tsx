/**
 * KPI Card Component
 * 대시보드용 KPI 위젯
 */

'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
    title: string;
    value: string | number;
    unit?: string;
    change?: number;
    icon?: React.ReactNode;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const colorMap = {
    blue: 'border-l-indigo-500 bg-indigo-50',
    green: 'border-l-emerald-500 bg-emerald-50',
    yellow: 'border-l-amber-500 bg-amber-50',
    red: 'border-l-red-500 bg-red-50',
    purple: 'border-l-violet-500 bg-violet-50',
};

export function KpiCard({
    title,
    value,
    unit,
    change,
    icon,
    color = 'blue',
}: KpiCardProps) {
    const formatValue = (val: string | number) => {
        if (typeof val === 'number') {
            return new Intl.NumberFormat('ko-KR').format(val);
        }
        return val;
    };

    const getTrendIcon = () => {
        if (change === undefined) return null;
        if (change > 0) return <TrendingUp className="w-4 h-4 text-emerald-500" />;
        if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
        return <Minus className="w-4 h-4 text-gray-400" />;
    };

    return (
        <div className={`rounded-lg border-l-4 bg-white p-4 shadow-sm ${colorMap[color]}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-bold text-gray-900">
                            {formatValue(value)}
                        </span>
                        {unit && <span className="text-sm text-gray-500">{unit}</span>}
                    </div>
                    {change !== undefined && (
                        <div className="flex items-center gap-1 mt-2">
                            {getTrendIcon()}
                            <span className={`text-sm font-medium ${change > 0 ? 'text-emerald-600' :
                                    change < 0 ? 'text-red-600' :
                                        'text-gray-500'
                                }`}>
                                {change > 0 ? '+' : ''}{change.toFixed(1)}%
                            </span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className="text-gray-400">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}

export default KpiCard;

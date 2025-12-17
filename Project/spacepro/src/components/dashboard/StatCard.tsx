/**
 * Stat Card Component
 * 참조 이미지 스타일의 통계 카드 (민트색 배경)
 */

'use client';

import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    unit?: string;
    variant?: 'primary' | 'secondary' | 'default';
    size?: 'sm' | 'md' | 'lg';
}

export function StatCard({
    label,
    value,
    unit,
    variant = 'default',
    size = 'md'
}: StatCardProps) {
    const bgColors = {
        primary: 'bg-[#E8F5EE] border-[#B5D9C8]',
        secondary: 'bg-[#FFF5EE] border-[#F5D0B9]',
        default: 'bg-white border-[#E8E8E4]',
    };

    const textColors = {
        primary: 'text-[#6BA98C]',
        secondary: 'text-[#E8A87C]',
        default: 'text-[#2D3436]',
    };

    const sizes = {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
    };

    const valueSizes = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
    };

    return (
        <div className={`rounded-xl border ${bgColors[variant]} ${sizes[size]}`}>
            <p className="text-sm font-medium text-[#636E72] mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
                <span className={`${valueSizes[size]} font-bold ${textColors[variant]}`}>
                    {typeof value === 'number' ? value.toLocaleString('ko-KR') : value}
                </span>
                {unit && (
                    <span className="text-sm text-[#A0A0A0]">{unit}</span>
                )}
            </div>
        </div>
    );
}

export default StatCard;

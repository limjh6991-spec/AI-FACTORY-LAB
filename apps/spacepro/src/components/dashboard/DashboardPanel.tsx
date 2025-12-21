/**
 * Dashboard Panel Component
 * 대시보드 패널 (참조 이미지 스타일)
 */

'use client';

import React from 'react';

interface DashboardPanelProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    headerRight?: React.ReactNode;
}

export function DashboardPanel({
    title,
    subtitle,
    children,
    className = '',
    headerRight
}: DashboardPanelProps) {
    return (
        <div className={`bg-white rounded-xl border border-[#E8E8E4] shadow-sm ${className}`}>
            <div className="px-5 py-4 border-b border-[#E8E8E4] flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-[#2D3436]">{title}</h2>
                    {subtitle && (
                        <p className="text-sm text-[#A0A0A0]">{subtitle}</p>
                    )}
                </div>
                {headerRight}
            </div>
            <div className="p-5">
                {children}
            </div>
        </div>
    );
}

export default DashboardPanel;

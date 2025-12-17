/**
 * Production Flow Component
 * 생산 프로세스 플로우 시각화
 */

'use client';

import React from 'react';
import {
    ClipboardList,
    Package,
    Settings,
    Wrench,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

interface FlowStep {
    id: string;
    name: string;
    count: number;
    icon: 'order' | 'material' | 'process1' | 'process2' | 'complete';
    status?: 'pending' | 'active' | 'completed';
}

interface ProductionFlowProps {
    steps?: FlowStep[];
}

const defaultSteps: FlowStep[] = [
    { id: 'order', name: '오더', count: 45, icon: 'order', status: 'completed' },
    { id: 'material', name: '자재소요', count: 38, icon: 'material', status: 'active' },
    { id: 'process1', name: '가공', count: 28, icon: 'process1', status: 'active' },
    { id: 'process2', name: '조립', count: 15, icon: 'process2', status: 'pending' },
    { id: 'complete', name: '완료', count: 12, icon: 'complete', status: 'pending' },
];

const iconMap = {
    order: ClipboardList,
    material: Package,
    process1: Settings,
    process2: Wrench,
    complete: CheckCircle2,
};

const statusColors = {
    pending: {
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        text: 'text-gray-500',
        icon: 'text-gray-400',
    },
    active: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-400',
        text: 'text-indigo-700',
        icon: 'text-indigo-500',
    },
    completed: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-400',
        text: 'text-emerald-700',
        icon: 'text-emerald-500',
    },
};

export function ProductionFlow({ steps = defaultSteps }: ProductionFlowProps) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">생산 진행 현황</h2>

            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const IconComponent = iconMap[step.icon];
                    const colors = statusColors[step.status || 'pending'];

                    return (
                        <React.Fragment key={step.id}>
                            {/* Step Box */}
                            <div className="flex-1">
                                <div
                                    className={`
                    flex flex-col items-center p-4 rounded-xl border-2 
                    ${colors.bg} ${colors.border}
                    transition-all duration-300 hover:scale-105
                  `}
                                >
                                    <IconComponent className={`w-8 h-8 ${colors.icon} mb-2`} />
                                    <span className={`text-sm font-medium ${colors.text}`}>
                                        {step.name}
                                    </span>
                                    <span className={`text-2xl font-bold ${colors.text} mt-1`}>
                                        {step.count}
                                    </span>
                                    <span className="text-xs text-gray-500">건</span>
                                </div>
                            </div>

                            {/* Arrow */}
                            {index < steps.length - 1 && (
                                <div className="px-2">
                                    <ArrowRight className="w-6 h-6 text-gray-300" />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductionFlow;

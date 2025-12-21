/**
 * Process Card Component
 * 공정별 진척현황 카드
 */

'use client';

import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ProcessCardProps {
    name: string;
    progress: number;
    waiting: number;
    inProgress: number;
    completed: number;
    delayed?: number;
    status?: 'normal' | 'warning' | 'critical';
}

export function ProcessCard({
    name,
    progress,
    waiting,
    inProgress,
    completed,
    delayed = 0,
    status = 'normal',
}: ProcessCardProps) {
    const statusColors = {
        normal: 'border-t-emerald-500',
        warning: 'border-t-amber-500',
        critical: 'border-t-red-500',
    };

    const progressColor = progress >= 80 ? 'bg-emerald-500' : progress >= 50 ? 'bg-amber-500' : 'bg-red-500';

    return (
        <div className={`rounded-lg border-t-4 bg-white p-4 shadow-sm ${statusColors[status]}`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{name}</h3>
                {delayed > 0 && (
                    <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        <AlertCircle className="w-3 h-3" />
                        지연 {delayed}건
                    </span>
                )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">진행률</span>
                    <span className="font-semibold text-gray-900">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${progressColor} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                    <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-gray-700">{waiting}</p>
                    <p className="text-xs text-gray-500">대기</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2">
                    <Loader2 className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-bold text-blue-700">{inProgress}</p>
                    <p className="text-xs text-gray-500">진행중</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                    <p className="text-sm font-bold text-emerald-700">{completed}</p>
                    <p className="text-xs text-gray-500">완료</p>
                </div>
            </div>
        </div>
    );
}

export default ProcessCard;

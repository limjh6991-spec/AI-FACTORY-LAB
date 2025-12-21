/**
 * Alarm List Component
 * 알람/알림 리스트
 */

'use client';

import React from 'react';
import {
    AlertTriangle,
    Clock,
    Package,
    Wrench,
    Bell
} from 'lucide-react';

interface Alarm {
    id: string;
    type: 'delay' | 'material' | 'machine' | 'info';
    message: string;
    time: string;
    priority: 'high' | 'medium' | 'low';
}

interface AlarmListProps {
    alarms?: Alarm[];
    maxItems?: number;
}

const defaultAlarms: Alarm[] = [
    { id: '1', type: 'delay', message: '[가공] ORD-2024-0045 작업 2시간 지연', time: '10분 전', priority: 'high' },
    { id: '2', type: 'material', message: '원자재 MTL-A003 재고 부족 (10EA)', time: '25분 전', priority: 'high' },
    { id: '3', type: 'machine', message: '[MC-02] 예방정비 예정 (내일 09:00)', time: '1시간 전', priority: 'medium' },
    { id: '4', type: 'delay', message: '[조립] ORD-2024-0042 예상 완료 지연', time: '2시간 전', priority: 'medium' },
    { id: '5', type: 'info', message: '금일 생산목표 80% 달성', time: '3시간 전', priority: 'low' },
];

const typeConfig = {
    delay: { icon: Clock, color: 'text-red-500', bg: 'bg-red-50' },
    material: { icon: Package, color: 'text-amber-500', bg: 'bg-amber-50' },
    machine: { icon: Wrench, color: 'text-blue-500', bg: 'bg-blue-50' },
    info: { icon: Bell, color: 'text-gray-500', bg: 'bg-gray-50' },
};

const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-amber-500',
    low: 'border-l-gray-300',
};

export function AlarmList({ alarms = defaultAlarms, maxItems = 5 }: AlarmListProps) {
    const displayAlarms = alarms.slice(0, maxItems);

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h2 className="font-semibold text-gray-900">알람</h2>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {alarms.length}건
                </span>
            </div>

            <div className="divide-y divide-gray-50">
                {displayAlarms.map((alarm) => {
                    const config = typeConfig[alarm.type];
                    const IconComponent = config.icon;

                    return (
                        <div
                            key={alarm.id}
                            className={`flex items-start gap-3 p-4 border-l-4 ${priorityColors[alarm.priority]} hover:bg-gray-50 transition-colors cursor-pointer`}
                        >
                            <div className={`p-2 rounded-lg ${config.bg}`}>
                                <IconComponent className={`w-4 h-4 ${config.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 truncate">{alarm.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{alarm.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {alarms.length > maxItems && (
                <div className="px-4 py-3 border-t border-gray-100 text-center">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        전체 보기 ({alarms.length}건)
                    </button>
                </div>
            )}
        </div>
    );
}

export default AlarmList;

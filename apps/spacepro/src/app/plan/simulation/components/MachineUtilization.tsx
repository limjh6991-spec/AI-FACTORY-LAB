/**
 * MachineUtilization Component
 * 설비 가동률 차트
 */

import React from 'react';
import { colors } from '../types';

interface MachineData {
    machine: string;
    utilization: number;
}

interface MachineUtilizationProps {
    data: MachineData[];
}

export function MachineUtilization({ data }: MachineUtilizationProps) {
    return (
        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: colors.gray800 }}>설비 가동률</h3>
            <div className="grid grid-cols-5 gap-3">
                {data.slice(0, 10).map(m => (
                    <div key={m.machine} className="text-center">
                        <div className="text-xs mb-1 truncate" style={{ color: colors.gray600 }}>{m.machine}</div>
                        <div className="h-24 relative rounded" style={{ background: colors.gray200 }}>
                            <div
                                className="absolute bottom-0 left-0 right-0 rounded"
                                style={{
                                    height: `${m.utilization}%`,
                                    background: m.utilization > 80 ? colors.success : m.utilization > 50 ? colors.primary : colors.warning
                                }}
                            />
                        </div>
                        <div className="text-sm font-semibold mt-1" style={{ color: colors.gray800 }}>
                            {m.utilization.toFixed(0)}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

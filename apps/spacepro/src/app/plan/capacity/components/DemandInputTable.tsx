'use client';

import React from 'react';
import { colors } from './constants';
import { Workcenter, DemandInput } from './types';

interface Props {
    workcenters: Workcenter[];
    demands: DemandInput[];
    onDemandChange: (wcCode: string, value: number) => void;
}

export default function DemandInputTable({ workcenters, demands, onDemandChange }: Props) {
    return (
        <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                <h3 className="font-semibold" style={{ color: colors.gray900 }}>수요 입력</h3>
                <span className="text-xs" style={{ color: colors.gray500 }}>작업장별 생산 수요량 입력</span>
            </div>
            <div className="overflow-x-auto max-h-[400px]">
                <table className="w-full text-sm">
                    <thead className="sticky top-0" style={{ background: colors.gray100 }}>
                        <tr>
                            <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray600 }}>작업장 코드</th>
                            <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray600 }}>작업장명</th>
                            <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600 }}>유형</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>표준 케파</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.primary }}>수요 (EA)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workcenters.map((wc) => {
                            const demand = demands.find(d => d.workcenter_code === wc.workcenter_code);
                            return (
                                <tr key={wc.workcenter_code} className="border-b hover:bg-gray-50" style={{ borderColor: colors.gray200 }}>
                                    <td className="px-4 py-3 font-medium" style={{ color: colors.gray800 }}>{wc.workcenter_code}</td>
                                    <td className="px-4 py-3" style={{ color: colors.gray700 }}>{wc.workcenter_name}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="px-2 py-1 rounded text-xs" style={{ background: colors.info + '15', color: colors.info }}>
                                            {wc.workcenter_type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right" style={{ color: colors.gray600 }}>{wc.std_capacity}/HR</td>
                                    <td className="px-4 py-3 text-right">
                                        <input
                                            type="number"
                                            value={demand?.quantity || 0}
                                            onChange={(e) => onDemandChange(wc.workcenter_code, parseInt(e.target.value) || 0)}
                                            className="w-28 px-2 py-1 text-right rounded border"
                                            style={{ borderColor: colors.primary, color: colors.primary }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

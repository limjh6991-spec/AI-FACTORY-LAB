'use client';

import React from 'react';
import { colors, statusColors } from './constants';
import { WorkcenterResult } from './types';

interface Props {
    workcenters: WorkcenterResult[];
}

export default function DetailTable({ workcenters }: Props) {
    return (
        <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
            <div className="p-4 border-b" style={{ borderColor: colors.gray200 }}>
                <h3 className="font-semibold" style={{ color: colors.gray900 }}>상세 분석 결과</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead style={{ background: colors.gray100 }}>
                        <tr>
                            <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray600 }}>작업장</th>
                            <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600 }}>유형</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>수요</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.success }}>생산 가능량</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>가용 케파</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>UPH</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>효율</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>가동률</th>
                            <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>Gap</th>
                            <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600 }}>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workcenters.map((wc) => (
                            <tr key={wc.workcenter_code} className="border-b hover:bg-gray-50" style={{ borderColor: colors.gray200 }}>
                                <td className="px-4 py-3">
                                    <div className="font-medium" style={{ color: colors.gray800 }}>{wc.workcenter_code}</div>
                                    <div className="text-xs" style={{ color: colors.gray500 }}>{wc.workcenter_name}</div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="px-2 py-1 rounded text-xs" style={{ background: colors.info + '15', color: colors.info }}>
                                        {wc.workcenter_type}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right font-medium" style={{ color: colors.primary }}>{wc.total_demand.toLocaleString()}</td>
                                <td className="px-4 py-3 text-right font-bold" style={{ color: colors.success }}>
                                    {(wc.adjusted_capacity || wc.available_capacity).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right" style={{ color: colors.gray700 }}>{wc.available_capacity.toLocaleString()}</td>
                                <td className="px-4 py-3 text-right" style={{ color: colors.gray600 }}>{wc.uph}</td>
                                <td className="px-4 py-3 text-right" style={{ color: colors.gray600 }}>{wc.efficiency}%</td>
                                <td className="px-4 py-3 text-right font-bold" style={{ color: statusColors[wc.status] }}>{wc.utilization}%</td>
                                <td className="px-4 py-3 text-right" style={{ color: wc.gap > 0 ? colors.danger : colors.success }}>
                                    {wc.gap > 0 ? '+' : ''}{wc.gap.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className="px-2 py-1 rounded-full text-xs font-medium"
                                        style={{ background: statusColors[wc.status] + '15', color: statusColors[wc.status] }}
                                    >
                                        {wc.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

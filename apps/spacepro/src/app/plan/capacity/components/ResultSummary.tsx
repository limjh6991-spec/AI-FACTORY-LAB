'use client';

import React from 'react';
import { Calendar, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';
import { colors, statusColors } from './constants';
import { SimulationResult } from './types';

interface Props {
    result: SimulationResult | null;
}

export default function ResultSummary({ result }: Props) {
    return (
        <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
            <div className="p-4 border-b" style={{ borderColor: colors.gray200 }}>
                <h3 className="font-semibold" style={{ color: colors.gray900 }}>시뮬레이션 결과</h3>
            </div>
            {result ? (
                <div className="p-4">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 rounded-lg" style={{ background: colors.gray100 }}>
                            <p className="text-xs" style={{ color: colors.gray500 }}>총 수요</p>
                            <p className="text-xl font-bold" style={{ color: colors.gray800 }}>{result.summary.total_demand.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: colors.gray100 }}>
                            <p className="text-xs" style={{ color: colors.gray500 }}>총 케파</p>
                            <p className="text-xl font-bold" style={{ color: colors.gray800 }}>{result.summary.total_capacity.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: statusColors[result.summary.status] + '15' }}>
                            <p className="text-xs" style={{ color: colors.gray500 }}>평균 가동률</p>
                            <p className="text-xl font-bold" style={{ color: statusColors[result.summary.status] }}>{result.summary.avg_utilization}%</p>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: result.summary.bottleneck_count > 0 ? colors.danger + '15' : colors.success + '15' }}>
                            <p className="text-xs" style={{ color: colors.gray500 }}>병목 작업장</p>
                            <p className="text-xl font-bold" style={{ color: result.summary.bottleneck_count > 0 ? colors.danger : colors.success }}>
                                {result.summary.bottleneck_count}개
                            </p>
                        </div>
                    </div>

                    {/* Period Info */}
                    <div className="p-3 rounded-lg mb-4" style={{ background: colors.info + '10' }}>
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4" style={{ color: colors.info }} />
                            <span className="text-sm font-medium" style={{ color: colors.info }}>기간 정보</span>
                        </div>
                        <p className="text-xs" style={{ color: colors.gray600 }}>
                            {result.period.start_date} ~ {result.period.end_date} |
                            근무일: {result.period.workdays}일, 반일: {result.period.half_days}일 |
                            총 가용시간: {result.period.total_hours}H
                        </p>
                    </div>

                    {/* Bottleneck Alert */}
                    {result.bottlenecks.length > 0 && (
                        <div className="p-4 rounded-lg" style={{ background: colors.danger + '10', border: `1px solid ${colors.danger}30` }}>
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5" style={{ color: colors.danger }} />
                                <span className="font-semibold" style={{ color: colors.danger }}>병목 작업장 경고</span>
                            </div>
                            <div className="space-y-2">
                                {result.bottlenecks.map((bn) => (
                                    <div key={bn.workcenter_code} className="flex justify-between text-sm">
                                        <span style={{ color: colors.gray700 }}>{bn.workcenter_name}</span>
                                        <span style={{ color: colors.danger }}>
                                            {bn.utilization}% (부족: {bn.shortage.toLocaleString()} EA)
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {result.bottlenecks.length === 0 && (
                        <div className="p-4 rounded-lg" style={{ background: colors.success + '10', border: `1px solid ${colors.success}30` }}>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                                <span className="font-medium" style={{ color: colors.success }}>모든 작업장 케파 충분</span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-8 text-center" style={{ color: colors.gray500 }}>
                    <BarChart3 className="w-12 h-12 mx-auto mb-3" style={{ color: colors.gray300 }} />
                    <p>수요를 입력하고 시뮬레이션을 실행하세요.</p>
                </div>
            )}
        </div>
    );
}

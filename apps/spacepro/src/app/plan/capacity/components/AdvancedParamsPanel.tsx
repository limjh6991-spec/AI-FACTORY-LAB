'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import { colors } from './constants';
import { AdvancedParams } from './types';

interface Props {
    advancedParams: AdvancedParams;
    setAdvancedParams: React.Dispatch<React.SetStateAction<AdvancedParams>>;
}

export default function AdvancedParamsPanel({ advancedParams, setAdvancedParams }: Props) {
    return (
        <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)', border: `1px solid ${colors.warning}30` }}>
            <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5" style={{ color: colors.warning }} />
                <h3 className="font-semibold" style={{ color: colors.gray900 }}>고급 시뮬레이션 변수</h3>
                <span className="text-xs px-2 py-1 rounded" style={{ background: colors.warning + '15', color: colors.warning }}>Level 1 + Level 2</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {/* 수율 */}
                <div>
                    <label className="text-xs font-medium mb-2 block" style={{ color: colors.gray600 }}>
                        수율 (Yield Rate) {advancedParams.yield_rate_override !== null ? `${advancedParams.yield_rate_override}%` : 'DB값 사용'}
                    </label>
                    <input
                        type="range"
                        min="50"
                        max="100"
                        value={advancedParams.yield_rate_override ?? 95}
                        onChange={(e) => setAdvancedParams({ ...advancedParams, yield_rate_override: parseInt(e.target.value) })}
                        className="w-full h-2 rounded-lg cursor-pointer"
                        style={{ accentColor: colors.success }}
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: colors.gray500 }}>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* 재작업률 */}
                <div>
                    <label className="text-xs font-medium mb-2 block" style={{ color: colors.gray600 }}>
                        재작업률 (Rework Rate) {advancedParams.rework_rate_override !== null ? `${advancedParams.rework_rate_override}%` : 'DB값 사용'}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={advancedParams.rework_rate_override ?? 3}
                        onChange={(e) => setAdvancedParams({ ...advancedParams, rework_rate_override: parseInt(e.target.value) })}
                        className="w-full h-2 rounded-lg cursor-pointer"
                        style={{ accentColor: colors.warning }}
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: colors.gray500 }}>
                        <span>0%</span>
                        <span>20%</span>
                    </div>
                </div>

                {/* 비가동 시간 */}
                <div>
                    <label className="text-xs font-medium mb-2 block" style={{ color: colors.gray600 }}>
                        비가동 시간 (Downtime) {advancedParams.downtime_override !== null ? `${advancedParams.downtime_override}H` : 'DB값 사용'}
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={advancedParams.downtime_override ?? 4}
                        onChange={(e) => setAdvancedParams({ ...advancedParams, downtime_override: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                        style={{ borderColor: colors.gray300 }}
                    />
                </div>

                {/* 효율 계수 */}
                <div>
                    <label className="text-xs font-medium mb-2 block" style={{ color: colors.gray600 }}>
                        효율 계수 (Efficiency Factor) {advancedParams.efficiency_factor}%
                    </label>
                    <input
                        type="range"
                        min="50"
                        max="150"
                        value={advancedParams.efficiency_factor}
                        onChange={(e) => setAdvancedParams({ ...advancedParams, efficiency_factor: parseInt(e.target.value) })}
                        className="w-full h-2 rounded-lg cursor-pointer"
                        style={{ accentColor: colors.info }}
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: colors.gray500 }}>
                        <span>50%</span>
                        <span>100%</span>
                        <span>150%</span>
                    </div>
                </div>

                {/* 야간 효율 */}
                <div>
                    <label className="text-xs font-medium mb-2 block" style={{ color: colors.gray600 }}>
                        야간 근무 효율 {advancedParams.night_shift_efficiency}%
                    </label>
                    <input
                        type="range"
                        min="50"
                        max="100"
                        value={advancedParams.night_shift_efficiency}
                        onChange={(e) => setAdvancedParams({ ...advancedParams, night_shift_efficiency: parseInt(e.target.value) })}
                        className="w-full h-2 rounded-lg cursor-pointer"
                        style={{ accentColor: colors.primary }}
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: colors.gray500 }}>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* 외주 지연 적용 */}
                <div className="flex items-center gap-3">
                    <label className="text-xs font-medium" style={{ color: colors.gray600 }}>외주 입고 지연 적용</label>
                    <button
                        onClick={() => setAdvancedParams({ ...advancedParams, outsourcing_delay: !advancedParams.outsourcing_delay })}
                        className="relative w-12 h-6 rounded-full transition-colors"
                        style={{ background: advancedParams.outsourcing_delay ? colors.success : colors.gray300 }}
                    >
                        <span
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
                            style={{ left: advancedParams.outsourcing_delay ? '28px' : '4px' }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

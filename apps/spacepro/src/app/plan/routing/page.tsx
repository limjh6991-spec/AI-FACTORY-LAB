/**
 * 제품별 공정 흐름 및 생산시간 분석 화면
 * Routing Process Flow & Production Time Analysis
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    GitBranch, Clock, Package, Play, RefreshCw, ArrowRight,
    ChevronRight, Settings, AlertTriangle, CheckCircle, Cpu,
    Timer, TrendingUp, Boxes
} from 'lucide-react';

const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    dark: '#181C32',
    gray100: '#F5F8FA',
    gray200: '#EFF2F5',
    gray300: '#E4E6EF',
    gray400: '#B5B5C3',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
    gray700: '#5E6278',
    gray800: '#3F4254',
    gray900: '#181C32',
};

interface RoutingItem {
    item_code: string;
    revision: string;
    status: string;
}

interface MaterialInfo {
    child_item: string;
    qty_per: number;
    material_yield: number;
}

interface RoutingStep {
    op_seq: number;
    op_name: string;
    workcenter_code: string;
    machine_code: string;
    setup_time: number;
    cycle_time: number;
    process_yield: number;
    queue_time: number;
    move_time: number;
    materials: MaterialInfo[];
}

interface YieldAnalysis {
    op_seq: number;
    op_name: string;
    process_yield: number;
    cumulative_yield: number;
    required_input: number;
    expected_output: number;
}

export default function RoutingFlowPage() {
    const [items, setItems] = useState<RoutingItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [routing, setRouting] = useState<RoutingStep[]>([]);
    const [yieldAnalysis, setYieldAnalysis] = useState<YieldAnalysis[]>([]);
    const [materialReqs, setMaterialReqs] = useState<Record<string, number>>({});
    const [targetQty, setTargetQty] = useState<number>(1000);
    const [firstOpInput, setFirstOpInput] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_BASE = 'http://localhost:8000';

    // 품목 목록 로드
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch(`${API_BASE}/routing/items`);
            if (res.ok) {
                const data = await res.json();
                setItems(data);
                if (data.length > 0) {
                    setSelectedItem(data[0].item_code);
                }
            }
        } catch (err) {
            setError('품목 목록을 불러오는 중 오류가 발생했습니다.');
        }
    };

    // 라우팅 조회
    useEffect(() => {
        if (selectedItem) {
            fetchRouting(selectedItem);
        }
    }, [selectedItem]);

    const fetchRouting = async (itemCode: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/routing/${itemCode}`);
            if (res.ok) {
                const data = await res.json();
                setRouting(data.routing || []);
            }
        } catch (err) {
            setError('라우팅 정보를 불러오는 중 오류가 발생했습니다.');
        }
        setIsLoading(false);
    };

    // 수율 분석 실행
    const runYieldAnalysis = async () => {
        if (!selectedItem) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/routing/yield-analysis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_code: selectedItem,
                    target_quantity: targetQty,
                    revision: '1.0'
                })
            });
            if (res.ok) {
                const data = await res.json();
                setYieldAnalysis(data.yield_analysis || []);
                setMaterialReqs(data.material_requirements || {});
                setFirstOpInput(data.first_op_input || targetQty);
            }
        } catch (err) {
            setError('수율 분석 중 오류가 발생했습니다.');
        }
        setIsLoading(false);
    };

    // 총 생산 시간 계산
    const totalProductionTime = useMemo(() => {
        if (routing.length === 0) return { setup: 0, processing: 0, total: 0 };

        const qty = firstOpInput || targetQty;
        let totalSetup = 0;
        let totalProcessing = 0;

        routing.forEach((step, idx) => {
            const stepInput = yieldAnalysis[idx]?.required_input || qty;
            totalSetup += step.setup_time;
            totalProcessing += stepInput * step.cycle_time;
        });

        return {
            setup: Math.round(totalSetup),
            processing: Math.round(totalProcessing),
            total: Math.round(totalSetup + totalProcessing)
        };
    }, [routing, yieldAnalysis, firstOpInput, targetQty]);

    // 시간 포맷
    const formatTime = (minutes: number) => {
        if (minutes < 60) return `${minutes}분`;
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        if (hours < 24) return `${hours}시간 ${mins}분`;
        const days = Math.floor(hours / 24);
        const remainHours = hours % 24;
        return `${days}일 ${remainHours}시간`;
    };

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.info + '15' }}>
                            <GitBranch className="w-6 h-6" style={{ color: colors.info }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>공정 흐름 분석</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>Routing Process Flow & Time Analysis</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchItems}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RefreshCw className="w-4 h-4" />
                            새로고침
                        </button>
                        <button
                            onClick={runYieldAnalysis}
                            disabled={isLoading || !selectedItem}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: isLoading ? colors.gray400 : `linear-gradient(135deg, ${colors.info} 0%, #6610f2 100%)` }}
                        >
                            <Play className="w-4 h-4" />
                            시간 계산
                        </button>
                    </div>
                </div>

                {/* Selection & Input */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>제품 선택</label>
                        <select
                            value={selectedItem}
                            onChange={(e) => setSelectedItem(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        >
                            {items.map(item => (
                                <option key={item.item_code} value={item.item_code}>
                                    {item.item_code} (Rev {item.revision})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>목표 생산량</label>
                        <input
                            type="number"
                            value={targetQty}
                            onChange={(e) => setTargetQty(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>공정 수</label>
                        <div className="px-3 py-2 rounded-lg text-sm font-medium" style={{ background: colors.gray100, color: colors.gray800 }}>
                            {routing.length}개 공정
                        </div>
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 p-4 rounded-xl" style={{ background: colors.danger + '10', border: `1px solid ${colors.danger}30` }}>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" style={{ color: colors.danger }} />
                        <span style={{ color: colors.danger }}>{error}</span>
                    </div>
                </div>
            )}

            {/* Summary Cards */}
            {yieldAnalysis.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                                <Package className="w-5 h-5" style={{ color: colors.primary }} />
                            </div>
                            <span className="text-sm" style={{ color: colors.gray500 }}>첫 공정 투입량</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                            {firstOpInput.toLocaleString()} <span className="text-sm font-normal">EA</span>
                        </p>
                        <p className="text-xs mt-1" style={{ color: colors.warning }}>
                            +{((firstOpInput / targetQty - 1) * 100).toFixed(1)}% 추가 투입
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.success + '15' }}>
                                <Timer className="w-5 h-5" style={{ color: colors.success }} />
                            </div>
                            <span className="text-sm" style={{ color: colors.gray500 }}>총 셋업 시간</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                            {formatTime(totalProductionTime.setup)}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.info + '15' }}>
                                <Cpu className="w-5 h-5" style={{ color: colors.info }} />
                            </div>
                            <span className="text-sm" style={{ color: colors.gray500 }}>총 가공 시간</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                            {formatTime(totalProductionTime.processing)}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)', border: `2px solid ${colors.primary}30` }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                                <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                            </div>
                            <span className="text-sm font-semibold" style={{ color: colors.primary }}>총 생산시간</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                            {formatTime(totalProductionTime.total)}
                        </p>
                    </div>
                </div>
            )}

            {/* Process Flow Diagram */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>공정 흐름도</h3>

                <div className="flex items-center gap-2 overflow-x-auto pb-4">
                    {routing.map((step, idx) => {
                        const analysis = yieldAnalysis.find(y => y.op_seq === step.op_seq);
                        const stepTime = step.setup_time + (analysis?.required_input || targetQty) * step.cycle_time;

                        return (
                            <React.Fragment key={step.op_seq}>
                                {/* Process Node */}
                                <div
                                    className="flex-shrink-0 w-48 rounded-xl p-4 border-2 transition-all hover:shadow-lg"
                                    style={{
                                        borderColor: step.process_yield < 95 ? colors.warning : colors.success,
                                        background: 'white'
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                                            style={{
                                                background: colors.info + '15',
                                                color: colors.info
                                            }}
                                        >
                                            OP {step.op_seq}
                                        </span>
                                        <span
                                            className="text-xs font-medium"
                                            style={{ color: step.process_yield < 95 ? colors.warning : colors.success }}
                                        >
                                            {step.process_yield}%
                                        </span>
                                    </div>

                                    <h4 className="font-semibold text-sm mb-2" style={{ color: colors.gray900 }}>
                                        {step.op_name}
                                    </h4>

                                    <div className="space-y-1 text-xs" style={{ color: colors.gray600 }}>
                                        <div className="flex justify-between">
                                            <span>설비:</span>
                                            <span className="font-medium">{step.machine_code}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>셋업:</span>
                                            <span>{step.setup_time}분</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>C/T:</span>
                                            <span>{step.cycle_time}분/EA</span>
                                        </div>
                                        {analysis && (
                                            <>
                                                <div className="border-t my-1" style={{ borderColor: colors.gray200 }} />
                                                <div className="flex justify-between" style={{ color: colors.primary }}>
                                                    <span>투입:</span>
                                                    <span className="font-medium">{analysis.required_input.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between font-semibold" style={{ color: colors.info }}>
                                                    <span>소요시간:</span>
                                                    <span>{formatTime(stepTime)}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Materials */}
                                    {step.materials.length > 0 && (
                                        <div className="mt-2 pt-2 border-t" style={{ borderColor: colors.gray200 }}>
                                            <div className="flex items-center gap-1 mb-1">
                                                <Boxes className="w-3 h-3" style={{ color: colors.gray500 }} />
                                                <span className="text-xs" style={{ color: colors.gray500 }}>자재</span>
                                            </div>
                                            {step.materials.map(mat => (
                                                <div key={mat.child_item} className="text-xs" style={{ color: colors.gray600 }}>
                                                    {mat.child_item} × {mat.qty_per}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Arrow */}
                                {idx < routing.length - 1 && (
                                    <div className="flex-shrink-0">
                                        <ArrowRight className="w-6 h-6" style={{ color: colors.gray400 }} />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}

                    {/* Final Output */}
                    {routing.length > 0 && yieldAnalysis.length > 0 && (
                        <>
                            <ArrowRight className="w-6 h-6 flex-shrink-0" style={{ color: colors.gray400 }} />
                            <div
                                className="flex-shrink-0 w-40 rounded-xl p-4 text-center"
                                style={{ background: colors.success + '15', border: `2px solid ${colors.success}` }}
                            >
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: colors.success }} />
                                <p className="text-sm font-medium" style={{ color: colors.gray700 }}>완제품</p>
                                <p className="text-xl font-bold" style={{ color: colors.success }}>
                                    {targetQty.toLocaleString()} EA
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Detail Table */}
            <div className="grid grid-cols-2 gap-6">
                {/* 공정별 상세 */}
                <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <div className="p-4 border-b" style={{ borderColor: colors.gray200 }}>
                        <h3 className="font-semibold" style={{ color: colors.gray900 }}>공정별 상세 분석</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead style={{ background: colors.gray100 }}>
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray600 }}>공정</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>수율</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>투입량</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>산출량</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.info }}>소요시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {yieldAnalysis.map((row, idx) => {
                                    const step = routing.find(r => r.op_seq === row.op_seq);
                                    const stepTime = step ? step.setup_time + row.required_input * step.cycle_time : 0;
                                    return (
                                        <tr key={row.op_seq} className="border-b" style={{ borderColor: colors.gray200 }}>
                                            <td className="px-4 py-3">
                                                <span className="text-xs px-1.5 py-0.5 rounded mr-2" style={{ background: colors.info + '15', color: colors.info }}>
                                                    {row.op_seq}
                                                </span>
                                                {row.op_name}
                                            </td>
                                            <td className="px-4 py-3 text-right" style={{ color: row.process_yield < 95 ? colors.warning : colors.success }}>
                                                {row.process_yield}%
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium" style={{ color: colors.primary }}>
                                                {row.required_input.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-right" style={{ color: colors.gray700 }}>
                                                {row.expected_output.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-right font-semibold" style={{ color: colors.info }}>
                                                {formatTime(stepTime)}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {yieldAnalysis.length > 0 && (
                                    <tr style={{ background: colors.primary + '10' }}>
                                        <td colSpan={4} className="px-4 py-3 font-semibold" style={{ color: colors.gray900 }}>
                                            총 생산시간
                                        </td>
                                        <td className="px-4 py-3 text-right font-bold text-lg" style={{ color: colors.primary }}>
                                            {formatTime(totalProductionTime.total)}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 자재 소요량 */}
                <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <div className="p-4 border-b" style={{ borderColor: colors.gray200 }}>
                        <h3 className="font-semibold" style={{ color: colors.gray900 }}>자재 소요량 (수율 반영)</h3>
                    </div>
                    <div className="p-4">
                        {Object.keys(materialReqs).length > 0 ? (
                            <div className="space-y-3">
                                {Object.entries(materialReqs).map(([item, qty]) => (
                                    <div key={item} className="flex items-center justify-between p-3 rounded-lg" style={{ background: colors.gray100 }}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: colors.warning + '15' }}>
                                                <Boxes className="w-4 h-4" style={{ color: colors.warning }} />
                                            </div>
                                            <span className="font-medium" style={{ color: colors.gray800 }}>{item}</span>
                                        </div>
                                        <span className="text-lg font-bold" style={{ color: colors.gray900 }}>
                                            {qty.toLocaleString()} <span className="text-sm font-normal" style={{ color: colors.gray500 }}>EA</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8" style={{ color: colors.gray500 }}>
                                <Boxes className="w-12 h-12 mx-auto mb-3" style={{ color: colors.gray300 }} />
                                <p>시간 계산을 실행하면 자재 소요량이 표시됩니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Tip */}
            <div className="mt-6 p-4 rounded-xl" style={{ background: colors.info + '10', border: `1px solid ${colors.info}30` }}>
                <p className="text-sm" style={{ color: colors.gray700 }}>
                    💡 <strong>Tip</strong>: 공정 수율이 100% 미만인 경우 목표 생산량 달성을 위해 추가 투입이 필요합니다.
                    수율 89.26%인 경우 1,000개 목표를 위해 1,120개 투입이 필요합니다.
                </p>
            </div>
        </div>
    );
}

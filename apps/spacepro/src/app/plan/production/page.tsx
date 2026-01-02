/**
 * 생산 실적 현황 (Enhanced)
 * Production Results Dashboard with Process-level Details
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
    Package, TrendingUp, CheckCircle, Clock, AlertTriangle,
    Calendar, Layers, Edit2, Save, ChevronRight, Factory, AlertCircle
} from 'lucide-react';
import { colors, productColors, OrderProgress, ScenarioSummary } from '../simulation/types';

const API_BASE = 'http://localhost:8000';

// 지연 사유 옵션
const DELAY_REASONS = [
    { code: 'MATERIAL', label: '자재 부족' },
    { code: 'MACHINE', label: '설비 고장' },
    { code: 'QUALITY', label: '품질 이슈' },
    { code: 'MANPOWER', label: '인력 부족' },
    { code: 'SCHEDULE', label: '일정 변경' },
    { code: 'OTHER', label: '기타' }
];

// Mock 공정별 데이터 (실제로는 API에서 가져올 수 있음)
const getProcessProgress = (itemCode: string, overallProgress: number) => {
    const processes = [
        { op_seq: 1, op_name: '절단', machine: 'MC-001', planned: 100, actual: Math.round(overallProgress * 1.1), status: 'COMPLETED' },
        { op_seq: 2, op_name: '성형', machine: 'MC-002', planned: 100, actual: overallProgress, status: overallProgress >= 100 ? 'COMPLETED' : 'IN_PROGRESS' },
        { op_seq: 3, op_name: '조립', machine: 'MC-003', planned: 100, actual: Math.round(overallProgress * 0.9), status: overallProgress >= 100 ? 'COMPLETED' : overallProgress > 50 ? 'IN_PROGRESS' : 'WAITING' },
        { op_seq: 4, op_name: '검사', machine: 'MC-004', planned: 100, actual: Math.round(overallProgress * 0.8), status: overallProgress >= 100 ? 'COMPLETED' : 'WAITING' },
    ];
    return processes;
};

export default function ProductionResultsPage() {
    const [planMonth, setPlanMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });
    const [scenarios, setScenarios] = useState<ScenarioSummary[]>([]);
    const [selectedScenarioId, setSelectedScenarioId] = useState<number | null>(null);
    const [progress, setProgress] = useState<(OrderProgress & { delay_reason?: string })[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editQty, setEditQty] = useState(0);
    const [editReason, setEditReason] = useState('');

    useEffect(() => {
        fetchScenarios();
    }, [planMonth]);

    useEffect(() => {
        if (selectedScenarioId) {
            fetchProgress();
            setSelectedProduct(null);
        } else {
            setProgress([]);
        }
    }, [selectedScenarioId]);

    const fetchScenarios = async () => {
        try {
            const res = await fetch(`${API_BASE}/simulation/scenarios?plan_month=${planMonth}`);
            if (res.ok) {
                const data = await res.json();
                setScenarios(data.filter((s: ScenarioSummary) => s.status === 'CONFIRMED'));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProgress = async () => {
        if (!selectedScenarioId) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/simulation/scenarios/${selectedScenarioId}/progress`);
            if (res.ok) {
                setProgress(await res.json());
            }
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    };

    const updateProgress = async (progressId: number) => {
        try {
            const currentItem = progress.find(p => p.progress_id === progressId);
            await fetch(`${API_BASE}/simulation/progress/${progressId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    produced_qty: editQty,
                    status: editQty >= (currentItem?.planned_qty || 0) ? 'COMPLETED' : 'IN_PROGRESS'
                })
            });
            fetchProgress();
            setEditingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    // 전체 요약 계산
    const summary = {
        totalPlanned: progress.reduce((sum, p) => sum + p.planned_qty, 0),
        totalProduced: progress.reduce((sum, p) => sum + p.produced_qty, 0),
        completed: progress.filter(p => p.status === 'COMPLETED').length,
        inProgress: progress.filter(p => p.status === 'IN_PROGRESS').length,
        delayed: progress.filter(p => (p.produced_qty / p.planned_qty) < 0.5 && p.status !== 'COMPLETED').length,
        overallPct: progress.length > 0
            ? Math.round(progress.reduce((sum, p) => sum + p.produced_qty, 0) / progress.reduce((sum, p) => sum + p.planned_qty, 0) * 100)
            : 0
    };

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'URGENT': return { bg: colors.danger + '15', color: colors.danger, label: '긴급' };
            case 'HIGH': return { bg: colors.warning + '15', color: colors.warning, label: '높음' };
            default: return { bg: colors.gray200, color: colors.gray600, label: '일반' };
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'COMPLETED': return { bg: colors.success + '15', color: colors.success, label: '완료' };
            case 'IN_PROGRESS': return { bg: colors.info + '15', color: colors.info, label: '진행중' };
            default: return { bg: colors.gray200, color: colors.gray600, label: '대기' };
        }
    };

    const selectedProductData = progress.find(p => p.item_code === selectedProduct);
    const processData = selectedProduct && selectedProductData
        ? getProcessProgress(selectedProduct, Math.round((selectedProductData.produced_qty / selectedProductData.planned_qty) * 100))
        : [];

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.success + '15' }}>
                            <TrendingUp className="w-6 h-6" style={{ color: colors.success }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>생산 실적 현황</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>계획 대비 생산 진행률 관리</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: colors.gray500 }} />
                            <input
                                type="month"
                                value={planMonth}
                                onChange={(e) => { setPlanMonth(e.target.value); setSelectedScenarioId(null); }}
                                className="px-3 py-1.5 rounded-lg border text-sm"
                                style={{ borderColor: colors.gray300 }}
                            />
                        </div>
                        <select
                            value={selectedScenarioId || ''}
                            onChange={(e) => setSelectedScenarioId(parseInt(e.target.value) || null)}
                            className="px-3 py-2 rounded-lg border text-sm min-w-56"
                            style={{ borderColor: colors.gray300 }}
                        >
                            <option value="">-- 시나리오 선택 --</option>
                            {scenarios.map(s => (
                                <option key={s.scenario_id} value={s.scenario_id}>
                                    {s.scenario_name} ({s.order_count}개 오더)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {!selectedScenarioId ? (
                <div className="bg-white rounded-xl p-12 text-center" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <Layers className="w-12 h-12 mx-auto mb-4" style={{ color: colors.gray400 }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: colors.gray700 }}>시나리오를 선택하세요</h3>
                    <p className="text-sm" style={{ color: colors.gray500 }}>
                        확정된 시나리오의 생산 실적을 관리할 수 있습니다.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {/* 왼쪽: 전체 현황 + 제품 목록 */}
                    <div className="col-span-2 space-y-6">
                        {/* 전체 계획 대비 실적 */}
                        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.gray800 }}>
                                전체 계획 대비 실적
                            </h3>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div className="text-center p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                    <div className="text-2xl font-bold" style={{ color: colors.gray800 }}>{summary.totalPlanned.toLocaleString()}</div>
                                    <div className="text-sm" style={{ color: colors.gray500 }}>계획 수량</div>
                                </div>
                                <div className="text-center p-4 rounded-lg" style={{ background: colors.primary + '10' }}>
                                    <div className="text-2xl font-bold" style={{ color: colors.primary }}>{summary.totalProduced.toLocaleString()}</div>
                                    <div className="text-sm" style={{ color: colors.gray500 }}>생산 수량</div>
                                </div>
                                <div className="text-center p-4 rounded-lg" style={{ background: colors.success + '10' }}>
                                    <div className="text-2xl font-bold" style={{ color: colors.success }}>{summary.overallPct}%</div>
                                    <div className="text-sm" style={{ color: colors.gray500 }}>달성률</div>
                                </div>
                                <div className="text-center p-4 rounded-lg" style={{ background: summary.delayed > 0 ? colors.danger + '10' : colors.gray100 }}>
                                    <div className="text-2xl font-bold" style={{ color: summary.delayed > 0 ? colors.danger : colors.gray500 }}>{summary.delayed}</div>
                                    <div className="text-sm" style={{ color: colors.gray500 }}>지연 제품</div>
                                </div>
                            </div>
                            {/* 전체 진행 바 */}
                            <div className="h-6 rounded-full overflow-hidden" style={{ background: colors.gray200 }}>
                                <div
                                    className="h-full rounded-full transition-all flex items-center justify-end pr-2"
                                    style={{
                                        width: `${Math.min(summary.overallPct, 100)}%`,
                                        background: summary.overallPct >= 80 ? colors.success : summary.overallPct >= 50 ? colors.warning : colors.danger
                                    }}
                                >
                                    <span className="text-xs text-white font-medium">{summary.overallPct}%</span>
                                </div>
                            </div>
                        </div>

                        {/* 제품별 실적 목록 */}
                        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.gray800 }}>제품별 생산 실적</h3>

                            {isLoading ? (
                                <div className="text-center py-8" style={{ color: colors.gray500 }}>로딩중...</div>
                            ) : (
                                <div className="space-y-3">
                                    {progress.map((p, idx) => {
                                        const priorityStyle = getPriorityStyle(p.priority);
                                        const statusStyle = getStatusStyle(p.status);
                                        const progressPct = Math.round((p.produced_qty / p.planned_qty) * 100);
                                        const isDelayed = progressPct < 50 && p.status !== 'COMPLETED';
                                        const isSelected = selectedProduct === p.item_code;

                                        return (
                                            <div
                                                key={p.progress_id}
                                                onClick={() => setSelectedProduct(isSelected ? null : p.item_code)}
                                                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${isSelected ? 'ring-2' : ''}`}
                                                style={{
                                                    borderColor: isSelected ? colors.primary : colors.gray200,
                                                    background: isSelected ? colors.primary + '05' : 'white',
                                                    ringColor: colors.primary
                                                }}
                                            >
                                                <div className="w-3 h-12 rounded" style={{ background: productColors[idx % productColors.length] }} />
                                                <div className="w-28">
                                                    <div className="font-medium flex items-center gap-1" style={{ color: colors.gray800 }}>
                                                        {p.item_code}
                                                        {isDelayed && <AlertTriangle className="w-4 h-4" style={{ color: colors.danger }} />}
                                                    </div>
                                                    <div className="flex gap-1 mt-1">
                                                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: priorityStyle.bg, color: priorityStyle.color }}>{priorityStyle.label}</span>
                                                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: statusStyle.bg, color: statusStyle.color }}>{statusStyle.label}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span style={{ color: colors.gray600 }}>{p.produced_qty.toLocaleString()} / {p.planned_qty.toLocaleString()}</span>
                                                        <span style={{ color: progressPct >= 80 ? colors.success : progressPct >= 50 ? colors.warning : colors.danger, fontWeight: 600 }}>{progressPct}%</span>
                                                    </div>
                                                    <div className="h-2 rounded-full" style={{ background: colors.gray200 }}>
                                                        <div className="h-full rounded-full" style={{
                                                            width: `${Math.min(progressPct, 100)}%`,
                                                            background: progressPct >= 80 ? colors.success : progressPct >= 50 ? colors.warning : colors.danger
                                                        }} />
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5" style={{ color: colors.gray400, transform: isSelected ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 오른쪽: 선택 제품 상세 */}
                    <div className="space-y-6">
                        {selectedProduct && selectedProductData ? (
                            <>
                                {/* 제품 상세 정보 */}
                                <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Package className="w-5 h-5" style={{ color: colors.primary }} />
                                        <h3 className="text-lg font-semibold" style={{ color: colors.gray800 }}>{selectedProduct}</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span style={{ color: colors.gray500 }}>계획 수량</span>
                                            <span className="font-medium">{selectedProductData.planned_qty.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span style={{ color: colors.gray500 }}>생산 수량</span>
                                            <span className="font-medium" style={{ color: colors.primary }}>{selectedProductData.produced_qty.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span style={{ color: colors.gray500 }}>잔여 수량</span>
                                            <span className="font-medium" style={{ color: colors.danger }}>{(selectedProductData.planned_qty - selectedProductData.produced_qty).toLocaleString()}</span>
                                        </div>
                                        <hr style={{ borderColor: colors.gray200 }} />
                                        {/* 실적 수정 */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                value={editingId === selectedProductData.progress_id ? editQty : selectedProductData.produced_qty}
                                                onChange={(e) => { setEditingId(selectedProductData.progress_id); setEditQty(parseInt(e.target.value) || 0); }}
                                                className="flex-1 px-3 py-2 rounded border text-sm"
                                                style={{ borderColor: colors.gray300 }}
                                            />
                                            <button
                                                onClick={() => updateProgress(selectedProductData.progress_id)}
                                                className="px-3 py-2 rounded text-sm font-medium text-white"
                                                style={{ background: colors.success }}
                                            >
                                                <Save className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* 공정별 진행 현황 */}
                                <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Factory className="w-5 h-5" style={{ color: colors.info }} />
                                        <h3 className="text-lg font-semibold" style={{ color: colors.gray800 }}>공정별 진행</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {processData.map((proc) => (
                                            <div key={proc.op_seq} className="p-3 rounded-lg" style={{ background: colors.gray100 }}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <div>
                                                        <span className="font-medium text-sm">{proc.op_seq}. {proc.op_name}</span>
                                                        <span className="text-xs ml-2" style={{ color: colors.gray500 }}>({proc.machine})</span>
                                                    </div>
                                                    <span
                                                        className="text-xs px-2 py-0.5 rounded"
                                                        style={{
                                                            background: proc.status === 'COMPLETED' ? colors.success + '15' : proc.status === 'IN_PROGRESS' ? colors.info + '15' : colors.gray200,
                                                            color: proc.status === 'COMPLETED' ? colors.success : proc.status === 'IN_PROGRESS' ? colors.info : colors.gray500
                                                        }}
                                                    >
                                                        {proc.status === 'COMPLETED' ? '완료' : proc.status === 'IN_PROGRESS' ? '진행중' : '대기'}
                                                    </span>
                                                </div>
                                                <div className="h-2 rounded-full" style={{ background: colors.gray300 }}>
                                                    <div className="h-full rounded-full" style={{
                                                        width: `${Math.min(proc.actual, 100)}%`,
                                                        background: proc.status === 'COMPLETED' ? colors.success : colors.primary
                                                    }} />
                                                </div>
                                                <div className="text-xs mt-1 text-right" style={{ color: colors.gray500 }}>{proc.actual}%</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 지연 사유 (50% 미만인 경우) */}
                                {(selectedProductData.produced_qty / selectedProductData.planned_qty) < 0.5 && (
                                    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)', border: `1px solid ${colors.danger}30` }}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <AlertCircle className="w-5 h-5" style={{ color: colors.danger }} />
                                            <h3 className="text-lg font-semibold" style={{ color: colors.danger }}>지연 사유</h3>
                                        </div>
                                        <select
                                            value={editReason}
                                            onChange={(e) => setEditReason(e.target.value)}
                                            className="w-full px-3 py-2 rounded border text-sm mb-2"
                                            style={{ borderColor: colors.gray300 }}
                                        >
                                            <option value="">-- 사유 선택 --</option>
                                            {DELAY_REASONS.map(r => (
                                                <option key={r.code} value={r.code}>{r.label}</option>
                                            ))}
                                        </select>
                                        <textarea
                                            placeholder="상세 사유 입력..."
                                            className="w-full px-3 py-2 rounded border text-sm"
                                            style={{ borderColor: colors.gray300 }}
                                            rows={2}
                                        />
                                        <button
                                            className="mt-2 w-full px-3 py-2 rounded text-sm font-medium text-white"
                                            style={{ background: colors.danger }}
                                        >
                                            사유 저장
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-xl p-8 text-center" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <Package className="w-10 h-10 mx-auto mb-3" style={{ color: colors.gray400 }} />
                                <p className="text-sm" style={{ color: colors.gray500 }}>제품을 선택하면<br />상세 정보가 표시됩니다</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

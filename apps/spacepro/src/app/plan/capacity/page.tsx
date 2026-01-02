/**
 * 생산 케파 시뮬레이션 (Production Capacity Simulation)
 * 작업장별 생산능력 시뮬레이션 및 병목 분석
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    RefreshCw, AlertTriangle, Play, Settings, Activity, Save, FolderOpen, Clock
} from 'lucide-react';
import {
    colors, statusColors,
    Workcenter, DemandInput, SimulationResult, AdvancedParams, Version,
    AdvancedParamsPanel, DemandInputTable, ResultSummary,
    UtilizationCharts, DetailTable, SaveVersionModal, LoadVersionModal
} from './components';

export default function CapacitySimulationPage() {
    const [planMonth, setPlanMonth] = useState('2025-01');
    const [workcenters, setWorkcenters] = useState<Workcenter[]>([]);
    const [demands, setDemands] = useState<DemandInput[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 고급 모드 상태
    const [advancedMode, setAdvancedMode] = useState(false);
    const [advancedParams, setAdvancedParams] = useState<AdvancedParams>({
        yield_rate_override: null,
        rework_rate_override: null,
        downtime_override: null,
        efficiency_factor: 100,
        outsourcing_delay: false,
        night_shift_efficiency: 90
    });

    // 버전 관리 상태
    const [versions, setVersions] = useState<Version[]>([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showVersionList, setShowVersionList] = useState(false);
    const [versionName, setVersionName] = useState('');

    const API_BASE = 'http://localhost:8000';

    // 작업장 목록 로드
    useEffect(() => {
        fetchWorkcenters();
    }, []);

    const fetchWorkcenters = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/capacity/workcenters`);
            if (res.ok) {
                const data = await res.json();
                setWorkcenters(data);
                setDemands(data.map((wc: Workcenter) => ({
                    workcenter_code: wc.workcenter_code,
                    quantity: 0
                })));
            }
        } catch (err) {
            setError('작업장 목록을 불러오는 중 오류가 발생했습니다.');
        }
        setIsLoading(false);
    };

    // 버전 목록 조회
    const fetchVersions = async () => {
        try {
            const res = await fetch(`${API_BASE}/capacity/versions?plan_month=${planMonth}`);
            if (res.ok) {
                setVersions(await res.json());
            }
        } catch (err) {
            console.error('Failed to fetch versions');
        }
    };

    // 버전 저장
    const saveVersion = async () => {
        if (!result || !versionName.trim()) return;
        try {
            const res = await fetch(`${API_BASE}/capacity/versions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    version_name: versionName,
                    plan_month: planMonth,
                    demands: demands.filter(d => d.quantity > 0),
                    advanced_params: advancedMode ? advancedParams : null,
                    summary: result.summary,
                    workcenters: result.workcenters,
                    bottlenecks: result.bottlenecks
                })
            });
            if (res.ok) {
                setShowSaveModal(false);
                setVersionName('');
                fetchVersions();
                alert('버전이 저장되었습니다.');
            }
        } catch (err) {
            setError('버전 저장 실패');
        }
    };

    // 버전 불러오기
    const loadVersion = async (versionId: number) => {
        try {
            const res = await fetch(`${API_BASE}/capacity/versions/${versionId}`);
            if (res.ok) {
                const data = await res.json();
                setPlanMonth(data.plan_month);
                setDemands(data.demands.map((d: any) => ({
                    workcenter_code: d.workcenter_code,
                    quantity: d.quantity
                })));
                if (data.advanced_params) {
                    setAdvancedMode(true);
                    setAdvancedParams(data.advanced_params);
                } else {
                    setAdvancedMode(false);
                }
                setResult({
                    success: true,
                    plan_month: data.plan_month,
                    period: { start_date: '', end_date: '', workdays: 0, half_days: 0, total_hours: 0 },
                    summary: data.summary,
                    workcenters: data.workcenters,
                    bottlenecks: data.bottlenecks || []
                });
                setShowVersionList(false);
            }
        } catch (err) {
            setError('버전 불러오기 실패');
        }
    };

    // 수요 변경 핸들러
    const handleDemandChange = (wcCode: string, value: number) => {
        setDemands(prev =>
            prev.map(d =>
                d.workcenter_code === wcCode ? { ...d, quantity: value } : d
            )
        );
    };

    // 시뮬레이션 실행
    const runSimulation = async () => {
        setIsSimulating(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/capacity/simulate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plan_month: planMonth,
                    demands: demands.filter(d => d.quantity > 0),
                    advanced_params: advancedMode ? {
                        yield_rate_override: advancedParams.yield_rate_override,
                        rework_rate_override: advancedParams.rework_rate_override,
                        downtime_override: advancedParams.downtime_override,
                        efficiency_factor: advancedParams.efficiency_factor,
                        outsourcing_delay: advancedParams.outsourcing_delay,
                        night_shift_efficiency: advancedParams.night_shift_efficiency
                    } : null
                })
            });
            if (res.ok) {
                const data = await res.json();
                setResult(data);
            } else {
                const errData = await res.json();
                setError(errData.detail || '시뮬레이션 실행 중 오류 발생');
            }
        } catch (err) {
            setError('API 서버 연결 실패 (localhost:8000)');
        }
        setIsSimulating(false);
    };

    // 차트 데이터
    const utilizationChartData = useMemo(() => {
        if (!result) return [];
        return result.workcenters.map(wc => ({
            name: wc.workcenter_code.replace('WC-', ''),
            utilization: wc.utilization,
            fill: wc.utilization > 100 ? colors.danger : (wc.utilization > 85 ? colors.warning : colors.success)
        }));
    }, [result]);

    const pieChartData = useMemo(() => {
        if (!result) return [];
        const ok = result.workcenters.filter(wc => wc.status === 'OK').length;
        const warning = result.workcenters.filter(wc => wc.status === 'WARNING').length;
        const overload = result.workcenters.filter(wc => wc.status === 'OVERLOAD').length;
        return [
            { name: '정상', value: ok, fill: colors.success },
            { name: '주의', value: warning, fill: colors.warning },
            { name: '과부하', value: overload, fill: colors.danger },
        ].filter(d => d.value > 0);
    }, [result]);

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.info + '15' }}>
                            <Activity className="w-6 h-6" style={{ color: colors.info }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>생산 케파 시뮬레이션</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>Production Capacity Simulation</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchWorkcenters}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RefreshCw className="w-4 h-4" />
                            새로고침
                        </button>
                        <button
                            onClick={runSimulation}
                            disabled={isSimulating}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: isSimulating ? colors.gray400 : `linear-gradient(135deg, ${colors.info} 0%, #6610f2 100%)` }}
                        >
                            {isSimulating ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    시뮬레이션 중...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    시뮬레이션 실행
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setAdvancedMode(!advancedMode)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{
                                background: advancedMode ? colors.warning + '15' : colors.gray200,
                                color: advancedMode ? colors.warning : colors.gray700,
                                border: advancedMode ? `1px solid ${colors.warning}` : 'none'
                            }}
                        >
                            <Settings className="w-4 h-4" />
                            고급 모드 {advancedMode ? 'ON' : 'OFF'}
                        </button>
                        <button
                            onClick={() => { setShowSaveModal(true); }}
                            disabled={!result}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{
                                background: result ? colors.success + '15' : colors.gray200,
                                color: result ? colors.success : colors.gray400
                            }}
                        >
                            <Save className="w-4 h-4" />
                            저장
                        </button>
                        <button
                            onClick={() => { fetchVersions(); setShowVersionList(true); }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.primary + '15', color: colors.primary }}
                        >
                            <FolderOpen className="w-4 h-4" />
                            불러오기
                        </button>
                    </div>
                </div>

                {/* Plan Info */}
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>계획 월</label>
                        <input
                            type="month"
                            value={planMonth}
                            onChange={(e) => setPlanMonth(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>작업장 수</label>
                        <div className="px-3 py-2 rounded-lg text-sm font-medium" style={{ background: colors.gray100, color: colors.gray800 }}>
                            {workcenters.length}개
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>총 수요</label>
                        <div className="px-3 py-2 rounded-lg text-sm font-medium" style={{ background: colors.primary + '15', color: colors.primary }}>
                            {demands.reduce((sum, d) => sum + d.quantity, 0).toLocaleString()} EA
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>상태</label>
                        <div
                            className="px-3 py-2 rounded-lg text-sm font-medium"
                            style={{
                                background: result ? statusColors[result.summary.status] + '15' : colors.gray100,
                                color: result ? statusColors[result.summary.status] : colors.gray500
                            }}
                        >
                            {result ? result.summary.status : '시뮬레이션 필요'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Params Panel */}
            {advancedMode && (
                <AdvancedParamsPanel
                    advancedParams={advancedParams}
                    setAdvancedParams={setAdvancedParams}
                />
            )}

            {/* Error */}
            {error && (
                <div className="mb-6 p-4 rounded-xl" style={{ background: colors.danger + '10', border: `1px solid ${colors.danger}30` }}>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" style={{ color: colors.danger }} />
                        <span style={{ color: colors.danger }}>{error}</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <DemandInputTable
                    workcenters={workcenters}
                    demands={demands}
                    onDemandChange={handleDemandChange}
                />
                <ResultSummary result={result} />
            </div>

            {/* Charts */}
            {result && (
                <UtilizationCharts
                    utilizationChartData={utilizationChartData}
                    pieChartData={pieChartData}
                />
            )}

            {/* Detail Table */}
            {result && (
                <DetailTable workcenters={result.workcenters} />
            )}

            {/* Footer */}
            <div className="mt-6 p-4 rounded-xl" style={{ background: colors.gray200 }}>
                <div className="flex items-center justify-between text-sm">
                    <span style={{ color: colors.gray600 }}>
                        💡 <strong>Tip</strong>: 수요량을 입력하고 시뮬레이션을 실행하면 작업장별 가동률과 병목 여부를 분석합니다.
                    </span>
                    <div className="flex items-center gap-2" style={{ color: colors.gray500 }}>
                        <Clock className="w-4 h-4" />
                        <span>API: localhost:8000</span>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SaveVersionModal
                show={showSaveModal}
                versionName={versionName}
                onVersionNameChange={setVersionName}
                onSave={saveVersion}
                onClose={() => setShowSaveModal(false)}
            />
            <LoadVersionModal
                show={showVersionList}
                versions={versions}
                onLoad={loadVersion}
                onClose={() => setShowVersionList(false)}
            />
        </div>
    );
}

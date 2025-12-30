/**
 * 생산 케파 시뮬레이션 (Production Capacity Simulation)
 * 작업장별 생산능력 시뮬레이션 및 병목 분석
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Factory, RefreshCw, AlertTriangle, CheckCircle, Play,
    TrendingUp, BarChart3, Settings, ArrowUpRight, ArrowDownRight,
    Calendar, Users, Clock, Zap, Activity, Save, FolderOpen, X
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell,
    PieChart, Pie, Legend, RadialBarChart, RadialBar
} from 'recharts';

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

// 상태 색상
const statusColors: Record<string, string> = {
    'OK': colors.success,
    'WARNING': colors.warning,
    'OVERLOAD': colors.danger,
    'CRITICAL': colors.danger,
};

interface Workcenter {
    workcenter_code: string;
    workcenter_name: string;
    workcenter_type: string;
    department: string;
    capacity_uom: string;
    std_capacity: number;
    max_capacity: number;
}

interface DemandInput {
    workcenter_code: string;
    quantity: number;
}

interface SimulationResult {
    success: boolean;
    plan_month: string;
    period: {
        start_date: string;
        end_date: string;
        workdays: number;
        half_days: number;
        total_hours: number;
    };
    summary: {
        total_workcenters: number;
        total_demand: number;
        total_capacity: number;
        avg_utilization: number;
        bottleneck_count: number;
        status: string;
    };
    workcenters: Array<{
        workcenter_code: string;
        workcenter_name: string;
        workcenter_type: string;
        total_demand: number;
        available_capacity: number;
        uph: number;
        efficiency: number;
        work_hours: number;
        utilization: number;
        gap: number;
        is_bottleneck: boolean;
        status: string;
    }>;
    bottlenecks: Array<{
        workcenter_code: string;
        workcenter_name: string;
        utilization: number;
        shortage: number;
    }>;
}

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
    const [advancedParams, setAdvancedParams] = useState({
        yield_rate_override: null as number | null,
        rework_rate_override: null as number | null,
        downtime_override: null as number | null,
        efficiency_factor: 100,
        outsourcing_delay: false,
        night_shift_efficiency: 90
    });

    // 버전 관리 상태
    const [versions, setVersions] = useState<Array<{
        id: number; version_name: string; plan_month: string;
        created_at: string; avg_utilization: number; bottleneck_count: number;
    }>>([]);
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
                // 초기 수요 설정
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
                // 입력값 복원
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
                // 결과값 복원
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

                        {/* 버전 관리 버튼 */}
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

            {/* 고급 파라미터 패널 */}
            {advancedMode && (
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
                {/* Demand Input Table */}
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
                                                    onChange={(e) => handleDemandChange(wc.workcenter_code, parseInt(e.target.value) || 0)}
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

                {/* Result Summary */}
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
            </div>

            {/* Charts */}
            {result && (
                <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Utilization Bar Chart */}
                    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>작업장별 가동률</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={utilizationChartData} layout="vertical">
                                <XAxis type="number" domain={[0, 'auto']} tick={{ fontSize: 12, fill: colors.gray500 }} />
                                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: colors.gray500 }} width={60} />
                                <Tooltip formatter={(value: number) => `${value}%`} />
                                <Bar dataKey="utilization" radius={[0, 4, 4, 0]}>
                                    {utilizationChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded" style={{ background: colors.success }} />
                                <span className="text-xs" style={{ color: colors.gray600 }}>정상 (&lt;85%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded" style={{ background: colors.warning }} />
                                <span className="text-xs" style={{ color: colors.gray600 }}>주의 (85-100%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded" style={{ background: colors.danger }} />
                                <span className="text-xs" style={{ color: colors.gray600 }}>과부하 (&gt;100%)</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Pie Chart */}
                    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>작업장 상태 분포</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Detail Table */}
            {result && (
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
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>가용 케파</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>UPH</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>효율</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>가동률</th>
                                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>Gap</th>
                                    <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600 }}>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.workcenters.map((wc) => (
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

            {/* 버전 저장 모달 */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg" style={{ color: colors.gray900 }}>버전 저장</h3>
                            <button onClick={() => setShowSaveModal(false)}>
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="버전명 입력 (예: 1월 기준안)"
                            value={versionName}
                            onChange={(e) => setVersionName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border text-sm mb-4"
                            style={{ borderColor: colors.gray300 }}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="px-4 py-2 rounded-lg text-sm"
                                style={{ background: colors.gray200, color: colors.gray700 }}
                            >
                                취소
                            </button>
                            <button
                                onClick={saveVersion}
                                disabled={!versionName.trim()}
                                className="px-4 py-2 rounded-lg text-sm text-white"
                                style={{ background: versionName.trim() ? colors.success : colors.gray400 }}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 버전 불러오기 모달 */}
            {showVersionList && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[500px] max-h-[70vh] overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg" style={{ color: colors.gray900 }}>버전 불러오기</h3>
                            <button onClick={() => setShowVersionList(false)}>
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-[50vh]">
                            {versions.length === 0 ? (
                                <p className="text-center py-8" style={{ color: colors.gray500 }}>저장된 버전이 없습니다.</p>
                            ) : (
                                <div className="space-y-2">
                                    {versions.map(v => (
                                        <div
                                            key={v.id}
                                            onClick={() => loadVersion(v.id)}
                                            className="p-3 rounded-lg cursor-pointer hover:bg-gray-50 border"
                                            style={{ borderColor: colors.gray200 }}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium" style={{ color: colors.gray800 }}>{v.version_name}</span>
                                                <span className="text-xs" style={{ color: colors.gray500 }}>{v.plan_month}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs" style={{ color: colors.gray500 }}>{v.created_at.split('T')[0]}</span>
                                                <span className="text-xs" style={{ color: v.bottleneck_count > 0 ? colors.danger : colors.success }}>
                                                    가동률 {v.avg_utilization}% | 병목 {v.bottleneck_count}개
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

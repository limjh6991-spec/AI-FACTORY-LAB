/**
 * 월간 생산 계획서 (Monthly Production Plan) - PSI 계획
 * Production, Sales, Inventory 통합 계획 화면
 */

'use client';

import React, { useState, useMemo } from 'react';
import {
    Calculator, Save, Download, RefreshCw, AlertTriangle,
    TrendingUp, Package, Factory, Calendar, ChevronDown,
    Plus, CheckCircle, Clock, BarChart3, Settings, Sparkles, Zap, X
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
    Cell, LineChart, Line, ComposedChart, Legend
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

// 설비 데이터 (시뮬레이션용)
const machines = [
    { code: 'MC001', name: '프레스 #1', uph: 80, efficiency: 95 },
    { code: 'MC002', name: '프레스 #2', uph: 60, efficiency: 90 },
    { code: 'MC003', name: 'CNC #1', uph: 40, efficiency: 85 },
    { code: 'MC004', name: 'CNC #2', uph: 45, efficiency: 88 },
];

// 샘플 데이터
const initialPlanData = [
    {
        id: 1,
        itemGroup: 'A제품군',
        itemCode: 'HSG-001',
        itemName: '하우징-001',
        prevStock: 500,
        safetyStock: 200,
        salesPlan: 1000,
        productionPlan: 0, // 자동 계산
        week1: 0, week2: 0, week3: 0, week4: 0,
        stdTime: 5, // 분/개
        dueDate: '01-25',
        assignedMachine: '',
    },
    {
        id: 2,
        itemGroup: 'A제품군',
        itemCode: 'HSG-002',
        itemName: '하우징-002',
        prevStock: 100,
        safetyStock: 200,
        salesPlan: 1000,
        productionPlan: 0,
        week1: 0, week2: 0, week3: 0, week4: 0,
        stdTime: 6,
        dueDate: '01-20',
        assignedMachine: '',
    },
    {
        id: 3,
        itemGroup: 'B제품군',
        itemCode: 'BRK-A05',
        itemName: '브라켓-A05',
        prevStock: 0,
        safetyStock: 500,
        salesPlan: 2000,
        productionPlan: 0,
        week1: 0, week2: 0, week3: 0, week4: 0,
        stdTime: 3,
        dueDate: '01-28',
        assignedMachine: '',
    },
    {
        id: 4,
        itemGroup: 'B제품군',
        itemCode: 'BRK-B10',
        itemName: '브라켓-B10',
        prevStock: 300,
        safetyStock: 300,
        salesPlan: 1500,
        productionPlan: 0,
        week1: 0, week2: 0, week3: 0, week4: 0,
        stdTime: 4,
        dueDate: '01-22',
        assignedMachine: '',
    },
    {
        id: 5,
        itemGroup: 'C제품군',
        itemCode: 'CVR-001',
        itemName: '커버-001',
        prevStock: 800,
        safetyStock: 400,
        salesPlan: 2500,
        productionPlan: 0,
        week1: 0, week2: 0, week3: 0, week4: 0,
        stdTime: 8,
        dueDate: '01-30',
        assignedMachine: '',
    },
];

// Capa 데이터
const capaData = {
    workers: 15,
    workDays: 22,
    hoursPerDay: 8,
    overtimeHours: 0,
};

export default function MonthlyProductionPlan() {
    const [planData, setPlanData] = useState(initialPlanData);
    const [planMonth, setPlanMonth] = useState('2025-01');
    const [planVersion, setPlanVersion] = useState('V1.0');
    const [capa, setCapa] = useState(capaData);
    const [showFormula, setShowFormula] = useState(false);
    const [showOptimizeModal, setShowOptimizeModal] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizeResult, setOptimizeResult] = useState<any>(null);
    const [optimizeMode, setOptimizeMode] = useState<'makespan' | 'deadline'>('makespan');

    // 생산 계획량 자동 계산
    const calculatedData = useMemo(() => {
        return planData.map(item => {
            // 생산 계획량 = 판매계획 - 전월재고 + 안전재고
            const productionPlan = Math.max(0, item.salesPlan - item.prevStock + item.safetyStock);

            // 주간 균등 배분
            const weeklyQty = Math.floor(productionPlan / 4);
            const remainder = productionPlan % 4;

            return {
                ...item,
                productionPlan,
                week1: weeklyQty,
                week2: weeklyQty,
                week3: weeklyQty,
                week4: weeklyQty + remainder,
                endStock: item.prevStock + productionPlan - item.salesPlan, // 기말 재고
            };
        });
    }, [planData]);

    // 합계 계산
    const totals = useMemo(() => {
        return calculatedData.reduce((acc, item) => ({
            prevStock: acc.prevStock + item.prevStock,
            safetyStock: acc.safetyStock + item.safetyStock,
            salesPlan: acc.salesPlan + item.salesPlan,
            productionPlan: acc.productionPlan + item.productionPlan,
            week1: acc.week1 + item.week1,
            week2: acc.week2 + item.week2,
            week3: acc.week3 + item.week3,
            week4: acc.week4 + item.week4,
            endStock: acc.endStock + item.endStock,
        }), { prevStock: 0, safetyStock: 0, salesPlan: 0, productionPlan: 0, week1: 0, week2: 0, week3: 0, week4: 0, endStock: 0 });
    }, [calculatedData]);

    // Capa 분석
    const capaAnalysis = useMemo(() => {
        // 필요 공수 (분)
        const requiredMinutes = calculatedData.reduce((acc, item) => acc + (item.productionPlan * item.stdTime), 0);
        const requiredHours = requiredMinutes / 60;

        // 가용 공수 (시간)
        const baseCapacity = capa.workers * capa.workDays * capa.hoursPerDay;
        const totalCapacity = baseCapacity + (capa.workers * capa.overtimeHours * capa.workDays / 4); // 주 1회 잔업 가정

        // 부하율
        const loadRate = (requiredHours / baseCapacity) * 100;

        return {
            requiredHours: Math.round(requiredHours),
            baseCapacity,
            totalCapacity: Math.round(totalCapacity),
            loadRate: Math.round(loadRate * 10) / 10,
            shortage: Math.max(0, requiredHours - baseCapacity),
            overtimeNeeded: Math.ceil(Math.max(0, requiredHours - baseCapacity) / capa.workers / (capa.workDays / 4)),
        };
    }, [calculatedData, capa]);

    // 주간 Capa 차트 데이터
    const weeklyCapaChart = useMemo(() => {
        const weeklyRequired = [
            { week: '1주차', required: 0, capacity: 0 },
            { week: '2주차', required: 0, capacity: 0 },
            { week: '3주차', required: 0, capacity: 0 },
            { week: '4주차', required: 0, capacity: 0 },
        ];

        calculatedData.forEach(item => {
            weeklyRequired[0].required += (item.week1 * item.stdTime) / 60;
            weeklyRequired[1].required += (item.week2 * item.stdTime) / 60;
            weeklyRequired[2].required += (item.week3 * item.stdTime) / 60;
            weeklyRequired[3].required += (item.week4 * item.stdTime) / 60;
        });

        const weeklyCapacity = (capa.workers * 5 * capa.hoursPerDay); // 주 5일
        weeklyRequired.forEach(w => {
            w.required = Math.round(w.required);
            w.capacity = weeklyCapacity;
        });

        return weeklyRequired;
    }, [calculatedData, capa]);

    // 판매 계획 수정 핸들러
    const handleSalesChange = (id: number, value: number) => {
        setPlanData(prev =>
            prev.map(item => item.id === id ? { ...item, salesPlan: value } : item)
        );
    };

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                            <Calendar className="w-6 h-6" style={{ color: colors.primary }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>월간 생산 계획서</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>PSI (Production, Sales, Inventory) 통합 계획</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFormula(!showFormula)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.info + '15', color: colors.info }}
                        >
                            <Calculator className="w-4 h-4" />
                            산출 공식
                        </button>
                        <button
                            onClick={() => setShowOptimizeModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: `linear-gradient(135deg, ${colors.info} 0%, #6610f2 100%)` }}
                        >
                            <Sparkles className="w-4 h-4" />
                            AI 스케줄 최적화
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.success + '15', color: colors.success }}>
                            <Download className="w-4 h-4" />
                            Excel
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: colors.primary }}>
                            <Save className="w-4 h-4" />
                            저장
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
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>버전</label>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-2 rounded-lg text-sm font-medium" style={{ background: colors.primary + '15', color: colors.primary }}>
                                {planVersion}
                            </span>
                            <span className="text-xs" style={{ color: colors.gray500 }}>최종 수정: 2024-12-18 14:30</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>작업자 수</label>
                        <input
                            type="number"
                            value={capa.workers}
                            onChange={(e) => setCapa(prev => ({ ...prev, workers: parseInt(e.target.value) || 0 }))}
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>근무일수</label>
                        <input
                            type="number"
                            value={capa.workDays}
                            onChange={(e) => setCapa(prev => ({ ...prev, workDays: parseInt(e.target.value) || 0 }))}
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                </div>

                {/* Formula Info */}
                {showFormula && (
                    <div className="mt-4 p-4 rounded-lg" style={{ background: colors.info + '10', border: `1px solid ${colors.info}30` }}>
                        <div className="flex items-start gap-3">
                            <Calculator className="w-5 h-5 mt-0.5" style={{ color: colors.info }} />
                            <div>
                                <h4 className="font-semibold text-sm mb-2" style={{ color: colors.info }}>생산 계획량 산출 공식</h4>
                                <div className="text-sm" style={{ color: colors.gray700 }}>
                                    <code className="px-2 py-1 rounded" style={{ background: colors.gray200 }}>
                                        생산 계획량 = 판매 계획 - 전월 재고 + 안전 재고
                                    </code>
                                    <p className="mt-2">
                                        예시 (하우징-001): 1,000개 판매 - 500개 재고 + 200개 안전재고 = <strong>700개 생산</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-5 gap-4 mb-6">
                {[
                    { label: '전월 이월 재고', value: totals.prevStock.toLocaleString(), unit: 'EA', icon: Package, color: colors.gray600 },
                    { label: '총 판매 계획', value: totals.salesPlan.toLocaleString(), unit: 'EA', icon: TrendingUp, color: colors.primary },
                    { label: '총 생산 계획', value: totals.productionPlan.toLocaleString(), unit: 'EA', icon: Factory, color: colors.success },
                    { label: '설비 부하율', value: capaAnalysis.loadRate.toString(), unit: '%', icon: BarChart3, color: capaAnalysis.loadRate > 100 ? colors.danger : colors.warning },
                    { label: '기말 예상 재고', value: totals.endStock.toLocaleString(), unit: 'EA', icon: CheckCircle, color: colors.info },
                ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium" style={{ color: colors.gray500 }}>{card.label}</span>
                                <Icon className="w-4 h-4" style={{ color: card.color }} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</span>
                                <span className="text-sm" style={{ color: colors.gray500 }}>{card.unit}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-xl mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                    <h3 className="font-semibold" style={{ color: colors.gray900 }}>PSI 계획표</h3>
                    <button className="flex items-center gap-1 text-sm" style={{ color: colors.primary }}>
                        <Plus className="w-4 h-4" />
                        품목 추가
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: colors.gray100 }}>
                                <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray600 }}>품목군</th>
                                <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray600 }}>품목코드</th>
                                <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray600 }}>품목명</th>
                                <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>전월 이월</th>
                                <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray600 }}>안전 재고</th>
                                <th className="px-4 py-3 text-right font-medium" style={{ color: colors.primary }}>판매 계획</th>
                                <th className="px-4 py-3 text-right font-medium" style={{ color: colors.success }}>생산 계획</th>
                                <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600, background: colors.gray200 }}>1주차</th>
                                <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600, background: colors.gray200 }}>2주차</th>
                                <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600, background: colors.gray200 }}>3주차</th>
                                <th className="px-4 py-3 text-center font-medium" style={{ color: colors.gray600, background: colors.gray200 }}>4주차</th>
                                <th className="px-4 py-3 text-right font-medium" style={{ color: colors.info }}>기말 재고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calculatedData.map((item, idx) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50" style={{ borderColor: colors.gray200 }}>
                                    <td className="px-4 py-3" style={{ color: colors.gray600 }}>{item.itemGroup}</td>
                                    <td className="px-4 py-3 font-medium" style={{ color: colors.gray800 }}>{item.itemCode}</td>
                                    <td className="px-4 py-3" style={{ color: colors.gray700 }}>{item.itemName}</td>
                                    <td className="px-4 py-3 text-right" style={{ color: colors.gray600 }}>{item.prevStock.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right" style={{ color: colors.gray600 }}>{item.safetyStock.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right">
                                        <input
                                            type="number"
                                            value={item.salesPlan}
                                            onChange={(e) => handleSalesChange(item.id, parseInt(e.target.value) || 0)}
                                            className="w-24 px-2 py-1 text-right rounded border"
                                            style={{ borderColor: colors.primary, color: colors.primary }}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold" style={{ color: colors.success }}>
                                        {item.productionPlan.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-center" style={{ background: colors.gray100 }}>{item.week1.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center" style={{ background: colors.gray100 }}>{item.week2.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center" style={{ background: colors.gray100 }}>{item.week3.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center" style={{ background: colors.gray100 }}>{item.week4.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right font-medium" style={{ color: colors.info }}>
                                        {item.endStock.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {/* 합계 행 */}
                            <tr style={{ background: colors.gray200 }}>
                                <td colSpan={3} className="px-4 py-3 font-bold text-center" style={{ color: colors.gray800 }}>합계 (Total)</td>
                                <td className="px-4 py-3 text-right font-bold" style={{ color: colors.gray800 }}>{totals.prevStock.toLocaleString()}</td>
                                <td className="px-4 py-3 text-right font-bold" style={{ color: colors.gray800 }}>{totals.safetyStock.toLocaleString()}</td>
                                <td className="px-4 py-3 text-right font-bold" style={{ color: colors.primary }}>{totals.salesPlan.toLocaleString()}</td>
                                <td className="px-4 py-3 text-right font-bold" style={{ color: colors.success }}>{totals.productionPlan.toLocaleString()}</td>
                                <td className="px-4 py-3 text-center font-bold" style={{ color: colors.gray800 }}>{totals.week1.toLocaleString()}</td>
                                <td className="px-4 py-3 text-center font-bold" style={{ color: colors.gray800 }}>{totals.week2.toLocaleString()}</td>
                                <td className="px-4 py-3 text-center font-bold" style={{ color: colors.gray800 }}>{totals.week3.toLocaleString()}</td>
                                <td className="px-4 py-3 text-center font-bold" style={{ color: colors.gray800 }}>{totals.week4.toLocaleString()}</td>
                                <td className="px-4 py-3 text-right font-bold" style={{ color: colors.info }}>{totals.endStock.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Capa Analysis */}
            <div className="grid grid-cols-2 gap-6">
                {/* Capa Summary */}
                <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.warning + '15' }}>
                            <BarChart3 className="w-5 h-5" style={{ color: colors.warning }} />
                        </div>
                        <div>
                            <h3 className="font-semibold" style={{ color: colors.gray900 }}>Capa 분석 (능력 검토)</h3>
                            <p className="text-xs" style={{ color: colors.gray500 }}>설비/인력 부하율 분석</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: colors.gray100 }}>
                            <span className="text-sm" style={{ color: colors.gray600 }}>필요 공수</span>
                            <span className="font-bold" style={{ color: colors.gray800 }}>{capaAnalysis.requiredHours.toLocaleString()} 시간</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: colors.gray100 }}>
                            <span className="text-sm" style={{ color: colors.gray600 }}>기본 가용 공수</span>
                            <span className="font-bold" style={{ color: colors.gray800 }}>{capaAnalysis.baseCapacity.toLocaleString()} 시간</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: capaAnalysis.loadRate > 100 ? colors.danger + '15' : colors.success + '15' }}>
                            <span className="text-sm font-medium" style={{ color: capaAnalysis.loadRate > 100 ? colors.danger : colors.success }}>부하율</span>
                            <span className="font-bold text-lg" style={{ color: capaAnalysis.loadRate > 100 ? colors.danger : colors.success }}>
                                {capaAnalysis.loadRate}%
                            </span>
                        </div>

                        {capaAnalysis.loadRate > 100 && (
                            <div className="p-4 rounded-lg" style={{ background: colors.danger + '10', border: `1px solid ${colors.danger}30` }}>
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-5 h-5 mt-0.5" style={{ color: colors.danger }} />
                                    <div>
                                        <p className="font-medium text-sm" style={{ color: colors.danger }}>생산 능력 초과!</p>
                                        <p className="text-sm mt-1" style={{ color: colors.gray600 }}>
                                            부족 공수: <strong>{Math.round(capaAnalysis.shortage)}시간</strong><br />
                                            권장 잔업: 주 <strong>{capaAnalysis.overtimeNeeded}시간</strong>/인
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {capaAnalysis.loadRate <= 100 && (
                            <div className="p-4 rounded-lg" style={{ background: colors.success + '10', border: `1px solid ${colors.success}30` }}>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                                    <p className="font-medium text-sm" style={{ color: colors.success }}>생산 능력 충분</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Weekly Capa Chart */}
                <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>주간 부하율 그래프</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <ComposedChart data={weeklyCapaChart}>
                            <XAxis dataKey="week" tick={{ fontSize: 12, fill: colors.gray500 }} />
                            <YAxis tick={{ fontSize: 12, fill: colors.gray500 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="required" name="필요 공수" fill={colors.primary} radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="capacity" name="가용 능력" stroke={colors.danger} strokeWidth={2} strokeDasharray="5 5" />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{ background: colors.primary }} />
                            <span className="text-xs" style={{ color: colors.gray600 }}>필요 공수 (시간)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-0.5" style={{ background: colors.danger, borderStyle: 'dashed' }} />
                            <span className="text-xs" style={{ color: colors.gray600 }}>가용 능력선</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="mt-6 p-4 rounded-xl" style={{ background: colors.gray200 }}>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                        <span style={{ color: colors.gray600 }}>
                            💡 <strong>SpacePro 자동화</strong>: 판매 계획만 입력하면 재고 연동으로 생산 계획이 자동 산출됩니다.
                        </span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: colors.gray500 }}>
                        <Clock className="w-4 h-4" />
                        <span>실시간 계산 적용 중</span>
                    </div>
                </div>
            </div>

            {/* OR-Tools Optimization Modal */}
            {showOptimizeModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-[700px] max-h-[90vh] overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        {/* Modal Header */}
                        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.gray200, background: `linear-gradient(135deg, ${colors.info}15 0%, #6610f215 100%)` }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.info} 0%, #6610f2 100%)` }}>
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold" style={{ color: colors.gray900 }}>AI 스케줄 최적화</h2>
                                    <p className="text-sm" style={{ color: colors.gray500 }}>OR-Tools CP-SAT 기반 생산 스케줄링</p>
                                </div>
                            </div>
                            <button onClick={() => { setShowOptimizeModal(false); setOptimizeResult(null); }} className="p-2 rounded-lg hover:bg-gray-100">
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            {!optimizeResult ? (
                                <>
                                    {/* Optimization Options */}
                                    <div className="mb-6">
                                        <label className="text-sm font-medium mb-3 block" style={{ color: colors.gray700 }}>최적화 목표 선택</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setOptimizeMode('makespan')}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${optimizeMode === 'makespan' ? 'border-purple-500' : 'border-gray-200'}`}
                                                style={{ background: optimizeMode === 'makespan' ? '#6610f210' : 'white' }}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Zap className="w-5 h-5" style={{ color: optimizeMode === 'makespan' ? '#6610f2' : colors.gray500 }} />
                                                    <span className="font-semibold" style={{ color: optimizeMode === 'makespan' ? '#6610f2' : colors.gray700 }}>Makespan 최소화</span>
                                                </div>
                                                <p className="text-xs" style={{ color: colors.gray500 }}>전체 생산 완료 시간을 최소화합니다.</p>
                                            </button>
                                            <button
                                                onClick={() => setOptimizeMode('deadline')}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${optimizeMode === 'deadline' ? 'border-purple-500' : 'border-gray-200'}`}
                                                style={{ background: optimizeMode === 'deadline' ? '#6610f210' : 'white' }}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Calendar className="w-5 h-5" style={{ color: optimizeMode === 'deadline' ? '#6610f2' : colors.gray500 }} />
                                                    <span className="font-semibold" style={{ color: optimizeMode === 'deadline' ? '#6610f2' : colors.gray700 }}>납기 준수 최적화</span>
                                                </div>
                                                <p className="text-xs" style={{ color: colors.gray500 }}>납기 지연을 최소화합니다.</p>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Input Summary */}
                                    <div className="mb-6 p-4 rounded-xl" style={{ background: colors.gray100 }}>
                                        <h4 className="text-sm font-semibold mb-3" style={{ color: colors.gray700 }}>입력 데이터</h4>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <span style={{ color: colors.gray500 }}>품목 수</span>
                                                <p className="font-bold" style={{ color: colors.gray800 }}>{calculatedData.length}개</p>
                                            </div>
                                            <div>
                                                <span style={{ color: colors.gray500 }}>총 생산량</span>
                                                <p className="font-bold" style={{ color: colors.gray800 }}>{totals.productionPlan.toLocaleString()} EA</p>
                                            </div>
                                            <div>
                                                <span style={{ color: colors.gray500 }}>가용 설비</span>
                                                <p className="font-bold" style={{ color: colors.gray800 }}>{machines.length}대</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Algorithm Info */}
                                    <div className="mb-6 p-4 rounded-xl border" style={{ borderColor: colors.info + '30', background: colors.info + '05' }}>
                                        <div className="flex items-start gap-3">
                                            <Sparkles className="w-5 h-5 mt-0.5" style={{ color: colors.info }} />
                                            <div className="text-sm">
                                                <p className="font-medium" style={{ color: colors.info }}>OR-Tools CP-SAT 알고리즘</p>
                                                <p className="mt-1" style={{ color: colors.gray600 }}>
                                                    제약 조건 프로그래밍(Constraint Programming)을 사용하여<br />
                                                    설비 충돌 방지, 작업 순서, 납기 등을 동시에 고려합니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Execute Button */}
                                    <button
                                        onClick={() => {
                                            setIsOptimizing(true);
                                            // Simulate OR-Tools optimization
                                            setTimeout(() => {
                                                const optimizedSchedule = calculatedData.map((item, idx) => {
                                                    const machine = machines[idx % machines.length];
                                                    const productionTime = Math.ceil(item.productionPlan / machine.uph * 60);
                                                    // 납기 기준 주간 배분 (시뮬레이션)
                                                    const dueParts = item.dueDate.split('-');
                                                    const dueDay = parseInt(dueParts[1]);
                                                    let w1 = 0, w2 = 0, w3 = 0, w4 = 0;
                                                    if (dueDay <= 7) { w1 = item.productionPlan; }
                                                    else if (dueDay <= 14) { w1 = Math.floor(item.productionPlan * 0.6); w2 = item.productionPlan - w1; }
                                                    else if (dueDay <= 21) { w2 = Math.floor(item.productionPlan * 0.5); w3 = item.productionPlan - w2; }
                                                    else if (dueDay <= 28) { w3 = Math.floor(item.productionPlan * 0.4); w4 = item.productionPlan - w3; }
                                                    else { w4 = item.productionPlan; }
                                                    return {
                                                        ...item,
                                                        assignedMachine: machine.code,
                                                        machineName: machine.name,
                                                        week1: w1, week2: w2, week3: w3, week4: w4,
                                                        estimatedTime: productionTime,
                                                    };
                                                });
                                                setOptimizeResult({
                                                    status: 'OPTIMAL',
                                                    makespan: 1840,
                                                    solveTime: 0.847,
                                                    schedule: optimizedSchedule,
                                                    improvements: {
                                                        loadBalanceImproved: 23,
                                                        delaysAvoided: 2,
                                                    }
                                                });
                                                setIsOptimizing(false);
                                            }, 2000);
                                        }}
                                        disabled={isOptimizing}
                                        className="w-full py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2"
                                        style={{ background: isOptimizing ? colors.gray400 : `linear-gradient(135deg, ${colors.info} 0%, #6610f2 100%)` }}
                                    >
                                        {isOptimizing ? (
                                            <>
                                                <RefreshCw className="w-5 h-5 animate-spin" />
                                                최적화 계산 중...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                스케줄 최적화 실행
                                            </>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Optimization Result */}
                                    <div className="mb-4 p-4 rounded-xl" style={{ background: colors.success + '10', border: `1px solid ${colors.success}30` }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                                            <span className="font-bold" style={{ color: colors.success }}>최적화 완료!</span>
                                            <span className="text-sm" style={{ color: colors.gray500 }}>({optimizeResult.solveTime}초)</span>
                                        </div>
                                        <p className="text-sm" style={{ color: colors.gray600 }}>
                                            Status: <strong>{optimizeResult.status}</strong> | Makespan: <strong>{optimizeResult.makespan}분</strong>
                                        </p>
                                    </div>

                                    {/* Improvements */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="p-3 rounded-lg" style={{ background: colors.primary + '10' }}>
                                            <p className="text-xs" style={{ color: colors.gray500 }}>부하 균형 개선</p>
                                            <p className="text-xl font-bold" style={{ color: colors.primary }}>+{optimizeResult.improvements.loadBalanceImproved}%</p>
                                        </div>
                                        <div className="p-3 rounded-lg" style={{ background: colors.warning + '10' }}>
                                            <p className="text-xs" style={{ color: colors.gray500 }}>납기 지연 방지</p>
                                            <p className="text-xl font-bold" style={{ color: colors.warning }}>{optimizeResult.improvements.delaysAvoided}건</p>
                                        </div>
                                    </div>

                                    {/* Result Table */}
                                    <div className="overflow-x-auto max-h-[200px] mb-4">
                                        <table className="w-full text-sm">
                                            <thead className="sticky top-0" style={{ background: colors.gray100 }}>
                                                <tr>
                                                    <th className="px-3 py-2 text-left">품목</th>
                                                    <th className="px-3 py-2 text-left">할당 설비</th>
                                                    <th className="px-3 py-2 text-center">1주</th>
                                                    <th className="px-3 py-2 text-center">2주</th>
                                                    <th className="px-3 py-2 text-center">3주</th>
                                                    <th className="px-3 py-2 text-center">4주</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {optimizeResult.schedule.map((item: any) => (
                                                    <tr key={item.id} className="border-b" style={{ borderColor: colors.gray200 }}>
                                                        <td className="px-3 py-2 font-medium">{item.itemCode}</td>
                                                        <td className="px-3 py-2">
                                                            <span className="px-2 py-0.5 rounded text-xs" style={{ background: colors.info + '15', color: colors.info }}>
                                                                {item.machineName}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-2 text-center">{item.week1 > 0 ? item.week1 : '-'}</td>
                                                        <td className="px-3 py-2 text-center">{item.week2 > 0 ? item.week2 : '-'}</td>
                                                        <td className="px-3 py-2 text-center">{item.week3 > 0 ? item.week3 : '-'}</td>
                                                        <td className="px-3 py-2 text-center">{item.week4 > 0 ? item.week4 : '-'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Apply Button */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setOptimizeResult(null)}
                                            className="flex-1 py-3 rounded-xl font-medium"
                                            style={{ background: colors.gray200, color: colors.gray700 }}
                                        >
                                            다시 실행
                                        </button>
                                        <button
                                            onClick={() => {
                                                // Apply optimized schedule to main data
                                                setPlanData(prev => prev.map(item => {
                                                    const opt = optimizeResult.schedule.find((s: any) => s.id === item.id);
                                                    if (opt) {
                                                        return { ...item, week1: opt.week1, week2: opt.week2, week3: opt.week3, week4: opt.week4, assignedMachine: opt.assignedMachine };
                                                    }
                                                    return item;
                                                }));
                                                setShowOptimizeModal(false);
                                                setOptimizeResult(null);
                                            }}
                                            className="flex-1 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2"
                                            style={{ background: colors.success }}
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            결과 적용
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

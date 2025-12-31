/**
 * 다중 제품 생산 시뮬레이션
 * Multi-Product Production Simulation with Machine Conflict Resolution
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Play, RotateCcw, Package, AlertTriangle, Clock, CheckCircle,
    Calendar, TrendingUp, Layers, Settings
} from 'lucide-react';

const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
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

// 제품별 색상
const productColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8B500', '#58D68D'
];

interface RoutingStep {
    op_seq: number;
    op_name: string;
    machine_code: string;
    setup_time: number;
    cycle_time: number;
    process_yield: number;
}

interface ProductOrder {
    item_code: string;
    quantity: number;
    routing: RoutingStep[];
    color: string;
}

interface ScheduledTask {
    item_code: string;
    op_name: string;
    machine_code: string;
    start_time: number;
    end_time: number;
    quantity: number;
    color: string;
    hasConflict: boolean;
}

interface SimulationResult {
    schedule: ScheduledTask[];
    totalTime: number;
    conflicts: { machine: string; tasks: string[] }[];
    machineUtilization: { machine: string; utilization: number }[];
}

export default function SimulationPage() {
    const [items, setItems] = useState<string[]>([]);
    const [orders, setOrders] = useState<ProductOrder[]>([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [quantity, setQuantity] = useState(100);
    const [algorithm, setAlgorithm] = useState<'OR_TOOLS' | 'SPT' | 'FIFO'>('OR_TOOLS');
    const [isLoading, setIsLoading] = useState(false);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    const [solveTime, setSolveTime] = useState(0);

    const API_BASE = 'http://localhost:8000';

    // 제품 목록 로드
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch(`${API_BASE}/routing/items`);
            if (res.ok) {
                const data = await res.json();
                setItems(data.filter((d: any) => d.item_code.startsWith('PROD-')).map((d: any) => d.item_code));
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 제품 추가
    const addProduct = async () => {
        if (!selectedItem || orders.find(o => o.item_code === selectedItem)) return;

        try {
            const res = await fetch(`${API_BASE}/routing/${selectedItem}`);
            if (res.ok) {
                const data = await res.json();
                setOrders([...orders, {
                    item_code: selectedItem,
                    quantity,
                    routing: data.routing || [],
                    color: productColors[orders.length % productColors.length]
                }]);
                setSelectedItem('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const removeProduct = (code: string) => {
        setOrders(orders.filter(o => o.item_code !== code));
        setSimulationResult(null);
    };

    const updateQuantity = (code: string, qty: number) => {
        setOrders(orders.map(o => o.item_code === code ? { ...o, quantity: qty } : o));
    };

    // 시뮬레이션 실행 (API 호출)
    const runSimulation = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/simulation/schedule`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orders: orders.map(o => ({ item_code: o.item_code, quantity: o.quantity })),
                    algorithm
                })
            });

            if (res.ok) {
                const data = await res.json();
                setSolveTime(data.solve_time || 0);

                // API 결과를 프론트엔드 형식으로 변환
                const schedule: ScheduledTask[] = data.schedule.map((task: any) => {
                    const order = orders.find(o => o.item_code === task.item_code);
                    return {
                        ...task,
                        color: order?.color || '#888',
                        hasConflict: false
                    };
                });

                setSimulationResult({
                    schedule,
                    totalTime: data.total_time,
                    conflicts: [],
                    machineUtilization: data.machine_utilization
                });
            } else {
                const err = await res.json();
                alert(`시뮬레이션 오류: ${err.detail}`);
            }
        } catch (err) {
            console.error(err);
            alert('시뮬레이션 API 호출 실패');
        }
        setIsLoading(false);
    };

    // 시간 포맷
    const formatTime = (minutes: number) => {
        if (minutes < 60) return `${Math.round(minutes)}분`;
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        if (hours < 24) return `${hours}h ${mins}m`;
        const days = Math.floor(hours / 24);
        return `${days}일 ${hours % 24}h`;
    };

    // 간트 차트 스케일
    const chartMaxTime = simulationResult?.totalTime || 100;
    const getBarStyle = (task: ScheduledTask) => {
        const widthPct = ((task.end_time - task.start_time) / chartMaxTime) * 100;
        return {
            left: `${(task.start_time / chartMaxTime) * 100}%`,
            width: `max(${widthPct}%, 20px)`,  // 최소 20px 보장
            minWidth: '20px'
        };
    };

    // 공정별 그룹
    const groupedByProcess = useMemo(() => {
        if (!simulationResult) return [];
        const groups: Record<string, ScheduledTask[]> = {};
        simulationResult.schedule.forEach(task => {
            if (!groups[task.op_name]) groups[task.op_name] = [];
            groups[task.op_name].push(task);
        });
        return Object.entries(groups).sort((a, b) => {
            const numA = parseInt(a[0].split('_')[1]) || 0;
            const numB = parseInt(b[0].split('_')[1]) || 0;
            return numA - numB;
        });
    }, [simulationResult]);

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.info + '15' }}>
                            <TrendingUp className="w-6 h-6" style={{ color: colors.info }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>생산 시뮬레이션</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>다중 제품 스케줄링 & 설비 충돌 분석</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={runSimulation}
                            disabled={orders.length === 0 || isLoading}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: orders.length === 0 ? colors.gray400 : colors.success }}
                        >
                            <Play className="w-4 h-4" /> 시뮬레이션 실행
                        </button>
                        <button
                            onClick={() => { setOrders([]); setSimulationResult(null); }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RotateCcw className="w-4 h-4" /> 초기화
                        </button>
                    </div>
                </div>

                {/* 제품 추가 */}
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>제품 선택</label>
                        <select
                            value={selectedItem}
                            onChange={(e) => setSelectedItem(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        >
                            <option value="">제품 선택...</option>
                            {items.filter(i => !orders.find(o => o.item_code === i)).map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-32">
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>수량</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                    <div className="w-36">
                        <label className="text-xs font-medium mb-1 block" style={{ color: colors.gray600 }}>알고리즘</label>
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        >
                            <option value="OR_TOOLS">OR-Tools (최적화)</option>
                            <option value="SPT">SPT (짧은작업 우선)</option>
                            <option value="FIFO">FIFO (순차)</option>
                        </select>
                    </div>
                    <button
                        onClick={addProduct}
                        disabled={!selectedItem}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ background: selectedItem ? colors.primary : colors.gray400 }}
                    >
                        추가
                    </button>
                </div>
            </div>

            {/* 주문 목록 */}
            {orders.length > 0 && (
                <div className="bg-white rounded-xl p-4 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-4 h-4" style={{ color: colors.gray500 }} />
                        <span className="text-sm font-medium" style={{ color: colors.gray700 }}>생산 계획 ({orders.length}개 제품)</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {orders.map(order => (
                            <div
                                key={order.item_code}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                                style={{ borderColor: order.color, background: order.color + '10' }}
                            >
                                <div className="w-3 h-3 rounded-full" style={{ background: order.color }} />
                                <span className="text-sm font-medium" style={{ color: colors.gray800 }}>{order.item_code}</span>
                                <input
                                    type="number"
                                    value={order.quantity}
                                    onChange={(e) => updateQuantity(order.item_code, parseInt(e.target.value) || 0)}
                                    className="w-20 px-2 py-1 rounded border text-sm text-center"
                                    style={{ borderColor: colors.gray300 }}
                                />
                                <span className="text-xs" style={{ color: colors.gray500 }}>({order.routing.length} 공정)</span>
                                <button
                                    onClick={() => removeProduct(order.item_code)}
                                    className="text-xs px-2 py-1 rounded"
                                    style={{ background: colors.danger + '15', color: colors.danger }}
                                >
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 시뮬레이션 결과 */}
            {simulationResult && (
                <>
                    {/* 요약 카드 */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                                <span className="text-sm" style={{ color: colors.gray600 }}>총 소요시간</span>
                            </div>
                            <div className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                                {formatTime(simulationResult.totalTime)}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-5 h-5" style={{ color: colors.success }} />
                                <span className="text-sm" style={{ color: colors.gray600 }}>예상 완료</span>
                            </div>
                            <div className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                                +{Math.ceil(simulationResult.totalTime / 60 / 24)}일 후
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Settings className="w-5 h-5" style={{ color: colors.info }} />
                                <span className="text-sm" style={{ color: colors.gray600 }}>사용 설비</span>
                            </div>
                            <div className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                                {simulationResult.machineUtilization.length}대
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                {simulationResult.conflicts.length > 0 ? (
                                    <AlertTriangle className="w-5 h-5" style={{ color: colors.warning }} />
                                ) : (
                                    <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                                )}
                                <span className="text-sm" style={{ color: colors.gray600 }}>충돌</span>
                            </div>
                            <div className="text-2xl font-bold" style={{ color: simulationResult.conflicts.length > 0 ? colors.warning : colors.success }}>
                                {simulationResult.conflicts.length}건
                            </div>
                        </div>
                    </div>

                    {/* 간트 차트 */}
                    <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <h3 className="text-sm font-semibold mb-4" style={{ color: colors.gray800 }}>공정별 스케줄 (간트 차트)</h3>

                        {/* 시간 축 */}
                        <div className="flex mb-2 pl-24" style={{ color: colors.gray500 }}>
                            {[0, 25, 50, 75, 100].map(pct => (
                                <div key={pct} className="text-xs" style={{ width: '25%' }}>
                                    {formatTime((chartMaxTime * pct) / 100)}
                                </div>
                            ))}
                        </div>

                        {/* 공정별 바 */}
                        <div className="space-y-2">
                            {groupedByProcess.map(([opName, tasks]) => (
                                <div key={opName} className="flex items-center">
                                    <div className="w-24 text-xs font-medium truncate pr-2" style={{ color: colors.gray700 }}>
                                        {opName}
                                    </div>
                                    <div className="flex-1 h-8 relative rounded" style={{ background: colors.gray200 }}>
                                        {tasks.map((task, idx) => (
                                            <div
                                                key={idx}
                                                className="absolute h-full rounded flex items-center justify-center text-xs text-white font-medium overflow-hidden"
                                                style={{
                                                    ...getBarStyle(task),
                                                    background: task.hasConflict ? colors.warning : task.color,
                                                    border: task.hasConflict ? `2px solid ${colors.danger}` : 'none'
                                                }}
                                                title={`${task.item_code} (${formatTime(task.end_time - task.start_time)})`}
                                            >
                                                {task.item_code.replace('PROD-', '')}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 범례 */}
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t" style={{ borderColor: colors.gray200 }}>
                            {orders.map(order => (
                                <div key={order.item_code} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded" style={{ background: order.color }} />
                                    <span className="text-xs" style={{ color: colors.gray600 }}>{order.item_code}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 설비 가동률 */}
                    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <h3 className="text-sm font-semibold mb-4" style={{ color: colors.gray800 }}>설비 가동률</h3>
                        <div className="grid grid-cols-5 gap-3">
                            {simulationResult.machineUtilization.slice(0, 10).map(m => (
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
                </>
            )}

            {/* 빈 상태 */}
            {orders.length === 0 && !simulationResult && (
                <div className="bg-white rounded-xl p-12 text-center" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <Package className="w-16 h-16 mx-auto mb-4" style={{ color: colors.gray300 }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: colors.gray700 }}>생산 계획 추가</h3>
                    <p className="text-sm" style={{ color: colors.gray500 }}>
                        위에서 제품을 선택하고 수량을 입력하여 시뮬레이션을 시작하세요
                    </p>
                </div>
            )}
        </div>
    );
}

/**
 * 다중 제품 생산 시뮬레이션
 * Multi-Product Production Simulation with Machine Conflict Resolution
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Play, RotateCcw, Package, AlertTriangle, Clock, CheckCircle,
    Calendar, TrendingUp, Layers, Settings, Save, FolderOpen, Trash2, Edit
} from 'lucide-react';
import {
    colors, productColors,
    RoutingStep, ProductOrder, ScheduledTask, SimulationResult, ScenarioSummary
} from './types';


export default function SimulationPage() {
    const [items, setItems] = useState<string[]>([]);
    const [orders, setOrders] = useState<ProductOrder[]>([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [quantity, setQuantity] = useState(100);
    const [algorithm, setAlgorithm] = useState<'OR_TOOLS' | 'SPT' | 'FIFO'>('OR_TOOLS');
    const [isLoading, setIsLoading] = useState(false);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    const [solveTime, setSolveTime] = useState(0);

    // 계획월
    const [planMonth, setPlanMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });

    // 시나리오 관리
    const [scenarios, setScenarios] = useState<{
        scenario_id: number;
        scenario_name: string;
        algorithm: string;
        created_at: string;
        order_count: number;
        has_result: boolean;
        plan_month: string;
    }[]>([]);
    const [currentScenarioId, setCurrentScenarioId] = useState<number | null>(null);
    const [scenarioName, setScenarioName] = useState('');
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveAsNew, setSaveAsNew] = useState(true);

    const API_BASE = 'http://localhost:8000';

    // 제품 및 시나리오 목록 로드
    useEffect(() => {
        fetchItems();
    }, []);

    // 계획월 변경 시 시나리오 재로드
    useEffect(() => {
        fetchScenarios();
        setCurrentScenarioId(null);
        setScenarioName('');
        setOrders([]);
        setSimulationResult(null);
    }, [planMonth]);

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

    const fetchScenarios = async () => {
        try {
            const res = await fetch(`${API_BASE}/simulation/scenarios?plan_month=${planMonth}`);
            if (res.ok) setScenarios(await res.json());
        } catch (err) {
            console.error(err);
        }
    };

    const loadScenario = async (id: number) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/simulation/scenarios/${id}`);
            if (res.ok) {
                const data = await res.json();
                setCurrentScenarioId(id);
                setScenarioName(data.scenario_name);
                setAlgorithm(data.algorithm || 'OR_TOOLS');

                // orders 복원 - routing 정보 다시 로드
                const loadedOrders: ProductOrder[] = [];
                for (const o of data.orders || []) {
                    const routingRes = await fetch(`${API_BASE}/routing/${o.item_code}`);
                    if (routingRes.ok) {
                        const routingData = await routingRes.json();
                        loadedOrders.push({
                            item_code: o.item_code,
                            quantity: o.quantity,
                            routing: routingData.routing || [],
                            color: productColors[loadedOrders.length % productColors.length],
                            priority: o.priority || 'NORMAL'
                        });
                    }
                }
                setOrders(loadedOrders);

                // 저장된 시뮬레이션 결과 복원
                if (data.result && data.result.schedule) {
                    const restoredSchedule = data.result.schedule.map((task: any, idx: number) => ({
                        ...task,
                        color: loadedOrders.find(o => o.item_code === task.item_code)?.color || productColors[idx % productColors.length],
                        hasConflict: task.hasConflict || false
                    }));
                    setSimulationResult({
                        schedule: restoredSchedule,
                        totalTime: data.result.totalTime || 0,
                        conflicts: data.result.conflicts || [],
                        machineUtilization: data.result.machineUtilization || []
                    });
                    setSolveTime(0);  // 이전 결과 로드 표시
                } else {
                    setSimulationResult(null);
                }
            } else {
                alert('시나리오를 불러올 수 없습니다.');
            }
        } catch (err) {
            console.error(err);
            alert('시나리오 불러오기 실패');
        }
        setIsLoading(false);
    };

    const saveScenario = async () => {
        if (!scenarioName.trim()) return alert('시나리오 이름을 입력하세요');
        try {
            const payload = {
                scenario_name: scenarioName,
                orders: orders.map(o => ({ item_code: o.item_code, quantity: o.quantity, priority: o.priority })),
                algorithm,
                result: simulationResult,
                plan_month: planMonth
            };
            // saveAsNew가 true이면 항상 POST(새로 저장), false이고 currentScenarioId가 있으면 PUT(덩어쓰기)
            const isUpdate = !saveAsNew && currentScenarioId;
            const method = isUpdate ? 'PUT' : 'POST';
            const url = isUpdate
                ? `${API_BASE}/simulation/scenarios/${currentScenarioId}`
                : `${API_BASE}/simulation/scenarios`;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                setCurrentScenarioId(data.scenario_id);
                setShowSaveModal(false);
                fetchScenarios();
                alert(isUpdate ? '시나리오가 수정되었습니다.' : '새 시나리오가 저장되었습니다.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteScenario = async (id: number) => {
        if (!confirm('시나리오를 삭제하시겠습니까?')) return;
        try {
            await fetch(`${API_BASE}/simulation/scenarios/${id}`, { method: 'DELETE' });
            if (currentScenarioId === id) {
                setCurrentScenarioId(null);
                setScenarioName('');
            }
            fetchScenarios();
        } catch (err) {
            console.error(err);
        }
    };

    // 시나리오 확정 (진행 추적 시작)
    const confirmScenario = async () => {
        if (!currentScenarioId) return alert('시나리오를 먼저 저장하세요');
        try {
            const res = await fetch(`${API_BASE}/simulation/scenarios/${currentScenarioId}/confirm`, { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                alert(`${data.confirmed_orders}개 오더가 확정되었습니다.`);
                fetchScenarios();
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 이월 오더 가져오기
    const fetchCarryOver = async () => {
        try {
            const res = await fetch(`${API_BASE}/simulation/carry-over/${planMonth}`);
            if (res.ok) {
                const carryOvers = await res.json();
                if (carryOvers.length === 0) {
                    alert('이월할 오더가 없습니다.');
                    return;
                }
                if (!confirm(`${carryOvers.length}개 이월 오더를 추가하시겠습니까?`)) return;

                // 각 이월 오더를 추가
                for (const c of carryOvers) {
                    if (!orders.find(o => o.item_code === c.item_code)) {
                        const routingRes = await fetch(`${API_BASE}/routing/${c.item_code}`);
                        if (routingRes.ok) {
                            const routingData = await routingRes.json();
                            setOrders(prev => [...prev, {
                                item_code: c.item_code,
                                quantity: c.remaining_qty,
                                routing: routingData.routing || [],
                                color: productColors[prev.length % productColors.length],
                                priority: c.priority
                            }]);
                        }
                    }
                }
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
                    color: productColors[orders.length % productColors.length],
                    priority: 'NORMAL'
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

    const updatePriority = (code: string, priority: 'NORMAL' | 'HIGH' | 'URGENT') => {
        setOrders(orders.map(o => o.item_code === code ? { ...o, priority } : o));
    };

    // 시뮬레이션 실행 (API 호출)
    const runSimulation = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/simulation/schedule`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orders: orders.map(o => ({ item_code: o.item_code, quantity: o.quantity, priority: o.priority })),
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
                            <p className="text-sm" style={{ color: colors.gray500 }}>다중 제품 스케줄링 &amp; 설비 충돌 분석</p>
                        </div>
                        {/* 계획월 선택 */}
                        <div className="ml-6 flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: colors.gray500 }} />
                            <span className="text-sm" style={{ color: colors.gray600 }}>계획월:</span>
                            <input
                                type="month"
                                value={planMonth}
                                onChange={(e) => setPlanMonth(e.target.value)}
                                className="px-3 py-1.5 rounded-lg border text-sm font-medium"
                                style={{ borderColor: colors.primary, color: colors.primary }}
                            />
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
                            onClick={() => setShowSaveModal(true)}
                            disabled={orders.length === 0}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: orders.length === 0 ? colors.gray400 : colors.primary }}
                        >
                            <Save className="w-4 h-4" /> 저장
                        </button>
                        <button
                            onClick={confirmScenario}
                            disabled={!currentScenarioId || !simulationResult}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: (!currentScenarioId || !simulationResult) ? colors.gray400 : colors.info }}
                            title="시나리오 확정 후 생산 진행"
                        >
                            <CheckCircle className="w-4 h-4" /> 확정
                        </button>
                        <button
                            onClick={fetchCarryOver}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.warning + '15', color: colors.warning }}
                            title="전월 미완료 오더 가져오기"
                        >
                            <Layers className="w-4 h-4" /> 이월 가져오기
                        </button>
                        <button
                            onClick={() => { setOrders([]); setSimulationResult(null); setCurrentScenarioId(null); setScenarioName(''); }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RotateCcw className="w-4 h-4" /> 초기화
                        </button>
                    </div>
                </div>

                {/* 시나리오 불러오기 - 드롭다운 방식 */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{ borderColor: colors.gray200 }}>
                    <FolderOpen className="w-4 h-4" style={{ color: colors.gray500 }} />
                    <span className="text-sm" style={{ color: colors.gray600 }}>시나리오:</span>
                    <select
                        value={currentScenarioId || ''}
                        onChange={(e) => {
                            const id = parseInt(e.target.value);
                            if (id) loadScenario(id);
                            else {
                                setCurrentScenarioId(null);
                                setScenarioName('');
                                setOrders([]);
                                setSimulationResult(null);
                            }
                        }}
                        className="px-3 py-2 rounded-lg border text-sm min-w-48"
                        style={{ borderColor: colors.gray300 }}
                        disabled={isLoading}
                    >
                        <option value="">-- 시나리오 선택 --</option>
                        {scenarios.map(s => (
                            <option key={s.scenario_id} value={s.scenario_id}>
                                {s.scenario_name} ({s.algorithm}, 제품 {s.order_count}개{s.has_result ? ', 결과O' : ''})
                            </option>
                        ))}
                    </select>
                    {isLoading && <span className="text-xs" style={{ color: colors.gray500 }}>로딩중...</span>}
                    {currentScenarioId && (
                        <button
                            onClick={() => deleteScenario(currentScenarioId)}
                            className="text-xs px-2 py-1 rounded hover:bg-red-100"
                            style={{ color: colors.danger }}
                        >
                            삭제
                        </button>
                    )}
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
                                <select
                                    value={order.priority}
                                    onChange={(e) => updatePriority(order.item_code, e.target.value as 'NORMAL' | 'HIGH' | 'URGENT')}
                                    className="text-xs px-2 py-1 rounded border font-medium"
                                    style={{
                                        borderColor: order.priority === 'URGENT' ? colors.danger : order.priority === 'HIGH' ? colors.warning : colors.gray300,
                                        background: order.priority === 'URGENT' ? colors.danger + '15' : order.priority === 'HIGH' ? colors.warning + '15' : 'white',
                                        color: order.priority === 'URGENT' ? colors.danger : order.priority === 'HIGH' ? colors.warning : colors.gray600
                                    }}
                                >
                                    <option value="NORMAL">일반</option>
                                    <option value="HIGH">높음</option>
                                    <option value="URGENT">긴급</option>
                                </select>
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

            {/* 저장 모달 */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96" style={{ boxShadow: '0 20px 60px rgba(0,0,0,.2)' }}>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.gray900 }}>
                            시나리오 저장
                        </h3>

                        {/* 저장 모드 선택 */}
                        {currentScenarioId && (
                            <div className="mb-4 p-3 rounded-lg" style={{ background: colors.gray100 }}>
                                <div className="text-xs mb-2" style={{ color: colors.gray600 }}>저장 방식:</div>
                                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="saveMode"
                                        checked={saveAsNew}
                                        onChange={() => setSaveAsNew(true)}
                                    />
                                    <span className="text-sm" style={{ color: colors.gray800 }}>새 시나리오로 저장</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="saveMode"
                                        checked={!saveAsNew}
                                        onChange={() => setSaveAsNew(false)}
                                    />
                                    <span className="text-sm" style={{ color: colors.gray800 }}>
                                        기존 시나리오 덩어쓰기 ({scenarios.find(s => s.scenario_id === currentScenarioId)?.scenario_name})
                                    </span>
                                </label>
                            </div>
                        )}

                        <input
                            type="text"
                            value={scenarioName}
                            onChange={(e) => setScenarioName(e.target.value)}
                            placeholder="시나리오 이름"
                            className="w-full px-3 py-2 rounded-lg border text-sm mb-4"
                            style={{ borderColor: colors.gray300 }}
                        />
                        <div className="text-sm mb-4" style={{ color: colors.gray600 }}>
                            제품: {orders.length}개, 알고리즘: {algorithm}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={saveScenario}
                                className="flex-1 py-2 rounded-lg text-sm font-medium text-white"
                                style={{ background: colors.primary }}
                            >
                                {saveAsNew || !currentScenarioId ? '새로 저장' : '덩어쓰기'}
                            </button>
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="flex-1 py-2 rounded-lg text-sm font-medium"
                                style={{ background: colors.gray200, color: colors.gray700 }}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

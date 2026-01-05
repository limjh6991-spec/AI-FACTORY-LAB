/**
 * useSimulation Hook
 * 시뮬레이션 상태 및 API 로직 관리
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { productColors, ProductOrder, ScheduledTask, SimulationResult, ScenarioSummary } from './types';

const API_BASE = 'http://localhost:8000';

export function useSimulation() {
    // 기본 상태
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
    const [scenarios, setScenarios] = useState<ScenarioSummary[]>([]);
    const [currentScenarioId, setCurrentScenarioId] = useState<number | null>(null);
    const [scenarioName, setScenarioName] = useState('');
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveAsNew, setSaveAsNew] = useState(true);

    // API 호출 함수들
    const fetchItems = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/routing/items`);
            if (res.ok) {
                const data = await res.json();
                setItems(data.filter((d: any) => d.item_code.startsWith('PROD-')).map((d: any) => d.item_code));
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const fetchScenarios = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/simulation/scenarios?plan_month=${planMonth}`);
            if (res.ok) setScenarios(await res.json());
        } catch (err) {
            console.error(err);
        }
    }, [planMonth]);

    const loadScenario = useCallback(async (id: number) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/simulation/scenarios/${id}`);
            if (res.ok) {
                const data = await res.json();
                setCurrentScenarioId(id);
                setScenarioName(data.scenario_name);
                setAlgorithm(data.algorithm || 'OR_TOOLS');

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
                    setSolveTime(0);
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
    }, []);

    const saveScenario = useCallback(async () => {
        if (!scenarioName.trim()) return alert('시나리오 이름을 입력하세요');
        try {
            const payload = {
                scenario_name: scenarioName,
                orders: orders.map(o => ({
                    item_code: o.item_code,
                    quantity: o.quantity,
                    priority: o.priority,
                    source_progress_id: o.source_progress_id
                })),
                algorithm,
                result: simulationResult,
                plan_month: planMonth
            };
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
    }, [scenarioName, orders, algorithm, simulationResult, planMonth, saveAsNew, currentScenarioId, fetchScenarios]);

    const deleteScenario = useCallback(async (id: number) => {
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
    }, [currentScenarioId, fetchScenarios]);

    const confirmScenario = useCallback(async () => {
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
    }, [currentScenarioId, fetchScenarios]);

    const fetchCarryOver = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/simulation/carry-over/${planMonth}`);
            if (res.ok) {
                const carryOvers = await res.json();
                if (carryOvers.length === 0) {
                    alert('이월할 오더가 없습니다.');
                    return;
                }
                if (!confirm(`${carryOvers.length}개 이월 오더를 추가하시겠습니까?`)) return;

                for (const c of carryOvers) {
                    const routingRes = await fetch(`${API_BASE}/routing/${c.item_code}`);
                    if (routingRes.ok) {
                        const routingData = await routingRes.json();
                        setOrders(prev => {
                            if (prev.find(o => o.item_code === c.item_code)) return prev;
                            return [...prev, {
                                item_code: c.item_code,
                                quantity: c.remaining_qty,
                                routing: routingData.routing || [],
                                color: productColors[prev.length % productColors.length],
                                priority: c.priority,
                                source_progress_id: c.progress_id
                            }];
                        });
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }, [planMonth]);

    const addProduct = useCallback(async () => {
        if (!selectedItem || orders.find(o => o.item_code === selectedItem)) return;

        try {
            const res = await fetch(`${API_BASE}/routing/${selectedItem}`);
            if (res.ok) {
                const data = await res.json();
                setOrders(prev => [...prev, {
                    item_code: selectedItem,
                    quantity,
                    routing: data.routing || [],
                    color: productColors[prev.length % productColors.length],
                    priority: 'NORMAL'
                }]);
                setSelectedItem('');
            }
        } catch (err) {
            console.error(err);
        }
    }, [selectedItem, quantity, orders]);

    const removeProduct = useCallback((code: string) => {
        setOrders(prev => prev.filter(o => o.item_code !== code));
        setSimulationResult(null);
    }, []);

    const updateQuantity = useCallback((code: string, qty: number) => {
        setOrders(prev => prev.map(o => o.item_code === code ? { ...o, quantity: qty } : o));
    }, []);

    const updatePriority = useCallback((code: string, priority: 'NORMAL' | 'HIGH' | 'URGENT') => {
        setOrders(prev => prev.map(o => o.item_code === code ? { ...o, priority } : o));
    }, []);

    const runSimulation = useCallback(async () => {
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

                const schedule: ScheduledTask[] = data.schedule.map((task: any) => {
                    const order = orders.find(o => o.item_code === task.item_code);
                    return { ...task, color: order?.color || '#888', hasConflict: false };
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
    }, [orders, algorithm]);

    // 유틸리티
    const formatTime = useCallback((minutes: number) => {
        if (minutes < 60) return `${Math.round(minutes)}분`;
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        if (hours < 24) return `${hours}h ${mins}m`;
        const days = Math.floor(hours / 24);
        return `${days}일 ${hours % 24}h`;
    }, []);

    const chartMaxTime = simulationResult?.totalTime || 100;

    const getBarStyle = useCallback((task: ScheduledTask) => {
        const widthPct = ((task.end_time - task.start_time) / chartMaxTime) * 100;
        return {
            left: `${(task.start_time / chartMaxTime) * 100}%`,
            width: `max(${widthPct}%, 20px)`,
            minWidth: '20px'
        };
    }, [chartMaxTime]);

    // 초기 로드
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        fetchScenarios();
        setCurrentScenarioId(null);
        setScenarioName('');
        setOrders([]);
        setSimulationResult(null);
    }, [planMonth, fetchScenarios]);

    return {
        // 상태
        items, orders, selectedItem, quantity, algorithm,
        isLoading, simulationResult, solveTime, planMonth,
        scenarios, currentScenarioId, scenarioName, showSaveModal, saveAsNew,
        chartMaxTime,

        // 상태 세터
        setSelectedItem, setQuantity, setAlgorithm, setPlanMonth,
        setScenarioName, setShowSaveModal, setSaveAsNew,

        // 액션
        fetchScenarios, loadScenario, saveScenario, deleteScenario,
        confirmScenario, fetchCarryOver, addProduct, removeProduct,
        updateQuantity, updatePriority, runSimulation,

        // 유틸리티
        formatTime, getBarStyle
    };
}

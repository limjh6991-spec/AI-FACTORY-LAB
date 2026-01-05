/**
 * 다중 제품 생산 시뮬레이션
 * Multi-Product Production Simulation with Machine Conflict Resolution
 * 
 * Refactored: 2026-01-05
 * - Extracted useSimulation hook for state management
 * - Extracted UI components for better maintainability
 */

'use client';

import React, { useMemo } from 'react';
import {
    Play, RotateCcw, Package, AlertTriangle, Clock, CheckCircle,
    Calendar, TrendingUp, Layers, Save, FolderOpen, Plus
} from 'lucide-react';
import { colors, ScheduledTask } from './types';
import { useSimulation } from './useSimulation';
import { GanttChart, MachineUtilization, OrderList, ScenarioModal } from './components';

export default function SimulationPage() {
    const {
        // 상태
        items, orders, selectedItem, quantity, algorithm,
        isLoading, simulationResult, solveTime, planMonth,
        scenarios, currentScenarioId, scenarioName, showSaveModal, saveAsNew,
        chartMaxTime,
        // 상태 세터
        setSelectedItem, setQuantity, setAlgorithm, setPlanMonth,
        setScenarioName, setShowSaveModal, setSaveAsNew,
        // 액션
        loadScenario, saveScenario, deleteScenario,
        confirmScenario, fetchCarryOver, addProduct, removeProduct,
        updateQuantity, updatePriority, runSimulation,
        // 유틸리티
        formatTime, getBarStyle
    } = useSimulation();

    // 공정별 그룹
    const groupedByProcess = useMemo(() => {
        if (!simulationResult) return [];
        const groups: Record<string, ScheduledTask[]> = {};
        simulationResult.schedule.forEach(task => {
            if (!groups[task.op_name]) groups[task.op_name] = [];
            groups[task.op_name].push(task);
        });
        return Object.entries(groups);
    }, [simulationResult]);

    // 제품별 그룹
    const groupedByProduct = useMemo(() => {
        if (!simulationResult) return [];
        const groups: Record<string, ScheduledTask[]> = {};
        simulationResult.schedule.forEach(task => {
            if (!groups[task.item_code]) groups[task.item_code] = [];
            groups[task.item_code].push(task);
        });
        // 시작 시간 순으로 정렬
        Object.values(groups).forEach(tasks => tasks.sort((a, b) => a.start_time - b.start_time));
        return Object.entries(groups);
    }, [simulationResult]);

    const handleReset = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* 헤더 */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                            <TrendingUp className="w-6 h-6" style={{ color: colors.primary }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>생산 시뮬레이션</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>다중 제품 동시 생산 스케줄 최적화</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* 계획월 선택 */}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: colors.gray500 }} />
                            <input
                                type="month"
                                value={planMonth}
                                onChange={(e) => setPlanMonth(e.target.value)}
                                className="px-3 py-1.5 rounded-lg border text-sm"
                                style={{ borderColor: colors.gray300 }}
                            />
                        </div>
                        <button
                            onClick={runSimulation}
                            disabled={orders.length === 0 || isLoading}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all"
                            style={{ background: orders.length === 0 ? colors.gray400 : colors.primary }}
                        >
                            <Play className="w-4 h-4" /> {isLoading ? '실행중...' : '시뮬레이션'}
                        </button>
                        <button
                            onClick={() => setShowSaveModal(true)}
                            disabled={orders.length === 0}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: orders.length === 0 ? colors.gray400 : colors.success }}
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
                            <Layers className="w-4 h-4" /> 이월
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RotateCcw className="w-4 h-4" /> 초기화
                        </button>
                    </div>
                </div>

                {/* 시나리오 선택 */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{ borderColor: colors.gray200 }}>
                    <FolderOpen className="w-4 h-4" style={{ color: colors.gray500 }} />
                    <span className="text-sm" style={{ color: colors.gray600 }}>시나리오:</span>
                    <select
                        value={currentScenarioId || ''}
                        onChange={(e) => {
                            const id = parseInt(e.target.value);
                            if (id) loadScenario(id);
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

                {/* 제품 추가 폼 */}
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
                            <option value="SPT">SPT (최단시간)</option>
                            <option value="FIFO">FIFO (순차)</option>
                        </select>
                    </div>
                    <button
                        onClick={addProduct}
                        disabled={!selectedItem}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ background: !selectedItem ? colors.gray400 : colors.primary }}
                    >
                        <Plus className="w-4 h-4" /> 추가
                    </button>
                </div>

                {/* 제품 목록 */}
                <OrderList
                    orders={orders}
                    onRemove={removeProduct}
                    onUpdateQuantity={updateQuantity}
                    onUpdatePriority={updatePriority}
                />
            </div>

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
                            <div className="text-2xl font-bold" style={{ color: colors.gray800 }}>
                                {formatTime(simulationResult.totalTime)}
                            </div>
                            {solveTime > 0 && (
                                <div className="text-xs mt-1" style={{ color: colors.gray500 }}>
                                    계산: {solveTime.toFixed(2)}초
                                </div>
                            )}
                        </div>
                        <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Package className="w-5 h-5" style={{ color: colors.info }} />
                                <span className="text-sm" style={{ color: colors.gray600 }}>생산 제품</span>
                            </div>
                            <div className="text-2xl font-bold" style={{ color: colors.gray800 }}>
                                {orders.length}개
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5" style={{ color: colors.success }} />
                                <span className="text-sm" style={{ color: colors.gray600 }}>작업</span>
                            </div>
                            <div className="text-2xl font-bold" style={{ color: colors.gray800 }}>
                                {simulationResult.schedule.length}개
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
                    <GanttChart
                        groupedByProcess={groupedByProcess}
                        groupedByProduct={groupedByProduct}
                        orders={orders}
                        chartMaxTime={chartMaxTime}
                        formatTime={formatTime}
                        getBarStyle={getBarStyle}
                    />

                    {/* 설비 가동률 */}
                    <MachineUtilization data={simulationResult.machineUtilization} />
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
            <ScenarioModal
                show={showSaveModal}
                scenarioName={scenarioName}
                saveAsNew={saveAsNew}
                currentScenarioId={currentScenarioId}
                onClose={() => setShowSaveModal(false)}
                onSave={saveScenario}
                onNameChange={setScenarioName}
                onSaveAsNewChange={setSaveAsNew}
            />
        </div>
    );
}

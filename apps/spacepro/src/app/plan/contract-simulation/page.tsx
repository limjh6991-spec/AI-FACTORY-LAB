/**
 * 계약 기반 생산계획 시뮬레이션
 * Contract-Based Production Scheduling (O궁)
 */
'use client';

import React, { useState, useEffect } from 'react';
import {
    FileText, Play, RefreshCw, Calendar, Users, Clock,
    Factory, ChevronDown, BarChart3, Settings
} from 'lucide-react';

interface Contract {
    contno: string;
    macode: string;
    maname: string;
}

interface ScheduleItem {
    prcode: string;
    operation: string;
    equipment: string;
    workers: number;
    start_time: number;
    end_time: number;
    duration: number;
    prcd_ratio: string;
}

interface ScheduleResult {
    contno: string;
    quantity: number;
    total_time_hours: number;
    total_time_days: number;
    schedule: ScheduleItem[];
    equipment_utilization: { equipment: string; work_time: number; utilization: number }[];
}

export default function ContractSimulationPage() {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [selectedContract, setSelectedContract] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ScheduleResult | null>(null);

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        try {
            const res = await fetch('/api/simulation/contracts');
            if (res.ok) {
                const data = await res.json();
                setContracts(data);
                if (data.length > 0) setSelectedContract(data[0].contno);
            }
        } catch (e) {
            console.error('Failed to fetch contracts:', e);
        }
    };

    const runSimulation = async () => {
        if (!selectedContract) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/simulation/contract-schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contno: selectedContract, quantity })
            });
            if (res.ok) {
                setResult(await res.json());
            }
        } catch (e) {
            console.error('Simulation failed:', e);
        }
        setIsLoading(false);
    };

    // Gantt 색상
    const getColor = (index: number) => {
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
        return colors[index % colors.length];
    };

    const selectedContractInfo = contracts.find(c => c.contno === selectedContract);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Factory className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">계약 기반 생산 시뮬레이션</h1>
                        <p className="text-sm text-gray-500">Contract-Based Production Scheduling</p>
                    </div>
                </div>
            </div>

            {/* Control Panel */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-wrap gap-4 items-end">
                    {/* Contract Select */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">계약 선택</label>
                        <div className="relative">
                            <select
                                value={selectedContract}
                                onChange={(e) => setSelectedContract(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {contracts.map(c => (
                                    <option key={c.contno} value={c.contno}>
                                        {c.contno} - {c.macode} ({c.maname})
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="w-32">
                        <label className="block text-sm font-medium text-gray-700 mb-2">수량</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min={1}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Run Button */}
                    <button
                        onClick={runSimulation}
                        disabled={isLoading || !selectedContract}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all"
                    >
                        {isLoading ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                            <Play className="w-5 h-5" />
                        )}
                        시뮬레이션 실행
                    </button>
                </div>
            </div>

            {/* Results */}
            {result && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">계약</p>
                                    <p className="text-lg font-bold">{result.contno}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <Settings className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">공정 수</p>
                                    <p className="text-lg font-bold">{result.schedule.length}개</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">총 작업시간</p>
                                    <p className="text-lg font-bold">{result.total_time_hours.toLocaleString()}시간</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">예상 소요일</p>
                                    <p className="text-lg font-bold">{result.total_time_days.toLocaleString()}일</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gantt Chart - Day-Based View */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                            공정 간트 차트 (일 기준)
                        </h2>
                        <div className="overflow-x-auto">
                            {(() => {
                                // 총 일수 계산
                                const totalDays = Math.ceil(result.total_time_days);
                                const days = Array.from({ length: totalDays }, (_, i) => i + 1);

                                // 다중 제품 가데이터 생성
                                const products = [
                                    {
                                        name: selectedContractInfo?.maname || 'O궁',
                                        schedule: result.schedule,
                                        color: '#3B82F6'
                                    },
                                    {
                                        name: '제품B (가데이터)',
                                        schedule: result.schedule.map(s => ({
                                            ...s,
                                            start_time: s.start_time + totalDays * 4,
                                            end_time: s.end_time + totalDays * 4
                                        })),
                                        color: '#10B981'
                                    },
                                    {
                                        name: '제품C (가데이터)',
                                        schedule: result.schedule.map(s => ({
                                            ...s,
                                            start_time: s.start_time + totalDays * 8,
                                            end_time: s.end_time + totalDays * 8
                                        })),
                                        color: '#F59E0B'
                                    },
                                ];

                                // 전체 기간 확장 (다중 제품 고려)
                                const extendedTotalDays = Math.ceil((result.total_time_hours + totalDays * 8 * 2) / 8);
                                const extendedDays = Array.from({ length: Math.min(extendedTotalDays, 150) }, (_, i) => i + 1);

                                return (
                                    <div className="min-w-[1000px]">
                                        {/* Header: 날짜들 */}
                                        <div className="flex border-b-2 border-gray-300">
                                            <div className="w-32 flex-shrink-0 px-2 py-2 font-bold text-sm text-gray-700 border-r bg-gray-50">

                                            </div>
                                            <div className="flex-1 flex">
                                                {extendedDays.map(day => (
                                                    <div
                                                        key={day}
                                                        className="flex-1 min-w-[40px] px-1 py-2 text-center text-xs font-bold text-gray-600 border-r bg-gray-50"
                                                    >
                                                        {day}일
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 공정 표시 행 (날짜별) */}
                                        <div className="flex border-b-2 border-gray-400 bg-gray-100">
                                            <div className="w-32 flex-shrink-0 px-2 py-1 font-medium text-xs text-gray-600 border-r flex items-center">
                                                공정
                                            </div>
                                            <div className="flex-1 flex">
                                                {extendedDays.map(day => {
                                                    const dayStart = (day - 1) * 8;
                                                    const dayEnd = day * 8;

                                                    // 기본공정 추출 (operation의 첫 글자)
                                                    const activeProcesses = new Set<string>();
                                                    products.forEach(product => {
                                                        product.schedule.forEach(item => {
                                                            if (item.start_time < dayEnd && item.end_time > dayStart) {
                                                                activeProcesses.add(item.operation.charAt(0).toUpperCase());
                                                            }
                                                        });
                                                    });

                                                    const processList = Array.from(activeProcesses).sort().join(',');

                                                    return (
                                                        <div
                                                            key={day}
                                                            className="flex-1 min-w-[40px] px-1 py-1 text-center text-xs font-bold border-r"
                                                            style={{ color: processList ? '#3B82F6' : '#9CA3AF' }}
                                                        >
                                                            {processList || '-'}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* 제품별 행 */}

                                        {products.map((product, productIdx) => (
                                            <div key={productIdx} className="flex border-b hover:bg-blue-50/50">
                                                {/* 제품명 */}
                                                <div
                                                    className="w-32 flex-shrink-0 px-2 py-3 text-sm font-bold border-r flex items-center"
                                                    style={{ backgroundColor: `${product.color}15`, color: product.color }}
                                                >
                                                    {product.name}
                                                </div>

                                                {/* 날짜별 셀 (Gantt 바) */}
                                                <div className="flex-1 flex relative">
                                                    {extendedDays.map(day => {
                                                        const dayStart = (day - 1) * 8;
                                                        const dayEnd = day * 8;

                                                        // 이 날짜에 작업이 있는지 확인
                                                        const hasWork = product.schedule.some(item =>
                                                            item.start_time < dayEnd && item.end_time > dayStart
                                                        );

                                                        return (
                                                            <div
                                                                key={day}
                                                                className="flex-1 min-w-[40px] h-10 border-r relative"
                                                                style={{
                                                                    background: hasWork ? product.color : 'transparent'
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}

                                        {/* 범례 */}
                                        <div className="mt-4 pt-4 border-t flex flex-wrap gap-4">
                                            {products.map((product, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div
                                                        className="w-4 h-4 rounded"
                                                        style={{ backgroundColor: product.color }}
                                                    />
                                                    <span className="text-xs text-gray-600">{product.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}

                        </div>
                    </div>


                    {/* Equipment Utilization */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Factory className="w-5 h-5 text-green-500" />
                            설비 가동률
                        </h2>
                        <div className="space-y-3">
                            {result.equipment_utilization.map((eq, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-40 text-sm font-medium truncate" title={eq.equipment}>{eq.equipment}</div>
                                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                                width: `${eq.utilization}%`,
                                                backgroundColor: eq.utilization > 80 ? '#EF4444' : eq.utilization > 50 ? '#F59E0B' : '#10B981'
                                            }}
                                        />
                                    </div>
                                    <div className="w-20 text-right">
                                        <span className="text-sm font-bold">{eq.utilization}%</span>
                                        <span className="text-xs text-gray-500 ml-1">({eq.work_time}h)</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {!result && !isLoading && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <Factory className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">계약을 선택하고 시뮬레이션을 실행하세요</p>
                </div>
            )}
        </div>
    );
}

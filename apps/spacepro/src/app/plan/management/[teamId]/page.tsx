'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
    ArrowLeft,
    LayoutGrid,
    FileText,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    Play,
    CheckCircle
} from 'lucide-react';
import DetailGanttChart from '@/components/plan/DetailGanttChart';

interface Process {
    prcode: string;
    prname: string;
    rn: number;
    start_day: number;
    end_day: number;
    status: 'Done' | 'In Progress' | 'Pending';
}

interface Product {
    macode: string;
    maname: string;
    processes: Process[];
}

interface ContractData {
    contno: string;
    contid: string;
    products: Product[];
}

interface SyncStatus {
    needs_simulation: boolean;
    modified_count: number;
    pending_count: number;
}

export default function TeamContractDetail() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const teamId = params.teamId as string;
    const teamName = searchParams.get('teamName');

    const [contracts, setContracts] = useState<ContractData[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
    const [syncStatuses, setSyncStatuses] = useState<Record<string, SyncStatus>>({});
    const [runningSimulation, setRunningSimulation] = useState<string | null>(null);

    useEffect(() => {
        if (teamId) {
            fetch(`/api/dashboard/team-contracts/${teamId}`)
                .then(res => res.json())
                .then(data => {
                    setContracts(data);
                    setLoading(false);
                    // Fetch sync status for each contract
                    data.forEach((contract: ContractData) => {
                        fetchSyncStatus(contract.contno);
                    });
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [teamId]);

    const fetchSyncStatus = async (contno: string) => {
        try {
            const res = await fetch(`/api/simulation/contracts/${contno}/sync-status`);
            const data = await res.json();
            setSyncStatuses(prev => ({ ...prev, [contno]: data }));
        } catch (err) {
            console.error('Failed to fetch sync status:', err);
        }
    };

    const runSimulation = async (contno: string) => {
        setRunningSimulation(contno);
        try {
            // 1. Create simulation version
            const createRes = await fetch(`/api/simulation/contracts/${contno}/versions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    version_name: `v${new Date().toISOString().slice(0, 10)}`,
                    start_date: new Date().toISOString().slice(0, 10)
                })
            });
            const createData = await createRes.json();

            if (createData.success) {
                // 2. Confirm the version
                await fetch(`/api/simulation/version-actions/${createData.version_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ confirmed_by: 'user' })
                });

                // 3. Refresh sync status
                await fetchSyncStatus(contno);

                alert(`시뮬레이션 완료: ${createData.plan_count}개 계획 생성됨`);
            }
        } catch (err) {
            console.error('Simulation failed:', err);
            alert('시뮬레이션 실패');
        } finally {
            setRunningSimulation(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Done': return 'bg-green-500';
            case 'In Progress': return 'bg-blue-500';
            default: return 'bg-slate-300';
        }
    };

    const toggleDetail = (contno: string) => {
        const newSet = new Set(expandedDetails);
        if (newSet.has(contno)) {
            newSet.delete(contno);
        } else {
            newSet.add(contno);
        }
        setExpandedDetails(newSet);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                    <ArrowLeft className="text-slate-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">계약별 진행 현황</h1>
                    <p className="text-slate-500">사업팀: <span className="font-semibold text-blue-600">{teamName || teamId}</span></p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading schedule...</div>
            ) : (
                <div className="space-y-8">
                    {contracts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                            <LayoutGrid className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                            <p className="text-slate-500">조회된 계약 정보가 없습니다.</p>
                        </div>
                    ) : (
                        contracts.map((contract) => {
                            const isDetailExpanded = expandedDetails.has(contract.contno);
                            const syncStatus = syncStatuses[contract.contno];
                            const needsSimulation = syncStatus?.needs_simulation ?? true;
                            const isRunning = runningSimulation === contract.contno;

                            return (
                                <div key={contract.contno} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                    {/* Contract Header */}
                                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h2 className="font-bold text-slate-800 text-lg">
                                                            {contract.contid}
                                                            <span className="text-slate-400 font-normal text-sm ml-2">({contract.contno})</span>
                                                        </h2>
                                                        {/* Sync Status Badge */}
                                                        {needsSimulation ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                                                <AlertTriangle size={12} />
                                                                변경됨
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                <CheckCircle size={12} />
                                                                동기화됨
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-slate-500">포함 제품수: {contract.products.length}개</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Simulation Button */}
                                                <button
                                                    onClick={() => runSimulation(contract.contno)}
                                                    disabled={!needsSimulation || isRunning}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${needsSimulation && !isRunning
                                                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    <Play size={14} />
                                                    {isRunning ? '실행 중...' : '시뮬레이션'}
                                                </button>

                                                {/* Detail Toggle Button */}
                                                <button
                                                    onClick={() => toggleDetail(contract.contno)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isDetailExpanded
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200'
                                                        }`}
                                                >
                                                    {isDetailExpanded ? (
                                                        <>
                                                            상세 접기
                                                            <ChevronUp size={16} />
                                                        </>
                                                    ) : (
                                                        <>
                                                            상세 보기
                                                            <ChevronDown size={16} />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Simple Gantt Chart Area */}
                                    <div className="p-6 overflow-x-auto">
                                        <div className="min-w-[1000px]">
                                            {/* Header Row (Dates) */}
                                            <div className="flex border-b border-slate-200 mb-2">
                                                <div className="w-48 flex-shrink-0 p-2 text-xs font-bold text-slate-500 bg-slate-50 border-r border-slate-200">
                                                    제품명 / 공정
                                                </div>
                                                <div className="flex-1 flex">
                                                    {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                                                        <div key={day} className="flex-1 text-center text-[10px] text-slate-500 border-r border-slate-100 py-2 bg-slate-50">
                                                            {day}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Product Rows */}
                                            <div className="space-y-1">
                                                {contract.products.map((product) => (
                                                    <div key={product.macode} className="flex group hover:bg-slate-50 transition-colors rounded border border-transparent hover:border-slate-200">
                                                        <div className="w-48 flex-shrink-0 p-3 border-r border-slate-100 flex flex-col justify-center">
                                                            <div className="font-bold text-slate-800 text-sm">{product.maname}</div>
                                                            <div className="text-xs text-slate-400 font-mono">{product.macode}</div>
                                                        </div>

                                                        <div className="flex-1 relative h-16 my-auto">
                                                            <div className="absolute inset-0 flex pointer-events-none">
                                                                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                                                                    <div key={day} className="flex-1 border-r border-slate-50 h-full"></div>
                                                                ))}
                                                            </div>

                                                            {product.processes.map((proc) => {
                                                                const duration = proc.end_day - proc.start_day;
                                                                const leftPercent = ((proc.start_day - 1) / 30) * 100;
                                                                const widthPercent = (duration / 30) * 100;

                                                                return (
                                                                    <div
                                                                        key={proc.prcode}
                                                                        className={`absolute top-2 bottom-2 rounded shadow-sm ${getStatusColor(proc.status)} text-white text-[10px] flex items-center justify-center font-medium opacity-90 hover:opacity-100 transition-all cursor-help border border-white/20`}
                                                                        style={{
                                                                            left: `${leftPercent}%`,
                                                                            width: `${widthPercent}%`,
                                                                            zIndex: 10
                                                                        }}
                                                                        title={`${proc.prname} (${proc.status})`}
                                                                    >
                                                                        <span className="truncate px-1">{proc.prname}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detail Gantt Chart (Expandable) */}
                                    {isDetailExpanded && (
                                        <div className="px-6 pb-6">
                                            <DetailGanttChart contno={contract.contno} />
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

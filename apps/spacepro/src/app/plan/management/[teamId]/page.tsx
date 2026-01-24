'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    LayoutGrid,
    FileText
} from 'lucide-react';

interface Process {
    prcode: string;
    prname: string;
    rn: number;
    start_day: number;
    end_day: number;
    status: 'Done' | 'In Progress' | 'Pending';
}

interface ContractData {
    contno: string;
    macode: string;
    maname: string;
    processes: Process[];
}

export default function TeamContractDetail() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const teamId = params.teamId as string;
    const teamName = searchParams.get('teamName');

    const [contracts, setContracts] = useState<ContractData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (teamId) {
            fetch(`/api/dashboard/team-contracts/${teamId}`)
                .then(res => res.json())
                .then(data => {
                    setContracts(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [teamId]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Done': return 'bg-green-500';
            case 'In Progress': return 'bg-blue-500';
            default: return 'bg-slate-300';
        }
    };

    // Group contracts by Contract Number
    const groupedContracts = contracts.reduce((acc, curr) => {
        if (!acc[curr.contno]) {
            acc[curr.contno] = [];
        }
        acc[curr.contno].push(curr);
        return acc;
    }, {} as Record<string, ContractData[]>);

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
                    {Object.keys(groupedContracts).length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                            <LayoutGrid className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                            <p className="text-slate-500">조회된 계약 정보가 없습니다.</p>
                        </div>
                    ) : (
                        Object.entries(groupedContracts).map(([contno, products]) => (
                            <div key={contno} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                {/* Contract Header */}
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                    <div
                                        className="flex-1 flex items-center gap-3 hover:bg-slate-100 p-2 -ml-2 rounded-lg transition-colors group cursor-pointer"
                                        onClick={() => router.push(`/plan/management/detail/${contno}`)}
                                    >
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">계약번호: {contno}</h2>
                                            <p className="text-sm text-slate-500">포함 제품수: {products.length}개</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/plan/management/detail/${contno}`}
                                        className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-2"
                                    >
                                        상세 계획 보기
                                        <ArrowLeft className="rotate-180" size={16} />
                                    </Link>
                                </div>

                                {/* Gantt Chart Area */}
                                <div className="p-6 overflow-x-auto">
                                    <div className="min-w-[1000px]">
                                        {/* 1. Header Row (Dates) */}
                                        <div className="flex border-b border-slate-200 mb-2">
                                            {/* Top Empty Left Cell */}
                                            <div className="w-48 flex-shrink-0 p-2 text-xs font-bold text-slate-500 bg-slate-50 border-r border-slate-200">
                                                제품명 / 공정
                                            </div>
                                            {/* Days Header */}
                                            <div className="flex-1 flex">
                                                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                                                    <div key={day} className="flex-1 text-center text-[10px] text-slate-500 border-r border-slate-100 py-2 bg-slate-50">
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 2. Product Rows */}
                                        <div className="space-y-1">
                                            {products.map((product) => (
                                                <div key={product.macode} className="flex group hover:bg-slate-50 transition-colors rounded border border-transparent hover:border-slate-200">
                                                    {/* Left Column: Product Name */}
                                                    <div className="w-48 flex-shrink-0 p-3 border-r border-slate-100 flex flex-col justify-center">
                                                        <div className="font-bold text-slate-800 text-sm">{product.maname}</div>
                                                        <div className="text-xs text-slate-400 font-mono">{product.macode}</div>
                                                    </div>

                                                    {/* Right Column: Timeline Bars */}
                                                    <div className="flex-1 relative h-16 my-auto">
                                                        {/* Grid Background */}
                                                        <div className="absolute inset-0 flex pointer-events-none">
                                                            {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                                                                <div key={day} className="flex-1 border-r border-slate-50 h-full"></div>
                                                            ))}
                                                        </div>

                                                        {/* Process Bars */}
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
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

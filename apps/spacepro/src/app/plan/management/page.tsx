'use client';

import React, { useEffect, useState } from 'react';
import {
    Briefcase,
    Package,
    Activity,
    TrendingUp,
    Users
} from 'lucide-react';
import Link from 'next/link';

interface TeamStatus {
    team_id: string;
    team_name: string;
    contract_count: number;
    product_count: number;
    progress_rate: number;
}

export default function ManagementDashboard() {
    const [data, setData] = useState<TeamStatus[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/dashboard/team-status')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">생산경영 시뮬레이션</h1>
                <p className="text-slate-500 mt-2">사업팀별 현재 운영 현황 대시보드</p>
            </header>

            {loading ? (
                <div className="text-center py-20">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((team) => (
                        <Link
                            href={`/plan/management/${team.team_id}?teamName=${encodeURIComponent(team.team_name)}`}
                            key={team.team_id}
                            className="block group"
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group-hover:shadow-md transition-shadow cursor-pointer">
                                {/* Header */}
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between group-hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors">
                                            <Users size={20} />
                                        </div>
                                        <h2 className="text-lg font-semibold text-slate-800">{team.team_name}</h2>
                                    </div>
                                    <span className="text-xs font-mono text-slate-400">{team.team_id}</span>
                                </div>

                                {/* Metrics */}
                                <div className="p-6 space-y-6">
                                    {/* Contract & Product Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-lg group-hover:bg-blue-50/50 transition-colors">
                                            <div className="flex items-center space-x-2 text-slate-500 mb-1">
                                                <Briefcase size={16} />
                                                <span className="text-sm font-medium">계약 건수</span>
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {team.contract_count.toLocaleString()}
                                                <span className="text-sm font-normal text-slate-400 ml-1">건</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg group-hover:bg-blue-50/50 transition-colors">
                                            <div className="flex items-center space-x-2 text-slate-500 mb-1">
                                                <Package size={16} />
                                                <span className="text-sm font-medium">생산 품목</span>
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {team.product_count.toLocaleString()}
                                                <span className="text-sm font-normal text-slate-400 ml-1">종</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Section */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-2 text-slate-500">
                                                <Activity size={16} />
                                                <span className="font-medium">공정 진행율</span>
                                            </div>
                                            <span className="text-blue-600 font-bold">{team.progress_rate}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${team.progress_rate}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Additional visual decoration */}
                                    <div className="pt-4 border-t border-slate-100 flex items-center text-xs text-slate-400 group-hover:text-blue-500 transition-colors">
                                        <TrendingUp size={14} className="mr-1" />
                                        <span>클릭하여 상세 현황 보기</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Empty State / Placeholder for aesthetics if needed */}
                    {data.length === 0 && (
                        <div className="col-span-full text-center py-20 text-slate-400">
                            데이터가 없습니다.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

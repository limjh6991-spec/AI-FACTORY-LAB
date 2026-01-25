/**
 * 스케줄러 페이지 - 실제 DB 데이터 연동
 */
'use client';

import React, { useState, useEffect } from 'react';
import { SchedulerView } from './SchedulerView';
import { scheduleProduction } from './schedulerEngine';
import { Contract, RoutingStep, Resource } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

interface SchedulerApiResponse {
    resources: Resource[];
    contracts: {
        contno: string;
        macode: string;
        maname: string;
        due_date: string | null;
        quantity: number;
        priority: 'HIGH' | 'NORMAL' | 'LOW';
    }[];
    routings: Record<string, {
        prcode: string;
        rn: number;
        prname: string;
        Contracted_Man_hours: number;
        target_site: string;
    }[]>;
    holidays: { date: string; reason: string }[];
    startDate: string;
    workingHoursPerDay: number;
}

interface ContractOption {
    contno: string;
    product_count: number;
    earliest_due: string | null;
}

export default function SchedulerPage() {
    const [schedulerData, setSchedulerData] = useState<ReturnType<typeof scheduleProduction> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [contracts, setContracts] = useState<ContractOption[]>([]);
    const [selectedContno, setSelectedContno] = useState<string>('23D220097');

    // 계약 목록 조회
    useEffect(() => {
        fetch(`${API_BASE}/scheduler/contracts`)
            .then(res => res.json())
            .then(data => setContracts(data))
            .catch(err => console.error('Failed to load contracts:', err));
    }, []);

    // 스케줄 데이터 로드
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetch(`${API_BASE}/scheduler/data?contno=${selectedContno}`)
            .then(res => {
                if (!res.ok) throw new Error(`API Error: ${res.status}`);
                return res.json();
            })
            .then((apiData: SchedulerApiResponse) => {
                // API 데이터를 스케줄러 타입으로 변환
                const contractsForScheduler: Contract[] = apiData.contracts.map(c => ({
                    contno: c.contno,
                    macode: c.macode,
                    due_date: c.due_date || undefined,
                    quantity: c.quantity,
                    priority: c.priority
                }));

                const routingsForScheduler: Record<string, RoutingStep[]> = {};
                for (const [macode, steps] of Object.entries(apiData.routings)) {
                    routingsForScheduler[macode] = steps.map(s => ({
                        prcode: s.prcode,
                        rn: s.rn,
                        prname: s.prname,
                        Contracted_Man_hours: s.Contracted_Man_hours,
                        target_site: s.target_site
                    }));
                }

                // 리소스 확보 - 라우팅에서 참조되는 설비 추가
                const resourceMap = new Map<string, Resource>();
                apiData.resources.forEach(r => resourceMap.set(r.bench_id, r));

                // 라우팅에서 사용하는 설비 중 리소스에 없으면 추가
                Object.values(apiData.routings).flat().forEach(step => {
                    if (!resourceMap.has(step.target_site)) {
                        resourceMap.set(step.target_site, {
                            bench_id: step.target_site,
                            bench_name: step.target_site,
                            site_id: 'S01',
                            site_name: '기본',
                            daily_capacity: 8
                        });
                    }
                });

                const resources = Array.from(resourceMap.values());

                // 스케줄 생성
                const data = scheduleProduction({
                    contracts: contractsForScheduler,
                    routings: routingsForScheduler,
                    resources: resources,
                    startDate: new Date(apiData.startDate),
                    workingHoursPerDay: apiData.workingHoursPerDay
                });

                setSchedulerData(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load scheduler data:', err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [selectedContno]);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-red-50 border border-red-300 rounded-xl p-6 max-w-md">
                    <h2 className="text-xl font-bold text-red-600 mb-2">데이터 로드 실패</h2>
                    <p className="text-gray-700">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
                    >
                        새로고침
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading || !schedulerData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-gray-600">계약 {selectedContno} 데이터 로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* 헤더 */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">생산 스케줄러 (Pro)</h1>
                    <p className="text-gray-500">Forward Scheduling 기반 자원 중심 간트 차트</p>
                </div>
                <div className="flex items-center gap-4">
                    <label className="text-gray-600">계약 선택:</label>
                    <select
                        value={selectedContno}
                        onChange={(e) => setSelectedContno(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                        {contracts.map(c => (
                            <option key={c.contno} value={c.contno}>
                                {c.contno} ({c.product_count}개 제품)
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 요약 카드 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="text-sm text-gray-500">총 작업</div>
                    <div className="text-2xl font-bold text-gray-800">{schedulerData.events.length}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="text-sm text-gray-500">의존성</div>
                    <div className="text-2xl font-bold text-blue-600">{schedulerData.dependencies.length}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="text-sm text-gray-500">지연 작업</div>
                    <div className="text-2xl font-bold text-red-500">
                        {schedulerData.events.filter(e => e.status === 'delayed').length}
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="text-sm text-gray-500">평균 가동률</div>
                    <div className="text-2xl font-bold text-emerald-600">
                        {schedulerData.allocations.length > 0
                            ? (schedulerData.allocations.reduce((sum, a) => sum + a.utilizationPercent, 0) / schedulerData.allocations.length).toFixed(1)
                            : 0}%
                    </div>
                </div>
            </div>

            {/* 스케줄러 뷰 */}
            <div className="h-[600px]">
                <SchedulerView
                    resources={schedulerData.resources}
                    events={schedulerData.events}
                    dependencies={schedulerData.dependencies}
                    allocations={schedulerData.allocations}
                    config={schedulerData.config}
                />
            </div>
        </div>
    );
}

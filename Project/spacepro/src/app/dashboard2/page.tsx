/**
 * Dashboard 2 - Deep Blue & Emerald Theme
 * 딥 블루 & 에메랄드 테마 대시보드
 */

'use client';

import React from 'react';
import { DarkSidebar } from '@/components/layout/DarkSidebar';
import { Settings, Bell, User, TrendingUp, TrendingDown } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from 'recharts';

// 샘플 데이터
const donutData = [
    { name: '제조', value: 948, color: '#00BFA5' },
    { name: '포장', value: 442, color: '#FF7043' },
    { name: '조립', value: 541, color: '#26C6DA' },
    { name: '검사', value: 145, color: '#42A5F5' },
];

const assetChartData = [
    { name: '1월', value1: 80, value2: 60, value3: 40 },
    { name: '2월', value1: 65, value2: 75, value3: 55 },
    { name: '3월', value1: 90, value2: 50, value3: 70 },
    { name: '4월', value1: 75, value2: 85, value3: 45 },
    { name: '5월', value1: 55, value2: 70, value3: 80 },
    { name: '6월', value1: 85, value2: 60, value3: 50 },
];

const chartByItemsData = [
    { name: '월', 서비스: 55, 재료: 40, 제품: 80 },
    { name: '화', 서비스: 45, 재료: 60, 제품: 70 },
    { name: '수', 서비스: 75, 재료: 50, 제품: 90 },
    { name: '목', 서비스: 60, 재료: 70, 제품: 85 },
    { name: '금', 서비스: 80, 재료: 45, 제품: 65 },
];

const summaryData = [
    { name: '요약 1', hours: '8:42 시간', status: 'active' },
    { name: '요약 2', hours: '6:42 시간', status: 'warning' },
    { name: '요약 3', hours: '5:00 시간', status: 'active' },
];

const reportsData = [
    { label: '가동률', value: '165%' },
    { label: '비가동', value: '14.0%' },
    { label: '수리중', value: '14.4 %' },
    { label: '예방정비대', value: '7.3%' },
];

export default function Dashboard2() {
    const today = new Date();
    const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월`;

    return (
        <div className="flex min-h-screen bg-[#F5F5F0]">
            {/* Dark Sidebar */}
            <DarkSidebar className="fixed left-0 top-0 h-full" />

            {/* Main Content */}
            <div className="flex-1 ml-56">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E8E8E4]">
                    <h1 className="text-2xl font-bold text-[#1E2A3A]">대시보드</h1>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-[#636E72] hover:text-[#1E2A3A] rounded-lg transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button className="relative p-2 text-[#636E72] hover:text-[#1E2A3A] rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF7043] rounded-full" />
                        </button>
                        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-[#E8E8E4]">
                            <div className="text-right">
                                <p className="text-sm font-medium text-[#1E2A3A]">김철수</p>
                                <p className="text-xs text-[#A0A0A0]">{dateString}</p>
                            </div>
                            <div className="w-10 h-10 bg-[#E8F5F3] rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-[#00BFA5]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    {/* Top Row */}
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        {/* Image Placeholder */}
                        <div className="col-span-4 bg-[#1E2A3A] rounded-xl h-48 flex items-center justify-center overflow-hidden">
                            <div className="text-center text-white">
                                <div className="text-4xl mb-2">🏭</div>
                                <p className="text-sm text-[#8899A8]">생산 현장 이미지</p>
                            </div>
                        </div>

                        {/* Total Charts */}
                        <div className="col-span-4 bg-white rounded-xl p-5 border border-[#E8E8E4]">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-[#636E72] mb-1">총 차트</p>
                                    <p className="text-3xl font-bold text-[#1E2A3A]">₩2,076<span className="text-lg text-[#A0A0A0]">만</span></p>
                                </div>
                                <div className="text-xs space-y-1">
                                    {donutData.map((item) => (
                                        <div key={item.name} className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                                            <span className="text-[#636E72]">{item.name}</span>
                                            <span className="text-[#1E2A3A] font-medium">₩{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <ResponsiveContainer width={120} height={120}>
                                    <PieChart>
                                        <Pie
                                            data={donutData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={35}
                                            outerRadius={55}
                                            dataKey="value"
                                        >
                                            {donutData.map((entry, index) => (
                                                <Cell key={index} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* OFP Value */}
                        <div className="col-span-4 bg-white rounded-xl p-5 border border-[#E8E8E4]">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-[#636E72] mb-1">OFP 가치</p>
                                    <p className="text-3xl font-bold text-[#1E2A3A]">₩1,184<span className="text-lg text-[#A0A0A0]">만</span></p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[#636E72]">가동</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-[#1E2A3A]">₩2,148만</span>
                                        <TrendingUp className="w-4 h-4 text-[#00BFA5]" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[#636E72]">대기</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-[#1E2A3A]">₩848만</span>
                                        <TrendingDown className="w-4 h-4 text-[#FF7043]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Row - Asset Charts */}
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="col-span-6 bg-white rounded-xl p-5 border border-[#E8E8E4]">
                            <h3 className="text-sm font-medium text-[#1E2A3A] mb-4">자산 차트</h3>
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={assetChartData}>
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#A0A0A0' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: '#A0A0A0' }} axisLine={false} tickLine={false} />
                                    <Bar dataKey="value1" fill="#00BFA5" radius={[3, 3, 0, 0]} />
                                    <Bar dataKey="value2" fill="#26C6DA" radius={[3, 3, 0, 0]} />
                                    <Bar dataKey="value3" fill="#42A5F5" radius={[3, 3, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="col-span-6 bg-white rounded-xl p-5 border border-[#E8E8E4]">
                            <h3 className="text-sm font-medium text-[#1E2A3A] mb-4">누적 자산</h3>
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={assetChartData}>
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#A0A0A0' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: '#A0A0A0' }} axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Bar dataKey="value1" stackId="a" fill="#00BFA5" />
                                    <Bar dataKey="value2" stackId="a" fill="#26C6DA" />
                                    <Bar dataKey="value3" stackId="a" fill="#1E2A3A" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Summary */}
                        <div className="col-span-3 bg-white rounded-xl p-5 border border-[#E8E8E4]">
                            <h3 className="text-sm font-medium text-[#1E2A3A] mb-4">요약</h3>
                            <div className="space-y-3">
                                {summaryData.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-sm text-[#636E72]">{item.name}</span>
                                        <span className={`text-sm font-medium ${item.status === 'warning' ? 'text-[#FF7043]' : 'text-[#1E2A3A]'}`}>
                                            {item.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chart by Items */}
                        <div className="col-span-5 bg-white rounded-xl p-5 border border-[#E8E8E4]">
                            <h3 className="text-sm font-medium text-[#1E2A3A] mb-4">항목별 차트</h3>
                            <ResponsiveContainer width="100%" height={120}>
                                <BarChart data={chartByItemsData}>
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#A0A0A0' }} axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Bar dataKey="서비스" fill="#00BFA5" radius={[3, 3, 0, 0]} />
                                    <Bar dataKey="재료" fill="#FF7043" radius={[3, 3, 0, 0]} />
                                    <Bar dataKey="제품" fill="#1E2A3A" radius={[3, 3, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Reports */}
                        <div className="col-span-4 bg-white rounded-xl p-5 border border-[#E8E8E4]">
                            <h3 className="text-sm font-medium text-[#1E2A3A] mb-4">리포트</h3>
                            <div className="space-y-3">
                                {reportsData.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-sm text-[#636E72]">{item.label}</span>
                                        <span className="text-sm font-medium text-[#1E2A3A]">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

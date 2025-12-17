/**
 * Projects Dashboard - Metronic 8 Style (정확한 색상)
 * 프로젝트 대시보드 (메트로닉 스타일 정확 복제)
 */

'use client';

import React, { useState } from 'react';
import {
    Settings,
    Bell,
    User,
    Plus,
    MoreVertical,
    Search,
    Menu,
    ChevronDown,
    Eye,
    MapPin,
    Clock,
    Users,
    FileText,
    ArrowUp,
    ArrowDown,
    CheckCircle2
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
} from 'recharts';

// Metronic 색상 팔레트
const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    dark: '#181C32',
    secondary: '#E4E6EF',
    light: '#F5F8FA',
    white: '#FFFFFF',
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

// 타임라인 날짜
const timelineDates = [
    { day: '금', date: 20 },
    { day: '토', date: 21 },
    { day: '일', date: 22 },
    { day: '월', date: 23 },
    { day: '화', date: 24 },
    { day: '수', date: 25 },
    { day: '목', date: 26 },
    { day: '금', date: 27 },
    { day: '토', date: 28 },
    { day: '일', date: 29 },
    { day: '월', date: 30 },
];

// 타임라인 항목
const timelineItems = [
    { time: '14:30', title: '프레스 라인 점검', user: '김철수', color: colors.primary },
    { time: '15:10', title: '품질 검사 회의', user: '이영희', color: colors.success },
    { time: '15:55', title: '자재 입고 확인', user: '박민수', color: colors.warning },
    { time: '16:30', title: 'A라인 생산 보고', user: '최지은', color: colors.danger },
];

// 차트 데이터
const chartData = [
    { time: '14:30', value: 35 },
    { time: '15:10', value: 48 },
    { time: '15:55', value: 42 },
    { time: '16:30', value: 55 },
    { time: '11:35', value: 38 },
    { time: '15:30', value: 60 },
    { time: '15:20', value: 45 },
    { time: '12:30', value: 70 },
];

// 프로젝트 통계
const projectStats = [
    { name: 'MES 시스템', progress: 75, icon: '📱', color: colors.primary },
    { name: '생산 자동화', progress: 45, icon: '✈️', color: colors.success },
    { name: '품질 관리', progress: 90, icon: '📊', color: colors.info },
    { name: '재고 관리', progress: 60, icon: '🏢', color: colors.warning },
    { name: '설비 보전', progress: 30, icon: '🔧', color: colors.danger },
];

// 활성 태스크
const activeTasks = [
    { title: 'MES 원본', desc: 'Metronic 관리자 템플릿', progress: 65, users: 3 },
    { title: 'SaaS 앱', desc: 'Metronic SaaS 솔루션', progress: 80, users: 5 },
    { title: '청구 SaaS', desc: 'Metronic 청구 시스템', progress: 45, users: 2 },
    { title: '마케팅 자동화', desc: 'Metronic 마케팅 플랫폼', progress: 90, users: 4 },
];

export default function ProjectsMetronic() {
    const [activeDate, setActiveDate] = useState(23);
    const [activeTab, setActiveTab] = useState('day');

    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Sidebar - Metronic Dark Style */}
            <aside className="fixed left-0 top-0 h-full w-[265px] flex flex-col" style={{ background: colors.dark }}>
                {/* Logo */}
                <div className="h-[65px] flex items-center px-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: colors.primary }}>
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="text-white text-lg font-semibold">SpacePro</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4">
                    <div className="mb-4">
                        <span className="text-[11px] font-semibold uppercase px-4" style={{ color: colors.gray600 }}>대시보드</span>
                    </div>
                    {[
                        { label: '대시보드', active: true },
                        { label: '프로젝트' },
                        { label: '리포트' },
                        { label: '생산관리' },
                        { label: 'CCTV' },
                        { label: 'KPI' },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href="#"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] transition-colors mb-1`}
                            style={{
                                color: item.active ? colors.white : colors.gray500,
                                background: item.active ? colors.primary : 'transparent',
                            }}
                        >
                            <span className="w-5 h-5 flex items-center justify-center">
                                {i === 0 ? '📊' : i === 1 ? '📁' : i === 2 ? '📄' : i === 3 ? '🏭' : i === 4 ? '📹' : '📈'}
                            </span>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="ml-[265px]">
                {/* Header */}
                <header className="h-[65px] bg-white border-b flex items-center justify-between px-8" style={{ borderColor: colors.gray200 }}>
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold" style={{ color: colors.gray900 }}>프로젝트 대시보드</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.gray400 }} />
                            <input
                                type="text"
                                placeholder="검색..."
                                className="pl-10 pr-4 py-2 rounded-lg text-sm border-0"
                                style={{ background: colors.gray100, color: colors.gray700 }}
                            />
                        </div>

                        {/* Notifications */}
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center relative" style={{ background: colors.gray100 }}>
                            <Bell className="w-5 h-5" style={{ color: colors.gray600 }} />
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] text-white flex items-center justify-center" style={{ background: colors.danger }}>5</span>
                        </button>

                        {/* User */}
                        <div className="flex items-center gap-2 ml-2">
                            <div className="text-right">
                                <p className="text-sm font-medium" style={{ color: colors.gray800 }}>김철수</p>
                                <p className="text-xs" style={{ color: colors.gray500 }}>관리자</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg overflow-hidden" style={{ background: colors.gray200 }}>
                                <div className="w-full h-full flex items-center justify-center">
                                    <User className="w-5 h-5" style={{ color: colors.gray500 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-8">
                    <div className="grid grid-cols-12 gap-6">
                        {/* What's up Today */}
                        <div className="col-span-5 bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="p-6 border-b" style={{ borderColor: colors.gray200 }}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>오늘의 일정</h3>
                                        <p className="text-sm mt-1" style={{ color: colors.gray500 }}>
                                            총 <span className="font-semibold" style={{ color: colors.primary }}>424,567</span> 배송
                                        </p>
                                    </div>
                                    <button className="text-xs font-medium" style={{ color: colors.primary }}>리포트 센터</button>
                                </div>

                                {/* Date Selector */}
                                <div className="flex gap-1 overflow-x-auto pb-2">
                                    {timelineDates.map((item) => (
                                        <button
                                            key={item.date}
                                            onClick={() => setActiveDate(item.date)}
                                            className="flex flex-col items-center px-3 py-2 rounded-lg transition-all min-w-[44px]"
                                            style={{
                                                background: activeDate === item.date ? colors.primary : colors.gray100,
                                                color: activeDate === item.date ? colors.white : colors.gray600,
                                            }}
                                        >
                                            <span className="text-[10px]">{item.day}</span>
                                            <span className="text-sm font-semibold">{item.date}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="p-6 space-y-4 max-h-[300px] overflow-y-auto">
                                {timelineItems.map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="text-xs w-12 pt-1" style={{ color: colors.gray400 }}>{item.time}</span>
                                        <div className="flex-1">
                                            <div className="rounded-lg p-4" style={{ background: colors.gray100 }}>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium" style={{ color: colors.gray800 }}>{item.title}</span>
                                                    <button className="text-xs font-medium" style={{ color: colors.primary }}>보기</button>
                                                </div>
                                                <p className="text-xs mt-1" style={{ color: colors.gray500 }}>담당: {item.user}</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: item.color + '20' }}>
                                            <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Middle Column */}
                        <div className="col-span-4 space-y-6">
                            {/* What's on the road */}
                            <div className="rounded-xl p-6" style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #1e1e2d 100%)` }}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-white">현재 진행 현황</h3>
                                    <button className="text-xs" style={{ color: colors.gray500 }}>가이드 보기</button>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.success }}>
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-white">₩3,274.94</span>
                                            <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: colors.success + '20', color: colors.success }}>
                                                +9.2%
                                            </span>
                                        </div>
                                        <p className="text-xs mt-1" style={{ color: colors.gray500 }}>평균 에이전트 수익</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex gap-2">
                                        {['1일', '5일', '1달', '6달', '1년'].map((label, i) => (
                                            <button
                                                key={label}
                                                className="px-3 py-1.5 rounded text-xs font-medium"
                                                style={{
                                                    background: i === 0 ? colors.primary : 'transparent',
                                                    color: i === 0 ? colors.white : colors.gray500,
                                                }}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={150}>
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorMetronic" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.1} />
                                                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.01} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="time" tick={{ fontSize: 10, fill: colors.gray400 }} axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="value" stroke={colors.primary} fill="url(#colorMetronic)" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Projects Stats */}
                        <div className="col-span-3 bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>프로젝트 현황</h3>
                                <button>
                                    <MoreVertical className="w-4 h-4" style={{ color: colors.gray400 }} />
                                </button>
                            </div>
                            <p className="text-xs mb-4" style={{ color: colors.gray500 }}>37분 전 업데이트</p>

                            <div className="space-y-5">
                                {projectStats.map((project, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: project.color + '15' }}>
                                            {project.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium" style={{ color: colors.gray800 }}>{project.name}</span>
                                                <span className="text-xs font-semibold" style={{ color: colors.gray700 }}>{project.progress}%</span>
                                            </div>
                                            <div className="h-1.5 rounded-full" style={{ background: colors.gray200 }}>
                                                <div className="h-full rounded-full" style={{ width: `${project.progress}%`, background: project.color }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-2.5 rounded-lg text-sm font-medium" style={{ background: colors.gray100, color: colors.gray700 }}>
                                기록 보기
                            </button>
                        </div>
                    </div>

                    {/* Active Tasks */}
                    <div className="mt-6 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                            <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>활성 태스크</h3>
                            <div className="flex gap-2">
                                {['일', '주', '월', '2024'].map((tab, i) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
                                        style={{
                                            background: activeTab === tab ? colors.primary : 'transparent',
                                            color: activeTab === tab ? colors.white : colors.gray600,
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 p-6">
                            {activeTasks.map((task, i) => (
                                <div key={i} className="rounded-xl p-5" style={{ background: colors.gray100 }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200">
                                            <img
                                                src={`https://picsum.photos/40/40?random=${i}`}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button>
                                            <MoreVertical className="w-4 h-4" style={{ color: colors.gray400 }} />
                                        </button>
                                    </div>
                                    <h4 className="text-sm font-semibold mb-1" style={{ color: colors.gray900 }}>{task.title}</h4>
                                    <p className="text-xs mb-4" style={{ color: colors.gray500 }}>{task.desc}</p>

                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs" style={{ color: colors.gray500 }}>진행률</span>
                                            <span className="text-xs font-semibold" style={{ color: colors.gray700 }}>{task.progress}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full" style={{ background: colors.gray300 }}>
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${task.progress}%`,
                                                    background: task.progress >= 80 ? colors.success : task.progress >= 50 ? colors.primary : colors.warning
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {Array(task.users).fill(0).map((_, j) => (
                                                <div
                                                    key={j}
                                                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs"
                                                    style={{ background: colors.gray300 }}
                                                >
                                                    👤
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-medium" style={{ color: colors.primary }}>{task.users}명</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

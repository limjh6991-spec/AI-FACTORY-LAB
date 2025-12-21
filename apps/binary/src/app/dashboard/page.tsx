/**
 * Binary Soft - 대시보드
 * 프로젝트 진행현황 표시
 */

'use client';

import React from 'react';
import {
    Bell,
    User,
    MoreVertical,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    Activity,
    TrendingUp,
    Calendar
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

// 색상 팔레트
const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    dark: '#181C32',
    gray100: '#F5F8FA',
    gray200: '#EFF2F5',
    gray300: '#E4E6EF',
    gray400: '#B5B5C3',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
    gray700: '#5E6278',
    gray800: '#3F4254',
    gray900: '#181C32',
    white: '#FFFFFF',
};

// 프로젝트 상태별 통계
const projectStatusData = [
    { name: '진행중', value: 8, color: colors.primary },
    { name: '완료', value: 12, color: colors.success },
    { name: '지연', value: 2, color: colors.danger },
    { name: '대기', value: 3, color: colors.warning },
];

// 월별 프로젝트 완료 추이
const monthlyTrendData = [
    { month: '7월', completed: 3, started: 5 },
    { month: '8월', completed: 4, started: 6 },
    { month: '9월', completed: 5, started: 4 },
    { month: '10월', completed: 4, started: 7 },
    { month: '11월', completed: 6, started: 5 },
    { month: '12월', completed: 3, started: 4 },
];

// 진행중인 프로젝트 목록
const activeProjects = [
    {
        id: 1,
        name: 'MES 시스템 구축',
        client: 'A사',
        progress: 75,
        dueDate: '2025-01-15',
        status: 'on-track',
        team: ['김철수', '이영희', '박민수']
    },
    {
        id: 2,
        name: 'ERP 연동 개발',
        client: 'B사',
        progress: 45,
        dueDate: '2025-02-20',
        status: 'delayed',
        team: ['최지은', '정도현']
    },
    {
        id: 3,
        name: '품질관리 시스템',
        client: 'C사',
        progress: 90,
        dueDate: '2024-12-28',
        status: 'on-track',
        team: ['강호준', '윤서연', '임채원']
    },
    {
        id: 4,
        name: '설비모니터링 구축',
        client: 'D사',
        progress: 30,
        dueDate: '2025-03-10',
        status: 'on-track',
        team: ['신예진', '황도윤']
    },
];

// 최근 활동
const recentActivities = [
    { time: '10분 전', description: 'MES 시스템 구축 - 2차 마일스톤 완료', type: 'success' },
    { time: '1시간 전', description: 'ERP 연동 개발 - 일정 지연 알림', type: 'warning' },
    { time: '2시간 전', description: '품질관리 시스템 - 테스트 완료', type: 'info' },
    { time: '3시간 전', description: '설비모니터링 구축 - 킥오프 미팅 완료', type: 'success' },
    { time: '오늘', description: '신규 프로젝트 제안서 접수', type: 'info' },
];

export default function DashboardPage() {
    const totalProjects = projectStatusData.reduce((sum, item) => sum + item.value, 0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'on-track': return colors.success;
            case 'delayed': return colors.danger;
            case 'at-risk': return colors.warning;
            default: return colors.gray500;
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="w-4 h-4" style={{ color: colors.success }} />;
            case 'warning': return <AlertCircle className="w-4 h-4" style={{ color: colors.warning }} />;
            case 'info': return <Activity className="w-4 h-4" style={{ color: colors.primary }} />;
            default: return <Clock className="w-4 h-4" style={{ color: colors.gray500 }} />;
        }
    };

    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Header */}
            <header className="h-[65px] bg-white border-b flex items-center justify-between px-8" style={{ borderColor: colors.gray200 }}>
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-semibold" style={{ color: colors.gray900 }}>대시보드</h1>
                    <span className="text-sm" style={{ color: colors.gray500 }}>프로젝트 진행현황</span>
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
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] text-white flex items-center justify-center" style={{ background: colors.danger }}>3</span>
                    </button>

                    {/* User */}
                    <div className="flex items-center gap-2 ml-2">
                        <div className="text-right">
                            <p className="text-sm font-medium" style={{ color: colors.gray800 }}>관리자</p>
                            <p className="text-xs" style={{ color: colors.gray500 }}>Binary Soft</p>
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
                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                    {projectStatusData.map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                    style={{ background: item.color + '20' }}
                                >
                                    {item.name === '진행중' && <Activity className="w-6 h-6" style={{ color: item.color }} />}
                                    {item.name === '완료' && <CheckCircle2 className="w-6 h-6" style={{ color: item.color }} />}
                                    {item.name === '지연' && <AlertCircle className="w-6 h-6" style={{ color: item.color }} />}
                                    {item.name === '대기' && <Clock className="w-6 h-6" style={{ color: item.color }} />}
                                </div>
                                <span className="text-2xl font-bold" style={{ color: colors.gray900 }}>{item.value}</span>
                            </div>
                            <p className="text-sm font-medium" style={{ color: colors.gray700 }}>{item.name} 프로젝트</p>
                            <p className="text-xs mt-1" style={{ color: colors.gray500 }}>
                                전체 {totalProjects}개 중 {((item.value / totalProjects) * 100).toFixed(0)}%
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Project Status Pie Chart */}
                    <div className="col-span-4 bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>프로젝트 상태 분포</h3>
                            <button>
                                <MoreVertical className="w-4 h-4" style={{ color: colors.gray400 }} />
                            </button>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={projectStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {projectStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {projectStatusData.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                                    <span className="text-xs" style={{ color: colors.gray600 }}>{item.name}: {item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Monthly Trend Chart */}
                    <div className="col-span-8 bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>월별 프로젝트 추이</h3>
                                <p className="text-xs mt-1" style={{ color: colors.gray500 }}>최근 6개월 완료 및 신규 시작 프로젝트</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: colors.success }} />
                                    <span className="text-xs" style={{ color: colors.gray600 }}>완료</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: colors.primary }} />
                                    <span className="text-xs" style={{ color: colors.gray600 }}>신규 시작</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={monthlyTrendData}>
                                <defs>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.success} stopOpacity={0.1} />
                                        <stop offset="95%" stopColor={colors.success} stopOpacity={0.01} />
                                    </linearGradient>
                                    <linearGradient id="colorStarted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.1} />
                                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0.01} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" tick={{ fontSize: 11, fill: colors.gray400 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: colors.gray400 }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="completed" stroke={colors.success} fill="url(#colorCompleted)" strokeWidth={2} />
                                <Area type="monotone" dataKey="started" stroke={colors.primary} fill="url(#colorStarted)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Active Projects List */}
                    <div className="col-span-8 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                            <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>진행중인 프로젝트</h3>
                            <button className="text-xs font-medium" style={{ color: colors.primary }}>전체 보기</button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {activeProjects.map((project) => (
                                    <div key={project.id} className="rounded-lg p-4" style={{ background: colors.gray100 }}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h4 className="text-sm font-semibold" style={{ color: colors.gray900 }}>{project.name}</h4>
                                                <p className="text-xs mt-0.5" style={{ color: colors.gray500 }}>{project.client}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="px-2 py-1 rounded text-xs font-medium"
                                                    style={{
                                                        background: getStatusColor(project.status) + '20',
                                                        color: getStatusColor(project.status)
                                                    }}
                                                >
                                                    {project.status === 'on-track' ? '정상' : project.status === 'delayed' ? '지연' : '위험'}
                                                </span>
                                                <div className="flex items-center gap-1 text-xs" style={{ color: colors.gray500 }}>
                                                    <Calendar className="w-3 h-3" />
                                                    {project.dueDate}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs" style={{ color: colors.gray500 }}>진행률</span>
                                                <span className="text-xs font-semibold" style={{ color: colors.gray700 }}>{project.progress}%</span>
                                            </div>
                                            <div className="h-2 rounded-full" style={{ background: colors.gray300 }}>
                                                <div
                                                    className="h-full rounded-full transition-all"
                                                    style={{
                                                        width: `${project.progress}%`,
                                                        background: project.progress >= 80 ? colors.success : project.progress >= 50 ? colors.primary : colors.warning
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {project.team.slice(0, 3).map((member, j) => (
                                                    <div
                                                        key={j}
                                                        className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-medium"
                                                        style={{ background: colors.primary + '30', color: colors.primary }}
                                                    >
                                                        {member.charAt(0)}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-xs" style={{ color: colors.gray500 }}>{project.team.length}명</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="col-span-4 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="p-6 border-b" style={{ borderColor: colors.gray200 }}>
                            <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>최근 활동</h3>
                        </div>
                        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                            {recentActivities.map((activity, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="mt-0.5">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm" style={{ color: colors.gray800 }}>{activity.description}</p>
                                        <p className="text-xs mt-1" style={{ color: colors.gray400 }}>{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

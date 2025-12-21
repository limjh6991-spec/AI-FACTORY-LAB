/**
 * Binary Soft - 프로젝트 상세
 * 프로젝트 정보, 단계별 진행현황, 활동 로그
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    Calendar,
    Users,
    Building2,
    Clock,
    CheckCircle2,
    AlertCircle,
    Pause,
    FileText,
    MessageSquare,
    Edit,
    MoreVertical,
    ChevronRight,
    User,
    Target,
    Wallet,
    Activity
} from 'lucide-react';

// 색상 팔레트
const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
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

// 프로젝트 단계 정의
const projectPhases = [
    { id: 'order', name: '수주', description: '계약 및 수주 완료' },
    { id: 'kickoff', name: '착수', description: '킥오프 미팅 및 프로젝트 계획' },
    { id: 'develop', name: '개발', description: '시스템 설계 및 개발' },
    { id: 'test', name: '검수', description: '테스트 및 고객 검수' },
    { id: 'close', name: '종료', description: '프로젝트 완료 및 유지보수 전환' },
];

// 샘플 프로젝트 데이터
const sampleProject = {
    id: 'PRJ-2024-001',
    name: 'A사 MES 시스템 구축',
    client: 'A제조',
    description: '스마트팩토리 MES 시스템 구축 프로젝트. 생산현장의 실시간 모니터링, 품질관리, 설비관리 등 핵심 기능 구현.',
    status: 'in-progress',
    currentPhase: 2, // 0-based index (개발 단계)
    progress: 65,
    startDate: '2024-09-01',
    endDate: '2025-02-28',
    pm: '김철수',
    team: ['이영희', '박민수', '최지은'],
    budget: 150000000,
    spent: 85000000,
    phases: [
        { id: 'order', status: 'completed', completedDate: '2024-08-15', tasks: 5, completedTasks: 5 },
        { id: 'kickoff', status: 'completed', completedDate: '2024-09-10', tasks: 8, completedTasks: 8 },
        { id: 'develop', status: 'in-progress', tasks: 25, completedTasks: 16 },
        { id: 'test', status: 'pending', tasks: 12, completedTasks: 0 },
        { id: 'close', status: 'pending', tasks: 6, completedTasks: 0 },
    ],
};

// 활동 로그 데이터
const activityLog = [
    { date: '2024-12-20', time: '16:30', user: '김철수', action: '개발 마일스톤 3 완료 처리', type: 'milestone' },
    { date: '2024-12-20', time: '14:15', user: '이영희', action: '생산모니터링 모듈 코드 커밋', type: 'commit' },
    { date: '2024-12-19', time: '11:00', user: '박민수', action: '품질관리 화면 UI 검토 완료', type: 'review' },
    { date: '2024-12-18', time: '09:30', user: '김철수', action: '주간 진행 보고 미팅', type: 'meeting' },
    { date: '2024-12-17', time: '15:45', user: '최지은', action: '설비데이터 연동 API 개발 완료', type: 'task' },
    { date: '2024-12-16', time: '10:00', user: '이영희', action: 'DB 스키마 변경 적용', type: 'commit' },
];

// 이슈 데이터
const issues = [
    { id: 'ISS-001', title: 'ERP 연동 지연', priority: 'high', status: 'open', assignee: '이영희' },
    { id: 'ISS-002', title: 'UI 성능 최적화 필요', priority: 'medium', status: 'in-progress', assignee: '박민수' },
    { id: 'ISS-003', title: '테스트 서버 환경 구성', priority: 'low', status: 'resolved', assignee: '최지은' },
];

const activityTypeIcons: Record<string, React.ReactNode> = {
    milestone: <Target className="w-4 h-4" style={{ color: colors.success }} />,
    commit: <FileText className="w-4 h-4" style={{ color: colors.primary }} />,
    review: <CheckCircle2 className="w-4 h-4" style={{ color: colors.info }} />,
    meeting: <MessageSquare className="w-4 h-4" style={{ color: colors.warning }} />,
    task: <Activity className="w-4 h-4" style={{ color: colors.success }} />,
};

const priorityColors = {
    high: colors.danger,
    medium: colors.warning,
    low: colors.success,
};

export default function ProjectDetailPage() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'phases' | 'issues' | 'activity'>('overview');

    const project = sampleProject;
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount / 10000) + '만원';
    };

    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Header */}
            <header className="bg-white border-b" style={{ borderColor: colors.gray200 }}>
                <div className="h-[65px] flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <Link href="/projects" className="flex items-center gap-2 text-sm" style={{ color: colors.gray500 }}>
                            <ArrowLeft className="w-4 h-4" />
                            프로젝트 목록
                        </Link>
                        <span style={{ color: colors.gray300 }}>|</span>
                        <span className="text-sm" style={{ color: colors.gray400 }}>{project.id}</span>
                    </div>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
                        style={{ borderColor: colors.gray300, color: colors.gray700 }}
                    >
                        <Edit className="w-4 h-4" />
                        편집
                    </button>
                </div>

                {/* Project Title & Info */}
                <div className="px-8 py-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h1 className="text-xl font-bold mb-2" style={{ color: colors.gray900 }}>{project.name}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" style={{ color: colors.gray400 }} />
                                    <span className="text-sm" style={{ color: colors.gray600 }}>{project.client}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" style={{ color: colors.gray400 }} />
                                    <span className="text-sm" style={{ color: colors.gray600 }}>PM: {project.pm}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" style={{ color: colors.gray400 }} />
                                    <span className="text-sm" style={{ color: colors.gray600 }}>{project.startDate} ~ {project.endDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold" style={{ color: colors.primary }}>{project.progress}%</div>
                            <div className="text-sm" style={{ color: colors.gray500 }}>전체 진행률</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-3 rounded-full mb-4" style={{ background: colors.gray200 }}>
                        <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${project.progress}%`, background: colors.primary }}
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1">
                        {[
                            { key: 'overview', label: '개요' },
                            { key: 'phases', label: '단계별 현황' },
                            { key: 'issues', label: '이슈' },
                            { key: 'activity', label: '활동 로그' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                className="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors"
                                style={{
                                    background: activeTab === tab.key ? colors.gray100 : 'transparent',
                                    color: activeTab === tab.key ? colors.primary : colors.gray600,
                                    borderBottom: activeTab === tab.key ? `2px solid ${colors.primary}` : '2px solid transparent',
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-12 gap-6">
                        {/* Project Info Card */}
                        <div className="col-span-8 bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <h3 className="text-base font-semibold mb-4" style={{ color: colors.gray900 }}>프로젝트 개요</h3>
                            <p className="text-sm mb-6" style={{ color: colors.gray600 }}>{project.description}</p>

                            {/* Phase Progress */}
                            <h4 className="text-sm font-semibold mb-4" style={{ color: colors.gray800 }}>단계별 진행</h4>
                            <div className="flex items-center gap-2 mb-6">
                                {projectPhases.map((phase, index) => {
                                    const phaseData = project.phases[index];
                                    const isCompleted = phaseData.status === 'completed';
                                    const isCurrent = phaseData.status === 'in-progress';
                                    return (
                                        <React.Fragment key={phase.id}>
                                            <div className="flex-1">
                                                <div
                                                    className="h-2 rounded-full mb-2"
                                                    style={{
                                                        background: isCompleted ? colors.success : isCurrent ? colors.primary : colors.gray200,
                                                        opacity: isCurrent ? 0.6 : 1,
                                                    }}
                                                />
                                                <div className="text-center">
                                                    <p className="text-xs font-medium" style={{ color: isCompleted ? colors.success : isCurrent ? colors.primary : colors.gray500 }}>
                                                        {phase.name}
                                                    </p>
                                                    {isCompleted && (
                                                        <p className="text-[10px]" style={{ color: colors.gray400 }}>완료</p>
                                                    )}
                                                    {isCurrent && (
                                                        <p className="text-[10px]" style={{ color: colors.primary }}>{phaseData.completedTasks}/{phaseData.tasks}</p>
                                                    )}
                                                </div>
                                            </div>
                                            {index < projectPhases.length - 1 && (
                                                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: colors.gray300 }} />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            {/* Team */}
                            <h4 className="text-sm font-semibold mb-3" style={{ color: colors.gray800 }}>팀 구성</h4>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: colors.primary + '10' }}>
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: colors.primary, color: colors.white }}>
                                        {project.pm.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium" style={{ color: colors.primary }}>{project.pm} (PM)</span>
                                </div>
                                {project.team.map((member, i) => (
                                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: colors.gray100 }}>
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: colors.gray300, color: colors.gray600 }}>
                                            {member.charAt(0)}
                                        </div>
                                        <span className="text-sm" style={{ color: colors.gray700 }}>{member}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="col-span-4 space-y-4">
                            {/* Budget Card */}
                            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.info + '20' }}>
                                        <Wallet className="w-5 h-5" style={{ color: colors.info }} />
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>예산</p>
                                        <p className="text-lg font-bold" style={{ color: colors.gray900 }}>{formatCurrency(project.budget)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span style={{ color: colors.gray500 }}>집행액</span>
                                    <span style={{ color: colors.gray700 }}>{formatCurrency(project.spent)} ({Math.round(project.spent / project.budget * 100)}%)</span>
                                </div>
                            </div>

                            {/* Issues Summary */}
                            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <h4 className="text-sm font-semibold mb-4" style={{ color: colors.gray800 }}>이슈 현황</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm" style={{ color: colors.gray600 }}>미해결</span>
                                        <span className="text-sm font-semibold" style={{ color: colors.danger }}>2</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm" style={{ color: colors.gray600 }}>진행중</span>
                                        <span className="text-sm font-semibold" style={{ color: colors.warning }}>1</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm" style={{ color: colors.gray600 }}>해결됨</span>
                                        <span className="text-sm font-semibold" style={{ color: colors.success }}>1</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <h4 className="text-sm font-semibold mb-4" style={{ color: colors.gray800 }}>빠른 작업</h4>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50" style={{ color: colors.gray700 }}>
                                        📋 산출물 체크리스트
                                    </button>
                                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50" style={{ color: colors.gray700 }}>
                                        📝 회의록 작성
                                    </button>
                                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50" style={{ color: colors.gray700 }}>
                                        📊 진행 보고서
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Phases Tab */}
                {activeTab === 'phases' && (
                    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <h3 className="text-base font-semibold mb-6" style={{ color: colors.gray900 }}>단계별 상세 현황</h3>
                        <div className="space-y-4">
                            {projectPhases.map((phase, index) => {
                                const phaseData = project.phases[index];
                                const isCompleted = phaseData.status === 'completed';
                                const isCurrent = phaseData.status === 'in-progress';
                                const progress = phaseData.tasks > 0 ? (phaseData.completedTasks / phaseData.tasks) * 100 : 0;

                                return (
                                    <div key={phase.id} className="rounded-xl p-5" style={{ background: colors.gray100 }}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                    style={{
                                                        background: isCompleted ? colors.success + '20' : isCurrent ? colors.primary + '20' : colors.gray200,
                                                    }}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="w-5 h-5" style={{ color: colors.success }} />
                                                    ) : isCurrent ? (
                                                        <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                                                    ) : (
                                                        <Pause className="w-5 h-5" style={{ color: colors.gray400 }} />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold" style={{ color: colors.gray900 }}>{phase.name}</h4>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>{phase.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {isCompleted && (
                                                    <span className="text-xs px-2 py-1 rounded" style={{ background: colors.success + '20', color: colors.success }}>
                                                        완료 ({phaseData.completedDate})
                                                    </span>
                                                )}
                                                {isCurrent && (
                                                    <span className="text-xs px-2 py-1 rounded" style={{ background: colors.primary + '20', color: colors.primary }}>
                                                        진행중
                                                    </span>
                                                )}
                                                {phaseData.status === 'pending' && (
                                                    <span className="text-xs px-2 py-1 rounded" style={{ background: colors.gray200, color: colors.gray500 }}>
                                                        대기
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <div className="h-2 rounded-full" style={{ background: colors.gray200 }}>
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${progress}%`,
                                                            background: isCompleted ? colors.success : colors.primary
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium" style={{ color: colors.gray700 }}>
                                                {phaseData.completedTasks}/{phaseData.tasks} 태스크
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Issues Tab */}
                {activeTab === 'issues' && (
                    <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                            <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>이슈 목록</h3>
                            <button className="text-sm font-medium" style={{ color: colors.primary }}>+ 이슈 등록</button>
                        </div>
                        <div className="divide-y" style={{ borderColor: colors.gray200 }}>
                            {issues.map((issue) => (
                                <div key={issue.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-mono" style={{ color: colors.gray400 }}>{issue.id}</span>
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ background: priorityColors[issue.priority as keyof typeof priorityColors] }}
                                        />
                                        <span className="text-sm" style={{ color: colors.gray800 }}>{issue.title}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs" style={{ color: colors.gray500 }}>{issue.assignee}</span>
                                        <span
                                            className="text-xs px-2 py-1 rounded"
                                            style={{
                                                background: issue.status === 'open' ? colors.danger + '20' :
                                                    issue.status === 'in-progress' ? colors.warning + '20' : colors.success + '20',
                                                color: issue.status === 'open' ? colors.danger :
                                                    issue.status === 'in-progress' ? colors.warning : colors.success,
                                            }}
                                        >
                                            {issue.status === 'open' ? '미해결' : issue.status === 'in-progress' ? '진행중' : '해결됨'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <h3 className="text-base font-semibold mb-6" style={{ color: colors.gray900 }}>활동 로그</h3>
                        <div className="space-y-4">
                            {activityLog.map((log, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1">{activityTypeIcons[log.type]}</div>
                                    <div className="flex-1">
                                        <p className="text-sm" style={{ color: colors.gray800 }}>{log.action}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs" style={{ color: colors.gray500 }}>{log.user}</span>
                                            <span className="text-xs" style={{ color: colors.gray400 }}>•</span>
                                            <span className="text-xs" style={{ color: colors.gray400 }}>{log.date} {log.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

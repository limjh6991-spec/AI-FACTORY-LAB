/**
 * Binary Soft - 프로젝트 목록
 * 프로젝트 현황 파악 및 관리
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    LayoutGrid,
    List,
    Calendar,
    Users,
    MoreVertical,
    ChevronRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    Pause,
    Building2
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

// 프로젝트 상태 타입
type ProjectStatus = 'in-progress' | 'completed' | 'delayed' | 'pending';

// 프로젝트 단계 타입
type ProjectPhase = '수주' | '착수' | '개발' | '검수' | '종료';

// 프로젝트 인터페이스
interface Project {
    id: string;
    name: string;
    client: string;
    description: string;
    status: ProjectStatus;
    phase: ProjectPhase;
    progress: number;
    startDate: string;
    endDate: string;
    pm: string;
    team: string[];
    budget: number;
}

// 샘플 프로젝트 데이터
const sampleProjects: Project[] = [
    {
        id: 'PRJ-2024-001',
        name: 'A사 MES 시스템 구축',
        client: 'A제조',
        description: '스마트팩토리 MES 시스템 구축 프로젝트',
        status: 'in-progress',
        phase: '개발',
        progress: 65,
        startDate: '2024-09-01',
        endDate: '2025-02-28',
        pm: '김철수',
        team: ['이영희', '박민수', '최지은'],
        budget: 150000000,
    },
    {
        id: 'PRJ-2024-002',
        name: 'B사 ERP 연동 개발',
        client: 'B전자',
        description: '기존 ERP와 생산관리 시스템 연동',
        status: 'delayed',
        phase: '개발',
        progress: 40,
        startDate: '2024-10-15',
        endDate: '2025-01-31',
        pm: '이영희',
        team: ['정도현', '강호준'],
        budget: 80000000,
    },
    {
        id: 'PRJ-2024-003',
        name: 'C사 품질관리 시스템',
        client: 'C화학',
        description: '품질 검사 및 불량 관리 시스템',
        status: 'in-progress',
        phase: '검수',
        progress: 90,
        startDate: '2024-07-01',
        endDate: '2024-12-31',
        pm: '박민수',
        team: ['윤서연', '임채원', '신예진'],
        budget: 120000000,
    },
    {
        id: 'PRJ-2024-004',
        name: 'D사 설비모니터링',
        client: 'D기계',
        description: '생산설비 실시간 모니터링 시스템',
        status: 'pending',
        phase: '착수',
        progress: 15,
        startDate: '2024-12-01',
        endDate: '2025-05-31',
        pm: '최지은',
        team: ['황도윤'],
        budget: 200000000,
    },
    {
        id: 'PRJ-2023-012',
        name: 'E사 SCM 시스템',
        client: 'E유통',
        description: '공급망 관리 시스템 구축',
        status: 'completed',
        phase: '종료',
        progress: 100,
        startDate: '2023-06-01',
        endDate: '2024-03-31',
        pm: '김철수',
        team: ['이영희', '박민수'],
        budget: 180000000,
    },
    {
        id: 'PRJ-2024-005',
        name: 'F사 WMS 구축',
        client: 'F물류',
        description: '창고관리 시스템 신규 구축',
        status: 'in-progress',
        phase: '개발',
        progress: 55,
        startDate: '2024-08-15',
        endDate: '2025-03-15',
        pm: '정도현',
        team: ['강호준', '윤서연', '임채원'],
        budget: 95000000,
    },
];

// 상태별 스타일
const statusConfig = {
    'in-progress': { label: '진행중', color: colors.primary, icon: Clock },
    'completed': { label: '완료', color: colors.success, icon: CheckCircle2 },
    'delayed': { label: '지연', color: colors.danger, icon: AlertCircle },
    'pending': { label: '대기', color: colors.warning, icon: Pause },
};

// 단계별 색상
const phaseColors: Record<ProjectPhase, string> = {
    '수주': colors.info,
    '착수': colors.warning,
    '개발': colors.primary,
    '검수': colors.success,
    '종료': colors.gray500,
};

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // 필터링된 프로젝트
    const filteredProjects = sampleProjects.filter(project => {
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.client.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // 상태별 카운트
    const statusCounts = {
        all: sampleProjects.length,
        'in-progress': sampleProjects.filter(p => p.status === 'in-progress').length,
        'completed': sampleProjects.filter(p => p.status === 'completed').length,
        'delayed': sampleProjects.filter(p => p.status === 'delayed').length,
        'pending': sampleProjects.filter(p => p.status === 'pending').length,
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Header */}
            <header className="h-[65px] bg-white border-b flex items-center justify-between px-8" style={{ borderColor: colors.gray200 }}>
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-semibold" style={{ color: colors.gray900 }}>프로젝트</h1>
                    <span className="text-sm" style={{ color: colors.gray500 }}>총 {sampleProjects.length}개 프로젝트</span>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ background: colors.primary }}
                >
                    <Plus className="w-4 h-4" />
                    새 프로젝트
                </button>
            </header>

            {/* Main Content */}
            <main className="p-8">
                {/* Filters & Controls */}
                <div className="bg-white rounded-xl p-4 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <div className="flex items-center justify-between gap-4">
                        {/* Status Filters */}
                        <div className="flex items-center gap-2">
                            {[
                                { key: 'all', label: '전체' },
                                { key: 'in-progress', label: '진행중' },
                                { key: 'delayed', label: '지연' },
                                { key: 'pending', label: '대기' },
                                { key: 'completed', label: '완료' },
                            ].map((filter) => (
                                <button
                                    key={filter.key}
                                    onClick={() => setStatusFilter(filter.key as ProjectStatus | 'all')}
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    style={{
                                        background: statusFilter === filter.key ? colors.primary : colors.gray100,
                                        color: statusFilter === filter.key ? colors.white : colors.gray600,
                                    }}
                                >
                                    {filter.label} ({statusCounts[filter.key as keyof typeof statusCounts]})
                                </button>
                            ))}
                        </div>

                        {/* Search & View Toggle */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.gray400 }} />
                                <input
                                    type="text"
                                    placeholder="프로젝트 검색..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 rounded-lg text-sm border"
                                    style={{ borderColor: colors.gray200, color: colors.gray700, width: 200 }}
                                />
                            </div>
                            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: colors.gray200 }}>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className="p-2 transition-colors"
                                    style={{ background: viewMode === 'grid' ? colors.primary : colors.white }}
                                >
                                    <LayoutGrid className="w-4 h-4" style={{ color: viewMode === 'grid' ? colors.white : colors.gray500 }} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className="p-2 transition-colors"
                                    style={{ background: viewMode === 'list' ? colors.primary : colors.white }}
                                >
                                    <List className="w-4 h-4" style={{ color: viewMode === 'list' ? colors.white : colors.gray500 }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-3 gap-6">
                        {filteredProjects.map((project) => {
                            const StatusIcon = statusConfig[project.status].icon;
                            return (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.id}`}
                                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                    style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: phaseColors[project.phase] + '20', color: phaseColors[project.phase] }}>
                                                    {project.phase}
                                                </span>
                                                <span className="text-xs" style={{ color: colors.gray400 }}>{project.id}</span>
                                            </div>
                                            <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>{project.name}</h3>
                                        </div>
                                        <span
                                            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                                            style={{
                                                background: statusConfig[project.status].color + '20',
                                                color: statusConfig[project.status].color
                                            }}
                                        >
                                            <StatusIcon className="w-3 h-3" />
                                            {statusConfig[project.status].label}
                                        </span>
                                    </div>

                                    {/* Client */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <Building2 className="w-4 h-4" style={{ color: colors.gray400 }} />
                                        <span className="text-sm" style={{ color: colors.gray600 }}>{project.client}</span>
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs" style={{ color: colors.gray500 }}>진행률</span>
                                            <span className="text-xs font-semibold" style={{ color: colors.gray700 }}>{project.progress}%</span>
                                        </div>
                                        <div className="h-2 rounded-full" style={{ background: colors.gray200 }}>
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${project.progress}%`,
                                                    background: project.progress >= 80 ? colors.success : project.progress >= 50 ? colors.primary : colors.warning
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: colors.gray200 }}>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" style={{ color: colors.gray400 }} />
                                            <span className="text-xs" style={{ color: colors.gray500 }}>{project.endDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" style={{ color: colors.gray400 }} />
                                            <span className="text-xs" style={{ color: colors.gray500 }}>{project.team.length + 1}명</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <table className="w-full">
                            <thead>
                                <tr style={{ background: colors.gray100 }}>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase" style={{ color: colors.gray600 }}>프로젝트</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase" style={{ color: colors.gray600 }}>고객사</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase" style={{ color: colors.gray600 }}>단계</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase" style={{ color: colors.gray600 }}>상태</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase" style={{ color: colors.gray600 }}>진행률</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase" style={{ color: colors.gray600 }}>PM</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase" style={{ color: colors.gray600 }}>종료일</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((project, i) => {
                                    const StatusIcon = statusConfig[project.status].icon;
                                    return (
                                        <tr
                                            key={project.id}
                                            className="border-t hover:bg-gray-50 transition-colors"
                                            style={{ borderColor: colors.gray200 }}
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium" style={{ color: colors.gray900 }}>{project.name}</p>
                                                    <p className="text-xs" style={{ color: colors.gray400 }}>{project.id}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm" style={{ color: colors.gray700 }}>{project.client}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium px-2 py-1 rounded" style={{ background: phaseColors[project.phase] + '20', color: phaseColors[project.phase] }}>
                                                    {project.phase}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="flex items-center gap-1 w-fit px-2 py-1 rounded text-xs font-medium"
                                                    style={{
                                                        background: statusConfig[project.status].color + '20',
                                                        color: statusConfig[project.status].color
                                                    }}
                                                >
                                                    <StatusIcon className="w-3 h-3" />
                                                    {statusConfig[project.status].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 rounded-full" style={{ background: colors.gray200 }}>
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${project.progress}%`,
                                                                background: project.progress >= 80 ? colors.success : project.progress >= 50 ? colors.primary : colors.warning
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-medium" style={{ color: colors.gray700 }}>{project.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm" style={{ color: colors.gray700 }}>{project.pm}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm" style={{ color: colors.gray500 }}>{project.endDate}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={`/projects/${project.id}`}
                                                    className="flex items-center gap-1 text-sm font-medium"
                                                    style={{ color: colors.primary }}
                                                >
                                                    상세 <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}

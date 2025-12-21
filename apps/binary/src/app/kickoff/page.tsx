/**
 * Kickoff Meeting Kit Dashboard
 * 프로젝트 착수 준비 가이드 메인 페이지
 */

'use client';

import React from 'react';
import {
    Search, Bell, User,
    CheckSquare, Database, MessageSquare, Target, FileCheck,
    ChevronRight, ArrowRight
} from 'lucide-react';

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
};

const sections = [
    {
        id: 1,
        title: '현장 실사 체크리스트',
        subtitle: 'AS-IS 분석',
        description: '물리적 환경, 인프라, 생산 프로세스 현황 파악을 위한 체크리스트',
        href: '/kickoff/site-survey',
        icon: CheckSquare,
        color: colors.primary,
        items: ['네트워크 환경', '작업자 디바이스', '설비 인터페이스', '물류 동선'],
    },
    {
        id: 2,
        title: '데이터 요청 리스트',
        subtitle: 'Data Acquisition',
        description: '시스템 구축에 필요한 마스터 데이터 및 이력 데이터 수집',
        href: '/kickoff/data-request',
        icon: Database,
        color: colors.success,
        items: ['품목 리스트', 'BOM', '공정/라우팅', '설비/작업자'],
    },
    {
        id: 3,
        title: '핵심 인터뷰 질문',
        subtitle: 'Stakeholder Interview',
        description: '경영진, 현장 관리자, 실무자별 맞춤 인터뷰 가이드',
        href: '/kickoff/interview',
        icon: MessageSquare,
        color: colors.warning,
        items: ['경영진 KPI', '현장 Pain Point', '실무자 UX'],
    },
    {
        id: 4,
        title: '킥오프 미팅 아젠다',
        subtitle: 'Meeting Agenda',
        description: '킥오프 미팅 진행을 위한 아젠다 및 시간 배분',
        href: '/kickoff/agenda',
        icon: Target,
        color: colors.danger,
        items: ['목표 공유', 'Scope 확정', 'R&R 정의', '일정 합의'],
    },
    {
        id: 5,
        title: '착수 보고서 산출물',
        subtitle: 'Deliverables',
        description: '프로젝트 착수 단계 산출물 관리 및 템플릿',
        href: '/kickoff/deliverables',
        icon: FileCheck,
        color: colors.info,
        items: ['WBS', '요구사항 정의서', '회의록'],
    },
];

export default function KickoffDashboard() {
    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Main Content */}
            <div>
                {/* Header */}
                <header className="h-[65px] bg-white border-b flex items-center justify-between px-8" style={{ borderColor: colors.gray200 }}>
                    <div>
                        <h1 className="text-lg font-semibold" style={{ color: colors.gray900 }}>🚀 프로젝트 착수 준비 가이드</h1>
                        <p className="text-xs" style={{ color: colors.gray500 }}>Site Visit & Kick-off Meeting Kit</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden" style={{ background: colors.gray200 }}>
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-8">
                    {/* Section Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <a
                                    key={section.id}
                                    href={section.href}
                                    className="bg-white rounded-xl overflow-hidden transition-all hover:shadow-lg group"
                                    style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: section.color + '15' }}>
                                                <Icon className="w-7 h-7" style={{ color: section.color }} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xl font-bold" style={{ color: section.color }}>{section.id}</span>
                                                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: section.color + '15', color: section.color }}>
                                                        {section.subtitle}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold" style={{ color: colors.gray900 }}>{section.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm mb-4" style={{ color: colors.gray600 }}>{section.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {section.items.map((item, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded" style={{ background: colors.gray100, color: colors.gray600 }}>
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="px-6 py-3 flex items-center justify-between border-t group-hover:bg-gray-50 transition-colors" style={{ borderColor: colors.gray200 }}>
                                        <span className="text-sm font-medium" style={{ color: section.color }}>상세 보기</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: section.color }} />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}

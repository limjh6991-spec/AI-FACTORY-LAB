/**
 * 제안서 메인 페이지 - 스페이스프로 MES 생산계획 시스템 구축 제안
 */

'use client';

import React from 'react';
import {
    ChevronRight, ArrowRight, Factory, Database, Package,
    Calendar, Clock, Server, BarChart3, Users, Target
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
        num: '01',
        title: '제안 개요',
        subtitle: 'Overview',
        description: '현황 분석, 개선과제, 시스템 목표 정의',
        href: '/proposal/overview',
        icon: Target,
        color: colors.primary,
        items: ['생산관리', '자재관리', '금형관리', '기준정보'],
    },
    {
        id: 2,
        num: '02',
        title: '제안 내용',
        subtitle: 'Solution',
        description: '기준정보, 자재관리, 생산관리, 생산계획 프로세스',
        href: '/proposal/solution',
        icon: Database,
        color: colors.success,
        items: ['기준정보', '자재관리', '생산관리', '생산계획'],
    },
    {
        id: 3,
        num: '03',
        title: '수행계획',
        subtitle: 'Timeline',
        description: 'M~M+9 개발 일정 및 단계별 산출물',
        href: '/proposal/timeline',
        icon: Calendar,
        color: colors.warning,
        items: ['분석/설계', '개발', '테스트', '안정화'],
    },
    {
        id: 4,
        num: '04',
        title: 'H/W & S/W 구성',
        subtitle: 'Architecture',
        description: '시스템 구성도 및 기술 스택',
        href: '/proposal/architecture',
        icon: Server,
        color: colors.info,
        items: ['PostgreSQL', 'Nginx', 'RealGrid', 'Next.js'],
    },
];

export default function ProposalMain() {
    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Main Content */}
            <div>
                {/* Hero Header */}
                <header className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #1e1e2d 100%)` }}>
                    <div className="px-12 py-16 relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: colors.primary + '30', color: colors.primary }}>
                                MES/MRP System
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: colors.success + '30', color: colors.success }}>
                                2025.12
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">스페이스프로</h1>
                        <h2 className="text-2xl text-white/80 mb-6">MES 생산계획 시스템 구축 제안</h2>
                        <p className="text-white/60 max-w-2xl">
                            생산진행 모듈, 생산계획 모듈, 자재&금형관리 모듈, 기준정보 모듈을 통합한
                            MES(Manufacturing Execution System) 구축 제안서입니다.
                        </p>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: colors.primary, transform: 'translate(30%, -30%)' }} />
                    <div className="absolute bottom-0 right-32 w-64 h-64 rounded-full opacity-5" style={{ background: colors.success, transform: 'translateY(30%)' }} />
                </header>

                {/* Contents Nav */}
                <div className="px-8 py-6 bg-white border-b" style={{ borderColor: colors.gray200 }}>
                    <div className="flex items-center gap-6">
                        <span className="text-sm font-semibold" style={{ color: colors.gray800 }}>Contents</span>
                        {sections.map((section, i) => (
                            <a
                                key={section.id}
                                href={section.href}
                                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                                style={{ color: section.color }}
                            >
                                <span className="font-bold">{section.num}.</span>
                                <span>{section.title}</span>
                                {i < sections.length - 1 && <span className="mx-2" style={{ color: colors.gray300 }}>|</span>}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Section Cards */}
                <main className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                            <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: section.color + '15' }}>
                                                <Icon className="w-8 h-8" style={{ color: section.color }} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-3xl font-bold" style={{ color: section.color }}>{section.num}</span>
                                                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: section.color + '15', color: section.color }}>
                                                        {section.subtitle}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-semibold" style={{ color: colors.gray900 }}>{section.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm mb-4" style={{ color: colors.gray600 }}>{section.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {section.items.map((item, i) => (
                                                <span key={i} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: colors.gray100, color: colors.gray600 }}>
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="px-6 py-4 flex items-center justify-between border-t group-hover:bg-gray-50 transition-colors" style={{ borderColor: colors.gray200 }}>
                                        <span className="text-sm font-medium" style={{ color: section.color }}>상세 보기</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: section.color }} />
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {/* Key Points */}
                    <div className="mt-8 bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.gray900 }}>핵심 도입 효과</h3>
                        <div className="grid grid-cols-4 gap-6">
                            {[
                                { icon: Factory, label: '생산 모니터링', desc: '실시간 생산진행 집계' },
                                { icon: Package, label: '자재 추적성', desc: '라인內 자재 실시간 관리' },
                                { icon: BarChart3, label: '계획 경영', desc: '납기 약속 준수율 향상' },
                                { icon: Clock, label: 'L/T 자동 산정', desc: 'Track In/Out 기반' },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div key={i} className="text-center">
                                        <div className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                                            <Icon className="w-7 h-7" style={{ color: colors.primary }} />
                                        </div>
                                        <h4 className="font-medium text-sm mb-1" style={{ color: colors.gray800 }}>{item.label}</h4>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

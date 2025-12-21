/**
 * 01. 제안 개요 - 현황 분석, 개선과제, 시스템 목표
 */

'use client';

import React from 'react';
import {
    ChevronLeft, ChevronRight, Factory, Package, Wrench, Database,
    Target, TrendingUp, CheckCircle2, ArrowRight
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

const improvementItems = [
    {
        category: '생산관리',
        icon: Factory,
        color: colors.primary,
        description: '주요진행관리에 상황을 실시간 집계 & 모니터링 필요',
        details: [
            '20여개 공장內 생산진행관리',
            '주별/일별 생산계획 시스템화',
            '설비가동 현황 모니터링',
            '외주물량 관리',
            '다품종 제품에 대한 기준정보',
        ],
    },
    {
        category: '라인內 자재관리',
        icon: Package,
        color: colors.success,
        description: '라인內 주요자재 실시간 관리',
        details: [
            '생산계획과 연동하여 자재 수급정보',
            '라인內 보유자재 현황',
            '선입고 자재현황 관리',
        ],
    },
    {
        category: '금형관리',
        icon: Wrench,
        color: colors.warning,
        description: '금형(위치) 정보 관리',
        details: [
            '라인간 금형 이동시 시스템으로 관리',
        ],
    },
];

const systemModules = [
    { name: '생산진행 모듈', color: colors.primary },
    { name: '생산계획 모듈', color: colors.success },
    { name: '자재&금형관리 모듈', color: colors.warning },
    { name: '기준정보 모듈', color: colors.info },
];

const objectives = [
    {
        category: '기준정보',
        items: ['계획/실적 BOM', '제품기준정보', '자재 기준정보', '설비기준정보', '작업자 기준정보'],
        color: colors.info,
    },
    {
        category: '생산관리',
        items: ['실적관리', '진척율 관리', 'L/T 관리'],
        color: colors.primary,
    },
    {
        category: '생산계획',
        items: ['일별 생산계획', '주별 생산계획', '월별 생산계획', '자재 소요량 정보'],
        color: colors.success,
    },
    {
        category: '라인內 자재관리',
        items: ['라인內 자재 재고', '주요 자재 반입 정보', '주요 자재 사용정보', '금형 반입,반출정보'],
        color: colors.warning,
    },
];

export default function ProposalOverview() {
    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Header */}
            <header className="bg-white border-b px-8 py-4" style={{ borderColor: colors.gray200 }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/proposal" className="p-2 rounded-lg hover:bg-gray-100">
                            <ChevronLeft className="w-5 h-5" style={{ color: colors.gray600 }} />
                        </a>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold" style={{ color: colors.primary }}>01</span>
                                <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>제안 개요</h1>
                            </div>
                            <p className="text-sm" style={{ color: colors.gray500 }}>현황 분석, 개선과제, 시스템 목표</p>
                        </div>
                    </div>
                    <a href="/proposal/solution" className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.primary + '15', color: colors.primary }}>
                        <span className="text-sm font-medium">다음: 제안 내용</span>
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            </header>

            <main className="p-8">
                {/* 개선항목 */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-4" style={{ color: colors.gray900 }}>개선항목</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {improvementItems.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                    <div className="p-5" style={{ background: item.color + '10' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: item.color + '20' }}>
                                                <Icon className="w-6 h-6" style={{ color: item.color }} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold" style={{ color: colors.gray900 }}>{item.category}</h3>
                                                <p className="text-xs" style={{ color: colors.gray600 }}>{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs font-medium mb-3" style={{ color: colors.gray500 }}>주요내용</p>
                                        <ul className="space-y-2">
                                            {item.details.map((detail, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm" style={{ color: colors.gray700 }}>
                                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 개선과제 -> MES 시스템 */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-4" style={{ color: colors.gray900 }}>개선과제 → MES 시스템</h2>
                    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center justify-center gap-4">
                            {systemModules.map((module, i) => (
                                <React.Fragment key={i}>
                                    <div className="flex flex-col items-center">
                                        <div className="w-32 h-20 rounded-xl flex items-center justify-center text-center p-2" style={{ background: module.color + '15', border: `2px solid ${module.color}` }}>
                                            <span className="text-sm font-medium" style={{ color: module.color }}>{module.name}</span>
                                        </div>
                                    </div>
                                    {i < systemModules.length - 1 && (
                                        <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />
                                    )}
                                </React.Fragment>
                            ))}
                            <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />
                            <div className="w-40 h-24 rounded-xl flex items-center justify-center" style={{ background: colors.dark, border: `3px solid ${colors.primary}` }}>
                                <span className="text-white font-bold">MES 시스템</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 목표 */}
                <section>
                    <h2 className="text-lg font-semibold mb-4" style={{ color: colors.gray900 }}>목표</h2>
                    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center justify-center gap-8 mb-8">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: colors.primary + '15' }}>
                                    <Target className="w-10 h-10" style={{ color: colors.primary }} />
                                </div>
                                <p className="text-sm font-medium" style={{ color: colors.gray800 }}>시스템을 통한</p>
                                <p className="text-sm font-bold" style={{ color: colors.primary }}>경영관리</p>
                            </div>
                            <ArrowRight className="w-8 h-8" style={{ color: colors.gray300 }} />
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: colors.danger + '15' }}>
                                    <TrendingUp className="w-10 h-10" style={{ color: colors.danger }} />
                                </div>
                                <p className="text-sm font-medium" style={{ color: colors.gray800 }}>누수현상</p>
                                <p className="text-sm font-bold" style={{ color: colors.danger }}>최소화</p>
                            </div>
                            <ArrowRight className="w-8 h-8" style={{ color: colors.gray300 }} />
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: colors.success + '15' }}>
                                    <CheckCircle2 className="w-10 h-10" style={{ color: colors.success }} />
                                </div>
                                <p className="text-sm font-medium" style={{ color: colors.gray800 }}>납기약속</p>
                                <p className="text-sm font-bold" style={{ color: colors.success }}>계획 경영</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {objectives.map((obj, i) => (
                                <div key={i} className="rounded-xl p-4" style={{ background: obj.color + '10' }}>
                                    <h4 className="font-semibold text-sm mb-3" style={{ color: obj.color }}>{obj.category}</h4>
                                    <ul className="space-y-1.5">
                                        {obj.items.map((item, j) => (
                                            <li key={j} className="text-xs flex items-center gap-1.5" style={{ color: colors.gray700 }}>
                                                <span className="w-1 h-1 rounded-full" style={{ background: obj.color }} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs mt-4 text-center" style={{ color: colors.gray400 }}>※ L/T : Lead Time</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

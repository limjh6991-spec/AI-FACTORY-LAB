/**
 * 03. 수행계획 - 추진 일정 (M~M+9)
 */

'use client';

import React from 'react';
import {
    ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle2
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

const modules = [
    {
        name: '기준정보',
        color: colors.info,
        phases: [
            { type: 'analysis', start: 0, duration: 2 },
            { type: 'develop', start: 2, duration: 2 },
            { type: 'test', start: 4, duration: 1 },
        ],
    },
    {
        name: '생산관리',
        color: colors.primary,
        phases: [
            { type: 'analysis', start: 1, duration: 2 },
            { type: 'develop', start: 3, duration: 3 },
            { type: 'test', start: 6, duration: 1 },
        ],
    },
    {
        name: '자재관리',
        color: colors.warning,
        phases: [
            { type: 'analysis', start: 2, duration: 2 },
            { type: 'develop', start: 4, duration: 2 },
            { type: 'test', start: 6, duration: 1 },
        ],
    },
    {
        name: '생산계획',
        color: colors.success,
        phases: [
            { type: 'analysis', start: 3, duration: 2 },
            { type: 'develop', start: 5, duration: 3 },
            { type: 'test', start: 8, duration: 1 },
        ],
    },
];

const months = ['M', 'M+1', 'M+2', 'M+3', 'M+4', 'M+5', 'M+6', 'M+7', 'M+8', 'M+9'];

const phaseColors: Record<string, { bg: string; text: string; label: string }> = {
    analysis: { bg: '#E8F4FF', text: colors.primary, label: '분석/설계' },
    develop: { bg: '#E8FFF3', text: colors.success, label: '개발' },
    test: { bg: '#FFF4E5', text: colors.warning, label: '테스트' },
};

export default function ProposalTimeline() {
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
                                <span className="text-2xl font-bold" style={{ color: colors.warning }}>03</span>
                                <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>수행계획</h1>
                            </div>
                            <p className="text-sm" style={{ color: colors.gray500 }}>추진 일정 (M ~ M+9)</p>
                        </div>
                    </div>
                    <a href="/proposal/architecture" className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.info + '15', color: colors.info }}>
                        <span className="text-sm font-medium">다음: 시스템 구성</span>
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            </header>

            <main className="p-8">
                {/* 범례 */}
                <div className="flex items-center gap-6 mb-6">
                    <span className="text-sm font-medium" style={{ color: colors.gray700 }}>범례:</span>
                    {Object.entries(phaseColors).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ background: value.bg, border: `2px solid ${value.text}` }} />
                            <span className="text-sm" style={{ color: colors.gray600 }}>{value.label}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 ml-4">
                        <div className="w-4 h-4 rounded" style={{ background: colors.danger + '20', border: `2px solid ${colors.danger}` }} />
                        <span className="text-sm" style={{ color: colors.gray600 }}>안정화</span>
                    </div>
                </div>

                {/* Gantt Chart */}
                <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    {/* Header */}
                    <div className="flex border-b" style={{ borderColor: colors.gray200 }}>
                        <div className="w-40 p-4 flex-shrink-0 border-r" style={{ borderColor: colors.gray200, background: colors.gray100 }}>
                            <span className="font-semibold text-sm" style={{ color: colors.gray700 }}>모듈</span>
                        </div>
                        <div className="flex-1 flex">
                            {months.map((month, i) => (
                                <div
                                    key={i}
                                    className="flex-1 p-4 text-center border-r last:border-r-0"
                                    style={{ borderColor: colors.gray200, background: i === 9 ? colors.danger + '10' : colors.gray100 }}
                                >
                                    <span className="text-sm font-medium" style={{ color: i === 9 ? colors.danger : colors.gray700 }}>{month}</span>
                                </div>
                            ))}
                        </div>
                        <div className="w-24 p-4 flex-shrink-0 text-center" style={{ background: colors.gray100 }}>
                            <span className="font-semibold text-sm" style={{ color: colors.gray700 }}>비고</span>
                        </div>
                    </div>

                    {/* Rows */}
                    {modules.map((module, i) => (
                        <div key={i} className="flex border-b last:border-b-0" style={{ borderColor: colors.gray200 }}>
                            <div className="w-40 p-4 flex-shrink-0 border-r flex items-center gap-2" style={{ borderColor: colors.gray200 }}>
                                <div className="w-3 h-3 rounded-full" style={{ background: module.color }} />
                                <span className="font-medium text-sm" style={{ color: colors.gray800 }}>{module.name}</span>
                            </div>
                            <div className="flex-1 flex relative" style={{ height: '60px' }}>
                                {months.map((_, j) => (
                                    <div
                                        key={j}
                                        className="flex-1 border-r last:border-r-0"
                                        style={{ borderColor: colors.gray100, background: j === 9 ? colors.danger + '05' : 'transparent' }}
                                    />
                                ))}
                                {/* Phase bars */}
                                {module.phases.map((phase, j) => {
                                    const phaseStyle = phaseColors[phase.type];
                                    const cellWidth = 100 / months.length;
                                    return (
                                        <div
                                            key={j}
                                            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-lg flex items-center justify-center text-xs font-medium"
                                            style={{
                                                left: `${phase.start * cellWidth}%`,
                                                width: `${phase.duration * cellWidth}%`,
                                                background: phaseStyle.bg,
                                                border: `2px solid ${phaseStyle.text}`,
                                                color: phaseStyle.text,
                                            }}
                                        >
                                            {phaseStyle.label}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="w-24 p-4 flex-shrink-0 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5" style={{ color: colors.success }} />
                            </div>
                        </div>
                    ))}

                    {/* 안정화 Row */}
                    <div className="flex" style={{ background: colors.danger + '05' }}>
                        <div className="w-40 p-4 flex-shrink-0 border-r flex items-center gap-2" style={{ borderColor: colors.gray200 }}>
                            <div className="w-3 h-3 rounded-full" style={{ background: colors.danger }} />
                            <span className="font-medium text-sm" style={{ color: colors.gray800 }}>안정화</span>
                        </div>
                        <div className="flex-1 flex relative" style={{ height: '60px' }}>
                            {months.map((_, j) => (
                                <div key={j} className="flex-1 border-r last:border-r-0" style={{ borderColor: colors.gray100 }} />
                            ))}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-8 rounded-lg flex items-center justify-center text-xs font-medium"
                                style={{
                                    left: `${9 * (100 / months.length)}%`,
                                    width: `${1 * (100 / months.length)}%`,
                                    background: colors.danger + '20',
                                    border: `2px solid ${colors.danger}`,
                                    color: colors.danger,
                                }}
                            >
                                안정화
                            </div>
                        </div>
                        <div className="w-24 p-4 flex-shrink-0 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5" style={{ color: colors.success }} />
                        </div>
                    </div>
                </div>

                {/* 산출물 */}
                <div className="mt-8 bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>단계별 산출물</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { phase: '분석/설계', items: ['요구사항 정의서', '화면설계서', 'ERD/테이블정의서', '인터페이스 정의서'] },
                            { phase: '개발', items: ['소스코드', '단위테스트 결과서', '개발자 문서'] },
                            { phase: '테스트', items: ['통합테스트 시나리오', '테스트 결과서', '이슈 리스트'] },
                            { phase: '안정화', items: ['사용자 매뉴얼', '교육 자료', '인수인계서', '유지보수 계약서'] },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                <h4 className="text-sm font-semibold mb-3" style={{ color: colors.gray800 }}>{item.phase}</h4>
                                <ul className="space-y-1.5">
                                    {item.items.map((doc, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs" style={{ color: colors.gray600 }}>
                                            <CheckCircle2 className="w-3 h-3" style={{ color: colors.success }} />
                                            {doc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs mt-4 text-center" style={{ color: colors.gray400 }}>
                    ※ 개발방법론 및 프로젝트 산출물은 스페이스프로社의 프로세스를 준수하여 진행
                </p>
            </main>
        </div>
    );
}

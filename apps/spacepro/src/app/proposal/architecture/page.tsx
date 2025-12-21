/**
 * 04. H/W & S/W 구성도 - 시스템 아키텍처
 */

'use client';

import React from 'react';
import {
    ChevronLeft, Server, Database, Monitor, Globe,
    Cpu, Shield, Zap, CheckCircle2
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

const techStack = [
    {
        category: 'Database',
        items: [
            { name: 'PostgreSQL', desc: '오픈소스 RDBMS', icon: Database, license: 'Open Source' },
        ],
    },
    {
        category: 'Web Server',
        items: [
            { name: 'Nginx', desc: '고성능 웹서버', icon: Globe, license: 'Open Source' },
        ],
    },
    {
        category: 'UI Framework',
        items: [
            { name: 'RealGrid', desc: '국산 그리드 컴포넌트', icon: Monitor, license: '약 1,200만원' },
            { name: 'Next.js', desc: 'React 프레임워크', icon: Zap, license: 'Open Source' },
        ],
    },
];

export default function ProposalArchitecture() {
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
                                <span className="text-2xl font-bold" style={{ color: colors.info }}>04</span>
                                <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>H/W & S/W 구성도</h1>
                            </div>
                            <p className="text-sm" style={{ color: colors.gray500 }}>시스템 아키텍처</p>
                        </div>
                    </div>
                    <a href="/proposal" className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.primary + '15', color: colors.primary }}>
                        <span className="text-sm font-medium">제안서 메인으로</span>
                    </a>
                </div>
            </header>

            <main className="p-8">
                {/* 시스템 구성도 */}
                <div className="bg-white rounded-xl p-8 mb-8" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <h3 className="font-semibold mb-6" style={{ color: colors.gray900 }}>시스템 구성도</h3>

                    <div className="flex items-center justify-center gap-8">
                        {/* DB Servers */}
                        <div className="space-y-4">
                            <div className="w-48 p-4 rounded-xl text-center" style={{ background: colors.primary + '10', border: `2px solid ${colors.primary}` }}>
                                <Database className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                                <p className="font-semibold text-sm" style={{ color: colors.gray800 }}>DB Server Master</p>
                                <div className="mt-2 px-3 py-1 rounded-lg text-xs" style={{ background: colors.dark, color: 'white' }}>
                                    PostgreSQL
                                </div>
                            </div>
                            <div className="w-48 p-4 rounded-xl text-center" style={{ background: colors.gray100, border: `2px dashed ${colors.gray300}` }}>
                                <Database className="w-8 h-8 mx-auto mb-2" style={{ color: colors.gray400 }} />
                                <p className="font-semibold text-sm" style={{ color: colors.gray600 }}>DB Server Backup</p>
                                <div className="mt-2 px-3 py-1 rounded-lg text-xs" style={{ background: colors.dark, color: 'white' }}>
                                    PostgreSQL
                                </div>
                            </div>
                        </div>

                        {/* Connection Line */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-0.5" style={{ background: colors.gray300 }} />
                            <Shield className="w-5 h-5" style={{ color: colors.success }} />
                            <div className="w-16 h-0.5" style={{ background: colors.gray300 }} />
                        </div>

                        {/* App Servers */}
                        <div className="space-y-4">
                            <div className="w-56 p-4 rounded-xl" style={{ background: colors.success + '10', border: `2px solid ${colors.success}` }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <Server className="w-6 h-6" style={{ color: colors.success }} />
                                    <p className="font-semibold text-sm" style={{ color: colors.gray800 }}>Application Server 1</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: colors.dark, color: 'white' }}>
                                        엔진엑스 (Nginx)
                                    </div>
                                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: colors.info, color: 'white' }}>
                                        RealGrid
                                    </div>
                                </div>
                            </div>
                            <div className="w-56 p-4 rounded-xl" style={{ background: colors.success + '10', border: `2px solid ${colors.success}` }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <Server className="w-6 h-6" style={{ color: colors.success }} />
                                    <p className="font-semibold text-sm" style={{ color: colors.gray800 }}>Application Server 2</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: colors.dark, color: 'white' }}>
                                        엔진엑스 (Nginx)
                                    </div>
                                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: colors.info, color: 'white' }}>
                                        RealGrid
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Connection Line */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-0.5" style={{ background: colors.gray300 }} />
                            <Globe className="w-5 h-5" style={{ color: colors.primary }} />
                            <div className="w-16 h-0.5" style={{ background: colors.gray300 }} />
                        </div>

                        {/* Clients */}
                        <div className="space-y-4">
                            <div className="w-40 p-4 rounded-xl text-center" style={{ background: colors.warning + '10', border: `2px solid ${colors.warning}` }}>
                                <Monitor className="w-8 h-8 mx-auto mb-2" style={{ color: colors.warning }} />
                                <p className="font-semibold text-sm" style={{ color: colors.gray800 }}>PC Client</p>
                            </div>
                            <div className="w-40 p-4 rounded-xl text-center" style={{ background: colors.warning + '10', border: `2px solid ${colors.warning}` }}>
                                <Cpu className="w-8 h-8 mx-auto mb-2" style={{ color: colors.warning }} />
                                <p className="font-semibold text-sm" style={{ color: colors.gray800 }}>PDA / Tablet</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 기술 스택 */}
                <div className="bg-white rounded-xl p-6 mb-8" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <h3 className="font-semibold mb-6" style={{ color: colors.gray900 }}>기술 스택</h3>
                    <div className="grid grid-cols-3 gap-6">
                        {techStack.map((category, i) => (
                            <div key={i}>
                                <h4 className="text-sm font-medium mb-3" style={{ color: colors.gray500 }}>{category.category}</h4>
                                <div className="space-y-3">
                                    {category.items.map((item, j) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={j} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: colors.gray100 }}>
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                                                    <Icon className="w-5 h-5" style={{ color: colors.primary }} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm" style={{ color: colors.gray800 }}>{item.name}</p>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>{item.desc}</p>
                                                </div>
                                                <span className="text-xs px-2 py-1 rounded" style={{
                                                    background: item.license === 'Open Source' ? colors.success + '15' : colors.warning + '15',
                                                    color: item.license === 'Open Source' ? colors.success : colors.warning
                                                }}>
                                                    {item.license}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 구성 특징 */}
                <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: colors.gray900 }}>구성 특징</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { icon: Shield, title: '고가용성', desc: 'Application 및 DB Server는 이중화로 구성하여 장애 및 재해에 대비' },
                            { icon: Zap, title: '투자효율화', desc: 'DBMS 및 Web Server는 오픈 라이선스를 사용하여 비용 절감' },
                            { icon: CheckCircle2, title: '국산 UI', desc: 'Web Component는 국산 툴(RealGrid)을 사용 (약 1,200만원)' },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon className="w-5 h-5" style={{ color: colors.primary }} />
                                        <span className="font-medium text-sm" style={{ color: colors.gray800 }}>{item.title}</span>
                                    </div>
                                    <p className="text-xs" style={{ color: colors.gray600 }}>{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}

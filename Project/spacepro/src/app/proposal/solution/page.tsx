/**
 * 02. 제안 내용 - 기준정보, 자재관리, 생산관리, 생산계획 프로세스
 */

'use client';

import React, { useState } from 'react';
import {
    ChevronLeft, ChevronRight, Database, Package, Factory, Calendar,
    ArrowRight, ArrowDown, CheckCircle2, Smartphone
} from 'lucide-react';

const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    dark: '#181C32',
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

const tabs = [
    { id: 'master', label: '기준정보', icon: Database, color: colors.info },
    { id: 'material', label: '자재관리', icon: Package, color: colors.warning },
    { id: 'production', label: '생산관리', icon: Factory, color: colors.primary },
    { id: 'planning', label: '생산계획', icon: Calendar, color: colors.success },
];

export default function ProposalSolution() {
    const [activeTab, setActiveTab] = useState('master');

    const renderMasterData = () => (
        <div className="space-y-6">
            <p className="text-sm" style={{ color: colors.gray600 }}>
                기 구축 활용되고 있는 기준정보를 최대한 재활용하여 기준정보 관리를 일원화하고
                미흡한 기준정보는 재설계하여 시스템간, 조직간 의사소통 및 정보의 일원화
            </p>
            <div className="flex items-center justify-center gap-4">
                {/* ERP 기준정보 */}
                <div className="w-40 p-4 rounded-xl text-center" style={{ background: colors.gray100, border: `2px solid ${colors.gray300}` }}>
                    <span className="text-sm font-medium" style={{ color: colors.gray700 }}>ERP 기준정보</span>
                    <p className="text-xs mt-1" style={{ color: colors.gray500 }}>I/F</p>
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />

                {/* 기준정보 시스템 */}
                <div className="p-6 rounded-xl" style={{ background: colors.info + '10', border: `2px solid ${colors.info}` }}>
                    <h4 className="font-semibold text-center mb-4" style={{ color: colors.info }}>기준정보 시스템</h4>
                    <div className="grid grid-cols-3 gap-3">
                        {['BOM 정보', '제품 정보', '자재 정보', '설비 정보', '작업자 정보', '제품/설비 L/T 정보'].map((item, i) => (
                            <div key={i} className="px-3 py-2 rounded-lg text-center text-xs font-medium" style={{ background: colors.white, color: colors.info }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />

                {/* 활용 */}
                <div className="space-y-2">
                    {['생산계획', '생산관리', '자재재고'].map((item, i) => (
                        <div key={i} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: colors.success + '15', color: colors.success }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center gap-4">
                {['활용정보', '현황정보', '분석정보'].map((item, i) => (
                    <div key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: colors.info + '10', color: colors.info }}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderMaterial = () => (
        <div className="space-y-6">
            <p className="text-sm" style={{ color: colors.gray600 }}>
                라인內 주요 자재 및 금형의 반입, 반출 관리를 통해서 실물과 장부 정보 일치화<br />
                실시간 주요 자재 현황 정보 제공 / 금형의 위치정보를 시스템을 통해서 관리
            </p>
            <div className="flex items-center justify-center gap-6">
                {/* 입력 */}
                <div className="space-y-2">
                    {['주요자재', '금형', '원자재수급', '계획대비실적', '재고정보', '창고 반출입'].map((item, i) => (
                        <div key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: colors.warning + '15', color: colors.warning }}>
                            {item}
                        </div>
                    ))}
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />

                {/* 시스템 */}
                <div className="p-6 rounded-xl" style={{ background: colors.warning + '10', border: `2px solid ${colors.warning}` }}>
                    <h4 className="font-semibold text-center mb-4" style={{ color: colors.warning }}>라인內 자재 시스템</h4>
                    <div className="flex gap-4">
                        <div className="w-16 h-20 rounded-lg flex flex-col items-center justify-center" style={{ background: colors.dark }}>
                            <Smartphone className="w-6 h-6 text-white" />
                            <span className="text-[10px] text-white mt-1">PDA</span>
                        </div>
                        <div className="w-16 h-20 rounded-lg flex flex-col items-center justify-center" style={{ background: colors.dark }}>
                            <Smartphone className="w-6 h-6 text-white" />
                            <span className="text-[10px] text-white mt-1">PDA</span>
                        </div>
                    </div>
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />

                {/* 출력 */}
                <div className="space-y-2">
                    {['활용정보', '금형위치정보'].map((item, i) => (
                        <div key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: colors.success + '15', color: colors.success }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderProduction = () => (
        <div className="space-y-6">
            <p className="text-sm" style={{ color: colors.gray600 }}>
                설비에 Track In, Track Out 정보를 실시간 관리 → L/T 자동 산정<br />
                생산에 필요한 주요 자재정보를 제공 (현 장소에 가용할 자재가 있는지 정보제공)<br />
                공정진척도 관리, 예상완료일 정보 제공
            </p>
            <div className="flex items-center justify-center gap-6">
                {/* 입력 */}
                <div className="space-y-2">
                    {['원자재수급', '생산계획', '생산실적', '1차 공정별 Allocation'].map((item, i) => (
                        <div key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: colors.primary + '15', color: colors.primary }}>
                            {item}
                        </div>
                    ))}
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />

                {/* 시스템 */}
                <div className="p-6 rounded-xl" style={{ background: colors.primary + '10', border: `2px solid ${colors.primary}` }}>
                    <h4 className="font-semibold text-center mb-4" style={{ color: colors.primary }}>생산관리 시스템</h4>
                    <div className="flex gap-4">
                        <div className="w-16 h-20 rounded-lg flex flex-col items-center justify-center" style={{ background: colors.dark }}>
                            <Smartphone className="w-6 h-6 text-white" />
                            <span className="text-[10px] text-white mt-1">PDA</span>
                        </div>
                        <div className="w-16 h-20 rounded-lg flex flex-col items-center justify-center" style={{ background: colors.dark }}>
                            <Smartphone className="w-6 h-6 text-white" />
                            <span className="text-[10px] text-white mt-1">PDA</span>
                        </div>
                    </div>
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />

                {/* 출력 */}
                <div className="space-y-2">
                    {['활용정보', '납기예측'].map((item, i) => (
                        <div key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: colors.success + '15', color: colors.success }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPlanning = () => (
        <div className="space-y-6">
            <p className="text-sm" style={{ color: colors.gray600 }}>
                Daily 생산 실적을 모니터링하고, 제품별에 대한 진행상황을 바탕으로 납기에 대한 정합성 향상<br />
                향후 수주/납기관리 시스템과 연동하여 수주 건별 납기에 대한 Risk를 최소화하고<br />
                BOM시스템과 생산계획 시스템 활용하여 원자재 수급에 적극 활용
            </p>
            <div className="flex items-center justify-center gap-4">
                {/* 기초정보 */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-center mb-2" style={{ color: colors.gray500 }}>기초정보</p>
                    {['수주정보', '납기정보', 'L/T정보'].map((item, i) => (
                        <div key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: colors.success + '15', color: colors.success }}>
                            {item}
                        </div>
                    ))}
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />

                {/* 시스템 */}
                <div className="p-6 rounded-xl" style={{ background: colors.success + '10', border: `2px solid ${colors.success}` }}>
                    <h4 className="font-semibold text-center mb-4" style={{ color: colors.success }}>생산계획 시스템</h4>
                    <div className="space-y-2">
                        {['1차 공정별 Allocation', '2차 설비 Allocation', '최종 월,주,일별 Allocation'].map((item, i) => (
                            <div key={i} className="px-3 py-2 rounded-lg text-xs font-medium text-center" style={{ background: colors.white, color: colors.success }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: colors.gray300 }} />

                {/* 활용정보 */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-center mb-2" style={{ color: colors.gray500 }}>활용정보</p>
                    {['원자재수급', '계획대비실적', '계획원가', '납기정보 최적화'].map((item, i) => (
                        <div key={i} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: colors.primary + '15', color: colors.primary }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-xs text-center" style={{ color: colors.gray400 }}>L/T : Lead Time</p>
        </div>
    );

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
                                <span className="text-2xl font-bold" style={{ color: colors.success }}>02</span>
                                <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>제안 내용</h1>
                            </div>
                            <p className="text-sm" style={{ color: colors.gray500 }}>기준정보, 자재관리, 생산관리, 생산계획 프로세스</p>
                        </div>
                    </div>
                    <a href="/proposal/timeline" className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.warning + '15', color: colors.warning }}>
                        <span className="text-sm font-medium">다음: 수행계획</span>
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            </header>

            <main className="p-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all"
                                style={{
                                    background: activeTab === tab.id ? tab.color : colors.white,
                                    color: activeTab === tab.id ? 'white' : colors.gray600,
                                    boxShadow: activeTab === tab.id ? `0 4px 12px ${tab.color}40` : '0 0 20px 0 rgba(76,87,125,.02)',
                                }}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label} 프로세스
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl p-8" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    {activeTab === 'master' && renderMasterData()}
                    {activeTab === 'material' && renderMaterial()}
                    {activeTab === 'production' && renderProduction()}
                    {activeTab === 'planning' && renderPlanning()}
                </div>
            </main>
        </div>
    );
}

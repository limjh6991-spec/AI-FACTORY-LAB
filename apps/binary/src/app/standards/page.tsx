/**
 * Binary Soft - 프로젝트 수행표준
 * 프로젝트 수행 가이드라인 및 표준 문서
 */

'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    FileText,
    CheckSquare,
    Users,
    Calendar,
    AlertTriangle,
    Download,
    ChevronRight,
    Clock,
    Target,
    Briefcase,
    Shield
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

// 수행표준 카테고리
const standardCategories = [
    {
        id: 'project-lifecycle',
        title: '프로젝트 생명주기',
        icon: <Target className="w-6 h-6" />,
        color: colors.primary,
        description: '프로젝트 단계별 수행 절차',
        items: [
            { name: '수주 단계 가이드', type: 'document' },
            { name: '착수 단계 가이드', type: 'document' },
            { name: '개발 단계 가이드', type: 'document' },
            { name: '검수 단계 가이드', type: 'document' },
            { name: '종료 단계 가이드', type: 'document' },
        ]
    },
    {
        id: 'deliverables',
        title: '산출물 표준',
        icon: <FileText className="w-6 h-6" />,
        color: colors.success,
        description: '프로젝트 산출물 템플릿 및 가이드',
        items: [
            { name: '요구사항 정의서 템플릿', type: 'template' },
            { name: '설계서 템플릿', type: 'template' },
            { name: '테스트 계획서 템플릿', type: 'template' },
            { name: '사용자 매뉴얼 템플릿', type: 'template' },
            { name: '완료 보고서 템플릿', type: 'template' },
        ]
    },
    {
        id: 'quality',
        title: '품질 관리',
        icon: <Shield className="w-6 h-6" />,
        color: colors.info,
        description: '코드 품질 및 테스트 기준',
        items: [
            { name: '코딩 표준 가이드', type: 'document' },
            { name: '코드 리뷰 체크리스트', type: 'checklist' },
            { name: '테스트 수행 가이드', type: 'document' },
            { name: '결함 관리 프로세스', type: 'document' },
        ]
    },
    {
        id: 'communication',
        title: '커뮤니케이션',
        icon: <Users className="w-6 h-6" />,
        color: colors.warning,
        description: '보고 및 회의 체계',
        items: [
            { name: '주간 보고서 양식', type: 'template' },
            { name: '회의록 템플릿', type: 'template' },
            { name: '이슈 관리 프로세스', type: 'document' },
            { name: '고객 커뮤니케이션 가이드', type: 'document' },
        ]
    },
    {
        id: 'risk',
        title: '리스크 관리',
        icon: <AlertTriangle className="w-6 h-6" />,
        color: colors.danger,
        description: '리스크 식별 및 대응',
        items: [
            { name: '리스크 관리 계획서', type: 'template' },
            { name: '리스크 등록부 양식', type: 'template' },
            { name: '대응 전략 가이드', type: 'document' },
        ]
    },
];

// 프로젝트 단계별 체크리스트
const phaseChecklists = [
    {
        phase: '수주',
        items: ['제안서 작성', '견적서 작성', '계약서 검토', '착수 일정 협의']
    },
    {
        phase: '착수',
        items: ['킥오프 미팅 진행', '프로젝트 계획서 작성', 'WBS 수립', '팀 구성 확정']
    },
    {
        phase: '개발',
        items: ['요구사항 분석', '설계서 작성', '개발 진행', '단위 테스트', '통합 테스트']
    },
    {
        phase: '검수',
        items: ['사용자 테스트', '결함 수정', '사용자 교육', '인수 테스트']
    },
    {
        phase: '종료',
        items: ['완료 보고서', '산출물 정리', '유지보수 인계', '프로젝트 회고']
    },
];

export default function StandardsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Header */}
            <header className="h-[65px] bg-white border-b flex items-center justify-between px-8" style={{ borderColor: colors.gray200 }}>
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-semibold" style={{ color: colors.gray900 }}>프로젝트 수행표준</h1>
                    <span className="text-sm" style={{ color: colors.gray500 }}>표준 문서 및 가이드라인</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-8">
                {/* Category Cards */}
                <div className="grid grid-cols-5 gap-4 mb-8">
                    {standardCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                            className="bg-white rounded-xl p-5 text-left hover:shadow-md transition-all"
                            style={{
                                boxShadow: '0 0 20px 0 rgba(76,87,125,.02)',
                                borderLeft: selectedCategory === category.id ? `4px solid ${category.color}` : '4px solid transparent'
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                style={{ background: category.color + '20' }}
                            >
                                <span style={{ color: category.color }}>{category.icon}</span>
                            </div>
                            <h3 className="text-sm font-semibold mb-1" style={{ color: colors.gray900 }}>{category.title}</h3>
                            <p className="text-xs" style={{ color: colors.gray500 }}>{category.description}</p>
                            <div className="mt-3 text-xs font-medium" style={{ color: category.color }}>
                                {category.items.length}개 항목
                            </div>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Category Detail or Default Content */}
                    <div className="col-span-8 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        {selectedCategory ? (
                            <div>
                                {(() => {
                                    const category = standardCategories.find(c => c.id === selectedCategory);
                                    if (!category) return null;
                                    return (
                                        <>
                                            <div className="p-6 border-b flex items-center gap-4" style={{ borderColor: colors.gray200 }}>
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                    style={{ background: category.color + '20' }}
                                                >
                                                    <span style={{ color: category.color }}>{category.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold" style={{ color: colors.gray900 }}>{category.title}</h3>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>{category.description}</p>
                                                </div>
                                            </div>
                                            <div className="divide-y" style={{ borderColor: colors.gray100 }}>
                                                {category.items.map((item, i) => (
                                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="w-4 h-4" style={{ color: colors.gray400 }} />
                                                            <span className="text-sm" style={{ color: colors.gray800 }}>{item.name}</span>
                                                            <span
                                                                className="text-[10px] px-2 py-0.5 rounded"
                                                                style={{
                                                                    background: item.type === 'template' ? colors.primary + '20' :
                                                                        item.type === 'checklist' ? colors.success + '20' : colors.gray200,
                                                                    color: item.type === 'template' ? colors.primary :
                                                                        item.type === 'checklist' ? colors.success : colors.gray600
                                                                }}
                                                            >
                                                                {item.type === 'template' ? '템플릿' : item.type === 'checklist' ? '체크리스트' : '문서'}
                                                            </span>
                                                        </div>
                                                        <button className="flex items-center gap-1 text-xs" style={{ color: colors.primary }}>
                                                            <Download className="w-3 h-3" />
                                                            다운로드
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        ) : (
                            <div className="p-6">
                                <h3 className="text-base font-semibold mb-6" style={{ color: colors.gray900 }}>프로젝트 수행표준 개요</h3>
                                <p className="text-sm mb-6" style={{ color: colors.gray600 }}>
                                    Binary Soft의 프로젝트 수행표준은 일관된 품질과 효율적인 프로젝트 관리를 위한 가이드라인입니다.
                                    상단의 카테고리를 선택하여 세부 문서를 확인하세요.
                                </p>

                                <div className="rounded-xl p-5 mb-6" style={{ background: colors.primary + '10' }}>
                                    <h4 className="text-sm font-semibold mb-3" style={{ color: colors.primary }}>📋 주요 원칙</h4>
                                    <ul className="space-y-2 text-sm" style={{ color: colors.gray700 }}>
                                        <li>• 모든 프로젝트는 5단계 생명주기를 따릅니다 (수주 → 착수 → 개발 → 검수 → 종료)</li>
                                        <li>• 각 단계별 필수 산출물을 작성하고 검토합니다</li>
                                        <li>• 주간 단위 진행상황 보고를 원칙으로 합니다</li>
                                        <li>• 모든 코드는 리뷰를 거쳐 반영합니다</li>
                                    </ul>
                                </div>

                                <div className="rounded-xl p-5" style={{ background: colors.success + '10' }}>
                                    <h4 className="text-sm font-semibold mb-3" style={{ color: colors.success }}>✅ 빠른 시작</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="text-left p-3 rounded-lg bg-white border text-sm" style={{ borderColor: colors.gray200, color: colors.gray700 }}>
                                            신규 프로젝트 착수 체크리스트
                                        </button>
                                        <button className="text-left p-3 rounded-lg bg-white border text-sm" style={{ borderColor: colors.gray200, color: colors.gray700 }}>
                                            필수 산출물 목록 다운로드
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Phase Checklists */}
                    <div className="col-span-4 bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <h3 className="text-base font-semibold mb-4" style={{ color: colors.gray900 }}>단계별 체크리스트</h3>
                        <div className="space-y-4">
                            {phaseChecklists.map((phase, i) => (
                                <div key={i} className="rounded-lg p-4" style={{ background: colors.gray100 }}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div
                                            className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                                            style={{ background: colors.primary }}
                                        >
                                            {i + 1}
                                        </div>
                                        <span className="text-sm font-semibold" style={{ color: colors.gray800 }}>{phase.phase}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {phase.items.map((item, j) => (
                                            <li key={j} className="flex items-center gap-2 text-xs" style={{ color: colors.gray600 }}>
                                                <CheckSquare className="w-3 h-3" style={{ color: colors.gray400 }} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

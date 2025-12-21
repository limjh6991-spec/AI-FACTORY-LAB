/**
 * 5. 착수 보고서 산출물 (Deliverables)
 * 프로젝트 착수 산출물 관리
 */

'use client';

import React, { useState } from 'react';
import {
    ChevronLeft, Download, Upload, FileText, Calendar, ClipboardList,
    FileCheck, ExternalLink, CheckCircle2, Clock, AlertCircle
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

interface Deliverable {
    id: number;
    name: string;
    description: string;
    format: string;
    status: 'draft' | 'review' | 'approved';
    dueDate: string;
    responsible: string;
    sections: string[];
    icon: React.ElementType;
}

const initialDeliverables: Deliverable[] = [
    {
        id: 1,
        name: 'WBS (Work Breakdown Structure)',
        description: '프로젝트 전체 일정 및 담당자 매핑, 작업 분류 체계',
        format: 'Excel / MS Project',
        status: 'draft',
        dueDate: '2024-12-25',
        responsible: 'PM',
        sections: [
            '단계별 작업 분류 (분석/개발/테스트/안정화)',
            '각 작업별 예상 소요일 (M/D)',
            '담당자 배정 (개발팀/현업)',
            '마일스톤 및 체크포인트',
            '의존성 관계 (선/후행 작업)',
        ],
        icon: Calendar,
    },
    {
        id: 2,
        name: '요구사항 정의서 (SRS)',
        description: 'Software Requirement Specification - 기능/비기능 요구사항 명세',
        format: 'Word / Confluence',
        status: 'draft',
        dueDate: '2024-12-28',
        responsible: 'BA / PM',
        sections: [
            '사용자 요구사항 목록',
            '기능 요구사항 (FR)',
            '비기능 요구사항 (NFR) - 성능, 보안, 가용성',
            '화면 설계 요건',
            '인터페이스 요건 (ERP, 설비 연동)',
            '데이터 마이그레이션 요건',
            '우선순위 (Must/Should/Could/Won\'t)',
        ],
        icon: ClipboardList,
    },
    {
        id: 3,
        name: '회의록',
        description: '킥오프 미팅 결정사항 및 Pending Issue 정리',
        format: 'Word / 사내 시스템',
        status: 'draft',
        dueDate: '2024-12-20',
        responsible: 'PM',
        sections: [
            '참석자 명단',
            '회의 일시 및 장소',
            '합의된 결정사항',
            'Pending Issue (미결사항)',
            '담당자별 Action Item',
            '다음 미팅 일정',
        ],
        icon: FileCheck,
    },
];

export default function Deliverables() {
    const [deliverables, setDeliverables] = useState(initialDeliverables);

    const updateStatus = (id: number, status: Deliverable['status']) => {
        setDeliverables(prev => prev.map(item =>
            item.id === id ? { ...item, status } : item
        ));
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved': return { bg: colors.success + '15', color: colors.success, label: '승인완료', icon: CheckCircle2 };
            case 'review': return { bg: colors.warning + '15', color: colors.warning, label: '검토중', icon: Clock };
            default: return { bg: colors.gray200, color: colors.gray600, label: '작성중', icon: FileText };
        }
    };

    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Header */}
            <header className="bg-white border-b px-8 py-4" style={{ borderColor: colors.gray200 }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/kickoff" className="p-2 rounded-lg hover:bg-gray-100">
                            <ChevronLeft className="w-5 h-5" style={{ color: colors.gray600 }} />
                        </a>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>5. 착수 보고서 산출물</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>Project Deliverables</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.gray100 }}>
                            <Download className="w-4 h-4" style={{ color: colors.gray600 }} />
                            <span className="text-sm" style={{ color: colors.gray700 }}>템플릿 다운로드</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-5" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.gray100 }}>
                                <FileText className="w-5 h-5" style={{ color: colors.gray600 }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                                    {deliverables.filter(d => d.status === 'draft').length}
                                </p>
                                <p className="text-xs" style={{ color: colors.gray500 }}>작성중</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.warning + '15' }}>
                                <Clock className="w-5 h-5" style={{ color: colors.warning }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                                    {deliverables.filter(d => d.status === 'review').length}
                                </p>
                                <p className="text-xs" style={{ color: colors.gray500 }}>검토중</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.success + '15' }}>
                                <CheckCircle2 className="w-5 h-5" style={{ color: colors.success }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: colors.gray900 }}>
                                    {deliverables.filter(d => d.status === 'approved').length}
                                </p>
                                <p className="text-xs" style={{ color: colors.gray500 }}>승인완료</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deliverable Cards */}
                <div className="space-y-6">
                    {deliverables.map((item) => {
                        const Icon = item.icon;
                        const statusStyle = getStatusStyle(item.status);
                        const StatusIcon = statusStyle.icon;
                        return (
                            <div key={item.id} className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="p-6 border-b" style={{ borderColor: colors.gray200 }}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                                            <Icon className="w-7 h-7" style={{ color: colors.primary }} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-bold text-lg" style={{ color: colors.gray900 }}>{item.name}</h3>
                                                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {statusStyle.label}
                                                </span>
                                            </div>
                                            <p className="text-sm mb-3" style={{ color: colors.gray600 }}>{item.description}</p>
                                            <div className="flex items-center gap-6 text-xs" style={{ color: colors.gray500 }}>
                                                <span><strong>형식:</strong> {item.format}</span>
                                                <span><strong>담당:</strong> {item.responsible}</span>
                                                <span><strong>마감:</strong> {item.dueDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateStatus(item.id, 'review')}
                                                className="px-3 py-2 rounded-lg text-xs font-medium"
                                                style={{ background: colors.warning + '15', color: colors.warning }}
                                            >
                                                검토요청
                                            </button>
                                            <button
                                                onClick={() => updateStatus(item.id, 'approved')}
                                                className="px-3 py-2 rounded-lg text-xs font-medium"
                                                style={{ background: colors.success + '15', color: colors.success }}
                                            >
                                                승인
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6" style={{ background: colors.gray100 }}>
                                    <h4 className="text-sm font-semibold mb-3" style={{ color: colors.gray700 }}>포함 내용</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {item.sections.map((section, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm" style={{ color: colors.gray600 }}>
                                                <CheckCircle2 className="w-4 h-4" style={{ color: colors.success }} />
                                                <span>{section}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

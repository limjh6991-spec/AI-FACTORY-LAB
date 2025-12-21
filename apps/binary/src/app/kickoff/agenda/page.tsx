/**
 * 4. 킥오프 미팅 아젠다 (Meeting Agenda)
 * 킥오프 미팅 상세 아젠다 및 시간 배분
 */

'use client';

import React, { useState } from 'react';
import {
    ChevronLeft, Save, Clock, Target, Users, Calendar,
    CheckCircle2, AlertCircle, Play, Pause
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

interface AgendaItem {
    id: number;
    title: string;
    duration: number; // minutes
    presenter: string;
    description: string;
    objectives: string[];
    status: 'pending' | 'in-progress' | 'completed';
    notes: string;
}

const initialAgenda: AgendaItem[] = [
    {
        id: 1,
        title: '프로젝트 목표 공유',
        duration: 15,
        presenter: 'PM',
        description: '"단순 전산화가 아닌 예측 가능한 시스템 구축" - 프로젝트의 비전과 최종 목표 공유',
        objectives: [
            '현재의 Pain Point 공유',
            '시스템 도입 후 기대 효과',
            'KPI 및 성공 지표 합의',
        ],
        status: 'pending',
        notes: '',
    },
    {
        id: 2,
        title: '구축 범위(Scope) 확정',
        duration: 30,
        presenter: 'PM / 기술책임자',
        description: '프로젝트 범위를 명확히 정의하고 In-Scope / Out-of-Scope 합의',
        objectives: [
            'In-Scope: 생산 계획, 실적, 설비 모니터링, 대시보드',
            'Out-of-Scope: ERP 회계 연동, PLC 직접 제어',
            '1차 / 2차 단계 구분',
            '연동 시스템 범위 확인',
        ],
        status: 'pending',
        notes: '',
    },
    {
        id: 3,
        title: 'R&R 정의',
        duration: 20,
        presenter: 'PM',
        description: '역할과 책임 명확화 - 현업 PM 및 데이터 담당자 지정',
        objectives: [
            '현업 PM 지정 (의사결정권자)',
            '데이터 담당자 지정 (마스터 데이터 검증)',
            '현장 테스트 담당자',
            '커뮤니케이션 채널 합의 (메일, 메신저, 회의)',
        ],
        status: 'pending',
        notes: '',
    },
    {
        id: 4,
        title: '전체 일정 합의',
        duration: 20,
        presenter: 'PM',
        description: '프로젝트 일정표 공유 및 주요 마일스톤 합의',
        objectives: [
            '분석(1M): 요구사항 수집, 현장 실사',
            '개발(2M): 기능 개발, 단위 테스트',
            '안정화(1M): 통합 테스트, 사용자 교육, 안정화',
            '주간 진행 회의 일정 확정',
        ],
        status: 'pending',
        notes: '',
    },
    {
        id: 5,
        title: '데이터 요청 및 일정',
        duration: 15,
        presenter: '데이터 담당자',
        description: '마스터 데이터 및 이력 데이터 요청, 제공 일정 합의',
        objectives: [
            '요청 데이터 항목 확인',
            '데이터 형식 및 템플릿 배포',
            '제공 일정 합의 (1주 이내)',
        ],
        status: 'pending',
        notes: '',
    },
    {
        id: 6,
        title: 'Q&A 및 마무리',
        duration: 20,
        presenter: '전체',
        description: '질의응답 및 다음 단계 안내',
        objectives: [
            '현업 질문 사항 답변',
            '우려 사항 논의',
            '다음 미팅 일정 확정',
            '회의록 배포 예정 공유',
        ],
        status: 'pending',
        notes: '',
    },
];

export default function Agenda() {
    const [agenda, setAgenda] = useState(initialAgenda);

    const updateStatus = (id: number, status: AgendaItem['status']) => {
        setAgenda(prev => prev.map(item =>
            item.id === id ? { ...item, status } : item
        ));
    };

    const updateNotes = (id: number, notes: string) => {
        setAgenda(prev => prev.map(item =>
            item.id === id ? { ...item, notes } : item
        ));
    };

    const getTotalDuration = () => {
        return agenda.reduce((sum, item) => sum + item.duration, 0);
    };

    const getCompletedDuration = () => {
        return agenda.filter(item => item.status === 'completed').reduce((sum, item) => sum + item.duration, 0);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'completed': return { bg: colors.success + '15', color: colors.success, icon: CheckCircle2 };
            case 'in-progress': return { bg: colors.primary + '15', color: colors.primary, icon: Play };
            default: return { bg: colors.gray200, color: colors.gray600, icon: Clock };
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
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>4. 킥오프 미팅 아젠다</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>Meeting Agenda & Time Allocation</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.info + '15' }}>
                            <Clock className="w-4 h-4" style={{ color: colors.info }} />
                            <span className="text-sm font-medium" style={{ color: colors.info }}>
                                총 소요시간: {getTotalDuration()}분 ({Math.floor(getTotalDuration() / 60)}시간 {getTotalDuration() % 60}분)
                            </span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ background: colors.primary }}>
                            <Save className="w-4 h-4" />
                            <span className="text-sm">저장</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-8">
                {/* Progress Bar */}
                <div className="bg-white rounded-xl p-5 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium" style={{ color: colors.gray800 }}>미팅 진행률</span>
                        <span className="text-sm" style={{ color: colors.gray500 }}>{getCompletedDuration()} / {getTotalDuration()} 분 완료</span>
                    </div>
                    <div className="h-3 rounded-full" style={{ background: colors.gray200 }}>
                        <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${(getCompletedDuration() / getTotalDuration()) * 100}%`, background: colors.success }}
                        />
                    </div>
                </div>

                {/* Agenda Items */}
                <div className="space-y-4">
                    {agenda.map((item, index) => {
                        const statusStyle = getStatusStyle(item.status);
                        const StatusIcon = statusStyle.icon;
                        return (
                            <div key={item.id} className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="flex items-stretch">
                                    {/* Time Indicator */}
                                    <div className="w-24 flex flex-col items-center justify-center p-4" style={{ background: statusStyle.bg }}>
                                        <span className="text-2xl font-bold" style={{ color: statusStyle.color }}>{item.duration}</span>
                                        <span className="text-xs" style={{ color: statusStyle.color }}>분</span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: colors.primary }}>
                                                {index + 1}
                                            </span>
                                            <h3 className="font-semibold text-lg" style={{ color: colors.gray900 }}>{item.title}</h3>
                                            <span className="text-xs px-2 py-1 rounded" style={{ background: colors.gray100, color: colors.gray600 }}>
                                                발표자: {item.presenter}
                                            </span>
                                        </div>
                                        <p className="text-sm mb-4" style={{ color: colors.gray600 }}>{item.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {item.objectives.map((obj, i) => (
                                                <span key={i} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: colors.gray100, color: colors.gray700 }}>
                                                    ✓ {obj}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Notes */}
                                        <textarea
                                            value={item.notes}
                                            onChange={(e) => updateNotes(item.id, e.target.value)}
                                            placeholder="메모 및 결정사항..."
                                            className="w-full p-3 rounded-lg border text-sm resize-none"
                                            style={{ borderColor: colors.gray200, minHeight: '60px' }}
                                        />
                                    </div>

                                    {/* Status Buttons */}
                                    <div className="flex flex-col justify-center gap-2 p-4 border-l" style={{ borderColor: colors.gray200 }}>
                                        <button
                                            onClick={() => updateStatus(item.id, 'in-progress')}
                                            className="p-2 rounded-lg transition-colors"
                                            style={{ background: item.status === 'in-progress' ? colors.primary : colors.gray100 }}
                                        >
                                            <Play className="w-4 h-4" style={{ color: item.status === 'in-progress' ? 'white' : colors.gray500 }} />
                                        </button>
                                        <button
                                            onClick={() => updateStatus(item.id, 'completed')}
                                            className="p-2 rounded-lg transition-colors"
                                            style={{ background: item.status === 'completed' ? colors.success : colors.gray100 }}
                                        >
                                            <CheckCircle2 className="w-4 h-4" style={{ color: item.status === 'completed' ? 'white' : colors.gray500 }} />
                                        </button>
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

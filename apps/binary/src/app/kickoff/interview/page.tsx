/**
 * 3. 핵심 인터뷰 질문 (Stakeholder Interview)
 * 이해관계자별 인터뷰 가이드
 */

'use client';

import React, { useState } from 'react';
import {
    ChevronLeft, Save, Plus, Trash2, MessageSquare,
    Briefcase, HardHat, Wrench, User
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

interface InterviewQuestion {
    id: number;
    question: string;
    purpose: string;
    expectedAnswer: string;
    actualAnswer: string;
}

interface StakeholderGroup {
    id: string;
    title: string;
    role: string;
    icon: React.ElementType;
    color: string;
    questions: InterviewQuestion[];
}

const initialStakeholders: StakeholderGroup[] = [
    {
        id: 'executive',
        title: '경영진',
        role: 'CEO / COO / 공장장',
        icon: Briefcase,
        color: colors.info,
        questions: [
            {
                id: 1,
                question: '이 프로젝트의 성공 판단 지표(KPI)는 무엇입니까?',
                purpose: '프로젝트 목표 명확화 및 성공 기준 정의',
                expectedAnswer: '예: 재고 20% 감소, 납기준수율 95% 달성, 품질 불량률 1% 이하',
                actualAnswer: '',
            },
            {
                id: 2,
                question: '가장 시급하게 해결해야 할 현장의 문제는 무엇인가요?',
                purpose: '우선순위 산정 및 Quick Win 항목 도출',
                expectedAnswer: '예: 재고 파악 불가, 납기 지연 빈번, 품질 이력 추적 불가',
                actualAnswer: '',
            },
            {
                id: 3,
                question: '시스템 도입 후 기대하는 최종 모습(To-Be)은?',
                purpose: '비전 공유 및 장기 로드맵 방향 설정',
                expectedAnswer: '예: 실시간 현황 파악, 자동화된 보고서, 예측 기반 의사결정',
                actualAnswer: '',
            },
        ],
    },
    {
        id: 'manager',
        title: '현장 관리자',
        role: '생산팀장 / 품질팀장 / 자재팀장',
        icon: HardHat,
        color: colors.warning,
        questions: [
            {
                id: 4,
                question: '현재 수기 관리 시 가장 골치 아픈 점(Pain Point)은 무엇인가요?',
                purpose: '개선 포인트 및 UI/UX 설계 방향 도출',
                expectedAnswer: '예: 중복 입력, 실시간 현황 파악 불가, 보고서 작성 시간 과다',
                actualAnswer: '',
            },
            {
                id: 5,
                question: '하루 중 가장 바쁜 시간대와 그 이유는?',
                purpose: '시스템 피크 타임 예측 및 입력 시점 설계',
                expectedAnswer: '예: 오전 8시 - 작업 시작, 오후 5시 - 마감 집계',
                actualAnswer: '',
            },
            {
                id: 6,
                question: '현장에서 자주 발생하는 예외 상황은?',
                purpose: '예외 처리 로직 설계',
                expectedAnswer: '예: 긴급 오더, 자재 부족으로 인한 라인 변경, 불량 재작업',
                actualAnswer: '',
            },
            {
                id: 7,
                question: '다른 부서와의 협업에서 어려운 점은?',
                purpose: '정보 공유 프로세스 및 권한 설계',
                expectedAnswer: '예: 자재팀과 일정 공유 부재, 품질 이슈 전달 지연',
                actualAnswer: '',
            },
        ],
    },
    {
        id: 'operator',
        title: '현장 실무자',
        role: '작업자 / 검사원 / 창고 담당자',
        icon: Wrench,
        color: colors.success,
        questions: [
            {
                id: 8,
                question: '가장 편한 입력 방식은 무엇인가요?',
                purpose: '입력 UI 유형 결정 (바코드/QR, 터치, 키보드)',
                expectedAnswer: '예: 바코드 스캔, 터치 스크린, 음성 입력',
                actualAnswer: '',
            },
            {
                id: 9,
                question: '현재 작업 중 불편한 점이 있다면?',
                purpose: '사용성 개선 포인트 도출',
                expectedAnswer: '예: 양손 작업 중 입력, 기록지 분실, 오기입 수정 불가',
                actualAnswer: '',
            },
            {
                id: 10,
                question: '교대 근무 시 인수인계는 어떻게 하나요?',
                purpose: '교대 시 정보 공유 기능 설계',
                expectedAnswer: '예: 구두 인수인계, 메모지, 화이트보드',
                actualAnswer: '',
            },
        ],
    },
];

export default function Interview() {
    const [stakeholders, setStakeholders] = useState(initialStakeholders);

    const updateAnswer = (groupId: string, questionId: number, answer: string) => {
        setStakeholders(prev => prev.map(group =>
            group.id === groupId ? {
                ...group,
                questions: group.questions.map(q =>
                    q.id === questionId ? { ...q, actualAnswer: answer } : q
                )
            } : group
        ));
    };

    const getCompletedCount = () => {
        return stakeholders.flatMap(g => g.questions).filter(q => q.actualAnswer.trim() !== '').length;
    };

    const getTotalCount = () => {
        return stakeholders.flatMap(g => g.questions).length;
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
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>3. 핵심 인터뷰 질문</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>Stakeholder Interview Guide</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-sm" style={{ color: colors.gray600 }}>
                            답변 완료: <strong style={{ color: colors.primary }}>{getCompletedCount()}</strong> / {getTotalCount()}
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ background: colors.primary }}>
                            <Save className="w-4 h-4" />
                            <span className="text-sm">저장</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-8">
                <div className="space-y-8">
                    {stakeholders.map((group) => {
                        const Icon = group.icon;
                        return (
                            <div key={group.id} className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                <div className="p-5 border-b" style={{ borderColor: colors.gray200 }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: group.color + '15' }}>
                                            <Icon className="w-6 h-6" style={{ color: group.color }} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg" style={{ color: colors.gray900 }}>
                                                To {group.title}
                                            </h3>
                                            <p className="text-sm" style={{ color: colors.gray500 }}>{group.role}</p>
                                        </div>
                                        <span className="ml-auto px-3 py-1 rounded-lg text-xs font-medium" style={{ background: group.color + '15', color: group.color }}>
                                            {group.questions.filter(q => q.actualAnswer.trim() !== '').length} / {group.questions.length} 완료
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 space-y-6">
                                    {group.questions.map((q, i) => (
                                        <div key={q.id} className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                            <div className="flex items-start gap-3 mb-3">
                                                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: group.color }}>
                                                    {i + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="font-medium mb-1" style={{ color: colors.gray800 }}>{q.question}</p>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>
                                                        <strong>목적:</strong> {q.purpose}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="ml-9">
                                                <p className="text-xs mb-2" style={{ color: colors.gray400 }}>
                                                    💡 예상 답변: {q.expectedAnswer}
                                                </p>
                                                <textarea
                                                    value={q.actualAnswer}
                                                    onChange={(e) => updateAnswer(group.id, q.id, e.target.value)}
                                                    placeholder="실제 답변 내용을 기록하세요..."
                                                    className="w-full p-3 rounded-lg border text-sm resize-none"
                                                    style={{ borderColor: colors.gray200, minHeight: '80px' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

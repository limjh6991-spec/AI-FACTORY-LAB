/**
 * Kickoff Meeting Kit Dashboard
 * 프로젝트 착수 준비 가이드 대시보드
 */

'use client';

import React, { useState } from 'react';
import {
    Search,
    Bell,
    User,
    MoreVertical,
    CheckSquare,
    Square,
    Wifi,
    Monitor,
    Server,
    Cpu,
    Truck,
    AlertTriangle,
    FileText,
    Database,
    Users,
    BarChart3,
    Wrench,
    Package,
    MessageSquare,
    Calendar,
    ClipboardList,
    Target,
    Clock,
    FileCheck,
} from 'lucide-react';

// Metronic 색상 팔레트
const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    dark: '#181C32',
    secondary: '#E4E6EF',
    light: '#F5F8FA',
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

// 체크리스트 데이터
const initialChecklist = {
    infrastructure: [
        { id: 1, label: '네트워크 환경: 현장(라인) 내 Wi-Fi 음영 지역은 없는가?', checked: false, icon: Wifi },
        { id: 2, label: '작업자 디바이스: PC, 태블릿, 키오스크 설치 공간 및 전원 확인', checked: false, icon: Monitor },
        { id: 3, label: '서버실/전산실: 온프레미스 구축 시 랙(Rack) 공간 및 보안 확인', checked: false, icon: Server },
        { id: 4, label: '설비 인터페이스: PLC, 센서 통신 포트 및 프로토콜(OPC-UA, Modbus) 확인', checked: false, icon: Cpu },
    ],
    process: [
        { id: 5, label: '물류 동선: 입고 → 공정 → 출하 동선이 라우팅과 일치하는가?', checked: false, icon: Truck },
        { id: 6, label: '예외 프로세스: 불량 발생 시 재작업(Rework) 처리 방식 확인', checked: false, icon: AlertTriangle },
        { id: 7, label: '수기 기록물: 작업일보, 불량 기록지, 설비 점검표 양식 수거 (UI 설계 기초)', checked: false, icon: FileText },
    ],
};

// 데이터 요청 리스트
const dataRequestList = [
    { category: '기준정보', no: 1, name: '품목 리스트 (제품/자재)', table: 'TB_ITEM_MST 기초 데이터', color: colors.primary },
    { category: '기준정보', no: 2, name: 'BOM (자재명세서)', table: 'TB_BOM_MST (엑셀 파일 필수)', color: colors.primary },
    { category: '기준정보', no: 3, name: '공정 및 라우팅 정보', table: 'TB_PROCESS_MST, TB_ROUTING_MST', color: colors.primary },
    { category: '기준정보', no: 4, name: '설비 리스트 및 제원', table: 'TB_MACHINE_MST (UPH, 효율 등)', color: colors.primary },
    { category: '기준정보', no: 5, name: '작업자 명단 및 근무조', table: 'TB_USER_MST', color: colors.primary },
    { category: '운영정보', no: 6, name: '최근 1년치 생산 실적', table: 'AI 수요 예측용', color: colors.success },
    { category: '운영정보', no: 7, name: '설비 고장/수리 이력', table: '예방 정비 분석용', color: colors.success },
    { category: '운영정보', no: 8, name: '현재 재고 현황', table: '초기 데이터 마이그레이션용', color: colors.success },
];

// 인터뷰 질문
const interviewQuestions = [
    { target: '경영진', question: '"성공 판단 지표(KPI)는 무엇입니까?"', example: '예: 재고 20% 감소', color: colors.info },
    { target: '현장 관리자', question: '"수기 관리 시 가장 골치 아픈 점(Pain Point)은?"', example: '', color: colors.warning },
    { target: '실무자', question: '"가장 편한 입력 방식은?"', example: '바코드, 터치 등', color: colors.success },
];

// 킥오프 아젠다
const agendaItems = [
    { no: 1, title: '프로젝트 목표 공유', desc: '"단순 전산화가 아닌 예측 가능한 시스템 구축"' },
    { no: 2, title: '구축 범위(Scope) 확정', inScope: ['생산 계획', '실적', '설비 모니터링', '대시보드'], outScope: ['ERP 회계 연동', 'PLC 직접 제어'] },
    { no: 3, title: 'R&R 정의', desc: '현업 PM 및 데이터 담당자 지정' },
    { no: 4, title: '전체 일정 합의', schedule: '분석(1M) → 개발(2M) → 안정화(1M)' },
];

// 산출물
const deliverables = [
    { name: 'WBS', desc: '일정/담당자 매핑', icon: Calendar },
    { name: '요구사항 정의서 (SRS)', desc: 'Software Requirement Spec', icon: ClipboardList },
    { name: '회의록', desc: '결정사항/Pending Issue', icon: FileCheck },
];

export default function KickoffDashboard() {
    const [checklist, setChecklist] = useState(initialChecklist);

    const toggleCheck = (category: 'infrastructure' | 'process', id: number) => {
        setChecklist(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            ),
        }));
    };

    const getProgress = () => {
        const all = [...checklist.infrastructure, ...checklist.process];
        const checked = all.filter(item => item.checked).length;
        return Math.round((checked / all.length) * 100);
    };

    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-[265px] flex flex-col" style={{ background: colors.dark }}>
                <div className="h-[65px] flex items-center px-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: colors.primary }}>
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="text-white text-lg font-semibold">SpacePro</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4">
                    <div className="mb-4">
                        <span className="text-[11px] font-semibold uppercase px-4" style={{ color: colors.gray600 }}>대시보드</span>
                    </div>
                    {[
                        { label: '대시보드', href: '/' },
                        { label: '프로젝트', href: '/projects' },
                        { label: '킥오프 미팅', active: true, href: '/kickoff' },
                        { label: '리포트', href: '/reports' },
                        { label: '생산관리', href: '/manufacturing' },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] transition-colors mb-1"
                            style={{
                                color: item.active ? colors.white : colors.gray500,
                                background: item.active ? colors.primary : 'transparent',
                            }}
                        >
                            <span className="w-5 h-5 flex items-center justify-center">
                                {i === 0 ? '📊' : i === 1 ? '📁' : i === 2 ? '🚀' : i === 3 ? '📄' : '🏭'}
                            </span>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="ml-[265px]">
                {/* Header */}
                <header className="h-[65px] bg-white border-b flex items-center justify-between px-8" style={{ borderColor: colors.gray200 }}>
                    <div>
                        <h1 className="text-lg font-semibold" style={{ color: colors.gray900 }}>🚀 프로젝트 착수 준비 가이드</h1>
                        <p className="text-xs" style={{ color: colors.gray500 }}>Site Visit & Kick-off Meeting Kit</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.primary + '15' }}>
                            <span className="text-sm font-medium" style={{ color: colors.primary }}>진행률: {getProgress()}%</span>
                            <div className="w-24 h-2 rounded-full" style={{ background: colors.gray200 }}>
                                <div className="h-full rounded-full transition-all" style={{ width: `${getProgress()}%`, background: colors.primary }} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg overflow-hidden" style={{ background: colors.gray200 }}>
                                <div className="w-full h-full flex items-center justify-center">
                                    <User className="w-5 h-5" style={{ color: colors.gray500 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    <div className="grid grid-cols-12 gap-6">
                        {/* 1. 현장 실사 체크리스트 */}
                        <div className="col-span-6 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                                        <CheckSquare className="w-5 h-5" style={{ color: colors.primary }} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold" style={{ color: colors.gray900 }}>1. 현장 실사 체크리스트</h3>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>AS-IS 분석</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                {/* 물리적 환경 */}
                                <div className="mb-4">
                                    <span className="text-xs font-semibold px-2 py-1 rounded" style={{ background: colors.info + '15', color: colors.info }}>
                                        물리적 환경 및 인프라
                                    </span>
                                </div>
                                <div className="space-y-3 mb-6">
                                    {checklist.infrastructure.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleCheck('infrastructure', item.id)}
                                                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                                                style={{ background: item.checked ? colors.success + '10' : colors.gray100 }}
                                            >
                                                {item.checked ? (
                                                    <CheckSquare className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                                                ) : (
                                                    <Square className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.gray400 }} />
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-sm" style={{ color: item.checked ? colors.gray700 : colors.gray800, textDecoration: item.checked ? 'line-through' : 'none' }}>
                                                        {item.label}
                                                    </p>
                                                </div>
                                                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: colors.gray400 }} />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* 생산 프로세스 */}
                                <div className="mb-4">
                                    <span className="text-xs font-semibold px-2 py-1 rounded" style={{ background: colors.warning + '15', color: colors.warning }}>
                                        생산 프로세스 흐름
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {checklist.process.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleCheck('process', item.id)}
                                                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                                                style={{ background: item.checked ? colors.success + '10' : colors.gray100 }}
                                            >
                                                {item.checked ? (
                                                    <CheckSquare className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                                                ) : (
                                                    <Square className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.gray400 }} />
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-sm" style={{ color: item.checked ? colors.gray700 : colors.gray800, textDecoration: item.checked ? 'line-through' : 'none' }}>
                                                        {item.label}
                                                    </p>
                                                </div>
                                                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: colors.gray400 }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* 2. 데이터 요청 리스트 */}
                        <div className="col-span-6 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.success + '15' }}>
                                        <Database className="w-5 h-5" style={{ color: colors.success }} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold" style={{ color: colors.gray900 }}>2. 데이터 요청 리스트</h3>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>Data Acquisition</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderBottom: `1px solid ${colors.gray200}` }}>
                                            <th className="text-left text-xs font-semibold py-3 px-2" style={{ color: colors.gray600 }}>구분</th>
                                            <th className="text-left text-xs font-semibold py-3 px-2" style={{ color: colors.gray600 }}>No</th>
                                            <th className="text-left text-xs font-semibold py-3 px-2" style={{ color: colors.gray600 }}>데이터 항목</th>
                                            <th className="text-left text-xs font-semibold py-3 px-2" style={{ color: colors.gray600 }}>비고</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataRequestList.map((item, i) => (
                                            <tr key={i} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                                                <td className="py-2.5 px-2">
                                                    <span className="text-xs font-medium px-2 py-1 rounded" style={{ background: item.color + '15', color: item.color }}>
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-2 text-sm" style={{ color: colors.gray600 }}>{item.no}</td>
                                                <td className="py-2.5 px-2 text-sm font-medium" style={{ color: colors.gray800 }}>{item.name}</td>
                                                <td className="py-2.5 px-2 text-xs" style={{ color: colors.gray500 }}>{item.table}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 3. 핵심 인터뷰 질문 */}
                        <div className="col-span-4 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="p-5 border-b" style={{ borderColor: colors.gray200 }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.warning + '15' }}>
                                        <MessageSquare className="w-5 h-5" style={{ color: colors.warning }} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold" style={{ color: colors.gray900 }}>3. 핵심 인터뷰 질문</h3>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>Stakeholder Interview</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 space-y-4">
                                {interviewQuestions.map((item, i) => (
                                    <div key={i} className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold px-2 py-1 rounded text-white" style={{ background: item.color }}>
                                                To {item.target}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium mb-1" style={{ color: colors.gray800 }}>{item.question}</p>
                                        {item.example && (
                                            <p className="text-xs" style={{ color: colors.gray500 }}>{item.example}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. 킥오프 미팅 아젠다 */}
                        <div className="col-span-5 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="p-5 border-b" style={{ borderColor: colors.gray200 }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.danger + '15' }}>
                                        <Target className="w-5 h-5" style={{ color: colors.danger }} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold" style={{ color: colors.gray900 }}>4. 킥오프 미팅 아젠다</h3>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>Meeting Agenda</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 space-y-4">
                                {agendaItems.map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white" style={{ background: colors.primary }}>
                                            {item.no}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium mb-1" style={{ color: colors.gray800 }}>{item.title}</p>
                                            {item.desc && <p className="text-sm" style={{ color: colors.gray600 }}>{item.desc}</p>}
                                            {item.inScope && (
                                                <div className="mt-2 space-y-1">
                                                    <p className="text-xs font-semibold" style={{ color: colors.success }}>
                                                        ✓ In-Scope: {item.inScope.join(', ')}
                                                    </p>
                                                    <p className="text-xs font-semibold" style={{ color: colors.danger }}>
                                                        ✗ Out-of-Scope: {item.outScope?.join(', ')}
                                                    </p>
                                                </div>
                                            )}
                                            {item.schedule && (
                                                <div className="mt-2 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" style={{ color: colors.primary }} />
                                                    <span className="text-xs font-medium" style={{ color: colors.primary }}>{item.schedule}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. 착수 보고서 산출물 */}
                        <div className="col-span-3 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="p-5 border-b" style={{ borderColor: colors.gray200 }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.info + '15' }}>
                                        <FileCheck className="w-5 h-5" style={{ color: colors.info }} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold" style={{ color: colors.gray900 }}>5. 착수 보고서</h3>
                                        <p className="text-xs" style={{ color: colors.gray500 }}>Deliverables</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 space-y-3">
                                {deliverables.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={i} className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                            <div className="flex items-center gap-3">
                                                <Icon className="w-5 h-5" style={{ color: colors.info }} />
                                                <div>
                                                    <p className="text-sm font-semibold" style={{ color: colors.gray800 }}>{item.name}</p>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

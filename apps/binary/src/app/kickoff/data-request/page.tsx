/**
 * 2. 데이터 요청 리스트 (Data Request)
 * 데이터 수집을 위한 상세 요청 양식
 */

'use client';

import React, { useState } from 'react';
import {
    ChevronLeft, Download, Mail, CheckCircle2, Clock, AlertCircle,
    Database, FileSpreadsheet, Users, Package, Wrench, BarChart3
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

interface DataRequest {
    id: number;
    category: '기준정보' | '운영정보';
    name: string;
    table: string;
    format: string;
    description: string;
    status: 'pending' | 'requested' | 'received';
    deadline: string;
    responsible: string;
    icon: React.ElementType;
}

const initialDataRequests: DataRequest[] = [
    {
        id: 1,
        category: '기준정보',
        name: '품목 리스트 (제품/자재)',
        table: 'TB_ITEM_MST',
        format: 'Excel (.xlsx)',
        description: '제품코드, 품명, 규격, 단위, 분류(원자재/반제품/완제품), 리드타임, 안전재고',
        status: 'pending',
        deadline: '2024-12-20',
        responsible: '자재팀',
        icon: Package
    },
    {
        id: 2,
        category: '기준정보',
        name: 'BOM (자재명세서)',
        table: 'TB_BOM_MST',
        format: 'Excel (.xlsx) 필수',
        description: '모품목, 자품목, 소요량, 수율, 손실률, BOM 레벨 (다중 레벨 지원)',
        status: 'requested',
        deadline: '2024-12-22',
        responsible: '기술팀',
        icon: FileSpreadsheet
    },
    {
        id: 3,
        category: '기준정보',
        name: '공정 및 라우팅 정보',
        table: 'TB_PROCESS_MST, TB_ROUTING_MST',
        format: 'Excel / ERP Export',
        description: '공정코드, 공정명, 순서, 표준시간(ST), 세팅시간, 작업장 매핑',
        status: 'pending',
        deadline: '2024-12-22',
        responsible: '생산기술팀',
        icon: Wrench
    },
    {
        id: 4,
        category: '기준정보',
        name: '설비 리스트 및 제원',
        table: 'TB_MACHINE_MST',
        format: 'Excel (.xlsx)',
        description: '설비코드, 설비명, 모델, 제조사, UPH, 가동효율, 보전주기',
        status: 'received',
        deadline: '2024-12-18',
        responsible: '설비팀',
        icon: Database
    },
    {
        id: 5,
        category: '기준정보',
        name: '작업자 명단 및 근무조',
        table: 'TB_USER_MST',
        format: 'Excel (.xlsx)',
        description: '사번, 이름, 부서, 직급, 근무조, 숙련도, 자격증 보유 현황',
        status: 'pending',
        deadline: '2024-12-23',
        responsible: '인사팀',
        icon: Users
    },
    {
        id: 6,
        category: '운영정보',
        name: '최근 1년치 생산 실적',
        table: 'Production History',
        format: 'CSV / Database Export',
        description: 'AI 수요 예측 학습 데이터용 - 일자별 품목별 생산수량, 불량수량',
        status: 'pending',
        deadline: '2024-12-25',
        responsible: '생산관리팀',
        icon: BarChart3
    },
    {
        id: 7,
        category: '운영정보',
        name: '설비 고장/수리 이력',
        table: 'Maintenance History',
        format: 'Excel / CMMS Export',
        description: '예방 정비 분석용 - 고장일자, 원인, 수리내용, 정비시간, 비용',
        status: 'requested',
        deadline: '2024-12-25',
        responsible: '설비팀',
        icon: Wrench
    },
    {
        id: 8,
        category: '운영정보',
        name: '현재 재고 현황',
        table: 'Inventory Snapshot',
        format: 'Excel / ERP Export',
        description: '초기 데이터 마이그레이션용 - 품목별 현재고, 위치, 입고일자',
        status: 'pending',
        deadline: '2024-12-27',
        responsible: '자재팀',
        icon: Package
    },
];

export default function DataRequest() {
    const [requests, setRequests] = useState(initialDataRequests);

    const updateStatus = (id: number, status: DataRequest['status']) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status } : req
        ));
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'received': return { bg: colors.success + '15', color: colors.success, label: '수신완료' };
            case 'requested': return { bg: colors.warning + '15', color: colors.warning, label: '요청중' };
            default: return { bg: colors.gray200, color: colors.gray600, label: '대기' };
        }
    };

    const getProgress = () => {
        const received = requests.filter(r => r.status === 'received').length;
        return Math.round((received / requests.length) * 100);
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
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>2. 데이터 요청 리스트</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>Data Acquisition Request</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.success + '15' }}>
                            <span className="text-sm font-medium" style={{ color: colors.success }}>수신율: {getProgress()}%</span>
                            <div className="w-24 h-2 rounded-full" style={{ background: colors.gray200 }}>
                                <div className="h-full rounded-full transition-all" style={{ width: `${getProgress()}%`, background: colors.success }} />
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.gray100 }}>
                            <Download className="w-4 h-4" style={{ color: colors.gray600 }} />
                            <span className="text-sm" style={{ color: colors.gray700 }}>템플릿 다운로드</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ background: colors.primary }}>
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">요청 메일 발송</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-8">
                {/* 기준정보 */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-lg text-sm font-semibold text-white" style={{ background: colors.primary }}>기준정보 (Master Data)</span>
                        <span className="text-sm" style={{ color: colors.gray500 }}>시스템 구축의 기초가 되는 정적 데이터</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {requests.filter(r => r.category === '기준정보').map((req) => {
                            const Icon = req.icon;
                            const statusStyle = getStatusStyle(req.status);
                            return (
                                <div key={req.id} className="bg-white rounded-xl p-5" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '15' }}>
                                            <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold" style={{ color: colors.gray900 }}>{req.name}</h3>
                                                <span className="text-xs px-2 py-1 rounded font-medium" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                                                    {statusStyle.label}
                                                </span>
                                            </div>
                                            <p className="text-sm mb-3" style={{ color: colors.gray600 }}>{req.description}</p>
                                            <div className="flex items-center gap-6 text-xs" style={{ color: colors.gray500 }}>
                                                <span><strong>테이블:</strong> {req.table}</span>
                                                <span><strong>형식:</strong> {req.format}</span>
                                                <span><strong>담당:</strong> {req.responsible}</span>
                                                <span><strong>마감:</strong> {req.deadline}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {req.status !== 'received' && (
                                                <button
                                                    onClick={() => updateStatus(req.id, 'requested')}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                                                    style={{ background: colors.warning + '15', color: colors.warning }}
                                                >
                                                    요청
                                                </button>
                                            )}
                                            <button
                                                onClick={() => updateStatus(req.id, 'received')}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                                                style={{ background: colors.success + '15', color: colors.success }}
                                            >
                                                수신완료
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 운영정보 */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-lg text-sm font-semibold text-white" style={{ background: colors.success }}>운영정보 (Operational Data)</span>
                        <span className="text-sm" style={{ color: colors.gray500 }}>AI 분석 및 마이그레이션용 이력 데이터</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {requests.filter(r => r.category === '운영정보').map((req) => {
                            const Icon = req.icon;
                            const statusStyle = getStatusStyle(req.status);
                            return (
                                <div key={req.id} className="bg-white rounded-xl p-5" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: colors.success + '15' }}>
                                            <Icon className="w-6 h-6" style={{ color: colors.success }} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold" style={{ color: colors.gray900 }}>{req.name}</h3>
                                                <span className="text-xs px-2 py-1 rounded font-medium" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                                                    {statusStyle.label}
                                                </span>
                                            </div>
                                            <p className="text-sm mb-3" style={{ color: colors.gray600 }}>{req.description}</p>
                                            <div className="flex items-center gap-6 text-xs" style={{ color: colors.gray500 }}>
                                                <span><strong>테이블:</strong> {req.table}</span>
                                                <span><strong>형식:</strong> {req.format}</span>
                                                <span><strong>담당:</strong> {req.responsible}</span>
                                                <span><strong>마감:</strong> {req.deadline}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {req.status !== 'received' && (
                                                <button
                                                    onClick={() => updateStatus(req.id, 'requested')}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                                                    style={{ background: colors.warning + '15', color: colors.warning }}
                                                >
                                                    요청
                                                </button>
                                            )}
                                            <button
                                                onClick={() => updateStatus(req.id, 'received')}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                                                style={{ background: colors.success + '15', color: colors.success }}
                                            >
                                                수신완료
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}

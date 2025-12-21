/**
 * 1. 현장 실사 체크리스트 (Site Survey)
 * AS-IS 분석을 위한 상세 체크리스트
 */

'use client';

import React, { useState } from 'react';
import {
    Search, Bell, User, CheckSquare, Square,
    Wifi, Monitor, Server, Cpu, Truck, AlertTriangle, FileText,
    ChevronLeft, Printer, Download, Save
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

interface CheckItem {
    id: number;
    label: string;
    description: string;
    checked: boolean;
    priority: 'high' | 'medium' | 'low';
    icon: React.ElementType;
}

const initialInfrastructure: CheckItem[] = [
    {
        id: 1,
        label: '네트워크 환경 점검',
        description: '현장(라인) 내 Wi-Fi 음영 지역 확인, 네트워크 대역폭 측정, 백업 회선 유무 파악',
        checked: false,
        priority: 'high',
        icon: Wifi
    },
    {
        id: 2,
        label: '작업자 디바이스 환경',
        description: 'PC, 태블릿, 키오스크 설치 공간 확인, 전원 콘센트 위치, USB 포트 가용성',
        checked: false,
        priority: 'high',
        icon: Monitor
    },
    {
        id: 3,
        label: '서버실/전산실 점검',
        description: '온프레미스 구축 시 랙(Rack) 공간, 냉각 시스템, 물리적 보안(출입통제)',
        checked: false,
        priority: 'medium',
        icon: Server
    },
    {
        id: 4,
        label: '설비 인터페이스 확인',
        description: 'PLC 모델/버전, 센서 통신 포트, 프로토콜(OPC-UA, Modbus TCP/RTU, MQTT)',
        checked: false,
        priority: 'high',
        icon: Cpu
    },
    {
        id: 5,
        label: 'CCTV 및 영상 인프라',
        description: '기존 CCTV 위치, NVR 용량, 영상 분석 연동 가능 여부',
        checked: false,
        priority: 'low',
        icon: Monitor
    },
];

const initialProcess: CheckItem[] = [
    {
        id: 6,
        label: '물류 동선 확인',
        description: '입고 → 검수 → 투입 → 공정 → 포장 → 출하 동선이 시스템 라우팅과 일치하는가?',
        checked: false,
        priority: 'high',
        icon: Truck
    },
    {
        id: 7,
        label: '예외 프로세스 파악',
        description: '불량 발생 시 재작업(Rework) 처리 방식, 긴급 오더 처리, 반품 프로세스',
        checked: false,
        priority: 'high',
        icon: AlertTriangle
    },
    {
        id: 8,
        label: '수기 기록물 수거',
        description: '작업일보, 불량 기록지, 설비 점검표, 재고실사표 양식 수거 (UI 설계 기초 자료)',
        checked: false,
        priority: 'medium',
        icon: FileText
    },
    {
        id: 9,
        label: '교대/근무 패턴',
        description: '2교대/3교대 근무 형태, 교대 시 인수인계 방식, 휴게 시간',
        checked: false,
        priority: 'medium',
        icon: User
    },
    {
        id: 10,
        label: '품질 검사 포인트',
        description: '인라인 검사 위치, 샘플링 검사 주기, 검사 장비 종류',
        checked: false,
        priority: 'high',
        icon: CheckSquare
    },
];

export default function SiteSurvey() {
    const [infrastructure, setInfrastructure] = useState(initialInfrastructure);
    const [process, setProcess] = useState(initialProcess);
    const [notes, setNotes] = useState('');

    const toggleCheck = (category: 'infrastructure' | 'process', id: number) => {
        if (category === 'infrastructure') {
            setInfrastructure(prev => prev.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            ));
        } else {
            setProcess(prev => prev.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            ));
        }
    };

    const getProgress = () => {
        const all = [...infrastructure, ...process];
        const checked = all.filter(item => item.checked).length;
        return Math.round((checked / all.length) * 100);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return colors.danger;
            case 'medium': return colors.warning;
            case 'low': return colors.success;
            default: return colors.gray500;
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
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>1. 현장 실사 체크리스트</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>AS-IS 분석 (Site Survey Checklist)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.primary + '15' }}>
                            <span className="text-sm font-medium" style={{ color: colors.primary }}>완료율: {getProgress()}%</span>
                            <div className="w-24 h-2 rounded-full" style={{ background: colors.gray200 }}>
                                <div className="h-full rounded-full transition-all" style={{ width: `${getProgress()}%`, background: colors.primary }} />
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: colors.gray100 }}>
                            <Printer className="w-4 h-4" style={{ color: colors.gray600 }} />
                            <span className="text-sm" style={{ color: colors.gray700 }}>인쇄</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ background: colors.primary }}>
                            <Save className="w-4 h-4" />
                            <span className="text-sm">저장</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* 물리적 환경 및 인프라 */}
                    <div className="col-span-6 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="p-5 border-b" style={{ borderColor: colors.gray200 }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.info + '15' }}>
                                    <Server className="w-5 h-5" style={{ color: colors.info }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold" style={{ color: colors.gray900 }}>물리적 환경 및 인프라</h3>
                                    <p className="text-xs" style={{ color: colors.gray500 }}>Physical Environment & Infrastructure</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 space-y-3">
                            {infrastructure.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleCheck('infrastructure', item.id)}
                                        className="p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm"
                                        style={{ background: item.checked ? colors.success + '10' : colors.gray100, border: `1px solid ${item.checked ? colors.success + '30' : 'transparent'}` }}
                                    >
                                        <div className="flex items-start gap-3">
                                            {item.checked ? (
                                                <CheckSquare className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                                            ) : (
                                                <Square className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.gray400 }} />
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium" style={{ color: colors.gray800, textDecoration: item.checked ? 'line-through' : 'none' }}>
                                                        {item.label}
                                                    </span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{
                                                        background: getPriorityColor(item.priority) + '15',
                                                        color: getPriorityColor(item.priority)
                                                    }}>
                                                        {item.priority === 'high' ? '필수' : item.priority === 'medium' ? '권장' : '선택'}
                                                    </span>
                                                </div>
                                                <p className="text-xs" style={{ color: colors.gray500 }}>{item.description}</p>
                                            </div>
                                            <Icon className="w-4 h-4 flex-shrink-0" style={{ color: colors.gray400 }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 생산 프로세스 흐름 */}
                    <div className="col-span-6 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="p-5 border-b" style={{ borderColor: colors.gray200 }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.warning + '15' }}>
                                    <Truck className="w-5 h-5" style={{ color: colors.warning }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold" style={{ color: colors.gray900 }}>생산 프로세스 흐름</h3>
                                    <p className="text-xs" style={{ color: colors.gray500 }}>Production Process Flow</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 space-y-3">
                            {process.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleCheck('process', item.id)}
                                        className="p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm"
                                        style={{ background: item.checked ? colors.success + '10' : colors.gray100, border: `1px solid ${item.checked ? colors.success + '30' : 'transparent'}` }}
                                    >
                                        <div className="flex items-start gap-3">
                                            {item.checked ? (
                                                <CheckSquare className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                                            ) : (
                                                <Square className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.gray400 }} />
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium" style={{ color: colors.gray800, textDecoration: item.checked ? 'line-through' : 'none' }}>
                                                        {item.label}
                                                    </span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{
                                                        background: getPriorityColor(item.priority) + '15',
                                                        color: getPriorityColor(item.priority)
                                                    }}>
                                                        {item.priority === 'high' ? '필수' : item.priority === 'medium' ? '권장' : '선택'}
                                                    </span>
                                                </div>
                                                <p className="text-xs" style={{ color: colors.gray500 }}>{item.description}</p>
                                            </div>
                                            <Icon className="w-4 h-4 flex-shrink-0" style={{ color: colors.gray400 }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 현장 메모 */}
                    <div className="col-span-12 bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                        <div className="p-5 border-b" style={{ borderColor: colors.gray200 }}>
                            <h3 className="font-semibold" style={{ color: colors.gray900 }}>현장 메모</h3>
                        </div>
                        <div className="p-5">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="현장 방문 시 특이사항, 추가 확인 필요 사항 등을 기록하세요..."
                                className="w-full h-32 p-4 rounded-lg border resize-none text-sm"
                                style={{ borderColor: colors.gray200, color: colors.gray700 }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

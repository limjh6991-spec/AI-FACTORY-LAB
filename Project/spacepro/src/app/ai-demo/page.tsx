/**
 * AI-Native System Interface Demo
 * LUI (Language User Interface) + MCP + Agent Orchestration
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
    MessageSquare, Database, FolderOpen, Globe, Bot,
    CheckCircle, XCircle, Edit3, Save, Send,
    Loader2, Clock, Sparkles, Zap, FileText,
    ChevronRight, Activity, AlertCircle
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

// MCP 리소스 상태
const mcpResources = [
    { id: 'db', name: 'Local DB', icon: Database, status: 'connected', type: 'Postgres', color: colors.success },
    { id: 'files', name: 'Project Files', icon: FolderOpen, status: 'connected', type: 'Documents', color: colors.success },
    { id: 'web', name: 'Web Search', icon: Globe, status: 'ready', type: 'Live Info', color: colors.primary },
];

// 에이전트 상태
const initialAgents = [
    { id: 'analyst', name: 'Analyst Agent', status: 'idle', task: '대기 중', time: null },
    { id: 'sql', name: 'SQL Writer', status: 'idle', task: '대기 중', time: null },
    { id: 'critic', name: 'Critic Agent', status: 'idle', task: '검증 대기', time: null },
];

export default function AISystemDemo() {
    const [intent, setIntent] = useState('');
    const [systemStatus, setSystemStatus] = useState<'ready' | 'processing' | 'done'>('ready');
    const [agents, setAgents] = useState(initialAgents);
    const [artifact, setArtifact] = useState<any>(null);
    const [showDiff, setShowDiff] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);

    // 의도 처리 시뮬레이션
    const handleSubmitIntent = async () => {
        if (!intent.trim()) return;

        setSystemStatus('processing');
        setProcessingStep(1);

        // 1단계: Analyst Agent 시작
        setAgents(prev => prev.map(a =>
            a.id === 'analyst' ? { ...a, status: 'running', task: '의도 분석 중...' } : a
        ));

        await new Promise(r => setTimeout(r, 1500));
        setAgents(prev => prev.map(a =>
            a.id === 'analyst' ? { ...a, status: 'done', task: '분석 완료', time: '1.2s' } : a
        ));
        setProcessingStep(2);

        // 2단계: SQL Writer 시작
        setAgents(prev => prev.map(a =>
            a.id === 'sql' ? { ...a, status: 'running', task: '쿼리 생성 중...' } : a
        ));

        await new Promise(r => setTimeout(r, 1000));
        setAgents(prev => prev.map(a =>
            a.id === 'sql' ? { ...a, status: 'done', task: '쿼리 완료', time: '0.8s' } : a
        ));
        setProcessingStep(3);

        // 3단계: 결과물 생성
        setArtifact({
            title: '10월 A프로젝트 원가 분석 보고서',
            content: `## 분석 개요
분석 기간: 2024년 10월 1일 ~ 10월 31일
대상 프로젝트: A프로젝트 (코드: PRJ-2024-A001)

## 원가 구성
| 항목 | 금액 | 비율 |
|------|------|------|
| 직접 재료비 | 45,230,000원 | 42.3% |
| 직접 노무비 | 32,150,000원 | 30.1% |
| 제조 경비 | 29,520,000원 | 27.6% |
| **총 원가** | **106,900,000원** | **100%** |

## 핵심 인사이트
1. 직접 재료비가 예산 대비 8.2% 초과
2. 노무비는 목표 이내 (97.4% 달성)
3. 경비 절감 여지: 약 2,300,000원`,
            changes: [
                { type: 'add', line: '재료비 초과 원인 분석 추가' },
                { type: 'add', line: '개선 권고사항 3건 도출' },
            ]
        });

        // 4단계: Critic 검증
        setAgents(prev => prev.map(a =>
            a.id === 'critic' ? { ...a, status: 'running', task: '결과 검증 중...' } : a
        ));

        await new Promise(r => setTimeout(r, 800));
        setAgents(prev => prev.map(a =>
            a.id === 'critic' ? { ...a, status: 'done', task: '검증 완료', time: '0.6s' } : a
        ));

        setSystemStatus('done');
        setProcessingStep(4);
    };

    // 승인 처리
    const handleApprove = () => {
        alert('✅ 결과물이 승인되어 저장되었습니다.');
        resetState();
    };

    // 반려 처리
    const handleReject = () => {
        alert('❌ 반려되었습니다. 피드백을 입력해주세요.');
        resetState();
    };

    // 상태 초기화
    const resetState = () => {
        setIntent('');
        setSystemStatus('ready');
        setAgents(initialAgents);
        setArtifact(null);
        setProcessingStep(0);
    };

    const getStatusColor = () => {
        switch (systemStatus) {
            case 'ready': return colors.success;
            case 'processing': return colors.warning;
            case 'done': return colors.primary;
            default: return colors.gray500;
        }
    };

    const getStatusText = () => {
        switch (systemStatus) {
            case 'ready': return 'Ready';
            case 'processing': return 'Processing...';
            case 'done': return 'Review Required';
            default: return 'Unknown';
        }
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: colors.gray100 }}>
            {/* 1. Header: Intent & Context Layer (Brain) */}
            <header className="bg-white border-b px-6 py-4" style={{ borderColor: colors.gray200 }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${colors.info} 0%, #6610f2 100%)` }}>
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold" style={{ color: colors.gray900 }}>AI-Native System Interface</h1>
                            <p className="text-xs" style={{ color: colors.gray500 }}>Language User Interface (LUI) + MCP Orchestration</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: getStatusColor() + '15' }}>
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: getStatusColor() }} />
                        <span className="text-sm font-medium" style={{ color: getStatusColor() }}>{getStatusText()}</span>
                        <span className="text-xs" style={{ color: colors.gray500 }}>| 🧠 Context: Project_A_DB connected</span>
                    </div>
                </div>

                {/* Intent Input */}
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: colors.gray400 }} />
                        <input
                            type="text"
                            value={intent}
                            onChange={(e) => setIntent(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmitIntent()}
                            placeholder="💬 작업 지시 입력 (예: '지난달 A프로젝트 원가 분석해서 보고서 초안 잡아줘')"
                            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm border-2 focus:outline-none transition-all"
                            style={{
                                borderColor: systemStatus === 'processing' ? colors.warning : colors.gray300,
                                background: colors.gray100
                            }}
                            disabled={systemStatus === 'processing'}
                        />
                    </div>
                    <button
                        onClick={handleSubmitIntent}
                        disabled={!intent.trim() || systemStatus === 'processing'}
                        className="px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 transition-all"
                        style={{
                            background: systemStatus === 'processing' ? colors.gray400 : `linear-gradient(135deg, ${colors.info} 0%, #6610f2 100%)`,
                            opacity: !intent.trim() ? 0.5 : 1
                        }}
                    >
                        {systemStatus === 'processing' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                        실행
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 flex overflow-hidden">
                {/* 2. Left Panel: MCP Resources */}
                <aside className="w-64 bg-white border-r p-4" style={{ borderColor: colors.gray200 }}>
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: colors.gray700 }}>
                        <Zap className="w-4 h-4" style={{ color: colors.warning }} />
                        Resources (MCP Status)
                    </h3>
                    <div className="space-y-3">
                        {mcpResources.map((resource) => {
                            const Icon = resource.icon;
                            const isActive = processingStep > 0 && (
                                (resource.id === 'db' && processingStep >= 2) ||
                                (resource.id === 'files' && processingStep >= 1)
                            );
                            return (
                                <div key={resource.id}
                                    className="p-3 rounded-xl transition-all"
                                    style={{
                                        background: isActive ? resource.color + '10' : colors.gray100,
                                        border: isActive ? `2px solid ${resource.color}` : '2px solid transparent'
                                    }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ background: resource.color + '20' }}>
                                            <Icon className="w-5 h-5" style={{ color: resource.color }} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium" style={{ color: colors.gray800 }}>{resource.name}</p>
                                            <p className="text-xs" style={{ color: colors.gray500 }}>{resource.type}</p>
                                        </div>
                                        <div className="w-2 h-2 rounded-full" style={{ background: resource.color }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* 3. Center Panel: Artifact Preview */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="bg-white rounded-2xl h-full flex flex-col" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5" style={{ color: colors.info }} />
                                <h3 className="font-semibold" style={{ color: colors.gray800 }}>Artifact Preview (Work Table)</h3>
                            </div>
                            {artifact && (
                                <button
                                    onClick={() => setShowDiff(!showDiff)}
                                    className="text-xs px-3 py-1 rounded-lg"
                                    style={{ background: colors.info + '15', color: colors.info }}
                                >
                                    {showDiff ? 'Hide Changes' : 'Show Changes'}
                                </button>
                            )}
                        </div>

                        <div className="flex-1 p-6 overflow-auto">
                            {!artifact ? (
                                <div className="h-full flex flex-col items-center justify-center" style={{ color: colors.gray400 }}>
                                    <FileText className="w-16 h-16 mb-4 opacity-30" />
                                    <p className="text-lg font-medium">결과물 미리보기</p>
                                    <p className="text-sm mt-1">작업 지시를 입력하면 AI가 결과물을 생성합니다</p>
                                </div>
                            ) : (
                                <div className="prose max-w-none">
                                    <div className="mb-4 p-4 rounded-xl" style={{ background: colors.gray100 }}>
                                        <h2 className="text-xl font-bold m-0" style={{ color: colors.gray900 }}>{artifact.title}</h2>
                                    </div>

                                    {showDiff && (
                                        <div className="mb-4 p-3 rounded-lg" style={{ background: colors.success + '10', border: `1px solid ${colors.success}30` }}>
                                            <p className="text-sm font-medium mb-2" style={{ color: colors.success }}>:: 변경 사항 하이라이트 ::</p>
                                            {artifact.changes.map((change: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: colors.gray700 }}>
                                                    <span className="text-green-500">+</span>
                                                    {change.line}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="text-sm whitespace-pre-wrap" style={{ color: colors.gray700 }}>
                                        {artifact.content}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. Right Panel: Agent Activity */}
                <aside className="w-72 bg-white border-l p-4" style={{ borderColor: colors.gray200 }}>
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: colors.gray700 }}>
                        <Activity className="w-4 h-4" style={{ color: colors.info }} />
                        Agents at Work
                    </h3>
                    <div className="space-y-3">
                        {agents.map((agent) => {
                            const statusColors: Record<string, string> = {
                                idle: colors.gray400,
                                running: colors.warning,
                                done: colors.success,
                            };
                            return (
                                <div key={agent.id}
                                    className="p-3 rounded-xl transition-all"
                                    style={{
                                        background: agent.status === 'running' ? colors.warning + '10' : colors.gray100,
                                        border: agent.status === 'running' ? `2px solid ${colors.warning}` : '2px solid transparent'
                                    }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ background: statusColors[agent.status] + '20' }}>
                                            {agent.status === 'running' ? (
                                                <Loader2 className="w-5 h-5 animate-spin" style={{ color: statusColors[agent.status] }} />
                                            ) : (
                                                <Bot className="w-5 h-5" style={{ color: statusColors[agent.status] }} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium" style={{ color: colors.gray800 }}>{agent.name}</p>
                                            <p className="text-xs" style={{ color: colors.gray500 }}>{agent.task}</p>
                                        </div>
                                        {agent.time && (
                                            <span className="text-xs px-2 py-0.5 rounded" style={{ background: colors.success + '15', color: colors.success }}>
                                                {agent.time}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {processingStep > 0 && (
                        <div className="mt-6 p-4 rounded-xl" style={{ background: colors.gray100 }}>
                            <p className="text-xs font-medium mb-2" style={{ color: colors.gray600 }}>Processing Pipeline</p>
                            <div className="space-y-2">
                                {['의도 분석', '데이터 조회', '결과 생성', '검증'].map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs`}
                                            style={{
                                                background: processingStep > idx ? colors.success : colors.gray300,
                                                color: 'white'
                                            }}>
                                            {processingStep > idx ? '✓' : idx + 1}
                                        </div>
                                        <span className="text-xs" style={{ color: processingStep > idx ? colors.gray800 : colors.gray500 }}>
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </main>

            {/* 5. Footer: Human Control */}
            {systemStatus === 'done' && (
                <footer className="bg-white border-t p-4" style={{ borderColor: colors.gray200 }}>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={handleReject}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:opacity-80"
                            style={{ background: colors.danger + '15', color: colors.danger }}
                        >
                            <XCircle className="w-5 h-5" />
                            반려/수정 (Feedback)
                        </button>
                        <button
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:opacity-80"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <Edit3 className="w-5 h-5" />
                            직접 수정 (Edit)
                        </button>
                        <button
                            onClick={handleApprove}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-80"
                            style={{ background: colors.success }}
                        >
                            <CheckCircle className="w-5 h-5" />
                            승인 & 실행 (Approve)
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
}

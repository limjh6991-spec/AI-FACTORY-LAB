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
interface AgentState {
    id: string;
    name: string;
    status: string;
    task: string;
    time: string | null;
}

const initialAgents: AgentState[] = [
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

    // 의도 처리 - 실제 API 호출
    const handleSubmitIntent = async () => {
        if (!intent.trim()) return;

        setSystemStatus('processing');
        setProcessingStep(1);
        setArtifact(null);

        // 1단계: Analyst Agent 시작
        setAgents(prev => prev.map(a =>
            a.id === 'analyst' ? { ...a, status: 'running', task: '의도 분석 중...' } : a
        ));

        const startTime = Date.now();

        try {
            // API 호출
            const response = await fetch('/api/ai-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: intent }),
            });

            const data = await response.json();
            const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);

            if (data.error) {
                // 에러 처리
                setAgents(prev => prev.map(a => ({
                    ...a,
                    status: 'idle',
                    task: a.id === 'analyst' ? `오류: ${data.error}` : '대기 중'
                })));
                setSystemStatus('ready');
                setProcessingStep(0);
                alert(`❌ 오류: ${data.error}`);
                return;
            }

            // Analyst 완료
            if (data.analyst) {
                setAgents(prev => prev.map(a =>
                    a.id === 'analyst' ? { ...a, status: 'done', task: '분석 완료', time: `${(parseFloat(totalTime) * 0.3).toFixed(1)}s` } : a
                ));
                setProcessingStep(2);
            }

            // Writer 처리
            setAgents(prev => prev.map(a =>
                a.id === 'sql' ? { ...a, status: data.writer ? 'done' : 'running', task: data.writer ? '쿼리 완료' : '쿼리 생성 중...' } : a
            ));
            if (data.writer) {
                setAgents(prev => prev.map(a =>
                    a.id === 'sql' ? { ...a, status: 'done', task: '쿼리 완료', time: `${(parseFloat(totalTime) * 0.4).toFixed(1)}s` } : a
                ));
                setProcessingStep(3);
            }

            // Critic 처리
            if (data.critic) {
                setAgents(prev => prev.map(a =>
                    a.id === 'critic' ? {
                        ...a,
                        status: 'done',
                        task: data.critic.validation_result ? '검증 통과 ✓' : `재시도 ${data.critique_count}회`,
                        time: `${(parseFloat(totalTime) * 0.3).toFixed(1)}s`
                    } : a
                ));
                setProcessingStep(4);
            }

            // 결과 아티팩트 생성
            setArtifact({
                title: `SQL 분석 결과: "${intent}"`,
                analyst: data.analyst,
                writer: data.writer,
                critic: data.critic,
                final_sql: data.final_sql,
                execution_result: data.execution_result,
                critique_count: data.critique_count || 0,
                content: formatResultContent(data),
                changes: data.final_sql ? [
                    { type: 'add', line: `SQL 쿼리 생성 완료` },
                    { type: 'add', line: `총 처리 시간: ${totalTime}s` },
                ] : []
            });

            setSystemStatus('done');

        } catch (error) {
            console.error('API Error:', error);
            setAgents(prev => prev.map(a => ({
                ...a,
                status: 'idle',
                task: '오류 발생'
            })));
            setSystemStatus('ready');
            setProcessingStep(0);
            alert('❌ AI 서비스에 연결할 수 없습니다. Python 서버가 실행 중인지 확인해주세요.');
        }
    };

    // 결과 포맷팅 함수
    const formatResultContent = (data: any) => {
        let content = '';

        if (data.analyst) {
            content += `## 🔍 분석 결과\n`;
            content += `**사고 과정:** ${data.analyst.thought || '-'}\n\n`;
            content += `**대상 테이블:** ${data.analyst.target_table || '-'}\n`;
            content += `**필요 컬럼:** ${data.analyst.required_columns?.join(', ') || '-'}\n`;
            content += `**필터 조건:** ${data.analyst.filter_conditions || '없음'}\n`;
            content += `**집계:** ${data.analyst.aggregation || '없음'}\n\n`;
        }

        if (data.writer) {
            content += `## ✍️ 생성된 SQL\n`;
            content += `\`\`\`sql\n${data.writer.sql_query || data.final_sql}\n\`\`\`\n\n`;
            content += `**설명:** ${data.writer.explanation || '-'}\n\n`;
        }

        if (data.critic) {
            const status = data.critic.validation_result ? '✅ 통과' : '❌ 실패';
            content += `## 🔒 검증 결과\n`;
            content += `**상태:** ${status}\n`;
            content += `**보안:** ${data.critic.security_passed ? '✅' : '❌'}\n`;
            content += `**효율성:** ${'⭐'.repeat(data.critic.efficiency_score || 0)}\n`;
            if (data.critic.feedback) {
                content += `**피드백:** ${data.critic.feedback}\n`;
            }
            content += '\n';
        }

        if (data.execution_result && data.execution_result.length > 0) {
            content += `## 📊 실행 결과\n`;
            content += `총 ${data.execution_result.length}건의 결과\n\n`;

            // 테이블 형태로 표시
            const keys = Object.keys(data.execution_result[0]);
            content += `| ${keys.join(' | ')} |\n`;
            content += `| ${keys.map(() => '---').join(' | ')} |\n`;
            data.execution_result.slice(0, 10).forEach((row: any) => {
                content += `| ${keys.map(k => row[k]).join(' | ')} |\n`;
            });
            if (data.execution_result.length > 10) {
                content += `\n... 외 ${data.execution_result.length - 10}건\n`;
            }
        }

        return content;
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

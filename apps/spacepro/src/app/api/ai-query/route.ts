/**
 * AI Query API Route
 * 
 * Vertical AI Factory Python 서비스 프록시
 * POST /api/ai-query
 */

import { NextRequest, NextResponse } from 'next/server';

const PYTHON_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8100';

// Response 타입 정의
interface AgentResult {
    thought?: string;
    plan?: string;
    target_table?: string;
    required_columns?: string[];
    filter_conditions?: string;
    aggregation?: string;
    sql_query?: string;
    reasoning?: string;
    explanation?: string;
    validation_result?: boolean;
    security_passed?: boolean;
    efficiency_score?: number;
    feedback?: string;
    warnings?: string[];
}

interface QueryResponse {
    status: string;
    company_code?: string;
    graph_context?: string;
    analyst?: AgentResult;
    writer?: AgentResult;
    critic?: AgentResult;
    final_sql?: string;
    execution_result?: Record<string, unknown>[];
    error?: string;
    critique_count: number;
    provider?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { question, company_code = 'BINARY', provider = 'gemini' } = body;

        if (!question || typeof question !== 'string') {
            return NextResponse.json(
                { error: '질문을 입력해주세요.' },
                { status: 400 }
            );
        }

        // Python FastAPI 서버 호출
        const response = await fetch(`${PYTHON_SERVICE_URL}/api/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, company_code, provider }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(
                {
                    error: errorData.detail || 'AI 서비스 오류가 발생했습니다.',
                    status: 'error'
                },
                { status: response.status }
            );
        }

        const data: QueryResponse = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('AI Query API Error:', error);

        // Python 서버 연결 실패
        if (error instanceof TypeError && error.message.includes('fetch')) {
            return NextResponse.json(
                {
                    error: 'AI 서비스에 연결할 수 없습니다. Python 서버가 실행 중인지 확인해주세요.',
                    status: 'error'
                },
                { status: 503 }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal Server Error',
                status: 'error'
            },
            { status: 500 }
        );
    }
}

// Health check
export async function GET() {
    try {
        const response = await fetch(`${PYTHON_SERVICE_URL}/health`);

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json({
                status: 'healthy',
                python_service: data
            });
        }

        return NextResponse.json({
            status: 'degraded',
            python_service: 'unreachable'
        });

    } catch {
        return NextResponse.json({
            status: 'degraded',
            python_service: 'unreachable'
        });
    }
}

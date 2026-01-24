/**
 * Contract Schedule API Route
 */
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const res = await fetch(`${BACKEND_URL}/simulation/contract-schedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Contract schedule error:', error);
        return NextResponse.json({ error: 'Failed to run simulation' }, { status: 500 });
    }
}

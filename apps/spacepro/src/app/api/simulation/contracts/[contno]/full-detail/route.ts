/**
 * Contract Full Detail API Routes
 * Proxy to Backend
 */
import { NextResponse, NextRequest } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ contno: string }> } // In Next.js 15+, params is a Promise
) {
    try {
        const { contno } = await params;
        const res = await fetch(`${BACKEND_URL}/simulation/contracts/${contno}/full-detail`);

        if (!res.ok) {
            throw new Error(`Backend error: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Contract detail fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch contract details' }, { status: 500 });
    }
}

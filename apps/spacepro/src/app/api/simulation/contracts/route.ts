/**
 * Contract Simulation API Routes
 */
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/simulation/contracts`);
        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Contract fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch contracts' }, { status: 500 });
    }
}

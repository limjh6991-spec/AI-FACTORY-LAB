import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

// GET: List versions for a contract
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ contno: string }> }
) {
    try {
        const { contno } = await params;
        const res = await fetch(`${BACKEND_URL}/simulation/versions/${contno}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Backend responded with ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Versions List API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch versions' },
            { status: 500 }
        );
    }
}

// POST: Create a new simulation version
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ contno: string }> }
) {
    try {
        const { contno } = await params;
        const body = await request.json().catch(() => ({}));

        const res = await fetch(`${BACKEND_URL}/simulation/versions/${contno}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(`Backend responded with ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Create Version API Error:', error);
        return NextResponse.json(
            { error: 'Failed to create version' },
            { status: 500 }
        );
    }
}

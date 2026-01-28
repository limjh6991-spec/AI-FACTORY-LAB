import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

// PUT: Confirm a version
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ versionId: string }> }
) {
    try {
        const { versionId } = await params;
        const body = await request.json().catch(() => ({}));

        const res = await fetch(`${BACKEND_URL}/simulation/versions/${versionId}/confirm`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(`Backend responded with ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Confirm Version API Error:', error);
        return NextResponse.json(
            { error: 'Failed to confirm version' },
            { status: 500 }
        );
    }
}

// GET: Get plan for a version
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ versionId: string }> }
) {
    try {
        const { versionId } = await params;

        const res = await fetch(`${BACKEND_URL}/simulation/versions/${versionId}/plan`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Backend responded with ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Get Plan API Error:', error);
        return NextResponse.json(
            { error: 'Failed to get plan' },
            { status: 500 }
        );
    }
}

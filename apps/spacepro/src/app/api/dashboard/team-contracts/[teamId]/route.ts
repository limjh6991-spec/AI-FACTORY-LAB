import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ teamId: string }> }
) {
    try {
        const { teamId } = await params;
        const res = await fetch(`${BACKEND_URL}/dashboard/team-contracts/${teamId}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Backend responded with ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Team Contracts API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team contracts' },
            { status: 500 }
        );
    }
}

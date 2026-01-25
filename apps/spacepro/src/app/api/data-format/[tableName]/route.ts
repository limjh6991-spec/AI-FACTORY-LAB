/**
 * Data Format API - SP 테이블 샘플 데이터 조회
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 허용된 테이블 목록 (SQL Injection 방지)
const ALLOWED_TABLES = [
    'sp_site_mst',
    'sp_bench_mst',
    'sp_eqp_type',
    'sp_eqp_mst',
    'sp_undertaking_team_mst',
    'sp_undertaking_info',
    'sp_contract_info',
    'sp_macode_info',
    'sp_prcode_detail_info',
    'sp_pr_detail',
    'sp_material_info',
    'sp_team',
    'sp_employee',
    'sp_work_calendar',
];

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ tableName: string }> }
) {
    try {
        const { tableName } = await params;

        // 보안: 허용된 테이블만 조회
        if (!ALLOWED_TABLES.includes(tableName)) {
            return NextResponse.json(
                { error: 'Invalid table name' },
                { status: 400 }
            );
        }

        const { searchParams } = new URL(request.url);
        const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

        // 컬럼 정보 조회
        const columnsResult = await prisma.$queryRawUnsafe<{ column_name: string }[]>(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'spacepro' 
              AND table_name = '${tableName}'
            ORDER BY ordinal_position
        `);

        const columns = columnsResult.map(c => c.column_name);

        // 데이터 조회
        const rows = await prisma.$queryRawUnsafe<Record<string, any>[]>(`
            SELECT * FROM spacepro.${tableName} LIMIT ${limit}
        `);

        // 전체 건수 조회
        const countResult = await prisma.$queryRawUnsafe<{ count: bigint }[]>(`
            SELECT COUNT(*) as count FROM spacepro.${tableName}
        `);
        const count = Number(countResult[0]?.count || 0);

        return NextResponse.json({
            tableName,
            columns,
            rows,
            count
        });

    } catch (error) {
        console.error('Data format API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch table data' },
            { status: 500 }
        );
    }
}

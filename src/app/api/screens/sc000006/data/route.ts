import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const yearMonth = searchParams.get('yearMonth') || '202510';

    // 사용 가능한 년월 목록 조회
    const yearMonthResult = await db.$queryRaw<{ yyyymm: string }[]>`
      SELECT DISTINCT yyyymm 
      FROM doi_stco 
      ORDER BY yyyymm DESC
    `;
    const yearMonthOptions = yearMonthResult.map(r => r.yyyymm);

    // 메인 데이터 조회
    const data = await db.$queryRaw<any[]>`
      SELECT 
        sel_code as "category",
        model as "code",
        '' as "inch",
        site as "site",
        COALESCE(boh, 0) as "boh_qty",
        COALESCE(boh_amt, 0) as "boh_amt",
        COALESCE(input, 0) as "plan_qty",
        COALESCE(in_amt, 0) as "plan_amt",
        COALESCE(out, 0) as "actual_qty",
        COALESCE(out_amt, 0) as "actual_amt",
        CASE WHEN COALESCE(input, 0) > 0 
          THEN ROUND((COALESCE(out, 0)::numeric / COALESCE(input, 1)) * 100, 1) 
          ELSE 0 
        END as "achv_qty",
        CASE WHEN COALESCE(in_amt, 0) > 0 
          THEN ROUND((COALESCE(out_amt, 0)::numeric / COALESCE(in_amt, 1)) * 100, 1) 
          ELSE 0 
        END as "achv_amt",
        COALESCE(eoh, 0) as "eoh_qty",
        COALESCE(eoh_amt, 0) as "eoh_amt",
        expen_sel,
        expen_sel_name
      FROM doi_stco
      WHERE yyyymm = ${yearMonth}
      ORDER BY sel_code, model
      LIMIT 100
    `;

    // 숫자 타입 변환 (BigInt 처리)
    const formattedData = data.map(row => ({
      ...row,
      boh_qty: Number(row.boh_qty),
      boh_amt: Number(row.boh_amt),
      plan_qty: Number(row.plan_qty),
      plan_amt: Number(row.plan_amt),
      actual_qty: Number(row.actual_qty),
      actual_amt: Number(row.actual_amt),
      achv_qty: Number(row.achv_qty),
      achv_amt: Number(row.achv_amt),
      eoh_qty: Number(row.eoh_qty),
      eoh_amt: Number(row.eoh_amt),
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      yearMonthOptions,
      totalCount: formattedData.length
    });
  } catch (error) {
    console.error('SC000006 데이터 조회 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '데이터 조회 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

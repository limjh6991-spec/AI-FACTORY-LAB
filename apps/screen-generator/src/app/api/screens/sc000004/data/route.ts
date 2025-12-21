import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const yearMonth = searchParams.get('yearMonth') || '202510';
    const materialCode = searchParams.get('materialCode') || '';

    // 사용 가능한 년월 목록 조회
    const yearMonthResult = await db.$queryRaw<{ yyyymm: string }[]>`
      SELECT DISTINCT yyyymm 
      FROM doi_material_resc 
      ORDER BY yyyymm DESC
    `;
    const yearMonthOptions = yearMonthResult.map(r => r.yyyymm);

    // 메인 데이터 조회
    let data;
    if (materialCode) {
      data = await db.$queryRaw<any[]>`
        SELECT 
          mat_gubun as "materialType",
          mat_code as "itemCode",
          mat_desc as "itemName",
          size as "specification",
          COALESCE(in_qty, 0) as "inboundQty",
          COALESCE(in_amt, 0) as "inboundAmount",
          COALESCE(unit_cost, 0) as "inboundPrice",
          COALESCE(in_qty, 0) as "stockQty",
          COALESCE(in_amt, 0) as "stockAmount",
          COALESCE(unit_cost, 0) as "stockPrice"
        FROM doi_material_resc
        WHERE yyyymm = ${yearMonth}
          AND mat_code LIKE ${`%${materialCode}%`}
        ORDER BY mat_gubun, mat_code
        LIMIT 100
      `;
    } else {
      data = await db.$queryRaw<any[]>`
        SELECT 
          mat_gubun as "materialType",
          mat_code as "itemCode",
          mat_desc as "itemName",
          size as "specification",
          COALESCE(in_qty, 0) as "inboundQty",
          COALESCE(in_amt, 0) as "inboundAmount",
          COALESCE(unit_cost, 0) as "inboundPrice",
          COALESCE(in_qty, 0) as "stockQty",
          COALESCE(in_amt, 0) as "stockAmount",
          COALESCE(unit_cost, 0) as "stockPrice"
        FROM doi_material_resc
        WHERE yyyymm = ${yearMonth}
        ORDER BY mat_gubun, mat_code
        LIMIT 100
      `;
    }

    // 숫자 타입 변환 (BigInt 처리)
    const formattedData = data.map(row => ({
      ...row,
      inboundQty: Number(row.inboundQty),
      inboundAmount: Number(row.inboundAmount),
      inboundPrice: Number(row.inboundPrice),
      stockQty: Number(row.stockQty),
      stockAmount: Number(row.stockAmount),
      stockPrice: Number(row.stockPrice),
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      yearMonthOptions,
      totalCount: formattedData.length
    });
  } catch (error) {
    console.error('SC000004 데이터 조회 오류:', error);
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

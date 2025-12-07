import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '~/server/db';

// 한글 컬럼명 → 영문 field 매핑 (AG Grid 호환)
const COLUMN_MAPPING: Record<string, string> = {
  // 공통
  '년월': 'yyyymm',
  '사업장': 'site',
  '부서': 'department',
  '계정': 'account',
  '거래처': 'customer',
  '비고': 'remark',
  '합계': 'total',
  
  // 자재 관련
  '자재구분': 'materialType',
  '품번': 'partNumber',
  '품명': 'partName',
  '대분류': 'majorCategory',
  '중분류': 'minorCategory',
  '규격': 'specification',
  '단위': 'unit',
  '수량': 'qty',
  '금액': 'amount',
  '단가': 'price',
  
  // 재고/수불
  '기초수량': 'beginQty',
  '기초금액': 'beginAmount',
  '기초단가': 'beginPrice',
  '입고수량': 'inQty',
  '입고금액': 'inAmount',
  '입고단가': 'inPrice',
  '기타입고수량': 'otherInQty',
  '기타입고금액': 'otherInAmount',
  '기타입고단가': 'otherInPrice',
  '출고수량': 'outQty',
  '출고금액': 'outAmount',
  '출고단가': 'outPrice',
  '기타출고수량': 'otherOutQty',
  '기타출고금액': 'otherOutAmount',
  '기타출고단가': 'otherOutPrice',
  '재고수량': 'stockQty',
  '재고금액': 'stockAmount',
  '재고단가': 'stockPrice',
  
  // 매출/판매
  '매출수량': 'salesQty',
  '매출금액': 'salesAmount',
  '매출단가': 'salesPrice',
  
  // 생산
  '생산수량': 'prodQty',
  '생산금액': 'prodAmount',
  
  // 일자
  '일자': 'date',
  '등록일': 'regDate',
  '수정일': 'modDate',
};

/**
 * 동적 화면 데이터 조회 API
 * 화면별로 저장된 SQL 쿼리를 실행하여 데이터를 반환
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ screenId: string }> }
) {
  try {
    const { screenId } = await params;
    const searchParams = request.nextUrl.searchParams;
    
    console.log(`[API] /api/screens/${screenId}/data 요청`);
    
    // 1. 화면 디렉토리 찾기 (generated/screens 또는 src/app/screens)
    const generatedScreenDir = path.join(process.cwd(), 'generated', 'screens', screenId.toUpperCase());
    const appScreenDir = path.join(process.cwd(), 'src', 'app', 'screens', screenId.toLowerCase());
    
    let screenDir = '';
    if (fs.existsSync(generatedScreenDir)) {
      screenDir = generatedScreenDir;
    } else if (fs.existsSync(path.join(generatedScreenDir.replace(screenId.toUpperCase(), screenId)))) {
      screenDir = generatedScreenDir.replace(screenId.toUpperCase(), screenId);
    }
    
    // 2. 메타데이터 로드
    let metadata: any = null;
    const metadataPath = path.join(screenDir, 'metadata.json');
    if (fs.existsSync(metadataPath)) {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      console.log(`[API] 메타데이터 로드: ${metadata?.screenName || screenId}`);
    }
    
    // 3. SQL 쿼리 로드
    const sqlPath = path.join(screenDir, 'query.sql');
    let sqlQuery = '';
    if (fs.existsSync(sqlPath)) {
      sqlQuery = fs.readFileSync(sqlPath, 'utf-8').trim();
      console.log(`[API] SQL 쿼리 로드: ${sqlQuery.substring(0, 100)}...`);
    }
    
    // 4. 테이블 정보 추출 (메타데이터 또는 쿼리에서)
    const tableName = metadata?.tableName || extractTableName(sqlQuery);
    
    if (!tableName && !sqlQuery) {
      console.log(`[API] SQL 쿼리 없음 - 샘플 데이터 반환`);
      return NextResponse.json({
        success: true,
        data: [],
        message: 'SQL 쿼리가 정의되지 않았습니다. 화면 생성 시 쿼리를 생성해주세요.',
        screenId,
      });
    }
    
    // 5. 검색 조건 처리
    const yearMonth = searchParams.get('yearMonth') || searchParams.get('yyyymm') || getCurrentYearMonth();
    const materialCode = searchParams.get('materialCode') || searchParams.get('mat_code') || '';
    const site = searchParams.get('site') || '';
    
    // 6. 쿼리 실행
    let data: any[] = [];
    
    if (sqlQuery) {
      // 저장된 쿼리 사용 (파라미터 치환)
      // 다양한 파라미터 형식 지원: :param, ${param}, $param
      let execQuery = sqlQuery
        // 년월 파라미터
        .replace(/\$\{yearMonth\}|\$\{yyyymm\}|\:yearMonth|\:yyyymm|\$yearMonth|\$yyyymm/gi, `'${yearMonth}'`)
        // 자재코드 파라미터 (빈값이면 조건 제외를 위해 1=1로 대체)
        .replace(/\$\{materialCode\}|\$\{mat_code\}|\:materialCode|\:mat_code|\$materialCode|\$mat_code/gi, 
          materialCode ? `'%${materialCode}%'` : "'%%'")
        // 사업장 파라미터
        .replace(/\$\{site\}|\:site|\$site/gi, site ? `'${site}'` : "'%%'");
      
      // 쿼리 끝의 세미콜론 제거
      execQuery = execQuery.trim().replace(/;+\s*$/, '');
      
      // LIMIT 확인 및 추가
      if (!execQuery.toLowerCase().includes('limit')) {
        execQuery += ' LIMIT 500';
      }
      
      console.log(`[API] 실행 쿼리: ${execQuery.substring(0, 300)}...`);
      
      try {
        data = await db.$queryRawUnsafe(execQuery);
      } catch (queryError) {
        console.error(`[API] 쿼리 실행 오류:`, queryError);
        // 쿼리 실패 시 기본 쿼리 시도
        data = await executeDefaultQuery(tableName, yearMonth, materialCode);
      }
    } else if (tableName) {
      // 테이블 이름만 있는 경우 기본 쿼리 실행
      data = await executeDefaultQuery(tableName, yearMonth, materialCode);
    }
    
    // 7. BigInt 및 숫자 타입 변환 + 한글 컬럼명 → 영문 field 매핑
    const formattedData = data.map(row => {
      const newRow: Record<string, any> = {};
      for (const [key, value] of Object.entries(row as Record<string, unknown>)) {
        // 한글 컬럼명이면 영문으로 변환, 아니면 그대로 사용
        const mappedKey = COLUMN_MAPPING[key] || key;
        
        if (typeof value === 'bigint') {
          newRow[mappedKey] = Number(value);
        } else if (value instanceof Date) {
          newRow[mappedKey] = value.toISOString();
        } else {
          newRow[mappedKey] = value;
        }
      }
      return newRow;
    });
    
    console.log(`[API] 데이터 조회 완료: ${formattedData.length}건`);
    
    return NextResponse.json({
      success: true,
      data: formattedData,
      totalCount: formattedData.length,
      screenId,
      tableName,
    });
    
  } catch (error) {
    console.error(`[API] 데이터 조회 오류:`, error);
    return NextResponse.json(
      {
        success: false,
        error: '데이터 조회 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * 현재 년월 반환 (YYYYMM 형식)
 */
function getCurrentYearMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}${month}`;
}

/**
 * SQL 쿼리에서 테이블명 추출
 */
function extractTableName(sql: string): string | null {
  if (!sql) return null;
  
  // FROM 절에서 테이블명 추출
  const fromMatch = sql.match(/FROM\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
  if (fromMatch && fromMatch[1]) {
    return fromMatch[1];
  }
  return null;
}

/**
 * 기본 쿼리 실행 (테이블명만 있는 경우)
 */
async function executeDefaultQuery(
  tableName: string, 
  yearMonth: string, 
  materialCode: string
): Promise<any[]> {
  try {
    // 테이블에 yyyymm 컬럼이 있는지 확인
    const columnCheck = await db.$queryRawUnsafe<any[]>(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = '${tableName.toLowerCase()}'
      AND column_name = 'yyyymm'
    `);
    
    const hasYearMonth = columnCheck.length > 0;
    
    let query = `SELECT * FROM ${tableName}`;
    const conditions: string[] = [];
    
    if (hasYearMonth && yearMonth) {
      conditions.push(`yyyymm = '${yearMonth}'`);
    }
    
    if (materialCode) {
      // mat_code 또는 item_code 컬럼 확인
      const matCodeCheck = await db.$queryRawUnsafe<any[]>(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = '${tableName.toLowerCase()}'
        AND column_name IN ('mat_code', 'item_code', 'material_code')
      `);
      
      if (matCodeCheck.length > 0) {
        const colName = (matCodeCheck[0] as { column_name: string }).column_name;
        conditions.push(`${colName} LIKE '%${materialCode}%'`);
      }
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' LIMIT 500';
    
    console.log(`[API] 기본 쿼리 실행: ${query}`);
    return await db.$queryRawUnsafe(query);
    
  } catch (error) {
    console.error(`[API] 기본 쿼리 실행 실패:`, error);
    return [];
  }
}

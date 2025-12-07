/**
 * SQL 쿼리 자동 생성 모듈
 * 
 * 이 모듈은 향후 LLM 교체를 고려하여 분리되었습니다.
 * - 현재: 규칙 기반 쿼리 생성
 * - 향후: LLM 기반 쿼리 생성으로 교체 가능
 */

import { 
  loadDbMetadata, 
  findTableMeta 
} from './db-metadata';
import { 
  HEADER_TO_COLUMN_MAP,
  type TableMeta, 
  type ParsedData,
  type ColumnMapping,
  type SelectMapping,
  type AllColumnMapping,
  type QueryGenerationResult,
} from './types';

/**
 * SQL 쿼리 생성 (규칙 기반)
 * 
 * @param parsedData 파싱된 엑셀 데이터
 * @param tableName 대상 테이블명
 * @returns 쿼리 생성 결과
 */
export function generateSqlQuery(
  parsedData: Partial<ParsedData>,
  tableName: string
): QueryGenerationResult {
  try {
    // 1. DB 메타데이터에서 테이블 정보 조회
    const tableMeta = findTableMeta(tableName);
    
    if (!tableMeta) {
      const metadata = loadDbMetadata();
      return {
        success: false,
        error: `테이블 '${tableName}'을(를) 찾을 수 없습니다. DB 메타데이터를 확인하세요.`,
        availableTables: metadata.slice(0, 20).map(t => t.name),
      };
    }
    
    // 2. 조회조건에서 WHERE 절 컬럼 추출
    const searchConditions = parsedData.searchConditions || [];
    const { whereColumns, columnMappings } = extractWhereColumns(
      searchConditions,
      tableMeta
    );
    
    // 3. 그리드 컬럼에서 SELECT 절 컬럼 추출
    const gridColumns = parsedData.gridColumns;
    const { 
      selectColumns, 
      selectMappings, 
      allColumnMappings 
    } = extractSelectColumns(gridColumns, tableMeta);
    
    // 4. SQL 쿼리 생성
    const sql = buildSqlQuery(
      parsedData.screenName || '화면',
      tableName,
      tableMeta,
      allColumnMappings,
      selectColumns,
      columnMappings
    );
    
    // 5. 통계 및 결과 반환
    const unmatchedHeaders = allColumnMappings
      .filter(m => !m.isMapped)
      .map(m => m.gridHeader);
    const mappedCount = allColumnMappings.filter(m => m.isMapped).length;
    const unmappedCount = allColumnMappings.filter(m => !m.isMapped).length;
    
    return {
      success: true,
      sql,
      tableMeta: {
        name: tableMeta.name,
        korean_name: tableMeta.korean_name,
        columnCount: tableMeta.columns.length,
        availableColumns: tableMeta.columns.map(c => c.name),
      },
      columnMappings,
      selectMappings,
      allColumnMappings,
      unmatchedHeaders,
      stats: {
        totalColumns: allColumnMappings.length,
        mappedCount,
        unmappedCount,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: `쿼리 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
    };
  }
}

/**
 * 조회조건에서 WHERE 절 컬럼 추출
 */
function extractWhereColumns(
  searchConditions: any[],
  tableMeta: TableMeta
): { whereColumns: string[]; columnMappings: ColumnMapping[] } {
  const whereColumns: string[] = [];
  const columnMappings: ColumnMapping[] = [];
  
  for (const sc of searchConditions) {
    const label = sc.label?.toString() || '';
    const scId = sc.id?.toString().toLowerCase() || '';
    
    // 1차: 매핑 사전에서 찾기
    let matchedColName: string | null = null;
    const mappedCols = HEADER_TO_COLUMN_MAP[label];
    if (mappedCols) {
      for (const candidate of mappedCols) {
        const found = tableMeta.columns.find(
          c => c.name.toLowerCase() === candidate.toLowerCase()
        );
        if (found) {
          matchedColName = found.name;
          break;
        }
      }
    }
    
    // 2차: 메타데이터에서 직접 찾기
    if (!matchedColName) {
      const matchedCol = tableMeta.columns.find(col => {
        const colName = col.name.toLowerCase();
        const korName = col.korean_name.toLowerCase();
        return colName.includes(scId) || 
               korName.includes(label.toLowerCase()) ||
               scId.includes(colName);
      });
      if (matchedCol) matchedColName = matchedCol.name;
    }
    
    if (matchedColName) {
      whereColumns.push(matchedColName);
      const col = tableMeta.columns.find(c => c.name === matchedColName);
      columnMappings.push({
        label: sc.label,
        dbColumn: matchedColName,
        type: col?.type || 'unknown',
      });
    } else {
      columnMappings.push({
        label: sc.label,
        dbColumn: sc.id || 'UNKNOWN',
        type: 'unknown',
      });
    }
  }
  
  return { whereColumns, columnMappings };
}

/**
 * 그리드 컬럼에서 SELECT 절 컬럼 추출
 */
function extractSelectColumns(
  gridColumns: any,
  tableMeta: TableMeta
): { 
  selectColumns: string[]; 
  selectMappings: SelectMapping[]; 
  allColumnMappings: AllColumnMapping[] 
} {
  const selectColumns: string[] = [];
  const selectMappings: SelectMapping[] = [];
  const allColumnMappings: AllColumnMapping[] = [];
  
  const row2 = gridColumns?.row2 || [];
  const row3 = gridColumns?.row3 || [];
  
  // 기본 컬럼 추가 (그룹화/정렬용)
  const baseColumns = ['yyyymm', 'site', 'mat_gubun', 'mat_code', 'mat_desc', 'size'];
  for (const col of baseColumns) {
    const found = tableMeta.columns.find(c => c.name.toLowerCase() === col);
    if (found && !selectColumns.includes(found.name)) {
      selectColumns.push(found.name);
    }
  }
  
  // row3 (상세 헤더) 기반 매핑
  for (let i = 0; i < row3.length; i++) {
    const groupHeader = row2[i]?.toString().trim() || '';
    const detailHeader = row3[i]?.toString().trim() || '';
    
    const h = detailHeader || groupHeader;
    if (!h || h.includes('합계')) continue;
    
    // 1차: 매핑 사전에서 찾기
    let matchedColName: string | null = null;
    const mappedCols = HEADER_TO_COLUMN_MAP[h];
    if (mappedCols) {
      for (const candidate of mappedCols) {
        const found = tableMeta.columns.find(
          c => c.name.toLowerCase() === candidate.toLowerCase()
        );
        if (found && !selectColumns.includes(found.name)) {
          matchedColName = found.name;
          break;
        }
      }
    }
    
    // 2차: 메타데이터에서 직접 찾기
    if (!matchedColName) {
      const matchedCol = tableMeta.columns.find(col => {
        const colName = col.name.toLowerCase();
        const korName = col.korean_name.toLowerCase();
        const hLower = h.toLowerCase();
        return (colName === hLower || korName === hLower ||
                hLower.includes(colName) || hLower.includes(korName)) &&
               !selectColumns.includes(col.name);
      });
      if (matchedCol) matchedColName = matchedCol.name;
    }
    
    if (matchedColName) {
      selectColumns.push(matchedColName);
      const col = tableMeta.columns.find(c => c.name === matchedColName);
      selectMappings.push({
        gridHeader: h,
        dbColumn: matchedColName,
        type: col?.type || 'unknown',
        alias: h,
      });
      allColumnMappings.push({
        gridHeader: h,
        dbColumn: matchedColName,
        type: col?.type || 'unknown',
        alias: h,
        isMapped: true,
      });
    } else {
      allColumnMappings.push({
        gridHeader: h,
        dbColumn: null,
        type: 'unknown',
        alias: h,
        isMapped: false,
      });
    }
  }
  
  // SELECT 컬럼이 없으면 전체 컬럼 사용 (비즈니스 컬럼만)
  if (allColumnMappings.length === 0) {
    const businessColumns = tableMeta.columns.filter(col => 
      !col.name.toLowerCase().includes('create') &&
      !col.name.toLowerCase().includes('update') &&
      !col.name.toLowerCase().includes('delete')
    );
    for (const col of businessColumns.slice(0, 20)) {
      selectColumns.push(col.name);
      selectMappings.push({
        gridHeader: col.korean_name || col.name,
        dbColumn: col.name,
        type: col.type,
        alias: col.korean_name || col.name,
      });
      allColumnMappings.push({
        gridHeader: col.korean_name || col.name,
        dbColumn: col.name,
        type: col.type,
        alias: col.korean_name || col.name,
        isMapped: true,
      });
    }
  }
  
  return { selectColumns, selectMappings, allColumnMappings };
}

/**
 * SQL 쿼리 문자열 생성
 */
function buildSqlQuery(
  screenName: string,
  tableName: string,
  tableMeta: TableMeta,
  allColumnMappings: AllColumnMapping[],
  selectColumns: string[],
  columnMappings: ColumnMapping[]
): string {
  // SELECT 절 생성
  const selectItems = allColumnMappings.length > 0
    ? allColumnMappings.map((m, index) => {
        const isLast = index === allColumnMappings.length - 1;
        const comma = isLast ? '' : ',';
        if (m.isMapped && m.dbColumn) {
          return `  ${m.dbColumn} AS "${m.alias}"${comma}`;
        } else {
          return `  '' AS "${m.alias}"${comma}  -- TODO: 미매핑`;
        }
      })
    : selectColumns.map((c, index) => {
        const isLast = index === selectColumns.length - 1;
        return `  ${c}${isLast ? '' : ','}`;
      });
  const selectClause = selectItems.join('\n');
  
  // WHERE 절 생성
  let whereClause = '';
  if (columnMappings.length > 0) {
    const conditions = columnMappings
      .filter(m => m.dbColumn !== 'UNKNOWN')
      .map(m => {
        if (m.type.includes('varchar') || m.type.includes('text')) {
          return `  AND ${m.dbColumn} = :${m.dbColumn}`;
        } else if (m.type.includes('date') || m.type.includes('timestamp')) {
          return `  AND ${m.dbColumn} BETWEEN :${m.dbColumn}_start AND :${m.dbColumn}_end`;
        } else {
          return `  AND ${m.dbColumn} = :${m.dbColumn}`;
        }
      });
    whereClause = conditions.join('\n');
  }
  
  // 미매핑 헤더 추출
  const unmatchedHeaders = allColumnMappings
    .filter(m => !m.isMapped)
    .map(m => m.gridHeader);
  
  // 미매핑 컬럼에 대한 주석 생성
  let unmatchedComment = '';
  if (unmatchedHeaders.length > 0) {
    unmatchedComment = `
-- ⚠️ 미매핑 컬럼 ${unmatchedHeaders.length}개 (빈값으로 처리됨 - JOIN 또는 계산 필요):
-- ${unmatchedHeaders.join(', ')}
-- 
-- 💡 힌트: 자재수불부는 보통 다음과 같은 구조가 필요합니다:
--   - 기초 = 전월 재고
--   - 입고 = 당월 입고 합계
--   - 출고 = 당월 출고 합계  
--   - 재고 = 기초 + 입고 - 출고
-- 별도 테이블 JOIN 또는 서브쿼리/CTE로 계산 필요
`;
  }
  
  // 최종 SQL 생성
  const sql = `-- ${screenName} 조회 쿼리
-- 생성일시: ${new Date().toISOString()}
-- 테이블: ${tableName}
-- 사용 가능 컬럼: ${tableMeta.columns.length}개
${unmatchedComment}
SELECT
${selectClause}
FROM ${tableName}
WHERE 1=1
${whereClause}
ORDER BY ${selectColumns[0] || 'yyyymm'} DESC
;`;

  return sql;
}

// ========================================
// LLM 기반 쿼리 생성 인터페이스 (향후 확장용)
// ========================================

/**
 * LLM 기반 쿼리 생성 인터페이스
 * 향후 다양한 LLM 프로바이더 지원을 위한 추상화
 */
export interface QueryGeneratorProvider {
  name: string;
  generateQuery(prompt: string): Promise<string>;
}

/**
 * LLM 기반 쿼리 생성 (향후 구현)
 * 
 * @param parsedData 파싱된 데이터
 * @param tableName 테이블명
 * @param provider LLM 프로바이더
 */
export async function generateSqlQueryWithLLM(
  parsedData: Partial<ParsedData>,
  tableName: string,
  provider: QueryGeneratorProvider
): Promise<QueryGenerationResult> {
  // TODO: LLM 기반 쿼리 생성 구현
  // 1. 프롬프트 생성
  // 2. LLM API 호출
  // 3. 응답 파싱 및 검증
  // 4. 결과 반환
  
  // 현재는 규칙 기반 생성으로 폴백
  console.log(`[QUERY-GEN] LLM provider '${provider.name}' 요청됨, 규칙 기반으로 폴백`);
  return generateSqlQuery(parsedData, tableName);
}

/**
 * 쿼리 생성 프롬프트 빌드 (LLM용)
 * 
 * @param parsedData 파싱된 데이터
 * @param tableMeta 테이블 메타정보
 */
export function buildQueryPrompt(
  parsedData: Partial<ParsedData>,
  tableMeta: TableMeta
): string {
  const columnInfo = tableMeta.columns
    .map(c => `  - ${c.name} (${c.korean_name}): ${c.type}`)
    .join('\n');
  
  return `
다음 정보를 바탕으로 SQL SELECT 쿼리를 생성해주세요.

## 화면 정보
- 화면명: ${parsedData.screenName}
- 테이블: ${tableMeta.name} (${tableMeta.korean_name})

## 테이블 컬럼 정보
${columnInfo}

## 조회조건
${JSON.stringify(parsedData.searchConditions || [], null, 2)}

## 그리드 컬럼
${JSON.stringify(parsedData.gridColumns?.row3 || [], null, 2)}

## 요구사항
1. SELECT 절에는 그리드 컬럼에 해당하는 DB 컬럼을 매핑
2. WHERE 절에는 조회조건에 해당하는 필터 추가
3. 적절한 ORDER BY 추가
4. 파라미터 바인딩 형식 사용 (:paramName)
`;
}

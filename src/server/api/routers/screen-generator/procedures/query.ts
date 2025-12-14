/**
 * SQL 쿼리 생성 프로시저
 * @module screenGenerator/procedures/query
 */

import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import {
  loadDbMetadata,
  findTableMeta,
  HEADER_TO_COLUMN_MAP,
} from "../_shared/legacy";

/**
 * SQL 쿼리 자동 생성
 */
export const generateQuery = publicProcedure
  .input(z.object({
    parsedData: z.any(),
    tableName: z.string(),
  }))
  .mutation(async ({ input }) => {
    try {
      const { parsedData, tableName } = input;
      
      // 1. DB 메타데이터에서 테이블 정보 조회
      const tableMeta = findTableMeta(tableName);
      
      if (!tableMeta) {
        return {
          success: false,
          error: `테이블 '${tableName}'을(를) 찾을 수 없습니다. DB 메타데이터를 확인하세요.`,
          availableTables: loadDbMetadata().slice(0, 20).map(t => t.name),
        };
      }
      
      // 2. 조회조건에서 WHERE 절 컬럼 추출
      const searchConditions = parsedData.searchConditions || [];
      const whereColumns: string[] = [];
      const columnMappings: Array<{label: string; dbColumn: string; type: string}> = [];
      
      for (const sc of searchConditions) {
        const label = sc.label?.toString() || '';
        const scId = sc.id?.toString().toLowerCase() || '';
        
        let matchedColName: string | null = null;
        const mappedCols = HEADER_TO_COLUMN_MAP[label];
        if (mappedCols) {
          for (const candidate of mappedCols) {
            const found = tableMeta.columns.find(c => c.name.toLowerCase() === candidate.toLowerCase());
            if (found) {
              matchedColName = found.name;
              break;
            }
          }
        }
        
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
      
      // 3. 그리드 컬럼에서 SELECT 절 컬럼 추출
      const gridColumns = parsedData.gridColumns || {};
      const row2 = gridColumns.row2 || [];
      const row3 = gridColumns.row3 || [];
      const selectColumns: string[] = [];
      
      const allColumnMappings: Array<{
        gridHeader: string;
        dbColumn: string | null;
        type: string;
        alias: string;
        isMapped: boolean;
      }> = [];
      
      // 기본 컬럼 추가
      const baseColumns = ['yyyymm', 'site', 'mat_gubun', 'mat_code', 'mat_desc', 'size'];
      for (const col of baseColumns) {
        const found = tableMeta.columns.find(c => c.name.toLowerCase() === col);
        if (found && !selectColumns.includes(found.name)) {
          selectColumns.push(found.name);
        }
      }
      
      // row2 + row3 조합해서 매핑
      for (let i = 0; i < row3.length; i++) {
        const groupHeader = row2[i]?.toString().trim() || '';
        const detailHeader = row3[i]?.toString().trim() || '';
        const h = detailHeader || groupHeader;
        
        if (!h || h.includes('합계')) continue;
        
        let matchedColName: string | null = null;
        const mappedCols = HEADER_TO_COLUMN_MAP[h];
        if (mappedCols) {
          for (const candidate of mappedCols) {
            const found = tableMeta.columns.find(c => c.name.toLowerCase() === candidate.toLowerCase());
            if (found && !selectColumns.includes(found.name)) {
              matchedColName = found.name;
              break;
            }
          }
        }
        
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
      
      // 4. SELECT 컬럼이 없으면 전체 컬럼 사용
      if (allColumnMappings.length === 0) {
        const businessColumns = tableMeta.columns.filter(col => 
          !col.name.toLowerCase().includes('create') &&
          !col.name.toLowerCase().includes('update') &&
          !col.name.toLowerCase().includes('delete')
        );
        for (const col of businessColumns.slice(0, 20)) {
          selectColumns.push(col.name);
          allColumnMappings.push({
            gridHeader: col.korean_name || col.name,
            dbColumn: col.name,
            type: col.type,
            alias: col.korean_name || col.name,
            isMapped: true,
          });
        }
      }
      
      // 5. SQL 쿼리 생성
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
      if (whereColumns.length > 0) {
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
      
      let unmatchedComment = '';
      if (unmatchedHeaders.length > 0) {
        unmatchedComment = `
-- ⚠️ 미매핑 컬럼 ${unmatchedHeaders.length}개 (빈값으로 처리됨):
-- ${unmatchedHeaders.join(', ')}
`;
      }
      
      const sql = `-- ${parsedData.screenName || '화면'} 조회 쿼리
-- 생성일시: ${new Date().toISOString()}
-- 테이블: ${tableName}
${unmatchedComment}
SELECT
${selectClause}
FROM ${tableName}
WHERE 1=1
${whereClause}
ORDER BY ${selectColumns[0] || 'yyyymm'} DESC
;`;
      
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
        allColumnMappings,
        unmatchedHeaders,
        stats: {
          totalColumns: allColumnMappings.length,
          mappedCount,
          unmappedCount,
        },
        suggestion: unmatchedHeaders.length > 0 
          ? `전체 ${allColumnMappings.length}개 컬럼 중 ${mappedCount}개 매핑, ${unmappedCount}개 미매핑.`
          : `전체 ${allColumnMappings.length}개 컬럼 모두 매핑 완료.`,
      };
    } catch (error) {
      return {
        success: false,
        error: `쿼리 생성 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      };
    }
  });

/**
 * DB 테이블 목록 조회
 */
export const getTableList = publicProcedure
  .query(() => {
    const metadata = loadDbMetadata();
    return metadata.map(t => ({
      name: t.name,
      korean_name: t.korean_name,
      columnCount: t.columns.length,
    }));
  });

/**
 * 특정 테이블의 컬럼 정보 조회
 */
export const getTableColumns = publicProcedure
  .input(z.object({
    tableName: z.string(),
  }))
  .query(({ input }) => {
    const tableMeta = findTableMeta(input.tableName);
    if (!tableMeta) {
      return { success: false, error: `테이블 '${input.tableName}'을(를) 찾을 수 없습니다.` };
    }
    return {
      success: true,
      tableName: tableMeta.name,
      korean_name: tableMeta.korean_name,
      columns: tableMeta.columns.map(c => ({
        name: c.name,
        korean_name: c.korean_name,
        type: c.type,
        nullable: c.nullable,
        meaning: c.meaning,
      })),
    };
  });

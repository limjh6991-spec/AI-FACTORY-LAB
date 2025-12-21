/**
 * DB 메타데이터 조회 라우터
 *
 * 실시간으로 DB의 INFORMATION_SCHEMA를 조회하여
 * 테이블 스키마 정보를 반환합니다.
 *
 * @module db-meta
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

/**
 * 컬럼 정보 타입
 */
interface ColumnInfo {
  field: string;
  type: string;
  isPk: boolean;
  isNullable: boolean;
  defaultValue?: string | null;
  extra?: string;
}

/**
 * DB 메타데이터 라우터
 */
export const dbMetaRouter = createTRPCRouter({
  /**
   * 테이블 스키마 조회
   *
   * INFORMATION_SCHEMA.COLUMNS를 조회하여
   * 테이블의 컬럼 정보를 실시간으로 가져옵니다.
   * public, binary 스키마 모두 검색
   */
  getTableSchema: publicProcedure
    .input(z.object({
      tableName: z.string(),
    }))
    .query(async ({ input }) => {
      const { tableName } = input;

      try {
        // PostgreSQL용 쿼리 (대소문자 구분 없이 검색, public + binary 스키마)
        const columns = await db.$queryRaw<ColumnInfo[]>`
          SELECT
            c.column_name as field,
            c.data_type as type,
            CASE WHEN pk.column_name IS NOT NULL THEN true ELSE false END as "isPk",
            CASE WHEN c.is_nullable = 'YES' THEN true ELSE false END as "isNullable",
            c.column_default as "defaultValue",
            '' as extra
          FROM information_schema.columns c
          LEFT JOIN (
            SELECT ku.column_name, ku.table_schema
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage ku
              ON tc.constraint_name = ku.constraint_name
              AND tc.table_schema = ku.table_schema
            WHERE tc.constraint_type = 'PRIMARY KEY'
              AND tc.table_schema IN ('public', 'binary')
              AND LOWER(tc.table_name) = LOWER(${tableName})
          ) pk ON c.column_name = pk.column_name AND c.table_schema = pk.table_schema
          WHERE c.table_schema IN ('public', 'binary')
            AND LOWER(c.table_name) = LOWER(${tableName})
          ORDER BY c.ordinal_position
        `;

        if (!columns || columns.length === 0) {
          // 테이블 목록을 가져와서 유사한 테이블명 제안 (public + binary 스키마)
          const similarTables = await db.$queryRaw<Array<{ tableName: string }>>`
            SELECT table_name as "tableName"
            FROM information_schema.tables
            WHERE table_schema IN ('public', 'binary')
              AND table_type = 'BASE TABLE'
              AND LOWER(table_name) LIKE LOWER(${'%' + tableName + '%'})
            LIMIT 5
          `;

          const suggestion = similarTables.length > 0
            ? ` 유사한 테이블: ${similarTables.map(t => t.tableName).join(', ')}`
            : '';

          return {
            success: false,
            error: `테이블 '${tableName}'을(를) 찾을 수 없습니다.${suggestion}`,
            columns: [],
          };
        }

        // 데이터 포맷팅
        const formattedColumns = columns.map(col => ({
          field: col.field,
          type: col.type,
          isPk: Boolean(col.isPk),
          isNullable: Boolean(col.isNullable),
          defaultValue: col.defaultValue,
          extra: col.extra,
        }));

        return {
          success: true,
          tableName,
          columns: formattedColumns,
          primaryKeys: formattedColumns.filter(col => col.isPk).map(col => col.field),
        };
      } catch (error) {
        console.error('[DB-META] 테이블 스키마 조회 오류:', error);
        return {
          success: false,
          error: `스키마 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
          columns: [],
        };
      }
    }),

  /**
   * 모든 테이블 목록 조회 (public + binary 스키마)
   */
  getTableList: publicProcedure
    .query(async () => {
      try {
        const tables = await db.$queryRaw<Array<{ tableName: string; tableType: string; tableSchema: string }>>`
          SELECT
            table_name as "tableName",
            table_type as "tableType",
            table_schema as "tableSchema"
          FROM information_schema.tables
          WHERE table_schema IN ('public', 'binary')
            AND table_type = 'BASE TABLE'
          ORDER BY table_schema, table_name
        `;

        return {
          success: true,
          tables: tables.map(t => t.tableName),
          count: tables.length,
        };
      } catch (error) {
        console.error('[DB-META] 테이블 목록 조회 오류:', error);
        return {
          success: false,
          error: `테이블 목록 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
          tables: [],
          count: 0,
        };
      }
    }),

  /**
   * 테이블의 Primary Key 조회
   */
  getPrimaryKeys: publicProcedure
    .input(z.object({
      tableName: z.string(),
    }))
    .query(async ({ input }) => {
      const { tableName } = input;

      try {
        const keys = await db.$queryRaw<Array<{ field: string }>>`
          SELECT
            ku.column_name as field
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage ku
            ON tc.constraint_name = ku.constraint_name
            AND tc.table_schema = ku.table_schema
          WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_schema = 'public'
            AND tc.table_name = ${tableName}
          ORDER BY ku.ordinal_position
        `;

        return {
          success: true,
          primaryKeys: keys.map(k => k.field),
        };
      } catch (error) {
        console.error('[DB-META] PK 조회 오류:', error);
        return {
          success: false,
          error: `PK 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
          primaryKeys: [],
        };
      }
    }),

  /**
   * 테이블의 인덱스 정보 조회
   */
  getTableIndexes: publicProcedure
    .input(z.object({
      tableName: z.string(),
    }))
    .query(async ({ input }) => {
      const { tableName } = input;

      try {
        const indexes = await db.$queryRaw<Array<{
          indexName: string;
          columnName: string;
          isUnique: boolean;
          ordinalPosition: number;
        }>>`
          SELECT
            i.relname as "indexName",
            a.attname as "columnName",
            ix.indisunique as "isUnique",
            a.attnum as "ordinalPosition"
          FROM pg_class t
          JOIN pg_index ix ON t.oid = ix.indrelid
          JOIN pg_class i ON i.oid = ix.indexrelid
          JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
          WHERE t.relkind = 'r'
            AND t.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
            AND t.relname = ${tableName}
          ORDER BY i.relname, a.attnum
        `;

        // 인덱스별로 그룹화
        const indexMap = new Map<string, {
          name: string;
          columns: string[];
          isUnique: boolean;
        }>();

        for (const idx of indexes) {
          if (!indexMap.has(idx.indexName)) {
            indexMap.set(idx.indexName, {
              name: idx.indexName,
              columns: [],
              isUnique: idx.isUnique,
            });
          }
          indexMap.get(idx.indexName)!.columns.push(idx.columnName);
        }

        return {
          success: true,
          indexes: Array.from(indexMap.values()),
        };
      } catch (error) {
        console.error('[DB-META] 인덱스 조회 오류:', error);
        return {
          success: false,
          error: `인덱스 조회 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
          indexes: [],
        };
      }
    }),
});

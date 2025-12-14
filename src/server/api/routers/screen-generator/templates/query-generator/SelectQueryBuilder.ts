/**
 * SELECT 쿼리 빌더
 * @module query-generator/SelectQueryBuilder
 */

import type { SelectQueryConfig, SearchCondition } from './types';

/**
 * SELECT 쿼리 빌더 클래스
 * 테이블명, 컬럼, 검색조건을 기반으로 SELECT 쿼리 생성
 */
export class SelectQueryBuilder {
    /**
     * SELECT 쿼리 생성
     */
    build(config: SelectQueryConfig): string {
        const {
            tableName,
            columns = ['*'],
            searchConditions = [],
            orderBy,
            limit = 500,
        } = config;

        const parts: string[] = [];

        // SELECT 절
        const columnList = columns.length > 0 ? columns.join(', ') : '*';
        parts.push(`SELECT ${columnList}`);

        // FROM 절
        parts.push(`FROM ${tableName}`);

        // WHERE 절
        if (searchConditions.length > 0) {
            const whereConditions = this.buildWhereConditions(searchConditions);
            if (whereConditions) {
                parts.push(`WHERE ${whereConditions}`);
            }
        }

        // ORDER BY 절
        if (orderBy) {
            parts.push(`ORDER BY ${orderBy}`);
        }

        // LIMIT 절
        if (limit > 0) {
            parts.push(`LIMIT ${limit}`);
        }

        return parts.join('\n') + ';';
    }

    /**
     * WHERE 조건 생성
     */
    private buildWhereConditions(conditions: SearchCondition[]): string {
        const whereParts: string[] = [];

        for (const condition of conditions) {
            const part = this.buildCondition(condition);
            if (part) {
                whereParts.push(part);
            }
        }

        return whereParts.join('\n  AND ');
    }

    /**
     * 개별 조건 생성
     */
    private buildCondition(condition: SearchCondition): string {
        const { field, operator, paramName } = condition;

        switch (operator) {
            case 'eq':
                // 빈 값이면 조건 무시
                return `(:${paramName} IS NULL OR :${paramName} = '' OR ${field} = :${paramName})`;

            case 'like':
                return `(:${paramName} IS NULL OR :${paramName} = '' OR ${field} LIKE CONCAT('%', :${paramName}, '%'))`;

            case 'gt':
                return `(:${paramName} IS NULL OR ${field} > :${paramName})`;

            case 'lt':
                return `(:${paramName} IS NULL OR ${field} < :${paramName})`;

            case 'gte':
                return `(:${paramName} IS NULL OR ${field} >= :${paramName})`;

            case 'lte':
                return `(:${paramName} IS NULL OR ${field} <= :${paramName})`;

            case 'in':
                return `(:${paramName} IS NULL OR ${field} IN (:${paramName}))`;

            case 'between':
                return `(:${paramName}_start IS NULL OR :${paramName}_end IS NULL OR ${field} BETWEEN :${paramName}_start AND :${paramName}_end)`;

            default:
                return `${field} = :${paramName}`;
        }
    }

    /**
     * 간단한 SELECT * 쿼리 생성 (헬퍼 메서드)
     */
    static simple(tableName: string, limit = 500): string {
        const builder = new SelectQueryBuilder();
        return builder.build({ tableName, limit });
    }

    /**
     * 년월 조건이 포함된 쿼리 생성 (헬퍼 메서드)
     */
    static withYearMonth(tableName: string, yyyymmColumn = 'yyyymm', limit = 500): string {
        const builder = new SelectQueryBuilder();
        return builder.build({
            tableName,
            searchConditions: [
                {
                    field: yyyymmColumn,
                    operator: 'eq',
                    paramName: 'yearMonth',
                },
            ],
            limit,
        });
    }
}

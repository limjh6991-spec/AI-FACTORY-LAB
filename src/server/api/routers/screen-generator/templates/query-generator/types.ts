/**
 * 쿼리 생성기 타입 정의
 * @module query-generator/types
 */

/**
 * 검색 조건 타입
 */
export interface SearchCondition {
    field: string;
    operator: 'eq' | 'like' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'between';
    paramName: string;
    defaultValue?: string;
}

/**
 * SELECT 쿼리 빌더 설정
 */
export interface SelectQueryConfig {
    tableName: string;
    columns?: string[];
    searchConditions?: SearchCondition[];
    orderBy?: string;
    limit?: number;
}

/**
 * INSERT 쿼리 빌더 설정
 */
export interface InsertQueryConfig {
    tableName: string;
    columns: string[];
}

/**
 * UPDATE 쿼리 빌더 설정
 */
export interface UpdateQueryConfig {
    tableName: string;
    columns: string[];
    primaryKey: string;
}

/**
 * DELETE 쿼리 빌더 설정
 */
export interface DeleteQueryConfig {
    tableName: string;
    primaryKey: string;
}

/**
 * 쿼리 생성 결과
 */
export interface QueryGenerationResult {
    selectQuery: string;
    insertQuery?: string;
    updateQuery?: string;
    deleteQuery?: string;
}

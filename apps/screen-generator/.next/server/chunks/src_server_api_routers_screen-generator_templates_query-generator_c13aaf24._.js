module.exports = [
"[project]/src/server/api/routers/screen-generator/templates/query-generator/SelectQueryBuilder.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SELECT 쿼리 빌더
 * @module query-generator/SelectQueryBuilder
 */ __turbopack_context__.s([
    "SelectQueryBuilder",
    ()=>SelectQueryBuilder
]);
class SelectQueryBuilder {
    /**
     * SELECT 쿼리 생성
     */ build(config) {
        const { tableName, columns = [
            '*'
        ], searchConditions = [], orderBy, limit = 500 } = config;
        const parts = [];
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
     */ buildWhereConditions(conditions) {
        const whereParts = [];
        for (const condition of conditions){
            const part = this.buildCondition(condition);
            if (part) {
                whereParts.push(part);
            }
        }
        return whereParts.join('\n  AND ');
    }
    /**
     * 개별 조건 생성
     */ buildCondition(condition) {
        const { field, operator, paramName } = condition;
        switch(operator){
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
     */ static simple(tableName, limit = 500) {
        const builder = new SelectQueryBuilder();
        return builder.build({
            tableName,
            limit
        });
    }
    /**
     * 년월 조건이 포함된 쿼리 생성 (헬퍼 메서드)
     */ static withYearMonth(tableName, yyyymmColumn = 'yyyymm', limit = 500) {
        const builder = new SelectQueryBuilder();
        return builder.build({
            tableName,
            searchConditions: [
                {
                    field: yyyymmColumn,
                    operator: 'eq',
                    paramName: 'yearMonth'
                }
            ],
            limit
        });
    }
}
}),
"[project]/src/server/api/routers/screen-generator/templates/query-generator/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 쿼리 생성기 모듈
 * @module query-generator
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$query$2d$generator$2f$SelectQueryBuilder$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/query-generator/SelectQueryBuilder.ts [app-route] (ecmascript)");
;
}),
"[project]/src/server/api/routers/screen-generator/templates/query-generator/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectQueryBuilder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$query$2d$generator$2f$SelectQueryBuilder$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryBuilder"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$query$2d$generator$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/query-generator/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$screen$2d$generator$2f$templates$2f$query$2d$generator$2f$SelectQueryBuilder$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/screen-generator/templates/query-generator/SelectQueryBuilder.ts [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=src_server_api_routers_screen-generator_templates_query-generator_c13aaf24._.js.map
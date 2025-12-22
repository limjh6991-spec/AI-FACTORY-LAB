/**
 * 회사별 UI 라벨 서비스
 * bi_common_code 테이블에서 code_type='LABEL'인 데이터를 조회
 */

import { PrismaClient } from "@prisma/client";

// 라벨 카테고리 상수
export const LABEL_CATEGORIES = {
    CUSTOMER: "CUSTOMER",
    DEPT: "DEPT",
    ACCOUNT: "ACCOUNT",
    PRODUCT: "PRODUCT",
    MATERIAL: "MATERIAL",
    EQUIPMENT: "EQUIPMENT",
    MODEL: "MODEL",
    USER: "USER",
    SITE: "SITE",
    SCENARIO: "SCENARIO",
    COST_CENTER: "COST_CENTER",
    EXPENSE: "EXPENSE",
} as const;

export type LabelCategory = keyof typeof LABEL_CATEGORIES;

// 기본 라벨 (BINARY 기준)
export const DEFAULT_LABELS: Record<LabelCategory, string> = {
    CUSTOMER: "거래처",
    DEPT: "부서",
    ACCOUNT: "계정",
    PRODUCT: "제품",
    MATERIAL: "부품",
    EQUIPMENT: "설비",
    MODEL: "모델",
    USER: "사용자",
    SITE: "사업장",
    SCENARIO: "시나리오",
    COST_CENTER: "코스트센터",
    EXPENSE: "비용구분",
};

export type CompanyLabels = Record<LabelCategory, string>;

/**
 * 회사별 UI 라벨 조회
 * @param db Prisma 클라이언트
 * @param companyCode 회사 코드 (BINARY, DOU, DOU_MES)
 * @returns 카테고리별 라벨 맵
 */
export async function getCompanyLabels(
    db: PrismaClient,
    companyCode: string = "BINARY"
): Promise<CompanyLabels> {
    try {
        const results = await db.$queryRaw<
            Array<{ category: string; ui_label: string }>
        >`
      SELECT category, ui_label 
      FROM "binary".bi_common_code 
      WHERE code_type = 'LABEL' 
        AND company_code = ${companyCode}
        AND use_yn = 'Y'
        AND ui_label IS NOT NULL
    `;

        // 기본 라벨과 병합 (DB에 없는 경우 기본값 사용)
        const labels = { ...DEFAULT_LABELS };

        for (const row of results) {
            const category = row.category as LabelCategory;
            if (category in labels) {
                labels[category] = row.ui_label;
            }
        }

        return labels;
    } catch (error) {
        console.error("Failed to fetch company labels:", error);
        return DEFAULT_LABELS;
    }
}

/**
 * 특정 카테고리의 라벨 조회
 */
export async function getCategoryLabel(
    db: PrismaClient,
    category: LabelCategory,
    companyCode: string = "BINARY"
): Promise<string> {
    try {
        const result = await db.$queryRaw<Array<{ ui_label: string }>>`
      SELECT ui_label 
      FROM "binary".bi_common_code 
      WHERE code_type = 'LABEL' 
        AND category = ${category}
        AND company_code = ${companyCode}
        AND use_yn = 'Y'
      LIMIT 1
    `;

        return result[0]?.ui_label ?? DEFAULT_LABELS[category];
    } catch (error) {
        return DEFAULT_LABELS[category];
    }
}

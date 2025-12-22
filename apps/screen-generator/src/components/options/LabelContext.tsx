/**
 * 회사별 라벨 Context
 * 옵션 컴포넌트에서 회사별 라벨을 사용할 수 있도록 Context 제공
 */

"use client";

import React, { createContext, useContext, type ReactNode } from "react";
import { api } from "~/trpc/react";

// 라벨 타입 정의
export interface Labels {
    CUSTOMER: string;
    DEPT: string;
    ACCOUNT: string;
    PRODUCT: string;
    MATERIAL: string;
    EQUIPMENT: string;
    MODEL: string;
    USER: string;
    SITE: string;
    SCENARIO: string;
    COST_CENTER: string;
    EXPENSE: string;
}

// 기본 라벨 (BINARY 기준)
const DEFAULT_LABELS: Labels = {
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

interface LabelContextType {
    labels: Labels;
    companyCode: string;
    isLoading: boolean;
}

const LabelContext = createContext<LabelContextType>({
    labels: DEFAULT_LABELS,
    companyCode: "BINARY",
    isLoading: false,
});

interface LabelProviderProps {
    children: ReactNode;
    companyCode?: string;
}

/**
 * 라벨 Provider
 * 앱 최상위에서 제공하거나, 특정 화면에서 회사 코드 지정 가능
 */
export function LabelProvider({
    children,
    companyCode = "BINARY"
}: LabelProviderProps) {
    const { data, isLoading } = api.options.getLabels.useQuery(
        { companyCode },
        {
            staleTime: 1000 * 60 * 60, // 1시간 캐시 (라벨은 자주 안 바뀜)
            refetchOnWindowFocus: false,
        }
    );

    const labels = data ? (data as unknown as Labels) : DEFAULT_LABELS;

    return (
        <LabelContext.Provider value={{ labels, companyCode, isLoading }}>
            {children}
        </LabelContext.Provider>
    );
}

/**
 * 라벨 사용 Hook
 */
export function useLabels() {
    const context = useContext(LabelContext);
    return context;
}

/**
 * 특정 카테고리 라벨 가져오기
 */
export function useLabel(category: keyof Labels): string {
    const { labels } = useLabels();
    return labels[category] ?? DEFAULT_LABELS[category];
}

export { DEFAULT_LABELS };

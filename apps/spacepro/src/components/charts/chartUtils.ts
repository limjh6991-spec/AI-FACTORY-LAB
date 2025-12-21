/**
 * Chart Utility Functions
 * 
 * 차트 공통 유틸리티 (색상 팔레트, 포맷터 등)
 * 
 * @module features/screen-generator/components/charts/chartUtils
 */

// 고급스러운 프리미엄 색상 팔레트 (Sophisticated Dashboard Colors)
export const CHART_COLORS = [
    '#6366f1', // Indigo (메인)
    '#8b5cf6', // Violet
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#84cc16', // Lime
    '#14b8a6', // Teal
    '#a855f7', // Purple
    '#3b82f6', // Blue
];

// 대시보드용 그라데이션 색상 (Premium Gradients)
export const GRADIENT_COLORS = {
    indigo: { start: '#6366f1', end: '#a5b4fc' },
    violet: { start: '#8b5cf6', end: '#c4b5fd' },
    cyan: { start: '#06b6d4', end: '#67e8f9' },
    emerald: { start: '#10b981', end: '#6ee7b7' },
    amber: { start: '#f59e0b', end: '#fcd34d' },
};

/**
 * 숫자 포맷터 (천 단위 콤마)
 */
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('ko-KR').format(value);
};

/**
 * 퍼센트 포맷터
 */
export const formatPercent = (value: number, decimals = 1): string => {
    return `${value.toFixed(decimals)}%`;
};

/**
 * 금액 포맷터 (억/만 단위)
 */
export const formatCurrency = (value: number): string => {
    if (value >= 100000000) {
        return `₩${(value / 100000000).toFixed(1)}억`;
    }
    if (value >= 10000) {
        return `₩${(value / 10000).toFixed(0)}만`;
    }
    return `₩${formatNumber(value)}`;
};

/**
 * 커스텀 툴팁 스타일
 */
export const tooltipStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    padding: '8px 12px',
    fontSize: '12px',
};

/**
 * 공통 차트 옵션
 */
export const defaultChartOptions = {
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    animationDuration: 300,
};

/**
 * 차트 데이터 타입
 */
export interface ChartDataPoint {
    [key: string]: string | number;
}

/**
 * 공통 차트 Props
 */
export interface BaseChartProps {
    data: ChartDataPoint[];
    xField: string;
    yField: string | string[];
    height?: number;
    showLegend?: boolean;
    showTooltip?: boolean;
    showGridLines?: boolean;
    colors?: string[];
}

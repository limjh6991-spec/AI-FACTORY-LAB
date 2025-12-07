/**
 * AG Grid 커스텀 스타일 정의
 */

/**
 * AG Grid 스타일 코드 (JSX global style)
 * - 메뉴 hover 색상과 일치하는 헤더 (#dbeafe)
 * - 그룹 헤더 그라데이션 적용
 */
export const AG_GRID_STYLES = `
{/* AG Grid 커스텀 스타일 */}
<style jsx global>{\`
  .ag-theme-alpine {
    --ag-header-background-color: #dbeafe;
    --ag-header-foreground-color: #1e3a5f;
    --ag-row-hover-color: #eff6ff;
    --ag-selected-row-background-color: #dbeafe;
    --ag-border-color: #e5e7eb;
    --ag-font-family: inherit;
    --ag-font-size: 14px;
  }
  .ag-theme-alpine .ag-header-group-cell {
    background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
    font-weight: 600;
    color: #1e40af;
  }
  .ag-theme-alpine .ag-header-cell {
    background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
    color: #1e3a5f;
    font-weight: 500;
  }
  .ag-theme-alpine .ag-header-cell-text {
    font-size: 14px;
  }
  .ag-theme-alpine .ag-cell {
    font-size: 14px;
  }
  .ag-row-total {
    background-color: #f8fafc !important;
    font-weight: 600;
    border-top: 2px solid #93c5fd;
    border-bottom: 2px solid #93c5fd;
  }
\`}</style>
`;

/**
 * 순수 CSS 형태의 AG Grid 스타일
 * HTML 템플릿에서 사용
 */
export const AG_GRID_CSS = `
.ag-theme-alpine {
  --ag-header-background-color: #dbeafe;
  --ag-header-foreground-color: #1e3a5f;
  --ag-row-hover-color: #eff6ff;
  --ag-selected-row-background-color: #dbeafe;
  --ag-border-color: #e5e7eb;
  --ag-font-size: 14px;
}
.ag-theme-alpine .ag-header-group-cell {
  background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
  font-weight: 600;
  color: #1e40af;
}
.ag-theme-alpine .ag-header-cell {
  background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
  color: #1e3a5f;
  font-weight: 500;
}
.ag-theme-alpine .ag-header-cell-text {
  font-size: 14px;
}
.ag-theme-alpine .ag-cell {
  font-size: 14px;
}
.ag-row-total {
  background-color: #f8fafc !important;
  font-weight: 600;
  border-top: 2px solid #93c5fd;
  border-bottom: 2px solid #93c5fd;
}
`;

/**
 * IBM Carbon Design System 색상 가이드
 */
export const CARBON_COLORS = {
  // 배경색
  background: '#ffffff',
  layer01: '#f4f4f4',
  layer02: '#e0e0e0',
  
  // 테두리
  border: '#e0e0e0',
  borderAccent: '#8d8d8d',
  
  // 텍스트
  textPrimary: '#161616',
  textSecondary: '#525252',
  textPlaceholder: '#a8a8a8',
  
  // 인터랙티브
  interactive: '#0f62fe',
  interactiveHover: '#0043ce',
  
  // 상태
  danger: '#da1e28',
  success: '#24a148',
  warning: '#f1c21b',
};

/**
 * 컴포넌트 사이즈 가이드
 */
export const COMPONENT_SIZES = {
  buttonHeightMedium: 40,
  buttonHeightSmall: 32,
  inputHeight: 40,
  tableHeaderHeight: 40,
  tableRowHeight: 40,
  borderRadius: 0, // Carbon은 sharp corner 사용
  paddingDefault: 16,
  paddingSmall: 12,
  gapDefault: 8,
  gapSection: 24,
};

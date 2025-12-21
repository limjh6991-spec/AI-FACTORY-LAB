/**
 * 블록 기반 화면 생성기 - 타입 정의
 *
 * 4단계 아키텍처(Layered Architecture)를 위한 블록 조립 방식 스키마
 * - 화면을 재사용 가능한 블록 단위로 구성
 * - 각 블록은 독립적인 Props와 동작을 가짐
 * - 런타임 검증을 위한 Zod 스키마 제공
 *
 * @module features/screen-generator/types/block-schema
 */

import { z } from "zod";

// ============================================================
// Block Type Enum
// ============================================================

/**
 * 블록 타입 정의
 * 화면을 구성하는 기본 빌딩 블록들
 */
export enum BlockType {
  /** 페이지 헤더 (제목, 설명, 브레드크럼) */
  PAGE_HEADER = 'PAGE_HEADER',

  /** 검색 폼 (조회 조건) */
  SEARCH_FORM = 'SEARCH_FORM',

  /** 데이터 그리드 (AG Grid) */
  DATA_GRID = 'DATA_GRID',

  /** KPI 위젯 (통계 카드) */
  KPI_WIDGET = 'KPI_WIDGET',

  /** 차트 위젯 (Line, Bar, Pie 등) */
  CHART_WIDGET = 'CHART_WIDGET',

  /** 툴바 (버튼 그룹) */
  TOOLBAR = 'TOOLBAR',

  /** 탭 컨테이너 (여러 탭으로 구성된 화면) */
  TAB_CONTAINER = 'TAB_CONTAINER',

  /** 커스텀 블록 (사용자 정의) */
  CUSTOM = 'CUSTOM',
}

// ============================================================
// Layout 타입
// ============================================================

/**
 * 레이아웃 타입
 * 블록들을 배치하는 방식
 */
export enum LayoutType {
  /** 단일 컬럼 레이아웃 (세로 스택) */
  SINGLE_COLUMN = 'SINGLE_COLUMN',

  /** 2컬럼 레이아웃 (좌우 분할) */
  TWO_COLUMNS = 'TWO_COLUMNS',

  /** 그리드 레이아웃 (자동 배치) */
  GRID = 'GRID',

  /** 대시보드 레이아웃 (자유 배치) */
  DASHBOARD = 'DASHBOARD',
}

/**
 * 레이아웃 설정
 */
export interface LayoutConfig {
  /** 레이아웃 타입 */
  type: LayoutType;

  /** 간격 (px) */
  gap?: number;

  /** 패딩 (px) */
  padding?: number;

  /** 그리드 컬럼 수 (GRID 타입인 경우) */
  columns?: number;

  /** 컬럼 비율 (TWO_COLUMNS 타입인 경우, 예: [2, 1]) */
  columnRatio?: [number, number];
}

// ============================================================
// Block Base
// ============================================================

/**
 * 블록 기본 인터페이스
 * 모든 블록이 공통으로 가지는 속성
 */
export interface BlockBase {
  /** 블록 고유 ID */
  id: string;

  /** 블록 타입 */
  type: BlockType;

  /** 블록 제목 (선택사항) */
  title?: string;

  /** 블록 순서 */
  order: number;

  /** 조건부 렌더링 (표현식 또는 boolean) */
  visible?: boolean | string;

  /** 커스텀 CSS 클래스 */
  className?: string;

  /** 커스텀 스타일 */
  style?: Record<string, string | number>;
}

// ============================================================
// Block Props - PAGE_HEADER
// ============================================================

/**
 * 페이지 헤더 블록 Props
 */
export interface PageHeaderBlockProps extends BlockBase {
  type: BlockType.PAGE_HEADER;

  /** 페이지 제목 */
  title: string;

  /** 페이지 설명 */
  description?: string;

  /** 브레드크럼 경로 */
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;

  /** 헤더 우측 액션 버튼 */
  actions?: Array<{
    label: string;
    icon?: string;
    onClick?: string; // 이벤트 핸들러 이름
    variant?: 'primary' | 'secondary' | 'ghost';
  }>;
}

// ============================================================
// Block Props - SEARCH_FORM
// ============================================================

/**
 * 검색 폼 필드 타입
 */
export type SearchFieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'dateRange'
  | 'select'
  | 'multiSelect'
  | 'siteSelect'      // 사업장 선택
  | 'scenarioSelect'  // 시나리오 선택
  | 'yearMonthPicker' // 년월 선택
  | 'checkbox';

/**
 * 검색 폼 필드 정의
 */
export interface SearchField {
  /** 필드명 (ID) */
  name: string;

  /** 필드 레이블 */
  label: string;

  /** 필드 타입 */
  type: SearchFieldType;

  /** 필수 여부 */
  required?: boolean;

  /** 기본값 */
  defaultValue?: string | number | boolean | [string, string];

  /** 선택 옵션 (select, multiSelect 타입) */
  options?: Array<{ value: string; label: string }>;

  /** 옵션 API 엔드포인트 (동적 옵션) */
  optionsApi?: string;

  /** placeholder */
  placeholder?: string;

  /** 너비 (1-12, grid 컬럼 수) */
  width?: number;
}

/**
 * 검색 폼 블록 Props
 */
export interface SearchFormBlockProps extends BlockBase {
  type: BlockType.SEARCH_FORM;

  /** 검색 필드 목록 */
  fields: SearchField[];

  /** 검색 버튼 레이블 */
  searchButtonLabel?: string;

  /** 초기화 버튼 표시 여부 */
  showResetButton?: boolean;

  /** 초기화 버튼 레이블 */
  resetButtonLabel?: string;

  /** 검색 실행 이벤트 핸들러 */
  onSearch?: string;

  /** 초기화 이벤트 핸들러 */
  onReset?: string;

  /** 접기/펼치기 기능 */
  collapsible?: boolean;

  /** 기본 접힘 상태 */
  defaultCollapsed?: boolean;
}

// ============================================================
// Block Props - DATA_GRID
// ============================================================

/**
 * 그리드 컬럼 타입
 */
export type GridColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'custom';

/**
 * 그리드 컬럼 정의
 */
export interface GridColumn {
  /** 컬럼 ID (필드명) */
  field: string;

  /** 헤더 텍스트 */
  headerName: string;

  /** 컬럼 너비 (px) */
  width?: number;

  /** 컬럼 타입 */
  type?: GridColumnType;

  /** 편집 가능 여부 */
  editable?: boolean;

  /** 정렬 가능 여부 */
  sortable?: boolean;

  /** 필터 가능 여부 */
  filterable?: boolean;

  /** 정렬 (left, center, right) */
  align?: 'left' | 'center' | 'right';

  /** 숨김 여부 */
  hidden?: boolean;

  /** 고정 (left, right) */
  pinned?: 'left' | 'right';

  /** 셀 렌더러 컴포넌트 이름 */
  cellRenderer?: string;

  /** 값 포맷터 함수 이름 */
  valueFormatter?: string;

  /** 셀 스타일 */
  cellStyle?: Record<string, string | number>;

  /** 그룹 헤더 (복잡한 그리드) */
  children?: GridColumn[];
}

/**
 * 데이터 그리드 블록 Props
 */
export interface DataGridBlockProps extends BlockBase {
  type: BlockType.DATA_GRID;

  /** 컬럼 정의 */
  columns: GridColumn[];

  /** API 엔드포인트 (데이터 조회) */
  apiEndpoint: string;

  /** 테이블 이름 (쿼리 생성용) */
  tableName: string;

  /** 기본키 컬럼명 (쿼리 생성용) */
  primaryKey: string;

  /** 조회할 컬럼 리스트 (쿼리 생성용, 선택사항) */
  selectColumns?: string[];

  /** 행 선택 모드 */
  rowSelection?: 'single' | 'multiple' | 'none';

  /** 체크박스 선택 활성화 (enableSelection과 동일) */
  showCheckboxSelection?: boolean;

  /** 행 선택 활성화 (체크박스 표시) */
  enableSelection?: boolean;

  /** 페이지네이션 사용 */
  pagination?: boolean;

  /** 페이지 크기 */
  pageSize?: number;

  /** 높이 (px or 'auto') */
  height?: number | 'auto';

  /** 편집 모드 (인라인 편집) */
  editable?: boolean;

  /** 편집 이벤트 핸들러 */
  onCellValueChanged?: string;

  /** 행 선택 이벤트 핸들러 */
  onRowSelected?: string;

  /** 행 더블클릭 이벤트 핸들러 */
  onRowDoubleClicked?: string;

  /** 삭제 이벤트 핸들러 (API 경로 또는 함수명) */
  onDelete?: string;

  /** 저장 이벤트 핸들러 (API 경로 또는 함수명) */
  onSave?: string;

  /** 추가 이벤트 핸들러 (API 경로 또는 함수명) */
  onCreate?: string;

  /** 정렬 설정 */
  sortModel?: Array<{
    field: string;
    order: 'asc' | 'desc';
  }>;

  /** 그룹핑 설정 */
  rowGrouping?: {
    enabled: boolean;
    groupBy: string[];
  };

  /** 요약 행 표시 */
  showSummaryRow?: boolean;

  /** 요약 행 계산 함수 이름 */
  summaryRowCalculator?: string;

  /** 로딩 텍스트 */
  loadingText?: string;

  /** 빈 데이터 텍스트 */
  noRowsText?: string;
}

// ============================================================
// Block Props - KPI_WIDGET
// ============================================================

/**
 * KPI 위젯 블록 Props
 */
export interface KpiWidgetBlockProps extends BlockBase {
  type: BlockType.KPI_WIDGET;

  /** KPI 제목 */
  title: string;

  /** KPI 값 (또는 값을 가져올 API) */
  value: string | number;

  /** 값 API 엔드포인트 */
  valueApi?: string;

  /** 단위 */
  unit?: string;

  /** 전년 대비 증감률 (%) */
  changeRate?: number;

  /** 증감률 표시 여부 */
  showChangeRate?: boolean;

  /** 아이콘 */
  icon?: string;

  /** 색상 테마 */
  theme?: 'primary' | 'success' | 'warning' | 'danger' | 'info';

  /** 클릭 이벤트 핸들러 */
  onClick?: string;

  /** 설명 텍스트 */
  description?: string;

  /** 추세 차트 표시 여부 */
  showTrendChart?: boolean;

  /** 추세 차트 데이터 API */
  trendChartApi?: string;
}

// ============================================================
// Block Props - CHART_WIDGET
// ============================================================

/**
 * 차트 타입
 */
export enum ChartType {
  LINE = 'LINE',
  BAR = 'BAR',
  PIE = 'PIE',
  DONUT = 'DONUT',
  AREA = 'AREA',
  SCATTER = 'SCATTER',
  HEATMAP = 'HEATMAP',
}

/**
 * 차트 위젯 블록 Props
 */
export interface ChartWidgetBlockProps extends BlockBase {
  type: BlockType.CHART_WIDGET;

  /** 차트 제목 */
  title: string;

  /** 차트 타입 */
  chartType: ChartType;

  /** 데이터 API 엔드포인트 */
  dataApi: string;

  /** 높이 (px) */
  height?: number;

  /** X축 필드명 */
  xField?: string;

  /** Y축 필드명 */
  yField?: string | string[];

  /** 시리즈 필드명 (그룹핑) */
  seriesField?: string;

  /** 차트 옵션 (Recharts 옵션) */
  chartOptions?: Record<string, any>;

  /** 범례 표시 여부 */
  showLegend?: boolean;

  /** 툴팁 표시 여부 */
  showTooltip?: boolean;

  /** 그리드 라인 표시 여부 */
  showGridLines?: boolean;
}

// ============================================================
// Block Props - TOOLBAR
// ============================================================

/**
 * 툴바 버튼 정의
 */
export interface ToolbarButton {
  /** 버튼 ID */
  id: string;

  /** 버튼 레이블 */
  label: string;

  /** 아이콘 */
  icon?: string;

  /** 버튼 색상 테마 */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';

  /** 클릭 이벤트 핸들러 */
  onClick?: string;

  /** 비활성화 조건 (표현식 또는 boolean) */
  disabled?: boolean | string;

  /** 표시 조건 (표현식 또는 boolean) */
  visible?: boolean | string;

  /** 툴팁 */
  tooltip?: string;
}

/**
 * 툴바 블록 Props
 */
export interface ToolbarBlockProps extends BlockBase {
  type: BlockType.TOOLBAR;

  /** 버튼 목록 */
  buttons: ToolbarButton[];

  /** 정렬 방향 */
  alignment?: 'left' | 'center' | 'right' | 'space-between';

  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large';

  /** 버튼 간격 (px) */
  gap?: number;
}

// ============================================================
// Block Props - TAB_CONTAINER
// ============================================================

/**
 * 탭 정의
 */
export interface TabItem {
  /** 탭 ID */
  id: string;

  /** 탭 레이블 */
  label: string;

  /** 탭 아이콘 */
  icon?: string;

  /** 탭 내부 블록들 */
  blocks: Block[];

  /** 비활성화 여부 */
  disabled?: boolean;
}

/**
 * 탭 컨테이너 블록 Props
 */
export interface TabContainerBlockProps extends BlockBase {
  type: BlockType.TAB_CONTAINER;

  /** 탭 목록 */
  tabs: TabItem[];

  /** 기본 활성 탭 ID */
  defaultActiveTab?: string;

  /** 탭 변경 이벤트 핸들러 */
  onTabChange?: string;
}

// ============================================================
// Block Props - CUSTOM
// ============================================================

/**
 * 커스텀 블록 Props
 */
export interface CustomBlockProps extends BlockBase {
  type: BlockType.CUSTOM;

  /** 커스텀 컴포넌트 이름 */
  componentName: string;

  /** 컴포넌트 props */
  componentProps?: Record<string, any>;
}

// ============================================================
// Block Union Type
// ============================================================

/**
 * 모든 블록 타입의 유니온
 */
export type Block =
  | PageHeaderBlockProps
  | SearchFormBlockProps
  | DataGridBlockProps
  | KpiWidgetBlockProps
  | ChartWidgetBlockProps
  | ToolbarBlockProps
  | TabContainerBlockProps
  | CustomBlockProps;

// ============================================================
// Screen Schema
// ============================================================

/**
 * 화면 스키마
 * 전체 화면을 구성하는 최상위 인터페이스
 */
export interface ScreenSchema {
  /** 화면 ID */
  screenId: string;

  /** 화면 이름 */
  screenName: string;

  /** 화면 영문명 */
  screenNameEn: string;

  /** 화면 설명 */
  description?: string;

  /** 화면 경로 */
  path?: string;

  /** 레이아웃 설정 */
  layout: LayoutConfig;

  /** 블록 목록 */
  blocks: Block[];

  /** 화면 메타데이터 */
  metadata?: {
    /** 생성일시 */
    createdAt?: string;

    /** 수정일시 */
    updatedAt?: string;

    /** 작성자 */
    author?: string;

    /** 버전 */
    version?: string;

    /** 태그 */
    tags?: string[];
  };
}

// ============================================================
// Zod Schemas for Runtime Validation
// ============================================================

/**
 * BlockType Zod Schema
 */
export const BlockTypeSchema = z.nativeEnum(BlockType);

/**
 * LayoutType Zod Schema
 */
export const LayoutTypeSchema = z.nativeEnum(LayoutType);

/**
 * LayoutConfig Zod Schema
 */
export const LayoutConfigSchema = z.object({
  type: LayoutTypeSchema,
  gap: z.number().optional(),
  padding: z.number().optional(),
  columns: z.number().min(1).max(12).optional(),
  columnRatio: z.tuple([z.number(), z.number()]).optional(),
});

/**
 * BlockBase Zod Schema
 */
export const BlockBaseSchema = z.object({
  id: z.string(),
  type: BlockTypeSchema,
  title: z.string().optional(),
  order: z.number(),
  visible: z.union([z.boolean(), z.string()]).optional(),
  className: z.string().optional(),
  style: z.record(z.union([z.string(), z.number()])).optional(),
});

/**
 * SearchField Zod Schema
 */
export const SearchFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(['text', 'number', 'date', 'dateRange', 'select', 'multiSelect', 'siteSelect', 'scenarioSelect', 'yearMonthPicker', 'checkbox']),
  required: z.boolean().optional(),
  defaultValue: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.tuple([z.string(), z.string()])
  ]).optional(),
  options: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  optionsApi: z.string().optional(),
  placeholder: z.string().optional(),
  width: z.number().min(1).max(12).optional(),
});

/**
 * GridColumn Zod Schema
 */
export const GridColumnSchema: z.ZodType<GridColumn> = z.object({
  field: z.string(),
  headerName: z.string(),
  width: z.number().optional(),
  type: z.enum(['text', 'number', 'date', 'datetime', 'boolean', 'select', 'custom']).optional(),
  editable: z.boolean().optional(),
  sortable: z.boolean().optional(),
  filterable: z.boolean().optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
  hidden: z.boolean().optional(),
  pinned: z.enum(['left', 'right']).optional(),
  cellRenderer: z.string().optional(),
  valueFormatter: z.string().optional(),
  cellStyle: z.record(z.union([z.string(), z.number()])).optional(),
  children: z.lazy(() => GridColumnSchema.array()).optional(),
});

/**
 * ToolbarButton Zod Schema
 */
export const ToolbarButtonSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  variant: z.enum(['primary', 'secondary', 'success', 'danger', 'ghost']).optional(),
  onClick: z.string().optional(),
  disabled: z.union([z.boolean(), z.string()]).optional(),
  visible: z.union([z.boolean(), z.string()]).optional(),
  tooltip: z.string().optional(),
});

/**
 * PageHeaderBlock Zod Schema
 */
export const PageHeaderBlockSchema = BlockBaseSchema.extend({
  type: z.literal(BlockType.PAGE_HEADER),
  title: z.string(),
  description: z.string().optional(),
  breadcrumbs: z.array(z.object({
    label: z.string(),
    href: z.string().optional(),
  })).optional(),
  actions: z.array(z.object({
    label: z.string(),
    icon: z.string().optional(),
    onClick: z.string().optional(),
    variant: z.enum(['primary', 'secondary', 'ghost']).optional(),
  })).optional(),
});

/**
 * SearchFormBlock Zod Schema
 */
export const SearchFormBlockSchema = BlockBaseSchema.extend({
  type: z.literal(BlockType.SEARCH_FORM),
  fields: z.array(SearchFieldSchema),
  searchButtonLabel: z.string().optional(),
  showResetButton: z.boolean().optional(),
  resetButtonLabel: z.string().optional(),
  onSearch: z.string().optional(),
  onReset: z.string().optional(),
  collapsible: z.boolean().optional(),
  defaultCollapsed: z.boolean().optional(),
});

/**
 * DataGridBlock Zod Schema
 */
export const DataGridBlockSchema = BlockBaseSchema.extend({
  type: z.literal(BlockType.DATA_GRID),
  columns: z.array(GridColumnSchema),
  apiEndpoint: z.string(),
  tableName: z.string(),
  primaryKey: z.string(),
  selectColumns: z.array(z.string()).optional(),
  rowSelection: z.enum(['single', 'multiple', 'none']).optional(),
  showCheckboxSelection: z.boolean().optional(),
  enableSelection: z.boolean().optional(),
  pagination: z.boolean().optional(),
  pageSize: z.number().optional(),
  height: z.union([z.number(), z.literal('auto')]).optional(),
  editable: z.boolean().optional(),
  onCellValueChanged: z.string().optional(),
  onRowSelected: z.string().optional(),
  onRowDoubleClicked: z.string().optional(),
  onDelete: z.string().optional(),
  onSave: z.string().optional(),
  onCreate: z.string().optional(),
  sortModel: z.array(z.object({
    field: z.string(),
    order: z.enum(['asc', 'desc']),
  })).optional(),
  rowGrouping: z.object({
    enabled: z.boolean(),
    groupBy: z.array(z.string()),
  }).optional(),
  showSummaryRow: z.boolean().optional(),
  summaryRowCalculator: z.string().optional(),
  loadingText: z.string().optional(),
  noRowsText: z.string().optional(),
});

/**
 * KpiWidgetBlock Zod Schema
 */
export const KpiWidgetBlockSchema = BlockBaseSchema.extend({
  type: z.literal(BlockType.KPI_WIDGET),
  title: z.string(),
  value: z.union([z.string(), z.number()]),
  valueApi: z.string().optional(),
  unit: z.string().optional(),
  changeRate: z.number().optional(),
  showChangeRate: z.boolean().optional(),
  icon: z.string().optional(),
  theme: z.enum(['primary', 'success', 'warning', 'danger', 'info']).optional(),
  onClick: z.string().optional(),
  description: z.string().optional(),
  showTrendChart: z.boolean().optional(),
  trendChartApi: z.string().optional(),
});

/**
 * ChartType Zod Schema
 */
export const ChartTypeSchema = z.nativeEnum(ChartType);

/**
 * ChartWidgetBlock Zod Schema
 */
export const ChartWidgetBlockSchema = BlockBaseSchema.extend({
  type: z.literal(BlockType.CHART_WIDGET),
  title: z.string(),
  chartType: ChartTypeSchema,
  dataApi: z.string(),
  height: z.number().optional(),
  xField: z.string().optional(),
  yField: z.union([z.string(), z.array(z.string())]).optional(),
  seriesField: z.string().optional(),
  chartOptions: z.record(z.any()).optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  showGridLines: z.boolean().optional(),
});

/**
 * ToolbarBlock Zod Schema
 */
export const ToolbarBlockSchema = BlockBaseSchema.extend({
  type: z.literal(BlockType.TOOLBAR),
  buttons: z.array(ToolbarButtonSchema),
  alignment: z.enum(['left', 'center', 'right', 'space-between']).optional(),
  size: z.enum(['small', 'medium', 'large']).optional(),
  gap: z.number().optional(),
});

/**
 * TabItem Zod Schema (재귀적 구조)
 */
export const TabItemSchema: z.ZodType<TabItem> = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  blocks: z.lazy(() => BlockSchema.array()),
  disabled: z.boolean().optional(),
});

/**
 * TabContainerBlock Zod Schema
 */
export const TabContainerBlockSchema = BlockBaseSchema.extend({
  type: z.literal(BlockType.TAB_CONTAINER),
  tabs: z.array(TabItemSchema),
  defaultActiveTab: z.string().optional(),
  onTabChange: z.string().optional(),
});

/**
 * CustomBlock Zod Schema
 */
export const CustomBlockSchema = BlockBaseSchema.extend({
  type: z.literal(BlockType.CUSTOM),
  componentName: z.string(),
  componentProps: z.record(z.any()).optional(),
});

/**
 * Block Union Zod Schema
 */
export const BlockSchema: z.ZodType<Block> = z.discriminatedUnion('type', [
  PageHeaderBlockSchema,
  SearchFormBlockSchema,
  DataGridBlockSchema,
  KpiWidgetBlockSchema,
  ChartWidgetBlockSchema,
  ToolbarBlockSchema,
  TabContainerBlockSchema,
  CustomBlockSchema,
]);

/**
 * ScreenSchema Zod Schema
 */
export const ScreenSchemaSchema = z.object({
  screenId: z.string(),
  screenName: z.string(),
  screenNameEn: z.string(),
  description: z.string().optional(),
  path: z.string().optional(),
  layout: LayoutConfigSchema,
  blocks: z.array(BlockSchema),
  metadata: z.object({
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    author: z.string().optional(),
    version: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
});

// ============================================================
// Type Guards
// ============================================================

/**
 * 블록 타입 가드
 */
export function isPageHeaderBlock(block: Block): block is PageHeaderBlockProps {
  return block.type === BlockType.PAGE_HEADER;
}

export function isSearchFormBlock(block: Block): block is SearchFormBlockProps {
  return block.type === BlockType.SEARCH_FORM;
}

export function isDataGridBlock(block: Block): block is DataGridBlockProps {
  return block.type === BlockType.DATA_GRID;
}

export function isKpiWidgetBlock(block: Block): block is KpiWidgetBlockProps {
  return block.type === BlockType.KPI_WIDGET;
}

export function isChartWidgetBlock(block: Block): block is ChartWidgetBlockProps {
  return block.type === BlockType.CHART_WIDGET;
}

export function isToolbarBlock(block: Block): block is ToolbarBlockProps {
  return block.type === BlockType.TOOLBAR;
}

export function isTabContainerBlock(block: Block): block is TabContainerBlockProps {
  return block.type === BlockType.TAB_CONTAINER;
}

export function isCustomBlock(block: Block): block is CustomBlockProps {
  return block.type === BlockType.CUSTOM;
}

// ============================================================
// Helper Types
// ============================================================

/**
 * 블록 타입별 Props 매핑
 */
export type BlockPropsMap = {
  [BlockType.PAGE_HEADER]: PageHeaderBlockProps;
  [BlockType.SEARCH_FORM]: SearchFormBlockProps;
  [BlockType.DATA_GRID]: DataGridBlockProps;
  [BlockType.KPI_WIDGET]: KpiWidgetBlockProps;
  [BlockType.CHART_WIDGET]: ChartWidgetBlockProps;
  [BlockType.TOOLBAR]: ToolbarBlockProps;
  [BlockType.TAB_CONTAINER]: TabContainerBlockProps;
  [BlockType.CUSTOM]: CustomBlockProps;
};

/**
 * 블록 생성 헬퍼 타입
 */
export type CreateBlockInput<T extends BlockType> = Omit<BlockPropsMap[T], 'id' | 'order'> & {
  id?: string;
  order?: number;
};

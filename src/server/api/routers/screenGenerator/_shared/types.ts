/**
 * 화면 생성기 공통 타입 정의
 * @module screenGenerator/_shared/types
 */

import { z } from "zod";

// ============================================================
// 화면 유형 (Screen Type)
// ============================================================

/**
 * 화면 유형 enum
 * - SIMPLE_GRID: 단순 조회 화면
 * - SIMPLE_GRID_CRUD: 단순 CRUD 화면 (기준정보 관리)
 * - COMPLEX_GRID: 복잡 조회 화면 (그룹헤더, 마스터-디테일)
 * - COMPLEX_GRID_CRUD: 복잡 CRUD 화면
 * - GRID_WITH_CHART: CRUD + 차트 화면
 */
export enum ScreenType {
  SIMPLE_GRID = 'simpleGrid',
  SIMPLE_GRID_CRUD = 'simpleGridCrud',
  COMPLEX_GRID = 'complexGrid',
  COMPLEX_GRID_CRUD = 'complexGridCrud',
  GRID_WITH_CHART = 'gridWithChart',
}

/**
 * 화면 유형별 기능 매트릭스
 */
export const SCREEN_TYPE_FEATURES: Record<ScreenType, {
  hasRead: boolean;
  hasCrud: boolean;
  hasGroupHeader: boolean;
  hasMasterDetail: boolean;
  hasTree: boolean;
  hasChart: boolean;
  description: string;
}> = {
  [ScreenType.SIMPLE_GRID]: {
    hasRead: true,
    hasCrud: false,
    hasGroupHeader: false,
    hasMasterDetail: false,
    hasTree: false,
    hasChart: false,
    description: '단순 조회 화면',
  },
  [ScreenType.SIMPLE_GRID_CRUD]: {
    hasRead: true,
    hasCrud: true,
    hasGroupHeader: false,
    hasMasterDetail: false,
    hasTree: false,
    hasChart: false,
    description: '단순 CRUD 화면 (기준정보 관리)',
  },
  [ScreenType.COMPLEX_GRID]: {
    hasRead: true,
    hasCrud: false,
    hasGroupHeader: true,
    hasMasterDetail: true,
    hasTree: true,
    hasChart: false,
    description: '복잡 조회 화면',
  },
  [ScreenType.COMPLEX_GRID_CRUD]: {
    hasRead: true,
    hasCrud: true,
    hasGroupHeader: true,
    hasMasterDetail: true,
    hasTree: true,
    hasChart: false,
    description: '복잡 CRUD 화면',
  },
  [ScreenType.GRID_WITH_CHART]: {
    hasRead: true,
    hasCrud: true,
    hasGroupHeader: true,
    hasMasterDetail: true,
    hasTree: true,
    hasChart: true,
    description: 'CRUD + 차트 화면',
  },
};

// ============================================================
// 화면 상태 (Screen Status)
// ============================================================

export type ScreenStatus = 'temp' | 'published' | 'archived';

// ============================================================
// 검증 결과 스키마
// ============================================================

export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  screenName: z.string().optional(),
  screenNameEn: z.string().optional(),
  tableName: z.string().optional(),
  screenType: z.nativeEnum(ScreenType).optional(),
  columns: z.number().optional(),
  searchConditions: z.number().optional(),
  summaryRows: z.array(z.string()).optional(),
  errors: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
  parsedData: z.any().optional(),
});

export type ValidationResult = z.infer<typeof ValidationResultSchema>;

// ============================================================
// 미리보기 결과 스키마
// ============================================================

export const PreviewResultSchema = z.object({
  success: z.boolean(),
  html: z.string().optional(),
  componentCode: z.string().optional(),
  error: z.string().optional(),
});

export type PreviewResult = z.infer<typeof PreviewResultSchema>;

// ============================================================
// 검색 조건 타입
// ============================================================

export interface SearchCondition {
  label: string;
  type: string;
  field: string;
  required: boolean;
  options?: Array<{ value: string; label: string }>;
}

// ============================================================
// 그리드 컬럼 타입
// ============================================================

export interface GridColumnDef {
  headerName: string;
  field: string;
  width?: number;
  type?: 'numericColumn' | 'dateColumn' | 'textColumn';
  editable?: boolean;
  cellStyle?: Record<string, string>;
  children?: GridColumnDef[]; // 그룹 헤더용
}

// ============================================================
// 파싱된 데이터 타입
// ============================================================

export interface ParsedData {
  screenName: string;
  screenNameEn?: string;
  tableName?: string;
  screenType?: ScreenType;
  searchConditions: SearchCondition[];
  gridColumns: {
    row1?: string[];
    row2: string[];
    row3: string[];
    merges: Array<{
      startCol: number;
      endCol: number;
      startRow: number;
      endRow: number;
    }>;
    summaryRows: string[];
    sampleData?: any[];
  };
}

// ============================================================
// 화면 메타데이터
// ============================================================

export interface ScreenMetadata {
  screenId: string;
  screenName: string;
  screenNameEn: string;
  tableName: string;
  screenType: ScreenType;
  status: ScreenStatus;
  createdAt: string;
  publishedAt?: string;
  hasHtml?: boolean;
  hasReact?: boolean;
  hasSql?: boolean;
}

// ============================================================
// 컬럼 매핑 타입
// ============================================================

export interface ColumnMapping {
  gridHeader: string;
  dbColumn: string | null;
  type: string;
  alias: string;
  isMapped: boolean;
}

// ============================================================
// 쿼리 생성 결과
// ============================================================

export interface QueryGenerationResult {
  success: boolean;
  sql?: string;
  tableMeta?: {
    name: string;
    korean_name: string;
    columnCount: number;
    availableColumns: string[];
  };
  columnMappings?: ColumnMapping[];
  unmatchedHeaders?: string[];
  stats?: {
    totalColumns: number;
    mappedCount: number;
    unmappedCount: number;
  };
  suggestion?: string;
  error?: string;
}

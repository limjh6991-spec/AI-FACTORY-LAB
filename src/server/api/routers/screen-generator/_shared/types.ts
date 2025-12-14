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
 * - SIMPLE_GRID: 단순 조회 화면 (AG Grid)
 * - SIMPLE_GRID_CRUD: 단순 CRUD 화면 (AG Grid)
 * - COMPLEX_GRID: 복잡 조회 화면 (AG Grid)
 * - COMPLEX_GRID_CRUD: 복잡 CRUD 화면 (AG Grid)
 * - GRID_WITH_CHART: CRUD + 차트 화면 (AG Grid)
 * - REALGRID_SIMPLE: 단순 조회 화면 (RealGrid)
 * - REALGRID_CRUD: 단순 CRUD 화면 (RealGrid)
 */
export enum ScreenType {
  SIMPLE_GRID = 'simpleGrid',
  SIMPLE_GRID_CRUD = 'simpleGridCrud',
  COMPLEX_GRID = 'complexGrid',
  COMPLEX_GRID_CRUD = 'complexGridCrud',
  GRID_WITH_CHART = 'gridWithChart',
  // RealGrid 유형
  REALGRID_SIMPLE = 'realgridSimple',
  REALGRID_CRUD = 'realgridCrud',
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
  // RealGrid 유형
  [ScreenType.REALGRID_SIMPLE]: {
    hasRead: true,
    hasCrud: false,
    hasGroupHeader: true,
    hasMasterDetail: false,
    hasTree: false,
    hasChart: false,
    description: '단순 조회 화면 (RealGrid)',
  },
  [ScreenType.REALGRID_CRUD]: {
    hasRead: true,
    hasCrud: true,
    hasGroupHeader: true,
    hasMasterDetail: false,
    hasTree: false,
    hasChart: false,
    description: '단순 CRUD 화면 (RealGrid)',
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
  align?: 'left' | 'center' | 'right';
  children?: GridColumnDef[]; // 그룹 헤더용
}

// ============================================================
// 파싱된 데이터 타입
// ============================================================

export interface ParsedData {
  screenId?: string;
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

// ============================================================
// CRUD 관련 타입 (기준정보 관리용)
// ============================================================

/**
 * CRUD 컬럼 편집 타입
 */
export type CrudEditorType =
  | 'text'       // 일반 텍스트
  | 'number'     // 숫자
  | 'date'       // 날짜
  | 'datetime'   // 날짜+시간
  | 'select'     // 선택 (콤보박스)
  | 'checkbox'   // 체크박스 (Y/N)
  | 'textarea'   // 여러 줄 텍스트
  | 'readonly';  // 읽기 전용

/**
 * CRUD 컬럼 정의
 * Excel 템플릿의 그리드컬럼 시트에서 파싱
 */
export interface CrudColumnDef {
  /** 화면 표시명 (한글) */
  headerName: string;
  /** DB 컬럼명 */
  field: string;
  /** 컬럼 너비 (px) */
  width: number;
  /** 편집기 타입 */
  editorType: CrudEditorType;
  /** 편집 가능 여부 */
  editable: boolean;
  /** 필수 입력 여부 */
  required: boolean;
  /** 기본값 */
  defaultValue?: string | number | boolean;
  /** select 타입인 경우 옵션 목록 또는 옵션 API */
  options?: Array<{ value: string; label: string }> | string;
  /** 정렬 (left, center, right) */
  align?: 'left' | 'center' | 'right';
  /** 최대 길이 (text 타입) */
  maxLength?: number;
  /** 최소값 (number 타입) */
  minValue?: number;
  /** 최대값 (number 타입) */
  maxValue?: number;
  /** 정규식 패턴 (유효성 검사) */
  pattern?: string;
  /** 숨김 여부 */
  hidden?: boolean;
}

/**
 * CRUD 화면 설정
 * Excel 템플릿의 메타정보 시트에서 파싱
 */
export interface CrudConfig {
  /** Primary Key 컬럼명 (복합 키는 쉼표로 구분) */
  primaryKey: string;
  /** PK 자동 생성 여부 */
  autoGeneratePk: boolean;
  /** PK 생성 패턴 (예: 'PREFIX_{YYYYMMDD}_{SEQ:4}') */
  pkPattern?: string;
  /** 정렬 컬럼 */
  sortColumn?: string;
  /** 정렬 방향 */
  sortDirection?: 'asc' | 'desc';
  /** 소프트 삭제 여부 (delete_yn 컬럼 사용) */
  softDelete: boolean;
  /** 감사 컬럼 자동 관리 (created_at, updated_at 등) */
  auditColumns: boolean;
  /** 행 선택 모드 */
  rowSelection: 'single' | 'multiple';
  /** 페이지네이션 사용 여부 */
  pagination: boolean;
  /** 페이지 크기 */
  pageSize?: number;
}

/**
 * CRUD 파싱 데이터 (ParsedData 확장)
 */
export interface CrudParsedData extends ParsedData {
  screenType: ScreenType.SIMPLE_GRID_CRUD | ScreenType.COMPLEX_GRID_CRUD | ScreenType.REALGRID_CRUD;
  /** CRUD 설정 */
  crudConfig: CrudConfig;
  /** CRUD 컬럼 정의 */
  crudColumns: CrudColumnDef[];
}

/**
 * CRUD 작업 타입
 */
export type CrudOperation = 'create' | 'read' | 'update' | 'delete';

/**
 * 행 상태 (변경 추적용)
 */
export type RowStatus = 'unchanged' | 'added' | 'modified' | 'deleted';

/**
 * CRUD 행 데이터 (프론트엔드용)
 */
export interface CrudRowData {
  /** 행 상태 */
  _status: RowStatus;
  /** 원본 데이터 (수정 전) */
  _original?: Record<string, any>;
  /** 실제 데이터 */
  [key: string]: any;
}

/**
 * CRUD API 요청 타입
 */
export interface CrudSaveRequest {
  /** 추가할 행 */
  inserts: Record<string, any>[];
  /** 수정할 행 */
  updates: Record<string, any>[];
  /** 삭제할 PK 목록 */
  deletes: string[];
}

/**
 * CRUD API 응답 타입
 */
export interface CrudSaveResponse {
  success: boolean;
  message?: string;
  insertedCount?: number;
  updatedCount?: number;
  deletedCount?: number;
  errors?: Array<{
    operation: CrudOperation;
    row: Record<string, any>;
    error: string;
  }>;
}

// ============================================================
// CRUD Zod 스키마
// ============================================================

export const CrudColumnDefSchema = z.object({
  headerName: z.string(),
  field: z.string(),
  width: z.number().default(100),
  editorType: z.enum(['text', 'number', 'date', 'datetime', 'select', 'checkbox', 'textarea', 'readonly']).default('text'),
  editable: z.boolean().default(true),
  required: z.boolean().default(false),
  defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
  options: z.union([
    z.array(z.object({ value: z.string(), label: z.string() })),
    z.string()
  ]).optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
  maxLength: z.number().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  pattern: z.string().optional(),
  hidden: z.boolean().optional(),
});

export const CrudConfigSchema = z.object({
  primaryKey: z.string(),
  autoGeneratePk: z.boolean().default(false),
  pkPattern: z.string().optional(),
  sortColumn: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).default('asc'),
  softDelete: z.boolean().default(false),
  auditColumns: z.boolean().default(true),
  rowSelection: z.enum(['single', 'multiple']).default('multiple'),
  pagination: z.boolean().default(false),
  pageSize: z.number().optional(),
});

export const CrudSaveRequestSchema = z.object({
  inserts: z.array(z.record(z.any())),
  updates: z.array(z.record(z.any())),
  deletes: z.array(z.string()),
});

/**
 * 화면 생성기 공통 타입 정의
 */

// ========================================
// DB 메타데이터 타입
// ========================================

export interface ColumnMeta {
  name: string;
  korean_name: string;
  type: string;
  max_length: number | null;
  nullable: boolean;
  meaning: string;
}

export interface TableMeta {
  name: string;
  korean_name: string;
  columns: ColumnMeta[];
}

// ========================================
// 검색 조건 타입
// ========================================

export interface SearchCondition {
  label: string;
  type: string;
  field: string;
  required: boolean;
  id?: string;
}

// ========================================
// 그리드 컬럼 타입
// ========================================

export interface GridMerge {
  startCol: number;
  endCol: number;
  startRow: number;
  endRow: number;
}

export interface GridColumns {
  row1: string[];
  row2: string[];
  row3: string[];
  merges: GridMerge[];
  summaryRows: string[];
  sampleData: any[];
}

// ========================================
// 파싱된 데이터 타입
// ========================================

export interface ParsedData {
  screenName: string;
  screenNameEn: string;
  tableName: string;
  searchConditions: SearchCondition[];
  gridColumns: GridColumns;
}

// ========================================
// 검증 결과 타입
// ========================================

export interface ValidationResult {
  isValid: boolean;
  screenName?: string;
  screenNameEn?: string;
  tableName?: string;
  columns?: number;
  searchConditions?: SearchCondition[];
  summaryRows?: string[];
  errors?: string[];
  warnings?: string[];
  parsedData?: ParsedData;
}

// ========================================
// 미리보기 결과 타입
// ========================================

export interface PreviewResult {
  success: boolean;
  html?: string;
  componentCode?: string;
  preview?: string;
  error?: string;
}

// ========================================
// 쿼리 생성 관련 타입
// ========================================

export interface ColumnMapping {
  label: string;
  dbColumn: string;
  type: string;
}

export interface SelectMapping {
  gridHeader: string;
  dbColumn: string;
  type: string;
  alias: string;
}

export interface AllColumnMapping {
  gridHeader: string;
  dbColumn: string | null;
  type: string;
  alias: string;
  isMapped: boolean;
}

export interface QueryGenerationResult {
  success: boolean;
  sql?: string;
  error?: string;
  availableTables?: string[];
  tableMeta?: {
    name: string;
    korean_name: string;
    columnCount: number;
    availableColumns: string[];
  };
  columnMappings?: ColumnMapping[];
  selectMappings?: SelectMapping[];
  allColumnMappings?: AllColumnMapping[];
  unmatchedHeaders?: string[];
  stats?: {
    totalColumns: number;
    mappedCount: number;
    unmappedCount: number;
  };
}

// ========================================
// 옵션 타입 (검색 조건 UI 컴포넌트용)
// ========================================

export interface UsedOption {
  type: string;
  label: string;
  stateVar: string;
  paramName: string;
}

// ========================================
// 한글 헤더 → DB 컬럼 매핑 사전
// ========================================

export const HEADER_TO_COLUMN_MAP: Record<string, string[]> = {
  // 기본 정보
  '자재구분': ['mat_gubun', 'mat_class'],
  '품번': ['mat_code', 'item_code'],
  '품명': ['mat_desc', 'mat_name', 'item_name'],
  '대분류': ['mat_class', 'category1'],
  '중분류': ['mat_class2', 'category2'],
  '규격': ['size', 'spec'],
  '모델': ['model'],
  '년월': ['yyyymm'],
  '사업장': ['site'],
  
  // 기초
  '기초': ['begin_qty', 'begin_amt', 'begin_cost'],
  '기초수량': ['begin_qty', 'opening_qty'],
  '기초금액': ['begin_amt', 'opening_amt'],
  '기초단가': ['begin_cost', 'begin_unit_cost'],
  
  // 입고
  '입고': ['in_qty', 'in_amt'],
  '입고수량': ['in_qty', 'receipt_qty'],
  '입고금액': ['in_amt', 'receipt_amt'],
  '입고단가': ['unit_cost', 'in_unit_cost'],
  '기타입고수량': ['etc_in_qty', 'other_in_qty'],
  '기타입고금액': ['etc_in_amt', 'other_in_amt'],
  '기타입고단가': ['etc_in_cost', 'other_in_cost'],
  
  // 출고
  '출고': ['out_qty', 'out_amt'],
  '출고수량': ['out_qty', 'issue_qty'],
  '출고금액': ['out_amt', 'issue_amt'],
  '출고단가': ['out_unit_cost'],
  '기타출고수량': ['etc_out_qty', 'other_out_qty'],
  '기타출고금액': ['etc_out_amt', 'other_out_amt'],
  '기타출고단가': ['etc_out_cost'],
  
  // 재고
  '재고': ['stock_qty', 'stock_amt'],
  '재고수량': ['stock_qty', 'balance_qty', 'end_qty'],
  '재고금액': ['stock_amt', 'balance_amt', 'end_amt'],
  '재고단가': ['stock_cost', 'balance_cost'],
  
  // 수량/금액
  '수량': ['qty'],
  '금액': ['amt', 'amount'],
  '단가': ['cost', 'unit_cost', 'price'],
};

// ========================================
// 옵션 매핑 (메타정보 → searchConditions)
// ========================================

export const OPTION_MAPPING: Record<string, { label: string; type: string }> = {
  '년월': { label: '년월', type: 'yearmonth' },
  '년': { label: '년', type: 'year' },
  '자재': { label: '자재', type: 'material' },
  '거래처': { label: '거래처', type: 'customer' },
  '부서': { label: '부서', type: 'department' },
  '계정': { label: '계정', type: 'account' },
  '모델': { label: '모델', type: 'model' },
  '사업장': { label: '사업장', type: 'site' },
  '비용': { label: '비용', type: 'expense' },
};

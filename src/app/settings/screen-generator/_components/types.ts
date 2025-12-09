/**
 * 화면 생성기 공통 타입
 */

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: "info" | "success" | "warning" | "error";
  step: string;
  message: string;
  details?: string;
}

export interface ValidationResult {
  isValid: boolean;
  screenName?: string;
  screenNameEn?: string;
  tableName?: string;
  columns?: number;
  searchConditions?: Array<{ label: string; type: string; field: string; required: boolean }>;
  filters?: number;
  formulas?: number;
  summaryRows?: string[];
  warnings?: string[];
  errors?: string[];
  parsedData?: any;
}

export type GeneratorMode = "simple" | "excel";

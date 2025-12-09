/**
 * Excel 템플릿 검증 유틸리티
 * @module screenGenerator/_shared/validation
 */

import * as XLSX from "xlsx";
import { ScreenType, type ParsedData, type SearchCondition } from "./types";

// ============================================================
// 옵션 매핑 (메타정보 시트의 '옵션' 필드 → 검색조건)
// ============================================================

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

// ============================================================
// 화면 유형 자동 감지
// ============================================================

export function detectScreenType(parsedData: Partial<ParsedData>): ScreenType {
  const { gridColumns } = parsedData;
  
  if (!gridColumns) {
    return ScreenType.SIMPLE_GRID;
  }
  
  // 그룹 헤더 존재 여부 (row2에 병합 셀이 있으면 복잡 화면)
  const hasGroupHeader = gridColumns.merges?.some(
    m => m.startRow === 1 && m.endRow === 1 && m.startCol !== m.endCol
  ) ?? false;
  
  // 컬럼 수에 따른 복잡도 판단
  const columnCount = gridColumns.row3?.filter(h => h && typeof h === 'string' && h.trim()).length ?? 0;
  const isComplex = hasGroupHeader || columnCount > 15;
  
  // TODO: CRUD 여부는 메타정보에서 판단 (현재는 조회 전용)
  // TODO: 차트 여부도 메타정보에서 판단
  
  if (isComplex) {
    return ScreenType.COMPLEX_GRID;
  }
  
  return ScreenType.SIMPLE_GRID;
}

// ============================================================
// 메타정보 시트 파싱
// ============================================================

export interface MetaInfo {
  screenName: string;
  screenNameEn: string;
  tableName: string;
  options: string;
  screenType?: string;
}

export function parseMetaSheet(workbook: XLSX.WorkBook): MetaInfo {
  const metaSheet = workbook.Sheets["메타정보"];
  if (!metaSheet) {
    return { screenName: '', screenNameEn: '', tableName: '', options: '' };
  }
  
  const metaData = XLSX.utils.sheet_to_json<string[]>(metaSheet, { header: 1, defval: "" });
  
  let screenName = "";
  let screenNameEn = "";
  let tableName = "";
  let options = "";
  let screenType = "";
  
  for (const row of metaData) {
    const key = row[0]?.toString().trim() || "";
    const value = row[1]?.toString().trim() || "";
    
    if (key === "화면명" || key === "화면명(한글)") screenName = value;
    if (key === "화면명(영문)") screenNameEn = value;
    if (key === "테이블명" || key === "사용테이블") tableName = value;
    if (key === "옵션") options = value;
    if (key === "화면유형" || key === "화면타입") screenType = value;
  }
  
  return { screenName, screenNameEn, tableName, options, screenType };
}

// ============================================================
// 옵션 → 검색조건 변환
// ============================================================

export function parseSearchConditions(optionsStr: string): SearchCondition[] {
  if (!optionsStr) return [];
  
  const searchConditions: SearchCondition[] = [];
  const optionList = optionsStr.split(',').map(o => o.trim()).filter(o => o);
  
  for (const opt of optionList) {
    const mapping = OPTION_MAPPING[opt];
    if (mapping) {
      searchConditions.push({
        label: mapping.label,
        type: mapping.type,
        field: mapping.type,
        required: false,
      });
    }
  }
  
  return searchConditions;
}

// ============================================================
// 그리드컬럼 시트 파싱
// ============================================================

export interface GridColumnInfo {
  row1: string[];
  row2: string[];
  row3: string[];
  merges: Array<{
    startCol: number;
    endCol: number;
    startRow: number;
    endRow: number;
  }>;
  summaryRows: string[];
  sampleData: any[];
  columnCount: number;
}

export function parseGridSheet(workbook: XLSX.WorkBook): GridColumnInfo {
  const gridSheet = workbook.Sheets["그리드컬럼"];
  if (!gridSheet) {
    return {
      row1: [], row2: [], row3: [], merges: [],
      summaryRows: [], sampleData: [], columnCount: 0
    };
  }
  
  const gridData = XLSX.utils.sheet_to_json<string[]>(gridSheet, { header: 1, defval: "" });
  const rawMerges = gridSheet["!merges"] || [];
  
  const row1 = gridData[0] || [];
  const row2 = gridData[1] || [];
  const row3 = gridData[2] || [];
  
  // 병합 셀 정보 변환
  const merges = rawMerges.map((m: XLSX.Range) => ({
    startCol: m.s.c,
    endCol: m.e.c,
    startRow: m.s.r,
    endRow: m.e.r,
  }));
  
  // 컬럼 수 계산
  let columnCount = 0;
  for (let col = 0; col < row3.length; col++) {
    const header = row3[col]?.toString().trim() || row2[col]?.toString().trim();
    if (header && !header.includes("합계")) {
      columnCount++;
    }
  }
  
  // 합계 행 추출
  const summaryRows: string[] = [];
  for (let row = 3; row < gridData.length; row++) {
    const firstCell = gridData[row]?.[0]?.toString() || "";
    if (firstCell.includes("합계")) {
      summaryRows.push(firstCell);
    }
  }
  
  // 샘플 데이터 추출
  const sampleData = gridData.slice(3)
    .filter(row => {
      const firstCell = row[0]?.toString() || "";
      return firstCell && !firstCell.includes("합계");
    })
    .slice(0, 5);
  
  return { row1, row2, row3, merges, summaryRows, sampleData, columnCount };
}

// ============================================================
// 샘플데이터 시트 파싱
// ============================================================

export function parseSampleDataSheet(workbook: XLSX.WorkBook): any[] {
  if (!workbook.SheetNames.includes("샘플데이터")) {
    return [];
  }
  
  const sampleSheet = workbook.Sheets["샘플데이터"];
  if (!sampleSheet) return [];
  
  const sampleSheetData = XLSX.utils.sheet_to_json<string[]>(sampleSheet, { header: 1, defval: "" });
  
  // Row 1: 제목, Row 2: 헤더, Row 3+: 데이터
  return sampleSheetData.slice(2)
    .filter(row => {
      const firstCell = row[0]?.toString() || "";
      return firstCell && !firstCell.includes("합계");
    })
    .slice(0, 5);
}

// ============================================================
// 검증 경고 생성
// ============================================================

export function generateWarnings(
  row2: string[],
  row3: string[],
  merges: Array<{ startCol: number; endCol: number; startRow: number; endRow: number }>
): string[] {
  const warnings: string[] = [];
  
  // 그룹 헤더 맵 생성
  const groupHeaderMap = new Map<number, string>();
  for (const merge of merges) {
    if (merge.startRow === 1 && merge.endRow === 1 && merge.startCol !== merge.endCol) {
      const headerValue = row2[merge.startCol]?.toString().trim() || "";
      if (headerValue) {
        for (let c = merge.startCol; c <= merge.endCol; c++) {
          groupHeaderMap.set(c, headerValue);
        }
      }
    }
  }
  
  // 그룹명과 상세 컬럼명 동일 여부 체크
  for (let col = 0; col < row3.length; col++) {
    const groupHeader = groupHeaderMap.get(col);
    const detailHeader = row3[col]?.toString().trim();
    
    if (groupHeader && detailHeader && groupHeader === detailHeader) {
      warnings.push(`Col ${col + 1}: 그룹명 '${groupHeader}'과 상세 컬럼명이 동일합니다. 구분을 권장합니다.`);
    }
  }
  
  // 컬럼명 중복 체크
  const headerCounts = new Map<string, number>();
  for (const header of row3) {
    const h = header?.toString().trim();
    if (h) {
      headerCounts.set(h, (headerCounts.get(h) || 0) + 1);
    }
  }
  for (const [header, count] of headerCounts) {
    if (count > 1) {
      warnings.push(`상세 컬럼명 '${header}'이(가) ${count}번 중복됩니다.`);
    }
  }
  
  return warnings;
}

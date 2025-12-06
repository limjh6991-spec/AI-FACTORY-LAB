/**
 * Excel 템플릿 파서 - 사용자 친화적 Excel 양식을 화면 정의로 변환
 * 
 * 핵심 아이디어:
 * 1. 사용자는 실제 사용하는 Excel 양식 그대로 입력
 * 2. API가 병합 헤더, 그룹 구조를 자동 감지하여 해석
 * 3. 결과물은 표준화된 screen_definition JSON
 */

import * as XLSX from 'xlsx';

interface ColumnDefinition {
  field: string;
  headerName: string;
  group?: string;  // 부모 그룹 헤더
  width: number;
  type: 'text' | 'number' | 'currency' | 'date';
  align: 'left' | 'center' | 'right';
  pinned?: 'left' | 'right';
}

interface GridStructure {
  title: string;
  unitInfo?: string;
  groupHeaders: string[];      // 1차 헤더 (기초, 입고, 출고, 재고...)
  detailHeaders: string[];     // 2차 헤더 (수량, 금액, 단가...)
  summaryRows: string[];       // 합계 행 라벨 (원재료 합계, 부재료 합계...)
  columns: ColumnDefinition[];
  sampleData: Record<string, any>[];
}

interface SearchCondition {
  id: string;
  label: string;
  type: string;
  required: boolean;
  defaultValue: string;
  description: string;
}

interface ScreenDefinition {
  screenName: string;
  screenNameEn: string;
  tableName: string;
  searchConditions: SearchCondition[];
  grid: GridStructure;
}

/**
 * 그리드컬럼 시트 파싱 - 병합 셀 정보 활용
 */
function parseGridColumnSheet(sheet: XLSX.WorkSheet): GridStructure {
  const data = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });
  const merges = sheet['!merges'] || [];
  
  // Row 1: 제목 + 단위 정보
  const row1 = data[0] as string[];
  const title = row1[0] || '';
  const unitInfo = row1.find(cell => cell.toString().includes('단위')) || '';
  
  // Row 2: 1차 그룹 헤더 (병합된 상위 헤더)
  const row2 = data[1] as string[];
  
  // Row 3: 2차 상세 헤더 (실제 컬럼명)
  const row3 = data[2] as string[];
  
  // 병합 정보를 기반으로 그룹 헤더 맵 생성
  const groupHeaderMap = buildGroupHeaderMap(merges, row2);
  
  // 컬럼 정의 추출
  const columns: ColumnDefinition[] = [];
  
  for (let col = 0; col < row3.length; col++) {
    const groupHeader = groupHeaderMap.get(col) || '';
    const detailHeader = row3[col]?.toString().trim() || '';
    
    // 단일 컬럼 (2행 병합) - Row2와 Row3이 병합된 경우
    const isSingleColumn = isVerticallyMerged(merges, col, 1, 2);
    
    let headerName: string;
    let group: string | undefined;
    
    if (isSingleColumn) {
      // 자재구분, 품번 등 단일 컬럼
      headerName = row2[col]?.toString().trim() || '';
      group = undefined;
    } else {
      // 그룹 헤더가 있는 컬럼
      headerName = detailHeader;
      group = groupHeader !== detailHeader ? groupHeader : undefined;
    }
    
    if (!headerName) continue;
    
    // 필드명 생성
    const field = generateFieldName(group || '', headerName, col);
    
    // 타입 추론
    const type = inferColumnType(headerName);
    
    columns.push({
      field,
      headerName,
      group,
      width: estimateWidth(headerName, type),
      type,
      align: type === 'text' ? 'left' : 'right',
      pinned: col < 2 ? 'left' : undefined
    });
  }
  
  // 합계 행 및 샘플 데이터 추출
  const summaryRows: string[] = [];
  const sampleData: Record<string, any>[] = [];
  
  for (let row = 3; row < data.length; row++) {
    const rowData = data[row] as any[];
    const firstCell = rowData[0]?.toString() || '';
    
    if (firstCell.includes('합계')) {
      summaryRows.push(firstCell);
    } else if (firstCell && !firstCell.includes('합계')) {
      const record: Record<string, any> = {};
      columns.forEach((col, idx) => {
        record[col.field] = rowData[idx] ?? '';
      });
      sampleData.push(record);
    }
  }
  
  return {
    title,
    unitInfo,
    groupHeaders: extractUniqueGroupHeaders(groupHeaderMap),
    detailHeaders: row3.filter(h => h),
    summaryRows,
    columns,
    sampleData
  };
}

/**
 * 병합 정보를 기반으로 각 컬럼의 그룹 헤더 맵 생성
 */
function buildGroupHeaderMap(merges: XLSX.Range[], row2: string[]): Map<number, string> {
  const map = new Map<number, string>();
  
  merges.forEach(merge => {
    // Row 1 (index 1)에서 가로로 병합된 셀 찾기
    if (merge.s.r === 1 && merge.e.r === 1 && merge.s.c !== merge.e.c) {
      const headerValue = row2[merge.s.c]?.toString().trim() || '';
      if (headerValue) {
        for (let c = merge.s.c; c <= merge.e.c; c++) {
          map.set(c, headerValue);
        }
      }
    }
  });
  
  return map;
}

/**
 * 특정 컬럼이 세로로 병합되었는지 확인
 */
function isVerticallyMerged(merges: XLSX.Range[], col: number, startRow: number, endRow: number): boolean {
  return merges.some(merge => 
    merge.s.c === col && 
    merge.e.c === col && 
    merge.s.r === startRow && 
    merge.e.r === endRow
  );
}

/**
 * 고유 그룹 헤더 추출
 */
function extractUniqueGroupHeaders(groupHeaderMap: Map<number, string>): string[] {
  const unique = new Set<string>();
  groupHeaderMap.forEach(value => unique.add(value));
  return Array.from(unique);
}

/**
 * 필드명 생성 - 한글 헤더를 영문 필드명으로 변환
 */
function generateFieldName(group: string, header: string, index: number): string {
  // 그룹 prefix 매핑
  const groupMapping: Record<string, string> = {
    '기초': 'open',
    '입고': 'in',
    '출고': 'out',
    '출고수량': 'out',  // "출고수량" 그룹도 "out"으로 처리
    '재고': 'close',
  };
  
  // 단일 컬럼 매핑
  const singleColumnMapping: Record<string, string> = {
    '자재구분': 'materialType',
    '품번': 'itemCode',
    '품명': 'itemName',
    '대분류': 'categoryL',
    '중분류': 'categoryM',
    '규격': 'spec',
  };
  
  // 단일 컬럼인 경우
  if (!group) {
    return singleColumnMapping[header] || `col_${index}`;
  }
  
  // 그룹이 있는 경우 - prefix 결정
  const groupPrefix = groupMapping[group] || group.toLowerCase().replace(/[^a-z]/g, '');
  
  // "기타" 여부 확인
  const isEtc = header.includes('기타');
  const prefix = isEtc ? `${groupPrefix}Etc` : groupPrefix;
  
  // suffix 결정 (수량/금액/단가)
  if (header.includes('수량')) return `${prefix}Qty`;
  if (header.includes('금액')) return `${prefix}Amt`;
  if (header.includes('단가')) return `${prefix}Price`;
  
  return `${prefix}_${index}`;
}

/**
 * 컬럼 타입 추론
 */
function inferColumnType(header: string): 'text' | 'number' | 'currency' | 'date' {
  if (header.includes('금액') || header.includes('단가') || header.includes('원가')) {
    return 'currency';
  }
  if (header.includes('수량') || header.includes('량') || header.includes('개수')) {
    return 'number';
  }
  if (header.includes('일자') || header.includes('날짜') || header.includes('일시')) {
    return 'date';
  }
  return 'text';
}

/**
 * 컬럼 너비 추정
 */
function estimateWidth(header: string, type: string): number {
  if (type === 'currency') return 120;
  if (type === 'number') return 90;
  if (header.includes('명') || header.includes('품명')) return 200;
  if (header.includes('코드') || header.includes('품번')) return 150;
  return 100;
}

/**
 * 그룹 헤더 추출 (중복 제거)
 */
function extractGroupHeaders(row: string[]): string[] {
  const groups = new Set<string>();
  row.forEach(cell => {
    const value = cell?.toString().trim();
    if (value && !value.includes('합계')) {
      groups.add(value);
    }
  });
  return Array.from(groups);
}

/**
 * 조회조건 시트 파싱
 */
function parseSearchConditionSheet(sheet: XLSX.WorkSheet): SearchCondition[] {
  const data = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });
  const conditions: SearchCondition[] = [];
  
  // Row 2부터 데이터 (Row 1은 헤더)
  for (let row = 2; row < data.length; row++) {
    const rowData = data[row] as any[];
    if (!rowData[0]) continue;
    
    conditions.push({
      id: rowData[0]?.toString() || '',
      label: rowData[1]?.toString() || '',
      type: rowData[2]?.toString() || 'text',
      required: rowData[3]?.toString().toUpperCase() === 'Y',
      defaultValue: rowData[4]?.toString() || '',
      description: rowData[5]?.toString() || ''
    });
  }
  
  return conditions;
}

/**
 * 메타정보 시트 파싱
 */
function parseMetaSheet(sheet: XLSX.WorkSheet): { 
  screenName: string; 
  screenNameEn: string;
  tableName: string;
} {
  const data = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });
  let screenName = '';
  let screenNameEn = '';
  let tableName = '';
  
  data.forEach((row: any[]) => {
    const key = row[0]?.toString().trim() || '';
    const value = row[1]?.toString().trim() || '';
    
    if (key === '화면명') screenName = value;
    if (key === '화면명(영문)') screenNameEn = value;
    if (key === '테이블명' || key === '사용테이블') tableName = value;
  });
  
  return { screenName, screenNameEn, tableName };
}

/**
 * 전체 Excel 템플릿 파싱 - 메인 함수
 */
export function parseExcelTemplate(filePath: string): ScreenDefinition {
  const workbook = XLSX.readFile(filePath);
  
  // 메타정보 시트
  const metaSheet = workbook.Sheets['메타정보'];
  const meta = metaSheet ? parseMetaSheet(metaSheet) : { screenName: '', screenNameEn: '', tableName: '' };
  
  // 조회조건 시트
  const searchSheet = workbook.Sheets['조회조건'];
  const searchConditions = searchSheet ? parseSearchConditionSheet(searchSheet) : [];
  
  // 그리드컬럼 시트 (핵심!)
  const gridSheet = workbook.Sheets['그리드컬럼'];
  const grid = gridSheet ? parseGridColumnSheet(gridSheet) : null;
  
  if (!grid) {
    throw new Error('그리드컬럼 시트를 찾을 수 없습니다.');
  }
  
  return {
    screenName: meta.screenName || grid.title,
    screenNameEn: meta.screenNameEn,
    tableName: meta.tableName,
    searchConditions,
    grid
  };
}

/**
 * AG Grid 컬럼 정의로 변환
 */
export function toAgGridColumns(grid: GridStructure): any[] {
  const groupedColumns: Record<string, ColumnDefinition[]> = {};
  const standaloneColumns: ColumnDefinition[] = [];
  
  // 그룹별로 분류
  grid.columns.forEach(col => {
    if (col.group) {
      if (!groupedColumns[col.group]) {
        groupedColumns[col.group] = [];
      }
      groupedColumns[col.group]!.push(col);
    } else {
      standaloneColumns.push(col);
    }
  });
  
  // AG Grid 형식으로 변환
  const result: any[] = [];
  
  // 단독 컬럼 먼저
  standaloneColumns.forEach(col => {
    result.push({
      field: col.field,
      headerName: col.headerName,
      width: col.width,
      pinned: col.pinned,
      type: col.type === 'currency' ? 'numericColumn' : undefined,
      valueFormatter: col.type === 'currency' ? currencyFormatter : undefined
    });
  });
  
  // 그룹 컬럼
  Object.entries(groupedColumns).forEach(([groupName, cols]) => {
    result.push({
      headerName: groupName,
      children: cols.map(col => ({
        field: col.field,
        headerName: col.headerName,
        width: col.width,
        type: col.type === 'currency' ? 'numericColumn' : undefined,
        valueFormatter: col.type === 'currency' ? currencyFormatter : undefined
      }))
    });
  });
  
  return result;
}

function currencyFormatter(params: any) {
  if (params.value == null) return '';
  return params.value.toLocaleString('ko-KR');
}

// 테스트용 실행 (직접 실행 시)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const result = parseExcelTemplate('data/sample_excel/SC004_자재수불부_템플릿.xlsx');
  console.log(JSON.stringify(result, null, 2));
}

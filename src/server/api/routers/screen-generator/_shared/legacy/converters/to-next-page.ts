/**
 * Next.js 페이지 변환 모듈
 * 생성된 React 컴포넌트를 실제 동작하는 Next.js 페이지로 변환
 */

import { capitalize } from '../utils/helpers';
import type { UsedOption } from '../types';

/**
 * 코드에서 사용된 옵션 컴포넌트 감지
 */
function detectUsedOptions(componentCode: string): UsedOption[] {
  const usedOptions: UsedOption[] = [];

  // 년월 감지
  if (componentCode.match(/년월|기간|type="month"/i)) {
    usedOptions.push({ type: 'YearMonthPicker', label: '년월', stateVar: 'yearMonth', paramName: 'yearMonth' });
  }
  // 년도 감지
  if (componentCode.match(/년도|연도/i) && !componentCode.match(/년월/)) {
    usedOptions.push({ type: 'YearPicker', label: '년도', stateVar: 'year', paramName: 'year' });
  }
  // 자재 감지
  if (componentCode.match(/자재|품목|품번/i)) {
    usedOptions.push({ type: 'MaterialSelect', label: '자재', stateVar: 'materialCode', paramName: 'materialCode' });
  }
  // 거래처 감지
  if (componentCode.match(/거래처|고객/i)) {
    usedOptions.push({ type: 'CustomerSelect', label: '거래처', stateVar: 'customerCode', paramName: 'customerCode' });
  }
  // 부서 감지
  if (componentCode.match(/부서|팀/i)) {
    usedOptions.push({ type: 'DepartmentSelect', label: '부서', stateVar: 'deptCode', paramName: 'deptCode' });
  }
  // 사업장 감지
  if (componentCode.match(/사업장|site/i)) {
    usedOptions.push({ type: 'SiteSelect', label: '사업장', stateVar: 'site', paramName: 'site' });
  }
  // 모델 감지
  if (componentCode.match(/모델/i)) {
    usedOptions.push({ type: 'ModelSelect', label: '모델', stateVar: 'modelCode', paramName: 'modelCode' });
  }
  // 계정 감지
  if (componentCode.match(/계정/i)) {
    usedOptions.push({ type: 'AccountSelect', label: '계정', stateVar: 'accountCode', paramName: 'accountCode' });
  }

  return usedOptions;
}

/**
 * 상태 변수 선언 코드 생성
 */
function generateStateDeclarations(usedOptions: UsedOption[]): string {
  return usedOptions.map(opt => {
    if (opt.type === 'YearMonthPicker') {
      return `const [${opt.stateVar}, set${capitalize(opt.stateVar)}] = useState<string>(() => {
    const now = new Date();
    return \`\${now.getFullYear()}\${String(now.getMonth() + 1).padStart(2, '0')}\`;
  });`;
    } else if (opt.type === 'YearPicker') {
      return `const [${opt.stateVar}, set${capitalize(opt.stateVar)}] = useState<string>(String(new Date().getFullYear()));`;
    } else {
      return `const [${opt.stateVar}, set${capitalize(opt.stateVar)}] = useState<string>('');`;
    }
  }).join('\n  ');
}

/**
 * URL 파라미터 생성 코드 생성
 */
function generateParamBuilderCode(usedOptions: UsedOption[], screenId: string): string {
  if (usedOptions.length === 0) {
    return `const url = '/api/screens/${screenId.toLowerCase()}/data';`;
  }

  const paramAppends = usedOptions
    .map(opt => `if (${opt.stateVar}) params.append('${opt.paramName}', ${opt.stateVar});`)
    .join('\n      ');

  return `const params = new URLSearchParams();
      ${paramAppends}
      const queryString = params.toString();
      const url = \`/api/screens/${screenId.toLowerCase()}/data\${queryString ? '?' + queryString : ''}\`;`;
}

/**
 * 옵션 컴포넌트 JSX 생성
 */
function generateOptionComponentsJsx(usedOptions: UsedOption[]): string {
  return usedOptions.map(opt => {
    return `<${opt.type}
          label="${opt.label}"
          value={${opt.stateVar}}
          onChange={(value) => set${capitalize(opt.stateVar)}(value)}
        />`;
  }).join('\n        ');
}

/**
 * 기본 import 구문 생성
 */
function generateImports(): string {
  return `'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download, Loader2, Plus, Save, Trash2 } from 'lucide-react';
// 공통 옵션 컴포넌트
import {
  SiteSelect,
  YearMonthPicker,
  YearPicker,
  CustomerSelect,
  MaterialSelect,
  ModelSelect,
  AccountSelect,
  ExpenSelSelect,
  DepartmentSelect,
  SelCodeSelect,
} from "~/components/options";

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

`;
}

/**
 * 생성된 컴포넌트 코드를 실제 Next.js 페이지로 변환
 * - TypeScript 타입 추가
 * - AG Grid 모듈 등록 추가
 * - 실제 동작하는 UI 컴포넌트 import 추가
 * - 공통 옵션 컴포넌트 import 추가
 */
export function convertToNextPage(componentCode: string, screenId: string, screenName: string): string {
  // ========================================
  // 1. 사용된 옵션 컴포넌트 감지
  // ========================================
  const usedOptions = detectUsedOptions(componentCode);

  // ========================================
  // 2. 코드 생성
  // ========================================
  const stateDeclarations = generateStateDeclarations(usedOptions);
  const paramBuilderCode = generateParamBuilderCode(usedOptions, screenId);
  const optionComponentsJsx = generateOptionComponentsJsx(usedOptions);
  const imports = generateImports();

  // ========================================
  // 3. 기존 코드 정리
  // ========================================
  let cleanedCode = componentCode
    .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '')
    .replace(/['"]use client['"];?\s*/g, '')
    .trim();

  // 컴포넌트명을 영문으로 변환
  const safeComponentName = `Screen${screenId.replace('SC', '')}`;
  cleanedCode = cleanedCode.replace(
    /export\s+default\s+function\s+[\w가-힣]+\s*\(/,
    `export default function ${safeComponentName}(`
  );

  // ========================================
  // 4. 샘플 데이터 → API 호출 코드로 변환
  // ========================================
  cleanedCode = cleanedCode.replace(
    /const\s+sampleData\s*=\s*\[[\s\S]*?\];/,
    '// 샘플 데이터는 제거됨 - API에서 조회'
  );

  // useState(sampleData) → 상태 및 API 호출 코드
  cleanedCode = cleanedCode.replace(
    /const\s*\[\s*rowData\s*,\s*setRowData\s*\]\s*=\s*useState\s*\(\s*sampleData\s*\)/,
    `const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 검색 조건 상태
  ${stateDeclarations}

  // 실제 DB 데이터 조회 (버튼 클릭 시에만 호출)
  const fetchData = async () => {
    setLoading(true);
    try {
      ${paramBuilderCode}
      const response = await fetch(url);
      if (!response.ok) throw new Error('데이터 조회 실패');
      const result = await response.json();
      setRowData(result.data || []);
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 (컴포넌트 마운트 시 1회만)
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])`
  );

  // ========================================
  // 5. handleSearch 수정
  // ========================================
  // 패턴 1: console.log만 있는 경우
  cleanedCode = cleanedCode.replace(
    /const\s+handleSearch\s*=\s*\(\)\s*=>\s*\{\s*console\.log\s*\(\s*['"]검색 실행['"]\s*\)\s*;?\s*\}\s*;?/g,
    `const handleSearch = () => {
    fetchData();
  };`
  );
  // 패턴 2: 빈 함수인 경우
  cleanedCode = cleanedCode.replace(
    /const\s+handleSearch\s*=\s*\(\)\s*=>\s*\{\s*\}\s*;?/g,
    `const handleSearch = () => {
    fetchData();
  };`
  );
  // 패턴 3: handleSearch가 없으면 handleReset 위에 추가
  if (!cleanedCode.includes('const handleSearch')) {
    cleanedCode = cleanedCode.replace(
      /(const\s+handleReset)/,
      `const handleSearch = () => {
    fetchData();
  };

  $1`
    );
  }

  // handleReset 수정
  cleanedCode = cleanedCode.replace(
    /const\s+handleReset\s*=\s*\(\)\s*=>\s*\{[\s\S]*?setRowData\s*\(\s*sampleData\s*\);?\s*\};?/,
    `const handleReset = () => {
    fetchData();
  };`
  );

  // ========================================
  // 6. 인라인 HTML → 공통 옵션 컴포넌트로 교체
  // ========================================
  if (usedOptions.length > 0) {
    cleanedCode = cleanedCode.replace(
      /(<div style=\{\{\s*display:\s*['"]flex['"][\s\S]*?조회조건[\s\S]*?\}\}>\s*)([\s\S]*?)(<div style=\{\{\s*display:\s*['"]flex['"]\s*,\s*gap:\s*8)/,
      `$1
        ${optionComponentsJsx}
        $3`
    );
  }

  // 남아있는 인라인 년월 입력 제거
  cleanedCode = cleanedCode.replace(
    /<div style=\{\{\s*display:\s*['"]flex['"]\s*,\s*flexDirection:\s*['"]column['"]\s*,\s*gap:\s*4\s*\}\}>\s*<label[^>]*>(년월|기간)[^<]*<\/label>\s*<input\s+type="month"[\s\S]*?<\/div>/g,
    ''
  );

  // 남아있는 인라인 select 제거
  cleanedCode = cleanedCode.replace(
    /<div style=\{\{\s*display:\s*['"]flex['"]\s*,\s*flexDirection:\s*['"]column['"]\s*,\s*gap:\s*4\s*\}\}>\s*<label[^>]*>(자재|품목|품번|거래처|고객|부서|팀|사업장|모델)[^<]*<\/label>\s*<select[\s\S]*?<\/select>\s*<\/div>/g,
    ''
  );

  // ========================================
  // 7. AG Grid 높이 수정
  // ========================================
  cleanedCode = cleanedCode.replace(
    /className="ag-theme-alpine"\s+style=\{\{\s*width:\s*['"]100%['"]\s*,\s*height:\s*\d+\s*,?\s*(minHeight:\s*\d+\s*,?)?\s*\}\}/g,
    'className="ag-theme-alpine" style={{ width: \'100%\', flex: 1, minHeight: 300 }}'
  );

  cleanedCode = cleanedCode.replace(
    /style=\{\{\s*display:\s*['"]flex['"]\s*,\s*flexDirection:\s*['"]column['"]\s*,\s*height:\s*['"]100vh['"]/g,
    "style={{ display: 'flex', flexDirection: 'column', height: '100%'"
  );

  // ========================================
  // 8. AG Grid 스타일 추가 (인라인 CSS 변수)
  // ========================================
  // ag-theme-alpine div에 CSS 변수 스타일 추가
  cleanedCode = cleanedCode.replace(
    /className="ag-theme-alpine"\s+style=\{\{([^}]*)\}\}/g,
    `className="ag-theme-alpine" style={{$1, '--ag-header-background-color': '#dbeafe', '--ag-header-foreground-color': '#1e3a5f', '--ag-row-hover-color': '#eff6ff', '--ag-selected-row-background-color': '#dbeafe', '--ag-border-color': '#e5e7eb', '--ag-font-family': 'inherit', '--ag-font-size': '14px' }}`
  );

  return imports + cleanedCode;
}

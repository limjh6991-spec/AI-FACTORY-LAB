"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview as SandpackPreviewPane,
  SandpackCodeEditor,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useState, useEffect } from "react";
import { Code2, Eye, RefreshCw, Maximize2, Minimize2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface SandpackPreviewProps {
  code: string;
  className?: string;
  showEditor?: boolean;
}

// TypeScript 문법을 JavaScript로 변환
function convertTypeScriptToJavaScript(code: string): string {
  let jsCode = code;
  
  // 0. 코드 블록 마커 제거 (Claude가 ```javascript 등으로 감싸는 경우)
  jsCode = jsCode.replace(/^```(?:javascript|jsx|js|tsx|typescript)?\s*\n?/gm, "");
  jsCode = jsCode.replace(/```\s*$/gm, "");
  
  // 0-1. 첫 줄이 언어 이름만 있는 경우 제거
  jsCode = jsCode.replace(/^(?:javascript|jsx|js|tsx|typescript)\s*\n/i, "");
  
  // 0-2. 잘못된 style 패턴 수정 (핵심!)
  // fontFamily, -apple-system, BlinkMacSystemFont, sans-serif' 같은 잘못된 패턴
  jsCode = jsCode.replace(
    /fontFamily,\s*-apple-system,\s*BlinkMacSystemFont,\s*(?:')?sans-serif(?:')?/g,
    "fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'"
  );
  
  // 0-3. 잘못된 style 객체 속성 (콜론 없이 쉼표로 나열된 경우)
  // style={{ display, flexDirection, ... }} 패턴 감지 및 수정
  jsCode = jsCode.replace(
    /style=\{\{\s*display,\s*flexDirection,\s*height,\s*padding,\s*backgroundColor,\s*fontFamily[^}]*\}\}/g,
    "style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16, backgroundColor: '#f4f4f4', fontFamily: 'sans-serif' }}"
  );
  
  // 0-4. 불완전한 style 객체 수정 (속성명만 있고 값이 없는 경우)
  jsCode = jsCode.replace(
    /style=\{\{([^}]*?)(\w+),\s*(\w+),\s*(\w+)([^}]*)\}\}/g,
    (match) => {
      // 콜론(:)이 너무 적으면 잘못된 패턴으로 판단
      const colonCount = (match.match(/:/g) || []).length;
      const commaCount = (match.match(/,/g) || []).length;
      if (colonCount < commaCount / 2) {
        // 기본 스타일로 대체
        return "style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16 }}";
      }
      return match;
    }
  );

  // 1. "use client" 제거
  jsCode = jsCode.replace(/["']use client["'];?\s*/g, "");
  
  // 2. import type 구문 제거
  jsCode = jsCode.replace(/import\s+type\s+.*?from\s+['"].*?['"];?\s*/g, "");
  
  // 3. import { type ... } 에서 type 제거
  jsCode = jsCode.replace(/import\s*\{([^}]*)\}/g, (match, imports) => {
    const cleanedImports = imports
      .split(",")
      .map((imp: string) => imp.replace(/\btype\s+/g, "").trim())
      .filter((imp: string) => imp && !imp.startsWith("type "))
      .join(", ");
    return `import { ${cleanedImports} }`;
  });
  
  // 4. ColDef, ColGroupDef 등 타입 import 제거
  jsCode = jsCode.replace(/,?\s*ColDef\s*/g, "");
  jsCode = jsCode.replace(/,?\s*ColGroupDef\s*/g, "");
  jsCode = jsCode.replace(/import\s*\{\s*\}\s*from\s*['"]ag-grid-community['"];?\s*/g, "");
  
  // 5. useState<Type>() → useState()
  jsCode = jsCode.replace(/useState<[^>]+>/g, "useState");
  
  // 6. useRef<Type>() → useRef()
  jsCode = jsCode.replace(/useRef<[^>]+>/g, "useRef");
  
  // 7. useCallback<Type>() → useCallback()
  jsCode = jsCode.replace(/useCallback<[^>]+>/g, "useCallback");
  
  // 8. 함수 파라미터 타입 제거: (param: Type) → (param)
  jsCode = jsCode.replace(/\(([^)]*)\)\s*(?::\s*[^{=]+)?\s*(?=[{=])/g, (match, params) => {
    const cleanedParams = params
      .split(",")
      .map((param: string) => {
        // : Type 제거
        const colonIndex = param.indexOf(":");
        if (colonIndex > 0) {
          return param.substring(0, colonIndex).trim();
        }
        return param.trim();
      })
      .join(", ");
    return `(${cleanedParams})`;
  });
  
  // 9. 화살표 함수 파라미터 타입 제거: (param: Type) => → (param) =>
  jsCode = jsCode.replace(/\(([^)]*)\)\s*:\s*[^=]+\s*=>/g, (match, params) => {
    const cleanedParams = params
      .split(",")
      .map((param: string) => {
        const colonIndex = param.indexOf(":");
        if (colonIndex > 0) {
          return param.substring(0, colonIndex).trim();
        }
        return param.trim();
      })
      .join(", ");
    return `(${cleanedParams}) =>`;
  });
  
  // 10. const name: Type = → const name = (더 안전한 방식)
  // 특정 패턴만 처리: const varName: TypeName = 또는 const varName: TypeName[] =
  jsCode = jsCode.replace(/const\s+(\w+)\s*:\s*([A-Z]\w*(?:\[\])?)\s*=/g, (match, varName, typeName) => {
    // 타입명이 대문자로 시작하는 경우만 타입으로 간주
    return `const ${varName} =`;
  });
  jsCode = jsCode.replace(/let\s+(\w+)\s*:\s*([A-Z]\w*(?:\[\])?)\s*=/g, "let $1 =");
  
  // 11. interface, type 선언 제거
  jsCode = jsCode.replace(/interface\s+\w+\s*\{[^}]*\}\s*/g, "");
  jsCode = jsCode.replace(/type\s+\w+\s*=\s*[^;]+;\s*/g, "");
  
  // 12. as Type 캐스팅 제거
  jsCode = jsCode.replace(/\s+as\s+\w+(\[\])?/g, "");
  
  // 13. <Type> 캐스팅 제거 (JSX와 구분 필요)
  jsCode = jsCode.replace(/(?<!<\w+)\s*<(?!\/|[a-z]|Ag|div|span|button|input|h1|h2|p|form|label)([A-Z]\w*(?:\[\])?)>/g, "");
  
  // 14. React.FC, React.ReactNode 등 제거
  jsCode = jsCode.replace(/:\s*React\.\w+(?:<[^>]+>)?/g, "");
  
  // 15. 빈 import 정리
  jsCode = jsCode.replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?\s*/g, "");
  
  // 16. 연속된 빈 줄 정리
  jsCode = jsCode.replace(/\n{3,}/g, "\n\n");
  
  // 17. 빈 또는 불완전한 valueFormatter 제거
  // valueFormatter: (params) =>  , 같은 패턴 제거
  jsCode = jsCode.replace(/valueFormatter:\s*\([^)]*\)\s*=>\s*,/g, "");
  jsCode = jsCode.replace(/valueGetter:\s*\([^)]*\)\s*=>\s*,/g, "");
  
  // 18. toLocaleString(){ 패턴을 완전한 함수로 수정
  jsCode = jsCode.replace(
    /valueFormatter:\s*\((\w+)\)\s*=>\s*(\w+(?:\.\w+)*)\s*\?\s*(\w+(?:\.\w+)*)\.toLocaleString\(\)\s*\{/g,
    "valueFormatter: ($1) => $2 ? $3.toLocaleString() : '',"
  );
  
  // 19. 일반적인 toLocaleString(){ 수정
  jsCode = jsCode.replace(/\.toLocaleString\(\)\s*\{/g, ".toLocaleString(),");
  jsCode = jsCode.replace(/\.toFixed\(\d*\)\s*\{/g, (match) => match.replace("{", ","));
  
  // 20. 잘못된 화살표 함수 패턴 수정 (expr { headerName 형태)
  jsCode = jsCode.replace(
    /valueFormatter:\s*\((\w+)\)\s*=>\s*([^,{}\n]+?)\s*\{\s*\n\s*(headerName|field|width):/g,
    "valueFormatter: ($1) => $2,\n          $3:"
  );
  
  // 21. 연속된 속성에서 쉼표 누락 수정
  jsCode = jsCode.replace(/(['"}\d])\s*\n\s*(headerName|field|width|cellStyle|valueFormatter|valueGetter|children):/g, "$1,\n          $2:");
  
  // 22. 빈 valueFormatter 라인 제거 (최종 정리)
  jsCode = jsCode.replace(/,?\s*valueFormatter:\s*\([^)]*\)\s*=>\s*,?\s*\n/g, "\n");
  
  // 23. const default= 같은 잘못된 예약어 변수명 수정
  jsCode = jsCode.replace(/const\s+default\s*=/g, "const defaultColDef =");
  jsCode = jsCode.replace(/const\s+column\s*=/g, "const columnDefs =");
  jsCode = jsCode.replace(/const\s+row\s*=/g, "const rowData =");
  jsCode = jsCode.replace(/const\s+pinned\s*=/g, "const pinnedBottomRowData =");
  
  // 24. JSX 속성명 복구 (AG Grid 관련)
  jsCode = jsCode.replace(/default=\{default\}/g, "defaultColDef={defaultColDef}");
  jsCode = jsCode.replace(/column=\{column\}/g, "columnDefs={columnDefs}");
  jsCode = jsCode.replace(/row=\{row\}/g, "rowData={rowData}");
  jsCode = jsCode.replace(/pinned=\{pinned\}/g, "pinnedBottomRowData={pinnedBottomRowData}");
  
  // 25. default={ 만 있는 경우도 복구
  jsCode = jsCode.replace(/\sdefault=\{/g, " defaultColDef={");
  jsCode = jsCode.replace(/\scolumn=\{/g, " columnDefs={");
  jsCode = jsCode.replace(/\srow=\{(?!Data)/g, " rowData={");
  
  // 26. style 객체 끝에 누락된 괄호 수정
  // style={{ ... 로 시작하는데 닫히지 않은 경우
  jsCode = jsCode.replace(/style=\{\{\s*([^}]+)\s*\n\s*export/g, "style={{ $1 }}\n        </div>\n      </div>\n    </div>\n  );\n}\n\nexport");
  
  // 27. 중복된 export default 제거
  const exportMatches = jsCode.match(/export\s+default/g);
  if (exportMatches && exportMatches.length > 1) {
    // 마지막 export default만 남기고 나머지 제거
    let count = 0;
    jsCode = jsCode.replace(/export\s+default/g, (match) => {
      count++;
      return count === exportMatches.length ? match : "";
    });
  }
  
  // 28. 잘못된 style 객체 패턴 추가 수정
  // style={{ fontSize, fontWeight, marginBottom, ... }} 같이 콜론 없는 패턴
  jsCode = jsCode.replace(
    /<h1\s+style=\{\{[^}]*fontSize[^:][^}]*\}\}/g,
    (match) => {
      const colonCount = (match.match(/:/g) || []).length;
      const commaCount = (match.match(/,/g) || []).length;
      if (colonCount < 3) {
        return '<h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#161616" }}';
      }
      return match;
    }
  );
  
  // 29. 완전히 망가진 return 문 감지 및 기본값으로 대체
  // return (<div style={{ 가 비정상적인 경우
  const returnMatch = jsCode.match(/return\s*\(\s*<div\s+style=\{\{([^}]*)\}\}/);
  if (returnMatch && returnMatch[1]) {
    const styleContent = returnMatch[1];
    // 콜론이 거의 없으면 잘못된 패턴
    const colonCount = (styleContent.match(/:/g) || []).length;
    const commaCount = (styleContent.match(/,/g) || []).length;
    if (commaCount > 3 && colonCount < 2) {
      jsCode = jsCode.replace(
        /return\s*\(\s*<div\s+style=\{\{[^}]*\}\}/,
        "return (<div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}"
      );
    }
  }
  
  // 30. JSX 속성이 함수 호출처럼 보이는 패턴 수정
  // minWidth)=> 같은 잘못된 패턴 제거
  jsCode = jsCode.replace(/\w+\)\s*=>\s*setYearMonth\([^)]*\)\}/g, "");
  jsCode = jsCode.replace(/minWidth\)\s*=>/g, "");
  
  // 31. 불완전하게 끝나는 style 객체 수정
  jsCode = jsCode.replace(/style=\{\{\s*\n\s*width:\s*\d+,'/g, "style={{ width: 150 }}");
  
  return jsCode.trim();
}

// 기본 문법 검증 (간단한 괄호 매칭)
function validateBasicSyntax(code: string): { valid: boolean; error?: string } {
  let braceCount = 0;
  let bracketCount = 0;
  let parenCount = 0;
  
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    switch (char) {
      case '{': braceCount++; break;
      case '}': braceCount--; break;
      case '[': bracketCount++; break;
      case ']': bracketCount--; break;
      case '(': parenCount++; break;
      case ')': parenCount--; break;
    }
    
    if (braceCount < 0 || bracketCount < 0 || parenCount < 0) {
      return { valid: false, error: `Unmatched closing bracket at position ${i}` };
    }
  }
  
  if (braceCount !== 0) return { valid: false, error: `Unmatched braces: ${braceCount}` };
  if (bracketCount !== 0) return { valid: false, error: `Unmatched brackets: ${bracketCount}` };
  if (parenCount !== 0) return { valid: false, error: `Unmatched parentheses: ${parenCount}` };
  
  return { valid: true };
}

// AG Grid 의존성 포함 파일 구조 생성
function generateSandpackFiles(code: string) {
  console.log("[SandpackPreview] 원본 코드 길이:", code.length);
  console.log("[SandpackPreview] 원본 코드 시작:", code.substring(0, 200));
  
  // TypeScript → JavaScript 변환
  let cleanedCode = convertTypeScriptToJavaScript(code);
  
  console.log("[SandpackPreview] 변환 후 코드 길이:", cleanedCode.length);
  console.log("[SandpackPreview] AgGridReact 포함:", cleanedCode.includes("AgGridReact"));
  console.log("[SandpackPreview] columnDefs 포함:", cleanedCode.includes("columnDefs"));
  console.log("[SandpackPreview] return 포함:", cleanedCode.includes("return"));
  
  // 기본 문법 검증
  const validation = validateBasicSyntax(cleanedCode);
  if (!validation.valid) {
    console.warn("[SandpackPreview] Code validation warning:", validation.error);
  }
  
  // AG Grid import 확인
  const hasAgGrid = cleanedCode.includes("ag-grid-react") || cleanedCode.includes("AgGridReact");
  
  // 코드에서 컴포넌트 이름 추출 (한글 포함)
  const componentMatch = cleanedCode.match(/(?:export\s+default\s+)?function\s+([\w\uAC00-\uD7AF]+)/);
  let originalComponentName = componentMatch?.[1] ?? "GeneratedScreen";
  
  // 한글 컴포넌트 이름을 영문으로 변환
  const hasKoreanName = /[\uAC00-\uD7AF]/.test(originalComponentName);
  const componentName = "GeneratedScreen"; // 항상 영문 이름 사용
  
  // 코드 내 한글 컴포넌트 이름을 영문으로 교체
  if (hasKoreanName && originalComponentName !== componentName) {
    console.log("[SandpackPreview] 한글 컴포넌트 이름 변환:", originalComponentName, "→", componentName);
    cleanedCode = cleanedCode.replace(
      new RegExp(`function\\s+${originalComponentName}`, 'g'),
      `function ${componentName}`
    );
    cleanedCode = cleanedCode.replace(
      new RegExp(`export\\s+default\\s+${originalComponentName}`, 'g'),
      `export default ${componentName}`
    );
  }
  
  // export default 처리 - 이미 있으면 그대로 두고, 없으면 추가
  const hasExportDefault = cleanedCode.includes("export default");
  
  if (!hasExportDefault) {
    // export default function Name 형태가 아닌 경우, 맨 끝에 export 추가
    if (!cleanedCode.match(/export\s+default\s+function/)) {
      cleanedCode = cleanedCode + `\n\nexport default ${componentName};`;
    }
  }

  // AG Grid 컨테이너에 명시적 높이가 없으면 추가
  if (hasAgGrid && !cleanedCode.includes("minHeight")) {
    // ag-theme-alpine div에 minHeight 추가
    cleanedCode = cleanedCode.replace(
      /className=["']ag-theme-alpine["']\s*style=\{\{([^}]*)\}\}/g,
      (match, styleContent) => {
        if (!styleContent.includes("minHeight")) {
          return `className="ag-theme-alpine" style={{ ${styleContent}, minHeight: 400 }}`;
        }
        return match;
      }
    );
  }

  const files: Record<string, string> = {
    "/App.js": `
import ${componentName} from "./GeneratedScreen";

export default function App() {
  return <${componentName} />;
}
`,
    "/GeneratedScreen.js": cleanedCode,
    "/styles.css": `
/* IBM Carbon Design System Colors */
:root {
  --carbon-gray-10: #f4f4f4;
  --carbon-gray-20: #e0e0e0;
  --carbon-gray-30: #c6c6c6;
  --carbon-gray-50: #8d8d8d;
  --carbon-gray-70: #525252;
  --carbon-gray-100: #161616;
  --carbon-blue-60: #0f62fe;
  --carbon-green-50: #24a148;
  --carbon-red-60: #da1e28;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
}

body {
  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  color: var(--carbon-gray-100);
  background: #fff;
  min-width: max-content;
}

html {
  height: 100%;
}

#root {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 16px;
}

/* ===== SC002 Corporate Style - AG Grid ===== */
.ag-theme-alpine,
.ag-theme-alpine.ag-corporate-style {
  --ag-header-background-color: #4f7cba;
  --ag-header-foreground-color: white;
  --ag-row-hover-color: #f0f7ff;
  --ag-selected-row-background-color: #e1efff;
  --ag-border-color: #e5e7eb;
  --ag-font-family: 'IBM Plex Sans', sans-serif;
  --ag-font-size: 13px;
  --ag-grid-size: 6px;
  --ag-row-height: 42px;
  --ag-header-height: 45px;
  width: 100%;
  height: 100%;
  min-width: 600px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.ag-theme-alpine .ag-root-wrapper {
  height: 100%;
  overflow: auto;
  border-radius: 8px;
}

/* 그룹 헤더 스타일 */
.ag-theme-alpine .ag-header-group-cell {
  background: linear-gradient(180deg, #5a8ac7 0%, #4f7cba 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 600;
  font-size: 14px;
}

/* 일반 헤더 스타일 */
.ag-theme-alpine .ag-header-cell {
  background: linear-gradient(180deg, #6b9bd1 0%, #5a8ac7 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 500;
  color: white;
}

/* 합계 행 스타일 */
.ag-theme-alpine .ag-row-total,
.ag-row-total {
  background-color: #f8fafc !important;
  font-weight: 600;
  border-top: 2px solid #4f7cba;
  border-bottom: 2px solid #4f7cba;
}

.ag-theme-alpine .ag-row-total .ag-cell {
  background-color: #f8fafc !important;
}

/* 행 호버 */
.ag-theme-alpine .ag-row:hover {
  background-color: #f0f7ff;
}

/* 셀 스타일 */
.ag-theme-alpine .ag-cell {
  display: flex;
  align-items: center;
  border-right: 1px solid #f3f4f6;
}

/* 홀수 행 */
.ag-theme-alpine .ag-row-odd {
  background-color: #fafafa;
}

/* 짝수 행 */
.ag-theme-alpine .ag-row-even {
  background-color: #ffffff;
}

/* ===== 버튼 스타일 ===== */
.btn-primary,
button[class*="primary"] {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary:hover,
button[class*="primary"]:hover {
  background-color: #2563eb;
}

.btn-secondary,
button[class*="outline"],
button[class*="secondary"] {
  background-color: white;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary:hover,
button[class*="outline"]:hover,
button[class*="secondary"]:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

/* ===== 카드 스타일 ===== */
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-content {
  padding: 20px;
}

/* ===== 필터 영역 ===== */
.filter-area {
  background-color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

/* ===== 필터 아이템 (라벨 + 입력 가로 배치) ===== */
.filter-item,
.form-group,
.search-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.filter-item label,
.form-group label,
.search-field label {
  white-space: nowrap;
  margin-bottom: 0;
  min-width: fit-content;
}

.filter-item input,
.filter-item select,
.form-group input,
.form-group select,
.search-field input,
.search-field select {
  width: auto;
  min-width: 150px;
  flex: 1;
}

/* ===== 입력 필드 ===== */
input, select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.15s;
}

input:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

label {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0;
}

/* ===== 진행률 바 ===== */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-bar-fill.success { background-color: #22c55e; }
.progress-bar-fill.warning { background-color: #eab308; }
.progress-bar-fill.danger { background-color: #ef4444; }

/* ===== 배지 스타일 ===== */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.badge-blue { background-color: #dbeafe; color: #1e40af; }
.badge-green { background-color: #dcfce7; color: #166534; }
.badge-yellow { background-color: #fef9c3; color: #854d0e; }
.badge-red { background-color: #fee2e2; color: #991b1b; }

/* ===== 레이아웃 유틸리티 ===== */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.p-4 { padding: 16px; }
.mb-4 { margin-bottom: 16px; }
.text-right { text-align: right; }
.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
`,
  };

  // AG Grid 사용 시 추가 설정
  const dependencies: Record<string, string> = {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
  };

  if (hasAgGrid) {
    dependencies["ag-grid-react"] = "^31.0.0";
    dependencies["ag-grid-community"] = "^31.0.0";
    
    // AG Grid 스타일 import 추가
    files["/index.js"] = `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`;
  } else {
    files["/index.js"] = `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`;
  }

  return { files, dependencies };
}

// 새로고침 버튼 컴포넌트
function RefreshButton() {
  const { sandpack } = useSandpack();
  
  return (
    <button
      onClick={() => sandpack.runSandpack()}
      className="p-1.5 hover:bg-[#e0e0e0] rounded transition-colors"
      title="새로고침"
    >
      <RefreshCw className="h-4 w-4" />
    </button>
  );
}

export default function SandpackPreview({ 
  code, 
  className,
  showEditor: initialShowEditor = true  // 기본적으로 에디터 표시
}: SandpackPreviewProps) {
  const [showEditor, setShowEditor] = useState(initialShowEditor);
  const [showConsole, setShowConsole] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("flex items-center justify-center bg-[#f4f4f4]", className)}>
        <div className="text-[#8d8d8d]">로딩 중...</div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className={cn("flex items-center justify-center bg-[#f4f4f4]", className)}>
        <div className="text-center text-[#8d8d8d]">
          <Eye className="h-12 w-12 mx-auto mb-2 opacity-30" />
          <p>미리보기할 코드가 없습니다</p>
        </div>
      </div>
    );
  }

  console.log("[SandpackPreview] code prop 길이:", code.length);
  
  const { files, dependencies } = generateSandpackFiles(code);
  
  // 코드 변경 시 Sandpack이 다시 마운트되도록 key 생성
  const sandpackKey = `sandpack-${code.length}-${code.substring(0, 50).replace(/\s/g, "")}`;

  return (
    <div 
      className={cn(
        "flex flex-col bg-white w-full h-full",
        isFullscreen && "fixed inset-0 z-50",
        className
      )}
      style={{ 
        height: isFullscreen ? '100vh' : '100%',
        minHeight: isFullscreen ? undefined : '400px',
      }}
    >
      {/* 툴바 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#e0e0e0] bg-[#f4f4f4] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#161616]">실시간 미리보기</span>
          <span className="text-xs text-[#525252] bg-[#e0e0e0] px-2 py-0.5 rounded">
            AG Grid
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowEditor(!showEditor)}
            className={cn(
              "p-1.5 rounded transition-colors",
              showEditor ? "bg-[#0f62fe] text-white" : "hover:bg-[#e0e0e0]"
            )}
            title={showEditor ? "코드 숨기기" : "코드 보기"}
          >
            <Code2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={cn(
              "p-1.5 rounded transition-colors",
              showConsole ? "bg-[#da1e28] text-white" : "hover:bg-[#e0e0e0]"
            )}
            title={showConsole ? "콘솔 숨기기" : "콘솔 보기"}
          >
            <Terminal className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-[#e0e0e0] rounded transition-colors"
            title={isFullscreen ? "전체화면 해제" : "전체화면"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Sandpack - 메인 영역 */}
      <div className="flex-1 min-h-0 overflow-auto relative">
        <SandpackProvider
          key={sandpackKey}
          template="react"
          files={files}
          customSetup={{
            dependencies,
          }}
          options={{
            externalResources: [
              "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap",
            ],
          }}
          theme={{
            colors: {
              surface1: "#f4f4f4",
              surface2: "#e0e0e0",
              surface3: "#c6c6c6",
              clickable: "#525252",
              base: "#161616",
              disabled: "#8d8d8d",
              hover: "#e0e0e0",
              accent: "#0f62fe",
              error: "#da1e28",
              errorSurface: "#fff1f1",
            },
            font: {
              body: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              mono: "'IBM Plex Mono', Consolas, monospace",
              size: "13px",
              lineHeight: "20px",
            },
          }}
          // Provider 자체가 높이를 100% 차지하도록 스타일 지정
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column' 
          }}
        >
          <SandpackLayout
            // Layout도 높이 100% 및 flex 상속
            style={{ 
              flex: 1, 
              height: '100%', 
              minHeight: 0, 
              border: 'none', 
              borderRadius: 0,
              display: 'flex',
              overflow: 'auto'  // 스크롤 추가
            }}
          >
            {showEditor && (
              <SandpackCodeEditor
                showTabs
                showLineNumbers
                showInlineErrors
                wrapContent
                style={{ 
                  height: "100%",
                  minWidth: "400px",
                  overflow: "auto",  // 코드 에디터 스크롤
                }}
              />
            )}
            {/* PreviewPane 스타일 강제 */}
            <SandpackPreviewPane
              showOpenInCodeSandbox={false}
              showRefreshButton={true}
              style={{ 
                flex: 1, 
                height: '100%', 
                minHeight: 0,
                overflow: 'auto'  // 미리보기 스크롤
              }}
            />
            {showConsole && (
              <SandpackConsole
                style={{
                  height: "150px",
                  minHeight: "150px",
                }}
                showHeader
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

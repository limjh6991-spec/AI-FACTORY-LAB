/**
 * AI 생성 코드 자동 검증 및 수정 유틸리티
 * 
 * 목적: Claude API가 생성한 코드의 일반적인 구문 오류를 자동으로 감지하고 수정
 */

import * as fs from 'fs';
import * as ts from 'typescript';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  fixedCode?: string;
  appliedFixes: string[];
}

/**
 * 일반적인 AI 생성 코드 오류 패턴
 */
const COMMON_ERROR_PATTERNS = [
  {
    name: 'createTRPCRouter 괄호 누락',
    pattern: /createTRPCRouter\s*\{/g,
    fix: 'createTRPCRouter({',
    description: 'createTRPCRouter { → createTRPCRouter({'
  },
  {
    name: 'createTRPCRouter 닫는 괄호 누락',
    pattern: /\}\);(\s*)$/,
    checkReverse: /createTRPCRouter\(\{[\s\S]*\}\);$/,
    fix: '});',
    description: '}); 형식 확인'
  },
  {
    name: 'export default 누락',
    pattern: /^const\s+\w+Router\s*=/m,
    checkNegative: /^export\s+(const|default)/m,
    fix: 'export ',
    description: 'export 키워드 추가'
  },
  {
    name: 'async 함수 괄호 오류',
    pattern: /async\s*\(\s*\{\s*ctx\s*,\s*input\s*\}\s*\)\s*=>\s*\{/g,
    valid: true, // 이 패턴은 올바름
    description: 'async ({ ctx, input }) => { 형식 확인'
  },
  {
    name: 'import 문 세미콜론 누락',
    pattern: /^import\s+.*[^;]$/gm,
    fix: ';',
    description: 'import 문 끝에 세미콜론 추가'
  }
];

/**
 * TypeScript 구문 검증
 */
function validateTypeScript(code: string): { valid: boolean; errors: ts.Diagnostic[] } {
  const sourceFile = ts.createSourceFile(
    'temp.ts',
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  // 기본 구문 오류 확인
  const errors: ts.Diagnostic[] = [];
  
  // 간단한 구문 검증 (괄호 매칭 등)
  let braceCount = 0;
  let parenCount = 0;
  let bracketCount = 0;
  
  for (const char of code) {
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (char === '[') bracketCount++;
    if (char === ']') bracketCount--;
  }

  if (braceCount !== 0) {
    errors.push({
      messageText: `중괄호 불일치: ${braceCount > 0 ? '여는 괄호' : '닫는 괄호'} ${Math.abs(braceCount)}개 초과`,
      category: ts.DiagnosticCategory.Error,
      code: 1001,
      file: sourceFile,
      start: 0,
      length: 0
    });
  }

  if (parenCount !== 0) {
    errors.push({
      messageText: `소괄호 불일치: ${parenCount > 0 ? '여는 괄호' : '닫는 괄호'} ${Math.abs(parenCount)}개 초과`,
      category: ts.DiagnosticCategory.Error,
      code: 1002,
      file: sourceFile,
      start: 0,
      length: 0
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * tRPC 라우터 코드 자동 수정
 */
function fixTRPCRouterCode(code: string): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    appliedFixes: []
  };

  let fixedCode = code;

  // 1. createTRPCRouter 괄호 누락 수정
  if (/createTRPCRouter\s*\{/.test(fixedCode)) {
    fixedCode = fixedCode.replace(/createTRPCRouter\s*\{/g, 'createTRPCRouter({');
    result.appliedFixes.push('createTRPCRouter({ 괄호 추가');
  }

  // 2. 마지막 }); 확인 및 수정
  const routerMatch = fixedCode.match(/createTRPCRouter\(\{/);
  if (routerMatch) {
    // createTRPCRouter({ 가 있으면 }); 로 끝나야 함
    if (!fixedCode.trim().endsWith('});')) {
      if (fixedCode.trim().endsWith('}')) {
        fixedCode = fixedCode.trim() + ');';
        result.appliedFixes.push('닫는 괄호 ); 추가');
      }
    }
  }

  // 3. TypeScript 구문 검증
  const tsValidation = validateTypeScript(fixedCode);
  if (!tsValidation.valid) {
    result.isValid = false;
    result.errors = tsValidation.errors.map(e => 
      typeof e.messageText === 'string' ? e.messageText : 'TypeScript 오류'
    );
  }

  result.fixedCode = fixedCode;
  return result;
}

/**
 * AI 생성 코드 검증 및 자동 수정 메인 함수
 */
export async function validateAndFixGeneratedCode(
  code: string,
  codeType: 'trpc-router' | 'react-component' | 'sql'
): Promise<ValidationResult> {
  
  switch (codeType) {
    case 'trpc-router':
      return fixTRPCRouterCode(code);
    
    case 'react-component':
      // React 컴포넌트 검증 로직 (추후 구현)
      return { isValid: true, errors: [], appliedFixes: [] };
    
    case 'sql':
      // SQL 검증 로직 (추후 구현)
      return { isValid: true, errors: [], appliedFixes: [] };
    
    default:
      return { isValid: true, errors: [], appliedFixes: [] };
  }
}

/**
 * 파일에서 코드 검증 및 수정
 */
export async function validateAndFixFile(
  filePath: string,
  codeType: 'trpc-router' | 'react-component' | 'sql'
): Promise<ValidationResult> {
  
  const code = fs.readFileSync(filePath, 'utf-8');
  const result = await validateAndFixGeneratedCode(code, codeType);
  
  if (result.fixedCode && result.appliedFixes.length > 0) {
    // 백업 생성
    fs.writeFileSync(`${filePath}.backup`, code, 'utf-8');
    
    // 수정된 코드 저장
    fs.writeFileSync(filePath, result.fixedCode, 'utf-8');
    
    console.log(`✅ 파일 수정 완료: ${filePath}`);
    console.log(`   적용된 수정사항:`);
    result.appliedFixes.forEach(fix => console.log(`   - ${fix}`));
  }
  
  return result;
}

// CLI 실행
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('사용법: npx tsx scripts/validate_generated_code.ts <파일경로> <코드타입>');
    console.log('코드타입: trpc-router, react-component, sql');
    process.exit(1);
  }

  const [filePath, codeType] = args;
  
  if (!filePath) {
    console.error('❌ 파일 경로가 필요합니다.');
    process.exit(1);
  }
  
  validateAndFixFile(filePath, (codeType as 'trpc-router' | 'react-component' | 'sql') || 'trpc-router')
    .then(result => {
      if (result.isValid) {
        console.log('✅ 검증 통과');
      } else {
        console.log('❌ 오류 발견:');
        result.errors.forEach(err => console.log(`   - ${err}`));
      }
    })
    .catch(console.error);
}

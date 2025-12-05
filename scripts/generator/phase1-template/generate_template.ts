/**
 * Phase 1: 템플릿 빈 화면 생성
 * 
 * Excel 시트 분석 → AG Grid 템플릿 화면 생성 (데이터 없음)
 * 
 * 사용법:
 *   npx tsx scripts/generator/phase1-template/generate_template.ts "시트명"
 */

import dotenv from 'dotenv';
dotenv.config({ override: true });

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import XLSX from 'xlsx';

// ============================================================================
// 설정
// ============================================================================

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY?.trim();
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const EXCEL_FILE = 'data/sample_excel/원가시스템 폼.ver7.xlsx';
const OUTPUT_DIR = path.join(process.cwd(), 'src/app/screens');
const DEFINITION_DIR = path.join(process.cwd(), 'data/screen_definitions');

// ============================================================================
// 타입 정의
// ============================================================================

interface SheetAnalysis {
  sheetName: string;
  sourceTables: string[];
  description: string;
  headers: string[];
  columnCount: number;
  rowCount: number;
  fixedColumns: number;
  dynamicColumns: string[];
}

interface ScreenDefinition {
  screenId: string;
  screenName: string;
  sheetName: string;
  sourceTables: string[];
  description: string;
  columns: ColumnDef[];
  searchFields: SearchField[];
  generatedAt: string;
}

interface ColumnDef {
  field: string;
  headerName: string;
  width: number;
  pinned?: 'left' | 'right';
  type?: 'string' | 'number';
}

interface SearchField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'month-picker';
  required?: boolean;
}

// ============================================================================
// 엑셀 시트 분석
// ============================================================================

function analyzeSheet(sheetName: string): SheetAnalysis {
  console.log(`\n📊 시트 분석: ${sheetName}`);
  
  const workbook = XLSX.readFile(EXCEL_FILE);
  const sheet = workbook.Sheets[sheetName];
  
  if (!sheet) {
    throw new Error(`시트를 찾을 수 없습니다: ${sheetName}`);
  }
  
  const data: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  
  // 1행: 소스 테이블
  const sourceTables = (data[0] || [])
    .filter((cell: any) => cell && typeof cell === 'string')
    .map((cell: string) => cell.trim());
  
  // 2행: 설명
  const description = (data[1] || [])
    .filter((cell: any) => cell)
    .join(' ')
    .trim();
  
  // 3행: 헤더
  const headers = (data[2] || []).filter((cell: any) => cell);
  
  // 고정 컬럼 수 파악 (설명에서 추출)
  const fixedMatch = description.match(/(\d+)열[은는]?\s*고정/);
  const fixedColumns = fixedMatch ? parseInt(fixedMatch[1]) : 3;
  
  // 동적 컬럼 (부서명 등)
  const dynamicColumns = headers.slice(fixedColumns);
  
  const analysis: SheetAnalysis = {
    sheetName,
    sourceTables,
    description,
    headers,
    columnCount: headers.length,
    rowCount: data.length,
    fixedColumns,
    dynamicColumns
  };
  
  console.log(`  ✅ 소스 테이블: ${sourceTables.join(', ')}`);
  console.log(`  ✅ 헤더 컬럼: ${headers.length}개`);
  console.log(`  ✅ 고정 컬럼: ${fixedColumns}개`);
  console.log(`  ✅ 동적 컬럼: ${dynamicColumns.length}개`);
  
  return analysis;
}

// ============================================================================
// 화면 정의 생성
// ============================================================================

function generateScreenDefinition(analysis: SheetAnalysis): ScreenDefinition {
  const screenId = `SC${Date.now().toString().slice(-6)}`;
  
  // 컬럼 정의 생성
  const columns: ColumnDef[] = analysis.headers.map((header, index) => {
    const isFixed = index < analysis.fixedColumns;
    const isNumeric = ['계획', '합계', '금액', '수량', '비용'].some(k => header.includes(k)) || 
                      index >= analysis.fixedColumns;
    
    return {
      field: `col_${index}`,
      headerName: header,
      width: isFixed ? 150 : 100,
      pinned: index === 0 ? 'left' : undefined,
      type: isNumeric ? 'number' : 'string'
    };
  });
  
  // 검색 필드 생성
  const searchFields: SearchField[] = [
    { id: 'yearMonth', label: '기준년월', type: 'month-picker', required: true },
    { id: 'site', label: '사업장', type: 'select' },
  ];
  
  return {
    screenId,
    screenName: analysis.sheetName.replace(/^\d+-?\d*\.\s*/, ''),
    sheetName: analysis.sheetName,
    sourceTables: analysis.sourceTables,
    description: analysis.description,
    columns,
    searchFields,
    generatedAt: new Date().toISOString()
  };
}

// ============================================================================
// Claude API로 템플릿 화면 생성
// ============================================================================

async function generateTemplateScreen(definition: ScreenDefinition): Promise<string> {
  console.log('\n🤖 Claude API로 템플릿 화면 생성 중...');
  
  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });
  
  const prompt = `당신은 Next.js + TypeScript + AG Grid 전문가입니다.

**작업**: 데이터 없는 빈 템플릿 AG Grid 화면을 생성하세요.

**화면 정의**:
- 화면ID: ${definition.screenId}
- 화면명: ${definition.screenName}
- 소스 테이블: ${definition.sourceTables.join(', ')}
- 설명: ${definition.description}

**컬럼 정의**:
${JSON.stringify(definition.columns, null, 2)}

**검색 필드**:
${JSON.stringify(definition.searchFields, null, 2)}

**필수 요구사항**:

1. **AG Grid Community 설정**:
\`\`\`typescript
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
\`\`\`

2. **데이터는 빈 배열로 설정** (Phase 3에서 주입):
\`\`\`typescript
const [rowData, setRowData] = useState<any[]>([]);
\`\`\`

3. **로딩 상태 관리**:
\`\`\`typescript
const [loading, setLoading] = useState(false);
\`\`\`

4. **조회 함수 스켈레톤** (Phase 3에서 구현):
\`\`\`typescript
const handleSearch = async () => {
  setLoading(true);
  try {
    // TODO: Phase 3에서 API 호출 구현
    console.log('조회 조건:', { yearMonth, site });
  } finally {
    setLoading(false);
  }
};
\`\`\`

5. **Select 컴포넌트 규칙**:
- value=""는 사용 금지
- value="all"로 전체 선택 구현
- onValueChange에서 "all" → "" 변환

6. **cellStyle 반환값**:
- 빈 객체 {} 대신 null 반환

7. **스타일**:
- Corporate Professional 스타일 적용
- 헤더: #1e40af (부드러운 파랑)

8. **컴포넌트**:
- Card, CardHeader, CardTitle, CardContent
- Button, Input, Label, Select (shadcn/ui)
- Search, Download, RefreshCw 아이콘 (lucide-react)

**출력**: 완전한 page.tsx 코드만 출력하세요. 설명 없이 코드만.`;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }]
  });
  
  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('텍스트 응답이 아닙니다');
  }
  
  // 코드 블록 추출
  let code = content.text;
  const codeMatch = code.match(/```(?:tsx?|typescript|javascript)?\s*([\s\S]*?)```/);
  if (codeMatch) {
    code = codeMatch[1].trim();
  }
  
  console.log(`  ✅ 템플릿 생성 완료 (${code.length}자)`);
  return code;
}

// ============================================================================
// 메인 실행
// ============================================================================

async function main() {
  const sheetName = process.argv[2] || '8-1. 판매관리비 집계표(부서별)';
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  Phase 1: 템플릿 빈 화면 생성');
  console.log('═══════════════════════════════════════════════════════════');
  
  if (!CLAUDE_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY가 설정되지 않았습니다.');
    process.exit(1);
  }
  
  try {
    // 1. 시트 분석
    const analysis = analyzeSheet(sheetName);
    
    // 2. 화면 정의 생성
    const definition = generateScreenDefinition(analysis);
    
    // 3. 정의 파일 저장
    if (!fs.existsSync(DEFINITION_DIR)) {
      fs.mkdirSync(DEFINITION_DIR, { recursive: true });
    }
    const defPath = path.join(DEFINITION_DIR, `${definition.screenId}_definition.json`);
    fs.writeFileSync(defPath, JSON.stringify(definition, null, 2));
    console.log(`\n📁 정의 파일 저장: ${defPath}`);
    
    // 4. 템플릿 화면 생성
    const templateCode = await generateTemplateScreen(definition);
    
    // 5. 화면 파일 저장
    const screenDir = path.join(OUTPUT_DIR, definition.screenId.toLowerCase());
    if (!fs.existsSync(screenDir)) {
      fs.mkdirSync(screenDir, { recursive: true });
    }
    const screenPath = path.join(screenDir, 'page.tsx');
    fs.writeFileSync(screenPath, templateCode);
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('  ✅ Phase 1 완료!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  📁 정의 파일: ${defPath}`);
    console.log(`  📁 화면 파일: ${screenPath}`);
    console.log(`  🔗 URL: /screens/${definition.screenId.toLowerCase()}`);
    console.log(`\n  📌 다음 단계: Phase 2 - 쿼리 생성`);
    console.log(`     npx tsx scripts/generator/phase2-query/generate_query.ts ${definition.screenId}`);
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  }
}

main();

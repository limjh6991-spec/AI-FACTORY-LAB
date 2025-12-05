/**
 * Phase 3: 화면 통합 (템플릿 + 쿼리)
 * 
 * Phase 1 템플릿 화면 + Phase 2 쿼리 → 완성된 화면
 * 
 * 사용법:
 *   npx tsx scripts/generator/phase3-integration/integrate_screen.ts SC123456
 */

import dotenv from 'dotenv';
dotenv.config({ override: true });

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// 설정
// ============================================================================

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY?.trim();
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const DEFINITION_DIR = path.join(process.cwd(), 'data/screen_definitions');
const QUERY_DIR = path.join(process.cwd(), 'data/generated_queries');
const SCREEN_DIR = path.join(process.cwd(), 'src/app/screens');
const API_DIR = path.join(process.cwd(), 'src/server/api/routers');

// ============================================================================
// 타입 정의
// ============================================================================

interface ScreenDefinition {
  screenId: string;
  screenName: string;
  sheetName: string;
  sourceTables: string[];
  description: string;
  columns: any[];
  searchFields: any[];
  generatedAt: string;
}

interface GeneratedQuery {
  screenId: string;
  screenName: string;
  sourceTables: string[];
  query: string;
  queryType: string;
  parameters: QueryParameter[];
  resultColumns: ResultColumn[];
  generatedAt: string;
}

interface QueryParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ResultColumn {
  field: string;
  alias: string;
  type: string;
}

// ============================================================================
// tRPC API 라우터 생성
// ============================================================================

function generateApiRouter(screenId: string, query: GeneratedQuery): string {
  const routerName = screenId.toLowerCase();
  
  return `/**
 * ${query.screenName} API Router
 * Generated: ${new Date().toISOString()}
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '../../db';

// 조회 파라미터 스키마
const searchParamsSchema = z.object({
${query.parameters.map(p => `  ${p.name}: z.string()${p.required ? '' : '.optional()'},  // ${p.description}`).join('\n')}
});

export const ${routerName}Router = createTRPCRouter({
  // 데이터 조회
  getData: publicProcedure
    .input(searchParamsSchema)
    .query(async ({ input }) => {
      const { ${query.parameters.map(p => p.name).join(', ')} } = input;
      
      try {
        // 동적 쿼리 생성
        const result = await db.$queryRawUnsafe(\`
${query.query.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}
        \`, ${query.parameters.filter(p => p.required).map(p => p.name).join(', ')});
        
        return {
          success: true,
          data: result as any[],
          count: (result as any[]).length
        };
      } catch (error) {
        console.error('쿼리 실행 오류:', error);
        throw new Error('데이터 조회 중 오류가 발생했습니다.');
      }
    }),

  // 부서 목록 조회 (동적 컬럼용)
  getDepartments: publicProcedure
    .input(z.object({ yearMonth: z.string() }))
    .query(async ({ input }) => {
      const result = await db.$queryRaw\`
        SELECT DISTINCT DEPT, DEPT_NAME 
        FROM doi_dept 
        WHERE "YYYYMM" = \${input.yearMonth}
        ORDER BY DEPT
      \`;
      return result;
    }),
});
`;
}

// ============================================================================
// Claude API로 화면 통합
// ============================================================================

async function integrateScreen(
  definition: ScreenDefinition,
  query: GeneratedQuery,
  templateCode: string
): Promise<string> {
  console.log('\n🤖 Claude API로 화면 통합 중...');
  
  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });
  
  const prompt = `당신은 Next.js + TypeScript + AG Grid + tRPC 전문가입니다.

**작업**: 템플릿 화면에 tRPC API 호출을 추가하여 완성된 화면을 만드세요.

**화면 정보**:
- 화면ID: ${definition.screenId}
- 화면명: ${definition.screenName}
- 쿼리 유형: ${query.queryType}

**기존 템플릿 코드**:
\`\`\`tsx
${templateCode}
\`\`\`

**생성된 쿼리 정보**:
- 파라미터: ${JSON.stringify(query.parameters)}
- 결과 컬럼: ${JSON.stringify(query.resultColumns)}

**수정 사항**:

1. **tRPC 훅 추가**:
\`\`\`typescript
import { api } from '@/trpc/react';

// 데이터 조회
const { data, isLoading, refetch } = api.${definition.screenId.toLowerCase()}.getData.useQuery(
  { yearMonth, site },
  { enabled: false }  // 수동 조회
);
\`\`\`

2. **조회 함수 구현**:
\`\`\`typescript
const handleSearch = async () => {
  setLoading(true);
  try {
    const result = await refetch();
    if (result.data?.success) {
      setRowData(result.data.data);
    }
  } finally {
    setLoading(false);
  }
};
\`\`\`

3. **로딩 상태 연동**:
\`\`\`typescript
useEffect(() => {
  setLoading(isLoading);
}, [isLoading]);
\`\`\`

4. **데이터 변환** (필요시):
- 쿼리 결과를 AG Grid 형식으로 변환
- 동적 컬럼 처리 (부서별 피벗 등)

5. **기존 규칙 유지**:
- AG Grid 모듈 등록
- Select value="all" 패턴
- cellStyle null 반환
- Corporate 스타일

**출력**: 수정된 완전한 page.tsx 코드만 출력하세요. 설명 없이 코드만.`;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 10000,
    messages: [{ role: 'user', content: prompt }]
  });
  
  const content = response.content[0];
  if (!content || content.type !== 'text') {
    throw new Error('텍스트 응답이 아닙니다');
  }
  
  // 코드 블록 추출
  let code = content.text;
  const codeMatch = code.match(/```(?:tsx?|typescript|javascript)?\s*([\s\S]*?)```/);
  if (codeMatch && codeMatch[1]) {
    code = codeMatch[1].trim();
  }
  
  console.log(`  ✅ 화면 통합 완료 (${code.length}자)`);
  return code;
}

// ============================================================================
// 메인 실행
// ============================================================================

async function main() {
  const screenId = process.argv[2];
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  Phase 3: 화면 통합 (템플릿 + 쿼리)');
  console.log('═══════════════════════════════════════════════════════════');
  
  if (!screenId) {
    console.error('❌ 사용법: npx tsx scripts/generator/phase3-integration/integrate_screen.ts <screenId>');
    process.exit(1);
  }
  
  if (!CLAUDE_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY가 설정되지 않았습니다.');
    process.exit(1);
  }
  
  try {
    // 1. 화면 정의 로드
    const defPath = path.join(DEFINITION_DIR, `${screenId}_definition.json`);
    if (!fs.existsSync(defPath)) {
      console.error(`❌ 화면 정의 파일을 찾을 수 없습니다: ${defPath}`);
      process.exit(1);
    }
    const definition: ScreenDefinition = JSON.parse(fs.readFileSync(defPath, 'utf8'));
    console.log(`\n📖 화면 정의 로드: ${definition.screenName}`);
    
    // 2. 쿼리 정의 로드
    const queryPath = path.join(QUERY_DIR, `${screenId}_query.json`);
    if (!fs.existsSync(queryPath)) {
      console.error(`❌ 쿼리 파일을 찾을 수 없습니다: ${queryPath}`);
      console.error(`   Phase 2를 먼저 실행하세요.`);
      process.exit(1);
    }
    const query: GeneratedQuery = JSON.parse(fs.readFileSync(queryPath, 'utf8'));
    console.log(`📊 쿼리 로드: ${query.queryType}`);
    
    // 3. 기존 템플릿 코드 로드
    const screenPath = path.join(SCREEN_DIR, screenId.toLowerCase(), 'page.tsx');
    if (!fs.existsSync(screenPath)) {
      console.error(`❌ 템플릿 화면을 찾을 수 없습니다: ${screenPath}`);
      console.error(`   Phase 1을 먼저 실행하세요.`);
      process.exit(1);
    }
    const templateCode = fs.readFileSync(screenPath, 'utf8');
    console.log(`📁 템플릿 로드: ${templateCode.length}자`);
    
    // 4. API 라우터 생성
    const apiCode = generateApiRouter(screenId, query);
    const apiPath = path.join(API_DIR, `${screenId.toLowerCase()}.ts`);
    fs.writeFileSync(apiPath, apiCode);
    console.log(`\n📁 API 라우터 생성: ${apiPath}`);
    
    // 5. 화면 통합
    const integratedCode = await integrateScreen(definition, query, templateCode);
    
    // 6. 통합된 화면 저장
    fs.writeFileSync(screenPath, integratedCode);
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('  ✅ Phase 3 완료! 화면 생성 완료!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  📁 화면: ${screenPath}`);
    console.log(`  📁 API: ${apiPath}`);
    console.log(`  🔗 URL: /screens/${screenId.toLowerCase()}`);
    console.log(`\n  📌 다음 단계:`);
    console.log(`     1. API 라우터를 src/server/api/root.ts에 등록`);
    console.log(`     2. npm run dev로 서버 실행`);
    console.log(`     3. 브라우저에서 화면 확인`);
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  }
}

main();

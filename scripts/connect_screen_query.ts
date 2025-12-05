/**
 * SC982157 화면-쿼리 연결 스크립트
 * Claude API에게 tRPC 라우터 생성 및 페이지 수정 요청
 * 자동 검증 기능 포함 (v2)
 */

import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { validateAndFixGeneratedCode, type ValidationResult } from './validate_generated_code';

dotenv.config({ override: true });

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY?.trim();
if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY 필요');

async function main() {
  console.log('='.repeat(70));
  console.log('🔗 SC982157 화면-쿼리 연결 생성');
  console.log('='.repeat(70));

  // 1. 필요한 파일들 로드
  const screenDefPath = path.join(process.cwd(), 'data/screen_definitions/SC982157_definition.json');
  const sqlPath = path.join(process.cwd(), 'data/generated_queries/SC982157_query_v2.sql');
  const pagePath = path.join(process.cwd(), 'src/app/screens/sc982157/page.tsx');
  const productRouterPath = path.join(process.cwd(), 'src/server/api/routers/product.ts');

  const screenDef = JSON.parse(fs.readFileSync(screenDefPath, 'utf-8'));
  const sqlQuery = fs.readFileSync(sqlPath, 'utf-8');
  const pageCode = fs.readFileSync(pagePath, 'utf-8');
  const productRouter = fs.readFileSync(productRouterPath, 'utf-8');

  console.log('\n📄 로드된 파일:');
  console.log(`   - 화면 정의: ${screenDefPath}`);
  console.log(`   - SQL 쿼리: ${sqlPath}`);
  console.log(`   - 페이지 컴포넌트: ${pagePath}`);
  console.log(`   - 참고 라우터: ${productRouterPath}`);

  // 2. Claude API 호출
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const systemPrompt = `당신은 Next.js + tRPC + Prisma 전문가입니다.
화면 정의, SQL 쿼리, 기존 페이지 코드를 분석하여 연결 코드를 생성합니다.

**기술 스택**:
- Next.js 15 (App Router)
- tRPC v11
- Prisma (raw query 사용: $queryRawUnsafe)
- PostgreSQL
- TypeScript

**규칙**:
1. tRPC 라우터는 기존 product.ts 패턴을 따름
2. Prisma raw query로 SQL 실행
3. 파라미터는 zod로 검증
4. 페이지에서 api.screen982157.getData.useQuery() 호출`;

  const userPrompt = `# 화면-쿼리 연결 코드 생성 요청

## 1. 화면 정의 (JSON)
\`\`\`json
${JSON.stringify(screenDef, null, 2)}
\`\`\`

## 2. SQL 쿼리
\`\`\`sql
${sqlQuery}
\`\`\`

## 3. 현재 페이지 코드 (일부)
\`\`\`tsx
${pageCode.substring(0, 2000)}
...
\`\`\`

## 4. 참고: 기존 tRPC 라우터 패턴
\`\`\`typescript
${productRouter.substring(0, 1500)}
\`\`\`

---

## 요청사항

### Task 1: tRPC 라우터 생성
파일: \`src/server/api/routers/screen982157.ts\`

요구사항:
- screenRouter 이름 사용
- getData 프로시저 생성
- input: { yearMonth: string, site?: string }
- Prisma $queryRawUnsafe로 SQL 실행
- SQL의 :yearMonth, :site를 파라미터로 치환

### Task 2: 페이지 수정 (handleSearch 함수)
파일: \`src/app/screens/sc982157/page.tsx\`

요구사항:
- api.screen982157.getData.useQuery() 사용
- 검색 버튼 클릭 시 refetch
- 결과를 rowData에 설정
- SQL 컬럼명과 그리드 field 매핑

### Task 3: root.ts 수정 내용
screen982157Router 추가 방법

---

## 출력 형식 (JSON)

\`\`\`json
{
  "router": {
    "path": "src/server/api/routers/screen982157.ts",
    "code": "... 전체 라우터 코드 ..."
  },
  "pageModifications": {
    "path": "src/app/screens/sc982157/page.tsx",
    "imports": "... 추가할 import 문 ...",
    "hooks": "... 추가/수정할 hooks 코드 ...",
    "handleSearch": "... 수정된 handleSearch 함수 ..."
  },
  "rootModification": {
    "import": "import { screen982157Router } from ...",
    "router": "screen982157: screen982157Router"
  }
}
\`\`\``;

  console.log('\n🤖 Claude API 호출 중...');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  });

  const content = response.content[0];
  if (!content || content.type !== 'text') {
    throw new Error('Claude 응답 오류');
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 Claude 응답');
  console.log('='.repeat(70));
  console.log(content.text);

  // JSON 추출
  const jsonMatch = content.text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      const result = JSON.parse(jsonMatch[1]);
      
      // 결과 저장
      const outputPath = path.join(process.cwd(), 'data/generated_queries/SC982157_connection.json');
      fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
      console.log(`\n✅ 연결 코드 저장: ${outputPath}`);

      // 라우터 파일 자동 생성 (검증 포함)
      if (result.router?.code) {
        let routerCode = result.router.code;
        
        // 🔍 자동 검증 및 수정 실행
        console.log('\n🔍 AI 생성 코드 자동 검증 시작...');
        const validationResult: ValidationResult = await validateAndFixGeneratedCode(routerCode, 'trpc-router');
        
        if (!validationResult.isValid || validationResult.appliedFixes.length > 0) {
          console.log('\n' + '⚠️'.repeat(35));
          console.log('📋 코드 검증 결과');
          console.log('⚠️'.repeat(35));
          
          if (validationResult.errors.length > 0) {
            console.log('\n❌ 발견된 오류:');
            validationResult.errors.forEach((err, i) => console.log(`   ${i + 1}. ${err}`));
          }
          
          if (validationResult.appliedFixes.length > 0) {
            console.log('\n✅ 자동 수정 적용:');
            validationResult.appliedFixes.forEach((fix, i) => console.log(`   ${i + 1}. ${fix}`));
            routerCode = validationResult.fixedCode!;
          }
        } else {
          console.log('✅ 코드 검증 통과 - 오류 없음');
        }
        
        // 검증/수정된 코드 저장
        const routerPath = path.join(process.cwd(), result.router.path);
        fs.writeFileSync(routerPath, routerCode, 'utf-8');
        console.log(`\n✅ 라우터 생성: ${routerPath}`);
        
        // 검증 결과 로그 저장
        const logPath = path.join(process.cwd(), 'data/generated_queries/validation_log.json');
        const logEntry = {
          timestamp: new Date().toISOString(),
          file: result.router.path,
          validationResult: {
            isValid: validationResult.isValid,
            errors: validationResult.errors,
            appliedFixes: validationResult.appliedFixes
          }
        };
        
        let logs = [];
        if (fs.existsSync(logPath)) {
          try {
            logs = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
          } catch {}
        }
        logs.push(logEntry);
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2), 'utf-8');
        console.log(`📝 검증 로그 저장: ${logPath}`);
      }

    } catch (e) {
      console.log('⚠️ JSON 파싱 실패, 수동 적용 필요');
      console.error(e);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('✅ 완료!');
  console.log('='.repeat(70));
}

main().catch(console.error);

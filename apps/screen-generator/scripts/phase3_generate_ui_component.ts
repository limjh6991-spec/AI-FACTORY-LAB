#!/usr/bin/env tsx
/**
 * Phase 3: UI 컴포넌트 생성 (Screen UI Generation)
 * 
 * 목적: 화면 정의 JSON을 읽어 실제 React/Vue 컴포넌트 생성
 * 입력: screen_definition.json
 * 출력: React 컴포넌트 (.tsx)
 * 
 * 특징:
 * - Claude API가 코드 생성
 * - TanStack Table 사용
 * - Recharts 차트 생성
 * - shadcn/ui 컴포넌트 활용
 * 
 * Created: 2025-12-04
 */

import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

// ============================================================================
// 설정
// ============================================================================

const CLAUDE_API_KEY = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)?.trim();
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

const DEFINITION_PATH = process.argv[2] || 'data/report_designs/SC002_definition.json';
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'app', 'screens');

// API 키 검증
if (!CLAUDE_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY 또는 CLAUDE_API_KEY 환경 변수가 설정되지 않았습니다');
  process.exit(1);
}

// ============================================================================
// 메인 함수
// ============================================================================

async function generateUIComponent(definitionPath: string) {
  console.log('🎨 Phase 3: UI 컴포넌트 생성 시작\n');
  console.log(`📖 정의 파일: ${definitionPath}`);

  // 화면 정의 읽기
  if (!fs.existsSync(definitionPath)) {
    console.error(`❌ 파일을 찾을 수 없습니다: ${definitionPath}`);
    process.exit(1);
  }

  const definition = JSON.parse(fs.readFileSync(definitionPath, 'utf-8'));
  console.log(`✅ 화면 정의 로드 완료: ${definition.screenId} - ${definition.screenName}`);
  console.log(`   - 컬럼: ${definition.columns.length}개`);
  console.log(`   - 필터: ${definition.filters.length}개`);
  console.log(`   - 차트: ${definition.charts.length}개`);

  // Claude API 호출
  console.log('\n🤖 Claude API 호출 중...');

  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });

  const prompt = `
당신은 Next.js + TypeScript + RealGrid2 전문가입니다.

**중요**: 
1. TanStack Table을 사용하지 마세요
2. RealGrid2 라이브러리를 사용하세요
3. 엑셀 시트는 2행 헤더 구조를 가지고 있습니다 (병합된 상위 헤더 + 하위 헤더)
4. RealGrid의 ColumnGroup 기능으로 2행 헤더를 구현하세요

다음 화면 정의(Screen Definition)를 바탕으로 **완전히 작동하는** React 컴포넌트를 생성하세요.

## 화면 정의

\`\`\`json
${JSON.stringify(definition, null, 2)}
\`\`\`

## 요구사항

### 1. 기술 스택
- **Framework**: Next.js 15 (App Router, 'use client')
- **Grid**: RealGrid2 (realgrid-react 패키지)
  - import { RealGridReact } from 'realgrid-react';
  - 2행 헤더: column groups 사용
- **Chart**: recharts
- **UI**: shadcn/ui (Card, Button, Input, Label, Select)
- **Icons**: lucide-react
- **TypeScript**: 엄격 모드

### 2. RealGrid2 2행 헤더 구조

엑셀 파일의 병합된 헤더 구조를 RealGrid2 ColumnGroup으로 구현하세요:

**엑셀 구조 예시 (SC002)**:
```
[상위 헤더]  기초 | 입고              | 출고수량          | 재고
[하위 헤더]  기초수량 | 입고수량 | 기타입고수량 | 출고수량 | 기타출고수량 | 재고수량
```

**RealGrid2 구현**:
\`\`\`typescript
import { useEffect, useRef } from 'react';
import { RealGridReact } from 'realgrid-react';

export default function SC002Screen() {
  const gridRef = useRef<any>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const gridView = gridRef.current.getInstance();
    const dataProvider = gridView.getDataProvider();

    // 1. 필드 정의
    const fields = [
      { fieldName: 'col1' },   // 구분
      { fieldName: 'col2' },   // 제품코드
      { fieldName: 'col8', dataType: 'number' },  // 기초수량
      { fieldName: 'col9', dataType: 'number' },  // 입고수량
      { fieldName: 'col10', dataType: 'number' }, // 기타입고수량
      { fieldName: 'col11', dataType: 'number' }, // 출고수량
      { fieldName: 'col12', dataType: 'number' }, // 기타출고수량
      { fieldName: 'col13', dataType: 'number' }  // 재고수량
    ];

    // 2. 컬럼 그룹 정의 (상위 헤더)
    const columnGroups = [
      { name: 'basicGroup', header: '기초', items: ['col8'] },
      { name: 'inGroup', header: '입고', items: ['col9', 'col10'] },
      { name: 'outGroup', header: '출고수량', items: ['col11', 'col12'] },
      { name: 'stockGroup', header: '재고', items: ['col13'] }
    ];

    // 3. 컬럼 정의 (하위 헤더)
    const columns = [
      { name: 'col1', fieldName: 'col1', header: '구분', width: 100 },
      { name: 'col2', fieldName: 'col2', header: '제품코드', width: 120 },
      { name: 'col8', fieldName: 'col8', header: '기초수량', width: 100, numberFormat: '#,##0' },
      { name: 'col9', fieldName: 'col9', header: '입고수량', width: 100, numberFormat: '#,##0' },
      { name: 'col10', fieldName: 'col10', header: '기타입고수량', width: 120, numberFormat: '#,##0' },
      { name: 'col11', fieldName: 'col11', header: '출고수량', width: 100, numberFormat: '#,##0' },
      { name: 'col12', fieldName: 'col12', header: '기타출고수량', width: 120, numberFormat: '#,##0' },
      { name: 'col13', fieldName: 'col13', header: '재고수량', width: 100, numberFormat: '#,##0' }
    ];

    // 4. 설정 적용
    dataProvider.setFields(fields);
    gridView.setColumnLayout(columns);
    gridView.setColumnGroups(columnGroups);  // 2행 헤더 적용

    // 5. 샘플 데이터
    const data = [
      { col1: '양산', col2: 'P001', col8: 200, col9: 500, col10: 50, col11: 450, col12: 30, col13: 270 }
    ];
    dataProvider.setRows(data);

  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent>
          <RealGridReact
            ref={gridRef}
            style={{ width: '100%', height: '600px' }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
\`\`\`

### 3. 컴포넌트 구조

- **필수**: \`import { RealGridReact } from 'realgrid-react';\`
- **필수**: \`useRef\`와 \`useEffect\`로 RealGrid 초기화
- **필수**: \`setColumnGroups()\` 메서드로 2행 헤더 적용
- 필터는 shadcn/ui 컴포넌트 사용
- 차트는 recharts 사용

- **text**: \`<Input type="text" />\`
- **select**: \`<Select><SelectItem>...</SelectItem></Select>\`
- **date**: \`<Input type="date" />\`
- **month-picker**: \`<Input type="month" />\`
- **date-range**: \`<Input type="date" />×2\` (시작일, 종료일)

### 4. 데이터 타입별 포맷

- **string**: 그대로 표시
- **number**: \`formatNumber()\` → "#,##0"
- **currency**: \`formatCurrency()\` → "₩#,##0"
- **percentage**: \`formatPercent()\` → "0.0%"
- **date**: \`formatDate()\` → "YYYY-MM-DD"

### 5. 차트 타입별 렌더링

- **bar**: \`<BarChart><Bar dataKey="..." /></BarChart>\`
- **line**: \`<LineChart><Line dataKey="..." /></LineChart>\`
- **pie**: \`<PieChart><Pie dataKey="..." /></PieChart>\`
- **area**: \`<AreaChart><Area dataKey="..." /></AreaChart>\`

### 6. RealGrid 2행 헤더 구현

엑셀 파일의 병합된 헤더 구조를 다음과 같이 구현하세요:

\`\`\`typescript
// 컬럼 그룹 정의 (상위 헤더)
const columnGroups = [
  { name: 'basic', header: '기초', items: ['beginQty'] },
  { name: 'in', header: '입고', items: ['inQty', 'inEtcQty'] },
  { name: 'out', header: '출고수량', items: ['outQty', 'outEtcQty'] },
  { name: 'stock', header: '재고', items: ['stockQty'] }
];

// 컬럼 정의 (하위 헤더)
const columns = [
  // 일반 컬럼 (그룹 없음)
  { name: 'division', header: '구분', width: 100 },
  { name: 'productCode', header: '제품코드', width: 120 },
  
  // 그룹화된 컬럼
  { name: 'beginQty', header: '기초수량', width: 100, type: 'number', groupName: 'basic' },
  { name: 'inQty', header: '입고수량', width: 100, type: 'number', groupName: 'in' },
  { name: 'inEtcQty', header: '기타입고수량', width: 120, type: 'number', groupName: 'in' }
];
\`\`\`

### 7. 샘플 데이터 생성 규칙

- **5개 행** 생성
- Excel 시트 내용을 참고하여 현실적인 데이터 작성
- 모든 컬럼에 값 포함
- 숫자는 다양한 범위 (0~10000)
- 문자열은 실제 코드/명칭 사용

## 출력 형식

**완전한 TypeScript React 컴포넌트 코드만 출력하세요.**
- import문부터 export문까지 모두 포함
- RealGrid 2행 헤더(columnGroup) 필수 적용
- 코드 마커 (\`\`\`tsx) 포함
- 설명이나 주석은 최소화

지금 시작하세요!
`;

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 8000,
      temperature: 0,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (!content || content.type !== 'text') {
      console.error('❌ Claude 응답 형식 오류');
      process.exit(1);
    }

    console.log(`✅ Claude 응답 수신 (${content.text.length}자)`);

    // 코드 추출
    let code = content.text.trim();
    const codeMatch = code.match(/```tsx\s*([\s\S]*?)\s*```/);
    if (codeMatch && codeMatch[1]) {
      code = codeMatch[1];
    } else {
      // tsx 마커가 없으면 전체를 코드로 간주
      console.log('⚠️  코드 블록 마커 없음, 전체를 코드로 처리');
    }

    // 출력 디렉토리 생성
    const screenDir = path.join(OUTPUT_DIR, definition.screenId.toLowerCase());
    if (!fs.existsSync(screenDir)) {
      fs.mkdirSync(screenDir, { recursive: true });
    }

    // 파일 저장
    const outputPath = path.join(screenDir, 'page.tsx');
    fs.writeFileSync(outputPath, code, 'utf-8');

    console.log(`\n💾 저장 완료: ${outputPath}`);
    console.log(`\n🎯 다음 단계:`);
    console.log(`   1. 브라우저에서 확인: http://localhost:3000/screens/${definition.screenId.toLowerCase()}`);
    console.log(`   2. 엑셀 파일과 비교 검증`);
    console.log(`   3. 필요시 수동 수정\n`);

  } catch (error: any) {
    console.error(`❌ API 호출 오류: ${error.message}`);
    process.exit(1);
  }
}

// ============================================================================
// 실행
// ============================================================================

if (!CLAUDE_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY가 설정되지 않았습니다.');
  process.exit(1);
}

generateUIComponent(DEFINITION_PATH).catch(console.error);

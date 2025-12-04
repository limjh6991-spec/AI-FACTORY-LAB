/**
 * Phase 3: UI 컴포넌트 생성
 * 
 * 화면 정의 파일(JSON)을 읽어서 Claude API를 통해
 * RealGrid2를 사용한 완전한 React 컴포넌트를 생성합니다.
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// 설정
// ============================================================================

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY?.trim();
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const DEFINITION_PATH = process.argv[2] || 'data/report_designs/SC002_definition.json';
const OUTPUT_DIR = path.join(process.cwd(), 'src/app/screens');

// ============================================================================
// 타입 정의
// ============================================================================

interface ScreenDefinition {
  screenId: string;
  screenName: string;
  description: string;
  excelSheet: string;
  columns: Array<{
    id: string;
    header: string;
    dataType: string;
  }>;
  filters: Array<{
    id: string;
    label: string;
    type: string;
  }>;
  charts: Array<{
    type: string;
    title: string;
  }>;
  layout: {
    filterPosition: string;
    chartPosition: string;
  };
}

// ============================================================================
// 메인 함수
// ============================================================================

async function generateUIComponent(definitionPath: string) {
  console.log('\n🎨 Phase 3: UI 컴포넌트 생성 시작\n');
  console.log(`📖 정의 파일: ${definitionPath}`);

  // 정의 파일 읽기
  const definitionContent = fs.readFileSync(definitionPath, 'utf-8');
  const definition: ScreenDefinition = JSON.parse(definitionContent);

  console.log(`✅ 화면 정의 로드 완료: ${definition.screenId} - ${definition.screenName}`);
  console.log(`   - 컬럼: ${definition.columns.length}개`);
  console.log(`   - 필터: ${definition.filters.length}개`);
  console.log(`   - 차트: ${definition.charts.length}개`);

  // Claude API 호출
  console.log('\n🤖 Claude API 호출 중...');

  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });

  const prompt = `당신은 Next.js + TypeScript + RealGrid2 전문가입니다.

**중요 지시사항**:
1. TanStack Table을 절대 사용하지 마세요
2. realgrid 라이브러리를 직접 사용하세요 (realgrid-react 아님!)
3. import { GridView, LocalDataProvider } from 'realgrid'; 형태로 import
4. useEffect에서 GridView와 LocalDataProvider를 생성
5. 엑셀 시트는 2행 헤더 구조를 가지고 있습니다
6. RealGrid의 setColumnLayout() 메서드로 2행 헤더를 반드시 구현하세요

다음 화면 정의를 바탕으로 완전히 작동하는 React 컴포넌트를 생성하세요.

## 화면 정의

${JSON.stringify(definition, null, 2)}

## 기술 스택

- Framework: Next.js 15 (App Router, 'use client')
- Grid: RealGrid 2.9.4 (import { GridView, LocalDataProvider } from 'realgrid')
- Chart: recharts
- UI: shadcn/ui (Card, Button, Input, Label, Select)
- Icons: lucide-react

## RealGrid 2행 헤더 구현 예시

\`\`\`typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SC002Screen() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<any>(null);
  const dataProviderRef = useRef<any>(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (!gridContainerRef.current) return;

    // 1. DataProvider와 GridView 생성
    const dataProvider = new LocalDataProvider(false);
    const gridView = new GridView(gridContainerRef.current);
    gridView.setDataSource(dataProvider);

    gridViewRef.current = gridView;
    dataProviderRef.current = dataProvider;

    // 2. 필드 정의
    const fields = [
      { fieldName: 'col1' },
      { fieldName: 'col2' },
      { fieldName: 'col8', dataType: 'number' },
      { fieldName: 'col9', dataType: 'number' }
    ];
    dataProvider.setFields(fields);

    // 3. 컬럼 레이아웃 정의 (2행 헤더 구조)
    const layout = [
      'col1',  // 구분 (그룹 없음)
      'col2',  // 제품코드 (그룹 없음)
      {
        name: 'basicGroup',
        direction: 'horizontal',
        items: ['col8'],
        header: { text: '기초' }
      },
      {
        name: 'inGroup',
        direction: 'horizontal',
        items: ['col9', 'col10'],
        header: { text: '입고' }
      },
      {
        name: 'outGroup',
        direction: 'horizontal',
        items: ['col11', 'col12'],
        header: { text: '출고수량' }
      },
      {
        name: 'stockGroup',
        direction: 'horizontal',
        items: ['col13'],
        header: { text: '재고' }
      }
    ];

    // 4. 컬럼 정의 (하위 헤더)
    const columns = [
      { name: 'col1', fieldName: 'col1', header: { text: '구분' }, width: 100 },
      { name: 'col2', fieldName: 'col2', header: { text: '제품코드' }, width: 120 },
      { name: 'col8', fieldName: 'col8', header: { text: '기초수량' }, width: 100, numberFormat: '#,##0' },
      { name: 'col9', fieldName: 'col9', header: { text: '입고수량' }, width: 100, numberFormat: '#,##0' }
    ];

    gridView.setColumns(columns);
    gridView.setColumnLayout(layout);  // ⭐ 2행 헤더 적용

    // 5. 샘플 데이터
    const data = [
      { col1: '양산', col2: 'P001', col8: 200, col9: 500 }
    ];
    dataProvider.setRows(data);

    // Cleanup
    return () => {
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>${definition.screenName}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 필터 영역 */}
          
          {/* RealGrid 영역 */}
          <div ref={gridContainerRef} style={{ width: '100%', height: '600px' }} />

          {/* 차트 영역 */}
        </CardContent>
      </Card>
    </div>
  );
}
\`\`\`

## 요구사항

1. 위 예시처럼 RealGrid2를 반드시 사용하세요
2. setColumnGroups()로 2행 헤더를 구현하세요
3. 화면 정의의 columns를 분석하여 적절히 그룹화하세요
4. 필터는 shadcn/ui 컴포넌트 사용
5. 차트는 recharts 사용
6. 5개의 현실적인 샘플 데이터 생성

## 출력 형식

완전한 TypeScript React 컴포넌트 코드만 출력하세요.
- import문부터 export문까지 모두 포함
- RealGrid2 필수 사용
- 코드 마커 포함 (tsx)
- 설명 최소화

지금 시작하세요!`;

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
    console.log(`   1. RealGrid2 라이센스 파일 확인`);
    console.log(`   2. 브라우저에서 확인: http://localhost:3000/screens/${definition.screenId.toLowerCase()}`);
    console.log(`   3. 엑셀 파일과 2행 헤더 비교 검증\n`);

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

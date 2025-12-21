/**
 * Phase 3: UI 컴포넌트 생성 (AG Grid 버전)
 * 
 * 화면 정의 파일(JSON)을 읽어서 Claude API를 통해
 * AG Grid를 사용한 완전한 React 컴포넌트를 생성합니다.
 */

import dotenv from 'dotenv';
dotenv.config({ override: true });  // 셸 환경 변수보다 .env 파일 우선

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
    group?: string;
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
// AG Grid 스타일 템플릿
// ============================================================================

const AG_GRID_STYLE_TEMPLATE = `
/* AG Grid Corporate Style - CSS Variables */
.ag-corporate-style {
  --ag-header-background-color: #1e40af;
  --ag-header-foreground-color: white;
  --ag-header-cell-hover-background-color: #2563eb;
  --ag-row-hover-color: #eff6ff;
  --ag-selected-row-background-color: #dbeafe;
  --ag-font-family: 'Pretendard', -apple-system, sans-serif;
  --ag-font-size: 14px;
  --ag-row-height: 42px;
  --ag-header-height: 45px;
}

.ag-corporate-style .ag-header-group-cell {
  background: linear-gradient(180deg, #1e40af 0%, #1d4ed8 100%);
  font-weight: 600;
}

.ag-corporate-style .ag-header-cell {
  background: linear-gradient(180deg, #2563eb 0%, #3b82f6 100%);
}

.ag-corporate-style .ag-cell {
  display: flex;
  align-items: center;
  border-right: 1px solid #e5e7eb;
}

.ag-corporate-style .ag-row {
  border-bottom: 1px solid #e5e7eb;
}

.ag-corporate-style .ag-row:hover {
  background-color: #eff6ff;
}

.ag-corporate-style .high-value {
  background-color: #dcfce7 !important;
  color: #166534;
  font-weight: 600;
}

.ag-corporate-style .total-column {
  background-color: #fef3c7 !important;
  font-weight: 700;
  color: #92400e;
}

.ag-corporate-style .total-row-style {
  background-color: #1e40af !important;
  color: white !important;
  font-weight: 700;
}
`;

// ============================================================================
// 메인 함수
// ============================================================================

async function generateUIComponent(definitionPath: string) {
  console.log('\n🎨 Phase 3: UI 컴포넌트 생성 시작 (AG Grid 버전)\n');
  console.log(`📖 정의 파일: ${definitionPath}`);

  // 정의 파일 읽기
  const definitionContent = fs.readFileSync(definitionPath, 'utf-8');
  const definition: ScreenDefinition = JSON.parse(definitionContent);

  console.log(`✅ 화면 정의 로드 완료: ${definition.screenId} - ${definition.screenName}`);
  console.log(`   - 컬럼: ${definition.columns.length}개`);
  console.log(`   - 필터: ${definition.filters?.length || 0}개`);
  console.log(`   - 차트: ${definition.charts?.length || 0}개`);

  // Claude API 호출
  console.log('\n🤖 Claude API 호출 중...');

  const client = new Anthropic({ apiKey: CLAUDE_API_KEY });

  const prompt = `당신은 Next.js + TypeScript + AG Grid 전문가입니다.

**중요 지시사항**:
1. AG Grid Community 버전을 사용합니다
2. 반드시 모듈 등록을 먼저 수행하세요
3. 그룹 헤더(2행 헤더)를 사용하여 컬럼을 논리적으로 그룹화하세요
4. Corporate Professional 스타일을 적용하세요
5. 커스텀 셀 렌더러를 적극 활용하세요

다음 화면 정의를 바탕으로 완전히 작동하는 React 컴포넌트를 생성하세요.

## 화면 정의

${JSON.stringify(definition, null, 2)}

## 기술 스택

- Framework: Next.js 15 (App Router, 'use client')
- Grid: AG Grid Community (ag-grid-react, ag-grid-community)
- Chart: recharts
- UI: shadcn/ui (Card, Button, Input, Label, Select)
- Icons: lucide-react

## AG Grid 필수 구현 패턴

\`\`\`typescript
'use client';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

export default function ScreenComponent() {
  const [rowData, setRowData] = useState([
    // 샘플 데이터
  ]);

  // 그룹 헤더가 포함된 컬럼 정의
  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => [
    {
      headerName: '기본 정보',  // 그룹 헤더 (1행)
      children: [
        { field: 'code', headerName: '코드', width: 100 },  // 하위 헤더 (2행)
        { field: 'name', headerName: '품명', width: 150 },
      ]
    },
    {
      headerName: '입출고',
      children: [
        { field: 'inQty', headerName: '입고수량', width: 100, type: 'numericColumn' },
        { field: 'outQty', headerName: '출고수량', width: 100, type: 'numericColumn' },
      ]
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  // 숫자 포맷터
  const numberFormatter = (params: { value: number }) => {
    if (params.value === null || params.value === undefined) return '';
    return params.value.toLocaleString('ko-KR');
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>화면명</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 필터 영역 */}
          
          {/* AG Grid */}
          <div className="ag-theme-alpine ag-corporate-style" style={{ height: 600, width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowHeight={42}
              headerHeight={45}
            />
          </div>

          {/* 차트 영역 */}
        </CardContent>
      </Card>

      {/* 커스텀 스타일 */}
      <style jsx global>{\`
        .ag-corporate-style {
          --ag-header-background-color: #1e40af;
          --ag-header-foreground-color: white;
          --ag-row-hover-color: #eff6ff;
        }
        .ag-corporate-style .ag-header-group-cell {
          background: linear-gradient(180deg, #1e40af 0%, #1d4ed8 100%);
        }
        .ag-corporate-style .ag-header-cell {
          background: linear-gradient(180deg, #2563eb 0%, #3b82f6 100%);
        }
      \`}</style>
    </div>
  );
}
\`\`\`

## 필수 요구사항

1. **모듈 등록**: ModuleRegistry.registerModules([AllCommunityModule]) 필수
2. **2행 헤더**: ColGroupDef의 children으로 그룹 헤더 구현
3. **커스텀 렌더러**: 상태, 프로그레스, 숫자 등 시각적 렌더러 구현
4. **스타일**: ag-corporate-style 클래스와 CSS Variables 사용
5. **타입 안전**: ColDef, ColGroupDef 등 적절한 타입 사용
6. **필터**: shadcn/ui의 Input, Select, Button 사용
7. **차트**: recharts로 BarChart, LineChart 등 구현
8. **샘플 데이터**: 현실적인 한국어 데이터 5-10행 생성

## 커스텀 셀 렌더러 예시

\`\`\`typescript
// 상태 렌더러
const StatusRenderer = (params: { value: string }) => {
  const colors: Record<string, string> = {
    '정상': 'bg-green-100 text-green-700',
    '주의': 'bg-yellow-100 text-yellow-700',
    '위험': 'bg-red-100 text-red-700',
  };
  return (
    <span className={\`px-2 py-1 rounded text-xs font-medium \${colors[params.value] || ''}\`}>
      {params.value}
    </span>
  );
};

// 프로그레스 렌더러
const ProgressRenderer = (params: { value: number }) => (
  <div className="flex items-center gap-2 w-full">
    <div className="flex-1 h-2 bg-gray-200 rounded-full">
      <div className="h-full bg-blue-500 rounded-full" style={{ width: \`\${params.value}%\` }} />
    </div>
    <span className="text-xs w-10 text-right">{params.value}%</span>
  </div>
);
\`\`\`

## 출력 형식

완전한 TypeScript React 컴포넌트 코드만 출력하세요.
- import문부터 export문까지 모두 포함
- AG Grid 모듈 등록 필수
- 그룹 헤더(2행) 필수 구현
- Corporate 스타일 CSS 포함
- 코드 마커 포함 (\`\`\`tsx)
- 설명 최소화

지금 시작하세요!`;

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 8000,
      temperature: 0,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0] as { type: string; text: string };
    if (!content || content.type !== 'text') {
      console.error('❌ Claude 응답 형식 오류');
      return;
    }

    console.log(`✅ Claude 응답 수신 (${content.text.length}자)`);

    // 코드 추출
    const codeMatch = content.text.match(/```(?:tsx?|typescript)?\n([\s\S]*?)```/);
    if (!codeMatch || !codeMatch[1]) {
      console.error('❌ 코드 블록을 찾을 수 없습니다');
      console.log('응답:', content.text.substring(0, 500));
      return;
    }

    const componentCode = codeMatch[1];
    console.log(`✅ 코드 추출 완료 (${componentCode.length}자)`);

    // 파일 저장
    const screenDir = path.join(OUTPUT_DIR, definition.screenId.toLowerCase());
    if (!fs.existsSync(screenDir)) {
      fs.mkdirSync(screenDir, { recursive: true });
    }

    const outputPath = path.join(screenDir, 'page.tsx');
    fs.writeFileSync(outputPath, componentCode, 'utf-8');

    console.log(`\n✅ 컴포넌트 생성 완료!`);
    console.log(`📁 파일 위치: ${outputPath}`);
    console.log(`🔗 URL: /screens/${definition.screenId.toLowerCase()}`);

  } catch (error: any) {
    console.error('❌ Claude API 오류:', error.message);
  }
}

// ============================================================================
// 실행
// ============================================================================

if (!CLAUDE_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다');
  process.exit(1);
}

generateUIComponent(DEFINITION_PATH);

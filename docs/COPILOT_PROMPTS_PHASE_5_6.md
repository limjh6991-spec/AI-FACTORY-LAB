# Copilot 프롬프트 - Phase 5-6

> **Phase 1-4는 `COPILOT_PROMPTS.md` 참고**

---

## Phase 5: 다른 템플릿 블록 기반 전환 (Week 4-5)

### 🎯 Copilot Prompt

```
# Task: Convert Other Templates to Block-Based Architecture

## Context
Currently only `SimpleGridCrudTemplate` uses block-based architecture.
Need to convert other templates: ComplexGridCrud, Dashboard, etc.

## Objective
Convert all remaining templates to use ScreenSchema and block composition.

---

## Step 1: Identify Existing Templates (15 min)

List all template files in the project:

```bash
find src/server/api/routers/screen-generator/templates -name "*Template.ts" -type f
```

**Expected Templates:**
- [ ] SimpleGridCrudTemplate ✅ (Already converted)
- [ ] ComplexGridCrudTemplate ❌ (To convert)
- [ ] DashboardTemplate ❌ (To convert)
- [ ] Others: _________________

---

## Step 2: Create ComplexGridCrudTemplate (4 hours)

### Task 2.1: Analyze Requirements

**ComplexGridCrud vs SimpleGridCrud differences:**
- Multiple grids (master-detail)
- Tab-based layout
- Additional KPI widgets
- More complex search form

### Task 2.2: Create Template File

Create `src/server/api/routers/screen-generator/templates/complex-grid-crud/ComplexGridCrudTemplate.ts`:

```typescript
import {
  BaseTemplate,
  type ComponentGenerationResult,
  type ApiGenerationResult,
  type ScreenGenerationResult,
  type ICrudTemplate,
} from '../base';

import {
  ScreenType,
  type ParsedData,
  type CrudParsedData,
  type CrudColumnDef,
  type CrudConfig,
} from '../../_shared/types';

import type {
  ScreenSchema,
  Block,
  SearchField,
  GridColumn,
  ToolbarButton,
  TabItem,
} from '~/features/screen-generator/types/block-schema';

import {
  BlockType,
  LayoutType,
  ChartType,
} from '~/features/screen-generator/types/block-schema';

import { ComponentGenerator } from '../../generators/component-generator';
import { ApiGenerator } from '../../generators/api-generator';

/**
 * ComplexGridCrudTemplate
 *
 * For complex screens with:
 * - Master-detail grids
 * - Tab containers
 * - KPI widgets
 * - Charts
 */
export class ComplexGridCrudTemplate extends BaseTemplate implements ICrudTemplate {
  protected readonly screenType = ScreenType.COMPLEX_GRID_CRUD;
  protected readonly description = '복합 CRUD 화면 (Master-Detail)';

  private componentGenerator = new ComponentGenerator();
  private apiGenerator = new ApiGenerator();

  /**
   * Generate component
   */
  async generateComponent(data: ParsedData): Promise<ComponentGenerationResult> {
    if (!this.isCrudParsedData(data)) {
      return this.createErrorResult('Invalid data', data.screenId ?? 'unknown');
    }

    const screenId = data.screenId ?? 'SC000';
    const componentName = this.getComponentName(screenId, data.screenName);

    try {
      // Generate ScreenSchema with complex layout
      const schema = this.generateScreenSchema(data);

      // Generate code
      const code = this.componentGenerator.generateProductionComponent(schema, componentName);

      return {
        success: true,
        filePath: this.getFilePath(screenId, true),
        fileName: this.getFileName(screenId),
        code,
      };
    } catch (error) {
      return this.createErrorResult(
        `Component generation failed: ${error instanceof Error ? error.message : String(error)}`,
        screenId
      );
    }
  }

  /**
   * Generate ScreenSchema with complex layout
   */
  private generateScreenSchema(data: CrudParsedData): ScreenSchema {
    const { screenId, screenName, screenNameEn, crudConfig, crudColumns } = data;

    const blocks: Block[] = [
      // 1. PAGE_HEADER
      {
        id: 'header-1',
        type: BlockType.PAGE_HEADER,
        order: 1,
        title: screenName,
        description: `${screenName} 관리 (Master-Detail)`,
        breadcrumbs: [
          { label: '홈', href: '/' },
          { label: '기준정보', href: '/master' },
          { label: screenName },
        ],
        actions: [
          {
            label: '엑셀 다운로드',
            icon: 'Download',
            onClick: 'handleExcelExport',
            variant: 'secondary',
          },
        ],
      },

      // 2. KPI_WIDGET Row (3 widgets)
      {
        id: 'kpi-1',
        type: BlockType.KPI_WIDGET,
        order: 2,
        title: '총 데이터 수',
        value: 0,
        valueApi: `/api/screens/${screenId}/kpi/total`,
        unit: '건',
        icon: 'Database',
        theme: 'primary',
      },
      {
        id: 'kpi-2',
        type: BlockType.KPI_WIDGET,
        order: 3,
        title: '이번 달 추가',
        value: 0,
        valueApi: `/api/screens/${screenId}/kpi/monthly`,
        unit: '건',
        changeRate: 0,
        showChangeRate: true,
        icon: 'TrendingUp',
        theme: 'success',
      },
      {
        id: 'kpi-3',
        type: BlockType.KPI_WIDGET,
        order: 4,
        title: '처리 대기',
        value: 0,
        valueApi: `/api/screens/${screenId}/kpi/pending`,
        unit: '건',
        icon: 'Clock',
        theme: 'warning',
      },

      // 3. SEARCH_FORM
      {
        id: 'search-form-1',
        type: BlockType.SEARCH_FORM,
        order: 5,
        fields: this.generateSearchFields(),
        searchButtonLabel: '검색',
        showResetButton: true,
        onSearch: 'handleSearch',
        collapsible: true,
        defaultCollapsed: false,
      },

      // 4. TAB_CONTAINER with Master-Detail grids
      {
        id: 'tabs-1',
        type: BlockType.TAB_CONTAINER,
        order: 6,
        tabs: [
          // Tab 1: Master Grid + Chart
          {
            id: 'tab-master',
            label: 'Master 데이터',
            icon: 'Table',
            blocks: [
              {
                id: 'toolbar-master',
                type: BlockType.TOOLBAR,
                order: 1,
                alignment: 'space-between',
                buttons: this.generateToolbarButtons('master'),
              },
              {
                id: 'grid-master',
                type: BlockType.DATA_GRID,
                order: 2,
                columns: this.generateGridColumns(crudColumns, crudConfig.primaryKey),
                apiEndpoint: `/api/screens/${screenId}/master`,
                rowSelection: 'single',
                showCheckboxSelection: true,
                pagination: true,
                pageSize: 50,
                height: 400,
                editable: true,
                onRowSelected: 'handleMasterRowSelected',
              },
              {
                id: 'chart-master',
                type: BlockType.CHART_WIDGET,
                order: 3,
                title: '월별 추이',
                chartType: ChartType.LINE,
                dataApi: `/api/screens/${screenId}/chart/trend`,
                height: 300,
                xField: 'month',
                yField: ['count', 'amount'],
                showLegend: true,
              },
            ],
          },

          // Tab 2: Detail Grid
          {
            id: 'tab-detail',
            label: 'Detail 데이터',
            icon: 'ListTree',
            blocks: [
              {
                id: 'toolbar-detail',
                type: BlockType.TOOLBAR,
                order: 1,
                alignment: 'left',
                buttons: this.generateToolbarButtons('detail'),
              },
              {
                id: 'grid-detail',
                type: BlockType.DATA_GRID,
                order: 2,
                columns: this.generateDetailColumns(crudColumns),
                apiEndpoint: `/api/screens/${screenId}/detail`,
                rowSelection: 'multiple',
                pagination: true,
                pageSize: 100,
                height: 500,
                editable: true,
              },
            ],
          },

          // Tab 3: Analysis (Charts & KPIs)
          {
            id: 'tab-analysis',
            label: '분석',
            icon: 'BarChart',
            blocks: [
              {
                id: 'chart-pie',
                type: BlockType.CHART_WIDGET,
                order: 1,
                title: '카테고리별 분포',
                chartType: ChartType.PIE,
                dataApi: `/api/screens/${screenId}/chart/category`,
                height: 300,
              },
              {
                id: 'chart-bar',
                type: BlockType.CHART_WIDGET,
                order: 2,
                title: '월별 비교',
                chartType: ChartType.BAR,
                dataApi: `/api/screens/${screenId}/chart/monthly`,
                height: 300,
                xField: 'month',
                yField: 'amount',
              },
            ],
          },
        ],
        defaultActiveTab: 'tab-master',
      },
    ];

    return {
      screenId: screenId ?? 'SC000',
      screenName,
      screenNameEn: screenNameEn ?? screenName,
      description: `${screenName} 복합 CRUD 화면`,
      path: `/generated/${screenId}`,
      layout: {
        type: LayoutType.SINGLE_COLUMN,
        gap: 16,
        padding: 16,
      },
      blocks,
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0',
        tags: ['crud', 'complex', 'master-detail', 'auto-generated'],
      },
    };
  }

  /**
   * Generate search fields (same as SimpleGridCrud)
   */
  private generateSearchFields(): SearchField[] {
    return [
      {
        name: 'site',
        label: '사업장',
        type: 'siteSelect',
        required: true,
        defaultValue: 'SITE_01',
        width: 3,
      },
      {
        name: 'yyyymm',
        label: '년월',
        type: 'yearMonthPicker',
        required: true,
        width: 3,
      },
      {
        name: 'scenario',
        label: '시나리오',
        type: 'scenarioSelect',
        defaultValue: 'ACTUAL',
        width: 3,
      },
      {
        name: 'keyword',
        label: '키워드',
        type: 'text',
        placeholder: '검색어 입력',
        width: 3,
      },
    ];
  }

  /**
   * Generate toolbar buttons
   */
  private generateToolbarButtons(context: 'master' | 'detail'): ToolbarButton[] {
    const baseButtons: ToolbarButton[] = [
      {
        id: 'add',
        label: '행 추가',
        icon: 'Plus',
        variant: 'primary',
        onClick: \`handleAdd\${context === 'master' ? 'Master' : 'Detail'}\`,
      },
      {
        id: 'save',
        label: '저장',
        icon: 'Save',
        variant: 'success',
        onClick: \`handleSave\${context === 'master' ? 'Master' : 'Detail'}\`,
        disabled: '!hasChanges',
      },
      {
        id: 'delete',
        label: '삭제',
        icon: 'Trash2',
        variant: 'danger',
        onClick: \`handleDelete\${context === 'master' ? 'Master' : 'Detail'}\`,
      },
    ];

    return baseButtons;
  }

  /**
   * Generate grid columns
   */
  private generateGridColumns(columns: CrudColumnDef[], pkField: string): GridColumn[] {
    return columns.map((col) => ({
      field: col.field,
      headerName: col.headerName,
      width: col.width,
      type: this.mapColumnType(col.editorType),
      editable: col.field === pkField ? false : col.editable,
      sortable: true,
      filterable: true,
      align: col.editorType === 'number' ? 'right' : 'left',
      hidden: col.hidden,
      pinned: col.field === pkField ? 'left' : undefined,
    }));
  }

  /**
   * Generate detail columns
   */
  private generateDetailColumns(columns: CrudColumnDef[]): GridColumn[] {
    // Detail columns might be different from master
    return this.generateGridColumns(columns, columns[0]?.field ?? 'id');
  }

  /**
   * Map column type
   */
  private mapColumnType(editorType: string): GridColumn['type'] {
    switch (editorType) {
      case 'number': return 'number';
      case 'date': return 'date';
      case 'datetime': return 'datetime';
      case 'checkbox': return 'boolean';
      case 'select': return 'select';
      default: return 'text';
    }
  }

  /**
   * Type guard
   */
  private isCrudParsedData(data: ParsedData): data is CrudParsedData {
    return (
      data.screenType === ScreenType.COMPLEX_GRID_CRUD &&
      'crudConfig' in data &&
      'crudColumns' in data
    );
  }

  /**
   * Generate API (same as SimpleGridCrud)
   */
  async generateApi(data: ParsedData): Promise<ApiGenerationResult> {
    // Delegate to ApiGenerator
    // (Same implementation as SimpleGridCrud)
  }

  /**
   * Generate full screen
   */
  async generateScreen(data: ParsedData): Promise<ScreenGenerationResult> {
    // Same as SimpleGridCrud
  }
}
```

### Task 2.3: Export Template

Update `src/server/api/routers/screen-generator/templates/index.ts`:

```typescript
export { SimpleGridCrudTemplate } from './simple-grid-crud';
export { ComplexGridCrudTemplate } from './complex-grid-crud';
```

### Task 2.4: Register Template in Router

Update `src/server/api/routers/screen-generator/index.ts`:

```typescript
import { SimpleGridCrudTemplate } from './templates/simple-grid-crud';
import { ComplexGridCrudTemplate } from './templates/complex-grid-crud';

// In the procedure that selects template:
function getTemplate(screenType: ScreenType) {
  switch (screenType) {
    case ScreenType.SIMPLE_GRID_CRUD:
      return new SimpleGridCrudTemplate();
    case ScreenType.COMPLEX_GRID_CRUD:
      return new ComplexGridCrudTemplate();
    default:
      throw new Error(\`Unsupported screen type: \${screenType}\`);
  }
}
```

---

## Step 3: Create DashboardTemplate (4 hours)

### Task 3.1: Create Template File

Create `src/server/api/routers/screen-generator/templates/dashboard/DashboardTemplate.ts`:

```typescript
/**
 * DashboardTemplate
 *
 * For dashboard screens with:
 * - Multiple KPI widgets
 * - Various chart types
 * - Grid layout
 * - Real-time updates
 */
export class DashboardTemplate extends BaseTemplate {
  protected readonly screenType = ScreenType.DASHBOARD;
  protected readonly description = '대시보드 화면';

  /**
   * Generate ScreenSchema with dashboard layout
   */
  private generateScreenSchema(data: ParsedData): ScreenSchema {
    const { screenId, screenName } = data;

    const blocks: Block[] = [
      // 1. PAGE_HEADER
      {
        id: 'header-1',
        type: BlockType.PAGE_HEADER,
        order: 1,
        title: screenName,
        description: '실시간 대시보드',
      },

      // 2. KPI Row (4 widgets)
      {
        id: 'kpi-1',
        type: BlockType.KPI_WIDGET,
        order: 2,
        title: '매출액',
        valueApi: `/api/dashboard/${screenId}/kpi/sales`,
        unit: '억원',
        changeRate: 5.2,
        showChangeRate: true,
        icon: 'DollarSign',
        theme: 'primary',
      },
      {
        id: 'kpi-2',
        type: BlockType.KPI_WIDGET,
        order: 3,
        title: '주문 수',
        valueApi: `/api/dashboard/${screenId}/kpi/orders`,
        unit: '건',
        changeRate: 12.5,
        showChangeRate: true,
        icon: 'ShoppingCart',
        theme: 'success',
      },
      {
        id: 'kpi-3',
        type: BlockType.KPI_WIDGET,
        order: 4,
        title: '신규 고객',
        valueApi: `/api/dashboard/${screenId}/kpi/customers`,
        unit: '명',
        changeRate: -2.3,
        showChangeRate: true,
        icon: 'Users',
        theme: 'warning',
      },
      {
        id: 'kpi-4',
        type: BlockType.KPI_WIDGET,
        order: 5,
        title: '재고 회전율',
        valueApi: `/api/dashboard/${screenId}/kpi/inventory`,
        unit: '회',
        icon: 'Package',
        theme: 'info',
      },

      // 3. Chart Row (Line + Bar)
      {
        id: 'chart-1',
        type: BlockType.CHART_WIDGET,
        order: 6,
        title: '월별 매출 추이',
        chartType: ChartType.LINE,
        dataApi: `/api/dashboard/${screenId}/chart/sales-trend`,
        height: 350,
        xField: 'month',
        yField: ['sales', 'profit'],
        showLegend: true,
        showGridLines: true,
      },
      {
        id: 'chart-2',
        type: BlockType.CHART_WIDGET,
        order: 7,
        title: '카테고리별 판매',
        chartType: ChartType.BAR,
        dataApi: `/api/dashboard/${screenId}/chart/category-sales`,
        height: 350,
        xField: 'category',
        yField: 'amount',
      },

      // 4. Chart Row (Pie + Area)
      {
        id: 'chart-3',
        type: BlockType.CHART_WIDGET,
        order: 8,
        title: '지역별 분포',
        chartType: ChartType.PIE,
        dataApi: `/api/dashboard/${screenId}/chart/region`,
        height: 300,
      },
      {
        id: 'chart-4',
        type: BlockType.CHART_WIDGET,
        order: 9,
        title: '일별 트래픽',
        chartType: ChartType.AREA,
        dataApi: `/api/dashboard/${screenId}/chart/traffic`,
        height: 300,
        xField: 'date',
        yField: 'visits',
      },

      // 5. Recent Activity Grid
      {
        id: 'grid-1',
        type: BlockType.DATA_GRID,
        order: 10,
        columns: [
          { field: 'time', headerName: '시간', width: 120, type: 'datetime' },
          { field: 'event', headerName: '이벤트', width: 200, type: 'text' },
          { field: 'user', headerName: '사용자', width: 150, type: 'text' },
          { field: 'status', headerName: '상태', width: 100, type: 'text' },
        ],
        apiEndpoint: `/api/dashboard/${screenId}/activity`,
        rowSelection: 'none',
        pagination: true,
        pageSize: 10,
        height: 300,
      },
    ];

    return {
      screenId: screenId ?? 'SC000',
      screenName,
      screenNameEn: data.screenNameEn ?? screenName,
      description: `${screenName} 대시보드`,
      path: `/dashboard/${screenId}`,
      layout: {
        type: LayoutType.DASHBOARD,  // ⭐ Dashboard layout
        gap: 16,
        padding: 16,
      },
      blocks,
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0',
        tags: ['dashboard', 'real-time', 'auto-generated'],
      },
    };
  }
}
```

---

## Step 4: Update Template Registry (30 min)

Create a central template registry:

Create `src/server/api/routers/screen-generator/templates/registry.ts`:

```typescript
import { ScreenType } from '../_shared/types';
import type { BaseTemplate } from './base';
import { SimpleGridCrudTemplate } from './simple-grid-crud';
import { ComplexGridCrudTemplate } from './complex-grid-crud';
import { DashboardTemplate } from './dashboard';

/**
 * Template Registry
 *
 * Central registry for all screen templates.
 */
export class TemplateRegistry {
  private static templates = new Map<ScreenType, () => BaseTemplate>([
    [ScreenType.SIMPLE_GRID_CRUD, () => new SimpleGridCrudTemplate()],
    [ScreenType.COMPLEX_GRID_CRUD, () => new ComplexGridCrudTemplate()],
    [ScreenType.DASHBOARD, () => new DashboardTemplate()],
  ]);

  /**
   * Get template instance by screen type
   */
  static getTemplate(screenType: ScreenType): BaseTemplate {
    const factory = this.templates.get(screenType);
    if (!factory) {
      throw new Error(\`Unsupported screen type: \${screenType}\`);
    }
    return factory();
  }

  /**
   * Register new template
   */
  static register(screenType: ScreenType, factory: () => BaseTemplate): void {
    this.templates.set(screenType, factory);
  }

  /**
   * Check if template exists
   */
  static has(screenType: ScreenType): boolean {
    return this.templates.has(screenType);
  }

  /**
   * Get all supported screen types
   */
  static getSupportedTypes(): ScreenType[] {
    return Array.from(this.templates.keys());
  }
}
```

---

## Verification Checklist

- [ ] ComplexGridCrudTemplate created
- [ ] DashboardTemplate created
- [ ] Template registry created
- [ ] All templates use block-based architecture
- [ ] All templates registered in registry
- [ ] Generated components compile
- [ ] Build succeeds
- [ ] Type check passes
- [ ] Commit: "feat: add complex and dashboard templates (Phase 5)"

## Notes for Copilot

- Follow same pattern as SimpleGridCrudTemplate
- Use ScreenSchema and block composition
- Keep template logic focused on schema generation
- Delegate code generation to ComponentGenerator
- Support both production and preview modes
```

---

## Phase 6: 테스트 & 문서화 (Week 6)

### 🎯 Copilot Prompt

```
# Task: Add Tests and Documentation

## Context
All templates converted to block-based architecture.
Need comprehensive tests and documentation.

## Objective
Add unit tests, integration tests, and user documentation.

---

## Step 1: Set Up Testing Framework (1 hour)

### Task 1.1: Install Dependencies

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev @types/jest jest-environment-jsdom
```

### Task 1.2: Configure Jest

Create/update `jest.config.js`:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

### Task 1.3: Create Jest Setup

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom';
```

---

## Step 2: Write Unit Tests for Components (4 hours)

### Test 2.1: PageHeaderBlock Tests

Create `src/features/screen-generator/components/blocks/__tests__/PageHeaderBlock.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { PageHeaderBlock } from '../PageHeaderBlock';
import type { PageHeaderBlockProps } from '../../../types/block-schema';
import { BlockType } from '../../../types/block-schema';

describe('PageHeaderBlock', () => {
  const defaultProps: PageHeaderBlockProps = {
    id: 'header-1',
    type: BlockType.PAGE_HEADER,
    order: 1,
    title: 'Test Screen',
  };

  it('renders title correctly', () => {
    render(<PageHeaderBlock {...defaultProps} />);
    expect(screen.getByText('Test Screen')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <PageHeaderBlock
        {...defaultProps}
        description="Test description"
      />
    );
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders breadcrumbs correctly', () => {
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Current' },
    ];
    render(<PageHeaderBlock {...defaultProps} breadcrumbs={breadcrumbs} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('renders action buttons when provided', () => {
    const actions = [
      { label: 'Export', onClick: 'handleExport' },
      { label: 'Settings', onClick: 'handleSettings' },
    ];
    render(<PageHeaderBlock {...defaultProps} actions={actions} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PageHeaderBlock {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### Test 2.2-2.8: Other Block Component Tests

Create tests for all other block components:
- `SearchFormBlock.test.tsx`
- `DataGridBlock.test.tsx`
- `KpiWidgetBlock.test.tsx`
- `ChartWidgetBlock.test.tsx`
- `ToolbarBlock.test.tsx`
- `TabContainerBlock.test.tsx`
- `CustomBlock.test.tsx`

---

## Step 3: Write Unit Tests for Generators (2 hours)

### Test 3.1: ComponentGenerator Tests

Create `src/server/api/routers/screen-generator/generators/__tests__/component-generator.test.ts`:

```typescript
import { ComponentGenerator } from '../component-generator';
import type { ScreenSchema } from '~/features/screen-generator/types/block-schema';
import { BlockType, LayoutType } from '~/features/screen-generator/types/block-schema';

describe('ComponentGenerator', () => {
  const generator = new ComponentGenerator();

  const mockSchema: ScreenSchema = {
    screenId: 'SC001',
    screenName: 'Test Screen',
    screenNameEn: 'Test Screen',
    layout: { type: LayoutType.SINGLE_COLUMN },
    blocks: [
      {
        id: 'header-1',
        type: BlockType.PAGE_HEADER,
        order: 1,
        title: 'Test',
      },
    ],
  };

  describe('generateProductionComponent', () => {
    it('generates valid React component code', () => {
      const code = generator.generateProductionComponent(mockSchema, 'TestScreen');

      expect(code).toContain("'use client'");
      expect(code).toContain('import { ScreenRenderer }');
      expect(code).toContain('export default function TestScreen()');
      expect(code).toContain('<ScreenRenderer schema={schema} />');
    });

    it('includes schema in generated code', () => {
      const code = generator.generateProductionComponent(mockSchema, 'TestScreen');

      expect(code).toContain('"screenId": "SC001"');
      expect(code).toContain('"screenName": "Test Screen"');
    });

    it('includes metadata comments', () => {
      const schemaWithMetadata: ScreenSchema = {
        ...mockSchema,
        metadata: {
          version: '2.0',
          createdAt: '2025-01-01T00:00:00Z',
        },
      };

      const code = generator.generateProductionComponent(schemaWithMetadata, 'TestScreen');

      expect(code).toContain('@version 2.0');
      expect(code).toContain('@created 2025-01-01T00:00:00Z');
    });
  });

  describe('generatePreviewComponent', () => {
    it('generates Sandpack-compatible code', () => {
      const code = generator.generatePreviewComponent(mockSchema, 'TestScreen');

      expect(code).toContain("'use client'");
      expect(code).toContain('function BlockRenderer');
      expect(code).toContain('function ScreenRenderer');
      expect(code).not.toContain('import {'); // No external imports for Sandpack
    });

    it('includes inline renderer', () => {
      const code = generator.generatePreviewComponent(mockSchema, 'TestScreen');

      expect(code).toContain('switch (block.type)');
      expect(code).toContain("case 'PAGE_HEADER'");
    });
  });
});
```

### Test 3.2: ApiGenerator Tests

Create `src/server/api/routers/screen-generator/generators/__tests__/api-generator.test.ts`:

```typescript
import { ApiGenerator } from '../api-generator';
import type { CrudConfig, CrudColumnDef } from '../../_shared/types';

describe('ApiGenerator', () => {
  const generator = new ApiGenerator();

  const mockConfig: CrudConfig = {
    primaryKey: 'id',
    sortColumn: 'created_at',
    sortDirection: 'desc',
    softDelete: true,
    auditColumns: true,
  };

  const mockColumns: CrudColumnDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      editorType: 'text',
      required: true,
      width: 100,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      editorType: 'text',
      required: true,
      width: 200,
      editable: true,
      maxLength: 100,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      editorType: 'number',
      required: false,
      width: 150,
      editable: true,
    },
  ];

  it('generates valid tRPC router code', () => {
    const code = generator.generateApiRouter(
      'testRouter',
      'test_table',
      mockConfig,
      mockColumns
    );

    expect(code).toContain('createTRPCRouter');
    expect(code).toContain('export const testRouterRouter');
    expect(code).toContain('getAll');
    expect(code).toContain('getById');
    expect(code).toContain('save');
  });

  it('includes Zod schema validation', () => {
    const code = generator.generateApiRouter(
      'testRouter',
      'test_table',
      mockConfig,
      mockColumns
    );

    expect(code).toContain('const rowSchema = z.object({');
    expect(code).toContain('id: z.string()');
    expect(code).toContain('name: z.string().max(100)');
    expect(code).toContain('amount: z.number().nullable().optional()');
  });

  it('implements soft delete when configured', () => {
    const code = generator.generateApiRouter(
      'testRouter',
      'test_table',
      mockConfig,
      mockColumns
    );

    expect(code).toContain("delete_yn: 'N'");
    expect(code).toContain("delete_yn: 'Y'");
  });

  it('includes audit columns when configured', () => {
    const code = generator.generateApiRouter(
      'testRouter',
      'test_table',
      mockConfig,
      mockColumns
    );

    expect(code).toContain('created_at: new Date()');
    expect(code).toContain('updated_at: new Date()');
  });
});
```

---

## Step 4: Write Integration Tests (2 hours)

### Test 4.1: Template Integration Tests

Create `src/server/api/routers/screen-generator/templates/__tests__/template-integration.test.ts`:

```typescript
import { SimpleGridCrudTemplate } from '../simple-grid-crud';
import { ComplexGridCrudTemplate } from '../complex-grid-crud';
import { ScreenType } from '../../_shared/types';
import type { CrudParsedData } from '../../_shared/types';

describe('Template Integration', () => {
  const mockData: CrudParsedData = {
    screenId: 'SC001',
    screenName: 'Test Screen',
    screenNameEn: 'Test Screen',
    screenType: ScreenType.SIMPLE_GRID_CRUD,
    tableName: 'test_table',
    crudConfig: {
      primaryKey: 'id',
      sortColumn: 'created_at',
      sortDirection: 'desc',
      softDelete: true,
      auditColumns: true,
    },
    crudColumns: [
      {
        field: 'id',
        headerName: 'ID',
        editorType: 'text',
        required: true,
        width: 100,
        editable: false,
      },
    ],
  };

  describe('SimpleGridCrudTemplate', () => {
    const template = new SimpleGridCrudTemplate();

    it('generates component successfully', async () => {
      const result = await template.generateComponent(mockData);

      expect(result.success).toBe(true);
      expect(result.code).toBeTruthy();
      expect(result.code).toContain('export default function');
    });

    it('generates API successfully', async () => {
      const result = await template.generateApi(mockData);

      expect(result.success).toBe(true);
      expect(result.routerCode).toBeTruthy();
      expect(result.procedures).toContain('getAll');
    });

    it('generates complete screen', async () => {
      const result = await template.generateScreen(mockData);

      expect(result.success).toBe(true);
      expect(result.component?.success).toBe(true);
      expect(result.api?.success).toBe(true);
    });
  });

  describe('ComplexGridCrudTemplate', () => {
    const template = new ComplexGridCrudTemplate();
    const complexData = { ...mockData, screenType: ScreenType.COMPLEX_GRID_CRUD };

    it('generates component with tabs', async () => {
      const result = await template.generateComponent(complexData);

      expect(result.success).toBe(true);
      expect(result.code).toContain('TAB_CONTAINER');
    });
  });
});
```

---

## Step 5: Add E2E Tests (Optional) (2 hours)

If using Playwright or Cypress:

Create `e2e/screen-generator.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Screen Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings/screen-generator');
  });

  test('generates simple CRUD screen', async ({ page }) => {
    // Upload Excel file
    await page.setInputFiles('input[type="file"]', 'fixtures/simple-crud.xlsx');

    // Wait for preview
    await expect(page.locator('[data-testid="preview"]')).toBeVisible();

    // Verify preview contains blocks
    await expect(page.locator('[data-testid="block-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="block-search"]')).toBeVisible();
    await expect(page.locator('[data-testid="block-grid"]')).toBeVisible();
  });

  test('validates Excel format', async ({ page }) => {
    // Upload invalid file
    await page.setInputFiles('input[type="file"]', 'fixtures/invalid.xlsx');

    // Expect error message
    await expect(page.locator('[role="alert"]')).toContainText('유효하지 않은 파일');
  });
});
```

---

## Step 6: Create User Documentation (2 hours)

### Doc 6.1: User Guide

Create `docs/USER_GUIDE.md`:

```markdown
# 화면 생성기 사용자 가이드

## 개요
화면 생성기는 Excel 파일을 업로드하여 자동으로 React 화면을 생성하는 도구입니다.

## 빠른 시작

### 1. Excel 파일 준비
화면 정의 Excel 파일은 다음 구조를 따라야 합니다:

**Sheet 1: 메타정보**
| 항목 | 값 |
|------|------|
| 화면명 | 부서관리 |
| 화면타입 | SIMPLE_GRID_CRUD |
| 테이블명 | dept_master |

**Sheet 2: 조회조건**
| 필드명 | 필드타입 | 필수여부 | 기본값 |
|--------|----------|----------|--------|
| plant_site_code | siteSelect | Y | SITE_01 |
| yyyymm | yearMonthPicker | Y | |
| scenario_code | scenarioSelect | N | ACTUAL |

**Sheet 3: 그리드컬럼**
| 컬럼ID | 컬럼명 | 타입 | 너비 | 편집가능 |
|--------|--------|------|------|----------|
| dept_code | 부서코드 | text | 120 | N |
| dept_name | 부서명 | text | 200 | Y |

### 2. 화면 생성
1. `/settings/screen-generator` 페이지로 이동
2. Excel 파일 업로드
3. 미리보기 확인
4. "화면 생성" 버튼 클릭

### 3. 생성된 파일
- **Component:** `src/app/generated/SC001/page.tsx`
- **API Router:** `src/server/api/routers/generated/screenSC001.ts`

## 지원 화면 타입

### SIMPLE_GRID_CRUD
기본 CRUD 화면 (조회, 추가, 수정, 삭제)

### COMPLEX_GRID_CRUD
Master-Detail 화면 (탭, 차트 포함)

### DASHBOARD
대시보드 화면 (KPI 위젯, 차트 중심)

## 블록 타입

### PAGE_HEADER
페이지 헤더 (제목, 브레드크럼, 액션 버튼)

### SEARCH_FORM
검색 폼 (10가지 필드 타입 지원)

### DATA_GRID
데이터 그리드 (AG Grid 기반)

### KPI_WIDGET
KPI 위젯 (통계 카드)

### CHART_WIDGET
차트 위젯 (7가지 차트 타입)

### TOOLBAR
툴바 (버튼 그룹)

### TAB_CONTAINER
탭 컨테이너 (재귀적 블록 구조)

### CUSTOM
커스텀 블록 (사용자 정의)

## 문제 해결

### Q: Excel 업로드 시 오류가 발생합니다
A: Excel 파일 형식을 확인하세요. 필수 Sheet가 모두 있는지 확인하세요.

### Q: 생성된 화면이 표시되지 않습니다
A: 브라우저 캐시를 지우고 새로고침하세요.

### Q: 커스텀 블록을 추가하고 싶습니다
A: `src/features/screen-generator/components/blocks/` 에 새로운 컴포넌트를 추가하세요.
```

### Doc 6.2: API Documentation

Create `docs/API.md`:

```markdown
# Screen Generator API Documentation

## Types

### ScreenSchema
```typescript
interface ScreenSchema {
  screenId: string;
  screenName: string;
  screenNameEn: string;
  description?: string;
  path?: string;
  layout: LayoutConfig;
  blocks: Block[];
  metadata?: ScreenMetadata;
}
```

### Block Types
- `PageHeaderBlockProps`
- `SearchFormBlockProps`
- `DataGridBlockProps`
- `KpiWidgetBlockProps`
- `ChartWidgetBlockProps`
- `ToolbarBlockProps`
- `TabContainerBlockProps`
- `CustomBlockProps`

## Components

### BlockRenderer
Renders individual blocks based on type.

```tsx
import { BlockRenderer } from '~/features/screen-generator/engine/BlockRenderer';

<BlockRenderer block={block} />
```

### ScreenRenderer
Renders entire screen from ScreenSchema.

```tsx
import { ScreenRenderer } from '~/features/screen-generator/engine/BlockRenderer';

<ScreenRenderer schema={schema} />
```

## Generators

### ComponentGenerator
Generates React component code.

```typescript
const generator = new ComponentGenerator();
const code = generator.generateProductionComponent(schema, 'MyScreen');
```

### ApiGenerator
Generates tRPC API router code.

```typescript
const generator = new ApiGenerator();
const code = generator.generateApiRouter(name, table, config, columns);
```

## Templates

### SimpleGridCrudTemplate
Basic CRUD screen template.

### ComplexGridCrudTemplate
Master-detail screen template with tabs.

### DashboardTemplate
Dashboard screen template with KPIs and charts.
```

---

## Step 7: Add JSDoc Comments (1 hour)

Add comprehensive JSDoc comments to all public APIs:

```typescript
/**
 * BlockRenderer Component
 *
 * Renders a single block based on its type using the appropriate block component.
 *
 * @example
 * ```tsx
 * const block: PageHeaderBlockProps = {
 *   id: 'header-1',
 *   type: BlockType.PAGE_HEADER,
 *   order: 1,
 *   title: 'My Screen',
 * };
 *
 * <BlockRenderer block={block} />
 * ```
 *
 * @param props - Component props
 * @param props.block - Block configuration object
 * @returns Rendered block component or null if hidden
 *
 * @public
 */
export function BlockRenderer({ block }: BlockRendererProps): JSX.Element | null {
  // ...
}
```

---

## Verification Checklist

- [ ] Jest configured and working
- [ ] Unit tests for all 8 block components
- [ ] Unit tests for generators
- [ ] Integration tests for templates
- [ ] E2E tests (optional)
- [ ] User guide documentation
- [ ] API documentation
- [ ] JSDoc comments added
- [ ] All tests passing (`npm run test`)
- [ ] Coverage > 80% (`npm run test:coverage`)
- [ ] Documentation reviewed
- [ ] Commit: "test: add comprehensive tests and docs (Phase 6)"

## Final Checklist

After completing all phases:

- [ ] Phase 1: Legacy code removed ✅
- [ ] Phase 2: Naming standardized ✅
- [ ] Phase 3: Components implemented ✅
- [ ] Phase 4: Generators separated ✅
- [ ] Phase 5: All templates converted ✅
- [ ] Phase 6: Tests and docs complete ✅
- [ ] Build succeeds without warnings
- [ ] All tests passing (>80% coverage)
- [ ] Documentation complete and reviewed
- [ ] Performance benchmarks met
- [ ] Ready for production deployment

## Notes for Copilot

- Focus on comprehensive test coverage
- Write clear, maintainable documentation
- Add JSDoc comments for all public APIs
- Include examples in documentation
- Follow testing best practices (AAA pattern)
- Use descriptive test names
```

---

## 🎉 완료!

모든 Phase의 프롬프트가 작성되었습니다.

### 📁 파일 구조
```
docs/
├── COPILOT_PROMPTS.md          # Phase 1-4
└── COPILOT_PROMPTS_PHASE_5_6.md # Phase 5-6
```

### 📋 다음 단계

1. **Phase 1부터 순차 실행**
2. **각 Phase 완료 후 체크리스트 확인**
3. **문제 발생 시 프롬프트 내 "Notes for Copilot" 참고**
4. **모든 Phase 완료 후 최종 검증**

---

**Happy Coding!** 🚀

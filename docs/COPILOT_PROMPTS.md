# Copilot 프롬프트 - 화면 생성기 리팩토링

> **작성일:** 2025년 12월 13일
> **용도:** GitHub Copilot / AI Assistant에게 전달할 단계별 작업 지시서

---

## 📋 목차

- [Phase 1: 레거시 코드 제거](#phase-1-레거시-코드-제거-week-1)
- [Phase 2: 명명 규칙 표준화](#phase-2-명명-규칙-표준화-week-1)
- [Phase 3: 컴포넌트 분리](#phase-3-컴포넌트-분리-week-2-3)
- [Phase 4: 코드 생성 로직 분리](#phase-4-코드-생성-로직-분리-week-3)
- [Phase 5: 템플릿 전환](#phase-5-다른-템플릿-블록-기반-전환-week-4-5)
- [Phase 6: 테스트 & 문서화](#phase-6-테스트--문서화-week-6)

---

## Phase 1: 레거시 코드 제거 (Week 1)

### 🎯 Copilot Prompt

```
# Task: Remove Legacy Screen Generator Code

## Context
We have three separate implementations of screen-generator:
1. `src/lib/screen-generator/` (2,253 lines) - LEGACY, not used
2. `src/server/api/routers/screenGenerator/` (1,999 lines) - Currently in use
3. `src/features/screen-generator/` (1,492 lines) - New block-based architecture

## Objective
Remove the legacy code in `src/lib/screen-generator/` and migrate necessary utilities.

## Step 1: Analyze Dependencies (15 min)

Search for any imports from `src/lib/screen-generator/` in the codebase:

```bash
# Find all imports
grep -r "from '~/lib/screen-generator" src/ --include="*.ts" --include="*.tsx"
grep -r "from '@/lib/screen-generator" src/ --include="*.ts" --include="*.tsx"
```

**Expected Result:** Should return 0 files (no usage).

If any files are found, list them here:
- [ ] File 1: _________________
- [ ] File 2: _________________

## Step 2: Identify Useful Utilities (30 min)

Review `src/lib/screen-generator/` and identify utilities to migrate:

### Files to Review:
1. `src/lib/screen-generator/utils/helpers.ts`
2. `src/lib/screen-generator/id-generator.ts`
3. `src/lib/screen-generator/db-metadata.ts`

### Utilities to Keep:
Create a list of functions that might be useful:

**From helpers.ts:**
- [ ] `capitalize()`
- [ ] `koreanToEnglish()`
- [ ] `toKebabCase()`
- [ ] `toSnakeCase()`
- [ ] `sanitizeFilename()`
- [ ] `formatNumber()`
- [ ] `formatDate()`
- [ ] Other: _________________

**From id-generator.ts:**
- [ ] `generateScreenId()`
- [ ] `isValidScreenId()`
- [ ] `extractScreenNumber()`

**From db-metadata.ts:**
- [ ] `loadDbMetadata()`
- [ ] `findTableMeta()`
- [ ] Other: _________________

## Step 3: Migrate Useful Utilities (1 hour)

Create `src/features/screen-generator/utils/` and migrate selected functions.

### Task 3.1: Create Directory Structure

```bash
mkdir -p src/features/screen-generator/utils
touch src/features/screen-generator/utils/helpers.ts
touch src/features/screen-generator/utils/validators.ts
touch src/features/screen-generator/utils/formatters.ts
touch src/features/screen-generator/utils/index.ts
```

### Task 3.2: Migrate String Utilities

Create `src/features/screen-generator/utils/helpers.ts`:

```typescript
/**
 * String and utility helpers for screen generator
 */

export function capitalize(str: string): string {
  // Copy implementation from src/lib/screen-generator/utils/helpers.ts
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toKebabCase(str: string): string {
  // Copy implementation
}

export function toSnakeCase(str: string): string {
  // Copy implementation
}

export function toPascalCase(str: string): string {
  // Copy implementation
}

export function toCamelCase(str: string): string {
  // Copy implementation
}
```

### Task 3.3: Migrate Validators

Create `src/features/screen-generator/utils/validators.ts`:

```typescript
/**
 * Validation utilities for screen generator
 */

export function isValidScreenId(screenId: string): boolean {
  // Copy from id-generator.ts
  return /^SC[_A-Z0-9]+$/.test(screenId);
}

export function validateScreenSchema(schema: unknown): schema is ScreenSchema {
  // Use Zod schema validation
  return ScreenSchemaSchema.safeParse(schema).success;
}
```

### Task 3.4: Migrate Formatters

Create `src/features/screen-generator/utils/formatters.ts`:

```typescript
/**
 * Formatting utilities
 */

export function formatNumber(num: number, decimals = 0): string {
  // Copy implementation
}

export function formatDate(date: Date | string, format = 'YYYY-MM-DD'): string {
  // Copy implementation
}

export function sanitizeFilename(filename: string): string {
  // Copy implementation
}
```

### Task 3.5: Create Index Export

Create `src/features/screen-generator/utils/index.ts`:

```typescript
export * from './helpers';
export * from './validators';
export * from './formatters';
```

## Step 4: Delete Legacy Code (5 min)

Once utilities are migrated and verified:

```bash
# IMPORTANT: Create backup first
cp -r src/lib/screen-generator /tmp/screen-generator-backup

# Delete legacy code
rm -rf src/lib/screen-generator
```

## Step 5: Verification (15 min)

Run these checks:

```bash
# 1. Build should succeed
npm run build

# 2. Type check should pass
npm run type-check

# 3. No broken imports
grep -r "from '~/lib/screen-generator" src/ --include="*.ts" --include="*.tsx"
# Expected: No results

# 4. Tests should pass (if any)
npm run test
```

## Checklist

- [ ] Step 1: No dependencies found on legacy code
- [ ] Step 2: Useful utilities identified
- [ ] Step 3: Utilities migrated to new location
- [ ] Step 4: Legacy code deleted
- [ ] Step 5: Build succeeds
- [ ] Step 5: Type check passes
- [ ] Step 5: No broken imports
- [ ] Commit: "refactor: remove legacy screen-generator code (Phase 1)"

## Expected Results

**Before:**
- Total lines: 5,044
- Legacy code: 2,253 lines (45%)

**After:**
- Total lines: ~2,800
- Legacy code: 0 lines
- Reduction: 45% (2,253 lines removed)

## Notes for Copilot

- Be conservative: Only delete after verifying no dependencies
- Create backup before deletion
- If any imports are found, fix them first before deleting
- Commit frequently with descriptive messages
```

---

## Phase 2: 명명 규칙 표준화 (Week 1)

### 🎯 Copilot Prompt

```
# Task: Standardize Naming Conventions

## Context
Current naming is inconsistent:
- `src/features/screen-generator/` ✅ kebab-case
- `src/server/api/routers/screenGenerator/` ❌ camelCase
  - Subdirectories: `simpleGridCrud/` ❌ camelCase

## Objective
Standardize all directory names to kebab-case.

## Step 1: Rename Root Directory (5 min)

```bash
# Move directory
cd src/server/api/routers/
mv screenGenerator screen-generator
```

## Step 2: Rename Template Subdirectories (5 min)

```bash
cd src/server/api/routers/screen-generator/templates/

# Rename template directories
mv simpleGridCrud simple-grid-crud

# If other templates exist:
# mv complexGridCrud complex-grid-crud
# mv dashboardTemplate dashboard
```

## Step 3: Update Import Paths (30 min)

### Task 3.1: Update Server-side Imports

Find and replace all imports in the codebase:

```bash
# Find files that need updating
grep -r "screenGenerator" src/ --include="*.ts" --include="*.tsx" -l

# Replace screenGenerator -> screen-generator
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/screenGenerator/screen-generator/g' {} +

# Replace simpleGridCrud -> simple-grid-crud
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/simpleGridCrud/simple-grid-crud/g' {} +
```

### Task 3.2: Update tRPC Router Imports

Update `src/server/api/root.ts`:

```typescript
// Before
import { screenGeneratorRouter } from './routers/screenGenerator';

// After
import { screenGeneratorRouter } from './routers/screen-generator';
```

### Task 3.3: Update Procedure Imports

Update all files in `src/server/api/routers/screen-generator/procedures/`:

```typescript
// Before
import { SimpleGridCrudTemplate } from '../templates/simpleGridCrud';

// After
import { SimpleGridCrudTemplate } from '../templates/simple-grid-crud';
```

### Task 3.4: Update Template Internal Imports

Update files in `src/server/api/routers/screen-generator/templates/`:

```typescript
// Before
export * from './simpleGridCrud';

// After
export * from './simple-grid-crud';
```

## Step 4: Update File Names (Optional) (15 min)

Consider renaming files for consistency:

```bash
cd src/server/api/routers/screen-generator/templates/simple-grid-crud/

# Currently: SimpleGridCrudTemplate.ts (PascalCase)
# Keep as is - PascalCase is standard for class files

# But ensure index.ts uses kebab-case imports
```

## Step 5: Verification (15 min)

```bash
# 1. Build should succeed
npm run build

# 2. Type check
npm run type-check

# 3. Search for old naming patterns
grep -r "screenGenerator" src/ --include="*.ts" --include="*.tsx"
# Expected: Only in string literals or comments

grep -r "simpleGridCrud" src/ --include="*.ts" --include="*.tsx"
# Expected: Only in string literals or comments

# 4. Test imports
npm run dev
# Navigate to screen generator page and verify functionality
```

## Checklist

- [ ] Step 1: Root directory renamed
- [ ] Step 2: Template subdirectories renamed
- [ ] Step 3: All imports updated
- [ ] Step 4: File names reviewed
- [ ] Step 5: Build succeeds
- [ ] Step 5: Type check passes
- [ ] Step 5: No old naming found in code
- [ ] Step 5: Dev server runs successfully
- [ ] Commit: "refactor: standardize naming to kebab-case (Phase 2)"

## Notes for Copilot

- Use `sed` carefully - test on a few files first
- Keep class names in PascalCase (e.g., `SimpleGridCrudTemplate`)
- Only change directory and import paths
- Update `tsconfig.json` path aliases if needed
```

---

## Phase 3: 컴포넌트 분리 (Week 2-3)

### 🎯 Copilot Prompt

```
# Task: Implement Block Components

## Context
Currently using inline placeholder renderers (300+ lines in generated code).
Need actual production-ready UI components.

## Objective
Create 8 block components for the screen generator.

---

## Step 1: Create Directory Structure (5 min)

```bash
mkdir -p src/features/screen-generator/components/blocks
mkdir -p src/features/screen-generator/components/preview
touch src/features/screen-generator/components/blocks/index.ts
touch src/features/screen-generator/components/preview/index.ts
```

---

## Step 2: Implement PageHeaderBlock (30 min)

### Task 2.1: Create Component File

Create `src/features/screen-generator/components/blocks/PageHeaderBlock.tsx`:

```typescript
'use client';

import React from 'react';
import type { PageHeaderBlockProps } from '../../types/block-schema';

/**
 * PageHeaderBlock Component
 *
 * Renders page header with title, description, breadcrumbs, and action buttons.
 */
export function PageHeaderBlock({
  title,
  description,
  breadcrumbs,
  actions,
  className,
  style,
}: PageHeaderBlockProps) {
  return (
    <header className={`mb-6 ${className || ''}`} style={style}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex mb-2 text-sm text-gray-600">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <a href={item.href} className="hover:text-blue-600">
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>

        {/* Action Buttons */}
        {actions && actions.length > 0 && (
          <div className="flex gap-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  // Handle onClick - will be implemented in Phase 4
                  console.log('Action:', action.onClick);
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                  transition-colors
                  ${action.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : action.variant === 'secondary'
                    ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    : 'bg-transparent text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {action.icon && (
                  <span className="w-4 h-4">{/* Icon placeholder */}</span>
                )}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
```

**Requirements:**
- Use Tailwind CSS for styling
- Support all props from `PageHeaderBlockProps` type
- Handle missing optional props gracefully
- Add hover effects for interactive elements
- Use semantic HTML (`<header>`, `<nav>`)

---

## Step 3: Implement SearchFormBlock (2 hours)

### Task 3.1: Create Component File

Create `src/features/screen-generator/components/blocks/SearchFormBlock.tsx`:

```typescript
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SearchFormBlockProps, SearchField } from '../../types/block-schema';

// Import common form components
import { BiSiteSelect } from '~/components/master/BiSiteSelect';
import { BiYearMonthPicker } from '~/components/master/BiYearMonthPicker';
import { BiScenarioSelect } from '~/components/master/BiScenarioSelect';

/**
 * SearchFormBlock Component
 *
 * Renders a search form with various field types.
 * Supports 10 field types: text, number, date, dateRange, select, multiSelect,
 * siteSelect, scenarioSelect, yearMonthPicker, checkbox.
 */
export function SearchFormBlock({
  fields,
  searchButtonLabel = '검색',
  showResetButton = true,
  resetButtonLabel = '초기화',
  onSearch,
  onReset,
  collapsible = false,
  defaultCollapsed = false,
  className,
  style,
}: SearchFormBlockProps) {
  const { register, handleSubmit, reset, watch } = useForm();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleSearchSubmit = (data: any) => {
    console.log('Search data:', data);
    // onSearch will be implemented in Phase 4
  };

  const handleResetClick = () => {
    reset();
    console.log('Reset form');
    // onReset will be implemented in Phase 4
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 ${className || ''}`} style={style}>
      {/* Collapsible Header */}
      {collapsible && (
        <div
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h3 className="text-sm font-semibold text-gray-700">검색 조건</h3>
          <button type="button" className="text-gray-500">
            {isCollapsed ? '▼' : '▲'}
          </button>
        </div>
      )}

      {/* Form */}
      {!isCollapsed && (
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
          {/* Fields Grid */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className={`col-span-${field.width || 3}`}
              >
                {renderField(field, register)}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              {searchButtonLabel}
            </button>
            {showResetButton && (
              <button
                type="button"
                onClick={handleResetClick}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 text-sm font-medium"
              >
                {resetButtonLabel}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Render individual field based on type
 */
function renderField(field: SearchField, register: any) {
  const baseInputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  switch (field.type) {
    case 'siteSelect':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600 ml-1">*</span>}
          </label>
          <BiSiteSelect
            {...register(field.name, { required: field.required })}
            defaultValue={field.defaultValue as string}
          />
        </div>
      );

    case 'yearMonthPicker':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600 ml-1">*</span>}
          </label>
          <BiYearMonthPicker
            {...register(field.name, { required: field.required })}
          />
        </div>
      );

    case 'scenarioSelect':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600 ml-1">*</span>}
          </label>
          <BiScenarioSelect
            {...register(field.name, { required: field.required })}
            defaultValue={field.defaultValue as string}
          />
        </div>
      );

    case 'text':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600 ml-1">*</span>}
          </label>
          <input
            type="text"
            {...register(field.name, { required: field.required })}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        </div>
      );

    case 'number':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600 ml-1">*</span>}
          </label>
          <input
            type="number"
            {...register(field.name, { required: field.required })}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        </div>
      );

    case 'date':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600 ml-1">*</span>}
          </label>
          <input
            type="date"
            {...register(field.name, { required: field.required })}
            className={baseInputClass}
          />
        </div>
      );

    case 'select':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600 ml-1">*</span>}
          </label>
          <select
            {...register(field.name, { required: field.required })}
            className={baseInputClass}
          >
            <option value="">선택하세요</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            {...register(field.name)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">
            {field.label}
          </label>
        </div>
      );

    default:
      return (
        <div className="text-sm text-red-600">
          Unsupported field type: {field.type}
        </div>
      );
  }
}
```

**Requirements:**
- Support all 10 field types
- Use react-hook-form for form management
- Integrate with existing BiSiteSelect, BiYearMonthPicker, BiScenarioSelect components
- Add validation indicators (required fields)
- Responsive grid layout (12-column system)
- Collapsible feature support

---

## Step 4-8: Implement Remaining Blocks (Continue in same pattern)

For each block, create:
1. Component file (`{BlockName}Block.tsx`)
2. Props from block-schema.ts
3. Tailwind styling
4. Event handler placeholders (for Phase 4)

### Blocks to Implement:

**Step 4: DataGridBlock** (3 hours)
- File: `DataGridBlock.tsx`
- Use AG Grid React
- Support all GridColumn props
- Implement row selection, sorting, filtering

**Step 5: KpiWidgetBlock** (1 hour)
- File: `KpiWidgetBlock.tsx`
- Display KPI value with unit
- Show change rate with trend indicator
- Support theme colors

**Step 6: ChartWidgetBlock** (2 hours)
- File: `ChartWidgetBlock.tsx`
- Use Recharts library
- Support 7 chart types (LINE, BAR, PIE, etc.)
- Handle data loading from API

**Step 7: ToolbarBlock** (1 hour)
- File: `ToolbarBlock.tsx`
- Render button group
- Support 5 button variants
- Handle alignment options

**Step 8: TabContainerBlock** (2 hours)
- File: `TabContainerBlock.tsx`
- Implement tab navigation
- Recursive block rendering (tabs contain blocks)
- Tab state management

**Step 9: CustomBlock** (30 min)
- File: `CustomBlock.tsx`
- Dynamic component loading
- Pass props to custom component

---

## Step 9: Create Index Exports (15 min)

Create `src/features/screen-generator/components/blocks/index.ts`:

```typescript
export { PageHeaderBlock } from './PageHeaderBlock';
export { SearchFormBlock } from './SearchFormBlock';
export { DataGridBlock } from './DataGridBlock';
export { KpiWidgetBlock } from './KpiWidgetBlock';
export { ChartWidgetBlock } from './ChartWidgetBlock';
export { ToolbarBlock } from './ToolbarBlock';
export { TabContainerBlock } from './TabContainerBlock';
export { CustomBlock } from './CustomBlock';
```

---

## Step 10: Update BlockRenderer (30 min)

Update `src/features/screen-generator/engine/BlockRenderer.tsx` to use real components:

```typescript
'use client';

import React from 'react';
import type { Block } from '../types/block-schema';
import {
  PageHeaderBlock,
  SearchFormBlock,
  DataGridBlock,
  KpiWidgetBlock,
  ChartWidgetBlock,
  ToolbarBlock,
  TabContainerBlock,
  CustomBlock,
} from '../components/blocks';

/**
 * BlockRenderer - Production version
 * Uses actual UI components instead of placeholders
 */
export function BlockRenderer({ block }: { block: Block }) {
  if (block.visible === false) return null;

  switch (block.type) {
    case 'PAGE_HEADER':
      return <PageHeaderBlock {...block} />;

    case 'SEARCH_FORM':
      return <SearchFormBlock {...block} />;

    case 'DATA_GRID':
      return <DataGridBlock {...block} />;

    case 'KPI_WIDGET':
      return <KpiWidgetBlock {...block} />;

    case 'CHART_WIDGET':
      return <ChartWidgetBlock {...block} />;

    case 'TOOLBAR':
      return <ToolbarBlock {...block} />;

    case 'TAB_CONTAINER':
      return <TabContainerBlock {...block} />;

    case 'CUSTOM':
      return <CustomBlock {...block} />;

    default:
      return (
        <div className="border-2 border-red-500 bg-red-50 p-4 rounded">
          <p className="text-red-900 font-semibold">
            Unknown block type: {(block as any).type}
          </p>
        </div>
      );
  }
}
```

---

## Verification Checklist

- [ ] All 8 block components created
- [ ] Each component matches its Props interface
- [ ] Tailwind CSS styling applied
- [ ] Components render without errors
- [ ] BlockRenderer updated to use real components
- [ ] Build succeeds (`npm run build`)
- [ ] Type check passes (`npm run type-check`)
- [ ] Visual inspection in Storybook/dev server
- [ ] Commit: "feat: implement block components (Phase 3)"

## Notes for Copilot

- Use existing shadcn/ui components where possible
- Follow IBM Carbon Design color scheme
- Add accessibility attributes (aria-labels, roles)
- Keep components pure - no business logic
- Event handlers will be implemented in Phase 4
- Focus on UI presentation only
```

---

## Phase 4: 코드 생성 로직 분리 (Week 3)

### 🎯 Copilot Prompt

```
# Task: Separate Code Generation Logic

## Context
Currently, `SimpleGridCrudTemplate` generates both ScreenSchema and React code.
Need to separate concerns: Template generates schema, Generator generates code.

## Objective
Create dedicated generator classes for code generation.

---

## Step 1: Create Generator Directory (5 min)

```bash
mkdir -p src/server/api/routers/screen-generator/generators
touch src/server/api/routers/screen-generator/generators/component-generator.ts
touch src/server/api/routers/screen-generator/generators/api-generator.ts
touch src/server/api/routers/screen-generator/generators/schema-generator.ts
touch src/server/api/routers/screen-generator/generators/index.ts
```

---

## Step 2: Implement ComponentGenerator (2 hours)

Create `src/server/api/routers/screen-generator/generators/component-generator.ts`:

```typescript
import type { ScreenSchema } from '~/features/screen-generator/types/block-schema';

/**
 * ComponentGenerator
 *
 * Generates React component code from ScreenSchema.
 * Supports both production and preview modes.
 */
export class ComponentGenerator {
  /**
   * Generate production-ready component
   * Uses actual BlockRenderer from features/screen-generator
   */
  generateProductionComponent(
    schema: ScreenSchema,
    componentName: string
  ): string {
    const schemaCode = JSON.stringify(schema, null, 2);

    return `'use client';

import { ScreenRenderer } from '~/features/screen-generator/engine/BlockRenderer';
import type { ScreenSchema } from '~/features/screen-generator/types/block-schema';

/**
 * ${schema.screenName}
 *
 * @generated by AI Factory Lab - Block-based Architecture
 * @version ${schema.metadata?.version ?? '1.0'}
 * @created ${schema.metadata?.createdAt ?? new Date().toISOString()}
 */

const schema: ScreenSchema = ${schemaCode};

export default function ${componentName}() {
  return <ScreenRenderer schema={schema} />;
}
`;
  }

  /**
   * Generate preview component for Sandpack
   * Uses inline simplified renderer
   */
  generatePreviewComponent(
    schema: ScreenSchema,
    componentName: string
  ): string {
    const schemaCode = JSON.stringify(schema, null, 2);
    const inlineRenderer = this.generateInlineRenderer();

    return `'use client';

import React from 'react';

/**
 * ${schema.screenName} (Preview Mode)
 *
 * @generated by AI Factory Lab
 */

${inlineRenderer}

const schema = ${schemaCode};

export default function ${componentName}() {
  return <ScreenRenderer schema={schema} />;
}
`;
  }

  /**
   * Generate inline renderer for Sandpack preview
   * Simplified version without external dependencies
   */
  private generateInlineRenderer(): string {
    // Copy the inline renderer from SimpleGridCrudTemplate
    // This should be a simplified version that works in Sandpack
    return `
// Inline Block Renderer (Preview Mode)
function BlockRenderer({ block }) {
  if (block.visible === false) return null;

  const baseClass = "border-2 rounded-lg p-4 mb-4";

  switch (block.type) {
    case 'PAGE_HEADER':
      return (
        <div className={\`\${baseClass} border-blue-300 bg-blue-50\`}>
          <h1 className="text-2xl font-bold text-blue-900">{block.title}</h1>
          {block.description && (
            <p className="text-blue-700 mt-2">{block.description}</p>
          )}
        </div>
      );

    case 'SEARCH_FORM':
      return (
        <div className={\`\${baseClass} border-green-300 bg-green-50\`}>
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            🔍 검색 폼
          </h3>
          <div className="flex flex-wrap gap-2">
            {block.fields?.map((field) => (
              <div key={field.name} className="px-2 py-1 bg-green-100 rounded text-xs">
                {field.label} ({field.type})
              </div>
            ))}
          </div>
        </div>
      );

    // ... other block types (copy from existing inline renderer)

    default:
      return (
        <div className={\`\${baseClass} border-red-500 bg-red-50\`}>
          <h3 className="text-red-900">Unknown block: {block.type}</h3>
        </div>
      );
  }
}

function ScreenRenderer({ schema }) {
  const sortedBlocks = [...(schema.blocks || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="p-4 bg-white">
      {sortedBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
`;
  }

  /**
   * Detect if running in Sandpack environment
   */
  private isPreviewMode(filePath: string): boolean {
    return filePath.includes('/temp/') || filePath.includes('/preview/');
  }
}
```

**Requirements:**
- Separate production and preview code generation
- Keep inline renderer for Sandpack compatibility
- Use actual BlockRenderer for production
- Add metadata in generated code comments

---

## Step 3: Implement ApiGenerator (1 hour)

Create `src/server/api/routers/screen-generator/generators/api-generator.ts`:

```typescript
import type { CrudConfig, CrudColumnDef } from '../types/parsed-data';

/**
 * ApiGenerator
 *
 * Generates tRPC API router code for CRUD operations.
 */
export class ApiGenerator {
  /**
   * Generate tRPC router code
   */
  generateApiRouter(
    routerName: string,
    tableName: string,
    config: CrudConfig,
    columns: CrudColumnDef[]
  ): string {
    const pkField = config.primaryKey;
    const prismaModelName = this.toCamelCase(tableName);

    return `/**
 * ${routerName} - Auto-generated CRUD API
 *
 * @generated by AI Factory Lab
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { db } from '~/server/db';

// Search params schema
const searchParamsSchema = z.object({
  site: z.string(),
  yyyymm: z.string(),
  scenario: z.string(),
});

// Row data schema
const rowSchema = z.object({
${this.generateZodSchema(columns)}
});

// Save input schema
const saveInputSchema = z.object({
  inserts: z.array(rowSchema),
  updates: z.array(rowSchema),
  deletes: z.array(z.string()),
});

export const ${routerName}Router = createTRPCRouter({
  // Get all records
  getAll: publicProcedure
    .input(searchParamsSchema)
    .query(async ({ input }) => {
      const result = await db.${prismaModelName}.findMany({
        where: {
          plant_site_code: input.site,
          yyyymm: input.yyyymm,
          scenario_code: input.scenario,
          ${config.softDelete ? `delete_yn: 'N',` : ''}
        },
        orderBy: { ${config.sortColumn ?? pkField}: '${config.sortDirection ?? 'asc'}' },
      });
      return result;
    }),

  // Get by ID
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db.${prismaModelName}.findUnique({
        where: { ${pkField}: input },
      });
      return result;
    }),

  // Batch save (Insert/Update/Delete)
  save: publicProcedure
    .input(saveInputSchema)
    .mutation(async ({ input }) => {
      const { inserts, updates, deletes } = input;

      await db.$transaction(async (tx) => {
        // Insert
        if (inserts.length > 0) {
          await tx.${prismaModelName}.createMany({
            data: inserts.map(row => ({
              ...row,
              ${config.auditColumns ? `created_at: new Date(),\n              updated_at: new Date(),` : ''}
            })),
          });
        }

        // Update
        for (const row of updates) {
          await tx.${prismaModelName}.update({
            where: { ${pkField}: row.${pkField} },
            data: {
              ...row,
              ${config.auditColumns ? `updated_at: new Date(),` : ''}
            },
          });
        }

        // Delete
        if (deletes.length > 0) {
          ${config.softDelete
            ? `await tx.${prismaModelName}.updateMany({
            where: { ${pkField}: { in: deletes } },
            data: { delete_yn: 'Y', updated_at: new Date() },
          });`
            : `await tx.${prismaModelName}.deleteMany({
            where: { ${pkField}: { in: deletes } },
          });`
          }
        }
      });

      return {
        success: true,
        insertedCount: inserts.length,
        updatedCount: updates.length,
        deletedCount: deletes.length,
      };
    }),
});
`;
  }

  /**
   * Generate Zod schema for columns
   */
  private generateZodSchema(columns: CrudColumnDef[]): string {
    return columns.map(col => {
      let zodType: string;

      switch (col.editorType) {
        case 'number':
          zodType = 'z.number()';
          break;
        case 'checkbox':
          zodType = 'z.boolean()';
          break;
        case 'date':
        case 'datetime':
          zodType = 'z.string()';
          break;
        default:
          zodType = 'z.string()';
      }

      if (!col.required) {
        zodType += '.nullable().optional()';
      }

      if (col.maxLength && col.editorType === 'text') {
        zodType = `z.string().max(${col.maxLength})${col.required ? '' : '.nullable().optional()'}`;
      }

      return `  ${col.field}: ${zodType},`;
    }).join('\n');
  }

  private toCamelCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}
```

---

## Step 4: Update SimpleGridCrudTemplate (1 hour)

Refactor `src/server/api/routers/screen-generator/templates/simple-grid-crud/SimpleGridCrudTemplate.ts`:

```typescript
import { ComponentGenerator } from '../../generators/component-generator';
import { ApiGenerator } from '../../generators/api-generator';

export class SimpleGridCrudTemplate extends BaseTemplate {
  private componentGenerator = new ComponentGenerator();
  private apiGenerator = new ApiGenerator();

  /**
   * Generate component (now delegates to ComponentGenerator)
   */
  async generateComponent(data: ParsedData): Promise<ComponentGenerationResult> {
    if (!isCrudParsedData(data)) {
      return this.createErrorResult('Invalid data', data.screenId ?? 'unknown');
    }

    const screenId = data.screenId ?? 'SC000';
    const componentName = this.getComponentName(screenId, data.screenName);

    try {
      // Generate ScreenSchema
      const schema = this.generateScreenSchema(data);

      // Delegate code generation to ComponentGenerator
      const isPreview = this.isPreviewMode();
      const code = isPreview
        ? this.componentGenerator.generatePreviewComponent(schema, componentName)
        : this.componentGenerator.generateProductionComponent(schema, componentName);

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
   * Generate API (now delegates to ApiGenerator)
   */
  async generateApi(data: ParsedData): Promise<ApiGenerationResult> {
    if (!isCrudParsedData(data)) {
      return {
        success: false,
        routerPath: '',
        routerCode: '',
        procedures: [],
        error: 'Invalid data',
      };
    }

    const screenId = data.screenId ?? 'SC000';
    const routerName = this.getRouterName(screenId);
    const tableName = data.tableName ?? 'unknown_table';
    const { crudConfig, crudColumns } = data;

    try {
      // Delegate to ApiGenerator
      const routerCode = this.apiGenerator.generateApiRouter(
        routerName,
        tableName,
        crudConfig,
        crudColumns
      );

      return {
        success: true,
        routerPath: `src/server/api/routers/generated/${routerName}.ts`,
        routerCode,
        procedures: ['getAll', 'getById', 'save'],
      };
    } catch (error) {
      return {
        success: false,
        routerPath: '',
        routerCode: '',
        procedures: [],
        error: `API generation failed: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  // Keep generateScreenSchema() as is
  // This is the core template logic
}
```

---

## Step 5: Create Index Exports (5 min)

Create `src/server/api/routers/screen-generator/generators/index.ts`:

```typescript
export { ComponentGenerator } from './component-generator';
export { ApiGenerator } from './api-generator';
```

---

## Verification Checklist

- [ ] ComponentGenerator created and tested
- [ ] ApiGenerator created and tested
- [ ] SimpleGridCrudTemplate refactored
- [ ] Both production and preview modes work
- [ ] Generated code compiles without errors
- [ ] API router code is valid
- [ ] Build succeeds
- [ ] Type check passes
- [ ] Commit: "refactor: separate code generation logic (Phase 4)"

## Notes for Copilot

- Keep template logic (schema generation) in templates
- Move code generation to generators
- Support both production and preview modes
- Maintain backward compatibility
```

---

## Phase 5-6: (To be continued)

_프롬프트가 너무 길어져서 여기서 일단 끊습니다. Phase 5-6는 별도 파일로 작성하겠습니다._

---

## 📝 사용 방법

### Copilot에게 프롬프트 전달하기

1. **Phase 선택**
   - 순서대로 진행 (Phase 1 → 2 → 3 → ...)

2. **프롬프트 복사**
   - 해당 Phase의 전체 프롬프트 복사

3. **Copilot에게 전달**
   - GitHub Copilot Chat에 붙여넣기
   - 또는 코드 에디터에서 주석으로 작성

4. **단계별 실행**
   - Step 1부터 순차적으로 진행
   - 각 Step 완료 후 체크리스트 확인

5. **검증**
   - Verification 섹션의 모든 항목 확인
   - 빌드 및 타입 체크 통과 확인

### 예시

```typescript
// Copilot Chat에 입력:
//
// Phase 1: 레거시 코드 제거를 진행하려고 합니다.
// 다음 프롬프트를 따라 작업해주세요:
//
// [Phase 1 프롬프트 전체 복사]
```

---

## 🎯 다음 단계

Phase 5-6 프롬프트는 별도 파일로 작성하시겠습니까?

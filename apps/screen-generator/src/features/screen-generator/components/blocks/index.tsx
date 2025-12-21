/**
 * Block Components Index
 * 
 * 블록 기반 UI 컴포넌트들을 통합 export
 * 
 * @module features/screen-generator/components/blocks
 */

'use client';

import React from 'react';

// Individual Block Components
export { PageHeaderBlock } from './PageHeaderBlock';
export { SearchFormBlock } from './SearchFormBlock';
export { DataGridBlock } from './DataGridBlock';
export { KpiWidgetBlock } from './KpiWidgetBlock';
export { ChartWidgetBlock } from './ChartWidgetBlock';
export { ToolbarBlock } from './ToolbarBlock';
export { TabContainerBlock } from './TabContainerBlock';
export { CustomBlock } from './CustomBlock';

// Block Type Registry
import { PageHeaderBlock } from './PageHeaderBlock';
import { SearchFormBlock } from './SearchFormBlock';
import { DataGridBlock } from './DataGridBlock';
import { KpiWidgetBlock } from './KpiWidgetBlock';
import { ChartWidgetBlock } from './ChartWidgetBlock';
import { ToolbarBlock } from './ToolbarBlock';
import { TabContainerBlock } from './TabContainerBlock';
import { CustomBlock } from './CustomBlock';

import type { Block } from '../../types/block-schema';

/**
 * 블록을 렌더링하는 함수
 * BlockRenderer에서 사용
 */
export function renderBlockByType(block: Block): React.ReactNode {
  switch (block.type) {
    case 'PAGE_HEADER':
      return <PageHeaderBlock {...block} />;
    case 'SEARCH_FORM':
      return <SearchFormBlock {...block} />;
    case 'DATA_GRID':
      return <DataGridBlock {...block} />;
    case 'KPI_WIDGET':
      return <KpiWidgetBlock block={block} />;
    case 'CHART_WIDGET':
      return <ChartWidgetBlock block={block} />;
    case 'TOOLBAR':
      return <ToolbarBlock block={block} />;
    case 'TAB_CONTAINER':
      return <TabContainerBlock block={block} />;
    case 'CUSTOM':
      return <CustomBlock block={block} />;
    default:
      return null;
  }
}

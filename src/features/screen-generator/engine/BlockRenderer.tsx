/**
 * 블록 렌더러 (Block Renderer)
 *
 * BlockConfig를 받아 적절한 UI 컴포넌트를 렌더링하는 조립 엔진
 * Phase 2: 각 블록 타입별 Placeholder UI 구현
 *
 * @module features/screen-generator/engine/BlockRenderer
 */

'use client';

import React from 'react';
import type {
  Block,
  ScreenSchema,
  PageHeaderBlockProps,
  SearchFormBlockProps,
  DataGridBlockProps,
  KpiWidgetBlockProps,
  ChartWidgetBlockProps,
  ToolbarBlockProps,
  TabContainerBlockProps,
  CustomBlockProps,
} from '../types/block-schema';
import {
  BlockType,
  LayoutType,
  isPageHeaderBlock,
  isSearchFormBlock,
  isDataGridBlock,
  isKpiWidgetBlock,
  isChartWidgetBlock,
  isToolbarBlock,
  isTabContainerBlock,
  isCustomBlock,
} from '../types/block-schema';

// ============================================================
// Block Renderer Props
// ============================================================

interface BlockRendererProps {
  block: Block;
}

// ============================================================
// Individual Block Placeholders
// ============================================================

/**
 * PAGE_HEADER 블록 Placeholder
 */
function PageHeaderPlaceholder({ block }: { block: PageHeaderBlockProps }) {
  return (
    <div className="border-2 border-blue-300 bg-blue-50 p-6 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">{block.title}</h1>
          {block.description && (
            <p className="text-blue-700 mt-2">{block.description}</p>
          )}
          {block.breadcrumbs && (
            <div className="text-sm text-blue-600 mt-2">
              Breadcrumbs: {block.breadcrumbs.map((b) => b.label).join(' > ')}
            </div>
          )}
        </div>
        {block.actions && block.actions.length > 0 && (
          <div className="flex gap-2">
            {block.actions.map((action, idx) => (
              <div
                key={idx}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                {action.icon && `[${action.icon}] `}
                {action.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * SEARCH_FORM 블록 Placeholder
 */
function SearchFormPlaceholder({ block }: { block: SearchFormBlockProps }) {
  return (
    <div className="border-2 border-green-300 bg-green-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-green-900 mb-3">
        🔍 검색 폼 영역
      </h3>
      <div className="text-sm text-green-700 space-y-1">
        <div>필터 개수: {block.fields.length}개</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {block.fields.map((field) => (
            <div
              key={field.name}
              className="px-2 py-1 bg-green-100 rounded text-xs"
            >
              {field.label} ({field.type})
              {field.required && <span className="text-red-600"> *</span>}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">
            {block.searchButtonLabel || '검색'}
          </button>
          {block.showResetButton && (
            <button className="px-3 py-1 bg-gray-400 text-white rounded text-sm">
              {block.resetButtonLabel || '초기화'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * DATA_GRID 블록 Placeholder
 */
function DataGridPlaceholder({ block }: { block: DataGridBlockProps }) {
  return (
    <div className="border-2 border-purple-300 bg-purple-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-purple-900 mb-3">
        📊 데이터 그리드 영역
      </h3>
      <div className="text-sm text-purple-700 space-y-1">
        <div>테이블: <code className="bg-purple-100 px-1 rounded">{block.tableName}</code></div>
        <div>기본키: <code className="bg-purple-100 px-1 rounded">{block.primaryKey}</code></div>
        <div>컬럼 개수: {block.columns.length}개</div>
        <div>API 엔드포인트: {block.apiEndpoint}</div>
        {block.selectColumns && (
          <div>조회 컬럼: {block.selectColumns.join(', ')}</div>
        )}
        {block.rowSelection && (
          <div>행 선택 모드: {block.rowSelection}</div>
        )}
        {(block.enableSelection || block.showCheckboxSelection) && (
          <div className="text-green-600 font-semibold">✓ 체크박스 선택 활성화</div>
        )}
        {block.pagination && (
          <div>페이지 크기: {block.pageSize || 50}개</div>
        )}
        {block.editable && (
          <div className="text-blue-600 font-semibold">✓ 편집 모드</div>
        )}
        <div className="text-xs text-purple-600 mt-2 space-y-1">
          {block.onDelete && <div>삭제: {block.onDelete}</div>}
          {block.onSave && <div>저장: {block.onSave}</div>}
          {block.onCreate && <div>추가: {block.onCreate}</div>}
        </div>
        <div className="mt-3 bg-purple-100 p-2 rounded">
          <div className="grid grid-cols-4 gap-2 font-semibold text-xs">
            {block.columns.slice(0, 4).map((col) => (
              <div key={col.field} className="truncate">
                {col.headerName}
              </div>
            ))}
          </div>
          <div className="text-center text-purple-400 mt-2">
            [데이터 로드 대기 중...]
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * KPI_WIDGET 블록 Placeholder
 */
function KpiWidgetPlaceholder({ block }: { block: KpiWidgetBlockProps }) {
  const themeColors: Record<string, string> = {
    primary: 'bg-blue-100 border-blue-400 text-blue-900',
    success: 'bg-green-100 border-green-400 text-green-900',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-900',
    danger: 'bg-red-100 border-red-400 text-red-900',
    info: 'bg-cyan-100 border-cyan-400 text-cyan-900',
  };

  const theme = block.theme || 'primary';
  const colorClass = themeColors[theme];

  return (
    <div className={`border-2 ${colorClass} p-4 rounded-lg mb-4`}>
      <div className="flex items-center justify-between">
        <div>
          {block.icon && (
            <span className="text-2xl mb-2 block">[{block.icon}]</span>
          )}
          <h4 className="text-sm font-medium opacity-80">{block.title}</h4>
          <div className="text-3xl font-bold mt-1">
            {block.value}
            {block.unit && <span className="text-lg ml-1">{block.unit}</span>}
          </div>
          {block.showChangeRate && block.changeRate !== undefined && (
            <div
              className={`text-sm mt-2 ${
                block.changeRate >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {block.changeRate >= 0 ? '↑' : '↓'} {Math.abs(block.changeRate)}%
            </div>
          )}
        </div>
        {block.showTrendChart && (
          <div className="w-24 h-16 bg-white bg-opacity-50 rounded flex items-center justify-center text-xs opacity-60">
            [차트]
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * CHART_WIDGET 블록 Placeholder
 */
function ChartWidgetPlaceholder({ block }: { block: ChartWidgetBlockProps }) {
  const height = block.height || 300;

  return (
    <div className="border-2 border-orange-300 bg-orange-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-orange-900 mb-3">
        {block.title}
      </h3>
      <div className="text-sm text-orange-700 mb-3 space-y-1">
        <div>차트 타입: {block.chartType}</div>
        <div>데이터 API: {block.dataApi}</div>
        {block.xField && <div>X축: {block.xField}</div>}
        {block.yField && (
          <div>
            Y축: {Array.isArray(block.yField) ? block.yField.join(', ') : block.yField}
          </div>
        )}
      </div>
      <div
        className="bg-orange-100 rounded flex items-center justify-center text-orange-400"
        style={{ height: `${height}px` }}
      >
        📈 [{block.chartType} 차트 영역]
      </div>
    </div>
  );
}

/**
 * TOOLBAR 블록 Placeholder
 */
function ToolbarPlaceholder({ block }: { block: ToolbarBlockProps }) {
  const alignmentClass: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    'space-between': 'justify-between',
  };

  const alignment = block.alignment || 'left';
  const size = block.size || 'medium';
  const sizeClass = size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className="border-2 border-gray-300 bg-gray-50 p-3 rounded-lg mb-4">
      <div className={`flex ${alignmentClass[alignment]} gap-2`}>
        {block.buttons.map((button) => {
          const variantColors: Record<string, string> = {
            primary: 'bg-blue-600 text-white',
            secondary: 'bg-gray-600 text-white',
            success: 'bg-green-600 text-white',
            danger: 'bg-red-600 text-white',
            ghost: 'bg-transparent border border-gray-400 text-gray-700',
          };

          const variant = button.variant || 'primary';
          const colorClass = variantColors[variant];

          return (
            <button
              key={button.id}
              className={`px-3 py-1.5 ${colorClass} rounded ${sizeClass}`}
              disabled={button.disabled === true}
              title={button.tooltip}
            >
              {button.icon && `[${button.icon}] `}
              {button.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * TAB_CONTAINER 블록 Placeholder
 */
function TabContainerPlaceholder({ block }: { block: TabContainerBlockProps }) {
  const [activeTab, setActiveTab] = React.useState(
    block.defaultActiveTab || block.tabs[0]?.id
  );

  const currentTab = block.tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="border-2 border-indigo-300 bg-indigo-50 rounded-lg mb-4">
      {/* Tab Headers */}
      <div className="flex border-b-2 border-indigo-300 bg-indigo-100">
        {block.tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? 'bg-indigo-50 text-indigo-900 border-b-2 border-indigo-600'
                : 'text-indigo-600 hover:bg-indigo-50'
            } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {tab.icon && `[${tab.icon}] `}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {currentTab && (
          <div>
            <div className="text-sm text-indigo-700 mb-3">
              탭 내부 블록 개수: {currentTab.blocks.length}개
            </div>
            <div className="space-y-2">
              {currentTab.blocks.map((childBlock) => (
                <BlockRenderer key={childBlock.id} block={childBlock} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * CUSTOM 블록 Placeholder
 */
function CustomBlockPlaceholder({ block }: { block: CustomBlockProps }) {
  return (
    <div className="border-2 border-pink-300 bg-pink-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-pink-900 mb-3">
        🎨 커스텀 블록
      </h3>
      <div className="text-sm text-pink-700 space-y-1">
        <div>컴포넌트 이름: {block.componentName}</div>
        {block.componentProps && (
          <div className="mt-2 bg-pink-100 p-2 rounded">
            <div className="font-semibold mb-1">Props:</div>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(block.componentProps, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 알 수 없는 블록 타입 에러 UI
 */
function UnknownBlockError({ block }: { block: Block }) {
  return (
    <div className="border-2 border-red-500 bg-red-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        ⚠️ 알 수 없는 블록입니다
      </h3>
      <div className="text-sm text-red-700">
        <div>블록 ID: {block.id}</div>
        <div>블록 타입: {block.type}</div>
        <div className="mt-2 bg-red-100 p-2 rounded">
          <pre className="text-xs overflow-auto">
            {JSON.stringify(block, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Block Renderer
// ============================================================

/**
 * BlockRenderer 컴포넌트
 *
 * block.type에 따라 적절한 Placeholder UI를 렌더링
 * 타입 가드를 사용하여 타입 안전성 보장
 */
export function BlockRenderer({ block }: BlockRendererProps) {
  // 조건부 렌더링 체크
  if (block.visible === false) {
    return null;
  }

  // Type Guards를 사용한 타입 안전한 렌더링
  if (isPageHeaderBlock(block)) {
    return <PageHeaderPlaceholder block={block} />;
  }

  if (isSearchFormBlock(block)) {
    return <SearchFormPlaceholder block={block} />;
  }

  if (isDataGridBlock(block)) {
    return <DataGridPlaceholder block={block} />;
  }

  if (isKpiWidgetBlock(block)) {
    return <KpiWidgetPlaceholder block={block} />;
  }

  if (isChartWidgetBlock(block)) {
    return <ChartWidgetPlaceholder block={block} />;
  }

  if (isToolbarBlock(block)) {
    return <ToolbarPlaceholder block={block} />;
  }

  if (isTabContainerBlock(block)) {
    return <TabContainerPlaceholder block={block} />;
  }

  if (isCustomBlock(block)) {
    return <CustomBlockPlaceholder block={block} />;
  }

  // 알 수 없는 블록 타입
  return <UnknownBlockError block={block} />;
}

// ============================================================
// Screen Renderer
// ============================================================

interface ScreenRendererProps {
  schema: ScreenSchema;
}

/**
 * ScreenRenderer 컴포넌트
 *
 * ScreenSchema를 받아 전체 화면을 렌더링
 * layout에 따라 블록 배치 방식을 결정
 */
export function ScreenRenderer({ schema }: ScreenRendererProps) {
  const { layout, blocks } = schema;

  // 블록을 order 순으로 정렬
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  // 레이아웃별 클래스 매핑
  const getLayoutClass = () => {
    switch (layout.type) {
      case LayoutType.SINGLE_COLUMN:
        return 'flex flex-col';

      case LayoutType.TWO_COLUMNS: {
        const ratio = layout.columnRatio || [1, 1];
        return `grid grid-cols-12 gap-${layout.gap || 4}`;
      }

      case LayoutType.GRID:
        return `grid grid-cols-${layout.columns || 3} gap-${layout.gap || 4}`;

      case LayoutType.DASHBOARD:
        return `grid grid-cols-12 gap-${layout.gap || 4}`;

      default:
        return 'flex flex-col';
    }
  };

  // 2컬럼 레이아웃인 경우 블록을 좌/우로 분할
  if (layout.type === LayoutType.TWO_COLUMNS) {
    const ratio = layout.columnRatio || [2, 1];
    const totalRatio = ratio[0] + ratio[1];
    const leftCols = Math.round((ratio[0] / totalRatio) * 12);
    const rightCols = 12 - leftCols;

    const midPoint = Math.ceil(sortedBlocks.length / 2);
    const leftBlocks = sortedBlocks.slice(0, midPoint);
    const rightBlocks = sortedBlocks.slice(midPoint);

    return (
      <div
        className={`${getLayoutClass()} p-${layout.padding || 4}`}
        style={{ gap: `${layout.gap || 16}px` }}
      >
        <div className={`col-span-${leftCols}`}>
          {leftBlocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
        <div className={`col-span-${rightCols}`}>
          {rightBlocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    );
  }

  // 기본 레이아웃 (SINGLE_COLUMN, GRID, DASHBOARD)
  return (
    <div
      className={`${getLayoutClass()} p-${layout.padding || 4}`}
      style={{ gap: `${layout.gap || 16}px` }}
    >
      {sortedBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}

// ============================================================
// Export
// ============================================================

export default BlockRenderer;

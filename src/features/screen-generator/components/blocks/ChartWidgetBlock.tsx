/**
 * ChartWidgetBlock Component
 * 
 * 차트 위젯을 렌더링합니다 (Line, Bar, Pie, Area 등)
 * 
 * @module features/screen-generator/components/blocks/ChartWidgetBlock
 */

'use client';

import React from 'react';
import type { ChartWidgetBlockProps, ChartType } from '../../types/block-schema';
import { BarChart, LineChart, PieChart, AreaChart } from 'lucide-react';

interface Props {
  block: ChartWidgetBlockProps;
}

export function ChartWidgetBlock({ block }: Props) {
  const {
    title,
    chartType,
    height = 300,
    showLegend = true,
    className,
    style,
  } = block;

  // 차트 타입별 아이콘
  const getChartIcon = () => {
    const iconClass = "w-12 h-12 text-gray-400";
    switch (chartType) {
      case 'LINE':
        return <LineChart className={iconClass} />;
      case 'BAR':
        return <BarChart className={iconClass} />;
      case 'PIE':
      case 'DONUT':
        return <PieChart className={iconClass} />;
      case 'AREA':
        return <AreaChart className={iconClass} />;
      default:
        return <BarChart className={iconClass} />;
    }
  };

  return (
    <div 
      className={`
        rounded-lg border border-gray-200 bg-white p-4 shadow-sm
        ${className || ''}
      `}
      style={{ ...style, minHeight: height }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {showLegend && (
          <div className="text-xs text-gray-500">범례</div>
        )}
      </div>
      
      {/* Chart Placeholder */}
      <div 
        className="flex items-center justify-center bg-gray-50 rounded-lg"
        style={{ height: height - 80 }}
      >
        <div className="text-center">
          {getChartIcon()}
          <p className="mt-2 text-sm text-gray-500">
            {chartType} 차트가 여기에 표시됩니다
          </p>
          <p className="text-xs text-gray-400 mt-1">
            (실제 차트 라이브러리 연동 필요)
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChartWidgetBlock;

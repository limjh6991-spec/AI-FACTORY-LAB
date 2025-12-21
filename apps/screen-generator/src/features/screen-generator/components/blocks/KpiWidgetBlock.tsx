/**
 * KpiWidgetBlock Component
 * 
 * KPI 위젯을 렌더링합니다 (값, 변화율, 트렌드)
 * 
 * @module features/screen-generator/components/blocks/KpiWidgetBlock
 */

'use client';

import React from 'react';
import type { KpiWidgetBlockProps } from '../../types/block-schema';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  block: KpiWidgetBlockProps;
}

export function KpiWidgetBlock({ block }: Props) {
  const {
    title,
    value,
    unit,
    changeRate,
    showChangeRate,
    icon,
    theme = 'primary',
    description,
    className,
    style,
  } = block;
  // 값 포맷팅
  const formatValue = (val: number | string) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('ko-KR').format(val);
    }
    return val;
  };

  // 트렌드 아이콘 (changeRate 기반)
  const getTrendIcon = () => {
    if (!showChangeRate || changeRate === undefined) return null;
    if (changeRate > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    }
    if (changeRate < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  // 테마 색상
  const themeColors: Record<string, string> = {
    primary: 'border-blue-500 bg-blue-50',
    success: 'border-green-500 bg-green-50',
    warning: 'border-yellow-500 bg-yellow-50',
    danger: 'border-red-500 bg-red-50',
    info: 'border-cyan-500 bg-cyan-50',
  };

  return (
    <div 
      className={`
        rounded-lg border-l-4 p-4 shadow-sm
        ${themeColors[theme] || themeColors.primary}
        ${className || ''}
      `}
      style={style}
    >
      {/* Icon and Title */}
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-lg">{icon}</span>}
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </div>
      
      {/* Value */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">
          {formatValue(value)}
        </span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
      
      {/* Change Rate */}
      {showChangeRate && changeRate !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${
            changeRate > 0 ? 'text-green-600' : 
            changeRate < 0 ? 'text-red-600' : 
            'text-gray-500'
          }`}>
            {changeRate > 0 ? '+' : ''}{changeRate.toFixed(1)}%
          </span>
        </div>
      )}
      
      {/* Description */}
      {description && (
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      )}
    </div>
  );
}

export default KpiWidgetBlock;

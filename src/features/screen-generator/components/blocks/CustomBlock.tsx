/**
 * CustomBlock Component
 * 
 * 커스텀 컴포넌트를 렌더링합니다
 * 
 * @module features/screen-generator/components/blocks/CustomBlock
 */

'use client';

import React from 'react';
import type { CustomBlockProps } from '../../types/block-schema';
import { Box } from 'lucide-react';

interface Props {
  block: CustomBlockProps;
  componentRegistry?: Record<string, React.ComponentType<any>>;
}

export function CustomBlock({ block, componentRegistry }: Props) {
  const {
    componentName,
    componentProps = {},
    className,
    style,
  } = block;

  // 컴포넌트 레지스트리에서 컴포넌트 찾기
  const CustomComponent = componentRegistry?.[componentName];

  if (CustomComponent) {
    return (
      <div className={className} style={style}>
        <CustomComponent {...componentProps} />
      </div>
    );
  }

  // 컴포넌트를 찾을 수 없는 경우 플레이스홀더 표시
  return (
    <div 
      className={`
        rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6
        ${className || ''}
      `}
      style={style}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <Box className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-600">
          커스텀 컴포넌트
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {componentName}
        </p>
        {Object.keys(componentProps).length > 0 && (
          <div className="mt-3 text-xs text-gray-400">
            Props: {Object.keys(componentProps).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomBlock;

/**
 * ToolbarBlock Component
 * 
 * 액션 버튼들을 렌더링하는 툴바 컴포넌트
 * 
 * @module features/screen-generator/components/blocks/ToolbarBlock
 */

'use client';

import React from 'react';
import type { ToolbarBlockProps, ToolbarButton } from '../../types/block-schema';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Save, 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw, 
  Search,
  Edit,
  Copy,
  FileText
} from 'lucide-react';

interface Props {
  block: ToolbarBlockProps;
  onButtonClick?: (buttonId: string) => void;
}

// 아이콘 매핑
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  plus: Plus,
  add: Plus,
  save: Save,
  delete: Trash2,
  trash: Trash2,
  download: Download,
  export: Download,
  upload: Upload,
  import: Upload,
  refresh: RefreshCw,
  search: Search,
  edit: Edit,
  copy: Copy,
  file: FileText,
};

export function ToolbarBlock({ block, onButtonClick }: Props) {
  const {
    buttons,
    alignment = 'left',
    size = 'medium',
    gap = 8,
    className,
    style,
  } = block;

  // 정렬 스타일
  const alignmentClasses: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    'space-between': 'justify-between',
  };

  // 버튼 크기
  const sizeClasses: Record<string, string> = {
    small: 'h-7 px-2 text-xs',
    medium: 'h-9 px-3 text-sm',
    large: 'h-11 px-4 text-base',
  };

  // 버튼 variant 스타일
  const variantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'> = {
    primary: 'default',
    secondary: 'secondary',
    success: 'default',
    danger: 'destructive',
    ghost: 'ghost',
  };

  const renderButton = (button: ToolbarButton) => {
    const IconComponent = button.icon ? iconMap[button.icon.toLowerCase()] : null;
    const variant = variantMap[button.variant || 'secondary'] || 'secondary';
    const isDisabled = typeof button.disabled === 'boolean' ? button.disabled : false;
    const isVisible = typeof button.visible === 'boolean' ? button.visible : true;

    if (!isVisible) return null;

    return (
      <Button
        key={button.id}
        variant={variant}
        className={`${sizeClasses[size]} ${button.variant === 'success' ? 'bg-green-600 hover:bg-green-700' : ''}`}
        disabled={isDisabled}
        onClick={() => onButtonClick?.(button.id)}
        title={button.tooltip}
      >
        {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
        {button.label}
      </Button>
    );
  };

  return (
    <div 
      className={`
        flex flex-wrap items-center
        ${alignmentClasses[alignment]}
        ${className || ''}
      `}
      style={{ gap, ...style }}
    >
      {buttons.map(renderButton)}
    </div>
  );
}

export default ToolbarBlock;

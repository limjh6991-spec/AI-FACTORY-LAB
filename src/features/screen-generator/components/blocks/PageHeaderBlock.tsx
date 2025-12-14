/**
 * PageHeaderBlock Component
 * 
 * 페이지 헤더를 렌더링합니다 (제목, 설명, 브레드크럼, 액션 버튼)
 * 
 * @module features/screen-generator/components/blocks/PageHeaderBlock
 */

'use client';

import React from 'react';
import type { PageHeaderBlockProps } from '../../types/block-schema';
import { ChevronRight } from 'lucide-react';

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
        <nav className="flex items-center mb-2 text-sm text-gray-600">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <a 
                  href={item.href} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
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
                  console.log('Action clicked:', action.onClick);
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
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default PageHeaderBlock;

/**
 * TabContainerBlock Component
 * 
 * 탭 기반 컨테이너를 렌더링합니다
 * 
 * @module features/screen-generator/components/blocks/TabContainerBlock
 */

'use client';

import React, { useState } from 'react';
import type { TabContainerBlockProps, TabItem } from '../../types/block-schema';

interface Props {
  block: TabContainerBlockProps;
  renderBlock?: (block: any) => React.ReactNode;
}

export function TabContainerBlock({ block, renderBlock }: Props) {
  const {
    tabs,
    defaultActiveTab,
    className,
    style,
  } = block;

  const [activeTab, setActiveTab] = useState(
    defaultActiveTab ?? (tabs.length > 0 ? tabs[0]?.id : '') ?? ''
  );

  const activeTabContent = tabs.find(tab => tab.id === activeTab);

  return (
    <div 
      className={`
        rounded-lg border border-gray-200 bg-white
        ${className || ''}
      `}
      style={style}
    >
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 text-sm font-medium
              border-b-2 transition-colors
              ${activeTab === tab.id 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            disabled={tab.disabled}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {activeTabContent && activeTabContent.blocks.length > 0 ? (
          <div className="space-y-4">
            {activeTabContent.blocks.map((childBlock, index) => (
              <React.Fragment key={childBlock.id || index}>
                {renderBlock ? renderBlock(childBlock) : (
                  <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-sm text-gray-500">
                      블록: {childBlock.type}
                    </p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            탭 내용이 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

export default TabContainerBlock;

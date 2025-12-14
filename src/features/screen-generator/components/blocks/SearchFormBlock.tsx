/**
 * SearchFormBlock Component
 * 
 * 검색 폼을 렌더링합니다 (다양한 필드 타입 지원)
 * 
 * @module features/screen-generator/components/blocks/SearchFormBlock
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SearchFormBlockProps, SearchField } from '../../types/block-schema';
import { Search, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export function SearchFormBlock({
  fields = [],
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

  const handleSearchSubmit = (data: Record<string, unknown>) => {
    console.log('Search data:', data);
    if (onSearch) {
      // onSearch(data); // Phase 4에서 구현
    }
  };

  const handleResetClick = () => {
    reset();
    console.log('Reset form');
    if (onReset) {
      // onReset(); // Phase 4에서 구현
    }
  };

  const baseInputClass = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  const renderField = (field: SearchField) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            {...register(field.name, { required: field.required })}
            placeholder={field.placeholder || `${field.label} 입력`}
            className={baseInputClass}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            {...register(field.name, { required: field.required })}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            {...register(field.name, { required: field.required })}
            className={baseInputClass}
          />
        );

      case 'select':
        return (
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
        );

      case 'checkbox':
        return (
          <div className="flex items-center h-full pt-6">
            <input
              type="checkbox"
              {...register(field.name)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{field.label}</span>
          </div>
        );

      case 'yearMonthPicker':
        return (
          <input
            type="month"
            {...register(field.name, { required: field.required })}
            className={baseInputClass}
          />
        );

      default:
        return (
          <input
            type="text"
            {...register(field.name)}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );
    }
  };

  return (
    <div 
      className={`bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 ${className || ''}`} 
      style={style}
    >
      {/* Collapsible Header */}
      {collapsible && (
        <div
          className="flex justify-between items-center mb-3 cursor-pointer select-none"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h3 className="text-sm font-semibold text-gray-700">검색 조건</h3>
          <button type="button" className="text-gray-500 hover:text-gray-700">
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
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
                style={{ gridColumn: `span ${field.width || 3}` }}
              >
                {field.type !== 'checkbox' && (
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-600 ml-1">*</span>}
                  </label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
            >
              <Search className="w-4 h-4" />
              {searchButtonLabel}
            </button>
            {showResetButton && (
              <button
                type="button"
                onClick={handleResetClick}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {resetButtonLabel}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default SearchFormBlock;

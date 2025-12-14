/**
 * DataGridBlock Component
 * 
 * AG Grid 기반 데이터 그리드를 렌더링합니다
 * 
 * @module features/screen-generator/components/blocks/DataGridBlock
 */

'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { RowClickedEvent, RowDoubleClickedEvent, SelectionChangedEvent } from 'ag-grid-community';
import type { DataGridBlockProps, GridColumn } from '../../types/block-schema';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataGridBlockExtendedProps {
  columns?: GridColumn[];
  data?: Record<string, unknown>[];
  pagination?: boolean;
  pageSize?: number;
  rowSelection?: 'single' | 'multiple' | 'none';
  onRowClick?: (data: Record<string, unknown>) => void;
  onRowDoubleClick?: (data: Record<string, unknown>) => void;
  onSelectionChange?: (data: Record<string, unknown>[]) => void;
  height?: number | 'auto';
  className?: string;
  style?: Record<string, string | number>;
  // Allow extra props from block schema
  [key: string]: unknown;
}

export function DataGridBlock({
  columns = [],
  data = [],
  pagination = true,
  pageSize = 20,
  rowSelection = 'single',
  onRowClick,
  onRowDoubleClick,
  onSelectionChange,
  height = 400,
  className,
  style,
}: DataGridBlockExtendedProps) {
  const [selectedRows, setSelectedRows] = useState<Record<string, unknown>[]>([]);

  // AG Grid 컬럼 정의 변환
  const columnDefs = useMemo(() => {
    return columns.map((col) => ({
      field: col.field,
      headerName: col.headerName,
      width: col.width,
      flex: 1,
      sortable: col.sortable ?? true,
      filter: true,
      editable: col.editable ?? false,
      resizable: true,
    }));
  }, [columns]);

  // 기본 컬럼 설정
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
  }), []);

  // 행 클릭 핸들러
  const handleRowClicked = useCallback((event: RowClickedEvent<Record<string, unknown>>) => {
    if (event.data) {
      console.log('Row clicked:', event.data);
      onRowClick?.(event.data);
    }
  }, [onRowClick]);

  // 행 더블클릭 핸들러
  const handleRowDoubleClicked = useCallback((event: RowDoubleClickedEvent<Record<string, unknown>>) => {
    if (event.data) {
      console.log('Row double clicked:', event.data);
      onRowDoubleClick?.(event.data);
    }
  }, [onRowDoubleClick]);

  // 선택 변경 핸들러
  const handleSelectionChanged = useCallback((event: SelectionChangedEvent<Record<string, unknown>>) => {
    const selected = event.api.getSelectedRows();
    setSelectedRows(selected);
    console.log('Selection changed:', selected);
    onSelectionChange?.(selected);
  }, [onSelectionChange]);

  // 높이 값 처리
  const gridHeight = height === 'auto' ? 500 : (height ?? 400);

  return (
    <div 
      className={`ag-theme-alpine w-full ${className || ''}`} 
      style={{ height: gridHeight, ...style }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={pageSize}
        rowSelection={rowSelection === 'multiple' ? 'multiple' : 'single'}
        onRowClicked={handleRowClicked}
        onRowDoubleClicked={handleRowDoubleClicked}
        onSelectionChanged={handleSelectionChanged}
        animateRows={true}
        suppressRowClickSelection={false}
      />
    </div>
  );
}

export default DataGridBlock;

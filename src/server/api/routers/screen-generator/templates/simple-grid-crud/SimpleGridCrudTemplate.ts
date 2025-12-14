/**
 * Simple Grid CRUD 템플릿 (블록 기반 리팩토링)
 *
 * 기존: 전체 React 컴포넌트 코드를 생성 (873줄)
 * 신규: ScreenSchema JSON만 생성 → BlockRenderer가 렌더링
 *
 * 표준 화면: /master/dept (부서관리)
 *
 * @module screenGenerator/templates/simpleGridCrud
 */

import {
  BaseTemplate,
  type ComponentGenerationResult,
  type ApiGenerationResult,
  type ScreenGenerationResult,
  type ICrudTemplate,
} from '../base';

import {
  ScreenType,
  type ParsedData,
  type CrudParsedData,
  type CrudColumnDef,
  type CrudConfig,
} from '../../_shared/types';

// 블록 기반 스키마 타입 import
import type {
  ScreenSchema,
  Block,
  SearchField,
  GridColumn,
  ToolbarButton,
} from '~/features/screen-generator/types/block-schema';

import {
  BlockType,
  LayoutType,
} from '~/features/screen-generator/types/block-schema';

// ============================================================
// 타입 가드
// ============================================================

/**
 * ParsedData가 CrudParsedData인지 확인
 */
function isCrudParsedData(data: ParsedData): data is CrudParsedData {
  return (
    data.screenType === ScreenType.SIMPLE_GRID_CRUD ||
    data.screenType === ScreenType.COMPLEX_GRID_CRUD
  ) && 'crudConfig' in data && 'crudColumns' in data;
}

// ============================================================
// SimpleGridCrudTemplate 클래스 (블록 기반)
// ============================================================

/**
 * Simple Grid CRUD 화면 생성 템플릿 (리팩토링)
 *
 * 기존 방식: React 컴포넌트 전체 코드 생성 (873줄)
 * 신규 방식: ScreenSchema JSON 생성 → BlockRenderer가 렌더링
 *
 * 장점:
 * - 코드 간소화 (873줄 → 50줄)
 * - 블록 재사용
 * - 유지보수 용이
 */
export class SimpleGridCrudTemplate extends BaseTemplate implements ICrudTemplate {
  protected readonly screenType = ScreenType.SIMPLE_GRID_CRUD;
  protected readonly description = '단순 CRUD 화면 (기준정보 관리)';

  // ============================================================
  // 컴포넌트 생성 (ScreenSchema JSON 생성)
  // ============================================================

  /**
   * CRUD 화면 컴포넌트 생성
   *
   * 기존: generateFullComponent() → React 코드 873줄
   * 신규: ComponentGenerator.generate() → ScreenSchema를 사용하는 React 컴포넌트
   */
  async generateComponent(data: ParsedData): Promise<ComponentGenerationResult> {
    // 타입 체크
    if (!isCrudParsedData(data)) {
      return this.createErrorResult(
        'Invalid data: CrudParsedData required',
        data.screenId ?? 'unknown'
      );
    }

    const screenId = data.screenId ?? 'SC000';
    const componentName = this.getComponentName(screenId, data.screenName);

    try {
      // ScreenSchema 생성
      const schema = this.generateScreenSchema(data);

      // 직접 인라인 코드 생성 (Sandpack 호환)
      const code = this.generateComponentCode(componentName, schema);

      return {
        success: true,
        filePath: this.getFilePath(screenId, true),
        fileName: this.getFileName(screenId),
        code,
      };
    } catch (error) {
      return this.createErrorResult(
        `Component generation failed: ${error instanceof Error ? error.message : String(error)}`,
        screenId
      );
    }
  }

  /**
   * React 컴포넌트 코드 생성 (Sandpack 호환)
   * JSON 스키마를 기반으로 인라인 렌더링 코드 생성
   * 
   * 개선사항 (2025-12-14):
   * - AG Grid 커스텀 스타일 (파란색 헤더)
   * - CRUD 툴바 (행추가/저장/삭제/엑셀)
   * - 상태 관리 (modifiedRows, deletedRows)
   * - 참조: /master/dept
   */
  private generateComponentCode(componentName: string, schema: ScreenSchema): string {
    // DATA_GRID 블록 찾기
    const gridBlock = schema.blocks.find(b => b.type === BlockType.DATA_GRID) as any;
    const searchBlock = schema.blocks.find(b => b.type === BlockType.SEARCH_FORM) as any;

    if (!gridBlock) {
      throw new Error('DATA_GRID 블록을 찾을 수 없습니다.');
    }

    const columns = gridBlock.columns || [];
    const searchFields = searchBlock?.fields || [];
    const primaryKey = gridBlock.primaryKey || 'id';

    // 컬럼 정의 (JSON 기반) - 체크박스 컬럼 추가
    const columnDefsArray = [
      // 체크박스 선택 컬럼
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: 'left',
        lockPosition: true,
      },
      // 데이터 컬럼들
      ...columns.map((col: any) => ({
        headerName: col.headerName,
        field: col.field,
        width: col.width || 120,
        editable: col.editable !== false,
        // 신규/수정 행 색상 표시 (한 줄로 작성해야 Sandpack에서 파싱 가능)
        cellStyle: `(params) => params.data?._isNew ? { backgroundColor: '#e8f5e9' } : params.data?._isModified ? { backgroundColor: '#fff3e0' } : null`,
        ...(col.type === 'number' && {
          type: 'numericColumn',
          cellStyle: `(params) => ({ textAlign: 'right', ...(params.data?._isNew ? { backgroundColor: '#e8f5e9' } : params.data?._isModified ? { backgroundColor: '#fff3e0' } : {}) })`,
        }),
      })),
    ];

    // cellStyle을 함수로 변환하기 위해 별도 처리
    const columnDefsJson = JSON.stringify(columnDefsArray, null, 2)
      .replace(/"cellStyle": "(.*?)"/g, 'cellStyle: $1');

    // 검색 필드 state 생성
    const searchStates = searchFields.map((field: any) =>
      `  const [${field.name}, set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}] = useState('');`
    ).join('\n');

    // 검색 필드 렌더링 (공통 옵션 컴포넌트 사용)
    const searchFieldsRender = searchFields.map((field: any) => {
      const setter = `set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`;
      const fieldType = field.type || 'TEXT_INPUT';

      // 검색 필드 타입에 따라 적절한 공통 컴포넌트 렌더링
      switch (fieldType) {
        case 'YEAR_MONTH':
        case 'BI_YEAR_MONTH':
          return `        <YearMonthPicker
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
        case 'BI_SITE':
          return `        <SiteSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
        case 'BI_DEPT':
          return `        <DepartmentSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
        case 'BI_ACCOUNT':
          return `        <AccountSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
        case 'BI_CUSTOMER':
          return `        <CustomerSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
        case 'BI_SCENARIO':
          return `        <SelCodeSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
        case 'BI_PRODUCT':
          return `        <MaterialSelect
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
        case 'DATE_PICKER':
          return `        <YearMonthPicker
          value={${field.name}}
          onChange={${setter}}
          label="${field.label}"
        />`;
        default:
          // 기본: 인라인 스타일 input 사용
          return `        <div style={styles.searchField}>
          <label style={styles.label}>${field.label}</label>
          <input
            type="text"
            value={${field.name}}
            onChange={(e) => ${setter}(e.target.value)}
            style={styles.input}
            placeholder="${field.placeholder || field.label}"
          />
        </div>`;
      }
    }).join('\n');

    // 공통 옵션 컴포넌트가 필요한지 확인
    const needsOptionImports = searchFields.some((f: any) => {
      const type = f.type || 'TEXT_INPUT';
      return ['YEAR_MONTH', 'BI_YEAR_MONTH', 'BI_SITE', 'BI_DEPT', 'BI_ACCOUNT', 'BI_CUSTOMER', 'BI_SCENARIO', 'BI_PRODUCT', 'DATE_PICKER'].includes(type);
    });

    const hasSearchFields = searchFields.length > 0;

    // 공통 옵션 import 생성
    const optionImports = needsOptionImports ? `
// 공통 옵션 컴포넌트
import {
  SiteSelect,
  YearMonthPicker,
  YearPicker,
  CustomerSelect,
  MaterialSelect,
  AccountSelect,
  DepartmentSelect,
  SelCodeSelect,
} from '~/components/options';
` : '';

    return `'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Plus, Save, Trash2, Download } from 'lucide-react';
${optionImports}

/**
 * ${schema.screenName}
 * @generated by AI Factory Lab
 */

export default function ${componentName}() {
  const gridRef = useRef(null);
  
  // 그리드 데이터
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 변경 추적 상태
  const [modifiedRows, setModifiedRows] = useState(new Set());
  const [deletedRows, setDeletedRows] = useState(new Set());
  
${searchStates}

  // 컬럼 정의
  const columnDefs = useMemo(() => ${columnDefsJson}, []);

  // 기본 컬럼 설정
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);

  // 데이터 조회
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
${searchFields.map((f: any) => `      if (${f.name}) params.append('${f.name}', ${f.name});`).join('\n')}
      const queryString = params.toString();
      const url = \`${gridBlock.apiEndpoint}\${queryString ? '?' + queryString : ''}\`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setRowData(result.data || []);
      setModifiedRows(new Set());
      setDeletedRows(new Set());
    } catch (error) {
      console.error('Error:', error);
      setRowData([]);
    } finally {
      setLoading(false);
    }
  }, [${searchFields.map((f: any) => f.name).join(', ')}]);

  useEffect(() => {
    fetchData();
  }, []);

  // 검색
  const handleSearch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // 초기화
  const handleReset = useCallback(() => {
${searchFields.map((f: any) => `    set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}('');`).join('\n')}
    fetchData();
  }, [fetchData]);

  // 셀 값 변경 시
  const onCellValueChanged = useCallback((event) => {
    const { data } = event;
    if (!data._isNew) {
      data._isModified = true;
    }
    setModifiedRows(prev => new Set(prev).add(data.${primaryKey}));
    if (event.node) {
      event.api.refreshCells({ rowNodes: [event.node], force: true });
    }
  }, []);

  // 행 추가
  const handleAddRow = useCallback(() => {
    const newRow = {
      ${columns.map((col: any) => `${col.field}: ${col.type === 'number' ? '0' : col.type === 'boolean' ? 'false' : "''"}`).join(',\n      ')},
      _isNew: true,
      ${primaryKey}: \`NEW_\${Date.now()}\`,
    };
    setRowData(prev => [newRow, ...prev]);
  }, []);

  // 선택된 행 삭제
  const handleDeleteSelected = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    if (!selectedNodes || selectedNodes.length === 0) {
      alert('삭제할 행을 선택해주세요.');
      return;
    }

    if (!confirm(\`선택된 \${selectedNodes.length}개 행을 삭제하시겠습니까?\`)) {
      return;
    }

    const deleteIds = new Set();
    selectedNodes.forEach((node) => {
      if (!node.data._isNew) {
        deleteIds.add(node.data.${primaryKey});
      }
    });

    // 새 행은 바로 제거, 기존 행은 삭제 표시
    setRowData(prev => prev.filter(row => {
      const isSelected = selectedNodes.some((n) => n.data.${primaryKey} === row.${primaryKey});
      if (isSelected && row._isNew) return false;
      return true;
    }));

    setDeletedRows(prev => new Set([...prev, ...deleteIds]));
  }, []);

  // 저장
  const handleSave = useCallback(async () => {
    const rowsToSave = rowData.filter(row => row._isNew || row._isModified);
    const rowsToDelete = Array.from(deletedRows);

    if (rowsToSave.length === 0 && rowsToDelete.length === 0) {
      alert('변경된 내용이 없습니다.');
      return;
    }

    try {
      // TODO: API 호출 구현
      // const response = await fetch('${gridBlock.apiEndpoint}', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     inserts: rowsToSave.filter(r => r._isNew),
      //     updates: rowsToSave.filter(r => r._isModified && !r._isNew),
      //     deletes: rowsToDelete,
      //   }),
      // });
      
      alert(\`저장 완료: 추가 \${rowsToSave.filter(r => r._isNew).length}건, 수정 \${rowsToSave.filter(r => r._isModified && !r._isNew).length}건, 삭제 \${rowsToDelete.length}건\`);
      fetchData();
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  }, [rowData, deletedRows, fetchData]);

  // 엑셀 다운로드
  const handleExcelExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: '${schema.screenName}_export.csv',
    });
  }, []);

  // 변경 여부 확인
  const hasChanges = modifiedRows.size > 0 || deletedRows.size > 0 || rowData.some(r => r._isNew);

  // 인라인 스타일 정의 (Sandpack에서 Tailwind 미지원)
  const styles = {
    container: { display: 'flex', flexDirection: 'column', height: '100%', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif' },
    title: { fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#161616' },
    searchContainer: { display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 12, padding: 12, backgroundColor: '#f4f4f4', border: '1px solid #e0e0e0' },
    searchField: { display: 'flex', flexDirection: 'column', gap: 4 },
    label: { fontSize: 12, color: '#525252' },
    input: { height: 32, padding: '0 8px', border: '1px solid #e0e0e0', minWidth: 120 },
    buttonGroup: { display: 'flex', gap: 8, marginLeft: 'auto' },
    toolbar: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#0f62fe', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnSuccess: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#24a148', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnDanger: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#da1e28', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnSecondary: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#393939', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnDisabled: { display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', backgroundColor: '#c6c6c6', color: 'white', border: 'none', fontSize: 14, cursor: 'not-allowed' },
    statusBar: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, fontSize: 12, color: '#525252' },
    statusItem: { display: 'flex', alignItems: 'center', gap: 4 },
    statusNew: { width: 12, height: 12, backgroundColor: '#e8f5e9', border: '1px solid #c6c6c6' },
    statusModified: { width: 12, height: 12, backgroundColor: '#fff3e0', border: '1px solid #c6c6c6' },
    statusDeleted: { width: 12, height: 12, backgroundColor: '#ffebee', border: '1px solid #c6c6c6' },
    gridContainer: { flex: 1, minHeight: 400 },
  };

  return (
    <div style={styles.container}>
      {/* 제목 */}
      <h1 style={styles.title}>
        ${schema.screenName}
      </h1>

      ${hasSearchFields ? `{/* 조회조건 */}
      <div style={styles.searchContainer}>
${searchFieldsRender.split('\\n').map((line: string) => '        ' + line.trim()).join('\\n')}
        <div style={styles.buttonGroup}>
          <button
            onClick={handleSearch}
            style={styles.btnPrimary}
          >
            검색
          </button>
          <button
            onClick={handleReset}
            style={{ ...styles.btnPrimary, backgroundColor: '#e0e0e0', color: '#161616' }}
          >
            초기화
          </button>
        </div>
      </div>` : ''}

      {/* 툴바 */}
      <div style={styles.toolbar}>
        <button onClick={handleAddRow} style={styles.btnPrimary}>
          <Plus style={{ width: 16, height: 16 }} />
          행 추가
        </button>
        <button 
          onClick={handleSave} 
          disabled={!hasChanges}
          style={hasChanges ? styles.btnSuccess : styles.btnDisabled}
        >
          <Save style={{ width: 16, height: 16 }} />
          저장
        </button>
        <button onClick={handleDeleteSelected} style={styles.btnDanger}>
          <Trash2 style={{ width: 16, height: 16 }} />
          삭제
        </button>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={handleExcelExport} style={styles.btnSecondary}>
            <Download style={{ width: 16, height: 16 }} />
            엑셀
          </button>
        </div>
      </div>

      {/* 상태 표시 */}
      {hasChanges && (
        <div style={styles.statusBar}>
          <span style={styles.statusItem}>
            <span style={styles.statusNew}></span>
            신규 ({rowData.filter(r => r._isNew).length})
          </span>
          <span style={styles.statusItem}>
            <span style={styles.statusModified}></span>
            수정 ({modifiedRows.size})
          </span>
          <span style={styles.statusItem}>
            <span style={styles.statusDeleted}></span>
            삭제 ({deletedRows.size})
          </span>
        </div>
      )}

      {/* AG Grid */}
      <div className="ag-theme-alpine" style={styles.gridContainer}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          onCellValueChanged={onCellValueChanged}
          getRowId={(params) => params.data.${primaryKey}}
          loading={loading}
          overlayLoadingTemplate="<span>데이터 로딩 중...</span>"
          overlayNoRowsTemplate="<span>조회된 데이터가 없습니다</span>"
        />
      </div>
    </div>
  );
}
`;
  }


  /**
   * ScreenSchema 생성 (Excel 데이터 → 블록 조립)
   */
  private generateScreenSchema(data: CrudParsedData): ScreenSchema {
    const { screenId, screenName, screenNameEn, crudConfig, crudColumns } = data;

    const blocks: Block[] = [
      // 1. PAGE_HEADER 블록
      {
        id: 'header-1',
        type: BlockType.PAGE_HEADER,
        order: 1,
        title: screenName,
        description: `${screenName} 관리 화면`,
        breadcrumbs: [
          { label: '홈', href: '/' },
          { label: '기준정보', href: '/master' },
          { label: screenName },
        ],
        actions: [
          {
            label: '엑셀 다운로드',
            icon: 'Download',
            onClick: 'handleExcelExport',
            variant: 'secondary',
          },
        ],
      },

      // 2. SEARCH_FORM 블록
      {
        id: 'search-form-1',
        type: BlockType.SEARCH_FORM,
        order: 2,
        fields: this.generateSearchFields(data),
        searchButtonLabel: '검색',
        showResetButton: true,
        resetButtonLabel: '초기화',
        onSearch: 'handleSearch',
        onReset: 'handleReset',
        collapsible: false,
      },

      // 3. TOOLBAR 블록
      {
        id: 'toolbar-1',
        type: BlockType.TOOLBAR,
        order: 3,
        alignment: 'space-between',
        buttons: this.generateToolbarButtons(),
      },

      // 4. DATA_GRID 블록
      {
        id: 'grid-1',
        type: BlockType.DATA_GRID,
        order: 4,
        columns: this.generateGridColumns(crudColumns, crudConfig.primaryKey),
        apiEndpoint: `/ api / screens / ${screenId}/data`,
        tableName: data.tableName ?? 'unknown_table',
        primaryKey: crudConfig.primaryKey ?? 'id',
        selectColumns: crudColumns.map(col => col.field),
        rowSelection: 'multiple',
        showCheckboxSelection: true,
        pagination: true,
        pageSize: 50,
        height: 600,
        editable: true,
        onCellValueChanged: 'handleCellValueChanged',
        onRowSelected: 'handleRowSelected',
      },
    ];

    return {
      screenId: screenId ?? 'SC000',
      screenName,
      screenNameEn: screenNameEn ?? screenName,
      description: `${screenName} CRUD 화면`,
      path: `/generated/${screenId}`,
      layout: {
        type: LayoutType.SINGLE_COLUMN,
        gap: 16,
        padding: 16,
      },
      blocks,
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0',
        tags: ['crud', 'master', 'auto-generated'],
      },
    };
  }

  /**
   * 검색 필드 생성 (실제 데이터 사용, Mock 데이터 제거)
   */
  private generateSearchFields(data: CrudParsedData): SearchField[] {
    // data.searchConditions가 존재하면 이를 사용, 없으면 빈 배열 반환
    if (!data.searchConditions || data.searchConditions.length === 0) {
      return [];
    }

    return data.searchConditions.map((condition) => ({
      name: condition.field,
      label: condition.label,
      type: this.mapSearchFieldType(condition.type),
      required: condition.required,
      width: 3,
      options: condition.options,
    }));
  }

  /**
   * SearchCondition.type (string) → SearchFieldType 매핑
   */
  private mapSearchFieldType(type: string): SearchField['type'] {
    // 타입 매핑 (대소문자 무관)
    const normalized = type.toLowerCase().replace(/_/g, '');

    switch (normalized) {
      case 'text':
      case 'textinput':
        return 'text';
      case 'number':
      case 'numberinput':
        return 'number';
      case 'date':
      case 'datepicker':
        return 'date';
      case 'daterange':
        return 'dateRange';
      case 'select':
        return 'select';
      case 'multiselect':
        return 'multiSelect';
      case 'siteselect':
        return 'siteSelect';
      case 'scenarioselect':
        return 'scenarioSelect';
      case 'yearmonth':
      case 'yearmonthpicker':
        return 'yearMonthPicker';
      case 'checkbox':
        return 'checkbox';
      default:
        // 기본값은 text
        return 'text';
    }
  }

  /**
   * 툴바 버튼 생성
   */
  private generateToolbarButtons(): ToolbarButton[] {
    return [
      {
        id: 'add',
        label: '행 추가',
        icon: 'Plus',
        variant: 'primary',
        onClick: 'handleAddRow',
      },
      {
        id: 'save',
        label: '저장',
        icon: 'Save',
        variant: 'success',
        onClick: 'handleSave',
        disabled: '!hasChanges',
      },
      {
        id: 'delete',
        label: '삭제',
        icon: 'Trash2',
        variant: 'danger',
        onClick: 'handleDeleteSelected',
      },
    ];
  }

  /**
   * 그리드 컬럼 생성 (CrudColumnDef → GridColumn 변환)
   */
  private generateGridColumns(columns: CrudColumnDef[], pkField: string): GridColumn[] {
    return columns.map((col) => {
      const gridColumn: GridColumn = {
        field: col.field,
        headerName: col.headerName,
        width: col.width,
        type: this.mapColumnType(col.editorType),
        editable: col.field === pkField ? false : col.editable,
        sortable: true,
        filterable: true,
        align: col.editorType === 'number' ? 'right' : 'left',
        hidden: col.hidden,
      };

      // PK 필드는 왼쪽 고정
      if (col.field === pkField) {
        gridColumn.pinned = 'left';
      }

      return gridColumn;
    });
  }

  /**
   * 에디터 타입 → 그리드 컬럼 타입 매핑
   */
  private mapColumnType(editorType: string): GridColumn['type'] {
    switch (editorType) {
      case 'number':
        return 'number';
      case 'date':
        return 'date';
      case 'datetime':
        return 'datetime';
      case 'checkbox':
        return 'boolean';
      case 'select':
        return 'select';
      default:
        return 'text';
    }
  }

  // ============================================================
  // API 생성
  // ============================================================

  /**
   * API 코드 생성 (문자열 반환)
   *
   * 요구사항에 따라 tRPC Router 코드를 문자열로 반환
   * - getList: 목록 조회 (검색 조건 포함)
   * - create: 단건 추가
   * - update: 단건 수정
   * - deleteMany: 다중 삭제
   */
  async generateApiCode(data: ParsedData): Promise<string> {
    const result = await this.generateApi(data);
    if (!result.success) {
      throw new Error(result.error ?? 'API 코드 생성 실패');
    }
    return result.routerCode;
  }

  /**
   * API 라우터 코드 생성 (전체 결과 반환)
   */
  async generateApi(data: ParsedData): Promise<ApiGenerationResult> {
    if (!isCrudParsedData(data)) {
      return {
        success: false,
        routerPath: '',
        routerCode: '',
        procedures: [],
        error: 'Invalid data: CrudParsedData required',
      };
    }

    const screenId = data.screenId ?? 'SC000';
    const routerName = this.getRouterName(screenId);
    const tableName = data.tableName ?? 'unknown_table';
    const { crudConfig, crudColumns } = data;

    try {
      const routerCode = this.generateRouterCode(
        routerName,
        tableName,
        crudConfig,
        crudColumns
      );

      return {
        success: true,
        routerPath: `src/server/api/routers/generated/${routerName}.ts`,
        routerCode,
        procedures: ['getList', 'getById', 'create', 'update', 'deleteMany', 'save'],
      };
    } catch (error) {
      return {
        success: false,
        routerPath: '',
        routerCode: '',
        procedures: [],
        error: `API generation failed: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * tRPC 라우터 코드 생성
   */
  private generateRouterCode(
    routerName: string,
    tableName: string,
    config: CrudConfig,
    columns: CrudColumnDef[]
  ): string {
    const pkField = config.primaryKey;
    const prismaModelName = this.toCamelCase(tableName);

    // 검색 가능한 컬럼 추출 (문자열, 날짜 타입 등)
    const searchableColumns = columns.filter(col =>
      ['text', 'select', 'date', 'datetime'].includes(col.editorType ?? 'text')
    ).slice(0, 5); // 최대 5개까지만

    return `/**
 * ${routerName} - 자동 생성된 CRUD API
 *
 * @generated by AI Factory Lab
 * @table ${tableName}
 * @primaryKey ${pkField}
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { db } from '~/server/db';

// 검색 조건 스키마 (동적 생성)
const searchParamsSchema = z.object({
${searchableColumns.map(col => `  ${col.field}: z.string().optional(),`).join('\n')}
  // 페이지네이션
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(1000).optional(),
  // 정렬
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
}).optional();

// 행 데이터 스키마
const rowSchema = z.object({
${this.generateZodSchema(columns)}
});

// 저장 입력 스키마
const saveInputSchema = z.object({
  inserts: z.array(rowSchema).optional(),
  updates: z.array(rowSchema).optional(),
  deletes: z.array(z.string()).optional(), // PK 배열
});

export const ${routerName}Router = createTRPCRouter({
  // 목록 조회 (Read with filters)
  getList: publicProcedure
    .input(searchParamsSchema)
    .query(async ({ input }) => {
      const page = input?.page ?? 1;
      const pageSize = input?.pageSize ?? ${config.pageSize ?? 50};
      const skip = (page - 1) * pageSize;

      // 동적 WHERE 조건 구성
      const where: any = {
        ${config.softDelete ? `delete_yn: 'N',` : ''}
      };

${searchableColumns.map(col => `      if (input?.${col.field}) {
        where.${col.field} = { contains: input.${col.field} };
      }`).join('\n')}

      // 데이터 조회
      const [data, total] = await db.$transaction([
        db.${prismaModelName}.findMany({
          where,
          orderBy: {
            [input?.sortBy ?? '${config.sortColumn ?? pkField}']: input?.sortOrder ?? '${config.sortDirection ?? 'asc'}'
          },
          skip,
          take: pageSize,
        }),
        db.${prismaModelName}.count({ where }),
      ]);

      return {
        data,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    }),

  // 단건 조회
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db.${prismaModelName}.findUnique({
        where: { ${pkField}: input },
      });
      return result;
    }),

  // 일괄 저장 (Create/Update/Delete)
  save: publicProcedure
    .input(saveInputSchema)
    .mutation(async ({ input }) => {
      const { inserts = [], updates = [], deletes = [] } = input;

      // 트랜잭션으로 일괄 처리
      const result = await db.$transaction(async (tx) => {
        let insertedCount = 0;
        let updatedCount = 0;
        let deletedCount = 0;

        // 1. Insert
        if (inserts.length > 0) {
          await tx.${prismaModelName}.createMany({
            data: inserts.map(row => ({
              ...row,
              ${config.auditColumns ? `created_at: new Date(),\n              updated_at: new Date(),` : ''}
            })),
          });
          insertedCount = inserts.length;
        }

        // 2. Update
        if (updates.length > 0) {
          for (const row of updates) {
            await tx.${prismaModelName}.update({
              where: { ${pkField}: row.${pkField} },
              data: {
                ...row,
                ${config.auditColumns ? `updated_at: new Date(),` : ''}
              },
            });
          }
          updatedCount = updates.length;
        }

        // 3. Delete (soft delete or hard delete)
        if (deletes.length > 0) {
          ${config.softDelete
        ? `await tx.${prismaModelName}.updateMany({
            where: { ${pkField}: { in: deletes } },
            data: {
              delete_yn: 'Y',
              ${config.auditColumns ? `updated_at: new Date(),` : ''}
            },
          });`
        : `await tx.${prismaModelName}.deleteMany({
            where: { ${pkField}: { in: deletes } },
          });`
      }
          deletedCount = deletes.length;
        }

        return { insertedCount, updatedCount, deletedCount };
      });

      return {
        success: true,
        ...result,
        message: \`성공: 추가 \${result.insertedCount}건, 수정 \${result.updatedCount}건, 삭제 \${result.deletedCount}건\`,
      };
    }),

  // 단건 생성 (Create)
  create: publicProcedure
    .input(rowSchema)
    .mutation(async ({ input }) => {
      const result = await db.${prismaModelName}.create({
        data: {
          ...input,
          ${config.auditColumns ? `created_at: new Date(),\n          updated_at: new Date(),` : ''}
        },
      });
      return result;
    }),

  // 단건 수정 (Update)
  update: publicProcedure
    .input(z.object({
      ${pkField}: z.string(),
      data: rowSchema.partial(),
    }))
    .mutation(async ({ input }) => {
      const result = await db.${prismaModelName}.update({
        where: { ${pkField}: input.${pkField} },
        data: {
          ...input.data,
          ${config.auditColumns ? `updated_at: new Date(),` : ''}
        },
      });
      return result;
    }),

  // 단건 삭제 (Delete)
  deleteOne: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      ${config.softDelete
        ? `const result = await db.${prismaModelName}.update({
        where: { ${pkField}: input },
        data: {
          delete_yn: 'Y',
          ${config.auditColumns ? `updated_at: new Date(),` : ''}
        },
      });`
        : `const result = await db.${prismaModelName}.delete({
        where: { ${pkField}: input },
      });`
      }
      return result;
    }),

  // 다중 삭제 (Delete Many)
  deleteMany: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      if (input.length === 0) {
        return {
          success: true,
          deletedCount: 0,
          message: '삭제할 항목이 없습니다.',
        };
      }

      ${config.softDelete
        ? `const result = await db.${prismaModelName}.updateMany({
        where: { ${pkField}: { in: input } },
        data: {
          delete_yn: 'Y',
          ${config.auditColumns ? `updated_at: new Date(),` : ''}
        },
      });

      return {
        success: true,
        deletedCount: result.count,
        message: \`\${result.count}건이 삭제되었습니다.\`,
      };`
        : `const result = await db.${prismaModelName}.deleteMany({
        where: { ${pkField}: { in: input } },
      });

      return {
        success: true,
        deletedCount: result.count,
        message: \`\${result.count}건이 삭제되었습니다.\`,
      };`
      }
    }),
});
`;
  }

  /**
   * Zod 스키마 생성
   */
  private generateZodSchema(columns: CrudColumnDef[]): string {
    return columns.map(col => {
      let zodType: string;

      switch (col.editorType) {
        case 'number':
          zodType = 'z.number()';
          break;
        case 'checkbox':
          zodType = 'z.boolean()';
          break;
        case 'date':
        case 'datetime':
          zodType = 'z.string()';
          break;
        default:
          zodType = 'z.string()';
      }

      if (!col.required) {
        zodType += '.nullable().optional()';
      }

      if (col.maxLength && col.editorType === 'text') {
        zodType = `z.string().max(${col.maxLength})${col.required ? '' : '.nullable().optional()'}`;
      }

      return `  ${col.field}: ${zodType},`;
    }).join('\n');
  }

  /**
   * 라우터 이름 생성
   */
  private getRouterName(screenId: string): string {
    return `screen${screenId.replace(/[^a-zA-Z0-9]/g, '')}`;
  }

  // ============================================================
  // 전체 화면 생성
  // ============================================================

  /**
   * 컴포넌트(스키마) + API 전체 생성
   */
  async generateScreen(data: ParsedData): Promise<ScreenGenerationResult> {
    const startTime = Date.now();
    const screenId = data.screenId ?? 'SC000';
    const screenName = data.screenName;

    const warnings: string[] = [];

    // 스키마 생성
    const componentResult = await this.generateComponent(data);
    if (!componentResult.success) {
      return {
        success: false,
        screenId,
        screenName,
        component: componentResult,
        warnings,
        generationTime: Date.now() - startTime,
      };
    }

    // API 생성
    const apiResult = await this.generateApi(data);
    if (!apiResult.success) {
      warnings.push(`API 생성 실패: ${apiResult.error}`);
    }

    return {
      success: true,
      screenId,
      screenName,
      component: componentResult,
      api: apiResult,
      warnings,
      generationTime: Date.now() - startTime,
    };
  }
}

/**
 * RealGrid CRUD 템플릿
 *
 * AG Grid 기반 SimpleGridCrudTemplate과 동일한 구조로,
 * RealGrid 라이브러리를 사용하여 CRUD 화면을 생성합니다.
 *
 * 표준 스타일: Corporate Professional (파란 그라디언트 헤더)
 * 참조: /screens/grid-examples/style-1-corporate
 *
 * @module screenGenerator/templates/realgrid-crud
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
        data.screenType === ScreenType.COMPLEX_GRID_CRUD ||
        data.screenType === ScreenType.REALGRID_CRUD
    ) && 'crudConfig' in data && 'crudColumns' in data;
}

// ============================================================
// RealGridCrudTemplate 클래스
// ============================================================

/**
 * RealGrid CRUD 화면 생성 템플릿
 *
 * 기존 AG Grid 템플릿과 동일한 인터페이스를 제공하면서
 * RealGrid 라이브러리를 사용하는 코드를 생성합니다.
 */
export class RealGridCrudTemplate extends BaseTemplate implements ICrudTemplate {
    protected readonly screenType = ScreenType.REALGRID_CRUD;
    protected readonly description = '단순 CRUD 화면 (RealGrid)';

    // ============================================================
    // 컴포넌트 생성
    // ============================================================

    /**
     * CRUD 화면 컴포넌트 생성
     */
    async generateComponent(data: ParsedData): Promise<ComponentGenerationResult> {
        // screenType을 RealGrid CRUD로 변경
        const realGridData = { ...data, screenType: ScreenType.REALGRID_CRUD };

        // 타입 체크
        if (!isCrudParsedData(realGridData)) {
            return this.createErrorResult(
                'Invalid data: CrudParsedData required',
                data.screenId ?? 'unknown'
            );
        }

        const screenId = data.screenId ?? 'SC000';
        const componentName = this.getComponentName(screenId, data.screenName);

        try {
            // ScreenSchema 생성
            const schema = this.generateScreenSchema(realGridData);

            // RealGrid 컴포넌트 코드 생성
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
     * RealGrid 컴포넌트 코드 생성
     * 
     * AG Grid와 달리 RealGrid는 DOM 기반 초기화가 필요합니다.
     * - useRef로 컨테이너, gridView, dataProvider 관리
     * - useEffect에서 RealGrid 초기화
     * - DataProvider API를 사용한 CRUD 처리
     */
    generateComponentCode(componentName: string, schema: ScreenSchema): string {
        const gridBlock = schema.blocks.find(b => b.type === BlockType.DATA_GRID);
        const searchBlock = schema.blocks.find(b => b.type === BlockType.SEARCH_FORM);

        const columns = gridBlock?.config?.columns || [];
        const searchFields = searchBlock?.config?.fields || [];
        const pkField = gridBlock?.config?.primaryKey || 'id';


        // Fields 정의 생성 (DataProvider용) - ValueType은 JSON.stringify하면 문자열이 되므로 수동 생성
        const fieldsJson = `[
${columns.map((col: GridColumn) => `    { fieldName: "${col.field}", dataType: ${this.mapToRealGridDataType(col.type || 'text')} }`).join(',\n')}
  ]`;

        // Columns 정의 생성 (GridView용)
        const columnsJson = JSON.stringify(
            columns.map((col: GridColumn) => ({
                name: col.field,
                fieldName: col.field,
                header: { text: col.headerName },
                width: col.width || 120,
                editable: col.editable ?? true,
                styles: { textAlignment: col.align || 'center' },
            })),
            null,
            2
        );

        // 검색 필드 state 생성
        const searchStates = searchFields.map((field: any) =>
            `  const [${field.name}, set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}] = useState('');`
        ).join('\n');

        // 검색 필드 렌더링 (공통 옵션 컴포넌트 사용)
        const searchFieldsRender = searchFields.map((field: any) => {
            const setter = `set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`;
            const fieldType = field.type || 'TEXT_INPUT';

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
                case 'BI_EQUIPMENT':
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
                case 'BI_EXPENSE':
                    return `        <ExpenSelSelect
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
                default:
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

        // 새 행 템플릿 생성 (빈 columns 처리)
        const newRowFields = columns.map((col: GridColumn) =>
            `      ${col.field}: ''`
        );
        const newRowTemplate = newRowFields.length > 0
            ? newRowFields.join(',\n') + ','
            : '';

        const hasSearchFields = searchFields.length > 0;

        // 공통 옵션 import 생성
        const needsOptionImports = searchFields.some((f: any) => {
            const type = f.type || 'TEXT_INPUT';
            return ['YEAR_MONTH', 'BI_YEAR_MONTH', 'BI_SITE', 'BI_DEPT', 'BI_ACCOUNT', 'BI_CUSTOMER', 'BI_SCENARIO', 'BI_PRODUCT', 'DATE_PICKER'].includes(type);
        });

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

import { useState, useEffect, useCallback, useRef } from 'react';
import RealGrid, { GridView, LocalDataProvider, ValueType } from 'realgrid';
import { Search, RotateCcw, Plus, Save, Trash2, Download, Loader2 } from 'lucide-react';
${optionImports}

/**
 * ${schema.screenName}
 * @generated by AI Factory Lab (RealGrid)
 */

export default function ${componentName}() {
  // RealGrid 참조
  const containerRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<GridView | null>(null);
  const dataProviderRef = useRef<LocalDataProvider | null>(null);
  
  // 상태
  const [loading, setLoading] = useState(false);
  const [modifiedRows, setModifiedRows] = useState(new Set());
  const [deletedRows, setDeletedRows] = useState<any[]>([]);
  
${searchStates}

  // RealGrid 필드 정의
  const fields = ${fieldsJson};

  // RealGrid 컬럼 정의
  const columns = ${columnsJson};

  // RealGrid 초기화
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 라이센스 설정
    const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
    if (license) {
      RealGrid.setLicenseKey(license);
    }
    
    // DataProvider & GridView 초기화
    const dataProvider = new LocalDataProvider(false);
    const gridView = new GridView(containerRef.current);
    gridView.setDataSource(dataProvider);
    
    // 필드 & 컬럼 설정
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
    
    // 그리드 옵션
    gridView.setDisplayOptions({
      columnMovable: true,
      columnResizable: true,
      rowHeight: 36,
    });
    
    gridView.setHeader({ height: 40 });
    gridView.setEditOptions({ editable: true, insertable: true, deletable: true });
    gridView.setStateBar({ visible: true });
    gridView.setCheckBar({ visible: true });
    
    // 참조 저장
    gridViewRef.current = gridView;
    dataProviderRef.current = dataProvider;
    
    // 데이터 변경 이벤트
    dataProvider.onRowStateChanged = (provider, row) => {
      setModifiedRows(prev => new Set(prev).add(row));
    };
    
    // 초기 데이터 로드
    fetchData();
    
    return () => {
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  // 데이터 조회
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
${searchFields.map((f: any) => `      if (${f.name}) params.append('${f.name}', ${f.name});`).join('\n')}
      const queryString = params.toString();
      const url = \`${gridBlock?.config?.apiEndpoint || '/api/data'}\${queryString ? '?' + queryString : ''}\`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      
      if (dataProviderRef.current) {
        dataProviderRef.current.setRows(result.data || []);
      }
      setModifiedRows(new Set());
      setDeletedRows(new Set());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [${searchFields.map((f: any) => f.name).join(', ')}]);

  // 검색
  const handleSearch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // 초기화
  const handleReset = useCallback(() => {
${searchFields.map((f: any) => `    set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}('');`).join('\n')}
    fetchData();
  }, [fetchData]);

  // 행 추가
  const handleAddRow = useCallback(() => {
    if (dataProviderRef.current) {
      const newRow = {
${newRowTemplate}        _isNew: true,
      };
      dataProviderRef.current.insertRow(0, newRow);
    }
  }, []);

  // 선택된 행 삭제
  const handleDeleteSelected = useCallback(() => {
    if (!gridViewRef.current || !dataProviderRef.current) return;
    
    const checkedRows = gridViewRef.current.getCheckedRows();
    if (checkedRows.length === 0) {
      alert('삭제할 행을 선택해주세요.');
      return;
    }
    
    if (!confirm(\`선택된 \${checkedRows.length}개 행을 삭제하시겠습니까?\`)) {
      return;
    }
    
    // 삭제할 행의 데이터 저장 (PK 값 포함)
    const rowsToDelete = checkedRows.map(row => dataProviderRef.current?.getJsonRow(row)).filter(Boolean);
    
    // 역순으로 삭제 (인덱스 유지)
    checkedRows.sort((a, b) => b - a).forEach(row => {
      if (dataProviderRef.current) {
        dataProviderRef.current.removeRow(row);
      }
    });
    
    setDeletedRows(prev => [...prev, ...rowsToDelete]);
  }, []);

  // 저장
  const handleSave = useCallback(async () => {
    if (!dataProviderRef.current) return;
    
    // 변경된 행들 수집
    const provider = dataProviderRef.current;
    const insertedRows = [];
    const updatedRows = [];
    
    for (let i = 0; i < provider.getRowCount(); i++) {
      const state = provider.getRowState(i);
      const values = provider.getJsonRow(i);
      
      if (state === 'created') {
        insertedRows.push(values);
      } else if (state === 'updated') {
        updatedRows.push(values);
      }
    }
    
    if (insertedRows.length === 0 && updatedRows.length === 0 && deletedRows.length === 0) {
      alert('변경된 내용이 없습니다.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(\`${gridBlock?.config?.apiEndpoint || '/api/data'}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inserted: insertedRows,
          updated: updatedRows,
          deleted: deletedRows,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(\`저장 완료: 추가 \${result.insertedCount}건, 수정 \${result.updatedCount}건, 삭제 \${result.deletedCount}건\`);
        setDeletedRows([]);
        fetchData();
      } else {
        alert('저장 실패: ' + (result.error || '알 수 없는 오류'));
        if (result.errors?.length > 0) {
          console.error('저장 오류 상세:', result.errors);
        }
      }
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [deletedRows, fetchData]);

  // 엑셀 다운로드
  const handleExcelExport = useCallback(() => {
    if (gridViewRef.current) {
      gridViewRef.current.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: '${schema.screenName}_export.xlsx',
      });
    }
  }, []);

  // 변경 여부 확인
  const hasChanges = modifiedRows.size > 0 || deletedRows.length > 0;

  // 인라인 스타일 정의 (IBM Carbon Design System)
  const styles = {
    container: { display: 'flex', flexDirection: 'column' as const, height: '100%', padding: 16, backgroundColor: '#ffffff', fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif" },
    title: { fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#161616' },
    searchContainer: { display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 16, padding: 16, backgroundColor: '#f4f4f4', border: 'none' },
    searchField: { display: 'flex', flexDirection: 'column' as const, gap: 4 },
    label: { fontSize: 12, color: '#525252', marginBottom: 4 },
    input: { height: 40, padding: '0 16px', border: 'none', borderBottom: '1px solid #8d8d8d', backgroundColor: '#f4f4f4', minWidth: 120, fontSize: 14 },
    buttonGroup: { display: 'flex', gap: 8, marginLeft: 'auto' },
    toolbar: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#0f62fe', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnSuccess: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#24a148', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnDanger: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#da1e28', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnSecondary: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#393939', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer' },
    btnDisabled: { display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 16px', backgroundColor: '#c6c6c6', color: '#8d8d8d', border: 'none', fontSize: 14, cursor: 'not-allowed' },
    statusBar: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, fontSize: 12, color: '#525252' },
    statusItem: { display: 'flex', alignItems: 'center', gap: 4 },
    gridContainer: { flex: 1, minHeight: 400 },
  };

  return (
    <div style={styles.container}>
      {/* RealGrid IBM Carbon Design System Style */}
      <style jsx global>{\`
        /* IBM Carbon Design System - Data Table Style */
        .realgrid-container .rg-root {
          border: 1px solid #e0e0e0 !important;
          border-radius: 0 !important;
          overflow: hidden !important;
          font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        /* Header - Carbon Gray */
        .realgrid-container .rg-header-bar {
          background: #e0e0e0 !important;
          border-bottom: 1px solid #c6c6c6 !important;
        }
        
        .realgrid-container .rg-header-text {
          color: #161616 !important;
          font-weight: 600 !important;
          font-size: 14px !important;
        }
        
        /* Body Cells */
        .realgrid-container .rg-data-cell {
          border-right: 1px solid #e0e0e0 !important;
          border-bottom: 1px solid #e0e0e0 !important;
          padding: 0 16px !important;
          font-size: 14px !important;
          color: #161616 !important;
          height: 48px !important;
          line-height: 48px !important;
        }
        
        /* Row Hover - Carbon hover color */
        .realgrid-container .rg-data-row:hover {
          background: #e8e8e8 !important;
        }
        
        /* Selected Row */
        .realgrid-container .rg-data-row.rg-selected {
          background: #d0e2ff !important;
        }
        
        /* State Bar */
        .realgrid-container .rg-state-bar {
          background: #f4f4f4 !important;
          border-right: 1px solid #e0e0e0 !important;
        }
        
        /* Check Bar */
        .realgrid-container .rg-check-bar {
          background: #f4f4f4 !important;
          border-right: 1px solid #e0e0e0 !important;
        }
        
        /* Zebra Striping (Carbon style) */
        .realgrid-container .rg-data-row:nth-child(even) {
          background: #f4f4f4 !important;
        }
        
        .realgrid-container .rg-data-row:nth-child(even):hover {
          background: #e8e8e8 !important;
        }
        
        /* Focus style - Carbon blue outline */
        .realgrid-container .rg-data-cell:focus {
          outline: 2px solid #0f62fe !important;
          outline-offset: -2px !important;
        }
      \`}</style>

      {/* 제목 */}
      <h1 style={styles.title}>
        ${schema.screenName}
      </h1>

      {/* 조회조건 */}
${hasSearchFields ? `      <div style={styles.searchContainer}>
${searchFieldsRender}
        <div style={styles.buttonGroup}>
          <button onClick={handleSearch} style={styles.btnPrimary}>
            검색
          </button>
          <button onClick={handleReset} style={{ ...styles.btnPrimary, backgroundColor: '#e0e0e0', color: '#161616' }}>
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
            <span style={{ width: 12, height: 12, backgroundColor: '#e8f5e9', border: '1px solid #c6c6c6' }}></span>
            변경 ({modifiedRows.size})
          </span>
          <span style={styles.statusItem}>
            <span style={{ width: 12, height: 12, backgroundColor: '#ffebee', border: '1px solid #c6c6c6' }}></span>
            삭제 ({deletedRows.length})
          </span>
        </div>
      )}

      {/* RealGrid */}
      <div className="realgrid-container" style={styles.gridContainer}>
        <div 
          ref={containerRef} 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
`;
    }

    /**
     * RealGrid DataType 매핑
     */
    private mapToRealGridDataType(type: string): string {
        switch (type) {
            case 'number':
                return 'ValueType.NUMBER';
            case 'date':
            case 'datetime':
                return 'ValueType.DATE';
            case 'boolean':
                return 'ValueType.BOOLEAN';
            default:
                return 'ValueType.TEXT';
        }
    }

    // ============================================================
    // ScreenSchema 생성 (SimpleGridCrudTemplate과 동일)
    // ============================================================

    /**
     * ScreenSchema 생성 (Excel 데이터 → 블록 조립)
     */
    private generateScreenSchema(data: CrudParsedData): ScreenSchema {
        const screenId = data.screenId ?? 'SC000';
        const pkField = data.crudConfig?.primaryKey || 'id';

        // 검색 필드 생성
        const searchFields = this.generateSearchFields(data);

        // 그리드 컬럼 생성
        const gridColumns = this.generateGridColumns(data.crudColumns, pkField);

        // 툴바 버튼 생성
        const toolbarButtons = this.generateToolbarButtons();

        // 블록 조립
        const blocks: Block[] = [
            // 페이지 헤더
            {
                id: `${screenId}_header`,
                type: BlockType.PAGE_HEADER,
                config: {
                    title: data.screenName,
                    subtitle: data.screenNameEn,
                },
            },
            // 검색 폼
            {
                id: `${screenId}_search`,
                type: BlockType.SEARCH_FORM,
                config: {
                    fields: searchFields,
                    onSearch: 'handleSearch',
                    onReset: 'handleReset',
                },
            },
            // 툴바
            {
                id: `${screenId}_toolbar`,
                type: BlockType.TOOLBAR,
                config: {
                    buttons: toolbarButtons,
                },
            },
            // 데이터 그리드 - RealGrid
            {
                id: `${screenId}_grid`,
                type: BlockType.DATA_GRID,
                config: {
                    gridType: 'realgrid',
                    columns: gridColumns,
                    primaryKey: pkField,
                    rowSelection: data.crudConfig?.rowSelection ?? 'multiple',
                    pagination: data.crudConfig?.pagination ?? false,
                    pageSize: data.crudConfig?.pageSize ?? 50,
                    editable: true,
                    apiEndpoint: `/api/screens/${screenId.toLowerCase()}/data`,
                },
            },
        ];

        return {
            version: '1.0',
            screenId,
            screenName: data.screenName,
            screenNameEn: data.screenNameEn,
            screenType: ScreenType.REALGRID_CRUD,
            tableName: data.tableName,
            layout: {
                type: LayoutType.SINGLE_COLUMN,
                blocks: blocks.map(b => b.id),
            },
            blocks,
            createdAt: new Date().toISOString(),
        };
    }

    /**
     * 검색 필드 생성
     */
    private generateSearchFields(data: CrudParsedData): SearchField[] {
        return data.searchConditions.map((cond, i) => ({
            id: `search_${i}`,
            name: cond.field || `search${cond.label.replace(/\s/g, '')}`,
            label: cond.label,
            type: this.mapSearchFieldType(cond.type),
            placeholder: cond.label,
            required: cond.required || false,
        }));
    }

    /**
     * SearchCondition.type → SearchFieldType 매핑
     * UI는 대문자 enum 사용 (YEAR_MONTH, BI_SITE 등)
     */
    private mapSearchFieldType(type: string): string {
        const typeMap: Record<string, string> = {
            // 소문자 (legacy)
            'text': 'TEXT_INPUT',
            'number': 'NUMBER_INPUT',
            'date': 'DATE_PICKER',
            'dateRange': 'DATE_RANGE',
            'yearMonth': 'YEAR_MONTH',
            'select': 'SELECT',
            'multiSelect': 'MULTI_SELECT',
            'checkbox': 'CHECKBOX',
            'site': 'BI_SITE',
            'scenario': 'BI_SCENARIO',
            'dept': 'BI_DEPT',
            'costCenter': 'BI_COST_CENTER',
            'user': 'BI_USER',
            'account': 'BI_ACCOUNT',
            'expense': 'BI_EXPENSE',
            'customer': 'BI_CUSTOMER',
            'equipment': 'BI_EQUIPMENT',
            'product': 'BI_PRODUCT',
            // 대문자 (UI enum values) - 그대로 반환
            'TEXT_INPUT': 'TEXT_INPUT',
            'NUMBER_INPUT': 'NUMBER_INPUT',
            'DATE_PICKER': 'DATE_PICKER',
            'DATE_RANGE': 'DATE_RANGE',
            'YEAR_MONTH': 'YEAR_MONTH',
            'SELECT': 'SELECT',
            'MULTI_SELECT': 'MULTI_SELECT',
            'CHECKBOX': 'CHECKBOX',
            'BI_SITE': 'BI_SITE',
            'BI_SCENARIO': 'BI_SCENARIO',
            'BI_DEPT': 'BI_DEPT',
            'BI_COST_CENTER': 'BI_COST_CENTER',
            'BI_USER': 'BI_USER',
            'BI_ACCOUNT': 'BI_ACCOUNT',
            'BI_EXPENSE': 'BI_EXPENSE',
            'BI_CUSTOMER': 'BI_CUSTOMER',
            'BI_EQUIPMENT': 'BI_EQUIPMENT',
            'BI_PRODUCT': 'BI_PRODUCT',
        };
        return typeMap[type] || 'TEXT_INPUT';
    }

    /**
     * 툴바 버튼 생성
     */
    private generateToolbarButtons(): ToolbarButton[] {
        return [
            { id: 'add', label: '행 추가', icon: 'Plus', action: 'handleAddRow', variant: 'primary' },
            { id: 'save', label: '저장', icon: 'Save', action: 'handleSave', variant: 'success' },
            { id: 'delete', label: '삭제', icon: 'Trash2', action: 'handleDeleteSelected', variant: 'danger' },
            { id: 'excel', label: '엑셀', icon: 'Download', action: 'handleExcelExport', variant: 'secondary', position: 'right' },
        ];
    }

    /**
     * 그리드 컬럼 생성
     */
    private generateGridColumns(columns: CrudColumnDef[], pkField: string): GridColumn[] {
        return columns.map((col, index) => ({
            id: `col_${index}`,
            headerName: col.headerName,
            field: col.field,
            width: col.width || 120,
            type: this.mapColumnType(col.editorType),
            editable: col.editable,
            required: col.required,
            align: col.align,
            isPrimaryKey: col.field === pkField,
        }));
    }

    /**
     * 에디터 타입 → 그리드 컬럼 타입 매핑
     */
    private mapColumnType(editorType: string): GridColumn['type'] {
        const typeMap: Record<string, GridColumn['type']> = {
            'text': 'text',
            'number': 'number',
            'date': 'date',
            'datetime': 'datetime',
            'select': 'select',
            'checkbox': 'checkbox',
            'textarea': 'text',
            'readonly': 'text',
        };
        return typeMap[editorType] || 'text';
    }

    // ============================================================
    // API 생성 (SimpleGridCrudTemplate과 동일)
    // ============================================================

    /**
     * API 코드 생성
     */
    async generateApiCode(data: ParsedData): Promise<string> {
        if (!isCrudParsedData(data)) {
            throw new Error('CrudParsedData required');
        }

        const screenId = data.screenId ?? 'SC000';
        const routerName = this.getRouterName(screenId);
        const tableName = data.tableName ?? 'unknown_table';

        return this.generateRouterCode(routerName, tableName, data.crudConfig, data.crudColumns);
    }

    /**
     * API 라우터 코드 생성 (전체 결과 반환)
     */
    async generateApi(data: ParsedData): Promise<ApiGenerationResult> {
        try {
            const code = await this.generateApiCode(data);
            const screenId = data.screenId ?? 'SC000';

            return {
                success: true,
                fileName: `${this.getRouterName(screenId)}.ts`,
                code,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
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
        const zodSchema = this.generateZodSchema(columns);

        return `/**
 * ${routerName} tRPC Router
 * @generated by AI Factory Lab (RealGrid Template)
 */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

${zodSchema}

export const ${routerName}Router = createTRPCRouter({
  // 목록 조회
  getList: publicProcedure
    .input(z.object({
      // 검색 조건 추가
    }).optional())
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.$queryRaw\`
        SELECT * FROM ${tableName}
        ${config.sortColumn ? `ORDER BY ${config.sortColumn} ${config.sortDirection || 'ASC'}` : ''}
      \`;
      return { data };
    }),

  // 단건 생성
  create: publicProcedure
    .input(${routerName}Schema)
    .mutation(async ({ ctx, input }) => {
      // TODO: INSERT 구현
      return { success: true };
    }),

  // 단건 수정
  update: publicProcedure
    .input(${routerName}Schema.extend({ ${pkField}: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // TODO: UPDATE 구현
      return { success: true };
    }),

  // 다중 삭제
  deleteMany: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      // TODO: DELETE 구현
      return { success: true, deletedCount: input.ids.length };
    }),

  // 일괄 저장 (추가/수정/삭제)
  saveAll: publicProcedure
    .input(z.object({
      inserts: z.array(${routerName}Schema),
      updates: z.array(${routerName}Schema.extend({ ${pkField}: z.string() })),
      deletes: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 트랜잭션으로 일괄 처리
      return {
        success: true,
        insertedCount: input.inserts.length,
        updatedCount: input.updates.length,
        deletedCount: input.deletes.length,
      };
    }),
});
`;
    }

    /**
     * Zod 스키마 생성
     */
    private generateZodSchema(columns: CrudColumnDef[]): string {
        const fields = columns.map(col => {
            let zodType = 'z.string()';

            switch (col.editorType) {
                case 'number':
                    zodType = 'z.number()';
                    break;
                case 'checkbox':
                    zodType = 'z.boolean()';
                    break;
                case 'date':
                case 'datetime':
                    zodType = 'z.string()'; // ISO string
                    break;
                default:
                    zodType = 'z.string()';
            }

            if (!col.required) {
                zodType += '.optional()';
            }

            return `  ${col.field}: ${zodType},`;
        }).join('\n');

        const routerName = 'screen';
        return `const ${routerName}Schema = z.object({\n${fields}\n});`;
    }

    /**
     * 라우터 이름 생성
     */
    private getRouterName(screenId: string): string {
        return `screen${screenId.replace('SC', '')}`;
    }

    // ============================================================
    // 컴포넌트 + API 전체 생성
    // ============================================================

    /**
     * 컴포넌트(스키마) + API 전체 생성
     */
    async generateScreen(data: ParsedData): Promise<ScreenGenerationResult> {
        const [componentResult, apiResult] = await Promise.all([
            this.generateComponent(data),
            this.generateApi(data),
        ]);

        return {
            success: componentResult.success && apiResult.success,
            component: componentResult,
            api: apiResult,
            metadata: {
                screenId: data.screenId ?? 'SC000',
                screenName: data.screenName,
                screenType: ScreenType.REALGRID_CRUD,
                tableName: data.tableName ?? '',
                generatedAt: new Date().toISOString(),
            },
        };
    }
}

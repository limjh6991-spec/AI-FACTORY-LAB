/**
 * Simple Grid CRUD 템플릿
 * 
 * 기준정보 관리를 위한 단순 CRUD 화면 생성 템플릿
 * - 조회/추가/수정/삭제 기능
 * - AG Grid 인라인 편집
 * - 변경 추적 및 일괄 저장
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
// SimpleGridCrudTemplate 클래스
// ============================================================

/**
 * Simple Grid CRUD 화면 생성 템플릿
 * 
 * 기준정보(마스터 데이터) 관리 화면을 생성합니다.
 * - 거래처관리, 품목관리, 창고관리 등
 * - 조회/추가/수정/삭제 기능
 * - AG Grid Enterprise 인라인 편집
 * - 일괄 저장 (변경사항 추적)
 */
export class SimpleGridCrudTemplate extends BaseTemplate implements ICrudTemplate {
  protected readonly screenType = ScreenType.SIMPLE_GRID_CRUD;
  protected readonly description = '단순 CRUD 화면 (기준정보 관리)';

  // ============================================================
  // 컴포넌트 생성
  // ============================================================

  /**
   * CRUD 컴포넌트 코드 생성
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
    const screenName = data.screenName;
    const componentName = this.getComponentName(screenId, screenName);

    try {
      const imports = this.generateComponentImports();
      const body = this.generateComponentBody(componentName, data);
      const code = this.wrapComponent(componentName, imports, body);

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
   * Import 문 생성
   */
  private generateComponentImports(): string {
    return `import { useState, useCallback, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridReadyEvent, CellValueChangedEvent, RowNode } from 'ag-grid-community';
import { 
  Button, 
  Content,
  Grid,
  Column,
  Loading,
  InlineNotification,
} from '@carbon/react';
import { Add, Save, TrashCan, Reset, Search } from '@carbon/icons-react';
import { api } from '~/trpc/react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';`;
  }

  /**
   * 컴포넌트 본문 생성
   */
  private generateComponentBody(componentName: string, data: CrudParsedData): string {
    const { crudConfig, crudColumns, tableName } = data;
    const routerName = this.getRouterName(data.screenId ?? 'SC000');

    return `
// 행 상태 타입
type RowStatus = 'unchanged' | 'added' | 'modified' | 'deleted';

// 행 데이터 타입
interface RowData {
  _status: RowStatus;
  _original?: Record<string, any>;
  ${this.generateRowDataFields(crudColumns)}
}

// 기본값 생성 함수
const createEmptyRow = (): RowData => ({
  _status: 'added',
  ${this.generateDefaultValues(crudColumns, crudConfig)}
});

function ${componentName}() {
  // Grid ref
  const gridRef = useRef<AgGridReact<RowData>>(null);

  // 상태
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);

  // tRPC queries/mutations
  const { data: fetchedData, isLoading, error, refetch } = api.${routerName}.getAll.useQuery();
  
  const saveMutation = api.${routerName}.save.useMutation({
    onSuccess: () => {
      refetch();
      setHasChanges(false);
    },
  });

  // 데이터 초기화
  useMemo(() => {
    if (fetchedData) {
      setRowData(
        fetchedData.map((row: any) => ({
          ...row,
          _status: 'unchanged' as RowStatus,
          _original: { ...row },
        }))
      );
    }
  }, [fetchedData]);

  // 컬럼 정의
  const columnDefs: ColDef<RowData>[] = useMemo(() => [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      pinned: 'left',
      lockPosition: true,
    },
    ${this.generateAgGridColumnDefs(crudColumns)}
  ], []);

  // 기본 컬럼 설정
  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
  }), []);

  // Grid Ready 핸들러
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  // 셀 값 변경 핸들러
  const onCellValueChanged = useCallback((event: CellValueChangedEvent<RowData>) => {
    const { data, node } = event;
    if (data && data._status === 'unchanged') {
      data._status = 'modified';
      node?.setData(data);
    }
    setHasChanges(true);
  }, []);

  // 선택 변경 핸들러
  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes() ?? [];
    setSelectedRows(selectedNodes.map((node: RowNode<RowData>) => node.data!).filter(Boolean));
  }, []);

  // 행 추가
  const handleAddRow = useCallback(() => {
    const newRow = createEmptyRow();
    setRowData(prev => [newRow, ...prev]);
    setHasChanges(true);
  }, []);

  // 선택된 행 삭제
  const handleDeleteSelected = useCallback(() => {
    setRowData(prev =>
      prev.map(row =>
        selectedRows.some(s => s.${crudConfig.primaryKey} === row.${crudConfig.primaryKey})
          ? { ...row, _status: 'deleted' as RowStatus }
          : row
      ).filter(row => row._status !== 'added' || !selectedRows.some(s => s === row))
    );
    setHasChanges(true);
    setSelectedRows([]);
    gridRef.current?.api.deselectAll();
  }, [selectedRows]);

  // 저장
  const handleSave = useCallback(async () => {
    const inserts = rowData.filter(r => r._status === 'added')
      .map(({ _status, _original, ...data }) => data);
    const updates = rowData.filter(r => r._status === 'modified')
      .map(({ _status, _original, ...data }) => data);
    const deletes = rowData.filter(r => r._status === 'deleted')
      .map(r => String(r.${crudConfig.primaryKey}));

    await saveMutation.mutateAsync({ inserts, updates, deletes });
  }, [rowData, saveMutation]);

  // 초기화 (새로고침)
  const handleReset = useCallback(() => {
    refetch();
    setHasChanges(false);
    setSelectedRows([]);
  }, [refetch]);

  // 로딩 상태
  if (isLoading) {
    return <Loading description="데이터를 불러오는 중..." />;
  }

  // 에러 상태
  if (error) {
    return (
      <InlineNotification
        kind="error"
        title="데이터 로드 실패"
        subtitle={error.message}
      />
    );
  }

  return (
    <Content>
      <Grid fullWidth>
        {/* 제목 및 버튼 영역 */}
        <Column lg={16} md={8} sm={4}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem' 
          }}>
            <h2>${data.screenName}</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                kind="primary"
                size="sm"
                renderIcon={Add}
                onClick={handleAddRow}
              >
                행 추가
              </Button>
              <Button
                kind="danger--ghost"
                size="sm"
                renderIcon={TrashCan}
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0}
              >
                삭제
              </Button>
              <Button
                kind="secondary"
                size="sm"
                renderIcon={Reset}
                onClick={handleReset}
              >
                초기화
              </Button>
              <Button
                kind="primary"
                size="sm"
                renderIcon={Save}
                onClick={handleSave}
                disabled={!hasChanges || saveMutation.isPending}
              >
                {saveMutation.isPending ? '저장 중...' : '저장'}
              </Button>
            </div>
          </div>
        </Column>

        {/* 변경사항 알림 */}
        {hasChanges && (
          <Column lg={16} md={8} sm={4}>
            <InlineNotification
              kind="warning"
              title="변경사항이 있습니다"
              subtitle="저장 버튼을 클릭하여 변경사항을 저장하세요."
              lowContrast
              hideCloseButton
            />
          </Column>
        )}

        {/* AG Grid */}
        <Column lg={16} md={8} sm={4}>
          <div 
            className="ag-theme-alpine" 
            style={{ height: 'calc(100vh - 220px)', width: '100%' }}
          >
            <AgGridReact<RowData>
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection="${crudConfig.rowSelection}"
              onGridReady={onGridReady}
              onCellValueChanged={onCellValueChanged}
              onSelectionChanged={onSelectionChanged}
              animateRows={true}
              ${crudConfig.pagination ? `pagination={true}\n              paginationPageSize={${crudConfig.pageSize ?? 50}}` : ''}
              getRowId={(params) => String(params.data.${crudConfig.primaryKey})}
              rowClassRules={{
                'row-added': (params) => params.data?._status === 'added',
                'row-modified': (params) => params.data?._status === 'modified',
                'row-deleted': (params) => params.data?._status === 'deleted',
              }}
            />
          </div>
        </Column>
      </Grid>

      {/* 행 상태 스타일 */}
      <style jsx global>{\`
        .row-added {
          background-color: #d4edda !important;
        }
        .row-modified {
          background-color: #fff3cd !important;
        }
        .row-deleted {
          background-color: #f8d7da !important;
          text-decoration: line-through;
        }
      \`}</style>
    </Content>
  );
}`;
  }

  /**
   * RowData 필드 타입 생성
   */
  private generateRowDataFields(columns: CrudColumnDef[]): string {
    return columns.map(col => {
      const tsType = this.getTypeScriptType(col.editorType);
      const optional = col.required ? '' : '?';
      return `${col.field}${optional}: ${tsType};`;
    }).join('\n  ');
  }

  /**
   * 기본값 생성 코드
   */
  private generateDefaultValues(columns: CrudColumnDef[], config: CrudConfig): string {
    return columns.map(col => {
      let defaultValue: string;
      
      if (col.defaultValue !== undefined) {
        defaultValue = typeof col.defaultValue === 'string' 
          ? `'${col.defaultValue}'` 
          : String(col.defaultValue);
      } else {
        defaultValue = this.getDefaultValueByType(col.editorType);
      }

      return `${col.field}: ${defaultValue},`;
    }).join('\n  ');
  }

  /**
   * AG Grid 컬럼 정의 생성
   */
  private generateAgGridColumnDefs(columns: CrudColumnDef[]): string {
    return columns.map(col => {
      const parts: string[] = [];
      
      parts.push(`headerName: '${col.headerName}'`);
      parts.push(`field: '${col.field}'`);
      parts.push(`width: ${col.width}`);
      
      if (!col.editable) {
        parts.push(`editable: false`);
      }
      
      // 셀 에디터 타입
      const cellEditor = this.getCellEditor(col);
      if (cellEditor) {
        parts.push(cellEditor);
      }

      // 정렬
      if (col.align) {
        parts.push(`cellClass: '${col.align === 'right' ? 'ag-right-aligned-cell' : col.align === 'center' ? 'ag-center-aligned-cell' : ''}'`);
      }

      // 숨김
      if (col.hidden) {
        parts.push(`hide: true`);
      }

      return `    { ${parts.join(', ')} },`;
    }).join('\n');
  }

  /**
   * 에디터 타입에 따른 TypeScript 타입
   */
  private getTypeScriptType(editorType: string): string {
    switch (editorType) {
      case 'number':
        return 'number';
      case 'checkbox':
        return 'boolean';
      case 'date':
      case 'datetime':
        return 'string | Date';
      default:
        return 'string';
    }
  }

  /**
   * 에디터 타입에 따른 기본값
   */
  private getDefaultValueByType(editorType: string): string {
    switch (editorType) {
      case 'number':
        return '0';
      case 'checkbox':
        return 'false';
      default:
        return "''";
    }
  }

  /**
   * AG Grid 셀 에디터 설정
   */
  private getCellEditor(col: CrudColumnDef): string | null {
    switch (col.editorType) {
      case 'number':
        return `cellEditor: 'agNumberCellEditor'`;
      case 'date':
        return `cellEditor: 'agDateStringCellEditor'`;
      case 'select':
        if (Array.isArray(col.options)) {
          const values = col.options.map(o => `'${o.value}'`).join(', ');
          return `cellEditor: 'agSelectCellEditor', cellEditorParams: { values: [${values}] }`;
        }
        return null;
      case 'checkbox':
        return `cellRenderer: 'agCheckboxCellRenderer', cellEditor: 'agCheckboxCellEditor'`;
      case 'textarea':
        return `cellEditor: 'agLargeTextCellEditor'`;
      default:
        return null;
    }
  }

  /**
   * 라우터 이름 생성
   */
  private getRouterName(screenId: string): string {
    return `screen${screenId}`;
  }

  // ============================================================
  // API 생성
  // ============================================================

  /**
   * API 라우터 코드 생성
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
        procedures: ['getAll', 'getById', 'save'],
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

    return `/**
 * ${routerName} - 자동 생성된 CRUD API
 * 
 * @generated by AI Factory Lab
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { db } from '~/server/db';

// 입력 스키마
const rowSchema = z.object({
  ${this.generateZodSchema(columns)}
});

const saveInputSchema = z.object({
  inserts: z.array(rowSchema),
  updates: z.array(rowSchema),
  deletes: z.array(z.string()),
});

export const ${routerName}Router = createTRPCRouter({
  // 전체 조회
  getAll: publicProcedure.query(async () => {
    const result = await db.${this.toCamelCase(tableName)}.findMany({
      ${config.softDelete ? `where: { deleteYn: 'N' },` : ''}
      orderBy: { ${config.sortColumn ?? pkField}: '${config.sortDirection ?? 'asc'}' },
    });
    return result;
  }),

  // 단건 조회
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db.${this.toCamelCase(tableName)}.findUnique({
        where: { ${pkField}: input },
      });
      return result;
    }),

  // 일괄 저장 (Insert/Update/Delete)
  save: publicProcedure
    .input(saveInputSchema)
    .mutation(async ({ input }) => {
      const { inserts, updates, deletes } = input;
      
      // 트랜잭션으로 일괄 처리
      await db.$transaction(async (tx) => {
        // Insert
        if (inserts.length > 0) {
          await tx.${this.toCamelCase(tableName)}.createMany({
            data: inserts.map(row => ({
              ...row,
              ${config.auditColumns ? `createdAt: new Date(),\n              updatedAt: new Date(),` : ''}
            })),
          });
        }

        // Update
        for (const row of updates) {
          await tx.${this.toCamelCase(tableName)}.update({
            where: { ${pkField}: row.${pkField} },
            data: {
              ...row,
              ${config.auditColumns ? `updatedAt: new Date(),` : ''}
            },
          });
        }

        // Delete (soft delete or hard delete)
        if (deletes.length > 0) {
          ${config.softDelete 
            ? `await tx.${this.toCamelCase(tableName)}.updateMany({
            where: { ${pkField}: { in: deletes } },
            data: { deleteYn: 'Y', updatedAt: new Date() },
          });`
            : `await tx.${this.toCamelCase(tableName)}.deleteMany({
            where: { ${pkField}: { in: deletes } },
          });`
          }
        }
      });

      return { 
        success: true, 
        insertedCount: inserts.length,
        updatedCount: updates.length,
        deletedCount: deletes.length,
      };
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
          zodType = 'z.union([z.string(), z.date()])';
          break;
        default:
          zodType = 'z.string()';
      }

      if (!col.required) {
        zodType += '.optional()';
      }

      if (col.maxLength && col.editorType === 'text') {
        zodType = `z.string().max(${col.maxLength})${col.required ? '' : '.optional()'}`;
      }

      return `${col.field}: ${zodType},`;
    }).join('\n  ');
  }

  // ============================================================
  // 전체 화면 생성
  // ============================================================

  /**
   * 컴포넌트 + API 전체 생성
   */
  async generateScreen(data: ParsedData): Promise<ScreenGenerationResult> {
    const startTime = Date.now();
    const screenId = data.screenId ?? 'SC000';
    const screenName = data.screenName;

    const warnings: string[] = [];

    // 컴포넌트 생성
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

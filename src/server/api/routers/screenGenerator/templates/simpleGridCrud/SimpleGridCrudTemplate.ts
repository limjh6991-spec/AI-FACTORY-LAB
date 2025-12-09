/**
 * Simple Grid CRUD 템플릿
 * 
 * 기준정보 관리를 위한 단순 CRUD 화면 생성 템플릿
 * - 조회/추가/수정/삭제 기능
 * - AG Grid 인라인 편집
 * - 변경 추적 및 일괄 저장
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
 * - AG Grid Community 인라인 편집
 * - 일괄 저장 (변경사항 추적)
 * 
 * 표준 화면 참조: /master/dept/page.tsx
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
      const code = this.generateFullComponent(componentName, data);

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
   * 전체 컴포넌트 코드 생성 (/master/dept 표준 기준)
   */
  private generateFullComponent(componentName: string, data: CrudParsedData): string {
    const { crudConfig, crudColumns } = data;
    const routerName = this.getRouterName(data.screenId ?? 'SC000');
    const pkField = crudConfig.primaryKey;
    const tableName = data.tableName ?? 'unknown';

    // 인터페이스명 (예: DeptData)
    const interfaceName = `${this.toPascalCase(tableName)}Data`;

    return `'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, CellValueChangedEvent, IRowNode } from 'ag-grid-community';
import { Plus, Save, Trash2, RotateCcw, Download } from 'lucide-react';
import { api } from '~/trpc/react';
import {
  BiSiteSelect,
  BiScenarioSelect,
  BiYearMonthPicker,
} from '~/components/master';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 데이터 타입
interface ${interfaceName} {
${this.generateInterfaceFields(crudColumns, crudConfig)}
  _isNew?: boolean;
  _isModified?: boolean;
  _isDeleted?: boolean;
}

export default function ${componentName}() {
  const gridRef = useRef<AgGridReact>(null);
  
  // 검색 조건 (입력용)
  const [site, setSite] = useState<string>('SITE_01');
  const [yyyymm, setYyyyMm] = useState<string>(() => {
    const now = new Date();
    return \`\${now.getFullYear()}\${String(now.getMonth() + 1).padStart(2, '0')}\`;
  });
  const [scenario, setScenario] = useState<string>('ACTUAL');
  
  // 검색 조건 (조회용 - 검색 버튼 클릭 시 반영)
  const [searchParams, setSearchParams] = useState<{
    site: string;
    yyyymm: string;
    scenario: string;
  } | null>(null);
  
  // 그리드 데이터
  const [rowData, setRowData] = useState<${interfaceName}[]>([]);
  const [modifiedRows, setModifiedRows] = useState<Set<string>>(new Set());
  const [deletedRows, setDeletedRows] = useState<Set<string>>(new Set());
  
  // API 호출 - searchParams가 설정된 경우에만 조회
  const { data, isLoading, refetch } = api.${routerName}.getAll.useQuery(
    { 
      site: searchParams?.site ?? '', 
      yyyymm: searchParams?.yyyymm ?? '', 
      scenario: searchParams?.scenario ?? '' 
    },
    { enabled: !!searchParams }
  );
  
  const saveMutation = api.${routerName}.save.useMutation();

  // 데이터 로드
  useEffect(() => {
    if (data) {
      setRowData(data as ${interfaceName}[]);
      setModifiedRows(new Set());
      setDeletedRows(new Set());
    }
  }, [data]);

  // 컬럼 정의
  const columnDefs = useMemo<ColDef[]>(() => [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      pinned: 'left',
      lockPosition: true,
    },
${this.generateAgGridColumnDefs(crudColumns, pkField)}
  ], []);

  // 기본 컬럼 설정
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);

  // 셀 값 변경 시
  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    const { data } = event;
    if (!data._isNew) {
      data._isModified = true;
    }
    setModifiedRows(prev => new Set(prev).add(data.${pkField}));
    // 그리드 새로고침
    event.api.refreshCells({ rowNodes: [event.node!], force: true });
  }, []);

  // 행 추가
  const handleAddRow = useCallback(() => {
    if (!searchParams) {
      alert('먼저 검색을 수행해주세요.');
      return;
    }
    
    const newRow: ${interfaceName} = {
${this.generateNewRowDefaults(crudColumns, crudConfig)}
      _isNew: true,
    };
    setRowData(prev => [newRow, ...prev]);
  }, [searchParams]);

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

    const deleteIds = new Set<string>();
    selectedNodes.forEach((node: IRowNode) => {
      if (!node.data._isNew) {
        deleteIds.add(node.data.${pkField});
      }
    });

    // 새 행은 바로 제거, 기존 행은 삭제 표시
    setRowData(prev => prev.filter(row => {
      const isSelected = selectedNodes.some((n: IRowNode) => n.data.${pkField} === row.${pkField});
      if (isSelected && row._isNew) return false;
      return true;
    }));

    setDeletedRows(prev => new Set([...prev, ...deleteIds]));
  }, []);

  // 저장
  const handleSave = useCallback(async () => {
    if (!searchParams) {
      alert('먼저 검색을 수행해주세요.');
      return;
    }
    
    try {
      const inserts = rowData
        .filter(r => r._isNew)
        .map(({ _isNew, _isModified, _isDeleted, ...rest }) => rest);
      const updates = rowData
        .filter(r => r._isModified && !r._isNew)
        .map(({ _isNew, _isModified, _isDeleted, ...rest }) => rest);
      const deletes = Array.from(deletedRows);

      await saveMutation.mutateAsync({ inserts, updates, deletes });
      alert('저장되었습니다.');
      refetch();
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  }, [rowData, deletedRows, searchParams, saveMutation, refetch]);

  // 검색
  const handleSearch = useCallback(() => {
    if (!site || !yyyymm) {
      alert('사업장과 년월을 선택해주세요.');
      return;
    }
    setSearchParams({ site, yyyymm, scenario });
  }, [site, yyyymm, scenario]);

  // 초기화
  const handleReset = useCallback(() => {
    if (searchParams) {
      refetch();
    }
  }, [searchParams, refetch]);

  // 엑셀 다운로드
  const handleExcelExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: \`${data.screenName}_\${yyyymm}.csv\`,
    });
  }, [yyyymm]);

  const hasChanges = modifiedRows.size > 0 || deletedRows.size > 0 || rowData.some(r => r._isNew);

  return (
    <>
      {/* AG Grid 커스텀 스타일 - IBM Carbon Design */}
      <style jsx global>{\`
        .ag-theme-alpine {
          --ag-header-background-color: #dbeafe;
          --ag-header-foreground-color: #1e3a5f;
          --ag-row-hover-color: #eff6ff;
          --ag-selected-row-background-color: #dbeafe;
          --ag-border-color: #e5e7eb;
          --ag-font-family: inherit;
          --ag-font-size: 14px;
        }
        .ag-theme-alpine .ag-header-group-cell {
          background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
          font-weight: 600;
          color: #1e40af;
        }
        .ag-theme-alpine .ag-header-cell {
          background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
          color: #1e3a5f;
          font-weight: 500;
        }
        .ag-theme-alpine .ag-header-cell-text {
          font-size: 14px;
        }
        .ag-theme-alpine .ag-cell {
          font-size: 14px;
        }
        .ag-theme-alpine .ag-row-selected {
          background-color: #dbeafe !important;
        }
      \`}</style>

      <div className="flex flex-col h-full p-4 bg-white font-sans">
        {/* 제목 */}
        <h1 className="text-lg font-semibold mb-3 text-[#161616]">
          ${data.screenName}
        </h1>

        {/* 조회조건 */}
        <div className="flex items-end gap-4 mb-3 p-3 bg-[#f4f4f4] border border-[#e0e0e0]">
          <BiSiteSelect
            label="사업장"
            value={site}
            onChange={(value) => setSite(value)}
          />
          <BiYearMonthPicker
            label="년월"
            value={yyyymm}
            onChange={(value) => setYyyyMm(value)}
          />
          <BiScenarioSelect
            label="시나리오"
            value={scenario}
            onChange={(value) => setScenario(value)}
          />
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleSearch}
              className="h-9 px-4 bg-[#0f62fe] text-white text-sm hover:bg-[#0353e9] transition-colors"
            >
              검색
            </button>
            <button
              onClick={handleReset}
              className="h-9 px-4 bg-[#e0e0e0] text-[#161616] text-sm hover:bg-[#c6c6c6] transition-colors"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 툴바 */}
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={handleAddRow}
            className="flex items-center gap-1 h-8 px-3 bg-[#0f62fe] text-white text-sm hover:bg-[#0353e9] transition-colors"
          >
            <Plus className="w-4 h-4" />
            행 추가
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex items-center gap-1 h-8 px-3 bg-[#24a148] text-white text-sm hover:bg-[#198038] transition-colors disabled:bg-[#c6c6c6] disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            저장
          </button>
          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-1 h-8 px-3 bg-[#da1e28] text-white text-sm hover:bg-[#ba1b23] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            삭제
          </button>
          <div className="ml-auto">
            <button
              onClick={handleExcelExport}
              className="flex items-center gap-1 h-8 px-3 bg-[#393939] text-white text-sm hover:bg-[#4c4c4c] transition-colors"
            >
              <Download className="w-4 h-4" />
              엑셀
            </button>
          </div>
        </div>

        {/* 상태 표시 */}
        {hasChanges && (
          <div className="flex items-center gap-4 mb-2 text-xs text-[#525252]">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#e8f5e9] border border-[#c6c6c6]"></span>
              신규 ({rowData.filter(r => r._isNew).length})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#fff3e0] border border-[#c6c6c6]"></span>
              수정 ({modifiedRows.size})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#ffebee] border border-[#c6c6c6]"></span>
              삭제 ({deletedRows.size})
            </span>
          </div>
        )}

        {/* AG Grid */}
        <div className="ag-theme-alpine flex-1" style={{ minHeight: 400 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            onCellValueChanged={onCellValueChanged}
            getRowId={(params) => params.data.${pkField}}
            loading={isLoading}
            overlayLoadingTemplate="<span>데이터 로딩 중...</span>"
            overlayNoRowsTemplate="<span>조회된 데이터가 없습니다</span>"
          />
        </div>
      </div>
    </>
  );
}
`;
  }

  /**
   * 인터페이스 필드 생성
   */
  private generateInterfaceFields(columns: CrudColumnDef[], config: CrudConfig): string {
    return columns.map(col => {
      const tsType = this.getTypeScriptType(col.editorType);
      const optional = col.required ? '' : ' | null';
      return `  ${col.field}: ${tsType}${optional};`;
    }).join('\n');
  }

  /**
   * 새 행 기본값 생성
   */
  private generateNewRowDefaults(columns: CrudColumnDef[], config: CrudConfig): string {
    const lines: string[] = [];
    
    // searchParams 기반 기본값
    lines.push(`      plant_site_code: searchParams.site,`);
    lines.push(`      yyyymm: searchParams.yyyymm,`);
    lines.push(`      scenario_code: searchParams.scenario,`);
    
    // 컬럼별 기본값
    columns.forEach(col => {
      // searchParams 관련 필드는 위에서 처리함
      if (['plant_site_code', 'yyyymm', 'scenario_code'].includes(col.field)) {
        return;
      }
      
      let defaultValue: string;
      
      if (col.defaultValue !== undefined) {
        defaultValue = typeof col.defaultValue === 'string' 
          ? `'${col.defaultValue}'` 
          : String(col.defaultValue);
      } else {
        defaultValue = this.getDefaultValueByType(col.editorType);
      }

      // PK 필드는 NEW_timestamp 형태로
      if (col.field === config.primaryKey) {
        lines.push(`      ${col.field}: \`NEW_\${Date.now()}\`,`);
      } else {
        lines.push(`      ${col.field}: ${defaultValue},`);
      }
    });

    return lines.join('\n');
  }

  /**
   * AG Grid 컬럼 정의 생성 (/master/dept 스타일)
   */
  private generateAgGridColumnDefs(columns: CrudColumnDef[], pkField: string): string {
    return columns.map(col => {
      const parts: string[] = [];
      
      parts.push(`      headerName: '${col.headerName}'`);
      parts.push(`      field: '${col.field}'`);
      parts.push(`      width: ${col.width}`);
      
      // PK 컬럼은 신규 행만 편집 가능
      if (col.field === pkField || !col.editable) {
        parts.push(`      editable: (params) => params.data?._isNew === true`);
      } else {
        parts.push(`      editable: true`);
      }
      
      // 셀 스타일 (신규: 연초록, 수정: 연주황)
      parts.push(`      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      }`);
      
      // 셀 에디터 타입
      const cellEditor = this.getCellEditor(col);
      if (cellEditor) {
        parts.push(`      ${cellEditor}`);
      }

      // 셀 렌더러 (체크박스 등)
      const cellRenderer = this.getCellRenderer(col);
      if (cellRenderer) {
        parts.push(`      ${cellRenderer}`);
      }

      // 숨김
      if (col.hidden) {
        parts.push(`      hide: true`);
      }

      return `    {\n${parts.join(',\n')},\n    },`;
    }).join('\n');
  }

  /**
   * 셀 렌더러 생성
   */
  private getCellRenderer(col: CrudColumnDef): string | null {
    if (col.editorType === 'checkbox') {
      return `cellRenderer: (params: { value: boolean | null }) => {
        return params.value ? '예' : '아니오';
      }`;
    }
    return null;
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
        return 'string';
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
          const values = col.options.map(o => 
            typeof o === 'object' ? `'${o.value}'` : `'${o}'`
          ).join(', ');
          return `cellEditor: 'agSelectCellEditor',\n      cellEditorParams: { values: [${values}] }`;
        }
        return null;
      case 'checkbox':
        return `cellEditor: 'agSelectCellEditor',\n      cellEditorParams: { values: [true, false] }`;
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
    return `screen${screenId.replace(/[^a-zA-Z0-9]/g, '')}`;
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
    const prismaModelName = this.toCamelCase(tableName);

    return `/**
 * ${routerName} - 자동 생성된 CRUD API
 * 
 * @generated by AI Factory Lab
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { db } from '~/server/db';

// 조회 조건 스키마
const searchParamsSchema = z.object({
  site: z.string(),
  yyyymm: z.string(),
  scenario: z.string(),
});

// 행 데이터 스키마
const rowSchema = z.object({
${this.generateZodSchema(columns)}
});

// 저장 입력 스키마
const saveInputSchema = z.object({
  inserts: z.array(rowSchema),
  updates: z.array(rowSchema),
  deletes: z.array(z.string()),
});

export const ${routerName}Router = createTRPCRouter({
  // 전체 조회
  getAll: publicProcedure
    .input(searchParamsSchema)
    .query(async ({ input }) => {
      const result = await db.${prismaModelName}.findMany({
        where: {
          plant_site_code: input.site,
          yyyymm: input.yyyymm,
          scenario_code: input.scenario,
          ${config.softDelete ? `delete_yn: 'N',` : ''}
        },
        orderBy: { ${config.sortColumn ?? pkField}: '${config.sortDirection ?? 'asc'}' },
      });
      return result;
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

  // 일괄 저장 (Insert/Update/Delete)
  save: publicProcedure
    .input(saveInputSchema)
    .mutation(async ({ input }) => {
      const { inserts, updates, deletes } = input;
      
      // 트랜잭션으로 일괄 처리
      await db.$transaction(async (tx) => {
        // Insert
        if (inserts.length > 0) {
          await tx.${prismaModelName}.createMany({
            data: inserts.map(row => ({
              ...row,
              ${config.auditColumns ? `created_at: new Date(),\n              updated_at: new Date(),` : ''}
            })),
          });
        }

        // Update
        for (const row of updates) {
          await tx.${prismaModelName}.update({
            where: { ${pkField}: row.${pkField} },
            data: {
              ...row,
              ${config.auditColumns ? `updated_at: new Date(),` : ''}
            },
          });
        }

        // Delete (soft delete or hard delete)
        if (deletes.length > 0) {
          ${config.softDelete 
            ? `await tx.${prismaModelName}.updateMany({
            where: { ${pkField}: { in: deletes } },
            data: { delete_yn: 'Y', updated_at: new Date() },
          });`
            : `await tx.${prismaModelName}.deleteMany({
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

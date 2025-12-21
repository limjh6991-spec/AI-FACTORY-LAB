'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, GridReadyEvent, CellValueChangedEvent, IRowNode } from 'ag-grid-community';
import { Plus, Save, Trash2, RotateCcw, Download } from 'lucide-react';
import { api } from '~/trpc/react';
import {
  BiSiteSelect,
  BiScenarioSelect,
  BiYearMonthPicker,
  BiCostCenterSelect,
} from '~/components/master';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 부서 데이터 타입
interface DeptData {
  plant_site_code: string;
  yyyymm: string;
  scenario_code: string;
  department_code: string;
  department_name: string | null;
  parent_department_code: string | null;
  cost_center_mapping_code: string | null;
  is_production_dept: boolean | null;
  use_yn: string | null;
  _isNew?: boolean;
  _isModified?: boolean;
  _isDeleted?: boolean;
}

export default function DeptMasterPage() {
  const gridRef = useRef<AgGridReact>(null);
  
  // 검색 조건 (입력용)
  const [site, setSite] = useState<string>('SITE_01');
  const [yyyymm, setYyyyMm] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [scenario, setScenario] = useState<string>('ACTUAL');
  
  // 검색 조건 (조회용 - 검색 버튼 클릭 시 반영)
  const [searchParams, setSearchParams] = useState<{
    site: string;
    yyyymm: string;
    scenario: string;
  } | null>(null);
  
  // 그리드 데이터
  const [rowData, setRowData] = useState<DeptData[]>([]);
  const [modifiedRows, setModifiedRows] = useState<Set<string>>(new Set());
  const [deletedRows, setDeletedRows] = useState<Set<string>>(new Set());
  
  // API 호출 - searchParams가 설정된 경우에만 조회
  const { data, isLoading, refetch } = api.biMaster.listDepartments.useQuery(
    { 
      site: searchParams?.site ?? '', 
      yyyymm: searchParams?.yyyymm ?? '', 
      scenario: searchParams?.scenario ?? '' 
    },
    { enabled: !!searchParams }
  );
  
  const saveMutation = api.biMaster.saveDepartment.useMutation();
  const deleteMutation = api.biMaster.deleteDepartment.useMutation();

  // 데이터 로드
  useEffect(() => {
    if (data) {
      setRowData(data as DeptData[]);
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
    {
      headerName: '부서코드',
      field: 'department_code',
      width: 120,
      editable: (params) => params.data?._isNew === true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '부서명',
      field: 'department_name',
      width: 180,
      editable: true,
    },
    {
      headerName: '상위부서코드',
      field: 'parent_department_code',
      width: 140,
      editable: true,
    },
    {
      headerName: '코스트센터',
      field: 'cost_center_mapping_code',
      width: 140,
      editable: true,
    },
    {
      headerName: '생산부서여부',
      field: 'is_production_dept',
      width: 120,
      editable: true,
      cellRenderer: (params: { value: boolean | null }) => {
        return params.value ? '예' : '아니오';
      },
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [true, false],
      },
    },
    {
      headerName: '사용여부',
      field: 'use_yn',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Y', 'N'],
      },
    },
    {
      headerName: '사업장',
      field: 'plant_site_code',
      width: 100,
      hide: true,
    },
    {
      headerName: '년월',
      field: 'yyyymm',
      width: 80,
      hide: true,
    },
    {
      headerName: '시나리오',
      field: 'scenario_code',
      width: 100,
      hide: true,
    },
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
    setModifiedRows(prev => new Set(prev).add(data.department_code));
    // 그리드 새로고침
    event.api.refreshCells({ rowNodes: [event.node!], force: true });
  }, []);

  // 행 추가
  const handleAddRow = useCallback(() => {
    if (!searchParams) {
      alert('먼저 검색을 수행해주세요.');
      return;
    }
    
    const newRow: DeptData = {
      plant_site_code: searchParams.site,
      yyyymm: searchParams.yyyymm,
      scenario_code: searchParams.scenario,
      department_code: `NEW_${Date.now()}`,
      department_name: '',
      parent_department_code: null,
      cost_center_mapping_code: null,
      is_production_dept: false,
      use_yn: 'Y',
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

    if (!confirm(`선택된 ${selectedNodes.length}개 행을 삭제하시겠습니까?`)) {
      return;
    }

    const deleteIds = new Set<string>();
    selectedNodes.forEach((node: IRowNode) => {
      if (!node.data._isNew) {
        deleteIds.add(node.data.department_code);
      }
    });

    // 새 행은 바로 제거, 기존 행은 삭제 표시
    setRowData(prev => prev.filter(row => {
      const isSelected = selectedNodes.some((n: IRowNode) => n.data.department_code === row.department_code);
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
      // 삭제 처리
      for (const deptCode of deletedRows) {
        await deleteMutation.mutateAsync({
          plant_site_code: searchParams.site,
          yyyymm: searchParams.yyyymm,
          scenario_code: searchParams.scenario,
          department_code: deptCode,
        });
      }

      // 추가/수정 처리
      const rowsToSave = rowData.filter(row => row._isNew || row._isModified);
      for (const row of rowsToSave) {
        await saveMutation.mutateAsync({
          plant_site_code: row.plant_site_code,
          yyyymm: row.yyyymm,
          scenario_code: row.scenario_code,
          department_code: row.department_code,
          department_name: row.department_name ?? undefined,
          parent_department_code: row.parent_department_code ?? undefined,
          cost_center_mapping_code: row.cost_center_mapping_code ?? undefined,
          is_production_dept: row.is_production_dept ?? undefined,
          use_yn: row.use_yn ?? undefined,
        });
      }

      alert('저장되었습니다.');
      refetch();
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  }, [rowData, deletedRows, searchParams, saveMutation, deleteMutation, refetch]);

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
      fileName: `부서관리_${yyyymm}.csv`,
    });
  }, [yyyymm]);

  return (
    <>
      {/* AG Grid 커스텀 스타일 - SC000020과 동일한 파란색 헤더 */}
      <style jsx global>{`
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
      `}</style>

      <div className="flex flex-col h-full p-4 bg-white font-sans">
        {/* 제목 */}
        <h1 className="text-lg font-semibold mb-3 text-[#161616]">
          부서관리
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
            disabled={modifiedRows.size === 0 && deletedRows.size === 0 && !rowData.some(r => r._isNew)}
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
        {(modifiedRows.size > 0 || deletedRows.size > 0 || rowData.some(r => r._isNew)) && (
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
            getRowId={(params) => params.data.department_code}
            loading={isLoading}
            overlayLoadingTemplate="<span>데이터 로딩 중...</span>"
            overlayNoRowsTemplate="<span>조회된 데이터가 없습니다</span>"
          />
        </div>
      </div>
    </>
  );
}

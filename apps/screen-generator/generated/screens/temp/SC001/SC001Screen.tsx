/**
 * SC001CustomerMasterScreen
 * 
 * 이 파일은 AI Factory Lab에 의해 자동 생성되었습니다.
 * 수정이 필요한 경우 직접 편집하거나 재생성해주세요.
 * 
 * @generated
 */

'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, CellValueChangedEvent, IRowNode } from 'ag-grid-community';
import { Plus, Save, Trash2, RotateCcw, Download } from 'lucide-react';
import { api } from '~/trpc/react';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);


// 데이터 타입
interface RowData {
  cust_cd: string;
  cust_nm: string;
  biz_no?: string;
  repr_nm?: string;
  biz_type?: string;
  biz_cond?: string;
  cust_type: string;
  tel_no?: string;
  fax_no?: string;
  email?: string;
  address?: string;
  pic_nm?: string;
  use_yn: boolean;
  remark?: string;
  created_at?: string;
  updated_at?: string;
  _isNew?: boolean;
  _isModified?: boolean;
  _isDeleted?: boolean;
}

export default function SC001CustomerMasterScreen() {
  const gridRef = useRef<AgGridReact>(null);
  
  // 그리드 데이터
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [modifiedRows, setModifiedRows] = useState<Set<string>>(new Set());
  const [deletedRows, setDeletedRows] = useState<Set<string>>(new Set());

  // API 호출
  const { data, isLoading, refetch } = api.screenSC001.getAll.useQuery();
  const saveMutation = api.screenSC001.save.useMutation();

  // 데이터 로드
  useEffect(() => {
    if (data) {
      setRowData(data as RowData[]);
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
      headerName: '거래처코드',
      field: 'cust_cd',
      width: 100,
      editable: (params) => params.data?._isNew === true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '거래처명',
      field: 'cust_nm',
      width: 200,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '사업자번호',
      field: 'biz_no',
      width: 120,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '대표자명',
      field: 'repr_nm',
      width: 100,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '업태',
      field: 'biz_type',
      width: 100,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '업종',
      field: 'biz_cond',
      width: 100,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '거래처유형',
      field: 'cust_type',
      width: 100,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
      cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['A', 'B', 'C'] },
    },
    {
      headerName: '전화번호',
      field: 'tel_no',
      width: 120,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '팩스번호',
      field: 'fax_no',
      width: 120,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '이메일',
      field: 'email',
      width: 180,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '주소',
      field: 'address',
      width: 250,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '담당자',
      field: 'pic_nm',
      width: 100,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '사용여부',
      field: 'use_yn',
      width: 80,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
      cellRenderer: 'agCheckboxCellRenderer', cellEditor: 'agCheckboxCellEditor',
    },
    {
      headerName: '비고',
      field: 'remark',
      width: 200,
      editable: true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
      cellEditor: 'agLargeTextCellEditor',
    },
    {
      headerName: '등록일',
      field: 'created_at',
      width: 120,
      editable: (params) => params.data?._isNew === true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
    },
    {
      headerName: '수정일',
      field: 'updated_at',
      width: 120,
      editable: (params) => params.data?._isNew === true,
      cellStyle: (params) => {
        if (params.data?._isNew) return { backgroundColor: '#e8f5e9' };
        if (params.data?._isModified) return { backgroundColor: '#fff3e0' };
        return null;
      },
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
    setModifiedRows(prev => new Set(prev).add(data.cust_cd));
    event.api.refreshCells({ rowNodes: [event.node!], force: true });
  }, []);

  // 행 추가
  const handleAddRow = useCallback(() => {
    const newRow: RowData = {
      cust_cd: '',
  cust_nm: '',
  biz_no: '',
  repr_nm: '',
  biz_type: '',
  biz_cond: '',
  cust_type: 'A',
  tel_no: '',
  fax_no: '',
  email: '',
  address: '',
  pic_nm: '',
  use_yn: true,
  remark: '',
  created_at: '',
  updated_at: '',
      _isNew: true,
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

    if (!confirm(`선택된 ${selectedNodes.length}개 행을 삭제하시겠습니까?`)) {
      return;
    }

    const deleteIds = new Set<string>();
    selectedNodes.forEach((node: IRowNode) => {
      if (!node.data._isNew) {
        deleteIds.add(node.data.cust_cd);
      }
    });

    setRowData(prev => prev.filter(row => {
      const isSelected = selectedNodes.some((n: IRowNode) => n.data.cust_cd === row.cust_cd);
      if (isSelected && row._isNew) return false;
      return true;
    }));

    setDeletedRows(prev => new Set([...prev, ...deleteIds]));
  }, []);

  // 저장
  const handleSave = useCallback(async () => {
    try {
      const inserts = rowData.filter(r => r._isNew).map(({ _isNew, _isModified, _isDeleted, ...data }) => data);
      const updates = rowData.filter(r => r._isModified && !r._isNew).map(({ _isNew, _isModified, _isDeleted, ...data }) => data);
      const deletes = Array.from(deletedRows);

      await saveMutation.mutateAsync({ inserts, updates, deletes });
      alert('저장되었습니다.');
      refetch();
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  }, [rowData, deletedRows, saveMutation, refetch]);

  // 초기화
  const handleReset = useCallback(() => {
    refetch();
  }, [refetch]);

  // 엑셀 다운로드
  const handleExcelExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: '거래처관리.csv',
    });
  }, []);

  const hasChanges = modifiedRows.size > 0 || deletedRows.size > 0 || rowData.some(r => r._isNew);

  return (
    <>
      {/* AG Grid 커스텀 스타일 */}
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
        .ag-theme-alpine .ag-header-cell {
          background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
          color: #1e3a5f;
          font-weight: 500;
        }
        .ag-theme-alpine .ag-row-selected {
          background-color: #dbeafe !important;
        }
      `}</style>

      <div className="flex flex-col h-full p-4 bg-white font-sans">
        {/* 제목 */}
        <h1 className="text-lg font-semibold mb-3 text-[#161616]">
          거래처관리
        </h1>

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
          <button
            onClick={handleReset}
            className="flex items-center gap-1 h-8 px-3 bg-[#e0e0e0] text-[#161616] text-sm hover:bg-[#c6c6c6] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
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
            getRowId={(params) => params.data.cust_cd}
            loading={isLoading}
            overlayLoadingTemplate="<span>데이터 로딩 중...</span>"
            overlayNoRowsTemplate="<span>조회된 데이터가 없습니다</span>"
          />
        </div>
      </div>
    </>
  );
}

export default SC001CustomerMasterScreen;

'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download, Loader2 } from 'lucide-react';

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

// 데이터 타입 - DB 테이블 컬럼에 맞춤
interface MaterialData {
  materialType: string;    // mat_gubun
  itemCode: string;        // mat_code
  itemName: string;        // mat_desc
  specification: string;   // size
  inboundQty: number;      // in_qty
  inboundAmount: number;   // in_amt
  inboundPrice: number;    // unit_cost
  stockQty: number;
  stockAmount: number;
  stockPrice: number;
}

export default function Screen000004() {
  const [yearMonth, setYearMonth] = useState('202510');
  const [materialCode, setMaterialCode] = useState('');
  const [rowData, setRowData] = useState<MaterialData[]>([]);
  const [summaryData, setSummaryData] = useState<MaterialData[]>([]);
  const [loading, setLoading] = useState(false);
  const [yearMonthOptions, setYearMonthOptions] = useState<string[]>(['202510']);

  // 컬럼 정의 - 실제 DB 컬럼에 맞춤
  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => [
    { headerName: "자재구분", field: "materialType", width: 120 },
    { headerName: "품번", field: "itemCode", width: 150 },
    { headerName: "품명", field: "itemName", width: 200 },
    { headerName: "규격", field: "specification", width: 150 },
    {
      headerName: "입고",
      children: [
        { headerName: "입고수량", field: "inboundQty", width: 100, type: "numericColumn", cellStyle: { textAlign: "right" }, valueFormatter: (p: any) => p.value?.toLocaleString() },
        { headerName: "입고금액", field: "inboundAmount", width: 120, type: "numericColumn", cellStyle: { textAlign: "right" }, valueFormatter: (p: any) => p.value?.toLocaleString() },
        { headerName: "입고단가", field: "inboundPrice", width: 100, type: "numericColumn", cellStyle: { textAlign: "right" }, valueFormatter: (p: any) => p.value?.toLocaleString() }
      ]
    },
    {
      headerName: "재고",
      children: [
        { headerName: "재고수량", field: "stockQty", width: 100, type: "numericColumn", cellStyle: { textAlign: "right" }, valueFormatter: (p: any) => p.value?.toLocaleString() },
        { headerName: "재고금액", field: "stockAmount", width: 120, type: "numericColumn", cellStyle: { textAlign: "right" }, valueFormatter: (p: any) => p.value?.toLocaleString() },
        { headerName: "재고단가", field: "stockPrice", width: 100, type: "numericColumn", cellStyle: { textAlign: "right" }, valueFormatter: (p: any) => p.value?.toLocaleString() }
      ]
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true
  }), []);

  // 실제 DB 데이터 조회
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        yearMonth,
        ...(materialCode && { materialCode })
      });
      
      const response = await fetch(`/api/screens/sc000004/data?${params}`);
      
      if (!response.ok) {
        throw new Error('데이터 조회 실패');
      }
      
      const result = await response.json();
      setRowData(result.data || []);
      
      // 합계 계산
      if (result.data && result.data.length > 0) {
        const totals = result.data.reduce((acc: any, row: MaterialData) => ({
          inboundQty: (acc.inboundQty || 0) + (row.inboundQty || 0),
          inboundAmount: (acc.inboundAmount || 0) + (row.inboundAmount || 0),
          stockQty: (acc.stockQty || 0) + (row.stockQty || 0),
          stockAmount: (acc.stockAmount || 0) + (row.stockAmount || 0),
        }), {});
        
        setSummaryData([{
          materialType: "총 합계",
          itemCode: "",
          itemName: "",
          specification: "",
          inboundQty: totals.inboundQty,
          inboundAmount: totals.inboundAmount,
          inboundPrice: 0,
          stockQty: totals.stockQty,
          stockAmount: totals.stockAmount,
          stockPrice: 0
        }]);
      }
      
      if (result.yearMonthOptions) {
        setYearMonthOptions(result.yearMonthOptions);
      }
    } catch (error) {
      console.error('데이터 조회 오류:', error);
      alert('데이터 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [yearMonth, materialCode]);

  // 초기 로드
  useEffect(() => {
    fetchData();
  }, []);

  const getRowClass = useCallback((params: RowClassParams) => {
    if (params.data?.materialType?.includes('합계')) {
      return 'ag-row-total';
    }
    return '';
  }, []);

  const handleSearch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const handleReset = useCallback(() => {
    setYearMonth('202510');
    setMaterialCode('');
  }, []);

  const handleExcelDownload = useCallback(() => {
    alert('엑셀 다운로드 기능 준비중입니다.');
  }, []);

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      {/* AG Grid 커스텀 스타일 */}
      <style jsx global>{`
        .ag-theme-alpine {
          --ag-header-background-color: #4f7cba;
          --ag-header-foreground-color: white;
          --ag-row-hover-color: #f0f7ff;
          --ag-selected-row-background-color: #e1efff;
          --ag-border-color: #e5e7eb;
          --ag-font-family: 'IBM Plex Sans', sans-serif;
          --ag-font-size: 13px;
        }
        .ag-theme-alpine .ag-header-group-cell {
          background: linear-gradient(180deg, #5a8ac7 0%, #4f7cba 100%);
          font-weight: 600;
        }
        .ag-theme-alpine .ag-header-cell {
          background: linear-gradient(180deg, #6b9bd1 0%, #5a8ac7 100%);
        }
        .ag-row-total {
          background-color: #f8fafc !important;
          font-weight: 600;
          border-top: 2px solid #4f7cba;
          border-bottom: 2px solid #4f7cba;
        }
      `}</style>

      {/* 제목 */}
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        자재수불부
      </h1>

      {/* 조회조건 */}
      <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">년월</label>
          <select
            value={yearMonth}
            onChange={(e) => setYearMonth(e.target.value)}
            className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {yearMonthOptions.map(ym => (
              <option key={ym} value={ym}>
                {ym.length === 6 ? `${ym.slice(0, 4)}-${ym.slice(4)}` : ym}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">자재코드</label>
          <input
            type="text"
            value={materialCode}
            onChange={(e) => setMaterialCode(e.target.value)}
            placeholder="자재코드 입력"
            className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
          />
        </div>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="inline-flex items-center h-9 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
            조회
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center h-9 px-4 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            초기화
          </button>
          <button
            onClick={handleExcelDownload}
            className="inline-flex items-center h-9 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Excel
          </button>
        </div>
      </div>

      {/* 데이터 건수 */}
      <div className="mb-2 text-sm text-gray-600">
        조회 결과: <span className="font-semibold text-blue-600">{rowData.length}</span>건
      </div>

      {/* AG Grid */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pinnedBottomRowData={summaryData}
          animateRows={true}
          rowHeight={40}
          headerHeight={40}
          groupHeaderHeight={40}
          getRowClass={getRowClass}
          loading={loading}
        />
      </div>
    </div>
  );
}

'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download, Loader2 } from 'lucide-react';

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Screen000006() {
  const columnDefs = [
  {
    "headerName": "구분",
    "field": "category",
    "width": 100
  },
  {
    "headerName": "코드",
    "field": "code",
    "width": 100
  },
  {
    "headerName": "Inch",
    "field": "inch",
    "width": 80
  },
  {
    "headerName": "SITE",
    "field": "site",
    "width": 100
  },
  {
    "headerName": "계획",
    "children": [
      {
        "headerName": "plan_qty",
        "field": "plan_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "plan_amt",
        "field": "plan_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "계획 대비 실적",
    "children": [
      {
        "headerName": "actual_qty",
        "field": "actual_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "actual_amt",
        "field": "actual_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "달성률",
    "children": [
      {
        "headerName": "achv_qty",
        "field": "achv_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "achv_amt",
        "field": "achv_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "기초재공품재고(BOH)",
    "children": [
      {
        "headerName": "boh_qty",
        "field": "boh_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "boh_amt",
        "field": "boh_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "입고(IN)",
    "children": [
      {
        "headerName": "생산입고수량",
        "field": "prod_in_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "생산입고금액",
        "field": "prod_in_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정입고수량",
        "field": "other_in_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정입고금액",
        "field": "other_in_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "출고(OUT)",
    "children": [
      {
        "headerName": "출고수량",
        "field": "out_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "출고금액",
        "field": "out_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정출고수량",
        "field": "other_out_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정출고금액",
        "field": "other_out_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "LOSS수량",
        "field": "loss_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "LOSS금액",
        "field": "loss_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "불량률",
    "field": "defect_rate",
    "width": 100,
    "type": "numericColumn", "cellStyle": { "textAlign": "right" }
  },
  {
    "headerName": "기말재공품재고(EOH)",
    "children": [
      {
        "headerName": "eoh_qty",
        "field": "eoh_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "eoh_amt",
        "field": "eoh_amt",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  }
];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };

  // 샘플 데이터는 제거됨 - API에서 조회
  const summaryData = [
  {
    "category": "합계",
    "code": "",
    "inch": "",
    "site": "",
    "plan_qty": 3000,
    "plan_amt": 118000000,
    "actual_qty": 2920,
    "actual_amt": 114800000,
    "achv_qty": 97.3,
    "achv_amt": 97.3,
    "boh_qty": 330,
    "boh_amt": 12700000,
    "prod_in_qty": 2590,
    "prod_in_amt": 102100000,
    "other_in_qty": 10,
    "other_in_amt": 400000,
    "out_qty": 2750,
    "out_amt": 108000000,
    "other_out_qty": 20,
    "other_out_amt": 800000,
    "loss_qty": 130,
    "loss_amt": 5200000,
    "defect_rate": 4.6,
    "eoh_qty": 220,
    "eoh_amt": 8300000
  }
];

  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [yearMonth, setYearMonth] = useState('202510');
  const [yearMonthOptions] = useState(['202510', '202509', '202508', '202507']);

  // 실제 DB 데이터 조회
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/screens/sc000006/data?yearMonth=${yearMonth}`);
      if (!response.ok) throw new Error('데이터 조회 실패');
      const result = await response.json();
      setRowData(result.data || []);
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  }, [yearMonth]);

  // 초기 로드
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => {
    fetchData();
  };

  const handleReset = () => {
    setYearMonth('202510');
  };

  const handleExcelDownload = () => {
    alert('엑셀 다운로드 기능 준비중입니다.');
  };

  return (
    <>
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

    <div className="flex flex-col h-full p-4 bg-white">
      {/* 제목 */}
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        제조원가(제품)
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
          pinnedBottomRowData={summaryData.length > 0 ? summaryData : undefined}
          animateRows={true}
          rowHeight={40}
          headerHeight={40}
          groupHeaderHeight={40}
          loading={loading}
        />
      </div>
    </div>
  </>);
}
'use client';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download, RefreshCw } from 'lucide-react';

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Screen000005() {
  const columnDefs = [
  {
    "headerName": "구분",
    "field": "division",
    "width": 120
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
        "headerName": "수량",
        "field": "plan_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "금액",
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
        "headerName": "수량",
        "field": "actual_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "금액",
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
        "headerName": "수량",
        "field": "achv_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "금액",
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
        "headerName": "수량",
        "field": "boh_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "금액",
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
        "width": 130,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정입고금액",
        "field": "other_in_amt",
        "width": 130,
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
        "width": 130,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정출고금액",
        "field": "other_out_amt",
        "width": 130,
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
        "headerName": "수량",
        "field": "eoh_qty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "금액",
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

  const sampleData = [
  {
    "division": "완제품",
    "code": "PRD001",
    "inch": "12",
    "site": "A공장",
    "plan_qty": 1000,
    "plan_amt": 50000000,
    "actual_qty": 950,
    "actual_amt": 47500000,
    "achv_qty": 95,
    "achv_amt": 95,
    "boh_qty": 100,
    "boh_amt": 5000000,
    "prod_in_qty": 980,
    "prod_in_amt": 49000000,
    "other_in_qty": 20,
    "other_in_amt": 1000000,
    "out_qty": 900,
    "out_amt": 45000000,
    "other_out_qty": 30,
    "other_out_amt": 1500000,
    "loss_qty": 10,
    "loss_amt": 500000,
    "defect_rate": 1,
    "eoh_qty": 160,
    "eoh_amt": 8000000
  },
  {
    "division": "반제품",
    "code": "PRD002",
    "inch": "14",
    "site": "A공장",
    "plan_qty": 800,
    "plan_amt": 32000000,
    "actual_qty": 820,
    "actual_amt": 32800000,
    "achv_qty": 102.5,
    "achv_amt": 102.5,
    "boh_qty": 80,
    "boh_amt": 3200000,
    "prod_in_qty": 850,
    "prod_in_amt": 34000000,
    "other_in_qty": 15,
    "other_in_amt": 600000,
    "out_qty": 800,
    "out_amt": 32000000,
    "other_out_qty": 25,
    "other_out_amt": 1000000,
    "loss_qty": 5,
    "loss_amt": 200000,
    "defect_rate": 0.6,
    "eoh_qty": 115,
    "eoh_amt": 4600000
  },
  {
    "division": "완제품",
    "code": "PRD003",
    "inch": "16",
    "site": "B공장",
    "plan_qty": 1200,
    "plan_amt": 72000000,
    "actual_qty": 1180,
    "actual_amt": 70800000,
    "achv_qty": 98.3,
    "achv_amt": 98.3,
    "boh_qty": 120,
    "boh_amt": 7200000,
    "prod_in_qty": 1200,
    "prod_in_amt": 72000000,
    "other_in_qty": 30,
    "other_in_amt": 1800000,
    "out_qty": 1150,
    "out_amt": 69000000,
    "other_out_qty": 20,
    "other_out_amt": 1200000,
    "loss_qty": 8,
    "loss_amt": 480000,
    "defect_rate": 0.7,
    "eoh_qty": 172,
    "eoh_amt": 10320000
  }
];
  const summaryData = [
  {
    "division": "합계",
    "code": "",
    "inch": "",
    "site": "",
    "plan_qty": 3000,
    "plan_amt": 154000000,
    "actual_qty": 2950,
    "actual_amt": 151100000,
    "achv_qty": 98.3,
    "achv_amt": 98.1,
    "boh_qty": 300,
    "boh_amt": 15400000,
    "prod_in_qty": 3030,
    "prod_in_amt": 155000000,
    "other_in_qty": 65,
    "other_in_amt": 3400000,
    "out_qty": 2850,
    "out_amt": 146000000,
    "other_out_qty": 75,
    "other_out_amt": 3700000,
    "loss_qty": 23,
    "loss_amt": 1180000,
    "defect_rate": 0.8,
    "eoh_qty": 447,
    "eoh_amt": 22920000
  }
];

  const [rowData, setRowData] = useState(sampleData);

  const handleSearch = () => {
    console.log('검색 실행');
  };

  const handleReset = () => {
    setRowData(sampleData);
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

    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      {/* 제목 */}
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#161616', flexShrink: 0 }}>
        제조원가(제품)
      </h1>

      {/* 조회조건 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: 16, 
        marginBottom: 12, 
        padding: 12, 
        backgroundColor: '#f4f4f4', 
        flexShrink: 0, 
        border: '1px solid #e0e0e0' 
      }}>
        
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>년월</label>
            <select 
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}
            >
              <option value="">전체</option>
              <option value="2024-01">2024-01</option>
              <option value="2024-02">2024-02</option>
              <option value="2024-03">2024-03</option>
              <option value="2024-04">2024-04</option>
            </select>
          </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button 
            onClick={handleSearch}
            style={{ 
              height: 32, 
              padding: '0 16px', 
              backgroundColor: '#0f62fe', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            검색
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              height: 32, 
              padding: '0 16px', 
              backgroundColor: '#e0e0e0', 
              color: '#161616', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            초기화
          </button>
        </div>
      </div>

      {/* AG Grid - 고정 높이 400px */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: 500, minHeight: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pinnedBottomRowData={summaryData.length > 0 ? summaryData : undefined}
        />
      </div>
    </div>
  </>);
}
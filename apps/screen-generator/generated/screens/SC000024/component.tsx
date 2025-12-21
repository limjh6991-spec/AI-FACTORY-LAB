import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export default function 제조원가제품() {
  const columnDefs = [
  {
    "headerName": "구분",
    "field": "division",
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
    "width": 80
  },
  {
    "headerName": "계획",
    "children": [
      {
        "headerName": "수량",
        "field": "plan_qty",
        "width": 100,
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
        "width": 100,
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
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "금액",
        "field": "achv_amt",
        "width": 100,
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
        "width": 100,
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
        "width": 100,
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
        "width": 100,
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
        "width": 100,
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
        "width": 100,
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
        "width": 100,
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
        "width": 100,
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
    "division": "제품A",
    "code": "P001",
    "inch": "32",
    "site": "S1",
    "plan_qty": 1000,
    "plan_amt": 50000000,
    "actual_qty": 950,
    "actual_amt": 47500000,
    "achv_qty": 95,
    "achv_amt": 95,
    "boh_qty": 100,
    "boh_amt": 5000000,
    "prod_in_qty": 950,
    "prod_in_amt": 47500000,
    "other_in_qty": 0,
    "other_in_amt": 0,
    "out_qty": 920,
    "out_amt": 46000000,
    "other_out_qty": 20,
    "other_out_amt": 1000000,
    "loss_qty": 10,
    "loss_amt": 500000,
    "defect_rate": 1.05,
    "eoh_qty": 100,
    "eoh_amt": 5000000
  },
  {
    "division": "제품B",
    "code": "P002",
    "inch": "43",
    "site": "S1",
    "plan_qty": 800,
    "plan_amt": 40000000,
    "actual_qty": 820,
    "actual_amt": 41000000,
    "achv_qty": 102.5,
    "achv_amt": 102.5,
    "boh_qty": 80,
    "boh_amt": 4000000,
    "prod_in_qty": 820,
    "prod_in_amt": 41000000,
    "other_in_qty": 10,
    "other_in_amt": 500000,
    "out_qty": 800,
    "out_amt": 40000000,
    "other_out_qty": 15,
    "other_out_amt": 750000,
    "loss_qty": 5,
    "loss_amt": 250000,
    "defect_rate": 0.61,
    "eoh_qty": 90,
    "eoh_amt": 4500000
  },
  {
    "division": "제품C",
    "code": "P003",
    "inch": "55",
    "site": "S2",
    "plan_qty": 1200,
    "plan_amt": 72000000,
    "actual_qty": 1180,
    "actual_amt": 70800000,
    "achv_qty": 98.3,
    "achv_amt": 98.3,
    "boh_qty": 150,
    "boh_amt": 9000000,
    "prod_in_qty": 1180,
    "prod_in_amt": 70800000,
    "other_in_qty": 0,
    "other_in_amt": 0,
    "out_qty": 1150,
    "out_amt": 69000000,
    "other_out_qty": 25,
    "other_out_amt": 1500000,
    "loss_qty": 15,
    "loss_amt": 900000,
    "defect_rate": 1.27,
    "eoh_qty": 140,
    "eoh_amt": 8400000
  }
];
  const summaryData = [
  {
    "division": "S1 합계",
    "code": "",
    "inch": "",
    "site": "",
    "plan_qty": 1800,
    "plan_amt": 90000000,
    "actual_qty": 1770,
    "actual_amt": 88500000,
    "achv_qty": 98.3,
    "achv_amt": 98.3,
    "boh_qty": 180,
    "boh_amt": 9000000,
    "prod_in_qty": 1770,
    "prod_in_amt": 88500000,
    "other_in_qty": 10,
    "other_in_amt": 500000,
    "out_qty": 1720,
    "out_amt": 86000000,
    "other_out_qty": 35,
    "other_out_amt": 1750000,
    "loss_qty": 15,
    "loss_amt": 750000,
    "defect_rate": 0.85,
    "eoh_qty": 190,
    "eoh_amt": 9500000
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
            <input 
              type="month"
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 140 }}
              defaultValue="2025-12"
            />
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

      {/* AG Grid - 고정 높이 500px */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: 500, minHeight: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pinnedBottomRowData={summaryData.length > 0 ? summaryData : undefined}
        />
      </div>
    </div>
  );
}

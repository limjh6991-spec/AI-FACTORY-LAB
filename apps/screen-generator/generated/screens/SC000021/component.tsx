import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export default function 자재수불부() {
  const columnDefs = [
  {
    "headerName": "자재구분",
    "field": "materialType",
    "width": 100
  },
  {
    "headerName": "품번",
    "field": "itemCode",
    "width": 120
  },
  {
    "headerName": "품명",
    "field": "itemName",
    "width": 150
  },
  {
    "headerName": "대분류",
    "field": "mainCategory",
    "width": 100
  },
  {
    "headerName": "중분류",
    "field": "subCategory",
    "width": 100
  },
  {
    "headerName": "규격",
    "field": "specification",
    "width": 120
  },
  {
    "headerName": "기초",
    "children": [
      {
        "headerName": "기초수량",
        "field": "beginningQty",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기초금액",
        "field": "beginningAmount",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기초단가",
        "field": "beginningPrice",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "입고",
    "children": [
      {
        "headerName": "입고수량",
        "field": "inQty",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "입고금액",
        "field": "inAmount",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "입고단가",
        "field": "inPrice",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타입고수량",
        "field": "otherInQty",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타입고금액",
        "field": "otherInAmount",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타입고단가",
        "field": "otherInPrice",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "출고",
    "children": [
      {
        "headerName": "출고수량",
        "field": "outQty",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "출고금액",
        "field": "outAmount",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "출고단가",
        "field": "outPrice",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타출고수량",
        "field": "otherOutQty",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타출고금액",
        "field": "otherOutAmount",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타출고단가",
        "field": "otherOutPrice",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      }
    ]
  },
  {
    "headerName": "재고",
    "children": [
      {
        "headerName": "재고수량",
        "field": "stockQty",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "재고금액",
        "field": "stockAmount",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "재고단가",
        "field": "stockPrice",
        "width": 100,
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
    "materialType": "원재료",
    "itemCode": "M001",
    "itemName": "철강재",
    "mainCategory": "금속",
    "subCategory": "철강",
    "specification": "10x20x30",
    "beginningQty": 100,
    "beginningAmount": 1000000,
    "beginningPrice": 10000,
    "inQty": 50,
    "inAmount": 500000,
    "inPrice": 10000,
    "otherInQty": 0,
    "otherInAmount": 0,
    "otherInPrice": 0,
    "outQty": 30,
    "outAmount": 300000,
    "outPrice": 10000,
    "otherOutQty": 0,
    "otherOutAmount": 0,
    "otherOutPrice": 0,
    "stockQty": 120,
    "stockAmount": 1200000,
    "stockPrice": 10000
  },
  {
    "materialType": "부재료",
    "itemCode": "M002",
    "itemName": "접착제",
    "mainCategory": "화학",
    "subCategory": "접착",
    "specification": "1kg",
    "beginningQty": 200,
    "beginningAmount": 400000,
    "beginningPrice": 2000,
    "inQty": 100,
    "inAmount": 200000,
    "inPrice": 2000,
    "otherInQty": 10,
    "otherInAmount": 20000,
    "otherInPrice": 2000,
    "outQty": 80,
    "outAmount": 160000,
    "outPrice": 2000,
    "otherOutQty": 5,
    "otherOutAmount": 10000,
    "otherOutPrice": 2000,
    "stockQty": 225,
    "stockAmount": 450000,
    "stockPrice": 2000
  },
  {
    "materialType": "소모품",
    "itemCode": "M003",
    "itemName": "볼트",
    "mainCategory": "기계",
    "subCategory": "체결",
    "specification": "M8x20",
    "beginningQty": 1000,
    "beginningAmount": 100000,
    "beginningPrice": 100,
    "inQty": 500,
    "inAmount": 50000,
    "inPrice": 100,
    "otherInQty": 0,
    "otherInAmount": 0,
    "otherInPrice": 0,
    "outQty": 400,
    "outAmount": 40000,
    "outPrice": 100,
    "otherOutQty": 0,
    "otherOutAmount": 0,
    "otherOutPrice": 0,
    "stockQty": 1100,
    "stockAmount": 110000,
    "stockPrice": 100
  }
];
  const summaryData = [
  [
    {
      "materialType": "원재료 합계",
      "itemCode": "",
      "itemName": "",
      "mainCategory": "",
      "subCategory": "",
      "specification": "",
      "beginningQty": 100,
      "beginningAmount": 1000000,
      "beginningPrice": 0,
      "inQty": 50,
      "inAmount": 500000,
      "inPrice": 0,
      "otherInQty": 0,
      "otherInAmount": 0,
      "otherInPrice": 0,
      "outQty": 30,
      "outAmount": 300000,
      "outPrice": 0,
      "otherOutQty": 0,
      "otherOutAmount": 0,
      "otherOutPrice": 0,
      "stockQty": 120,
      "stockAmount": 1200000,
      "stockPrice": 0
    },
    {
      "materialType": "부재료 합계",
      "itemCode": "",
      "itemName": "",
      "mainCategory": "",
      "subCategory": "",
      "specification": "",
      "beginningQty": 200,
      "beginningAmount": 400000,
      "beginningPrice": 0,
      "inQty": 110,
      "inAmount": 220000,
      "inPrice": 0,
      "otherInQty": 0,
      "otherInAmount": 0,
      "otherInPrice": 0,
      "outQty": 85,
      "outAmount": 170000,
      "outPrice": 0,
      "otherOutQty": 0,
      "otherOutAmount": 0,
      "otherOutPrice": 0,
      "stockQty": 225,
      "stockAmount": 450000,
      "stockPrice": 0
    },
    {
      "materialType": "소모품 합계",
      "itemCode": "",
      "itemName": "",
      "mainCategory": "",
      "subCategory": "",
      "specification": "",
      "beginningQty": 1000,
      "beginningAmount": 100000,
      "beginningPrice": 0,
      "inQty": 500,
      "inAmount": 50000,
      "inPrice": 0,
      "otherInQty": 0,
      "otherInAmount": 0,
      "otherInPrice": 0,
      "outQty": 400,
      "outAmount": 40000,
      "outPrice": 0,
      "otherOutQty": 0,
      "otherOutAmount": 0,
      "otherOutPrice": 0,
      "stockQty": 1100,
      "stockAmount": 110000,
      "stockPrice": 0
    }
  ]
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
        자재수불부
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>자재</label>
            <select style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 150 }}>
              <option value="">전체</option>
              <option value="MAT001">원자재A</option>
              <option value="MAT002">원자재B</option>
              <option value="MAT003">부품C</option>
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

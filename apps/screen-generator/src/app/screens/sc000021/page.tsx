'use client';

import { useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, RotateCcw, Download, Loader2 } from 'lucide-react';
// 공통 옵션 컴포넌트
import {
  SiteSelect,
  YearMonthPicker,
  YearPicker,
  CustomerSelect,
  MaterialSelect,
  ModelSelect,
  AccountSelect,
  ExpenSelSelect,
  DepartmentSelect,
  SelCodeSelect,
} from "~/components/options";

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Screen000021() {
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

  // 샘플 데이터는 제거됨 - API에서 조회
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

  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 검색 조건 상태
  const [yearMonth, setYearMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [materialCode, setMaterialCode] = useState<string>('');

  // 실제 DB 데이터 조회 (버튼 클릭 시에만 호출)
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (yearMonth) params.append('yearMonth', yearMonth);
      if (materialCode) params.append('materialCode', materialCode);
      const queryString = params.toString();
      const url = `/api/screens/sc000021/data${queryString ? '?' + queryString : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('데이터 조회 실패');
      const result = await response.json();
      setRowData(result.data || []);
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 (컴포넌트 마운트 시 1회만)
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchData();
  };

  const handleReset = () => {
    fetchData();
  };

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
  .ag-row-total {
    background-color: #f8fafc !important;
    font-weight: 600;
    border-top: 2px solid #93c5fd;
    border-bottom: 2px solid #93c5fd;
  }
`}</style>

    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif', overflow: 'hidden' }}>
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
        
          
        <YearMonthPicker
          label="년월"
          value={yearMonth}
          onChange={(value) => setYearMonth(value)}
        />
        <MaterialSelect
          label="자재"
          value={materialCode}
          onChange={(value) => setMaterialCode(value)}
        />
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
      <div className="ag-theme-alpine" style={{ width: '100%', flex: 1, minHeight: 300 }}>
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
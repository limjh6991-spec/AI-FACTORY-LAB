'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
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

export default function Screen000010() {
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
    "field": "majorCategory",
    "width": 100
  },
  {
    "headerName": "중분류",
    "field": "minorCategory",
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
        "field": "initialQty",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기초금액",
        "field": "initialAmount",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기초단가",
        "field": "initialUnitPrice",
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
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "입고단가",
        "field": "inUnitPrice",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타입고수량",
        "field": "otherInQty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타입고금액",
        "field": "otherInAmount",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타입고단가",
        "field": "otherInUnitPrice",
        "width": 120,
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
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "출고단가",
        "field": "outUnitPrice",
        "width": 100,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타출고수량",
        "field": "otherOutQty",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타출고금액",
        "field": "otherOutAmount",
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "기타출고단가",
        "field": "otherOutUnitPrice",
        "width": 120,
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
        "width": 120,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "재고단가",
        "field": "stockUnitPrice",
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
  {
    "materialType": "합계",
    "itemCode": "",
    "itemName": "",
    "majorCategory": "",
    "minorCategory": "",
    "specification": "",
    "initialQty": 1120,
    "initialAmount": 6500000,
    "initialUnitPrice": 0,
    "inQty": 560,
    "inAmount": 3380000,
    "inUnitPrice": 0,
    "otherInQty": 5,
    "otherInAmount": 250000,
    "otherInUnitPrice": 0,
    "outQty": 895,
    "outAmount": 5150000,
    "outUnitPrice": 0,
    "otherOutQty": 62,
    "otherOutAmount": 625000,
    "otherOutUnitPrice": 0,
    "stockQty": 728,
    "stockAmount": 4355000,
    "stockUnitPrice": 0
  }
];

  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 실제 DB 데이터 조회
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/screens/sc000010/data');
      if (!response.ok) throw new Error('데이터 조회 실패');
      const result = await response.json();
      setRowData(result.data || []);
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <select 
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}
            >
              <option value="">전체</option>
              <option value="2024-01">2024-01</option>
              <option value="2024-02">2024-02</option>
              <option value="2024-03">2024-03</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#525252' }}>자재코드</label>
            <select 
              style={{ height: 32, padding: '0 8px', border: '1px solid #e0e0e0', borderRadius: 0, minWidth: 120 }}
            >
              <option value="">전체</option>
              <option value="전체">전체</option>
              <option value="RM001">RM001</option>
              <option value="SM001">SM001</option>
              <option value="CS001">CS001</option>
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
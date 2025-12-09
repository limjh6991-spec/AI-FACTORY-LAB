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

export default function Screen000020() {
  const columnDefs = [
  {
    "headerName": "구분",
    "field": "division",
    "width": 100
  },
  {
    "headerName": "코드",
    "field": "code",
    "width": 120
  },
  {
    "headerName": "Inch",
    "field": "inch",
    "width": 100
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
        "width": 130,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "생산입고금액",
        "field": "prod_in_amt",
        "width": 130,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정입고수량",
        "field": "other_in_qty",
        "width": 140,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정입고금액",
        "field": "other_in_amt",
        "width": 140,
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
        "width": 140,
        "type": "numericColumn", "cellStyle": { "textAlign": "right" }
      },
      {
        "headerName": "타계정출고금액",
        "field": "other_out_amt",
        "width": 140,
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
    "division": "SITE 합계",
    "code": "",
    "inch": "",
    "site": "",
    "plan_qty": 2400,
    "plan_amt": 120000000,
    "actual_qty": 2350,
    "actual_amt": 117500000,
    "achv_qty": 97.9,
    "achv_amt": 97.9,
    "boh_qty": 230,
    "boh_amt": 11500000,
    "prod_in_qty": 2350,
    "prod_in_amt": 117500000,
    "other_in_qty": 5,
    "other_in_amt": 250000,
    "out_qty": 2230,
    "out_amt": 111500000,
    "other_out_qty": 45,
    "other_out_amt": 2250000,
    "loss_qty": 23,
    "loss_amt": 1150000,
    "defect_rate": 0.98,
    "eoh_qty": 287,
    "eoh_amt": 14350000
  }
];

  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 검색 조건 상태
  const [yearMonth, setYearMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [site, setSite] = useState<string>('');
  const [accountCode, setAccountCode] = useState<string>('');

  // 실제 DB 데이터 조회 (버튼 클릭 시에만 호출)
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (yearMonth) params.append('yearMonth', yearMonth);
      if (site) params.append('site', site);
      if (accountCode) params.append('accountCode', accountCode);
      const queryString = params.toString();
      const url = `/api/screens/sc000020/data${queryString ? '?' + queryString : ''}`;
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
        
          
        <YearMonthPicker
          label="년월"
          value={yearMonth}
          onChange={(value) => setYearMonth(value)}
        />
        <SiteSelect
          label="사업장"
          value={site}
          onChange={(value) => setSite(value)}
        />
        <AccountSelect
          label="계정"
          value={accountCode}
          onChange={(value) => setAccountCode(value)}
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
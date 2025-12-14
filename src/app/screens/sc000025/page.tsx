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

export default function Screen000025() {
  const columnDefs = [
  {
    "headerName": "항목1",
    "field": "item1",
    "width": 100
  },
  {
    "headerName": "항목2",
    "field": "item2",
    "width": 100
  },
  {
    "headerName": "금액",
    "field": "amount",
    "width": 120,
    "type": "numericColumn", "cellStyle": { "textAlign": "right" }
  }
];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };

  // 샘플 데이터는 제거됨 - API에서 조회
  const summaryData: any[] = [];

  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 검색 조건 상태
  const [accountCode, setAccountCode] = useState<string>('');

  // 실제 DB 데이터 조회 (버튼 클릭 시에만 호출)
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (accountCode) params.append('accountCode', accountCode);
      const queryString = params.toString();
      const url = `/api/screens/sc000025/data${queryString ? '?' + queryString : ''}`;
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16, backgroundColor: '#ffffff', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      {/* 제목 */}
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#161616', flexShrink: 0 }}>
        계정관리
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
      <div className="ag-theme-alpine" style={{ width: '100%', flex: 1, minHeight: 300 , '--ag-header-background-color': '#dbeafe', '--ag-header-foreground-color': '#1e3a5f', '--ag-row-hover-color': '#eff6ff', '--ag-selected-row-background-color': '#dbeafe', '--ag-border-color': '#e5e7eb', '--ag-font-family': 'inherit', '--ag-font-size': '14px' } as React.CSSProperties}>
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
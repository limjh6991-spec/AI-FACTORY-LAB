'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 손익계산서 데이터 (RealGrid와 동일)
const financialData = [
  { category: '수익', item: '제품매출', m1: 1250000000, m2: 1380000000, m3: 1420000000, ytd: 4050000000, budget: 4000000000, variance: 50000000 },
  { category: '수익', item: '서비스매출', m1: 450000000, m2: 520000000, m3: 580000000, ytd: 1550000000, budget: 1500000000, variance: 50000000 },
  { category: '수익', item: '기타수익', m1: 35000000, m2: 42000000, m3: 38000000, ytd: 115000000, budget: 100000000, variance: 15000000 },
  { category: '매출원가', item: '재료비', m1: -520000000, m2: -575000000, m3: -590000000, ytd: -1685000000, budget: -1700000000, variance: 15000000 },
  { category: '매출원가', item: '노무비', m1: -180000000, m2: -180000000, m3: -185000000, ytd: -545000000, budget: -550000000, variance: 5000000 },
  { category: '매출원가', item: '경비', m1: -95000000, m2: -102000000, m3: -98000000, ytd: -295000000, budget: -300000000, variance: 5000000 },
  { category: '판관비', item: '인건비', m1: -220000000, m2: -220000000, m3: -225000000, ytd: -665000000, budget: -660000000, variance: -5000000 },
  { category: '판관비', item: '임차료', m1: -45000000, m2: -45000000, m3: -45000000, ytd: -135000000, budget: -135000000, variance: 0 },
  { category: '판관비', item: '광고선전비', m1: -85000000, m2: -120000000, m3: -95000000, ytd: -300000000, budget: -280000000, variance: -20000000 },
  { category: '판관비', item: '기타판관비', m1: -65000000, m2: -72000000, m3: -68000000, ytd: -205000000, budget: -200000000, variance: -5000000 },
];

// 합계 데이터 추가
const totalRevenue = financialData.filter(d => d.category === '수익').reduce((sum, d) => sum + d.ytd, 0);
const totalCost = financialData.filter(d => d.category === '매출원가').reduce((sum, d) => sum + d.ytd, 0);
const totalExpense = financialData.filter(d => d.category === '판관비').reduce((sum, d) => sum + d.ytd, 0);
const netIncome = totalRevenue + totalCost + totalExpense;

// 금액 포맷터
const currencyFormatter = (params: { value: number }) => {
  if (params.value === null || params.value === undefined) return '';
  const absValue = Math.abs(params.value);
  const formatted = absValue >= 100000000 
    ? `${(absValue / 100000000).toFixed(1)}억`
    : `${(absValue / 10000).toLocaleString()}만`;
  return params.value < 0 ? `(${formatted})` : formatted;
};

// Variance 렌더러
const VarianceRenderer = (params: { value: number }) => {
  if (params.value === 0) return <span className="text-gray-500">-</span>;
  const isPositive = params.value > 0;
  const formatted = currencyFormatter({ value: params.value });
  
  return (
    <span className={`font-mono ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? '▲ ' : '▼ '}{formatted}
    </span>
  );
};

// Category 렌더러
const CategoryRenderer = (params: { value: string }) => {
  const colors: Record<string, string> = {
    '수익': 'text-blue-700 bg-blue-50',
    '매출원가': 'text-orange-700 bg-orange-50',
    '판관비': 'text-red-700 bg-red-50',
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold ${colors[params.value] || ''}`}>
      {params.value}
    </span>
  );
};

export default function AGGridStyle4Financial() {
  const [rowData] = useState(financialData);

  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => [
    {
      headerName: '계정',
      children: [
        { 
          field: 'category', 
          headerName: '구분', 
          width: 100, 
          cellRenderer: CategoryRenderer,
          rowSpan: (params) => {
            const cat = params.data.category;
            const sameRows = rowData.filter(r => r.category === cat);
            const index = sameRows.findIndex(r => r === params.data);
            return index === 0 ? sameRows.length : 1;
          },
        },
        { field: 'item', headerName: '계정과목', width: 120 },
      ]
    },
    {
      headerName: '월별 실적',
      children: [
        { field: 'm1', headerName: '1월', width: 100, type: 'numericColumn', valueFormatter: currencyFormatter },
        { field: 'm2', headerName: '2월', width: 100, type: 'numericColumn', valueFormatter: currencyFormatter },
        { field: 'm3', headerName: '3월', width: 100, type: 'numericColumn', valueFormatter: currencyFormatter },
      ]
    },
    {
      headerName: '누적 & 예산',
      children: [
        { 
          field: 'ytd', 
          headerName: 'YTD', 
          width: 110, 
          type: 'numericColumn', 
          valueFormatter: currencyFormatter,
          cellClass: 'ytd-cell',
        },
        { field: 'budget', headerName: '예산', width: 110, type: 'numericColumn', valueFormatter: currencyFormatter },
        { field: 'variance', headerName: '차이', width: 110, cellRenderer: VarianceRenderer },
      ]
    },
  ], [rowData]);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const getRowClass = useCallback((params: RowClassParams) => {
    if (params.data.category === '수익') return 'revenue-row';
    if (params.data.category === '매출원가') return 'cost-row';
    return 'expense-row';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/screens/ag-grid-examples" 
          className="text-green-600 hover:text-green-700 text-sm mb-2 inline-block"
        >
          ← AG Grid 갤러리로 돌아가기
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">AG</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Style 4: Financial Dashboard</h1>
            <p className="text-gray-600">AG Grid - 금융/회계 데이터, 밀집 레이아웃 스타일</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
          <div className="text-xs text-gray-500 mb-1">총 수익</div>
          <div className="text-xl font-bold text-blue-600">{(totalRevenue / 100000000).toFixed(1)}억</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-orange-500">
          <div className="text-xs text-gray-500 mb-1">매출원가</div>
          <div className="text-xl font-bold text-orange-600">{(Math.abs(totalCost) / 100000000).toFixed(1)}억</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-red-500">
          <div className="text-xs text-gray-500 mb-1">판관비</div>
          <div className="text-xl font-bold text-red-600">{(Math.abs(totalExpense) / 100000000).toFixed(1)}억</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
          <div className="text-xs text-gray-500 mb-1">영업이익</div>
          <div className="text-xl font-bold text-green-600">{(netIncome / 100000000).toFixed(1)}억</div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-6 py-3">
          <h2 className="text-white text-base font-semibold">📈 손익계산서 (2024년 1분기)</h2>
        </div>

        {/* AG Grid */}
        <div 
          className="ag-theme-alpine ag-financial-style" 
          style={{ height: 420, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowClass={getRowClass}
            animateRows={true}
            rowHeight={36}
            headerHeight={38}
            suppressRowTransform={true}
          />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .ag-financial-style {
          --ag-background-color: #ffffff;
          --ag-header-background-color: #f0fdf4;
          --ag-header-foreground-color: #166534;
          --ag-odd-row-background-color: #fafafa;
          --ag-row-hover-color: #f0fdf4;
          --ag-selected-row-background-color: #dcfce7;
          --ag-font-family: 'SF Mono', 'Consolas', monospace;
          --ag-font-size: 12px;
          --ag-row-height: 36px;
          --ag-header-height: 38px;
          --ag-border-color: #e5e7eb;
          --ag-cell-horizontal-padding: 8px;
        }

        .ag-financial-style .ag-header-group-cell {
          background: #166534;
          color: white;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
        }

        .ag-financial-style .ag-header-cell {
          background: #dcfce7;
          color: #166534;
          font-weight: 600;
          border-right: 1px solid #bbf7d0;
        }

        .ag-financial-style .ag-cell {
          border-right: 1px solid #e5e7eb;
          font-family: 'SF Mono', 'Consolas', monospace;
        }

        .ag-financial-style .ag-cell.ag-cell-value[col-id="ytd"],
        .ag-financial-style .ytd-cell {
          background-color: #fef3c7 !important;
          font-weight: 700;
        }

        .ag-financial-style .revenue-row {
          background-color: rgba(219, 234, 254, 0.3) !important;
        }

        .ag-financial-style .cost-row {
          background-color: rgba(254, 243, 199, 0.3) !important;
        }

        .ag-financial-style .expense-row {
          background-color: rgba(254, 226, 226, 0.2) !important;
        }

        .ag-financial-style .ag-cell-value {
          text-align: right;
        }

        .ag-financial-style .ag-cell[col-id="category"],
        .ag-financial-style .ag-cell[col-id="item"] {
          text-align: left;
        }
      `}</style>

      {/* Info Box */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-bold text-green-800 mb-2">💰 AG Grid Financial Style 특징</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>밀집 레이아웃:</strong> 작은 행 높이(36px)로 많은 데이터 표시</li>
          <li>• <strong>모노스페이스 폰트:</strong> 숫자 정렬을 위한 고정폭 폰트 사용</li>
          <li>• <strong>조건부 렌더링:</strong> Variance 렌더러로 증감 시각화</li>
          <li>• <strong>카테고리별 색상:</strong> 수익/비용/판관비 구분 배경색</li>
        </ul>
      </div>

      {/* Compare Link */}
      <div className="mt-4 text-center">
        <Link 
          href="/screens/grid-examples/style-4-financial" 
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          🔄 RealGrid 버전과 비교하기
        </Link>
      </div>
    </div>
  );
}

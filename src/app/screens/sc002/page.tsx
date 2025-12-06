'use client';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';
import { Search, Download, RefreshCw } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

interface ProductInventoryData {
  category: string;
  productCode: string;
  inch: string;
  site: string;
  planQty: number;
  actualQty: number;
  achievementRate: number;
  initialQty: number;
  inQty: number;
  outQty: number;
  stockQty: number;
}

export default function ProductInventoryManagement() {
  const [rowData, setRowData] = useState<ProductInventoryData[]>([
    {
      category: '합계',
      productCode: 'TOTAL',
      inch: '-',
      site: '전체',
      planQty: 15000,
      actualQty: 13500,
      achievementRate: 90.0,
      initialQty: 2000,
      inQty: 13500,
      outQty: 12800,
      stockQty: 2700
    },
    {
      category: '양산',
      productCode: 'PRD-001',
      inch: '12.1',
      site: 'A동',
      planQty: 3000,
      actualQty: 2850,
      achievementRate: 95.0,
      initialQty: 500,
      inQty: 2850,
      outQty: 2700,
      stockQty: 650
    },
    {
      category: '양산',
      productCode: 'PRD-002',
      inch: '15.6',
      site: 'B동',
      planQty: 2500,
      actualQty: 2200,
      achievementRate: 88.0,
      initialQty: 300,
      inQty: 2200,
      outQty: 2100,
      stockQty: 400
    },
    {
      category: '양산',
      productCode: 'PRD-003',
      inch: '17.3',
      site: 'A동',
      planQty: 4000,
      actualQty: 3800,
      achievementRate: 95.0,
      initialQty: 600,
      inQty: 3800,
      outQty: 3600,
      stockQty: 800
    },
    {
      category: '양산',
      productCode: 'PRD-004',
      inch: '21.5',
      site: 'C동',
      planQty: 2000,
      actualQty: 1850,
      achievementRate: 92.5,
      initialQty: 200,
      inQty: 1850,
      outQty: 1800,
      stockQty: 250
    },
    {
      category: '양산',
      productCode: 'PRD-005',
      inch: '24.0',
      site: 'B동',
      planQty: 1800,
      actualQty: 1600,
      achievementRate: 88.9,
      initialQty: 150,
      inQty: 1600,
      outQty: 1550,
      stockQty: 200
    },
    {
      category: '양산',
      productCode: 'PRD-006',
      inch: '27.0',
      site: 'C동',
      planQty: 1700,
      actualQty: 1200,
      achievementRate: 70.6,
      initialQty: 250,
      inQty: 1200,
      outQty: 1050,
      stockQty: 400
    }
  ]);

  const [filters, setFilters] = useState({
    month: '2024-01',
    category: '전체',
    site: '전체',
    productCode: ''
  });

  // 카테고리 렌더러
  const CategoryRenderer = (params: { value: string }) => {
    const colors: Record<string, string> = {
      '합계': 'bg-blue-100 text-blue-800 font-bold',
      '양산': 'bg-green-100 text-green-700',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[params.value] || ''}`}>
        {params.value}
      </span>
    );
  };

  // 달성률 렌더러
  const AchievementRenderer = (params: { value: number }) => {
    const getColor = (rate: number) => {
      if (rate >= 95) return 'bg-green-500';
      if (rate >= 85) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div 
            className={`h-full rounded-full ${getColor(params.value)}`} 
            style={{ width: `${Math.min(params.value, 100)}%` }} 
          />
        </div>
        <span className="text-xs w-12 text-right font-medium">
          {params.value.toFixed(1)}%
        </span>
      </div>
    );
  };

  // 숫자 포맷터
  const numberFormatter = (params: { value: number }) => {
    if (params.value === null || params.value === undefined) return '';
    return params.value.toLocaleString('ko-KR');
  };

  // 그룹 헤더가 포함된 컬럼 정의
  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => [
    {
      headerName: '제품 정보',
      children: [
        { 
          field: 'category', 
          headerName: '구분', 
          width: 80,
          cellRenderer: CategoryRenderer,
          cellStyle: { textAlign: 'center' }
        },
        { 
          field: 'productCode', 
          headerName: '제품코드', 
          width: 100,
          cellStyle: { textAlign: 'center', fontFamily: 'monospace' }
        },
        { 
          field: 'inch', 
          headerName: '규격(Inch)', 
          width: 80,
          cellStyle: { textAlign: 'center' }
        },
        { 
          field: 'site', 
          headerName: '사이트', 
          width: 80,
          cellStyle: { textAlign: 'center' }
        }
      ]
    },
    {
      headerName: '계획 vs 실적',
      children: [
        { 
          field: 'planQty', 
          headerName: '계획수량', 
          width: 100,
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellStyle: { textAlign: 'right' }
        },
        { 
          field: 'actualQty', 
          headerName: '실적수량', 
          width: 100,
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellStyle: { textAlign: 'right' }
        },
        { 
          field: 'achievementRate', 
          headerName: '달성률', 
          width: 120,
          cellRenderer: AchievementRenderer,
          cellStyle: { textAlign: 'center' }
        }
      ]
    },
    {
      headerName: '재고 현황',
      children: [
        { 
          field: 'initialQty', 
          headerName: '기초수량', 
          width: 100,
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellStyle: { textAlign: 'right' }
        },
        { 
          field: 'inQty', 
          headerName: '입고수량', 
          width: 100,
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellStyle: { textAlign: 'right', color: '#059669' }
        },
        { 
          field: 'outQty', 
          headerName: '출고수량', 
          width: 100,
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellStyle: { textAlign: 'right', color: '#dc2626' }
        },
        { 
          field: 'stockQty', 
          headerName: '재고수량', 
          width: 100,
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellStyle: { textAlign: 'right', fontWeight: 'bold' }
        }
      ]
    }
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    suppressMovable: true,
  }), []);

  const getRowClass = useCallback((params: RowClassParams) => {
    if (params.data.category === '합계') {
      return 'ag-row-total';
    }
    return '';
  }, []);

  const handleSearch = () => {
    console.log('검색 조건:', filters);
  };

  const handleExport = () => {
    console.log('엑셀 내보내기');
  };

  const handleRefresh = () => {
    console.log('데이터 새로고침');
  };

  // 차트 데이터 준비
  const chartData = rowData.filter(item => item.category !== '합계').map(item => ({
    name: item.productCode,
    계획: item.planQty,
    실적: item.actualQty,
    재고: item.stockQty
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">제품 수불 관리</CardTitle>
          <p className="text-gray-600">제품의 입고, 출고, 재고 현황을 관리하고 계획 대비 실적 달성률을 모니터링</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 필터 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="month">조회기간 *</Label>
              <Input
                id="month"
                type="month"
                value={filters.month}
                onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">구분</Label>
              <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="구분 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  <SelectItem value="합계">합계</SelectItem>
                  <SelectItem value="양산">양산</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="site">사이트</Label>
              <Select value={filters.site} onValueChange={(value) => setFilters(prev => ({ ...prev, site: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="사이트 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  <SelectItem value="A동">A동</SelectItem>
                  <SelectItem value="B동">B동</SelectItem>
                  <SelectItem value="C동">C동</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="productCode">제품코드</Label>
              <Input
                id="productCode"
                placeholder="제품코드 입력"
                value={filters.productCode}
                onChange={(e) => setFilters(prev => ({ ...prev, productCode: e.target.value }))}
              />
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2">
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              조회
            </Button>
            <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              새로고침
            </Button>
            <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              엑셀 다운로드
            </Button>
          </div>

          {/* AG Grid */}
          <div className="ag-theme-alpine ag-corporate-style" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowHeight={42}
              headerHeight={45}
              groupHeaderHeight={45}
              getRowClass={getRowClass}
              suppressRowClickSelection={true}
              rowSelection="multiple"
            />
          </div>

          {/* 차트 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">계획 vs 실적 비교</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => value.toLocaleString('ko-KR')} />
                    <Legend />
                    <Bar dataKey="계획" fill="#3b82f6" />
                    <Bar dataKey="실적" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">재고 현황 추이</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => value.toLocaleString('ko-KR')} />
                    <Legend />
                    <Line type="monotone" dataKey="재고" stroke="#f59e0b" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 커스텀 스타일 */}
      <style jsx global>{`
        .ag-corporate-style {
          --ag-header-background-color: #4f7cba;
          --ag-header-foreground-color: white;
          --ag-row-hover-color: #f0f7ff;
          --ag-selected-row-background-color: #e1efff;
          --ag-border-color: #e5e7eb;
          --ag-font-size: 13px;
        }
        
        .ag-corporate-style .ag-header-group-cell {
          background: linear-gradient(180deg, #5a8ac7 0%, #4f7cba 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 600;
          font-size: 14px;
        }
        
        .ag-corporate-style .ag-header-cell {
          background: linear-gradient(180deg, #6b9bd1 0%, #5a8ac7 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 500;
        }
        
        .ag-corporate-style .ag-row-total {
          background-color: #f8fafc;
          font-weight: 600;
          border-top: 2px solid #4f7cba;
          border-bottom: 2px solid #4f7cba;
        }
        
        .ag-corporate-style .ag-row-total .ag-cell {
          background-color: #f8fafc;
        }
        
        .ag-corporate-style .ag-row:hover {
          background-color: #f0f7ff;
        }
        
        .ag-corporate-style .ag-cell {
          border-right: 1px solid #f3f4f6;
        }
      `}</style>
    </div>
  );
}

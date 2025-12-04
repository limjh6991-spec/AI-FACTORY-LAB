'use client';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams, CellClassParams } from 'ag-grid-community';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, RefreshCw } from 'lucide-react';

// AG Grid 모듈 등록 (필수!)
ModuleRegistry.registerModules([AllCommunityModule]);

interface SalesExpenseData {
  category: string;
  isTotal?: boolean;
  indent?: number;
  plan: number;
  total: number;
  company: number;
  dept01: number;
  dept02: number;
  dept03: number;
  dept04: number;
  dept05: number;
  dept06: number;
  dept07: number;
  dept08: number;
  dept09: number;
  dept10: number;
  dept11: number;
  dept12: number;
  dept13: number;
  dept14: number;
  dept15: number;
  dept16: number;
  dept17: number;
  dept18: number;
  dept19: number;
  dept20: number;
  dept21: number;
  dept22: number;
  dept23: number;
  dept24: number;
  dept25: number;
}

export default function SalesExpenseByDepartment() {
  const [yearMonth, setYearMonth] = useState('2024-03');
  const [deptCode, setDeptCode] = useState('');
  const [expenseType, setExpenseType] = useState('');

  const [rowData, setRowData] = useState<SalesExpenseData[]>([
    {
      category: '합계',
      isTotal: true,
      plan: 2850000000,
      total: 2756800000,
      company: 185000000,
      dept01: 45000000,
      dept02: 125000000,
      dept03: 98000000,
      dept04: 87000000,
      dept05: 76000000,
      dept06: 89000000,
      dept07: 112000000,
      dept08: 95000000,
      dept09: 78000000,
      dept10: 65000000,
      dept11: 156000000,
      dept12: 234000000,
      dept13: 187000000,
      dept14: 145000000,
      dept15: 167000000,
      dept16: 123000000,
      dept17: 134000000,
      dept18: 156000000,
      dept19: 98000000,
      dept20: 87000000,
      dept21: 76000000,
      dept22: 89000000,
      dept23: 112000000,
      dept24: 95000000,
      dept25: 67000000
    },
    {
      category: '(1) 판)임원급여',
      indent: 1,
      plan: 180000000,
      total: 175000000,
      company: 25000000,
      dept01: 0,
      dept02: 8000000,
      dept03: 12000000,
      dept04: 8000000,
      dept05: 6000000,
      dept06: 7000000,
      dept07: 9000000,
      dept08: 8000000,
      dept09: 6000000,
      dept10: 5000000,
      dept11: 12000000,
      dept12: 15000000,
      dept13: 12000000,
      dept14: 10000000,
      dept15: 11000000,
      dept16: 8000000,
      dept17: 9000000,
      dept18: 10000000,
      dept19: 7000000,
      dept20: 6000000,
      dept21: 5000000,
      dept22: 6000000,
      dept23: 8000000,
      dept24: 7000000,
      dept25: 5000000
    },
    {
      category: '(2) 판)직원급여',
      indent: 1,
      plan: 450000000,
      total: 438000000,
      company: 35000000,
      dept01: 8000000,
      dept02: 18000000,
      dept03: 22000000,
      dept04: 16000000,
      dept05: 14000000,
      dept06: 16000000,
      dept07: 20000000,
      dept08: 18000000,
      dept09: 14000000,
      dept10: 12000000,
      dept11: 25000000,
      dept12: 35000000,
      dept13: 28000000,
      dept14: 22000000,
      dept15: 25000000,
      dept16: 18000000,
      dept17: 20000000,
      dept18: 23000000,
      dept19: 16000000,
      dept20: 14000000,
      dept21: 12000000,
      dept22: 14000000,
      dept23: 18000000,
      dept24: 16000000,
      dept25: 11000000
    },
    {
      category: '(3) 판)상여금',
      indent: 1,
      plan: 125000000,
      total: 120000000,
      company: 8000000,
      dept01: 2000000,
      dept02: 5000000,
      dept03: 6000000,
      dept04: 4500000,
      dept05: 3800000,
      dept06: 4200000,
      dept07: 5500000,
      dept08: 4800000,
      dept09: 3600000,
      dept10: 3200000,
      dept11: 6800000,
      dept12: 9500000,
      dept13: 7600000,
      dept14: 6200000,
      dept15: 6900000,
      dept16: 4900000,
      dept17: 5400000,
      dept18: 6300000,
      dept19: 4300000,
      dept20: 3700000,
      dept21: 3100000,
      dept22: 3800000,
      dept23: 4900000,
      dept24: 4200000,
      dept25: 2900000
    },
    {
      category: '(4) 판)제수당',
      indent: 1,
      plan: 85000000,
      total: 82000000,
      company: 6000000,
      dept01: 1500000,
      dept02: 3500000,
      dept03: 4200000,
      dept04: 3100000,
      dept05: 2600000,
      dept06: 2900000,
      dept07: 3800000,
      dept08: 3300000,
      dept09: 2500000,
      dept10: 2200000,
      dept11: 4700000,
      dept12: 6500000,
      dept13: 5200000,
      dept14: 4300000,
      dept15: 4800000,
      dept16: 3400000,
      dept17: 3700000,
      dept18: 4300000,
      dept19: 3000000,
      dept20: 2600000,
      dept21: 2100000,
      dept22: 2600000,
      dept23: 3400000,
      dept24: 2900000,
      dept25: 2000000
    },
    {
      category: '(5) 판)퇴직급여',
      indent: 1,
      plan: 95000000,
      total: 92000000,
      company: 7000000,
      dept01: 1800000,
      dept02: 4000000,
      dept03: 4800000,
      dept04: 3600000,
      dept05: 3000000,
      dept06: 3300000,
      dept07: 4300000,
      dept08: 3700000,
      dept09: 2800000,
      dept10: 2500000,
      dept11: 5300000,
      dept12: 7400000,
      dept13: 5900000,
      dept14: 4800000,
      dept15: 5400000,
      dept16: 3800000,
      dept17: 4200000,
      dept18: 4900000,
      dept19: 3400000,
      dept20: 2900000,
      dept21: 2400000,
      dept22: 2900000,
      dept23: 3800000,
      dept24: 3300000,
      dept25: 2300000
    },
    {
      category: '(6) 판)복리후생비',
      indent: 1,
      plan: 75000000,
      total: 73000000,
      company: 5500000,
      dept01: 1400000,
      dept02: 3200000,
      dept03: 3800000,
      dept04: 2900000,
      dept05: 2400000,
      dept06: 2600000,
      dept07: 3400000,
      dept08: 2900000,
      dept09: 2200000,
      dept10: 2000000,
      dept11: 4200000,
      dept12: 5800000,
      dept13: 4700000,
      dept14: 3800000,
      dept15: 4300000,
      dept16: 3000000,
      dept17: 3300000,
      dept18: 3900000,
      dept19: 2700000,
      dept20: 2300000,
      dept21: 1900000,
      dept22: 2300000,
      dept23: 3000000,
      dept24: 2600000,
      dept25: 1800000
    }
  ]);

  // 통화 포맷터
  const currencyFormatter = useCallback((params: { value: number }) => {
    if (params.value === null || params.value === undefined) return '';
    return (params.value / 1000000).toLocaleString('ko-KR', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }) + '백만원';
  }, []);

  // 카테고리 렌더러 (들여쓰기 적용)
  const CategoryRenderer = useCallback((params: { value: string; data: SalesExpenseData }) => {
    const { value, data } = params;
    const indentLevel = data.indent || 0;
    const isTotal = data.isTotal;
    
    return (
      <div 
        className={`flex items-center ${isTotal ? 'font-bold text-blue-700' : ''}`}
        style={{ paddingLeft: `${indentLevel * 16}px` }}
      >
        {value}
      </div>
    );
  }, []);

  // 그룹 헤더가 포함된 컬럼 정의
  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => [
    {
      field: 'category',
      headerName: '구분',
      width: 200,
      pinned: 'left' as const,
      cellRenderer: CategoryRenderer,
      cellStyle: (params: CellClassParams) => {
        if (params.data?.isTotal) {
          return { backgroundColor: '#eff6ff', fontWeight: 'bold' };
        }
        return null;
      }
    },
    {
      headerName: '계획/실적',
      children: [
        {
          field: 'plan',
          headerName: '계획',
          width: 120,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'total',
          headerName: '합계',
          width: 120,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right', backgroundColor: '#fef3c7' }
        }
      ]
    },
    {
      headerName: '공통부서',
      children: [
        {
          field: 'company',
          headerName: '전사',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept01',
          headerName: '장애인운동선수',
          width: 120,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept02',
          headerName: '판매공통',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        }
      ]
    },
    {
      headerName: '경영지원',
      children: [
        {
          field: 'dept03',
          headerName: '경영지원실',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept04',
          headerName: '지원팀',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept05',
          headerName: '자금그룹',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept06',
          headerName: '회계그룹',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept07',
          headerName: '인사총무그룹',
          width: 110,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept08',
          headerName: '시스템지원그룹',
          width: 120,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept09',
          headerName: '구매그룹',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept10',
          headerName: '전략팀',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        }
      ]
    },
    {
      headerName: '해외법인',
      children: [
        {
          field: 'dept11',
          headerName: '도우VINA',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        }
      ]
    },
    {
      headerName: '연구개발',
      children: [
        {
          field: 'dept12',
          headerName: '개발실',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept13',
          headerName: '연구팀',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept14',
          headerName: 'HTG개발그룹',
          width: 110,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept15',
          headerName: '선행연구그룹',
          width: 110,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept16',
          headerName: '개발팀',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept17',
          headerName: '공정개발그룹',
          width: 110,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept18',
          headerName: '제품개발그룹',
          width: 110,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        }
      ]
    },
    {
      headerName: '설비개발',
      children: [
        {
          field: 'dept19',
          headerName: '설비개발팀',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept20',
          headerName: '설계그룹',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept21',
          headerName: '제어그룹',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        }
      ]
    },
    {
      headerName: '사업기획',
      children: [
        {
          field: 'dept22',
          headerName: '사업기획그룹',
          width: 110,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept23',
          headerName: '마케팅그룹',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept24',
          headerName: '기술기획그룹',
          width: 110,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        },
        {
          field: 'dept25',
          headerName: '지원그룹',
          width: 100,
          type: 'numericColumn',
          valueFormatter: currencyFormatter,
          cellStyle: { textAlign: 'right' }
        }
      ]
    }
  ], [CategoryRenderer, currencyFormatter]);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 80,
  }), []);

  const getRowClass = useCallback((params: RowClassParams) => {
    if (params.data?.isTotal) {
      return 'ag-row-total';
    }
    return '';
  }, []);

  const handleSearch = useCallback(() => {
    console.log('검색 조건:', { yearMonth, deptCode, expenseType });
  }, [yearMonth, deptCode, expenseType]);

  const handleExport = useCallback(() => {
    console.log('Excel 내보내기');
  }, []);

  const handleRefresh = useCallback(() => {
    console.log('데이터 새로고침');
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            판매관리비 집계표(부서별)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 검색 영역 */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="yearMonth">기준년월 *</Label>
                <Input
                  id="yearMonth"
                  type="month"
                  value={yearMonth}
                  onChange={(e) => setYearMonth(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deptCode">부서</Label>
                <Select value={deptCode || "all"} onValueChange={(v) => setDeptCode(v === "all" ? "" : v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="부서 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="DEPT01">경영지원실</SelectItem>
                    <SelectItem value="DEPT02">개발실</SelectItem>
                    <SelectItem value="DEPT03">마케팅그룹</SelectItem>
                    <SelectItem value="DEPT04">설비개발팀</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expenseType">비용항목</Label>
                <Select value={expenseType || "all"} onValueChange={(v) => setExpenseType(v === "all" ? "" : v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="비용항목 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="SALARY">급여</SelectItem>
                    <SelectItem value="BONUS">상여금</SelectItem>
                    <SelectItem value="WELFARE">복리후생비</SelectItem>
                    <SelectItem value="TRAVEL">여비교통비</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  <Search className="w-4 h-4 mr-2" />
                  조회
                </Button>
                <Button variant="outline" onClick={handleRefresh}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* AG Grid */}
          <div className="ag-theme-alpine ag-corporate-style" style={{ height: 700, width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowHeight={42}
              headerHeight={45}
              groupHeaderHeight={45}
              getRowClass={getRowClass}
              suppressHorizontalScroll={false}
              alwaysShowHorizontalScroll={true}
              suppressMenuHide={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* 커스텀 스타일 */}
      <style jsx global>{`
        .ag-corporate-style {
          --ag-header-background-color: #1e40af;
          --ag-header-foreground-color: white;
          --ag-row-hover-color: #eff6ff;
          --ag-selected-row-background-color: #dbeafe;
          --ag-border-color: #e5e7eb;
          --ag-font-size: 13px;
        }
        
        .ag-corporate-style .ag-header-group-cell {
          background: linear-gradient(180deg, #1e40af 0%, #1d4ed8 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 600;
          font-size: 13px;
        }
        
        .ag-corporate-style .ag-header-cell {
          background: linear-gradient(180deg, #2563eb 0%, #3b82f6 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 500;
          font-size: 12px;
        }
        
        .ag-corporate-style .ag-row-total {
          background-color: #eff6ff !important;
          font-weight: bold;
          border-top: 2px solid #2563eb;
          border-bottom: 2px solid #2563eb;
        }
        
        .ag-corporate-style .ag-row-total .ag-cell {
          color: #1e40af;
        }
        
        .ag-corporate-style .ag-pinned-left-cols-container {
          border-right: 2px solid #2563eb;
        }
        
        .ag-corporate-style .ag-cell-focus {
          border: 2px solid #3b82f6 !important;
        }
        
        .ag-corporate-style .ag-row:hover {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
}

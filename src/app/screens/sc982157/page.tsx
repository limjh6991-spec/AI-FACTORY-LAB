'use client';

import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, type ColDef } from 'ag-grid-community';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, RefreshCw } from 'lucide-react';
import { api } from '~/trpc/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function SC982157Page() {
  // 상태 관리
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 검색 필드 상태
  const [yearMonth, setYearMonth] = useState('');
  const [site, setSite] = useState('');

  // tRPC 쿼리 hook
  const { refetch } = api.screen982157.getData.useQuery(
    {
      yearMonth: yearMonth.replace('-', ''),
      site: site === 'all' || !site ? undefined : site,
    },
    {
      enabled: false, // 수동 실행
    }
  );

  // Select 옵션 데이터
  const siteOptions = [
    { value: 'all', label: '전체' },
    { value: 'SITE001', label: '본사' },
    { value: 'SITE002', label: '공장' },
    { value: 'SITE003', label: '지점' }
  ];

  // 컬럼 정의
  const columnDefs: ColDef[] = useMemo(() => [
    {
      field: "col_0",
      headerName: "구분_부서별",
      width: 150,
      pinned: "left",
      cellStyle: () => null
    },
    {
      field: "col_1",
      headerName: "계획",
      width: 150,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_2",
      headerName: "합계",
      width: 150,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_3",
      headerName: "전사",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_4",
      headerName: "장애인운동선수",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_5",
      headerName: "판매공통",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_6",
      headerName: "경영지원실",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_7",
      headerName: "지원팀",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_8",
      headerName: "자금그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_9",
      headerName: "회계그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_10",
      headerName: "인사총무그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_11",
      headerName: "시스템지원그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_12",
      headerName: "구매그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_13",
      headerName: "전략팀",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_14",
      headerName: "도우VINA",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_15",
      headerName: "개발실",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_16",
      headerName: "연구팀",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_17",
      headerName: "HTG개발그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_18",
      headerName: "선행연구그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_19",
      headerName: "개발팀",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_20",
      headerName: "공정개발그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_21",
      headerName: "제품개발그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_22",
      headerName: "설비개발팀",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_23",
      headerName: "설계그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_24",
      headerName: "제어그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_25",
      headerName: "사업기획그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_26",
      headerName: "마케팅그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_27",
      headerName: "기술기획그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    },
    {
      field: "col_28",
      headerName: "지원그룹",
      width: 100,
      type: "numericColumn",
      cellStyle: () => null
    }
  ], []);

  // 기본 그리드 옵션
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    suppressMenu: true
  }), []);

  // 조회 함수
  const handleSearch = async () => {
    if (!yearMonth) {
      alert('기준년월을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const result = await refetch();
      if (result.data) {
        setRowData(result.data.data);
      }
    } catch (error) {
      console.error('데이터 조회 중 오류:', error);
      alert('데이터 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 엑셀 다운로드 함수
  const handleExcelDownload = () => {
    console.log('엑셀 다운로드');
  };

  // 초기화 함수
  const handleReset = () => {
    setYearMonth('');
    setSite('');
    setRowData([]);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border">
        <div 
          className="px-6 py-4 border-b border-gray-200"
          style={{ backgroundColor: '#1e40af' }}
        >
          <h1 className="text-xl font-semibold text-white">
            판매관리비 집계표(부서별) (SC982157)
          </h1>
        </div>

        {/* 검색 조건 */}
        <Card className="m-6 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-gray-800">검색 조건</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="yearMonth" className="text-sm font-medium text-gray-700">
                  기준년월 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="yearMonth"
                  type="month"
                  value={yearMonth}
                  onChange={(e) => setYearMonth(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site" className="text-sm font-medium text-gray-700">
                  사업장
                </Label>
                <Select value={site || 'all'} onValueChange={(value) => setSite(value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="사업장 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {siteOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSearch} 
                disabled={loading || !yearMonth}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                조회
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                초기화
              </Button>
              <Button onClick={handleExcelDownload} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                엑셀 다운로드
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 그리드 영역 */}
        <div className="mx-6 mb-6">
          <div 
            className="ag-theme-alpine w-full"
            style={{ height: '600px' }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection="multiple"
              suppressRowClickSelection={true}
              loading={loading}
              noRowsOverlayComponent={() => (
                <div className="flex items-center justify-center h-full text-gray-500">
                  조회 조건을 입력하고 조회 버튼을 클릭하세요.
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
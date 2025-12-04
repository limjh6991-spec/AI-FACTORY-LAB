'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, GridReadyEvent, RowClassParams, CellClassParams } from 'ag-grid-community';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 분기별 판매 실적 데이터 (RealGrid와 동일)
const salesData = [
  { dept: '영업1팀', region: '서울', product: '노트북', q1: 1500, q2: 1800, q3: 2100, q4: 2400, total: 7800 },
  { dept: '영업1팀', region: '서울', product: '모니터', q1: 800, q2: 950, q3: 1100, q4: 1250, total: 4100 },
  { dept: '영업1팀', region: '경기', product: '노트북', q1: 1200, q2: 1400, q3: 1600, q4: 1800, total: 6000 },
  { dept: '영업1팀', region: '경기', product: '모니터', q1: 600, q2: 720, q3: 840, q4: 960, total: 3120 },
  { dept: '영업2팀', region: '부산', product: '노트북', q1: 900, q2: 1080, q3: 1260, q4: 1440, total: 4680 },
  { dept: '영업2팀', region: '부산', product: '모니터', q1: 450, q2: 540, q3: 630, q4: 720, total: 2340 },
  { dept: '영업2팀', region: '대구', product: '노트북', q1: 750, q2: 900, q3: 1050, q4: 1200, total: 3900 },
  { dept: '영업2팀', region: '대구', product: '모니터', q1: 380, q2: 456, q3: 532, q4: 608, total: 1976 },
  { dept: '영업3팀', region: '인천', product: '노트북', q1: 680, q2: 816, q3: 952, q4: 1088, total: 3536 },
  { dept: '영업3팀', region: '인천', product: '모니터', q1: 340, q2: 408, q3: 476, q4: 544, total: 1768 },
];

// 합계 행
const totalRow = {
  dept: '합계',
  region: '',
  product: '',
  q1: salesData.reduce((sum, row) => sum + row.q1, 0),
  q2: salesData.reduce((sum, row) => sum + row.q2, 0),
  q3: salesData.reduce((sum, row) => sum + row.q3, 0),
  q4: salesData.reduce((sum, row) => sum + row.q4, 0),
  total: salesData.reduce((sum, row) => sum + row.total, 0),
};

export default function AGGridStyle1Corporate() {
  const [rowData] = useState([...salesData, totalRow]);

  // 숫자 포맷터
  const numberFormatter = (params: { value: number }) => {
    if (params.value === null || params.value === undefined) return '';
    return params.value.toLocaleString('ko-KR');
  };

  // 컬럼 정의 - 2행 헤더 (그룹 헤더 사용)
  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => [
    {
      headerName: '조직',
      children: [
        { 
          field: 'dept', 
          headerName: '부서', 
          width: 120,
          rowSpan: (params) => {
            const dept = params.data.dept;
            if (dept === '합계') return 1;
            const sameRows = rowData.filter(r => r.dept === dept);
            const index = sameRows.findIndex(r => r === params.data);
            return index === 0 ? sameRows.length : 1;
          },
          cellClassRules: {
            'dept-cell': (params) => params.data.dept !== '합계',
            'total-row': (params) => params.data.dept === '합계',
          },
        },
        { 
          field: 'region', 
          headerName: '지역', 
          width: 100,
        },
        { 
          field: 'product', 
          headerName: '제품', 
          width: 100,
        },
      ],
    },
    {
      headerName: '분기별 판매 실적 (단위: 대)',
      children: [
        { 
          field: 'q1', 
          headerName: 'Q1', 
          width: 110, 
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellClassRules: {
            'high-value': (params) => params.value >= 1500,
            'total-row': (params) => params.data.dept === '합계',
          },
        },
        { 
          field: 'q2', 
          headerName: 'Q2', 
          width: 110, 
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellClassRules: {
            'high-value': (params) => params.value >= 1500,
            'total-row': (params) => params.data.dept === '합계',
          },
        },
        { 
          field: 'q3', 
          headerName: 'Q3', 
          width: 110, 
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellClassRules: {
            'high-value': (params) => params.value >= 1500,
            'total-row': (params) => params.data.dept === '합계',
          },
        },
        { 
          field: 'q4', 
          headerName: 'Q4', 
          width: 110, 
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellClassRules: {
            'high-value': (params) => params.value >= 1500,
            'total-row': (params) => params.data.dept === '합계',
          },
        },
      ],
    },
    {
      headerName: '연간',
      children: [
        { 
          field: 'total', 
          headerName: '합계', 
          width: 130, 
          type: 'numericColumn',
          valueFormatter: numberFormatter,
          cellClass: 'total-column',
          cellClassRules: {
            'total-row': (params) => params.data.dept === '합계',
          },
        },
      ],
    },
  ], [rowData]);

  // 기본 컬럼 설정
  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  // 행 스타일
  const getRowClass = useCallback((params: RowClassParams) => {
    if (params.data.dept === '합계') {
      return 'total-row-style';
    }
    return '';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/screens/ag-grid-examples" 
          className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block"
        >
          ← AG Grid 갤러리로 돌아가기
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">AG</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Style 1: Corporate Professional</h1>
            <p className="text-gray-600">AG Grid - 블루 그라디언트 헤더, 엔터프라이즈 비즈니스 스타일</p>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
          <h2 className="text-white text-lg font-semibold">📊 분기별 판매 실적 현황</h2>
          <p className="text-blue-200 text-sm">2024년 부서별/지역별 제품 판매 현황</p>
        </div>

        {/* AG Grid */}
        <div 
          className="ag-theme-alpine ag-corporate-style" 
          style={{ height: 500, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowClass={getRowClass}
            animateRows={true}
            suppressRowTransform={true}
          />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .ag-corporate-style {
          --ag-header-background-color: #1e40af;
          --ag-header-foreground-color: white;
          --ag-header-cell-hover-background-color: #2563eb;
          --ag-row-hover-color: #eff6ff;
          --ag-selected-row-background-color: #dbeafe;
          --ag-font-family: 'Pretendard', -apple-system, sans-serif;
          --ag-font-size: 14px;
          --ag-row-height: 42px;
          --ag-header-height: 45px;
        }

        .ag-corporate-style .ag-header-group-cell {
          background: linear-gradient(180deg, #1e40af 0%, #1d4ed8 100%);
          font-weight: 600;
        }

        .ag-corporate-style .ag-header-cell {
          background: linear-gradient(180deg, #2563eb 0%, #3b82f6 100%);
        }

        .ag-corporate-style .ag-cell {
          display: flex;
          align-items: center;
          border-right: 1px solid #e5e7eb;
        }

        .ag-corporate-style .ag-row {
          border-bottom: 1px solid #e5e7eb;
        }

        .ag-corporate-style .ag-row:hover {
          background-color: #eff6ff;
        }

        .ag-corporate-style .high-value {
          background-color: #dcfce7 !important;
          color: #166534;
          font-weight: 600;
        }

        .ag-corporate-style .total-column {
          background-color: #fef3c7 !important;
          font-weight: 700;
          color: #92400e;
        }

        .ag-corporate-style .total-row-style {
          background-color: #1e40af !important;
          color: white !important;
          font-weight: 700;
        }

        .ag-corporate-style .total-row-style .ag-cell {
          color: white !important;
          background-color: #1e40af !important;
        }

        .ag-corporate-style .dept-cell {
          font-weight: 600;
          color: #1e40af;
        }
      `}</style>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-bold text-blue-800 mb-2">🎨 AG Grid Corporate Style 특징</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>그룹 헤더:</strong> AG Grid의 columnGroup 기능으로 2레벨 헤더 구현</li>
          <li>• <strong>조건부 서식:</strong> cellClassRules로 값에 따른 스타일 적용</li>
          <li>• <strong>CSS Variables:</strong> AG Grid 테마 변수로 전체 스타일 커스터마이징</li>
          <li>• <strong>행 스타일:</strong> getRowClass로 합계 행 특별 처리</li>
        </ul>
      </div>

      {/* Compare Link */}
      <div className="mt-4 text-center">
        <Link 
          href="/screens/grid-examples/style-1-corporate" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          🔄 RealGrid 버전과 비교하기
        </Link>
      </div>
    </div>
  );
}

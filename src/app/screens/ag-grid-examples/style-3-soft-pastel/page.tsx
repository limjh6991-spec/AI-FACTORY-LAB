'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 고객 관리 데이터 (RealGrid와 동일)
const customerData = [
  { id: 'C001', name: '김지현', email: 'jihyun@email.com', phone: '010-1234-5678', grade: 'VIP', points: 15000, lastVisit: '2024-03-15', status: 'Active' },
  { id: 'C002', name: '박서준', email: 'seojun@email.com', phone: '010-2345-6789', grade: 'Gold', points: 8500, lastVisit: '2024-03-10', status: 'Active' },
  { id: 'C003', name: '이수민', email: 'sumin@email.com', phone: '010-3456-7890', grade: 'Silver', points: 3200, lastVisit: '2024-02-28', status: 'Active' },
  { id: 'C004', name: '최유진', email: 'yujin@email.com', phone: '010-4567-8901', grade: 'VIP', points: 22000, lastVisit: '2024-03-18', status: 'Active' },
  { id: 'C005', name: '정민수', email: 'minsu@email.com', phone: '010-5678-9012', grade: 'Bronze', points: 1500, lastVisit: '2024-01-15', status: 'Dormant' },
  { id: 'C006', name: '한소희', email: 'sohee@email.com', phone: '010-6789-0123', grade: 'Gold', points: 9800, lastVisit: '2024-03-12', status: 'Active' },
  { id: 'C007', name: '송강', email: 'kang@email.com', phone: '010-7890-1234', grade: 'Silver', points: 4100, lastVisit: '2024-03-01', status: 'Active' },
  { id: 'C008', name: '김태리', email: 'taeri@email.com', phone: '010-8901-2345', grade: 'VIP', points: 18500, lastVisit: '2024-03-17', status: 'Active' },
];

// 등급 렌더러
const GradeRenderer = (params: { value: string }) => {
  const gradeStyles: Record<string, string> = {
    'VIP': 'bg-gradient-to-r from-purple-400 to-pink-400 text-white',
    'Gold': 'bg-gradient-to-r from-amber-400 to-orange-400 text-white',
    'Silver': 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700',
    'Bronze': 'bg-gradient-to-r from-orange-300 to-amber-400 text-orange-800',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${gradeStyles[params.value] || ''}`}>
      {params.value === 'VIP' && '👑 '}{params.value}
    </span>
  );
};

// 상태 렌더러
const StatusRenderer = (params: { value: string }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
      params.value === 'Active' 
        ? 'bg-green-100 text-green-700' 
        : 'bg-gray-100 text-gray-500'
    }`}>
      {params.value === 'Active' ? '✓ ' : '💤 '}{params.value}
    </span>
  );
};

// 포인트 렌더러
const PointsRenderer = (params: { value: number }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-pink-500">💎</span>
      <span className="font-semibold text-purple-700">{params.value.toLocaleString()}</span>
      <span className="text-xs text-gray-400">P</span>
    </div>
  );
};

export default function AGGridStyle3SoftPastel() {
  const [rowData] = useState(customerData);

  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => [
    {
      headerName: '👤 기본 정보',
      children: [
        { field: 'id', headerName: '고객 ID', width: 100 },
        { field: 'name', headerName: '이름', width: 100 },
        { field: 'grade', headerName: '등급', width: 120, cellRenderer: GradeRenderer },
      ]
    },
    {
      headerName: '📞 연락처',
      children: [
        { field: 'email', headerName: '이메일', width: 180 },
        { field: 'phone', headerName: '전화번호', width: 140 },
      ]
    },
    {
      headerName: '💳 활동 정보',
      children: [
        { field: 'points', headerName: '포인트', width: 130, cellRenderer: PointsRenderer },
        { field: 'lastVisit', headerName: '최근 방문', width: 120 },
        { field: 'status', headerName: '상태', width: 110, cellRenderer: StatusRenderer },
      ]
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      {/* Decorative Elements */}
      <div className="fixed top-20 left-20 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      {/* Header */}
      <div className="relative mb-6">
        <Link 
          href="/screens/ag-grid-examples" 
          className="text-purple-500 hover:text-purple-600 text-sm mb-2 inline-block"
        >
          ← AG Grid 갤러리로 돌아가기
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">AG</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Style 3: Soft Pastel
            </h1>
            <p className="text-gray-500">AG Grid - 파스텔톤, 라운드 코너, 부드러운 스타일</p>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-purple-100">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 py-4">
          <h2 className="text-gray-700 text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">🌸</span> 고객 관리 시스템
          </h2>
          <p className="text-gray-500 text-sm">Customer Relationship Management</p>
        </div>

        {/* AG Grid */}
        <div 
          className="ag-theme-alpine ag-pastel-style" 
          style={{ height: 450, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowHeight={50}
            headerHeight={48}
          />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .ag-pastel-style {
          --ag-background-color: rgba(255, 255, 255, 0.8);
          --ag-header-background-color: transparent;
          --ag-header-foreground-color: #6b7280;
          --ag-odd-row-background-color: rgba(249, 250, 251, 0.5);
          --ag-row-hover-color: rgba(236, 72, 153, 0.05);
          --ag-selected-row-background-color: rgba(168, 85, 247, 0.1);
          --ag-font-family: 'Pretendard', -apple-system, sans-serif;
          --ag-font-size: 14px;
          --ag-row-height: 50px;
          --ag-header-height: 48px;
          --ag-border-color: rgba(209, 213, 219, 0.5);
          --ag-border-radius: 12px;
        }

        .ag-pastel-style .ag-root-wrapper {
          border-radius: 0;
          border: none;
        }

        .ag-pastel-style .ag-header {
          background: linear-gradient(180deg, #fdf2f8 0%, #faf5ff 100%);
          border-bottom: 2px solid #f3e8ff;
        }

        .ag-pastel-style .ag-header-group-cell {
          background: transparent;
          color: #7c3aed;
          font-weight: 600;
          font-size: 12px;
        }

        .ag-pastel-style .ag-header-cell {
          background: transparent;
          color: #9ca3af;
          font-weight: 500;
        }

        .ag-pastel-style .ag-cell {
          color: #374151;
          border-right: none;
          display: flex;
          align-items: center;
        }

        .ag-pastel-style .ag-row {
          border-bottom: 1px solid rgba(243, 232, 255, 0.5);
          transition: all 0.2s ease;
        }

        .ag-pastel-style .ag-row:hover {
          background: linear-gradient(90deg, rgba(251, 207, 232, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%) !important;
          transform: scale(1.001);
        }

        .ag-pastel-style .ag-row-even {
          background-color: transparent;
        }

        .ag-pastel-style .ag-row-odd {
          background-color: rgba(249, 250, 251, 0.3);
        }
      `}</style>

      {/* Info Box */}
      <div className="relative mt-6 bg-white/60 backdrop-blur-sm border border-purple-100 rounded-2xl p-4">
        <h3 className="font-bold text-purple-600 mb-2">🎨 AG Grid Pastel Style 특징</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong className="text-purple-600">파스텔 그라디언트:</strong> 헤더에 부드러운 핑크-퍼플 그라디언트 적용</li>
          <li>• <strong className="text-purple-600">커스텀 셀 렌더러:</strong> React 컴포넌트로 등급, 상태, 포인트 표시</li>
          <li>• <strong className="text-purple-600">반투명 배경:</strong> backdrop-blur와 함께 부드러운 느낌 구현</li>
          <li>• <strong className="text-purple-600">호버 효과:</strong> 행 호버 시 그라디언트와 스케일 효과</li>
        </ul>
      </div>

      {/* Compare Link */}
      <div className="mt-4 text-center">
        <Link 
          href="/screens/grid-examples/style-3-soft-pastel" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
        >
          🔄 RealGrid 버전과 비교하기
        </Link>
      </div>
    </div>
  );
}

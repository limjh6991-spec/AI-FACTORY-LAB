'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, RowClassParams } from 'ag-grid-community';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 서버 모니터링 데이터 (RealGrid와 동일)
const serverData = [
  { server: 'WEB-001', status: 'Running', cpu: 45, memory: 62, disk: 78, network: 125, uptime: '15d 4h', alerts: 0 },
  { server: 'WEB-002', status: 'Running', cpu: 72, memory: 85, disk: 65, network: 230, uptime: '15d 4h', alerts: 2 },
  { server: 'API-001', status: 'Warning', cpu: 88, memory: 91, disk: 45, network: 450, uptime: '7d 12h', alerts: 5 },
  { server: 'API-002', status: 'Running', cpu: 35, memory: 48, disk: 52, network: 380, uptime: '30d 0h', alerts: 0 },
  { server: 'DB-001', status: 'Running', cpu: 55, memory: 78, disk: 89, network: 95, uptime: '45d 8h', alerts: 1 },
  { server: 'DB-002', status: 'Critical', cpu: 95, memory: 97, disk: 95, network: 12, uptime: '2d 3h', alerts: 8 },
  { server: 'CACHE-001', status: 'Running', cpu: 25, memory: 55, disk: 30, network: 890, uptime: '60d 0h', alerts: 0 },
  { server: 'BATCH-001', status: 'Stopped', cpu: 0, memory: 15, disk: 42, network: 0, uptime: '0d 0h', alerts: 0 },
];

// 상태 렌더러 컴포넌트
const StatusRenderer = (params: { value: string }) => {
  const statusColors: Record<string, string> = {
    'Running': 'bg-green-500',
    'Warning': 'bg-yellow-500',
    'Critical': 'bg-red-500',
    'Stopped': 'bg-gray-500',
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${statusColors[params.value] || 'bg-gray-500'} animate-pulse`}></div>
      <span className={params.value === 'Critical' ? 'text-red-400 font-bold' : ''}>{params.value}</span>
    </div>
  );
};

// 프로그레스 바 렌더러
const ProgressRenderer = (params: { value: number }) => {
  const value = params.value;
  let color = 'bg-cyan-500';
  if (value >= 90) color = 'bg-red-500';
  else if (value >= 70) color = 'bg-yellow-500';
  
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-300`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="text-xs w-10 text-right">{value}%</span>
    </div>
  );
};

// Alert 렌더러
const AlertRenderer = (params: { value: number }) => {
  if (params.value === 0) {
    return <span className="text-gray-500">-</span>;
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
      params.value >= 5 ? 'bg-red-500/30 text-red-400' : 'bg-yellow-500/30 text-yellow-400'
    }`}>
      {params.value}
    </span>
  );
};

export default function AGGridStyle2ModernDark() {
  const [rowData] = useState(serverData);

  const columnDefs: (ColDef | ColGroupDef)[] = useMemo(() => [
    {
      headerName: '서버 정보',
      children: [
        { field: 'server', headerName: '서버명', width: 120, pinned: 'left' },
        { field: 'status', headerName: '상태', width: 120, cellRenderer: StatusRenderer },
        { field: 'uptime', headerName: '가동시간', width: 100 },
      ]
    },
    {
      headerName: '리소스 사용률',
      children: [
        { field: 'cpu', headerName: 'CPU', width: 150, cellRenderer: ProgressRenderer },
        { field: 'memory', headerName: 'Memory', width: 150, cellRenderer: ProgressRenderer },
        { field: 'disk', headerName: 'Disk', width: 150, cellRenderer: ProgressRenderer },
      ]
    },
    {
      headerName: '네트워크 & 알림',
      children: [
        { 
          field: 'network', 
          headerName: 'Network (MB/s)', 
          width: 130,
          valueFormatter: (params) => `${params.value} MB/s`,
        },
        { field: 'alerts', headerName: 'Alerts', width: 100, cellRenderer: AlertRenderer },
      ]
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const getRowClass = useCallback((params: RowClassParams) => {
    if (params.data.status === 'Critical') return 'critical-row';
    if (params.data.status === 'Warning') return 'warning-row';
    if (params.data.status === 'Stopped') return 'stopped-row';
    return '';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/screens/ag-grid-examples" 
          className="text-cyan-400 hover:text-cyan-300 text-sm mb-2 inline-block"
        >
          ← AG Grid 갤러리로 돌아가기
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-white font-bold">AG</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Style 2: Modern Dark</h1>
            <p className="text-gray-400">AG Grid - 다크 테마, 네온 강조색 대시보드 스타일</p>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="bg-gray-800/50 backdrop-blur rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                <span className="text-cyan-400">⚡</span> Server Monitoring Dashboard
              </h2>
              <p className="text-gray-400 text-sm">Real-time infrastructure status</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-400 text-sm">Live</span>
            </div>
          </div>
        </div>

        {/* AG Grid */}
        <div 
          className="ag-theme-alpine-dark ag-dark-neon-style" 
          style={{ height: 450, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowClass={getRowClass}
            animateRows={true}
            rowHeight={48}
            headerHeight={45}
          />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .ag-dark-neon-style {
          --ag-background-color: #1f2937;
          --ag-header-background-color: #111827;
          --ag-header-foreground-color: #9ca3af;
          --ag-odd-row-background-color: #1f2937;
          --ag-row-hover-color: rgba(6, 182, 212, 0.1);
          --ag-selected-row-background-color: rgba(6, 182, 212, 0.2);
          --ag-font-family: 'JetBrains Mono', 'Consolas', monospace;
          --ag-font-size: 13px;
          --ag-row-height: 48px;
          --ag-header-height: 45px;
          --ag-border-color: #374151;
        }

        .ag-dark-neon-style .ag-header-group-cell {
          background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
          border-bottom: 2px solid #06b6d4;
          color: #06b6d4;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.5px;
        }

        .ag-dark-neon-style .ag-header-cell {
          background: #111827;
          color: #9ca3af;
        }

        .ag-dark-neon-style .ag-cell {
          color: #e5e7eb;
          border-right: 1px solid #374151;
        }

        .ag-dark-neon-style .ag-row {
          border-bottom: 1px solid #374151;
        }

        .ag-dark-neon-style .critical-row {
          background: rgba(239, 68, 68, 0.1) !important;
        }

        .ag-dark-neon-style .warning-row {
          background: rgba(234, 179, 8, 0.1) !important;
        }

        .ag-dark-neon-style .stopped-row {
          opacity: 0.5;
        }

        .ag-dark-neon-style .ag-pinned-left-cols-container .ag-cell {
          background: #111827;
          font-weight: 600;
          color: #06b6d4;
        }
      `}</style>

      {/* Info Box */}
      <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <h3 className="font-bold text-cyan-400 mb-2">🌙 AG Grid Dark Theme 특징</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• <strong className="text-white">다크 테마:</strong> ag-theme-alpine-dark 기반 커스텀 스타일</li>
          <li>• <strong className="text-white">커스텀 셀 렌더러:</strong> React 컴포넌트로 프로그레스 바, 상태 표시 구현</li>
          <li>• <strong className="text-white">CSS Variables:</strong> AG Grid 테마 변수로 네온 스타일 적용</li>
          <li>• <strong className="text-white">행 스타일:</strong> getRowClass로 상태별 배경색 적용</li>
        </ul>
      </div>

      {/* Compare Link */}
      <div className="mt-4 text-center">
        <Link 
          href="/screens/grid-examples/style-2-modern-dark" 
          className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors"
        >
          🔄 RealGrid 버전과 비교하기
        </Link>
      </div>
    </div>
  );
}

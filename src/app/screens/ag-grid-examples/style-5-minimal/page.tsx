'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// 프로젝트 관리 데이터 (RealGrid와 동일)
const projectData = [
  { id: 'PRJ-001', name: 'AI 추천 시스템', pm: '김철수', team: 'AI Lab', startDate: '2024-01-15', endDate: '2024-06-30', progress: 75, status: 'In Progress' },
  { id: 'PRJ-002', name: '모바일 앱 리뉴얼', pm: '이영희', team: 'Mobile', startDate: '2024-02-01', endDate: '2024-05-31', progress: 90, status: 'Review' },
  { id: 'PRJ-003', name: '결제 시스템 개선', pm: '박민수', team: 'Backend', startDate: '2024-03-01', endDate: '2024-08-31', progress: 45, status: 'In Progress' },
  { id: 'PRJ-004', name: '데이터 파이프라인', pm: '정수진', team: 'Data', startDate: '2024-01-01', endDate: '2024-04-30', progress: 100, status: 'Completed' },
  { id: 'PRJ-005', name: 'UI/UX 가이드라인', pm: '최지우', team: 'Design', startDate: '2024-02-15', endDate: '2024-04-15', progress: 100, status: 'Completed' },
  { id: 'PRJ-006', name: '보안 강화 프로젝트', pm: '한동훈', team: 'Security', startDate: '2024-03-15', endDate: '2024-09-30', progress: 30, status: 'In Progress' },
  { id: 'PRJ-007', name: 'API Gateway 구축', pm: '송미란', team: 'Platform', startDate: '2024-04-01', endDate: '2024-07-31', progress: 15, status: 'Planning' },
  { id: 'PRJ-008', name: '고객 포털 개발', pm: '윤서준', team: 'Frontend', startDate: '2024-03-01', endDate: '2024-08-15', progress: 55, status: 'In Progress' },
];

// Progress 렌더러
const ProgressRenderer = (params: { value: number }) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${
            params.value === 100 ? 'bg-gray-800' : 'bg-gray-400'
          }`}
          style={{ width: `${params.value}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-500 w-12 text-right">{params.value}%</span>
    </div>
  );
};

// Status 렌더러
const StatusRenderer = (params: { value: string }) => {
  const styles: Record<string, string> = {
    'Planning': 'text-gray-400',
    'In Progress': 'text-gray-600',
    'Review': 'text-gray-700 font-medium',
    'Completed': 'text-gray-800 font-semibold',
  };
  
  const dots: Record<string, string> = {
    'Planning': 'bg-gray-300',
    'In Progress': 'bg-gray-400',
    'Review': 'bg-gray-600',
    'Completed': 'bg-gray-800',
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${dots[params.value]}`}></div>
      <span className={styles[params.value]}>{params.value}</span>
    </div>
  );
};

// Team 렌더러
const TeamRenderer = (params: { value: string }) => {
  return (
    <span className="text-gray-400 text-sm">{params.value}</span>
  );
};

export default function AGGridStyle5Minimal() {
  const [rowData] = useState(projectData);

  const columnDefs: ColDef[] = useMemo(() => [
    { 
      field: 'name', 
      headerName: 'Project', 
      width: 200,
      cellClass: 'font-medium text-gray-800',
    },
    { 
      field: 'pm', 
      headerName: 'PM', 
      width: 100,
    },
    { 
      field: 'team', 
      headerName: 'Team', 
      width: 100,
      cellRenderer: TeamRenderer,
    },
    { 
      field: 'startDate', 
      headerName: 'Start', 
      width: 110,
      cellClass: 'text-gray-500',
    },
    { 
      field: 'endDate', 
      headerName: 'End', 
      width: 110,
      cellClass: 'text-gray-500',
    },
    { 
      field: 'progress', 
      headerName: 'Progress', 
      width: 180,
      cellRenderer: ProgressRenderer,
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      cellRenderer: StatusRenderer,
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="mb-12">
        <Link 
          href="/screens/ag-grid-examples" 
          className="text-gray-400 hover:text-gray-600 text-sm mb-4 inline-block"
        >
          ← Back to Gallery
        </Link>
        <div className="flex items-center gap-4 mt-4">
          <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">AG</span>
          </div>
          <div>
            <h1 className="text-3xl font-light text-gray-800 tracking-tight">
              Minimal Clean
            </h1>
            <p className="text-gray-400 text-sm mt-1">AG Grid — 미니멀, 보더리스, 타이포그래피 중심</p>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-6xl">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800">Projects</h2>
          <p className="text-sm text-gray-400 mt-1">Active and completed projects overview</p>
        </div>

        {/* AG Grid */}
        <div 
          className="ag-theme-alpine ag-minimal-style" 
          style={{ height: 480, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowHeight={56}
            headerHeight={48}
            domLayout="normal"
          />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .ag-minimal-style {
          --ag-background-color: #ffffff;
          --ag-header-background-color: #ffffff;
          --ag-header-foreground-color: #9ca3af;
          --ag-odd-row-background-color: #ffffff;
          --ag-row-hover-color: #f9fafb;
          --ag-selected-row-background-color: #f3f4f6;
          --ag-font-family: 'Inter', -apple-system, sans-serif;
          --ag-font-size: 14px;
          --ag-row-height: 56px;
          --ag-header-height: 48px;
          --ag-border-color: transparent;
          --ag-row-border-color: #f3f4f6;
        }

        .ag-minimal-style .ag-root-wrapper {
          border: none;
          border-radius: 0;
        }

        .ag-minimal-style .ag-header {
          border-bottom: 1px solid #f3f4f6;
          background: transparent;
        }

        .ag-minimal-style .ag-header-cell {
          font-weight: 500;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9ca3af;
          background: transparent;
        }

        .ag-minimal-style .ag-header-cell:hover {
          background: #f9fafb !important;
        }

        .ag-minimal-style .ag-cell {
          border: none;
          color: #374151;
          display: flex;
          align-items: center;
        }

        .ag-minimal-style .ag-row {
          border-bottom: 1px solid #f3f4f6;
        }

        .ag-minimal-style .ag-row:hover {
          background-color: #f9fafb !important;
        }

        .ag-minimal-style .ag-row-even,
        .ag-minimal-style .ag-row-odd {
          background-color: transparent;
        }

        .ag-minimal-style .ag-header-icon {
          color: #d1d5db;
        }

        .ag-minimal-style .ag-paging-panel {
          border-top: 1px solid #f3f4f6;
          color: #9ca3af;
        }

        /* Hide grid lines */
        .ag-minimal-style .ag-cell-focus {
          border: none !important;
        }

        .ag-minimal-style .ag-ltr .ag-cell {
          border-right: none;
        }
      `}</style>

      {/* Info Box */}
      <div className="mt-12 max-w-6xl">
        <div className="border-t border-gray-100 pt-8">
          <h3 className="text-sm font-medium text-gray-800 mb-4">Design Principles</h3>
          <div className="grid grid-cols-4 gap-8 text-sm text-gray-500">
            <div>
              <div className="font-medium text-gray-700 mb-1">Borderless</div>
              <p>불필요한 보더 제거로 깔끔한 레이아웃</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Whitespace</div>
              <p>충분한 여백으로 가독성 향상</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Typography</div>
              <p>폰트 가중치와 색상으로 계층 표현</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Subtle Hover</div>
              <p>은은한 호버 효과로 인터랙션 표시</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Link */}
      <div className="mt-12 text-center">
        <Link 
          href="/screens/grid-examples/style-5-minimal" 
          className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-6 py-3 rounded hover:bg-gray-50 transition-colors"
        >
          🔄 RealGrid 버전과 비교하기
        </Link>
      </div>
    </div>
  );
}

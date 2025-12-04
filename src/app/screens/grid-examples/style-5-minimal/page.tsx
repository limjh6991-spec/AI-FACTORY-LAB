'use client';

import { useEffect, useRef } from 'react';
import RealGrid, { GridView, LocalDataProvider } from 'realgrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * ✨ Style 5: Minimal Clean
 * 
 * 미니멀 스타일 - 군더더기 없는 깔끔한 디자인
 * - 보더리스 디자인
 * - 충분한 화이트스페이스
 * - 타이포그래피 중심
 * - 마이크로 인터랙션
 */
export default function MinimalCleanStylePage() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<any>(null);
  const dataProviderRef = useRef<any>(null);

  // 샘플 데이터 - 프로젝트 목록
  const sampleData = [
    { project: 'Website Redesign', lead: '김설계', team: 'UX팀', status: '진행중', progress: 75, start: '2025-10-01', end: '2025-12-31', budget: 50000000 },
    { project: 'Mobile App v2.0', lead: '이개발', team: '모바일팀', status: '진행중', progress: 45, start: '2025-11-01', end: '2026-02-28', budget: 80000000 },
    { project: 'API Migration', lead: '박백엔', team: '서버팀', status: '완료', progress: 100, start: '2025-08-01', end: '2025-11-30', budget: 30000000 },
    { project: 'Data Analytics', lead: '최분석', team: '데이터팀', status: '계획', progress: 10, start: '2026-01-01', end: '2026-06-30', budget: 60000000 },
    { project: 'Security Audit', lead: '정보안', team: '보안팀', status: '진행중', progress: 60, start: '2025-11-15', end: '2025-12-20', budget: 15000000 },
    { project: 'Cloud Migration', lead: '강클라', team: '인프라팀', status: '계획', progress: 5, start: '2026-02-01', end: '2026-08-31', budget: 120000000 },
  ];

  useEffect(() => {
    if (!gridContainerRef.current) return;

    const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
    if (license) {
      RealGrid.setLicenseKey(license);
    }

    const dataProvider = new LocalDataProvider(false);
    const gridView = new GridView(gridContainerRef.current);
    gridView.setDataSource(dataProvider);

    gridViewRef.current = gridView;
    dataProviderRef.current = dataProvider;

    const fields = [
      { fieldName: 'project' },
      { fieldName: 'lead' },
      { fieldName: 'team' },
      { fieldName: 'status' },
      { fieldName: 'progress', dataType: 'number' },
      { fieldName: 'start' },
      { fieldName: 'end' },
      { fieldName: 'budget', dataType: 'number' },
    ];
    dataProvider.setFields(fields);

    const columns = [
      { 
        name: 'project', fieldName: 'project', 
        header: { text: 'Project' }, 
        width: 180,
        styles: { textAlignment: 'near', font: 'bold' }
      },
      { 
        name: 'lead', fieldName: 'lead', 
        header: { text: 'Lead' }, 
        width: 90,
        styles: { textAlignment: 'center' }
      },
      { 
        name: 'team', fieldName: 'team', 
        header: { text: 'Team' }, 
        width: 100,
        styles: { textAlignment: 'center' }
      },
      { 
        name: 'status', fieldName: 'status', 
        header: { text: 'Status' }, 
        width: 80,
        styles: { textAlignment: 'center' }
      },
      { 
        name: 'progress', fieldName: 'progress', 
        header: { text: 'Progress' }, 
        width: 100,
        styles: { textAlignment: 'far', suffix: '%' }
      },
      { 
        name: 'start', fieldName: 'start', 
        header: { text: 'Start' }, 
        width: 110,
        styles: { textAlignment: 'center' }
      },
      { 
        name: 'end', fieldName: 'end', 
        header: { text: 'End' }, 
        width: 110,
        styles: { textAlignment: 'center' }
      },
      { 
        name: 'budget', fieldName: 'budget', 
        header: { text: 'Budget' }, 
        width: 130,
        styles: { textAlignment: 'far', numberFormat: '#,##0', prefix: '₩' }
      },
    ];
    gridView.setColumns(columns);

    // 레이아웃 - 심플 그룹핑
    const layout = [
      'project',
      {
        name: 'teamGroup',
        direction: 'horizontal',
        items: ['lead', 'team'],
        header: { text: 'Team' }
      },
      {
        name: 'statusGroup',
        direction: 'horizontal',
        items: ['status', 'progress'],
        header: { text: 'Status' }
      },
      {
        name: 'scheduleGroup',
        direction: 'horizontal',
        items: ['start', 'end'],
        header: { text: 'Schedule' }
      },
      'budget'
    ];
    gridView.setColumnLayout(layout);

    gridView.setDisplayOptions({
      columnMovable: true,
      columnResizable: true,
      rowHeight: 48
    });

    gridView.setHeader({ height: 52 });

    dataProvider.setRows(sampleData);

    return () => {
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Clean Style CSS */}
      <style jsx global>{`
        /* ========================================
           ✨ Minimal Clean Style
           ======================================== */
        
        .minimal-grid {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* 그리드 루트 - 보더리스 */
        .minimal-grid .rg-root {
          background: #ffffff !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }

        /* 헤더 - 미니멀 */
        .minimal-grid .rg-header-bar {
          background: #fafafa !important;
          border: none !important;
          border-bottom: 1px solid #f0f0f0 !important;
        }

        .minimal-grid .rg-header-text {
          color: #6b7280 !important;
          font-weight: 500 !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.8px !important;
        }

        /* 그룹 헤더 - 경량화 */
        .minimal-grid .rg-column-group-header {
          background: #ffffff !important;
          border: none !important;
          border-bottom: 2px solid #111827 !important;
        }

        .minimal-grid .rg-column-group-header .rg-header-text {
          color: #111827 !important;
          font-weight: 600 !important;
          font-size: 12px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }

        /* 데이터 셀 - 넉넉한 여백 */
        .minimal-grid .rg-data-cell {
          background: #ffffff !important;
          border: none !important;
          border-bottom: 1px solid #f5f5f5 !important;
          padding: 14px 16px !important;
          font-size: 14px !important;
          color: #374151 !important;
          transition: background-color 0.15s ease !important;
        }

        /* 행 호버 - 서브틀 */
        .minimal-grid .rg-data-row:hover .rg-data-cell {
          background: #fafafa !important;
        }

        /* 선택된 행 - 미니멀 강조 */
        .minimal-grid .rg-data-row.rg-select .rg-data-cell,
        .minimal-grid .rg-data-cell.rg-select {
          background: #f3f4f6 !important;
        }

        /* 인디케이터 - 숨김 처리 (미니멀) */
        .minimal-grid .rg-indicator {
          background: #ffffff !important;
          border: none !important;
          color: #9ca3af !important;
          font-weight: 400 !important;
          font-size: 12px !important;
        }

        /* 스크롤바 - 거의 투명 */
        .minimal-grid .rg-scrollbar-track {
          background: transparent !important;
        }

        .minimal-grid .rg-scrollbar-thumb {
          background: #e5e7eb !important;
          border-radius: 10px !important;
        }

        .minimal-grid .rg-scrollbar-thumb:hover {
          background: #d1d5db !important;
        }

        /* 숫자 폰트 */
        .minimal-grid .rg-data-cell {
          font-variant-numeric: tabular-nums !important;
        }

        /* 짝수 행 배경 (옵셔널) */
        .minimal-grid .rg-data-row:nth-child(even) .rg-data-cell {
          background: #fafafa !important;
        }
      `}</style>

      <div className="container mx-auto p-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/screens/grid-examples">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              스타일 갤러리
            </Button>
          </Link>
        </div>

        <Card className="border-0 shadow-none">
          <CardHeader className="border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gray-400" />
              <div>
                <CardTitle className="text-2xl font-light text-gray-900">Minimal Clean Style</CardTitle>
                <p className="text-gray-400 text-sm mt-1 font-light">
                  미니멀 스타일 — 군더더기 없는 깔끔한 디자인
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* 검색 영역 - 미니멀 */}
            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Search</span>
                <Input 
                  type="text" 
                  placeholder="Project name..." 
                  className="w-48 border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-gray-900 px-0" 
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Status</span>
                <select className="border-0 border-b border-gray-200 rounded-none px-0 py-2 text-sm text-gray-700 focus:ring-0 focus:border-gray-900 bg-transparent">
                  <option>All</option>
                  <option>In Progress</option>
                  <option>Complete</option>
                  <option>Planning</option>
                </select>
              </div>
              <div className="flex-1" />
              <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            {/* 그리드 컨테이너 */}
            <div className="minimal-grid border-t border-gray-100">
              <div 
                ref={gridContainerRef} 
                style={{ width: '100%', height: '420px' }}
              />
            </div>

            {/* 범례 */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Style Features</h4>
              <ul className="text-sm text-gray-500 grid grid-cols-2 md:grid-cols-4 gap-3">
                <li>• Borderless design</li>
                <li>• Generous whitespace</li>
                <li>• Typography focused</li>
                <li>• Subtle interactions</li>
                <li>• Light color palette</li>
                <li>• Uppercase labels</li>
                <li>• Minimal chrome</li>
                <li>• Clean grid lines</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import RealGrid, { GridView, LocalDataProvider, ValueType, ColumnLayoutDirection } from 'realgrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, ArrowLeft, Moon } from 'lucide-react';
import Link from 'next/link';

/**
 * 🌙 Style 2: Modern Dark
 * 
 * 다크 테마 - 눈의 피로를 줄이는 현대적인 디자인
 * - 다크 배경 (#0f172a)
 * - 네온 강조 색상
 * - 부드러운 그림자와 글로우 효과
 * - 컬러 인디케이터
 */
export default function ModernDarkStylePage() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<any>(null);
  const dataProviderRef = useRef<any>(null);

  // 샘플 데이터 - 서버 모니터링
  const sampleData = [
    { server: 'API-Server-01', status: '정상', cpu: 45, memory: 62, disk: 78, network: 850, response: 120, uptime: '99.99%' },
    { server: 'API-Server-02', status: '정상', cpu: 38, memory: 55, disk: 65, network: 720, response: 95, uptime: '99.95%' },
    { server: 'DB-Master', status: '경고', cpu: 82, memory: 88, disk: 45, network: 1200, response: 250, uptime: '99.90%' },
    { server: 'DB-Slave-01', status: '정상', cpu: 35, memory: 72, disk: 52, network: 950, response: 180, uptime: '99.98%' },
    { server: 'Cache-Redis', status: '정상', cpu: 22, memory: 45, disk: 30, network: 3500, response: 5, uptime: '100.0%' },
    { server: 'Web-Frontend', status: '정상', cpu: 28, memory: 40, disk: 55, network: 650, response: 85, uptime: '99.99%' },
    { server: 'Worker-Queue', status: '위험', cpu: 95, memory: 92, disk: 88, network: 150, response: 520, uptime: '98.50%' },
    { server: 'Log-Collector', status: '정상', cpu: 15, memory: 38, disk: 72, network: 2100, response: 45, uptime: '99.97%' },
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
      { fieldName: 'server' },
      { fieldName: 'status' },
      { fieldName: 'cpu', dataType: ValueType.NUMBER },
      { fieldName: 'memory', dataType: ValueType.NUMBER },
      { fieldName: 'disk', dataType: ValueType.NUMBER },
      { fieldName: 'network', dataType: ValueType.NUMBER },
      { fieldName: 'response', dataType: ValueType.NUMBER },
      { fieldName: 'uptime' },
    ];
    dataProvider.setFields(fields);

    const columns = [
      { 
        name: 'server', fieldName: 'server', 
        header: { text: '서버명' }, 
        width: 140,
        styles: { textAlignment: 'near', font: 'bold' }
      },
      { 
        name: 'status', fieldName: 'status', 
        header: { text: '상태' }, 
        width: 80,
        styles: { textAlignment: 'center' }
      },
      { 
        name: 'cpu', fieldName: 'cpu', 
        header: { text: 'CPU (%)' }, 
        width: 100,
        styles: { textAlignment: 'far', suffix: '%' }
      },
      { 
        name: 'memory', fieldName: 'memory', 
        header: { text: 'Memory (%)' }, 
        width: 110,
        styles: { textAlignment: 'far', suffix: '%' }
      },
      { 
        name: 'disk', fieldName: 'disk', 
        header: { text: 'Disk (%)' }, 
        width: 100,
        styles: { textAlignment: 'far', suffix: '%' }
      },
      { 
        name: 'network', fieldName: 'network', 
        header: { text: 'Network (MB/s)' }, 
        width: 130,
        styles: { textAlignment: 'far', numberFormat: '#,##0' }
      },
      { 
        name: 'response', fieldName: 'response', 
        header: { text: 'Response (ms)' }, 
        width: 130,
        styles: { textAlignment: 'far', numberFormat: '#,##0' }
      },
      { 
        name: 'uptime', fieldName: 'uptime', 
        header: { text: 'Uptime' }, 
        width: 100,
        styles: { textAlignment: 'center' }
      },
    ];
    gridView.setColumns(columns);

    // 레이아웃 - 리소스 그룹핑
    const layout = [
      'server',
      'status',
      {
        name: 'resourceGroup',
        direction: ColumnLayoutDirection.HORIZONTAL,
        items: ['cpu', 'memory', 'disk'],
        header: { text: '📊 Resource Usage' }
      },
      {
        name: 'performanceGroup',
        direction: ColumnLayoutDirection.HORIZONTAL,
        items: ['network', 'response'],
        header: { text: '⚡ Performance' }
      },
      'uptime'
    ];
    gridView.setColumnLayout(layout);

    gridView.setDisplayOptions({
      columnMovable: true,
      columnResizable: true,
      rowHeight: 40
    });

    gridView.setHeader({ height: 55 });

    dataProvider.setRows(sampleData);

    return () => {
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Modern Dark Style CSS */}
      <style jsx global>{`
        /* ========================================
           🌙 Modern Dark Style
           ======================================== */
        
        .dark-grid {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }

        /* 그리드 루트 - 다크 배경 + 글로우 테두리 */
        .dark-grid .rg-root {
          background: #0f172a !important;
          border: 1px solid rgba(56, 189, 248, 0.3) !important;
          border-radius: 12px !important;
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.1), 
                      0 4px 20px rgba(0, 0, 0, 0.5) !important;
          overflow: hidden !important;
        }

        /* 헤더 - 그라디언트 다크 */
        .dark-grid .rg-header-bar {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
          border-bottom: 1px solid rgba(56, 189, 248, 0.2) !important;
        }

        .dark-grid .rg-header-text {
          color: #e2e8f0 !important;
          font-weight: 500 !important;
          font-size: 12px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }

        /* 그룹 헤더 - 네온 강조 */
        .dark-grid .rg-column-group-header {
          background: linear-gradient(180deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%) !important;
          border-bottom: 2px solid #38bdf8 !important;
        }

        .dark-grid .rg-column-group-header .rg-header-text {
          color: #38bdf8 !important;
          font-weight: 600 !important;
          font-size: 13px !important;
        }

        /* 데이터 셀 */
        .dark-grid .rg-data-cell {
          background: #0f172a !important;
          border-right: 1px solid rgba(148, 163, 184, 0.1) !important;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1) !important;
          padding: 10px 14px !important;
          font-size: 13px !important;
          color: #cbd5e1 !important;
        }

        /* 행 호버 - 글로우 효과 */
        .dark-grid .rg-data-row:hover .rg-data-cell {
          background: rgba(56, 189, 248, 0.08) !important;
          box-shadow: inset 0 0 20px rgba(56, 189, 248, 0.05) !important;
        }

        /* 선택된 행 */
        .dark-grid .rg-data-row.rg-select .rg-data-cell,
        .dark-grid .rg-data-cell.rg-select {
          background: rgba(56, 189, 248, 0.15) !important;
          border-color: rgba(56, 189, 248, 0.3) !important;
        }

        /* 인디케이터 */
        .dark-grid .rg-indicator {
          background: #1e293b !important;
          border-right: 1px solid rgba(148, 163, 184, 0.1) !important;
          color: #64748b !important;
          font-size: 11px !important;
        }

        /* 스크롤바 - 네온 스타일 */
        .dark-grid .rg-scrollbar-track {
          background: #1e293b !important;
        }

        .dark-grid .rg-scrollbar-thumb {
          background: linear-gradient(180deg, #38bdf8 0%, #0ea5e9 100%) !important;
          border-radius: 6px !important;
        }

        .dark-grid .rg-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7dd3fc 0%, #38bdf8 100%) !important;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.5) !important;
        }

        /* 숫자 셀 - tabular nums */
        .dark-grid .rg-data-cell {
          font-variant-numeric: tabular-nums !important;
        }
      `}</style>

      <div className="container mx-auto p-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/screens/grid-examples">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              스타일 갤러리
            </Button>
          </Link>
        </div>

        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <Moon className="w-6 h-6 text-cyan-400" />
              <div>
                <CardTitle className="text-xl text-white">🌙 Modern Dark Style</CardTitle>
                <p className="text-slate-400 text-sm mt-1">
                  다크 테마 - 눈의 피로를 줄이는 현대적인 디자인 | 서버 모니터링 대시보드
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-slate-900">
            {/* 검색 영역 */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-400">서버</span>
                <Input 
                  type="text" 
                  placeholder="검색..." 
                  className="w-40 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" 
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-400">상태</span>
                <select className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white">
                  <option>전체</option>
                  <option>정상</option>
                  <option>경고</option>
                  <option>위험</option>
                </select>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">
                <Search className="w-4 h-4 mr-2" />
                조회
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Download className="w-4 h-4 mr-2" />
                내보내기
              </Button>
            </div>

            {/* 그리드 컨테이너 */}
            <div className="dark-grid">
              <div 
                ref={gridContainerRef} 
                style={{ width: '100%', height: '450px' }}
              />
            </div>

            {/* 범례 */}
            <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="text-sm font-semibold mb-2 text-cyan-400">🌙 스타일 특징</h4>
              <ul className="text-xs text-slate-400 grid grid-cols-2 md:grid-cols-4 gap-2">
                <li>• 다크 배경 (#0f172a)</li>
                <li>• 네온 강조 색상</li>
                <li>• 글로우 테두리 효과</li>
                <li>• 모노스페이스 폰트</li>
                <li>• 호버 글로우</li>
                <li>• 네온 스크롤바</li>
                <li>• 그라디언트 헤더</li>
                <li>• 라운드 코너 (12px)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

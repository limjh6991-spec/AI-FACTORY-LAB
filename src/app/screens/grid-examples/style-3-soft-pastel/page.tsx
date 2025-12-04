'use client';

import { useEffect, useRef } from 'react';
import RealGrid, { GridView, LocalDataProvider } from 'realgrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, ArrowLeft, Palette } from 'lucide-react';
import Link from 'next/link';

/**
 * 🎨 Style 3: Soft Pastel
 * 
 * 파스텔톤 - 부드럽고 친근한 디자인
 * - 파스텔 컬러 팔레트
 * - 둥근 모서리
 * - 부드러운 그림자
 * - 아이콘 통합
 */
export default function SoftPastelStylePage() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<any>(null);
  const dataProviderRef = useRef<any>(null);

  // 샘플 데이터 - 고객 관리
  const sampleData = [
    { name: '김지영', grade: 'VIP', orders: 45, total: 2850000, lastOrder: '2025-12-01', points: 28500, status: '활성' },
    { name: '이민수', grade: 'Gold', orders: 32, total: 1920000, lastOrder: '2025-11-28', points: 19200, status: '활성' },
    { name: '박서연', grade: 'Silver', orders: 18, total: 890000, lastOrder: '2025-11-15', points: 8900, status: '활성' },
    { name: '최준호', grade: 'VIP', orders: 52, total: 3450000, lastOrder: '2025-12-02', points: 34500, status: '활성' },
    { name: '정하나', grade: 'Bronze', orders: 8, total: 320000, lastOrder: '2025-10-20', points: 3200, status: '휴면' },
    { name: '강도윤', grade: 'Gold', orders: 28, total: 1650000, lastOrder: '2025-11-30', points: 16500, status: '활성' },
    { name: '윤수빈', grade: 'Silver', orders: 15, total: 720000, lastOrder: '2025-11-25', points: 7200, status: '활성' },
    { name: '임태현', grade: 'VIP', orders: 61, total: 4120000, lastOrder: '2025-12-03', points: 41200, status: '활성' },
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
      { fieldName: 'name' },
      { fieldName: 'grade' },
      { fieldName: 'orders', dataType: 'number' },
      { fieldName: 'total', dataType: 'number' },
      { fieldName: 'lastOrder' },
      { fieldName: 'points', dataType: 'number' },
      { fieldName: 'status' },
    ];
    dataProvider.setFields(fields);

    const columns = [
      { 
        name: 'name', fieldName: 'name', 
        header: { text: '👤 고객명' }, 
        width: 100,
        styles: { textAlignment: 'center', font: 'bold' }
      },
      { 
        name: 'grade', fieldName: 'grade', 
        header: { text: '⭐ 등급' }, 
        width: 80,
        styles: { textAlignment: 'center' }
      },
      { 
        name: 'orders', fieldName: 'orders', 
        header: { text: '🛒 주문수' }, 
        width: 90,
        styles: { textAlignment: 'far', numberFormat: '#,##0', suffix: '건' }
      },
      { 
        name: 'total', fieldName: 'total', 
        header: { text: '💰 누적금액' }, 
        width: 130,
        styles: { textAlignment: 'far', numberFormat: '#,##0', suffix: '원' }
      },
      { 
        name: 'lastOrder', fieldName: 'lastOrder', 
        header: { text: '📅 최근주문' }, 
        width: 110,
        styles: { textAlignment: 'center' }
      },
      { 
        name: 'points', fieldName: 'points', 
        header: { text: '🎁 포인트' }, 
        width: 100,
        styles: { textAlignment: 'far', numberFormat: '#,##0', suffix: 'P' }
      },
      { 
        name: 'status', fieldName: 'status', 
        header: { text: '📌 상태' }, 
        width: 80,
        styles: { textAlignment: 'center' }
      },
    ];
    gridView.setColumns(columns);

    // 레이아웃 - 고객 정보 그룹핑
    const layout = [
      {
        name: 'customerInfo',
        direction: 'horizontal',
        items: ['name', 'grade'],
        header: { text: '🙋 고객 정보' }
      },
      {
        name: 'purchaseInfo',
        direction: 'horizontal',
        items: ['orders', 'total', 'lastOrder'],
        header: { text: '🛍️ 구매 정보' }
      },
      {
        name: 'benefitInfo',
        direction: 'horizontal',
        items: ['points', 'status'],
        header: { text: '✨ 혜택' }
      }
    ];
    gridView.setColumnLayout(layout);

    gridView.setDisplayOptions({
      columnMovable: true,
      columnResizable: true,
      rowHeight: 44
    });

    gridView.setHeader({ height: 55 });

    dataProvider.setRows(sampleData);

    return () => {
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Soft Pastel Style CSS */}
      <style jsx global>{`
        /* ========================================
           🎨 Soft Pastel Style
           ======================================== */
        
        .pastel-grid {
          font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* 그리드 루트 - 부드러운 그림자 */
        .pastel-grid .rg-root {
          background: #ffffff !important;
          border: none !important;
          border-radius: 16px !important;
          box-shadow: 0 10px 40px rgba(139, 92, 246, 0.1),
                      0 4px 16px rgba(236, 72, 153, 0.08) !important;
          overflow: hidden !important;
        }

        /* 헤더 - 파스텔 그라디언트 */
        .pastel-grid .rg-header-bar {
          background: linear-gradient(135deg, #fce7f3 0%, #ddd6fe 50%, #bfdbfe 100%) !important;
          border: none !important;
        }

        .pastel-grid .rg-header-text {
          color: #6b21a8 !important;
          font-weight: 600 !important;
          font-size: 13px !important;
        }

        /* 그룹 헤더 - 각 그룹별 파스텔 색상 */
        .pastel-grid .rg-column-group-header {
          background: linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%) !important;
          border: none !important;
          border-bottom: 2px solid #f0abfc !important;
        }

        .pastel-grid .rg-column-group-header .rg-header-text {
          color: #a21caf !important;
          font-weight: 700 !important;
          font-size: 14px !important;
        }

        /* 데이터 셀 */
        .pastel-grid .rg-data-cell {
          background: #ffffff !important;
          border-right: 1px solid #f5d0fe !important;
          border-bottom: 1px solid #f5d0fe !important;
          padding: 12px 14px !important;
          font-size: 13px !important;
          color: #581c87 !important;
          transition: all 0.2s ease !important;
        }

        /* 행 호버 - 부드러운 파스텔 */
        .pastel-grid .rg-data-row:hover .rg-data-cell {
          background: linear-gradient(90deg, #fdf4ff 0%, #faf5ff 100%) !important;
        }

        /* 선택된 행 */
        .pastel-grid .rg-data-row.rg-select .rg-data-cell,
        .pastel-grid .rg-data-cell.rg-select {
          background: linear-gradient(90deg, #fce7f3 0%, #ede9fe 100%) !important;
        }

        /* 인디케이터 */
        .pastel-grid .rg-indicator {
          background: linear-gradient(180deg, #fdf4ff 0%, #faf5ff 100%) !important;
          border-right: 1px solid #f5d0fe !important;
          color: #a855f7 !important;
          font-weight: 600 !important;
          font-size: 12px !important;
        }

        /* 스크롤바 - 파스텔 */
        .pastel-grid .rg-scrollbar-track {
          background: #fdf4ff !important;
        }

        .pastel-grid .rg-scrollbar-thumb {
          background: linear-gradient(180deg, #f0abfc 0%, #e879f9 100%) !important;
          border-radius: 8px !important;
        }

        .pastel-grid .rg-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e879f9 0%, #d946ef 100%) !important;
        }
      `}</style>

      <div className="container mx-auto p-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/screens/grid-examples">
            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              스타일 갤러리
            </Button>
          </Link>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-purple-500" />
              <div>
                <CardTitle className="text-xl text-purple-800">🎨 Soft Pastel Style</CardTitle>
                <p className="text-purple-600/70 text-sm mt-1">
                  파스텔톤 - 부드럽고 친근한 디자인 | 고객 관리 대시보드
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* 검색 영역 */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-purple-600">고객명</span>
                <Input 
                  type="text" 
                  placeholder="검색..." 
                  className="w-32 border-purple-200 focus:border-purple-400 focus:ring-purple-400" 
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-purple-600">등급</span>
                <select className="border border-purple-200 rounded-lg px-3 py-2 text-sm text-purple-700 focus:ring-purple-400">
                  <option>전체</option>
                  <option>VIP</option>
                  <option>Gold</option>
                  <option>Silver</option>
                  <option>Bronze</option>
                </select>
              </div>
              <Button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white">
                <Search className="w-4 h-4 mr-2" />
                조회
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                <Download className="w-4 h-4 mr-2" />
                내보내기
              </Button>
            </div>

            {/* 그리드 컨테이너 */}
            <div className="pastel-grid">
              <div 
                ref={gridContainerRef} 
                style={{ width: '100%', height: '450px' }}
              />
            </div>

            {/* 범례 */}
            <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-purple-100">
              <h4 className="text-sm font-semibold mb-2 text-purple-600">🎨 스타일 특징</h4>
              <ul className="text-xs text-purple-500 grid grid-cols-2 md:grid-cols-4 gap-2">
                <li>• 파스텔 그라디언트</li>
                <li>• 둥근 모서리 (16px)</li>
                <li>• 부드러운 그림자</li>
                <li>• 아이콘 헤더</li>
                <li>• 핑크-퍼플 팔레트</li>
                <li>• 트랜지션 효과</li>
                <li>• 글래스모피즘</li>
                <li>• 여유로운 패딩</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

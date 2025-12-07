'use client';

import { useEffect, useRef } from 'react';
import RealGrid, { GridView, LocalDataProvider, ValueType, ColumnLayoutDirection } from 'realgrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, ArrowLeft, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import Link from 'next/link';

/**
 * 📊 Style 4: Financial Dashboard
 * 
 * 금융/회계 스타일 - 숫자 중심의 전문적인 디자인
 * - 밀집 레이아웃
 * - 조건부 서식 (증가/감소)
 * - 소계/합계 강조
 * - 정확한 숫자 포맷팅
 */
export default function FinancialStylePage() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<any>(null);
  const dataProviderRef = useRef<any>(null);

  // 샘플 데이터 - 재무 데이터
  const sampleData = [
    { category: '매출', item: '제품매출', prev: 1250000000, curr: 1380000000, budget: 1400000000, yoy: 10.4, achieve: 98.6 },
    { category: '매출', item: '서비스매출', prev: 320000000, curr: 385000000, budget: 380000000, yoy: 20.3, achieve: 101.3 },
    { category: '매출', item: '기타매출', prev: 45000000, curr: 52000000, budget: 50000000, yoy: 15.6, achieve: 104.0 },
    { category: '매출원가', item: '재료비', prev: 580000000, curr: 620000000, budget: 650000000, yoy: 6.9, achieve: 95.4 },
    { category: '매출원가', item: '노무비', prev: 220000000, curr: 245000000, budget: 240000000, yoy: 11.4, achieve: 102.1 },
    { category: '매출원가', item: '경비', prev: 85000000, curr: 92000000, budget: 95000000, yoy: 8.2, achieve: 96.8 },
    { category: '판관비', item: '급여', prev: 180000000, curr: 195000000, budget: 200000000, yoy: 8.3, achieve: 97.5 },
    { category: '판관비', item: '임차료', prev: 36000000, curr: 36000000, budget: 36000000, yoy: 0.0, achieve: 100.0 },
    { category: '판관비', item: '광고비', prev: 48000000, curr: 65000000, budget: 60000000, yoy: 35.4, achieve: 108.3 },
    { category: '영업이익', item: '합계', prev: 166000000, curr: 264000000, budget: 249000000, yoy: 59.0, achieve: 106.0 },
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
      { fieldName: 'category' },
      { fieldName: 'item' },
      { fieldName: 'prev', dataType: ValueType.NUMBER },
      { fieldName: 'curr', dataType: ValueType.NUMBER },
      { fieldName: 'budget', dataType: ValueType.NUMBER },
      { fieldName: 'yoy', dataType: ValueType.NUMBER },
      { fieldName: 'achieve', dataType: ValueType.NUMBER },
    ];
    dataProvider.setFields(fields);

    const columns = [
      { 
        name: 'category', fieldName: 'category', 
        header: { text: '계정과목' }, 
        width: 100,
        styles: { textAlignment: 'center', font: 'bold', background: '#f0fdf4' },
        mergeRule: { criteria: 'value' }
      },
      { 
        name: 'item', fieldName: 'item', 
        header: { text: '세부항목' }, 
        width: 100,
        styles: { textAlignment: 'near' }
      },
      { 
        name: 'prev', fieldName: 'prev', 
        header: { text: '전기실적' }, 
        width: 130,
        styles: { textAlignment: 'far', numberFormat: '#,##0' }
      },
      { 
        name: 'curr', fieldName: 'curr', 
        header: { text: '당기실적' }, 
        width: 130,
        styles: { textAlignment: 'far', numberFormat: '#,##0', font: 'bold' }
      },
      { 
        name: 'budget', fieldName: 'budget', 
        header: { text: '예산' }, 
        width: 130,
        styles: { textAlignment: 'far', numberFormat: '#,##0' }
      },
      { 
        name: 'yoy', fieldName: 'yoy', 
        header: { text: '전년비(%)' }, 
        width: 100,
        styles: { textAlignment: 'far', numberFormat: '+#,##0.0;-#,##0.0;0.0', suffix: '%' }
      },
      { 
        name: 'achieve', fieldName: 'achieve', 
        header: { text: '달성률(%)' }, 
        width: 100,
        styles: { textAlignment: 'far', numberFormat: '#,##0.0', suffix: '%' }
      },
    ];
    gridView.setColumns(columns);

    // 레이아웃 - 금액/비율 그룹핑
    const layout = [
      'category',
      'item',
      {
        name: 'amountGroup',
        direction: ColumnLayoutDirection.HORIZONTAL,
        items: ['prev', 'curr', 'budget'],
        header: { text: '💵 금액 (단위: 원)' }
      },
      {
        name: 'ratioGroup',
        direction: ColumnLayoutDirection.HORIZONTAL,
        items: ['yoy', 'achieve'],
        header: { text: '📈 분석지표' }
      }
    ];
    gridView.setColumnLayout(layout);

    gridView.setDisplayOptions({
      columnMovable: true,
      columnResizable: true,
      rowHeight: 32
    });

    gridView.setHeader({ height: 48 });

    dataProvider.setRows(sampleData);

    return () => {
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Financial Style CSS */}
      <style jsx global>{`
        /* ========================================
           📊 Financial Dashboard Style
           ======================================== */
        
        .financial-grid {
          font-family: 'D2Coding', 'Consolas', 'Monaco', monospace;
        }

        /* 그리드 루트 - 견고한 외곽선 */
        .financial-grid .rg-root {
          background: #ffffff !important;
          border: 2px solid #059669 !important;
          border-radius: 4px !important;
          overflow: hidden !important;
        }

        /* 헤더 - 진한 그린 */
        .financial-grid .rg-header-bar {
          background: linear-gradient(180deg, #065f46 0%, #064e3b 100%) !important;
          border: none !important;
        }

        .financial-grid .rg-header-text {
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          letter-spacing: -0.2px !important;
        }

        /* 그룹 헤더 - 밝은 그린 */
        .financial-grid .rg-column-group-header {
          background: linear-gradient(180deg, #10b981 0%, #059669 100%) !important;
          border: none !important;
        }

        .financial-grid .rg-column-group-header .rg-header-text {
          color: #ffffff !important;
          font-weight: 800 !important;
          font-size: 13px !important;
        }

        /* 데이터 셀 - 밀집 레이아웃 */
        .financial-grid .rg-data-cell {
          background: #ffffff !important;
          border-right: 1px solid #d1d5db !important;
          border-bottom: 1px solid #d1d5db !important;
          padding: 6px 10px !important;
          font-size: 12px !important;
          color: #1f2937 !important;
          font-variant-numeric: tabular-nums !important;
        }

        /* 병합 셀 - 계정과목 강조 */
        .financial-grid .rg-merged-cell {
          background: #f0fdf4 !important;
          font-weight: 700 !important;
          color: #065f46 !important;
        }

        /* 행 호버 */
        .financial-grid .rg-data-row:hover .rg-data-cell {
          background: #ecfdf5 !important;
        }

        /* 선택된 행 */
        .financial-grid .rg-data-row.rg-select .rg-data-cell,
        .financial-grid .rg-data-cell.rg-select {
          background: #d1fae5 !important;
        }

        /* 인디케이터 */
        .financial-grid .rg-indicator {
          background: #f0fdf4 !important;
          border-right: 2px solid #059669 !important;
          color: #065f46 !important;
          font-weight: 600 !important;
          font-size: 11px !important;
        }

        /* 스크롤바 */
        .financial-grid .rg-scrollbar-track {
          background: #f3f4f6 !important;
        }

        .financial-grid .rg-scrollbar-thumb {
          background: #059669 !important;
          border-radius: 2px !important;
        }

        .financial-grid .rg-scrollbar-thumb:hover {
          background: #047857 !important;
        }

        /* 합계 행 강조 (마지막 행) */
        .financial-grid .rg-data-row:last-child .rg-data-cell {
          background: #fef3c7 !important;
          font-weight: 700 !important;
          border-top: 2px solid #d97706 !important;
        }
      `}</style>

      <div className="container mx-auto p-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/screens/grid-examples">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 hover:bg-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              스타일 갤러리
            </Button>
          </Link>
        </div>

        <Card className="bg-white shadow-lg border-t-4 border-t-emerald-600">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-emerald-600" />
                <div>
                  <CardTitle className="text-xl text-gray-800">📊 Financial Dashboard Style</CardTitle>
                  <p className="text-gray-500 text-sm mt-1">
                    금융/회계 스타일 - 숫자 중심의 전문적인 디자인 | 손익계산서
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>증가</span>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <TrendingDown className="w-4 h-4" />
                  <span>감소</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* 검색 영역 */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">회계연도</span>
                <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">기간</span>
                <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                  <option>12월 (누계)</option>
                  <option>4분기</option>
                  <option>3분기</option>
                </select>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Search className="w-4 h-4 mr-2" />
                조회
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
            </div>

            {/* 그리드 컨테이너 */}
            <div className="financial-grid">
              <div 
                ref={gridContainerRef} 
                style={{ width: '100%', height: '420px' }}
              />
            </div>

            {/* 범례 */}
            <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
              <h4 className="text-sm font-semibold mb-2 text-gray-700">📊 스타일 특징</h4>
              <ul className="text-xs text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-2">
                <li>• 밀집 레이아웃 (32px)</li>
                <li>• 모노스페이스 폰트</li>
                <li>• 셀 병합 (계정과목)</li>
                <li>• 숫자 포맷팅</li>
                <li>• 그린 컬러 스킴</li>
                <li>• 합계 행 강조</li>
                <li>• 견고한 테두리</li>
                <li>• 전년비/달성률 표시</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

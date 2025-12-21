'use client';

import { useEffect, useRef } from 'react';
import RealGrid, { GridView, LocalDataProvider, ValueType, ColumnLayoutDirection } from 'realgrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * 🏢 Style 1: Corporate Professional
 * 
 * 기업 표준 스타일 - 깔끔하고 절제된 디자인
 * - 블루/그레이 컬러 스킴
 * - 그라디언트 헤더
 * - 명확한 테두리와 구분선
 * - 2행 헤더 그룹핑
 * - 셀 병합 지원
 */
export default function CorporateStylePage() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<any>(null);
  const dataProviderRef = useRef<any>(null);

  // 샘플 데이터 - 판매 실적
  const sampleData = [
    { dept: '영업1팀', region: '서울', product: '노트북', q1Plan: 100, q1Actual: 95, q1Rate: 0.95, q2Plan: 120, q2Actual: 130, q2Rate: 1.08, q3Plan: 110, q3Actual: 105, q3Rate: 0.95, q4Plan: 150, q4Actual: 160, q4Rate: 1.07 },
    { dept: '영업1팀', region: '서울', product: '모니터', q1Plan: 80, q1Actual: 85, q1Rate: 1.06, q2Plan: 90, q2Actual: 88, q2Rate: 0.98, q3Plan: 85, q3Actual: 90, q3Rate: 1.06, q4Plan: 100, q4Actual: 105, q4Rate: 1.05 },
    { dept: '영업1팀', region: '부산', product: '노트북', q1Plan: 60, q1Actual: 58, q1Rate: 0.97, q2Plan: 70, q2Actual: 75, q2Rate: 1.07, q3Plan: 65, q3Actual: 62, q3Rate: 0.95, q4Plan: 80, q4Actual: 85, q4Rate: 1.06 },
    { dept: '영업2팀', region: '서울', product: '키보드', q1Plan: 200, q1Actual: 210, q1Rate: 1.05, q2Plan: 220, q2Actual: 215, q2Rate: 0.98, q3Plan: 210, q3Actual: 220, q3Rate: 1.05, q4Plan: 250, q4Actual: 260, q4Rate: 1.04 },
    { dept: '영업2팀', region: '대구', product: '마우스', q1Plan: 300, q1Actual: 280, q1Rate: 0.93, q2Plan: 320, q2Actual: 330, q2Rate: 1.03, q3Plan: 310, q3Actual: 300, q3Rate: 0.97, q4Plan: 350, q4Actual: 365, q4Rate: 1.04 },
    { dept: '영업3팀', region: '서울', product: '노트북', q1Plan: 90, q1Actual: 95, q1Rate: 1.06, q2Plan: 100, q2Actual: 98, q2Rate: 0.98, q3Plan: 95, q3Actual: 100, q3Rate: 1.05, q4Plan: 120, q4Actual: 125, q4Rate: 1.04 },
  ];

  useEffect(() => {
    if (!gridContainerRef.current) return;

    // RealGrid 라이센스 설정
    const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
    if (license) {
      RealGrid.setLicenseKey(license);
    }

    // DataProvider & GridView 초기화
    const dataProvider = new LocalDataProvider(false);
    const gridView = new GridView(gridContainerRef.current);
    gridView.setDataSource(dataProvider);

    gridViewRef.current = gridView;
    dataProviderRef.current = dataProvider;

    // 필드 정의
    const fields = [
      { fieldName: 'dept' },
      { fieldName: 'region' },
      { fieldName: 'product' },
      { fieldName: 'q1Plan', dataType: ValueType.NUMBER },
      { fieldName: 'q1Actual', dataType: ValueType.NUMBER },
      { fieldName: 'q1Rate', dataType: ValueType.NUMBER },
      { fieldName: 'q2Plan', dataType: ValueType.NUMBER },
      { fieldName: 'q2Actual', dataType: ValueType.NUMBER },
      { fieldName: 'q2Rate', dataType: ValueType.NUMBER },
      { fieldName: 'q3Plan', dataType: ValueType.NUMBER },
      { fieldName: 'q3Actual', dataType: ValueType.NUMBER },
      { fieldName: 'q3Rate', dataType: ValueType.NUMBER },
      { fieldName: 'q4Plan', dataType: ValueType.NUMBER },
      { fieldName: 'q4Actual', dataType: ValueType.NUMBER },
      { fieldName: 'q4Rate', dataType: ValueType.NUMBER },
    ];
    dataProvider.setFields(fields);

    // 컬럼 정의 - Corporate 스타일
    const columns = [
      { 
        name: 'dept', fieldName: 'dept', 
        header: { text: '부서' }, 
        width: 90,
        styles: { textAlignment: 'center', background: '#f8fafc' },
        mergeRule: { criteria: 'value' }
      },
      { 
        name: 'region', fieldName: 'region', 
        header: { text: '지역' }, 
        width: 70,
        styles: { textAlignment: 'center', background: '#f8fafc' },
        mergeRule: { criteria: 'prevvalues + value' }
      },
      { 
        name: 'product', fieldName: 'product', 
        header: { text: '제품' }, 
        width: 80,
        styles: { textAlignment: 'center' }
      },
      // Q1
      { name: 'q1Plan', fieldName: 'q1Plan', header: { text: '계획' }, width: 70, styles: { textAlignment: 'far', numberFormat: '#,##0' } },
      { name: 'q1Actual', fieldName: 'q1Actual', header: { text: '실적' }, width: 70, styles: { textAlignment: 'far', numberFormat: '#,##0' } },
      { name: 'q1Rate', fieldName: 'q1Rate', header: { text: '달성률' }, width: 70, styles: { textAlignment: 'far', numberFormat: '0.0%' } },
      // Q2
      { name: 'q2Plan', fieldName: 'q2Plan', header: { text: '계획' }, width: 70, styles: { textAlignment: 'far', numberFormat: '#,##0' } },
      { name: 'q2Actual', fieldName: 'q2Actual', header: { text: '실적' }, width: 70, styles: { textAlignment: 'far', numberFormat: '#,##0' } },
      { name: 'q2Rate', fieldName: 'q2Rate', header: { text: '달성률' }, width: 70, styles: { textAlignment: 'far', numberFormat: '0.0%' } },
      // Q3
      { name: 'q3Plan', fieldName: 'q3Plan', header: { text: '계획' }, width: 70, styles: { textAlignment: 'far', numberFormat: '#,##0' } },
      { name: 'q3Actual', fieldName: 'q3Actual', header: { text: '실적' }, width: 70, styles: { textAlignment: 'far', numberFormat: '#,##0' } },
      { name: 'q3Rate', fieldName: 'q3Rate', header: { text: '달성률' }, width: 70, styles: { textAlignment: 'far', numberFormat: '0.0%' } },
      // Q4
      { name: 'q4Plan', fieldName: 'q4Plan', header: { text: '계획' }, width: 70, styles: { textAlignment: 'far', numberFormat: '#,##0' } },
      { name: 'q4Actual', fieldName: 'q4Actual', header: { text: '실적' }, width: 70, styles: { textAlignment: 'far', numberFormat: '#,##0' } },
      { name: 'q4Rate', fieldName: 'q4Rate', header: { text: '달성률' }, width: 70, styles: { textAlignment: 'far', numberFormat: '0.0%' } },
    ];
    gridView.setColumns(columns);

    // 2행 헤더 레이아웃 - 분기별 그룹핑
    const layout = [
      'dept',
      'region', 
      'product',
      {
        name: 'q1Group',
        direction: ColumnLayoutDirection.HORIZONTAL,
        items: ['q1Plan', 'q1Actual', 'q1Rate'],
        header: { text: '1분기 (Q1)' }
      },
      {
        name: 'q2Group',
        direction: ColumnLayoutDirection.HORIZONTAL,
        items: ['q2Plan', 'q2Actual', 'q2Rate'],
        header: { text: '2분기 (Q2)' }
      },
      {
        name: 'q3Group',
        direction: ColumnLayoutDirection.HORIZONTAL,
        items: ['q3Plan', 'q3Actual', 'q3Rate'],
        header: { text: '3분기 (Q3)' }
      },
      {
        name: 'q4Group',
        direction: ColumnLayoutDirection.HORIZONTAL,
        items: ['q4Plan', 'q4Actual', 'q4Rate'],
        header: { text: '4분기 (Q4)' }
      }
    ];
    gridView.setColumnLayout(layout);

    // 그리드 옵션
    gridView.setDisplayOptions({
      columnMovable: true,
      columnResizable: true,
      rowHeight: 36
    });

    gridView.setHeader({ height: 50 });

    // 데이터 로드
    dataProvider.setRows(sampleData);

    return () => {
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Corporate Style CSS */}
      <style jsx global>{`
        /* ========================================
           🏢 Corporate Professional Style
           ======================================== */
        
        .corporate-grid {
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }

        /* 헤더 - 그라디언트 블루 */
        .corporate-grid .rg-header-bar {
          background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%) !important;
          border: none !important;
        }

        .corporate-grid .rg-header-text {
          color: #ffffff !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          letter-spacing: -0.3px !important;
        }

        /* 그룹 헤더 - 밝은 블루 */
        .corporate-grid .rg-column-group-header {
          background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%) !important;
          border: none !important;
          border-right: 1px solid rgba(255,255,255,0.2) !important;
        }

        .corporate-grid .rg-column-group-header .rg-header-text {
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 14px !important;
        }

        /* 데이터 셀 */
        .corporate-grid .rg-data-cell {
          border-right: 1px solid #e2e8f0 !important;
          border-bottom: 1px solid #e2e8f0 !important;
          padding: 8px 12px !important;
          font-size: 13px !important;
          color: #334155 !important;
        }

        /* 병합 셀 배경 */
        .corporate-grid .rg-merged-cell {
          background: #f1f5f9 !important;
          font-weight: 600 !important;
        }

        /* 숫자 셀 */
        .corporate-grid .rg-data-cell[data-field*="Plan"],
        .corporate-grid .rg-data-cell[data-field*="Actual"] {
          font-variant-numeric: tabular-nums !important;
          font-weight: 500 !important;
        }

        /* 행 호버 */
        .corporate-grid .rg-data-row:hover {
          background: rgba(59, 130, 246, 0.06) !important;
        }

        /* 선택된 행 */
        .corporate-grid .rg-data-row.rg-select,
        .corporate-grid .rg-data-cell.rg-select {
          background: rgba(59, 130, 246, 0.12) !important;
        }

        /* 인디케이터 */
        .corporate-grid .rg-indicator {
          background: #f8fafc !important;
          border-right: 1px solid #e2e8f0 !important;
          color: #64748b !important;
          font-weight: 500 !important;
          font-size: 12px !important;
        }

        /* 스크롤바 */
        .corporate-grid .rg-scrollbar-thumb {
          background: #94a3b8 !important;
          border-radius: 4px !important;
        }

        .corporate-grid .rg-scrollbar-thumb:hover {
          background: #64748b !important;
        }

        /* 그리드 외곽선 */
        .corporate-grid .rg-root {
          border: 1px solid #cbd5e1 !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }
      `}</style>

      <div className="container mx-auto p-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/screens/grid-examples">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              스타일 갤러리
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-xl">🏢 Corporate Professional Style</CardTitle>
            <p className="text-blue-100 text-sm mt-1">
              기업 표준 스타일 - 깔끔하고 절제된 디자인 | 분기별 판매 실적 리포트
            </p>
          </CardHeader>
          <CardContent className="p-6">
            {/* 검색 영역 */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">연도</span>
                <Input type="text" defaultValue="2025" className="w-20" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">부서</span>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>전체</option>
                  <option>영업1팀</option>
                  <option>영업2팀</option>
                  <option>영업3팀</option>
                </select>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                조회
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                엑셀 다운로드
              </Button>
            </div>

            {/* 그리드 컨테이너 */}
            <div className="corporate-grid">
              <div 
                ref={gridContainerRef} 
                style={{ width: '100%', height: '450px' }}
              />
            </div>

            {/* 범례 */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold mb-2">📊 스타일 특징</h4>
              <ul className="text-xs text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-2">
                <li>• 블루 그라디언트 헤더</li>
                <li>• 2행 헤더 그룹핑 (분기별)</li>
                <li>• 셀 병합 (부서/지역)</li>
                <li>• 숫자 포맷팅 (#,##0)</li>
                <li>• 깔끔한 테두리</li>
                <li>• 호버/선택 효과</li>
                <li>• 커스텀 스크롤바</li>
                <li>• 라운드 코너</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

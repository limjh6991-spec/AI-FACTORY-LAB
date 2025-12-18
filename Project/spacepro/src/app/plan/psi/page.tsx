/**
 * PSI 생산 계획 수립 화면 (AG Grid 기반)
 * Production, Sales, Inventory 통합 계획
 */

'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    Save, Download, RefreshCw, Calculator, Sparkles,
    AlertTriangle, CheckCircle, BarChart3, Package, Factory
} from 'lucide-react';

// AG Grid v35+ 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    gray100: '#F5F8FA',
    gray200: '#EFF2F5',
    gray300: '#E4E6EF',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
    gray700: '#5E6278',
    gray800: '#3F4254',
    gray900: '#181C32',
};

// 초기 데이터 (TB_PSI_PLAN에서 가져온 것으로 가정)
const initialRowData = [
    { id: 1, itemGroup: 'A제품군', itemCode: 'HSG-001', itemName: '하우징-001', basicStock: 500, safetyStock: 200, salesPlan: 1000, dueDate: '01-25' },
    { id: 2, itemGroup: 'A제품군', itemCode: 'HSG-002', itemName: '하우징-002', basicStock: 100, safetyStock: 200, salesPlan: 1000, dueDate: '01-20' },
    { id: 3, itemGroup: 'B제품군', itemCode: 'BRK-A05', itemName: '브라켓-A05', basicStock: 0, safetyStock: 500, salesPlan: 2000, dueDate: '01-28' },
    { id: 4, itemGroup: 'B제품군', itemCode: 'BRK-B10', itemName: '브라켓-B10', basicStock: 1200, safetyStock: 300, salesPlan: 800, dueDate: '01-22' },
    { id: 5, itemGroup: 'C제품군', itemCode: 'CVR-001', itemName: '커버-001', basicStock: 800, safetyStock: 400, salesPlan: 2500, dueDate: '01-30' },
    { id: 6, itemGroup: 'C제품군', itemCode: 'CVR-002', itemName: '커버-002', basicStock: 300, safetyStock: 250, salesPlan: 1500, dueDate: '01-18' },
];

export default function PSIProductionPlan() {
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState(initialRowData);
    const [planMonth] = useState('2025-01');

    // 컬럼 정의
    const columnDefs = useMemo(() => [
        {
            headerName: '품목군',
            field: 'itemGroup',
            width: 100,
            pinned: 'left' as const,
            cellStyle: { backgroundColor: colors.gray100 }
        },
        {
            headerName: '품목코드',
            field: 'itemCode',
            width: 110,
            pinned: 'left' as const,
            cellStyle: { fontWeight: '600' }
        },
        {
            headerName: '품목명',
            field: 'itemName',
            width: 130,
            pinned: 'left' as const,
        },
        {
            headerName: '기초 재고',
            field: 'basicStock',
            width: 100,
            type: 'numericColumn',
            cellStyle: { backgroundColor: colors.gray100, textAlign: 'right' },
            valueFormatter: (params: any) => params.value?.toLocaleString() || '0'
        },
        {
            headerName: '안전 재고',
            field: 'safetyStock',
            width: 100,
            type: 'numericColumn',
            cellStyle: { textAlign: 'right' },
            valueFormatter: (params: any) => params.value?.toLocaleString() || '0'
        },
        {
            headerName: '판매 계획 (입력)',
            field: 'salesPlan',
            width: 140,
            editable: true,
            type: 'numericColumn',
            cellEditor: 'agNumberCellEditor',
            cellStyle: {
                border: '2px solid #3699FF',
                backgroundColor: '#EBF4FF',
                textAlign: 'right',
                fontWeight: '600',
                color: colors.primary
            },
            valueFormatter: (params: any) => params.value?.toLocaleString() || '0',
            valueParser: (params: any) => Number(params.newValue)
        },
        {
            headerName: '납기',
            field: 'dueDate',
            width: 80,
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName: '생산 지시량 (자동계산)',
            colId: 'productionQty',
            width: 170,
            type: 'numericColumn',
            // 핵심 로직: 판매계획 - 기초재고 + 안전재고 (음수면 0)
            valueGetter: (params: any) => {
                const required = params.data.salesPlan - params.data.basicStock + params.data.safetyStock;
                return required > 0 ? required : 0;
            },
            valueFormatter: (params: any) => params.value?.toLocaleString() || '0',
            // 조건부 서식: 1000개 초과 시 경고
            cellStyle: (params: any) => {
                if (params.value > 1000) {
                    return {
                        backgroundColor: '#FEE2E2',
                        color: '#DC2626',
                        fontWeight: 'bold',
                        textAlign: 'right'
                    };
                }
                return {
                    backgroundColor: '#DCFCE7',
                    color: '#166534',
                    fontWeight: 'bold',
                    textAlign: 'right'
                };
            }
        },
        {
            headerName: '기말 재고',
            colId: 'endStock',
            width: 100,
            type: 'numericColumn',
            valueGetter: (params: any) => {
                const productionQty = Math.max(0, params.data.salesPlan - params.data.basicStock + params.data.safetyStock);
                return params.data.basicStock + productionQty - params.data.salesPlan;
            },
            valueFormatter: (params: any) => params.value?.toLocaleString() || '0',
            cellStyle: { textAlign: 'right', color: colors.info, fontWeight: '600' }
        },
    ], []);

    // 기본 컬럼 설정
    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
    }), []);

    // 셀 값 변경 이벤트
    const onCellValueChanged = useCallback((params: any) => {
        console.log(`[Log] ${params.data.itemCode}의 판매계획: ${params.oldValue} → ${params.newValue}`);
        // 백엔드 API 호출 위치
        // axios.post('/api/plan/update', params.data);

        // 자동 계산 컬럼 갱신
        params.api.refreshCells({ force: true });
    }, []);

    // 합계 계산
    const totals = useMemo(() => {
        return rowData.reduce((acc, row) => {
            const productionQty = Math.max(0, row.salesPlan - row.basicStock + row.safetyStock);
            return {
                basicStock: acc.basicStock + row.basicStock,
                salesPlan: acc.salesPlan + row.salesPlan,
                productionQty: acc.productionQty + productionQty,
                endStock: acc.endStock + (row.basicStock + productionQty - row.salesPlan),
            };
        }, { basicStock: 0, salesPlan: 0, productionQty: 0, endStock: 0 });
    }, [rowData]);

    // Excel 내보내기
    const exportToExcel = useCallback(() => {
        gridRef.current?.api.exportDataAsCsv({
            fileName: `PSI_계획_${planMonth}.csv`,
        });
    }, [planMonth]);

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                            <Factory className="w-6 h-6" style={{ color: colors.primary }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>
                                🏭 SpacePro 생산 계획 수립 (PSI)
                            </h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>
                                AG Grid 기반 실시간 계획 편집
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.info + '15', color: colors.info }}
                        >
                            <Sparkles className="w-4 h-4" />
                            AI 최적화
                        </button>
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.success + '15', color: colors.success }}
                        >
                            <Download className="w-4 h-4" />
                            Excel
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: colors.primary }}
                        >
                            <Save className="w-4 h-4" />
                            저장
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { label: '기초 재고 합계', value: totals.basicStock.toLocaleString(), icon: Package, color: colors.gray600 },
                        { label: '판매 계획 합계', value: totals.salesPlan.toLocaleString(), icon: BarChart3, color: colors.primary },
                        { label: '생산 지시량 합계', value: totals.productionQty.toLocaleString(), icon: Factory, color: colors.success },
                        { label: '기말 재고 합계', value: totals.endStock.toLocaleString(), icon: CheckCircle, color: colors.info },
                    ].map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <div key={i} className="p-4 rounded-xl" style={{ background: colors.gray100 }}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium" style={{ color: colors.gray500 }}>{card.label}</span>
                                    <Icon className="w-4 h-4" style={{ color: card.color }} />
                                </div>
                                <span className="text-xl font-bold" style={{ color: card.color }}>{card.value}</span>
                                <span className="text-sm ml-1" style={{ color: colors.gray500 }}>EA</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* AG Grid */}
            <div className="bg-white rounded-xl p-4 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div
                    className="ag-theme-alpine"
                    style={{ height: 400, width: '100%' }}
                >
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onCellValueChanged={onCellValueChanged}
                        animateRows={true}
                        rowSelection="single"
                        suppressRowClickSelection={true}
                    />
                </div>
            </div>

            {/* Guide Section */}
            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: colors.gray800 }}>
                    💡 기능 가이드
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                        <h4 className="font-semibold text-sm mb-2" style={{ color: colors.primary }}>✏️ 데이터 편집</h4>
                        <ul className="list-disc list-inside text-sm space-y-1" style={{ color: colors.gray600 }}>
                            <li><strong>파란색 셀(판매 계획)</strong>을 더블 클릭하여 숫자를 수정하세요.</li>
                            <li>수정 후 Enter를 치면 <strong>생산 지시량이 즉시 자동 계산</strong>됩니다.</li>
                        </ul>
                    </div>
                    <div className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                        <h4 className="font-semibold text-sm mb-2" style={{ color: colors.danger }}>⚠️ 조건부 서식</h4>
                        <ul className="list-disc list-inside text-sm space-y-1" style={{ color: colors.gray600 }}>
                            <li>생산량이 <strong>1,000개 초과</strong> 시 빨간색 경고 배경이 표시됩니다.</li>
                            <li>정상 범위는 <strong>녹색 배경</strong>으로 표시됩니다.</li>
                        </ul>
                    </div>
                </div>

                {/* Formula */}
                <div className="mt-4 p-4 rounded-lg" style={{ background: colors.info + '10', border: `1px solid ${colors.info}30` }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-5 h-5" style={{ color: colors.info }} />
                        <span className="font-semibold text-sm" style={{ color: colors.info }}>생산 지시량 산출 공식</span>
                    </div>
                    <code className="text-sm px-3 py-1 rounded" style={{ background: colors.gray200, color: colors.gray700 }}>
                        생산 지시량 = MAX(0, 판매 계획 - 기초 재고 + 안전 재고)
                    </code>
                </div>
            </div>
        </div>
    );
}

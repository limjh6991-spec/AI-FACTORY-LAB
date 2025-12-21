'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import RealGrid, { GridView, LocalDataProvider, ValueType } from 'realgrid';
import 'realgrid/dist/realgrid-style.css';
import { cn } from '~/lib/utils';

/**
 * RealGrid 샘플 화면
 * 난이도별 5개 탭으로 구성된 RealGrid 학습용 샘플
 */
export default function RealGridSamplesPage() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 'basic', label: '기본 그리드', icon: '📊', level: '★☆☆' },
        { id: 'edit', label: '편집 기능', icon: '✏️', level: '★★☆' },
        { id: 'layout', label: '컬럼 레이아웃', icon: '📐', level: '★★☆' },
        { id: 'merge', label: '셀 병합', icon: '🔗', level: '★★☆' },
        { id: 'combined', label: '통합 예제', icon: '⭐', level: '★★★' },
    ];

    return (
        <div className="flex flex-col h-full p-6 bg-white">
            {/* 헤더 */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">🎨 RealGrid 샘플</h1>
                <p className="text-sm text-gray-500 mt-1">난이도별 RealGrid 기능을 학습할 수 있는 샘플입니다.</p>
            </div>

            {/* 탭 네비게이션 */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-1">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(index)}
                            className={cn(
                                "px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px",
                                activeTab === index
                                    ? "border-blue-500 text-blue-600 bg-blue-50"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                            <span className="ml-2 text-xs opacity-60">{tab.level}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="flex-1 min-h-0">
                {activeTab === 0 && <BasicGridTab />}
                {activeTab === 1 && <EditFeaturesTab />}
                {activeTab === 2 && <ColumnLayoutTab />}
                {activeTab === 3 && <CellMergingTab />}
                {activeTab === 4 && <CombinedExampleTab />}
            </div>
        </div>
    );
}

// ============================================================================
// Tab 1: 기본 그리드 (★☆☆)
// ============================================================================
function BasicGridTab() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridViewRef = useRef<GridView | null>(null);
    const providerRef = useRef<LocalDataProvider | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
        if (license) RealGrid.setLicenseKey(license);

        const provider = new LocalDataProvider(false);
        const gridView = new GridView(containerRef.current);
        gridView.setDataSource(provider);

        // 필드 정의
        provider.setFields([
            { fieldName: 'orderId', dataType: ValueType.TEXT },
            { fieldName: 'customerName', dataType: ValueType.TEXT },
            { fieldName: 'productName', dataType: ValueType.TEXT },
            { fieldName: 'quantity', dataType: ValueType.NUMBER },
            { fieldName: 'unitPrice', dataType: ValueType.NUMBER },
            { fieldName: 'orderDate', dataType: ValueType.TEXT },
        ]);

        // 컬럼 정의
        gridView.setColumns([
            { name: 'orderId', fieldName: 'orderId', header: { text: '주문번호' }, width: 100 },
            { name: 'customerName', fieldName: 'customerName', header: { text: '고객명' }, width: 120 },
            { name: 'productName', fieldName: 'productName', header: { text: '상품명' }, width: 150 },
            { name: 'quantity', fieldName: 'quantity', header: { text: '수량' }, width: 80, numberFormat: '#,##0', styles: { textAlignment: 'far' } },
            { name: 'unitPrice', fieldName: 'unitPrice', header: { text: '단가' }, width: 100, numberFormat: '#,##0', styles: { textAlignment: 'far' } },
            { name: 'orderDate', fieldName: 'orderDate', header: { text: '주문일' }, width: 100 },
        ]);

        // 샘플 데이터
        provider.setRows([
            { orderId: 'ORD001', customerName: '김철수', productName: '노트북 Pro', quantity: 2, unitPrice: 1500000, orderDate: '2025-01-05' },
            { orderId: 'ORD002', customerName: '이영희', productName: '마우스 무선', quantity: 5, unitPrice: 35000, orderDate: '2025-01-06' },
            { orderId: 'ORD003', customerName: '박민수', productName: '모니터 27인치', quantity: 1, unitPrice: 450000, orderDate: '2025-01-07' },
            { orderId: 'ORD004', customerName: '정수진', productName: '키보드 기계식', quantity: 3, unitPrice: 89000, orderDate: '2025-01-08' },
            { orderId: 'ORD005', customerName: '한지민', productName: '웹캠 HD', quantity: 2, unitPrice: 65000, orderDate: '2025-01-09' },
        ]);

        // 그리드 옵션
        gridView.setDisplayOptions({ fitStyle: 'fill', rowHeight: 36 });
        gridView.setHeader({ height: 40 });

        gridViewRef.current = gridView;
        providerRef.current = provider;

        return () => {
            gridView.destroy();
            provider.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-blue-800">💡 기본 그리드</h3>
                <p className="text-sm text-blue-600 mt-1">
                    필드와 컬럼을 정의하고, setRows()로 데이터를 바인딩하는 가장 기본적인 예제입니다.
                </p>
            </div>
            <div ref={containerRef} className="flex-1 min-h-[400px] border border-gray-200 rounded" />
        </div>
    );
}

// ============================================================================
// Tab 2: 편집 기능 (★★☆)
// ============================================================================
function EditFeaturesTab() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridViewRef = useRef<GridView | null>(null);
    const providerRef = useRef<LocalDataProvider | null>(null);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        if (!containerRef.current) return;

        const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
        if (license) RealGrid.setLicenseKey(license);

        const provider = new LocalDataProvider(false);
        const gridView = new GridView(containerRef.current);
        gridView.setDataSource(provider);

        provider.setFields([
            { fieldName: 'id', dataType: ValueType.NUMBER },
            { fieldName: 'name', dataType: ValueType.TEXT },
            { fieldName: 'department', dataType: ValueType.TEXT },
            { fieldName: 'position', dataType: ValueType.TEXT },
            { fieldName: 'salary', dataType: ValueType.NUMBER },
        ]);

        gridView.setColumns([
            { name: 'id', fieldName: 'id', header: { text: 'ID' }, width: 60, editable: false },
            { name: 'name', fieldName: 'name', header: { text: '이름' }, width: 100 },
            { name: 'department', fieldName: 'department', header: { text: '부서' }, width: 120 },
            { name: 'position', fieldName: 'position', header: { text: '직책' }, width: 100 },
            { name: 'salary', fieldName: 'salary', header: { text: '급여' }, width: 120, numberFormat: '#,##0', styles: { textAlignment: 'far' } },
        ]);

        provider.setRows([
            { id: 1, name: '홍길동', department: '개발팀', position: '과장', salary: 5500000 },
            { id: 2, name: '김영수', department: '기획팀', position: '대리', salary: 4200000 },
            { id: 3, name: '이민정', department: '디자인팀', position: '사원', salary: 3800000 },
        ]);

        // 편집 옵션 설정
        gridView.setEditOptions({
            editable: true,
            insertable: true,
            deletable: true,
            editWhenFocused: true,
            commitByCell: true,
        });

        // 상태바 & 체크바
        gridView.setStateBar({ visible: true });
        gridView.setCheckBar({ visible: true });
        gridView.setDisplayOptions({ fitStyle: 'fill', rowHeight: 36 });
        gridView.setHeader({ height: 40 });

        gridViewRef.current = gridView;
        providerRef.current = provider;

        return () => {
            gridView.destroy();
            provider.destroy();
        };
    }, []);

    const handleAddRow = useCallback(() => {
        if (providerRef.current) {
            const newId = providerRef.current.getRowCount() + 1;
            providerRef.current.insertRow(0, { id: newId, name: '', department: '', position: '', salary: 0 });
            setStatusMessage('새 행이 추가되었습니다.');
        }
    }, []);

    const handleDeleteChecked = useCallback(() => {
        if (!gridViewRef.current || !providerRef.current) return;
        const checkedRows = gridViewRef.current.getCheckedRows();
        if (checkedRows.length === 0) {
            setStatusMessage('삭제할 행을 선택해주세요.');
            return;
        }
        checkedRows.sort((a, b) => b - a).forEach(row => providerRef.current?.removeRow(row));
        setStatusMessage(`${checkedRows.length}개 행이 삭제되었습니다.`);
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-green-800">✏️ 편집 기능</h3>
                <p className="text-sm text-green-600 mt-1">
                    setEditOptions()로 편집을 활성화하고, 상태바(StateBar)로 행 상태를 확인합니다.
                </p>
            </div>

            {/* 툴바 */}
            <div className="flex gap-2 mb-4">
                <button onClick={handleAddRow} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                    + 행 추가
                </button>
                <button onClick={handleDeleteChecked} className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                    선택 삭제
                </button>
                {statusMessage && (
                    <span className="ml-auto text-sm text-gray-500 self-center">{statusMessage}</span>
                )}
            </div>

            <div ref={containerRef} className="flex-1 min-h-[400px] border border-gray-200 rounded" />
        </div>
    );
}

// ============================================================================
// Tab 3: 컬럼 레이아웃 (★★☆)
// ============================================================================
function ColumnLayoutTab() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridViewRef = useRef<GridView | null>(null);
    const providerRef = useRef<LocalDataProvider | null>(null);
    const [currentLayout, setCurrentLayout] = useState('기본');

    useEffect(() => {
        if (!containerRef.current) return;

        const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
        if (license) RealGrid.setLicenseKey(license);

        const provider = new LocalDataProvider(false);
        const gridView = new GridView(containerRef.current);
        gridView.setDataSource(provider);

        provider.setFields([
            { fieldName: 'orderId', dataType: ValueType.TEXT },
            { fieldName: 'customerId', dataType: ValueType.TEXT },
            { fieldName: 'country', dataType: ValueType.TEXT },
            { fieldName: 'companyName', dataType: ValueType.TEXT },
            { fieldName: 'employeeId', dataType: ValueType.TEXT },
            { fieldName: 'orderDate', dataType: ValueType.TEXT },
            { fieldName: 'phone', dataType: ValueType.TEXT },
        ]);

        gridView.setColumns([
            { name: 'orderId', fieldName: 'orderId', header: { text: 'Order ID' }, width: 100 },
            { name: 'customerId', fieldName: 'customerId', header: { text: 'Customer ID' }, width: 100 },
            { name: 'country', fieldName: 'country', header: { text: 'Country' }, width: 100 },
            { name: 'companyName', fieldName: 'companyName', header: { text: 'Company Name' }, width: 150 },
            { name: 'employeeId', fieldName: 'employeeId', header: { text: 'Employee ID' }, width: 100 },
            { name: 'orderDate', fieldName: 'orderDate', header: { text: 'Order Date' }, width: 100 },
            { name: 'phone', fieldName: 'phone', header: { text: 'Phone' }, width: 120 },
        ]);

        provider.setRows([
            { orderId: '10248', customerId: 'VINET', country: 'France', companyName: 'Vins et alcools', employeeId: 'E001', orderDate: '2025-01-05', phone: '01-234-5678' },
            { orderId: '10249', customerId: 'TOMSP', country: 'Germany', companyName: 'Toms Spezialitäten', employeeId: 'E002', orderDate: '2025-01-06', phone: '02-345-6789' },
            { orderId: '10250', customerId: 'HANAR', country: 'Brazil', companyName: 'Hanari Carnes', employeeId: 'E003', orderDate: '2025-01-08', phone: '03-456-7890' },
            { orderId: '10251', customerId: 'VICTE', country: 'France', companyName: 'Victuailles en stock', employeeId: 'E004', orderDate: '2025-01-10', phone: '04-567-8901' },
        ]);

        gridView.setDisplayOptions({ fitStyle: 'fill', rowHeight: 36 });
        gridView.setHeader({ height: 40 });

        gridViewRef.current = gridView;
        providerRef.current = provider;

        return () => {
            gridView.destroy();
            provider.destroy();
        };
    }, []);

    const applyLayout = useCallback((type: string) => {
        if (!gridViewRef.current) return;

        let layout: any[];
        switch (type) {
            case 'horizontal':
                layout = [
                    'orderId', 'customerId',
                    { name: 'companyGroup', direction: 'horizontal', items: ['country', 'companyName'], header: { text: 'Company Info' } },
                    'employeeId', 'orderDate', 'phone'
                ];
                setCurrentLayout('가로 그룹');
                break;
            case 'vertical':
                layout = [
                    'orderId', 'customerId',
                    { name: 'companyGroup', direction: 'vertical', width: 250, items: ['country', 'companyName'], header: { text: 'Company Info' } },
                    'employeeId', 'orderDate', 'phone'
                ];
                setCurrentLayout('세로 그룹');
                break;
            case 'nested':
                layout = [
                    { name: 'orderGroup', direction: 'horizontal', items: ['orderId', 'customerId'], header: { text: 'Order Info' } },
                    { name: 'companyGroup', direction: 'vertical', width: 250, items: ['country', 'companyName'], header: { text: 'Company Info' } },
                    'employeeId', 'orderDate', 'phone'
                ];
                setCurrentLayout('중첩 그룹');
                break;
            default:
                layout = ['orderId', 'customerId', 'country', 'companyName', 'employeeId', 'orderDate', 'phone'];
                setCurrentLayout('기본');
        }
        gridViewRef.current.setColumnLayout(layout);
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-purple-800">📐 컬럼 레이아웃</h3>
                <p className="text-sm text-purple-600 mt-1">
                    setColumnLayout()으로 다층 헤더를 구성합니다. 가로/세로 그룹핑이 가능합니다.
                </p>
            </div>

            <div className="flex gap-2 mb-4 items-center">
                <button onClick={() => applyLayout('default')} className="px-3 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600">기본</button>
                <button onClick={() => applyLayout('horizontal')} className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">가로 그룹</button>
                <button onClick={() => applyLayout('vertical')} className="px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">세로 그룹</button>
                <button onClick={() => applyLayout('nested')} className="px-3 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">중첩 그룹</button>
                <span className="ml-auto text-sm font-medium text-gray-600">현재: {currentLayout}</span>
            </div>

            <div ref={containerRef} className="flex-1 min-h-[400px] border border-gray-200 rounded" />
        </div>
    );
}

// ============================================================================
// Tab 4: 셀 병합 (★★☆)
// ============================================================================
function CellMergingTab() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridViewRef = useRef<GridView | null>(null);
    const providerRef = useRef<LocalDataProvider | null>(null);
    const [mergeType, setMergeType] = useState('없음');

    useEffect(() => {
        if (!containerRef.current) return;

        const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
        if (license) RealGrid.setLicenseKey(license);

        const provider = new LocalDataProvider(false);
        const gridView = new GridView(containerRef.current);
        gridView.setDataSource(provider);

        provider.setFields([
            { fieldName: 'year', dataType: ValueType.TEXT },
            { fieldName: 'quarter', dataType: ValueType.TEXT },
            { fieldName: 'month', dataType: ValueType.TEXT },
            { fieldName: 'sales', dataType: ValueType.NUMBER },
        ]);

        gridView.setColumns([
            { name: 'year', fieldName: 'year', header: { text: '연도' }, width: 80 },
            { name: 'quarter', fieldName: 'quarter', header: { text: '분기' }, width: 80 },
            { name: 'month', fieldName: 'month', header: { text: '월' }, width: 80 },
            { name: 'sales', fieldName: 'sales', header: { text: '매출' }, width: 120, numberFormat: '#,##0', styles: { textAlignment: 'far' } },
        ]);

        provider.setRows([
            { year: '2025', quarter: 'Q1', month: '1월', sales: 10000000 },
            { year: '2025', quarter: 'Q1', month: '2월', sales: 12000000 },
            { year: '2025', quarter: 'Q1', month: '3월', sales: 15000000 },
            { year: '2025', quarter: 'Q2', month: '4월', sales: 18000000 },
            { year: '2025', quarter: 'Q2', month: '5월', sales: 20000000 },
            { year: '2025', quarter: 'Q2', month: '6월', sales: 22000000 },
            { year: '2024', quarter: 'Q1', month: '1월', sales: 8000000 },
            { year: '2024', quarter: 'Q1', month: '2월', sales: 9000000 },
        ]);

        gridView.setDisplayOptions({ fitStyle: 'fill', rowHeight: 36 });
        gridView.setHeader({ height: 40 });

        gridViewRef.current = gridView;
        providerRef.current = provider;

        return () => {
            gridView.destroy();
            provider.destroy();
        };
    }, []);

    const applyMerge = useCallback((type: string) => {
        if (!gridViewRef.current) return;
        const gv = gridViewRef.current;

        switch (type) {
            case 'basic':
                gv.columnByName('year').mergeRule = { criteria: 'value' };
                gv.columnByName('quarter').mergeRule = { criteria: 'value' };
                gv.columnByName('month').mergeRule = { criteria: 'value' };
                setMergeType('기본 병합');
                break;
            case 'hierarchical':
                gv.columnByName('year').mergeRule = { criteria: 'value' };
                gv.columnByName('quarter').mergeRule = { criteria: 'prevvalues + value' };
                gv.columnByName('month').mergeRule = { criteria: 'prevvalues + value' };
                setMergeType('계층적 병합');
                break;
            default:
                gv.columnByName('year').mergeRule = null;
                gv.columnByName('quarter').mergeRule = null;
                gv.columnByName('month').mergeRule = null;
                setMergeType('없음');
        }
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-orange-800">🔗 셀 병합</h3>
                <p className="text-sm text-orange-600 mt-1">
                    mergeRule.criteria로 셀을 병합합니다. 'prevvalues + value'는 선행 컬럼을 참조합니다.
                </p>
            </div>

            <div className="flex gap-2 mb-4 items-center">
                <button onClick={() => applyMerge('none')} className="px-3 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600">병합 해제</button>
                <button onClick={() => applyMerge('basic')} className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">기본 병합</button>
                <button onClick={() => applyMerge('hierarchical')} className="px-3 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">계층적 병합</button>
                <span className="ml-auto text-sm font-medium text-gray-600">현재: {mergeType}</span>
            </div>

            <div ref={containerRef} className="flex-1 min-h-[400px] border border-gray-200 rounded" />
        </div>
    );
}

// ============================================================================
// Tab 5: 통합 예제 (★★★)
// ============================================================================
function CombinedExampleTab() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridViewRef = useRef<GridView | null>(null);
    const providerRef = useRef<LocalDataProvider | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const license = process.env.NEXT_PUBLIC_REALGRID_LICENSE;
        if (license) RealGrid.setLicenseKey(license);

        const provider = new LocalDataProvider(false);
        const gridView = new GridView(containerRef.current);
        gridView.setDataSource(provider);

        provider.setFields([
            { fieldName: 'year', dataType: ValueType.TEXT },
            { fieldName: 'quarter', dataType: ValueType.TEXT },
            { fieldName: 'month', dataType: ValueType.TEXT },
            { fieldName: 'product', dataType: ValueType.TEXT },
            { fieldName: 'region', dataType: ValueType.TEXT },
            { fieldName: 'sales', dataType: ValueType.NUMBER },
            { fieldName: 'cost', dataType: ValueType.NUMBER },
            { fieldName: 'profit', dataType: ValueType.NUMBER },
        ]);

        gridView.setColumns([
            { name: 'year', fieldName: 'year', header: { text: '연도' }, width: 60, mergeRule: { criteria: 'value' } },
            { name: 'quarter', fieldName: 'quarter', header: { text: '분기' }, width: 60, mergeRule: { criteria: 'prevvalues + value' } },
            { name: 'month', fieldName: 'month', header: { text: '월' }, width: 60, mergeRule: { criteria: 'prevvalues + value' } },
            { name: 'product', fieldName: 'product', header: { text: '제품' }, width: 100 },
            { name: 'region', fieldName: 'region', header: { text: '지역' }, width: 80 },
            { name: 'sales', fieldName: 'sales', header: { text: '매출' }, width: 110, numberFormat: '#,##0', styles: { textAlignment: 'far' } },
            { name: 'cost', fieldName: 'cost', header: { text: '비용' }, width: 110, numberFormat: '#,##0', styles: { textAlignment: 'far' } },
            { name: 'profit', fieldName: 'profit', header: { text: '이익' }, width: 110, numberFormat: '#,##0', styles: { textAlignment: 'far' } },
        ]);

        // 다층 헤더 레이아웃 적용
        const layout = [
            { name: 'timeGroup', direction: 'horizontal', items: ['year', 'quarter', 'month'], header: { text: '📅 기간' } },
            { name: 'infoGroup', direction: 'horizontal', items: ['product', 'region'], header: { text: '📦 구분' } },
            { name: 'performanceGroup', direction: 'horizontal', items: ['sales', 'cost', 'profit'], header: { text: '💰 실적' } },
        ];
        gridView.setColumnLayout(layout);

        provider.setRows([
            { year: '2025', quarter: 'Q1', month: '1월', product: '노트북', region: '서울', sales: 50000000, cost: 30000000, profit: 20000000 },
            { year: '2025', quarter: 'Q1', month: '1월', product: '마우스', region: '서울', sales: 10000000, cost: 5000000, profit: 5000000 },
            { year: '2025', quarter: 'Q1', month: '2월', product: '노트북', region: '서울', sales: 60000000, cost: 35000000, profit: 25000000 },
            { year: '2025', quarter: 'Q1', month: '2월', product: '마우스', region: '부산', sales: 12000000, cost: 6000000, profit: 6000000 },
            { year: '2025', quarter: 'Q1', month: '3월', product: '키보드', region: '대구', sales: 8000000, cost: 4000000, profit: 4000000 },
            { year: '2025', quarter: 'Q2', month: '4월', product: '노트북', region: '서울', sales: 70000000, cost: 40000000, profit: 30000000 },
            { year: '2025', quarter: 'Q2', month: '4월', product: '키보드', region: '부산', sales: 15000000, cost: 8000000, profit: 7000000 },
            { year: '2025', quarter: 'Q2', month: '5월', product: '모니터', region: '서울', sales: 45000000, cost: 25000000, profit: 20000000 },
        ]);

        // 편집 옵션
        gridView.setEditOptions({ editable: true, commitByCell: true });
        gridView.setStateBar({ visible: true });
        gridView.setCheckBar({ visible: true });
        gridView.setDisplayOptions({ fitStyle: 'fill', rowHeight: 36 });
        gridView.setHeader({ height: 40 });

        gridViewRef.current = gridView;
        providerRef.current = provider;

        return () => {
            gridView.destroy();
            provider.destroy();
        };
    }, []);

    const handleAddRow = useCallback(() => {
        if (providerRef.current) {
            providerRef.current.insertRow(0, {
                year: '2025', quarter: 'Q2', month: '',
                product: '', region: '',
                sales: 0, cost: 0, profit: 0
            });
        }
    }, []);

    const handleExport = useCallback(() => {
        if (gridViewRef.current) {
            gridViewRef.current.exportGrid({
                type: 'excel',
                target: 'local',
                fileName: '판매실적_리포트.xlsx',
            });
        }
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-yellow-800">⭐ 통합 예제: 판매 실적 대시보드</h3>
                <p className="text-sm text-yellow-600 mt-1">
                    다층 헤더(Column Layout) + 셀 병합(Cell Merging) + 편집 기능을 조합한 실전 예제입니다.
                </p>
            </div>

            <div className="flex gap-2 mb-4">
                <button onClick={handleAddRow} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                    + 행 추가
                </button>
                <button onClick={handleExport} className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                    📊 엑셀 다운로드
                </button>
            </div>

            <div ref={containerRef} className="flex-1 min-h-[400px] border border-gray-200 rounded" />
        </div>
    );
}

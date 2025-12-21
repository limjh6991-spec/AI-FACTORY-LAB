/**
 * 컴포넌트 렌더러 - Layout JSON → React 코드 변환
 */

import type { ComponentItem, LayoutItem } from './types';

// ============================================
// 옵션 컴포넌트 상태 변수명 매핑
// ============================================
const OPTION_STATE_MAP: Record<string, { state: string; setter: string }> = {
    SiteSelect: { state: 'searchSite', setter: 'setSearchSite' },
    YearMonthPicker: { state: 'searchYearMonth', setter: 'setSearchYearMonth' },
    YearPicker: { state: 'searchYear', setter: 'setSearchYear' },
    CustomerSelect: { state: 'searchCustomer', setter: 'setSearchCustomer' },
    MaterialSelect: { state: 'searchMaterial', setter: 'setSearchMaterial' },
    ProductSelect: { state: 'searchProduct', setter: 'setSearchProduct' },
    ModelSelect: { state: 'searchModel', setter: 'setSearchModel' },
    EquipmentSelect: { state: 'searchEquipment', setter: 'setSearchEquipment' },
    AccountSelect: { state: 'searchAccount', setter: 'setSearchAccount' },
    ExpenSelSelect: { state: 'searchExpenSel', setter: 'setSearchExpenSel' },
    DepartmentSelect: { state: 'searchDept', setter: 'setSearchDept' },
    CostCenterSelect: { state: 'searchCostCenter', setter: 'setSearchCostCenter' },
    UserSelect: { state: 'searchUser', setter: 'setSearchUser' },
    SelCodeSelect: { state: 'searchCode', setter: 'setSearchCode' },
};

// ============================================
// 옵션 컴포넌트 렌더러 (14개)
// ============================================
const OPTION_RENDERERS: Record<string, () => string> = {
    SiteSelect: () => `<SiteSelect value={searchSite} onChange={setSearchSite} label="사업장" />`,
    YearMonthPicker: () => `<YearMonthPicker value={searchYearMonth} onChange={setSearchYearMonth} label="기준월" />`,
    YearPicker: () => `<YearPicker value={searchYear} onChange={setSearchYear} label="기준년도" />`,
    CustomerSelect: () => `<CustomerSelect value={searchCustomer} onChange={setSearchCustomer} label="거래처" />`,
    MaterialSelect: () => `<MaterialSelect value={searchMaterial} onChange={setSearchMaterial} label="자재" />`,
    ProductSelect: () => `<ProductSelect value={searchProduct} onChange={setSearchProduct} label="제품" />`,
    ModelSelect: () => `<ModelSelect value={searchModel} onChange={setSearchModel} label="모델" />`,
    EquipmentSelect: () => `<EquipmentSelect value={searchEquipment} onChange={setSearchEquipment} label="설비" />`,
    AccountSelect: () => `<AccountSelect value={searchAccount} onChange={setSearchAccount} label="계정" />`,
    ExpenSelSelect: () => `<ExpenSelSelect value={searchExpenSel} onChange={setSearchExpenSel} label="경비구분" />`,
    DepartmentSelect: () => `<DepartmentSelect value={searchDept} onChange={setSearchDept} label="부서" />`,
    CostCenterSelect: () => `<CostCenterSelect value={searchCostCenter} onChange={setSearchCostCenter} label="코스트센터" />`,
    UserSelect: () => `<UserSelect value={searchUser} onChange={setSearchUser} label="사용자" />`,
    SelCodeSelect: () => `<SelCodeSelect value={searchCode} onChange={setSearchCode} label="공통코드" />`,
};

// ============================================
// 버튼 컴포넌트 렌더러 (14개) - 글로벌 CSS 클래스 사용
// ============================================
const BUTTON_RENDERERS: Record<string, () => string> = {
    btn_search: () => `<button onClick={handleSearch} className="btn-primary"><Search className="h-4 w-4" />조회</button>`,
    btn_save: () => `<button onClick={handleSave} className="btn-success"><Save className="h-4 w-4" />저장</button>`,
    btn_add: () => `<button onClick={handleAdd} className="btn-primary"><Plus className="h-4 w-4" />추가</button>`,
    btn_delete: () => `<button onClick={handleDelete} className="btn-danger"><Trash2 className="h-4 w-4" />삭제</button>`,
    btn_excel: () => `<button onClick={handleExcel} className="btn-secondary"><FileSpreadsheet className="h-4 w-4" />엑셀</button>`,
    btn_reset: () => `<button onClick={handleReset} className="btn-secondary"><RotateCcw className="h-4 w-4" />초기화</button>`,
    btn_print: () => `<button onClick={handlePrint} className="btn-secondary"><Printer className="h-4 w-4" />인쇄</button>`,
    btn_refresh: () => `<button onClick={handleRefresh} className="btn-secondary"><RefreshCw className="h-4 w-4" />새로고침</button>`,
    btn_copy: () => `<button onClick={handleCopy} className="btn-secondary"><Copy className="h-4 w-4" />복사</button>`,
    btn_edit: () => `<button onClick={handleEdit} className="btn-warning"><Edit className="h-4 w-4" />수정</button>`,
    btn_confirm: () => `<button onClick={handleConfirm} className="btn-success"><Check className="h-4 w-4" />확인</button>`,
    btn_cancel: () => `<button onClick={handleCancel} className="btn-danger"><X className="h-4 w-4" />취소</button>`,
    btn_upload: () => `<button onClick={handleUpload} className="btn-secondary"><Upload className="h-4 w-4" />업로드</button>`,
    btn_filter: () => `<button onClick={handleFilter} className="btn-secondary"><Filter className="h-4 w-4" />필터</button>`,
};

// ============================================
// 그리드 컴포넌트 렌더러 (6개)
// ============================================
const GRID_RENDERERS: Record<string, (id: string) => string> = {
    grid_basic: (id) => `<div ref={${id}Ref} className="h-[400px] border border-slate-200 rounded bg-white" />`,
    grid_editable: (id) => `<div ref={${id}Ref} className="h-[400px] border border-slate-200 rounded bg-white" />`,
    grid_tree: (id) => `<div ref={${id}Ref} className="h-[400px] border border-slate-200 rounded bg-white" />`,
    grid_pivot: (id) => `<div ref={${id}Ref} className="h-[400px] border border-slate-200 rounded bg-white" />`,
    grid_master_detail: (id) => `<div ref={${id}Ref} className="h-[400px] border border-slate-200 rounded bg-white" />`,
    grid_grouped: (id) => `<div ref={${id}Ref} className="h-[400px] border border-slate-200 rounded bg-white" />`,
};

// ============================================
// 차트 컴포넌트 렌더러 (7개)
// ============================================
const CHART_RENDERERS: Record<string, (id: string) => string> = {
    chart_bar: (id) => `<div className="h-[300px] border border-slate-200 rounded bg-white p-4"><p className="text-slate-400 text-center">📊 막대 차트</p></div>`,
    chart_line: (id) => `<div className="h-[300px] border border-slate-200 rounded bg-white p-4"><p className="text-slate-400 text-center">📈 라인 차트</p></div>`,
    chart_pie: (id) => `<div className="h-[300px] border border-slate-200 rounded bg-white p-4"><p className="text-slate-400 text-center">🥧 파이 차트</p></div>`,
    chart_area: (id) => `<div className="h-[300px] border border-slate-200 rounded bg-white p-4"><p className="text-slate-400 text-center">📉 영역 차트</p></div>`,
    chart_combo: (id) => `<div className="h-[300px] border border-slate-200 rounded bg-white p-4"><p className="text-slate-400 text-center">📊 콤보 차트</p></div>`,
    chart_gauge: (id) => `<div className="h-[200px] border border-slate-200 rounded bg-white p-4"><p className="text-slate-400 text-center">⏱️ 게이지</p></div>`,
    chart_sparkline: (id) => `<div className="h-[50px] border border-slate-200 rounded bg-white p-2"><p className="text-slate-400 text-center text-xs">스파크라인</p></div>`,
};

// ============================================
// 사용된 옵션 컴포넌트 수집
// ============================================
function collectUsedOptions(layout: LayoutItem[]): string[] {
    const usedOptions = new Set<string>();

    for (const item of layout) {
        for (const slot of item.slots) {
            for (const comp of slot.components) {
                if (comp.type === 'Option' && comp.templateId) {
                    usedOptions.add(comp.templateId);
                }
            }
        }
    }

    return Array.from(usedOptions);
}

// ============================================
// 상태 선언 코드 생성
// ============================================
function generateStateDeclarations(usedOptions: string[]): string {
    return usedOptions
        .filter(opt => OPTION_STATE_MAP[opt] !== undefined)
        .map(opt => {
            const mapping = OPTION_STATE_MAP[opt];
            if (!mapping) return '';
            return `    const [${mapping.state}, ${mapping.setter}] = useState<string>('');`;
        })
        .filter(Boolean)
        .join('\n');
}

function renderComponent(component: ComponentItem, index: number): string {
    const id = component.templateId || `comp${index}`;

    switch (component.type) {
        case 'Option':
            const optionRenderer = OPTION_RENDERERS[id];
            return optionRenderer ? optionRenderer() : `{/* Unknown Option: ${id} */}`;

        case 'Button':
            const buttonRenderer = BUTTON_RENDERERS[id];
            return buttonRenderer ? buttonRenderer() : `{/* Unknown Button: ${id} */}`;

        case 'Grid':
            const gridRenderer = GRID_RENDERERS[id];
            return gridRenderer ? gridRenderer('grid') : `{/* Unknown Grid: ${id} */}`;

        case 'Chart':
            const chartRenderer = CHART_RENDERERS[id];
            return chartRenderer ? chartRenderer('chart') : `{/* Unknown Chart: ${id} */}`;

        case 'Tab':
            return `<div className="border border-slate-200 rounded bg-white p-4">탭 컴포넌트</div>`;

        default:
            return `{/* Unknown Component: ${component.type} */}`;
    }
}

// ============================================
// 레이아웃 렌더러
// ============================================
function renderSlot(components: ComponentItem[]): string {
    if (components.length === 0) {
        return `{/* Empty Slot */}`;
    }
    return components.map((comp, i) => renderComponent(comp, i)).join('\n            ');
}

function renderLayoutItem(item: LayoutItem): string {
    const slotCount = item.slots.length;

    if (item.type === 'ToolbarRow') {
        return `
        {/* Toolbar */}
        <div className="flex items-center gap-4 p-4 bg-white border-b border-slate-200">
          ${item.slots.map(slot => renderSlot(slot.components)).join('\n          ')}
        </div>`;
    }

    if (slotCount === 1) {
        return `
        {/* Full Width */}
        <div className="p-4">
          ${renderSlot(item.slots[0].components)}
        </div>`;
    }

    if (slotCount === 2) {
        return `
        {/* 2 Columns */}
        <div className="grid grid-cols-2 gap-4 p-4">
          <div>${renderSlot(item.slots[0].components)}</div>
          <div>${renderSlot(item.slots[1].components)}</div>
        </div>`;
    }

    if (slotCount === 3) {
        return `
        {/* 3 Columns */}
        <div className="grid grid-cols-3 gap-4 p-4">
          <div>${renderSlot(item.slots[0].components)}</div>
          <div>${renderSlot(item.slots[1].components)}</div>
          <div>${renderSlot(item.slots[2].components)}</div>
        </div>`;
    }

    return `{/* Unknown Layout */}`;
}

// ============================================
// 메인 코드 생성 함수
// ============================================
export function generateScreenCode(
    screenId: string,
    screenName: string,
    layout: LayoutItem[]
): string {
    const layoutCode = layout.map(renderLayoutItem).join('\n');
    const usedOptions = collectUsedOptions(layout);
    const stateDeclarations = generateStateDeclarations(usedOptions);

    return `'use client';

/**
 * ${screenName}
 * 생성일: ${new Date().toISOString().split('T')[0]}
 * 생성 도구: Layout Builder
 */

import { useState, useRef } from 'react';
import { Search, Save, Plus, Trash2, FileSpreadsheet, RotateCcw, Printer, RefreshCw, Copy, Edit, Check, X, Upload, Filter } from 'lucide-react';

// 옵션 컴포넌트 임포트
import { SiteSelect, YearMonthPicker, YearPicker, CustomerSelect, MaterialSelect, ProductSelect, ModelSelect, EquipmentSelect, AccountSelect, ExpenSelSelect, DepartmentSelect, CostCenterSelect, UserSelect, SelCodeSelect } from '~/components/options';

export default function ${screenId}Page() {
    // 검색 조건 상태
${stateDeclarations || '    // (옵션 컴포넌트 없음)'}
    
    // 그리드 Ref
    const gridRef = useRef<HTMLDivElement>(null);
    
    // 핸들러
    const handleSearch = () => { console.log('Search'); };
    const handleSave = () => { console.log('Save'); };
    const handleAdd = () => { console.log('Add'); };
    const handleDelete = () => { console.log('Delete'); };
    const handleExcel = () => { console.log('Excel'); };
    const handleReset = () => { console.log('Reset'); };
    const handlePrint = () => { console.log('Print'); };
    const handleRefresh = () => { console.log('Refresh'); };
    const handleCopy = () => { console.log('Copy'); };
    const handleEdit = () => { console.log('Edit'); };
    const handleConfirm = () => { console.log('Confirm'); };
    const handleCancel = () => { console.log('Cancel'); };
    const handleUpload = () => { console.log('Upload'); };
    const handleFilter = () => { console.log('Filter'); };

    return (
      <div className="min-h-screen bg-slate-50">
        ${layoutCode}
      </div>
    );
}
`;
}

// ============================================
// 미리보기용 (Canvas에서 사용)
// ============================================
export function getComponentPreview(component: ComponentItem): React.ReactNode {
    return null; // 추후 구현
}

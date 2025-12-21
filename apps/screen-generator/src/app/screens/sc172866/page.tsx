'use client';

/**
 * 화면 테스트
 * 생성일: 2025-12-21
 * 생성 도구: Layout Builder
 */

import { useState, useRef } from 'react';
import { Search, Save, Plus, Trash2, FileSpreadsheet, RotateCcw, Printer, RefreshCw, Copy, Edit, Check, X, Upload, Filter } from 'lucide-react';

// 옵션 컴포넌트 임포트
import { SiteSelect, YearMonthPicker, YearPicker, CustomerSelect, MaterialSelect, ProductSelect, ModelSelect, EquipmentSelect, AccountSelect, ExpenSelSelect, DepartmentSelect, CostCenterSelect, UserSelect, SelCodeSelect } from '~/components/options';

export default function SC172866Page() {
    // 검색 조건 상태
    const [searchYearMonth, setSearchYearMonth] = useState<string>('');
    const [searchSite, setSearchSite] = useState<string>('');
    
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
        
        {/* Toolbar */}
        <div className="flex items-center gap-4 p-4 bg-white border-b border-slate-200">
          <YearMonthPicker value={searchYearMonth} onChange={setSearchYearMonth} label="기준월" />
            <SiteSelect value={searchSite} onChange={setSearchSite} label="사업장" />
            <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"><Search className="h-4 w-4" />조회</button>
        </div>

        {/* Full Width */}
        <div className="p-4">
          <div ref={gridRef} className="h-[400px] border border-slate-200 rounded bg-white" />
        </div>
      </div>
    );
}

/**
 * 공정 라우팅 마스터 화면 (편집 기능 포함)
 * Process Routing Master - 제품별 공정/설비 라우팅 CRUD
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    GitBranch, Search, RefreshCw, ChevronRight, Package,
    Settings, ChevronDown, ChevronUp, Plus, Edit2, Trash2, Save, X
} from 'lucide-react';

const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    dark: '#181C32',
    gray100: '#F5F8FA',
    gray200: '#EFF2F5',
    gray300: '#E4E6EF',
    gray400: '#B5B5C3',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
    gray700: '#5E6278',
    gray800: '#3F4254',
    gray900: '#181C32',
};

const processColors: Record<string, string> = {
    'area_1': '#FF6B6B',
    'area_2': '#4ECDC4',
    'area_3': '#45B7D1',
    'area_4': '#96CEB4',
    'area_5': '#FFEAA7',
    'area_6': '#DDA0DD',
    'area_7': '#98D8C8',
    'area_8': '#F7DC6F',
    'area_9': '#BB8FCE',
    'area_10': '#85C1E9',
};

interface RoutingItem {
    item_code: string;
    revision: string;
    status: string;
}

interface RoutingStep {
    op_seq: number;
    op_name: string;
    workcenter_code: string;
    machine_code: string;
    setup_time: number;
    cycle_time: number;
    process_yield: number;
}

interface ProductRouting {
    item_code: string;
    routing: RoutingStep[];
    totalTime: number;
    processCount: number;
}

export default function RoutingMasterPage() {
    const [items, setItems] = useState<RoutingItem[]>([]);
    const [routings, setRoutings] = useState<ProductRouting[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProcess, setSelectedProcess] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [page, setPage] = useState(1);
    const pageSize = 20;

    // 편집 모달 상태
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
    const [editItemCode, setEditItemCode] = useState('');
    const [editRouting, setEditRouting] = useState<RoutingStep[]>([]);

    const API_BASE = 'http://localhost:8000';

    const allProcesses = useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => `area_${i + 1}`);
    }, []);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/routing/items`);
            if (res.ok) {
                const data = await res.json();
                setItems(data.filter((d: RoutingItem) => d.item_code.startsWith('PROD-')));
            }
        } catch (err) {
            console.error('Failed to fetch items:', err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadRoutings();
    }, [items, page]);

    const loadRoutings = async () => {
        const startIdx = (page - 1) * pageSize;
        const pageItems = items.slice(startIdx, startIdx + pageSize);

        if (pageItems.length === 0) return;

        setIsLoading(true);
        const results: ProductRouting[] = [];

        for (const item of pageItems) {
            try {
                const res = await fetch(`${API_BASE}/routing/${item.item_code}`);
                if (res.ok) {
                    const data = await res.json();
                    const routing = data.routing || [];
                    const totalTime = routing.reduce((sum: number, r: RoutingStep) =>
                        sum + r.setup_time + r.cycle_time, 0);

                    results.push({
                        item_code: item.item_code,
                        routing,
                        totalTime,
                        processCount: routing.length
                    });
                }
            } catch (err) {
                console.error(`Failed to load routing for ${item.item_code}`);
            }
        }

        setRoutings(results);
        setIsLoading(false);
    };

    const filteredRoutings = useMemo(() => {
        return routings.filter(r => {
            const matchSearch = !searchTerm ||
                r.item_code.toLowerCase().includes(searchTerm.toLowerCase());
            const matchProcess = !selectedProcess ||
                r.routing.some(step => step.op_name === selectedProcess);
            return matchSearch && matchProcess;
        });
    }, [routings, searchTerm, selectedProcess]);

    const toggleExpand = (itemCode: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(itemCode)) {
            newExpanded.delete(itemCode);
        } else {
            newExpanded.add(itemCode);
        }
        setExpandedItems(newExpanded);
    };

    const formatTime = (minutes: number) => {
        if (minutes < 60) return `${Math.round(minutes)}분`;
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours}h ${mins}m`;
    };

    const totalPages = Math.ceil(items.length / pageSize);

    // === 편집 기능 ===
    const openCreateModal = () => {
        setEditMode('create');
        setEditItemCode('');
        setEditRouting([
            { op_seq: 10, op_name: 'area_1', machine_code: 'EQ-1-01', workcenter_code: '', setup_time: 10, cycle_time: 1, process_yield: 95 },
            { op_seq: 20, op_name: 'area_10', machine_code: 'EQ-10-01', workcenter_code: '', setup_time: 10, cycle_time: 1, process_yield: 98 }
        ]);
        setShowModal(true);
    };

    const openEditModal = (product: ProductRouting) => {
        setEditMode('edit');
        setEditItemCode(product.item_code);
        setEditRouting([...product.routing]);
        setShowModal(true);
    };

    const addProcessStep = () => {
        const lastSeq = editRouting.length > 0 ? Math.max(...editRouting.map(r => r.op_seq)) : 0;
        setEditRouting([...editRouting, {
            op_seq: lastSeq + 10,
            op_name: 'area_2',
            machine_code: 'EQ-2-01',
            workcenter_code: '',
            setup_time: 10,
            cycle_time: 1,
            process_yield: 95
        }]);
    };

    const removeProcessStep = (index: number) => {
        setEditRouting(editRouting.filter((_, i) => i !== index));
    };

    const updateStep = (index: number, field: string, value: string | number) => {
        const updated = [...editRouting];
        (updated[index] as any)[field] = value;

        // 공정명 변경시 설비코드도 업데이트
        if (field === 'op_name') {
            const areaNum = (value as string).split('_')[1];
            updated[index].machine_code = `EQ-${areaNum}-01`;
        }

        setEditRouting(updated);
    };

    const saveRouting = async () => {
        if (!editItemCode.trim()) {
            alert('제품코드를 입력하세요');
            return;
        }

        // op_seq 재정렬
        const sortedRouting = editRouting
            .sort((a, b) => {
                const aNum = parseInt(a.op_name.split('_')[1]) || 0;
                const bNum = parseInt(b.op_name.split('_')[1]) || 0;
                return aNum - bNum;
            })
            .map((step, idx) => ({ ...step, op_seq: (idx + 1) * 10 }));

        try {
            const method = editMode === 'create' ? 'POST' : 'PUT';
            const url = editMode === 'create' ? `${API_BASE}/routing` : `${API_BASE}/routing/${editItemCode}`;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_code: editItemCode,
                    revision: '1.0',
                    routing: sortedRouting
                })
            });

            if (res.ok) {
                setShowModal(false);
                fetchItems();
            } else {
                const err = await res.json();
                alert(`저장 실패: ${err.detail}`);
            }
        } catch (err) {
            alert('저장 중 오류 발생');
        }
    };

    const deleteRouting = async (itemCode: string) => {
        if (!confirm(`${itemCode} 라우팅을 삭제하시겠습니까?`)) return;

        try {
            const res = await fetch(`${API_BASE}/routing/${itemCode}`, { method: 'DELETE' });
            if (res.ok) {
                fetchItems();
            }
        } catch (err) {
            alert('삭제 실패');
        }
    };

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                            <GitBranch className="w-6 h-6" style={{ color: colors.primary }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>공정 라우팅 마스터</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>Process Routing Master - {items.length}개 제품</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={openCreateModal}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: colors.success }}
                        >
                            <Plus className="w-4 h-4" />
                            제품 추가
                        </button>
                        <button
                            onClick={fetchItems}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            새로고침
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.gray400 }} />
                        <input
                            type="text"
                            placeholder="제품 코드 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                    <select
                        value={selectedProcess}
                        onChange={(e) => setSelectedProcess(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-40"
                        style={{ borderColor: colors.gray300 }}
                    >
                        <option value="">전체 공정</option>
                        {allProcesses.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Process Legend */}
            <div className="bg-white rounded-xl p-4 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-4 h-4" style={{ color: colors.gray500 }} />
                    <span className="text-sm font-medium" style={{ color: colors.gray700 }}>공정 범례</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {allProcesses.map(process => (
                        <span
                            key={process}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all"
                            style={{
                                background: processColors[process] + '20',
                                color: processColors[process],
                                border: selectedProcess === process ? `2px solid ${processColors[process]}` : '2px solid transparent'
                            }}
                            onClick={() => setSelectedProcess(selectedProcess === process ? '' : process)}
                        >
                            {process}
                        </span>
                    ))}
                </div>
            </div>

            {/* Routing Table */}
            <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead style={{ background: colors.gray100 }}>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600, width: 40 }}></th>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600, width: 120 }}>제품코드</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600, width: 60 }}>공정수</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>공정 흐름</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold" style={{ color: colors.gray600, width: 80 }}>개당시간</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600, width: 80 }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoutings.map((product) => (
                                <React.Fragment key={product.item_code}>
                                    <tr
                                        className="border-b cursor-pointer hover:bg-gray-50 transition-colors"
                                        style={{ borderColor: colors.gray200 }}
                                    >
                                        <td className="px-4 py-3" onClick={() => toggleExpand(product.item_code)}>
                                            {expandedItems.has(product.item_code) ? (
                                                <ChevronUp className="w-4 h-4" style={{ color: colors.gray500 }} />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" style={{ color: colors.gray500 }} />
                                            )}
                                        </td>
                                        <td className="px-4 py-3" onClick={() => toggleExpand(product.item_code)}>
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4" style={{ color: colors.primary }} />
                                                <span className="font-medium text-sm" style={{ color: colors.gray900 }}>
                                                    {product.item_code}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center" onClick={() => toggleExpand(product.item_code)}>
                                            <span className="px-2 py-1 rounded-full text-xs font-medium"
                                                style={{ background: colors.info + '15', color: colors.info }}>
                                                {product.processCount}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3" onClick={() => toggleExpand(product.item_code)}>
                                            <div className="flex items-center gap-1 flex-wrap">
                                                {product.routing.map((step, idx) => (
                                                    <React.Fragment key={step.op_seq}>
                                                        <span
                                                            className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                                                            style={{
                                                                background: processColors[step.op_name] + '20',
                                                                color: processColors[step.op_name]
                                                            }}
                                                        >
                                                            {step.op_name}
                                                        </span>
                                                        {idx < product.routing.length - 1 && (
                                                            <ChevronRight className="w-3 h-3" style={{ color: colors.gray400 }} />
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right" onClick={() => toggleExpand(product.item_code)}>
                                            <span className="text-sm font-semibold" style={{ color: colors.gray700 }}>
                                                {formatTime(product.totalTime)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="p-1.5 rounded hover:bg-gray-100"
                                                    title="편집"
                                                >
                                                    <Edit2 className="w-4 h-4" style={{ color: colors.primary }} />
                                                </button>
                                                <button
                                                    onClick={() => deleteRouting(product.item_code)}
                                                    className="p-1.5 rounded hover:bg-gray-100"
                                                    title="삭제"
                                                >
                                                    <Trash2 className="w-4 h-4" style={{ color: colors.danger }} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {expandedItems.has(product.item_code) && (
                                        <tr style={{ background: colors.gray100 }}>
                                            <td colSpan={6} className="px-8 py-4">
                                                <div className="grid grid-cols-5 gap-3">
                                                    {product.routing.map((step) => (
                                                        <div
                                                            key={step.op_seq}
                                                            className="bg-white rounded-lg p-3 border"
                                                            style={{ borderColor: processColors[step.op_name] }}
                                                        >
                                                            <div className="text-xs font-semibold mb-2 px-2 py-1 rounded"
                                                                style={{ background: processColors[step.op_name] + '20', color: processColors[step.op_name] }}>
                                                                {step.op_name}
                                                            </div>
                                                            <div className="space-y-1 text-xs" style={{ color: colors.gray600 }}>
                                                                <div className="flex justify-between">
                                                                    <span>설비:</span>
                                                                    <span className="font-medium">{step.machine_code}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>Setup:</span>
                                                                    <span>{step.setup_time.toFixed(1)}분</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>C/T:</span>
                                                                    <span>{step.cycle_time.toFixed(2)}분</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>수율:</span>
                                                                    <span style={{ color: step.process_yield < 95 ? colors.warning : colors.success }}>
                                                                        {step.process_yield.toFixed(1)}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: colors.gray200 }}>
                    <span className="text-sm" style={{ color: colors.gray500 }}>
                        {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, items.length)} / {items.length}개
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 rounded text-sm"
                            style={{ background: page === 1 ? colors.gray200 : colors.primary, color: page === 1 ? colors.gray500 : 'white' }}
                        >
                            이전
                        </button>
                        <span className="px-3 py-1.5 text-sm" style={{ color: colors.gray700 }}>{page} / {totalPages}</span>
                        <button
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                            disabled={page >= totalPages}
                            className="px-3 py-1.5 rounded text-sm"
                            style={{ background: page >= totalPages ? colors.gray200 : colors.primary, color: page >= totalPages ? colors.gray500 : 'white' }}
                        >
                            다음
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold" style={{ color: colors.gray900 }}>
                                {editMode === 'create' ? '제품 추가' : `${editItemCode} 편집`}
                            </h2>
                            <button onClick={() => setShowModal(false)}>
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>

                        {/* Item Code */}
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>제품코드</label>
                            <input
                                type="text"
                                value={editItemCode}
                                onChange={(e) => setEditItemCode(e.target.value)}
                                disabled={editMode === 'edit'}
                                placeholder="PROD-NEW"
                                className="w-full px-3 py-2 rounded-lg border text-sm"
                                style={{ borderColor: colors.gray300, background: editMode === 'edit' ? colors.gray100 : 'white' }}
                            />
                        </div>

                        {/* Routing Steps */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium" style={{ color: colors.gray700 }}>공정 라우팅</label>
                                <button
                                    onClick={addProcessStep}
                                    className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                                    style={{ background: colors.info + '15', color: colors.info }}
                                >
                                    <Plus className="w-3 h-3" /> 공정 추가
                                </button>
                            </div>

                            <div className="space-y-2">
                                {editRouting.map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg border" style={{ borderColor: colors.gray200 }}>
                                        <select
                                            value={step.op_name}
                                            onChange={(e) => updateStep(idx, 'op_name', e.target.value)}
                                            className="px-2 py-1 rounded border text-sm"
                                            style={{ borderColor: colors.gray300 }}
                                        >
                                            {allProcesses.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={step.machine_code}
                                            onChange={(e) => updateStep(idx, 'machine_code', e.target.value)}
                                            className="w-28 px-2 py-1 rounded border text-sm"
                                            style={{ borderColor: colors.gray300 }}
                                            placeholder="EQ-1-01"
                                        />
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs" style={{ color: colors.gray500 }}>Setup:</span>
                                            <input
                                                type="number"
                                                value={step.setup_time}
                                                onChange={(e) => updateStep(idx, 'setup_time', parseFloat(e.target.value) || 0)}
                                                className="w-16 px-2 py-1 rounded border text-sm"
                                                style={{ borderColor: colors.gray300 }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs" style={{ color: colors.gray500 }}>C/T:</span>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={step.cycle_time}
                                                onChange={(e) => updateStep(idx, 'cycle_time', parseFloat(e.target.value) || 0)}
                                                className="w-16 px-2 py-1 rounded border text-sm"
                                                style={{ borderColor: colors.gray300 }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs" style={{ color: colors.gray500 }}>수율:</span>
                                            <input
                                                type="number"
                                                value={step.process_yield}
                                                onChange={(e) => updateStep(idx, 'process_yield', parseFloat(e.target.value) || 0)}
                                                className="w-16 px-2 py-1 rounded border text-sm"
                                                style={{ borderColor: colors.gray300 }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeProcessStep(idx)}
                                            className="p-1 rounded hover:bg-gray-100"
                                        >
                                            <X className="w-4 h-4" style={{ color: colors.danger }} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg text-sm font-medium"
                                style={{ background: colors.gray200, color: colors.gray700 }}
                            >
                                취소
                            </button>
                            <button
                                onClick={saveRouting}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                                style={{ background: colors.primary }}
                            >
                                <Save className="w-4 h-4" />
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

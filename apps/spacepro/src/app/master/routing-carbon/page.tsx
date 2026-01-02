/**
 * 공정 라우팅 마스터 (Carbon 컬러)
 * 첫 번째 화면 스타일 + 4그룹 그라데이션
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

// 4그룹 그라데이션 색상
// 1: area_1 (단독)
// 2: area_2~4 (그라데이션)
// 3: area_5~9 (그라데이션)
// 4: area_10 (단독)
const getProcessColor = (opName: string): string => {
    const num = parseInt(opName.split('_')[1]) || 0;

    if (num === 1) {
        return '#FF6B6B';  // 그룹1: 빨강 (투입공정)
    } else if (num >= 2 && num <= 4) {
        // 그룹2: 초록 계열 그라데이션
        const gradients = ['#2ECC71', '#27AE60', '#1E8449'];
        return gradients[num - 2];
    } else if (num >= 5 && num <= 9) {
        // 그룹3: 파랑 계열 그라데이션
        const gradients = ['#5DADE2', '#3498DB', '#2980B9', '#1F618D', '#154360'];
        return gradients[num - 5];
    } else if (num === 10) {
        return '#9B59B6';  // 그룹4: 보라 (완료공정)
    }
    return '#95A5A6';
};

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

export default function RoutingCarbonPage() {
    const [items, setItems] = useState<{ item_code: string }[]>([]);
    const [routings, setRoutings] = useState<ProductRouting[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProcess, setSelectedProcess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
    const [editItemCode, setEditItemCode] = useState('');
    const [editRouting, setEditRouting] = useState<RoutingStep[]>([]);

    const API_BASE = 'http://localhost:8000';
    const allProcesses = useMemo(() => Array.from({ length: 10 }, (_, i) => `area_${i + 1}`), []);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/routing/items`);
            if (res.ok) {
                const data = await res.json();
                setItems(data.filter((d: any) => d.item_code.startsWith('PROD-')));
            }
        } catch (err) { console.error(err); }
        setIsLoading(false);
    };

    useEffect(() => { loadRoutings(); }, [items, page]);

    const loadRoutings = async () => {
        const pageItems = items.slice((page - 1) * pageSize, page * pageSize);
        if (!pageItems.length) return;
        setIsLoading(true);
        const results: ProductRouting[] = [];
        for (const item of pageItems) {
            try {
                const res = await fetch(`${API_BASE}/routing/${item.item_code}`);
                if (res.ok) {
                    const data = await res.json();
                    const routing = data.routing || [];
                    results.push({
                        item_code: item.item_code,
                        routing,
                        totalTime: routing.reduce((s: number, r: RoutingStep) => s + r.setup_time + r.cycle_time, 0),
                        processCount: routing.length
                    });
                }
            } catch (err) { console.error(err); }
        }
        setRoutings(results);
        setIsLoading(false);
    };

    const filteredRoutings = useMemo(() => {
        return routings.filter(r => {
            const matchSearch = !searchTerm || r.item_code.toLowerCase().includes(searchTerm.toLowerCase());
            const matchProcess = !selectedProcess || r.routing.some(s => s.op_name === selectedProcess);
            return matchSearch && matchProcess;
        });
    }, [routings, searchTerm, selectedProcess]);

    const toggleExpand = (code: string) => {
        const newSet = new Set(expandedItems);
        newSet.has(code) ? newSet.delete(code) : newSet.add(code);
        setExpandedItems(newSet);
    };

    const formatTime = (min: number) => min < 60 ? `${Math.round(min)}분` : `${Math.floor(min / 60)}h ${Math.round(min % 60)}m`;
    const totalPages = Math.ceil(items.length / pageSize);

    const openCreateModal = () => {
        setEditMode('create');
        setEditItemCode('');
        setEditRouting([
            { op_seq: 10, op_name: 'area_1', machine_code: 'EQ-1-01', workcenter_code: '', setup_time: 10, cycle_time: 1, process_yield: 95 },
            { op_seq: 20, op_name: 'area_10', machine_code: 'EQ-10-01', workcenter_code: '', setup_time: 10, cycle_time: 1, process_yield: 98 }
        ]);
        setShowModal(true);
    };

    const openEditModal = (p: ProductRouting) => {
        setEditMode('edit');
        setEditItemCode(p.item_code);
        setEditRouting([...p.routing]);
        setShowModal(true);
    };

    const addStep = () => {
        const lastSeq = editRouting.length ? Math.max(...editRouting.map(r => r.op_seq)) : 0;
        setEditRouting([...editRouting, { op_seq: lastSeq + 10, op_name: 'area_2', machine_code: 'EQ-2-01', workcenter_code: '', setup_time: 10, cycle_time: 1, process_yield: 95 }]);
    };

    const removeStep = (i: number) => setEditRouting(editRouting.filter((_, idx) => idx !== i));

    const updateStep = (i: number, field: string, val: string | number) => {
        const updated = [...editRouting];
        (updated[i] as any)[field] = val;
        if (field === 'op_name') updated[i].machine_code = `EQ-${(val as string).split('_')[1]}-01`;
        setEditRouting(updated);
    };

    const saveRouting = async () => {
        if (!editItemCode.trim()) { alert('제품코드를 입력하세요'); return; }
        const sorted = editRouting.sort((a, b) => parseInt(a.op_name.split('_')[1]) - parseInt(b.op_name.split('_')[1])).map((s, i) => ({ ...s, op_seq: (i + 1) * 10 }));
        try {
            const res = await fetch(editMode === 'create' ? `${API_BASE}/routing` : `${API_BASE}/routing/${editItemCode}`, {
                method: editMode === 'create' ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_code: editItemCode, revision: '1.0', routing: sorted })
            });
            if (res.ok) { setShowModal(false); fetchItems(); }
            else { const e = await res.json(); alert(`저장 실패: ${e.detail}`); }
        } catch { alert('저장 오류'); }
    };

    const deleteRouting = async (code: string) => {
        if (!confirm(`${code} 삭제?`)) return;
        try {
            await fetch(`${API_BASE}/routing/${code}`, { method: 'DELETE' });
            fetchItems();
        } catch { alert('삭제 실패'); }
    };

    // 그룹 범례 정보
    const processGroups = [
        { label: 'area_1 (투입)', color: '#FF6B6B' },
        { label: 'area_2~4 (전처리)', colors: ['#2ECC71', '#27AE60', '#1E8449'] },
        { label: 'area_5~9 (가공)', colors: ['#5DADE2', '#3498DB', '#2980B9', '#1F618D', '#154360'] },
        { label: 'area_10 (완료)', color: '#9B59B6' },
    ];

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
                            <p className="text-sm" style={{ color: colors.gray500 }}>유사 공정 그룹 색상 - {items.length}개 제품</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={openCreateModal} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: colors.success }}>
                            <Plus className="w-4 h-4" /> 제품 추가
                        </button>
                        <button onClick={fetchItems} disabled={isLoading} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium" style={{ background: colors.gray200, color: colors.gray700 }}>
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> 새로고침
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.gray400 }} />
                        <input type="text" placeholder="제품 코드 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm" style={{ borderColor: colors.gray300 }} />
                    </div>
                    <select value={selectedProcess} onChange={(e) => setSelectedProcess(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-40" style={{ borderColor: colors.gray300 }}>
                        <option value="">전체 공정</option>
                        {allProcesses.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
            </div>

            {/* Process Group Legend */}
            <div className="bg-white rounded-xl p-4 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-4 h-4" style={{ color: colors.gray500 }} />
                    <span className="text-sm font-medium" style={{ color: colors.gray700 }}>공정 그룹 (유사공정 그라데이션)</span>
                </div>
                <div className="flex flex-wrap gap-4">
                    {processGroups.map((group, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            {'colors' in group && group.colors ? (
                                <div className="flex">
                                    {group.colors.map((c, i) => (
                                        <div key={i} className="w-6 h-6" style={{ background: c, marginLeft: i > 0 ? -4 : 0 }} />
                                    ))}
                                </div>
                            ) : (
                                <div className="w-6 h-6 rounded" style={{ background: group.color }} />
                            )}
                            <span className="text-xs font-medium" style={{ color: colors.gray700 }}>{group.label}</span>
                        </div>
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
                            {filteredRoutings.map((prod) => (
                                <React.Fragment key={prod.item_code}>
                                    <tr className="border-b cursor-pointer hover:bg-gray-50" style={{ borderColor: colors.gray200 }}>
                                        <td className="px-4 py-3" onClick={() => toggleExpand(prod.item_code)}>
                                            {expandedItems.has(prod.item_code) ? <ChevronUp className="w-4 h-4" style={{ color: colors.gray500 }} /> : <ChevronDown className="w-4 h-4" style={{ color: colors.gray500 }} />}
                                        </td>
                                        <td className="px-4 py-3" onClick={() => toggleExpand(prod.item_code)}>
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4" style={{ color: colors.primary }} />
                                                <span className="font-medium text-sm" style={{ color: colors.gray900 }}>{prod.item_code}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center" onClick={() => toggleExpand(prod.item_code)}>
                                            <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: colors.info + '15', color: colors.info }}>{prod.processCount}</span>
                                        </td>
                                        <td className="px-4 py-3" onClick={() => toggleExpand(prod.item_code)}>
                                            <div className="flex items-center gap-1 flex-wrap">
                                                {prod.routing.map((s, i) => (
                                                    <React.Fragment key={s.op_seq}>
                                                        <span className="px-2 py-1 rounded text-xs font-medium text-white" style={{ background: getProcessColor(s.op_name) }}>
                                                            {s.op_name}
                                                        </span>
                                                        {i < prod.routing.length - 1 && <ChevronRight className="w-3 h-3" style={{ color: colors.gray400 }} />}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm font-semibold" style={{ color: colors.gray700 }} onClick={() => toggleExpand(prod.item_code)}>
                                            {formatTime(prod.totalTime)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button onClick={() => openEditModal(prod)} className="p-1.5 rounded hover:bg-gray-100"><Edit2 className="w-4 h-4" style={{ color: colors.primary }} /></button>
                                                <button onClick={() => deleteRouting(prod.item_code)} className="p-1.5 rounded hover:bg-gray-100"><Trash2 className="w-4 h-4" style={{ color: colors.danger }} /></button>
                                            </div>
                                        </td>
                                    </tr>

                                    {expandedItems.has(prod.item_code) && (
                                        <tr style={{ background: colors.gray100 }}>
                                            <td colSpan={6} className="px-8 py-4">
                                                <div className="grid grid-cols-5 gap-3">
                                                    {prod.routing.map((s) => (
                                                        <div key={s.op_seq} className="bg-white rounded-lg p-3 border-l-4" style={{ borderColor: getProcessColor(s.op_name) }}>
                                                            <div className="text-xs font-semibold mb-2 px-2 py-1 rounded text-white" style={{ background: getProcessColor(s.op_name) }}>{s.op_name}</div>
                                                            <div className="space-y-1 text-xs" style={{ color: colors.gray600 }}>
                                                                <div className="flex justify-between"><span>설비:</span><span className="font-medium">{s.machine_code}</span></div>
                                                                <div className="flex justify-between"><span>Setup:</span><span>{s.setup_time.toFixed(1)}분</span></div>
                                                                <div className="flex justify-between"><span>C/T:</span><span>{s.cycle_time.toFixed(2)}분</span></div>
                                                                <div className="flex justify-between"><span>수율:</span><span style={{ color: s.process_yield < 95 ? colors.warning : colors.success }}>{s.process_yield.toFixed(1)}%</span></div>
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
                    <span className="text-sm" style={{ color: colors.gray500 }}>{(page - 1) * pageSize + 1} - {Math.min(page * pageSize, items.length)} / {items.length}개</span>
                    <div className="flex gap-2">
                        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                            className="px-3 py-1.5 rounded text-sm" style={{ background: page === 1 ? colors.gray200 : colors.primary, color: page === 1 ? colors.gray500 : 'white' }}>이전</button>
                        <span className="px-3 py-1.5 text-sm" style={{ color: colors.gray700 }}>{page} / {totalPages}</span>
                        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}
                            className="px-3 py-1.5 rounded text-sm" style={{ background: page >= totalPages ? colors.gray200 : colors.primary, color: page >= totalPages ? colors.gray500 : 'white' }}>다음</button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold" style={{ color: colors.gray900 }}>{editMode === 'create' ? '제품 추가' : `${editItemCode} 편집`}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5" style={{ color: colors.gray500 }} /></button>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>제품코드</label>
                            <input type="text" value={editItemCode} onChange={(e) => setEditItemCode(e.target.value)} disabled={editMode === 'edit'} placeholder="PROD-NEW"
                                className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.gray300, background: editMode === 'edit' ? colors.gray100 : 'white' }} />
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium" style={{ color: colors.gray700 }}>공정 라우팅</label>
                                <button onClick={addStep} className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium" style={{ background: colors.info + '15', color: colors.info }}>
                                    <Plus className="w-3 h-3" /> 공정 추가
                                </button>
                            </div>
                            <div className="space-y-2">
                                {editRouting.map((s, i) => (
                                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg border" style={{ borderColor: colors.gray200 }}>
                                        <select value={s.op_name} onChange={(e) => updateStep(i, 'op_name', e.target.value)} className="px-2 py-1 rounded border text-sm" style={{ borderColor: colors.gray300 }}>
                                            {allProcesses.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                        <input type="text" value={s.machine_code} onChange={(e) => updateStep(i, 'machine_code', e.target.value)} className="w-28 px-2 py-1 rounded border text-sm" style={{ borderColor: colors.gray300 }} />
                                        <span className="text-xs" style={{ color: colors.gray500 }}>Setup:</span>
                                        <input type="number" value={s.setup_time} onChange={(e) => updateStep(i, 'setup_time', parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 rounded border text-sm" style={{ borderColor: colors.gray300 }} />
                                        <span className="text-xs" style={{ color: colors.gray500 }}>C/T:</span>
                                        <input type="number" step="0.1" value={s.cycle_time} onChange={(e) => updateStep(i, 'cycle_time', parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 rounded border text-sm" style={{ borderColor: colors.gray300 }} />
                                        <span className="text-xs" style={{ color: colors.gray500 }}>수율:</span>
                                        <input type="number" value={s.process_yield} onChange={(e) => updateStep(i, 'process_yield', parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 rounded border text-sm" style={{ borderColor: colors.gray300 }} />
                                        <button onClick={() => removeStep(i)} className="p-1 rounded hover:bg-gray-100"><X className="w-4 h-4" style={{ color: colors.danger }} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: colors.gray200, color: colors.gray700 }}>취소</button>
                            <button onClick={saveRouting} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: colors.primary }}>
                                <Save className="w-4 h-4" /> 저장
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

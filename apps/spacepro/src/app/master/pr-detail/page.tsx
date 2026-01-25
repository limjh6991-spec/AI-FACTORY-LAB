/**
 * 세부공정정보 관리 화면 - sp_prcode_detail_info
 * Worker-style UI with hierarchy filters
 */
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Layers, Search, RefreshCw, Plus, Edit2, Trash2, Save, X,
    Filter, ChevronDown, AlertCircle, Clock, Users
} from 'lucide-react';

const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    cyan: '#0DCAF0',
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

interface PrDetail {
    contno: string;
    macode: string;
    prcode: string;
    prname: string;
    pr_seq: number;
    prname_detail: string;
    pr_detail_seq: number;
    worker: number;
    working_time: number;
    working_day: number;
    eqp_type_id: string;
    eqp_id: string;
    eqp_name: string;
}

interface Summary {
    total_details: number;
    contract_count: number;
    product_count: number;
    process_count: number;
    total_workers: number;
    avg_working_time: number;
}

export default function PrDetailPage() {
    const [data, setData] = useState<PrDetail[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);

    // Filter options
    const [contracts, setContracts] = useState<{ contno: string; detail_count: number }[]>([]);
    const [products, setProducts] = useState<{ macode: string; detail_count: number }[]>([]);
    const [processes, setProcesses] = useState<{ prcode: string; prname: string; detail_count: number }[]>([]);

    // Selected filters
    const [filterContno, setFilterContno] = useState('');
    const [filterMacode, setFilterMacode] = useState('');
    const [filterPrcode, setFilterPrcode] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
    const [editItem, setEditItem] = useState<Partial<PrDetail>>({});

    const API_BASE = 'http://localhost:8001';

    useEffect(() => {
        fetchSummary();
        fetchContracts();
        fetchData();
    }, []);

    // Fetch hierarchy when parent filter changes
    useEffect(() => {
        fetchProducts();
        setFilterMacode('');
        setFilterPrcode('');
    }, [filterContno]);

    useEffect(() => {
        fetchProcesses();
        setFilterPrcode('');
    }, [filterMacode]);

    useEffect(() => {
        fetchData();
    }, [filterContno, filterMacode, filterPrcode]);

    const fetchSummary = async () => {
        try {
            const res = await fetch(`${API_BASE}/pr-detail/summary`);
            if (res.ok) {
                const data = await res.json();
                setSummary(data.summary);
            }
        } catch (err) {
            console.error('Failed to fetch summary:', err);
        }
    };

    const fetchContracts = async () => {
        try {
            const res = await fetch(`${API_BASE}/pr-detail/contracts`);
            if (res.ok) setContracts(await res.json());
        } catch (err) {
            console.error('Failed to fetch contracts:', err);
        }
    };

    const fetchProducts = async () => {
        try {
            const params = new URLSearchParams();
            if (filterContno) params.append('contno', filterContno);
            const res = await fetch(`${API_BASE}/pr-detail/products?${params}`);
            if (res.ok) setProducts(await res.json());
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    };

    const fetchProcesses = async () => {
        try {
            const params = new URLSearchParams();
            if (filterContno) params.append('contno', filterContno);
            if (filterMacode) params.append('macode', filterMacode);
            const res = await fetch(`${API_BASE}/pr-detail/processes?${params}`);
            if (res.ok) setProcesses(await res.json());
        } catch (err) {
            console.error('Failed to fetch processes:', err);
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (filterContno) params.append('contno', filterContno);
            if (filterMacode) params.append('macode', filterMacode);
            if (filterPrcode) params.append('prcode', filterPrcode);

            const res = await fetch(`${API_BASE}/pr-detail/list?${params}`);
            if (res.ok) {
                const result = await res.json();
                setData(result.details || []);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            setError('세부공정 목록을 불러오는 데 실패했습니다.');
            console.error(err);
        }
        setIsLoading(false);
    };

    const filteredData = useMemo(() => {
        return data.filter(item => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();
            return item.prname?.toLowerCase().includes(term) ||
                item.prname_detail?.toLowerCase().includes(term) ||
                item.macode?.toLowerCase().includes(term);
        });
    }, [data, searchTerm]);

    const openCreate = () => {
        setEditMode('create');
        setEditItem({
            contno: filterContno || (contracts[0]?.contno ?? ''),
            macode: filterMacode || '',
            prcode: filterPrcode || '',
            prname: '',
            prname_detail: '',
            worker: 1,
            working_time: 1,
            working_day: 1
        });
        setShowModal(true);
    };

    const openEdit = (item: PrDetail) => {
        setEditMode('edit');
        setEditItem({ ...item });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${API_BASE}/pr-detail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editItem)
            });
            if (res.ok) {
                setShowModal(false);
                fetchData();
                fetchSummary();
            } else {
                const err = await res.json();
                alert(`저장 실패: ${err.detail}`);
            }
        } catch (err) {
            alert('저장 중 오류 발생');
        }
    };

    const handleDelete = async (item: PrDetail) => {
        if (!confirm('삭제하시겠습니까?')) return;
        try {
            const res = await fetch(
                `${API_BASE}/pr-detail/${encodeURIComponent(item.contno)}/${encodeURIComponent(item.macode)}/${encodeURIComponent(item.prcode)}/${encodeURIComponent(item.prname_detail)}`,
                { method: 'DELETE' }
            );
            if (res.ok) {
                fetchData();
                fetchSummary();
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
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.cyan + '15' }}>
                            <Layers className="w-6 h-6" style={{ color: colors.cyan }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>세부공정정보</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>
                                Process Detail Management - {summary?.total_details || 0}건
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={openCreate}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: colors.success }}
                        >
                            <Plus className="w-4 h-4" />
                            추가
                        </button>
                        <button
                            onClick={() => { fetchData(); fetchSummary(); }}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            새로고침
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                {summary && (
                    <div className="grid grid-cols-5 gap-4 mb-6">
                        <div className="p-4 rounded-lg" style={{ background: colors.primary + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                                {summary.total_details}
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>전체 세부공정</div>
                        </div>
                        <div className="p-4 rounded-lg" style={{ background: colors.success + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.success }}>
                                {summary.contract_count}
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>계약 수</div>
                        </div>
                        <div className="p-4 rounded-lg" style={{ background: colors.info + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.info }}>
                                {summary.product_count}
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>제품 수</div>
                        </div>
                        <div className="p-4 rounded-lg" style={{ background: colors.warning + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.warning }}>
                                {summary.process_count}
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>공정 수</div>
                        </div>
                        <div className="p-4 rounded-lg" style={{ background: colors.cyan + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.cyan }}>
                                {Number(summary.avg_working_time || 0).toFixed(1)}h
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>평균 작업시간</div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-48 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.gray400 }} />
                        <input
                            type="text"
                            placeholder="공정명/세부공정 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                    <select
                        value={filterContno}
                        onChange={(e) => setFilterContno(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-40"
                        style={{ borderColor: colors.gray300 }}
                    >
                        <option value="">전체 계약</option>
                        {contracts.map(c => (
                            <option key={c.contno} value={c.contno}>
                                {c.contno} ({c.detail_count})
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterMacode}
                        onChange={(e) => setFilterMacode(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-44"
                        style={{ borderColor: colors.gray300 }}
                        disabled={!filterContno}
                    >
                        <option value="">전체 제품</option>
                        {products.map(p => (
                            <option key={p.macode} value={p.macode}>
                                {p.macode} ({p.detail_count})
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterPrcode}
                        onChange={(e) => setFilterPrcode(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-40"
                        style={{ borderColor: colors.gray300 }}
                        disabled={!filterMacode}
                    >
                        <option value="">전체 공정</option>
                        {processes.map(p => (
                            <option key={p.prcode} value={p.prcode}>
                                {p.prname || p.prcode} ({p.detail_count})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{error}</span>
                </div>
            )}

            {/* Data Table */}
            <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead style={{ background: colors.gray100 }}>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>제품</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>공정</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>세부공정</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600 }}>순서</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600 }}>
                                    <div className="flex items-center justify-center gap-1">
                                        <Users className="w-3 h-3" /> 작업인원
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600 }}>
                                    <div className="flex items-center justify-center gap-1">
                                        <Clock className="w-3 h-3" /> 작업시간
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>설비</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600, width: 100 }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, idx) => (
                                <tr
                                    key={`${item.contno}-${item.macode}-${item.prcode}-${item.prname_detail}-${idx}`}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                    style={{ borderColor: colors.gray200 }}
                                >
                                    <td className="px-4 py-3">
                                        <span className="text-xs px-2 py-1 rounded" style={{ background: colors.info + '15', color: colors.info }}>
                                            {item.macode}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-medium text-sm" style={{ color: colors.gray900 }}>
                                            {item.prname}
                                        </span>
                                        <span className="text-xs ml-2" style={{ color: colors.gray500 }}>
                                            ({item.prcode})
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm" style={{ color: colors.gray800 }}>
                                        {item.prname_detail}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center" style={{ color: colors.gray600 }}>
                                        {item.pr_seq}-{item.pr_detail_seq}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="px-2 py-1 rounded text-xs font-medium"
                                            style={{ background: colors.warning + '20', color: colors.warning }}>
                                            {item.worker || 0}명
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="px-2 py-1 rounded text-xs font-medium"
                                            style={{ background: colors.cyan + '20', color: colors.cyan }}>
                                            {item.working_time || 0}h
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm" style={{ color: colors.gray600 }}>
                                        {item.eqp_name || item.eqp_id || '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => openEdit(item)}
                                                className="p-1.5 rounded hover:bg-gray-100"
                                                title="편집"
                                            >
                                                <Edit2 className="w-4 h-4" style={{ color: colors.primary }} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="p-1.5 rounded hover:bg-gray-100"
                                                title="삭제"
                                            >
                                                <Trash2 className="w-4 h-4" style={{ color: colors.danger }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-12 text-center" style={{ color: colors.gray500 }}>
                                        {isLoading ? '로딩 중...' : '데이터가 없습니다. 계약을 선택하거나 추가 버튼을 눌러 데이터를 생성하세요.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Info */}
                <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: colors.gray200 }}>
                    <span className="text-sm" style={{ color: colors.gray500 }}>
                        총 {filteredData.length}건 표시
                    </span>
                </div>
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold" style={{ color: colors.gray900 }}>
                                {editMode === 'create' ? '세부공정 추가' : '세부공정 편집'}
                            </h2>
                            <button onClick={() => setShowModal(false)}>
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>계약</label>
                                    <select
                                        value={editItem.contno || ''}
                                        onChange={(e) => setEditItem({ ...editItem, contno: e.target.value })}
                                        disabled={editMode === 'edit'}
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300, background: editMode === 'edit' ? colors.gray100 : 'white' }}
                                    >
                                        <option value="">선택</option>
                                        {contracts.map(c => (
                                            <option key={c.contno} value={c.contno}>{c.contno}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>제품</label>
                                    <input
                                        type="text"
                                        value={editItem.macode || ''}
                                        onChange={(e) => setEditItem({ ...editItem, macode: e.target.value })}
                                        disabled={editMode === 'edit'}
                                        placeholder="MACODE"
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300, background: editMode === 'edit' ? colors.gray100 : 'white' }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>공정코드</label>
                                    <input
                                        type="text"
                                        value={editItem.prcode || ''}
                                        onChange={(e) => setEditItem({ ...editItem, prcode: e.target.value })}
                                        disabled={editMode === 'edit'}
                                        placeholder="PRCODE"
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300, background: editMode === 'edit' ? colors.gray100 : 'white' }}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>공정명</label>
                                    <input
                                        type="text"
                                        value={editItem.prname || ''}
                                        onChange={(e) => setEditItem({ ...editItem, prname: e.target.value })}
                                        placeholder="공정명"
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>세부공정명</label>
                                <input
                                    type="text"
                                    value={editItem.prname_detail || ''}
                                    onChange={(e) => setEditItem({ ...editItem, prname_detail: e.target.value })}
                                    disabled={editMode === 'edit'}
                                    placeholder="세부공정명"
                                    className="w-full px-3 py-2 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300, background: editMode === 'edit' ? colors.gray100 : 'white' }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>작업인원</label>
                                    <input
                                        type="number"
                                        value={editItem.worker || ''}
                                        onChange={(e) => setEditItem({ ...editItem, worker: Number(e.target.value) })}
                                        min={0}
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300 }}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>작업시간(h)</label>
                                    <input
                                        type="number"
                                        value={editItem.working_time || ''}
                                        onChange={(e) => setEditItem({ ...editItem, working_time: Number(e.target.value) })}
                                        min={0}
                                        step={0.5}
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300 }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>설비 ID</label>
                                <input
                                    type="text"
                                    value={editItem.eqp_id || ''}
                                    onChange={(e) => setEditItem({ ...editItem, eqp_id: e.target.value })}
                                    placeholder="설비 ID"
                                    className="w-full px-3 py-2 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300 }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg text-sm font-medium"
                                style={{ background: colors.gray200, color: colors.gray700 }}
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSave}
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

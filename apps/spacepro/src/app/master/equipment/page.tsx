/**
 * 설비정보 관리 화면 - sp_eqp_mst
 */
'use client';

import React, { useState, useEffect } from 'react';
import { Cog, RefreshCw, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Equipment { id: number; eqp_type_id: string; eqp_id: string; eqp_name: string; bench_id: string; }

export default function EquipmentPage() {
    const [data, setData] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
    const [editItem, setEditItem] = useState<Partial<Equipment>>({});

    useEffect(() => { fetchData(); }, []);
    const fetchData = async () => { setIsLoading(true); try { const res = await fetch('/api/master/equipment'); if (res.ok) setData(await res.json()); } catch (e) { } setIsLoading(false); };
    const openCreate = () => { setEditMode('create'); setEditItem({}); setShowModal(true); };
    const openEdit = (item: Equipment) => { setEditMode('edit'); setEditItem({ ...item }); setShowModal(true); };
    const handleSave = async () => {
        const items = [{ ...editItem, __rowState: editMode === 'create' ? 'created' : 'updated' }];
        try { const res = await fetch('/api/master/equipment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) }); if (res.ok) { setShowModal(false); fetchData(); } } catch (e) { alert('저장 실패'); }
    };
    const handleDelete = async (id: number) => { if (!confirm('삭제하시겠습니까?')) return; try { await fetch('/api/master/equipment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify([{ id, __rowState: 'deleted' }]) }); fetchData(); } catch (e) { } };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><Cog className="w-5 h-5 text-green-500" /></div><h1 className="text-xl font-bold text-gray-900">설비정보</h1></div>
                    <div className="flex gap-2"><button onClick={fetchData} className="px-3 py-2 bg-gray-100 rounded-lg text-sm flex items-center gap-1"><RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> 조회</button><button onClick={openCreate} className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> 추가</button></div>
                </div>
                <table className="w-full"><thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ID</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">설비타입</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">설비ID</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">설비명</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">작업장ID</th><th className="px-4 py-3 text-center text-xs font-semibold text-gray-600" style={{ width: 100 }}>액션</th></tr></thead>
                    <tbody>{data.map(item => (<tr key={item.id} className="border-b hover:bg-gray-50"><td className="px-4 py-3 text-sm">{item.id}</td><td className="px-4 py-3 text-sm">{item.eqp_type_id}</td><td className="px-4 py-3 text-sm font-medium">{item.eqp_id}</td><td className="px-4 py-3 text-sm">{item.eqp_name}</td><td className="px-4 py-3 text-sm">{item.bench_id}</td><td className="px-4 py-3 text-center"><button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-gray-100"><Edit2 className="w-4 h-4 text-blue-500" /></button><button onClick={() => handleDelete(item.id)} className="p-1.5 rounded hover:bg-gray-100"><Trash2 className="w-4 h-4 text-red-500" /></button></td></tr>))}{data.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">데이터가 없습니다.</td></tr>}</tbody>
                </table>
            </div>
            {showModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-xl p-6 w-full max-w-md"><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold">{editMode === 'create' ? '추가' : '편집'}</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button></div><div className="space-y-4"><div><label className="text-sm font-medium mb-1 block">설비타입</label><input type="text" value={editItem.eqp_type_id || ''} onChange={e => setEditItem({ ...editItem, eqp_type_id: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div><div><label className="text-sm font-medium mb-1 block">설비ID</label><input type="text" value={editItem.eqp_id || ''} onChange={e => setEditItem({ ...editItem, eqp_id: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" disabled={editMode === 'edit'} /></div><div><label className="text-sm font-medium mb-1 block">설비명</label><input type="text" value={editItem.eqp_name || ''} onChange={e => setEditItem({ ...editItem, eqp_name: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div><div><label className="text-sm font-medium mb-1 block">작업장ID</label><input type="text" value={editItem.bench_id || ''} onChange={e => setEditItem({ ...editItem, bench_id: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div></div><div className="flex justify-end gap-2 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">취소</button><button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"><Save className="w-4 h-4" /> 저장</button></div></div></div>)}
        </div>
    );
}

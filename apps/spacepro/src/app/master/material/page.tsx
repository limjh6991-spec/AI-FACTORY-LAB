/**
 * 자재정보 관리 화면 - sp_material_info (ERP + 입력)
 */
'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, RefreshCw, Plus, Edit2, Trash2, Save, X, Download } from 'lucide-react';

interface Material { id: number; contno: string; macode: string; prcode: string; prnam1: string; mtrl: string; mtname: string; mtunit: string; qty: string; price: string; }

export default function MaterialPage() {
    const [data, setData] = useState<Material[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
    const [editItem, setEditItem] = useState<Partial<Material>>({});

    useEffect(() => { fetchData(); }, []);
    const fetchData = async () => { setIsLoading(true); try { const res = await fetch('/api/master/material'); if (res.ok) setData(await res.json()); } catch (e) { } setIsLoading(false); };
    const openCreate = () => { setEditMode('create'); setEditItem({}); setShowModal(true); };
    const openEdit = (item: Material) => { setEditMode('edit'); setEditItem({ ...item }); setShowModal(true); };
    const handleSave = async () => {
        const items = [{ ...editItem, __rowState: editMode === 'create' ? 'created' : 'updated' }];
        try { const res = await fetch('/api/master/material', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) }); if (res.ok) { setShowModal(false); fetchData(); } } catch (e) { alert('저장 실패'); }
    };
    const handleDelete = async (id: number) => { if (!confirm('삭제하시겠습니까?')) return; try { await fetch('/api/master/material', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify([{ id, __rowState: 'deleted' }]) }); fetchData(); } catch (e) { } };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Boxes className="w-5 h-5 text-amber-600" /></div><div><h1 className="text-xl font-bold text-gray-900">자재정보</h1><span className="text-xs text-orange-500">ERP Download + 입력</span></div></div>
                    <div className="flex gap-2"><button onClick={fetchData} className="px-3 py-2 bg-gray-100 rounded-lg text-sm flex items-center gap-1"><RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> 조회</button><button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm flex items-center gap-1"><Download className="w-4 h-4" /> ERP 연동</button><button onClick={openCreate} className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> 추가</button></div>
                </div>
                <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ID</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">사업코드</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">제품코드</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">공정코드</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">자재코드</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">자재명</th><th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">단위</th><th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">수량</th><th className="px-4 py-3 text-center text-xs font-semibold text-gray-600" style={{ width: 100 }}>액션</th></tr></thead>
                    <tbody>{data.slice(0, 50).map(item => (<tr key={item.id} className="border-b hover:bg-gray-50"><td className="px-4 py-3 text-sm">{item.id}</td><td className="px-4 py-3 text-sm">{item.contno}</td><td className="px-4 py-3 text-sm">{item.macode}</td><td className="px-4 py-3 text-sm">{item.prcode}</td><td className="px-4 py-3 text-sm font-medium">{item.mtrl}</td><td className="px-4 py-3 text-sm">{item.mtname}</td><td className="px-4 py-3 text-sm text-center">{item.mtunit}</td><td className="px-4 py-3 text-sm text-right">{item.qty}</td><td className="px-4 py-3 text-center"><button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-gray-100"><Edit2 className="w-4 h-4 text-blue-500" /></button><button onClick={() => handleDelete(item.id)} className="p-1.5 rounded hover:bg-gray-100"><Trash2 className="w-4 h-4 text-red-500" /></button></td></tr>))}{data.length === 0 && <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-500">데이터가 없습니다.</td></tr>}</tbody>
                </table></div>
                {data.length > 50 && <div className="p-4 border-t text-sm text-gray-500 text-center">상위 50건만 표시됩니다. (전체: {data.length}건)</div>}
            </div>
            {showModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-xl p-6 w-full max-w-lg"><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold">{editMode === 'create' ? '추가' : '편집'}</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button></div><div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium mb-1 block">사업코드</label><input type="text" value={editItem.contno || ''} onChange={e => setEditItem({ ...editItem, contno: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div><div><label className="text-sm font-medium mb-1 block">제품코드</label><input type="text" value={editItem.macode || ''} onChange={e => setEditItem({ ...editItem, macode: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div><div><label className="text-sm font-medium mb-1 block">공정코드</label><input type="text" value={editItem.prcode || ''} onChange={e => setEditItem({ ...editItem, prcode: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div><div><label className="text-sm font-medium mb-1 block">자재코드</label><input type="text" value={editItem.mtrl || ''} onChange={e => setEditItem({ ...editItem, mtrl: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div><div className="col-span-2"><label className="text-sm font-medium mb-1 block">자재명</label><input type="text" value={editItem.mtname || ''} onChange={e => setEditItem({ ...editItem, mtname: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div><div><label className="text-sm font-medium mb-1 block">단위</label><input type="text" value={editItem.mtunit || ''} onChange={e => setEditItem({ ...editItem, mtunit: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div><div><label className="text-sm font-medium mb-1 block">수량</label><input type="text" value={editItem.qty || ''} onChange={e => setEditItem({ ...editItem, qty: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" /></div></div><div className="flex justify-end gap-2 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">취소</button><button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"><Save className="w-4 h-4" /> 저장</button></div></div></div>)}
        </div>
    );
}

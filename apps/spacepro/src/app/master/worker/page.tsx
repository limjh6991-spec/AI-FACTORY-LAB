/**
 * 작업자 마스터 관리 화면
 * Worker Master Management - CRUD
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Users, Search, RefreshCw, Plus, Edit2, Trash2, Save, X,
    UserPlus, Filter, ChevronDown, ChevronUp, AlertCircle
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

const skillColors: Record<string, string> = {
    'JUNIOR': '#FFA800',
    'INTERMEDIATE': '#3699FF',
    'SENIOR': '#1BC5BD',
    'EXPERT': '#8950FC',
};

const shiftColors: Record<string, string> = {
    'DAY': '#F1FA8C',
    'NIGHT': '#6272A4',
    'SWING': '#FF79C6',
};

interface Worker {
    id: number;
    worker_code: string;
    worker_name: string;
    department: string | null;
    position: string | null;
    shift_group: string | null;
    skill_level: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface WorkerStats {
    summary: {
        total_workers: number;
        active_workers: number;
        department_count: number;
        shift_count: number;
    };
    skill_distribution: { skill_level: string; count: number }[];
    department_distribution: { department: string; count: number }[];
}

export default function WorkerMasterPage() {
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [stats, setStats] = useState<WorkerStats | null>(null);
    const [departments, setDepartments] = useState<{ department: string; worker_count: number }[]>([]);
    const [skillLevels, setSkillLevels] = useState<{ skill_level: string; worker_count: number }[]>([]);
    const [shifts, setShifts] = useState<{ shift_group: string; worker_count: number }[]>([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterDept, setFilterDept] = useState('');
    const [filterSkill, setFilterSkill] = useState('');
    const [filterShift, setFilterShift] = useState('');
    const [showInactive, setShowInactive] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
    const [editWorker, setEditWorker] = useState<Partial<Worker>>({});

    // Bulk create state
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [bulkCount, setBulkCount] = useState(100);
    const [bulkTeamSize, setBulkTeamSize] = useState(5);

    const API_BASE = 'http://localhost:8000';

    useEffect(() => {
        fetchWorkers();
        fetchFilters();
        fetchStats();
    }, []);

    const fetchWorkers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (filterDept) params.append('department', filterDept);
            if (filterSkill) params.append('skill_level', filterSkill);
            params.append('is_active', showInactive ? 'false' : 'true');

            const res = await fetch(`${API_BASE}/worker/list?${params}`);
            if (res.ok) {
                const data = await res.json();
                setWorkers(data.workers || []);
            } else {
                throw new Error('Failed to fetch workers');
            }
        } catch (err) {
            setError('작업자 목록을 불러오는 데 실패했습니다.');
            console.error(err);
        }
        setIsLoading(false);
    };

    const fetchFilters = async () => {
        try {
            const [deptRes, skillRes, shiftRes] = await Promise.all([
                fetch(`${API_BASE}/worker/departments`),
                fetch(`${API_BASE}/worker/skill-levels`),
                fetch(`${API_BASE}/worker/shifts`)
            ]);

            if (deptRes.ok) setDepartments(await deptRes.json());
            if (skillRes.ok) setSkillLevels(await skillRes.json());
            if (shiftRes.ok) setShifts(await shiftRes.json());
        } catch (err) {
            console.error('Failed to fetch filters:', err);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_BASE}/worker/summary/stats`);
            if (res.ok) {
                setStats(await res.json());
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    useEffect(() => {
        fetchWorkers();
    }, [filterDept, filterSkill, showInactive]);

    const filteredWorkers = useMemo(() => {
        return workers.filter(w => {
            const matchSearch = !searchTerm ||
                w.worker_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                w.worker_name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchShift = !filterShift || w.shift_group === filterShift;
            return matchSearch && matchShift;
        });
    }, [workers, searchTerm, filterShift]);

    // CRUD Operations
    const openCreateModal = () => {
        setEditMode('create');
        setEditWorker({
            worker_code: '',
            worker_name: '',
            department: departments[0]?.department || 'TEAM-A',
            position: '작업자',
            shift_group: 'DAY',
            skill_level: 'JUNIOR'
        });
        setShowModal(true);
    };

    const openEditModal = (worker: Worker) => {
        setEditMode('edit');
        setEditWorker({ ...worker });
        setShowModal(true);
    };

    const saveWorker = async () => {
        if (!editWorker.worker_code || !editWorker.worker_name) {
            alert('작업자 코드와 이름은 필수입니다.');
            return;
        }

        try {
            const method = editMode === 'create' ? 'POST' : 'PUT';
            const url = editMode === 'create'
                ? `${API_BASE}/worker`
                : `${API_BASE}/worker/${editWorker.worker_code}`;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editWorker)
            });

            if (res.ok) {
                setShowModal(false);
                fetchWorkers();
                fetchFilters();
                fetchStats();
            } else {
                const err = await res.json();
                alert(`저장 실패: ${err.detail}`);
            }
        } catch (err) {
            alert('저장 중 오류 발생');
        }
    };

    const deleteWorker = async (workerCode: string) => {
        if (!confirm(`${workerCode} 작업자를 비활성화하시겠습니까?`)) return;

        try {
            const res = await fetch(`${API_BASE}/worker/${workerCode}`, { method: 'DELETE' });
            if (res.ok) {
                fetchWorkers();
                fetchStats();
            }
        } catch (err) {
            alert('삭제 실패');
        }
    };

    const bulkCreate = async () => {
        try {
            const res = await fetch(`${API_BASE}/worker/bulk-create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    count: bulkCount,
                    team_size: bulkTeamSize,
                    department_prefix: 'TEAM'
                })
            });

            if (res.ok) {
                const data = await res.json();
                alert(`${data.created}명의 작업자가 생성되었습니다.`);
                setShowBulkModal(false);
                fetchWorkers();
                fetchFilters();
                fetchStats();
            } else {
                throw new Error('Bulk create failed');
            }
        } catch (err) {
            alert('일괄 생성 실패');
        }
    };

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.info + '15' }}>
                            <Users className="w-6 h-6" style={{ color: colors.info }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>작업자 마스터</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>
                                Worker Master Management - {stats?.summary.active_workers || 0}명 활성
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowBulkModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.info + '15', color: colors.info }}
                        >
                            <UserPlus className="w-4 h-4" />
                            일괄 생성
                        </button>
                        <button
                            onClick={openCreateModal}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                            style={{ background: colors.success }}
                        >
                            <Plus className="w-4 h-4" />
                            작업자 추가
                        </button>
                        <button
                            onClick={() => { fetchWorkers(); fetchStats(); }}
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
                {stats && (
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="p-4 rounded-lg" style={{ background: colors.primary + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                                {stats.summary.total_workers}
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>전체 작업자</div>
                        </div>
                        <div className="p-4 rounded-lg" style={{ background: colors.success + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.success }}>
                                {stats.summary.active_workers}
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>활성 작업자</div>
                        </div>
                        <div className="p-4 rounded-lg" style={{ background: colors.info + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.info }}>
                                {stats.summary.department_count}
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>분임조 수</div>
                        </div>
                        <div className="p-4 rounded-lg" style={{ background: colors.warning + '10' }}>
                            <div className="text-2xl font-bold" style={{ color: colors.warning }}>
                                {stats.summary.shift_count}
                            </div>
                            <div className="text-sm" style={{ color: colors.gray600 }}>교대조 수</div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-48 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.gray400 }} />
                        <input
                            type="text"
                            placeholder="작업자 코드/이름 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                    <select
                        value={filterDept}
                        onChange={(e) => setFilterDept(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-36"
                        style={{ borderColor: colors.gray300 }}
                    >
                        <option value="">전체 부서</option>
                        {departments.map(d => (
                            <option key={d.department} value={d.department}>
                                {d.department} ({d.worker_count})
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterSkill}
                        onChange={(e) => setFilterSkill(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-36"
                        style={{ borderColor: colors.gray300 }}
                    >
                        <option value="">전체 스킬</option>
                        {skillLevels.map(s => (
                            <option key={s.skill_level} value={s.skill_level}>
                                {s.skill_level} ({s.worker_count})
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterShift}
                        onChange={(e) => setFilterShift(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-36"
                        style={{ borderColor: colors.gray300 }}
                    >
                        <option value="">전체 교대조</option>
                        {shifts.map(s => (
                            <option key={s.shift_group} value={s.shift_group}>
                                {s.shift_group} ({s.worker_count})
                            </option>
                        ))}
                    </select>
                    <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer"
                        style={{ borderColor: colors.gray300 }}>
                        <input
                            type="checkbox"
                            checked={showInactive}
                            onChange={(e) => setShowInactive(e.target.checked)}
                        />
                        <span className="text-sm" style={{ color: colors.gray600 }}>비활성 포함</span>
                    </label>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{error}</span>
                </div>
            )}

            {/* Worker Table */}
            <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead style={{ background: colors.gray100 }}>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>코드</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>이름</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600 }}>부서/분임조</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600 }}>직책</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600 }}>교대조</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600 }}>스킬레벨</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600 }}>상태</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600, width: 100 }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredWorkers.map((worker) => (
                                <tr
                                    key={worker.id}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                    style={{ borderColor: colors.gray200, opacity: worker.is_active ? 1 : 0.5 }}
                                >
                                    <td className="px-4 py-3">
                                        <span className="font-medium text-sm" style={{ color: colors.gray900 }}>
                                            {worker.worker_code}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-sm" style={{ color: colors.gray800 }}>
                                            {worker.worker_name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="px-2 py-1 rounded text-xs font-medium"
                                            style={{ background: colors.info + '15', color: colors.info }}>
                                            {worker.department || '-'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="text-sm" style={{ color: colors.gray600 }}>
                                            {worker.position || '-'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {worker.shift_group && (
                                            <span className="px-2 py-1 rounded text-xs font-medium"
                                                style={{
                                                    background: (shiftColors[worker.shift_group] || colors.gray300) + '30',
                                                    color: colors.gray800
                                                }}>
                                                {worker.shift_group}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {worker.skill_level && (
                                            <span className="px-2 py-1 rounded text-xs font-medium"
                                                style={{
                                                    background: (skillColors[worker.skill_level] || colors.gray400) + '20',
                                                    color: skillColors[worker.skill_level] || colors.gray600
                                                }}>
                                                {worker.skill_level}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${worker.is_active
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {worker.is_active ? '활성' : '비활성'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => openEditModal(worker)}
                                                className="p-1.5 rounded hover:bg-gray-100"
                                                title="편집"
                                            >
                                                <Edit2 className="w-4 h-4" style={{ color: colors.primary }} />
                                            </button>
                                            <button
                                                onClick={() => deleteWorker(worker.worker_code)}
                                                className="p-1.5 rounded hover:bg-gray-100"
                                                title="비활성화"
                                            >
                                                <Trash2 className="w-4 h-4" style={{ color: colors.danger }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredWorkers.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-12 text-center" style={{ color: colors.gray500 }}>
                                        {isLoading ? '로딩 중...' : '작업자가 없습니다. 일괄 생성 버튼을 눌러 샘플 데이터를 생성하세요.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Info */}
                <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: colors.gray200 }}>
                    <span className="text-sm" style={{ color: colors.gray500 }}>
                        총 {filteredWorkers.length}명 표시
                    </span>
                </div>
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold" style={{ color: colors.gray900 }}>
                                {editMode === 'create' ? '작업자 추가' : '작업자 편집'}
                            </h2>
                            <button onClick={() => setShowModal(false)}>
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>작업자 코드</label>
                                <input
                                    type="text"
                                    value={editWorker.worker_code || ''}
                                    onChange={(e) => setEditWorker({ ...editWorker, worker_code: e.target.value })}
                                    disabled={editMode === 'edit'}
                                    placeholder="WRK-0001"
                                    className="w-full px-3 py-2 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300, background: editMode === 'edit' ? colors.gray100 : 'white' }}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>이름</label>
                                <input
                                    type="text"
                                    value={editWorker.worker_name || ''}
                                    onChange={(e) => setEditWorker({ ...editWorker, worker_name: e.target.value })}
                                    placeholder="홍길동"
                                    className="w-full px-3 py-2 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300 }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>부서/분임조</label>
                                    <input
                                        type="text"
                                        value={editWorker.department || ''}
                                        onChange={(e) => setEditWorker({ ...editWorker, department: e.target.value })}
                                        placeholder="TEAM-A"
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300 }}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>직책</label>
                                    <select
                                        value={editWorker.position || ''}
                                        onChange={(e) => setEditWorker({ ...editWorker, position: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300 }}
                                    >
                                        <option value="작업자">작업자</option>
                                        <option value="조장">조장</option>
                                        <option value="반장">반장</option>
                                        <option value="기사">기사</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>교대조</label>
                                    <select
                                        value={editWorker.shift_group || ''}
                                        onChange={(e) => setEditWorker({ ...editWorker, shift_group: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300 }}
                                    >
                                        <option value="DAY">DAY</option>
                                        <option value="NIGHT">NIGHT</option>
                                        <option value="SWING">SWING</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>스킬레벨</label>
                                    <select
                                        value={editWorker.skill_level || ''}
                                        onChange={(e) => setEditWorker({ ...editWorker, skill_level: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300 }}
                                    >
                                        <option value="JUNIOR">JUNIOR</option>
                                        <option value="INTERMEDIATE">INTERMEDIATE</option>
                                        <option value="SENIOR">SENIOR</option>
                                        <option value="EXPERT">EXPERT</option>
                                    </select>
                                </div>
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
                                onClick={saveWorker}
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

            {/* Bulk Create Modal */}
            {showBulkModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold" style={{ color: colors.gray900 }}>
                                샘플 데이터 일괄 생성
                            </h2>
                            <button onClick={() => setShowBulkModal(false)}>
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>
                                    생성할 작업자 수
                                </label>
                                <input
                                    type="number"
                                    value={bulkCount}
                                    onChange={(e) => setBulkCount(parseInt(e.target.value) || 100)}
                                    min={10}
                                    max={500}
                                    className="w-full px-3 py-2 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300 }}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>
                                    분임조당 인원
                                </label>
                                <input
                                    type="number"
                                    value={bulkTeamSize}
                                    onChange={(e) => setBulkTeamSize(parseInt(e.target.value) || 5)}
                                    min={2}
                                    max={10}
                                    className="w-full px-3 py-2 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300 }}
                                />
                            </div>
                            <div className="text-sm p-3 rounded-lg" style={{ background: colors.info + '10', color: colors.info }}>
                                총 {Math.ceil(bulkCount / bulkTeamSize)}개 분임조가 생성됩니다.
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setShowBulkModal(false)}
                                className="px-4 py-2 rounded-lg text-sm font-medium"
                                style={{ background: colors.gray200, color: colors.gray700 }}
                            >
                                취소
                            </button>
                            <button
                                onClick={bulkCreate}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                                style={{ background: colors.success }}
                            >
                                <UserPlus className="w-4 h-4" />
                                생성
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

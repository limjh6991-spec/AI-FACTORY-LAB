/**
 * 세부공정정보 관리 화면 - 라우팅 형식 UI
 * Product-centric routing view with expandable process cards
 * v2: 색상 간소화 + 공정 불러오기 기능
 */
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Layers, Search, RefreshCw, Plus, Edit2, Trash2, Save, X,
    ChevronDown, ChevronUp, ChevronRight, AlertCircle, Clock, Users, Package, Settings,
    Download, Check
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

// 간소화된 색상 팔레트 (5가지 기본 색상)
const processColorPalette = [
    '#3699FF', // Blue
    '#1BC5BD', // Teal
    '#FFA800', // Orange
    '#8950FC', // Purple
    '#F64E60', // Red
];

interface PrDetail {
    contno: string;
    macode: string;
    maname: string; // 제품명 (표시용)
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
    wbs_vid: string; // 제품 계층 구조
}

interface ProcessGroup {
    prcode: string;
    prname: string;
    pr_seq: number;
    details: PrDetail[];
    totalWorkers: number;
    totalTime: number;
}

interface ProductRouting {
    macode: string;
    maname: string; // 제품명 (표시용)
    contno: string;
    wbs_vid: string; // 제품 계층 구조
    processes: ProcessGroup[];
    totalTime: number;
    totalWorkers: number;
    processCount: number;
    detailCount: number;
}

interface Summary {
    total_details: number;
    contract_count: number;
    product_count: number;
    process_count: number;
    total_workers: number;
    avg_working_time: number;
}

// 불러오기용 템플릿 인터페이스
interface ProcessTemplate {
    prcode: string;
    prname: string;
    pr_seq: number; // 공정 순서
    details: {
        prname_detail: string;
        pr_detail_seq: number;
        worker: number;
        working_time: number;
        eqp_type_id: string;
        eqp_id: string;
    }[];
}

export default function PrDetailPage() {
    const [data, setData] = useState<PrDetail[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);

    // Filter options
    const [teams, setTeams] = useState<{ team_id: string; team_name: string; contract_count: number }[]>([]);
    const [contracts, setContracts] = useState<{ contno: string; contid: string; detail_count: number }[]>([]);
    const [products, setProducts] = useState<{ macode: string; maname: string; wbs_vid: string; detail_count: number }[]>([]);

    // Selected filters (순서: 사업팀 → 계약 → 제품 → 공정)
    const [filterTeam, setFilterTeam] = useState('');
    const [filterContno, setFilterContno] = useState('');
    const [filterMacode, setFilterMacode] = useState('');
    const [selectedProcess, setSelectedProcess] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
    const [editItem, setEditItem] = useState<Partial<PrDetail>>({});

    // 불러오기 모달 state
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [loadSearchTerm, setLoadSearchTerm] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<ProcessTemplate | null>(null);
    const [selectedDetails, setSelectedDetails] = useState<Set<number>>(new Set());
    const [loadTargetMacode, setLoadTargetMacode] = useState('');
    const [loadTargetContno, setLoadTargetContno] = useState('');

    // 공정 상세 팝업 state
    const [showProcessPopup, setShowProcessPopup] = useState(false);
    const [popupProcess, setPopupProcess] = useState<{ code: string; name: string } | null>(null);

    // 대기 중인 변경사항 (배치 저장용)
    const [pendingAdditions, setPendingAdditions] = useState<PrDetail[]>([]); // 추가 대기
    const [pendingDeletions, setPendingDeletions] = useState<Set<string>>(new Set()); // 삭제 대기 (key: contno-macode-prcode-prname_detail)
    const [isSaving, setIsSaving] = useState(false);

    // 변경사항 유무 체크
    const hasUnsavedChanges = pendingAdditions.length > 0 || pendingDeletions.size > 0;

    // 삭제 대기 키 생성
    const getItemKey = (item: PrDetail) => `${item.contno}-${item.macode}-${item.prcode}-${item.prname_detail}`;

    const API_BASE = 'http://localhost:8001';

    useEffect(() => {
        fetchSummary();
        fetchTeams();
        fetchContracts();
        fetchData();
    }, []);

    // 팀 변경 시 계약 목록 갱신
    useEffect(() => {
        fetchContracts();
        setFilterContno('');
    }, [filterTeam]);

    // 계약 변경 시 제품 목록 갱신
    useEffect(() => {
        fetchProducts();
        setFilterMacode('');
    }, [filterContno]);

    useEffect(() => {
        fetchData();
    }, [filterContno, filterMacode]);

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

    const fetchTeams = async () => {
        try {
            const res = await fetch(`${API_BASE}/pr-detail/teams`);
            if (res.ok) setTeams(await res.json());
        } catch (err) {
            console.error('Failed to fetch teams:', err);
        }
    };

    const fetchContracts = async () => {
        try {
            const params = new URLSearchParams();
            if (filterTeam) params.append('team_id', filterTeam);
            const res = await fetch(`${API_BASE}/pr-detail/contracts?${params}`);
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

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (filterContno) params.append('contno', filterContno);
            if (filterMacode) params.append('macode', filterMacode);

            const res = await fetch(`${API_BASE}/pr-detail/list?${params}`);
            if (res.ok) {
                const result = await res.json();
                // pr_seq, prname_detail 순서로 정렬하여 저장
                const sortedDetails = (result.details || []).sort((a: PrDetail, b: PrDetail) => {
                    // 먼저 pr_seq로 정렬
                    const seqDiff = (a.pr_seq || 999) - (b.pr_seq || 999);
                    if (seqDiff !== 0) return seqDiff;
                    // 같은 공정 내에서는 prname_detail로 자연정렬
                    return (a.prname_detail || '').localeCompare(b.prname_detail || '', undefined, { numeric: true });
                });
                setData(sortedDetails);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            setError('세부공정 목록을 불러오는 데 실패했습니다.');
            console.error(err);
        }
        setIsLoading(false);
    };

    // 제품별 라우팅 데이터로 변환
    const productRoutings = useMemo<ProductRouting[]>(() => {
        const productMap = new Map<string, ProductRouting>();

        data.forEach(item => {
            if (!productMap.has(item.macode)) {
                productMap.set(item.macode, {
                    macode: item.macode,
                    maname: item.maname || item.macode, // 제품명 추가
                    contno: item.contno,
                    wbs_vid: item.wbs_vid || '', // wbs_vid 추가
                    processes: [],
                    totalTime: 0,
                    totalWorkers: 0,
                    processCount: 0,
                    detailCount: 0
                });
            }

            const product = productMap.get(item.macode)!;

            // 공정 그룹 찾기 또는 생성
            let processGroup = product.processes.find(p => p.prcode === item.prcode);
            if (!processGroup) {
                processGroup = {
                    prcode: item.prcode,
                    prname: item.prname,
                    pr_seq: item.pr_seq,
                    details: [],
                    totalWorkers: 0,
                    totalTime: 0
                };
                product.processes.push(processGroup);
            }

            // 세부공정 추가
            processGroup.details.push(item);
            processGroup.totalTime += item.working_time || 0;
            processGroup.totalWorkers += item.worker || 0;

            // 제품 집계
            product.totalTime += item.working_time || 0;
            product.totalWorkers += item.worker || 0;
            product.detailCount++;
        });

        // 각 제품의 공정 정렬 및 개수 계산
        productMap.forEach(product => {
            product.processes.sort((a, b) => a.pr_seq - b.pr_seq);
            product.processes.forEach(p => p.details.sort((a, b) =>
                (a.prname_detail || '').localeCompare(b.prname_detail || '', undefined, { numeric: true })
            ));
            product.processCount = product.processes.length;
        });

        // wbs_vid 기준으로 정렬하여 트리 구조 표시
        return Array.from(productMap.values()).sort((a, b) =>
            (a.wbs_vid || 'zzz').localeCompare(b.wbs_vid || 'zzz', undefined, { numeric: true })
        );
    }, [data]);

    // 검색 및 필터 적용
    const filteredRoutings = useMemo(() => {
        return productRoutings.filter(r => {
            const matchSearch = !searchTerm ||
                r.macode.toLowerCase().includes(searchTerm.toLowerCase());
            const matchProcess = !selectedProcess ||
                r.processes.some(p => p.prcode === selectedProcess || p.prname === selectedProcess);
            return matchSearch && matchProcess;
        });
    }, [productRoutings, searchTerm, selectedProcess]);

    // 모든 공정 목록 (범례용) - pr_seq 순서로 정렬
    const allProcesses = useMemo(() => {
        const processMap = new Map<string, { code: string; name: string; pr_seq: number }>();
        data.forEach(item => {
            if (!processMap.has(item.prcode)) {
                processMap.set(item.prcode, {
                    code: item.prcode,
                    name: item.prname,
                    pr_seq: item.pr_seq || 999
                });
            }
        });
        return Array.from(processMap.values()).sort((a, b) => a.pr_seq - b.pr_seq);
    }, [data]);

    // 공정별 템플릿 데이터 (불러오기용)
    const processTemplates = useMemo<ProcessTemplate[]>(() => {
        const templateMap = new Map<string, ProcessTemplate>();

        data.forEach(item => {
            const key = item.prcode;
            if (!templateMap.has(key)) {
                templateMap.set(key, {
                    prcode: item.prcode,
                    prname: item.prname,
                    pr_seq: item.pr_seq || 999, // 공정 순서 저장
                    details: []
                });
            }

            const template = templateMap.get(key)!;
            // 중복 방지
            const exists = template.details.find(d => d.prname_detail === item.prname_detail);
            if (!exists) {
                template.details.push({
                    prname_detail: item.prname_detail,
                    pr_detail_seq: item.pr_detail_seq,
                    worker: item.worker,
                    working_time: item.working_time,
                    eqp_type_id: item.eqp_type_id,
                    eqp_id: item.eqp_id
                });
            }
        });

        // pr_seq 순서로 정렬하여 반환
        return Array.from(templateMap.values()).sort((a, b) => a.pr_seq - b.pr_seq);
    }, [data]);

    // 불러오기 검색 필터
    const filteredTemplates = useMemo(() => {
        if (!loadSearchTerm) return processTemplates.slice(0, 10);
        const term = loadSearchTerm.toLowerCase();
        return processTemplates.filter(t =>
            t.prcode.toLowerCase().includes(term) ||
            t.prname.toLowerCase().includes(term)
        );
    }, [processTemplates, loadSearchTerm]);

    // 공정별 색상 가져오기 (회전하면서 5가지 색상 사용)
    const getProcessColor = (prcode: string) => {
        const index = allProcesses.findIndex(p => p.code === prcode);
        return processColorPalette[index % processColorPalette.length];
    };

    const toggleExpand = (macode: string) => {
        const newExpanded = new Set(expandedProducts);
        if (newExpanded.has(macode)) {
            newExpanded.delete(macode);
        } else {
            newExpanded.add(macode);
        }
        setExpandedProducts(newExpanded);
    };

    const formatTime = (hours: number) => {
        if (!hours) return '-';
        if (hours < 1) return `${Math.round(hours * 60)}분`;
        return `${hours.toFixed(1)}h`;
    };

    const openCreate = (product?: ProductRouting) => {
        setEditMode('create');
        setEditItem({
            contno: product?.contno || filterContno || (contracts[0]?.contno ?? ''),
            macode: product?.macode || '',
            prcode: '',
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

    // 불러오기 모달 열기
    const openLoadModal = (product?: ProductRouting) => {
        setLoadTargetContno(product?.contno || filterContno || (contracts[0]?.contno ?? ''));
        setLoadTargetMacode(product?.macode || '');
        setLoadSearchTerm('');
        setSelectedTemplate(null);
        setSelectedDetails(new Set());
        setShowLoadModal(true);
    };

    // 템플릿 선택 시 모든 세부공정 선택
    const selectTemplate = (template: ProcessTemplate) => {
        setSelectedTemplate(template);
        setSelectedDetails(new Set(template.details.map((_, i) => i)));
    };

    // 세부공정 선택 토글
    const toggleDetailSelection = (index: number) => {
        const newSelected = new Set(selectedDetails);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedDetails(newSelected);
    };

    // 선택된 세부공정들 일괄 추가
    const handleBulkAdd = async () => {
        if (!selectedTemplate || !loadTargetContno || !loadTargetMacode) {
            alert('계약과 제품코드를 입력해주세요.');
            return;
        }

        if (selectedDetails.size === 0) {
            alert('추가할 세부공정을 선택해주세요.');
            return;
        }

        try {
            const promises = Array.from(selectedDetails).map(index => {
                const detail = selectedTemplate.details[index];
                return fetch(`${API_BASE}/pr-detail`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contno: loadTargetContno,
                        macode: loadTargetMacode,
                        prcode: selectedTemplate.prcode,
                        prname: selectedTemplate.prname,
                        pr_seq: selectedTemplate.pr_seq, // 공정 순서 추가
                        prname_detail: detail.prname_detail,
                        pr_detail_seq: detail.pr_detail_seq,
                        worker: detail.worker,
                        working_time: detail.working_time,
                        eqp_type_id: detail.eqp_type_id,
                        eqp_id: detail.eqp_id
                    })
                });
            });

            await Promise.all(promises);
            setShowLoadModal(false);
            fetchData();
            fetchSummary();
            alert(`${selectedDetails.size}개의 세부공정이 추가되었습니다.`);
        } catch (err) {
            alert('일괄 추가 중 오류가 발생했습니다.');
        }
    };

    // 모달에서 저장 시 - 대기 목록에 추가
    const handleSave = () => {
        if (!editItem.contno || !editItem.macode || !editItem.prcode || !editItem.prname_detail) {
            alert('필수 항목을 입력해주세요.');
            return;
        }

        // 완전한 PrDetail 객체 생성
        const newItem: PrDetail = {
            contno: editItem.contno,
            macode: editItem.macode,
            maname: editItem.macode || '', // 새로 추가되는 항목은 macode를 임시로 사용
            prcode: editItem.prcode,
            prname: editItem.prname || '',
            pr_seq: editItem.pr_seq || 1,
            prname_detail: editItem.prname_detail,
            pr_detail_seq: editItem.pr_detail_seq || 1,
            worker: editItem.worker || 0,
            working_time: editItem.working_time || 0,
            working_day: editItem.working_day || 0,
            eqp_type_id: editItem.eqp_type_id || '',
            eqp_id: editItem.eqp_id || '',
            eqp_name: editItem.eqp_name || '',
            wbs_vid: ''
        };

        // 대기 목록에 추가
        setPendingAdditions(prev => [...prev, newItem]);
        setShowModal(false);
    };

    // 삭제 시 - 삭제 대기 표시만 (실제 삭제는 배치 저장 시)
    const handleDelete = (item: PrDetail) => {
        const key = getItemKey(item);
        setPendingDeletions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key); // 이미 삭제 대기 중이면 취소
            } else {
                newSet.add(key); // 삭제 대기에 추가
            }
            return newSet;
        });
    };

    // 삭제 대기 취소
    const cancelDelete = (item: PrDetail) => {
        const key = getItemKey(item);
        setPendingDeletions(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
        });
    };

    // 추가 대기 취소
    const cancelAddition = (index: number) => {
        setPendingAdditions(prev => prev.filter((_, i) => i !== index));
    };

    // 배치 저장 - 모든 변경사항을 DB에 반영
    const handleBatchSave = async () => {
        if (!hasUnsavedChanges) return;

        if (!confirm(`변경사항을 저장하시겠습니까?\n- 추가: ${pendingAdditions.length}건\n- 삭제: ${pendingDeletions.size}건`)) {
            return;
        }

        setIsSaving(true);
        try {
            // 1. 삭제 처리
            const deletePromises = Array.from(pendingDeletions).map(key => {
                const [contno, macode, prcode, prname_detail] = key.split('-');
                return fetch(
                    `${API_BASE}/pr-detail/${encodeURIComponent(contno)}/${encodeURIComponent(macode)}/${encodeURIComponent(prcode)}/${encodeURIComponent(prname_detail)}`,
                    { method: 'DELETE' }
                );
            });

            // 2. 추가 처리
            const addPromises = pendingAdditions.map(item =>
                fetch(`${API_BASE}/pr-detail`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                })
            );

            await Promise.all([...deletePromises, ...addPromises]);

            // 성공 시 대기 목록 초기화
            setPendingDeletions(new Set());
            setPendingAdditions([]);

            // 데이터 새로고침
            fetchData();
            fetchSummary();

            alert('변경사항이 저장되었습니다.');
        } catch (err) {
            alert('저장 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    // 변경사항 취소 (전체)
    const discardChanges = () => {
        if (!confirm('모든 변경사항을 취소하시겠습니까?')) return;
        setPendingAdditions([]);
        setPendingDeletions(new Set());
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
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>세부공정 라우팅</h1>
                                {hasUnsavedChanges && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium animate-pulse"
                                        style={{ background: colors.warning + '20', color: colors.warning }}>
                                        저장되지 않은 변경사항 ({pendingAdditions.length + pendingDeletions.size}건)
                                    </span>
                                )}
                            </div>
                            <p className="text-sm" style={{ color: colors.gray500 }}>
                                Process Detail Routing - {summary?.product_count || 0}개 제품, {summary?.total_details || 0}건 세부공정
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {/* 저장/취소 버튼 (변경사항 있을 때만 표시) */}
                        {hasUnsavedChanges && (
                            <>
                                <button
                                    onClick={discardChanges}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                                    style={{ background: colors.gray200, color: colors.gray700 }}
                                >
                                    <X className="w-4 h-4" />
                                    취소
                                </button>
                                <button
                                    onClick={handleBatchSave}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                                    style={{ background: colors.primary }}
                                >
                                    {isSaving ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    저장 ({pendingAdditions.length + pendingDeletions.size}건)
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => openLoadModal()}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                            style={{ background: colors.info + '15', color: colors.info }}
                        >
                            <Download className="w-4 h-4" />
                            불러오기
                        </button>
                        <button
                            onClick={() => openCreate()}
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

                {/* Filters - 순서: 사업팀 → 계약 → 제품 → 공정 */}
                <div className="flex gap-4 flex-wrap">
                    <select
                        value={filterTeam}
                        onChange={(e) => setFilterTeam(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-40"
                        style={{ borderColor: colors.gray300 }}
                    >
                        <option value="">전체 사업팀</option>
                        {teams.map(t => (
                            <option key={t.team_id} value={t.team_id}>
                                {t.team_name} ({t.contract_count})
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterContno}
                        onChange={(e) => setFilterContno(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-48"
                        style={{ borderColor: colors.gray300 }}
                    >
                        <option value="">전체 계약</option>
                        {contracts.map(c => (
                            <option key={c.contno} value={c.contno}>
                                {c.contid} ({c.detail_count})
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterMacode}
                        onChange={(e) => setFilterMacode(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border text-sm min-w-56"
                        style={{ borderColor: colors.gray300 }}
                    >
                        <option value="">전체 제품</option>
                        {products.map(p => (
                            <option key={p.macode} value={p.macode}>
                                {p.maname} ({p.detail_count})
                            </option>
                        ))}
                    </select>
                    <div className="flex-1 min-w-48 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.gray400 }} />
                        <input
                            type="text"
                            placeholder="제품코드 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                </div>
            </div>

            {/* Process Legend - 클릭시 상세 팝업 */}
            {allProcesses.length > 0 && (
                <div className="bg-white rounded-xl p-4 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                    <div className="flex items-center gap-2 mb-3">
                        <Settings className="w-4 h-4" style={{ color: colors.gray500 }} />
                        <span className="text-sm font-medium" style={{ color: colors.gray700 }}>공정 범례 (클릭하여 상세 보기)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {allProcesses.map(process => (
                            <span
                                key={process.code}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all hover:scale-105"
                                style={{
                                    background: colors.gray100,
                                    color: colors.gray700,
                                    border: `1px solid ${colors.gray300}`
                                }}
                                onClick={() => {
                                    setPopupProcess(process);
                                    setShowProcessPopup(true);
                                }}
                            >
                                {process.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{error}</span>
                </div>
            )}

            {/* Routing Table */}
            <div className="bg-white rounded-xl" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead style={{ background: colors.gray100 }}>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600, width: 160 }}>제품명</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600, width: 80 }}>공정수</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>공정 흐름</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600, width: 80 }}>
                                    <div className="flex items-center justify-center gap-1">
                                        <Users className="w-3 h-3" /> 작업인원
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600, width: 80 }}>
                                    <div className="flex items-center justify-center gap-1">
                                        <Clock className="w-3 h-3" /> 총 시간
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: colors.gray600, width: 100 }}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoutings.map((product) => (
                                <React.Fragment key={product.macode}>
                                    {/* 제품 메인 행 */}
                                    <tr
                                        className="border-b cursor-pointer hover:bg-gray-50 transition-colors"
                                        style={{ borderColor: colors.gray200 }}
                                    >
                                        <td className="px-4 py-3" onClick={() => toggleExpand(product.macode)}>
                                            {(() => {
                                                // wbs_vid로 들여쓰기 수준 계산 (1.1 = 1, 1.2.1 = 2, 1.2.3.1 = 3)
                                                const depth = product.wbs_vid ? (product.wbs_vid.split('.').length - 1) : 0;
                                                return (
                                                    <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 20}px` }}>
                                                        {depth > 0 && (
                                                            <span className="text-xs" style={{ color: colors.gray400 }}>└</span>
                                                        )}
                                                        <Package className="w-4 h-4" style={{ color: colors.primary }} />
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-sm" style={{ color: colors.gray900 }}>
                                                                {product.maname}
                                                            </span>
                                                            <span className="text-xs" style={{ color: colors.gray400 }}>
                                                                ({product.macode})
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-4 py-3 text-center" onClick={() => toggleExpand(product.macode)}>
                                            <span className="px-2 py-1 rounded-full text-xs font-medium"
                                                style={{ background: colors.info + '15', color: colors.info }}>
                                                {product.processCount}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3" onClick={() => toggleExpand(product.macode)}>
                                            <div className="flex items-center gap-1 flex-wrap">
                                                {product.processes.map((process, idx) => (
                                                    <React.Fragment key={process.prcode}>
                                                        <span
                                                            className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                                                            style={{
                                                                background: getProcessColor(process.prcode) + '20',
                                                                color: getProcessColor(process.prcode)
                                                            }}
                                                            title={`${process.prname} (${process.details.length}개 세부공정)`}
                                                        >
                                                            {process.prname}
                                                        </span>
                                                        {idx < product.processes.length - 1 && (
                                                            <ChevronRight className="w-3 h-3" style={{ color: colors.gray400 }} />
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center" onClick={() => toggleExpand(product.macode)}>
                                            <span className="px-2 py-1 rounded text-xs font-medium"
                                                style={{ background: colors.warning + '20', color: colors.warning }}>
                                                {product.totalWorkers}명
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center" onClick={() => toggleExpand(product.macode)}>
                                            <span className="text-sm font-semibold" style={{ color: colors.gray700 }}>
                                                {formatTime(product.totalTime)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); openLoadModal(product); }}
                                                    className="p-1.5 rounded hover:bg-gray-100"
                                                    title="공정 불러오기"
                                                >
                                                    <Download className="w-4 h-4" style={{ color: colors.info }} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); openCreate(product); }}
                                                    className="p-1.5 rounded hover:bg-gray-100"
                                                    title="세부공정 추가"
                                                >
                                                    <Plus className="w-4 h-4" style={{ color: colors.success }} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* 확장된 공정 세부 정보 */}
                                    {expandedProducts.has(product.macode) && (
                                        <tr style={{ background: colors.gray100 }}>
                                            <td colSpan={7} className="px-8 py-4">
                                                <div className="grid grid-cols-3 gap-4">
                                                    {product.processes.map((process) => (
                                                        <div
                                                            key={process.prcode}
                                                            className="bg-white rounded-lg p-4 border"
                                                            style={{ borderColor: getProcessColor(process.prcode) + '50' }}
                                                        >
                                                            {/* 공정 헤더 */}
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="text-xs font-semibold px-2 py-1 rounded"
                                                                    style={{ background: getProcessColor(process.prcode) + '20', color: getProcessColor(process.prcode) }}>
                                                                    {process.prname} ({process.prcode})
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <span className="text-xs" style={{ color: colors.gray500 }}>
                                                                        <Users className="w-3 h-3 inline mr-1" />{process.totalWorkers}명
                                                                    </span>
                                                                    <span className="text-xs" style={{ color: colors.gray500 }}>
                                                                        <Clock className="w-3 h-3 inline mr-1" />{formatTime(process.totalTime)}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* 세부공정 목록 */}
                                                            <div className="space-y-2">
                                                                {process.details.map((detail) => {
                                                                    const isPendingDelete = pendingDeletions.has(getItemKey(detail));
                                                                    return (
                                                                        <div
                                                                            key={`${detail.prcode}-${detail.prname_detail}-${detail.pr_detail_seq}`}
                                                                            className={`flex items-center justify-between p-2 rounded transition-colors ${isPendingDelete
                                                                                ? 'bg-red-50 opacity-50'
                                                                                : 'bg-gray-50 hover:bg-gray-100'
                                                                                }`}
                                                                        >
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-xs px-1.5 py-0.5 rounded"
                                                                                    style={{ background: colors.gray300, color: colors.gray600 }}>
                                                                                    {detail.pr_seq}-{detail.pr_detail_seq || 1}
                                                                                </span>
                                                                                <span
                                                                                    className={`text-sm ${isPendingDelete ? 'line-through' : ''}`}
                                                                                    style={{ color: isPendingDelete ? colors.gray400 : colors.gray800 }}
                                                                                >
                                                                                    {detail.prname_detail}
                                                                                </span>
                                                                                {isPendingDelete && (
                                                                                    <span className="text-xs px-2 py-0.5 rounded"
                                                                                        style={{ background: colors.danger + '20', color: colors.danger }}>
                                                                                        삭제 예정
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <div className="flex items-center gap-3">
                                                                                <span className="text-xs" style={{ color: colors.warning }}>
                                                                                    {detail.worker || 0}명
                                                                                </span>
                                                                                <span className="text-xs" style={{ color: colors.cyan }}>
                                                                                    {formatTime(detail.working_time)}
                                                                                </span>
                                                                                {detail.eqp_name && (
                                                                                    <span className="text-xs px-1.5 py-0.5 rounded"
                                                                                        style={{ background: colors.info + '15', color: colors.info }}>
                                                                                        {detail.eqp_name}
                                                                                    </span>
                                                                                )}
                                                                                {!isPendingDelete && (
                                                                                    <button
                                                                                        onClick={() => openEdit(detail)}
                                                                                        className="p-1 rounded hover:bg-white"
                                                                                        title="편집"
                                                                                    >
                                                                                        <Edit2 className="w-3 h-3" style={{ color: colors.primary }} />
                                                                                    </button>
                                                                                )}
                                                                                <button
                                                                                    onClick={() => handleDelete(detail)}
                                                                                    className="p-1 rounded hover:bg-white"
                                                                                    title={isPendingDelete ? '삭제 취소' : '삭제'}
                                                                                >
                                                                                    {isPendingDelete ? (
                                                                                        <X className="w-3 h-3" style={{ color: colors.gray500 }} />
                                                                                    ) : (
                                                                                        <Trash2 className="w-3 h-3" style={{ color: colors.danger }} />
                                                                                    )}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                            {filteredRoutings.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center" style={{ color: colors.gray500 }}>
                                        {isLoading ? '로딩 중...' : '데이터가 없습니다. 계약을 선택하거나 추가 버튼을 눌러 데이터를 생성하세요.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: colors.gray200 }}>
                    <span className="text-sm" style={{ color: colors.gray500 }}>
                        {filteredRoutings.length}개 제품 ({filteredRoutings.reduce((sum, p) => sum + p.detailCount, 0)}개 세부공정)
                    </span>
                    <button
                        onClick={() => setExpandedProducts(new Set(filteredRoutings.map(r => r.macode)))}
                        className="text-xs px-3 py-1.5 rounded"
                        style={{ background: colors.gray200, color: colors.gray600 }}
                    >
                        전체 펼치기
                    </button>
                </div>
            </div>

            {/* Edit Modal - 기존 단일 추가/편집 */}
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
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>제품코드</label>
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>설비타입</label>
                                    <input
                                        type="text"
                                        value={editItem.eqp_type_id || ''}
                                        onChange={(e) => setEditItem({ ...editItem, eqp_type_id: e.target.value })}
                                        placeholder="EQ001"
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                        style={{ borderColor: colors.gray300 }}
                                    />
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

            {/* Load Modal - 기존 공정 템플릿 불러오기 */}
            {showLoadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold" style={{ color: colors.gray900 }}>
                                공정 불러오기
                            </h2>
                            <button onClick={() => setShowLoadModal(false)}>
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>

                        {/* 대상 제품 입력 */}
                        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b" style={{ borderColor: colors.gray200 }}>
                            <div>
                                <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>대상 계약</label>
                                <select
                                    value={loadTargetContno}
                                    onChange={(e) => setLoadTargetContno(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300 }}
                                >
                                    <option value="">선택</option>
                                    {contracts.map(c => (
                                        <option key={c.contno} value={c.contno}>{c.contno}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>대상 제품코드</label>
                                <input
                                    type="text"
                                    value={loadTargetMacode}
                                    onChange={(e) => setLoadTargetMacode(e.target.value)}
                                    placeholder="추가할 제품의 MACODE"
                                    className="w-full px-3 py-2 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300 }}
                                />
                            </div>
                        </div>

                        {/* 공정 검색 */}
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-1 block" style={{ color: colors.gray700 }}>
                                공정 검색 (공정명 또는 공정코드 입력)
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.gray400 }} />
                                <input
                                    type="text"
                                    value={loadSearchTerm}
                                    onChange={(e) => { setLoadSearchTerm(e.target.value); setSelectedTemplate(null); }}
                                    placeholder="예: D120, b, F140..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm"
                                    style={{ borderColor: colors.gray300 }}
                                />
                            </div>
                        </div>

                        {/* 검색 결과 또는 선택된 템플릿 */}
                        <div className="flex-1 overflow-auto">
                            {!selectedTemplate ? (
                                <div className="space-y-2">
                                    <div className="text-xs font-medium mb-2" style={{ color: colors.gray500 }}>
                                        검색 결과 ({filteredTemplates.length}개)
                                    </div>
                                    {filteredTemplates.map(template => (
                                        <div
                                            key={template.prcode}
                                            onClick={() => selectTemplate(template)}
                                            className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                                            style={{ borderColor: colors.gray200 }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="font-medium text-sm" style={{ color: colors.gray900 }}>
                                                        {template.prname}
                                                    </span>
                                                    <span className="text-xs ml-2" style={{ color: colors.gray500 }}>
                                                        ({template.prcode})
                                                    </span>
                                                </div>
                                                <span className="px-2 py-1 rounded text-xs"
                                                    style={{ background: colors.info + '15', color: colors.info }}>
                                                    {template.details.length}개 세부공정
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredTemplates.length === 0 && (
                                        <div className="text-center py-8" style={{ color: colors.gray500 }}>
                                            검색 결과가 없습니다.
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {/* 선택된 공정 헤더 */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium" style={{ color: colors.gray900 }}>
                                                {selectedTemplate.prname}
                                            </span>
                                            <span className="text-xs" style={{ color: colors.gray500 }}>
                                                ({selectedTemplate.prcode})
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedTemplate(null)}
                                            className="text-xs px-2 py-1 rounded"
                                            style={{ background: colors.gray200, color: colors.gray600 }}
                                        >
                                            다시 검색
                                        </button>
                                    </div>

                                    {/* 세부공정 목록 (선택 가능) */}
                                    <div className="space-y-2">
                                        {selectedTemplate.details.map((detail, index) => (
                                            <div
                                                key={index}
                                                onClick={() => toggleDetailSelection(index)}
                                                className="p-3 rounded-lg border cursor-pointer transition-colors"
                                                style={{
                                                    borderColor: selectedDetails.has(index) ? colors.success : colors.gray200,
                                                    background: selectedDetails.has(index) ? colors.success + '10' : 'white'
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-5 h-5 rounded border flex items-center justify-center"
                                                            style={{
                                                                borderColor: selectedDetails.has(index) ? colors.success : colors.gray300,
                                                                background: selectedDetails.has(index) ? colors.success : 'white'
                                                            }}>
                                                            {selectedDetails.has(index) && (
                                                                <Check className="w-3 h-3 text-white" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-sm" style={{ color: colors.gray900 }}>
                                                                {detail.prname_detail}
                                                            </span>
                                                            <span className="text-xs ml-2" style={{ color: colors.gray500 }}>
                                                                순서: {detail.pr_detail_seq}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs" style={{ color: colors.gray600 }}>
                                                        <span>{detail.worker}명</span>
                                                        <span>{formatTime(detail.working_time)}</span>
                                                        {detail.eqp_id && <span>{detail.eqp_id}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 전체 선택/해제 */}
                                    <div className="flex items-center gap-4 mt-3 pt-3 border-t" style={{ borderColor: colors.gray200 }}>
                                        <button
                                            onClick={() => setSelectedDetails(new Set(selectedTemplate.details.map((_, i) => i)))}
                                            className="text-xs px-3 py-1.5 rounded"
                                            style={{ background: colors.primary + '15', color: colors.primary }}
                                        >
                                            전체 선택
                                        </button>
                                        <button
                                            onClick={() => setSelectedDetails(new Set())}
                                            className="text-xs px-3 py-1.5 rounded"
                                            style={{ background: colors.gray200, color: colors.gray600 }}
                                        >
                                            전체 해제
                                        </button>
                                        <span className="text-xs" style={{ color: colors.gray500 }}>
                                            {selectedDetails.size}개 선택됨
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-2 mt-4 pt-4 border-t" style={{ borderColor: colors.gray200 }}>
                            <button
                                onClick={() => setShowLoadModal(false)}
                                className="px-4 py-2 rounded-lg text-sm font-medium"
                                style={{ background: colors.gray200, color: colors.gray700 }}
                            >
                                취소
                            </button>
                            <button
                                onClick={handleBulkAdd}
                                disabled={!selectedTemplate || selectedDetails.size === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50"
                                style={{ background: colors.success }}
                            >
                                <Plus className="w-4 h-4" />
                                {selectedDetails.size}개 세부공정 추가
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Process Detail Popup - 공정 상세 정보 팝업 */}
            {showProcessPopup && popupProcess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ background: getProcessColor(popupProcess.code) + '20' }}>
                                    <Layers className="w-5 h-5" style={{ color: getProcessColor(popupProcess.code) }} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold" style={{ color: colors.gray900 }}>
                                        {popupProcess.name}
                                    </h2>
                                    <p className="text-sm" style={{ color: colors.gray500 }}>
                                        공정코드: {popupProcess.code}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setShowProcessPopup(false)}>
                                <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                            </button>
                        </div>

                        {/* 세부공정 목록 - 중복 제거 */}
                        <div className="flex-1 overflow-auto">
                            <div className="text-xs font-medium mb-2" style={{ color: colors.gray500 }}>
                                세부공정 목록 (prname_detail 순서, 중복 제거)
                            </div>
                            <div className="space-y-2">
                                {(() => {
                                    // prname_detail 기준으로 중복 제거 및 집계
                                    const uniqueDetails = new Map<string, {
                                        prname_detail: string;
                                        worker: number;
                                        working_time: number;
                                        working_day: number;
                                        eqp_type_id: string;
                                        eqp_id: string;
                                        eqp_name: string;
                                        count: number; // 해당 세부공정이 사용된 제품 수
                                    }>();

                                    data.filter(item => item.prcode === popupProcess.code).forEach(item => {
                                        const key = item.prname_detail;
                                        if (!uniqueDetails.has(key)) {
                                            uniqueDetails.set(key, {
                                                prname_detail: item.prname_detail,
                                                worker: item.worker || 0,
                                                working_time: item.working_time || 0,
                                                working_day: item.working_day || 0,
                                                eqp_type_id: item.eqp_type_id || '',
                                                eqp_id: item.eqp_id || '',
                                                eqp_name: item.eqp_name || '',
                                                count: 1
                                            });
                                        } else {
                                            const existing = uniqueDetails.get(key)!;
                                            existing.count++;
                                        }
                                    });

                                    return Array.from(uniqueDetails.values())
                                        .sort((a, b) => a.prname_detail.localeCompare(b.prname_detail, undefined, { numeric: true }))
                                        .map((item, idx) => (
                                            <div
                                                key={`${item.prname_detail}-${idx}`}
                                                className="p-3 rounded-lg border"
                                                style={{ borderColor: colors.gray200 }}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2 py-1 rounded text-xs font-semibold"
                                                            style={{ background: getProcessColor(popupProcess.code) + '20', color: getProcessColor(popupProcess.code) }}>
                                                            {item.prname_detail}
                                                        </span>
                                                        {item.count > 1 && (
                                                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: colors.gray200, color: colors.gray600 }}>
                                                                {item.count}개 제품에서 사용
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs" style={{ color: colors.gray600 }}>
                                                        <span className="flex items-center gap-1">
                                                            <Users className="w-3 h-3" style={{ color: colors.warning }} />
                                                            {item.worker}명
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" style={{ color: colors.cyan }} />
                                                            {item.working_time ? `${item.working_time}h` : '-'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-xs">
                                                    {item.eqp_type_id && (
                                                        <span className="px-2 py-1 rounded"
                                                            style={{ background: colors.info + '15', color: colors.info }}>
                                                            설비타입: {item.eqp_type_id}
                                                        </span>
                                                    )}
                                                    {item.eqp_id && (
                                                        <span className="px-2 py-1 rounded"
                                                            style={{ background: colors.success + '15', color: colors.success }}>
                                                            설비ID: {item.eqp_id}
                                                        </span>
                                                    )}
                                                    {item.eqp_name && (
                                                        <span className="px-2 py-1 rounded"
                                                            style={{ background: colors.primary + '15', color: colors.primary }}>
                                                            {item.eqp_name}
                                                        </span>
                                                    )}
                                                    {item.working_day > 0 && (
                                                        <span className="px-2 py-1 rounded"
                                                            style={{ background: colors.gray200, color: colors.gray600 }}>
                                                            작업일수: {item.working_day}일
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ));
                                })()}
                                {data.filter(item => item.prcode === popupProcess.code).length === 0 && (
                                    <div className="text-center py-8" style={{ color: colors.gray500 }}>
                                        해당 공정에 등록된 세부공정이 없습니다.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: colors.gray200 }}>
                            <div className="flex gap-4 text-sm">
                                <span style={{ color: colors.gray600 }}>
                                    총 {new Set(data.filter(item => item.prcode === popupProcess.code).map(item => item.prname_detail)).size}개 세부공정
                                </span>
                                <span style={{ color: colors.warning }}>
                                    <Users className="w-4 h-4 inline mr-1" />
                                    {Array.from(new Map(data.filter(item => item.prcode === popupProcess.code).map(item => [item.prname_detail, item.worker || 0])).values()).reduce((sum, w) => sum + w, 0)}명
                                </span>
                                <span style={{ color: colors.cyan }}>
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    {Array.from(new Map(data.filter(item => item.prcode === popupProcess.code).map(item => [item.prname_detail, item.working_time || 0])).values()).reduce((sum, t) => sum + t, 0).toFixed(1)}h
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedProcess(popupProcess.code);
                                    setShowProcessPopup(false);
                                }}
                                className="px-4 py-2 rounded-lg text-sm font-medium"
                                style={{ background: colors.primary + '15', color: colors.primary }}
                            >
                                이 공정으로 필터
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


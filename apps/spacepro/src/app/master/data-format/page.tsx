/**
 * 데이터 포맷 화면 - SP 테이블 샘플 데이터 조회
 * Excel 시트 구조를 탭으로 표현
 */
'use client';

import React, { useState, useEffect } from 'react';
import { Database, Table2, RefreshCw, ChevronRight } from 'lucide-react';

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

// 탭 정의 (Excel 시트 구조)
const tabs = [
    { id: 'site', label: '사업장 및 설비', tables: ['sp_site_mst', 'sp_bench_mst', 'sp_eqp_type', 'sp_eqp_mst'] },
    { id: 'business', label: '사업 및 계약', tables: ['sp_undertaking_team_mst', 'sp_undertaking_info', 'sp_contract_info', 'sp_macode_info'] },
    { id: 'process', label: '공정정보', tables: ['sp_prcode_detail_info', 'sp_pr_detail'] },
    { id: 'material', label: '자재정보', tables: ['sp_material_info'] },
    { id: 'worker', label: '작업자정보', tables: ['sp_team', 'sp_employee', 'sp_work_calendar'] },
];

// 테이블 한글명
const tableLabels: Record<string, string> = {
    sp_site_mst: '사업장 마스터',
    sp_bench_mst: '작업장 마스터',
    sp_eqp_type: '설비 타입',
    sp_eqp_mst: '설비 마스터',
    sp_undertaking_team_mst: '사업팀 마스터',
    sp_undertaking_info: '사업 정보',
    sp_contract_info: '계약 정보',
    sp_macode_info: '제품 정보',
    sp_prcode_detail_info: '세부공정 정보',
    sp_pr_detail: '공정 상세',
    sp_material_info: '자재 정보',
    sp_team: '팀/분임조',
    sp_employee: '작업자',
    sp_work_calendar: '작업 캘린더',
};

interface TableData {
    columns: string[];
    rows: Record<string, any>[];
    count: number;
}

export default function DataFormatPage() {
    const [activeTab, setActiveTab] = useState('site');
    const [selectedTable, setSelectedTable] = useState('sp_site_mst');
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTableData = async (tableName: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/data-format/${tableName}?limit=20`);
            if (res.ok) {
                const data = await res.json();
                setTableData(data);
            }
        } catch (err) {
            console.error('Failed to fetch table data:', err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTableData(selectedTable);
    }, [selectedTable]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        const tab = tabs.find(t => t.id === tabId);
        if (tab && tab.tables.length > 0) {
            setSelectedTable(tab.tables[0]);
        }
    };

    const currentTab = tabs.find(t => t.id === activeTab);

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                            <Database className="w-6 h-6" style={{ color: colors.primary }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>데이터 포맷</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>
                                SpacePro sp_ 테이블 구조 및 샘플 데이터
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => fetchTableData(selectedTable)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
                        style={{ background: colors.gray200, color: colors.gray700 }}
                    >
                        <RefreshCw className="w-4 h-4" />
                        새로고침
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex border-b" style={{ borderColor: colors.gray200 }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className="px-6 py-4 text-sm font-medium transition-colors relative"
                            style={{
                                color: activeTab === tab.id ? colors.primary : colors.gray600,
                                background: activeTab === tab.id ? colors.primary + '10' : 'transparent'
                            }}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-0.5"
                                    style={{ background: colors.primary }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Table Selection */}
                <div className="p-4 flex gap-2 flex-wrap border-b" style={{ borderColor: colors.gray200, background: colors.gray100 }}>
                    {currentTab?.tables.map(table => (
                        <button
                            key={table}
                            onClick={() => setSelectedTable(table)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            style={{
                                background: selectedTable === table ? colors.primary : 'white',
                                color: selectedTable === table ? 'white' : colors.gray700,
                                boxShadow: selectedTable === table ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Table2 className="w-4 h-4" />
                            {tableLabels[table] || table}
                        </button>
                    ))}
                </div>

                {/* Table Info */}
                <div className="p-4 flex items-center justify-between" style={{ background: colors.gray100 }}>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-mono px-2 py-1 rounded" style={{ background: colors.primary + '15', color: colors.primary }}>
                            {selectedTable}
                        </span>
                        <ChevronRight className="w-4 h-4" style={{ color: colors.gray400 }} />
                        <span className="text-sm" style={{ color: colors.gray600 }}>
                            {tableLabels[selectedTable]}
                        </span>
                    </div>
                    {tableData && (
                        <span className="text-sm" style={{ color: colors.gray500 }}>
                            전체 {tableData.count}건 중 상위 20건 표시
                        </span>
                    )}
                </div>
            </div>

            {/* Data Grid */}
            <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin w-8 h-8 border-3 border-t-transparent rounded-full" style={{ borderColor: colors.primary }} />
                    </div>
                ) : tableData ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ background: colors.gray100 }}>
                                    <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: colors.gray600 }}>#</th>
                                    {tableData.columns.map(col => (
                                        <th
                                            key={col}
                                            className="px-4 py-3 text-left text-xs font-semibold whitespace-nowrap"
                                            style={{ color: colors.gray600 }}
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.rows.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-t hover:bg-gray-50"
                                        style={{ borderColor: colors.gray200 }}
                                    >
                                        <td className="px-4 py-3 text-sm" style={{ color: colors.gray500 }}>{idx + 1}</td>
                                        {tableData.columns.map(col => (
                                            <td
                                                key={col}
                                                className="px-4 py-3 text-sm whitespace-nowrap max-w-xs truncate"
                                                style={{ color: colors.gray800 }}
                                                title={String(row[col] ?? '')}
                                            >
                                                {row[col] === null ? (
                                                    <span style={{ color: colors.gray400 }}>NULL</span>
                                                ) : row[col] === true ? (
                                                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: colors.success + '20', color: colors.success }}>TRUE</span>
                                                ) : row[col] === false ? (
                                                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: colors.danger + '20', color: colors.danger }}>FALSE</span>
                                                ) : (
                                                    String(row[col]).slice(0, 50)
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center" style={{ color: colors.gray500 }}>
                        데이터를 불러올 수 없습니다
                    </div>
                )}
            </div>
        </div>
    );
}

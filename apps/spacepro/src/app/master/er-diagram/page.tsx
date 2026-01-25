/**
 * ER Diagram 화면 - sp_ 테이블 관계도
 * Interactive Entity-Relationship Diagram
 */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, ZoomIn, ZoomOut, RefreshCw, Table2, Link2 } from 'lucide-react';

const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    info: '#8950FC',
    cyan: '#0DCAF0',
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

interface TableInfo {
    name: string;
    label: string;
    category: 'site' | 'business' | 'equipment' | 'process';
    columns: { name: string; type: string; isPK?: boolean; isFK?: boolean }[];
    x: number;
    y: number;
}

interface Relationship {
    from: string;
    to: string;
    fromColumn: string;
    toColumn: string;
    type: '1:N' | '1:1' | 'N:M';
}

const tables: TableInfo[] = [
    // 조직 계층
    {
        name: 'sp_site_mst', label: '사업장', category: 'site', x: 50, y: 50, columns: [
            { name: 'site_id', type: 'varchar', isPK: true },
            { name: 'site_name', type: 'varchar' },
            { name: 'is_active', type: 'boolean' }
        ]
    },
    {
        name: 'sp_bench_mst', label: '작업장', category: 'site', x: 50, y: 200, columns: [
            { name: 'bench_id', type: 'varchar', isPK: true },
            { name: 'bench_name', type: 'varchar' },
            { name: 'site_id', type: 'varchar', isFK: true }
        ]
    },
    {
        name: 'sp_team', label: '팀/분임조', category: 'site', x: 50, y: 350, columns: [
            { name: 'team_id', type: 'int', isPK: true },
            { name: 'team_name', type: 'varchar' },
            { name: 'bench_id', type: 'varchar', isFK: true },
            { name: 'parent_team_id', type: 'int', isFK: true }
        ]
    },
    {
        name: 'sp_employee', label: '작업자', category: 'site', x: 50, y: 520, columns: [
            { name: 'employee_id', type: 'varchar', isPK: true },
            { name: 'korean_name', type: 'varchar' },
            { name: 'team_id', type: 'int', isFK: true },
            { name: 'prcode', type: 'varchar', isFK: true },
            { name: 'prname_detail', type: 'varchar' },
            { name: 'efficiency_rate', type: 'numeric' },
            { name: 'shift_group', type: 'varchar' }
        ]
    },

    // 사업 계층
    {
        name: 'sp_undertaking_team_mst', label: '사업팀', category: 'business', x: 350, y: 50, columns: [
            { name: 'undertaking_team_id', type: 'varchar', isPK: true },
            { name: 'undertaking_team_name', type: 'varchar' },
            { name: 'site_id', type: 'varchar', isFK: true }
        ]
    },
    {
        name: 'sp_undertaking_info', label: '사업정보', category: 'business', x: 350, y: 200, columns: [
            { name: 'id', type: 'int', isPK: true },
            { name: 'undertaking_name', type: 'varchar' },
            { name: 'undertaking_team_id', type: 'varchar', isFK: true }
        ]
    },
    {
        name: 'sp_contract_info', label: '계약', category: 'business', x: 350, y: 350, columns: [
            { name: 'id', type: 'int', isPK: true },
            { name: 'contno', type: 'varchar' },
            { name: 'undertaking_team_id', type: 'varchar', isFK: true },
            { name: 'price', type: 'numeric' }
        ]
    },
    {
        name: 'sp_macode_info', label: '제품', category: 'business', x: 350, y: 520, columns: [
            { name: 'macode', type: 'text', isPK: true },
            { name: 'maname', type: 'text' },
            { name: 'contno', type: 'text', isFK: true },
            { name: 'due_date', type: 'date' },
            { name: 'delivery_qty', type: 'int' },
            { name: 'wbs_vid', type: 'text' }
        ]
    },

    // 공정/세부공정
    {
        name: 'sp_prcode_detail_info', label: '세부공정', category: 'process', x: 650, y: 400, columns: [
            { name: 'contno', type: 'varchar', isFK: true },
            { name: 'macode', type: 'varchar', isFK: true },
            { name: 'prcode', type: 'varchar' },
            { name: 'prname', type: 'varchar' },
            { name: 'worker', type: 'numeric' },
            { name: 'working_time', type: 'numeric' },
            { name: 'eqp_id', type: 'varchar', isFK: true }
        ]
    },
    {
        name: 'sp_material_info', label: '자재', category: 'process', x: 650, y: 600, columns: [
            { name: 'id', type: 'int', isPK: true },
            { name: 'contno', type: 'varchar', isFK: true },
            { name: 'macode', type: 'varchar', isFK: true },
            { name: 'rawmaterial_name', type: 'varchar' }
        ]
    },

    // 설비
    {
        name: 'sp_eqp_type', label: '설비타입', category: 'equipment', x: 650, y: 50, columns: [
            { name: 'eqp_type_id', type: 'varchar', isPK: true },
            { name: 'eqp_type_name', type: 'varchar' }
        ]
    },
    {
        name: 'sp_eqp_mst', label: '설비', category: 'equipment', x: 650, y: 200, columns: [
            { name: 'eqp_id', type: 'text', isPK: true },
            { name: 'eqp_name', type: 'text' },
            { name: 'eqp_type_id', type: 'text', isFK: true },
            { name: 'daily_capacity', type: 'int' },
            { name: 'setup_time', type: 'numeric' },
            { name: 'bench_id', type: 'text', isFK: true }
        ]
    },

    // 작업 캘린더
    {
        name: 'sp_work_calendar', label: '작업캘린더', category: 'site', x: 250, y: 700, columns: [
            { name: 'id', type: 'serial', isPK: true },
            { name: 'calendar_date', type: 'date' },
            { name: 'shift_id', type: 'varchar' },
            { name: 'working_hours', type: 'numeric' },
            { name: 'is_holiday', type: 'boolean' },
            { name: 'site_id', type: 'varchar', isFK: true }
        ]
    },
];

const relationships: Relationship[] = [
    // 조직 계층
    { from: 'sp_site_mst', to: 'sp_bench_mst', fromColumn: 'site_id', toColumn: 'site_id', type: '1:N' },
    { from: 'sp_bench_mst', to: 'sp_team', fromColumn: 'bench_id', toColumn: 'bench_id', type: '1:N' },
    { from: 'sp_team', to: 'sp_employee', fromColumn: 'team_id', toColumn: 'team_id', type: '1:N' },
    // 사업 계층
    { from: 'sp_site_mst', to: 'sp_undertaking_team_mst', fromColumn: 'site_id', toColumn: 'site_id', type: '1:N' },
    { from: 'sp_undertaking_team_mst', to: 'sp_undertaking_info', fromColumn: 'undertaking_team_id', toColumn: 'undertaking_team_id', type: '1:N' },
    { from: 'sp_undertaking_info', to: 'sp_contract_info', fromColumn: 'undertaking_team_id', toColumn: 'undertaking_team_id', type: '1:N' },
    { from: 'sp_contract_info', to: 'sp_macode_info', fromColumn: 'contno', toColumn: 'contno', type: '1:N' },
    // 공정/자재
    { from: 'sp_macode_info', to: 'sp_prcode_detail_info', fromColumn: 'macode', toColumn: 'macode', type: '1:N' },
    { from: 'sp_macode_info', to: 'sp_material_info', fromColumn: 'macode', toColumn: 'macode', type: '1:N' },
    // 설비
    { from: 'sp_eqp_type', to: 'sp_eqp_mst', fromColumn: 'eqp_type_id', toColumn: 'eqp_type_id', type: '1:N' },
    { from: 'sp_bench_mst', to: 'sp_eqp_mst', fromColumn: 'bench_id', toColumn: 'bench_id', type: '1:N' },
    { from: 'sp_eqp_mst', to: 'sp_prcode_detail_info', fromColumn: 'eqp_id', toColumn: 'eqp_id', type: '1:N' },
    // 작업자-공정 관계
    { from: 'sp_employee', to: 'sp_prcode_detail_info', fromColumn: 'prcode', toColumn: 'prcode', type: '1:N' },
    // 작업 캘린더
    { from: 'sp_site_mst', to: 'sp_work_calendar', fromColumn: 'site_id', toColumn: 'site_id', type: '1:N' },
];

const categoryColors: Record<string, string> = {
    site: colors.primary,
    business: colors.success,
    equipment: colors.warning,
    process: colors.info,
};

const categoryLabels: Record<string, string> = {
    site: '조직 계층',
    business: '사업 계층',
    equipment: '설비',
    process: '공정/자재',
};

export default function ERDiagramPage() {
    const [zoom, setZoom] = useState(1);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
    const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));
    const handleReset = () => { setZoom(1); setSelectedTable(null); };

    const getTablePosition = (tableName: string) => {
        const table = tables.find(t => t.name === tableName);
        return table ? { x: table.x, y: table.y } : { x: 0, y: 0 };
    };

    const renderRelationshipLine = (rel: Relationship, index: number) => {
        const fromPos = getTablePosition(rel.from);
        const toPos = getTablePosition(rel.to);

        const fromX = fromPos.x + 130;
        const fromY = fromPos.y + 40;
        const toX = toPos.x;
        const toY = toPos.y + 40;

        const midX = (fromX + toX) / 2;

        const isHighlighted = selectedTable === rel.from || selectedTable === rel.to;

        return (
            <g key={index}>
                <path
                    d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
                    fill="none"
                    stroke={isHighlighted ? colors.primary : colors.gray700}
                    strokeWidth={isHighlighted ? 3 : 2}
                    markerEnd={isHighlighted ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                />
            </g>
        );
    };

    const renderTable = (table: TableInfo) => {
        const isSelected = selectedTable === table.name;
        const categoryColor = categoryColors[table.category];

        return (
            <g
                key={table.name}
                transform={`translate(${table.x}, ${table.y})`}
                onClick={() => setSelectedTable(isSelected ? null : table.name)}
                style={{ cursor: 'pointer' }}
            >
                {/* Shadow */}
                <rect
                    x="2"
                    y="2"
                    width="260"
                    height={60 + table.columns.length * 22}
                    rx="8"
                    fill="rgba(0,0,0,0.1)"
                />

                {/* Card */}
                <rect
                    x="0"
                    y="0"
                    width="260"
                    height={60 + table.columns.length * 22}
                    rx="8"
                    fill="white"
                    stroke={isSelected ? categoryColor : colors.gray200}
                    strokeWidth={isSelected ? 2 : 1}
                />

                {/* Header */}
                <rect
                    x="0"
                    y="0"
                    width="260"
                    height="40"
                    rx="8"
                    fill={categoryColor}
                />
                <rect
                    x="0"
                    y="32"
                    width="260"
                    height="8"
                    fill={categoryColor}
                />

                {/* Table Name */}
                <text x="12" y="17" fill="white" fontSize="11" fontFamily="monospace">
                    {table.name}
                </text>
                <text x="12" y="32" fill="white" fontSize="12" fontWeight="bold">
                    {table.label}
                </text>

                {/* Columns */}
                {table.columns.map((col, idx) => (
                    <g key={col.name} transform={`translate(12, ${50 + idx * 22})`}>
                        <text fontSize="11" fontFamily="monospace" fill={colors.gray800}>
                            <tspan fill={col.isPK ? colors.warning : col.isFK ? colors.info : colors.gray600}>
                                {col.isPK ? '🔑' : col.isFK ? '🔗' : '  '}
                            </tspan>
                            {' '}
                            <tspan fontWeight={col.isPK ? 'bold' : 'normal'}>{col.name}</tspan>
                            <tspan fill={colors.gray500}> : {col.type}</tspan>
                        </text>
                    </g>
                ))}
            </g>
        );
    };

    return (
        <div className="min-h-screen p-6" style={{ background: colors.gray100 }}>
            {/* Header */}
            <div className="bg-white rounded-xl p-6 mb-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: colors.info + '15' }}>
                            <GitBranch className="w-6 h-6" style={{ color: colors.info }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: colors.gray900 }}>ER 다이어그램</h1>
                            <p className="text-sm" style={{ color: colors.gray500 }}>
                                SpacePro sp_ 테이블 관계도 - {tables.length}개 테이블, {relationships.length}개 관계
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleZoomOut}
                            className="p-2.5 rounded-lg"
                            style={{ background: colors.gray200 }}
                        >
                            <ZoomOut className="w-5 h-5" style={{ color: colors.gray600 }} />
                        </button>
                        <button
                            onClick={handleZoomIn}
                            className="p-2.5 rounded-lg"
                            style={{ background: colors.gray200 }}
                        >
                            <ZoomIn className="w-5 h-5" style={{ color: colors.gray600 }} />
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
                            style={{ background: colors.gray200, color: colors.gray700 }}
                        >
                            <RefreshCw className="w-4 h-4" />
                            리셋
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex gap-6">
                    {Object.entries(categoryLabels).map(([cat, label]) => (
                        <div key={cat} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ background: categoryColors[cat] }} />
                            <span className="text-sm" style={{ color: colors.gray600 }}>{label}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 ml-4">
                        <span style={{ color: colors.warning }}>🔑</span>
                        <span className="text-sm" style={{ color: colors.gray600 }}>Primary Key</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span style={{ color: colors.info }}>🔗</span>
                        <span className="text-sm" style={{ color: colors.gray600 }}>Foreign Key</span>
                    </div>
                </div>
            </div>

            {/* Diagram */}
            <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                <div className="overflow-auto" style={{ height: 'calc(100vh - 280px)' }}>
                    <svg
                        ref={svgRef}
                        width={1000 * zoom}
                        height={800 * zoom}
                        viewBox="0 0 1000 800"
                        style={{ background: '#FAFBFC' }}
                    >
                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="10"
                                markerHeight="7"
                                refX="9"
                                refY="3.5"
                                orient="auto"
                            >
                                <polygon points="0 0, 10 3.5, 0 7" fill={colors.gray700} />
                            </marker>
                            <marker
                                id="arrowhead-active"
                                markerWidth="12"
                                markerHeight="9"
                                refX="11"
                                refY="4.5"
                                orient="auto"
                            >
                                <polygon points="0 0, 12 4.5, 0 9" fill={colors.primary} />
                            </marker>
                        </defs>

                        {/* Grid Pattern */}
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={colors.gray200} strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* Relationships */}
                        {relationships.map((rel, i) => renderRelationshipLine(rel, i))}

                        {/* Tables */}
                        {tables.map(renderTable)}
                    </svg>
                </div>
            </div>

            {/* Selected Table Info */}
            {selectedTable && (
                <div className="fixed bottom-6 right-6 bg-white rounded-xl p-4 shadow-lg max-w-sm" style={{ zIndex: 100 }}>
                    <div className="flex items-center gap-2 mb-3">
                        <Table2 className="w-5 h-5" style={{ color: colors.primary }} />
                        <h3 className="font-bold" style={{ color: colors.gray900 }}>{selectedTable}</h3>
                    </div>
                    <p className="text-sm mb-2" style={{ color: colors.gray600 }}>관련 테이블:</p>
                    <div className="space-y-1">
                        {relationships
                            .filter(r => r.from === selectedTable || r.to === selectedTable)
                            .map((r, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs" style={{ color: colors.gray700 }}>
                                    <Link2 className="w-3 h-3" style={{ color: colors.info }} />
                                    {r.from === selectedTable ? r.to : r.from}
                                    <span style={{ color: colors.gray400 }}>({r.type})</span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

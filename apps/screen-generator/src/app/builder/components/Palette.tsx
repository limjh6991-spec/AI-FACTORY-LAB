'use client';

/**
 * 팔레트 컴포넌트 - 레이아웃 + 컴포넌트 분리
 */

import { LAYOUT_DEFINITIONS, COMPONENT_DEFINITIONS, type LayoutType, type ComponentType } from '../types';
import { useLayoutStore } from '../store/layoutStore';
import {
    Settings,
    MousePointer,
    Layers,
    Table,
    BarChart2,
    Square,
    Columns2,
    Columns3,
    PanelTop,
    type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Settings,
    MousePointer,
    Layers,
    Table,
    BarChart2,
    Square,
    Columns2,
    Columns3,
    PanelTop,
};

interface PaletteProps {
    onComponentSelect: (type: ComponentType) => void;
}

export function Palette({ onComponentSelect }: PaletteProps) {
    const addLayout = useLayoutStore((state) => state.addLayout);

    const handleDragStart = (e: React.DragEvent, type: LayoutType) => {
        e.dataTransfer.setData('layoutType', type);
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div className="w-52 bg-white border-r border-slate-200 flex flex-col">
            {/* 레이아웃 섹션 */}
            <div className="p-4 border-b border-slate-200">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    📐 레이아웃
                </h3>
                <div className="space-y-2">
                    {LAYOUT_DEFINITIONS.map((def) => {
                        const Icon = iconMap[def.icon] || Square;
                        return (
                            <div
                                key={def.type}
                                draggable
                                onDragStart={(e) => handleDragStart(e, def.type)}
                                onClick={() => addLayout(def.type)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 cursor-grab hover:bg-blue-50 hover:border-blue-300 transition-all"
                            >
                                <Icon className="h-4 w-4 text-blue-500" />
                                <div className="flex-1">
                                    <span className="text-sm text-slate-700">{def.label}</span>
                                    {def.slotCount > 1 && (
                                        <span className="text-xs text-slate-400 ml-1">({def.slotCount}칸)</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 컴포넌트 섹션 */}
            <div className="p-4 flex-1">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    📦 컴포넌트
                </h3>
                <div className="space-y-2">
                    {COMPONENT_DEFINITIONS.map((def) => {
                        const Icon = iconMap[def.icon] || Settings;
                        return (
                            <div
                                key={def.type}
                                onClick={() => onComponentSelect(def.type)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-green-50 hover:border-green-300 transition-all"
                            >
                                <Icon className="h-4 w-4 text-green-600" />
                                <div className="flex-1">
                                    <span className="text-sm text-slate-700">{def.label}</span>
                                    {def.multiSelect && (
                                        <span className="text-xs text-green-500 ml-1">+</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <p className="text-xs text-slate-400 mt-4 px-1">
                    💡 슬롯 클릭 후 컴포넌트 선택<br />
                    <span className="text-green-500">+</span> 여러개 추가 가능
                </p>
            </div>
        </div>
    );
}

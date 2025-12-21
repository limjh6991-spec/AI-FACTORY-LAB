'use client';

/**
 * 드래그 앤 드롭 캔버스 - 멀티 슬롯 지원
 */

import { useCallback, useRef } from 'react';
import GridLayout, { type Layout } from 'react-grid-layout';
import { useLayoutStore } from '../store/layoutStore';
import type { LayoutType, Slot } from '../types';
import { LAYOUT_DEFINITIONS, COMPONENT_DEFINITIONS } from '../types';
import {
    Trash2,
    Plus,
    Settings,
    MousePointer,
    Layers,
    Table,
    BarChart2,
    Square,
    Columns2,
    Columns3,
    PanelTop,
    X,
    type LucideIcon,
} from 'lucide-react';

import 'react-grid-layout/css/styles.css';

const layoutIconMap: Record<string, LucideIcon> = {
    Square, Columns2, Columns3, PanelTop,
};

const componentIconMap: Record<string, LucideIcon> = {
    Settings, MousePointer, Layers, Table, BarChart2,
};

interface CanvasProps {
    onSlotClick: (itemId: string, slotId: string, layoutType: LayoutType) => void;
}

function SlotView({
    slot,
    itemId,
    onClick,
    isSelected,
    onRemoveComponent,
}: {
    slot: Slot;
    itemId: string;
    onClick: () => void;
    isSelected: boolean;
    onRemoveComponent: (index: number) => void;
}) {
    const hasComponents = slot.components.length > 0;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={`h-full flex flex-col border-2 rounded-lg transition-all cursor-pointer ${isSelected
                ? 'border-blue-500 bg-blue-50/50'
                : hasComponents
                    ? 'border-green-300 bg-green-50/30 hover:border-green-400'
                    : 'border-dashed border-slate-300 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
        >
            {hasComponents ? (
                <div className="flex-1 p-2 flex flex-wrap gap-1 content-start overflow-auto">
                    {slot.components.map((comp, idx) => {
                        const def = COMPONENT_DEFINITIONS.find(d => d.type === comp.type);
                        const Icon = def ? componentIconMap[def.icon] || Settings : Settings;
                        return (
                            <div
                                key={idx}
                                className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-slate-200 text-xs group"
                            >
                                <Icon className="h-3 w-3 text-green-500" />
                                <span className="text-slate-600">{comp.label || def?.label}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveComponent(idx);
                                    }}
                                    className="ml-1 p-0.5 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3 text-red-400" />
                                </button>
                            </div>
                        );
                    })}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded border border-dashed border-slate-300 text-xs text-slate-400 hover:border-blue-300 hover:text-blue-500"
                    >
                        <Plus className="h-3 w-3" />
                        추가
                    </button>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Plus className="h-6 w-6 text-slate-300 mb-1" />
                    <span className="text-xs text-slate-400">컴포넌트 추가</span>
                </div>
            )}
        </div>
    );
}

export function Canvas({ onSlotClick }: CanvasProps) {
    const { items, selectedItemId, selectedSlotId, addLayout, removeItem, updateLayout, selectSlot, removeComponent } = useLayoutStore();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('layoutType') as LayoutType;
            if (type) {
                addLayout(type);
            }
        },
        [addLayout]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    const handleLayoutChange = useCallback(
        (layout: Layout[]) => {
            updateLayout(layout);
        },
        [updateLayout]
    );

    const layout: Layout[] = items.map((item) => ({
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: item.minW,
        minH: item.minH,
    }));

    return (
        <div
            ref={containerRef}
            className="flex-1 bg-slate-100 p-4 overflow-auto"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className="bg-white rounded-lg shadow-sm min-h-[600px] p-2 border border-slate-200">
                {items.length === 0 ? (
                    <div className="h-[600px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                        <Square className="h-12 w-12 mb-4 text-slate-300" />
                        <p className="text-lg mb-2">레이아웃 영역을 배치하세요</p>
                        <p className="text-sm">왼쪽에서 드래그하거나 클릭</p>
                    </div>
                ) : (
                    <GridLayout
                        className="layout"
                        layout={layout}
                        cols={12}
                        rowHeight={50}
                        width={950}
                        onLayoutChange={handleLayoutChange}
                        draggableHandle=".drag-handle"
                        compactType="vertical"
                        preventCollision={false}
                    >
                        {items.map((item) => {
                            const layoutDef = LAYOUT_DEFINITIONS.find(d => d.type === item.type);
                            const LayoutIcon = layoutIconMap[layoutDef?.icon || 'Square'] || Square;

                            return (
                                <div key={item.i} className="relative group">
                                    {/* 드래그 핸들 */}
                                    <div className="drag-handle absolute top-0 left-0 right-0 h-5 bg-slate-200/90 cursor-move flex items-center justify-between px-2 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                                            <LayoutIcon className="h-3 w-3" />
                                            {layoutDef?.label}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeItem(item.i);
                                            }}
                                            className="p-0.5 hover:bg-red-100 rounded"
                                        >
                                            <Trash2 className="h-3 w-3 text-red-500" />
                                        </button>
                                    </div>

                                    {/* 슬롯 영역 */}
                                    <div className="h-full pt-5 pb-1 px-1">
                                        <div className={`h-full grid gap-2 ${item.slots.length === 2 ? 'grid-cols-2' :
                                            item.slots.length === 3 ? 'grid-cols-3' :
                                                'grid-cols-1'
                                            }`}>
                                            {item.slots.map((slot) => (
                                                <SlotView
                                                    key={slot.id}
                                                    slot={slot}
                                                    itemId={item.i}
                                                    isSelected={selectedItemId === item.i && selectedSlotId === slot.id}
                                                    onClick={() => {
                                                        selectSlot(item.i, slot.id);
                                                        onSlotClick(item.i, slot.id, item.type);
                                                    }}
                                                    onRemoveComponent={(idx) => removeComponent(item.i, slot.id, idx)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </GridLayout>
                )}
            </div>
        </div>
    );
}

'use client';

/**
 * 속성 패널
 * 선택된 컴포넌트의 속성 편집
 */

import { useLayoutStore } from '../store/layoutStore';
import { COMPONENT_DEFINITIONS } from '../types';
import { X } from 'lucide-react';

export function PropertyPanel() {
    const { items, selectedId, selectItem, updateItemProps, removeItem } = useLayoutStore();

    const selectedItem = items.find((item) => item.i === selectedId);
    const selectedDef = selectedItem
        ? COMPONENT_DEFINITIONS.find((d) => d.type === selectedItem.type)
        : null;

    if (!selectedItem) {
        return (
            <div className="w-64 bg-white border-l border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">속성</h3>
                <p className="text-sm text-slate-400">컴포넌트를 선택하세요</p>
            </div>
        );
    }

    return (
        <div className="w-64 bg-white border-l border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">속성</h3>
                <button
                    onClick={() => selectItem(null)}
                    className="p-1 hover:bg-slate-100 rounded"
                >
                    <X className="h-4 w-4 text-slate-400" />
                </button>
            </div>

            <div className="space-y-4">
                {/* 기본 정보 */}
                <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-500">ID</label>
                    <input
                        type="text"
                        value={selectedItem.i}
                        disabled
                        className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-500">타입</label>
                    <input
                        type="text"
                        value={selectedDef?.label || selectedItem.type}
                        disabled
                        className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-500"
                    />
                </div>

                {/* 위치/크기 */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-slate-500">X</label>
                        <input
                            type="number"
                            value={selectedItem.x}
                            disabled
                            className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-slate-500">Y</label>
                        <input
                            type="number"
                            value={selectedItem.y}
                            disabled
                            className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-slate-500">너비</label>
                        <input
                            type="number"
                            value={selectedItem.w}
                            disabled
                            className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-slate-500">높이</label>
                        <input
                            type="number"
                            value={selectedItem.h}
                            disabled
                            className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md"
                        />
                    </div>
                </div>

                {/* 사용자 정의 속성 (확장용) */}
                <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-500">라벨</label>
                    <input
                        type="text"
                        value={(selectedItem.props?.label as string) || ''}
                        onChange={(e) => updateItemProps(selectedItem.i, { label: e.target.value })}
                        placeholder="컴포넌트 라벨"
                        className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* 삭제 버튼 */}
                <button
                    onClick={() => removeItem(selectedItem.i)}
                    className="w-full mt-4 px-4 py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

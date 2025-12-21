'use client';

/**
 * 컴포넌트 미리보기
 * 실제 렌더링될 컴포넌트의 플레이스홀더
 */

import type { ComponentType } from '../types';
import {
    Settings,
    MousePointer,
    Layers,
    Table,
    BarChart2,
} from 'lucide-react';

interface ComponentPreviewProps {
    type: ComponentType;
    id: string;
    isSelected: boolean;
}

export function ComponentPreview({ type, id, isSelected }: ComponentPreviewProps) {
    const borderClass = isSelected
        ? 'border-blue-500 bg-blue-50'
        : 'border-slate-300 bg-white hover:border-blue-300';

    const renderContent = () => {
        switch (type) {
            case 'Option':
                return (
                    <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">옵션 영역</span>
                        <div className="flex gap-2 ml-auto">
                            <div className="w-24 h-6 bg-slate-100 rounded border border-slate-200" />
                            <div className="w-24 h-6 bg-slate-100 rounded border border-slate-200" />
                        </div>
                    </div>
                );
            case 'Button':
                return (
                    <div className="flex items-center justify-center">
                        <button className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 flex items-center gap-2">
                            <MousePointer className="h-3 w-3" />
                            버튼
                        </button>
                    </div>
                );
            case 'Tab':
                return (
                    <div className="flex flex-col h-full">
                        <div className="flex border-b border-slate-200">
                            <div className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-500 bg-white">탭1</div>
                            <div className="px-4 py-2 text-sm text-slate-500 bg-slate-50">탭2</div>
                            <div className="px-4 py-2 text-sm text-slate-500 bg-slate-50">탭3</div>
                        </div>
                        <div className="flex-1 p-4 bg-slate-50 flex items-center justify-center">
                            <Layers className="h-6 w-6 text-slate-300" />
                        </div>
                    </div>
                );
            case 'Grid':
                return (
                    <div className="flex flex-col h-full">
                        <div className="flex bg-slate-100 border-b border-slate-200 text-xs font-medium text-slate-600">
                            <div className="flex-1 px-3 py-2 border-r border-slate-200">컬럼1</div>
                            <div className="flex-1 px-3 py-2 border-r border-slate-200">컬럼2</div>
                            <div className="flex-1 px-3 py-2">컬럼3</div>
                        </div>
                        <div className="flex-1 flex items-center justify-center text-slate-400">
                            <Table className="h-8 w-8" />
                        </div>
                    </div>
                );
            case 'Chart':
                return (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <BarChart2 className="h-12 w-12 mb-2" />
                        <span className="text-xs">차트 영역</span>
                    </div>
                );
            default:
                return <div className="text-sm text-slate-500">{type}</div>;
        }
    };

    return (
        <div
            className={`h-full w-full border-2 rounded-lg overflow-hidden transition-colors ${borderClass}`}
        >
            <div className="h-full p-2">{renderContent()}</div>
        </div>
    );
}

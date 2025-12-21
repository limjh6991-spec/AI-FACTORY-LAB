'use client';

/**
 * 템플릿 선택 컴포넌트
 * 미리 정의된 화면 레이아웃 프리셋 선택
 */

import { TEMPLATE_PRESETS, type TemplatePreset } from '../types';
import {
    TableProperties,
    Columns2,
    BarChart2,
    FileText,
    X,
    type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    TableProperties,
    Columns2,
    BarChart2,
    FileText,
};

interface TemplateSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (template: TemplatePreset) => void;
}

export function TemplateSelector({ isOpen, onClose, onSelect }: TemplateSelectorProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[700px] overflow-hidden">
                {/* 헤더 */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-500 to-blue-600">
                    <div>
                        <h2 className="text-lg font-semibold text-white">📐 템플릿 선택</h2>
                        <p className="text-sm text-blue-100">미리 정의된 화면 레이아웃을 선택하세요</p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
                        <X className="h-5 w-5 text-white" />
                    </button>
                </div>

                {/* 템플릿 목록 */}
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                        {TEMPLATE_PRESETS.map((template) => {
                            const Icon = iconMap[template.icon] || TableProperties;
                            return (
                                <button
                                    key={template.id}
                                    onClick={() => {
                                        onSelect(template);
                                        onClose();
                                    }}
                                    className="p-5 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-left transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                                            <Icon className="h-6 w-6 text-slate-500 group-hover:text-blue-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800 mb-1">{template.name}</h3>
                                            <p className="text-sm text-slate-500">{template.description}</p>
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {template.layout.map((item) => (
                                                    <span
                                                        key={item.i}
                                                        className="px-2 py-0.5 text-xs bg-slate-100 text-slate-500 rounded"
                                                    >
                                                        {item.type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 푸터 */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-center">
                    <p className="text-sm text-slate-400">
                        템플릿 선택 후 컴포넌트를 자유롭게 수정할 수 있습니다
                    </p>
                </div>
            </div>
        </div>
    );
}

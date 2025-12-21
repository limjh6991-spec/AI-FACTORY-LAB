'use client';

/**
 * 컴포넌트 선택 팝업 - 슬롯에 컴포넌트 추가
 * 레이아웃 타입에 따라 선택 가능한 컴포넌트 필터링
 */

import { useState, useEffect } from 'react';
import { COMPONENT_DEFINITIONS, COMPONENT_TEMPLATES, type ComponentType, type LayoutType } from '../types';
import {
    Settings,
    MousePointer,
    Layers,
    Table,
    BarChart2,
    X,
    Check,
    type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Settings, MousePointer, Layers, Table, BarChart2,
};

// 레이아웃 타입별 허용 컴포넌트
const ALLOWED_COMPONENTS: Record<LayoutType, ComponentType[]> = {
    ToolbarRow: ['Option', 'Button'],           // 툴바: 옵션, 버튼만
    FullWidth: ['Tab', 'Grid', 'Chart'],        // 전체 너비: 탭, 그리드, 차트
    Row2: ['Tab', 'Grid', 'Chart'],             // 2열: 탭, 그리드, 차트
    Row3: ['Tab', 'Grid', 'Chart'],             // 3열: 탭, 그리드, 차트
};

interface ComponentSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (component: { type: ComponentType; templateId: string; label: string }) => void;
    initialType?: ComponentType;
    layoutType?: LayoutType;  // 레이아웃 타입 추가
}

export function ComponentSelector({ isOpen, onClose, onSelect, initialType, layoutType }: ComponentSelectorProps) {
    const [selectedType, setSelectedType] = useState<ComponentType | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    // 허용된 컴포넌트 필터링
    const allowedTypes = layoutType ? ALLOWED_COMPONENTS[layoutType] : COMPONENT_DEFINITIONS.map(d => d.type);
    const filteredDefinitions = COMPONENT_DEFINITIONS.filter(d => allowedTypes.includes(d.type));

    useEffect(() => {
        if (isOpen) {
            // initialType이 허용된 타입인지 확인
            const validInitialType = initialType && allowedTypes.includes(initialType) ? initialType : null;
            setSelectedType(validInitialType);
            setSelectedTemplate(null);
        }
    }, [isOpen, initialType, allowedTypes]);

    if (!isOpen) return null;

    const templates = selectedType ? COMPONENT_TEMPLATES[selectedType] : [];
    const selectedDef = selectedType
        ? COMPONENT_DEFINITIONS.find(d => d.type === selectedType)
        : null;

    const handleConfirm = () => {
        if (selectedType && selectedTemplate) {
            const template = templates.find(t => t.id === selectedTemplate);
            onSelect({
                type: selectedType,
                templateId: selectedTemplate,
                label: template?.label || selectedType,
            });
            // 멀티 셀렉트인 경우 닫지 않음
            if (selectedDef?.multiSelect) {
                setSelectedTemplate(null);
            } else {
                onClose();
            }
        }
    };

    // 레이아웃 타입에 따른 안내 메시지
    const getLayoutMessage = () => {
        if (!layoutType) return null;
        if (layoutType === 'ToolbarRow') {
            return '🔧 툴바 영역: 옵션, 버튼만 선택 가능';
        }
        return '📊 콘텐츠 영역: 탭, 그리드, 차트만 선택 가능';
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[650px] max-h-[80vh] overflow-hidden">
                {/* 헤더 */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">공통 컴포넌트 선택</h2>
                        {layoutType && (
                            <p className="text-sm text-blue-600">{getLayoutMessage()}</p>
                        )}
                        {selectedDef?.multiSelect && (
                            <p className="text-sm text-green-600">여러 개 추가 가능</p>
                        )}
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* 본문 */}
                <div className="flex h-[400px]">
                    {/* 컴포넌트 타입 목록 */}
                    <div className="w-48 border-r border-slate-200 p-4">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">컴포넌트 타입</h3>
                        <div className="space-y-1">
                            {filteredDefinitions.map((def) => {
                                const Icon = iconMap[def.icon] || Settings;
                                const isSelected = selectedType === def.type;
                                return (
                                    <button
                                        key={def.type}
                                        onClick={() => {
                                            setSelectedType(def.type);
                                            setSelectedTemplate(null);
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${isSelected
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'hover:bg-slate-50 text-slate-600'
                                            }`}
                                    >
                                        <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-500' : 'text-slate-400'}`} />
                                        <span className="text-sm font-medium flex-1">{def.label}</span>
                                        {def.multiSelect && (
                                            <span className="text-xs text-green-500">+</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 템플릿 목록 */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        {selectedType ? (
                            <>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">
                                    {COMPONENT_DEFINITIONS.find(d => d.type === selectedType)?.label} 템플릿
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {templates.map((template) => {
                                        const isSelected = selectedTemplate === template.id;
                                        return (
                                            <button
                                                key={template.id}
                                                onClick={() => setSelectedTemplate(template.id)}
                                                className={`p-4 rounded-lg border-2 text-left transition-all ${isSelected
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium text-slate-700">{template.label}</span>
                                                    {isSelected && <Check className="h-4 w-4 text-blue-500" />}
                                                </div>
                                                <p className="text-xs text-slate-400">{template.id}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400">
                                <p>컴포넌트 타입을 선택하세요</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 푸터 */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {selectedDef?.multiSelect ? '완료' : '취소'}
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedType || !selectedTemplate}
                        className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {selectedDef?.multiSelect ? '추가' : '선택'}
                    </button>
                </div>
            </div>
        </div>
    );
}

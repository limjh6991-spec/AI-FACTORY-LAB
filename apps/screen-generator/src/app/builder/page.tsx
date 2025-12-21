'use client';

/**
 * 레이아웃 빌더 메인 페이지 - 템플릿 프리셋 지원
 */

import { useState } from 'react';
import { Palette } from './components/Palette';
import { Canvas } from './components/Canvas';
import { ComponentSelector } from './components/ComponentSelector';
import { TemplateSelector } from './components/TemplateSelector';
import { useLayoutStore } from './store/layoutStore';
import type { ComponentType, TemplatePreset, LayoutType } from './types';
import { Save, Trash2, Download, Upload, Layout } from 'lucide-react';

export default function BuilderPage() {
    const { items, clearAll, loadLayout, addComponent, selectedItemId, selectedSlotId } = useLayoutStore();
    const [selectorOpen, setSelectorOpen] = useState(false);
    const [templateSelectorOpen, setTemplateSelectorOpen] = useState(false);
    const [targetItemId, setTargetItemId] = useState<string | null>(null);
    const [targetSlotId, setTargetSlotId] = useState<string | null>(null);
    const [targetLayoutType, setTargetLayoutType] = useState<LayoutType | undefined>();
    const [initialComponentType, setInitialComponentType] = useState<ComponentType | undefined>();

    // 슬롯 클릭 시 컴포넌트 선택 팝업
    const handleSlotClick = (itemId: string, slotId: string, layoutType: LayoutType) => {
        setTargetItemId(itemId);
        setTargetSlotId(slotId);
        setTargetLayoutType(layoutType);
        setInitialComponentType(undefined);
        setSelectorOpen(true);
    };

    // 팔레트에서 컴포넌트 선택 시
    const handleComponentSelect = (type: ComponentType) => {
        if (selectedItemId && selectedSlotId) {
            setTargetItemId(selectedItemId);
            setTargetSlotId(selectedSlotId);
            setInitialComponentType(type);
            setSelectorOpen(true);
        } else {
            alert('먼저 슬롯을 선택하세요');
        }
    };

    // 컴포넌트 선택 완료
    const handleSelectComplete = (component: { type: ComponentType; templateId: string; label: string }) => {
        if (targetItemId && targetSlotId) {
            addComponent(targetItemId, targetSlotId, component);
        }
    };

    // 템플릿 선택 완료
    const handleTemplateSelect = (template: TemplatePreset) => {
        // 기존 레이아웃 클리어 후 템플릿 적용
        loadLayout(template.layout);
    };

    const handleExport = () => {
        const json = JSON.stringify(items, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'layout.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const text = await file.text();
                try {
                    const parsed = JSON.parse(text);
                    loadLayout(parsed);
                } catch {
                    alert('JSON 파일을 파싱할 수 없습니다.');
                }
            }
        };
        input.click();
    };

    const handleSave = () => {
        const json = JSON.stringify(items, null, 2);
        console.log('Layout JSON:', json);
        alert('레이아웃이 콘솔에 저장되었습니다.\n\n' + json.substring(0, 500) + '...');
    };

    // 컴포넌트 수 계산
    const componentCount = items.reduce((sum, item) =>
        sum + item.slots.reduce((slotSum, slot) => slotSum + slot.components.length, 0), 0
    );

    return (
        <div className="h-screen flex flex-col bg-slate-50">
            {/* 툴바 */}
            <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <h1 className="text-lg font-bold text-slate-800">🛠️ 레이아웃 빌더</h1>
                    <span className="text-sm text-slate-400">|</span>
                    <span className="text-sm text-slate-500">{items.length}개 영역</span>
                    <span className="text-sm text-slate-400">·</span>
                    <span className="text-sm text-green-600">{componentCount}개 컴포넌트</span>
                </div>
                <div className="flex items-center gap-2">
                    {/* 템플릿 버튼 */}
                    <button
                        onClick={() => setTemplateSelectorOpen(true)}
                        className="px-3 py-1.5 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all flex items-center gap-1.5 shadow-md"
                    >
                        <Layout className="h-4 w-4" />
                        템플릿
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                        onClick={handleImport}
                        className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                        <Upload className="h-4 w-4" />
                        불러오기
                    </button>
                    <button
                        onClick={handleExport}
                        className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                        <Download className="h-4 w-4" />
                        내보내기
                    </button>
                    <button
                        onClick={clearAll}
                        className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                        <Trash2 className="h-4 w-4" />
                        초기화
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                        <Save className="h-4 w-4" />
                        저장
                    </button>
                </div>
            </div>

            {/* 메인 영역 */}
            <div className="flex-1 flex overflow-hidden">
                <Palette onComponentSelect={handleComponentSelect} />
                <Canvas onSlotClick={handleSlotClick} />
            </div>

            {/* 컴포넌트 선택 팝업 */}
            <ComponentSelector
                isOpen={selectorOpen}
                onClose={() => {
                    setSelectorOpen(false);
                    setTargetItemId(null);
                    setTargetSlotId(null);
                    setTargetLayoutType(undefined);
                }}
                onSelect={handleSelectComplete}
                initialType={initialComponentType}
                layoutType={targetLayoutType}
            />

            {/* 템플릿 선택 팝업 */}
            <TemplateSelector
                isOpen={templateSelectorOpen}
                onClose={() => setTemplateSelectorOpen(false)}
                onSelect={handleTemplateSelect}
            />
        </div>
    );
}

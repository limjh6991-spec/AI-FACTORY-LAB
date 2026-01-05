/**
 * ScenarioModal Component
 * 시나리오 저장 모달
 */

import React from 'react';
import { Save } from 'lucide-react';
import { colors } from '../types';

interface ScenarioModalProps {
    show: boolean;
    scenarioName: string;
    saveAsNew: boolean;
    currentScenarioId: number | null;
    onClose: () => void;
    onSave: () => void;
    onNameChange: (name: string) => void;
    onSaveAsNewChange: (value: boolean) => void;
}

export function ScenarioModal({
    show,
    scenarioName,
    saveAsNew,
    currentScenarioId,
    onClose,
    onSave,
    onNameChange,
    onSaveAsNewChange
}: ScenarioModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.gray800 }}>시나리오 저장</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-1" style={{ color: colors.gray600 }}>
                            시나리오 이름
                        </label>
                        <input
                            type="text"
                            value={scenarioName}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="예: 1월 생산계획 v1"
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                            style={{ borderColor: colors.gray300 }}
                        />
                    </div>
                    {currentScenarioId && (
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="saveAsNew"
                                checked={saveAsNew}
                                onChange={(e) => onSaveAsNewChange(e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="saveAsNew" className="text-sm" style={{ color: colors.gray600 }}>
                                새 시나리오로 저장 (체크 해제 시 기존 시나리오 덮어쓰기)
                            </label>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ background: colors.gray200, color: colors.gray700 }}
                    >
                        취소
                    </button>
                    <button
                        onClick={onSave}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ background: colors.primary }}
                    >
                        <Save className="w-4 h-4" /> 저장
                    </button>
                </div>
            </div>
        </div>
    );
}

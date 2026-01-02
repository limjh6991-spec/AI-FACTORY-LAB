'use client';

import React from 'react';
import { X } from 'lucide-react';
import { colors } from './constants';
import { Version } from './types';

interface SaveModalProps {
    show: boolean;
    versionName: string;
    onVersionNameChange: (name: string) => void;
    onSave: () => void;
    onClose: () => void;
}

export function SaveVersionModal({ show, versionName, onVersionNameChange, onSave, onClose }: SaveModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg" style={{ color: colors.gray900 }}>버전 저장</h3>
                    <button onClick={onClose}>
                        <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="버전명 입력 (예: 1월 기준안)"
                    value={versionName}
                    onChange={(e) => onVersionNameChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border text-sm mb-4"
                    style={{ borderColor: colors.gray300 }}
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm"
                        style={{ background: colors.gray200, color: colors.gray700 }}
                    >
                        취소
                    </button>
                    <button
                        onClick={onSave}
                        disabled={!versionName.trim()}
                        className="px-4 py-2 rounded-lg text-sm text-white"
                        style={{ background: versionName.trim() ? colors.success : colors.gray400 }}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

interface LoadModalProps {
    show: boolean;
    versions: Version[];
    onLoad: (id: number) => void;
    onClose: () => void;
}

export function LoadVersionModal({ show, versions, onLoad, onClose }: LoadModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[500px] max-h-[70vh] overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg" style={{ color: colors.gray900 }}>버전 불러오기</h3>
                    <button onClick={onClose}>
                        <X className="w-5 h-5" style={{ color: colors.gray500 }} />
                    </button>
                </div>
                <div className="overflow-y-auto max-h-[50vh]">
                    {versions.length === 0 ? (
                        <p className="text-center py-8" style={{ color: colors.gray500 }}>저장된 버전이 없습니다.</p>
                    ) : (
                        <div className="space-y-2">
                            {versions.map(v => (
                                <div
                                    key={v.id}
                                    onClick={() => onLoad(v.id)}
                                    className="p-3 rounded-lg cursor-pointer hover:bg-gray-50 border"
                                    style={{ borderColor: colors.gray200 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium" style={{ color: colors.gray800 }}>{v.version_name}</span>
                                        <span className="text-xs" style={{ color: colors.gray500 }}>{v.plan_month}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-xs" style={{ color: colors.gray500 }}>{v.created_at.split('T')[0]}</span>
                                        <span className="text-xs" style={{ color: v.bottleneck_count > 0 ? colors.danger : colors.success }}>
                                            가동률 {v.avg_utilization}% | 병목 {v.bottleneck_count}개
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

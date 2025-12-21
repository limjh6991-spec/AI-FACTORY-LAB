/**
 * Binary Soft - 설정
 * 시스템 설정 페이지
 */

'use client';

import React, { useState } from 'react';
import {
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Database,
    Mail,
    Smartphone,
    Sun,
    Moon,
    Save,
    ChevronRight
} from 'lucide-react';

// 색상 팔레트
const colors = {
    primary: '#3699FF',
    success: '#1BC5BD',
    warning: '#FFA800',
    danger: '#F64E60',
    dark: '#181C32',
    gray100: '#F5F8FA',
    gray200: '#EFF2F5',
    gray300: '#E4E6EF',
    gray400: '#B5B5C3',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
    gray700: '#5E6278',
    gray800: '#3F4254',
    gray900: '#181C32',
    white: '#FFFFFF',
};

// 설정 섹션 타입
interface SettingSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
}

const settingSections: SettingSection[] = [
    { id: 'profile', title: '프로필 설정', icon: <User className="w-5 h-5" />, description: '이름, 이메일 등 개인 정보 관리' },
    { id: 'notifications', title: '알림 설정', icon: <Bell className="w-5 h-5" />, description: '이메일, 푸시 알림 설정' },
    { id: 'security', title: '보안 설정', icon: <Shield className="w-5 h-5" />, description: '비밀번호, 2단계 인증' },
    { id: 'appearance', title: '화면 설정', icon: <Palette className="w-5 h-5" />, description: '테마, 언어 설정' },
    { id: 'data', title: '데이터 관리', icon: <Database className="w-5 h-5" />, description: '데이터 내보내기, 백업' },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        projectUpdates: true,
        weeklyReport: false,
    });

    return (
        <div className="min-h-screen" style={{ background: colors.gray100 }}>
            {/* Header */}
            <header className="h-[65px] bg-white border-b flex items-center justify-between px-8" style={{ borderColor: colors.gray200 }}>
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-semibold" style={{ color: colors.gray900 }}>설정</h1>
                    <span className="text-sm" style={{ color: colors.gray500 }}>시스템 설정 및 환경설정</span>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ background: colors.primary }}
                >
                    <Save className="w-4 h-4" />
                    변경사항 저장
                </button>
            </header>

            {/* Settings Content */}
            <main className="p-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* Settings Menu */}
                    <div className="col-span-3">
                        <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            <div className="p-4">
                                {settingSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors mb-1"
                                        style={{
                                            background: activeSection === section.id ? colors.primary + '10' : 'transparent',
                                            color: activeSection === section.id ? colors.primary : colors.gray700,
                                        }}
                                    >
                                        <span style={{ color: activeSection === section.id ? colors.primary : colors.gray400 }}>
                                            {section.icon}
                                        </span>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{section.title}</p>
                                            <p className="text-xs" style={{ color: colors.gray500 }}>{section.description}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4" style={{ color: colors.gray400 }} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    <div className="col-span-9">
                        <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 20px 0 rgba(76,87,125,.02)' }}>
                            {/* Profile Settings */}
                            {activeSection === 'profile' && (
                                <div>
                                    <h3 className="text-base font-semibold mb-6" style={{ color: colors.gray900 }}>프로필 설정</h3>

                                    <div className="flex items-center gap-6 mb-8 pb-8 border-b" style={{ borderColor: colors.gray200 }}>
                                        <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: colors.gray200 }}>
                                            <User className="w-10 h-10" style={{ color: colors.gray400 }} />
                                        </div>
                                        <div>
                                            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white mb-2" style={{ background: colors.primary }}>
                                                사진 변경
                                            </button>
                                            <p className="text-xs" style={{ color: colors.gray500 }}>JPG, PNG 형식, 최대 2MB</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: colors.gray700 }}>이름</label>
                                            <input
                                                type="text"
                                                defaultValue="관리자"
                                                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                                                style={{ borderColor: colors.gray300, color: colors.gray800 }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: colors.gray700 }}>이메일</label>
                                            <input
                                                type="email"
                                                defaultValue="admin@binarysoft.co.kr"
                                                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                                                style={{ borderColor: colors.gray300, color: colors.gray800 }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: colors.gray700 }}>전화번호</label>
                                            <input
                                                type="tel"
                                                defaultValue="010-1234-5678"
                                                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                                                style={{ borderColor: colors.gray300, color: colors.gray800 }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: colors.gray700 }}>부서</label>
                                            <input
                                                type="text"
                                                defaultValue="개발팀"
                                                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                                                style={{ borderColor: colors.gray300, color: colors.gray800 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notification Settings */}
                            {activeSection === 'notifications' && (
                                <div>
                                    <h3 className="text-base font-semibold mb-6" style={{ color: colors.gray900 }}>알림 설정</h3>

                                    <div className="space-y-4">
                                        {[
                                            { key: 'email', label: '이메일 알림', desc: '중요 알림을 이메일로 받습니다', icon: <Mail className="w-5 h-5" /> },
                                            { key: 'push', label: '푸시 알림', desc: '브라우저 푸시 알림을 받습니다', icon: <Smartphone className="w-5 h-5" /> },
                                            { key: 'projectUpdates', label: '프로젝트 업데이트', desc: '프로젝트 변경사항 알림을 받습니다', icon: <Bell className="w-5 h-5" /> },
                                            { key: 'weeklyReport', label: '주간 리포트', desc: '매주 월요일 주간 요약 이메일을 받습니다', icon: <Globe className="w-5 h-5" /> },
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                                <div className="flex items-center gap-3">
                                                    <span style={{ color: colors.gray400 }}>{item.icon}</span>
                                                    <div>
                                                        <p className="text-sm font-medium" style={{ color: colors.gray800 }}>{item.label}</p>
                                                        <p className="text-xs" style={{ color: colors.gray500 }}>{item.desc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                                    className="w-12 h-6 rounded-full transition-colors relative"
                                                    style={{ background: notifications[item.key as keyof typeof notifications] ? colors.success : colors.gray300 }}
                                                >
                                                    <div
                                                        className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform"
                                                        style={{
                                                            left: notifications[item.key as keyof typeof notifications] ? '26px' : '2px',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Appearance Settings */}
                            {activeSection === 'appearance' && (
                                <div>
                                    <h3 className="text-base font-semibold mb-6" style={{ color: colors.gray900 }}>화면 설정</h3>

                                    <div className="mb-8">
                                        <label className="block text-sm font-medium mb-4" style={{ color: colors.gray700 }}>테마</label>
                                        <div className="flex gap-4">
                                            {[
                                                { value: 'light', label: '라이트', icon: <Sun className="w-5 h-5" /> },
                                                { value: 'dark', label: '다크', icon: <Moon className="w-5 h-5" /> },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setTheme(option.value)}
                                                    className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-colors"
                                                    style={{
                                                        borderColor: theme === option.value ? colors.primary : colors.gray200,
                                                        background: theme === option.value ? colors.primary + '10' : colors.white,
                                                        color: theme === option.value ? colors.primary : colors.gray600,
                                                    }}
                                                >
                                                    {option.icon}
                                                    <span className="text-sm font-medium">{option.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-4" style={{ color: colors.gray700 }}>언어</label>
                                        <select
                                            className="px-4 py-2.5 rounded-lg border text-sm"
                                            style={{ borderColor: colors.gray300, color: colors.gray800 }}
                                        >
                                            <option value="ko">한국어</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Security Settings */}
                            {activeSection === 'security' && (
                                <div>
                                    <h3 className="text-base font-semibold mb-6" style={{ color: colors.gray900 }}>보안 설정</h3>

                                    <div className="space-y-6">
                                        <div className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <p className="text-sm font-medium" style={{ color: colors.gray800 }}>비밀번호 변경</p>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>마지막 변경: 30일 전</p>
                                                </div>
                                                <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: colors.primary, color: colors.white }}>
                                                    변경하기
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-lg" style={{ background: colors.gray100 }}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium" style={{ color: colors.gray800 }}>2단계 인증</p>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>추가 보안을 위해 2단계 인증 사용</p>
                                                </div>
                                                <button
                                                    className="w-12 h-6 rounded-full transition-colors relative"
                                                    style={{ background: colors.gray300 }}
                                                >
                                                    <div
                                                        className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5"
                                                        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Data Settings */}
                            {activeSection === 'data' && (
                                <div>
                                    <h3 className="text-base font-semibold mb-6" style={{ color: colors.gray900 }}>데이터 관리</h3>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-lg border" style={{ borderColor: colors.gray200 }}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium" style={{ color: colors.gray800 }}>데이터 내보내기</p>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>모든 프로젝트 데이터를 CSV로 내보냅니다</p>
                                                </div>
                                                <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.gray300, color: colors.gray700 }}>
                                                    내보내기
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-lg border" style={{ borderColor: colors.gray200 }}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium" style={{ color: colors.gray800 }}>백업 생성</p>
                                                    <p className="text-xs" style={{ color: colors.gray500 }}>마지막 백업: 7일 전</p>
                                                </div>
                                                <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.gray300, color: colors.gray700 }}>
                                                    백업하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

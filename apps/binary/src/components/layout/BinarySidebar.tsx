'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Settings, BookOpen, Users, ChevronDown, ChevronRight } from 'lucide-react';

// 색상 팔레트
const colors = {
    primary: '#3699FF',
    dark: '#181C32',
    gray400: '#B5B5C3',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
};

// 메뉴 아이템 타입
interface MenuItem {
    id: string;
    name: string;
    path: string;
    icon: React.ReactNode;
    children?: MenuItem[];
}

// 상단 메뉴
const mainMenuItems: MenuItem[] = [
    {
        id: 'dashboard',
        name: '대시보드',
        path: '/dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
        id: 'projects',
        name: '프로젝트',
        path: '/projects',
        icon: <FolderKanban className="w-5 h-5" />,
    },
    {
        id: 'standards',
        name: '프로젝트 수행표준',
        path: '/standards',
        icon: <BookOpen className="w-5 h-5" />,
    },
    {
        id: 'kickoff',
        name: '킥오프미팅',
        path: '/kickoff',
        icon: <Users className="w-5 h-5" />,
    },
];

// 하단 고정 메뉴
const bottomMenuItems: MenuItem[] = [
    {
        id: 'settings',
        name: '설정',
        path: '/settings',
        icon: <Settings className="w-5 h-5" />,
    },
];

export function BinarySidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (!path) return false;
        return pathname === path || pathname.startsWith(path + '/');
    };

    const renderMenuItem = (item: MenuItem) => {
        const active = isActive(item.path);

        return (
            <Link
                key={item.id}
                href={item.path}
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-[13px] transition-colors mb-1"
                style={{
                    color: active ? 'white' : colors.gray500,
                    background: active ? colors.primary : 'transparent',
                }}
            >
                <span className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                </span>
                <span>{item.name}</span>
            </Link>
        );
    };

    return (
        <aside
            className="fixed left-0 top-0 h-full w-[265px] flex flex-col"
            style={{ background: colors.dark }}
        >
            {/* Logo */}
            <div className="h-[65px] flex items-center px-6">
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded flex items-center justify-center"
                        style={{ background: colors.primary }}
                    >
                        <span className="text-white font-bold">B</span>
                    </div>
                    <span className="text-white text-lg font-semibold">Binary Soft</span>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
                <div className="mb-4">
                    <span
                        className="text-[11px] font-semibold uppercase px-4"
                        style={{ color: colors.gray600 }}
                    >
                        메뉴
                    </span>
                </div>
                {mainMenuItems.map((menu) => renderMenuItem(menu))}
            </nav>

            {/* Bottom Menu (Settings) */}
            <div className="px-4 py-4 border-t border-white/10">
                {bottomMenuItems.map((menu) => renderMenuItem(menu))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <div className="text-[11px] text-center" style={{ color: colors.gray600 }}>
                    Binary Soft v1.0
                </div>
            </div>
        </aside>
    );
}

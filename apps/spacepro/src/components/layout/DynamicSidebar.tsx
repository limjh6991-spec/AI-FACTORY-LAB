'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// 메뉴 타입 정의
interface MenuItem {
    id: number;
    menuCode: string;
    menuName: string;
    menuNameEn: string | null;
    menuPath: string | null;
    menuIcon: string | null;
    parentId: number | null;
    menuLevel: number;
    sortOrder: number;
    menuType: string;
    children: MenuItem[];
}

// 아이콘 동적 가져오기
const getIcon = (iconName: string | null) => {
    if (!iconName) return null;
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
};

const colors = {
    primary: '#3699FF',
    dark: '#181C32',
    gray400: '#B5B5C3',
    gray500: '#A1A5B7',
    gray600: '#7E8299',
};

export function DynamicSidebar() {
    const pathname = usePathname();
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch('/api/menus');
                const data = await response.json();
                setMenus(data);

                // 현재 경로에 해당하는 그룹 자동 펼침
                const findParentIds = (items: MenuItem[], path: string): number[] => {
                    for (const item of items) {
                        if (item.menuPath === path) {
                            return item.parentId ? [item.parentId] : [];
                        }
                        if (item.children.length > 0) {
                            const found = findParentIds(item.children, path);
                            if (found.length > 0) {
                                return item.id ? [item.id, ...found] : found;
                            }
                        }
                    }
                    return [];
                };

                const parentIds = findParentIds(data, pathname);
                setExpandedGroups(new Set(parentIds));
            } catch (error) {
                console.error('Failed to fetch menus:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMenus();
    }, [pathname]);

    const toggleGroup = (id: number) => {
        setExpandedGroups((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const isActive = (path: string | null) => {
        if (!path) return false;
        return pathname === path || pathname.startsWith(path + '/');
    };

    const renderMenuItem = (item: MenuItem, depth: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedGroups.has(item.id);
        const active = isActive(item.menuPath);
        const paddingLeft = 16 + depth * 12;

        if (hasChildren) {
            // GROUP 메뉴
            return (
                <div key={item.id}>
                    <button
                        onClick={() => toggleGroup(item.id)}
                        className="w-full flex items-center justify-between py-3 rounded-lg text-[13px] transition-colors hover:bg-white/5"
                        style={{
                            paddingLeft,
                            paddingRight: 16,
                            color: active ? 'white' : colors.gray500,
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 flex items-center justify-center">
                                {getIcon(item.menuIcon)}
                            </span>
                            <span>{item.menuName}</span>
                        </div>
                        {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </button>
                    {isExpanded && (
                        <div className="mt-1">
                            {item.children.map((child) => renderMenuItem(child, depth + 1))}
                        </div>
                    )}
                </div>
            );
        }

        // MENU 메뉴
        return (
            <Link
                key={item.id}
                href={item.menuPath || '#'}
                className="flex items-center gap-3 py-3 rounded-lg text-[13px] transition-colors mb-1"
                style={{
                    paddingLeft,
                    paddingRight: 16,
                    color: active ? 'white' : colors.gray500,
                    background: active ? colors.primary : 'transparent',
                }}
            >
                <span className="w-5 h-5 flex items-center justify-center">
                    {getIcon(item.menuIcon)}
                </span>
                <span>{item.menuName}</span>
            </Link>
        );
    };

    if (isLoading) {
        return (
            <aside
                className="fixed left-0 top-0 h-full w-[265px] flex flex-col"
                style={{ background: colors.dark }}
            >
                <div className="h-[65px] flex items-center px-6">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded flex items-center justify-center"
                            style={{ background: colors.primary }}
                        >
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="text-white text-lg font-semibold">SpacePro</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full" />
                </div>
            </aside>
        );
    }

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
                        <span className="text-white font-bold">S</span>
                    </div>
                    <span className="text-white text-lg font-semibold">SpacePro</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
                <div className="mb-4">
                    <span
                        className="text-[11px] font-semibold uppercase px-4"
                        style={{ color: colors.gray600 }}
                    >
                        메뉴
                    </span>
                </div>
                {menus.map((menu) => renderMenuItem(menu))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <div className="text-[11px] text-center" style={{ color: colors.gray600 }}>
                    SpacePro MES v1.0
                </div>
            </div>
        </aside>
    );
}

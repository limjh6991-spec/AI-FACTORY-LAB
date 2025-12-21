/**
 * Dark Sidebar Component
 * 딥 블루 테마 사이드바
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    Factory,
    Video,
    BarChart3,
    FileSpreadsheet,
} from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard, href: '/dashboard2' },
    { id: 'projects', label: '프로젝트', icon: FolderKanban, href: '/projects' },
    { id: 'reports', label: '리포트', icon: FileText, href: '/reports' },
    { id: 'manufacturing', label: '생산관리', icon: Factory, href: '/manufacturing' },
    { id: 'cctv', label: 'CCTV', icon: Video, href: '/cctv' },
    { id: 'kpi', label: 'KPI', icon: BarChart3, href: '/kpi' },
    { id: 'reports2', label: '통계', icon: FileSpreadsheet, href: '/reports2' },
];

interface DarkSidebarProps {
    className?: string;
}

export function DarkSidebar({ className }: DarkSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`w-56 bg-[#1E2A3A] flex flex-col ${className || ''}`}>
            {/* Logo */}
            <div className="px-5 py-6 border-b border-[#2D3E50]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#00BFA5] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="text-xl font-bold text-white">SpacePro</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                            ? 'bg-[#00BFA5] text-white'
                                            : 'text-[#8899A8] hover:bg-[#2D3E50] hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[#2D3E50]">
                <p className="text-xs text-[#5A6B7B]">SpacePro v1.0</p>
            </div>
        </aside>
    );
}

export default DarkSidebar;

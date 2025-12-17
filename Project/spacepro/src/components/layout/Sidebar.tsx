/**
 * Sidebar Navigation Component
 * 왼쪽 사이드바 네비게이션
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
    ChevronRight,
    Rocket
} from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard, href: '/' },
    { id: 'projects', label: '프로젝트', icon: FolderKanban, href: '/projects' },
    { id: 'kickoff', label: '킥오프 미팅', icon: Rocket, href: '/kickoff' },
    { id: 'reports', label: '리포트', icon: FileText, href: '/reports' },
    { id: 'manufacturing', label: '생산관리', icon: Factory, href: '/manufacturing' },
    { id: 'cctv', label: 'CCTV', icon: Video, href: '/cctv' },
    { id: 'kpi', label: 'KPI', icon: BarChart3, href: '/kpi' },
    { id: 'reports2', label: '통계', icon: FileSpreadsheet, href: '/reports2' },
];

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`w-56 bg-white border-r border-[#E8E8E4] flex flex-col ${className || ''}`}>
            {/* Logo */}
            <div className="px-5 py-6 border-b border-[#E8E8E4]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#8BC4A9] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="text-xl font-bold text-[#2D3436]">SpacePro</span>
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
                                        ? 'bg-[#E8F5EE] text-[#6BA98C]'
                                        : 'text-[#636E72] hover:bg-[#F5F5F0] hover:text-[#2D3436]'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[#E8E8E4]">
                <p className="text-xs text-[#A0A0A0]">SpacePro v1.0</p>
            </div>
        </aside>
    );
}

export default Sidebar;

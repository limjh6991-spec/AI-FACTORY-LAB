/**
 * Header Component
 * 상단 헤더
 */

'use client';

import React from 'react';
import { Settings, Bell, User } from 'lucide-react';

interface HeaderProps {
    title?: string;
}

export function Header({ title = '전체 생산 개요' }: HeaderProps) {
    const today = new Date();
    const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월`;

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E8E8E4]">
            <h1 className="text-2xl font-bold text-[#2D3436]">{title}</h1>

            <div className="flex items-center gap-4">
                <button className="p-2 text-[#636E72] hover:text-[#2D3436] hover:bg-[#F5F5F0] rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
                <button className="relative p-2 text-[#636E72] hover:text-[#2D3436] hover:bg-[#F5F5F0] rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#E57373] rounded-full" />
                </button>
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-[#E8E8E4]">
                    <div className="text-right">
                        <p className="text-sm font-medium text-[#2D3436]">Daisy Homer</p>
                        <p className="text-xs text-[#A0A0A0]">{dateString}</p>
                    </div>
                    <div className="w-10 h-10 bg-[#E8F5EE] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[#8BC4A9]" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

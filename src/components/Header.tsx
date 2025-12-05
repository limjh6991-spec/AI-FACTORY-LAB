"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import {
  Search,
  Bell,
  Settings,
  User,
  ChevronDown,
  LogOut,
  HelpCircle,
  Moon,
} from "lucide-react";

interface HeaderProps {
  className?: string;
  sidebarCollapsed?: boolean;
}

export function Header({ className, sidebarCollapsed = false }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationCount] = useState(3);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-14",
        "bg-white border-b border-blue-100",
        "flex items-center justify-between px-4",
        "transition-all duration-300 shadow-sm",
        sidebarCollapsed ? "left-16" : "left-64",
        "max-lg:left-0",
        className
      )}
    >
      {/* 좌측: 페이지 제목 또는 브레드크럼 */}
      <div className="flex items-center gap-4">
        <nav className="hidden sm:flex items-center gap-1 text-sm">
          <Link 
            href="/" 
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            홈
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-medium">대시보드</span>
        </nav>
      </div>

      {/* 중앙: 검색바 (연한 파란색 테마) */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="메뉴, 화면, 기능 검색..."
            className={cn(
              "w-full h-9 pl-10 pr-4 text-sm",
              "bg-slate-50 border border-slate-200 rounded-lg",
              "text-slate-800 placeholder-slate-400",
              "focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100",
              "transition-all"
            )}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* 우측: 액션 버튼들 */}
      <div className="flex items-center gap-1">
        {/* 모바일 검색 버튼 */}
        <button
          className="md:hidden p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="h-5 w-5" />
        </button>

        {/* 알림 */}
        <button className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-xs font-medium text-white bg-red-500 rounded-full">
              {notificationCount}
            </span>
          )}
        </button>

        {/* 도움말 */}
        <button className="hidden sm:flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* 설정 */}
        <button className="hidden sm:flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Settings className="h-5 w-5" />
        </button>

        {/* 구분선 */}
        <div className="hidden sm:block w-px h-6 bg-slate-200 mx-2" />

        {/* 프로필 드롭다운 */}
        <div className="relative">
          <button
            className={cn(
              "flex items-center gap-2 p-2 text-slate-600",
              "hover:bg-blue-50 rounded-lg transition-colors",
              profileOpen && "bg-blue-50"
            )}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="hidden lg:block text-sm font-medium text-slate-700">관리자</span>
            <ChevronDown className={cn(
              "hidden lg:block h-4 w-4 text-slate-400 transition-transform",
              profileOpen && "rotate-180"
            )} />
          </button>

          {/* 드롭다운 메뉴 */}
          {profileOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                {/* 사용자 정보 */}
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">홍길동</p>
                  <p className="text-xs text-slate-500">admin@aifactory.com</p>
                </div>

                {/* 메뉴 항목들 */}
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <User className="h-4 w-4" />
                    <span>프로필 설정</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>계정 설정</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Moon className="h-4 w-4" />
                    <span>다크 모드</span>
                  </button>
                </div>

                {/* 로그아웃 */}
                <div className="py-1 border-t border-slate-100">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

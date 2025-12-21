"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  Search,
  Bell,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutGrid,
  Moon,
  Sun,
  X,
  Home,
  FileText,
  Monitor,
  Database,
  Palette,
  Cog,
} from "lucide-react";

interface HeaderProps {
  className?: string;
  sidebarCollapsed?: boolean;
}

// 메뉴 아이템 타입
interface MenuItem {
  id: number;
  menuName: string;
  menuPath: string | null;
  menuIcon: string | null;
  parentId: number | null;
  menuLevel: number;
  sortOrder: number;
}

// 브레드크럼 아이템 타입
interface BreadcrumbItem {
  name: string;
  path: string | null;
}

export function Header({ className, sidebarCollapsed = false }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 상태 관리
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 메뉴 데이터 조회
  const { data: menuData } = api.menu.getMenuTree.useQuery();

  // 알림 데이터 (임시)
  const notifications = [
    { id: 1, title: "시스템 업데이트", message: "새로운 버전이 배포되었습니다.", time: "10분 전", read: false },
    { id: 2, title: "화면 생성 완료", message: "SC000015 자재수불부가 생성되었습니다.", time: "30분 전", read: false },
    { id: 3, title: "DB 메타데이터 갱신", message: "메타데이터가 업데이트되었습니다.", time: "1시간 전", read: true },
  ];
  const unreadCount = notifications.filter(n => !n.read).length;

  // ===== 1. 현재 화면 경로 표시 (브레드크럼) =====
  const getBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ name: "홈", path: "/" }];

    if (!menuData || pathname === "/") return crumbs;

    // 메뉴 트리를 평탄화
    const flattenMenu = (items: any[]): MenuItem[] => {
      let result: MenuItem[] = [];
      for (const item of items) {
        result.push(item);
        if (item.children?.length > 0) {
          result = result.concat(flattenMenu(item.children));
        }
      }
      return result;
    };

    const allMenus = flattenMenu(menuData);

    // 현재 경로에 해당하는 메뉴 찾기 (대소문자 비구분)
    const currentMenu = allMenus.find(m =>
      m.menuPath?.toLowerCase() === pathname.toLowerCase()
    );

    if (currentMenu) {
      // 부모 메뉴들 찾기
      const findParents = (menu: MenuItem, menus: MenuItem[]): BreadcrumbItem[] => {
        const parents: BreadcrumbItem[] = [];
        let current = menu;

        while (current.parentId) {
          const parent = menus.find(m => m.id === current.parentId);
          if (parent) {
            parents.unshift({ name: parent.menuName, path: parent.menuPath });
            current = parent;
          } else {
            break;
          }
        }
        return parents;
      };

      const parents = findParents(currentMenu, allMenus);
      crumbs.push(...parents);
      crumbs.push({ name: currentMenu.menuName, path: currentMenu.menuPath });
    } else {
      // 메뉴에 없는 경로인 경우 경로 기반으로 생성
      const pathParts = pathname.split("/").filter(Boolean);
      const pathMap: Record<string, string> = {
        "screens": "화면",
        "settings": "시스템",
        "screen-generator": "화면 생성기",
        "menu": "메뉴 관리",
        "dashboard": "대시보드",
      };

      let currentPath = "";
      for (const part of pathParts) {
        currentPath += `/${part}`;
        crumbs.push({
          name: pathMap[part] || part.toUpperCase(),
          path: currentPath,
        });
      }
    }

    return crumbs;
  }, [pathname, menuData]);

  const breadcrumbs = getBreadcrumbs();

  // ===== 2. 검색 기능 =====
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    if (!query.trim() || !menuData) {
      setSearchResults([]);
      return;
    }

    // 메뉴 트리 평탄화
    const flattenMenu = (items: any[]): MenuItem[] => {
      let result: MenuItem[] = [];
      for (const item of items) {
        result.push(item);
        if (item.children?.length > 0) {
          result = result.concat(flattenMenu(item.children));
        }
      }
      return result;
    };

    const allMenus = flattenMenu(menuData);

    // 검색어로 필터링
    const results = allMenus.filter(menu =>
      menu.menuName.toLowerCase().includes(query.toLowerCase()) ||
      (menu.menuPath && menu.menuPath.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 8); // 최대 8개

    setSearchResults(results);
  }, [menuData]);

  // 키보드 단축키 (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 검색 결과 선택
  const handleSelectResult = (menu: MenuItem) => {
    if (menu.menuPath) {
      router.push(menu.menuPath);
    }
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        if (searchOpen && searchResults.length > 0) {
          setSearchResults([]);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen, searchResults.length]);

  // ===== 5. 설정 옵션 =====
  const settingsOptions = [
    {
      id: "theme",
      label: "테마",
      icon: darkMode ? Moon : Sun,
      action: () => setDarkMode(!darkMode),
      value: darkMode ? "다크" : "라이트"
    },
    {
      id: "menu",
      label: "메뉴 관리",
      icon: LayoutGrid,
      action: () => router.push("/settings/menu"),
    },
    {
      id: "screen-gen",
      label: "화면 생성기",
      icon: Monitor,
      action: () => router.push("/settings/screen-generator"),
    },
    {
      id: "db-meta",
      label: "DB 메타데이터",
      icon: Database,
      action: () => router.push("/settings/db-metadata"),
    },
  ];

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
      {/* ===== 좌측: 브레드크럼 (현재 경로 표시) ===== */}
      <div className="flex items-center gap-4">
        <nav className="hidden sm:flex items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-800 font-medium">{crumb.name}</span>
              ) : (
                <Link
                  href={crumb.path || "/"}
                  className="text-slate-500 hover:text-blue-600 transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* ===== 중앙: 검색바 ===== */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block" ref={searchContainerRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setSearchOpen(true)}
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

          {/* 검색 결과 드롭다운 */}
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="py-1">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <FileText className="h-4 w-4 text-slate-400" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{result.menuName}</div>
                      {result.menuPath && (
                        <div className="text-xs text-slate-400">{result.menuPath}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== 우측: 액션 버튼들 ===== */}
      <div className="flex items-center gap-1">
        {/* 모바일 검색 버튼 */}
        <button
          className="md:hidden p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="h-5 w-5" />
        </button>

        {/* ===== 3. 알림 (공지) ===== */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setProfileOpen(false);
              setSitemapOpen(false);
              setSettingsOpen(false);
            }}
            className={cn(
              "relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
              notificationOpen && "bg-blue-50 text-blue-600"
            )}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-xs font-medium text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* 알림 드롭다운 */}
          {notificationOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotificationOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">알림</span>
                  <button className="text-xs text-blue-600 hover:underline">모두 읽음</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer",
                        !notif.read && "bg-blue-50/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 h-2 w-2 rounded-full shrink-0",
                          notif.read ? "bg-slate-300" : "bg-blue-500"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800">{notif.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-100">
                  <button className="w-full text-center text-sm text-blue-600 hover:underline py-1">
                    모든 알림 보기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ===== 4. 사이트맵 ===== */}
        <div className="relative">
          <button
            onClick={() => {
              setSitemapOpen(!sitemapOpen);
              setNotificationOpen(false);
              setProfileOpen(false);
              setSettingsOpen(false);
            }}
            className={cn(
              "hidden sm:flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
              sitemapOpen && "bg-blue-50 text-blue-600"
            )}
            title="사이트맵"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>

          {/* 사이트맵 드롭다운 */}
          {sitemapOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSitemapOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <span className="font-semibold text-slate-800">사이트맵</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {menuData?.map((category: any) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Home className="h-4 w-4 text-blue-500" />
                        {category.menuName}
                      </div>
                      <div className="ml-6 space-y-1">
                        {category.children?.map((item: any) => (
                          <Link
                            key={item.id}
                            href={item.menuPath || "#"}
                            onClick={() => setSitemapOpen(false)}
                            className="block text-sm text-slate-600 hover:text-blue-600 hover:underline py-0.5"
                          >
                            {item.menuName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ===== 5. 설정 ===== */}
        <div className="relative">
          <button
            onClick={() => {
              setSettingsOpen(!settingsOpen);
              setNotificationOpen(false);
              setProfileOpen(false);
              setSitemapOpen(false);
            }}
            className={cn(
              "hidden sm:flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
              settingsOpen && "bg-blue-50 text-blue-600"
            )}
            title="설정"
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* 설정 드롭다운 */}
          {settingsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <span className="font-semibold text-slate-800">빠른 설정</span>
                </div>
                <div className="py-1">
                  {settingsOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        option.action();
                        if (option.id !== "theme") setSettingsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <option.icon className="h-4 w-4" />
                        <span>{option.label}</span>
                      </div>
                      {option.value && (
                        <span className="text-xs text-slate-400">{option.value}</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="py-1 border-t border-slate-100">
                  <Link
                    href="/settings"
                    onClick={() => setSettingsOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Cog className="h-4 w-4" />
                    <span>전체 설정</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 구분선 */}
        <div className="hidden sm:block w-px h-6 bg-slate-200 mx-2" />

        {/* ===== 6. 프로필 드롭다운 ===== */}
        <div className="relative">
          <button
            className={cn(
              "flex items-center gap-2 p-2 text-slate-600",
              "hover:bg-blue-50 rounded-lg transition-colors",
              profileOpen && "bg-blue-50"
            )}
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationOpen(false);
              setSitemapOpen(false);
              setSettingsOpen(false);
            }}
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
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span>{darkMode ? "라이트 모드" : "다크 모드"}</span>
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

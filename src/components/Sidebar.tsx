"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Menu,
  X,
  FileText,
  Boxes,
  Building2,
  FileSpreadsheet
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "대시보드",
    icon: LayoutDashboard,
    href: "/dashboard",
    badge: null,
  },
  {
    title: "Excel 매핑",
    icon: FileSpreadsheet,
    href: "/excel-mapping",
    badge: "NEW",
  },
  {
    title: "상품 관리",
    icon: Package,
    href: "/products",
    badge: "12",
  },
  {
    title: "DOI 데이터",
    icon: Boxes,
    href: "#",
    submenu: [
      { title: "사용자 관리", href: "/doi/users", icon: Users },
      { title: "부서 관리", href: "/doi/departments", icon: Building2 },
      { title: "모델 마스터", href: "/doi/models", icon: FileText },
      { title: "재고 현황", href: "/doi/stock", icon: Package },
    ],
  },
  {
    title: "주문 관리",
    icon: ShoppingCart,
    href: "/orders",
    badge: null,
  },
  {
    title: "고객 관리",
    icon: Users,
    href: "/customers",
    badge: null,
  },
  {
    title: "리포트",
    icon: BarChart3,
    href: "/reports",
    badge: null,
  },
  {
    title: "설정",
    icon: Settings,
    href: "/settings",
    badge: null,
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
          isCollapsed ? "w-[60px]" : "w-[260px]"
        } border-r border-neutral-gray-30 bg-white`}
      >
        {/* Logo & Toggle */}
        <div className="flex h-16 items-center justify-between border-b border-neutral-gray-30 px-4">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-blue">
                <span className="text-lg font-bold text-white">AI</span>
              </div>
              <span className="text-lg font-semibold text-neutral-gray-90">
                Factory Lab
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-1.5 hover:bg-neutral-gray-20 transition-colors"
          >
            {isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedMenus.includes(item.title);

            return (
              <div key={item.title}>
                {hasSubmenu ? (
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary-blue/10 text-primary-blue"
                        : "text-neutral-gray-130 hover:bg-neutral-gray-20 hover:text-neutral-gray-90"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>
                    {!isCollapsed && (
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary-blue/10 text-primary-blue"
                        : "text-neutral-gray-130 hover:bg-neutral-gray-20 hover:text-neutral-gray-90"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-blue px-1.5 text-xs font-semibold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}

                {/* Submenu */}
                {hasSubmenu && isExpanded && !isCollapsed && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-neutral-gray-30 pl-4">
                    {item.submenu!.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`group flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-all ${
                            isSubActive
                              ? "bg-primary-blue/10 text-primary-blue font-medium"
                              : "text-neutral-gray-130 hover:bg-neutral-gray-20 hover:text-neutral-gray-90"
                          }`}
                        >
                          <SubIcon className="h-4 w-4 flex-shrink-0" />
                          <span>{subItem.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-gray-30 bg-neutral-gray-10 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-white font-semibold">
                JH
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-gray-90 truncate">
                  관리자
                </p>
                <p className="text-xs text-neutral-gray-130 truncate">
                  admin@aifactory.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Spacer */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-[60px]" : "w-[260px]"
        }`}
      />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  LayoutDashboard,
  Factory,
  Package,
  ShoppingCart,
  Calculator,
  Database,
  FileText,
  Settings,
  ChevronDown,
  Menu,
  X,
  Loader2,
  ClipboardList,
  Calendar,
  BarChart3,
  Boxes,
  ArrowLeftRight,
  PackageSearch,
  AlertTriangle,
  Users,
  ShoppingBag,
  Truck,
  Receipt,
  TrendingUp,
  DollarSign,
  Building,
  Wrench,
  UserCog,
  Shield,
  Logs,
  PanelLeftClose,
  PanelLeft,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, Factory, Package, ShoppingCart, Calculator, Database,
  FileText, Settings, ClipboardList, Calendar, BarChart3, Boxes,
  ArrowLeftRight, PackageSearch, AlertTriangle, Users, ShoppingBag,
  Truck, Receipt, TrendingUp, DollarSign, Building, Wrench, UserCog, Shield, Logs,
};

interface MenuNode {
  menuId: string;
  parentId: string | null;
  menuName: string;
  menuPath: string | null;
  menuIcon: string | null;
  sortOrder: number;
  isActive: boolean;
  children: MenuNode[];
}

function DynamicIcon({ name, className }: { name: string | null; className?: string }) {
  if (!name) return null;
  const IconComponent = iconMap[name];
  if (!IconComponent) return <LayoutDashboard className={className} />;
  return <IconComponent className={className} />;
}

function MenuItem({ item, depth = 0, collapsed }: { item: MenuNode; depth?: number; collapsed: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.menuPath;

  const isChildActive = (node: MenuNode): boolean => {
    if (node.menuPath === pathname) return true;
    return node.children?.some((child) => isChildActive(child)) ?? false;
  };

  useEffect(() => {
    if (hasChildren && isChildActive(item)) setIsOpen(true);
  }, [pathname, hasChildren, item]);

  const baseClass = cn(
    "group flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150",
    "hover:bg-blue-100 hover:text-blue-900",
    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
    collapsed && "justify-center px-3"
  );
  const activeClass = cn("bg-blue-100 text-blue-900", "border-l-[3px] border-l-blue-600");
  const inactiveClass = "text-slate-600 border-l-[3px] border-l-transparent";

  if (hasChildren) {
    return (
      <div className="w-full">
        <button
          className={cn(baseClass, isChildActive(item) ? activeClass : inactiveClass)}
          style={{ paddingLeft: collapsed ? undefined : `${16 + depth * 16}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <DynamicIcon name={item.menuIcon} className={cn("h-5 w-5 shrink-0 transition-colors", isChildActive(item) ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600")} />
          {!collapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.menuName}</span>
              <span className={cn("transition-transform duration-200", isOpen && "rotate-180")}>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </span>
            </>
          )}
        </button>
        <div className={cn("overflow-hidden transition-all duration-200 ease-in-out", isOpen && !collapsed ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
          {item.children.map((child) => <MenuItem key={child.menuId} item={child} depth={depth + 1} collapsed={collapsed} />)}
        </div>
      </div>
    );
  }

  return (
    <Link href={item.menuPath ?? "#"} className={cn(baseClass, isActive ? activeClass : inactiveClass)} style={{ paddingLeft: collapsed ? undefined : `${16 + depth * 16}px` }}>
      <DynamicIcon name={item.menuIcon} className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600")} />
      {!collapsed && <span className="truncate">{item.menuName}</span>}
    </Link>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: menuTree, isLoading, error } = api.menu.getMenuTree.useQuery();

  const sidebarContent = (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-50 to-blue-50/50">
      <div className={cn("flex h-14 items-center border-b border-blue-100", collapsed ? "justify-center px-3" : "px-4")}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
              <Factory className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-800 tracking-tight">AI Factory</span>
              <p className="text-[10px] text-slate-400 -mt-0.5">Manufacturing ERP</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
            <Factory className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-blue-400" /></div>
        ) : error ? (
          <div className="px-4 py-3 text-sm text-red-500">메뉴를 불러올 수 없습니다.</div>
        ) : (
          <div className="space-y-1">{menuTree?.map((item) => <MenuItem key={item.menuId} item={item} collapsed={collapsed} />)}</div>
        )}
      </nav>

      <div className="border-t border-blue-100">
        <button onClick={() => setCollapsed(!collapsed)} className={cn("flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-500", "hover:bg-blue-50 hover:text-blue-600 transition-colors", collapsed && "justify-center")}>
          {collapsed ? <PanelLeft className="h-5 w-5" /> : <><PanelLeftClose className="h-5 w-5" /><span>사이드바 접기</span></>}
        </button>
      </div>

      {!collapsed && (
        <div className="border-t border-blue-100 px-4 py-3 bg-blue-50/50">
          <p className="text-xs text-slate-400">© 2025 AI Factory Lab</p>
          <p className="text-[10px] text-blue-400 mt-0.5">Light Blue Theme</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <button className="fixed left-4 top-3 z-50 lg:hidden p-2 rounded-lg hover:bg-blue-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X className="h-5 w-5 text-slate-600" /> : <Menu className="h-5 w-5 text-slate-600" />}
      </button>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={cn("fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out", "shadow-lg shadow-blue-100/50 border-r border-blue-100", collapsed ? "w-16" : "w-64", mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        {sidebarContent}
      </aside>
      <div className={cn("min-h-screen transition-all duration-300 bg-slate-50", collapsed ? "lg:ml-16" : "lg:ml-64")} />
    </>
  );
}

export default Sidebar;

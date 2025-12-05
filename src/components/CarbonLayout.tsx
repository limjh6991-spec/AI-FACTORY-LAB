"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import { Sidebar } from "~/components/Sidebar";
import { Header } from "~/components/Header";

interface CarbonLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function CarbonLayout({ children, className }: CarbonLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* 사이드바 */}
      <Sidebar />

      {/* 헤더 */}
      <Header sidebarCollapsed={sidebarCollapsed} />

      {/* 메인 콘텐츠 */}
      <main
        className={cn(
          "pt-12 transition-all duration-300",
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-64",
          className
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default CarbonLayout;

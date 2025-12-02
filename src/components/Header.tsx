"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-gray-30 bg-white px-6">
      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-130" />
          <input
            type="text"
            placeholder="검색... (Ctrl+K)"
            className="w-full rounded-lg border border-neutral-gray-30 bg-neutral-gray-10 py-2 pl-10 pr-4 text-sm focus:border-primary-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-neutral-gray-20 transition-colors">
          <Bell className="h-5 w-5 text-neutral-gray-130" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error-red opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-error-red"></span>
          </span>
        </button>
      </div>
    </header>
  );
}

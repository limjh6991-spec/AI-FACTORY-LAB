'use client';

import React, { ReactNode } from 'react';
import { DynamicSidebar } from '@/components/layout/DynamicSidebar';
import { SidebarProvider, useSidebar } from '@/components/layout/SidebarContext';

interface MainContentProps {
    children: ReactNode;
}

function MainContent({ children }: MainContentProps) {
    const { isCollapsed } = useSidebar();

    return (
        <main
            className="transition-all duration-300"
            style={{ marginLeft: isCollapsed ? '65px' : '265px' }}
        >
            {children}
        </main>
    );
}

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <SidebarProvider>
            <DynamicSidebar />
            <MainContent>{children}</MainContent>
        </SidebarProvider>
    );
}

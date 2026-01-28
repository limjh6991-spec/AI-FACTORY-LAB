'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isCollapsed: false,
    toggleSidebar: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
    children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

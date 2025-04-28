'use client';

import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { siteConfig } from '@/config/site';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true} collapsible="icon">
        <Sidebar side="left" variant="sidebar" collapsible="icon" className="shadow-md">
          <SidebarNav items={siteConfig.mainNav} />
        </Sidebar>
        <SidebarInset>
          <div className="p-4 md:p-6">
            {children}
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
}

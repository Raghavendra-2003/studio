'use client';

import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'; // Import SidebarTrigger
import { SidebarNav } from './sidebar-nav';
import { siteConfig } from '@/config/site';
import { useIsMobile } from '@/hooks/use-mobile'; // Import useIsMobile hook

export function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={true} collapsible="icon">
        {/* Desktop Sidebar */}
        <Sidebar side="left" variant="sidebar" collapsible="icon" className="shadow-md hidden md:block"> {/* Hide on mobile */}
          <SidebarNav items={siteConfig.mainNav} />
        </Sidebar>
         {/* Mobile Sidebar Sheet (rendered by Sidebar component when isMobile is true) */}
        <Sidebar side="left" variant="sidebar" collapsible="offcanvas" className="md:hidden"/> {/* Use offcanvas for mobile */}

        <SidebarInset>
           {/* Mobile Header */}
           {isMobile && (
             <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
               {/* Mobile Sidebar Trigger */}
               <SidebarTrigger className="text-foreground" />
               {/* You can add a logo or title here if needed for mobile */}
               <span className="font-semibold">{siteConfig.name}</span>
             </header>
           )}
          {/* Main Content Area */}
          <div className="p-4 md:p-6">
            {children}
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
}

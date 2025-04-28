
'use client';

import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { siteConfig } from '@/config/site';
// Removed useIsMobile hook import

export function MainLayout({ children }: { children: React.ReactNode }) {
  // Removed isMobile state and hook usage

  return (
    // Always use defaultOpen={true} and collapsible="icon" for consistency
    <SidebarProvider defaultOpen={true} collapsible="icon">
        {/* Always render the desktop-style sidebar */}
        <Sidebar side="left" variant="sidebar" collapsible="icon" className="shadow-md"> {/* Removed responsive classes */}
          <SidebarNav items={siteConfig.mainNav} />
        </Sidebar>
         {/* Removed Mobile Sidebar Sheet */}

        <SidebarInset>
           {/* Removed Mobile Header */}

          {/* Main Content Area */}
          {/* Adjust padding to be consistent if needed, removing md: prefix */}
          <div className="p-4 sm:p-6"> {/* Use sm:p-6 or just p-6 for consistency */}
            {children}
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
}


'use client';

import type { NavItem } from '@/config/site';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger, // Keep SidebarTrigger import if used within header
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { BotMessageSquareIcon } from 'lucide-react'; // Or another suitable icon
import { siteConfig } from '@/config/site'; // Import siteConfig

export interface SidebarNavProps {
  items: NavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <>
      {/* Sidebar Header for Desktop */}
      <SidebarHeader className="border-b border-sidebar-border p-2 justify-between flex items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
           <BotMessageSquareIcon className="h-6 w-6 text-primary-foreground"/> {/* Replace with a proper logo/icon if available */}
          <span className='text-primary-foreground group-data-[collapsible=icon]:hidden'>{siteConfig.name}</span>
        </Link>
         {/* Desktop Sidebar Trigger (visible when sidebar is collapsible) */}
         <SidebarTrigger className="text-primary-foreground hover:text-accent-foreground hover:bg-accent hidden group-data-[collapsible=icon]:flex md:flex" />
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="p-2">
        <SidebarMenu>
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <SidebarMenuItem key={index}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    variant="default"
                    size="default"
                    isActive={isActive}
                    tooltip={item.title}
                    className={cn(
                      'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground', // Base styles
                      isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : '', // Active styles
                      // Apply active styles specifically for the sidebar theme
                      '[&[data-active=true]]:bg-sidebar-accent [&[data-active=true]]:text-sidebar-accent-foreground'
                    )}
                  >
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    <span className="truncate">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}

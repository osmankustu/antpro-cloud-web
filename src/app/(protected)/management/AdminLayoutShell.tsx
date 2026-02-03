'use client';
import GlobalLoader from '@/components/ui/loader/GlobalLoader';
import { useSidebar } from '@/context/SidebarContext';
import { useAppSelector } from '@/core/store/base/hook';
import AppHeader from '@/layout/AppHeader';
import AppSidebar from '@/layout/AppSidebar';
import Backdrop from '@/layout/Backdrop';
import React from 'react';

export default function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const loadingCount = useAppSelector(s => s.ui.loadingCount);

  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
      ? 'lg:ml-[290px]'
      : 'lg:ml-[90px]';

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />

        <div className="relative mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
          <GlobalLoader />
          {children}
        </div>
      </div>
    </div>
  );
}

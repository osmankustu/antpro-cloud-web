'use client';

import AuthGuard from '@/core/auth/components/authGuard';
import StoreProvider from '@/core/store/base/storeProvider';
import React from 'react';

import AdminLayoutShell from './AdminLayoutShell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AuthGuard>
        <AdminLayoutShell>{children}</AdminLayoutShell>
      </AuthGuard>
    </StoreProvider>
  );
}

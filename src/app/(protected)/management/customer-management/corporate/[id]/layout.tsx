'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { CorporateDetailToolbar } from '@/modules/customer-management/features/corporate/components/ui/detail/CorporateDetailToolbar';
import { useCorporateDetailCtx } from '@/modules/customer-management/features/corporate/context/CorporateDetailContext';
import { CorporateDetailProvider } from '@/modules/customer-management/features/corporate/context/CorporateDetailProvider';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function CorporateDetailLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const id = params.id as string;

  function ToolbarBridge() {
    const query = useCorporateDetailCtx();
    return (
      <CorporateDetailToolbar
        customer={query.customer}
        isLoading={query.isLoading}
        isFetching={query.isFetching}
        error={query.error}
        onRetry={query.refetch}
        onDelete={query.handleDelete}
        router={query.router}
      />
    );
  }

  return (
    <CorporateDetailProvider customerId={id}>
      <div>
        <PageBreadcrumb pageTitle="Kurumsal Müşteri Detayları" />
        <div className="space-y-4">
          <ToolbarBridge />

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            {children}
          </div>
        </div>
      </div>
    </CorporateDetailProvider>
  );
}

'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { IndividudalDetailToolbar } from '@/modules/customer-management/features/individual/components/ui/detail/IndividualDetailToolbar';
import { useIndividualDetailCtx } from '@/modules/customer-management/features/individual/context/IndividualDetailContext';
import { IndividualDetailProvider } from '@/modules/customer-management/features/individual/context/IndividualDetailProvider';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function IndividualDetailLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const id = params.id as string;

  function ToolbarBridge() {
    const query = useIndividualDetailCtx();
    return (
      <IndividudalDetailToolbar
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
    <IndividualDetailProvider customerId={id}>
      <div>
        <PageBreadcrumb pageTitle="Bireysel Müşteri Detayları" />
        <div className="space-y-4">
          <ToolbarBridge />

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            {children}
          </div>
        </div>
      </div>
    </IndividualDetailProvider>
  );
}

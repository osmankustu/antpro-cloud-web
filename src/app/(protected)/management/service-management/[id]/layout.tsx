'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { ServiceDetailToolbar } from '@/modules/service-management/features/service/components/ui/detail/ServiceDetailToolbar';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';
import { ServiceDetailProvider } from '@/modules/service-management/features/service/context/ServiceDetailProvider';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function ServiceDetailLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const id = params.id as string;

  function ToolbarBridge() {
    const ctx = useServiceDetailCtx();
    return <ServiceDetailToolbar model={ctx.serviceDetailResponse} router={ctx.router} />;
  }

  return (
    <ServiceDetailProvider serviceId={id}>
      <div>
        <PageBreadcrumb pageTitle="Servis Detayları" />
        <div className="space-y-4">
          <ToolbarBridge />

          <div className="">
            {children}
          </div>
        </div>
      </div>
    </ServiceDetailProvider>
  );
}

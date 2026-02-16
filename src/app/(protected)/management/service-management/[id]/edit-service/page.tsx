'use client';
import ServiceUpdatePage from '@/modules/service-management/features/service/components/form/ServiceUpdatePage';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';

export default function Page() {
  const ctx = useServiceDetailCtx();

  return <ServiceUpdatePage model={ctx.serviceDetailResponse} router={ctx.router} />;
}

'use client';
import ServiceDetailPage from '@/modules/service-management/features/service/components/pages/ServiceDetailPage';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';

const page = () => {
  const ctx = useServiceDetailCtx();
  return <ServiceDetailPage model={ctx.serviceDetailResponse} router={ctx.router} />;
};

export default page;

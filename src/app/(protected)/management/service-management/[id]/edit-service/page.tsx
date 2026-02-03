'use client';
import ServiceUpdatePage from '@/modules/service-management/components/pages/ServiceUpdatePage';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';

export default function Page() {
  const query = useServiceDetailCtx();

  return <ServiceUpdatePage service={query.service} />;
}

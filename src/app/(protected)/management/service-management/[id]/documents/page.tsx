'use client';
import { DocumentListPage } from '@/modules/service-management/features/service-document/components/pages/DocumentListPage';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';

export default function Page() {
  const query = useServiceDetailCtx();
  return <DocumentListPage serviceId={query.serviceDetailResponse?.data.service?.id} />;
}

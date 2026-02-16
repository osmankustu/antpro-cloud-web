'use client';
import ActivityListPage from '@/modules/service-management/features/service-activity/components/pages/ActivitiyListPage';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';

export default function Page() {
  const query = useServiceDetailCtx();
  return <ActivityListPage service={query.serviceDetailResponse?.data.service} />;
}

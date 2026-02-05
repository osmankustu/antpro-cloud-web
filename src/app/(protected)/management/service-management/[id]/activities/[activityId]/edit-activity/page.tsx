'use client';

import { ActivityUpdatePage } from '@/modules/service-management/features/service-activity/components/pages/ActivityUpdatePage';
import { useActivityDetailCtx } from '@/modules/service-management/features/service-activity/context/ActivityDetailContext';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';

export default function Page() {
  const query = useActivityDetailCtx();
  const serviceQuery = useServiceDetailCtx();
  return <ActivityUpdatePage activity={query.activity} service={serviceQuery.service} />;
}

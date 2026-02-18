'use client';

import { ActivityUpdatePage } from '@/modules/service-management/features/service-activity/components/pages/ActivityUpdatePage';
import { useActivityDetailCtx } from '@/modules/service-management/features/service-activity/context/ActivityDetailContext';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';

export default function Page() {
  const activityCtx = useActivityDetailCtx();
  const serviceCtx = useServiceDetailCtx();
  return (
    <ActivityUpdatePage
      models={{
        activityModel: activityCtx.activityDetailResponse,
        serviceModel: serviceCtx.serviceDetailResponse,
      }}
      router={activityCtx.router}
    />
  );
}

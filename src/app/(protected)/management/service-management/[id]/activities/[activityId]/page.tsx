'use client';

import { ActivityDetailPage } from '@/modules/service-management/features/service-activity/components/pages/ActivityDetailPage';
import { useActivityDetailCtx } from '@/modules/service-management/features/service-activity/context/ActivityDetailContext';

export default function Page() {
  const ctx = useActivityDetailCtx();
  return <ActivityDetailPage model={ctx.activityDetailResponse} router={ctx.router} />;
}

'use client';

import { ActivityDetailToolbar } from '@/modules/service-management/features/service-activity/components/ui/detail/ActivityDetailToolbar';
import { useActivityDetailCtx } from '@/modules/service-management/features/service-activity/context/ActivityDetailContext';
import { ActivityDetailProvider } from '@/modules/service-management/features/service-activity/context/ActivityDetailProvider';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';
import { useParams } from 'next/navigation';

export default function ActivityDetailLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const id = params.activityId as string;

  function ToolbarBridge() {
    const activityCtx = useActivityDetailCtx();
    const serviceCtx = useServiceDetailCtx();

    return (
      <ActivityDetailToolbar
        models={{
          activityModel: activityCtx.activityDetailResponse,
          serviceModels: serviceCtx.serviceDetailResponse,
        }}
        router={activityCtx.router}
      />
    );
  }
  return (
    <ActivityDetailProvider activityId={id}>
      <div className="space-y-4">
        <ToolbarBridge />
        {children}
      </div>
    </ActivityDetailProvider>
  );
}

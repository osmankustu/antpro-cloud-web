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
    const query = useActivityDetailCtx();
    const serviceQuery = useServiceDetailCtx();
    return (
      <ActivityDetailToolbar
        title="Hareket Detayları"
        router={query.router}
        activity={query.activity}
        service={serviceQuery.service}
        isLoading={query.isLoading}
        isFetching={query.isFetching}
        error={query.error}
        onRetry={query.refetch}
        onDelete={query.handleDelete}
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

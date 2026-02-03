'use client';

import { ActivityDetailPage } from '@/modules/service-management/features/service-activity/components/pages/ActivityDetailPage';
import { useActivityDetailCtx } from '@/modules/service-management/features/service-activity/context/ActivityDetailContext';

export default function Page() {
  const query = useActivityDetailCtx();
  return (
    <ActivityDetailPage
      activity={query.activity}
      employeeName={query.employeeFullName!}
      error={query.error}
      isFetching={query.isFetching}
      isLoading={query.isLoading}
      onRetry={query.refetch}
      router={query.router}
    />
  );
}

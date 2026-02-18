'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ServiceDetailHookResponse } from '../../../service/hooks/types/serviceHookReturn.types';
import { useActivities } from '../../hooks/useActivities';
import { ActivityMobileList } from '../ui/ActivityMobileList';
import { ActivityTable } from '../ui/ActivityTable';
import { ActivityToolbar } from '../ui/ActivityToolbar';

interface ActivityListPageProps {
  model: ServiceDetailHookResponse;
  router: AppRouterInstance;
}

export default function ActivityListPage({ model, router }: ActivityListPageProps) {
  const activitiesModel = useActivities(model.data.service?.poolId);

  return (
    <>
      <ActivityToolbar model={model} router={router} />

      <ActivityMobileList model={activitiesModel} router={router} />

      <ActivityTable model={activitiesModel} router={router} />
    </>
  );
}

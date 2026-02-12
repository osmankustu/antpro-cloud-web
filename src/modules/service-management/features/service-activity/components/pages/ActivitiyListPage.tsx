import { ServiceModel } from '@/modules/service-management/types/service.types';
import { useRouter } from 'next/navigation';
import { useActivities } from '../../hooks/useActivities';
import { ActivityMobileList } from '../ui/ActivityMobileList';
import { ActivityTable } from '../ui/ActivityTable';
import { ActivityToolbar } from '../ui/ActivityToolbar';

interface ActivityListPageProps {
  service?: ServiceModel;
}

export default function ActivityListPage({ service }: ActivityListPageProps) {
  const router = useRouter();
  const { data, actions, state, errors } = useActivities(service?.poolId!);

  return (
    <>
      <ActivityToolbar router={router} service={service} />

      <ActivityMobileList
        activities={data.activities}
        isFetching={state.activitiesState.isFetching}
        isLoading={state.activitiesState.isLoading}
        onRetry={actions.refetch}
        error={errors.error}
        router={router}
      />

      <ActivityTable
        activities={data.activities}
        isFetching={state.activitiesState.isFetching}
        isLoading={state.activitiesState.isLoading}
        onRetry={actions.refetch}
        error={errors.error}
        router={router}
      />
    </>
  );
}

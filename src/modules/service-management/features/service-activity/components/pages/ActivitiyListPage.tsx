import { ServiceModel } from '@/modules/service-management/types/service.types';
import { useRouter } from 'next/navigation';
import { useActivities } from '../../hooks/useActivities';
import { ActivityTable } from '../ui/ActivityTable';
import { ActivityToolbar } from '../ui/ActivityToolbar';

interface ActivityListPageProps {
  service?: ServiceModel;
}

export default function ActivityListPage({ service }: ActivityListPageProps) {
  const router = useRouter();
  const { activities, activitiesRefetch, error, handleDelete, isDeleting, isFetching, isLoading } =
    useActivities(service?.poolId!);

  return (
    <>
      <ActivityToolbar router={router} service={service} />
      <ActivityTable
        activities={activities}
        isFetching={isFetching}
        isLoading={isLoading}
        onRetry={activitiesRefetch}
        error={error}
        router={router}
      />
    </>
  );
}

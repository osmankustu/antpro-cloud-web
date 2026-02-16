import { DeleteModal } from '@/components/ui/button/DeleteModalButton';
import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { ServiceMessages } from '@/modules/service-management/constants/serviceMessages';
import { ActivityModel } from '@/modules/service-management/types/activity.types';
import { ServiceModel } from '@/modules/service-management/types/service.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';

interface DetailToolbarProps {
  title: string;
  service?: ServiceModel;
  activity?: ActivityModel;
  isLoading?: boolean;
  isFetching?: boolean;
  isDeleting?: boolean;
  isDeletingSuccess?: boolean;
  router: AppRouterInstance;
  error?: any;
  onRetry?: () => void;
  onDelete: () => Promise<void>;
}

export function ActivityDetailToolbar({
  title,
  service,
  activity,
  isLoading,
  isFetching,
  isDeleting,
  isDeletingSuccess,
  router,
  error,
  onRetry,
  onDelete,
}: DetailToolbarProps) {
  const pathname = usePathname();
  const isEdit = pathname.includes('/edit-activity');

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">{title}</h4>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <ToolbarButton
          children={'Genel Bilgiler'}
          active={!isEdit}
          onClick={() =>
            router.push(`/management/service-management/${service?.id}/activities/${activity?.id}`)
          }
        />
        <ToolbarButton
          children={'Düzenle-Döküman Ekle'}
          active={isEdit}
          onClick={() => router.push(`${activity?.id}/edit-activity`)}
        />
        <DeleteModal
          message={ServiceMessages.deleteActivity}
          onConfirm={onDelete}
          onDeleting={isDeleting}
          onSuccess={isDeletingSuccess}
        />
      </div>
    </div>
  );
}

import { DeleteModal } from '@/components/ui/button/DeleteModalButton';
import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { ServiceMessages } from '@/modules/service-management/constants/serviceMessages';
import { ServiceDetailHookResponse } from '@/modules/service-management/features/service/hooks/types/serviceHookReturn.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { ActivitiyDetailHookResponse } from '../../../hooks/types/activityHookReturn.types';

interface ActivityDetailToolbarProps {
  models: {
    activityModel: ActivitiyDetailHookResponse;
    serviceModels: ServiceDetailHookResponse;
  };
  router: AppRouterInstance;
}

export function ActivityDetailToolbar({ models, router }: ActivityDetailToolbarProps) {
  const { actions, data, errors, state } = models.activityModel;
  const service = models.serviceModels.data.service;

  const pathname = usePathname();
  const isEdit = pathname.includes('/edit-activity');

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {'Hareket Detayları'}
      </h4>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <ToolbarButton
          children={'Genel Bilgiler'}
          active={!isEdit}
          onClick={() =>
            router.push(
              `/management/service-management/${service?.id}/activities/${data.activity?.id}`,
            )
          }
        />
        <ToolbarButton
          children={'Düzenle-Döküman Ekle'}
          active={isEdit}
          onClick={() =>
            router.push(
              `/management/service-management/${service?.id}/activities/${data.activity?.id}/edit-activity`,
            )
          }
        />
        <DeleteModal
          message={ServiceMessages.deleteActivity}
          onConfirm={() => actions.delete()}
          onDeleting={state.deleteState.isLoading}
          onSuccess={state.deleteState.isSuccess}
        />
      </div>
    </div>
  );
}

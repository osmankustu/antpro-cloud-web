import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ServiceDetailHookResponse } from '../../../service/hooks/types/serviceHookReturn.types';
import { ActivityAddModal } from '../modals/ActivityAddModal';

type Props = {
  model: ServiceDetailHookResponse;
  router: AppRouterInstance;
  onSearch?: (v: string) => void;
};

export function ActivityToolbar({ onSearch, model, router }: Props) {
  return (
    <div className="dark:bg-white/[0.03]mb-4 mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Servis Hareketleri
        </h3>
        <div className="relative w-full sm:w-auto"></div>
      </div>

      <div className="w-full sm:w-auto">
        <ActivityAddModal model={model} router={router} />
      </div>
    </div>
  );
}

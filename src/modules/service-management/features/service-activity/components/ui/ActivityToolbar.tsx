import { ServiceModel } from '@/modules/service-management/types/service.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ActivityAddModal } from '../modals/ActivityAddModal';

type Props = {
  service?: ServiceModel;
  onSearch?: (v: string) => void;
  router: AppRouterInstance;
};

export function ActivityToolbar({ onSearch, router, service }: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        Servis Hareketleri
        <div className="relative w-full sm:w-auto"></div>
      </div>

      <div className="w-full sm:w-auto">
        <ActivityAddModal service={service} />
      </div>
    </div>
  );
}

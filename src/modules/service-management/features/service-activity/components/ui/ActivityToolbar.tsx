import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type Props = {
  onSearch?: (v: string) => void;
  router: AppRouterInstance;
};

export function ActivityToolbar({ onSearch, router }: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        Servis Hareketleri
        <div className="relative w-full sm:w-auto"></div>
      </div>

      <div className="w-full sm:w-auto">
        <ToolbarButton onClick={() => router.push('service-management/add-service')}>
          Oluştur
        </ToolbarButton>
      </div>
    </div>
  );
}

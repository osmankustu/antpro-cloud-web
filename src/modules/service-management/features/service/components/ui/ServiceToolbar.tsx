import AddButton from '@/components/ui/button/AddButton';
import FilterButton from '@/components/ui/button/FilterButton';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FcSearch } from 'react-icons/fc';

type Props = {
  onSearch?: (v: string) => void;
  router: AppRouterInstance;
};

export function ServiceToolbar({ onSearch, router }: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <FilterButton size="sm">Filtre</FilterButton>

        <div className="relative w-full sm:w-auto">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <FcSearch size={20} />
          </span>

          <input
            type="text"
            placeholder="Firma adına göre ara..."
            onChange={e => onSearch?.(e.target.value)}
            className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 h-10 w-full rounded-lg border border-gray-200 bg-transparent py-2 pr-12 pl-10 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden sm:h-11 sm:w-[300px] xl:w-[430px] dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
          />

          <button className="absolute top-1/2 right-2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
            <span>⌘</span>
            <span>K</span>
          </button>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <AddButton
          className="w-full sm:w-auto"
          onClick={() => router.push('service-management/add-service')}
        >
          Kayıt Oluştur
        </AddButton>
      </div>
    </div>
  );
}

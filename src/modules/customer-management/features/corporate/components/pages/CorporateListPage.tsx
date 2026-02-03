import { useRouter } from 'next/navigation';
import { useCorporates } from '../../hooks/useCorporates';
import { CorporateMobileList } from '../ui/CorporateMobileList';
import { CorporateTable } from '../ui/CorporateTable';
import { CorporateToolbar } from '../ui/CorporateToolbar';

export default function CorporateListPage() {
  const { customers, isFetching, isLoading, error } = useCorporates();
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-3 pt-3 pb-3 sm:px-6 sm:pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <CorporateToolbar />
      <CorporateMobileList
        customers={customers}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        router={router}
      />
      <CorporateTable
        customers={customers}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        router={router}
      />
    </div>
  );
}

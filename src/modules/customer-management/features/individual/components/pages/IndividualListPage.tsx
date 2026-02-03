'use client';
import { useRouter } from 'next/navigation';
import { useIndividuals } from '../../hooks/useIndividuals';
import { IndividualMobileList } from '../ui/IndividualMobileList';
import { IndividualTable } from '../ui/IndividualTable';
import { IndividualToolbar } from '../ui/IndividualToolbar';

export default function IndividualListPage() {
  const { customers, isFetching, isLoading, error } = useIndividuals();
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-3 pt-3 pb-3 sm:px-6 sm:pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <IndividualToolbar />
      <IndividualMobileList
        customers={customers}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        router={router}
      />
      <IndividualTable
        customers={customers}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        router={router}
      />
    </div>
  );
}

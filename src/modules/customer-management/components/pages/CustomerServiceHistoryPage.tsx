'use client';

import { IndividualCustomerModel } from '@/modules/customer-management/types/individual.types.';
import { useRouter } from 'next/navigation';
import useIndividualHistory from '../../hooks/useIndividualHistory';
import { CorporateCustomerModel } from '../../types/corporate.types';
import { ServiceHistoryMobileList } from '../ui/service-history/ServiceHistoryMobileList';
import { ServiceHistoryTable } from '../ui/service-history/ServiceHistoryTable';
import { ServiceHistoryToolbar } from '../ui/service-history/ServiceHistoryToolbar';

interface IndividualServiceHistoryPageProps {
  customer: IndividualCustomerModel | CorporateCustomerModel;
}
export default function CustomerServiceHistoryPage({
  customer,
}: IndividualServiceHistoryPageProps) {
  const router = useRouter();
  const { services, isLoading, isFetching, handleRetry, error } = useIndividualHistory(
    customer?.id,
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-3 pt-3 pb-3 sm:px-6 sm:pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <ServiceHistoryToolbar router={router} />
      <ServiceHistoryTable
        services={services}
        onRetry={handleRetry}
        isFetching={isFetching}
        isLoading={isLoading}
        router={router}
        error={error}
      />
      <ServiceHistoryMobileList
        services={services}
        //onRetry={handleRetry}
        isFetching={isFetching}
        isLoading={isLoading}
        router={router}
        error={error}
      />
    </div>
  );
}

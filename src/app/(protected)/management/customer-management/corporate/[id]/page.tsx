'use client';
import CorporateDetailPage from '@/modules/customer-management/features/corporate/components/pages/CorporateDetailPage';
import { useCorporateDetailCtx } from '@/modules/customer-management/features/corporate/context/CorporateDetailContext';

const Page = () => {
  const {
    customer,
    addresses,
    isLoading,
    isFetching,
    isDeleting,
    error,
    refetch,
    router,
    handleDeleteAddress,
  } = useCorporateDetailCtx();
  return (
    <CorporateDetailPage
      isFetching={isFetching}
      isLoading={isLoading}
      error={error}
      customer={customer}
      onDelete={() => {}}
      router={router}
      onRetry={refetch}
    />
  );
};

export default Page;

'use client';
import IndividualDetailPage from '@/modules/customer-management/features/individual/components/pages/IndividualDetailPage';
import { useIndividualDetailCtx } from '@/modules/customer-management/features/individual/context/IndividualDetailContext';

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
  } = useIndividualDetailCtx();
  return (
    <IndividualDetailPage
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

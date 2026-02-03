'use client';
import ServiceDetailPage from '@/modules/service-management/features/service/components/pages/ServiceDetailPage';
import { useServiceDetailCtx } from '@/modules/service-management/features/service/context/ServiceDetailContext';

const page = () => {
  const {
    service,
    customerName,
    assignedName,
    isDeleting,
    isFetching,
    isLoading,
    error,
    refetch,
    router,
  } = useServiceDetailCtx();
  return (
    <ServiceDetailPage
      isFetching={isFetching}
      isLoading={isLoading}
      error={error}
      service={service}
      customerName={customerName}
      assignedName={assignedName}
      router={router}
      onRetry={refetch}
    />
  );
};

export default page;

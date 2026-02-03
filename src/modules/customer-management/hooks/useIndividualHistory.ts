import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { useAppDispatch, useAppSelector } from '@/core/store/base/hook';
import { Toast } from '@/core/utils/toast/toast';
import { useGetAllCustomersQuery } from '@/modules/customer-management/endpoints/customerShared.endpoints';
import {
  setCustomerDynamicQuery,
  setCustomerIsDynamic,
} from '@/modules/customer-management/store/customerManagementSlice';
import useServiceSharedEndpoints from '@/modules/service-management/hooks/useServiceSharedEndpoints';
import { useEffect, useState } from 'react';

export default function useIndividualHistory(customerId: string, pageSize: number = 20) {
  const [error, setError] = useState<ResponseError | undefined>(undefined);

  const dispatch = useAppDispatch();
  const { isDynamic, dynamicQuery } = useAppSelector(s => s.CustomerManagementUi);

  //Pagination
  const [pageIndex, setPageIndex] = useState(0);
  const [services, setServices] = useState<any[]>([]);

  // Query Args
  const queryArgs = { customerId, pageIndex, pageSize };

  const { getServicesByCustomerId, getServicesByCustomerIdByDynamic } = useServiceSharedEndpoints();
  // Customers
  const {
    data: customers,
    isFetching: customerFetching,
    error: customerError,
    refetch: refetchCustomer,
  } = useGetAllCustomersQuery();

  // Services Query
  const {
    data,
    isFetching: queryFetching,
    isLoading,
    error: queryError,
    refetch: refetchServices,
  } = isDynamic && dynamicQuery
    ? getServicesByCustomerIdByDynamic(
        queryArgs.customerId,
        queryArgs.pageIndex,
        queryArgs.pageSize,
        dynamicQuery,
      )
    : getServicesByCustomerId(queryArgs.customerId, queryArgs.pageIndex, queryArgs.pageSize);

  const endpointError = (queryError || customerError) as ResponseError;
  const isFetching = queryFetching || customerFetching;

  // Mount — reset filters + list
  useEffect(() => {
    dispatch(setCustomerIsDynamic(false));
    dispatch(setCustomerDynamicQuery(null));
    setPageIndex(0);
    setServices([]);
  }, []);

  // Show API Errors once

  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError.title);
  }, [endpointError]);

  // On Filter Change → Reset List
  useEffect(() => {
    setPageIndex(0);
    setServices([]);
  }, [dynamicQuery]);

  // Merge services + customers
  useEffect(() => {
    if (!data || !customers) return;

    const customerMap = new Map(customers.items.map(c => [c.id, c.fullName]));

    const merged = data.items.map(service => ({
      ...service,
      customerName: customerMap.get(service.customerId) || 'Bilinmeyen Müşteri',
    }));

    setServices(prev => {
      const newItems = merged.filter(item => !prev.some(p => p.id === item.id));
      return pageIndex === 0 ? merged : [...prev, ...newItems];
    });
  }, [data, customers, pageIndex]);

  // Load more
  const loadMore = () => {
    if (!isFetching && data && data.items.length === pageSize) {
      setPageIndex(prev => prev + 1);
    }
  };

  // Filter apply
  const applyFilters = (query: any) => {
    dispatch(setCustomerDynamicQuery(query));
    dispatch(setCustomerIsDynamic(true));
  };

  // Retry
  const handleRetry = () => {
    setError(undefined);
    refetchCustomer();
    refetchServices();
  };

  // Pull to refresh
  const handleRefresh = async () => {
    setPageIndex(0);
  };

  return {
    services,
    isLoading,
    isFetching,
    error,
    customers,
    applyFilters,
    loadMore,
    handleRetry,
    handleRefresh,
  };
}

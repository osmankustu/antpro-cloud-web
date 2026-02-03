import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { useAppDispatch, useAppSelector } from '@/core/store/base/hook';
import { Toast } from '@/core/utils/toast/toast';
import { useCustomerSharedEndpoints } from '@/modules/customer-management/hooks/useCustomerSharedEndpoints';
import {
  setServiceDynamicQuery,
  setServiceIsDynamic,
} from '@/modules/service-management/store/serviceManagementSlice';
import { useEffect, useState } from 'react';
import {
  useGetServicesByDynamicQuery,
  useGetServicesQuery,
} from '../../../endpoints/service.endpoints';

export function useServices(pageSize: number = 20) {
  //Service List (paginate)

  const [error, setError] = useState<ResponseError | undefined>(undefined);

  const dispatch = useAppDispatch();
  const { isDynamic, dynamicQuery } = useAppSelector(s => s.serviceManagementUi);

  //Pagination
  const [pageIndex, setPageIndex] = useState(0);
  const [services, setServices] = useState<any[]>([]);

  // Query Args
  const queryArgs = { pageIndex, pageSize };

  const { getAllCustomer } = useCustomerSharedEndpoints();
  // Customers
  const {
    data: customers,
    isFetching: customerFetching,
    error: customerError,
    refetch: refetchCustomer,
  } = getAllCustomer;

  // Services Query
  const {
    data,
    isFetching: queryFetching,
    isLoading,
    error: queryError,
    refetch: refetchServices,
  } = isDynamic && dynamicQuery
    ? useGetServicesByDynamicQuery({ ...queryArgs, query: dynamicQuery })
    : useGetServicesQuery(queryArgs);

  const endpointError = (queryError || customerError) as ResponseError;
  const isFetching = queryFetching || customerFetching;

  // Mount — reset filters + list
  useEffect(() => {
    dispatch(setServiceIsDynamic(false));
    dispatch(setServiceDynamicQuery(null));
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
    dispatch(setServiceDynamicQuery(query));
    dispatch(setServiceIsDynamic(true));
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

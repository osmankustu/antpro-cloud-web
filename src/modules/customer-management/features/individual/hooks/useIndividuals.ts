import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { useAppDispatch, useAppSelector } from '@/core/store/base/hook';
import { Toast } from '@/core/utils/toast/toast';
import {
  useGetIndividualCustomersByDynamicQuery,
  useGetIndividualCustomersQuery,
} from '@/modules/customer-management/endpoints/individual.endpoints';
import {
  setCustomerDynamicQuery,
  setCustomerIsDynamic,
} from '@/modules/customer-management/store/customerManagementSlice';
import { useEffect, useRef, useState } from 'react';

export function useIndividuals(pageSize: number = 10) {
  const dispatch = useAppDispatch();
  const { isDynamic, dynamicQuery } = useAppSelector(s => s.serviceManagementUi);

  const [pageIndex, setPageIndex] = useState(0);
  const [customers, setCustomers] = useState<any[]>([]);

  const queryArgs = { pageIndex, pageSize };

  //Customers Query
  const {
    data,
    isFetching,
    isLoading,
    error: queryError,
    refetch,
  } = isDynamic && dynamicQuery
    ? useGetIndividualCustomersByDynamicQuery({ ...queryArgs, query: dynamicQuery })
    : useGetIndividualCustomersQuery(queryArgs);

  //Error
  const error = queryError as ResponseError;
  const lastErrorRef = useRef<string | null>(null);
  //Show API Error
  useEffect(() => {
    if (!error) return;

    const key = `${error.statusCode}-${error.title}`;

    if (lastErrorRef.current === key) return;

    lastErrorRef.current = key;

    Toast.error(error.title);
  }, [error]);

  // Mount — reset filters + list
  useEffect(() => {
    dispatch(setCustomerIsDynamic(false));
    dispatch(setCustomerDynamicQuery(null));
    setPageIndex(0);
    setCustomers([]);
  }, []);

  //On Filter Change Reset List
  useEffect(() => {
    setPageIndex(0);
    setCustomers([]);
  }, [dynamicQuery]);

  //Merge Customers
  useEffect(() => {
    if (!data) return;
    setCustomers(prev => {
      const newItems = data.items.filter(item => !prev.some(p => p.id === item.id));
      return pageIndex === 0 ? data.items : [...prev, newItems];
    });
  }, [data, pageIndex]);

  //Load more
  const loadMore = () => {
    if (!isFetching && data && data.items.length === pageSize) {
      setPageIndex(prev => prev + 1);
    }
  };

  //Filter apply

  const applyFilters = (query: any) => {
    dispatch(setCustomerDynamicQuery(query));
    dispatch(setCustomerIsDynamic(true));
  };

  //Retry
  const handleRetry = async () => {
    await refetch();
  };

  // Pull to refresh
  const handleRefresh = async () => {
    setPageIndex(0);
    await refetch();
  };

  return {
    customers,
    isLoading,
    isFetching,
    error,
    applyFilters,
    loadMore,
    handleRetry,
    handleRefresh,
  };
}

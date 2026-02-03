import { DynamicQuery } from '@/core/model/dynamicQuery';
import {
  useGetServicesByCustomerIdQuery,
  useGetServicesByDynamicCustomerIdQuery,
} from '../endpoints/serviceShared.endpoints';

export default function useServiceSharedEndpoints() {
  const getServicesByCustomerId = (customerId: string, pageIndex: number, pageSize: number) =>
    useGetServicesByCustomerIdQuery({
      customerId: customerId,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
  const getServicesByCustomerIdByDynamic = (
    customerId: string,
    pageIndex: number,
    pageSize: number,
    dynamicQuery: DynamicQuery,
  ) =>
    useGetServicesByDynamicCustomerIdQuery({
      customerId,
      pageIndex,
      pageSize,
      query: dynamicQuery,
    });

  return {
    getServicesByCustomerId,
    getServicesByCustomerIdByDynamic,
  };
}

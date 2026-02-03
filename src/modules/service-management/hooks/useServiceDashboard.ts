import { useGetServicesOpenServicesQuery } from '../endpoints/serviceDashboard.enpoints';

export function useServiceDashboard() {
  const { data, isLoading, isFetching, error } = useGetServicesOpenServicesQuery();

  return {
    data,
  };
}

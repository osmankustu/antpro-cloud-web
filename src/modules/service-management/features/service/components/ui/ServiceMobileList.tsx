import Button from '@/components/ui/button/Button';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useRef } from 'react';
import ProiortyStatus from '../../../../../../components/ui/indicators/PriortyStatus';
import ServiceStatus from '../../../../../../components/ui/indicators/ServiceStatus';
import { useServices } from '../../hooks/useServices';

type ServiceMobileListProps = {
  router: AppRouterInstance;
};

export function ServiceMobileList({ router }: ServiceMobileListProps) {
  const { data, state, errors, actions } = useServices(10, 'infinite');
  const hasMore = true;

  const showSpinner = state.servicesState.isLoading || state.servicesState.isFetching;
  const showEmpty =
    !state.servicesState.isLoading &&
    !state.servicesState.isFetching &&
    !errors.error &&
    data.services?.length === 0;
  const showError =
    !state.servicesState.isLoading && !state.servicesState.isFetching && errors.error;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !state.servicesState.isFetching) {
          actions.loadMore();
        }
      },
      {
        root: null,
        rootMargin: '120px',
        threshold: 0.1,
      },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [actions.loadMore, state.servicesState.isFetching, hasMore]);

  return (
    <div className="grid gap-3 md:hidden">
      {showSpinner && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-400 border-t-gray-800 dark:border-gray-500 dark:border-t-white" />
        </div>
      )}

      {showError ? (
        <div className="rounded-xl border border-gray-200 p-4 text-center dark:border-gray-800">
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {errors.error?.detail}
            </p>
          </div>
        </div>
      ) : showEmpty ? (
        <div className="rounded-xl border border-gray-200 p-4 text-center dark:border-gray-800">
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Servis bulunamadı.
            </p>
          </div>
        </div>
      ) : (
        data.services?.map(service => (
          <div
            key={service.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                  {service.customerName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{service.code}</p>
              </div>

              <ServiceStatus size="md" serviceStatus={service.status} />
            </div>

            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{service.description}</p>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div>
                <span className="block font-medium text-gray-700 dark:text-gray-300">Öncelik</span>
                <ProiortyStatus priority={service.priority} size="md" />
              </div>

              <div>
                <span className="block font-medium text-gray-700 dark:text-gray-300">Tarih</span>
                {formatDate(service.createdDate)}
              </div>

              <div>
                <span className="block font-medium text-gray-700 dark:text-gray-300">
                  Güncelleme
                </span>
                {formatDate(service.updatedDate)}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                className="w-full"
                onClick={() => router.push(`service-management/${service.id}`)}
              >
                Detay
              </Button>
            </div>
          </div>
        ))
      )}
      {/* Infinite scroll sentinel */}
      {hasMore && (
        <div ref={loaderRef} className="flex h-14 items-center justify-center">
          {state.servicesState.isFetching && data.services && (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700 dark:border-gray-600 dark:border-t-white" />
          )}
        </div>
      )}
    </div>
  );
}

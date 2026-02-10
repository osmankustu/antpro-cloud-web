import Pagination from '@/components/tables/Pagination';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ProiortyStatus from '../../../../../../components/ui/indicators/PriortyStatus';
import ServiceStatus from '../../../../../../components/ui/indicators/ServiceStatus';
import { useServices } from '../../hooks/useServices';

type ServiceTableProps = {
  router: AppRouterInstance;
};

export function ServiceTable({ router }: ServiceTableProps) {
  const { data, state, errors, actions } = useServices(20, 'pagination');

  const showSpinner = state.servicesState.isLoading || state.servicesState.isFetching;
  const showEmpty =
    !state.servicesState.isLoading &&
    !state.servicesState.isFetching &&
    !errors.error &&
    data.services?.length === 0;
  const showError =
    !state.servicesState.isLoading && !state.servicesState.isFetching && errors.error;

  return (
    <>
      <div className='dark:bg-white/[0.03]" relative mt-5 hidden max-w-full overflow-hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white px-3 pt-3 pb-3 sm:px-6 sm:pt-4 md:block dark:border-gray-800'>
        <div className="">
          {/* Local spinner */}
          {showSpinner && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/40">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-400 border-t-gray-800 dark:border-gray-500 dark:border-t-white" />
            </div>
          )}

          <Table className="min-w-[900px]">
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                {[
                  'ID',
                  'Müşteri-Firma',
                  'Servis Konusu',
                  'Durum',
                  'Öncelik',
                  'Tarih',
                  'Son Güncelleme',
                  'İşlemler',
                ].map(title => (
                  <TableCell
                    key={title}
                    isHeader
                    className="sm:text-theme-xs py-2 text-start text-xs font-medium text-gray-500 sm:py-3 dark:text-gray-400"
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {showError ? (
              <TableBody key="error">
                <TableRow>
                  <TableCell colSpan={10}>
                    <div className="text-center text-sm text-red-500 dark:text-red-400">
                      {errors.error?.detail || 'Servis bilgileri yüklenemedi.'}
                      <button className="ml-2 underline" onClick={actions.retry}>
                        Tekrar Dene
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : showEmpty ? (
              <TableBody key="empty">
                <TableRow>
                  <TableCell colSpan={10}>
                    <div className="flex items-center justify-center px-3 py-8 text-center sm:py-10">
                      <p className="sm:text-theme-md text-sm font-medium text-gray-800 dark:text-white/90">
                        Servis bulunamadı.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.services?.map(service => (
                  <TableRow key={service.id} className="transition-all duration-300">
                    <TableCell className="sm:text-theme-sm py-2 text-xs sm:py-3">
                      <p className="font-medium text-gray-800 dark:text-white/90">{service.code}</p>
                    </TableCell>

                    <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                      {service.customerName}
                    </TableCell>

                    <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                      {service.subject}
                    </TableCell>

                    <TableCell className="sm:text-theme-sm py-2 text-xs sm:py-2">
                      <ServiceStatus size="md" serviceStatus={service.status} />
                    </TableCell>

                    <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                      <ProiortyStatus priority={service.priority} size="md" />
                    </TableCell>

                    <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                      {formatDate(service.createdDate)}
                    </TableCell>

                    <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                      {formatDate(service.updatedDate)}
                    </TableCell>

                    <TableCell className="sm:text-theme-sm py-2 text-xs sm:py-3">
                      <Button
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => router.push(`service-management/${service.id}`)}
                      >
                        Detay
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      <div className="mt-5 hidden justify-items-center md:block">
        <Pagination
          {...{
            currentPage: data.pagination.currentPage! + 1,
            totalPages: data.pagination.pageCount!,
            onPageChange: value => actions.goToPage(value - 1),
          }}
        />
      </div>
    </>
  );
}

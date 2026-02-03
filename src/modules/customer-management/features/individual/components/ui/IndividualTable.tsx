import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { IndividualCustomerModel } from '@/modules/customer-management/types/individual.types.';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type Props = {
  customers?: IndividualCustomerModel[];
  isLoading?: boolean;
  isFetching?: boolean;
  error?: ResponseError;
  router: AppRouterInstance;
};

export function IndividualTable({ customers, isLoading, isFetching, error, router }: Props) {
  const showSpinner = isLoading || (isFetching && !customers);
  const showEmpty = !isLoading && !isFetching && !error && customers && customers.length === 0;
  const showError = !isLoading && !isFetching && error;

  return (
    <div className="relative hidden max-w-full overflow-x-auto md:block">
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
              'Müşteri NO',
              'Adı-Soyadı',
              'Email',
              'Oluşturma Tarihi',
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
                <div className="flex items-center justify-center px-3 py-8 text-center sm:py-10">
                  <p className="sm:text-theme-md text-sm font-medium text-gray-800 dark:text-white/90">
                    {error.detail}
                  </p>
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
                    Müşteri bulunamadı.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {customers?.map(customer => (
              <TableRow key={customer.id} className="transition-all duration-300">
                <TableCell className="sm:text-theme-sm py-2 text-xs sm:py-3">
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {customer.customerNo}
                  </p>
                </TableCell>

                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {customer.fullName}
                </TableCell>

                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {customer.email}
                </TableCell>

                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {formatDate(customer.createdDate)}
                </TableCell>

                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {formatDate(customer.updatedDate)}
                </TableCell>

                <TableCell className="sm:text-theme-sm py-2 text-xs sm:py-3">
                  <Button
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => router.push(`individual/${customer.id}`)}
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
  );
}

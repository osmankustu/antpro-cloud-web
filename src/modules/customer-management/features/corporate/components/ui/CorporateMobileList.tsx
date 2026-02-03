import Button from '@/components/ui/button/Button';
import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { CorporateCustomerModel } from '@/modules/customer-management/types/corporate.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type Props = {
  customers?: CorporateCustomerModel[];
  isLoading?: boolean;
  isFetching?: boolean;
  error?: ResponseError;
  router: AppRouterInstance;
};

export function CorporateMobileList({ customers, isLoading, isFetching, error, router }: Props) {
  const showSpinner = isLoading || (isFetching && !customers);
  const showEmpty = !isLoading && !isFetching && !error && customers && customers.length === 0;
  const showError = !isLoading && !isFetching && error;

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
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">{error.detail}</p>
          </div>
        </div>
      ) : showEmpty ? (
        <div className="rounded-xl border border-gray-200 p-4 text-center dark:border-gray-800">
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Müşteri bulunamadı.
            </p>
          </div>
        </div>
      ) : (
        customers?.map(customer => (
          <div
            key={customer.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                  {customer.fullName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{customer.customerNo}</p>
              </div>
            </div>

            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{customer.email}</p>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div>
                <span className="block font-medium text-gray-700 dark:text-gray-300">Tarih</span>
                {formatDate(customer.createdDate)}
              </div>

              <div>
                <span className="block font-medium text-gray-700 dark:text-gray-300">
                  Güncelleme
                </span>
                {formatDate(customer.updatedDate)}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                className="w-full"
                onClick={() => router.push(`corporate/${customer.id}`)}
              >
                Detay
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

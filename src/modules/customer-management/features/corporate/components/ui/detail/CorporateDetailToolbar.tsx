'use client';

import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { CorporateCustomerModel } from '@/modules/customer-management/types/corporate.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import ToolbarButton from './ToolbarButton';

interface DetailToolbarProps {
  customer?: CorporateCustomerModel;
  isLoading: boolean;
  isFetching: boolean;
  router: AppRouterInstance;
  error?: any;
  onRetry?: () => void;
  onDelete: () => void;
}

export function CorporateDetailToolbar({
  customer,
  isLoading,
  isFetching,
  router,
  error,
  onRetry,
  onDelete,
}: DetailToolbarProps) {
  const pathname = usePathname();

  const isHistory = pathname.endsWith('/service-history');
  const isEdit = pathname.endsWith('/edit');

  return (
    <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {customer?.companyName || 'Müşteri'}
          </h4>

          {isLoading || isFetching ? (
            <p className="text-sm text-gray-400">Yükleniyor...</p>
          ) : error ? (
            <button className="text-sm text-red-500 underline" onClick={onRetry}>
              Yükleme hatası – tekrar dene
            </button>
          ) : (
            <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              {customer?.customerNo} • {formatDate(customer?.createdDate)}
            </p>
          )}
        </div>

        {/* Right */}
        <div className="scrollbar-none overflow-x-auto">
          <div className="flex min-w-max gap-2">
            <ToolbarButton
              active={!isHistory && !isEdit}
              onClick={() =>
                router.push(`/management/customer-management/corporate/${customer?.id}`)
              }
            >
              Genel Bilgiler
            </ToolbarButton>

            <ToolbarButton
              active={isHistory}
              onClick={() =>
                router.push(
                  `/management/customer-management/corporate/${customer?.id}/service-history`,
                )
              }
            >
              Servis Geçmişi
            </ToolbarButton>

            <ToolbarButton
              active={isEdit}
              onClick={() =>
                router.push(`/management/customer-management/corporate/${customer?.id}/edit`)
              }
            >
              Düzenle
            </ToolbarButton>

            {/* Opsiyonel butonlar */}
            <ToolbarButton active={false} onClick={() => console.log('QR Oluştur')}>
              QR
            </ToolbarButton>
            <ToolbarButton active={false} onClick={onDelete}>
              Sil
            </ToolbarButton>
            <ToolbarButton active={false} onClick={() => console.log('Yazdır')}>
              Yazdır
            </ToolbarButton>
          </div>
        </div>
      </div>
    </div>
  );
}

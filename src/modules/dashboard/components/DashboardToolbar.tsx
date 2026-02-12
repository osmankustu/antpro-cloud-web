'use client';
import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { useAppSelector } from '@/core/store/base/hook';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ServiceDetailToolbarProps {
  isLoading?: boolean;
  isFetching?: boolean;
  router: AppRouterInstance;
  error?: any;
  onRetry?: () => void;
}

export function DashboardToolbar({
  isLoading,
  isFetching,
  router,
  error,
  onRetry,
}: ServiceDetailToolbarProps) {
  const pathname = usePathname();
  const userName = useAppSelector(s => s.auth.user?.fullName);
  useEffect(() => {}, [userName]);

  const isDashboard = pathname.endsWith('/management');
  const isServiceStats = pathname.endsWith('/management/service-stats');
  const isCustomerStats = pathname.endsWith('/management/customer-stats');

  return (
    <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div>
          <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            👋 Merhaba {userName}
          </h5>

          {isLoading || isFetching ? (
            <p className="text-sm text-gray-400">Yükleniyor...</p>
          ) : error ? (
            <button className="text-sm text-red-500 underline" onClick={onRetry}>
              Yükleme hatası – tekrar dene
            </button>
          ) : (
            <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              Bugün yapacak harika işlerimiz var 🚀
            </p>
          )}
        </div>

        {/* Right */}
        <div className="scrollbar-none overflow-x-auto">
          <div className="flex min-w-max gap-2">
            <ToolbarButton active={isDashboard} onClick={() => router.push(`/management`)}>
              Genel Statistikler
            </ToolbarButton>

            <ToolbarButton
              active={isServiceStats}
              onClick={() => router.push(`/management/service-stats`)}
            >
              Servis Statistikleri
            </ToolbarButton>
            <ToolbarButton
              active={isCustomerStats}
              onClick={() => router.push(`/management/customer-stats`)}
            >
              Müşteri Statistikleri
            </ToolbarButton>
            <ToolbarButton
              active={isCustomerStats}
              onClick={() => router.push(`/management/customer-stats`)}
            >
              Kullanım Verileri
            </ToolbarButton>

            <ToolbarButton
              active={false}
              onClick={() => router.push(`/management/service-management/add-service`)}
            >
              Servis Oluştur
            </ToolbarButton>

            <ToolbarButton
              active={false}
              onClick={() => router.push(`/management/customer-management/add-customer`)}
            >
              Müşteri Oluştur
            </ToolbarButton>

            {/* Opsiyonel butonlar */}
          </div>
        </div>
      </div>
    </div>
  );
}

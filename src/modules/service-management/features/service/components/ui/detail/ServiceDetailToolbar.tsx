'use client';

import ServiceStatus from '@/components/ui/indicators/ServiceStatus';
import { ServiceModel } from '@/modules/service-management/types/service.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import ToolbarButton from '../../../../../../../components/ui/button/ToolbarButton';

interface ServiceDetailToolbarProps {
  service?: ServiceModel;
  customerName?: string;
  isLoading: boolean;
  isFetching: boolean;
  router: AppRouterInstance;
  error?: any;
  onRetry?: () => void;
  onDelete: () => void;
}

export function ServiceDetailToolbar({
  service,
  customerName,
  isLoading,
  isFetching,
  router,
  error,
  onRetry,
  onDelete,
}: ServiceDetailToolbarProps) {
  const pathname = usePathname();

  const isActivities = pathname.includes('/activities');
  const isDocuments = pathname.includes('/documents');
  const isEdit = pathname.includes('/edit-service');

  return (
    <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {service?.code || 'Servis'} Detayları
          </h4>

          {isLoading || isFetching ? (
            <p className="text-sm text-gray-400">Yükleniyor...</p>
          ) : error ? (
            <button className="text-sm text-red-500 underline" onClick={onRetry}>
              Yükleme hatası – tekrar dene
            </button>
          ) : (
            <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              {customerName} • <ServiceStatus size="sm" serviceStatus={service!.status} />
            </p>
          )}
        </div>

        {/* Right */}
        <div className="scrollbar-none overflow-x-auto">
          <div className="flex min-w-max gap-2">
            <ToolbarButton
              active={!isActivities && !isDocuments && !isEdit}
              onClick={() => router.push(`/management/service-management/${service?.id}`)}
            >
              Genel Bilgiler
            </ToolbarButton>

            <ToolbarButton
              active={isActivities}
              onClick={() =>
                router.push(`/management/service-management/${service?.id}/activities`)
              }
            >
              Servis Hareketleri
            </ToolbarButton>

            <ToolbarButton
              active={isDocuments}
              onClick={() => router.push(`/management/service-management/${service?.id}/documents`)}
            >
              Dökümanlar
            </ToolbarButton>

            <ToolbarButton
              active={isEdit}
              onClick={() =>
                router.push(`/management/service-management/${service?.id}/edit-service`)
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

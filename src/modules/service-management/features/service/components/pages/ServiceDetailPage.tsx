import PriorityStatus from '@/components/ui/indicators/PriortyStatus';
import ServiceStatus from '@/components/ui/indicators/ServiceStatus';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import {
  Field,
  FullRow,
  Row,
  Section,
  Skeleton,
} from '@/modules/service-management/components/ui/detail';
import { ServiceModel } from '@/modules/service-management/types/service.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';

interface ServiceDetailPageProps {
  service?: ServiceModel;
  customerName?: string;
  assignedName?: string;
  isLoading: boolean;
  isFetching: boolean;
  router: AppRouterInstance;
  error?: any;
  onRetry?: () => void;
}

export default function ServiceDetailPage({
  service,
  customerName,
  assignedName,
  isLoading,
  isFetching,
  router,
  error,
  onRetry,
}: ServiceDetailPageProps) {
  if (isLoading || isFetching) {
    return <Skeleton />;
  }

  if (!isLoading && !isFetching && error) {
    return (
      <div className="mt-25 text-center text-sm text-red-500 dark:text-red-400">
        {error.detail || 'Servis bilgileri yüklenemedi.'}
        <button className="mb-25 ml-2 underline" onClick={onRetry}>
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (!service) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Servis bulunamadı.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Genel */}
      <Section title="Genel Bilgiler">
        <Row>
          <Field label="Servis Kodu" value={service.code} />
          <Field
            label="Müşteri"
            value={
              <Link
                children={customerName}
                href={`/management/customer-management/individual/${'d83bbe9c-ef70-4568-8110-528120f91fbd'}`}
              />
            }
          />
          <Field
            label="Müşteri Tipi"
            value={service.customerType === 'Individual' ? 'Bireysel' : 'Kurumsal'}
          />
        </Row>

        <Row>
          <Field label="Öncelik" value={<PriorityStatus priority={service.priority} size="md" />} />
          <Field label="Durum" value={<ServiceStatus size="md" serviceStatus={service.status} />} />
        </Row>
        <Row>
          <Field label="Oluşturma Tarihi" value={formatDate(service.createdDate)} />
          <Field label="Güncellenme Tarihi" value={formatDate(service.updatedDate)} />
        </Row>
      </Section>

      {/* Service Prop */}
      <Section title="Servis Tanımları">
        <Row>
          <Field label="Başlık" value={service.title} />
          <Field label="Konu" value={service.subject} />
        </Row>

        <FullRow>
          <Field label="Açıklama" value={service.description} />
        </FullRow>
      </Section>

      {/* Atama */}
      <Section title="Personel - Ekip Bilgileri">
        <Row>
          <Field
            label="Atama Türü"
            value={service.teamId ? 'Takım' : service.employeeId ? 'Personel' : 'Atanmamış'}
          />

          {service.teamId ? (
            <Field label="Takım Adı" value={assignedName || '-'} />
          ) : service.employeeId ? (
            <Field label="Personel Adı" value={assignedName || '-'} />
          ) : null}
        </Row>
      </Section>

      {/* Address */}
      <Section title="Adres Bilgileri">
        <FullRow>
          <Field
            label="Adres"
            value={`${service.address?.addressLine || ''}, ${service.address?.city || ''}, ${
              service.address?.state || ''
            }, ${service.address?.postalCode || ''}`}
          />
        </FullRow>
      </Section>
    </div>
  );
}

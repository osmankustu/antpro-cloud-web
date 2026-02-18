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
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import { ServiceDetailHookResponse } from '../../hooks/types/serviceHookReturn.types';

interface ServiceDetailPageProps {
  model: ServiceDetailHookResponse;
  router: AppRouterInstance;
}

export default function ServiceDetailPage({ model, router }: ServiceDetailPageProps) {
  const { data, actions, state, errors } = model;

  if (state.serviceState.isLoading || state.serviceState.isFetching) {
    return <Skeleton />;
  }

  if (!state.serviceState.isLoading && !state.serviceState.isFetching && errors.error) {
    return (
      <div className="mt-25 text-center text-sm text-red-500 dark:text-red-400">
        {errors.error.detail || 'Servis bilgileri yüklenemedi.'}
        <button className="mb-25 ml-2 underline" onClick={actions.refetch}>
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (!data.service) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Servis bulunamadı.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Genel */}
      <Section title="Genel Bilgiler">
        <Row>
          <Field label="Servis Kodu" value={data.service.code} />
          <Field
            label="Müşteri"
            value={
              <Link
                children={data.customerName}
                href={`/management/customer-management/individual/${'d83bbe9c-ef70-4568-8110-528120f91fbd'}`}
              />
            }
          />
          <Field
            label="Müşteri Tipi"
            value={data.service.customerType === 'Individual' ? 'Bireysel' : 'Kurumsal'}
          />
        </Row>

        <Row>
          <Field
            label="Öncelik"
            value={<PriorityStatus priority={data.service.priority} size="md" />}
          />
          <Field
            label="Durum"
            value={<ServiceStatus size="md" serviceStatus={data.service.status} />}
          />
        </Row>
        <Row>
          <Field label="Oluşturma Tarihi" value={formatDate(data.service.createdDate)} />
          <Field label="Güncellenme Tarihi" value={formatDate(data.service.updatedDate)} />
        </Row>
      </Section>

      {/* Service Prop */}
      <Section title="Servis Tanımları">
        <Row>
          <Field label="Başlık" value={data.service.title} />
          <Field label="Konu" value={data.service.subject} />
        </Row>

        <FullRow>
          <Field label="Açıklama" value={data.service.description} />
        </FullRow>
      </Section>

      {/* Atama */}
      <Section title="Personel - Ekip Bilgileri">
        <Row>
          <Field
            label="Atama Türü"
            value={
              data.service.teamId ? 'Takım' : data.service.employeeId ? 'Personel' : 'Atanmamış'
            }
          />

          {data.service.teamId ? (
            <Field label="Takım Adı" value={data.assignedName || '-'} />
          ) : data.service.employeeId ? (
            <Field label="Personel Adı" value={data.assignedName || '-'} />
          ) : null}
        </Row>
      </Section>

      {/* Address */}
      <Section title="Adres Bilgileri">
        <FullRow>
          <Field
            label="Adres"
            value={`${data.service.address?.addressLine || ''}, ${data.service.address?.city || ''}, ${
              data.service.address?.state || ''
            }, ${data.service.address?.postalCode || ''}`}
          />
        </FullRow>
      </Section>
    </div>
  );
}

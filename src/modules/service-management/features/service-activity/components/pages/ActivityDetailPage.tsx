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
import { DocumentTable } from '../../../service-document/components/ui/DocumentTable';
import { useDocumentsByActivity } from '../../../service-document/hooks/useDocumentsByActivity';
import { ActivitiyDetailHookResponse } from '../../hooks/types/activityHookReturn.types';

interface ActivityDetailPageProps {
  model: ActivitiyDetailHookResponse;
  router: AppRouterInstance;
}

export function ActivityDetailPage({ model, router }: ActivityDetailPageProps) {
  const { data, actions, errors, state } = model;
  const query = useDocumentsByActivity(data.activity?.id);

  if (state.activityState.isLoading || state.activityState.isFetching) {
    return <Skeleton />;
  }

  if (!state.activityState.isLoading && !state.activityState.isFetching && errors.error) {
    return (
      <div className="mt-25 text-center text-sm text-red-500 dark:text-red-400">
        {errors.error.detail || 'Servis bilgileri yüklenemedi.'}
        <button className="mb-25 ml-2 underline" onClick={actions.refetch}>
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (!data.activity) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Aktivite bulunamadı.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Genel */}
      <Section title="Genel Bilgiler">
        <FullRow>
          <Field label="Hareket Tanımı" value={data.activity.description} />
        </FullRow>

        <Row>
          <Field
            label="Personel"
            value={
              <Link
                children={data.employeeName}
                href={`/management/customer-management/individual/${'d83bbe9c-ef70-4568-8110-528120f91fbd'}`}
              />
            }
          />
          <Field
            label="Durum"
            value={<ServiceStatus size="md" serviceStatus={data.activity.status} />}
          />
        </Row>
        <Row>
          <Field label="Oluşturma Tarihi" value={formatDate(data.activity.createdDate)} />
          <Field label="Güncellenme Tarihi" value={formatDate(data.activity.updatedDate)} />
        </Row>
      </Section>
      <div className="mt-5">
        <Section title="Eklenen Dökümanlar">
          <DocumentTable
            documents={query.data.documents}
            error={query.errors.error}
            isFetching={query.state.documentState.isFetching || query.state.signedState.isFetching}
            isLoading={query.state.documentState.isLoading || query.state.signedState.isLoading}
            onDelete={doc => query.actions.delete(doc.id)}
            onDownload={() => {}}
            onRetry={() => query.actions.refetch()}
            onView={() => {}}
          />
        </Section>
      </div>
    </div>
  );
}

import ServiceStatus from '@/components/ui/indicators/ServiceStatus';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import {
  Field,
  FullRow,
  Row,
  Section,
  Skeleton,
} from '@/modules/service-management/components/ui/detail';
import { ActivityModel } from '@/modules/service-management/types/activity.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import { DocumentTable } from '../../../service-document/components/ui/DocumentTable';
import { useDocumentsByActivity } from '../../../service-document/hooks/useDocumentsByActivity';

interface ActivityDetailPageProps {
  activity?: ActivityModel;
  employeeName?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  router?: AppRouterInstance;
  error?: any;
  onRetry?: () => void;
}

export function ActivityDetailPage({
  activity,
  employeeName,
  isLoading,
  isFetching,
  router,
  error,
  onRetry,
}: ActivityDetailPageProps) {
  const {
    documents,
    error: documentError,
    isLoading: documentLoading,
    isFetching: documnetFetching,
  } = useDocumentsByActivity(activity?.id);

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

  if (!activity) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Aktivite bulunamadı.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Genel */}
      <Section title="Genel Bilgiler">
        <FullRow>
          <Field label="Hareket Tanımı" value={activity.description} />
        </FullRow>

        <Row>
          <Field
            label="Personel"
            value={
              <Link
                children={employeeName}
                href={`/management/customer-management/individual/${'d83bbe9c-ef70-4568-8110-528120f91fbd'}`}
              />
            }
          />
          <Field
            label="Durum"
            value={<ServiceStatus size="md" serviceStatus={activity.status} />}
          />
        </Row>
        <Row>
          <Field label="Oluşturma Tarihi" value={formatDate(activity.createdDate)} />
          <Field label="Güncellenme Tarihi" value={formatDate(activity.updatedDate)} />
        </Row>
      </Section>
      <div className="mt-5">
        <Section title="Eklenen Dökümanlar">
          <DocumentTable
            documents={documents}
            error={documentError}
            isFetching={documnetFetching}
            isLoading={documentLoading}
            onDelete={() => {}}
            onDownload={() => {}}
            onRetry={() => {}}
            onView={() => {}}
          />
        </Section>
      </div>
    </div>
  );
}

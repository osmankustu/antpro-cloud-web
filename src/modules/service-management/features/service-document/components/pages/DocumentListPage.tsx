import { useDocumentsByService } from '../../hooks/useDocumentsByService';
import { DocumentTable } from '../ui/DocumentTable';

interface DocumentListPageProps {
  serviceId?: string;
}

export function DocumentListPage({ serviceId }: DocumentListPageProps) {
  const { documents, error, handleDelete, isDeleting, isFetching, isLoading, refetch } =
    useDocumentsByService(serviceId);

  return (
    <DocumentTable
      documents={documents}
      error={error}
      isFetching={isFetching}
      isLoading={isLoading}
      onDelete={() => {}}
      onDownload={() => {}}
      onRetry={() => {}}
      onView={() => {}}
    />
  );
}

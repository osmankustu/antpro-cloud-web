import { useDocumentsByService } from '../../hooks/useDocumentsByService';
import { DocumentTable } from '../ui/DocumentTable';

interface DocumentListPageProps {
  serviceId?: string;
}

export function DocumentListPage({ serviceId }: DocumentListPageProps) {
  const { data, state, errors, actions } = useDocumentsByService(serviceId);

  return (
    <DocumentTable
      documents={data.documents}
      error={errors.error}
      isFetching={state.documentState.isFetching || state.signedState.isFetching}
      isLoading={state.documentState.isLoading || state.signedState.isLoading}
      onDelete={doc => actions.delete(doc.id)}
      onDownload={() => {}}
      onRetry={() => actions.refetch()}
      onView={() => {}}
      onDeleting={state.deleteSubmitState.isLoading}
      onSuccess={state.deleteSubmitState.isSuccess}
    />
  );
}

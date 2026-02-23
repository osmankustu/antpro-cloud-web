import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { DocumentModel } from '@/modules/service-management/types/document.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { ActivitiyDetailHookResponse } from '../../../service-activity/hooks/types/activityHookReturn.types';
import { ServiceDetailHookResponse } from '../../../service/hooks/types/serviceHookReturn.types';
import { useDocumentsByActivity } from '../../hooks/useDocumentsByActivity';
import { useDocumentsByService } from '../../hooks/useDocumentsByService';
import { DocumentPreview } from '../ui/DocumentPreview';
import { DocumentTable } from '../ui/DocumentTable';

interface DocumentListPageProps {
  model?: ServiceDetailHookResponse;
  router: AppRouterInstance;
  isActivity?: boolean;
  activityModel?: ActivitiyDetailHookResponse;
}

export function DocumentListPage({
  model,
  activityModel,
  router,
  isActivity = false,
}: DocumentListPageProps) {
  const query = !isActivity
    ? useDocumentsByService(model?.data.service?.id)
    : useDocumentsByActivity(activityModel?.data.activity?.id);
  const [selectedDocument, setSelectedDocument] = useState<DocumentModel | null>(null);
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      <div className="flex w-full gap-3 overflow-hidden">
        {/* TABLE */}

        {show ? (
          <div
            className={`transition-all duration-300 ease-in-out ${selectedDocument ? 'w-2/6' : 'w-full'}`}
          >
            <DocumentTable
              model={query}
              isSelected={!!selectedDocument}
              onView={document => setSelectedDocument(document)}
              onHide={() => setShow(false)}
              isActivity={isActivity}
            />
          </div>
        ) : (
          <ToolbarButton
            children={<FaChevronRight size={15} className="dark:text-white" />}
            onClick={() => setShow(true)}
          />
        )}

        {/* PREVIEW */}
        {selectedDocument &&
          (show ? (
            <div className="w-5/6">
              <DocumentPreview
                documentModel={selectedDocument}
                onClose={() => setSelectedDocument(null)}
                onDelete={() => query.actions.delete(selectedDocument.id)}
              />
            </div>
          ) : (
            <div className="w-6/6">
              <DocumentPreview
                documentModel={selectedDocument}
                onClose={() => setSelectedDocument(null)}
                onDelete={() => query.actions.delete(selectedDocument.id)}
              />
            </div>
          ))}
      </div>

      {/* <DocumentTable
        documents={data.documents}
        error={errors.error}
        isFetching={state.documentState.isFetching || state.signedState.isFetching}
        isLoading={state.documentState.isLoading || state.signedState.isLoading}
        onDelete={doc => actions.delete(doc.id)}
        onDownload={() => {}}
        onRetry={() => actions.refetch()}
        onView={() => {}}
        onDeleting={state.deleteState.isLoading}
        onSuccess={state.deleteState.isSuccess}
      /> */}
    </>
  );
}

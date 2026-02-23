import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { DocumentModel } from '@/modules/service-management/types/document.types';
import clsx from 'clsx';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { ActivitiyDetailHookResponse } from '../../../service-activity/hooks/types/activityHookReturn.types';
import { ServiceDetailHookResponse } from '../../../service/hooks/types/serviceHookReturn.types';
import { useDocumentsByActivity } from '../../hooks/useDocumentsByActivity';
import { useDocumentsByService } from '../../hooks/useDocumentsByService';
import { DocumentCardList } from '../ui/DocumentCardList';
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

  const isPreviewOpen = !!selectedDocument;
  const isListCollapsed = isPreviewOpen && show;

  return (
    <>
      <div className="flex w-full gap-3 overflow-hidden">
        {/* DOCUMENT LIST */}
        {show ? (
          <div
            className={clsx(
              'transition-all duration-300',
              isPreviewOpen ? 'w-72 shrink-0' : 'w-full',
            )}
          >
            <DocumentTable
              model={query}
              isSelected={isPreviewOpen}
              onView={setSelectedDocument}
              onHide={() => setShow(false)}
              isActivity={isActivity}
            />
          </div>
        ) : (
          <ToolbarButton onClick={() => setShow(true)} children={<FaChevronRight size={15} />} />
        )}

        {/* PREVIEW */}
        {isPreviewOpen && (
          <div className="flex-1 transition-all duration-300">
            <DocumentPreview
              documentModel={selectedDocument}
              onClose={() => setSelectedDocument(null)}
              onDelete={() => query.actions.delete(selectedDocument.id)}
            />
          </div>
        )}
      </div>

      {/* MOBILE */}
      <div className="block md:hidden">
        {!selectedDocument && (
          <DocumentCardList
            model={query}
            onView={doc => setSelectedDocument(doc)}
            isSelected={isPreviewOpen}
            onHide={() => setShow(false)}
            isActivity={isActivity}
            router={router}
          />
        )}

        {selectedDocument && (
          <DocumentPreview
            documentModel={selectedDocument}
            onClose={() => setSelectedDocument(null)}
            onDelete={() => query.actions.delete(selectedDocument.id)}
          />
        )}
      </div>
    </>
  );
}

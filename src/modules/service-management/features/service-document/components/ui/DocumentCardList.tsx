import { getFileIcon } from '@/components/ui/icons/getFileIcons';
import { RowActions } from '@/components/ui/table/RowActions';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { DocumentModel } from '@/modules/service-management/types/document.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import {
  DocumentByActivityHookResponse,
  DocumentByServiceIdHookResponse,
} from '../../hooks/types/documentHookReturn.types';
import { DocumentToolbar } from './DocumentToolbar';

interface DocumentCardListProps {
  model: DocumentByServiceIdHookResponse | DocumentByActivityHookResponse;
  isSelected: boolean;
  onView: (document: DocumentModel) => void;
  onHide: () => void;
  isActivity?: boolean;
  router: AppRouterInstance;
}

export function DocumentCardList({ model, router, isActivity }: DocumentCardListProps) {
  const showSpinner = model.state.signedState.isLoading || model.state.signedState.isFetching;
  const showEmpty =
    !model.state.signedState.isLoading &&
    !model.state.signedState.isFetching &&
    !model.errors.error &&
    model.data.documents?.length === 0;
  const showError =
    !model.state.signedState.isLoading && !model.state.signedState.isFetching && model.errors.error;

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="grid gap-3 md:hidden">
          <DocumentToolbar title={isActivity ? 'Eklenen Dökümanlar' : 'Tüm Dökümanlar'} />
          {showSpinner && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/40">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-400 border-t-gray-800 dark:border-gray-500 dark:border-t-white" />
            </div>
          )}

          {showError ? (
            <div className="rounded-xl border border-gray-200 p-4 text-center dark:border-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {model.errors.error?.detail}
                </p>
              </div>
            </div>
          ) : showEmpty ? (
            <div className="rounded-xl border border-gray-200 p-4 text-center dark:border-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Hareket bulunamadı.
                </p>
              </div>
            </div>
          ) : (
            model.data.documents?.map((document, index) => (
              <div
                key={document.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {document.fileName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{'ssss'}</p>
                  </div>
                  {document.fileType === 'image/jpeg' ? (
                    <Image src={document.filePath} alt={document.fileName} width={50} height={50} />
                  ) : (
                    getFileIcon(document.fileType, { size: 25 })
                  )}
                </div>

                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{document.fileType}</p>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div>
                    <span className="block font-medium text-gray-700 dark:text-gray-300">
                      Tarih
                    </span>
                    {formatDate(document.createdDate)}
                  </div>

                  <div>
                    <span className="block font-medium text-gray-700 dark:text-gray-300">
                      Güncelleme
                    </span>
                    {formatDate(document.updatedDate)}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <RowActions
                    onDelete={() => model.actions.delete(document.id)}
                    onDownload={() => model.actions.download(document)}
                    onView={() => window.open(document?.filePath, '_blank', 'noopener,noreferrer')}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

import { getFileIcon } from '@/components/ui/icons/getFileIcons';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { RowActions } from '@/components/ui/table/RowActions';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { DocumentModel } from '@/modules/service-management/types/document.types';
import Image from 'next/image';
import {
  DocumentByActivityHookResponse,
  DocumentByServiceIdHookResponse,
} from '../../hooks/types/documentHookReturn.types';
import { DocumentToolbar } from './DocumentToolbar';

interface DocumentTableProps {
  model: DocumentByServiceIdHookResponse | DocumentByActivityHookResponse;
  isSelected: boolean;
  onView: (document: DocumentModel) => void;
  onHide: () => void;
  isActivity?: boolean;
}

export function DocumentTable({
  model,
  isSelected,
  onView,
  onHide,
  isActivity = false,
}: DocumentTableProps) {
  const showSpinner = model.state.signedState.isLoading || model.state.signedState.isFetching;
  const showEmpty =
    !model.state.signedState.isLoading &&
    !model.state.signedState.isFetching &&
    !model.errors.error &&
    model.data.documents?.length === 0;
  const showError =
    !model.state.signedState.isLoading && !model.state.signedState.isFetching && model.errors.error;

  return (
    <div className="relative hidden max-w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white p-5 md:block dark:border-gray-800 dark:bg-white/[0.03]">
      <DocumentToolbar
        title={isActivity ? 'Eklenen Dökümanlar' : 'Tüm Dökümanlar'}
        onHide={onHide}
        isSelected={isSelected}
      />
      {/* Spinner */}
      {showSpinner && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-400 border-t-gray-800 dark:border-gray-500 dark:border-t-white" />
        </div>
      )}

      <Table className="min-w-[900px]">
        <TableHeader className="border-y border-gray-100 dark:border-gray-800">
          <TableRow>
            {isSelected
              ? ['Dosya', 'Tip', 'İşlemler'].map(title => (
                  <TableCell
                    key={title}
                    isHeader
                    className="py-2 text-start text-xs font-medium text-gray-500 sm:py-3 dark:text-gray-400"
                  >
                    {title}
                  </TableCell>
                ))
              : ['Dosya', 'Tip', 'Boyut', 'Ön İzleme', 'Tarih', 'İşlemler'].map(title => (
                  <TableCell
                    key={title}
                    isHeader
                    className="py-2 text-start text-xs font-medium text-gray-500 sm:py-3 dark:text-gray-400"
                  >
                    {title}
                  </TableCell>
                ))}
          </TableRow>
        </TableHeader>

        {showError ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={10}>
                <div className="text-center text-sm text-red-500 dark:text-red-400">
                  {model.errors.error?.detail || 'Dökümanlar yüklenemedi.'}
                  <button className="ml-2 underline" onClick={model.actions.refetch}>
                    Tekrar Dene
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : showEmpty ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={10}>
                <div className="flex justify-center py-8 text-sm font-medium text-gray-800 dark:text-white/90">
                  Döküman bulunamadı.
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {model.data.documents?.map(document => (
              <TableRow key={document.id}>
                {/* Dosya adı */}
                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {document.fileName}
                </TableCell>

                {/* Tip */}
                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {getFileIcon(document.fileType, { size: 25 })}
                  {document.fileType.split('/')[1]?.toUpperCase()}
                </TableCell>

                {/* Boyut */}

                {/* Ön izleme */}
                {!isSelected && (
                  <>
                    <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                      {formatFileSize(document.fileSize)}
                    </TableCell>
                    <TableCell>
                      {document.filePath && isImage(document.fileType) ? (
                        <Image
                          src={document.filePath}
                          width={100}
                          height={100}
                          alt={document.fileName}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                          -
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                      {formatDate(document.createdDate)}
                    </TableCell>
                  </>
                )}

                {/* İşlemler */}
                <TableCell className="sm:text-theme-sm z-10 py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  <RowActions
                    onView={() => {
                      onView(document);
                    }}
                    onDelete={() => model.actions.delete(document.id)}
                    onDownload={() => model.actions.download(document)}
                    onDeleting={model.state.deleteState.isLoading}
                    onSuccess={model.state.deleteState.isSuccess}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(mime?: string) {
  return mime?.startsWith('image/');
}

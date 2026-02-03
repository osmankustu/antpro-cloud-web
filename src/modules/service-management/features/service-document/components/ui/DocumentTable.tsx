import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { DocumentModel } from '@/modules/service-management/types/document.types';
import Image from 'next/image';

interface DocumentTableProps {
  documents?: DocumentModel[];
  isLoading?: boolean;
  isFetching?: boolean;
  error?: ResponseError;
  onRetry: () => void;
  onView: (doc: DocumentModel) => void;
  onDownload: (doc: DocumentModel) => void;
  onDelete: (doc: DocumentModel) => void;
}

export function DocumentTable({
  documents,
  isLoading,
  isFetching,
  error,
  onRetry,
  onView,
  onDownload,
  onDelete,
}: DocumentTableProps) {
  const showSpinner = isLoading || isFetching;
  const showEmpty = !isLoading && !isFetching && !error && documents?.length === 0;
  const showError = !isLoading && !isFetching && error;

  return (
    <div className="relative hidden max-w-full overflow-x-auto md:block">
      {/* Spinner */}
      {showSpinner && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-400 border-t-gray-800 dark:border-gray-500 dark:border-t-white" />
        </div>
      )}

      <Table className="min-w-[900px]">
        <TableHeader className="border-y border-gray-100 dark:border-gray-800">
          <TableRow>
            {['Dosya', 'Tip', 'Boyut', 'Ön İzleme', 'Tarih', 'İşlemler'].map(title => (
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
                  {error.detail || 'Dökümanlar yüklenemedi.'}
                  <button className="ml-2 underline" onClick={onRetry}>
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
            {documents?.map(doc => (
              <TableRow key={doc.id}>
                {/* Dosya adı */}
                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {doc.fileName}
                </TableCell>

                {/* Tip */}
                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {doc.fileType}
                </TableCell>

                {/* Boyut */}
                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {formatFileSize(doc.fileSize)}
                </TableCell>

                {/* Ön izleme */}
                <TableCell>
                  {isImage(doc.fileType) ? (
                    <Image
                      src={doc.filePath}
                      width={100}
                      height={100}
                      alt={doc.fileName}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                      {doc.fileType.split('/')[1]?.toUpperCase() || 'FILE'}
                    </div>
                  )}
                </TableCell>

                {/* Tarih */}
                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  {formatDate(doc.createdDate)}
                </TableCell>

                {/* İşlemler */}
                <TableCell className="sm:text-theme-sm py-2 text-xs text-gray-500 sm:py-3 dark:text-gray-400">
                  <Button size="sm" variant="outline" onClick={() => onView(doc)}>
                    Görüntüle
                  </Button>
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

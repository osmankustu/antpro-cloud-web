import { DeleteModal } from '@/components/ui/button/DeleteModalButton';
import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { DocumentModel } from '@/modules/service-management/types/document.types';

interface DocumentPreviewToolbarPorps {
  document?: DocumentModel;
  onDownload?: () => Promise<void>;
  onDelete: () => Promise<void>;
  onClose: () => void;
}

export function DocumentPreviewToolbar({
  document,
  onDelete,
  onDownload,
  onClose,
}: DocumentPreviewToolbarPorps) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-white/[0.03]">
      <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {document?.fileName}
      </h5>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <ToolbarButton children={'Kapat'} onClick={() => onClose()} />
        <ToolbarButton
          children={'Farklı Sayfada Aç'}
          onClick={() => window.open(document?.filePath, '_blank', 'noopener,noreferrer')}
        />
        <ToolbarButton children={'İndir'} onClick={() => onDownload} />
        <DeleteModal onConfirm={() => onDelete()} />
      </div>
    </div>
  );
}

import { DocumentModel } from '@/modules/service-management/types/document.types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DocumentPreviewToolbar } from './DocumentPreviewToolbar';

interface DocumentViewModalProps {
  documentModel?: DocumentModel;
  onDownload?: () => Promise<void>;
  onDelete: () => Promise<void>;
  onClose: () => void;
}

const supportedImageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const supportedPdfTypes = ['pdf'];

export function DocumentPreview({
  documentModel,
  onClose,
  onDelete,
  onDownload,
}: DocumentViewModalProps) {
  const [fileType, setFileType] = useState<'image' | 'pdf' | 'unsupported'>('unsupported');

  useEffect(() => {
    const ext = documentModel?.fileName?.split('.').pop()?.toLowerCase();
    if (!ext) return setFileType('unsupported');

    if (supportedImageTypes.includes(ext)) setFileType('image');
    else if (supportedPdfTypes.includes(ext)) setFileType('pdf');
    else setFileType('unsupported');
  }, [documentModel?.filePath]);

  const handleDownload = async () => {
    const link = document.createElement('a');
    link.href = documentModel?.filePath!;
    link.download =
      documentModel?.fileName || documentModel?.filePath.split('/').pop() || 'download';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <DocumentPreviewToolbar
        document={documentModel}
        onDownload={handleDownload}
        onDelete={onDelete}
        onClose={onClose}
      />
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto">
          {fileType === 'image' && (
            <Image
              src={documentModel?.filePath!}
              alt={documentModel?.fileName!}
              width={1920}
              height={1080}
              className="max-h-[150vh] max-w-full rounded-lg object-contain shadow"
            />
          )}
        </div>

        <div className="flex-1 overflow-auto">
          {fileType === 'pdf' && (
            <iframe
              src={documentModel?.filePath}
              title={documentModel?.fileName}
              className="h-[100vh] w-full rounded-lg border"
            />
          )}
        </div>

        {fileType === 'unsupported' && (
          <div className="rounded-lg border border-gray-300 p-8 text-center text-gray-600">
            Bu dosya tarayıcıda görüntülenemiyor.
          </div>
        )}
      </div>
    </div>
  );
}

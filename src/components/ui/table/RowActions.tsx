'use client';

import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { DeleteModal } from '../button/DeleteModalButton';

interface RowActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => Promise<void>;
  onDetail?: () => void;
  onDownload?: () => void;
  onDeleting?: boolean;
  onSuccess?: boolean;
}

export function RowActions({
  onDetail,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onDeleting,
  onSuccess,
}: RowActionsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // dışarı tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* 3 Nokta Butonu */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <BsThreeDotsVertical size={20} className="dark:text-gray-400" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="fixed right-5 z-50 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {onDetail && (
            <button
              onClick={() => {
                onDetail();
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Detay
            </button>
          )}

          {onView && (
            <button
              onClick={() => {
                onView();
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Görüntüle
            </button>
          )}

          {onDownload && (
            <button
              onClick={() => {
                onDownload();
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              İndir
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Düzenle
            </button>
          )}

          {onDelete && (
            <DeleteModal
              onDropdownItem={true}
              onDeleting={onDeleting}
              onSuccess={onSuccess}
              onConfirm={onDelete}
            />
          )}
        </div>
      )}
    </div>
  );
}

import { Message } from '@/core/utils/messages/types';
import { useModal } from '@/hooks/useModal';
import { useEffect } from 'react';
import ToolbarButton from '../button/ToolbarButton';
import { Modal } from '../modal';

interface DeleteModalProps {
  message: Message;
  onConfirm: () => void;
  onDeleting?: boolean;
  onSuccess?: boolean;
}

export function DeleteModal({ message, onConfirm, onDeleting, onSuccess }: DeleteModalProps) {
  const { openModal, isOpen, closeModal } = useModal();

  useEffect(() => {
    closeModal();
  }, [onSuccess]);

  return (
    <>
      <ToolbarButton active={false} onClick={openModal} children={'Sil'} />

      <Modal isOpen={isOpen} onClose={closeModal} showCloseButton className="m-4 max-w-[520px]">
        <div className="relative w-full rounded-3xl bg-white p-6 sm:p-8 dark:bg-gray-900">
          {/* ICON */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4a1 1 0 011 1v1H9V5a1 1 0 011-1z"
              />
            </svg>
          </div>

          {/* TITLE */}
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {message.title ?? 'Silmek istediğinize emin misiniz?'}
          </h3>

          {/* DESCRIPTION */}
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
            {message.description ??
              'Bu işlem geri alınamaz. Silinen veri kalıcı olarak kaldırılacaktır.'}
          </p>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={closeModal}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Vazgeç
            </button>

            <button
              onClick={onConfirm}
              disabled={onDeleting}
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              {onDeleting ? 'Siliniyor...' : 'Evet, Sil'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

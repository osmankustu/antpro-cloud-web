import { Message } from '@/core/utils/messages/types';
import { useModal } from '@/hooks/useModal';
import { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { Modal } from '../modal';
import ToolbarButton from './ToolbarButton';

interface DeleteModalProps {
  message?: Message;
  onConfirm?: () => Promise<void> | undefined;
  onDeleting?: boolean;
  onSuccess?: boolean;
  onDropdownItem?: boolean;
}

export function DeleteModal({
  message,
  onConfirm,
  onDeleting,
  onSuccess,
  onDropdownItem,
}: DeleteModalProps) {
  const { openModal, isOpen, closeModal } = useModal();

  useEffect(() => {
    closeModal();
  }, [onSuccess]);

  return (
    <>
      {onDropdownItem ? (
        <button
          onClick={() => {
            openModal();
          }}
          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
        >
          Sil
        </button>
      ) : (
        <ToolbarButton active={false} onClick={openModal} children={'Sil'} />
      )}

      <Modal isOpen={isOpen} onClose={closeModal} showCloseButton className="m-4 max-w-[520px]">
        <div className="relative w-full rounded-3xl bg-white p-6 sm:p-8 dark:bg-gray-900">
          {/* ICON */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AiOutlineDelete size={30} />
          </div>

          {/* TITLE */}
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {message?.title ?? 'Silmek istediğinize emin misiniz?'}
          </h3>

          {/* DESCRIPTION */}
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
            {message?.description ??
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

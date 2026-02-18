import { Message } from '@/core/utils/messages/types';
import { useModal } from '@/hooks/useModal';
import { useEffect } from 'react';
import { AiFillSave } from 'react-icons/ai';
import { Modal } from '../modal';
import Button from './Button';

interface DeleteModalProps {
  message: Message;
  onConfirm: () => void;
  onSuccess?: boolean;
  onSubmitting?: boolean;
  onError?: boolean;
}

export function UpdateModalButton({
  message,
  onConfirm,
  onSubmitting,
  onSuccess,
  onError,
}: DeleteModalProps) {
  const { openModal, isOpen, closeModal } = useModal();

  console.log('onSubmit', onSubmitting);
  console.log('onError', onError);
  console.log('onSuccess', onSuccess);
  useEffect(() => {
    if (onSuccess) closeModal();
  }, [onSuccess]);

  return (
    <>
      <Button disabled={onSubmitting} size="sm" onClick={openModal} children={'Kaydet'} />

      <Modal isOpen={isOpen} onClose={closeModal} showCloseButton className="m-4 max-w-[520px]">
        <div className="relative w-full rounded-3xl bg-white p-6 sm:p-8 dark:bg-gray-900">
          {/* ICON */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-red-900/30">
            <AiFillSave size={30} />
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

          {/* Error */}
          {onError ? (
            <p className="mb-6 text-sm text-red-600 dark:text-red-300">
              Veri kaydedilirken bir hata oluştu. lütfen formu kontrol edip tekrar deneyiniz...
            </p>
          ) : null}

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={closeModal}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Vazgeç
            </button>
            {!onError ? (
              <button
                onClick={onConfirm}
                disabled={onSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
              >
                {onSubmitting ? 'Kaydediliyor...' : 'Evet, Kaydet'}
              </button>
            ) : (
              <button
                onClick={onConfirm}
                disabled={onSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                {onSubmitting ? 'Kaydediliyor' : 'Evet, Tekrar Dene'}
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

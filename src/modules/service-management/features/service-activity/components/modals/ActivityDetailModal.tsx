import Button from '@/components/ui/button/Button';
import ServiceStatus from '@/components/ui/indicators/ServiceStatus';
import { Modal } from '@/components/ui/modal';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { useModal } from '@/hooks/useModal';
import {
  Field,
  FullRow,
  Row,
  Section,
  Skeleton,
} from '@/modules/service-management/components/ui/detail';
import { useActivityDetail } from '../../hooks/useActivitiyDetail';
import { ActivityDetailToolbar } from '../ui/detail/ActivityDetailToolbar';

interface ActivityDetailModalProps {
  activityId: string;
}

export function ActivityDetailModal({ activityId }: ActivityDetailModalProps) {
  const { isOpen, closeModal, openModal } = useModal();

  const {
    activity,
    employeeFullName,
    isLoading,
    isFetching,
    deleteLoading,
    error,
    handleDelete,
    refetchActivity,
  } = useActivityDetail(activityId);

  return (
    <>
      <Button size="sm" className="w-full sm:w-auto" onClick={openModal}>
        Detay
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        {isLoading || isFetching ? (
          <Skeleton />
        ) : error ? (
          <div className="mt-25 text-center text-sm text-red-500 dark:text-red-400">
            {error.detail || 'Servis bilgileri yüklenemedi.'}
            <button className="ml-2 underline" onClick={refetchActivity}>
              Tekrar Dene
            </button>
          </div>
        ) : (
          <div className="no-scrollbar relative mt-7 w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
            <ActivityDetailToolbar
              title="Hareket Detayı"
              actions={
                <>
                  <Button variant="outline" size="sm">
                    Düzenle
                  </Button>

                  <Button size="sm" disabled={deleteLoading} onClick={handleDelete}>
                    Sil
                  </Button>
                </>
              }
            />

            {/* CONTENT */}
            <Section title="Genel Bilgiler">
              <FullRow>
                <Field label="Hareket Tanımı" value={activity?.description} />
              </FullRow>

              <Row>
                <Field label="Personel" value={employeeFullName} />
                <Field
                  label="Hareket Durumu"
                  value={<ServiceStatus size="sm" serviceStatus={activity?.status!} />}
                />
              </Row>

              <Row>
                <Field label="Oluşturma Tarihi" value={formatDate(activity?.createdDate)} />
                <Field label="Güncelleme Tarihi" value={formatDate(activity?.updatedDate)} />
              </Row>
            </Section>

            <div className="mt-5">
              <Section title="Eklenen Dökümanlar">
                <Row>
                  <Field label="Hareket Tanımı" />
                </Row>
              </Section>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

import Badge from '@/components/ui/badge/Badge';

interface ServiceStatusProps {
  serviceStatus?: string;
  size: 'sm' | 'md';
  variant?: 'solid' | 'light';
}

const STATUS_MAP: Record<
  string,
  {
    label: string;
    color: 'warning' | 'success' | 'info' | 'error';
  }
> = {
  isCreated: { label: 'Kayıt Alındı', color: 'warning' },
  isPending: { label: 'Beklemede', color: 'error' },
  isStarted: { label: 'Başladı', color: 'success' },
  isContinue: { label: 'Devam Ediyor', color: 'success' },
  isComplated: { label: 'Tamamlandı', color: 'success' },
  isClosed: { label: 'Kapatıldı', color: 'info' },
};

const ServiceStatus = ({ serviceStatus, size, variant }: ServiceStatusProps) => {
  const status = STATUS_MAP[serviceStatus ?? ''];

  if (!status) {
    return (
      <Badge size={size} color="error">
        Bilinmeyen Durum
      </Badge>
    );
  }

  return (
    <Badge size={size} variant={variant} color={status.color}>
      {status.label}
    </Badge>
  );
};

export default ServiceStatus;

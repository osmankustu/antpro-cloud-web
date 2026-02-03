import Badge from '@/components/ui/badge/Badge';

interface PriorityStatusProps {
  priority: string;
  size: 'sm' | 'md';
  variant?: 'solid' | 'light';
}

const PRIORITY_MAP: Record<
  string,
  {
    label: string;
    color: 'error' | 'warning' | 'success' | 'info';
  }
> = {
  Yüksek: { label: 'Yüksek', color: 'error' },
  Orta: { label: 'Orta', color: 'warning' },
  Düşük: { label: 'Düşük', color: 'success' },
};

const PriorityStatus = ({ priority, size, variant }: PriorityStatusProps) => {
  const status = PRIORITY_MAP[priority];

  if (!status) {
    return <Badge color="info">{priority || 'Bilinmeyen Öncelik'}</Badge>;
  }

  return (
    <Badge color={status.color} size={size} variant={variant}>
      {status.label}
    </Badge>
  );
};

export default PriorityStatus;

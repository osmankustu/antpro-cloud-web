import { ServiceMobileList } from '@/modules/service-management/features/service/components/ui/ServiceMobileList';
import { ServiceTable } from '@/modules/service-management/features/service/components/ui/ServiceTable';
import { ServiceToolbar } from '@/modules/service-management/features/service/components/ui/ServiceToolbar';
import { useRouter } from 'next/navigation';

export default function ServiceListPage() {
  const router = useRouter();

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-3 pt-3 pb-3 sm:px-6 sm:pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <ServiceToolbar router={router} />
        <ServiceMobileList router={router} />
      </div>
      <div>
        <ServiceTable router={router} />
      </div>
    </>
  );
}

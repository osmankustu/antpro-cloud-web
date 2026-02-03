'use client';
import { DashboardStatCard } from '@/components/dashboard/cards/DashboardCard';
import { useAppSelector } from '@/core/store/base/hook';
import { ServiceMap } from '@/modules/service-management/features/dashboard/components/ui/maps/ServiceMaps';
import { useServiceDashboard } from '@/modules/service-management/hooks/useServiceDashboard';
import { useRouter } from 'next/navigation';
import { FcAlarmClock, FcApproval, FcSettings } from 'react-icons/fc';
import { DashboardToolbar } from '../components/DashboardToolbar';

export function DashboardPage() {
  const userName = useAppSelector(s => s.auth.user?.fullName);
  const router = useRouter();
  const { data } = useServiceDashboard();
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <DashboardToolbar router={router} />
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
              <DashboardStatCard
                title="Aktif Servisler"
                value={data?.items.length}
                icon={<FcSettings size={40} />}
              />
              <DashboardStatCard
                title="Tamamlanan Servisler"
                value={23}
                icon={<FcApproval size={40} />}
              />
              <DashboardStatCard
                title="Zamanlanmış Servisler"
                value={14}
                icon={<FcAlarmClock size={40} />}
              />
            </div>
          </div>
        </div>
        <ServiceMap cities={data?.items} />
      </div>
    </div>
  );
}

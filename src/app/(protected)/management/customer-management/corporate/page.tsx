'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import CorporateListPage from '@/modules/customer-management/features/corporate/components/pages/CorporateListPage';

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Kurumsal Müşteriler" />
      <div>
        <CorporateListPage />
      </div>
    </div>
  );
}

'use client';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import IndividualListPage from '@/modules/customer-management/features/individual/components/pages/IndividualListPage';

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bireysel Müşteriler" />
      <div>
        <IndividualListPage />
      </div>
    </div>
  );
}

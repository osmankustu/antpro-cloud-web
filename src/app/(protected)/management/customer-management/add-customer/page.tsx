'use client';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import CustomerAddPage from '@/modules/customer-management/components/pages/CustomerAddPage';

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Müşteri Oluştur" />
      <div>
        <CustomerAddPage />
      </div>
    </div>
  );
}

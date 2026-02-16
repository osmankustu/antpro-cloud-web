'use client';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ServiceAddPage from '@/modules/service-management/features/service/components/form/ServiceAddPage';

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Servis Kaydı Oluştur" />
      <div>
        <ServiceAddPage />
      </div>
    </div>
  );
};

export default page;

"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ServiceListPage from "@/modules/service-management/features/service/components/pages/ServiceListPage";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Servisler" />
      <div>
        <ServiceListPage/>
      </div>
    </div>
  );
};

export default page;
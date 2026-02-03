'use client';

import CorporateEditPage from '@/modules/customer-management/features/corporate/components/pages/CorporateEditPage';
import { useCorporateDetailCtx } from '@/modules/customer-management/features/corporate/context/CorporateDetailContext';

export default function Page() {
  const query = useCorporateDetailCtx();
  return <CorporateEditPage customer={query.customer} />;
}

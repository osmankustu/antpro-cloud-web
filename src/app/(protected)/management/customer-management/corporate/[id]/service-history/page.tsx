'use client';

import CustomerServiceHistoryPage from '@/modules/customer-management/components/pages/CustomerServiceHistoryPage';
import { useCorporateDetailCtx } from '@/modules/customer-management/features/corporate/context/CorporateDetailContext';

export default function Page() {
  const query = useCorporateDetailCtx();
  return <CustomerServiceHistoryPage customer={query.customer!} />;
}

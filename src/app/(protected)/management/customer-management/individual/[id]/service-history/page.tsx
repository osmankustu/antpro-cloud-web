'use client';

import IndividualServiceHistoryPage from '@/modules/customer-management/components/pages/CustomerServiceHistoryPage';
import { useIndividualDetailCtx } from '@/modules/customer-management/features/individual/context/IndividualDetailContext';

export default function Page() {
  const query = useIndividualDetailCtx();
  return <IndividualServiceHistoryPage customer={query.customer!} />;
}

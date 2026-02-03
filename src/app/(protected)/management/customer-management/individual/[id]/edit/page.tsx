'use client';

import IndividualEditPage from '@/modules/customer-management/features/individual/components/pages/IndividualEditPage';
import { useIndividualDetailCtx } from '@/modules/customer-management/features/individual/context/IndividualDetailContext';

export default function Page() {
  const query = useIndividualDetailCtx();
  return <IndividualEditPage customer={query.customer} />;
}

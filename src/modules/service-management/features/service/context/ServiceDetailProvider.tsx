'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { useServiceDetail } from '../hooks/useServiceDetail';
import { ServiceDetailContext } from './ServiceDetailContext';

type Props = {
  serviceId: string;
  children: ReactNode;
};

export function ServiceDetailProvider({ serviceId, children }: Props) {
  const router = useRouter();
  const query = useServiceDetail(serviceId);
  const value = useMemo(() => ({}), []);

  return (
    <ServiceDetailContext.Provider value={{ serviceDetailResponse: query, router: router }}>
      {children}
    </ServiceDetailContext.Provider>
  );
}

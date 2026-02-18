'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { useActivityDetail } from '../hooks/useActivitiyDetail';
import { ActivityDetailContext } from './ActivityDetailContext';

type ActivityDetailProviderProps = {
  activityId: string;
  children: ReactNode;
};

export function ActivityDetailProvider({ activityId, children }: ActivityDetailProviderProps) {
  const router = useRouter();
  const query = useActivityDetail(activityId);
  const value = useMemo(() => ({}), []);

  return (
    <ActivityDetailContext.Provider value={{ activityDetailResponse: query, router: router }}>
      {children}
    </ActivityDetailContext.Provider>
  );
}

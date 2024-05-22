// src/hooks/analytics/usePetAnalytics.ts
import { useQuery } from 'react-query';

import { getPetAnalytics } from '../../api/petsAnalytics';

export const usePetAnalytics = (userId?: string) => {
  return useQuery(
    ['analytics',  userId],
    () => userId && getPetAnalytics(userId),
    {
      enabled: !!userId,
    },
  )
};

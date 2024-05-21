import { useQuery } from 'react-query'

import { checkUserMembership } from '../../api/teams'

export const useCheckUserMembership = (petId?: string, userId?: string) => {
  return useQuery(
    ['checkUserMembership', petId, userId],
    () => petId && userId && checkUserMembership(petId, userId),
    {
      enabled: !!petId && !!userId,
    },
  )
}

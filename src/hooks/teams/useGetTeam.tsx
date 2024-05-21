import { useQuery } from 'react-query'

import { getTeamById } from '../../api/teams'

export const useGetTeam = (id: string | undefined) => {
  const { data, error, isLoading } = useQuery(
    ['team', id],
    () => id && getTeamById(id),
  )

  return { data, error, isLoading }
}

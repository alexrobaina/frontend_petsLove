import { useQuery } from 'react-query'

import { listTeamsByUser } from '../../api/teams'

export const useTeamsListByUser = () => {
  const { data, isLoading, error } = useQuery(
    'teamsListByUser',
    listTeamsByUser,
  )

  return { data, isLoading, error }
}

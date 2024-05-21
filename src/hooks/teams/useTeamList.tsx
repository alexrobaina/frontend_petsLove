import { useQuery } from 'react-query'

import { listTeams } from '../../api/teams'

export const useTeamList = () => {
  const { data, error, isLoading } = useQuery(['teams'], () => listTeams())

  return { data, error, isLoading }
}

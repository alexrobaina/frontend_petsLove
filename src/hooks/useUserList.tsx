import { useQuery } from 'react-query'

import { getUsers } from '../api/user'

const useUserList = (filters: { role?: string , country?: string, city?: string, skip?: number, take?: number  }) => {
  const { data, error, isLoading } = useQuery(['users', filters], () =>
    getUsers(filters),
  )

  return { data, error, isLoading }
}

export default useUserList

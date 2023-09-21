import { useQuery } from 'react-query'

import { getUsers } from '../api/user'

const useUserList = (filterParams: { role?: string }) => {
  const { data, error, isLoading } = useQuery(['users', filterParams], () =>
    getUsers(filterParams),
  )

  return { data, error, isLoading }
}

export default useUserList

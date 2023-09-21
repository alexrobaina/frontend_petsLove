import { useQuery } from 'react-query'

import { getUser } from '../api/user'

export const useUser = (id: string | undefined) => {
  const { data, error, isLoading } = useQuery(
    ['users', id],
    () => id && getUser(id),
  )

  return { data, error, isLoading }
}

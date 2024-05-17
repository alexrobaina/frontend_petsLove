import { useQuery } from 'react-query'

import { getUser } from '../../api/user'

export const useUser = (id: string | undefined) => {
  const { data, error, isLoading } = useQuery(
    ['user', id],
    () => id && getUser(id),
  )

  return { user: data?.user[0], error, isLoading }
}

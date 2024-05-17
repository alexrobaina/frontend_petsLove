import { useQuery } from 'react-query'

import { getUsers } from '../../api/user'

const useUserList = ({
  role = '',
  country = '',
  city = '',
  page = 1,
}: {
  role?: string
  country?: string
  city?: string
  page?: number
}) => {
  const { data, error, isLoading, refetch } = useQuery(
    ['users', { role, country, city, page }],
    () =>
      getUsers({
        role,
        country,
        city,
        page,
      }),
  )

  return { data, error, isLoading, refetch }
}

export default useUserList

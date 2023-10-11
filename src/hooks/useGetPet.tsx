import { useQuery } from 'react-query'

import { getPet } from '../api/pet'

export const useGetPet = (id: string | undefined) => {
  const { data, error, isLoading } = useQuery(
    ['pet', id],
    () => id && getPet(id),
  )

  return { data, error, isLoading }
}

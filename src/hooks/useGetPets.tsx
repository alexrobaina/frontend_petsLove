import { useQuery } from 'react-query'

import { getPets } from '../api/pet'

export const useGetPets = () => {
  const { data, error, isLoading } = useQuery('/api/v1/pets/', getPets)

  return { data, error, isLoading }
}

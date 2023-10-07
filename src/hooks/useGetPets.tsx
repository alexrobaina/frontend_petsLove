import { useQuery } from 'react-query'

import { getPets } from '../api/pet'

export const useGetPets = ({
  page,
  gender,
  adopted,
  category,
  searchByName,
}: {
  page?: number
  gender?: string
  adopted?: boolean
  category?: string
  searchByName?: string
}) => {
  const { data, error, isLoading } = useQuery(
    ['pets', category, gender, adopted, searchByName, page],
    () => getPets({ category, gender, adopted, searchByName, page }),
  )

  return { data, error, isLoading }
}

import { useQuery } from 'react-query'

import { getUserPets } from '../api/pet'

export const useUserPets = ({
  id,
  page,
  gender,
  adopted,
  category,
  searchByName,
}: {
  id: string
  page?: number
  gender?: string
  category?: string
  searchByName?: string
  adopted?: boolean | string
}) => {
  const { data, error, isLoading } = useQuery(
    ['pets', category, gender, adopted, searchByName, page, id],
    () => getUserPets({ category, gender, adopted, searchByName, page, id }),
  )

  return { data, error, isLoading }
}

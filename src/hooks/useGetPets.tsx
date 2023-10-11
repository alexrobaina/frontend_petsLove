import { useQuery } from 'react-query'

import { getPets } from '../api/pet'

export const useGetPets = ({
  page,
  gender,
  adopted,
  category,
}: {
  page?: number
  gender?: string
  adopted?: boolean
  category?: string
}) => {
  const { data, error, isLoading } = useQuery(
    ['pets', category, gender, adopted, page],
    () => getPets({ category, gender, adopted, page }),
  )

  return { data, error, isLoading }
}

import { useQuery } from 'react-query'

import { getPets } from '../api/pet'

export const useGetPets = ({
  page,
  city,
  gender,
  country,
  adopted,
  category,
}: {
  page?: number
  city?: string
  gender?: string
  country?: string
  adopted?: boolean
  category?: string
}) => {
  const { data, error, isLoading, refetch } = useQuery(
    ['pets', category, gender, adopted, page, country, city],
    () => getPets({ category, gender, adopted, page, country, city }),
  )

  return { data, error, isLoading, refetch }
}

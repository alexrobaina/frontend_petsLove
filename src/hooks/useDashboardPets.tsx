import { useQuery } from 'react-query'

import { getDashboardPets } from '../api/pet'

export const useDashboardPets = ({
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
    () => getDashboardPets({ category, gender, adopted, searchByName, page }),
  )

  return { data, error, isLoading }
}

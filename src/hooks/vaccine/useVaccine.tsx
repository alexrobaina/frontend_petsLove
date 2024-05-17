import { useQuery } from 'react-query'

import { getVaccine } from '../../api/vaccine'

export const useGetVaccine = ({ category }: { category?: string }) => {
  const { data, error, isLoading } = useQuery(
    ['vaccine', [category]],
    () => category && getVaccine({ category }),
  )

  return { data, error, isLoading }
}

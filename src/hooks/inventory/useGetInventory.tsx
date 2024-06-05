import { useQuery } from 'react-query'

import { getInventoryById } from '../../api/inventory'

export const useGetInventory = (id: string) => {
  const { data, error, isLoading } = useQuery(
    ['inventory', id],
    () => getInventoryById(id),
    {
      enabled: !!id,
    },
  )

  return { data: data, error, isLoading }
}

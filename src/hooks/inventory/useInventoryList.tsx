import { useState } from 'react'
import { useQuery } from 'react-query'

import { listInventories } from '../../api/inventory'

export const useGetInventoryList = () => {
  const [page, setPage] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [inventoryType, setInventoryType] = useState<string>('')

  const { data, error, isLoading } = useQuery(
    ['inventory', name, quantity, inventoryType, page],
    () =>
      listInventories({
        quantity,
        inventoryType,
        name,
        page,
      }),
  )

  return {
    data,
    error,
    isLoading,
    quantity,
    inventoryType,
    name,
    setName,
    setQuantity,
    setPage,
    setInventoryType,
  }
}

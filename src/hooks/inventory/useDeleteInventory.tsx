import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deleteInventory } from '../../api/inventory'

export const useDeleteInventory = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(deleteInventory, {
    onSuccess: async () => {
      toast.success('Inventory item deleted successfully')
      await queryClient.invalidateQueries(['inventory'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something went wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

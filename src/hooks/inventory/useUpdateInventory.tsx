import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updateInventory } from '../../api/inventory'

export const useUpdateInventory = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updateInventory, {
    onSuccess: async () => {
      toast.success('Inventory item updated successfully')
      await queryClient.invalidateQueries(['inventory'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something went wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

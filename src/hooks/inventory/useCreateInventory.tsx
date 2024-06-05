import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { createInventory } from '../../api/inventory'

export const useCreateInventory = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(createInventory, {
    onSuccess: async () => {
      toast.success('Inventory item created successfully')
      await queryClient.invalidateQueries(['inventory'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something went wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updateExpense } from '../../api/expense'

export const useUpdateExpense = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updateExpense, {
    onSuccess: async () => {
      toast.success('Inventory item updated successfully')
      await queryClient.invalidateQueries(['expenses'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something went wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

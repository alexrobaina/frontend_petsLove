import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deleteExpense } from '../../api/expense'

export const useDeleteExpense = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(deleteExpense, {
    onSuccess: async () => {
      toast.success('Expense deleted successfully')
      await queryClient.invalidateQueries(['expenses'])
    },
    onError: (error) => {
      toast.error(`Failed to delete expense`)
      console.error(error)
    },
  })

  return { mutate, isLoading }
}

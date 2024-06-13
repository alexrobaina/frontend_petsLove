import { useMutation, useQueryClient } from 'react-query'

import { createExpense } from '../../api/expense'

export const useCreateExpense = () => {
  const queryClient = useQueryClient()

  return useMutation(createExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries('expenses')
    },
  })
}

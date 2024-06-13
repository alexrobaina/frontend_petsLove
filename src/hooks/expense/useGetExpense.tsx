import { useQuery } from 'react-query'

import { getExpense } from '../../api/expense'

export const useGetExpense = (expenseId: string) => {
  return useQuery(['expenses', expenseId], () => getExpense(expenseId), {
    enabled: !!expenseId,
  })
}

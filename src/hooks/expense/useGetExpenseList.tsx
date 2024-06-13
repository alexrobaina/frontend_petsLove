import { useState } from 'react'
import { useQuery } from 'react-query'

import { listExpenses } from '../../api/expense'

export const useGetExpenseList = () => {
  const [page, setPage] = useState<number>(1)
  const [amount, setAmount] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const { data, error, isLoading } = useQuery(
    ['expenses', amount, type, page, title, category, startDate, endDate],
    () =>
      listExpenses({
        type,
        page,
        title,
        amount,
        endDate,
        category,
        startDate,
      }),
  )

  return {
    data,
    type,
    page,
    error,
    title,
    amount,
    setType,
    setPage,
    endDate,
    category,
    setTitle,
    isLoading,
    startDate,
    setAmount,
    setEndDate,
    setCategory,
    setStartDate,
  }
}

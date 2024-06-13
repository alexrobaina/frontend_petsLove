import { useQuery } from 'react-query'

import { getAnalytics } from '../../api/expense'

export interface AnalyticsData {
  totalIncome: number
  totalExpense: number
  monthlyIncome: { month: string; totalAmount: number }[]
  monthlyExpense: { month: string; totalAmount: number }[]
  categoryExpenses: { category: string; totalAmount: number }[]
  recentTransactions: {
    id: string
    totalAmount: number
    date: string
    type: string
    category: string
    title: string
    description?: string
  }[]
}

const useExpenseAnalytics = () => {
  return useQuery<AnalyticsData, Error>('expenses', getAnalytics)
}

export default useExpenseAnalytics

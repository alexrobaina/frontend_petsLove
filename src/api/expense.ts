import axios from 'axios'

const API_URL = '/api/v1'

export const createExpense = async (data: {
  id: string
  totalAmount: number
  type: string
  category: string
  title: string
  description: string
  items: {
    title: string
    quantity: number
    price: number
    inventoryId: string
  }[]
}) => {
  try {
    const response = await axios.post(`${API_URL}/expense`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create expense')
  }
}

export const updateExpense = async (data: {
  id: string
  totalAmount: number
  type: string
  category: string
  title: string
  description: string
  items: {
    title: string
    quantity: number
    price: number
    inventoryId: string
  }[]
}) => {
  try {
    console.log(data)

    const response = await axios.put(`${API_URL}/expense/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update expense')
  }
}

export const deleteExpense = async (expenseId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/expense/${expenseId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete expense')
  }
}

export const getExpense = async (expenseId: string) => {
  try {
    const response = await axios.get(`${API_URL}/expense/${expenseId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch expense')
  }
}

export const listExpenses = async (filters: {
  title?: string
  type?: string
  category?: string
  page?: number
  startDate?: string
  endDate?: string
  amount?: string
  date?: string
}) => {
  try {
    const response = await axios.get(`${API_URL}/expenses`, { params: filters })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch expenses')
  }
}

export const getAnalytics = async () => {
  try {
    const response = await axios.get(`${API_URL}/expenses/analytics`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch analytics')
  }
}

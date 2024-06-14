export interface IExpenseItem {
  title?: string
  quantity: number
  price: number | null
  inventoryId?: string
}

export interface ICreateExpenseForm {
  totalAmount: number
  type: string
  title: string
  category: string
  description?: string
  items: IExpenseItem[]
  id?: string
}

export const initialExpenseValues: ICreateExpenseForm = {
  totalAmount: 0,
  type: '',
  category: '',
  title: '',
  description: '',
  items: [],
}

export const EXPENSE_TYPES = [
  {
    label: 'expense',
    value: 'EXPENSE',
  },
  {
    label: 'income',
    value: 'INCOME',
  },
]

export const EXPENSE_CATEGORIES = [
  {
    label: 'expenseCategory.SUPPLIES',
    value: 'SUPPLIES',
  },
  {
    label: 'expenseCategory.EQUIPMENT',
    value: 'EQUIPMENT',
  },
  {
    label: 'expenseCategory.INVENTORY',
    value: 'INVENTORY',
  },
  {
    label: 'expenseCategory.SERVICES',
    value: 'SERVICES',
  },
  {
    label: 'expenseCategory.OTHERS',
    value: 'OTHERS',
  },
]

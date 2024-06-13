import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MultiValue } from 'react-select'

import { SliderModal } from '../../components'
import { DeleteModal } from '../../components/common/DeleteModal'
import { useDeleteExpense } from '../../hooks/expense/useDeleteExpense'
import useExpenseAnalytics from '../../hooks/expense/useExpenseAnalytics'
import { useGetExpense } from '../../hooks/expense/useGetExpense'
import { useGetExpenseList } from '../../hooks/expense/useGetExpenseList'

import { AnalyticsCard } from './components/AnalyticsCard'
import { CreateExpenseForm } from './components/CreateExpenseForm'
import { ExpenseHeader } from './components/ExpenseHeader'
import { ExpenseTable } from './components/ExpenseTable'
import { useExpenseForm } from './hooks/useExpenseForm'

const initialValues = {
  id: '',
  type: '',
  title: '',
  category: '',
  totalAmount: 0,
  description: '',
  items: [{ title: '', quantity: 1, price: null, inventoryId: '' }],
}

export const ExpensePage: FC = () => {
  const [isOpenModalCreation, setIsOpenModalCreation] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [expenseId, setExpenseId] = useState('')
  const { t } = useTranslation(['expense', 'common'])
  const { mutate: deleteExpense } = useDeleteExpense()
  const { data: analytics } = useExpenseAnalytics()

  const { data: expense } = useGetExpense(expenseId)

  const { formik } = useExpenseForm(initialValues, () =>
    setIsOpenModalCreation(false),
  )

  const { values, errors, handleChange, setFieldValue, handleSubmit } = formik

  const {
    data,
    type,
    page,
    title,
    setPage,
    endDate,
    setType,
    category,
    setTitle,
    startDate,
    setEndDate,
    setCategory,
    setStartDate,
  } = useGetExpenseList()

  const handleCreateExpense = () => {
    setIsOpenModalCreation(true)
  }

  const handleChangeDate = (date: { startDate: string; endDate: string }) => {
    setStartDate(date.startDate)
    setEndDate(date.endDate)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    setExpenseId(id)
    setIsOpenDeleteModal(true)
  }

  const closeCreationSlider = () => {
    setIsOpenModalCreation(false)
    setExpenseId('')
    formik.resetForm({
      values: initialValues,
    })
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    setExpenseId(id)
    setIsOpenModalCreation(true)
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleCategoryChange = (
    _field: string,
    value: string | number | File | MultiValue<unknown> | null,
  ) => {
    setCategory(value as string)
  }

  const handleTypeChange = (
    _field: string,
    value: string | number | File | MultiValue<unknown> | null,
  ) => {
    setType(value as string)
  }

  const resetFilters = () => {
    setTitle('')
    setCategory('')
    setType('')
    setStartDate('')
    setEndDate('')
  }

  useEffect(() => {
    if (values.items) {
      const totalAmount = values.items.reduce(
        (acc, item) =>
          acc + (item.price !== null ? item.quantity * item.price : 0),
        0,
      )
      setFieldValue('totalAmount', totalAmount)
    }
  }, [values.items, setFieldValue])

  useEffect(() => {
    if (expenseId && expense) {
      expense.items.forEach((item: { inventoryId: string }) => {
        if (!item.inventoryId) {
          item.inventoryId = ''
        }
      })
      formik.setValues(expense)
    }
  }, [expenseId, expense])

  return (
    <>
      <ExpenseHeader />
      <AnalyticsCard analytics={analytics} />
      <ExpenseTable
        page={page}
        data={data}
        filters={{
          type,
          title,
          category,
        }}
        dateRange={{
          startDate,
          endDate,
        }}
        setPage={setPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        resetFilters={resetFilters}
        handleChangeDate={handleChangeDate}
        handleTypeChange={handleTypeChange}
        handleTitleChange={handleTitleChange}
        handleCreateExpense={handleCreateExpense}
        handleCategoryChange={handleCategoryChange}
      />
      <SliderModal
        handleSubmit={handleSubmit}
        isOpen={isOpenModalCreation}
        closeSlider={closeCreationSlider}
      >
        <CreateExpenseForm
          errors={errors}
          values={values}
          formik={formik}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          title={values.id ? t('expense:editExpense') : t('expense:addExpense')}
        />
      </SliderModal>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setIsOpenDeleteModal(false)}
        handleDelete={() => {
          deleteExpense(expenseId)
          setIsOpenDeleteModal(false)
        }}
        title={`${t('common:areYouSureDeleteProduct')}?`}
      />
    </>
  )
}

import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { useCreateExpense } from '../../../hooks/expense/useCreateExpense'
import { useUpdateExpense } from '../../../hooks/expense/useUpdateExpense'
import { ICreateExpenseForm } from '../constants'

export const useExpenseForm = (
  initialValues: ICreateExpenseForm,
  closeModal: () => void,
) => {
  const { t } = useTranslation(['common', 'expense'])
  const { mutate: createExpense, isLoading: isLoadingCreate } =
    useCreateExpense()
  const { mutate: updateExpense, isLoading: isLoadingUpdate } =
    useUpdateExpense()

  const formik = useFormik({
    initialValues,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      id: Yup.string().optional(),
      totalAmount: Yup.number().required(t('common:isRequired')),
      type: Yup.string().required(t('common:isRequired')),
      category: Yup.string().required(t('common:isRequired')),
      description: Yup.string().optional(),
      items: Yup.array()
        .of(
          Yup.object().shape({
            title: Yup.string().required(t('common:isRequired')),
            quantity: Yup.number().required(t('common:isRequired')),
            price: Yup.number().required(t('common:isRequired')),
            inventoryId: Yup.string().optional(),
          }),
        )
        .min(1, t('common:isRequired'))
        .required(t('common:isRequired')),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const errors = await formik.validateForm()
        formik.setTouched({
          totalAmount: true,
          type: true,
          category: true,
          title: true,
          items: values.items.map(() => ({
            title: true,
            quantity: true,
            price: true,
            inventoryId: true,
          })),
        })
        if (Object.keys(errors).length > 0) {
          setSubmitting(false)
          return
        }

        if (values.id) {
          await updateExpense(values)
        } else {
          await createExpense(values)
        }
        setSubmitting(false)
        resetForm({
          values: initialValues,
        })
        toast.success('Expense saved successfully')
        closeModal()
      } catch (error) {
        setSubmitting(false)
        toast.error('Failed to save expense')
      }
    },
  })

  const handleAddItem = () => {
    formik.setFieldValue('items', [
      ...formik.values.items,
      { title: '', quantity: 1, price: 0, inventoryId: '' },
    ])
  }

  const handleRemoveItem = (index: number) => {
    const items = [...formik.values.items]
    items.splice(index, 1)
    formik.setFieldValue('items', items)
  }

  return {
    formik,
    handleAddItem,
    handleRemoveItem,
    isLoading: isLoadingCreate || isLoadingUpdate,
  }
}

import { FormikErrors } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MultiValue } from 'react-select'

import { BaseButton, BaseTextArea } from '../../../../components'
import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseSelect } from '../../../../components/common/BaseSelect'
import { useGetInventoryList } from '../../../../hooks/inventory/useInventoryList'
import {
  ICreateExpenseForm,
  EXPENSE_TYPES,
  EXPENSE_CATEGORIES,
} from '../../constants'

interface ItemErrors {
  title?: string
  quantity?: string
  price?: string
  inventoryId?: string
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  values: ICreateExpenseForm
  errors?: FormikErrors<{
    title: string
    description: string
    totalAmount: number
    type: string
    category: string
    items: ItemErrors[]
  }>
  title: string
  handleChange: (e: ChangeEvent<Element>) => void
  setFieldValue: (
    field: string,
    value: string | number | MultiValue<unknown> | File | null,
  ) => void
}

export const CreateExpenseForm: React.FC<Props> = ({
  title,
  formik,
  values,
  errors,
  handleChange,
  setFieldValue,
}) => {
  const { t } = useTranslation(['common', 'expense'])
  const { data: inventoryList } = useGetInventoryList()
  const [inventoryOptions, setInventoryOptions] = useState([])

  const handleAddItem = () => {
    formik.setFieldValue('items', [
      ...formik.values.items,
      { name: '', quantity: 1, price: 0 },
    ])
  }

  const handleRemoveItem = (index: number) => {
    const newItems = [...formik.values.items]
    newItems.splice(index, 1)
    formik.setFieldValue('items', newItems)
  }

  useEffect(() => {
    // Transform the inventory list to the desired format
    if (!inventoryList?.data) return
    const formattedOptions = inventoryList.data.map(
      (item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      }),
    )
    setInventoryOptions(formattedOptions)
  }, [inventoryList?.data])

  return (
    <form>
      <h1 className="text-2xl font-medium col-span-full">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5 w-full mt-5">
        <div className="sm:col-span-1 w-full">
          <BaseInput
            name="title"
            label={t('expense:title')}
            handleChange={handleChange}
            value={values?.title || ''}
            error={errors?.title && errors.title}
            placeholder={t('expense:titlePlaceholder')}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="sm:col-span-1 w-full">
            <BaseSelect
              name="type"
              translation
              value={values.type}
              options={EXPENSE_TYPES}
              label={t('expense:type')}
              setFieldValue={setFieldValue}
              error={errors?.type && errors.type}
              placeholder={t('expense:typePlaceholder')}
            />
          </div>
          <div className="sm:col-span-1 w-full">
            <BaseSelect
              translation
              name="category"
              value={values.category}
              options={EXPENSE_CATEGORIES}
              label={t('common:category')}
              setFieldValue={setFieldValue}
              placeholder={t('expense:categoryPlaceholder')}
              error={errors?.category && errors.category}
            />
          </div>
        </div>
        <div>
          <BaseTextArea
            height={'100px'}
            name="description"
            value={values.description}
            handleChange={handleChange}
            label={t('common:description')}
            placeholder={t('expense:descriptionPlaceholder')}
            error={errors?.description && t(`${errors.description}`)}
          />
        </div>
        <h2 className="text-xl">{t('common:items')}</h2>
        <div className="grid grid-cols-2 w-full">
          <h2
            className={`
            text-xl text-bold text-primary-900 ${values.type === 'EXPENSE' ? 'text-red-400' : ''}
          `}
          >
            {`
              ${t('expense:totalAmount')}: 
              ${values?.items.reduce(
                (acc, item) => acc + item.quantity * (item?.price || 0),
                0,
              )} 
            `}
          </h2>
          <button
            type="button"
            onClick={handleAddItem}
            className="w-full bg-primary-500 text-white p-2 rounded"
          >
            {t('expense:addItem')}
          </button>
        </div>
        {values?.items.map((_item, index) => {
          const itemErrors = (errors?.items?.[index] ||
            {}) as FormikErrors<ItemErrors>

          return (
            <div key={index} className="bg-primary-200 p-4 pb-4 rounded">
              <div className="grid grid-cols-2 gap-2">
                <div className="sm:col-span-1 w-full">
                  <BaseInput
                    name={`items[${index}].title`}
                    label={t('expense:title')}
                    handleChange={handleChange}
                    value={values?.items[index]?.title || ''}
                    placeholder={t('expense:titlePlaceholder')}
                    error={itemErrors?.title && itemErrors.title}
                  />
                </div>
                <div className="w-full">
                  <BaseSelect
                    options={inventoryOptions}
                    label={t('common:inventory')}
                    setFieldValue={setFieldValue}
                    name={`items[${index}].inventoryId`}
                    value={values?.items[index]?.inventoryId || ''}
                    placeholder={t('expense:inventoryPlaceholder')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-1">
                <div className="sm:col-span-1 w-full">
                  <BaseInput
                    handleChange={handleChange}
                    name={`items[${index}].quantity`}
                    label={t('expense:itemQuantity')}
                    value={values?.items[index]?.quantity || ''}
                    placeholder={t('expense:itemQuantityPlaceholder')}
                    error={itemErrors?.quantity && itemErrors.quantity}
                  />
                </div>
                <div className="sm:col-span-1 w-full">
                  <BaseInput
                    handleChange={handleChange}
                    name={`items[${index}].price`}
                    label={t('expense:itemPrice')}
                    value={values?.items?.[index]?.price || ''}
                    error={itemErrors?.price && itemErrors.price}
                    placeholder={t('expense:itemPricePlaceholder')}
                  />
                </div>
                <div className="sm:col-span-1 w-full flex justify-end items-end">
                  <BaseButton
                    style="delete"
                    text={t('common:delete')}
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </form>
  )
}

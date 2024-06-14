/* eslint-disable @typescript-eslint/ban-ts-comment */
import moment from 'moment'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MultiValue } from 'react-select'

import {
  IconCoin,
  IconEdit,
  IconMoneyBag,
  IconTrash,
} from '../../../../assets/icons'
import { BaseSelect } from '../../../../components'
import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseInputRangeCalendar } from '../../../../components/common/BaseInputRangeCalendar'
import { Pagination } from '../../../../components/common/Pagination'
import { EXPENSE_TYPES, EXPENSE_CATEGORIES } from '../../constants'

interface Props {
  data: {
    data: Expense[] | undefined
    total: number
  }
  page: number
  setPage(skip: number): void
  handleCreateExpense: () => void
  handleTitleChange: (value: ChangeEvent<HTMLInputElement>) => void
  handleTypeChange: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
  handleCategoryChange: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
  handleEdit(e: React.MouseEvent<HTMLButtonElement>, id: string): void
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
  dateRange: {
    startDate: string
    endDate: string
  }
  handleChangeDate: (date: { startDate: string; endDate: string }) => void
  filters: {
    type: string
    title: string
    category: string
  }
  resetFilters: () => void
}

interface Expense {
  id: string
  title: string
  type: string
  totalAmount: number
  date: string
  category: string
  description: string
}

export const ExpenseTable: React.FC<Props> = ({
  data,
  page,
  filters,
  setPage,
  dateRange,
  handleEdit,
  handleDelete,
  resetFilters,
  handleTypeChange,
  handleChangeDate,
  handleTitleChange,
  handleCreateExpense,
  handleCategoryChange,
}) => {
  const { t } = useTranslation(['common', 'expense'])
  const [showCalendarInput, setShowCalendarInput] = useState(false)

  return (
    <div className="px-4 sm:px-6 lg:px-8 shadow-md rounded-lg mt-4 sm:mt-10">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-primary-950">
            {t('expense:expensesSubtitle')}
          </h1>
          <p className="mt-2 text-sm text-primary-500">
            {t('expense:expensesDescription')}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <BaseButton
            size="small"
            type="button"
            style="primary"
            onClick={handleCreateExpense}
            text={t('expense:addExpense')}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
        <BaseInput
          type="text"
          name="title"
          value={filters.title}
          label={t('common:title')}
          handleChange={handleTitleChange}
          placeholder={t('expense:titlePlaceholder')}
        />
        <BaseSelect
          translation
          name="type"
          value={filters.type}
          options={EXPENSE_TYPES}
          label={t('common:type')}
          setFieldValue={handleTypeChange}
          placeholder={t('expense:typePlaceholder')}
        />
        <BaseSelect
          translation
          name="category"
          value={filters.category}
          label={t('common:category')}
          options={EXPENSE_CATEGORIES}
          setFieldValue={handleCategoryChange}
          placeholder={t('expense:categoryPlaceholder')}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <BaseButton
          size="small"
          type="button"
          style="primary"
          onClick={resetFilters}
          text={t('common:resetFilters')}
        />
        <BaseInputRangeCalendar
          values={{
            startDate: moment(dateRange.startDate).format('YYYY-MM-DD'),
            endDate: moment(dateRange.endDate).format('YYYY-MM-DD'),
          }}
          open={showCalendarInput}
          mode="range"
          handleChange={handleChangeDate}
          textButtonDate={t('common:selectDate')}
          setShowCalendar={setShowCalendarInput}
          closeFilters={() => setShowCalendarInput(false)}
          rangeDate={{
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            key: 'selection',
          }}
          error={''}
        />
      </div>
      {data?.total === 0 && (
        <div className="h-[550px] w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-xl sm:text-3xl font-semibold">
            {t('expense:expenseNotFound')}
          </h1>
          <h1>{t('expense:dontHaveExpense')}</h1>
          <BaseButton
            size="small"
            type="button"
            onClick={handleCreateExpense}
            text={t('expense:addExpense')}
          />
        </div>
      )}
      {data?.total !== 0 && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-950 sm:pl-2 bg-primary-100 rounded-tl-xl"
                    ></th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:type')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:category')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('expense:totalAmount')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:date')}
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3.5 text-right bg-primary-100 text-sm font-semibold text-primary-950 rounded-tr-xl"
                    >
                      {t('common:actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white rounded-3xl">
                  {data?.data &&
                    data.data.map((item: Expense, index: number) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-primary-100 cursor-pointer ${
                          item.type === 'EXPENSE' ? 'bg-red-50' : ''
                        }`}
                      >
                        <td
                          className={`whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6 ${
                            index === 0
                              ? 'rounded-tx-none rounded-bl-xl'
                              : 'rounded-s-xl'
                          }`}
                        >
                          <div className="flex items-center">
                            <div>
                              {/* @ts-ignore */}
                              <IconMoneyBag width={24} />
                            </div>
                            <div className="ml-4">
                              <div className="capitalize font-medium text-primary-950">
                                {item.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {`${t(`common:expenseType.${item.type}`)}`}
                        </td>
                        <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {`${t(`common:expenseCategory.${item.category}`)}`}
                        </td>
                        <td className="flex gap-2 items-center whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {`${
                            item.type === 'EXPENSE' ? `- ` : ''
                          } ${item.totalAmount}`}
                          {/* @ts-ignore */}
                          <IconCoin width={22} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {moment(item.date).format('DD/MM/YYYY')}
                        </td>
                        <td
                          className={`whitespace-nowrap px-6 py-4 ${
                            index === 0 ? 'rounded-br-xl' : 'rounded-e-xl'
                          }`}
                        >
                          <div className="flex gap-2 justify-end">
                            <BaseButton
                              style="tertiary"
                              icon={<IconEdit />}
                              onClick={(e) => handleEdit(e, item.id)}
                            />
                            <BaseButton
                              style="tertiary"
                              onClick={(e) => handleDelete(e, item.id)}
                              icon={<IconTrash />}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            take={10}
            page={page}
            setPage={setPage}
            total={data?.total || 0}
          />
        </div>
      )}
    </div>
  )
}

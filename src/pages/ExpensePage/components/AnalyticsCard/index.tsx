import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { AnalyticsData } from '../../../../hooks/expense/useExpenseAnalytics'

interface Props {
  analytics: AnalyticsData | undefined
}

export const AnalyticsCard: FC<Props> = ({ analytics }) => {
  const { t } = useTranslation(['expense'])
  return (
    <div className="flex flex-col gap-5 mt-4 sm:mt-4">
      <h2 className="text-lg font-bold capitalize">{t('common:analytics')}</h2>
      {analytics && (
        <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-5 ">
          <div className="flex flex-col gap-1 w-full sm:w-[172px] justify-center items-center bg-primary-200 rounded-md p-4">
            <span className="text-sm  text-primary-800">
              {t('expense:totalIncome')}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {`${analytics.totalIncome}`}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-[172px] justify-center items-center bg-red-100 rounded-md p-4">
            <span className="text-sm text-primary-800">
              {t('expense:totalExpense')}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {analytics.totalExpense}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

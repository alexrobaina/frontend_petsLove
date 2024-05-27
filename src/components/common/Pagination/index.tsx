import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { IconChevronLeft, IconChevronRight } from '../../../assets/icons'

interface Props {
  page: number
  take: number
  total: number
  setPage: (page: number) => void
}

export const Pagination: FC<Props> = ({ page, take, total, setPage }) => {
  const { t } = useTranslation(['common'])
  const totalPages = Math.ceil(total / take)
  const showPagination = totalPages ? totalPages > 1 : false

  const neutralStyle =
    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
  const activeStyle =
    'relative z-10 inline-flex items-center bg-primary-400 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

  return (
    <div className="flex mt-5 items-center justify-between border-gray-200 bg-white py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => (page === 1 ? null : setPage(page - 1))}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {t('common:previous')}
        </button>
        <button
          onClick={() => (totalPages === page ? null : setPage(page + 1))}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {t('common:next')}
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            {t('common:showing')} <span className="font-medium">{page}</span>{' '}
            {t('common:to')} <span className="font-medium">{take}</span>{' '}
            {t('common:of')} <span className="font-medium">{total}</span>{' '}
            {t('common:results')}
          </p>
        </div>
        <div>
          {showPagination && (
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                onClick={() => (page === 1 ? null : setPage(page - 1))}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">{t('common:previous')}</span>
                <IconChevronLeft />
              </a>
              {Array.from({ length: totalPages }, (_, index) => (
                <div key={index}>
                  <button
                    aria-current="page"
                    onClick={() => setPage(index + 1)}
                    className={index + 1 === page ? activeStyle : neutralStyle}
                  >
                    {index + 1}
                  </button>
                </div>
              ))}
              <a
                onClick={() => (totalPages === page ? null : setPage(page + 1))}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">{t('common:next')}</span>
                <IconChevronRight />
              </a>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}

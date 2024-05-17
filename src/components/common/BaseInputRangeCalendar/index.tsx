import moment from 'moment'
import { FC, useState } from 'react'
import { DateRange, RangeKeyDict } from 'react-date-range'

import { IconCalendarStats } from '../../../assets/icons'
import { BaseButton } from '../BaseButton'

import 'react-date-range/dist/styles.css' // Main style file
import 'react-date-range/dist/theme/default.css' // Default theme

interface DateRangeType {
  key: string
  endDate: Date | null
  startDate: Date | null
}

interface Props {
  open: boolean
  error?: string
  textButtonDate?: string
  rangeDate: DateRangeType
  closeFilters: () => void
  values: {
    startDate: string
    endDate: string
  }
  mode?: 'single' | 'range'
  marginRightCalendarBox?: number
  setShowCalendar: (value: boolean) => void
  handleChange: (range: DateRangeType) => void
}

export const BaseInputRangeCalendar: FC<Props> = ({
  open,
  values,
  error,
  rangeDate,
  closeFilters,
  handleChange,
  mode = 'single',
  setShowCalendar,
  marginRightCalendarBox = 0,
  textButtonDate = 'Select Date',
}) => {
  const [rangeSelected, setRangeSelected] = useState<DateRangeType>(rangeDate)

  const selectDate = (ranges: RangeKeyDict) => {
    if (mode === 'single') {
      const newRange: DateRangeType = {
        ...ranges.selection,
        endDate: ranges.selection.startDate || null,
        startDate: ranges.selection.startDate || null, // Add this line to assign a value of type Date or null to startDate
        key: 'selection',
      }
      setRangeSelected(newRange)
      handleChange(newRange)

      return
    }

    const newRange: DateRangeType = {
      startDate: ranges.selection.startDate ?? null,
      endDate: ranges.selection.endDate ?? null,
      key: 'selection',
    }

    setRangeSelected(newRange)
    handleChange(newRange)
  }

  return (
    <div className="relative">
      <BaseButton
        wFull
        text={
          values.startDate
            ? moment(values.startDate).format('YYYY-MM-DD')
            : textButtonDate
        }
        onClick={() => {
          closeFilters()
          setShowCalendar(!open)
        }}
        icon={<IconCalendarStats width={24} color="#fff" />}
        className="bg-pastel-green-500 hover:bg-pastel-green-600 text-white font-medium py-2 px-4 rounded shadow"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {open && (
        <div
          onMouseLeave={() => {
            closeFilters()
            setShowCalendar(!open)
          }}
          className={`absolute right-0 z-50 ${marginRightCalendarBox} bg-white p-4 shadow-lg rounded-lg border border-gray-200`}
        >
          <DateRange
            className="calendar"
            onChange={selectDate}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ranges={[rangeSelected]}
            rangeColors={['#a5d6a7']}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
          />
        </div>
      )}
    </div>
  )
}

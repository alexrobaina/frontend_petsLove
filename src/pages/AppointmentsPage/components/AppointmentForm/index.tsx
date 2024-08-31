import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseInputRangeCalendar } from '../../../../components/common/BaseInputRangeCalendar'
import { BaseSelect } from '../../../../components/common/BaseSelect'
import { BaseTextArea } from '../../../../components/common/BaseTextArea'
import { ContactInfo } from '../ContactInfo'

import { Props } from './types'

export const AppointmentForm: React.FC<Props> = ({
  pet,
  pets,
  title,
  values,
  errors,
  handleChange,
  setFieldValue,
}) => {
  const { t } = useTranslation(['common', 'appointments'])
  const [showCalendarInput, setShowCalendarInput] = useState(false)

  const handleChangeDate = (dr: {
    startDate: Date
    endDate: Date
    key: string
  }) => {
    setFieldValue('startDate', dr?.startDate?.toISOString())
    setFieldValue('endDate', dr?.endDate?.toISOString())
  }

  return (
    <form>
      <h1 className="text-2xl font-medium col-span-full">
        {t('common:createAppointment')}
      </h1>
      <div className="grid mt-4 md:mt-10 grid-cols-1 sm:grid-cols-2 w-full gap-4">
        <div className="sm:col-span-1 w-full">
          <BaseInput
            name="title"
            value={values?.title}
            label={t('common:title')}
            handleChange={handleChange}
            placeholder={t('common:title')}
            error={errors.title ? t(`common:isRequired`) : ''}
          />
        </div>
        <div className="mt-6">
          <BaseInputRangeCalendar
            values={{
              ...values,
              endDate: values.endDate.toString(), // Convert endDate to string
            }}
            open={showCalendarInput}
            closeFilters={() => setShowCalendarInput(false)} // Properly handle closing
            rangeDate={{
              startDate: new Date(values.startDate || Date.now()), // Fallback to now if values.date is falsy
              endDate: new Date(values.endDate || Date.now()), // Same as startDate
              key: 'selection',
            }}
            textButtonDate={t('common:selectDate')}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleChange={(dr: any) => handleChangeDate(dr)}
            setShowCalendar={setShowCalendarInput}
            error={errors.startDate ? t(`common:isRequired`) : ''}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:gap-8 w-full mt-6">
        <BaseTextArea
          height={100}
          name="description"
          value={values?.description}
          handleChange={handleChange}
          label={t('common:notes')}
          placeholder={t('common:notes')}
          error={errors?.description ? t(`common:isRequired`) : ''}
        />
      </div>
      <div className="grid mt-4 md:mt-6 grid-cols-1 sm:grid-cols-1 w-full gap-4">
        <BaseSelect
          translation
          name="petId"
          options={pets.map((pet) => ({
            value: pet.id,
            label: pet.name,
          }))}
          value={values?.petId}
          label={t('common:pets')}
          setFieldValue={setFieldValue}
          error={errors.petId ? t(`common:isRequired`) : ''}
        />
      </div>
      {pet && (
        <h3 className="text-primary-900 font-semibold mt-4 md:mt-6 text-md">
          {t('appointments:selectAdopterOrShelter')}
        </h3>
      )}
      <ContactInfo pet={pet} setFieldValue={setFieldValue} values={values} />
    </form>
  )
}

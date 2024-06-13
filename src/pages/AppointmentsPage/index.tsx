import { FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseButton, BaseLoading, SliderModal } from '../../components'
import { AppointmentsCalendar } from '../../components/AppointmentsCalendar'
import { useAppointmentList } from '../../hooks/appointments/useAppointmentList'
import { useUserPets } from '../../hooks/user/useUserPets'
import { AppContext } from '../../services/AppContext'
import { PetDetail } from '../ProfilePetPage/interfaces'

import { AppointmentForm } from './components/AppointmentForm'
import { AppointmentHeader } from './components/AppointmentHeader'
import { useAppointmentForm } from './hooks/useAppointmentForm'

export const AppointmentsPage: FC = () => {
  const context:
    | {
        user: {
          role: string
          id: string
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | any = useContext(AppContext)
  const { data: appointmentList } = useAppointmentList()
  const { t } = useTranslation(['common', 'appointments'])
  const [isOpenAppointmentForm, setOpenAppointmentForm] =
    useState<boolean>(false)
  const [titleForm, setTitleForm] = useState<string>(t('common:appointment'))

  const { formik, isLoadingUpdate } = useAppointmentForm(() =>
    setOpenAppointmentForm(false),
  )

  const handleCloseAppintmentForm = () => {
    setOpenAppointmentForm(false)
    formik.resetForm()
    formik.setFieldValue('recipientId', '')
  }

  const { data, isLoading } = useUserPets({
    id: context?.user?.id,
  })

  const handleOpenAppointment = () => {
    if (formik.values?.id) {
      formik.setFieldValue('petId', '')
      formik.setFieldValue('title', '')
      formik.setFieldValue('endDate', '')
      formik.setFieldValue('startDate', '')
      formik.setFieldValue('description', '')
      formik.setFieldValue('recipientId', '')
      formik.setFieldValue('recurring', false)
    }

    setOpenAppointmentForm(true)
    setTitleForm(t('common:appointment'))
  }

  if (isLoading || isLoadingUpdate) {
    return <BaseLoading large />
  }

  return (
    <>
      <AppointmentHeader />
      <div className="px-4 sm:px-6 lg:px-8 shadow-md rounded-lg mt-4">
        <div className="flex justify-between flex-col sm:flex-row sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-primary-950">
              {t('appointments:organizeYourAppointments')}
            </h1>
            <p className="mt-2 text-sm text-primary-500">
              {t('appointments:calendarDescription')}
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <BaseButton
              size="small"
              type="button"
              style="primary"
              onClick={handleOpenAppointment}
              text={t('appointments:addAppointment')}
            />
          </div>
        </div>
        <div className="mt-8">
          <AppointmentsCalendar
            events={appointmentList}
            resetForm={formik.resetForm}
            setOpenAppointmentForm={setOpenAppointmentForm}
          />
        </div>
      </div>
      <SliderModal
        title={titleForm}
        isOpen={isOpenAppointmentForm}
        handleSubmit={formik.handleSubmit}
        closeSlider={handleCloseAppintmentForm}
      >
        <AppointmentForm
          pets={data?.pets}
          values={formik.values}
          errors={formik.errors}
          userId={context.user?.id}
          handleChange={formik.handleChange}
          setFieldValue={formik.setFieldValue}
          closeModal={handleCloseAppintmentForm}
          pet={data?.pets?.find(
            (pet: PetDetail) => pet.id === formik.values.petId,
          )}
        />
      </SliderModal>
    </>
  )
}

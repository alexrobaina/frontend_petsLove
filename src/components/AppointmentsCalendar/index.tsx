import axios from 'axios'
import moment from 'moment'
import { useState, useEffect, FC } from 'react'
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import { useTranslation } from 'react-i18next'

import { useGetApointment } from '../../hooks/appointments/useGetAppointment'
import { DeleteModal } from '../common/DeleteModal'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './styles.css'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resetForm: any
  events: Appointment[]
  setOpenAppointmentForm: (isOpen: boolean) => void
}

interface Appointment {
  id: string
  end: string
  petId: string
  start: string
  title: string
  endDate: string
  startDate: string
  recipientId?: string
  description?: string
  values: {
    startDay: string
    endDate: string
  }
}

export const AppointmentsCalendar: FC<Props> = ({
  events,
  resetForm,
  setOpenAppointmentForm,
}) => {
  const { t } = useTranslation(['common'])
  const [deleteModalAppointment, setDeleteModalAppointment] = useState(false)
  const [appointments, setAppointments] = useState<Event[]>([])
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null)
  const { data: appointment } = useGetApointment(
    selectedAppointment?.id || undefined,
  )

  const localizer = momentLocalizer(moment)

  const handleEventSelect = (appointment: Event): void => {
    setSelectedAppointment(appointment as unknown as Appointment)
    setOpenAppointmentForm(true)
  }

  const handleDeleteAppointment = async (
    selectedAppointment: Appointment | null,
  ) => {
    try {
      await axios.delete(`/appointments/${selectedAppointment?.id}`)
    } catch (error) {
      console.log(error)
    }
    setDeleteModalAppointment(false)
  }

  const eventStyleGetter = (
    _event: Event,
    _start: string,
    _end: string,
    isSelected: boolean,
  ) => {
    const newStyle = {
      backgroundColor: isSelected ? '#8ad3c1' : '#d6f1e9', // Default color
      color: isSelected ? '#0d2624' : '#0d2624', // Text color
    }

    return {
      className: '',
      style: newStyle,
    }
  }

  const formatAppointments = async (events: Appointment[]) => {
    const appointments = events.map((event) => ({
      id: event.id,
      allDay: false,
      petId: event?.petId || null,
      title: event.title,
      start: new Date(event?.startDate),
      recipientId: event?.recipientId || null,
      description: event?.description,
      end: new Date(event?.endDate),
    }))
    setAppointments(appointments)
  }

  useEffect(() => {
    formatAppointments(events)
  }, [events])

  const messages = {
    allDay: t('common:allDay'),
    previous: t('common:previous'),
    next: t('common:next'),
    today: t('common:today'),
    month: t('common:month'),
    week: t('common:week'),
    day: t('common:day'),
    agenda: t('common:agenda'),
    date: t('common:date'),
    time: t('common:time'),
    event: t('common:event'),
    showMore: t('common:showMore'),
  }

  useEffect(() => {
    if (selectedAppointment) {
      const appointmentFormatted = {
        petId: appointment?.petId || null,
        id: selectedAppointment?.id || '',
        endDate: selectedAppointment?.end || '',
        title: selectedAppointment?.title || '',
        recipientId: appointment?.recipientId || null,
        startDate: selectedAppointment?.start || '',
        description: selectedAppointment?.description || '',
      }

      resetForm({ values: appointmentFormatted })
    }
  }, [selectedAppointment, resetForm, appointment])

  return (
    <div className="mb-8">
      <Calendar
        selectable
        endAccessor="end"
        defaultView="month"
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        style={{ height: 600 }}
        views={['month', 'week', 'day']}
        // views={[t('common.month'), t('common.week'), t('common.day')]}
        onSelectEvent={handleEventSelect}
        eventPropGetter={
          eventStyleGetter as {
            (event: Event): {
              className: string
              style: { backgroundColor: string; color: string }
            }
          }
        }
        messages={{
          ...messages,
          showMore: (count: number) => `+ Ver más (${count})`,
        }}
      />
      <DeleteModal
        isOpen={deleteModalAppointment}
        handleClose={() => setDeleteModalAppointment(false)}
        handleDelete={() => {
          handleDeleteAppointment(selectedAppointment)
          setDeleteModalAppointment(false)
        }}
        title={`${t('common:areYouSureDelete')} this appointment?`}
      />
    </div>
  )
}

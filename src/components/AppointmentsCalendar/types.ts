export interface Appointment {
  id: string
  end: string
  start: string
  title: string
  endDate?: string
  startDate?: string
  description?: string
  recipientId?: string
}

export interface Props {
  resetForm: (values: Appointment) => void // Better type definition is needed
  events: Appointment[]
  setOpenAppointment: (isOpen: boolean) => void
}

export interface EventProps extends Appointment {
  start: string
  end: string
}

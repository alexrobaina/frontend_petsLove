import { useQuery } from 'react-query'

import { listAppointments } from '../../api/appointments'

export const useAppointmentList = () => {
  const { data, error, isLoading } = useQuery(['appointments'], () =>
    listAppointments(),
  )

  return { data, error, isLoading }
}

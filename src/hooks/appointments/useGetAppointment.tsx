import { useQuery } from 'react-query'

import { getAppointmentById } from '../../api/appointments'

export const useGetApointment = (id: string | undefined) => {
  const { data, error, isLoading } = useQuery(
    ['appintment', id],
    () => id && getAppointmentById(id),
  )

  return { data: data, error, isLoading }
}

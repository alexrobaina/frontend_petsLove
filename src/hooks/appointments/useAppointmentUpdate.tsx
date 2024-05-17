import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updateAppointment } from '../../api/appointments'

export const useAppointmentUpdate = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updateAppointment, {
    onSuccess: async () => {
      toast.success('Appointment updated successfully')
      await queryClient.invalidateQueries(['appointments'])
      await queryClient.invalidateQueries(['appointment'])
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(`🙈 Something is wrong`)
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

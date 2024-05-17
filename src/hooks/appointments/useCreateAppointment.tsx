import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { createAppointment } from '../../api/appointments'

export const useCreateAppointment = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(createAppointment, {
    onSuccess: async () => {
      toast.success('appointment, created successfully')
      await queryClient.invalidateQueries(['appointments'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

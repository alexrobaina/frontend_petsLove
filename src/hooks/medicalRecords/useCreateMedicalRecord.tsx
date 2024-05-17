import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { createMedicalRecord } from '../../api/medicalRecord'

export const useCreateMedicalRecord = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(createMedicalRecord, {
    onSuccess: async () => {
      toast.success('Medical record created successfully')
      await queryClient.invalidateQueries(['pet'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

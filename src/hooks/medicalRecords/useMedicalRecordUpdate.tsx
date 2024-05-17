import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updateMedicalRecord } from '../../api/medicalRecord'

export const useMedicalRecordUpdate = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading, isSuccess } = useMutation(updateMedicalRecord, {
    onSuccess: async () => {
      toast.success('Medical record updated successfully')
      await queryClient.invalidateQueries(['pet'])
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(`🙈 ${error.response.data.message}`)
      console.log(error)
    },
  })

  return { mutate, isLoading, isSuccess }
}

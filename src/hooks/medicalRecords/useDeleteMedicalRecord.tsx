import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deleteMedicalRecord } from '../../api/medicalRecord'

export const useDeleteMedicalRecord = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading, isSuccess } = useMutation(deleteMedicalRecord, {
    onSuccess: async () => {
      toast.success('Medical record deleted successfully')
      await queryClient.invalidateQueries(['pet'])
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(`🙈 ${error.response.data.message}`)
      console.log(error)
    },
  })

  return { mutate, isLoading, isSuccess }
}

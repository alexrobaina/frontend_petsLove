import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updatePet } from '../../api/pet'

export const usePetUpdate = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updatePet, {
    onSuccess: async () => {
      toast.success('Pet updated successfully')
      await queryClient.invalidateQueries(['pets'])
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(`🙈 ${error.response.data.message}`)
      console.log(error)
    },
  })

  return { mutatePetUpdate: mutate, isLoading }
}

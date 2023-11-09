import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updatePet } from '../api/pet'

export const usePetUpdate = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updatePet, {
    onSuccess: async () => {
      toast.success('Pet updated successfully')
      await queryClient.invalidateQueries(['pets'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutatePetUpdate: mutate, isLoading }
}

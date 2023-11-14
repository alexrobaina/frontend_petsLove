import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updatePetVaccine } from '../api/petVaccine'

export const useUpdatePetVaccine = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updatePetVaccine, {
    onSuccess: async () => {
      toast.success('Vaccine updated successfully')
      await queryClient.invalidateQueries(['pet'])
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(`🙈 Something is wrong`)
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

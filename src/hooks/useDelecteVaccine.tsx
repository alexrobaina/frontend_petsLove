import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deletePetVaccine } from '../api/petVaccine'

export const useDelecteVaccine = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(deletePetVaccine, {
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

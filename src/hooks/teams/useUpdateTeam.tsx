import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updateTeam } from '../../api/teams'

export const useUpdateTeam = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updateTeam, {
    onSuccess: async () => {
      toast.success('Team updated successfully')
      await queryClient.invalidateQueries(['teams'])
      await queryClient.invalidateQueries(['team'])
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(`🙈 Something went wrong`)
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

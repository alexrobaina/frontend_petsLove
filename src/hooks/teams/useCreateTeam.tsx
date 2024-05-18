import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { createTeam } from '../../api/teams'

export const useCreateTeam = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(createTeam, {
    onSuccess: async () => {
      toast.success('Team created successfully')
      await queryClient.invalidateQueries(['teams'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something went wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { removeTeamMember } from '../../api/teams'

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(removeTeamMember, {
    onSuccess: async () => {
      toast.success('Team member removed successfully')
      await queryClient.invalidateQueries(['teams'])
      await queryClient.invalidateQueries(['team'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something went wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

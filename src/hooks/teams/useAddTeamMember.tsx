import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { addTeamMember } from '../../api/teams'

export const useAddTeamMember = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(addTeamMember, {
    onSuccess: async () => {
      toast.success('Team member added successfully')
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

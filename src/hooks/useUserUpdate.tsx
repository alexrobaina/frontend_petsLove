import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updateUser } from '../api/user'

export const useUserUpdate = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updateUser, {
    onSuccess: async () => {
      toast.success('User updated successfully')
      await queryClient.invalidateQueries(['user'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}

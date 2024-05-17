import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { createPet } from '../../api/pet'

export const useCreatePet = () => {
  const [petCreated, setPetCreated] = useState({})
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(createPet, {
    onSuccess: async (data: { pet: object }) => {
      setPetCreated(data.pet)

      toast.success('Pet created successfully')
      await queryClient.invalidateQueries(['pets'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading, petCreated }
}

import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deletePet } from '../api/pet'

interface UseDeletePetProps {
  petId: string
}

export const useDeletePet = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation<void, unknown, UseDeletePetProps>(
    (data) => deletePet(data.petId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['pets'])
        toast.success('Pet deleted successfully')
      },
      onError: () => {
        toast.error('Error deleting pet')
      },
    },
  )

  const handleDeletePet = async (petId: string) => {
    mutate({ petId })
  }

  return {
    handleDeletePet,
    isLoading,
  }
}

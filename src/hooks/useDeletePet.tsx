import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deletePet } from '../api/pet'

interface UseDeletePetProps {
  petId: string
  userRole: string
}

export const useDeletePet = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation<void, unknown, UseDeletePetProps>(
    (data) => deletePet(data.petId, data.userRole),
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

  const handleDeletePet = async (petId: string, userRole: string) => {
    mutate({ petId, userRole })
  }

  return {
    handleDeletePet,
    isLoading,
  }
}

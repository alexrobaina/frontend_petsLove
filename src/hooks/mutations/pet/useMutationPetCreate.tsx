import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createPet } from "services/pet";

export const useMutationPetCreate = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateCreate,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreated,
  } = useMutation(createPet, {
    onSuccess: async () => {
      toast.success("🐈 Pet created");
      await queryClient.invalidateQueries(["pets"]);
    },
    onError: (error: any) => {
      toast.error("🙈 Somethink is wrong!");
      console.log(error.response.data.error.code);
    },
  });

  return { mutateCreate, isLoadingCreate, isSuccessCreated };
};

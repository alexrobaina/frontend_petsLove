import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { updateUser } from "services/user";

export const useMutationUserUpdateUser = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdateUser,
    isLoading: isLoadingUpdateUser,
    isSuccess: isSuccessUpdateUser,
  } = useMutation(updateUser, {
    onSuccess: async () => {
      toast.success("🦄 User updated");
      await queryClient.invalidateQueries(["session"]);
    },
    onError: (error: any) => {
      toast.error("🙈 Somethink is wrong!");
      console.log(error.response.data.error.code);
    },
  });

  return { mutateUpdateUser, isLoadingUpdateUser, isSuccessUpdateUser };
};

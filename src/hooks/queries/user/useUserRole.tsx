import { useQuery } from "react-query";
import { getUserRole } from "services/user";

export const useUserRole = (role: string) => {
  const { data, isLoading, refetch } = useQuery(["userRole", role], () =>
    getUserRole(role)
  );

  return { data, isLoading, refetch };
};

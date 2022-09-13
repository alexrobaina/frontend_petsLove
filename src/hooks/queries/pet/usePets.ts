import { useQuery } from "react-query";
import { getPets } from "services/pet";

export const usePets = () => {
  const { data, isLoading: isLoading, refetch } = useQuery(["pets"], getPets);

  return { pets: data?.pets, isLoading, refetch };
};

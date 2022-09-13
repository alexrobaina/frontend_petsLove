import { useQuery } from "react-query";
import { getFilterPets } from "services/pet";

export const usePetsFiltered = ({
  sex,
  page,
  city,
  country,
  category,
  adopted,
  name = "",
}: {
  sex: string;
  page?: number;
  name?: string;
  city?: string;
  country?: string;
  category: string;
  adopted: boolean;
}) => {
  const { data, isLoading, refetch } = useQuery(
    ["petsFiltered", category, sex, city, country, page, adopted, name],
    () =>
      getFilterPets({
        sex,
        city,
        page,
        name,
        country,
        category,
        adopted,
      })
  );

  return { data, isLoading, refetch };
};

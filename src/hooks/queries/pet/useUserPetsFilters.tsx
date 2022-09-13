import { useQuery } from "react-query";
import { getUserFiltersPets } from "services/pet";

export const useUserPetsFilters = ({
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
    ["petsUserFiltered", category, sex, city, country, page, adopted, name],
    () =>
      getUserFiltersPets({
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

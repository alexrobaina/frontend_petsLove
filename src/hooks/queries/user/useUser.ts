import { useQuery } from "react-query";
import { getUser } from "services/user";

export const useUser = () => useQuery(["user"], getUser);

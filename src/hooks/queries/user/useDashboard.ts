import { useQuery } from "react-query";
import { getDashboardData } from "services/user";

export const useDashboard = () => useQuery(["dashboard"], getDashboardData);

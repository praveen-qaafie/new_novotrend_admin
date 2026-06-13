import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "./dashboard.service";

export const useDashboardQuery = ({ limit = 10, offset = 0 } = {}) => {
  return useQuery({
    queryKey: ["dashboard", limit, offset],
    queryFn: async () => {
      console.log("GET DASHBOARD QUERY RUNNING");

      return await getDashboardData({
        limit,
        offset,
      });
    },
  });
};

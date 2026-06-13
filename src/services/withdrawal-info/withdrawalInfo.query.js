import { useQuery } from "@tanstack/react-query";
import { getWithdrawInfo } from "./withdrawalInfo.service";

export const useWithdrawInfoQuery = ({ type_chain }) => {
  return useQuery({
    queryKey: ["withdraw-info", type_chain],
    queryFn: async () => {
      console.log("Get Withdraw Info Query Running:", type_chain);

      return await getWithdrawInfo({
        type_chain,
      });
    },
    enabled: Boolean(type_chain),
  });
};

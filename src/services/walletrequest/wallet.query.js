import { useQuery } from "@tanstack/react-query";
import { acceptWalletRequest, getWalletRequestList, rejectWalletRequest } from "./wallet.service";

export const useWalletRequestList = ({ limit, offset, search }) => {
  return useQuery({
    queryKey: ["wallet-request-list", limit, offset, search],
    queryFn: async () => {
      console.log("QUERY FUNCTION RUNNING");
      return await getWalletRequestList({
        limit,
        offset,
        search,
      });
    },
  });
};

// ACCEPT WALLET REQUEST
export const useAcceptWalletRequestList = ({ limit, offset, search }) => {
  return useQuery({
    queryKey: ["accept-wallet-request-list", limit, offset, search],
    queryFn: async () => {
      console.log("ACCEPT QUERY FUNCTION RUNNING");
      return await acceptWalletRequest({
        limit,
        offset,
        search,
      });
    },
  });
};

// ACCEPT WALLET REQUEST
export const useRejectWalletRequestList = ({ limit, offset, search }) => {
  return useQuery({
    queryKey: ["reject-wallet-request-list", limit, offset, search],
    queryFn: async () => {
      console.log("ACCEPT QUERY FUNCTION RUNNING");
      return await rejectWalletRequest({
        limit,
        offset,
        search,
      });
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { addBankInfo, getBankInfo } from "./bank-info.query";

export const useAddBankInfoMutation = () => {
  return useMutation({
    mutationFn: addBankInfo,

    onSuccess: (response) => {
      toast.success(response?.message || "Bank details added successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });
};

export const BANK_INFO_QUERY_KEY = ["bankInfo"];

export const useGetBankInfoQuery = () => {
  return useQuery({
    queryKey: BANK_INFO_QUERY_KEY,
    queryFn: getBankInfo,
  });
};

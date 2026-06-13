import { useMutation } from "@tanstack/react-query";
import { addDepositWallet } from "./depositWallet.service";

export const useAddDepositWalletMutation = () => {
  return useMutation({
    mutationFn: addDepositWallet,
    onSuccess: data => {
      console.log("ADD DEPOSIT WALLET SUCCESS:", data);
    },
    onError: error => {
      console.log("ADD DEPOSIT WALLET ERROR:", error);
    },
  });
};

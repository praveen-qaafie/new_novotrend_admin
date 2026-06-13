import { useMutation } from "@tanstack/react-query";
import { walletActionRemark } from "./wallet.service";
// wallet Action
export const useWalletRequestMutation = () => {
  return useMutation({
    mutationFn: walletActionRemark,
    onSuccess: data => {
      console.log("WALLET ACTION SUCCESS:", data);
    },
    onError: error => {
      console.log("WALLET ACTION ERROR:", error);
    },
  });
};

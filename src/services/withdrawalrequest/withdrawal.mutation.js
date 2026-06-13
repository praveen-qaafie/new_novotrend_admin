import { useMutation } from "@tanstack/react-query";
import { withdrawalActionRemark } from "./withdrawal.service";
export const useWithdrawalActionMutation = () => {
  return useMutation({
    mutationFn: withdrawalActionRemark,
    onSuccess: data => {
      console.log("WITHDRAWAL ACTION SUCCESS:", data);
    },
    onError: error => {
      console.log("WITHDRAWAL ACTION ERROR:", error);
    },
  });
};

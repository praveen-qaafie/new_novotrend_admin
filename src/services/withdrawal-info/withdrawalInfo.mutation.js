import { useMutation } from "@tanstack/react-query";
import { addWithdrawInfo } from "./withdrawalInfo.service";

export const useAddWithdrawInfoMutation = () => {
  return useMutation({
    mutationFn: addWithdrawInfo,
    onSuccess: data => {
      console.log("ADD WITHDRAW INFO SUCCESS:", data);
    },
    onError: error => {
      console.log("ADD WITHDRAW INFO ERROR:", error);
    },
  });
};

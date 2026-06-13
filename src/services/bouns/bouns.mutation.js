import { decryptData } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { giveBonus, removeFromWallet } from "./bouns.service";

export const useGiveBonusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: giveBonus,
    onSuccess: response => {
      let successMessage = "Bonus added successfully";
      try {
        if (typeof response?.result === "string") {
          const decryptedResult = decryptData(response?.result);
          successMessage =
            decryptedResult?.data?.result || decryptedResult?.result || successMessage;
        }
      } catch (error) {
        console.log("BONUS RESULT DECRYPT ERROR:", error);
      }
      toast.success(successMessage);
      queryClient.invalidateQueries({
        queryKey: ["bonus-list"],
      });

      console.log("BONUS ADDED:", response);
    },
    onError: error => {
      toast.error(error?.message || "Failed to add bonus");
      console.log("BONUS ERROR:", error);
    },
  });
};

export const useRemoveFromWalletMutation = () => {
  return useMutation({
    mutationFn: removeFromWallet,
    onSuccess: response => {
      let successMessage = "Amount removed successfully";
      try {
        if (typeof response?.result === "string") {
          const decryptedResult = decryptData(response.result);
          console.log("REMOVE FROM WALLET DECRYPTED RESULT:", decryptedResult);
          successMessage =
            decryptedResult?.data?.result || decryptedResult?.result || successMessage;
        }
      } catch (error) {
        console.log("REMOVE FROM WALLET RESULT DECRYPT ERROR:", error);
      }
      toast.success(successMessage);
      console.log("REMOVE FROM WALLET SUCCESS:", response);
    },
    onError: error => {
      toast.error(error?.message || "Something went wrong");
      console.log("REMOVE FROM WALLET ERROR:", error);
    },
  });
};

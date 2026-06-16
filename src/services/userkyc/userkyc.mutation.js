import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addBankAccount, updateBankKycStatus, updateKycStatus } from "./userkyc.service";

const getSafeSuccessMessage = (data, fallback) => {
  const message = data?.message || data?.result;

  if (typeof message !== "string") {
    return message || fallback;
  }

  const looksEncrypted = message.length > 80 && !message.includes(" ");

  return looksEncrypted ? fallback : message;
};

// ADD Bank Account
export const useAddBankAccountMutation = () => {
  return useMutation({
    mutationFn: addBankAccount,
    onSuccess: data => {
            toast.success(getSafeSuccessMessage(data, "Bank account added successfully"));
    },
    onError: error => {
            toast.error(error?.message || "Unable to add bank account");
    },
  });
};

export const useUpdateKycStatusMutation = () => {
  return useMutation({
    mutationFn: updateKycStatus,
    onSuccess: data => {
      toast.success(data?.result || "KYC status updated successfully");
    },
    onError: error => {
      toast.error(error?.message || "Failed to update KYC status");
    },
  });
};

export const useUpdateBankKycStatusMutation = () => {
  return useMutation({
    mutationFn: updateBankKycStatus,
    onSuccess: data => {
      toast.success(data?.result || "Bank KYC status updated successfully");
    },
    onError: error => {
      toast.error(error?.message || "Failed to update Bank KYC status");
    },
  });
};

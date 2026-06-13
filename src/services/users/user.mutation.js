import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  adminUserAction,
  changeMT5Leverage,
  changeMT5Password,
  changeMT5PasswordRequestStatus,
  createMT5Account,
  getMT5AccountByEmail,
  getUsernameByAccountNo,
  getUsernameByEmail,
  sendVerificationMailMT5,
} from "./user.service";

export const useAdminUserActionMutation = () => {
  return useMutation({
    mutationFn: adminUserAction,
  });
};
// VERIFY EMAIL
export const useGetUsernameByEmailMutation = () => {
  return useMutation({
    mutationFn: getUsernameByEmail,
    onSuccess: data => {
      console.log("EMAIL VERIFIED SUCCESS:", data);
    },
    onError: error => {
      console.log("EMAIL VERIFIED ERROR:", error);
    },
  });
};

//  GET MT5 ACCOUNT
export const useGetMT5AccountByEmailMutation = () => {
  return useMutation({
    mutationFn: getMT5AccountByEmail,
    onSuccess: data => {
      console.log("MT5 ACCOUNT SUCCESS:", data);
    },
    onError: error => {
      console.log("MT5 ACCOUNT ERROR:", error);
    },
  });
};

// CREATE MT5 ACCOUNT
export const useCreateMT5AccountMutation = () => {
  return useMutation({
    mutationFn: createMT5Account,
    onSuccess: data => {
      console.log("CREATE MT5 ACCOUNT SUCCESS:", data);
    },
    onError: error => {
      console.log("CREATE MT5 ACCOUNT ERROR:", error);
    },
  });
};

// CHANGE MT5 PASSWORD
export const useChangeMT5PasswordMutation = () => {
  return useMutation({
    mutationFn: changeMT5Password,
    onSuccess: data => {
      console.log("PASSWORD CHANGE SUCCESS:", data);
    },
    onError: error => {
      console.log("PASSWORD CHANGE ERROR:", error);
    },
  });
};

// VERIFY MT5 ACCOUNT NUMBER
export const useGetUsernameByAccountNoMutation = () => {
  return useMutation({
    mutationFn: getUsernameByAccountNo,
    onSuccess: data => {
      console.log("ACCOUNT VERIFY SUCCESS:", data);
    },
    onError: error => {
      console.log("ACCOUNT VERIFY ERROR:", error);
    },
  });
};

// CHANGE MT5 LEVERAGE
export const useChangeMT5LeverageMutation = () => {
  return useMutation({
    mutationFn: changeMT5Leverage,
    onSuccess: data => {
      console.log("CHANGE LEVERAGE SUCCESS:", data);
    },
    onError: error => {
      console.log("CHANGE LEVERAGE ERROR:", error);
    },
  });
};

// Send MT5 Data List to Email
export const useSendVerificationMailMT5Mutation = () => {
  return useMutation({
    mutationFn: sendVerificationMailMT5,
    onSuccess: data => {
      console.log("SEND VERIFICATION MAIL SUCCESS:", data);
    },
    onError: error => {
      console.log("SEND VERIFICATION MAIL ERROR:", error);
    },
  });
};

export const useChangeMT5PasswordRequestStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeMT5PasswordRequestStatus,
    onSuccess: response => {
      let successMessage = "Status updated successfully";
      try {
        if (typeof response?.result === "string") {
          const decryptedResult = decryptData(response.result);
          console.log("DECRYPTED RESULT:", decryptedResult);
          successMessage =
            decryptedResult?.data?.result || decryptedResult?.result || successMessage;
        }
      } catch (error) {
        console.log("DECRYPT ERROR:", error);
      }
      toast.success(successMessage);
      // Pending List Refresh
      queryClient.invalidateQueries({
        queryKey: ["mt5-password-request"],
      });
      // Accepted List Refresh
      queryClient.invalidateQueries({
        queryKey: ["mt5-password-accepted"],
      });
      // Rejected List Refresh
      queryClient.invalidateQueries({
        queryKey: ["mt5-password-rejected"],
      });
      console.log("MT5 PASSWORD STATUS UPDATED:", response);
    },
    onError: error => {
      toast.error(error?.message || "Something went wrong");
      console.log("MT5 PASSWORD STATUS ERROR:", error);
    },
  });
};

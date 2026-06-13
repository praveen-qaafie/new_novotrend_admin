import { decryptData } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addEmployee, deleteEmployeeDetails, editEmployeeDetails } from "./employee.service";

export const useAddEmployeeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    onSuccess: response => {
      let successMessage = "Employee created successfully";
      if (typeof response?.result === "string") {
        try {
          const decryptedResult = decryptData(response.result);
          successMessage =
            decryptedResult?.data?.result || decryptedResult?.result || successMessage;
        } catch (error) {
          console.log("Decrypt Error:", error);
        }
      }
      toast.success(successMessage);
      queryClient.invalidateQueries({
        queryKey: ["admin-staff-list"],
      });
      console.log("ADD EMPLOYEE SUCCESS:", response);
    },
    onError: error => {
      toast.error(error?.message || "Something went wrong");
      console.log("ADD EMPLOYEE ERROR:", error);
    },
  });
};

export const useEditEmployeeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editEmployeeDetails,

    onSuccess: response => {
      let successMessage = "Employee updated successfully";

      try {
        if (typeof response?.result === "string") {
          const decryptedResult = decryptData(response.result);

          console.log("DECRYPTED RESULT:", decryptedResult);

          successMessage =
            decryptedResult?.data?.result || decryptedResult?.result || successMessage;
        }
      } catch (error) {
        console.log("RESULT DECRYPT ERROR:", error);
      }

      toast.success(successMessage);

      queryClient.invalidateQueries({
        queryKey: ["admin-staff-list"],
      });

      console.log("EDIT EMPLOYEE SUCCESS:", response);
    },

    onError: error => {
      toast.error(error?.message || "Something went wrong");

      console.log("EDIT EMPLOYEE ERROR:", error);
    },
  });
};

export const useDeleteEmployeeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployeeDetails,

    onSuccess: response => {
      let successMessage = "Employee deleted successfully";

      try {
        if (typeof response?.result === "string") {
          const decryptedResult = decryptData(response.result);
          console.log("DECRYPTED RESULT:", decryptedResult);
          successMessage =
            decryptedResult?.data?.result || decryptedResult?.result || successMessage;
        }
      } catch (error) {
        console.log("DELETE RESULT DECRYPT ERROR:", error);
      }
      toast.success(successMessage);
      queryClient.invalidateQueries({
        queryKey: ["admin-staff-list"],
      });

      console.log("DELETE EMPLOYEE SUCCESS:", response);
    },
    onError: error => {
      toast.error(error?.message || "Failed to delete employee");

      console.log("DELETE EMPLOYEE ERROR:", error);
    },
  });
};

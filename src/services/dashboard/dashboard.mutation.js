import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { assignDashboardTicket } from "./dashboard.service";

export const useAssignDashboardTicketMutation = () => {
  return useMutation({
    mutationFn: assignDashboardTicket,
    onSuccess: data => {
      console.log("ASSIGN DASHBOARD TICKET SUCCESS:", data);
      toast.success(data?.result || "Ticket assigned successfully");
    },
    onError: error => {
      console.log("ASSIGN DASHBOARD TICKET ERROR:", error);
      toast.error(error?.message || "Unable to assign support ticket");
    },
  });
};

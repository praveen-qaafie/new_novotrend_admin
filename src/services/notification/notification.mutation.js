import { useMutation } from "@tanstack/react-query";
import { markUserLogAsRead } from "./notification.service";

export const useMarkUserLogAsReadMutation = () => {
  return useMutation({
    mutationFn: markUserLogAsRead,
    onSuccess: data => {
      console.log("MARK USER LOG AS READ SUCCESS:", data);
    },
    onError: error => {
      console.log("MARK USER LOG AS READ ERROR:", error);
    },
  });
};

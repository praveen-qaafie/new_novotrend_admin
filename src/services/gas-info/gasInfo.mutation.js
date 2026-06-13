import { useMutation } from "@tanstack/react-query";
import { addGasInfo } from "./gasInfo.service";

export const useAddGasInfoMutation = () => {
  return useMutation({
    mutationFn: addGasInfo,
    onSuccess: data => {
      console.log("ADD GAS INFO SUCCESS:", data);
    },
    onError: error => {
      console.log("ADD GAS INFO ERROR:", error);
    },
  });
};

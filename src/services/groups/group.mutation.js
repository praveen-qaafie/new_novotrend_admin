import { useMutation } from "@tanstack/react-query";
import { addMT5Group, editMT5Group, updateMT5Group } from "./group.service";

// ADD MT5 GROUP
export const useAddMT5GroupMutation = () => {
  return useMutation({
    mutationFn: addMT5Group,
    onSuccess: data => {
      console.log("ADD GROUP SUCCESS:", data);
    },
    onError: error => {
      console.log("ADD GROUP ERROR:", error);
    },
  });
};

// EDIT MT5 GROUP
export const useEditMT5GroupMutation = () => {
  return useMutation({
    mutationFn: editMT5Group,

    onSuccess: data => {
      console.log("EDIT GROUP SUCCESS:", data);
    },

    onError: error => {
      console.log("EDIT GROUP ERROR:", error);
    },
  });
};

// UPDATE MT5 GROUP
export const useUpdateMT5GroupMutation = () => {
  return useMutation({
    mutationFn: updateMT5Group,
    onSuccess: data => {
      console.log("UPDATE GROUP SUCCESS:", data);
    },
    onError: error => {
      console.log("UPDATE GROUP ERROR:", error);
    },
  });
};

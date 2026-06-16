"use client";

import FormInput from "@/components/common/forms/FormInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { decryptData } from "@/lib/utils";
import { useWalletRequestMutation } from "@/services/walletrequest/wallet.mutation";
import { useState } from "react";
import { toast } from "sonner";

export default function WalletAcceptedRequest({ open, onOpenChange, selectedRequest, actionType }) {
  const [remark, setRemark] = useState("");

  const { mutate: walletAction, isPending } = useWalletRequestMutation();

  const handleSubmit = () => {
        if (!remark?.trim()) {
      toast.error("Remark is required");
      return;
    }
    walletAction(
      {
        id: selectedRequest?.req_id,
        transid: selectedRequest?.transaction_id,
        remark,
        status: actionType === "accept" ? "1" : "2",
      },
      {
        onSuccess: data => {
                    let message = "Request updated successfully";
          try {
            const decryptedResult = decryptData(data?.result);
            message = decryptedResult?.data?.result || decryptedResult?.result || message;
          } catch (error) {
                        message = data?.result || message;
          }
          toast.success(message);

          setRemark("");
          onOpenChange(false);
        },
        onError: error => {
          toast.error(error?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-hidden rounded-3xl border border-border bg-background p-0">
        <DialogHeader className="border-b border-border px-8 py-6">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {actionType === "accept" ? "Accept Wallet Request" : "Reject Wallet Request"}
          </DialogTitle>

          <DialogDescription className="pt-2 text-sm text-muted-foreground">
            {actionType === "accept"
              ? "Enter remark for accepting this wallet request."
              : "Enter remark for rejecting this wallet request."}
          </DialogDescription>
        </DialogHeader>

        <div className="px-8 py-8">
          <FormInput
            label="Enter Remark"
            placeholder="Enter remark..."
            value={remark}
            onChange={e => setRemark(e.target.value)}
          />
        </div>

        <DialogFooter className="flex flex-col-reverse gap-3 border-t border-border px-8 py-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-11 cursor-pointer rounded-2xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all hover:bg-muted"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="h-11 rounded-2xl bg-primary px-6 text-sm font-semibold text-white"
          >
            {isPending ? "Processing..." : "Submit"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

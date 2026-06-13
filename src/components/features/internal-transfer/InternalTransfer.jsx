"use client";

import { useState } from "react";
import { toast } from "sonner";

import FormInput from "@/components/common/forms/FormInput";
import FormSection from "@/components/common/forms/FormSection";
import FormSubmit from "@/components/common/forms/FormSubmit";

import { internalTransferSchema } from "@/services/internal-transfer/internal-transfer.validation";
import { useCreateInternalTransferMutation } from "@/services/internal-transfer/internal-transfer.query";
import { useGetUsernameByEmailMutation } from "@/services/users/user.mutation";

export default function InternalTransfer() {
  const [errors, setErrors] = useState({});
  const [senderVerified, setSenderVerified] = useState(null);
  const [receiverVerified, setReceiverVerified] = useState(null);

  const [senderVerifyError, setSenderVerifyError] = useState("");
  const [receiverVerifyError, setReceiverVerifyError] = useState("");

  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    amount: "",
    comment: "",
  });

  const transferMutation = useCreateInternalTransferMutation();
  const senderVerifyMutation = useGetUsernameByEmailMutation();
  const receiverVerifyMutation = useGetUsernameByEmailMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "sender") {
      setSenderVerified(null);
      setSenderVerifyError("");
    }

    if (name === "receiver") {
      setReceiverVerified(null);
      setReceiverVerifyError("");
    }
  };

  const handleVerifySender = async () => {
    if (!formData.sender?.trim()) return;

    try {
      setSenderVerifyError("");
      const response = await senderVerifyMutation.mutateAsync({
        email: formData.sender,
      });
      setSenderVerified(response);
    } catch (error) {
      setSenderVerified(null);
      setSenderVerifyError(error?.message || "Sender not found");
    }
  };

  const handleVerifyReceiver = async () => {
    if (!formData.receiver?.trim()) return;

    try {
      setReceiverVerifyError("");
      const response = await receiverVerifyMutation.mutateAsync({
        email: formData.receiver,
      });
      setReceiverVerified(response);
    } catch (error) {
      setReceiverVerified(null);
      setReceiverVerifyError(error?.message || "Receiver not found");
    }
  };

  const handleSubmit = async () => {
    setErrors({});

    const validation = internalTransferSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = {};

      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    if (!senderVerified) {
      setSenderVerifyError("Please verify sender email");
      return;
    }

    if (!receiverVerified) {
      setReceiverVerifyError("Please verify receiver email");
      return;
    }

    if (
      formData.sender.trim().toLowerCase() ===
      formData.receiver.trim().toLowerCase()
    ) {
      setReceiverVerifyError("Sender and Receiver cannot be same");
      return;
    }

    try {
      await transferMutation.mutateAsync(formData);
      toast.success("Internal transfer created successfully");
      setFormData({
        sender: "",
        receiver: "",
        amount: "",
        comment: "",
      });

      setErrors({});
      setSenderVerified(null);
      setReceiverVerified(null);
      setSenderVerifyError("");
      setReceiverVerifyError("");
    } catch (error) {
      toast.error(error?.message || "Failed to create internal transfer");
    }
  };

  return (
    <FormSection title="Internal Transfer">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <FormInput
            label="Sender Email"
            placeholder="Enter Sender Email"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            onBlur={handleVerifySender}
            error={errors.sender || senderVerifyError}
          />

          {senderVerifyMutation.isPending && (
            <p className="mt-1 text-xs text-blue-500">Verifying sender...</p>
          )}

          {senderVerified && (
            <p className="mt-1 text-xs text-green-600">
              {senderVerified?.response?.user_name}
            </p>
          )}
        </div>

        <div>
          <FormInput
            label="Receiver Email"
            placeholder="Enter Receiver Email"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            onBlur={handleVerifyReceiver}
            error={errors.receiver || receiverVerifyError}
          />

          {receiverVerifyMutation.isPending && (
            <p className="mt-1 text-xs text-blue-500">Verifying receiver...</p>
          )}

          {receiverVerified && (
            <p className="mt-1 text-xs text-green-600">
              {receiverVerified?.response?.user_name}
            </p>
          )}
        </div>

        <FormInput
          label="Amount"
          min="0"
          onWheel={(e) => e.target.blur()}
          placeholder="Enter Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
        />

        <FormInput
          label="Comment"
          placeholder="Enter Comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          error={errors.comment}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <FormSubmit
          title={transferMutation.isPending ? "Submitting..." : "Submit"}
          onClick={handleSubmit}
          disabled={
            transferMutation.isPending ||
            senderVerifyMutation.isPending ||
            receiverVerifyMutation.isPending
          }
        />
      </div>
    </FormSection>
  );
}

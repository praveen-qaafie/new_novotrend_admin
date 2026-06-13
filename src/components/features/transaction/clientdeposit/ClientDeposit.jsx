"use client";

import { useState } from "react";
import { toast } from "sonner";

import FormInput from "@/components/common/forms/FormInput";
import FormSection from "@/components/common/forms/FormSection";
import FormSelect from "@/components/common/forms/FormSelect";
import FormSubmit from "@/components/common/forms/FormSubmit";
import { depositSchema } from "@/services/transaction/transaction.validation";

import { useCreateClientDepositMutation } from "@/services/transaction/transaction.query";
import { useGetUsernameByEmailMutation } from "@/services/users/user.mutation";

export default function ClientDeposit() {
  const [errors, setErrors] = useState({});
  const [emailVerificationError, setEmailVerificationError] = useState("");
  const [verifiedUser, setVerifiedUser] = useState(null);

  const [formData, setFormData] = useState({
    usercode: "",
    amount: "",
    comment: "",
    paymethod: "",
    transid: "",
  });

  const depositMutation = useCreateClientDepositMutation();
  const verifyEmailMutation = useGetUsernameByEmailMutation();

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

    if (name === "usercode") {
      setVerifiedUser(null);
      setEmailVerificationError("");
    }
  };

  const handlePaymentMethod = (value) => {
    setFormData((prev) => ({
      ...prev,
      paymethod: value,
    }));

    setErrors((prev) => ({
      ...prev,
      paymethod: "",
    }));
  };

  const handleVerifyEmail = async () => {
    if (!formData.usercode) return;
    const emailValidation = depositSchema.shape.usercode.safeParse(
      formData.usercode,
    );

    if (!emailValidation.success) {
      return;
    }

    try {
      setEmailVerificationError("");
      const response = await verifyEmailMutation.mutateAsync({
        email: formData.usercode,
      });
      setVerifiedUser(response);

      toast.success("Email verified successfully");
    } catch (error) {
      setVerifiedUser(null);

      setEmailVerificationError(error?.message || "User not found");
    }
  };

  const handleSubmit = async () => {
    const validation = depositSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!verifiedUser) {
      setEmailVerificationError("Please verify email before submitting");
      return;
    }

    try {
      await depositMutation.mutateAsync(formData);
      toast.success("Deposit created successfully");
      setFormData({
        usercode: "",
        amount: "",
        comment: "",
        paymethod: "",
        transid: "",
      });

      setErrors({});
      setVerifiedUser(null);
      setEmailVerificationError("");
    } catch (error) {
      toast.error(error?.message || "Failed to create deposit");
    }
  };

  return (
    <FormSection
      title="Generate Client Deposit"
      description="Create new MT5 trading group"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <FormInput
            label="Enter Email"
            placeholder="Enter Email"
            name="usercode"
            value={formData.usercode}
            onChange={handleChange}
            onBlur={handleVerifyEmail}
            error={errors.usercode || emailVerificationError}
          />

          {verifyEmailMutation.isPending && (
            <p className="mt-1 text-xs text-blue-500">Verifying email...</p>
          )}

          {verifiedUser && (
            <p className="mt-1 text-xs text-green-600">
              Email verified successfully
            </p>
          )}
        </div>

        <FormInput
          label="Enter Amount (USD)"
          placeholder="Enter amount in usd"
          name="amount"
          type="number"
          min="0"
          onWheel={(e) => e.target.blur()}
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
        />

        <FormInput
          label="Enter Comment"
          placeholder="Enter comments"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          error={errors.comment}
        />

        <FormSelect
          label="Payment Method"
          placeholder="Select payment method"
          value={formData.paymethod}
          onValueChange={handlePaymentMethod}
          error={errors.paymethod}
          options={[
            { label: "Bank", value: "Bank" },
            { label: "Cash", value: "Cash" },
            { label: "Crypto", value: "Crypto" },
          ]}
        />

        <FormInput
          label="Transaction ID"
          placeholder="Enter Transaction ID"
          name="transid"
          value={formData.transid}
          onChange={handleChange}
          error={errors.transid}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <FormSubmit
          title={depositMutation.isPending ? "Submitting..." : "Submit"}
          onClick={handleSubmit}
          disabled={depositMutation.isPending || verifyEmailMutation.isPending}
        />
      </div>
    </FormSection>
  );
}

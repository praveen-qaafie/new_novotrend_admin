"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import FormInput from "@/components/common/forms/FormInput";
import FormSection from "@/components/common/forms/FormSection";
import FormSelect from "@/components/common/forms/FormSelect";
import FormSubmit from "@/components/common/forms/FormSubmit";

import { useVerifyUserEmail } from "@/hooks/useVerifyUserEmail";
import { decryptData } from "@/lib/utils";

import { useGetMT5GroupListQuery } from "@/services/groups/group.query";
import { useCreateMT5AccountMutation } from "@/services/users/user.mutation";

const leverageOptions = ["10", "50", "100", "200", "300", "400", "500", "1000"];

export default function CreateMT5Account() {
  const {
    verifyEmail,
    verifiedUser,
    emailVerified,
    isPending: verifying,
    resetVerification,
  } = useVerifyUserEmail();

  const { register, watch, handleSubmit, setValue, reset } = useForm();

  const email = watch("email");

  const [debouncedEmail] = useDebounce(email, 600);

  // AUTO VERIFY EMAIL
  useEffect(() => {
    verifyEmail(debouncedEmail);
  }, [debouncedEmail]);

  // CREATE ACCOUNT
  const { mutate: createAccount, isPending } = useCreateMT5AccountMutation();

  // GROUP LIST
  const { data: groupData } = useGetMT5GroupListQuery();

  const groupOptions =
    groupData?.response?.group_list
      ?.filter(group => group.status?.toLowerCase() === "active")
      ?.map(group => ({
        label: group.name,
        value: group.id,
      })) || [];

  // SUBMIT
  const onSubmit = values => {
    createAccount(
      {
        email,
        selectgroup: values.selectgroup,
        accleverage: values.accleverage,
        mainpassword: values.mainpassword,
        investorpassword: values.investorpassword,
      },
      {
        onSuccess: response => {
          
          let successMessage = response?.result;

          try {
            if (typeof response?.result === "string") {
              const decryptedResult = decryptData(response.result);

              
              successMessage = decryptedResult?.data?.result || decryptedResult;
            }
          } catch (err) {
                      }

          toast.success(successMessage || "MT5 Account created successfully");

          reset();
          resetVerification();
        },

        onError: error => {
          
          toast.error(error?.message || "Failed to create MT5 account");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <FormSection
        title="Create MT5 Account"
        description="Generate and manage new MT5 trading accounts"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* EMAIL */}
            <div>
              <FormInput
                label="Enter Email"
                type="email"
                placeholder="Enter registered email"
                {...register("email", {
                  required: true,
                })}
              />

              {verifying && <p className="mt-2 text-sm text-primary">Checking email...</p>}

              {emailVerified === true && (
                <p className="mt-2 text-sm font-medium text-green-600">✓ {verifiedUser}</p>
              )}

              {emailVerified === false && (
                <p className="mt-2 text-sm font-medium text-red-500">Invalid Email</p>
              )}
            </div>

            {/* GROUP */}
            <FormSelect
              label="Select Group"
              placeholder={
                groupOptions.length ? "Choose account group" : "No active groups available"
              }
              options={groupOptions}
              disabled={!verifiedUser}
              onValueChange={v => setValue("selectgroup", v)}
            />

            {/* LEVERAGE */}
            <FormSelect
              label="Select Leverage"
              placeholder="Choose leverage"
              options={leverageOptions}
              disabled={!verifiedUser}
              onValueChange={v => setValue("accleverage", v)}
            />

            {/* MAIN PASSWORD */}
            <FormInput
              label="Enter Main Password"
              type="password"
              placeholder="Enter main password"
              disabled={!verifiedUser}
              {...register("mainpassword")}
            />

            {/* INVESTOR PASSWORD */}
            <FormInput
              label="Enter Investor Password"
              type="password"
              placeholder="Enter investor password"
              disabled={!verifiedUser}
              {...register("investorpassword")}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <FormSubmit title="Create Account" disabled={!verifiedUser || isPending} />
          </div>
        </form>
      </FormSection>
    </div>
  );
}

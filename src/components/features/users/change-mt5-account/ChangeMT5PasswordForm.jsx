"use client";

import FormInput from "@/components/common/forms/FormInput";
import FormSection from "@/components/common/forms/FormSection";
import FormSelect from "@/components/common/forms/FormSelect";
import FormSubmit from "@/components/common/forms/FormSubmit";
import { useVerifyUserEmail } from "@/hooks/useVerifyUserEmail";
import {
  useChangeMT5PasswordMutation,
  useGetMT5AccountByEmailMutation,
} from "@/services/users/user.mutation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

const typeOptions = ["Both", "Main Password", "Investor Password"];

export default function ChangeMT5PasswordForm() {
  const [mt5Accounts, setMT5Accounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const { register, watch, handleSubmit, reset } = useForm();
  const email = watch("email");
  const [debouncedEmail] = useDebounce(email, 600);
  const { mutate: fetchAccounts, isPending: accountLoading } = useGetMT5AccountByEmailMutation();

  const {
    verifyEmail,
    verifiedUser,
    emailVerified,
    isPending: verifying,
    resetVerification,
  } = useVerifyUserEmail();

  useEffect(() => {
    if (!debouncedEmail?.trim()) {
      setMT5Accounts([]);
      setSelectedAccount("");
      return;
    }
    verifyEmail(debouncedEmail, () => {
      fetchAccounts(
        { email: debouncedEmail },
        {
          onSuccess: accountData => {
            const accounts =
              accountData?.response?.accounts?.map(item => ({
                label: item.accno,
                value: item.accno,
              })) || [];

            setMT5Accounts(accounts);
          },
          onError: () => {
            setMT5Accounts([]);
            setSelectedAccount("");
          },
        }
      );
    });
  }, [debouncedEmail]);

  useEffect(() => {
    if (emailVerified === false) {
      setMT5Accounts([]);
      setSelectedAccount("");
    }
  }, [emailVerified]);
  // change mt5 password mutation (to be implemented)
  const { mutate: changePassword, isPending: changingPassword } = useChangeMT5PasswordMutation();

  const handleChangePassword = data => {
    changePassword(
      {
        accountnumber: selectedAccount,
        passwordtype:
          selectedType === "Both" ? "both" : selectedType === "Main Password" ? "main" : "investor",
        mainpassword: data.mainpassword,
        investorpassword: data.investorpassword,
      },
      {
        onSuccess: () => {
          resetVerification();
          setMT5Accounts([]);
          setSelectedAccount("");
          setSelectedType("");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <FormSection
        title="Change MT5 Password"
        description="Manage and update MT5 trading account passwords"
      >
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <FormInput
                label="Enter Email"
                type="email"
                placeholder="Enter registered email"
                {...register("email")}
              />

              {verifying && <p className="mt-2 text-sm text-primary">Checking email...</p>}

              {emailVerified === true && (
                <p className="mt-2 text-sm font-medium text-green-500">✓ {verifiedUser}</p>
              )}

              {emailVerified === false && (
                <p className="mt-2 text-sm font-medium text-red-500">Invalid Email</p>
              )}
            </div>
            <FormSelect
              label="Select Account"
              placeholder={
                accountLoading
                  ? "Loading accounts..."
                  : mt5Accounts.length
                    ? "Choose MT5 account"
                    : "No accounts found"
              }
              options={mt5Accounts}
              disabled={!emailVerified || accountLoading}
              value={selectedAccount}
              onValueChange={setSelectedAccount}
            />
            <FormSelect
              label="Select Type"
              placeholder="Choose password type"
              options={typeOptions}
              value={selectedType}
              onValueChange={setSelectedType}
            />
            {selectedType === "Both" && (
              <>
                <FormInput
                  label="Main Password"
                  type="password"
                  placeholder="Enter main password"
                  {...register("mainpassword")}
                />

                <FormInput
                  label="Investor Password"
                  type="password"
                  placeholder="Enter investor password"
                  {...register("investorpassword")}
                />
              </>
            )}
            {selectedType === "Main Password" && (
              <FormInput
                label="Main Password"
                type="password"
                placeholder="Enter main password"
                {...register("mainpassword")}
              />
            )}
            {selectedType === "Investor Password" && (
              <FormInput
                label="Investor Password"
                type="password"
                placeholder="Enter investor password"
                {...register("investorpassword")}
              />
            )}
          </div>
          <div className="mt-8 flex justify-end">
            <div className="mt-8 flex justify-end">
              <FormSubmit
                title={changingPassword ? "Changing..." : "Change Password"}
                disabled={!emailVerified || !selectedAccount || !selectedType}
              />
            </div>
          </div>
        </form>
      </FormSection>
    </div>
  );
}

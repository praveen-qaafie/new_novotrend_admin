"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "@/components/common/forms/FormInput";
import FormSection from "@/components/common/forms/FormSection";
import FormSelect from "@/components/common/forms/FormSelect";
import FormSubmit from "@/components/common/forms/FormSubmit";

import { useCountryListQuery } from "@/services/country/conuntry.query";
import { useAddBankAccountMutation } from "@/services/userkyc/userkyc.mutation";
import { useGetUsernameByEmailMutation } from "@/services/users/user.mutation";

export default function AddEditBankKyc() {
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [bankImage, setBankImage] = useState(null);

  const { register, watch, handleSubmit, reset } = useForm();

  const email = watch("email");

  const { data } = useCountryListQuery();

  const countryList = data?.response || [];

  const countryOptions = countryList.map(country => ({
    label: country.country_name,
    value: String(country.country_id),
  }));

  const { mutate: verifyEmail } = useGetUsernameByEmailMutation();

  const { mutate: addBankAccountMutation, isPending } = useAddBankAccountMutation();

  const handleVerifyEmail = () => {
    if (!email?.trim()) return;

    verifyEmail(
      { email },
      {
        onSuccess: data => {
          console.log("ADD BANK VERIFY USER RESPONSE:", data);
          setVerifiedUser(data?.response || null);
        },
        onError: () => {
          setVerifiedUser(null);
        },
      }
    );
  };

  const onSubmit = values => {
    const formData = new FormData();
    const userId =
      typeof verifiedUser === "object"
        ? verifiedUser?.user_id || verifiedUser?.id || verifiedUser?.userid || ""
        : "";

    formData.append("user_id", userId);
    formData.append("bankname", values.bankname);
    formData.append("accnumber", values.accnumber);
    formData.append("ifsccode", values.ifsccode);
    formData.append("ibannumber", values.ibannumber);
    formData.append("bankaddress", values.bankaddress);
    formData.append("country", selectedCountry);

    // image
    if (bankImage) {
      formData.append("bankphoto", bankImage);
    }

    addBankAccountMutation(formData, {
      onSuccess: () => {
        reset();
        setSelectedCountry("");
        setVerifiedUser(null);
        setBankImage(null);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Add / Edit Bank KYC" description="Manage user bank verification details">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <FormInput
              label="Enter Email"
              type="email"
              placeholder="Enter user email"
              {...register("email")}
              onBlur={handleVerifyEmail}
            />

            {verifiedUser && (
              <p className="mt-2 text-sm font-medium text-green-500">
                {typeof verifiedUser === "string"
                  ? verifiedUser
                  : verifiedUser.user_name ||
                    verifiedUser.name ||
                    verifiedUser.email ||
                    "User verified"}
              </p>
            )}
          </div>
          <FormInput
            label="Account Number"
            placeholder="Enter account number"
            {...register("accnumber")}
          />

          <FormInput
            label="IFSC / Swift Code"
            placeholder="Enter IFSC or Swift code"
            {...register("ifsccode")}
          />

          <FormInput
            label="IBAN Number"
            placeholder="Enter IBAN number"
            {...register("ibannumber")}
          />

          <FormInput label="Bank Name" placeholder="Enter bank name" {...register("bankname")} />

          <FormInput
            label="Bank Address"
            placeholder="Enter bank address"
            {...register("bankaddress")}
          />

          <FormSelect
            label="Select Country"
            placeholder="Select Country"
            options={countryOptions}
            value={selectedCountry}
            onValueChange={setSelectedCountry}
          />

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Bank Book Photo</label>
            <div className="flex min-h-[120px] items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-8">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Upload Bank Book Photo</p>

                <p className="mt-1 text-xs text-muted-foreground">PNG, JPG or PDF supported</p>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={e => setBankImage(e.target.files?.[0] || null)}
                  className="mt-4 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <FormSubmit
            type="submit"
            disabled={isPending}
            title={isPending ? "Submitting..." : "Submit"}
          />
        </div>
      </FormSection>
    </form>
  );
}

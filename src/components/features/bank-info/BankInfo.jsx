"use client";

import { useState } from "react";
import { toast } from "sonner";
import FormInput from "@/components/common/forms/FormInput";
import FormSection from "@/components/common/forms/FormSection";
import FormSubmit from "@/components/common/forms/FormSubmit";
import { bankInfoSchema } from "@/services/bank-info/bank-info.validation";
import { useAddBankInfoMutation } from "@/services/bank-info/bank-info.service";

export default function BankInfo() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    bankname: "",
    accname: "",
    accno: "",
    ifsc: "",
    iban_number: "",
  });

  const addBankMutation = useAddBankInfoMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "accno" && value && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    const validation = bankInfoSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await addBankMutation.mutateAsync(formData);
      toast.success("Bank details added successfully");
      setFormData({
        bankname: "",
        accname: "",
        accno: "",
        ifsc: "",
        iban_number: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to add bank details",
      );
    }
  };

  return (
    <FormSection
      title="Company Bank Details"
      description="Add company bank information"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormInput
          label="Bank Name"
          placeholder="Enter Bank Name"
          name="bankname"
          value={formData.bankname}
          onChange={handleChange}
          error={errors.bankname}
        />

        <FormInput
          label="Account Holder Name"
          placeholder="Enter Account Holder Name"
          name="accname"
          value={formData.accname}
          onChange={handleChange}
          error={errors.accname}
        />

        <FormInput
          label="Account Number"
          placeholder="Enter Account Number"
          name="accno"
          value={formData.accno}
          onChange={handleChange}
          error={errors.accno}
          inputMode="numeric"
        />

        <FormInput
          label="IBAN Number"
          placeholder="Enter IBAN Number"
          name="iban_number"
          value={formData.iban_number}
          onChange={handleChange}
          error={errors.iban_number}
        />

        <FormInput
          label="Swift/IFSC Code"
          placeholder="Enter Swift/IFSC Code"
          name="ifsc"
          value={formData.ifsc}
          onChange={handleChange}
          error={errors.ifsc}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <FormSubmit
          title={addBankMutation.isPending ? "Submitting..." : "Submit"}
          onClick={handleSubmit}
          disabled={addBankMutation.isPending}
        />
      </div>
    </FormSection>
  );
}

// "use client";

// import { useState, useEffect } from "react";

// import FormInput from "@/components/common/forms/FormInput";
// import FormSection from "@/components/common/forms/FormSection";
// import FormSubmit from "@/components/common/forms/FormSubmit";

// import { bankInfoSchema } from "@/services/bank-info/bank-info.validation";
// import {
//   useGetBankInfoQuery,
//   useAddBankInfoMutation,
// } from "@/services/bank-info/bank-info.service";

// const EMPTY_FORM = {
//   bankname: "",
//   accname: "",
//   accno: "",
//   ifsc: "",
//   iban_number: "",
// };

// export default function BankInfo() {
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState(EMPTY_FORM);
//   const [isEdited, setIsEdited] = useState(false);

//   const { data: bankData, isLoading } = useGetBankInfoQuery();
//   const addBankMutation = useAddBankInfoMutation();

//   // Populate form when GET data arrives
//   useEffect(() => {
//     if (bankData?.data) {
//       const { bankname, accname, accno, ifsc, iban_number } = bankData.data;
//       setFormData({ bankname, accname, accno, ifsc, iban_number });
//       setIsEdited(false);
//     }
//   }, [bankData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "accno" && value && !/^\d*$/.test(value)) return;

//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//     setIsEdited(true);
//   };

//   const handleSubmit = async () => {
//     const validation = bankInfoSchema.safeParse(formData);

//     if (!validation.success) {
//       const fieldErrors = {};
//       validation.error.issues.forEach((issue) => {
//         fieldErrors[issue.path[0]] = issue.message;
//       });
//       setErrors(fieldErrors);
//       return;
//     }

//     try {
//       await addBankMutation.mutateAsync(formData);
//       setIsEdited(false);
//       setErrors({});
//     } catch {
//       // error handled in mutation's onError
//     }
//   };

//   const isSubmitDisabled = addBankMutation.isPending || !isEdited;

//   return (
//     <FormSection
//       title="Company Bank Details"
//       description="Add company bank information"
//     >
//       {isLoading ? (
//         <p className="text-sm text-muted-foreground">Loading bank details...</p>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//             <FormInput
//               label="Bank Name"
//               placeholder="Enter Bank Name"
//               name="bankname"
//               value={formData.bankname}
//               onChange={handleChange}
//               error={errors.bankname}
//             />

//             <FormInput
//               label="Account Holder Name"
//               placeholder="Enter Account Holder Name"
//               name="accname"
//               value={formData.accname}
//               onChange={handleChange}
//               error={errors.accname}
//             />

//             <FormInput
//               label="Account Number"
//               placeholder="Enter Account Number"
//               name="accno"
//               value={formData.accno}
//               onChange={handleChange}
//               error={errors.accno}
//               inputMode="numeric"
//             />

//             <FormInput
//               label="IBAN Number"
//               placeholder="Enter IBAN Number"
//               name="iban_number"
//               value={formData.iban_number}
//               onChange={handleChange}
//               error={errors.iban_number}
//             />

//             <FormInput
//               label="Swift/IFSC Code"
//               placeholder="Enter Swift/IFSC Code"
//               name="ifsc"
//               value={formData.ifsc}
//               onChange={handleChange}
//               error={errors.ifsc}
//             />
//           </div>

//           <div className="mt-8 flex justify-end">
//             <FormSubmit
//               title={addBankMutation.isPending ? "Submitting..." : "Submit"}
//               onClick={handleSubmit}
//               disabled={isSubmitDisabled}
//             />
//           </div>
//         </>
//       )}
//     </FormSection>
//   );
// }

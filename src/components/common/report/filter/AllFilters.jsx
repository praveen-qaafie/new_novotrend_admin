"use client";

import FormInput from "@/components/common/forms/FormInput";
import FormSelect from "@/components/common/forms/FormSelect";
import { Button } from "@/components/ui/button";

export default function AllFilters({
  values = {},
  onChange,
  onSubmit,
  onReset,
  showEmail = false,
  showStartDate = false,
  showEndDate = false,
  showPayment = false,
  showStatus = false,
  paymentOptions = [],
  statusOptions = [],
}) {
  return (
    <div className="rounded-4xl border border-border bg-card p-6 shadow-sm">
      {/* FILTER GRID */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {showEmail && (
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter email"
            value={values.email || ""}
            onChange={e => onChange?.("email", e.target.value)}
          />
        )}

        {showStartDate && (
          <FormInput
            label="Start Date"
            type="date"
            value={values.start_date || ""}
            onChange={e => onChange?.("start_date", e.target.value)}
          />
        )}

        {showEndDate && (
          <FormInput
            label="End Date"
            type="date"
            value={values.end_date || ""}
            onChange={e => onChange?.("end_date", e.target.value)}
          />
        )}

        {showPayment && (
          <FormSelect
            label="Payment"
            placeholder="Select payment"
            options={paymentOptions}
            value={values.payment || ""}
            onValueChange={value => onChange?.("payment", value)}
          />
        )}

        {showStatus && (
          <FormSelect
            label="Status"
            placeholder="Select status"
            options={statusOptions}
            value={values.status || ""}
            onValueChange={value => onChange?.("status", value)}
          />
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex justify-end gap-3">
        {onReset && (
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        )}

        {onSubmit && (
          <Button variant="default" onClick={onSubmit}>
            Apply Filter
          </Button>
        )}
      </div>
    </div>
  );
}

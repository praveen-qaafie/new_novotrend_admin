"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MT5AccountDetailsModal({ open, onOpenChange, user }) {
  const accountDetails = [
    { label: "Login", value: user?.mt5_id || " - " },
    { label: "Currency Digits", value: "0" },
    { label: "Created At", value: user?.generate_date || " - " },
    { label: "Balance", value: "0" },
    { label: "Margin Leverage", value: user?.leverages || "0" },
    { label: "Leverage", value: user?.leverages || "0" },
    { label: "Credit", value: "0" },
    { label: "Profit", value: "0" },
    { label: "Assets", value: "0" },
    { label: "Margin", value: "0" },
    { label: "Equity", value: "0" },
    { label: "Equity Prev Day", value: user?.wallet_balance || 0 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          // max-w-6xl
          rounded-[32px]
          border
          border-border
          bg-white
          p-0
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
        "
      >
        <DialogHeader
          className="
            border-b
            border-border
            px-10
            py-7
          "
        >
          <DialogTitle
            className="
              text-[34px]
              font-bold
              tracking-tight
              text-foreground
            "
          >
            MT5 Account Details
          </DialogTitle>

          <DialogDescription
            className="
              mt-2
              text-base
              text-muted-foreground
            "
          >
            View complete MT5 account information
          </DialogDescription>
        </DialogHeader>

        <div
          className="
            grid
            grid-cols-2
            gap-6
            px-10
            py-10
            lg:grid-cols-4
          "
        >
          {accountDetails.map(item => (
            <div key={item.label} className="space-y-3">
              <label
                className="
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                {item.label}
              </label>

              <div
                className="
                  flex
                  h-14
                  items-center
                  rounded-2xl
                  border
                  border-border
                  bg-muted/20
                  px-5
                  text-sm
                  font-medium
                  text-muted-foreground
                "
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

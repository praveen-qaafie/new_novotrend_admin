import { z } from "zod";

export const depositSchema = z.object({
  usercode: z.string().email("Please enter a valid email"),
  paymethod: z.string().min(1, "Please select a payment method"),
  amount: z.string().min(1, "Please enter an amount"),
  comment: z.string().min(1, "Please enter a comment"),
  transid: z.string().min(1, "Please enter a transaction ID or UTR"),
});

// WithdrawalSchema 
export const withdrawalSchema = z.object({
  usercode: z.string().email("Please enter a valid email"),
  paymethod: z.string().min(1, "Please select a payment method"),
  amount: z.string().min(1, "Please enter an amount"),
  comment: z.string().min(1, "Please enter a comment"),
  chainname: z.string().min(1, "Please enter a chain name"),
  wallet_address: z.string().min(1, "Please enter a wallet address"),
});

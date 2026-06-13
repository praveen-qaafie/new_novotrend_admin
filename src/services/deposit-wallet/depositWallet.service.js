import { API_ENDPOINT } from "@/constants/endpoints";
import { securePost } from "@/lib/axios/secureApi";

export const getDepositWallet = async () => {
  console.log("getDepositWallet");

  const token = localStorage.getItem("token");

  console.log("Token getDepositWallet:", token);

  if (!token) {
    throw new Error("Session Expired");
  }

  const payload = {
    token,
  };

  console.log("Get Deposit Wallet Payload:", payload);

  const data = await securePost(API_ENDPOINT.DEPOSIT_WALLET.GET_DEPOSIT_WALLET, payload);

  console.log("Get Deposit Wallet Response:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch deposit wallet");
  }

  return data;
};

export const addDepositWallet = async ({ bep20, trc20, eth20, pol20 }) => {
  console.log("addDepositWallet");

  const token = localStorage.getItem("token");

  console.log("Token addDepositWallet:", token);

  if (!token) {
    throw new Error("Session Expired");
  }

  const payload = {
    token,
    bep20,
    trc20,
    eth20,
    pol20,
  };

  console.log("Add Deposit Wallet Payload:", payload);

  const data = await securePost(API_ENDPOINT.DEPOSIT_WALLET.ADD_DEPOSIT_WALLET, payload);

  console.log("Add Deposit Wallet Response:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to add deposit wallet");
  }

  return data;
};

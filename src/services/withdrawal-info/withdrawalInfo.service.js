import { API_ENDPOINT } from "@/constants/endpoints";
import { securePost } from "@/lib/axios/secureApi";

export const getWithdrawInfo = async ({ type_chain }) => {
  console.log("getWithdrawInfo");

  const token = localStorage.getItem("token");

  console.log("Token getWithdrawInfo:", token);

  if (!token) {
    throw new Error("Session Expired");
  }

  const payload = {
    token,
    type_chain,
  };

  console.log("Get Withdraw Info Payload:", payload);

  const data = await securePost(API_ENDPOINT.WITHDRAWAL_INFO.GET_WITHDRAW_INFO, payload);

  console.log("Get Withdraw Info Response:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch withdraw info");
  }

  return data;
};

export const addWithdrawInfo = async ({ address, key, type_chain }) => {
  console.log("addWithdrawInfo");

  const token = localStorage.getItem("token");

  console.log("Token addWithdrawInfo:", token);

  if (!token) {
    throw new Error("Session Expired");
  }

  const payload = {
    token,
    address,
    key,
    type_chain,
  };

  console.log("Add Withdraw Info Payload:", payload);

  const data = await securePost(API_ENDPOINT.WITHDRAWAL_INFO.ADD_WITHDRAW_INFO, payload);

  console.log("Add Withdraw Info Response:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to add withdraw info");
  }

  return data;
};

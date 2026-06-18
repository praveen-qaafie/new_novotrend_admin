import { API_ENDPOINT } from "../../constants/endpoints";
import { securePost } from "../../lib/axios/secureApi";

// GET WALLET REQUEST LIST
export const getWalletRequestList = async ({ limit = 10, offset = 0, search = "" }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    limit,
    offset,
    search,
  };
  const data = await securePost(API_ENDPOINT.WALLET_REQUEST.LIST_WALLET_REQUEST, payload, {
    logName: "WALLET REQUEST LIST",
  });
  console.log("WALLET REQUEST LIST DECRYPTED RESPONSE:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch wallet requests");
  }
  return data;
};

// ACCEPT WALLET REQUEST
export const acceptWalletRequest = async ({ limit = 10, offset = 0, search = "" }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    limit,
    offset,
    search,
  };
  const data = await securePost(API_ENDPOINT.WALLET_REQUEST.WALLET_ACCEPT_LIST, payload, {
    logName: "ACCEPT WALLET REQUEST LIST",
  });
  console.log("ACCEPT WALLET REQUEST LIST DECRYPTED RESPONSE:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to accept wallet request");
  }
  return data;
};
// rejected list
export const rejectWalletRequest = async ({ limit = 10, offset = 0, search = "" }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    limit,
    offset,
    search,
  };
  const data = await securePost(API_ENDPOINT.WALLET_REQUEST.WALLET_REJECT_LIST, payload, {
    logName: "REJECT WALLET REQUEST LIST",
  });
  console.log("REJECT WALLET REQUEST LIST DECRYPTED RESPONSE:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to rejected wallet request");
  }
  return data;
};

// Wallet action (Accept , Reject)
export const walletActionRemark = async ({ id, status, remark, transid }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    id,
    status, // 1 = Accept, 2 = Reject
    remark,
    transid,
  };
  console.log("WALLET REQUEST ACTION PAYLOAD:", payload);
  const data = await securePost(API_ENDPOINT.WALLET_REQUEST.WALLET_ACTION, payload, {
    logName: "WALLET REQUEST ACTION",
  });
  console.log("WALLET REQUEST ACTION DECRYPTED RESPONSE:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to process wallet request");
  }
  return data;
};

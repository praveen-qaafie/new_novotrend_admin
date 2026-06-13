import { API_ENDPOINT } from "../../constants/endpoints";
import { securePost } from "../../lib/axios/secureApi";

// GET WALLET REQUEST LIST
export const getWalletRequestList = async ({ limit = 10, offset = 0, search = "" }) => {
  console.log("GET WALLET REQUEST LIST API HIT");
  const token = localStorage.getItem("token");
  console.log("Token RequestList:", token);
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    limit,
    offset,
    search,
  };
  console.log("Wallet Request List Payload:", payload);
  const data = await securePost(API_ENDPOINT.WALLET_REQUEST.LIST_WALLET_REQUEST, payload);
  console.log("Wallet Request List Response:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch wallet requests");
  }
  return data;
};

// ACCEPT WALLET REQUEST
export const acceptWalletRequest = async ({ limit = 10, offset = 0, search = "" }) => {
  console.log("ACCEPT WALLET REQUEST API HIT");
  const token = localStorage.getItem("token");
  console.log("Token Accept:", token);
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    limit,
    offset,
    search,
  };
  console.log("Accept Wallet Request Payload:", payload);
  const data = await securePost(API_ENDPOINT.WALLET_REQUEST.WALLET_ACCEPT_LIST, payload);
  console.log("Accept Wallet Request Response:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to accept wallet request");
  }
  return data;
};
// rejected list
export const rejectWalletRequest = async ({ limit = 10, offset = 0, search = "" }) => {
  console.log("rejected WALLET REQUEST API HIT");
  const token = localStorage.getItem("token");
  console.log("Token Accept:", token);
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    limit,
    offset,
    search,
  };
  console.log("Rejected Wallet Request Payload:", payload);
  const data = await securePost(API_ENDPOINT.WALLET_REQUEST.WALLET_REJECT_LIST, payload);
  console.log("rejected Wallet Request Response:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to rejected wallet request");
  }
  return data;
};

// Wallet action (Accept , Reject)
export const walletActionRemark = async ({ id, status, remark, transid }) => {
  console.log("WALLET ACTION API HIT");
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
  console.log("WALLET ACTION PAYLOAD:", payload);
  const data = await securePost(API_ENDPOINT.WALLET_REQUEST.WALLET_ACTION, payload);
  console.log("WALLET ACTION RESPONSE:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to process wallet request");
  }
  return data;
};

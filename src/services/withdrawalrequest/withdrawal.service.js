import { API_ENDPOINT } from "../../constants/endpoints";
import { securePost } from "../../lib/axios/secureApi";

// GET WITHDRAWAl REQUEST LIST
export const getWithdrawalRequestList = async ({ limit = 10, offset = 0, search }) => {
  console.log("getWithdrawalRequestList");
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
  console.log("Withdrawal Request List Payload:", payload);
  const data = await securePost(API_ENDPOINT.WITHDRAWAL_REQUEST.WITHDRAWAL_REQUEST_LIST, payload);
  console.log("Withdrawal Request List Response:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch withdrawal requests");
  }
  return data;
};

// GET WITHDRAWAl ACCEPTED LIST
export const getWithdrawalAcceptRequestList = async ({ limit = 10, offset = 0, search }) => {
  console.log("getWithdrawalAcceptRequestList");
  const token = localStorage.getItem("token");
  console.log("Token ACCEPTEDList:", token);
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    limit,
    offset,
    search,
  };
  console.log("Withdrawal ACCEPTED List Payload:", payload);
  const data = await securePost(API_ENDPOINT.WITHDRAWAL_REQUEST.WITHDRAWAL_ACCEPT_LIST, payload);
  console.log("Withdrawal ACCEPTED List Response:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch withdrawal ACCEPTED");
  }
  return data;
};

// GET WITHDRAWAl ACCEPTED LIST
export const getWithdrawalRejectRequestList = async ({ limit = 10, offset = 0, search }) => {
  console.log("getWithdrawalRejectRequestList");
  const token = localStorage.getItem("token");
  console.log("Token Rejected List:", token);
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    limit,
    offset,
    search,
  };
  console.log("Withdrawal ACCEPTED List Payload:", payload);
  const data = await securePost(API_ENDPOINT.WITHDRAWAL_REQUEST.WITHDRAWAL_REJECT_LIST, payload);
  console.log("Withdrawal REJECTED List Response:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch withdrawal Rejected");
  }
  return data;
};

// WITHDRAWAL ACTION
export const withdrawalActionRemark = async ({ status, recordid, remark }) => {
  console.log("withdrawalActionRemark");

  const token = localStorage.getItem("token");

  console.log("Token withdrawalActionRemark:", token);

  if (!token) {
    throw new Error("Session Expired");
  }

  const payload = {
    token,
    status,
    recordid,
    remark,
  };

  console.log("withdrawalActionRemark Payload:", payload);

  const data = await securePost(API_ENDPOINT.WITHDRAWAL_REQUEST.WITHDRAWAL_ACTION, payload);

  console.log("withdrawalActionRemark Response:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to process withdrawal request");
  }

  return data;
};

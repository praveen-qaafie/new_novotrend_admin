import { API_ENDPOINT } from "@/constants/endpoints";
import { securePost } from "@/lib/axios/secureApi";

export const getWalletReport = async ({ limit = 10, offset = 0, sdate, edate, search }) => {
  console.log("GET WALLET REQUEST REPORT API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session Expired. Please Login Again");
  }
  const payload = {
    token,
    limit,
    offset,
    sdate,
    edate,
    search,
  };
  console.log("GET WALLET REQUEST REPORT PAYLOAD:", payload);
  const data = await securePost(API_ENDPOINT.REPORTS.WALLET_REPORT, payload);
  console.log("GET WALLLET REQUEST REPORT RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch wallet request report");
  }
  return data;
};

export const getInternalTransferReport = async ({
  limit = 10,
  offset = 0,
  sdate,
  edate,
  search,
}) => {
  console.log("GET Internal Transfer REPORT API HIT");

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session Expired. Please Login Again");
  }
  const payload = {
    token,
    limit,
    offset,
    sdate,
    edate,
    search,
  };
  console.log("GET INTERnal Transfer REPORT PAYLOAD:", payload);
  const data = await securePost(API_ENDPOINT.REPORTS.INTERNAL_TRANSFER_REPORT, payload);
  console.log("GET INTERnal Transfer REPORT PAYLOAD:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch internal transfer report");
  }
  return data;
};

export const getWalletRequestListHistory = async ({
  limit = 10,
  offset = 0,
  sdate = "",
  edate = "",
  search = "",
  useremail = "",
  paytype = "",
  status = "",
}) => {
  const token = localStorage.getItem("token");
  console.log("GET WALLET REQUEST HISTORY API HIT");

  if (!token) {
    throw new Error("Session Expired. Please Login Again");
  }

  const payload = {
    token,
    limit,
    offset,
    sdate,
    edate,
    search,
    useremail,
    paytype,
    status,
  };

  const data = await securePost(API_ENDPOINT.REPORTS.WALLET_REQUEST_LIST_HISTORY, payload);
  console.log("GET WALLET REQUEST HISTORY RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch wallet request report");
  }

  return data;
};

export const getWithdrawalRequestListHistory = async ({
  limit = 10,
  offset = 0,
  sdate = "",
  edate = "",
  search = "",
  useremail = "",
  paytype = "",
  status = "",
}) => {
  const token = localStorage.getItem("token");
  console.log("GET Withdrawal REQUEST HISTORY API HIT");

  if (!token) {
    throw new Error("Session Expired. Please Login Again");
  }
  const payload = {
    token,
    limit,
    offset,
    sdate,
    edate,
    search,
    useremail,
    paytype,
    status,
  };

  const data = await securePost(API_ENDPOINT.REPORTS.WITHDRAWAL_REQUEST_LIST_HISTORY, payload);
  console.log("GET Withdrawal HISTORY RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch Withdrawal request report");
  }

  return data;
};

export const getWithdrawalRequestListHistoryIB = async ({
  limit = 10,
  offset = 0,
  sdate = "",
  edate = "",
  search = "",
  useremail = "",
  paytype = "",
  status = "",
}) => {
  const token = localStorage.getItem("token");
  console.log("GET Withdrawal REQUEST HISTORY IB API HIT");

  if (!token) {
    throw new Error("Session Expired. Please Login Again");
  }
  const payload = {
    token,
    limit,
    offset,
    sdate,
    edate,
    search,
    useremail,
    paytype,
    status,
  };
  const data = await securePost(API_ENDPOINT.REPORTS.WITHDRAWAL_REQUEST_LIST_HISTORY_IB, payload);
  console.log("GET Withdrawal HISTORY IB RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch Withdrawal request IB report");
  }
  return data;
};

import { API_ENDPOINT } from "@/constants/endpoints";
import apiClient from "@/lib/axios/apiClient";
import { decryptData, encryptData } from "@/lib/utils";
import { securePost } from "@/lib/axios/secureApi";

const unwrapNestedEncryptedResult = data => {
  if (typeof data === "string") {
    try {
      const decryptedResult = decryptData(cleanEncryptedText(data));

      return decryptedResult?.data ?? decryptedResult;
    } catch {
      return data;
    }
  }

  if (data?.response || typeof data?.result !== "string") {
    return data;
  }

  try {
    const encryptedResult = cleanEncryptedText(data.result);
    const decryptedResult = decryptData(encryptedResult);

    return decryptedResult?.data ?? decryptedResult;
  } catch {
    return data;
  }
};

const getRawErrorMessage = data => {
  if (!data) {
    return "";
  }

  if (typeof data === "string") {
    return data;
  }

  try {
    return JSON.stringify(data);
  } catch {
    return String(data);
  }
};

const cleanEncryptedText = value => {
  return String(value)
    .trim()
    .replace(/^```[^\n]*\n?/i, "")
    .replace(/```\s*$/i, "")
    .trim();
};

const getReadableDecryptedMessage = value => {
  if (typeof value !== "string" || !value.trim()) {
    return "";
  }

  try {
    const decryptedMessage = decryptData(cleanEncryptedText(value));

    return (
      decryptedMessage?.data?.result ||
      decryptedMessage?.data?.message ||
      decryptedMessage?.result ||
      decryptedMessage?.message ||
      decryptedMessage?.data ||
      decryptedMessage
    );
  } catch {
    return "";
  }
};

const getApiErrorMessage = data => {
  if (typeof data === "string") {
    return getReadableDecryptedMessage(data) || data;
  }

  const message =
    data?.result ||
    data?.message ||
    data?.error ||
    data?.data ||
    data?.response?.result ||
    data?.response?.message ||
    data?.response?.error ||
    data?.response?.data;

  if (typeof message !== "string") {
    return message?.result || message?.message || getRawErrorMessage(data);
  }

  return getReadableDecryptedMessage(message) || message || getRawErrorMessage(data);
};

const getSupportTicketList = async ({ endpoint, label, errorMessage, limit, offset, search }) => {
  console.log(`${label} API HIT`);

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const payload = {
    token,
    limit,
    offset,
    search: search?.trim() || "",
  };

  console.log(`${label} PAYLOAD:`, payload);

  const data = unwrapNestedEncryptedResult(await securePost(endpoint, payload));

  console.log(`${label} RESPONSE:`, data);

  if (data?.status !== 200) {
    throw new Error(data?.result || errorMessage);
  }

  return data;
};

export const getOpenSupportTicketList = ({ limit = 10, offset = 0, search = "" }) => {
  return getSupportTicketList({
    endpoint: API_ENDPOINT.SUPPORT_TICKET.OPEN_TICKET_LIST,
    label: "GET OPEN SUPPORT TICKET LIST",
    errorMessage: "Unable to fetch open support tickets",
    limit,
    offset,
    search,
  });
};

export const getCloseSupportTicketList = ({ limit = 10, offset = 0, search = "" }) => {
  return getSupportTicketList({
    endpoint: API_ENDPOINT.SUPPORT_TICKET.CLOSE_TICKET_LIST,
    label: "GET CLOSE SUPPORT TICKET LIST",
    errorMessage: "Unable to fetch close support tickets",
    limit,
    offset,
    search,
  });
};

export const getSupportTicketDetails = async ({ ticket_id }) => {
  console.log("GET SUPPORT TICKET DETAILS API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const payload = {
    token,
    ticket_id,
  };

  console.log("GET SUPPORT TICKET DETAILS PAYLOAD:", payload);

  const data = unwrapNestedEncryptedResult(
    await securePost(API_ENDPOINT.SUPPORT_TICKET.TICKET_DETAILS, payload)
  );

  console.log("GET SUPPORT TICKET DETAILS RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch support ticket details");
  }

  return data;
};

export const replySupportTicket = async ({ ticket_id, remark, close_ticket = "0" }) => {
  console.log("REPLY SUPPORT TICKET API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const payload = {
    token,
    ticket_id,
    remark,
    close_ticket,
  };

  console.log("REPLY SUPPORT TICKET PAYLOAD:", payload);

  let data;

  try {
    data = unwrapNestedEncryptedResult(await securePost(API_ENDPOINT.SUPPORT_TICKET.REPLY_TICKET, payload));
  } catch (error) {
    const errorData = unwrapNestedEncryptedResult(error?.response?.data ?? error);
    throw new Error(getApiErrorMessage(errorData) || error?.message);
  }

  console.log("REPLY SUPPORT TICKET RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(getApiErrorMessage(data));
  }

  return data;
};

export const replySupportTicketWithAttachment = async ({
  ticket_id,
  remark,
  close_ticket = "0",
  attachment,
}) => {
  console.log("REPLY SUPPORT TICKET WITH ATTACHMENT API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const payload = {
    token,
    ticket_id,
    remark,
    close_ticket,
  };

  console.log("REPLY SUPPORT TICKET WITH ATTACHMENT PAYLOAD:", payload);
  console.log("REPLY SUPPORT TICKET ATTACHMENT:", attachment);

  const requestBody = new FormData();
  const encryptedPayload = encryptData(payload);

  requestBody.append("data", encryptedPayload);

  if (attachment) {
    requestBody.append("select_img", attachment, attachment.name);
  }

  console.log("REPLY SUPPORT TICKET WITH ATTACHMENT FORM DATA:", {
    data: encryptedPayload,
    select_img: attachment,
  });

  let response;

  try {
    response = await apiClient.post(API_ENDPOINT.SUPPORT_TICKET.REPLY_TICKET, requestBody, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    const errorData = unwrapNestedEncryptedResult(error?.response?.data ?? error);
    throw new Error(getApiErrorMessage(errorData) || error?.message);
  }

  const data = unwrapNestedEncryptedResult(response.data);

  console.log("REPLY SUPPORT TICKET WITH ATTACHMENT RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(getApiErrorMessage(data));
  }

  return data;
};

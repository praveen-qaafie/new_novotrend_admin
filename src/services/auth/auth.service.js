import { decryptData, encryptData } from "@/lib/utils";
import { API_ENDPOINT } from "../../constants/endpoints";
import apiClient from "../../lib/axios/apiClient";

// LOGIN
export const loginUser = async (payload) => {
  
  const encryptedPayload = encryptData(payload);

  const response = await apiClient.post(API_ENDPOINT.AUTH.LOGIN, {
    data: encryptedPayload,
  });

  const decrypted = decryptData(response.data);

  
  if (decrypted?.data?.status !== 200) {
    throw new Error(decrypted?.data?.result || "Invalid Username or Password");
  }

  const authData = decrypted?.data?.response;

  if (authData?.token) {
    localStorage.setItem("token", authData.token);
  }

  return decrypted.data;
};

// VERIFY AUTH
export const verifyAuthCode = async (payload) => {
  console.log("OTP VERIFY PAYLOAD:", payload);

  const encryptedPayload = encryptData(payload);
  console.log("OTP VERIFY ENCRYPTED PAYLOAD:", encryptedPayload);

  const response = await apiClient.post(API_ENDPOINT.AUTH.VERIFYAUTH, {
    data: encryptedPayload,
  });

  console.log("OTP VERIFY ENCRYPTED RESPONSE:", response.data);

  const decrypted = decryptData(response.data);
  console.log("OTP VERIFY DECRYPTED RESPONSE:", decrypted);
  
  if (decrypted?.data?.status !== 200) {
    throw new Error(decrypted?.data?.result || "Verification Failed");
  }

  return decrypted.data;
};

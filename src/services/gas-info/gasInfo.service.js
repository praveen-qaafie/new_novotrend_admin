import { API_ENDPOINT } from "@/constants/endpoints";
import { securePost } from "@/lib/axios/secureApi";

export const getGasInfo = async ({ type_chain }) => {
  console.log("getGasInfo");

  const token = localStorage.getItem("token");

  console.log("Token getGasInfo:", token);

  if (!token) {
    throw new Error("Session Expired");
  }

  const payload = {
    token,
    type_chain,
  };

  console.log("Get Gas Info Payload:", payload);

  const data = await securePost(API_ENDPOINT.GAS_INFO.GET_GAS_INFO, payload);

  console.log("Get Gas Info Response:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch gas info");
  }

  return data;
};

export const addGasInfo = async ({ address, key, type_chain }) => {
  console.log("addGasInfo");

  const token = localStorage.getItem("token");

  console.log("Token addGasInfo:", token);

  if (!token) {
    throw new Error("Session Expired");
  }

  const payload = {
    token,
    address,
    key,
    type_chain,
  };

  console.log("Add Gas Info Payload:", payload);

  const data = await securePost(API_ENDPOINT.GAS_INFO.ADD_GAS_INFO, payload);

  console.log("Add Gas Info Response:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to add gas info");
  }

  return data;
};

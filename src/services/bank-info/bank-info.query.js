import api from "@/utils/axiosInstance";
import { API_ENDPOINT } from "@/constants/endpoints";

export const addBankInfo = async (payload) => {
  const response = await api.post(API_ENDPOINT.BANK_INFO.ADD_BANK, payload);

  return response.data;
};

export const getBankInfo = async () => {
  const response = await api.get(API_ENDPOINT.BANK_INFO.GET_BANK);
  // console.log("response34", response)
  return response.data;
};

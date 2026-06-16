import { API_ENDPOINT } from "@/constants/endpoints";
import memberClient from "@/lib/axios/memberClient";
import { decryptData } from "@/lib/utils";

export const getCountryList = async () => {
    const response = await memberClient.get(API_ENDPOINT.COUNTRY.COUNTRY_LIST);
  
  const decryptedResponse = decryptData(response?.data);

    if (decryptedResponse?.data?.status !== 200) {
    throw new Error(decryptedResponse?.data?.result || "Unable to fetch country list");
  }
  return decryptedResponse?.data;
};

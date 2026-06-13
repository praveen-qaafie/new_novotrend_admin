import { API_ENDPOINT } from "@/constants/endpoints";
import memberClient from "@/lib/axios/memberClient";
import { decryptData } from "@/lib/utils";

export const getCountryList = async () => {
  console.log("GET COUNTRY LIST API HIT");
  const response = await memberClient.get(API_ENDPOINT.COUNTRY.COUNTRY_LIST);
  console.log("COUNTRY RAW RESPONSE:", response);

  const decryptedResponse = decryptData(response?.data);

  console.log("COUNTRY DECRYPTED RESPONSE:", decryptedResponse);
  if (decryptedResponse?.data?.status !== 200) {
    throw new Error(decryptedResponse?.data?.result || "Unable to fetch country list");
  }
  return decryptedResponse?.data;
};

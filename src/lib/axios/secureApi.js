import { decryptData, encryptData } from "@/lib/utils";
import apiClient from "./apiClient";

const normalizePlainResponse = responseData => {
  if (typeof responseData === "object" && responseData !== null) {
    return responseData?.data ?? responseData;
  }
  if (typeof responseData !== "string") {
    return responseData;
  }
  const trimmedResponse = responseData.trim();
  if (!trimmedResponse) {
    return {
      status: 200,
      result: "Request completed successfully",
    };
  }
  try {
    const parsedResponse = JSON.parse(trimmedResponse);

    return parsedResponse?.data ?? parsedResponse;
  } catch {
    return {
      status: 200,
      result: trimmedResponse,
    };
  }
};

export const securePost = async (url, payload) => {
  try {
    console.log("PLAIN PAYLOAD:", payload);
    // ENCRYPT PAYLOAD
    const encryptedPayload = encryptData(payload);
    const requestBody = {
      data: encryptedPayload,
    };
    console.log("FINAL REQUEST BODY:", requestBody);

    // API CALL
    const response = await apiClient.post(url, requestBody);

    console.log("RAW RESPONSE:", response);

    // DECRYPT RESPONSE
    try {
      const decrypted = decryptData(response.data);

      // DECRYPTED RESPONSE
      console.log("DECRYPTED RESPONSE:", decrypted);

      // PLAIN TEXT RESPONSE
      console.log("PLAIN TEXT RESPONSE:", JSON.stringify(decrypted, null, 2));

      return decrypted.data;
    } catch {
      // NORMAL RESPONSE
      const plainResponse = normalizePlainResponse(response.data);

      console.log("PLAIN RESPONSE:", plainResponse);

      return plainResponse;
    }
  } catch (error) {
    console.log("SECURE API ERROR:", error);

    throw error;
  }
};

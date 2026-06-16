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

const decryptNestedResult = data => {
  if (typeof data?.result !== "string") {
    return data;
  }

  try {
    return {
      ...data,
      result: decryptData(data.result),
    };
  } catch {
    return data;
  }
};

export const securePost = async (url, payload, options = {}) => {
  const logName = options.logName;

  try {
    if (logName) {
      console.log(`${logName} PAYLOAD:`, payload);
    }

    // ENCRYPT PAYLOAD
    const encryptedPayload = encryptData(payload);
    const requestBody = {
      data: encryptedPayload,
    };

    if (logName) {
      console.log(`${logName} ENCRYPTED PAYLOAD:`, requestBody);
      console.log(`${logName} DECRYPTED PAYLOAD:`, decryptData(encryptedPayload));
    }

    // API CALL
    const response = await apiClient.post(url, requestBody);

    if (logName) {
      console.log(`${logName} ENCRYPTED RESPONSE:`, response.data);
    }

    // DECRYPT RESPONSE
    try {
      const decrypted = decryptData(response.data);

      // DECRYPTED RESPONSE
      if (logName) {
        console.log(`${logName} DECRYPTED RESPONSE:`, decryptNestedResult(decrypted.data));
      }

      return decryptNestedResult(decrypted.data);
    } catch {
      // NORMAL RESPONSE
      const plainResponse = normalizePlainResponse(response.data);
      const decryptedPlainResponse = decryptNestedResult(plainResponse);

      if (logName) {
        console.log(`${logName} DECRYPTED RESPONSE:`, decryptedPlainResponse);
      }

      return decryptedPlainResponse;
    }
  } catch (error) {
    throw error;
  }
};

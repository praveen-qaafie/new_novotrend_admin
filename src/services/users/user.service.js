import { API_ENDPOINT } from "@/constants/endpoints";
import { securePost } from "../../lib/axios/secureApi";

// GET USER LIST
export const getUserList = async ({ limit = 10, offset = 0, search }) => {
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

  const data = await securePost(API_ENDPOINT.USERS.USERLIST, payload);
  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to load users");
  }
  return data;
};

// ADMIN USER ACTION
export const adminUserAction = async ({ user_id, type }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }
  const allowedTypes = ["active", "deactive", "logout"];
  if (!allowedTypes.includes(type)) {
    throw new Error("Invalid action type");
  }
  const payload = {
    token,
    user_id,
    type,
  };

  const data = await securePost(API_ENDPOINT.USERS.ADMINACTION, payload);

  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to perform action");
  }

  return data;
};
// GET MT5 USER LIST
export const getMT5UserList = async ({ limit = 10, offset = 0, search = "" }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const payload = {
    token,
    limit,
    offset,
    search: search?.trim(),
  };

  const data = await securePost(API_ENDPOINT.USERS.LISTMT5USER, payload);

  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to load MT5 users");
  }

  return data;
};

// CHECK EMAIL TO USERNAME
export const getUsernameByEmail = async ({ email }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const payload = {
    token,
    code: email,
  };

  const data = await securePost(API_ENDPOINT.USERS.GET_USERNAME_BY_EMAIL, payload);

  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "User not found");
  }

  return data;
};

// GET MT5 ACCOUNT BY EMAIL
export const getMT5AccountByEmail = async ({ email }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session expired. Please login again.");
  }
  const payload = {
    token,
    code: email,
  };

  const data = await securePost(API_ENDPOINT.USERS.GET_MT5_ACCOUNT_BY_EMAIL, payload);
  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "No MT5 accounts found");
  }
  return data;
};
// CREATE MT5 ACCOUNT
export const createMT5Account = async ({
  email,
  selectgroup,
  mainpassword,
  investorpassword,
  accleverage,
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session Expired");
  }
  // PAYLOAD
  const payload = {
    token,
    email,
    selectgroup,
    mainpassword,
    investorpassword,
    accleverage,
  };

  const data = await securePost(API_ENDPOINT.USERS.CREATE_MT5_ACCOUNT, payload);
  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "MT5 account creation failed");
  }

  return data;
};
// CHANGE MT5 PASSWORD
export const changeMT5Password = async ({
  accountnumber,
  passwordtype,
  mainpassword,
  investorpassword,
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired");
  }

  // PAYLOAD
  const payload = {
    token,
    accountnumber,
    mainpassword: passwordtype !== "investor" ? mainpassword : "",
    investorpassword: passwordtype !== "main" ? investorpassword : "",
    passwordtype,
  };

  const data = await securePost(API_ENDPOINT.USERS.CHANGE_MT5_PASSWORD, payload);
  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "Password change failed");
  }

  return data;
};

// VERIFY MT5 ACCOUNT NUMBER
export const getUsernameByAccountNo = async ({ accno }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session Expired");
  }

  const payload = {
    token,
    accno,
  };

  const data = await securePost(API_ENDPOINT.USERS.GET_USERNAME_BY_ACCOUNTNO, payload);

  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "Account Not Found");
  }

  return data;
};
// CHANGE MT5 LEVERAGE
export const changeMT5Leverage = async ({ accno, leverage }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    accountnumber: accno,
    accleverage: leverage,
  };

  const data = await securePost(API_ENDPOINT.USERS.CHANGE_MT5_LEVERAGE, payload);
  console.log("PLAIN TEXT RESPONSE:", JSON.stringify(data, null, 2));
  // VALIDATION
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to change leverage");
  }
  return data;
};

// Send MT5 Data List to Email
export const sendVerificationMailMT5 = async ({ accountno }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    accountno,
  };
  console.log("SEND MT5 MAIL PAYLOAD:", payload);
  const data = await securePost(API_ENDPOINT.USERS.SEND_VERIFICATION_MAIL_MT5, payload);
  console.log("SEND MT5 MAIL RESPONSE:", data);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to send verification mail");
  }
  return data;
};

// Main Mt5 Password list
export const getMT5PasswordList = async ({ status = 0, limit = 10, offset = 0, search = "" }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session expired");
  }
  const payload = {
    token,
    status,
    limit,
    offset,
    search,
  };
  const res = await securePost(API_ENDPOINT.USERS.MT5_MAIN_PASSWORD_REQUEST_LIST, payload);
  if (res?.status !== 200) {
    throw new Error(res?.result || "Failed to fetch MT5 password list");
  }
  return res;
};
// mt5password.service.js
export const changeMT5PasswordRequestStatus = async ({ id, status }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session Expired");
  }
  const payload = {
    token,
    id,
    status,
  };
  const data = await securePost(API_ENDPOINT.USERS.CHANGE_MT5_MAIN_PASSWORD_REQUEST_LIST, payload);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to update MT5 password request");
  }
  return data;
};

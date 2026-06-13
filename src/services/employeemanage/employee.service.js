import { API_ENDPOINT } from "@/constants/endpoints";
import { securePost } from "@/lib/axios/secureApi";

export const getAdminStaffList = async () => {
  console.log("Admin Staff List API HIT");
  if (typeof window === "undefined") {
    throw new Error("Window not available");
  }
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session expired");
  }
  const payload = { token };
  const data = await securePost(API_ENDPOINT.STAFFLIST.ADMIN_STAFF_LIST, payload);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch admin Staff List");
  }

  return data;
};

export const getAdminAllPermission = async () => {
  console.log("GET ALL PERMISSIOn API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired");
  }
  const payload = { token };
  const data = await securePost(API_ENDPOINT.STAFFLIST.GET_ALL_PERMISSION, payload);
  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to fetch permission List");
  }
  return data;
};

export const addEmployee = async ({
  user_name,
  user_mobile,
  user_email,
  user_adress,
  username,
  password,
  permission,
}) => {
  console.log("ADD EMPLOYEE API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired");
  }

  const payload = {
    token,
    user_name,
    user_mobile,
    user_email,
    user_adress,
    username,
    password,
    permission,
  };

  console.log("ADD EMPLOYEE PAYLOAD:", payload);

  const data = await securePost(API_ENDPOINT.STAFFLIST.ADD_NEW_EMPLOYEE, payload);

  console.log("ADD EMPLOYEE RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to add employee");
  }

  return data;
};

export const editEmployeeDetails = async ({
  staff_id,
  user_name,
  user_mobile,
  user_email,
  user_adress,
  username,
  password,
  permission,
}) => {
  console.log("EDIT EMPLOYEE API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired");
  }

  const payload = {
    token,
    staff_id,
    user_name,
    user_mobile,
    user_email,
    user_adress,
    username,
    password,
    permission,
  };

  console.log("EDIT EMPLOYEE PAYLOAD:", payload);

  const data = await securePost(API_ENDPOINT.STAFFLIST.EDIT_EMPLOYEE_DETAILS, payload);

  console.log("EDIT EMPLOYEE RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to update employee");
  }

  return data;
};

export const deleteEmployeeDetails = async ({ staff_id }) => {
  console.log("DELETE EMPLOYEE API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired");
  }

  const payload = {
    token,
    staff_id,
  };

  console.log("DELETE EMPLOYEE PAYLOAD:", payload);

  const data = await securePost(API_ENDPOINT.STAFFLIST.DELETE_EMPLOYEE_DETAILS, payload);

  console.log("DELETE EMPLOYEE RESPONSE:", data);

  if (data?.status !== 200) {
    throw new Error(data?.result || "Unable to delete employee");
  }

  return data;
};

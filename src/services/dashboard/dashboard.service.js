import { API_ENDPOINT } from "@/constants/endpoints";
import { securePost } from "@/lib/axios/secureApi";

export const getDashboardData = async ({ limit = 10, offset = 0 } = {}) => {
  console.log("GET DASHBOARD API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const payload = {
    token,
    limit,
    offset,
  };

  console.log("GET DASHBOARD PAYLOAD:", payload);

  const data = await securePost(API_ENDPOINT.DASHBOARD.DASHBOARD, payload);
  const dashboardData = data?.data ?? data;

  console.log("GET DASHBOARD RESPONSE:", dashboardData);

  if (dashboardData?.status !== 200) {
    throw new Error(dashboardData?.result || "Unable to fetch dashboard data");
  }

  return dashboardData;
};

export const assignDashboardTicket = async ({ sid, user }) => {
  console.log("ASSIGN DASHBOARD TICKET API HIT");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const payload = {
    token,
    sid: Number(sid),
    user: Number(user),
  };

  console.log("ASSIGN DASHBOARD TICKET PAYLOAD:", payload);

  const data = await securePost(API_ENDPOINT.DASHBOARD.TICKET_ASSIGN, payload);
  const assignData = data?.data ?? data;

  console.log("ASSIGN DASHBOARD TICKET RESPONSE:", assignData);

  if (assignData?.status !== 200) {
    throw new Error(assignData?.result || "Unable to assign support ticket");
  }

  return assignData;
};

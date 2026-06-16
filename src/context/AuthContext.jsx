"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

const AuthContext = createContext(null);
const AUTH_CHANGE_EVENT = "novotrend-auth-change";
const AUTH_LOADING_SNAPSHOT = "__auth_loading__";

const getStoredUserSnapshot = () => {
  if (typeof window === "undefined") return AUTH_LOADING_SNAPSHOT;

  try {
    const storedUser = localStorage.getItem("adminUser");
    const token = localStorage.getItem("token");

    if (storedUser) {
      return storedUser;
    }

    if (token) {
      return JSON.stringify({
        token,
        auth_secret: localStorage.getItem("auth_secret") || "",
        staff_id: localStorage.getItem("staff_id") || "",
        staff_name: localStorage.getItem("staff_name") || "",
        staff_username: localStorage.getItem("staff_username") || "",
        permission: JSON.parse(localStorage.getItem("permission") || "[]"),
      });
    }

    return "";
  } catch (error) {
    console.error("AUTH RESTORE ERROR:", error);
    localStorage.removeItem("adminUser");
    return "";
  }
};

const getServerSnapshot = () => AUTH_LOADING_SNAPSHOT;

const parseStoredUser = snapshot => {
  if (!snapshot || snapshot === AUTH_LOADING_SNAPSHOT) return null;

  try {
    return JSON.parse(snapshot);
  } catch (error) {
    console.error("AUTH PARSE ERROR:", error);
    return null;
  }
};

const subscribeToAuth = callback => {
  window.addEventListener("storage", callback);
  window.addEventListener("pageshow", callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);

  queueMicrotask(callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pageshow", callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
};

const emitAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const AuthProvider = ({ children }) => {
  const authSnapshot = useSyncExternalStore(
    subscribeToAuth,
    getStoredUserSnapshot,
    getServerSnapshot
  );
  const user = useMemo(() => parseStoredUser(authSnapshot), [authSnapshot]);
  const isAuthLoading = authSnapshot === AUTH_LOADING_SNAPSHOT;
  const isVerified =
    !isAuthLoading && typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true";

  const login = userData => {
    localStorage.removeItem("isLoggedIn");
    localStorage.setItem("adminUser", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    localStorage.setItem("staff_id", userData.staff_id || "");
    localStorage.setItem("staff_name", userData.staff_name || "");
    localStorage.setItem("staff_username", userData.staff_username || "");
    localStorage.setItem("permission", JSON.stringify(userData.permission || []));
    emitAuthChange();
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("token");
    localStorage.removeItem("auth_secret");
    localStorage.removeItem("qr_secret");
    localStorage.removeItem("qr_code");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("staff_id");
    localStorage.removeItem("staff_name");
    localStorage.removeItem("staff_username");
    localStorage.removeItem("permission");

    emitAuthChange();
  };

  const setUser = userData => {
    if (userData) {
      login(userData);
      return;
    }

    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthLoading,
        isVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

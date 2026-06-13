"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("adminUser");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("AUTH RESTORE ERROR:", error);
      localStorage.removeItem("adminUser");
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const login = userData => {
    localStorage.setItem("adminUser", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("token");
    localStorage.removeItem("auth_secret");
    localStorage.removeItem("qr_secret");
    localStorage.removeItem("qr_code");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthLoading,
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

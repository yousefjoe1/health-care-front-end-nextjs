"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { checkToken } from "../_actions/checkToken";
import { useRouter } from "next/navigation";



interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    setIsLoading(true);
    const isAuth = await checkToken()
    if (!isAuth.success) {
      router.push("/admin-login")
    }
    setIsLoading(false);
  }


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth()
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  if (isLoading) return <>Loading ...................</>

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook بسيط عشان نستخدم الـ Context بسهولة
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
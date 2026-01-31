"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import api from '@/config/intercepotor';

const AuthContext = createContext<{ isLoading: boolean }>({ isLoading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setAuth, logout, token } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // يمكن هنا عمل طلب "me" للتأكد من أن التوكن لا يزال صالحاً
          const res = await api.get('/auth/me');
          // setAuth(res.data.user, storedToken);
        }
      } catch (error) {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setAuth, logout]);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {/* يمكن إظهار Spinner هنا حتى ينتهي التحقق من التوكن */}
      {/* {!isLoading ? children : <div className="h-screen flex items-center justify-center">Loading...</div>} */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
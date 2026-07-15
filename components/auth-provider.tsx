"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api, auth, LoginResponse } from "@/lib/api";

interface AuthContextValue {
  user: LoginResponse["user"] | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = auth.getToken();
    if (token) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (login: string, password: string) => {
    const response = await api.login(login, password);
    auth.setToken(response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    auth.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!auth.getToken(),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type JSX,
  type ReactNode,
} from "react";

import { registerService, loginService } from "../services/auth";

import { type User } from "../types/user";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  register: (
    name: string,
    company: string,
    email: string,
    password: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const isAuthenticated = !!token;

  const register = async (
    name: string,
    company: string,
    email: string,
    password: string,
  ): Promise<void> => {
    const data = await registerService({
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" "),
      companyName: company,
      email,
      password,
    });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const login = async (email: string, password: string): Promise<void> => {
    const data = await loginService({ email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = (): void => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import type { User } from "../types/user";
import { API_URL } from "../lib/api";

interface RegisterData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export async function registerService(
  data: RegisterData,
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al registrar el usuario");
  }
  return res.json();
}

export async function loginService(data: LoginData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al iniciar sesión");
  }
  return res.json();
}

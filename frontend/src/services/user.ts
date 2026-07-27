import { type UserListItem } from "../types/user";
import { API_URL } from "../lib/api";

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileId: number;
}

interface CreateUserResponse {
  message: string;
  user: UserListItem;
}

export async function getUsersService(token: string): Promise<UserListItem[]> {
  const res = await fetch(`${API_URL}/api/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener los usuarios");
  return res.json();
}

export async function createUserService(
  token: string | null,
  data: CreateUserData,
): Promise<CreateUserResponse> {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al crear el usuario");
  }
  return res.json();
}

export async function deleteUserService(
  token: string,
  userId: number,
): Promise<void> {
  const res = await fetch(`${API_URL}/api/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al eliminar el usuario");
  }
}

export async function updateUserService(
  token: string,
  userId: number,
  data: { email: string; profileId: number; isActive: boolean },
): Promise<void> {
  const res = await fetch(`${API_URL}/api/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al actualizar el usuario");
  }
}

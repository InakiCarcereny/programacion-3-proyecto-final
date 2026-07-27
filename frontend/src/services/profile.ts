import type { Profile } from "../types/profile";
import { API_URL } from "../lib/api";

export async function getProfilesService(token: string): Promise<Profile[]> {
  const res = await fetch(`${API_URL}/api/profiles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener los perfiles");
  return res.json();
}

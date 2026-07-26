import type { Profile } from "../types/profile";

export async function getProfilesService(token: string): Promise<Profile[]> {
  const res = await fetch("/api/profiles", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener los perfiles");
  return res.json();
}

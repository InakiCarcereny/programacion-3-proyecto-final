import { type UserProfile } from "../types/user-profile";

interface UpdateDetailsResponse {
  message: string;
  userDetails: UserProfile;
}

export async function updateUserDetailsService(
  token: string,
  userId: number,
  formData: FormData,
): Promise<UpdateDetailsResponse> {
  const res = await fetch(`/api/user-details/${userId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al actualizar el perfil");
  }
  return res.json();
}

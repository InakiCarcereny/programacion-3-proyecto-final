export async function updateUserService(
  token: string,
  userId: number,
  data: { email: string },
): Promise<void> {
  const res = await fetch(`/api/users/${userId}`, {
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

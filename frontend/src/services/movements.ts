import type { Movement } from "../types/movements";

interface CreateMovementData {
  productId: number;
  quantity: number;
  type: "ingreso" | "egreso";
  description?: string;
}

export async function getMovementsService(
  token: string | null,
): Promise<Movement[]> {
  const res = await fetch("/api/movements", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener los movimientos");
  return res.json();
}

export async function createMovementService(
  token: string | null,
  data: CreateMovementData,
): Promise<Movement> {
  const res = await fetch("/api/movements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.errors?.join(" ") ??
        errorData.error ??
        errorData.message ??
        "Error al registrar el movimiento",
    );
  }
  return res.json();
}

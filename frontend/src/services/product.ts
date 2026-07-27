import { API_URL } from "../lib/api";
import type { Product } from "../types/product";

export async function getProductsService(
  token: string | null,
): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener los productos");
  return res.json();
}

export async function createProductService(
  token: string | null,
  formData: FormData,
): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al crear el producto");
  }
  return res.json();
}

export async function updateProductService(
  token: string,
  id: number,
  data: FormData,
): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al actualizar el producto");
  }
  return res.json();
}

export async function deleteProductService(
  token: string,
  id: number,
): Promise<void> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al eliminar el producto");
  }
}

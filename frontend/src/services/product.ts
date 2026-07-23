import type { Product } from "../types/product";

export async function getProductsService(): Promise<Product[]> {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al obtener los productos");
  }

  return res.json();
}

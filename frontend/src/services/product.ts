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

export async function createProductService(data: unknown): Promise<unknown> {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al crear el producto");
  }

  return res.json();
}

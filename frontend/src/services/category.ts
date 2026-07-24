import { type Category } from "../types/category";

export async function getCategoriesService(token: string): Promise<Category[]> {
  const res = await fetch("/api/categories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener las categorías");
  return res.json();
}

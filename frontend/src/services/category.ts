import { type Category } from "../types/category";
import { API_URL } from "../lib/api";

export async function getCategoriesService(token: string): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener las categorías");
  return res.json();
}

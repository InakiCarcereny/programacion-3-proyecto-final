import type { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: number;
  companyId: number;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
}

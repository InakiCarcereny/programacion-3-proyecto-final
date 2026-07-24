export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: number;
  companyId: number;
  category?: { id: number; name: string };
  createdAt?: string;
  updatedAt?: string;
}

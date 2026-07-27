export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: number;
  companyId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

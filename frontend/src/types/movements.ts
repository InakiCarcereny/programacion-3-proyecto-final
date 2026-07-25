import { type Product } from "./product";

export interface Movement {
  id: number;
  productId: number;
  quantity: number;
  type: "ingreso" | "egreso";
  description?: string;
  product?: Product;
  createdAt?: Date;
  updatedAt?: Date;
}

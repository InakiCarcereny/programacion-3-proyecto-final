export interface Movement {
  id: number;
  productId: number;
  // userId: number;
  quantity: number;
  type: "ingreso" | "egreso";
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  companyId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  companyId: number;
  profileId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

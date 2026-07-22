import { type UserProfile } from "./user-profile";

export interface User {
  id: number;
  email: string;
  role: string;
  companyId: number;
  profile?: UserProfile;
}

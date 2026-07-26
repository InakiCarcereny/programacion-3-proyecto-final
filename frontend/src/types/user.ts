import { type UserProfile } from "./user-profile";

export interface User {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
  companyId: number;
  companyName?: string;
  profileId: number;
  profile?: UserProfile;
}

export interface UserListItem {
  id: number;
  email: string;
  isActive: boolean;
  companyId: number;
  profileId: number;
  details: {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    phone?: string;
  };
  profile: {
    id: number;
    name: string;
  };
}

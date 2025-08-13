// src/app/models/user-role.model.ts

import { Role } from "./Role";
import { User } from "./User";

export interface UserRole {
  userEmail: string;
  user?: User; // optional to avoid recursion
  roleId: number;
  role?: Role; // optional to avoid recursion
}

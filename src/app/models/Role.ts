// src/app/models/role.model.ts

import { UserRole } from "./UserRole";


export interface Role {
  id: number;
  name: string;
  userRoles?: UserRole[]; // optional to avoid recursion unless needed
}

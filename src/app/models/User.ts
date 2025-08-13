import { Todo } from "./Todo";
import { UserRole } from "./UserRole";

export interface User {
  id: number;
  email: string;
  password: string;
  todos?: Todo[]; // optional in case response doesn't include them
  userRoles?: UserRole[]; // optional to avoid recursion
}
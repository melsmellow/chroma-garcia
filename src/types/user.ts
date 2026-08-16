export type UserRole = "admin" | "officer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
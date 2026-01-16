export interface User {
  id?: number | string;
  name: string;
  email: string;
  password?: string;
  role?: "Employee" | "Admin" | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

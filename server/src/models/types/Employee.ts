export interface Employee {
  id: string;
  name: string;
  email: string;
  userId?: string; // reference to User _id
  role: string;
  dateOfJoining: Date | string; // ISO date or Date
  leaveBalance: number;
  department: string;
  avatar?: string | null;
}

export type Role = "Employee" | "Admin" | string;

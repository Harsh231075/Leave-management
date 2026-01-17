export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  dateOfJoining: Date | string; // ISO date or Date
  leaveBalance: number;
  department: string;
  avatar?: string | null;
}

export type Role = "Employee" | "Admin" | string;

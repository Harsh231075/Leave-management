import { z } from "zod";

export const EmployeeCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().optional(),
  dateOfJoining: z.preprocess((v) => (typeof v === "string" ? new Date(v) : v), z.date()).optional(),
  leaveBalance: z.number().int().nonnegative().optional(),
  department: z.string().optional(),
  avatar: z.string().nullable().optional(),
});

export const LeaveRequestCreateSchema = z.object({
  employeeId: z.union([z.string(), z.number()]),
  employeeName: z.string(),
  leaveType: z.string(),
  startDate: z.preprocess((v) => (typeof v === "string" ? new Date(v) : v), z.date()),
  endDate: z.preprocess((v) => (typeof v === "string" ? new Date(v) : v), z.date()),
  totalDays: z.number().int().positive(),
  reason: z.string().optional(),
  status: z.string().optional(),
});

export const AttendanceCreateSchema = z.object({
  employeeId: z.union([z.string(), z.number()]),
  employeeName: z.string(),
  date: z.preprocess((v) => (typeof v === "string" ? new Date(v) : v), z.date()),
  status: z.string(),
});

export type EmployeeCreateInput = z.infer<typeof EmployeeCreateSchema>;
export type LeaveRequestCreateInput = z.infer<typeof LeaveRequestCreateSchema>;
export type AttendanceCreateInput = z.infer<typeof AttendanceCreateSchema>;

export const AuthRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
});

export const AuthLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AuthRegisterInput = z.infer<typeof AuthRegisterSchema>;
export type AuthLoginInput = z.infer<typeof AuthLoginSchema>;

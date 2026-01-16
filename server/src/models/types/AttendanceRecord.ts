export type AttendanceStatus = "Present" | "Absent" | string;

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  date: Date | string; // ISO date or Date
  status: AttendanceStatus;
}

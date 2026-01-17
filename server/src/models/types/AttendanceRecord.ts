export type AttendanceStatus = "Present" | "Absent" | string;

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: Date | string; // ISO date or Date
  status: AttendanceStatus;
}

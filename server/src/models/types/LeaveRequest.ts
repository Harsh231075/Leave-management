export type LeaveType = "Casual" | "Sick" | "Paid" | string;
export type LeaveStatus = "Approved" | "Pending" | "Rejected" | string;

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: LeaveType;
  startDate: Date | string; // ISO date or Date
  endDate: Date | string; // ISO date or Date
  totalDays: number;
  reason?: string;
  status: LeaveStatus;
}

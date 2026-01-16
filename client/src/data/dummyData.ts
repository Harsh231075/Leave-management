// Dummy data for the HR Management System

export const employees = [
  { id: 1, name: "John Smith", email: "john.smith@company.com", role: "Employee", dateOfJoining: "2023-01-15", leaveBalance: 12, department: "Engineering" },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Employee", dateOfJoining: "2022-06-20", leaveBalance: 8, department: "Marketing" },
  { id: 3, name: "Michael Brown", email: "michael.brown@company.com", role: "Employee", dateOfJoining: "2023-03-10", leaveBalance: 15, department: "Sales" },
  { id: 4, name: "Emily Davis", email: "emily.davis@company.com", role: "Employee", dateOfJoining: "2021-11-05", leaveBalance: 5, department: "HR" },
  { id: 5, name: "David Wilson", email: "david.wilson@company.com", role: "Employee", dateOfJoining: "2022-09-01", leaveBalance: 10, department: "Engineering" },
  { id: 6, name: "Jessica Martinez", email: "jessica.martinez@company.com", role: "Employee", dateOfJoining: "2023-05-22", leaveBalance: 18, department: "Design" },
];

export const leaveRequests = [
  { id: 1, employeeId: 1, employeeName: "John Smith", leaveType: "Casual", startDate: "2024-01-20", endDate: "2024-01-22", totalDays: 3, reason: "Family event", status: "Approved" },
  { id: 2, employeeId: 2, employeeName: "Sarah Johnson", leaveType: "Sick", startDate: "2024-01-18", endDate: "2024-01-19", totalDays: 2, reason: "Medical appointment", status: "Pending" },
  { id: 3, employeeId: 3, employeeName: "Michael Brown", leaveType: "Paid", startDate: "2024-01-25", endDate: "2024-01-30", totalDays: 6, reason: "Vacation", status: "Pending" },
  { id: 4, employeeId: 1, employeeName: "John Smith", leaveType: "Sick", startDate: "2024-01-05", endDate: "2024-01-06", totalDays: 2, reason: "Flu", status: "Approved" },
  { id: 5, employeeId: 4, employeeName: "Emily Davis", leaveType: "Casual", startDate: "2024-02-01", endDate: "2024-02-02", totalDays: 2, reason: "Personal work", status: "Rejected" },
  { id: 6, employeeId: 5, employeeName: "David Wilson", leaveType: "Paid", startDate: "2024-02-10", endDate: "2024-02-15", totalDays: 6, reason: "Wedding", status: "Approved" },
];

export const attendanceRecords = [
  { id: 1, employeeId: 1, employeeName: "John Smith", date: "2024-01-15", status: "Present" },
  { id: 2, employeeId: 1, employeeName: "John Smith", date: "2024-01-14", status: "Present" },
  { id: 3, employeeId: 1, employeeName: "John Smith", date: "2024-01-13", status: "Absent" },
  { id: 4, employeeId: 2, employeeName: "Sarah Johnson", date: "2024-01-15", status: "Present" },
  { id: 5, employeeId: 2, employeeName: "Sarah Johnson", date: "2024-01-14", status: "Present" },
  { id: 6, employeeId: 3, employeeName: "Michael Brown", date: "2024-01-15", status: "Present" },
  { id: 7, employeeId: 3, employeeName: "Michael Brown", date: "2024-01-14", status: "Absent" },
  { id: 8, employeeId: 4, employeeName: "Emily Davis", date: "2024-01-15", status: "Present" },
  { id: 9, employeeId: 5, employeeName: "David Wilson", date: "2024-01-15", status: "Present" },
  { id: 10, employeeId: 6, employeeName: "Jessica Martinez", date: "2024-01-15", status: "Present" },
];

export const currentEmployee = {
  id: 1,
  name: "John Smith",
  email: "john.smith@company.com",
  role: "Employee",
  dateOfJoining: "2023-01-15",
  leaveBalance: 12,
  department: "Engineering",
  avatar: null,
};

export const leaveTypes = ["Casual", "Sick", "Paid"] as const;

export const dashboardStats = {
  employee: {
    leaveBalance: 12,
    approvedLeaves: 5,
    pendingRequests: 2,
  },
  admin: {
    totalEmployees: 6,
    pendingLeaveRequests: 2,
    todayAttendance: 5,
  },
};

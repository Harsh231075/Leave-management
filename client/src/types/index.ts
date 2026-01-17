export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    department?: string;
    avatar?: string;
    dateOfJoining?: string;
    leaveBalance?: number;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LeaveRequest {
    _id: string;
    employeeId: string | User;
    employeeName: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    reason?: string;
    status: string;
    createdAt: string;
}

export interface Attendance {
    _id: string;
    employeeId: string | User;
    employeeName: string;
    date: string;
    status: string;
    checkIn?: string;
    checkOut?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role?: string;
    // Optional employee profile fields when registering as Employee
    department?: string;
    dateOfJoining?: string;
    leaveBalance?: number;
    avatar?: string | null;
}

export interface CreateEmployeeInput {
    name: string;
    email: string;
    role?: string;
    dateOfJoining?: string; // or Date
    leaveBalance?: number;
    department?: string;
    avatar?: string;
}

export interface CreateLeaveRequestInput {
    employeeId: string | number;
    employeeName: string;
    leaveType: string;
    startDate: Date | string;
    endDate: Date | string;
    totalDays: number;
    reason?: string;
}

export interface CreateAttendanceInput {
    employeeId: string | number;
    employeeName: string;
    date: Date | string;
    status: string;
}

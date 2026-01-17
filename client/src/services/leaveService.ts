import api from './api';
import { LeaveRequest, CreateLeaveRequestInput } from '../types';

export const getLeaveRequests = async (): Promise<LeaveRequest[]> => {
    const response = await api.get<LeaveRequest[]>('/leaves');
    return response.data;
};

export const getMyLeaveRequests = async (): Promise<LeaveRequest[]> => {
    const response = await api.get<LeaveRequest[]>('/leaves/mine');
    return response.data;
};

export const createLeaveRequest = async (data: CreateLeaveRequestInput): Promise<LeaveRequest> => {
    const response = await api.post<LeaveRequest>('/leaves', data);
    return response.data;
};

export const updateLeaveRequestStatus = async (id: string, status: string): Promise<LeaveRequest> => {
    const response = await api.put<LeaveRequest>(`/leaves/${id}`, { status });
    return response.data;
};

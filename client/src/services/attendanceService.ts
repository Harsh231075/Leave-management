import api from './api';
import { Attendance, CreateAttendanceInput } from '../types';

export const getAttendanceRecords = async (): Promise<Attendance[]> => {
    const response = await api.get<Attendance[]>('/attendance');
    return response.data;
};

export const getMyAttendanceRecords = async (): Promise<Attendance[]> => {
    const response = await api.get<Attendance[]>('/attendance/mine');
    return response.data;
};

export const createAttendanceRecord = async (data: CreateAttendanceInput): Promise<Attendance> => {
    const response = await api.post<Attendance>('/attendance', data);
    return response.data;
};
